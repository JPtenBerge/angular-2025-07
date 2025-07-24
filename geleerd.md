# Geleerd

## Dinsdagochtend

- Angular is gemaakt door Google
- Vitest
  - Testing
  - Nieuwer dus beter?
  - Karma: deprecated
  - Jest: ouderwetser. import {} niet ondersteunt. TypeScript geen native ondersteuning voor.
  - Vite + Vitest
  - describe() it() expect()
  - weinig documentatie. je loopt nog wel eens tegen dingen aan.
  - integration testing door de HTML de renderen: @testing-library

- RED-GREEN-REFACTOR
  - Unittesting. Test-driven development

- Forms
  - Alles in HTML - template-driven
    - herkenbaar aan [(ngModel)]="..."
	<button [disabled]="...">
	<input [value]="item.name" (input)="handleInputChange()">
  - Niet alles in HTML - reactive forms (model-driven)

- Pipes: data formatten   {{bla | dinges}}

- Databinding
  - input() en input.required() - signal   <app-autocompleter [data]="..." />
  - @if (someBoolean) {}
    - beter dan *ngIf want leesbaarder. TypeScript kan beter bepalen wat het type is. @if (typeof var === 'number') {}
  - @for (ding of dingen; track ding)

- Paradigmas: SPA, MPA, SSG, SSR
  - SSG: heul veul .html-bestandjes genereren

## Woensdagochtend

- Components
  - Opsplitsen / structureren
  - communicatie tussen parent/child:
    - input() output()   <app-child [data]="..." (customEvent)="..." />
    - 

export class Parent {
	child = viewChild(AppChild);

	...() {
		this.child().doe();
	}
}

- Dependency injection
  - inject() en @Inject() of via constructor
  - @Injectable({ providedIn: 'root' })
    - daarmee niet meer in config
      - ongebruikt === niet meer in productiebundle
  - lifetime? singleton

- json-server
  - dummy data
  - fake REST API

- navigation met @angular/router
  - <a href=".."> functioneel werkt het, maar is niet echt een SPA, want reloads
  - <a routerLink="...">   imports: []  geen error
  - routes.ts om routes te definieren
  - <router-outlet />   <== app.html 

export const routes: Routes = [
	{ path: '/start', component: Start }
];

- Backendcommunicatie met HttpClient
  - .get<Product[]>(), .post()
    - this.http.get<...>('api/product').subscribe(products => { })  Observable Reactive Extensions for JavaScript
  - .then() Promise  <== native aanwezig in de browser
  - veelgebruikte manier
  - voordelen ten opzichte van fetch()/XMLHttpRequest:
    - JSON parsen
    - interceptors
    - beetje meer typesafety
  - nadelen:
    - dependency op RxJS - grotere bundle
    - checkt dus niet of data echt is wat er verwacht wordt
    - isLoading isPosting
  - nog meer rijkere library: David Tanner - TanStack Query (React/Vue/Svelte)
    
- Testing
  - Vitest: dat het met ng test wel werkt, maar met de extensie niet.
    - whoo experimental!

## Donderdagochtend

- ja
- een hoop
- Observables
  - kan erop .subscribe()
    - opruimen! .unsubscribe()
    - takeUntil() met DestroyRef ipv fancy destroyMixin()
  - read-only
  - "stream van data" getalletjes tekstjes authentication state geselecteerde product intervals clicks
- Subject
  - read/write met .next()
  - BehaviorSubject: laatste state/laatst geemitte value
  - ReplaySubject: configureerbaar hoeveel geschiedenis hij vast moet houden
	new BehaviorSubject('hoi')
	new ReplaySubject(1)
- Directives
  - custom logica aanroepen bij een element
  - elementen/component uitbreiden
  - @Directive() @HostListener
  - konden een inputwaarde meegeven  <div fancy="red">
- Reactive forms
  - FormGroup .ts
  - FormControl
  - FormArray
  - form.reset() leeg
  - this.form.value heel veel | null | undefined
  - this.form.getRawValue()
    - nullables eruit: { nonNullable: true }
- nadelen Zoneless
  - data ophaalt => async proces
  - cdr.markForCheck() of | async



Zone.js / Zoneless
- browser monkeypatchen
- ~50kb
- magie - magie debuggen
- impliciet expliciet

setTimeout
setInterval
fetch
XHR









