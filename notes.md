# Notes

## Paradigmas der webdevelopment

- Single Page Application (SPA)
  - minder (zo min mogelijk) paginarefreshes
  - minder flitsen van contentwissels
  - browser doet veel meer
  - libs/frameworks: Angular Vue React Blazor Svelte Qwik
  - best wel een grote bak met JS naar browser worden gestuurd
  - wordt door hbo-starters als hip gezien
- Server-side rendering (SSR)
  - complementair aan een SPA
  - die initiele pagina renderen
  - op de achtergrond wordt dan alle JS alsnog opgestuurd
    - hydration / partial hydration / streaming hydration
  - wordt door hbo-starters als hip gezien
- Static site generation
  - productcatalogus - bol.com / wehkamp / documentatiewebsites
  - `bol.com/product/auto/28483` - `request => server-side code => backend service => database => HTML-template parsen`
  - tijdens het builden / in je pipeline de hele productcatalogus doorlopen
    - `auto-28483.html`
  - wordt door hbo-starters als hip gezien
- Multi Page Application (MPA)
  - veel paginareload/refreshes
  - elk klikje moet de server moeite doen
  - flits van contentwisselen
  - libraries/frameworks: PHP (Laravel) ASP.NET Core Razor Pages/MVC Java Spring
  - wordt door hbo-starters als niet hip gezien - "dinosaurierwebapp"

## Waarom Angular?

- TypeScript
- SPA
  - rijke webapp: interactieve. best vaak de DOM aan het wijzigen
- meer features
  - Routing
  - Forms (2!)
  - Dependency injection

Angular vs the rest

- ze hebben best wat overlap
- ze proberen hetzelfde probleem op te lossen: de DOM API
  - geen framework? plain HTML/vanilla JS => hoop zelf doen.
  - Document Object Model API
    - leesbaarheid is een dingetje
      ```ts
      document.createElement();
      document.getElementById();
      document.querySelector().setAttribute().classList.add("active");
      ```
    - UI testbaarheid

concurrenten:

- Angular - Google
- React - Meta
- Vue - Evan You - ex-Google
- Svelte - Rich Harris - Vercel
- Solid - Ryan Cavalano - Vercel
- Qwik - Misko Hevery - ex-Google
- Blazor - Microsoft
- Knockout - Steve Sanderson - Microsoft
- Polymer - Google
- Lit - Google

## Project aanmaken

Kan zelf:

- index.html
- server-side libs
  - `tslib`
- client-side libs
  - `@angular/core`
  - `@angular/router`
  - ...
  - `rxjs`
  - `zone.js`
- unittesting
  - `karma` `jasmine` `mocha` `chai` `sinon` `vitest` `jest`
- end-to-end testing
  - `selenium` `cypress` `playwright` `webdriver.io` `testcafe`

Maar handiger/makkelijker is de [@angular/cli](https://www.npmjs.com/package/@angular/cli):

```sh
npm install --global @angular/cli
```

- `ng new <projectnaam>`
- `ng serve`
- `ng build`
- `ng test`
- `ng e2e`
- `ng generate`

## Modern Angular-development

Angular zit momenteel in een nogal lang migratietraject. Maar, een paar moderne keuzes:

- standalone components
- signals in plaats van observables
- unittesten niet meer met Karma/Jasmine, want Karma is deprecated
  - jest (experimental)
  - vitest (experimental) 👍
- end-to-end testen niet meer met Protractor, want deprecated
  - cypress
  - playwright 👍
- zoneless
  - donderdag
- buildtool
  - webpack
    - maakt mogelijk nog een comeback met [rspack](https://rspack.rs/)
  - Vite 👍
    - zie ook [Why Vite](https://vite.dev/guide/why). Snelheid en HMR zijn sterke argumenten.
- styling
  - Tailwind 👍
