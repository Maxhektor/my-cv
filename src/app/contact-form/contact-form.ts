import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../i18n/language.service';


const WEB3FORMS_ACCESS_KEY = '7aa0a204-2bae-40ae-81dd-53c83324fa16';
const RECIPIENT_EMAIL = 'Maxhektor221@gmail.com';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

type FieldName = 'name' | 'email' | 'subject' | 'message';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly i18n = inject(LanguageService);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    subject: ['', [Validators.required, Validators.maxLength(200)]],
    message: ['', [Validators.required, Validators.maxLength(5000)]],
    botcheck: [''],
  });

  protected readonly status = signal<SubmitStatus>('idle');
  protected readonly errorMessage = signal<string>('');

  protected fieldInvalid(name: FieldName): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || control.dirty);
  }

  protected fieldError(name: FieldName): string {
    const control = this.form.controls[name];
    if (!control.errors) {
      return '';
    }
    const errors = this.i18n.t().contactForm.errors;
    if (control.errors['required']) {
      return errors.required;
    }
    if (control.errors['email']) {
      return errors.email;
    }
    if (control.errors['maxlength']) {
      return errors.maxLength;
    }
    return errors.invalid;
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, subject, message, botcheck } = this.form.getRawValue();

    if (botcheck) {
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      this.sendViaMailto({ name, email, subject, message });
      this.status.set('sent');
      this.form.reset();
      return;
    }

    this.status.set('sending');
    this.errorMessage.set('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: name,
          name,
          email,
          subject,
          message,
          botcheck,
        }),
      });

      const data: { success?: boolean; message?: string } = await response.json().catch(() => ({}));

      if (!response.ok || data.success !== true) {
        throw new Error(data.message ?? `Request failed (HTTP ${response.status}).`);
      }

      this.status.set('sent');
      this.form.reset();
    } catch (err) {
      this.status.set('error');
      this.errorMessage.set(err instanceof Error ? err.message : this.i18n.t().contactForm.status.genericError);
    }
  }

  protected resetStatus(): void {
    if (this.status() !== 'idle') {
      this.status.set('idle');
      this.errorMessage.set('');
    }
  }

  private sendViaMailto(payload: { name: string; email: string; subject: string; message: string }): void {
    const body = `From: ${payload.name} <${payload.email}>\n\n${payload.message}`;
    const href =
      `mailto:${RECIPIENT_EMAIL}` +
      `?subject=${encodeURIComponent(payload.subject)}` +
      `&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }
}
