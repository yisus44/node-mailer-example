const nodemailer = require("nodemailer");

module.exports = async function (req, res) {
  const { name, email, phone, message } = req.body;
  const contentHTML = `
    <h1>User information</h1>
  
    <ul>
      <li>Username : ${name}</li>
      <li>User email : ${email}</li>
      <li>phone : ${phone}</li>
    </ul>
    <p>${message}</p>
    `;

  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });
  try {
    const info = await transporter.sendMail({
      from: process.env.SERVER_FROM,
      to: process.env.SERVER_TO,
      subject: "Website content form",
      html: contentHTML,
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log("Message send", info.messageId);
    res.redirect("/success.html");
  } catch (err) {
    console.log(err);

    res.send({ error: "Unable to send email" });
  }
};
