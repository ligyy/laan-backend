require('dotenv').config();
const cloudinary = require('./config/cloudinary');

async function testUpload() {
  try {
    const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const upload = await cloudinary.uploader.upload(base64Image, {
      folder: 'test'
    });
    console.log("Success:", upload.secure_url);
  } catch (err) {
    console.error("Cloudinary Error:", err);
  }
}
testUpload();
