import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Service } from '../../core/models/service.model';
import { ContactForm } from '../../core/models/contact.model';
import { ContactService } from '../../core/services/contact.service';
import { DataService } from '../../core/services/data.service';

const phoneFormatValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = String(control.value ?? '').trim();
  if (!value) {
    return null;
  }

  const digits = value.replace(/\D/g, '');
  const allowedCharacters = /^\+?[\d\s().-]+$/.test(value);
  return allowedCharacters && digits.length >= 7 && digits.length <= 15 ? null : { phoneFormat: true };
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder).nonNullable;
  private readonly dataService = inject(DataService);
  private readonly contactService = inject(ContactService);

  readonly services = signal<Service[]>([]);
  readonly isLoadingServices = signal(true);
  readonly hasServiceLoadError = signal(false);
  readonly submitted = signal(false);
  readonly isSending = signal(false);
  readonly sendSucceeded = signal(false);
  readonly sendFailed = signal(false);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, phoneFormatValidator]],
    petName: [''],
    petType: [''],
    serviceInterest: [''],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    acceptPrivacy: [false, Validators.requiredTrue]
  });

  ngOnInit(): void {
    this.dataService.getServices().subscribe({
      next: (services) => {
        this.services.set(services);
        this.isLoadingServices.set(false);
      },
      error: () => {
        this.hasServiceLoadError.set(true);
        this.isLoadingServices.set(false);
      }
    });
  }

  showFieldError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid && (control.touched || control.dirty || this.submitted()));
  }

  fieldError(controlName: string): string {
    const errors = this.form.get(controlName)?.errors;
    if (!errors) {
      return '';
    }

    if (errors['required']) {
      return controlName === 'acceptPrivacy'
        ? 'Debes aceptar la política de privacidad para continuar.'
        : 'Este campo es obligatorio.';
    }
    if (errors['minlength']) {
      return controlName === 'message'
        ? 'Escribe un mensaje de al menos 10 caracteres.'
        : 'Escribe al menos 3 caracteres.';
    }
    if (errors['maxlength']) {
      return 'El mensaje no puede superar los 500 caracteres.';
    }
    if (errors['email']) {
      return 'Introduce un correo electrónico válido.';
    }
    if (errors['phoneFormat']) {
      return 'Introduce un teléfono válido con al menos 7 dígitos.';
    }

    return 'Revisa este campo.';
  }

  submit(): void {
    this.submitted.set(true);
    this.sendSucceeded.set(false);
    this.sendFailed.set(false);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();
    const contact: ContactForm = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      petName: values.petName.trim() || undefined,
      message: values.message.trim()
    };

    this.isSending.set(true);
    this.contactService.sendContact(contact).subscribe({
      next: () => {
        this.isSending.set(false);
        this.sendSucceeded.set(true);
        this.submitted.set(false);
        this.form.reset();
      },
      error: () => {
        this.isSending.set(false);
        this.sendFailed.set(true);
      }
    });
  }
}
