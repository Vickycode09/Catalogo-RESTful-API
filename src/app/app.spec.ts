import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
      .compileComponents();
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load and display a Pokémon from the API', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const listRequest = httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    listRequest.flush({
      results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
      count: 1,
      next: null,
      previous: null,
    });

    const detailsRequest = httpTesting.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    detailsRequest.flush({
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      types: [{ type: { name: 'electric' } }],
      abilities: [{ ability: { name: 'static' } }],
      sprites: { front_default: 'https://example.com/pikachu.png' },
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Explora la Pokédex');
    expect(compiled.querySelector('h2')?.textContent).toContain('pikachu');
    expect(compiled.textContent).toContain('0.4 m');
    expect(compiled.textContent).toContain('6.0 kg');
  });

  it('should display an error when the API request fails', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    httpTesting
      .expectOne('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      .flush('Unavailable', { status: 503, statusText: 'Service Unavailable' });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[role="alert"]')?.textContent).toContain(
      'No se pudo obtener la información',
    );
  });
});
