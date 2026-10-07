# 📋 Instrucciones para GitHub Copilot - Proyecto Veterinaria "PetCare"

## 🎯 Objetivo General
Crear una aplicación web completa para una clínica veterinaria llamada **PetCare** usando **Angular 22** (standalone components) con datos simulados desde archivos **JSON** (sin backend real por ahora). La aplicación debe ser moderna, responsive y con una excelente experiencia de usuario.

---

## 🏗️ Stack Tecnológico

- **Framework:** Angular 22+ (Standalone Components, nueva sintaxis de control flow `@if`, `@for`, `@switch`)
- **Lenguaje:** TypeScript (strict mode)
- **Estilos:** SCSS + Angular Material (o TailwindCSS si se prefiere)
- **Estado:** Signals de Angular para manejo de estado reactivo
- **Routing:** Angular Router con lazy loading
- **Formularios:** Reactive Forms con validaciones
- **HTTP:** HttpClient para leer archivos JSON locales
- **Animaciones:** Angular Animations
- **Iconos:** Angular Material Icons o Font Awesome

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   ├── service.model.ts
│   │   │   ├── specialty.model.ts
│   │   │   ├── location.model.ts
│   │   │   ├── contact.model.ts
│   │   │   └── veterinarian.model.ts
│   │   ├── services/
│   │   │   ├── data.service.ts
│   │   │   └── chatbot.service.ts (placeholder)
│   │   └── interceptors/
│   ├── shared/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── footer/
│   │   │   ├── card/
│   │   │   └── loader/
│   │   └── pipes/
│   ├── features/
│   │   ├── home/
│   │   ├── services/
│   │   ├── specialties/
│   │   ├── locations/
│   │   ├── pricing/
│   │   ├── about/
│   │   ├── contact/
│   │   └── chatbot/
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   ├── data/
│   │   ├── services.json
│   │   ├── specialties.json
│   │   ├── locations.json
│   │   ├── veterinarians.json
│   │   └── pricing.json
│   ├── videos/
│   │   └── hero-animals.mp4
│   └── images/
│       └── (imágenes de servicios, veterinarios, etc.)
```

---

## 🎨 Secciones de la Página Web

### 1. **Navbar (Sticky)**
- Logo de la veterinaria (ícono de huella + nombre "PetCare")
- Links: Inicio, Servicios, Especialidades, Ubicaciones, Precios, Nosotros, Contacto
- Botón CTA: "Agendar Cita" (color primario)
- Menú hamburguesa responsive para móvil
- Cambio de estilo al hacer scroll (transparente → sólido)

### 2. **Hero Section (Portada)**
- **Video de fondo** en loop, muted, autoplay, con overlay oscuro
- Video: animales (perros, gatos) siendo atendidos o jugando
- Título llamativo: "Cuidamos a tu mejor amigo como si fuera nuestro"
- Subtítulo descriptivo
- 2 botones: "Nuestros Servicios" y "Contactar"
- Indicador de scroll hacia abajo animado

### 3. **Servicios (Cards)**
- Grid responsive de cards (3 columnas desktop, 1 móvil)
- Cada card incluye:
  - Ícono o imagen representativa
  - Título del servicio
  - Descripción corta
  - Precio desde (ej: "Desde $25")
  - Duración estimada
  - Botón "Más información" → abre modal o navega a detalle
- Efecto hover con elevación y transición suave
- Servicios sugeridos:
  - Consulta General
  - Vacunación
  - Cirugía
  - Odontología
  - Peluquería y Estética
  - Laboratorio Clínico
  - Radiología
  - Emergencias 24/7
  - Hospitalización

### 4. **Especialidades**
- Sección con tabs o cards horizontales
- Especialidades: Medicina General, Cirugía, Dermatología, Oftalmología, Cardiología, Oncología, Nutrición, Comportamiento
- Cada especialidad con descripción, ícono y veterinario asignado
- Foto del especialista con nombre y credenciales

### 5. **Ubicaciones**
- Mapa embebido (Google Maps iframe o Leaflet) - puede ser placeholder
- Lista de sucursales con:
  - Nombre de la sede
  - Dirección completa
  - Teléfono
  - Horarios (L-V, Sáb, Dom)
  - Botón "Cómo llegar"
- Cards con imagen de la fachada

### 6. **Precios / Tarifas**
- Tabla comparativa de planes o lista de precios
- Filtros por categoría (Consulta, Cirugía, Estética, etc.)
- Columnas: Servicio, Precio, Duración, Incluye

### 7. **Nosotros / Equipo**
- Historia de la veterinaria
- Misión, visión, valores
- Grid del equipo veterinario con fotos, nombres, especialidad

### 8. **Testimonios** (extra)
- Carrusel de testimonios de clientes
- Rating con estrellas

### 9. **Formulario de Contacto**
- Campos:
  - Nombre completo (requerido, min 3)
  - Email (requerido, formato válido)
  - Teléfono (requerido, formato válido)
  - Nombre de la mascota (opcional)
  - Tipo de mascota (select: Perro, Gato, Ave, Roedor, Otro)
  - Servicio de interés (select desde JSON)
  - Mensaje (textarea, min 10, max 500)
  - Checkbox: aceptar política de privacidad
- Validaciones en tiempo real con mensajes de error
- Botón submit con estado de loading
- Mensaje de éxito/error con snackbar o toast
- Al enviar, simular POST guardando en localStorage o mostrar mensaje (sin backend)

### 10. **Chatbot (Placeholder)**
- Widget flotante en la esquina inferior derecha
- Botón con ícono de chat, animación de pulso
- Al abrir, muestra ventana con mensaje de bienvenida
- Estructura preparada para integrar IA después (OpenAI, Dialogflow, etc.)
- Por ahora: respuestas predefinidas simples o mensaje "Próximamente"

### 11. **Footer**
- Logo + descripción corta
- Columnas: Servicios, Empresa, Contacto, Redes Sociales
- Newsletter (input email + botón)
- Mapa del sitio
- Copyright + políticas

---

## 📄 Modelos de Datos (TypeScript)

```typescript
// service.model.ts
export interface Service {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  priceFrom: number;
  currency: string;
  durationMinutes: number;
  category: 'consulta' | 'cirugia' | 'estetica' | 'laboratorio' | 'emergencia';
  available: boolean;
}

// specialty.model.ts
export interface Specialty {
  id: number;
  name: string;
  description: string;
  icon: string;
  veterinarianIds: number[];
}

// veterinarian.model.ts
export interface Veterinarian {
  id: number;
  name: string;
  specialty: string;
  photo: string;
  credentials: string;
  experienceYears: number;
}

// location.model.ts
export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  schedule: { days: string; hours: string }[];
  image: string;
  mapUrl: string;
  coordinates: { lat: number; lng: number };
}

// contact.model.ts
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  petName?: string;
  petType: string;
  serviceInterest: string;
  message: string;
  acceptPrivacy: boolean;
}
```

---

## 📦 Ejemplo de JSON (services.json)

```json
[
  {
    "id": 1,
    "name": "Consulta General",
    "shortDescription": "Revisión completa del estado de salud de tu mascota.",
    "description": "Evaluación física integral, historial clínico y recomendaciones personalizadas.",
    "icon": "medical_services",
    "image": "assets/images/services/consulta.jpg",
    "priceFrom": 25,
    "currency": "USD",
    "durationMinutes": 30,
    "category": "consulta",
    "available": true
  }
]
```

---

## 🎨 Guía de Estilos (Design System)

### Paleta de Colores
- **Primario:** `#4CAF50` (verde saludable) o `#2196F3` (azul confianza)
- **Secundario:** `#FF9800` (naranja cálido)
- **Acento:** `#E91E63` (rosa para CTA)
- **Texto:** `#212121` / `#757575`
- **Fondo:** `#FAFAFA` / `#FFFFFF`
- **Error:** `#F44336`

### Tipografía
- **Títulos:** Poppins o Montserrat (700, 600)
- **Cuerpo:** Inter o Roboto (400, 500)

### Espaciado
- Sistema de 8px (8, 16, 24, 32, 48, 64)

### Bordes
- Border-radius: 8px (cards), 24px (botones pill), 50% (avatares)

### Sombras
- Suaves y sutiles, elevación al hover

---

## ⚙️ Requisitos Técnicos

1. **Standalone Components** (sin NgModules)
2. **Control Flow moderno:** `@if`, `@for`, `@switch` (NO usar `*ngIf`, `*ngFor`)
3. **Signals** para estado local reactivo
4. **inject()** en lugar de constructor injection
5. **Lazy loading** en todas las rutas de features
6. **ChangeDetectionStrategy.OnPush** en todos los componentes
7. **TrackBy** en todos los `@for` usando `track item.id`
8. **Accesibilidad:** ARIA labels, alt en imágenes, contraste adecuado, navegación por teclado
9. **SEO:** title dinámico por ruta, meta descriptions
10. **Responsive:** mobile-first, breakpoints 576, 768, 992, 1200
11. **Performance:** lazy images, preload de fuentes críticas

---

## 🔌 Servicios Angular

### DataService
```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);
  
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>('assets/data/services.json');
  }
  
  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>('assets/data/specialties.json');
  }
  
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>('assets/data/locations.json');
  }
  
  getVeterinarians(): Observable<Veterinarian[]> {
    return this.http.get<Veterinarian[]>('assets/data/veterinarians.json');
  }
}
```

### ContactService
- Método `sendContact(form: ContactForm): Observable<any>` que simula envío (guardar en localStorage + delay)

### ChatbotService (placeholder)
- Método `sendMessage(msg: string): Observable<string>` con respuestas mock
- Estructura lista para conectar con API real después

---

## 🛣️ Rutas Sugeridas

```typescript
export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'servicios', loadComponent: () => import('./features/services/services.component').then(m => m.ServicesComponent) },
  { path: 'especialidades', loadComponent: () => import('./features/specialties/specialties.component').then(m => m.SpecialtiesComponent) },
  { path: 'ubicaciones', loadComponent: () => import('./features/locations/locations.component').then(m => m.LocationsComponent) },
  { path: 'precios', loadComponent: () => import('./features/pricing/pricing.component').then(m => m.PricingComponent) },
  { path: 'nosotros', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: 'contacto', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
  { path: '**', redirectTo: '' }
];
```

---

## ✅ Checklist de Entregables

- [ ] Proyecto Angular inicializado con routing y SCSS
- [ ] Estructura de carpetas según lo especificado
- [ ] Archivos JSON con datos de ejemplo (mínimo 8 servicios, 6 especialidades, 3 ubicaciones, 5 veterinarios)
- [ ] Componentes: navbar, footer, hero, cards, form, chatbot-widget
- [ ] Video en el hero funcionando (puede ser placeholder local o URL)
- [ ] Todas las secciones navegables y responsive
- [ ] Formulario de contacto con validaciones completas
- [ ] Chatbot flotante con UI lista (lógica mock)
- [ ] Estilos coherentes y modernos
- [ ] Sin errores de compilación ni warnings de consola
- [ ] Código comentado en partes clave
- [ ] README.md con instrucciones de instalación y ejecución

---

## 🚫 Restricciones

- **NO** usar backend real (todo desde JSON)
- **NO** usar NgModules (solo standalone)
- **NO** usar `*ngIf` / `*ngFor` (usar nueva sintaxis)
- **NO** hardcodear datos en componentes (todo desde JSON)
- **NO** usar librerías pesadas innecesarias
- **NO** dejar TODOs sin documentar

---

## 🎁 Extras Deseados (Nice to have)

- Animaciones de entrada con `@angular/animations` o CSS
- Carrusel de testimonios
- Contador animado de estadísticas (años de experiencia, mascotas atendidas)
- Modo oscuro opcional
- PWA ready
- Internacionalización (i18n) preparada
- Tests unitarios básicos con Jasmine/Karma

---

## 📝 Notas Finales para Copilot

1. **Prioriza la calidad sobre la cantidad**: mejor código limpio y funcional que muchas features a medias.
2. **Genera el proyecto paso a paso**: primero estructura, luego componentes core, después features.
3. **Usa nombres descriptivos** en inglés para código, español para textos UI.
4. **Mantén consistencia** en convenciones de nombres (kebab-case para archivos, PascalCase para clases).
5. **Documenta** cada componente con un comentario JSDoc al inicio.
6. **Verifica** que cada componente sea autocontenido y reutilizable.

---

**Versión:** 1.0  
**Última actualización:** 2024  
**Autor:** Equipo de Desarrollo PetCare