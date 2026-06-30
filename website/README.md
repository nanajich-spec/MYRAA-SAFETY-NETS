# Myraa Safety Nets - Business Website

## 📋 Project Overview

**Business Name:** Myraa Safety Nets  
**Business Type:** Professional Safety Net Installation Services  
**Service Areas:** Hyderabad, Vijayawada, Visakhapatnam, Chennai, Bangalore, Pune, Mumbai  

---

## 🎯 Business Contact Details

### Primary Contact Information
- **Mobile Number:** +91 98765 43210 (Update this with your actual number)
- **Email:** myraa@myraasafetynets.com (Update this with your actual email)
- **Business Hours:** 9:00 AM - 9:00 PM (Monday - Sunday)

### Update These Fields in Your Website

1. **In `index.html`:**
   - Line 63: Phone number in CTA buttons
   - Line 64: WhatsApp link
   - Line 357: Contact form WhatsApp integration
   - Line 418-424: Contact information section

2. **In `js/script.js`:**
   - Line 33-34: WhatsApp phone number (replace with your actual number)

---

## 🏢 Services Offered

1. **Balcony Safety Nets** - Premium residential safety solutions
2. **Pigeon & Bird Safety Nets** - Hygienic bird control solutions
3. **Child Safety Nets** - Protective nets for children
4. **Construction Safety Nets** - Professional-grade construction safety
5. **Invisible Grills** - Modern security without compromising aesthetics
6. **Sports & Badminton Nets** - High-quality sports equipment nets

---

## 🎨 Logo Design

Visit `logo-design.html` to see 6 professional logo design concepts. The website already includes SVG logos that you can customize.

**Recommended:** Design 2 (Modern M Circle) - Professional, scalable, and versatile

**Logo Color Codes:**
- Primary Orange: `#FF6B35` (Safety & Energy)
- Dark Blue: `#004E89` (Trust & Professionalism)
- Teal Accent: `#1ABC9C` (Growth & Reliability)
- Green: `#27AE60` (Safety & Success)

---

## 📁 Project Structure

```
website/
├── index.html              # Main home page
├── logo-design.html        # Logo design concepts & guidelines
├── css/
│   └── style.css          # All styling (responsive design)
├── js/
│   └── script.js          # Interactivity & form handling
└── images/                # Directory for storing images
    ├── balcony-net.jpg    # Add your service images
    ├── pigeon-net.jpg
    ├── installation.jpg
    └── team-photo.jpg     # Add team/portfolio photos
```

---

## 🚀 Quick Start

### New Production Features

- Dark and light theme with persistent toggle (saved in browser).
- Scroll reveal animations with reduced-motion accessibility support.
- Dynamic media gallery with lazy loading and optimized rendering.
- Lighthouse-focused improvements: semantic landmarks, skip link, focus-visible states, form autocomplete, and defer-loaded scripts.

### Installation

1. **Extract the website files** to your hosting account via FTP/File Manager
2. **Update contact information** in `index.html` and `js/script.js`
3. **Add your business images** to the `images/` folder:
   - Before/after installation photos
   - Service demonstrations
   - Team photos
   - Customer testimonials

### View Locally

1. Open `index.html` in a web browser
2. Or use any local server:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx http-server
   ```

### Image Optimization Workflow (Recommended)

1. Install either ImageMagick (`magick`) or libwebp (`cwebp`) CLI.
2. Run:
   ```powershell
   .\optimize-images.ps1
   ```
3. This generates WebP files and refreshes `js/media-manifest.json`.
4. Deploy optimized media for faster loading on all devices.

---

## ✏️ Customization Guide

### 1. Update Business Details

**File:** `index.html`

**Find and Replace:**
```
+919876543210  →  Your actual mobile number
myraa@myraasafetynets.com  →  Your actual email
```

### 2. Add Your Images

**File:** `css/style.css`

Add background images or modify the `.hero-placeholder` section to include your images.

### 3. Modify Service Descriptions

**File:** `index.html` (Lines 170-200)

Update service descriptions to match your specific offerings and pricing.

### 4. Customize Location List

**File:** `index.html` (Lines 214-237)

Edit the 7 service cities or add more locations as needed.

### 5. Update About Section

**File:** `index.html` (Lines 246-280)

Update company description and key features.

---

## 📞 Contact Form Integration

The website includes a contact form that sends messages via WhatsApp. 

**How it works:**
1. User fills the contact form
2. Form data is sent via WhatsApp chat
3. You receive the inquiry directly on WhatsApp
4. Fast response capability

**To update:**
- Open `js/script.js`
- Find line 33: `https://wa.me/919876543210`
- Replace `919876543210` with your WhatsApp number (including country code)

---

## 🌐 Domain & Hosting Setup

### Recommended Domain Names
- myraasafetynets.com
- myraasafetynets.in
- myraasafetynets.co.in

### Domain Registration
- GoDaddy: https://www.godaddy.com
- Namecheap: https://www.namecheap.com
- Hostinger: https://www.hostinger.in

### Hosting Providers
- **Hostinger** - ₹3,000-6,000/year (Recommended)
- **Bluehost** - Similar pricing
- **SiteGround** - Premium option

**Minimum Requirements:**
- 1 GB storage
- 10 GB bandwidth
- PHP support (if needed for future features)
- Free SSL certificate

### GitHub Pages Custom Domain Setup (GoDaddy)

Use these exact settings for this repository deployment:

1. Ensure the root-level `CNAME` file contains:
   - `www.myraasafetynets.com`
2. In GitHub repository settings:
   - Open Settings → Pages
   - Custom domain: `www.myraasafetynets.com`
   - Keep source as Deploy from a branch, branch `main`, folder `/(root)`
3. In GoDaddy DNS, create/update:
   - A record: Host `@` → `185.199.108.153`
   - A record: Host `@` → `185.199.109.153`
   - A record: Host `@` → `185.199.110.153`
   - A record: Host `@` → `185.199.111.153`
   - CNAME: Host `www` → `nanajich-spec.github.io`
4. Wait for DNS propagation (can take from a few minutes up to 24 hours).
5. Return to GitHub Pages and click Check again.
6. Enable Enforce HTTPS after DNS becomes valid.

---

## 🔧 Important Customizations

### 1. Business Phone Number
- `index.html` - Line 63, 64, 357
- `js/script.js` - Line 33

### 2. Business Email
- `index.html` - Line 425

### 3. WhatsApp Number
- `index.html` - Line 64 & 443
- `js/script.js` - Line 33

### 4. Service Cities
- `index.html` - Lines 214-237 & Lines 284-289

### 5. Navigation Links
- `index.html` - Lines 30-35 (Smooth scrolling to sections)

---

## 📱 Mobile Optimization

The website is **fully responsive** and works perfectly on:
- Desktop computers (1920px+)
- Tablets (768px - 1024px)
- Mobile phones (320px - 767px)

All buttons and forms are optimized for touch on mobile devices.

---

## 🎓 SEO Keywords to Use

Add these keywords to your Google Business Profile and social media:

**Location-based:**
- Safety Nets in Hyderabad
- Balcony Safety Nets Chennai
- Pigeon Nets Bangalore
- Child Safety Nets Pune
- Invisible Grills Mumbai

**Service-based:**
- Professional Safety Net Installation
- Affordable Safety Nets
- Best Safety Net Services
- Custom Safety Net Solutions
- Weather-resistant Safety Nets

---

## 📊 Next Steps for Business Growth

1. **Register Business**
   - Sole Proprietorship through MCA
   - GST Registration at https://www.gst.gov.in
   - Udyam Registration at https://udyamregistration.gov.in

2. **Google Business Profile**
   - Register at https://business.google.com
   - Add photos, reviews, and business hours
   - Enable messaging

3. **Social Media Presence**
   - Facebook: Create business page
   - Instagram: Post installation photos/videos
   - YouTube: Upload service demonstration videos
   - WhatsApp Business: Get verified badge

4. **Digital Marketing**
   - Google Ads targeting your service cities
   - Facebook & Instagram ads
   - Local SEO optimization
   - Customer review campaigns

5. **Customer Reviews**
   - Google Reviews
   - Facebook Reviews
   - Website testimonials section

---

## 📈 Website Analytics

Add these scripts for tracking and analytics:

### Google Analytics (Recommended)
```html
<!-- Add to <head> section in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel (For Facebook Ads)
```html
<!-- Add to <head> section -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  // Add your pixel ID
}
</script>
```

---

## 🛡️ Security & Best Practices

1. **SSL Certificate:** Ensure HTTPS is enabled (usually automatic with modern hosting)
2. **Backup:** Regular backups of your website files
3. **Email Security:** Use professional email service
4. **Phone Privacy:** Hide personal phone details behind WhatsApp/Contact form
5. **Data Protection:** Keep customer information secure

---

## 📞 Support & Help

### Common Issues & Solutions

**Issue:** Contact form not sending  
**Solution:** Check WhatsApp number + country code format (91XXXXXXXXXX for India)

**Issue:** Images not loading  
**Solution:** Ensure images are in `images/` folder and paths are correct in HTML

**Issue:** Website not responsive on mobile  
**Solution:** Update viewport meta tag in HTML head section

**Issue:** Slow loading  
**Solution:** Compress images before uploading

---

## 📝 Website Checklist

Before going live, ensure:

- [ ] All phone numbers updated
- [ ] Email address updated
- [ ] Service descriptions customized
- [ ] Images added to website
- [ ] WhatsApp number verified
- [ ] Contact form tested
- [ ] Mobile responsiveness checked
- [ ] SSL certificate activated
- [ ] DNS properly configured
- [ ] Google Business Profile created
- [ ] Social media pages created
- [ ] Analytics code added (optional)

---

## 💡 Pro Tips

1. **Add Before/After Photos** - Upload to build trust
2. **Add Customer Testimonials** - Modify the About section with real reviews
3. **Create FAQ Section** - Address common customer questions
4. **Add Video** - Embed installation demonstration videos
5. **Update Blog Section** - Share safety tips and maintenance guides
6. **WhatsApp Status Updates** - Regular service photos/updates
7. **Instagram Reels** - Short installation videos
8. **Google Posts** - Special offers and updates

---

## 📞 Contact Information Template

Save and share this with your team:

```
MYRAA SAFETY NETS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 Mobile: +91 98765 43210
📧 Email: myraa@myraasafetynets.com
💬 WhatsApp: https://wa.me/919876543210
🌐 Website: www.myraasafetynets.com

📍 Service Cities:
Hyderabad | Vijayawada | Visakhapatnam
Chennai | Bangalore | Pune | Mumbai

⏰ Open: 9:00 AM - 9:00 PM (Daily)
```

---

## 🎯 Estimated Monthly Targets

- 50-100 website visits
- 5-10 quality inquiries
- 2-3 new customers
- Conversion rate: 20-30%

**Growth with digital marketing (Google/Facebook Ads):**
- 500-1000 website visits
- 50-100 inquiries
- 15-30 new customers

---

## 📞 Questions?

For any questions about the website configuration or business setup, refer to:
- Official documentation in files
- Industry guides for safety net installation
- Local chamber of commerce
- Business registration portals

---

**Last Updated:** May 27, 2026  
**Website Version:** 1.0  
**Status:** Production Ready
