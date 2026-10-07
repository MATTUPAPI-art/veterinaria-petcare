import { Injectable } from '@angular/core';
import { Observable, map, timer } from 'rxjs';
import { ContactForm } from '../models/contact.model';

const CONTACT_STORAGE_KEY = 'petcare-contact-submissions';

@Injectable({ providedIn: 'root' })
export class ContactService {
  sendContact(form: ContactForm): Observable<void> {
    return timer(650).pipe(
      map(() => {
        const storedSubmissions = localStorage.getItem(CONTACT_STORAGE_KEY);
        const submissions: ContactForm[] = storedSubmissions
          ? JSON.parse(storedSubmissions) as ContactForm[]
          : [];

        if (!Array.isArray(submissions)) {
          throw new Error('El historial de mensajes guardado no es válido.');
        }

        submissions.push({ ...form });
        localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(submissions));
      })
    );
  }
}
