const sharp = require("sharp");
const { extname } = require("path");

exports.imageConverter = async (file) => {
  const fileName = Date.now().toString() + ".webp";
  const path = `./static/uploads/${fileName}`;
  const convertedImage = await sharp(file.buffer).webp().toFile(path);
  return { fileName, convertedImage };
};
