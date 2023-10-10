# Skolplattformen React Native Project

Welcome to this new [**React Native**](https://reactnative.dev) project, initiated using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Pre-requisites

> **Important**: Make sure you have gone through the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) guide up to the "Creating a new application" step before moving forward.

## Initial Setup

### Required Software

1. [Git](https://git-scm.com/)
2. [Node](https://nodejs.org/en/)
3. [NPM](https://docs.npmjs.com/cli/v8/commands/npm-install)

### Minimum Node Version
Ensure you are using Node version 16 or higher.

### Cloning the Repository

```bash
git clone https://github.com/Home-Biz-LLS/skolplattformen-react-native
```

### Installing Dependencies

```bash
cd apps/skolplattformen-app-new/ && npm i
```

---

## Running the App

### For iOS

**Note**: Running the iOS app requires a Mac with native support. Windows/Linux are currently not supported.

#### Essential Guides and Tools

* [Mac OS Setup Guide](https://reactnative.dev/docs/environment-setup)

#### Step-by-Step Instructions

1. **Install Xcode**: Ensure Xcode is installed on your system.

2. **Install CocoaPods**: If not already installed, you can do this easily using Homebrew.
    - [Homebrew Install Guide for CocoaPods](https://formulae.brew.sh/formula/cocoapods)
    - [Official CocoaPods Guide](https://guides.cocoapods.org/using/getting-started.html)

3. **Install Pods**
    ```bash
    cd apps/skolplattformen-app-new/ios && pod install
    ```

#### Running the iOS App


* Option 1: Using Metro Bundler

  ![metro bundler example](/apps/skolplattformen-app-new/docs/assets/MetroBundlerExample.png)
    ```bash
    cd apps/skolplattformen-app-new && npm run start
    ```
    then type
    ```bash
    i
    ```

* Option 2: Running Directly
    ```bash
    npm run ios
    ```

---

### For Android

**Note**: Choose an appropriate guide based on your operating system:

* [Mac OS](/apps/skolplattformen-app-new/docs/android_mac.md)
* [Windows](/apps/skolplattformen-app-new//docs/android_windows.md)
* [Linux](/apps/skolplattformen-app-new//docs/android_linux.md)

#### Running the Android App

* Option 1: Using Metro Bundler

  ![metro bundler example](/apps/skolplattformen-app-new/docs/assets/MetroBundlerExample.png)
    ```bash
    cd apps/skolplattformen-app-new && npm run start
    ```
    then type
    ```bash
    a
    ```

* Option 2: Running Directly
    ```bash
    npm run android
    ```