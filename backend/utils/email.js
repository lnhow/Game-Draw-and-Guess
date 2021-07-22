import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'DRAW&GUESS GAME <khuong11b13@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error Occurs', err);
    } else {
      console.log('Email sent!!');
    }
  });
};

export default sendEmail;
