import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Service, ServiceCategory } from '../../core/models/service.model';
import { DataService } from '../../core/services/data.service';

interface PricingRecord {
  id: number;
  serviceId: number;
  service: string;
  category: string;
  price: number;
  currency: string;
  durationMinutes: number;
  includes: string[];
}

interface PricingEntry extends PricingRecord {
  serviceCategory: ServiceCategory | null;
}

type PricingFilter = ServiceCategory | 'todos';

interface PricingCategoryOption {
  value: PricingFilter;
  label: string;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly dataService = inject(DataService);

  readonly entries = signal<PricingEntry[]>([]);
  readonly selectedCategory = signal<PricingFilter>('todos');
  readonly isLoading = signal(true);
  readonly hasLoadError = signal(false);

  readonly categories = computed<PricingCategoryOption[]>(() => {
    const availableCategories = new Set(this.entries().map((entry) => entry.serviceCategory).filter((category): category is ServiceCategory => category !== null));
    return [
      { value: 'todos', label: 'Todos' },
      ...Array.from(availableCategories).map((category) => ({ value: category, label: this.categoryLabel(category) }))
    ];
  });

  readonly filteredEntries = computed(() => {
    const selected = this.selectedCategory();
    return selected === 'todos'
      ? this.entries()
      : this.entries().filter((entry) => entry.serviceCategory === selected);
  });

  ngOnInit(): void {
    this.loadPricing();
  }

  loadPricing(): void {
    this.isLoading.set(true);
    this.hasLoadError.set(false);

    forkJoin({
      pricing: this.http.get<PricingRecord[]>('assets/data/pricing.json'),
      services: this.dataService.getServices()
    }).subscribe({
      next: ({ pricing, services }) => {
        this.entries.set(pricing.map((entry) => ({
          ...entry,
          serviceCategory: this.resolveCategory(entry, services)
        })));
        this.isLoading.set(false);
      },
      error: () => {
        this.hasLoadError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  selectCategory(category: PricingFilter): void {
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
      return remainingMinutes === 0 ? `${hours} h` : `${hours} h ${remainingMinutes} min`;
    }
    return `${minutes} min`;
  }

  private resolveCategory(entry: PricingRecord, services: Service[]): ServiceCategory | null {
    const matchedService = services.find((service) => service.id === entry.serviceId);
    if (matchedService) {
      return matchedService.category;
    }

    const categoryByName: Record<string, ServiceCategory> = {
      consulta: 'consulta',
      cirugía: 'cirugia',
      cirugia: 'cirugia',
      estética: 'estetica',
      estetica: 'estetica',
      laboratorio: 'laboratorio',
      emergencia: 'emergencia'
    };
    return categoryByName[entry.category.trim().toLocaleLowerCase('es')] ?? null;
  }
}
