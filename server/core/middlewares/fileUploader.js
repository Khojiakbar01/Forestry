const { extname } = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const fileUploader = async function (file) {
  const fileName = Date.now().toString() + extname(file.originalname);
  try {
    const uploadedFile = await fsPromises.writeFile(
      `./static/uploads/${fileName}`,
      file.buffer
    );
    return fileName;
  } catch (err) {
    console.error(err);
  }
};

module.exports = fileUploader;
