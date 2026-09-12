# Firebase Admin Login & Project Management Setup

## ✅ What's Implemented

### 1. **Firebase Authentication**
- Email/Password login with Firebase
- Google Sign-in with Firebase
- Automatic token management
- User session handling

### 2. **Project Management Dashboard**
- ✅ Add new projects directly from admin panel
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ View all projects with thumbnails
- ✅ Organize projects by category (Web, Mobile, Design)
- ✅ Add technologies/tech stack per project
- ✅ Store project links and images

### 3. **Firestore Database**
- Projects collection for storing all project data
- Real-time updates
- Automatic timestamps

## 🚀 Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project" or use existing one
3. Project name: "RakshitRaj" (or your choice)
4. Accept defaults and click "Create project"

### Step 2: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
   - Click "Email/Password"
   - Toggle "Enable" ON
   - Save
3. Enable **Google**
   - Click "Google"
   - Toggle "Enable" ON
   - Select your project support email
   - Save

### Step 3: Create Firestore Database

1. Go to **Firestore Database** in Firebase Console
2. Click "Create Database"
3. Choose location closest to you
4. Start in **Test Mode** (for development only!)
   - Rules: Anyone can read/write
   - Click "Create"

### Step 4: Get Firebase Config

1. Go to **Project Settings** (⚙️ icon)
2. Scroll to "Your apps" section
3. Click on Web app (if doesn't exist, click "Add app" > Web)
4. Copy the configuration object:
   ```
   {
     "apiKey": "...",
     "authDomain": "...",
     "projectId": "...",
     "storageBucket": "...",
     "messagingSenderId": "...",
     "appId": "..."
   }
   ```

### Step 5: Create .env.local File

1. Create a file `.env.local` in your project root (same level as package.json)
2. Copy `.env.example` as template
3. Paste your Firebase config values:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 6: Create Admin User

1. In Firebase Console, go to **Authentication** > **Users**
2. Click "Add user"
3. Enter:
   - Email: `admin@example.com` (or your email)
   - Password: `admin123456` (at least 6 characters)
4. Click "Add user"

### Step 7: Test It Out

```bash
npm run dev
# Visit http://localhost:5173/admin
# Login with:
# Email: admin@example.com
# Password: admin123456
```

## 📁 File Structure

```
src/
├── admin/
│   ├── AdminLogin.jsx          (Firebase auth login)
│   ├── AdminDashboard.jsx      (Project management)
│   └── ProtectedRoute.jsx      (Route protection)
├── config/
│   └── firebase.js             (Firebase initialization)
└── App.jsx                     (Updated with routes)
```

## 🔐 Important Security Notes

### Development Mode (Current Setup)

⚠️ **Test Mode** Firestore rules allow anyone to read/write:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Production Mode

Before deploying, update Firestore rules to restrict access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{document=**} {
      // Only authenticated admins can read/write
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

Then add custom claims to admin users via Firebase Admin SDK or custom claims in your backend.

## ✨ Features Explained

### Adding Projects

1. Click "Add New Project"
2. Fill in:
   - **Title**: Project name
   - **Description**: What the project does
   - **Technologies**: Skills used (e.g., React, Firebase, Tailwind)
   - **Project Link**: URL to live project or GitHub
   - **Image URL**: Link to project screenshot/thumbnail
   - **Category**: Type of project
3. Click "Add Project"
4. Project appears instantly in the list

### Editing Projects

1. Click "Edit" button on any project card
2. Form pre-fills with existing data
3. Make changes
4. Click "Update Project"

### Deleting Projects

1. Click "Delete" button on any project card
2. Confirm deletion
3. Project removed from Firestore

## 🔗 Database Schema

### Projects Collection

```json
{
  "title": "Portfolio Website",
  "description": "Personal portfolio built with React",
  "technologies": ["React", "Firebase", "Tailwind CSS"],
  "link": "https://example.com",
  "image": "https://example.com/image.jpg",
  "category": "web",
  "createdAt": "2026-04-30T10:00:00Z",
  "updatedAt": "2026-04-30T10:00:00Z"
}
```

## 🚨 Troubleshooting

### Issue: "Firebase is not defined"
- Make sure `.env.local` has correct Firebase config
- Restart dev server after adding .env.local

### Issue: "User not found" or "Wrong password"
- Check you created the admin user in Firebase Console
- Verify email and password are correct

### Issue: "Permission denied" when adding projects
- Check Firestore is in **Test Mode**
- Ensure you're logged in as authenticated user

### Issue: Projects not showing up
- Check browser console for errors
- Verify Firestore database exists
- Make sure you're authenticated

### Issue: Google login not working
- Google requires HTTPS in production
- For localhost, it should work fine
- Check browser console for specific error

## 📱 Next Steps

1. ✅ Setup Firebase (follow steps above)
2. ✅ Create admin user
3. ✅ Test login and add projects
4. ✅ Customize project fields if needed
5. ✅ Display projects on main portfolio page
6. ✅ Setup proper Firestore security rules before production

## 🎯 Integrating with Portfolio

To display projects on your main portfolio:

1. Create a new component `src/components/ProjectsSection.jsx`
2. Fetch projects from Firestore
3. Display them beautifully
4. Filter by category if needed

Example:
```jsx
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

// Fetch projects
const projectsRef = collection(db, 'projects');
const snapshot = await getDocs(projectsRef);
const projects = snapshot.docs.map(doc => doc.data());
```

## 💡 Pro Tips

- Use Firebase Storage for images instead of URLs (more reliable)
- Add thumbnail generation for project images
- Create categories or tags for better organization
- Add view count or featured status to projects
- Use Firebase Analytics to track admin actions

## 📚 Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [React Firebase Integration](https://www.firebase.com/docs/web/libraries/react/)

---

**You're all set!** Start managing your projects from the admin panel! 🎉
