export const site = {
  legalName: "Open Call",
  wordmark: "Open Call",
  product: "Muse",
  founder: "Luke Litman",
  city: "Austin, TX",
  productionUrl: "csa.ironreach.xyz",
  tagline: "Artists shouldn't have to be grant researchers to make a living from their work.",
  description:
    "Open Call helps people find grants, health programs, work help, and other support that already exists. Muse is the assistant. Austin first. Built for everywhere. We do not write checks.",
};

export const contact = {
  label: "Talk to us",
  href: "/contact",
  email: "luke.litman@gmail.com",
  mailto:
    "mailto:luke.litman@gmail.com?subject=Open%20Call",
  seatMailto:
    "mailto:luke.litman@gmail.com?subject=Open%20Call%20%E2%80%94%20I%20want%20the%20seat",
};

/** Public-sell nav. Home and /contact use this. No directors item. */
export const nav = [
  { href: "/#problem", label: "The gap" },
  { href: "/#map", label: "The map" },
  { href: "/#platform", label: "The platform" },
];

/** /directors can show Directors in nav. Home does not. */
export const directorsNavItem = { href: "/directors", label: "Directors" };

export const directorsLink = {
  href: "/directors",
  label: "For founding directors",
};

export const hero = {
  scene: "01",
  slug: "Hero",
  kicker: "Starting in Austin. Built to go anywhere.",
  title: "Open Call",
  lede: "Artists shouldn't have to be grant researchers to make a living from their work.",
  muse: "Muse is the assistant.",
  body: "Grants stay the main draw. The same map covers health, work, and the other help that keeps a gig month together. First city: Austin. Then anywhere.",
  primaryCta: { href: "#map", label: "See the map" },
  secondaryCta: { href: "#platform", label: "How it works" },
  tertiaryCta: { href: "/contact", label: "Talk to us" },
};

export const problem = {
  scene: "02",
  slug: "The gap",
  title: "The programs exist. The map does not.",
  body: [
    "Foundations, cities, states, and private programs already fund the work. Health programs, workforce offices, and small-business help already sit in the same city. The work is finding the ones that fit you, before the deadline.",
    "Deadlines hide in PDFs. Eligibility is a maze. Most people hear about a program after it closed. That is not a talent problem. That is a navigation problem.",
  ],
  points: [
    {
      label: "What is out there",
      text: "Money, space, time, health coverage, and work help already sit in other people’s programs. The work is finding the right door — for the month you are actually in.",
    },
    {
      label: "What gets in the way",
      text: "Deadlines hide in PDFs. Forms assume you already know the system. People give up before they apply. A lot of this exists and almost nobody tells you.",
    },
    {
      label: "What we are not",
      text: "We do not write checks. We navigate, match, teach, and refer. If a program already exists and it fits you, we help you get to it.",
    },
  ],
};

export const map = {
  scene: "03",
  slug: "The map",
  title: "Match the person. Not just the grant.",
  lede:
    "The workbench is still grants. Muse also maps the rest of a working life — health, work, business help, and the programs most people never hear about. You should not have to already know the name of the thing you need.",
  items: [
    {
      id: "grants",
      name: "Grants and the workbench",
      role: "The main draw",
      text: "Fellowships, residencies, project grants, and the forms that come with them. This is the core. Muse finds the ones that fit the work, then walks the application in plain language.",
    },
    {
      id: "health",
      name: "Health programs",
      role: "HAAM and the rest",
      text: "HAAM — Health Alliance for Austin Musicians — is the one most people mean when they say musician health in this city. Muse also looks for other coverage and care programs that fit how you actually work.",
    },
    {
      id: "work",
      name: "Work and TWC",
      role: "Texas Workforce Commission",
      text: "TWC and other individual services for people with uneven months. A few gigs, a shift job, a gap between both. Training, benefits, and the offices that already exist for that.",
    },
    {
      id: "business",
      name: "Business help",
      role: "Small-business grants and tools",
      text: "If the work is also a business — a studio, a band, a one-person shop — there are grants and services for that too. Muse treats them as part of the same map.",
    },
    {
      id: "hidden",
      name: "Whatever you need this month",
      role: "The stuff nobody told you about",
      text: "Programs that exist and most people never hear about. The logic is simple: match the individual. Not “artist grants only.”",
    },
  ],
};

export const platform = {
  scene: "04",
  slug: "The platform",
  title: "Three surfaces. One product.",
  lede: "Open Call is the platform. Muse is how people meet it. Muse, the app, and the ops desk. One job: get the right program in front of the right person, in time.",
  surfaces: [
    {
      id: "muse",
      name: "Muse",
      role: "The assistant",
      text: "You talk about the work, the city, the month you are in. Muse finds fits — grants first, then health, work, and the rest — explains eligibility in plain language, and walks the next step.",
    },
    {
      id: "app",
      name: "The app",
      role: "Profiles + matches",
      text: "Your profile, your matches, your deadlines, and the applications you already started. A place to see what is open and what is actually for you.",
    },
    {
      id: "ops",
      name: "Ops desk",
      role: "The program list",
      text: "The human side. Real people keep the list honest, review matches, and step in when a person should answer.",
    },
  ],
  chat: [
    {
      who: "Artist",
      text: "I play a few gigs a month and I work at an Apple Store. I need health coverage. Is there anything for that, or just fall grants?",
    },
    {
      who: "Muse",
      text: "Both. HAAM is the Health Alliance for Austin Musicians — start there. I can walk you through who they cover, and what TWC looks like if the gigs aren’t covering the month. Then we can look at grants if you still want those.",
    },
  ],
};

export const closer = {
  title: "The work is finding the door.",
  body: "We navigate, match, teach, and refer. We do not write checks.",
};

export const directors = {
  scene: "01",
  slug: "The seats",
  kicker: "For the two open seats.",
  title: "I need two more directors.",
  spiel: [
    "I'm forming Open Call. Artists shouldn't have to be grant researchers to make a living from their work. Muse is the assistant. We find the programs that already exist — grants first, then health, work, the rest of a working life. We do not write checks.",
    "I want this to be a Texas nonprofit. That's the legal home. The product is global. First market is Austin. Austin is where I can show up. It is not the brand.",
    "Texas wants three people on the papers. I'm one. That leaves two seats. This is governance, not a job. A few meetings. Bylaws, officers, the 501(c)(3) path. Your name on the formation. You keep the work honest.",
    "I'm not asking for money. Not a logo. Not a public partnership. Not to run Muse. If you want to give later, that's separate. Today the ask is the seat.",
  ],
  seats: [
    {
      id: "1",
      status: "filled",
      name: "Luke Litman",
      role: "Organizer · Director 1",
      city: "Austin, TX",
      photo: {
        src: "/images/luke.png",
        width: 1600,
        height: 1600,
        alt: "Portrait of Luke Litman.",
      },
      bio: "Artist, designer, builder. SVA-trained illustrator who spent twenty years in games and creative technology, and 14+ years doing pro-bono work for musicians. He founded Metal Games and IronReach. He is forming Open Call so working artists can find the grants, health programs, and other help that already exist — Muse is the assistant.",
    },
    {
      id: "2",
      status: "open",
      name: "Open",
      role: "Director 2",
    },
    {
      id: "3",
      status: "open",
      name: "Open",
      role: "Director 3",
    },
  ],
  next: {
    title: "If you want in",
    body: "Write me. Say you want the seat, who you are, and why you'd be good. That's enough.",
    cta: "I'm in",
    hint: "luke.litman@gmail.com",
  },
};

export const footer = {
  city: "Austin, TX",
  legal: "Open Call",
  product: "Muse",
  wordmark: "Open Call",
  line: "Open Call · Muse · Austin first, then everywhere",
  note: "Navigation, matching, education, referral. We do not write checks.",
};

export const photos = {
  capitolMusic: {
    src: "/images/capitol-music.jpg",
    width: 2000,
    height: 1601,
    alt: "Two musicians play acoustic guitars on a stone plaza, with the Texas Capitol dome in the distance.",
    caption: "Live outdoor music, Austin. Photograph by Larry D. Moore.",
  },
  farmersMarket: {
    src: "/images/farmers-market-music.jpg",
    width: 2000,
    height: 1125,
    alt: "Musicians on a shaded outdoor stage, with a sunlit plaza, red umbrellas, and market tents behind them.",
    caption: "Daytime set at Hope Farmers Market, Plaza Saltillo, Austin. Photograph by Larry D. Moore.",
  },
  graffitiPark: {
    src: "/images/graffiti-park.jpg",
    width: 2000,
    height: 1330,
    alt: "A terraced outdoor graffiti park under a clear sky, with the Austin skyline in the distance.",
    caption: "Public art at the former HOPE Outdoor Gallery, Castle Hill, Austin. Photograph by Justraveling.com.",
  },
  mosaic: {
    src: "/images/south-austin-mosaic.jpg",
    width: 2000,
    height: 1335,
    alt: "A tiled mosaic portrait of a person in a cowboy hat on a weathered outdoor wall.",
    caption: "Public mosaic, South Austin. Photograph by Carol M. Highsmith, Library of Congress.",
  },
};

export const credits = [
  {
    file: "public/images/capitol-music.jpg",
    subject: "Live outdoor music near the Texas Capitol, Austin (2014)",
    photographer: "Larry D. Moore",
    source: "Wikimedia Commons",
    license: "CC BY 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Austin_marathon_2014_music.jpg",
  },
  {
    file: "public/images/farmers-market-music.jpg",
    subject: "Live music at Hope Farmers Market, Plaza Saltillo, Austin",
    photographer: "Larry D. Moore",
    source: "Wikimedia Commons",
    license: "CC BY 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Live_Music_Hope_Farmers_Market_Plaza_Saltillo.jpg",
  },
  {
    file: "public/images/graffiti-park.jpg",
    subject: "HOPE Outdoor Gallery / Graffiti Park at Castle Hill, Austin",
    photographer: "Justraveling.com",
    source: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Graffiti_Park_Castle_Hill.jpg",
  },
  {
    file: "public/images/south-austin-mosaic.jpg",
    subject: "Public mosaic in South Austin",
    photographer: "Carol M. Highsmith",
    source: "Library of Congress / Wikimedia Commons",
    license: "Public domain",
    url: "https://www.loc.gov/pictures/item/2014632521/",
  },
];
