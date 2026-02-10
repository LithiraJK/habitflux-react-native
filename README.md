# HabitFlux

A modern, feature-rich habit tracking application built with React Native and Expo. Track your daily habits, set reminders, view statistics, and build consistent routines with an intuitive and beautiful interface.

## ✨ Features

- 📅 **Daily Habit Tracking** - Track multiple habits and mark them as complete
- 📊 **Statistics & Analytics** - View your progress with detailed statistics and visualizations
- 🔔 **Smart Reminders** - Set custom reminders for each habit
- 🎨 **Custom Categories** - Organize habits with custom categories, icons, and colors
- ⏱️ **Timer Support** - Built-in timer for time-based habits
- 🔥 **Streak Tracking** - Monitor your consistency with streak counters
- 📱 **Cross-Platform** - Works on iOS and Android
- 🌙 **Beautiful UI** - Modern design with smooth animations and transitions
- 🔐 **Secure Authentication** - Firebase authentication with Google Sign-In support

## � Download

### Android APK

Download the latest version of HabitFlux for Android:

[![Download APK](https://img.shields.io/badge/Download-APK-green?style=for-the-badge&logo=android)](https://expo.dev/artifacts/eas/8rV7hkpZXkWbbqpv78hGE4.apk)

**Direct Link:** [HabitFlux.apk](https://expo.dev/artifacts/eas/8rV7hkpZXkWbbqpv78hGE4.apk)

> **Note**: You may need to enable "Install from Unknown Sources" in your Android settings to install the APK.

## �📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Expo CLI** - Will be installed with dependencies
- **Git** - [Download](https://git-scm.com/)

### For Mobile Development:

- **iOS**: macOS with Xcode installed
- **Android**: Android Studio with Android SDK
- **Or**: Expo Go app on your physical device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/LithiraJK/habitflux-react-native.git
cd HabitFlux
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:

- React Native and Expo
- Firebase SDK
- Navigation libraries
- UI components (NativeWind, react-native-svg, etc.)
- Utility libraries (date-fns, zustand, etc.)

### 3. Firebase Configuration

#### 3.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Enable **Authentication** and **Firestore Database**

#### 3.2 Add Firebase to Your App

1. In Firebase Console, click the web icon (</>) to add a web app
2. Register your app and copy the Firebase configuration
3. For Android: Also register an Android app and download `google-services.json`
4. For iOS: Register an iOS app and download `GoogleService-Info.plist`

#### 3.3 Configure Environment Variables

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your Firebase credentials:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_client_id
   ```

#### 3.4 Place Firebase Configuration Files

- **Android**: Place `google-services.json` in `android/app/`
- **iOS**: Place `GoogleService-Info.plist` in the iOS project folder

### 4. Google Sign-In Setup (Optional)

If you want to enable Google Sign-In:

1. In Firebase Console, enable Google as a sign-in provider
2. For Android, add your SHA-1 fingerprint to Firebase project settings
3. Configure the Google Web Client ID in your `.env` file

## 🏃 Running the Application

### Development Mode

Start the Expo development server:

```bash
npx expo start
```

Or use the npm script:

```bash
npm start
```

### Run on Specific Platforms

#### iOS Simulator

```bash
npm run ios
# or
npx expo run:ios
```

#### Android Emulator

```bash
npm run android
# or
npx expo run:android
```

#### Web Browser

```bash
npm run web
# or
npx expo start --web
```

#### Physical Device

1. Install **Expo Go** app on your device
2. Scan the QR code displayed in the terminal
3. The app will open in Expo Go

## 🔧 Additional Commands

```bash
# Run linting
npm run lint

# Clear cache and restart
npx expo start --clear

# Reset project (removes generated files)
npm run reset-project
```

## 📦 Key Dependencies

- **expo** (~54.0.32) - Development platform for React Native
- **react-native** (0.81.5) - Mobile app framework
- **firebase** (^12.8.0) - Backend services for authentication and data storage
- **expo-router** (~6.0.22) - File-based routing for React Native
- **nativewind** (^4.2.1) - Tailwind CSS for React Native
- **zustand** - Lightweight state management
- **date-fns** (^4.1.0) - Modern date utility library
- **react-native-calendars** (^1.1314.0) - Calendar components
- **react-native-svg** (15.12.1) - SVG rendering support
- **expo-notifications** (~0.32.16) - Push notifications
- **react-native-toast-message** (^2.3.3) - Toast notifications

## 📁 Project Structure

```
HabitFlux/
├── app/                      # Application screens and navigation (Expo Router)
│   ├── (auth)/              # Authentication screens
│   │   ├── login.tsx        # Login screen
│   │   └── register.tsx     # Registration screen
│   ├── (drawer)/            # Drawer navigation
│   │   ├── (tabs)/          # Bottom tab navigation
│   │   │   ├── home.tsx     # Home/Dashboard screen
│   │   │   ├── habits.tsx   # Habits list screen
│   │   │   ├── categories.tsx # Categories management
│   │   │   └── timer.tsx    # Timer screen
│   │   └── reminders.tsx    # Reminders screen
│   ├── create-habit/        # Multi-step habit creation
│   │   ├── step1.tsx        # Basic info
│   │   ├── step2.tsx        # Category selection
│   │   ├── step3.tsx        # Frequency setup
│   │   ├── step4.tsx        # Reminder setup
│   │   └── step5.tsx        # Confirmation
│   ├── habit-details/       # Habit details and stats
│   │   ├── [id].tsx         # Habit details screen
│   │   ├── edit.tsx         # Edit habit
│   │   └── stats.tsx        # Statistics screen
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Entry point
├── components/              # Reusable components
│   └── ui/                  # UI components
│       ├── CalendarStrip.tsx
│       ├── CategoryItem.tsx
│       ├── CircularProgress.tsx
│       ├── HabitCard.tsx
│       ├── GlassCard.tsx
│       └── ...
├── constants/               # App constants
│   └── theme.ts            # Theme configuration
├── context/                 # React context providers
│   ├── AuthContext.tsx     # Authentication context
│   └── LoaderContext.tsx   # Loading state context
├── hooks/                   # Custom React hooks
│   ├── useAuth.ts          # Authentication hook
│   └── useLoader.ts        # Loader hook
├── services/                # API and Firebase services
│   ├── firebase.ts         # Firebase configuration
│   ├── authService.ts      # Authentication service
│   ├── habitService.ts     # Habit CRUD operations
│   └── categoryService.ts  # Category management
├── store/                   # Zustand state management
│   ├── useHabitStore.ts    # Habit state
│   ├── useCategoryStore.ts # Category state
│   └── useHabitCreatestore.ts # Habit creation state
├── utils/                   # Utility functions
│   ├── dateHelpers.ts      # Date manipulation helpers
│   └── notifications.ts    # Notification utilities
├── assets/                  # Static assets
│   └── images/             # Image files
├── android/                 # Android native code
├── .env                     # Environment variables (create from .env.example)
├── .env.example             # Environment variables template
├── app.json                 # Expo app configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🔧 Configuration Files

### app.json

Main Expo configuration file containing app metadata, icons, splash screen, and platform-specific settings.

### tailwind.config.js

Tailwind CSS configuration for styling with NativeWind.

### tsconfig.json

TypeScript compiler configuration.

### firebase.ts

Firebase initialization and configuration (uses environment variables).

## 🐛 Troubleshooting

### Common Issues

#### 1. "Module not found" errors

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start --clear
```

#### 2. Firebase initialization errors

- Verify all environment variables in `.env` are correctly set
- Ensure Firebase services (Authentication, Firestore) are enabled in Firebase Console
- Check that `google-services.json` is placed in `android/app/` directory

#### 3. Android build issues

```bash
# Clean Android build
cd android
./gradlew clean
cd ..
npx expo run:android
```

#### 4. iOS build issues

```bash
# Clean iOS build (macOS only)
cd ios
pod install
cd ..
npx expo run:ios
```

#### 5. "Expo Go" not connecting

- Ensure your device and computer are on the same Wi-Fi network
- Try running with tunnel mode: `npx expo start --tunnel`
- Check firewall settings

#### 6. Google Sign-In not working

- Verify Google Sign-In is enabled in Firebase Console
- Ensure `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` is set correctly
- For Android: Add SHA-1 fingerprint to Firebase project

### Debug Mode

Enable debug logging by setting in your development environment:

```bash
npx expo start --dev-client
```

## 🔒 Security Notes

- Never commit `.env` file to version control
- Keep your Firebase API keys secure
- Use Firebase Security Rules to protect your database
- Review and update `google-services.json` permissions

## 📱 Building for Production

### Android APK/AAB

```bash
# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production
```

### iOS IPA

```bash
# Build for TestFlight/App Store
eas build --platform ios --profile production
```

> **Note**: Building for production requires an [Expo Application Services (EAS)](https://expo.dev/eas) account.

## 📝 Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable                                   | Description                  | Required |
| ------------------------------------------ | ---------------------------- | -------- |
| `EXPO_PUBLIC_FIREBASE_API_KEY`             | Firebase API key             | Yes      |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain         | Yes      |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase project ID          | Yes      |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket      | Yes      |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes      |
| `EXPO_PUBLIC_FIREBASE_APP_ID`              | Firebase app ID              | Yes      |
| `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`         | Google OAuth client ID       | Optional |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

Lithira Jayanaka

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- Firebase for backend services
- React Native community for excellent libraries
- All contributors who help improve this project

## 📞 Support

For support, email lithira.jayanaka.official@gmail.com or open an issue in the repository.

---

**Happy Habit Tracking! 🎯**
