import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { Service } from '../../core/models/service.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private readonly dataService = inject(DataService);

  readonly services = signal<Service[]>([]);
  readonly featuredServices = computed(() => this.services().filter((service) => service.available).slice(0, 3));
  readonly isLoading = signal(true);
  readonly hasLoadError = signal(false);

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

  durationLabel(minutes: number): string {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes === 0 ? `Aprox. ${hours} h` : `Aprox. ${hours} h ${remainingMinutes} min`;
    }

    return `Aprox. ${minutes} min`;
  }

}
