This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Getting started with Development

### Please use node version 16 or higher

To clone and build the project, you first need to install [git](https://git-scm.com/), [node](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/cli/v8/commands/npm-install).

Clone the repo with
```bash
$ git clone https://github.com/Home-Biz-LLS/skolplattformen-react-native
```

Install dependencies
```bash
cd apps/skolplattformen-app-new/ && npm i
```

### iOS

If you wanna run the iOS app, you need to setup a couple of things first, we have a guide that will assist you in getting started with the iOS app. A Mac is required to build projects with native code for iOS so we do not have support for Linux / Windows.

* [Mac OS](https://reactnative.dev/docs/environment-setup)

#### Step 1
Make sure you have **Xcode** installed


#### Step 2
Make sure **CocoaPods** is installed (you can do it easily with homebrew)

* [CocoaPods homebrew](https://formulae.brew.sh/formula/cocoapods)
* [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)


#### Step 3
```bash
cd apps/skolplattformen-app-new/ios && pod install
```

If you already setup everything, go into the 

"skolplattformen-app-new" directory

Start the metro 

```
npm run start
```

then

```
i
```
to Start iOS app

OR

Start the iOS app directly
```
npm run ios
```



### Android

If you wanna run the Android app, you need to setup a couple of things first, we have created three different guides depending on your operating system.

* [Mac OS](/docs/android_mac.md)
* [Windows](/docs/android_windows.md)
* [Linux](/docs/android_linux.md)

If you already setup everything, you just need to run the following command in the project root:

```
yarn run android
```

