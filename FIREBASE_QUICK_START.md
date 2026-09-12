# Firebase Admin Login - Quick Start

## What's New

✅ **Firebase Authentication System**
- Email/Password login with validation
- Google Sign-in support
- Secure token management
- Protected routes

✅ **Project Management Dashboard**
- Add projects directly from admin panel
- Edit existing projects
- Delete projects
- Filter by category
- Store in Firestore database

✅ **Full Integration**
- Firebase Firestore for database
- Firebase Auth for authentication
- No backend server needed
- Real-time updates

## Files Created/Modified

### New Files
- `src/config/firebase.js` - Firebase configuration
- `src/admin/AdminLogin.jsx` - Updated with Firebase Auth
- `src/admin/AdminDashboard.jsx` - Project management
- `FIREBASE_SETUP.md` - Detailed setup guide

### Updated Files
- `src/App.jsx` - Routes setup
- `src/main.jsx` - Removed Google OAuth Provider
- `.env.example` - Firebase config template

## Installation Status

✅ Dependencies installed:
- `firebase` - Firebase SDK
- `react-router-dom` - Routing
- `framer-motion` - Animations
- `lucide-react` - Icons

## Next Steps (3 mins)

1. **Get Firebase Config**
   - Go to https://console.firebase.google.com/
   - Create project (if not exist)
   - Copy Firebase config

2. **Create .env.local**
   ```bash
   cp .env.example .env.local
   ```
   - Paste Firebase config values

3. **Enable Authentication**
   - Firebase Console → Authentication
   - Enable Email/Password
   - Enable Google Sign-in

4. **Create Firestore DB**
   - Firebase Console → Firestore Database
   - Create in Test Mode
   - Done!

5. **Create Admin User**
   - Firebase Console → Authentication → Users
   - Add user: admin@example.com / admin123456

6. **Test**
   ```bash
   npm run dev
   # Visit http://localhost:5173/admin
   ```

## Login Credentials (After Setup)

- **Email**: admin@example.com (or your email)
- **Password**: admin123456 (or your password)
- **Google**: Click button to sign with Google

## Features in Admin Panel

### Add Project
- Fill form with project details
- Add technologies (comma separated)
- Add project link and image URL
- Click "Add Project"

### Edit Project
- Click "Edit" on any project
- Modify details
- Click "Update Project"

### Delete Project
- Click "Delete" button
- Confirm deletion

## Firestore Database Schema

```
projects/
├── title: string
├── description: string
├── technologies: array
├── link: string
├── image: string
├── category: string
├── createdAt: timestamp
└── updatedAt: timestamp
```

## Security (Important!)

### Development (Current)
- Firestore in Test Mode
- Anyone can read/write

### Before Production
- Add proper security rules
- Use Firebase Admin SDK for backend
- Only authenticated admins can manage projects

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Firebase not found | Restart dev server after .env.local |
| Login fails | Check admin user exists in Firebase |
| Projects not saving | Ensure Firestore is in Test Mode |
| Google login error | Use localhost for development |

## Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Setup Guide](./FIREBASE_SETUP.md)

---

**That's it!** Your Firebase admin panel is ready! 🚀
