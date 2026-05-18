export type Lang = 'en' | 'da';

export const SUPPORTED_LANGS: readonly Lang[] = ['en', 'da'] as const;

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
  };
  welcome: {
    title: string;
    subtitle: string;
    chooseTheme: string;
    chooseLanguage: string;
    light: string;
    dark: string;
    enter: string;
    enterHint: string;
    languages: Record<Lang, string>;
  };
  tabs: {
    skills: string;
    achievements: string;
    personality: string;
    ai: string;
    contact: string;
  };
  ai: {
    intro: string;
    suggestions: readonly string[];
    placeholder: string;
    send: string;
    sending: string;
    clear: string;
    youLabel: string;
    assistantLabel: string;
    error: string;
    emptyState: string;
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
    contactLabels: {
      email: string;
      phone: string;
      address: string;
    };
    skills: readonly string[];
    achievements: readonly string[];
    userGrowth: {
      title: string;
      subtitle: string;
      ariaLabel: string;
      joinedHere: string;
    };
    myersBriggs: {
      label: string;
      type: string;
      typeLetters: readonly string[];
      intro: string;
      worksWithHeading: string;
      traits: readonly string[];
      outro: string;
    };
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
    },
    welcome: {
      title: 'Welcome',
      subtitle: 'Pick appearance. Pick a language.',
      chooseTheme: 'Choose appearance',
      chooseLanguage: 'Language',
      light: 'Light',
      dark: 'Dark',
      enter: 'Enter',
      enterHint: 'or press Enter',
      languages: { en: 'English', da: 'Danish' },
    },
    tabs: {
      skills: 'Skills',
      achievements: 'Achievements',
      personality: 'Personality',
      ai: 'Ask AI',
      contact: 'Contact',
    },
    ai: {
      intro: 'Ask anything about Max — his experience, skills, or what kind of work he is a good fit for.',
      suggestions: [
        'What kind of roles is Max a good fit for?',
        'Tell me about Max’s biggest achievements.',
        'How does Max approach complex problems?',
      ],
      placeholder: 'Ask a question…',
      send: 'Ask',
      sending: 'Thinking…',
      clear: 'Clear conversation',
      youLabel: 'You',
      assistantLabel: 'AI',
      error: 'Something went wrong. Please try again.',
      emptyState: 'Your conversation will appear here.',
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
      title: 'my CV',
      pitch: 'Short and engaging pitch about yourself.',
      experienceHeader:
        'Head of Support and Product Operations Lead at Handyhand (08/2022 – 03/2026), Copenhagen, Denmark.',
      languages: [
        'Danish — Native or Bilingual Proficiency',
        'English — Full Professional Proficiency',
      ],
      contactLabels: {
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
      },
      skills: [
        'Product operations & system optimisation',
        'Product ownership & lifecycle management',
        'Process design, scalability & automation',
        'Roadmapping & prioritisation',
        'Cross-functional coordination (engineering, support, ops)',
        'User journey, flow & UX design',
        'Business logic & rules definition',
        'Data-informed decision making (analytics, KPIs)',
        'Internal tooling & admin systems',
        'Payment & marketplace operations (Stripe)',
        'Incident, dispute & edge-case handling',
        'Team leadership & coordination',
        'AI & automation implementation',
        'Systems thinking & problem structuring',
        'Agile / iterative development',
      ],
      achievements: [
        'Designed and implemented an internal AI support system handling ~85% of routine support tasks independently — answering customer questions, looking up users and marketplace activity, retrieving Stripe payment and refund information, and interacting directly with the CRM and support infrastructure',
        'Redesigned and significantly expanded the customer-facing AI support agent, increasing resolution rate from below 20% to more than 75% before escalation to human support — reducing ticket volume and improving response times',
        'Scaled support and operational systems to a platform with 100k–500k users',
        'Built and led a support team of 6–8 people, including hiring and performance management',
        'Designed and shipped a conflict resolution system end-to-end (DB, API, frontend), enabling consistent dispute handling',
        'Built a claims/insurance handling flow, replacing manual processes with structured product logic',
        'Defined core business rules and timelines for disputes, cancellations, and payment flows',
        'Built and optimised internal admin systems, enabling non-technical staff to operate complex workflows independently',
        'Replaced manual workflows with structured, scalable in-product processes — reducing reliance on manual support',
        'Acted as bridge between support, product, and engineering, aligning priorities and execution',
        'Enabled scaling of the support team without proportional increase in workload through automation and systemisation',
        'Translated customer insights into product features, improving user experience and reducing friction',
        'Contributed to broader UX improvements and product redesign initiatives',
      ],
      userGrowth: {
        title: 'Platform users during my tenure',
        subtitle: 'From 70k to 550k monthly users — Jan 2021 to May 2026',
        ariaLabel:
          'Line chart showing platform user growth from {start} in January 2021 to {end} in May 2026.',
        joinedHere: 'I joined — Oct 2022',
      },
      myersBriggs: {
        label: 'Myers-Briggs',
        type: 'ENTP',
        typeLetters: ['E', 'N', 'T', 'P'],
        intro:
          'I thrive in complex environments where I can combine problem-solving, systems thinking, and rapid iteration. I tend to be the person who connects engineering, operations, product, and user experience — finding patterns and solutions across areas that are usually siloed.',
        worksWithHeading: 'As an ENTP I naturally work with:',
        traits: [
          'complex problems',
          'improving flows and processes',
          'challenging inefficient systems',
          'ideation and execution',
          'fast learning across disciplines',
        ],
        outro:
          'In practice, this means I tend to thrive in roles with high autonomy, many moving parts, and a need for both strategic thinking and hands-on execution. I am especially motivated by making complex things simpler — for users, teams, and the business.',
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
    },
    welcome: {
      title: 'Velkommen',
      subtitle: 'Vælg udseende. Vælg sprog.',
      chooseTheme: 'Vælg udseende',
      chooseLanguage: 'Sprog',
      light: 'Lyst',
      dark: 'Mørkt',
      enter: 'Gå ind',
      enterHint: 'eller tryk Enter',
      languages: { en: 'English', da: 'Danish' },
    },
    tabs: {
      skills: 'Kompetencer',
      achievements: 'Resultater',
      personality: 'Personlighed',
      ai: 'Spørg AI',
      contact: 'Kontakt',
    },
    ai: {
      intro: 'Spørg om hvad som helst om Max — hans erfaring, kompetencer eller hvilken type roller han passer godt til.',
      suggestions: [
        'Hvilke roller passer Max godt til?',
        'Fortæl mig om Max’ største resultater.',
        'Hvordan griber Max komplekse problemer an?',
      ],
      placeholder: 'Stil et spørgsmål…',
      send: 'Spørg',
      sending: 'Tænker…',
      clear: 'Ryd samtale',
      youLabel: 'Dig',
      assistantLabel: 'AI',
      error: 'Noget gik galt. Prøv venligst igen.',
      emptyState: 'Din samtale vises her.',
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
      title: 'mit CV',
      pitch: 'Kort og engagerende pitch om dig selv.',
      experienceHeader:
        'Head of Support og Product Operations Lead hos Handyhand (08/2022 – 03/2026), København, Danmark.',
      languages: [
        'Dansk — Modersmål',
        'Engelsk — Fuld professionel kunnen',
      ],
      contactLabels: {
        email: 'E-mail',
        phone: 'Telefon',
        address: 'Adresse',
      },
      skills: [
        'Produktdrift og systemoptimering',
        'Produktejerskab og livscyklusstyring',
        'Procesdesign, skalerbarhed og automatisering',
        'Roadmap og prioritering',
        'Tværfunktionel koordinering (engineering, support, drift)',
        'Brugerrejse-, flow- og UX-design',
        'Definition af forretningslogik og regler',
        'Dataunderstøttede beslutninger (analytics, KPI’er)',
        'Interne værktøjer og adminsystemer',
        'Betalings- og marketplace-drift (Stripe)',
        'Hændelses-, tvist- og edge-case-håndtering',
        'Teamledelse og koordinering',
        'Implementering af AI og automatisering',
        'Systemtænkning og problemstrukturering',
        'Agil / iterativ udvikling',
      ],
      achievements: [
        'Designede og implementerede et internt AI-supportsystem, der selvstændigt håndterede ca. 85% af rutineprægede supportopgaver — besvarede kundespørgsmål, slog brugere og marketplace-aktivitet op, hentede betalings- og refunderingsinformation via Stripe API og interagerede direkte med CRM og supportinfrastruktur',
        'Redesignede og udvidede markant den kundevendte AI-supportagent og hævede løsningsraten fra under 20% til mere end 75% før eskalering til menneskelig support — reducerede ticket-volumen og forbedrede svartider',
        'Skalerede support- og driftssystemer til en platform med 100.000–500.000 brugere',
        'Byggede og ledede et supportteam på 6–8 personer, inkl. rekruttering og performance management',
        'Designede og leverede et konflikthåndteringssystem end-to-end (DB, API, frontend), der sikrer ensartet tvistbehandling',
        'Byggede et flow til skadehåndtering/forsikring, der erstattede manuelle processer med struktureret produktlogik',
        'Definerede centrale forretningsregler og tidsfrister for tvister, annulleringer og betalingsflows',
        'Byggede og optimerede interne adminsystemer, så ikke-tekniske medarbejdere kunne håndtere komplekse arbejdsgange selvstændigt',
        'Erstattede manuelle arbejdsgange med strukturerede, skalerbare in-produkt-processer — reducerede afhængighed af manuel support',
        'Fungerede som bro mellem support, produkt og engineering med fokus på prioriteter og eksekvering',
        'Muliggjorde skalering af supportteamet uden tilsvarende stigning i arbejdsbyrden gennem automatisering og systematisering',
        'Omsatte kundeindsigter til produktfeatures, der forbedrede brugeroplevelsen og reducerede friktion',
        'Bidrog til bredere UX-forbedringer og redesigninitiativer',
      ],
      userGrowth: {
        title: 'Platformbrugere i min ansættelsesperiode',
        subtitle: 'Fra 70k til 550k månedlige brugere — jan 2021 til maj 2026',
        ariaLabel:
          'Linjediagram der viser platformens brugervækst fra {start} i januar 2021 til {end} i maj 2026.',
        joinedHere: 'Jeg startede — okt. 2022',
      },
      myersBriggs: {
        label: 'Myers-Briggs',
        type: 'ENTP',
        typeLetters: ['E', 'N', 'T', 'P'],
        intro:
          'Jeg trives bedst i komplekse miljøer, hvor jeg kan kombinere problemløsning, systemforståelse og hurtig iteration. Jeg er typisk personen der forbinder teknik, drift, produkt og brugeroplevelse — og finder mønstre eller løsninger på tværs af områder, der normalt er opdelt.',
        worksWithHeading: 'Som ENTP arbejder jeg meget naturligt med:',
        traits: [
          'komplekse problemstillinger',
          'forbedring af flows og processer',
          'udfordring af ineffektive systemer',
          'idéudvikling og eksekvering',
          'hurtig læring på tværs af fagområder',
        ],
        outro:
          'Det betyder i praksis, at jeg ofte fungerer godt i roller med høj autonomi, mange bevægelige dele og behov for både strategisk tænkning og hands-on execution. Jeg motiveres især af at gøre komplekse ting simplere — både for brugere, teams og forretningen.',
      },
    },
  },
};
