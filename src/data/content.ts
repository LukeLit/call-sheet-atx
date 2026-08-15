export const site = {
  legalName: "Open Call",
  wordmark: "Open Call",
  product: "Muse",
  founder: "Luke Litman",
  city: "Austin, TX",
  productionUrl: "csa.ironreach.xyz",
  tagline: "Artists shouldn't have to be grant researchers to make a living from their work.",
  description:
    "Open Call helps artists find and apply to grants, fellowships, and residencies that already exist. Muse is the assistant. Austin first. Built for everywhere. We do not write artists checks.",
};

/**
 * Placeholder contact. Luke: replace `mailto` with a real address.
 * Do not treat this as a live inbox.
 */
export const contact = {
  label: "Talk to Luke",
  mailto:
    "mailto:REPLACE_WITH_YOUR_EMAIL?subject=Open%20Call%20%E2%80%94%20founding%20director",
  placeholderNote: "Placeholder mailto — swap the address in src/data/content.ts",
};

export const nav = [
  { href: "#problem", label: "The gap" },
  { href: "#platform", label: "The platform" },
  { href: "#ask", label: "The ask" },
];

export const hero = {
  scene: "01",
  slug: "Hero",
  kicker: "Starting in Austin. Built to go anywhere.",
  title: "Open Call",
  lede: "Artists shouldn't have to be grant researchers to make a living from their work.",
  muse: "Muse is the assistant.",
  body: "Open Call finds the programs that already exist. Muse helps you get through them. First city: Austin. Then anywhere.",
};

export const problem = {
  scene: "02",
  slug: "The gap",
  title: "The programs exist. The map does not.",
  body: [
    "Foundations, cities, states, and private programs already fund artists. The work is finding the ones that fit you, before the deadline.",
    "Deadlines hide in PDFs. Eligibility is a maze. Most artists hear about a grant after it closed. That is not a talent problem. That is a navigation problem.",
  ],
  points: [
    {
      label: "What is out there",
      text: "Money, space, and time already sit in other people’s programs. The work is finding the right door — wherever you work.",
    },
    {
      label: "What gets in the way",
      text: "Deadlines hide in PDFs. Forms assume you already know the system. People give up before they apply.",
    },
    {
      label: "What we are not",
      text: "We do not write artists checks. We navigate, match, teach, and refer. If a program already exists and it fits you, we help you get to it.",
    },
  ],
};

export const platform = {
  scene: "03",
  slug: "The platform",
  title: "Three surfaces. One product.",
  lede: "Open Call is the platform. Muse is how artists meet it. Muse, the artist app, and the ops desk. One job: get the right program in front of the right artist, in time.",
  surfaces: [
    {
      id: "muse",
      name: "Muse",
      role: "The assistant",
      text: "The artist-facing assistant. You talk about the work, the city, the moment you are in. Muse finds fits, explains eligibility in plain language, and walks the next step.",
    },
    {
      id: "app",
      name: "Artist app",
      role: "Profiles + matches",
      text: "Your profile, your matches, your deadlines, and the applications you already started. A place to see what is open and what is actually for you.",
    },
    {
      id: "ops",
      name: "Ops desk",
      role: "The grants database",
      text: "The human side. Real people keep the program list honest, review matches, and step in when a person should answer.",
    },
  ],
};

export const ask = {
  scene: "04",
  slug: "The ask",
  title: "We need founding directors.",
  body: [
    "Open Call is forming as a Texas nonprofit. The product is global. The legal home is Texas. The first market is Austin.",
    "This is governance, not a job. A few meetings. A clear mission. Your name on the papers. You are not being asked for money, a logo, or to run Muse.",
  ],
  cta: "Join as a founding director",
};

export const footer = {
  city: "Austin, TX",
  legal: "Open Call",
  product: "Muse",
  wordmark: "Open Call",
  line: "Open Call · Muse · Austin first, then everywhere",
  note: "Navigation, matching, education, referral. We do not write artists checks.",
};
