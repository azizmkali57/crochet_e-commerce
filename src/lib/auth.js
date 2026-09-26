import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Ensures the pre-configured admin account exists in MongoDB
 */
export async function seedAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "Alif Admin";

  if (!adminEmail || !adminPassword) return null;

  await connectToDatabase();
  let admin = await User.findOne({ email: adminEmail }).select("+password");

  if (!admin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      authProvider: "credentials",
      isEmailVerified: true,
      stitchPoints: 9999,
      tier: "VIP Member",
    });
    console.log("✅ Pre-configured admin user created:", adminEmail);
  } else if (admin.role !== "admin") {
    admin.role = "admin";
    await admin.save();
  }

  return admin;
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        idToken: { label: "Google ID Token", type: "text" },
        isGoogleOneTap: { label: "One Tap Flag", type: "text" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        await seedAdminUser();

        // 1. Google One-Tap / ID Token Authorization
        if (credentials?.isGoogleOneTap === "true" && credentials?.idToken) {
          try {
            const ticket = await googleClient.verifyIdToken({
              idToken: credentials.idToken,
              audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();

            if (!payload || !payload.email) {
              throw new Error("Invalid Google Token");
            }

            const email = payload.email.toLowerCase().trim();
            const isAdminEmail = email === process.env.ADMIN_EMAIL?.toLowerCase().trim();

            let user = await User.findOne({ email });

            if (!user) {
              user = await User.create({
                name: payload.name || "Crochet Patron",
                email: email,
                avatar: payload.picture || "/images/main_logo.png",
                googleId: payload.sub,
                authProvider: "google",
                role: isAdminEmail ? "admin" : "customer",
                isEmailVerified: payload.email_verified || true,
                stitchPoints: isAdminEmail ? 9999 : 100,
                tier: isAdminEmail ? "VIP Member" : "New Patron",
                lastLogin: new Date(),
              });
            } else {
              user.lastLogin = new Date();
              if (payload.picture && (!user.avatar || user.avatar === "/images/main_logo.png")) {
                user.avatar = payload.picture;
              }
              if (isAdminEmail && user.role !== "admin") {
                user.role = "admin";
              }
              if (!user.googleId) {
                user.googleId = payload.sub;
                user.authProvider = user.password ? "both" : "google";
              }
              await user.save();
            }

            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
              avatar: user.avatar,
              stitchPoints: user.stitchPoints,
              tier: user.tier,
            };
          } catch (err) {
            console.error("Google One-Tap verification error:", err);
            throw new Error(err.message || "Google One-Tap verification failed");
          }
        }

        // 2. Standard Email & Password Credentials Authorization
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password.");
        }

        const email = credentials.email.toLowerCase().trim();
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("No account found with this email address.");
        }

        if (!user.password) {
          throw new Error("This account was registered using Google. Please sign in with Google.");
        }

        if (!user.isActive) {
          throw new Error("Your account has been deactivated. Please contact support.");
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid email or password.");
        }

        user.lastLogin = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          stitchPoints: user.stitchPoints,
          tier: user.tier,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectToDatabase();
        await seedAdminUser();

        const email = user.email.toLowerCase().trim();
        const isAdminEmail = email === process.env.ADMIN_EMAIL?.toLowerCase().trim();

        let dbUser = await User.findOne({ email });

        if (!dbUser) {
          dbUser = await User.create({
            name: user.name || "Crochet Patron",
            email: email,
            avatar: user.image || profile?.picture || "/images/main_logo.png",
            googleId: account.providerAccountId,
            authProvider: "google",
            role: isAdminEmail ? "admin" : "customer",
            isEmailVerified: true,
            stitchPoints: isAdminEmail ? 9999 : 100,
            tier: isAdminEmail ? "VIP Member" : "New Patron",
            lastLogin: new Date(),
          });
        } else {
          dbUser.lastLogin = new Date();
          if (user.image && (!dbUser.avatar || dbUser.avatar === "/images/main_logo.png")) {
            dbUser.avatar = user.image;
          }
          if (isAdminEmail && dbUser.role !== "admin") {
            dbUser.role = "admin";
          }
          if (!dbUser.googleId) {
            dbUser.googleId = account.providerAccountId;
            dbUser.authProvider = dbUser.password ? "both" : "google";
          }
          await dbUser.save();
        }

        user.id = dbUser._id.toString();
        user.role = dbUser.role;
        user.avatar = dbUser.avatar;
        user.stitchPoints = dbUser.stitchPoints;
        user.tier = dbUser.tier;
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "customer";
        token.avatar = user.avatar || user.image || "/images/main_logo.png";
        token.stitchPoints = user.stitchPoints ?? 100;
        token.tier = user.tier || "New Patron";
      }

      // Handle session updates (e.g. updating points or profile)
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role || "customer";
        session.user.avatar = token.avatar || token.picture || "/images/main_logo.png";
        session.user.stitchPoints = token.stitchPoints ?? 100;
        session.user.tier = token.tier || "New Patron";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
