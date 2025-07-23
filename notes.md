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
- Jasmine: testframework mocken `jasmine.createSpyObj()`
  - [ng-mocks](https://www.npmjs.com/package/ng-mocks) is ook waardevol om makkelijk/snel te mocken. Niet alleen services, ook subcomponenten.
    - Grootste nadeel van ng-mocks is dat het wel meegaat met Angular-versies, maar meerdere nieuwe zaken hebben nauwelijks/geen aandacht gekregen. Denk Vitest, maar ook signals

alternatieven:

- Jest - experimental support sinds Angular v16
- Vitest - experimental support sinds Angular v20
- ongeacht je testrunner kun je er ook voor kiezen om je component te renderen met [@testing-library](https://testing-library.com/docs/angular-testing-library/intro)
  - doen React, Svelte, Vue, ... ook!

Ervaring tot nu toe:

- Karma/Jasmine met ng-mocks werkt behoorlijk stabiel. Maar Karma is al jaren deprecated.
- Vitest als runner werkt helemaal prima middels `ng test`, maar [via VS Code-extensie kost wat meer moeite](https://dev.to/imasserano/how-to-use-angular-20-experimental-vitest-support-outside-of-ng-test-2i66).
- @testing-library met user-events zeer fijn om het renderen en vanaf een gebruikersperspectief te tikken/klikken/interacteren

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

- goed uitdenken van implementatie
- meer/betere dekking van code
- beter met deadlines omgaan, kwaliteit niet zomaar laten sneuvelen
- lastig: onbekende architectuur

## How to clone an object?

```ts
// ES6
let clone1 = { ...this.newAnimal }; // prima voor strings bool numbers  - arrays/objects worden gewoon bij ref overgenomen! "shallow clone"
let clone2 = structuredClone(this.newAnimal); // strings bool numbers arrays/objects alles clone. "deep clone"
```

## Forms

- template-driven forms
  - hier staat alles in je HTML
  - herkenbaar aan `[(ngModel)]`
- reactive forms
  - formdefinitie staat in TypeScript

### Template-driven forms

Je binding object initializeren:

```ts
export class App {
  newAnimal: Animal = { id: 0, maxAge: 0, photoUrl: "", species: "" }; // kan beetje irritant worden
  newAnimal = {} as Animal; // is niet iedereen fan van
  newAnimal = createAnimal(); // vaak het "schoonst". en kan hergebruikt worden voor testdata bij unittesten
}
```

### Reactive forms

welk is beter? *ik vind* reactive forms fijner.

- unittesten is met reactive makkelijker.
  - dit argument valt grotendeels weg als je @testing-library sowieso al je template rendert
- custom validators zijn makkelijker
  - gewoon een functie bij reactive. een directive bij template-driven, klein drempeltje

## Dependency injection

- injecteren van afhankelijkheden
- kan via:
  - `constructor`
  - `inject()` <== nieuwer sinds Angular v~14
    - Angular wordt steeds functioneler. Minder classes, meer functies. `inject()` werkt in die gevallen keurig.
- singleton
- soorten services
  - functionele service: NavigateService converteren berekenen
  - DAL
  - ...

## Backendcommunicatie

- native het werk van `fetch()` en `XMLHttpRequest`
- `fetch()`
  - gooit weinig/geen errors. `response.status`
  - parset JSON niet automatisch: `fetch('api/product').then(x => x.json())`
    - en moet je zelf typen om typesafe in TypeScript te kunnen gebruiken
  - interceptors voor bijv. JWTs mee te sturen met een request of om alle datums te parsen naar `Date`-instanties bij JSON-responses

Angular biedt een `HttpClient`, prima ding, werkt wel met `Observable` en dus met RxJS. Met modern Angular-development is dat niet verboden, maar signals hebben wel de voorkeur. Kijk ook eens naar iets als [TanStack Query](https://tanstack.com/query/latest/docs/framework/angular/overview) die volledig signal-based is, maar ook toffe extra features heeft:

- automatisch retry bij GET-requests
- refetchen van data bij window refocus
- loading state indicatoren
- query caching / invalidation

## Zone.js

> it's like open-heart surgery on the browser

Zone.js wrapt native async functies om te detecteren dat er async processen worden gestart/bezig zijn:

```ts
let originalTimeout = window.setTimeout;
window.setTimeout = (callback, ms) => {
  originalTimeout(() => {
    callback();
    updateAllDatabindings();
  }, ms);
};
```

Initieel was ik daar geen fan van, native zaken overschrijven was nooit heel fijn:

```ts
undefined = 'hoi';
if (bla === undefined) // bla === 'hoi'
```

Maar Zone.js heeft nooit bugs geintroduceerd of iets dergelijks. Grootste nadelen wel:

- ~50kb in je bundle
- bij grotere projecten kan het wat magisch zijn hoe/wanneer een waarde verandert
  - en wanneer die magie op een gegeven moment niet meer werkt, moet men de magie debuggen. Da's meestal niet fijn.

## Routing

- `/anderepagina`
- SPA: niet van `index.html` wegnavigeren

Switchen naar pagina's/views mogelijkheden:

1. alle 300 pagina's in-memory bewaren
   - Angular's default
2. alle 300 pagina's in HTML wegschrijven, waarvan 1 actief en 299 `display: none;`
3. lazy loading

Stappenplan:

1. `<router-outlet />`
2. routes definieren
3. content verdelen <== meeste werk





## Modern Angular-development

Angular zit momenteel in een nogal lang migratietraject. Maar, een paar moderne keuzes:

- standalone components
- signals in plaats van observables
  - built-in modules: `HttpClient` / `RouterModule`
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
