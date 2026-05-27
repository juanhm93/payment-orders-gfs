# Payment Orders GFS

Este es un proyecto para gestionar las ordenes de pago

## IDE Recomendado

[VSCode](https://code.visualstudio.com/).

## Configuracion del proyecto

```sh
pnpm install
```

### Compilar y hacer Hot-Reload para desarrollo

```sh
pnpm run dev
```

### Compilar y Minimizar para produccion

```sh
pnpm run build
```

### Correr test con [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint con [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Configuracion de API con json-server

### Instalar json-server

Para poder correr el proyecto, es necesario tener una API de prueba, para esto se utiliza json-server, el cual se instala de manera global con el siguiente comando:

```sh
pnpm install -g json-server
```

### Correr el servidor de desarrollo

Para correr el servidor de desarrollo, se debe ejecutar el siguiente comando:

```sh
json-server -d 2000 db.json
```

Esta es una segunda opcion para no instalar de manera global, se puede ejecutar con el siguiente comando:

```sh
npx run json-server
```

Esta es el mismo comando, con un delay de 2 segundos para simular una API real y poder apreciar el estado de carga.

```sh
npx json-server -d 2000 db.json
```

NOTA: Si no levantas el server se puede ver el estatus de error, pero si lo levantas se puede ver el estatus de carga y exito.

## Decision tecnica acerca de usar pinia

Decidi usar pinia para manejar el estado de la lista de ordernes de pago y de una order en especifico debido a que habia una oportunidad de alimentar la primera carga del estado del detalle de las ordener teniendo las ordenes precargadas, pero aun asi se conserva la posibilidad de recargar la vista y en ese caso obtener la data del detalle a traves de la API. Sin embargo, la implementacion ahorra una peticion a la API y mejora la experiencia de usuario al no tener que esperar a que se cargue la data del detalle de la orden. Por otro lado tambien centralizamos aqui el mantenimiento de los query parameters.

Sin embargo, no fue una decision de usar una cosa o la otra tambien se utilizo manejo de estado local con composables, esto se realiza para las acciones que se podia hacer a las ordenes de pago que era, crear y editar su status en este caso. Esta decision se tomo basado en la intencion de abstraer la logica de validacion de los campos para cada caso, dando como resultado una mejor legibilidad del codigo y una mejor mantenibilidad.
