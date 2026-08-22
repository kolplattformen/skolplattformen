# Öppna skolplattformen App

This is the app for Öppna skolplattformen, built with Expo.

## Getting started

Have a look at the [overall readme](../../) for general instructions on getting started.

### Prerequisites

We use `yarn` as our package manager. To install it, run `npm install -g yarn`. All the commands described here should be run from the `apps/skolplattformen-app` directory.

You also need the Expo CLI:
```bash
npm install -g expo-cli
```

### Running the app

Start the Expo development server:
```bash
$ yarn start
```

This will open the Expo Dev Tools in your browser. You can then:
- Press `i` to run in iOS simulator
- Press `a` to run in Android emulator
- Scan the QR code with the Expo Go app on your phone

### Building native projects

To generate the native iOS and Android projects:
```bash
$ yarn prebuild
```

This will create `ios/` and `android/` directories. You can then build using Xcode or Android Studio, or use EAS Build.

### iOS

To run directly on iOS simulator:
```bash
$ yarn ios
```

### Android

To run directly on Android emulator:
```bash
$ yarn android
```

## Running tests

```bash
$ yarn test
```
