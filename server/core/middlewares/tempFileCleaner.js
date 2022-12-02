const { Op } = require("sequelize");
const Attachment = require("../../modules/attachment/Attachment");
const fs = require("fs");

async function tempFileCleaner() {
  const temporaryFilesName = [];
  const tempFiles = await Attachment.findAll({
    where: {
      isPermanent: { [Op.eq]: false },
      createdAt: { [Op.lt]: Date.now() - 180000 },
    },
  });
  for (let i = 0; i < tempFiles.length; i++) {
    temporaryFilesName.push(tempFiles[i].name);
  }
  if (temporaryFilesName.length === 0) {
    return null;
  } else {
    for (let i = 0; i < temporaryFilesName.length; i++) {
      try {
        fs.unlink(`static/uploads/${temporaryFilesName[i]}`, (err) => {
          if (err) {
            console.log(err);
          }
          console.log("File is deleted.");
          Attachment.destroy({
            where: { name: { [Op.eq]: temporaryFilesName[i] } },
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = tempFileCleaner;
