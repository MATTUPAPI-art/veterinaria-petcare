import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';
import { Service } from '../models/service.model';
import { Specialty } from '../models/specialty.model';
import { Veterinarian } from '../models/veterinarian.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);

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
