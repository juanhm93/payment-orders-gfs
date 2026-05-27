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
