# 📱 Social Media & Contact Configuration

## 🔗 Quick Reference Guide

### WhatsApp Links

#### Format:
```
https://wa.me/PHONE_NUMBER?text=MESSAGE_TEXT
```

#### Example:
```
https://wa.me/919876543210?text=Hello%20Sai%20Mahes%20Garlands!%20I%20want%20to%20know%20more%20about%20your%20products.
```

#### How to Create:
1. Start with: `https://wa.me/`
2. Add your phone number (include country code, no spaces)
3. Add: `?text=`
4. Add your message (use `%20` for spaces)

#### Character Encoding:
- Space = `%20`
- Newline = `%0A`
- Emoji = Use directly (e.g., 🌸 = 🌸)
- Special chars = URL encode

#### Examples:
```
Simple message:
https://wa.me/919876543210?text=Hi

With emoji:
https://wa.me/919876543210?text=Hello%20🌸%20Sai%20Mahes

With newlines:
https://wa.me/919876543210?text=Hello%0AThis%20is%20line%202
```

---

### Instagram Links

#### Format:
```
https://instagram.com/USERNAME
```

#### Examples:
```
https://instagram.com/saimahesgarlands
https://instagram.com/your_username
```

#### Variations:
```
Profile: https://instagram.com/saimahesgarlands/
With slash: https://instagram.com/saimahesgarlands/
Direct link: instagram.com/saimahesgarlands
```

---

### Phone Links

#### Format:
```
tel:+COUNTRY_CODE_PHONE_NUMBER
```

#### Examples:
```
tel:+919876543210
tel:+911234567890
tel:+44123456789
```

#### Usage:
```html
<a href="tel:+919876543210">Call Us</a>
```

---

### Email Links

#### Format:
```
mailto:EMAIL_ADDRESS
```

#### Examples:
```
mailto:contact@saimahesgarlands.com
```

#### With Subject & Body:
```
mailto:contact@saimahesgarlands.com?subject=Inquiry&body=Hello
```

---

## 🛠️ Where to Update

### 1. **Contact Modal**
File: `src/components/ContactModal.jsx`

Update these lines:
```javascript
const contactDetails = {
  phone: "+91-YOUR-PHONE", // Update this
  email: "YOUR-EMAIL@domain.com", // Update this
  address: "YOUR-ADDRESS", // Update this
  whatsapp: "https://wa.me/YOUR_PHONE?text=...", // Update this
  instagram: "https://instagram.com/YOUR-USERNAME", // Update this
};
```

### 2. **Social Links**
File: `src/components/SocialLinks.jsx`

Update these links:
```javascript
const socialLinks = [
  {
    id: 1,
    name: "WhatsApp",
    url: "https://wa.me/YOUR_PHONE?text=...", // Update this
  },
  {
    id: 2,
    name: "Instagram",
    url: "https://instagram.com/YOUR-USERNAME", // Update this
  },
  {
    id: 3,
    name: "Phone",
    url: "tel:+YOUR_PHONE", // Update this
  },
];
```

---

## 📋 Step-by-Step Configuration

### Step 1: Get Your Phone Number
Your WhatsApp phone number with country code (no spaces or dashes)
- Example: `919876543210` (India country code 91)

### Step 2: Create WhatsApp Link
```
https://wa.me/919876543210?text=Hello%20Sai%20Mahes%20Garlands!
```

### Step 3: Get Instagram Username
Your Instagram handle without @
- Example: `saimahesgarlands`

### Step 4: Create Instagram Link
```
https://instagram.com/saimahesgarlands
```

### Step 5: Update Files
Replace the example values in:
- `src/components/ContactModal.jsx`
- `src/components/SocialLinks.jsx`

### Step 6: Test
- Click WhatsApp button → Should open WhatsApp app
- Click Instagram button → Should open Instagram profile
- Click Phone button → Should open phone dialer

---

## 💡 WhatsApp Message Ideas

### For Customers:
```
"Hello! I'm interested in your garlands. Can you tell me more about your products?"
```

### For Orders:
```
"Hi, I'd like to place an order for your garlands. What's the process?"
```

### For Pricing:
```
"Can you please share your price list and available designs?"
```

### For Events:
```
"We have an event coming up. Do you provide bulk garland orders?"
```

### Generate URL:
Use this template to create your message:
```
https://wa.me/919876543210?text=PASTE_YOUR_MESSAGE_HERE
```

Then replace spaces with `%20` and special characters with their URL codes.

---

## 🌐 Country Codes Reference

| Country | Code | Example |
|---------|------|---------|
| India | 91 | +919876543210 |
| USA | 1 | +11234567890 |
| UK | 44 | +441234567890 |
| Canada | 1 | +14165551234 |
| Australia | 61 | +61212345678 |
| Brazil | 55 | +5511987654321 |
| Germany | 49 | +491234567890 |
| France | 33 | +33123456789 |

---

## ✅ Configuration Checklist

- [ ] Get your WhatsApp phone number
- [ ] Create WhatsApp link with message
- [ ] Get your Instagram username
- [ ] Create Instagram link
- [ ] Update ContactModal.jsx
- [ ] Update SocialLinks.jsx
- [ ] Test WhatsApp link (opens app)
- [ ] Test Instagram link (opens profile)
- [ ] Test Phone link (opens dialer)
- [ ] Test Email link (opens email client)

---

## 🔧 Testing Links Locally

### Test WhatsApp:
1. Open: `https://wa.me/YOUR_PHONE?text=YOUR_MESSAGE`
2. Should open WhatsApp app or web
3. Message should be pre-filled

### Test Instagram:
1. Open: `https://instagram.com/YOUR_USERNAME`
2. Should show profile
3. Followers/posts visible

### Test Phone:
1. Click phone button
2. On mobile: Opens dialer
3. On desktop: May show error or SMS client

### Test Email:
1. Click email button
2. Opens default email client
3. Address pre-filled

---

## 📞 Common Issues & Solutions

### WhatsApp Link Not Working:
- Check phone number format (no spaces, include country code)
- Make sure URL is encoded (spaces = %20)
- Ensure app is installed on device

### Instagram Link Not Opening:
- Check username spelling
- No @ symbol in URL
- Make sure URL is: `https://instagram.com/username`

### Phone Link Not Working:
- Include country code (+)
- No spaces or dashes
- Example: `tel:+919876543210`

### Message Not Pre-filling:
- Check URL encoding (spaces = %20)
- Make sure `?text=` is included
- Message must be after `?text=`

---

## 💾 Save Your Links

Keep your links safe by saving them:

### WhatsApp:
```
https://wa.me/[YOUR_PHONE]?text=[YOUR_MESSAGE]
```

### Instagram:
```
https://instagram.com/[YOUR_USERNAME]
```

### Phone:
```
tel:+[YOUR_PHONE]
```

### Email:
```
mailto:[YOUR_EMAIL]
```

---

## 🎉 You're Done!

Your social media and contact links are now configured!

**Next Steps:**
1. Deploy the website
2. Share links with customers
3. Monitor messages and responses
4. Update information as needed

**Happy Selling! 🌸**
