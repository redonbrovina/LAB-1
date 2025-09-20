# Gmail Setup për Email Service

## Hapat për të konfiguruar Gmail:

### 1. Aktivizo 2-Factor Authentication
1. Shko te [Gmail Settings](https://myaccount.google.com/security)
2. Kliko "2-Step Verification"
3. Aktivizo 2-Factor Authentication

### 2. Krijo App Password
1. Shko te [App Passwords](https://myaccount.google.com/apppasswords)
2. Zgjidh "Mail" dhe "Other (Custom name)"
3. Jep emrin "Shneta App"
4. **Kopjo password-in** që të jepet (16 karaktere)

### 3. Përditëso .env file
```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=your-actual-email@gmail.com
```

### 4. Testo email service
```bash
node test-email.js
```

## Shembull:
```env
EMAIL_USER=vesa@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
ADMIN_EMAIL=vesa@gmail.com
```

**Shënim:** App Password është i ndryshëm nga fjalëkalimi i rregullt i Gmail!
