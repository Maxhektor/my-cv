import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CvPageComponent } from './cv-page/cv-page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CvPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
