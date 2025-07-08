# SmartTraffic AI - Local Setup Instructions

## Prerequisites

1. **Node.js** (version 18 or higher)
2. **npm** or **yarn**
3. **Expo CLI**: `npm install -g @expo/cli`
4. **Git** (optional, for version control)

## Setup Steps

### 1. Create New Expo Project

```bash
npx create-expo-app SmartTrafficAI --template blank-typescript
cd SmartTrafficAI
```

### 2. Install Dependencies

```bash
npm install @expo-google-fonts/inter @expo-google-fonts/roboto @expo/vector-icons @lucide/lab @react-native-async-storage/async-storage @react-navigation/bottom-tabs @react-navigation/native expo-blur expo-camera expo-constants expo-font expo-haptics expo-linear-gradient expo-linking expo-location expo-router expo-splash-screen expo-status-bar expo-symbols expo-system-ui expo-web-browser lucide-react-native react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg react-native-url-polyfill react-native-web react-native-webview
```

### 3. Configure app.json

Update your `app.json` with the configuration from the project files.

### 4. Set up File Structure

Create the following directory structure:
```
app/
├── _layout.tsx
├── +not-found.tsx
└── (tabs)/
    ├── _layout.tsx
    ├── index.tsx
    ├── navigation.tsx
    ├── reports.tsx
    ├── weather.tsx
    └── settings.tsx
constants/
├── Colors.ts
contexts/
├── ThemeContext.tsx
hooks/
├── useColors.ts
├── useFrameworkReady.ts
```

### 5. Copy File Contents

Copy the contents of each file from the Bolt project into the corresponding files in your local project.

### 6. Start Development Server

```bash
npm run dev
```

## Platform-Specific Notes

- **Web**: The app is optimized for web by default
- **iOS/Android**: Use Expo Go app for testing on mobile devices
- **Production**: Use `expo build` for production builds

## Environment Variables

Create a `.env` file in the root directory for any API keys or configuration:

```
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_WEATHER_API_KEY=your_weather_api_key
```

## Next Steps

1. **Test the app** on web and mobile
2. **Integrate real APIs** for weather, traffic, and navigation
3. **Add authentication** if needed
4. **Configure push notifications**
5. **Set up analytics** and crash reporting

## Troubleshooting

- **Metro bundler issues**: Clear cache with `npx expo start --clear`
- **Font loading issues**: Ensure fonts are properly imported and loaded
- **Navigation issues**: Check that all route files are properly configured
- **Platform-specific errors**: Use `Platform.select()` for platform-specific code

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://expo.github.io/router/)