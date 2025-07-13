const nodemailer =  require('nodemailer');
const dotenv =  require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your SMTP service
  auth: {
    api_key:
        process.env.SENDGRID_API_KEY,
  }
});

// Send email function
exports.sendShortlistEmail = async (to, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Congratulations — You’re Shortlisted!',
      html: `<p>Hi ${name},</p>
             <p>We’re excited to let you know you’ve been shortlisted for our job opening. 
             We’ll reach out soon with the next steps.</p>
             <p>Thanks,<br>Recruitment Team</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error(`Failed to send email to ${to}:`, err);
  }
}
