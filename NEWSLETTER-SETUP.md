# Newsletter Signup Setup Guide

## Overview
The newsletter signup functionality has been added to your website. Users can subscribe via the footer form, and unsubscribe links are included in all newsletter emails.

## Features Implemented

✅ **Newsletter Signup Form** - Added to footer
✅ **Email Confirmation** - Subscribers receive welcome email
✅ **Unsubscribe Page** - Dedicated unsubscribe page at `/unsubscribe.html`
✅ **Unsubscribe Links** - Automatically included in all newsletter emails
✅ **Business Notifications** - You receive notifications when someone subscribes/unsubscribes

## EmailJS Template Setup

### Template 1: Newsletter Subscription Confirmation (template_xz10eyk)
**Purpose:** Welcome email sent to new subscribers

**Template Settings:**
- **To Email:** `{{to_email}}`
- **From Name:** `Wellness Therapies`
- **From Email:** `therapieswellness@gmail.com`
- **Subject:** `Welcome to Wellness Therapies Newsletter!`
- **Reply To:** `therapieswellness@gmail.com`

**Template Content:**
```
Thank you for subscribing to Wellness Therapies newsletter!

You will now receive:
- Monthly wellness tips
- Special offers and promotions
- Updates on new therapies
- Self-care resources

If you no longer wish to receive these emails, you can unsubscribe at any time by clicking the link below:

{{message}}

We respect your privacy and you can unsubscribe at any time.

Best regards,
The Wellness Therapies Team
```

**Variables Used:**
- `{{to_email}}` - Subscriber's email
- `{{to_name}}` - Subscriber's name (extracted from email)
- `{{message}}` - Contains the unsubscribe URL (automatically generated)

### Template 2: Subscription/Unsubscribe Notifications (template_zj4pg7k)
**Purpose:** Notifies you when someone subscribes or unsubscribes

**Template Settings:**
- **To Email:** `therapieswellness@gmail.com`
- **From Name:** `{{from_name}}`
- **From Email:** `{{from_email}}`
- **Subject:** `{{title}}`
- **Reply To:** `{{reply_to}}`

**Template Content:**
```
{{message}}

---
Type: {{type}}
```

**Variables Used:**
- `{{from_email}}` - Subscriber's email
- `{{name}}` - Subscriber's name
- `{{email}}` - Subscriber's email
- `{{message}}` - Full notification details
- `{{title}}` - "New Newsletter Subscription" or "Newsletter Unsubscribe Request"
- `{{type}}` - "newsletter_subscription" or "newsletter_unsubscribe"

## How It Works

### Subscription Flow:
1. User enters email in footer newsletter form
2. System generates unique unsubscribe token
3. Welcome email sent to subscriber with unsubscribe link
4. Notification email sent to you with subscriber details
5. Success message displayed to user

### Unsubscribe Flow:
1. User clicks unsubscribe link in newsletter email
2. Redirected to `/unsubscribe.html` with email pre-filled
3. User confirms unsubscribe
4. Notification email sent to you
5. Success message displayed to user

## Unsubscribe Link Format

The unsubscribe links in emails follow this format:
```
https://yourwebsite.com/unsubscribe.html?token=UNIQUE_TOKEN&email=user@example.com
```

The token is automatically generated and included in the notification email to you, so you can track unsubscribes.

## Managing Subscribers

Since this is a static website without a database, you have two options:

### Option 1: Manual Management (Current Setup)
- You receive email notifications for each subscription/unsubscribe
- Manually add/remove emails from your email marketing service (Mailchimp, etc.)
- The unsubscribe token is included in notifications for reference

### Option 2: Integrate with Email Marketing Service (Future Enhancement)
You can integrate with services like:
- **Mailchimp API** - Direct integration
- **SendGrid** - Email marketing platform
- **ConvertKit** - Creator-focused email marketing
- **MailerLite** - Free tier available

## Testing

1. **Test Subscription:**
   - Go to your website footer
   - Enter a test email
   - Check that welcome email is received
   - Verify unsubscribe link works

2. **Test Unsubscribe:**
   - Click unsubscribe link in email
   - Confirm email is pre-filled
   - Click unsubscribe button
   - Verify success message appears

## Customization

### Change Newsletter Form Location
The newsletter form is in the footer section. To move it:
1. Find `<div class="footer-section">` with newsletter form in `index.html`
2. Move to desired location

### Modify Time Slots or Content
- Edit the welcome email template in EmailJS dashboard
- Update unsubscribe page content in `unsubscribe.html`

### Styling
- Newsletter form styles are in `styles.css` (search for `.newsletter-form`)
- Unsubscribe page has inline styles in `unsubscribe.html`

## Privacy & Compliance

✅ **Unsubscribe Links** - Included in all emails
✅ **Easy Unsubscribe** - One-click unsubscribe process
✅ **Email Validation** - Validates email format before subscription
✅ **Confirmation** - Users receive confirmation emails

## Next Steps

1. ✅ Test the subscription form
2. ✅ Test the unsubscribe process
3. ✅ Set up your email marketing service (optional)
4. ✅ Customize email templates in EmailJS dashboard
5. ✅ Start collecting subscribers!

## Support

If you need help:
- Check EmailJS dashboard for template configuration
- Verify EmailJS public key is set in `config.js`
- Check browser console (F12) for any errors

---

**Note:** The unsubscribe functionality works immediately, but you'll need to manually remove emails from your mailing list if you're using a separate email marketing service. The system sends you notifications for each subscription/unsubscribe to help you manage your list.

