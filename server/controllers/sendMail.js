

import nodemailer from 'nodemailer';

export const sendApproveMail = async (email, outpass) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,  // Use port 587 for TLS
      secure: false,  // Secure false for TLS (SSL is true for port 465)
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,  // Allows connection even with unauthorized certificates
      },
      connectionTimeout: 10000,  // 10 seconds timeout to avoid timeouts
    });

    const fromDates = new Date(outpass.fromDate).toDateString();
    const toDates = new Date(outpass.toDate).toDateString();
  
    const mailOptions = {
      from: {
        name: 'RK-VALLEY Outpass-System',
        address: process.env.USER
      },
      to: email,
      subject: 'Outpass Status',
      // html: `<h2>Outpass Approved</h2>
      //        <h4>Dear ${outpass.name}, your request for outpass has been approved and below are the details:</h4><br>
      //        <p>Outpass ID: ${outpass.outpassId}<p><br>
      //        <p>Student Name: ${outpass.name}</p>
      //        <p>ID No: ${outpass.enrollment}</p><br>
      //        <p>Hostel:${outpass.hostel}<br>
      //        <p>From Date: ${outpass.fromDate}</p><br>
      //        <p>To Date: ${outpass.toDate}</p><br>

      //        Please show this email to the Security Officer at the main gate while leaving the campus.<br>
      //        Wishing you a Happy and Safe Journey<br><br>
        
      //        <p>Thank You</p><br>
      //        <p>Regards<br><span><b>Team RK-VALLEY OUTPASS Portal</b></span></p>

      //        <p>Note: This is an auto-generated email. Please do not reply to this email.</p><br><br></br>`,

      html: `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="font-size: 24px; color: #2c3e50;">Outpass Approved</h2>
      <h4 style="font-size: 15px;">Dear ${outpass.name}, your request for outpass has been approved and below are the details:</h4><br>
      
      <p><strong>Outpass ID:</strong> ${outpass.outpassId}</p>
      <p><strong>Student Name:</strong> ${outpass.name}</p>
      <p><strong>ID No:</strong> ${outpass.enrollment}</p>
      <p><strong>Hostel:</strong> ${outpass.hostel}</p>
      <p><strong>From Date:</strong> ${fromDates}</p>
      <p><strong>To Date:</strong> ${toDates}</p><br>

      <p>Please show this email to the Security Officer at the main gate while leaving the campus.</p>
      <p>Wishing you a Happy and a Safe Journey.</p>

      <br>

      <p>Thank You,</p>
      <p>Regards,<br><strong>Team RK-VALLEY OUTPASS Portal</strong></p>

      <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
      
      <p style="font-size: 14px; color: #888;">Note: This is an auto-generated email. Please do not reply to this email.</p>
    </div>
  `,

    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error('Error sending email: ', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };
  

export const sendRejectMail = async (email, outpass) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,  // Use port 587 for TLS
    secure: false,  // Secure false for TLS (SSL is true for port 465)
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,  // Allows connection even with unauthorized certificates
    },
    connectionTimeout: 10000,  // 10 seconds timeout to avoid timeouts
  });

  const mailOptions = {
    from: {
      name: 'RK-VALLEY Outpass-System',
      address: process.env.USER
    },
    to: email,
    subject: 'Outpass Status',
    html: `<h2 style="font-size: 24px; color: #2c3e50;">Outpass Rejected</h2>
            <p><strong>Dear ${outpass.name}, your request for outpass has been "REJECTED"</strong></p>
            <br><strong>Please visit to the warden office for further details</strong>.<br>
            <br>Thank You</p><br>
            <p>Regards<br><span><b>Team RK-VALLEY OUTPASS Portal</b></span></p>

            <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
      
            <p style="font-size: 14px; color: #888;">Note: This is an auto-generated email. Please do not reply to this email.</p>`,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
  