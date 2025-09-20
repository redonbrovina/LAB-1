const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        // Konfigurimi i email transporter-it për Gmail
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'your-email@gmail.com',
                pass: process.env.EMAIL_PASS || 'your-app-password'
            }
        });
    }

    // Metodë e përgjithshme për dërgimin e email-it
    async sendEmail(to, subject, htmlContent) {
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
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

    // Dërgon email kur admini pranon aplikimin
    async sendApplicationApprovedEmail(applicationData) {
        const subject = 'Aplikimi Juaj është Aprovuar - Kredencialet e Hyrjes';
        const htmlContent = `
            <p>Përshëndetje ${applicationData.emri_kompanise},</p>
            <p>Me kënaqësi ju njoftojmë se aplikimi juaj është aprovuar! Tani jeni një klient i regjistruar në sistemin tonë.</p>
            
            <p><strong>Kredencialet e hyrjes:</strong></p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Email:</strong> ${applicationData.email}</p>
                <p><strong>Fjalëkalimi:</strong> ${applicationData.password || 'Fjalëkalimi që keni vendosur gjatë aplikimit'}</p>
            </div>
            
            <p>Ju lutemi kyçuni në sistem dhe ndryshoni fjalëkalimin tuaj për siguri më të mirë.</p>
            
            <p>Faleminderit,</p>
            <p>Ekipi i Shneta</p>
        `;
        await this.sendEmail(applicationData.email, subject, htmlContent);
    }

    // Dërgon email kur admini refuzon aplikimin
    async sendApplicationRejectedEmail(applicationData, reason) {
        const subject = 'Përditësim për Aplikimin Tuaj';
        const htmlContent = `
            <p>Përshëndetje ${applicationData.emri_kompanise},</p>
            <p>Pas rishikimit të aplikimit tuaj, kemi vendosur ta refuzojmë atë.</p>
            <p><strong>Arsyeja e refuzimit:</strong> ${reason || 'Nuk është dhënë arsye specifike.'}</p>
            <p>Nëse keni pyetje, ju lutemi na kontaktoni.</p>
            <p>Faleminderit,</p>
            <p>Ekipi i Shneta</p>
        `;
        await this.sendEmail(applicationData.email, subject, htmlContent);
    }

    // Dërgon email kur admini pranon aplikimin (për admin)
    async sendAdminNotificationEmail(applicationData) {
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'admin@example.com';
        const subject = 'Aplikim i Ri i Klientit në Pritje';
        const htmlContent = `
            <p>Përshëndetje Admin,</p>
            <p>Një aplikim i ri klienti është dërguar dhe është në pritje të rishikimit:</p>
            <ul>
                <li><strong>Emri i Kompanisë:</strong> ${applicationData.emri_kompanise}</li>
                <li><strong>Email:</strong> ${applicationData.email}</li>
                <li><strong>ID e Aplikimit:</strong> ${applicationData.aplikimiID}</li>
            </ul>
            <p>Ju lutemi kyçuni në panelin e administratorit për të rishikuar dhe aprovuar/refuzuar aplikimin.</p>
            <p>Faleminderit,</p>
            <p>Ekipi i Shneta</p>
        `;
        await this.sendEmail(adminEmail, subject, htmlContent);
    }
}

module.exports = EmailService;
