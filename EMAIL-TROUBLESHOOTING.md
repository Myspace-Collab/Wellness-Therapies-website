# Email Troubleshooting Guide

## Issue: No Emails Being Received

If emails are not being sent or received, follow these steps:

### Step 1: Check Browser Console

1. Open your website in a browser
2. Press **F12** to open Developer Tools
3. Go to the **Console** tab
4. Look for messages starting with:
   - `=== EMAILJS INITIALIZATION ===`
   - `=== CHECKING EMAILJS STATUS ===`
   - `✅` (success) or `❌` (error) messages

### Step 2: Verify config.js File

1. **Check if `config.js` exists** in your project folder
2. **Open `config.js`** and verify it contains:
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'your-actual-key-here';
   ```
3. **Make sure the key is NOT** `'YOUR_EMAILJS_PUBLIC_KEY_HERE'`

### Step 3: Verify EmailJS Configuration

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Check your **Service ID**: Should be `service_1u51w01`
3. Check your **Template IDs**:
   - Notification template: `template_zj4pg7k`
   - Auto-reply template: `template_xz10eyk`
4. Verify templates are **Active** (not paused)

### Step 4: Check Template Configuration

#### Template `template_zj4pg7k` (Notifications to You):
- **To Email**: Should use `{{to_email}}` variable
- **From Name**: `{{from_name}}`
- **From Email**: `{{from_email}}`
- **Subject**: `{{title}}`
- **Message**: Should include `{{message}}` variable

#### Template `template_xz10eyk` (Auto-Reply to Customer):
- **To Email**: Should use `{{to_email}}` variable
- **From Name**: `Wellness Therapies`
- **From Email**: `therapieswellness@gmail.com`
- **Subject**: Can be static like "Thank you for contacting Wellness Therapies!"
- **Message**: Should include `{{message}}` variable

### Step 5: Common Issues and Fixes

#### Issue: "EmailJS not initialized"
**Fix:**
- Check that `config.js` is loaded before `script.js` in `index.html`
- Verify `EMAILJS_PUBLIC_KEY` is set correctly in `config.js`
- Hard refresh the page (Ctrl + F5)

#### Issue: "Template ID not found"
**Fix:**
- Verify template IDs in EmailJS dashboard match the code
- Check that templates are **Active** (not paused)
- Make sure you're using the correct service ID

#### Issue: "The recipients address is empty"
**Fix:**
- In EmailJS template settings, make sure **To Email** field uses `{{to_email}}` variable
- Don't hardcode the email address in the template

#### Issue: Emails sent but not received
**Fix:**
- Check spam/junk folder
- Verify email addresses are correct
- Check EmailJS dashboard for email logs
- Verify your email service (Gmail, Outlook, etc.) is properly connected in EmailJS

### Step 6: Test EmailJS Connection

1. Open browser console (F12)
2. Try submitting the contact form
3. Look for these console messages:
   - `✅ EmailJS initialized successfully`
   - `✅ EmailJS is available and ready to send...`
   - `✅ Booking notification sent successfully!`
   - `✅ Confirmation email sent to customer!`

### Step 7: Verify EmailJS Public Key

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Navigate to **Account** → **General**
3. Find your **Public Key** (starts with letters/numbers)
4. Copy it to `config.js`:
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'your-public-key-here';
   ```

### Step 8: Check Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Submit the form
4. Look for requests to `api.emailjs.com`
5. Check the response:
   - **200 OK** = Email sent successfully
   - **400 Bad Request** = Check error message in response
   - **401 Unauthorized** = Public key is wrong

### Still Not Working?

1. **Check EmailJS Dashboard** for email logs and errors
2. **Verify Service Status** in EmailJS dashboard
3. **Test with a simple email** first (contact form)
4. **Check browser console** for detailed error messages
5. **Verify `config.js` is NOT committed to GitHub** (should be in `.gitignore`)

### Quick Checklist

- [ ] `config.js` exists and has correct `EMAILJS_PUBLIC_KEY`
- [ ] `config.js` is loaded before `script.js` in `index.html`
- [ ] EmailJS templates are **Active** in dashboard
- [ ] Template IDs match: `template_zj4pg7k` and `template_xz10eyk`
- [ ] Service ID matches: `service_1u51w01`
- [ ] Templates use `{{to_email}}` variable in "To Email" field
- [ ] Browser console shows `✅ EmailJS initialized successfully`
- [ ] No errors in browser console when submitting form

