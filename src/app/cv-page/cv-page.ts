import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CV_CONTACT, ROLE_IDS, type CvSectionId } from '../cv-content';
import type { RoleId } from '../i18n/translations';
import { TabsComponent, type TabItem } from '../tabs/tabs';
import { ContactFormComponent } from '../contact-form/contact-form';
import { LanguageService } from '../i18n/language.service';
import { PresentationService } from '../presentation/presentation.service';
import { SettingsMenuComponent } from '../settings-menu/settings-menu';

interface PanelSection {
  id: CvSectionId;
  intro: string;
  bullets: readonly string[];
}

@Component({
  selector: 'app-cv-page',
  standalone: true,
  imports: [TabsComponent, ContactFormComponent, SettingsMenuComponent],
  templateUrl: './cv-page.html',
  styleUrl: './cv-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPageComponent {
  protected readonly i18n = inject(LanguageService);
  protected readonly presentation = inject(PresentationService);
  protected readonly contact = CV_CONTACT;
  protected readonly roleIds = ROLE_IDS;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly phoneHref = `tel:+45${CV_CONTACT.phone.replace(/\s+/g, '')}`;

  protected readonly activeRoleId = signal<RoleId>(this.roleIds[0]!);

  protected readonly activeRole = computed(() => this.i18n.t().cv.roles[this.activeRoleId()]);

  protected readonly sections = computed<readonly PanelSection[]>(() => {
    const cv = this.i18n.t().cv;
    const role = this.activeRole();
    return [
      { id: 'skills', intro: '', bullets: role.skills },
      { id: 'achievements', intro: cv.experienceHeader, bullets: role.achievements },
      { id: 'personality', intro: cv.pitch, bullets: cv.languages },
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

  protected setRole(id: RoleId): void {
    this.activeRoleId.set(id);
  }

  protected panelId(id: string): string {
    return `panel-${id}`;
  }

  protected tabId(id: string): string {
    return `tab-${id}`;
  }
}
