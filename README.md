# HabitFlux

A modern habit tracking application built with React Native and Expo.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for development)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd HabitFlux
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install required packages

#### Date manipulation library

```bash
npm install date-fns
```

#### State management library

```bash
npx expo install zustand
```



#### SVG rendering support

```bash
npm install react-native-svg
```
-----------------------------------------


## 🏃 Running the Application

Start the development server:

```bash
npx expo start
```

Then press:

- `i` for iOS simulator
- `a` for Android emulator
- Scan the QR code with Expo Go app on your physical device

## 📦 Key Dependencies

- **date-fns** - Modern date utility library for JavaScript
- **react-native-svg** - SVG rendering library for React Native
- **react-native-svg-transformer** - SVG transformer for Metro bundler
- **Firebase** - Backend services for authentication and data storage
- **NativeWind** - Tailwind CSS for React Native

## 📁 Project Structure

```
HabitFlux/
├── app/                    # Application screens and navigation
│   ├── (auth)/            # Authentication screens
│   ├── (dashboard)/       # Main dashboard screens
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   └── ui/               # UI components
├── constants/            # App constants and theme
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── services/             # API and Firebase services
└── assets/               # Images and static assets
```


