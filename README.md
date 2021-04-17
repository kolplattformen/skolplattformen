# Skolplattformen.org

[Öppna skolplattformen](https://skolplattformen.org/) is an attempt at reverse-engineering Skolplattformen to create a faster, more consistent, and secure experience.

![Login screen](packages/site/assets/img/screenshots/screenshot_login.png)

## Architecture

The project consists of two main parts: the _app_ and the _embedded API_.

### App

The central part of the project is the app itself. It's written in [TypeScript](https://typescriptlang.org) using [React Native](https://reactnative.dev/) and [React Native Kitten](https://akveo.github.io/react-native-ui-kitten/).

Our goal with the app is to make it as fast and easy to use as possible. We're starting small, with more features being added over time.

For more information, check out the [source code](packages/app).

**Pro tip:** If you don't want the API to make requests to the backend, you can enable _fake mode_ to return static data instead. To enable fake mode, log in using any of the following personal numbers:

- 12121212121212
- 1212121212

### Embedded API

We first tried to create a proxy for the API. That was a bad idea. Even if the proxy wouldn't save any information it would still have introduced extra complexity.

Instead, we decided to encapsulate our API into its own npm package. By not having to worry about the complex nature of the official API, the app becomes light-weight.

For more information on the embedded API, refer to the [project page](https://github.com/kolplattformen/embedded-api).

> **Note:** To make it easier to use the embedded API in the app, we also created a [set of React hooks](https://github.com/kolplattformen/api-hooks).

## Website

The official site for the project is [https://skolplattformen.org](https://skolplattformen.org).

The source code for the site is available under [packages/site](packages/site).

## Development

To build the project yourself, you first need to install the required dependencies:

```bash
npx lerna bootstrap
```

Once all the dependencies are installed, refer to the README in each package for further instructions.

## Contributions

We want this project to become a citizen movement. If you find something you think needs to be fixed, we encourage you to fix the problem yourself and test it out on your machine first. When you're done, create a _pull request_ where you explain why we should incorporate your fix into the project.

We believe that by working together, we can leverage each other's skills and experiences to improve the project, and ultimately create a better experience, faster.

There are many ways to contribute to the project. If you don't know how to program and still want to help, you can also [file an issue](https://github.com/kolplattformen/skolplattformen/issues/new) to let us know if something isn't working properly.

We're super duper happy for both issues and pull requests and we try to answer all of them as soon as humanly possible.

## Money

We're an open source project and we still charge money for our app. Isn't this a contradiction? No. Open doesn't mean free. We want to continue to maintain this project in a sustainable way, which means that someone needs to pay for the köttbullar for the kids. Our goal is to be able to reimburse all contributions to the project.

## Disclaimer

This initiative was started by frustrated parents with no affiliation with Stockholm Stad. We just want to find and read our newsletters a little bit easier, and register sick-leave a little more conveniently.

If you're offended by this initiative, please don't be—we come in peace.

## Contributors

- [Christian Landgren](https://github.com/irony)
- [Johan Öbrink](https://github.com/JohanObrink)
- [Erik Hellman](https://github.com/ErikHellman)
- [Rickard Natt och Dag](https://github.com/believer)
- [Viktor Sarström](https://github.com/viktorlarsson)
- [Andreas Eriksson](https://github.com/whyer)
- You?

## License

[Apache 2.0](LICENSE)
