# Öppna Skolplattformen App

This is the app for Öppna Skolplattformen

## Get started

### Prerequisites

We use `yarn` as our package manager. To install it run `npm install -g yarn`.

### iOS

To get started using the iOS simulator start by installing the JavaScript
dependencies using

```
$ yarn
```

Next you need to install the [Cocoapods](https://cocoapods.org/) dependencies
for the iOS project

```
$ cd ios
$ pod setup
$ pod install
```

You should now be setup to run the app in the Simulator. Run the `ios` command
in the root of the app.

```
$ yarn ios
```

### Android

Android development requires that you have [Android Studio](https://developer.android.google.cn/studio?hl=en) and relevant build tools installed.

Start by installing JavaScript dependencies using

```
$ yarn
```

Before running the app you should start an emulator from Android Studio. Then
run the following command to start the build

```
$ yarn android
```

## Running tests

```
$ yarn test
```

## TODO

[x] Välj barn
[x] Login
[ ] Anmäl frånvaro
[ ] Settings
