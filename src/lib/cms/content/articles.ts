import type { Article } from "../types";

export const articles: Article[] = [
  {
    slug: "performance-is-a-design-decision",
    title: "Performance is a design decision",
    excerpt:
      "A fast website isn't something engineering adds at the end. It is decided in the first sketches — by what you choose to show, load and animate.",
    category: "Web Development",
    publishedAt: "2026-09-15",
    readingMinutes: 5,
    author: "The Access Point",
    body: [
      {
        type: "p",
        text: "When a site feels slow, the instinct is to hand it to a developer and ask them to optimise it. Sometimes that helps. More often, the slowness was designed in: a hero video nobody asked for, five web fonts, a carousel that loads twelve full-size images before anyone scrolls.",
      },
      { type: "h2", text: "Speed is part of the experience" },
      {
        type: "p",
        text: "Visitors don't separate how a site looks from how it behaves. A beautiful page that stutters on a mid-range phone doesn't feel premium — it feels broken. That is why we treat performance as a design constraint from day one, the same way we treat brand colours or grid columns.",
      },
      { type: "h2", text: "Three questions we ask early" },
      {
        type: "ul",
        items: [
          "What does the visitor need in the first two seconds, and what can wait?",
          "Does this animation explain something, or is it decoration?",
          "Could this image be a lightweight vector, or be smaller, without losing meaning?",
        ],
      },
      {
        type: "p",
        text: "Answering these in the design phase costs nothing. Answering them after launch means rework.",
      },
      { type: "h2", text: "Animation, used sparingly" },
      {
        type: "p",
        text: "Animation should support understanding, not compete with it. When we use it, it is brief, uses inexpensive properties such as transform and opacity, and switches off for people who have asked their device to reduce motion.",
      },
      {
        type: "quote",
        text: "Premium animation must not mean a slow website.",
      },
      {
        type: "p",
        text: "If you are planning a new site, bring performance into the first conversation. It is far easier to design a fast experience than to rescue a slow one.",
      },
    ],
  },
  {
    slug: "learning-should-feel-human",
    title: "Learning should feel human",
    excerpt:
      "Why we believe technical education works best when curiosity replaces pressure and understanding comes before memorisation.",
    category: "Education",
    publishedAt: "2026-09-08",
    readingMinutes: 4,
    author: "The Access Point",
    body: [
      {
        type: "p",
        text: "Most people who say they are \"not technical\" were simply taught badly: too fast, too abstract, with too much fear of getting things wrong. We think technology is learnable by anyone who is given context and room to be curious.",
      },
      { type: "h2", text: "Understanding before memorisation" },
      {
        type: "p",
        text: "It is possible to memorise commands without knowing what they do. It works until something breaks. We would rather someone understand why a thing works, even if it takes a little longer, because understanding transfers to problems they haven't seen yet.",
      },
      { type: "h2", text: "Curiosity instead of pressure" },
      {
        type: "p",
        text: "Pressure narrows attention. Curiosity widens it. Good lessons start with a real question the learner already has, and make the next step feel like the obvious thing to try.",
      },
      {
        type: "ul",
        items: [
          "Start from a concrete problem, not a definition.",
          "Show the whole path so learners know where they are.",
          "Make mistakes cheap and informative.",
          "Connect each idea to something already understood.",
        ],
      },
      { type: "h2", text: "Where this is going" },
      {
        type: "p",
        text: "These ideas shape the workshops and the Academy we are designing. Access to knowledge shouldn't depend on where you started — and it should never be the barrier.",
      },
    ],
  },
  {
    slug: "why-we-start-with-discovery",
    title: "Why every project starts with discovery",
    excerpt:
      "Skipping straight to design feels faster. It rarely is. What a short discovery phase gives you — and what it saves.",
    category: "Digital Strategy",
    publishedAt: "2026-09-01",
    readingMinutes: 4,
    author: "The Access Point",
    body: [
      {
        type: "p",
        text: "Clients often arrive with a clear picture of the website they want. Sometimes that picture is exactly right. Often it describes a solution before the problem has been fully named — and that is where projects drift.",
      },
      { type: "h2", text: "What discovery actually is" },
      {
        type: "p",
        text: "Discovery is a short, focused phase where we learn how your business works, who you are trying to reach and what a successful outcome looks like. It ends with a shared, written understanding — not a slide deck.",
      },
      {
        type: "ul",
        items: [
          "Who are the most important visitors, and what do they need to do?",
          "What should happen after someone lands on the site?",
          "What content already exists, and what needs to be created?",
          "How will we know, six months after launch, that it worked?",
        ],
      },
      { type: "h2", text: "What it saves" },
      {
        type: "p",
        text: "A clear brief prevents the most expensive kind of change: the one discovered halfway through development. It also gives everyone the same yardstick for decisions, which makes feedback faster and calmer.",
      },
      {
        type: "p",
        text: "Discovery is the first step of our process for every project, whatever its size. It is also where we will tell you honestly if what you need is smaller — or different — than what you asked for.",
      },
    ],
  },
];
