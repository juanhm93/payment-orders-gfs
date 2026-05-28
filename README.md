# Payment Orders GFS

Este es un proyecto para gestionar las ordenes de pago, en donde vas a poder ver las ordenes de pago, filtrarlas por estado, buscar por numero de orden, ver el detalle de cada orden y poder paginar las ordenes de pago.

## Requisitos previos

- Node.js 22.13.0 (minimo)
- pnpm 11.1.2

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

### Correr test con [Vitest](https://vitest.dev/)

Para correr los test unitarios, se debe ejecutar el siguiente comando:

```sh
pnpm run test:unit
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

NOTA: Puedes acceder al archivo que maneja el mock up de la API en el archivo `db.json` en la raiz del proyecto.

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

## Correr test unitarios

```
pnpm test:unit
```

## Decisiones de diseño

### Estructura de carpetas

La estructura de carpetas se basa en la estructura de carpetas de Vue 3, en donde se tiene una carpeta de `components` en donde se encuentran carpetas de componente separados por caracteristicas: eje: `cards`, `table`, `global`, una carpeta de `views` en donde se encuentran las vistas de la aplicación.

### Estructura de estilos

Se uso tailwindcss para el diseño de la aplicación, esta decision fue basada en la facilidad e tailwind para el desarrollo con rapidez de elementos sencillos y limpios.

## Paquetes adicionales no solicitados

`vee-validate` para la validacion de formularios, esto se uso para la validacion de los campos de los formularios de creacion y edicion de ordenes de pago.
`yup` para utilizarlo como esquema de validacion para los formularios.
`pnpm` se utilza el manejador de paquetes pnpm para la instalacion de dependencias.

## Decision tecnica acerca de usar pinia

Decidi usar pinia para manejar el estado de la lista de ordernes de pago y de una order en especifico debido a que habia una oportunidad de alimentar la primera carga del estado del detalle de las ordener teniendo las ordenes precargadas, pero aun asi se conserva la posibilidad de recargar la vista y en ese caso obtener la data del detalle a traves de la API. Sin embargo, la implementacion ahorra una peticion a la API y mejora la experiencia de usuario al no tener que esperar a que se cargue la data del detalle de la orden. Por otro lado tambien centralizamos aqui el mantenimiento de los query parameters.

Sin embargo, no fue una decision de usar una cosa o la otra tambien se utilizo manejo de estado local con composables, esto se realiza para las acciones que se podia hacer a las ordenes de pago que era, crear y editar su status en este caso. Esta decision se tomo basado en la intencion de abstraer la logica de validacion de los campos para cada caso, dando como resultado una mejor legibilidad del codigo y una mejor mantenibilidad.

## Pendientes

Modo oscuro, en el enfoque principal era lograr el MVP solicitado por lo cual se dejo esto un poco aislado tomando en cuenta que se aclaraba que no era un requerimiento principal.



<img width="2400" height="2000" alt="ordernes-de-pago-desktop" src="https://github.com/user-attachments/assets/3efb47e8-155b-4c39-a76a-60e218fea601" />
<img width="1442" height="6486" alt="ordenes-de-pago-mobile" src="https://github.com/user-attachments/assets/8fd6308e-1d93-4207-9f8a-303f18ffc0f7" />


