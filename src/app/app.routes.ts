import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		title: 'Inicio',
		data: { description: 'Conoce PetCare y nuestros servicios de atención veterinaria cercana para mascotas.' },
		loadComponent: () => import('./features/home/home.component').then((module) => module.HomeComponent)
	},
	{
		path: 'servicios',
		title: 'Servicios veterinarios',
		data: { description: 'Consulta los servicios veterinarios de PetCare, sus categorías, detalles, duración y precios referenciales.' },
		loadComponent: () => import('./features/services/services.component').then((module) => module.ServicesComponent)
	},
	{
		path: 'especialidades',
		title: 'Especialidades',
		data: { description: 'Explora las especialidades veterinarias de PetCare y conoce a los profesionales relacionados.' },
		loadComponent: () => import('./features/specialties/specialties.component').then((module) => module.SpecialtiesComponent)
	},
	{
		path: 'ubicaciones',
		title: 'Ubicaciones',
		data: { description: 'Encuentra las sedes demostrativas de PetCare, sus horarios e información de contacto.' },
		loadComponent: () => import('./features/locations/locations.component').then((module) => module.LocationsComponent)
	},
	{
		path: 'precios',
		title: 'Precios y tarifas',
		data: { description: 'Consulta los precios referenciales de los servicios de PetCare y lo que incluyen.' },
		loadComponent: () => import('./features/pricing/pricing.component').then((module) => module.PricingComponent)
	},
	{
		path: 'nosotros',
		title: 'Nosotros',
		data: { description: 'Conoce la propuesta de cuidado, misión, visión, valores y equipo veterinario de PetCare.' },
		loadComponent: () => import('./features/about/about.component').then((module) => module.AboutComponent)
	},
	{
		path: 'contacto',
		title: 'Contacto',
		data: { description: 'Contacta a PetCare mediante el formulario demostrativo y consulta información de contacto.' },
		loadComponent: () => import('./features/contact/contact.component').then((module) => module.ContactComponent)
	},
	{ path: '**', redirectTo: '' }
];
