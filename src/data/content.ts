export const site = {
  legalName: "Call Sheet ATX",
  wordmark: "Call Sheet ATX",
  product: "Muse",
  founder: "Luke Litman",
  city: "Austin, TX",
  productionUrl: "csa.ironreach.xyz",
  tagline: "The call sheet for Austin artists looking for grants and programs.",
};

/**
 * Placeholder contact. Luke: replace `mailto` with a real address.
 * Do not treat this as a live inbox.
 */
export const contact = {
  label: "Talk to Luke",
  mailto:
    "mailto:REPLACE_WITH_YOUR_EMAIL?subject=Call%20Sheet%20ATX%20%E2%80%94%20founding%20director",
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
  kicker: "Austin, TX  ·  Production",
  title: "Call Sheet ATX",
  lede: "The call sheet for Austin artists looking for grants and programs.",
  muse: "Muse is the assistant.",
  body: "We help artists find the grants and programs that already exist — and get through them — so they can make a living from their art. Austin is the first city we are standing up.",
};

export const problem = {
  scene: "02",
  slug: "The gap",
  title: "The programs exist. The map does not.",
  body: [
    "Grants, fellowships, residencies, and city programs already exist. Artists — especially musicians — still miss them. Not because they aren’t working. Because the list is scattered, the language is a maze, and nobody’s job is to walk you through it.",
    "Making a living from your art is the point. Navigation shouldn’t be the second job. We start in Austin. The product is built to go further.",
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
      text: "We are not writing you a check. We hand you the call sheet — then stay with you through the scene.",
    },
  ],
};

export const platform = {
  scene: "03",
  slug: "The platform",
  title: "Three surfaces. One product.",
  lede: "Call Sheet ATX is the platform. Muse is how artists meet it. This is the product — not a brochure around a future idea.",
  surfaces: [
    {
      id: "muse",
      name: "Muse",
      role: "The assistant",
      text: "A chat that knows the landscape. Ask what you need. Get a match, a next step, and a plain-English read of the form.",
    },
    {
      id: "app",
      name: "Artist app",
      role: "Profiles + matches",
      text: "A simple frontend. Your profile, your matches, the programs that actually fit. Not another social network.",
    },
    {
      id: "ops",
      name: "Ops desk",
      role: "The grants database",
      text: "The living list. Someone has to keep the programs honest and current. That is the desk.",
    },
  ],
};

export const ask = {
  scene: "04",
  slug: "The ask",
  title: "We need founding directors.",
  body: [
    "Call Sheet ATX is forming as a Texas nonprofit. The mission is simple: connect artists to grants and other existing programs so they can make a living from their art. Austin is the first market — not the ceiling.",
    "This is governance, not a full-time job. A few meetings. A clear mission. Your name on the papers. Help keep the work honest while Muse goes to work.",
  ],
  cta: "Join as a founding director",
};

export const footer = {
  city: "Austin, TX",
  legal: "Call Sheet ATX",
  product: "Muse",
  wordmark: "Call Sheet ATX",
  note: "Navigation, matching, education, referral. Not a check-writing shop.",
};
