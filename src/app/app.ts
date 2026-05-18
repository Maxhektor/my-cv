import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CvPageComponent } from './cv-page/cv-page';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen';

const ONBOARDED_KEY = 'cv-onboarded';

function hasOnboarded(): boolean {
  try {
    return localStorage.getItem(ONBOARDED_KEY) === '1';
  } catch {
    return false;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CvPageComponent, WelcomeScreenComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly showWelcome = signal(!hasOnboarded());

  protected onEntered(): void {
    try {
      localStorage.setItem(ONBOARDED_KEY, '1');
    } catch {
      // Ignore.
    }
    this.showWelcome.set(false);
  }
}
