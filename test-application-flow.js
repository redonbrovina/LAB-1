require('dotenv').config();
const Database = require('./src/server/database/Database');
const { Aplikimi, AplikimiStatus } = require('./src/server/models');
const EmailService = require('./src/server/services/EmailService');

async function testApplicationFlow() {
    try {
        console.log('Connecting to database...');
        await Database.authenticate();
        console.log('✅ Database connected successfully');
        
        // Test email service
        console.log('\n📧 Testing email service...');
        const emailService = new EmailService();
        
        // Simuloj një aplikim të ri
        const testApplication = {
            aplikimiID: 999,
            email: 'redonbrovina@gmail.com',
            emri_kompanise: 'Test Company',
            adresa: 'Test Address',
            qyteti: 'Test City',
            kodi_postal: '10000',
            shtetiID: 1,
            password: 'testpassword123'
        };
        
        console.log('Sending approval email...');
        await emailService.sendApplicationApprovedEmail(testApplication);
        console.log('✅ Approval email sent');
        
        console.log('Sending rejection email...');
        await emailService.sendApplicationRejectedEmail(testApplication, 'Test rejection reason');
        console.log('✅ Rejection email sent');
        
        console.log('\n🎉 All emails sent successfully!');
        console.log('Check https://ethereal.email for the emails');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

testApplicationFlow();
