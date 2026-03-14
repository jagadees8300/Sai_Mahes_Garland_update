# 🌸 Sai Mahes Garlands - Enhanced Website

A modern, feature-rich React application for Sai Mahes Garlands with animations, authentication, and social media integration.

## ✨ New Features Added

### 1. **Image Carousel with Animation** 
- Auto-rotating carousel that changes images every 7 seconds
- Smooth fade-in and zoom animations
- Interactive dot navigation
- Welcome message display: "🌸 Welcome to Sai Mahes Garlands 🌸"
- Responsive design for all screen sizes

### 2. **Contact Modal**
- Quick access to contact details via a button in navbar
- Phone, Email, and Address information
- Direct WhatsApp chat link (Opens WhatsApp with pre-filled message)
- Direct Instagram profile link
- Clean, modern modal design with animations

### 3. **Authentication System**
- Login/Sign Up modal in top-right corner
- Toggle between Login and Sign Up forms
- Form validation and responsive design
- Accessible from navbar

### 4. **Social Media Integration**
- Floating social media buttons in bottom-right corner
- **WhatsApp**: Direct chat link with pre-filled welcome message
- **Instagram**: Direct profile link
- **Phone**: Direct call link
- Animated pop-in effects and hover animations

### 5. **Enhanced Navbar**
- Spinning garland emoji animation
- Contact button (Opens contact modal)
- Authentication button (Opens login/sign-up modal)
- Responsive mobile-friendly design
- Smooth animations

### 6. **Component Refactoring**
- Split monolithic components into smaller, reusable pieces:
  - `ImageCarousel.jsx` - Carousel with animations
  - `ContactModal.jsx` - Contact information modal
  - `AuthModal.jsx` - Login/Sign-up functionality
  - `SocialLinks.jsx` - Floating social media buttons
  - Updated `Navbar.jsx` - Enhanced with new features

### 7. **CSS Animations & Styling**
- Smooth carousel transitions
- Modal fade-in and slide animations
- Button hover effects with shadow and scale transforms
- Floating social button animations
- Responsive design for mobile, tablet, and desktop

## 📁 Project Structure

```
frontend/src/
├── components/
│   ├── ImageCarousel.jsx      (NEW) - Image carousel component
│   ├── ContactModal.jsx       (NEW) - Contact details modal
│   ├── AuthModal.jsx          (NEW) - Login/Sign-up modal
│   ├── SocialLinks.jsx        (NEW) - Social media floating buttons
│   ├── Navbar.jsx             (UPDATED)
│   ├── ProductCard.jsx
│   ├── MapSection.jsx
│   └── ...
├── pages/
│   ├── Home.jsx               (UPDATED)
│   ├── ProductDetails.jsx
│   └── ...
├── styles/                    (NEW FOLDER)
│   ├── carousel.css          (NEW)
│   ├── modal.css             (NEW)
│   ├── auth.css              (NEW)
│   ├── social.css            (NEW)
│   ├── navbar.css            (NEW)
│   └── home.css              (NEW)
├── App.js                     (UPDATED)
├── App.css                    (UPDATED)
└── ...
```

## 🚀 Installation & Setup

1. **Install Dependencies**:
```bash
cd frontend
npm install
```

2. **Start Development Server**:
```bash
npm start
```

3. **Build for Production**:
```bash
npm run build
```

## 📞 Contact Information

Update the contact details in `src/components/ContactModal.jsx`:

```javascript
const contactDetails = {
  phone: "+91-9876543210",
  email: "contact@saimahesgarlands.com",
  address: "123 Flower Street, City Name, State 12345",
  whatsapp: "https://wa.me/919876543210?text=...",
  instagram: "https://instagram.com/saimahesgarlands",
};
```

## 🎨 Customization

### Change Carousel Images
Edit `src/components/ImageCarousel.jsx`:
```javascript
const images = [
  "/images/weight1.jpg",
  "/images/weight2.jpg",
  // Add more images...
];
```

### Modify Carousel Speed
In `ImageCarousel.jsx`, change the interval:
```javascript
}, 7000); // Change to desired milliseconds (5000 = 5 seconds)
```

### Update Social Media Links
Edit `src/components/SocialLinks.jsx` and `src/components/ContactModal.jsx`:
```javascript
const socialLinks = [
  {
    name: "WhatsApp",
    url: "https://wa.me/YOUR_PHONE_NUMBER",
    // ...
  },
  // ...
];
```

## 🎯 Features Overview

| Feature | Location | Status |
|---------|----------|--------|
| Image Carousel | Home Page (Top) | ✅ Active |
| Contact Button | Navbar | ✅ Active |
| Login/Sign-Up | Navbar (Top-Right) | ✅ Active |
| WhatsApp Chat | Floating & Contact Modal | ✅ Active |
| Instagram Link | Floating & Contact Modal | ✅ Active |
| Social Media Buttons | Bottom-Right Corner | ✅ Active |
| Animations | All Components | ✅ Active |
| Responsive Design | All Pages | ✅ Active |

## 📱 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile Browsers (iOS Safari, Chrome Mobile)

## 🎬 Animation Details

### Carousel
- **Duration**: 7 seconds per image
- **Effect**: Fade-in with zoom animation
- **Transitions**: Smooth cubic-bezier easing

### Buttons
- **Hover**: Scale up (1.15x) with shadow increase
- **Active**: Scale down (0.95x)
- **Transition**: 0.3s cubic-bezier

### Modals
- **Open**: Scale in (0.9 → 1) with fade-in
- **Close**: Reverse animation

### Social Links
- **Appear**: Pop-in with stagger delay (0.1s between each)
- **Hover**: Rotate (-15deg) and scale (1.15x)
- **Icon**: Continuous bounce animation

## 💡 Tips for Customization

1. **Change Color Scheme**: Update gradient colors in CSS files
2. **Add More Social Links**: Add to `socialLinks` array in `SocialLinks.jsx`
3. **Modify Animation Speed**: Change `transition` and `animation` durations
4. **Update Contact Info**: Edit constants in `ContactModal.jsx`

## 🔗 Integration Notes

- WhatsApp links use the format: `https://wa.me/PHONE_NUMBER?text=MESSAGE`
- Instagram links direct to profile: `https://instagram.com/USERNAME`
- All external links open in new tabs with security attributes

## 📝 File Structure Summary

- **New Components**: 4 files (Carousel, ContactModal, AuthModal, SocialLinks)
- **New Styles**: 6 CSS files with animations
- **Updated Files**: App.js, Navbar.jsx, Home.jsx, App.css
- **Total Lines Added**: 1000+ lines of code with animations

## ✅ Testing Checklist

- [ ] Carousel auto-rotates every 7 seconds
- [ ] Carousel dots are interactive
- [ ] Contact modal opens/closes smoothly
- [ ] All contact links work (phone, email, WhatsApp, Instagram)
- [ ] Authentication form validates input
- [ ] Social media buttons appear in bottom-right
- [ ] All animations are smooth (60fps)
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Navigation buttons work in navbar
- [ ] Welcome message displays in carousel

## 🎉 You're All Set!

Your Sai Mahes Garlands website now has:
- ✨ Beautiful animations
- 📞 Easy contact access
- 🔐 User authentication
- 📱 Social media integration
- 📱 Fully responsive design
- 🚀 Enhanced user experience

**Happy Selling! 🌸**
