import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { Service, ServiceCategory } from '../../core/models/service.model';

type CategoryFilter = ServiceCategory | 'todos';

interface CategoryOption {
  value: CategoryFilter;
  label: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  private readonly dataService = inject(DataService);

  readonly services = signal<Service[]>([]);
  readonly selectedCategory = signal<CategoryFilter>('todos');
  readonly selectedService = signal<Service | null>(null);
  readonly isLoading = signal(true);
  readonly hasLoadError = signal(false);

  readonly categories = computed<CategoryOption[]>(() => [
    { value: 'todos', label: 'Todos' },
    ...Array.from(new Set(this.services().map((service) => service.category))).map((category) => ({
      value: category,
      label: this.categoryLabel(category)
    }))
  ]);

  readonly filteredServices = computed(() => {
    const category = this.selectedCategory();
    return category === 'todos'
      ? this.services()
      : this.services().filter((service) => service.category === category);
  });

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.isLoading.set(true);
    this.hasLoadError.set(false);

    this.dataService.getServices().subscribe({
      next: (services) => {
        this.services.set(services);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasLoadError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  selectCategory(category: CategoryFilter): void {
    this.selectedCategory.set(category);
  }

  categoryLabel(category: ServiceCategory): string {
    const labels: Record<ServiceCategory, string> = {
      consulta: 'Consulta',
      cirugia: 'Cirugía',
      estetica: 'Estética',
      laboratorio: 'Laboratorio',
      emergencia: 'Emergencia'
    };

    return labels[category];
  }

  durationLabel(minutes: number): string {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes === 0 ? `Aprox. ${hours} h` : `Aprox. ${hours} h ${remainingMinutes} min`;
    }

    return `Aprox. ${minutes} min`;
  }

  openDetails(service: Service, dialog: HTMLDialogElement): void {
    this.selectedService.set(service);
    if (!dialog.open) {
      dialog.showModal();
    }
  }

  closeDetails(dialog: HTMLDialogElement): void {
    dialog.close();
  }

  closeOnBackdrop(event: MouseEvent, dialog: HTMLDialogElement): void {
    if (event.target === dialog) {
      this.closeDetails(dialog);
    }
  }

  clearSelectedService(): void {
    this.selectedService.set(null);
  }
}
