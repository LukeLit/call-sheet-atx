/**
 * /news. An article says only what the programs it names say (src/data/programs.json), and each one
 * carries those programs' official links and last-checked dates, so a stale article shows it.
 * `programs` are ids in the programs database; their facts are drawn on the page, not copied here.
 */
/** `p` runs before the list, `after` after it. */
export type NewsBlock = { h?: string; p?: string[]; ul?: string[]; after?: string[] };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  /** YYYY-MM-DD */
  date: string;
  programs: string[];
  blocks: NewsBlock[];
};

export const articles: Article[] = [
  {
    slug: "haam-open-enrollment-nov-1",
    title: "Nov. 1: open enrollment for insurance help starts. What HAAM says.",
    dek: "If you're a working musician, teacher, or DJ in the Austin area, HAAM's open enrollment for insurance help runs November 1 to December 15. The rules, the link, and who to call.",
    date: "2026-10-21",
    programs: ["haam"],
    blocks: [
      {
        h: "The dates",
        p: [
          "HAAM, the Health Alliance for Austin Musicians, lists open enrollment for insurance help as November 1 to December 15. HAAM also says people can join year-round.",
          "Dates and rules change. Check HAAM's own page before you act on this.",
        ],
      },
      {
        h: "Who HAAM is for",
        ul: [
          "A working musician, music teacher, or DJ, part time or full time.",
          "You live in Travis or a surrounding county.",
          "Your annual tax household income is at or below 400% of the federal poverty level. If you're self-employed, that's your net after expenses.",
          "You can show music work in the last 12 months: gigs, releases, teaching, and similar.",
        ],
        after: ["HAAM says to apply anyway if you're unsure. Whether you qualify is HAAM's decision, not ours."],
      },
      {
        h: "What HAAM offers",
        p: ["Premium assistance, primary care, dental, vision, hearing, mind and body, fitness, and healthcare navigation."],
      },
      {
        h: "How to start",
        ul: [
          "Request an application on HAAM's join page.",
          "Questions: 512-541-4226, option 2, or support@myhaam.org.",
        ],
      },
      {
        h: "If you're not a musician",
        p: [
          "HAAM is for musicians, music teachers, and DJs. If that isn't you, it isn't the route, and we don't have a health program for other kinds of work on file yet.",
          "People shopping for individual coverage can also look at HealthCare.gov. We haven't checked its dates for this article, so look them up there.",
          "If you work in tech or design and are between jobs, our questions page covers which programs we know about and which may not fit.",
        ],
      },
    ],
  },
];

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);
