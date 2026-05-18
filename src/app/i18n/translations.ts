export type Lang = 'en' | 'da';

export const SUPPORTED_LANGS: readonly Lang[] = ['en', 'da'] as const;

export type RoleId = 'product-operations' | 'product-manager' | 'operations-generalist';

export interface RoleVariantTranslation {
  label: string;
  skills: readonly string[];
  achievements: readonly string[];
}

export interface Translation {
  langName: string;
  header: {
    skipToContent: string;
    sectionsLabel: string;
    toggleLabel: string;
  };
  settings: {
    open: string;
    language: string;
    theme: string;
    light: string;
    dark: string;
    presentation: string;
    minimal: string;
    expressive: string;
  };
  tabs: {
    skills: string;
    achievements: string;
    personality: string;
    contact: string;
  };
  contactForm: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: {
      idle: string;
      sending: string;
      sent: string;
      error: string;
    };
    status: {
      sent: string;
      genericError: string;
    };
    errors: {
      required: string;
      email: string;
      maxLength: string;
      invalid: string;
    };
  };
  cv: {
    title: string;
    pitch: string;
    experienceHeader: string;
    languages: readonly string[];
    roleSelectorLabel: string;
    contactLabels: {
      email: string;
      phone: string;
      address: string;
    };
    roles: Record<RoleId, RoleVariantTranslation>;
  };
}

export const TRANSLATIONS: Record<Lang, Translation> = {
  en: {
    langName: 'English',
    header: {
      skipToContent: 'Skip to content',
      sectionsLabel: 'CV sections',
      toggleLabel: 'Change language',
    },
    settings: {
      open: 'Open settings',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      presentation: 'Presentation',
      minimal: 'Minimal',
      expressive: 'Expressive',
    },
    tabs: {
      skills: 'Skills',
      achievements: 'Achievements',
      personality: 'Personality',
      contact: 'Contact',
    },
    contactForm: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      submit: {
        idle: 'Send message',
        sending: 'Sending…',
        sent: 'Sent — send another',
        error: 'Try again',
      },
      status: {
        sent: 'Your message is on its way.',
        genericError: 'Something went wrong. Please try again.',
      },
      errors: {
        required: 'This field is required.',
        email: 'Please enter a valid email address.',
        maxLength: 'This field is too long.',
        invalid: 'Invalid value.',
      },
    },
    cv: {
      title: 'Product Operations Lead',
      pitch: 'Short and engaging pitch about yourself.',
      experienceHeader:
        'Head of Support and Product Operations Lead at Handyhand (08/2022 – 03/2026), Copenhagen, Denmark.',
      languages: [
        'Danish — Native or Bilingual Proficiency',
        'English — Full Professional Proficiency',
      ],
      roleSelectorLabel: 'Role focus',
      contactLabels: {
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
      },
      roles: {
        'product-operations': {
          label: 'Product Operations',
          skills: [
            'Product operations & system optimisation',
            'Process design & scalability',
            'Cross-functional coordination',
            'Operational analytics & KPI ownership',
            'Workflow automation',
            'Customer experience optimisation',
            'Internal tooling & admin systems',
            'Incident & edge-case handling',
            'Payment & marketplace operations (Stripe)',
            'AI & automation implementation',
          ],
          achievements: [
            'Scaled support and operational systems to support a platform with 100k–500k users',
            'Built and optimised internal admin systems for non-technical staff',
            'Replaced manual workflows with structured, scalable in-product processes',
            'Designed and implemented a conflict resolution system, enabling consistent dispute handling',
            'Built a claims handling system, significantly reducing manual workload',
            'Defined and enforced operational rules and flows for disputes, cancellations, and payments',
            'Improved operational efficiency through automation and systemisation of support tasks',
            'Acted as bridge between support, product, and engineering, aligning priorities and execution',
            'Implemented AI-powered tools to improve support efficiency and response consistency',
            'Enabled scaling of support team without proportional increase in workload',
          ],
        },
        'product-manager': {
          label: 'Product Manager',
          skills: [
            'Product ownership & lifecycle management',
            'Roadmapping & prioritisation',
            'User journey & flow design',
            'Business logic definition',
            'Stakeholder management (engineering, support, ops)',
            'Data-informed decision making',
            'Feature scoping & requirements definition',
            'UX collaboration & iteration',
            'Agile / iterative development',
            'Problem structuring & solution design',
          ],
          achievements: [
            'Owned development of internal product systems supporting 100k–500k users',
            'Designed and shipped a conflict resolution system (end-to-end) across DB, API, and frontend',
            'Built a claims/insurance handling flow, replacing manual processes with structured product logic',
            'Defined core business rules and timelines for dispute handling and payment flows',
            'Translated customer insights into product features, improving user experience and reducing friction',
            'Collaborated with engineering to deliver complex product features, including payment edge cases',
            'Improved internal tools, enabling non-technical users to operate complex workflows independently',
            'Reduced reliance on manual support by moving key processes into product flows',
            'Contributed to UX improvements and product redesign initiatives',
            'Introduced AI-driven product features for support and automation',
          ],
        },
        'operations-generalist': {
          label: 'Operations / Generalist',
          skills: [
            'Operations management & scaling',
            'Process building in ambiguous environments',
            'Cross-functional execution',
            'Problem solving & prioritisation',
            'Team leadership & coordination',
            'Workflow design & optimisation',
            'Systems thinking',
            'KPI tracking & performance management',
            'Tooling & internal system development',
            'Adaptability in fast-paced environments',
          ],
          achievements: [
            'Scaled support operations from early-stage to handling large-scale user base (100k–500k)',
            'Built and led a support team of 6–8 people, including hiring and performance management',
            'Designed and implemented core operational processes across support and product',
            'Transformed unstructured workflows into scalable systems and tools',
            'Reduced manual workload by digitising and standardising key operations',
            'Built internal systems enabling efficient handling of complex cases at scale',
            'Took ownership of critical operational areas (support, disputes, payments)',
            'Identified and resolved system bottlenecks and inefficiencies',
            'Collaborated across teams to deliver operational and product improvements',
            'Introduced automation and AI tools to improve efficiency and scalability',
          ],
        },
      },
    },
  },
  da: {
    langName: 'Dansk',
    header: {
      skipToContent: 'Spring til indhold',
      sectionsLabel: 'CV-sektioner',
      toggleLabel: 'Skift sprog',
    },
    settings: {
      open: 'Åbn indstillinger',
      language: 'Sprog',
      theme: 'Tema',
      light: 'Lyst',
      dark: 'Mørkt',
      presentation: 'Visning',
      minimal: 'Minimal',
      expressive: 'Udtryksfuld',
    },
    tabs: {
      skills: 'Kompetencer',
      achievements: 'Resultater',
      personality: 'Personlighed',
      contact: 'Kontakt',
    },
    contactForm: {
      name: 'Navn',
      email: 'E-mail',
      subject: 'Emne',
      message: 'Besked',
      submit: {
        idle: 'Send besked',
        sending: 'Sender…',
        sent: 'Sendt — send en til',
        error: 'Prøv igen',
      },
      status: {
        sent: 'Din besked er på vej.',
        genericError: 'Noget gik galt. Prøv venligst igen.',
      },
      errors: {
        required: 'Dette felt er påkrævet.',
        email: 'Indtast venligst en gyldig e-mailadresse.',
        maxLength: 'Dette felt er for langt.',
        invalid: 'Ugyldig værdi.',
      },
    },
    cv: {
      title: 'Product Operations Lead',
      pitch: 'Kort og engagerende pitch om dig selv.',
      experienceHeader:
        'Head of Support og Product Operations Lead hos Handyhand (08/2022 – 03/2026), København, Danmark.',
      languages: [
        'Dansk — Modersmål',
        'Engelsk — Fuld professionel kunnen',
      ],
      roleSelectorLabel: 'Rollefokus',
      contactLabels: {
        email: 'E-mail',
        phone: 'Telefon',
        address: 'Adresse',
      },
      roles: {
        'product-operations': {
          label: 'Product Operations',
          skills: [
            'Produktdrift og systemoptimering',
            'Procesdesign og skalerbarhed',
            'Tværfunktionel koordinering',
            'Driftsanalyse og KPI-ejerskab',
            'Workflow-automatisering',
            'Optimering af kundeoplevelsen',
            'Interne værktøjer og adminsystemer',
            'Håndtering af hændelser og særtilfælde',
            'Betalings- og marketplace-drift (Stripe)',
            'Implementering af AI og automatisering',
          ],
          achievements: [
            'Skalerede support- og driftssystemer til en platform med 100.000–500.000 brugere',
            'Byggede og optimerede interne adminsystemer til ikke-tekniske medarbejdere',
            'Erstattede manuelle arbejdsgange med strukturerede, skalerbare in-produkt-processer',
            'Designede og implementerede et konflikthåndteringssystem, der sikrer ensartet tvistbehandling',
            'Byggede et skadehåndteringssystem, der markant reducerede manuel arbejdsbyrde',
            'Definerede og håndhævede driftsregler og flows for tvister, annulleringer og betalinger',
            'Forbedrede driftseffektivitet gennem automatisering og systematisering af supportopgaver',
            'Fungerede som bro mellem support, produkt og engineering med fokus på prioriteter og eksekvering',
            'Implementerede AI-drevne værktøjer til at forbedre supporteffektivitet og svarkonsistens',
            'Muliggjorde skalering af supportteamet uden tilsvarende stigning i arbejdsbyrden',
          ],
        },
        'product-manager': {
          label: 'Product Manager',
          skills: [
            'Produktejerskab og livscyklusstyring',
            'Roadmap og prioritering',
            'Brugerrejse- og flowdesign',
            'Definition af forretningslogik',
            'Stakeholderstyring (engineering, support, drift)',
            'Dataunderstøttede beslutninger',
            'Feature-scoping og kravspecificering',
            'UX-samarbejde og iteration',
            'Agil / iterativ udvikling',
            'Problemstrukturering og løsningsdesign',
          ],
          achievements: [
            'Drev udvikling af interne produktsystemer til 100.000–500.000 brugere',
            'Designede og leverede et konflikthåndteringssystem (end-to-end) på tværs af DB, API og frontend',
            'Byggede et flow til skadehåndtering/forsikring, der erstattede manuelle processer med struktureret produktlogik',
            'Definerede centrale forretningsregler og tidsfrister for tvistbehandling og betalingsflows',
            'Omsatte kundeindsigter til produktfeatures, der forbedrede brugeroplevelsen og reducerede friktion',
            'Samarbejdede med engineering om at levere komplekse produktfeatures, inkl. betalings-edge-cases',
            'Forbedrede interne værktøjer, så ikke-tekniske brugere kunne håndtere komplekse arbejdsgange selvstændigt',
            'Reducerede afhængighed af manuel support ved at flytte centrale processer ind i produktflows',
            'Bidrog til UX-forbedringer og redesigninitiativer',
            'Introducerede AI-drevne produktfeatures til support og automatisering',
          ],
        },
        'operations-generalist': {
          label: 'Operations / Generalist',
          skills: [
            'Driftsledelse og skalering',
            'Procesopbygning i tvetydige miljøer',
            'Tværfunktionel eksekvering',
            'Problemløsning og prioritering',
            'Teamledelse og koordinering',
            'Workflow-design og -optimering',
            'Systemtænkning',
            'KPI-tracking og performance management',
            'Værktøjer og udvikling af interne systemer',
            'Tilpasningsevne i hurtige miljøer',
          ],
          achievements: [
            'Skalerede support-drift fra tidlig fase til håndtering af stor brugerbase (100.000–500.000)',
            'Byggede og ledede et supportteam på 6–8 personer, inkl. rekruttering og performance management',
            'Designede og implementerede centrale driftsprocesser på tværs af support og produkt',
            'Omdannede ustrukturerede arbejdsgange til skalerbare systemer og værktøjer',
            'Reducerede manuel arbejdsbyrde ved at digitalisere og standardisere centrale processer',
            'Byggede interne systemer der muliggjorde effektiv håndtering af komplekse sager i stor skala',
            'Tog ejerskab over kritiske driftsområder (support, tvister, betalinger)',
            'Identificerede og løste systemflaskehalse og ineffektivitet',
            'Samarbejdede på tværs af teams om drifts- og produktforbedringer',
            'Introducerede automatiserings- og AI-værktøjer til at forbedre effektivitet og skalerbarhed',
          ],
        },
      },
    },
  },
};
