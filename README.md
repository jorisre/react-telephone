<h1 align="center">Welcome to react-telephone ☎️</h1>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<p align="center">
  <a href="https://bundlephobia.com/result?p=react-telephone">
    <img src="https://img.shields.io/bundlephobia/minzip/react-telephone?style=for-the-badge" />
  </a>
  <a href="https://twitter.com/_jorisre" target="_blank">
    <img alt="Twitter: \_jorisre" src="https://img.shields.io/twitter/follow/_jorisre.svg?style=for-the-badge"" />
  </a>
</p>

> ☎️ Tiniest react input phone component (auto formating included) that follow the [E.164 : The international public telecommunication numbering plan](https://www.itu.int/rec/T-REC-E.164-201011-I/en)

### 🏠 [Homepage](react-telephone.joris.re)

### ✨ [Demo](react-telephone.joris)

## Coming soon 🧑🏻‍💻

- [ ] Controlled mode
- [ ] Custom render for `Phone.Country` and `Phone.Number`

## Installation

```sh
yarn add react-telephone
```

or

```sh
npm i react-telephone
```

## Usage

```tsx
import { Phone } from 'react-telephone';

export default function MyComponent() {
  return (
    <Phone>
      <Phone.Country />
      <Phone.Number />
    </Phone>
  );
}
```

## Props

| Prop             | Description                                        |                       Default | Value                                                                    |
| :--------------- | :------------------------------------------------- | ----------------------------: | ------------------------------------------------------------------------ |
| `defaultCountry` | Default country displayed for the country selector | First country _(Afghanistan)_ | Country [ISO2 code](https://en.wikipedia.org/wiki/ISO_3166-2) _(fr, us)_ |

## Author

👤 **Joris**

- Twitter: [@\_jorisre](https://twitter.com/_jorisre)
- Github: [@jorisre](https://github.com/jorisre)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/jorisre/react-telephone/issues). You can also take a look at the [contributing guide](https://github.com/jorisre/react-telephone/blob/master/CONTRIBUTING.md) and [code of conduct](https://github.com/jorisre/react-telephone/blob/master/CODE_OF_CONDUCT.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Joris](https://github.com/jorisre).<br />
This project is [MIT](https://github.com/jorisre/react-telephone/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/Kcazer"><img src="https://avatars.githubusercontent.com/u/609420?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michaël Rézac</b></sub></a><br /><a href="#ideas-Kcazer" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!