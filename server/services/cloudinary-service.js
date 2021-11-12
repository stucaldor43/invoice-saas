require("./../config");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: process.env.NODE_ENV === "production" ? true : false,
});

function uploadFile(path) {
  return cloudinary.uploader.upload(path, function (error, result) {});
}

uploadFile("server/services/businesscard2.pdf")
  .then(() => {
    console.log("uploaded");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    process.exit(0);
  });

module.exports = uploadFile
