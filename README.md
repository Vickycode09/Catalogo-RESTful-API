# CatalogoApi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.3.0.

## API seleccionada: PokéAPI

Se eligió [PokéAPI](https://pokeapi.co/) para construir un catálogo con los primeros 20 Pokémon.
Antes de programar se inspeccionó en el navegador la respuesta JSON de
[`/pokemon/pikachu`](https://pokeapi.co/api/v2/pokemon/pikachu). Es un objeto que incluye datos
simples como `id`, `name`, `height` y `weight`, además de listas y objetos anidados para `types`,
`abilities` y `sprites`.

El endpoint de colección devuelve `count`, `next`, `previous` y `results`; cada resultado de la
lista contiene `name` y `url`. La respuesta individual se consulta para mostrar los detalles.

### Endpoints utilizados

- `GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`: devuelve la primera página en
  `results`; cada elemento contiene `name` y `url` para consultar sus detalles.
- `GET https://pokeapi.co/api/v2/pokemon/{id-o-nombre}`: obtiene los detalles de cada Pokémon
  (por ejemplo, `/pokemon/pikachu`).

### Campos mostrados

- `id` y `name`: número y nombre.
- `sprites.front_default`: imagen frontal.
- `types[].type.name`: tipo principal.
- `abilities[].ability.name`: habilidades.
- `height` y `weight`: se convierten de decímetros a metros y de hectogramos a kilogramos,
  respectivamente.

  La aplicación separa la consulta en `ApiService`, el estado de carga/error y la lista en
  `Lista`, y la presentación de cada Pokémon en `Tarjeta`.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
