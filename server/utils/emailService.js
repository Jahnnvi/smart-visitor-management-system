const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
exports.sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Visitor Login",
    text: `Your OTP is: ${otp}`,
  });
};

// Send approval email
exports.sendApprovalEmail = async (email, visitor) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Visitor Request Approved",
    html: `
      <h2>Visitor Request Approved</h2>
      <p><b>Name:</b> ${visitor.guestName}</p>
      <p><b>Visitor ID:</b> ${visitor.visitorId}</p>
      <p><b>Date:</b> ${new Date(visitor.visitDate).toDateString()}</p>
      <p><b>Purpose:</b> ${visitor.purpose}</p>
      <br/>
      <p>Please show this at the gate.</p>
    `,
  });
};