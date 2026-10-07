import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Veterinarian } from '../../core/models/veterinarian.model';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly http = inject(HttpClient);

  readonly veterinarians = signal<Veterinarian[]>([]);
  readonly availablePhotos = signal<ReadonlySet<number>>(new Set());
  readonly failedPhotos = signal<ReadonlySet<number>>(new Set());
  readonly isLoading = signal(true);
  readonly hasLoadError = signal(false);

  ngOnInit(): void {
    this.loadVeterinarians();
  }

  loadVeterinarians(): void {
    this.isLoading.set(true);
    this.hasLoadError.set(false);

    this.dataService.getVeterinarians().subscribe({
      next: (veterinarians) => {
        this.veterinarians.set(veterinarians);
        this.isLoading.set(false);
        this.checkPhotos(veterinarians);
      },
      error: () => {
        this.hasLoadError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  initials(name: string): string {
    return name
      .split(' ')
      .filter((part) => part.length > 0)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join('');
  }

  markPhotoAsFailed(veterinarianId: number): void {
    this.failedPhotos.update((ids) => new Set([...ids, veterinarianId]));
  }

  private checkPhotos(veterinarians: Veterinarian[]): void {
    for (const veterinarian of veterinarians) {
      this.http.head(veterinarian.photo, { observe: 'response' }).subscribe({
        next: () => this.availablePhotos.update((ids) => new Set([...ids, veterinarian.id])),
        error: () => undefined
      });
    }
  }
}
