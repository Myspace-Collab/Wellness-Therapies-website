# Dynamic Template Setup Guide

Since EmailJS has template limits, we're using the same templates for both contact form and appointment bookings. Here's how to configure your EmailJS templates.

## Template Configuration

### Template 1: `template_zj4pg7k` (Notifications to You)

**Purpose:** Receives both contact form submissions AND appointment bookings

**Template Settings:**
- **To Email:** `{{to_email}}`
- **From Name:** `{{from_name}}`
- **From Email:** `{{from_email}}`
- **Subject:** `{{title}}`
- **Reply To:** `{{reply_to}}`

**Template Content:**
```
A message by {{name}} has been received. Kindly respond at your earliest convenience.

👤 {{name}}
{{time}}

{{message}}

---
Type: {{type}}
```

**Variables Used:**
- `{{name}}` - Customer's name
- `{{email}}` - Customer's email
- `{{message}}` - Full message (includes all details)
- `{{title}}` - "New Contact Form Submission" or "New Appointment Booking"
- `{{type}}` - "contact" or "booking"
- `{{to_email}}` - Your email (therapieswellness@gmail.com)
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{reply_to}}` - Customer's email

**What the message contains:**
- For Contact Form: Name, Email, Therapy Interest, Message
- For Booking: Name, Email, Phone, Therapy, Date, Time, Notes

### Template 2: `template_xz10eyk` (Auto-Reply to Customer)

**Purpose:** Sends confirmation to customers for both contact and booking

**Template Settings:**
- **To Email:** `{{to_email}}`
- **From Name:** `Wellness Therapies`
- **From Email:** `therapieswellness@gmail.com`
- **Subject:** `Thank you for contacting Wellness Therapies!`
- **Reply To:** `therapieswellness@gmail.com`

**Template Content:**
```
{{message}}
```

**Variables Used:**
- `{{name}}` - Customer's name
- `{{email}}` - Customer's email
- `{{therapy}}` - Therapy type
- `{{message}}` - Complete confirmation message (different for contact vs booking)
- `{{to_email}}` - Customer's email
- `{{type}}` - "contact" or "booking_confirmation"

**What the message contains:**
- For Contact: "Thank you for reaching out..." with their message
- For Booking: "Thank you for booking..." with appointment details

## How It Works

### Contact Form Flow:
1. Customer submits contact form
2. **Template `template_zj4pg7k`** sends notification to you with contact details
3. **Template `template_xz10eyk`** sends auto-reply to customer

### Booking Form Flow:
1. Customer books appointment
2. **Template `template_zj4pg7k`** sends notification to you with booking details
3. **Template `template_xz10eyk`** sends confirmation to customer with appointment details

## Benefits

✅ **Uses only 2 templates** (instead of 4)
✅ **Same template handles both** contact and booking
✅ **Dynamic content** based on submission type
✅ **Easy to maintain** - update one template for both

## Template Updates Needed

### Update `template_zj4pg7k` in EmailJS:

**Content should be:**
```
A message by {{name}} has been received. Kindly respond at your earliest convenience.

{{message}}

---
Submission Type: {{type}}
```

This way, the `{{message}}` variable will contain all the details (formatted differently for contact vs booking), and you can see what type it is.

### Update `template_xz10eyk` in EmailJS:

**Content should be:**
```
{{message}}
```

The code will send the appropriate message content based on whether it's a contact form or booking confirmation.

## Testing

1. Test contact form - should receive notification with contact details
2. Test booking form - should receive notification with booking details
3. Both should use the same templates but with different content


