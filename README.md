# PetCare

Aplicación web demostrativa para una clínica veterinaria, construida con Angular. Presenta servicios, especialidades, ubicaciones, precios referenciales, equipo, formulario de contacto y un asistente conversacional mock. No existe backend y los datos de contacto y algunos textos se identifican como demostrativos.

## Tecnologías

- Angular 17.3.x con componentes standalone y Angular Router.
- TypeScript en modo estricto.
- SCSS responsive.
- Reactive Forms para el formulario de contacto.
- Signals y control flow moderno de Angular (`@if`, `@for`, `@switch`).
- HttpClient para cargar archivos JSON locales.
- RxJS para operaciones asíncronas simuladas.

## Requisitos

- Node.js compatible con Angular 17.3.
- npm.

## Instalación y ejecución

Instala las dependencias del proyecto:

```sh
npm install
```

Inicia el servidor de desarrollo:

```sh
ng serve
```

Abre `http://localhost:4200/`. También puedes iniciar con `npm start`. Si ese puerto está ocupado, Angular puede ofrecer otro puerto.

## Comandos de comprobación

Compilación de producción:

```sh
npm run build
```

Tests unitarios:

```sh
npm test
```

Ejecutar tests una sola vez, sin modo watch:

```sh
npm test -- --watch=false
```

## Estructura

```text
src/app/core/models/          Modelos de datos TypeScript
src/app/core/services/        Acceso a JSON y simulaciones locales
src/app/shared/components/    Navbar, Footer y chatbot flotante
src/app/features/             Páginas lazy-loaded
src/assets/data/              Datos JSON de demostración
src/assets/videos/            Video decorativo del Hero
```

## Rutas

- `/` Inicio: Hero con video local y servicios destacados.
- `/servicios` Catálogo, filtros por categoría y detalle de cada servicio.
- `/especialidades` Especialidades y profesionales relacionados.
- `/ubicaciones` Sedes, horarios e indicaciones.
- `/precios` Tarifas referenciales con filtros.
- `/nosotros` Presentación, principios y equipo veterinario.
- `/contacto` Formulario reactivo e información demostrativa.

Las páginas se cargan mediante `loadComponent` del Angular Router.

## Datos JSON

Los archivos locales se encuentran en `src/assets/data/`:

- `services.json`: catálogo consumido por `DataService`.
- `specialties.json`: especialidades y sus IDs de veterinarios.
- `locations.json`: sedes, datos de contacto, horarios y coordenadas.
- `veterinarians.json`: perfiles del equipo veterinario.
- `pricing.json`: tarifas e inclusiones referenciales.

No se requiere servidor API para consultar estos recursos.

## Formulario y almacenamiento local

El formulario de contacto usa Reactive Forms con validaciones de nombre, correo, teléfono, mensaje y consentimiento. El envío es simulado: `ContactService` espera brevemente y guarda los formularios en `localStorage` bajo la clave `petcare-contact-submissions`. Los datos permanecen en el navegador y no se envían a un servidor. No incluyas información personal real en esta demostración.

## Chatbot

El widget global utiliza `ChatbotService` para responder con mensajes predefinidos después de una breve demora. Algunas respuestas enlazan con las páginas del sitio. No utiliza IA externa, no ofrece orientación médica y no se conecta a un backend.

## Contenido demostrativo

La aplicación no representa una clínica real. Las ubicaciones, precios, credenciales, horarios, contactos e historia son datos de ejemplo. La sección de contacto advierte que el sitio no ofrece atención clínica ni es un canal de emergencias.
