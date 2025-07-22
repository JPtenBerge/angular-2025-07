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
- Solid - Ryan Carniato - Vercel
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

## Pipes

Default pipes:

- `currency`
- `uppercase`
  - kan ook met CSS: `text-transform: uppercase;`
- `lowercase`
  - kan ook met CSS: `text-transform: lowercase;`
- `titlecase`
- `date`
- `decimal`
- `json` (debugging)
- `async` (gaan we ~woensdag zien)

## Unittesten

**Unittesten**
- zo klein mogelijk stukje code testen
- hier roep je code aan
- Angular is hier wat fanatieker mee

**Integratietest**
- onderdelen
  - class met class
  - HTML renderen
- hier roep je code aan

**End-to-end test**
- ook wel UI test
- UI-functionaliteit
- hier roep je code NIET aan

Standaard bij Angular:
- Karma: testrunner (al meerdere jaren deprecated)
- Jasmine: testframework mocken jasmine.createSpyObj()

alternatieven:
- Jest - experimental support sinds Angular v16
- Vitest - experimental support sinds Angular v20
- ongeacht je testrunner kun je er ook voor kiezen om je component te renderen met @testing-library
  - doen React, Svelte, Vue, ... ook!

### Vitest

1. Installeren:
   ```sh
   npm install vitest jsdom
   ```
2. `angular.json`:
   ```json
   {
     ...
     "test": {
       "builder": "@angular/build:unit-test",
       "options": {
         "tsConfig": "tsconfig.spec.json",
         "runner": "vitest",
         "buildTarget": "::development"
       }
     }
   }
   ```
3. [Handige extensie](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)

Handige blogposts/docs:

- https://angular.dev/guide/testing/unit-tests
- https://timdeschryver.dev/blog/angular-testing-library-with-vitest
- https://dev.to/brandontroberts/faster-testing-with-angular-and-vitest-274n

Deze laatste twee zijn vooral ter inspiratie en cherrypicken van handige zaken. Beide artikelen zijn geschreven voordat Angular officieel met Vitest-ondersteuning kwam.

### TDD: Test-driven development

Eerst test, dan logica

1. Schrijf een test
2. Run de test en zie dat hij faalt
3. Implementeer
4. Run de test en zie dat hij slaagt
5. Refactor

Repeat. Ook wel: RED-GREEN-REFACTOR

waarom?
- goed uitdenken van implemenetatie
- meer/betere dekking van code
- beter met deadlines omgaan, kwaliteit niet zomaar laten sneuvelen
- lastig: onbekende architectuur

## How to clone an object?

```ts
// ES6
let clone1 = { ...this.newAnimal }; // prima voor strings bool numbers  - arrays/objects worden gewoon bij ref overgenomen! "shallow clone"
let clone2 = structuredClone(this.newAnimal); // strings bool numbers arrays/objects alles clone. "deep clone"
```

## Template-driven forms

Je binding object initializeren:

```ts
export class App {
  newAnimal: Animal = { id: 0, maxAge: 0, photoUrl: "", species: "" }; // kan beetje irritant worden
  newAnimal = {} as Animal; // is niet iedereen fan van
  newAnimal = createAnimal(); // vaak het "schoonst". en kan hergebruikt worden voor testdata bij unittesten
}
```

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
- change detection `OnPush`
- buildtool
  - webpack
    - maakt mogelijk nog een comeback met [rspack](https://rspack.rs/)
  - Vite 👍
    - zie ook [Why Vite](https://vite.dev/guide/why). Snelheid en HMR zijn sterke argumenten.
- styling
  - Tailwind 👍
