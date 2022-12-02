const nodemailer = require("nodemailer");

exports.sendVerificationMail = ({ to, appealCode, appealAnswer, fileName }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ibaydillayevamirullo@gmail.com",
      pass: "vpuklacmmfusiemq",
    },
  });
  const attachment = fileName
    ? {
        filename: fileName,
        path: `./static/uploads/${fileName}`,
        cid: fileName,
      }
    : {};
  const answer = appealAnswer
    ? `<p>${appealAnswer}</p>`
    : `<h1> ${to} Sizning murojaatingiz muvaffaqiyatli yakunlandi </h1>
  <p> Murojaatingiz holatini tekshirish uchun Parol: <h2 style=color:red>${appealCode}</h2></p>`;
  const options = {
    from: "ibaydillayevamirullo@gmail.com",
    to: to,
    subject: "O'rmon ho'jaligi davlat qo'mitasi",
    html: answer,
  };
  if (attachment) {
    options.attachments = [attachment];
  }
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("email sent");
  });
};
