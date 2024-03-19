const nodemailer = require('nodemailer');

const send_mail_=(username,link)=>{
console.log("hello =",process.env.mail)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Change to your email service provider
  auth: {
    user:'aman@weboappdiscovery.com', // Hardcoded email address
    pass:'vznnccshrlvlvzps', // Hardcoded email password
  },
});


const mailOptions = {
  from: 'aman@weboappdiscovery.com', // Hardcoded sender address
  to: username, // Replace with the recipient's email
  //to: 'aman@weboappdiscovery.com',
  subject: ' New Order ',
  text: ` information about user =${link}`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
    return 0
  } else {
    console.log('Email sent:', info.response);
    return 1
  }
});
}
module.exports=send_mail_;