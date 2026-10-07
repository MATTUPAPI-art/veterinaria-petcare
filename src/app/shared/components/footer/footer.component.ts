import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly serviceLinks: FooterLink[] = [
    { label: 'Consulta general', route: '/servicios' },
    { label: 'Vacunación', route: '/servicios' },
    { label: 'Cirugía', route: '/servicios' },
    { label: 'Laboratorio clínico', route: '/servicios' }
  ];

  readonly companyLinks: FooterLink[] = [
    { label: 'Nosotros', route: '/nosotros' },
    { label: 'Especialidades', route: '/especialidades' },
    { label: 'Ubicaciones', route: '/ubicaciones' },
    { label: 'Precios', route: '/precios' }
  ];
}
