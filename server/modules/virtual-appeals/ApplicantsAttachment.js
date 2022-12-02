const sequelize = require("../../core/config/db/db");
const Applicants = require("../virtual-appeals/Applicants");
const Attachments = require("../attachment/Attachment");

const ApplicantsAttachment = sequelize.define(
  "applicantsAttachment",
  {},
  {
    underscored: true,
  }
);

Attachments.hasOne(ApplicantsAttachment, { foreignKey: "attachmentId" });
ApplicantsAttachment.belongsTo(Attachments, { as: "attachment" });

Applicants.hasMany(ApplicantsAttachment, {
  foreignKey: "applicantsId",
  as: "applicantsAttachments",
  onDelete: "cascade",
});
ApplicantsAttachment.belongsTo(Applicants, { as: "applicants" });

module.exports = ApplicantsAttachment;
