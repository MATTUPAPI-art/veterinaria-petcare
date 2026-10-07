import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, forkJoin, map, of } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { Specialty } from '../../core/models/specialty.model';
import { Veterinarian } from '../../core/models/veterinarian.model';

interface SpecialtyWithVeterinarians extends Specialty {
  veterinarians: Veterinarian[];
}

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './specialties.component.html',
  styleUrl: './specialties.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialtiesComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly http = inject(HttpClient);

  readonly specialties = signal<Specialty[]>([]);
  readonly veterinarians = signal<Veterinarian[]>([]);
  readonly availablePhotoIds = signal<ReadonlySet<number>>(new Set());
  readonly failedPhotoIds = signal<ReadonlySet<number>>(new Set());
  readonly isLoading = signal(true);
  readonly hasLoadError = signal(false);

  readonly specialtiesWithVeterinarians = computed<SpecialtyWithVeterinarians[]>(() => {
    const veterinariansById = new Map(this.veterinarians().map((veterinarian) => [veterinarian.id, veterinarian]));

    return this.specialties().map((specialty) => ({
      ...specialty,
      veterinarians: specialty.veterinarianIds
        .map((veterinarianId) => veterinariansById.get(veterinarianId))
        .filter((veterinarian): veterinarian is Veterinarian => veterinarian !== undefined)
    }));
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    this.hasLoadError.set(false);

    forkJoin({
      specialties: this.dataService.getSpecialties(),
      veterinarians: this.dataService.getVeterinarians()
    }).subscribe({
      next: ({ specialties, veterinarians }) => {
        this.specialties.set(specialties);
        this.veterinarians.set(veterinarians);
        this.isLoading.set(false);
        this.checkVeterinarianPhotos(veterinarians);
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
    this.failedPhotoIds.update((ids) => new Set([...ids, veterinarianId]));
  }

  private checkVeterinarianPhotos(veterinarians: Veterinarian[]): void {
    const photoChecks = veterinarians.map((veterinarian) =>
      this.http.head(veterinarian.photo, { observe: 'response' }).pipe(
        map(() => veterinarian.id),
        catchError(() => of(null))
      )
    );

    if (photoChecks.length === 0) {
      return;
    }

    forkJoin(photoChecks).subscribe((results) => {
      this.availablePhotoIds.set(new Set(results.filter((id): id is number => id !== null)));
    });
  }
}
