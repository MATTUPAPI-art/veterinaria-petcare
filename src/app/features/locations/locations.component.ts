import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '../../core/models/location.model';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly http = inject(HttpClient);

  readonly locations = signal<Location[]>([]);
  readonly availableImages = signal<ReadonlySet<number>>(new Set());
  readonly failedImages = signal<ReadonlySet<number>>(new Set());
  readonly isLoading = signal(true);
  readonly hasLoadError = signal(false);

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.isLoading.set(true);
    this.hasLoadError.set(false);

    this.dataService.getLocations().subscribe({
      next: (locations) => {
        this.locations.set(locations);
        this.isLoading.set(false);
        this.checkLocationImages(locations);
      },
      error: () => {
        this.hasLoadError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  isValidMapUrl(mapUrl: string): boolean {
    try {
      const url = new URL(mapUrl, window.location.origin);
      return (url.protocol === 'https:' || url.protocol === 'http:') && Boolean(url.hostname);
    } catch {
      return false;
    }
  }

  markImageAsFailed(locationId: number): void {
    this.failedImages.update((ids) => new Set([...ids, locationId]));
  }

  private checkLocationImages(locations: Location[]): void {
    const checks = locations.map((location) =>
      this.http.head(location.image, { observe: 'response' }).subscribe({
        next: () => this.availableImages.update((ids) => new Set([...ids, location.id])),
        error: () => undefined
      })
    );

    void checks;
  }
}
