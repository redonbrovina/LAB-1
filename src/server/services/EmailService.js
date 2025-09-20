const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL || 'your-email@gmail.com',
                pass: process.env.EMAIL_PASS || 'your-app-password'
            }
        });
    }

    // Metodë e përgjithshme për dërgimin e email-it
    async sendEmail(to, subject, htmlContent) {
        const mailOptions = {
            from: process.env.EMAIL, 
            to: to,
            subject: subject,
            html: htmlContent
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to} with subject: ${subject}`);
            return result;
        } catch (error) {
            console.error(`Error sending email to ${to}:`, error);
            throw error;
        }
    }

    // Sends email when admin approves application
    async sendApplicationApprovedEmail(applicationData) {
        const subject = '🎉 Your Application Has Been Approved - Login Credentials';
        const htmlContent = this.getEmailTemplate(`
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #16a34a; font-size: 28px; margin: 0;">Welcome to Shneta!</h1>
                <p style="color: #666; font-size: 16px; margin: 10px 0;">Your application has been successfully approved</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 30px; border-radius: 15px; margin: 20px 0; text-align: center;">
                <h2 style="color: white; margin: 0; font-size: 24px;">✅ Approved!</h2>
                <p style="color: white; margin: 10px 0; font-size: 16px;">You are now a registered client in our system</p>
            </div>
            
            <div style="background-color: #f0fdf4; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #16a34a;">
                <h3 style="color: #16a34a; margin-top: 0; font-size: 20px;">🔐 Login Credentials</h3>
                <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
                    <p style="margin: 10px 0; font-size: 16px;"><strong>📧 Email:</strong> <span style="color: #16a34a; font-weight: bold;">${applicationData.email}</span></p>
                    <p style="margin: 10px 0; font-size: 16px;"><strong>🔑 Password:</strong> <span style="color: #16a34a; font-weight: bold;">${applicationData.password || 'The password you set during application'}</span></p>
                </div>
            </div>
            
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 10px; margin: 25px 0;">
                <h4 style="color: #16a34a; margin-top: 0;">📋 Next Steps:</h4>
                <ol style="color: #333; line-height: 1.6;">
                    <li>Log into the system using the credentials above</li>
                    <li>Change your password for better security</li>
                    <li>Complete your profile in the system</li>
                    <li>Start using our services</li>
                </ol>
            </div>
        `, applicationData.emri_kompanise);
        await this.sendEmail(applicationData.email, subject, htmlContent);
    }

    // Sends email when admin rejects application
    async sendApplicationRejectedEmail(applicationData, reason) {
        const subject = '📋 Update on Your Application';
        const htmlContent = this.getEmailTemplate(`
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #dc2626; font-size: 28px; margin: 0;">Your Application</h1>
                <p style="color: #666; font-size: 16px; margin: 10px 0;">Status of your application</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; border-radius: 15px; margin: 20px 0; text-align: center;">
                <h2 style="color: white; margin: 0; font-size: 24px;">❌ Rejected</h2>
                <p style="color: white; margin: 10px 0; font-size: 16px;">After reviewing your application</p>
            </div>
            
            <div style="background-color: #fef2f2; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #dc2626;">
                <h3 style="color: #dc2626; margin-top: 0; font-size: 20px;">📝 Reason for Rejection</h3>
                <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
                    <p style="margin: 10px 0; font-size: 16px; color: #333;">${reason || 'No specific reason was provided.'}</p>
                </div>
            </div>
            
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 10px; margin: 25px 0;">
                <h4 style="color: #16a34a; margin-top: 0;">💡 What You Can Do:</h4>
                <ul style="color: #333; line-height: 1.6;">
                    <li>Review the information you submitted</li>
                    <li>Contact our team for further clarification</li>
                    <li>You may apply again in the future</li>
                </ul>
            </div>
        `, applicationData.emri_kompanise);
        await this.sendEmail(applicationData.email, subject, htmlContent);
    }

    // Metodë helper për të krijuar template-in e email-it
    getEmailTemplate(content, recipientName) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shneta - Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">Shneta</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Business Management System</p>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px;">
                    <div style="margin-bottom: 20px;">
                        <p style="color: #333; font-size: 18px; margin: 0;">Hello <strong>${recipientName}</strong>,</p>
                    </div>
                    
                    ${content}
                    
                    <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
                        <p style="color: #666; font-size: 14px; margin: 0; text-align: center;">
                            Thank you for choosing Shneta!<br>
                            The Shneta Team
                        </p>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
                    <p style="color: #666; font-size: 12px; margin: 0;">
                        © 2024 Shneta. All rights reserved.<br>
                        This email was sent automatically, please do not reply.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `;
    }
}

module.exports = EmailService;
