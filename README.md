Give us a ⭐ if you appreciate what we do!

# Öppna skolplattformen

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Patreon](https://img.shields.io/badge/dynamic/json?color=%23e85b46&label=Patreon&query=data.attributes.patron_count&suffix=%20patrons&url=https://www.patreon.com/api/campaigns/6649731)](https://www.patreon.com/oppnaskolplattformen)
![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=skolplattformen)
[![Translation status](https://hosted.weblate.org/widgets/skolplattformen/-/svg-badge.svg)](https://hosted.weblate.org/engage/skolplattformen/)
[![Build Status](https://app.bitrise.io/app/8e56bd02bc602da5/status.svg?token=h8gI2dB_jXLurj9EO_fXWw)](https://app.bitrise.io/app/8e56bd02bc602da5)

We are parents who got fed up with Skolplattformen, the City of Stockholm's school administration platform. \ We reverse-engineered the platform's API to create a simpler, faster, more consistent, and secure experience for parents and guardians.

If you're simply looking for information about the app, our website can be found at [https://skolplattformen.org/](https://skolplattformen.org/). \
Check out [the changelog](CHANGELOG.md) to see what new features are added, and a list of fixed bugs.

This main repository for the project contains the source code for both the [app](apps/skolplattformen-sthlm) and its [website](https://skolplattformen.org/). \
The sources for each can be found under [apps](apps) and [libs](libs).
The respective README files there contain more detailed descriptions.

<img src="apps/website/assets/img/screenshots/screenshot_login.png" width="200"> <img src="apps/website/assets/img/screenshots/screenshot_children.png" width="200">

## Contents

* [Architecture](#architecture)
  * [Apps](#apps)
    * [skolplattformen-sthlm](#skolplattformen-sthlm)
    * [website](#website)
  * [Libs](#embedded-api)
    * [api-skolplattformen](#api-skolplattformen)
    * [curriculum](#curriculum)
    * [hooks](#hooks)
* [Development](#development)
* [Contributions](#contributions)
* [Money](#money)
* [Disclaimer](#disclaimer)
* [Contributors](#contributors)
* [License](#license)

## Architecture

The project consists of several apps and libraries inside [a NX](https://nx.dev/) monorepo.

### Apps 
/apps/ contains the application projects. This is the main entry point for a runnable application. 

#### skolplattformen-sthlm

The central part of the project is the app itself. It is written in [TypeScript](https://www.typescriptlang.org/) using [React Native](https://reactnative.dev/) and [React Native Kitten](https://akveo.github.io/react-native-ui-kitten/).

Our main goal with the app is to make it as fast and easy to use as possible. \
We're starting small, with more features being added over time.

For more information, check out the [source code](apps/skolplattformen-sthlm).

#### website

The code for the website at www.skolplattformen.org. It's built using Next.js.

For more information, check out the [source code](apps/website).
### Libs 

/libs/ contains the library projects. There are many different kinds of libraries, and each library defines its own external API so that boundaries between libraries remain clear.
#### api-skolplattformen

(renamed from embedded-api)

By not having to worry about the complex nature of the official API, the app becomes light-weight. \
It also makes it easier for others to develop their own applications for the Skolplattformen API.

**Pro tip:** If you don't want the API to make requests to the back-end, you can turn on _fake mode_ to return static data instead. \
Do so by logging in using 12121212121212 or 1212121212 as your personal identity number.
Check out the documentation [here](libs/api-skolplattformen).
#### curriculum

Translations of curriculum codes (sv: ämneskoder på schemat) to clear text descriptions
#### hooks

To make it easier to use the the api in the app, we also created a set of React hooks.
Check out the documentation [here](libs/hooks).

## Development

To clone and build the project, you first need to install the required dependencies:
```bash
$ sudo apt install git npm
$ npx lerna bootstrap
```

Clone the repo with
```bash
$ git clone https://github.com/kolplattformen/skolplattformen.git
```

The README files for the [app](apps/skolplattformen-sthlm) and [website](apps/website) contain further instructions.

## Contributions

We want this project to be a citizen movement. If you find something you think needs fixing, we encourage you to do so yourself, and test it out on your machine first. \
Once done, create a _pull request_ where you explain why we should incorporate your fix into the project. \
If you're new to GitHub, there's a number of excellent guides available, such as [this one on forking projects and making pull requests](https://guides.github.com/activities/forking/).

There are many ways to contribute to the project. \
If you don't know how to program and want help, you can [file an issue](https://github.com/kolplattformen/skolplattformen/issues/new) to let us know when something isn't working properly. \
We're super duper happy for both issues and pull requests, and we try to answer all of them as soon as humanly possible.

Another way to contribute is by helping translate Öppna skolplattformen [on Hosted Weblate](https://hosted.weblate.org/engage/skolplattformen/) into a new language, or to improve existing translations.

_Working together leverages available skills and experience in improving the project, ultimately creating the best possible experience_.

## Money

Even if we definitely stand by our claim that libre software doesn't mean gratis, we have now offered it free of charge on both the Apple App Store and on Google Play. With this different model, you can extend your appreciation to all our contributors. Send some köttbullar for the kids through voluntary donations on [https://patreon.com/oppnaskolplattformen](https://patreon.com/oppnaskolplattformen) ❤️.

## Disclaimer

This initiative was started by frustrated parents without any affiliation with the City of Stockholm. \
We just want to find and read newsletters with greater ease, and register sick-leave in a convenient manner.

If you're offended by this initiative, rest assured there is no reason to be — we come in peace.

## Contributors

- [Christian Landgren](https://github.com/irony)
- [Johan Öbrink](https://github.com/JohanObrink)
- [Erik Hellman](https://github.com/ErikHellman)
- [Rickard Natt och Dag](https://github.com/believer)
- [Viktor Sarström](https://github.com/viktorlarsson)
- [Andreas Eriksson](https://github.com/whyer)
- [Kajetan Kazimierczak](https://github.com/kajetan-kazimierczak)
- You?

## License

Öppna skolplattformen is copyright 2020–2021 Not Free Beer AB.

Licensed under the [Apache License, Version 2.0](LICENSE) (the "License"); you may use Öppna skolplattformen in compliance with the License. A copy of the License is included with this repository.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [License](LICENSE) for the specific language governing permissions and limitations under the License.
