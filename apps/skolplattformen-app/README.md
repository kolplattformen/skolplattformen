# Öppna skolplattformen App

This is the app for Öppna skolplattformen.

## Getting started

Have a look at the [overall readme](../../) for general instructions on getting started.

### Prerequisites

We use `yarn` as our package manager. To install it, run `sudo npm install -g yarn`. All the commands described here should be run from the `apps/skolplattformen-app` directory.

### iOS

To get started using the iOS simulator start by installing the JavaScript
dependencies using

```bash
$ yarn
```

Next you need to install the [Cocoapods](https://cocoapods.org/) dependencies
for the iOS project

```bash
$ cd ios
$ pod setup
$ pod install
```

You should now be setup to run the app in the Simulator. Run the `ios` command
in the root of the app.

```bash
$ yarn ios
```

If you receive an error regarding not being able to find the app scheme:

- Open the app in xcode
- Product -> scheme -> manage scheme
- App should be ticked with the value of 'app project'
- Change 'app project' to something else from its drop down and back again
- Close

Then run yarn ios again

### Android

Android development requires that you have [Android Studio](https://developer.android.com/studio) and relevant build tools installed.

Start by installing JavaScript dependencies using

```bash
$ yarn
```

Before running the app you should start an emulator from Android Studio. Then
run the following command to start the build

```bash
$ yarn android
```

## Running tests

```bash
$ yarn test
```
