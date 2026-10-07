import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavigationLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  readonly menuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly links: NavigationLink[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Servicios', route: '/servicios' },
    { label: 'Especialidades', route: '/especialidades' },
    { label: 'Ubicaciones', route: '/ubicaciones' },
    { label: 'Precios', route: '/precios' },
    { label: 'Nosotros', route: '/nosotros' },
    { label: 'Contacto', route: '/contacto' }
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 16);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
