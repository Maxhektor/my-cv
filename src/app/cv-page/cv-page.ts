import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CV_CONTACT, type CvSectionId } from '../cv-content';
import { TabsComponent, type TabItem } from '../tabs/tabs';
import { AiChatComponent } from '../ai-chat/ai-chat';
import { ContactFormComponent } from '../contact-form/contact-form';
import { LanguageService } from '../i18n/language.service';
import { SettingsMenuComponent } from '../settings-menu/settings-menu';
import { UserGrowthChartComponent } from '../user-growth-chart/user-growth-chart';

interface PanelSection {
  id: CvSectionId;
  intro: string;
  bullets: readonly string[];
}

@Component({
  selector: 'app-cv-page',
  standalone: true,
  imports: [
    TabsComponent,
    AiChatComponent,
    ContactFormComponent,
    SettingsMenuComponent,
    UserGrowthChartComponent,
  ],
  templateUrl: './cv-page.html',
  styleUrl: './cv-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPageComponent {
  protected readonly i18n = inject(LanguageService);
  protected readonly contact = CV_CONTACT;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly phoneHref = `tel:+45${CV_CONTACT.phone.replace(/\s+/g, '')}`;

  protected readonly sections = computed<readonly PanelSection[]>(() => {
    const cv = this.i18n.t().cv;
    return [
      { id: 'skills', intro: '', bullets: cv.skills },
      { id: 'achievements', intro: cv.experienceHeader, bullets: cv.achievements },
      { id: 'personality', intro: cv.pitch, bullets: cv.languages },
      { id: 'ai', intro: '', bullets: [] },
      { id: 'contact', intro: '', bullets: [] },
    ];
  });

  protected readonly tabs = computed<readonly TabItem[]>(() => {
    const labels = this.i18n.t().tabs;
    return this.sections().map((section) => ({
      id: section.id,
      label: labels[section.id],
    }));
  });

  protected readonly activeId = signal<string>('skills');

  protected readonly activeSection = computed<PanelSection>(() => {
    const id = this.activeId();
    const sections = this.sections();
    return sections.find((section) => section.id === id) ?? sections[0]!;
  });

  protected panelId(id: string): string {
    return `panel-${id}`;
  }

  protected tabId(id: string): string {
    return `tab-${id}`;
  }
}
