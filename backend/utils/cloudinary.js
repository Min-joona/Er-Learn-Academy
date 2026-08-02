const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dxvvpresa',
  api_key: process.env.CLOUDINARY_API_KEY || '169572735395392',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nwVcmzekcex4Xv4rcXygIqQ136Y',
});

async function uploadImage(base64Data, folder = 'eritrea-academy') {
  if (!base64Data || !base64Data.startsWith('data:image/')) {
    throw new Error('Invalid image data');
  }
  const result = await cloudinary.uploader.upload(base64Data, {
    folder,
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  });
  return { url: result.secure_url, publicId: result.public_id };
}

async function deleteImage(publicId) {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
}

async function uploadBase64(base64Data, folder = 'eritrea-academy') {
  return uploadImage(base64Data, folder);
}

module.exports = { uploadImage, deleteImage, uploadBase64 };
