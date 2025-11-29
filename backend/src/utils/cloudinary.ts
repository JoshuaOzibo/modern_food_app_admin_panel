import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  public_id: string;
  secure_url: string;
}

/**
 * Upload image buffer to Cloudinary
 * @param fileBuffer - The image file buffer
 * @param folder - Optional folder name in Cloudinary (e.g., 'foods')
 * @returns Promise with upload result containing URL
 */
export async function uploadImageToCloudinary(
  fileBuffer: Buffer,
  folder: string = 'foods'
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'image',
        transformation: [
          { width: 800, height: 600, crop: 'limit' }, // Resize to max 800x600
          { quality: 'auto' }, // Auto optimize quality
          { format: 'auto' }, // Auto format (webp when supported)
        ],
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else if (result) {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        } else {
          reject(new Error('Cloudinary upload failed: No result returned'));
        }
      }
    );

    // Convert buffer to stream
    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
}

/**
 * Delete image from Cloudinary
 * @param publicId - The public_id of the image to delete
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`Failed to delete image from Cloudinary: ${error}`);
    // Don't throw - we don't want to fail the request if deletion fails
  }
}

export default cloudinary;
