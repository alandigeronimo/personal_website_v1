// Work shown on the Work page, grouped into four chapters that tell the story in order.
// Each chapter in workSections has a heading and a list of entries (cards).
// To add a card, copy one entry and paste it inside the chapter's entries list.
// A chapter can also have headingDetail: extra words shown on the same line as its heading, in the same style.
// Every field of an entry is optional:
// empty fields (like "" or []) are simply not shown on the page.
//
// organization: the company or school name
// organizationUrl:      optional. Makes the words in organizationLinkText (part of the organization name) a link.
// organizationLinkText: the words inside organization that should be the link
// location:     for example "Boston, MA" (optional)
// role:         your title or degree
// dates:        for example "July 2025 – Present"
// description:  a short summary
// note:         optional second line under the description. Plain text, or with a link inside it,
//               made of before / linkText / url / after (see the "This Website" example)
// links:        links for the whole job, like [{ label: "Website", url: "https://..." }]
// projects:     selected projects or experiences within this job. Each project can have:
//                 title:       the project name
//                 description: a short summary
//                 details:     longer text that opens when the visitor clicks "More details"
//                 links:       like [{ label: "Link", url: "https://..." }]
//
// dealGroups:   optional lists of deals under a heading, for example "Other Publicly Announced Deals:".
//               Each group has a heading and a list of deals. Each deal can have:
//                 title:       the deal name (it becomes a link if you also give a url)
//                 url:         where the title links to (opens in a new tab)
//                 description: a short summary shown under the title
//                 note:        an optional second line. Plain text like "A short sentence.", or with a
//                              link inside it, made of before / linkText / url / after (see the Colony Hardware example)
//               A group's heading can be "" to leave the heading out.
//               A group can also have a quote, like quote: { text: "...", attribution: "..." },
//               shown in a soft gray box right after that group's deals.
//
// dealExperience: optional "Select Deal Experience" list shown at the bottom of a whole chapter
//               (it is set on the chapter itself, next to heading and entries, not inside an entry).
//               It has a heading and a list of deals. Leave the list empty ([]) to show a placeholder.
//               Every field of a deal is optional. Copy this example into the deals list to add one:
//                 {
//                   company:     "Company Name",
//                   type:        "Sellside M&A",              (for example "Sellside M&A", "Financing")
//                   description: "A short summary of the transaction.",
//                   value:       "$000 million",              (only if the value is public)
//                   logo:        "assets/images/deals/company.png",
//                   url:         "https://..."                (makes the company name a link)
//                 }
//
// facts:        optional labeled lists, for example "Honors". Each has a label and a list of items.
//               Add bullets: true to a fact to show its items as a bulleted list.
//               Each item can have:
//                 name:      the main words, like "Metcalf Prize"
//                 detail:    optional extra words shown after a dash, in lighter text
//                 highlight: true makes the name bold so it stands out
//                 sub:       optional nested bullets, a list of short lines shown one step in under this bullet
//                            (for example sub: ["First detail.", "Second detail."])
//
// quests:       optional groups of experiences shown as small tiles and tags (used for the career break).
//               Each group has a label, plus any of:
//                 featured: bigger tiles, each with a title and an optional detail
//                 tags:     a list of short names shown as small pills (like places)
//
// Example of a filled-in project (do not copy these words, they are only an example of the format):
//   projects: [
//     {
//       title: "Project name",
//       description: "One or two sentences.",
//       details: "Longer explanation.",
//       links: [{ label: "Read more", url: "https://example.com" }]
//     }
//   ]

const workSections = [
  {
    heading: "Post-Banking Projects & AI Skill Development",
    entries: [
      {
        organization: "Char Fitness Club",
        role: "",
        dates: "",
        description: "",
        links: [],
        projects: [],
        facts: [
          {
            bullets: true,
            items: [
              {
                name: "Conducted discovery meetings with my trainer to identify operational inefficiencies that would benefit from automation.",
                sub: [
                  "Vibe coded a custom AI-enabled tool using Cursor to streamline client onboarding, scheduling, and administrative workflows."
                ]
              }
            ]
          }
        ]
      },
      {
        organization: "Claude Academy",
        role: "",
        dates: "",
        description: "",
        links: [],
        projects: [],
        facts: [
          {
            bullets: true,
            items: [
              {
                name: "Completed coursework in prompt engineering and practical applications of large language models, gaining hands-on experience using Claude for research, data analysis, and workflow automation across professional and personal projects."
              }
            ]
          }
        ]
      },
      {
        organization: "This Website",
        role: "",
        dates: "",
        description: "",
        facts: [
          {
            bullets: true,
            items: [
              {
                name: "Built this site with Cursor to showcase my work, interests, and adventures. Had a lot of fun exploring AI-assisted development and making something of my own."
              }
            ]
          }
        ],
        // GitHub pill sits under the bullet
        note: {
          before: "",
          linkText: "GitHub Repo",
          url: "https://github.com/alandigeronimo/personal_website_v1",
          after: ""
        },
        links: [],
        projects: []
      }
    ]
  },
  {
    heading: "Piper Sandler",
    headingDetail: "(Investment Banking Analyst – Services & Industrials Group)",
    entries: [
      {
        organization: "Piper Sandler",
        role: "",
        dates: "",
        description: "",
        links: [],
        projects: [],
        dealGroups: [
          {
            // Key projects: the deals I worked on most closely
            heading: "Key Projects:",
            deals: [
              {
                title: "Sell-Side: Sale of Elevated Facility Services Group to APi Group",
                url: "https://ir.apigroupcorp.com/News/press-releases/news-details/2024/APi-Group-Completes-Acquisition-of-Elevated-Facility-Services-Group/default.aspx",
                description: "Took ownership of key deal execution workstreams, developing the CIM, management presentation, and financial projections model while coordinating outreach to 200+ financial sponsors and strategic buyers.",
                // The second paragraph is shown as a "note" (a second line under the description)
                note: "Developed analyses highlighting incremental repair revenue opportunities and industry-leading technician retention, both of which became central diligence topics and helped support a strategic offer meaningfully above competing bids."
              },
              {
                title: "Debt Financing: $770M Financing for North American Rail Solutions",
                url: "https://dfwcapital.com/north-american-rail-solutions-combines-with-za-railroad-services/",
                description: "Helped secure Piper Sandler's debt capital markets advisory mandate, preparing pitch materials, an early-look presentation, and a comprehensive financial data pack within 14 days.",
                // The second paragraph is shown as a "note" (a second line under the description)
                note: "Developed a lender presentation highlighting the company's financial performance and debt service capacity to support a successful refinancing."
              },
              {
                title: "Potential Sell-Side: Sale of Multi-Utility Services Platform (Project Snowshoe)",
                description: "Led a Quality of Earnings (QoE) segmentation analysis that uncovered significant margin erosion across multiple service lines, including the company's core business.",
                note: "Prepared a presentation outlining findings for the Board, financial sponsor, and management, supporting the recommendation to pause the sale process until financial performance improved."
              }
            ],
            // Optional testimonial shown in a soft gray box after this group's deals
            quote: {
              text: "“Alan is a strong analyst, a go-to person, and a leader in the bullpen. He has provided a significant amount of guidance to the junior team and is a big part of the strong culture and work environment in the office.”",
              attribution: "— My MD during my second performance review"
            }
          },
          {
            heading: "Other Publicly Disclosed Deals:",
            deals: [
              {
                title: "Sell-Side: Sale of Surface Preparation Technologies to Frontline Road Safety",
                url: "https://www.prnewswire.com/news-releases/dominus-capital-announces-sale-of-surface-preparation-technologies-302653035.html",
                description: "Assumed associate-level responsibilities, overseeing analysts and third-party diligence while developing an LBO model and CIM."
              },
              {
                title: "Growth Equity / Financing: Tiger Infrastructure Partners' Investment in Minnesota Coaches",
                url: "https://www.tigerinfrastructure.com/documents/FG/tigerNew/news/638591_Tiger_Infrastructure_Partners_-_Minnesota_Coaches_Press_Release_December_2024_vF.pdf",
                description: "Developed a dynamic LBO model in collaboration with Tiger Infrastructure Partners to support its growth capital investment in Minnesota Coaches."
              },
              {
                title: "Sell-Side: Sale of Colony Hardware to White Cap",
                url: "https://audaxprivateequity.com/news/audax-private-equity-completes-sale-of-colony-hardware",
                description: "Developed the sell-side pitch that helped secure Piper Sandler's advisory mandate for Audax Private Equity's sale of Colony Hardware."
              },
              {
                title: "Sell-Side: Sale of BearCom to Siris Capital Group",
                url: "https://www.prnewswire.com/news-releases/siris-enters-into-agreement-to-acquire-bearcom-a-premier-distributor--integrator-of-voice-video--data-solutions-301997841.html",
                description: "Prepared the management presentation for prospective investor meetings and coordinated due diligence requests."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    heading: "University",
    entries: [
      {
        organization: "TwinTail Brews (CFO)",
        // The whole heading is a link to the University of Richmond article (opens in a new tab)
        organizationLinkText: "TwinTail Brews (CFO)",
        organizationUrl: "https://urnow.richmond.edu/features/article/-/22855/spider-students-mix-up-energy-drink-with-a-chill-twist.html",
        role: "",
        dates: "",
        description: "Launched an L-theanine-infused beverage and managed an $80K budget and financial operations in a two-semester entrepreneurship program.",
        links: [],
        projects: [],
        facts: []
      },
      {
        organization: "CFA Research Challenge (Team Captain)",
        // The whole heading is a link to the research report PDF stored in assets/documents (opens in a new tab)
        organizationLinkText: "CFA Research Challenge (Team Captain)",
        organizationUrl: "assets/documents/cfa-research-challenge.pdf",
        role: "",
        dates: "",
        description: "Captained the University of Richmond's 2023 CFA Research Challenge team, developing an equity research report on American Woodmark (NASDAQ: AMWD) and presenting investment recommendations to a panel of judges. Finished runner-up.",
        links: [],
        projects: [],
        facts: []
      },
      {
        organization: "University of Edinburgh Business School — Study Abroad (Fall 2021)",
        // The whole heading is a link to the Business School website (opens in a new tab)
        organizationLinkText: "University of Edinburgh Business School — Study Abroad (Fall 2021)",
        organizationUrl: "https://www.business-school.ed.ac.uk/",
        role: "",
        dates: "",
        description: "Studied abroad at the University of Edinburgh Business School in Scotland, gaining international academic and cultural experience.",
        links: [],
        projects: [],
        facts: []
      },
      {
        organization: "Metcalf Prize (2021)",
        // The whole heading is a link to the award's University of Richmond page (opens in a new tab)
        organizationLinkText: "Metcalf Prize (2021)",
        organizationUrl: "https://rc.richmond.edu/awards/awards-recipients.html#the-metcalf-prize",
        role: "",
        dates: "",
        description: "Received the University of Richmond's Metcalf Prize in recognition of outstanding leadership and character.",
        links: [],
        projects: [],
        facts: []
      }
    ]
  },
  {
    heading: "High School",
    // None of these entries has a link yet. To make a title a link, add organizationUrl and
    // organizationLinkText (the words to link), the same way the University entries do.
    entries: [
      {
        organization: "Shoes Unlimited",
        role: "",
        dates: "",
        description: "Founded and operated a sneaker and apparel resale business, generating $70K+ in revenue across 300+ transactions while managing inventory, analyzing market trends, and optimizing capital allocation.",
        links: [],
        projects: [],
        facts: []
      },
      {
        organization: "Varsity Ice Hockey",
        role: "",
        dates: "",
        description: "Served as team captain and received the Al Staph Award for perseverance after overcoming multiple vertebral fractures.",
        links: [],
        projects: [],
        facts: []
      },
      {
        organization: "Toni's Kitchen",
        role: "",
        dates: "",
        description: "Co-founded a community service initiative preparing meals for local families at a soup kitchen and helped organize school-wide service events producing over 1,000 packaged meals annually.",
        links: [],
        projects: [],
        facts: []
      },
      {
        organization: "From Houses to Homes",
        role: "",
        dates: "",
        description: "Worked alongside classmates to construct a home from the ground up for a family of four in Antigua, Guatemala, while building meaningful relationships with the family and local community.",
        links: [],
        projects: [],
        facts: []
      },
      {
        organization: "Student Athletic Council",
        role: "",
        dates: "",
        description: "Advocated for academic policies supporting student-athletes and successfully spearheaded an initiative to install a healthy snack vending machine in the school's basketball gym.",
        links: [],
        projects: [],
        facts: []
      }
    ]
  }
];
