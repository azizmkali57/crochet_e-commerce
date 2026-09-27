import ImageKit from "imagekit";

/**
 * Configure and export Server-side ImageKit instance
 */
let imagekit = null;

export function getImageKitInstance() {
  if (!imagekit) {
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    if (!publicKey || !privateKey || !urlEndpoint) {
      throw new Error("Missing ImageKit environment variables.");
    }

    imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  }
  return imagekit;
}

export default getImageKitInstance;
