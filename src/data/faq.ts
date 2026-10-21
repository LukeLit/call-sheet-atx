/**
 * /faq. Answers stick to what the programs database says (src/data/programs.json): no eligibility
 * calls, no invented amounts, nothing about a program that is not on file.
 */
export const faqIntro = {
  kicker: "Questions",
  title: "Questions artists ask.",
  lede: "Plain answers. If yours isn't here, ask Muse or write to me.",
};

export const faqStory = {
  title: "Why I'm building this",
  body: [
    "I came to New York as a starving artist, and when illustration work got sparse I leaned on programs to get by. Later it was web design, then print, now games and apps. The work changed. Sometimes the need for a little help came back.",
    "Right now people across tech are feeling the same squeeze as the job market shrinks. We could all use some relief while we adjust to this new terrain.",
  ],
  sign: "Luke",
};

export type Faq = { q: string; a: string[] };

export const faqs: Faq[] = [
  {
    q: "What is Open Call?",
    a: [
      "A guide to programs that already exist: grants, health coverage, workforce help, and small-business programs for working artists and gig workers. Muse, the assistant, points you to the ones worth checking and links to each program's official page.",
      "We do not write checks, and we do not decide who qualifies.",
    ],
  },
  {
    q: "I've never applied for anything. Where do I start?",
    a: [
      "Tell Muse about your work, your city, and the month you're in. It will point to programs worth a look and say what each one asks for, in plain language. Then go to the program's own page. That's where you apply.",
    ],
  },
  {
    q: "I don't make art full time. Does that count?",
    a: [
      "A lot of programs are written for people with uneven work. HAAM, the Health Alliance for Austin Musicians, takes musicians, music teachers, and DJs part time or full time. The Texas Workforce Commission (TWC) helps people with uneven work, and someone with a few gigs plus a retail job can still ask.",
      "Every program sets its own rules, so check the one you're looking at.",
    ],
  },
  {
    q: "Can you tell me if I'm eligible?",
    a: [
      "No. Each program decides that, and we won't guess. Muse shows the program's own wording and links to the official page so you can check.",
    ],
  },
  {
    q: "I work in tech, games, or design, and I'm out of work. Is any of this for me?",
    a: [
      "Some of it may be, and some isn't. TWC is the state's workforce agency: unemployment, training, and workforce help for people with uneven work, not only artists. Whether you qualify is TWC's call.",
      "City and state arts programs are written for artists and creative businesses, and each one defines who counts, so an illustrator, designer, or game artist may fit one and not another. HAAM is for musicians.",
      "I would rather tell you a program isn't a fit than send you chasing it. Ask Muse about your situation and read the official wording.",
    ],
  },
  {
    q: "Why only Austin?",
    a: [
      "Open Call is a small demo, and its library is limited to Austin programs for now. The product is built to travel.",
    ],
  },
  {
    q: "How current is the information?",
    a: [
      "Muse tells you when each program was last checked against its official page, and whether its round is open, closed, or not open yet. Rounds close. If something looks old or wrong, check the official page and tell me.",
    ],
  },
  {
    q: "Something is wrong or missing. Who do I tell?",
    a: [
      "Write to me. This is a demo and I'd like to hear how it goes, including where it got in your way, and which programs you wish were on it.",
    ],
  },
  {
    q: "Who is behind Open Call?",
    a: [
      "I'm Luke Litman, an illustrator and designer in Austin. Open Call is forming as a Texas nonprofit. More on the directors page.",
    ],
  },
];
