export const philosophy = [
  { title: "Integrity", line: "Our reputation is more important than our paycheck." },
  { title: "Curiosity", line: "The urge to acquire new competencies never ends." },
  { title: "Innovation", line: "Forever searching, experimenting and creating." },
  { title: "Partnership", line: "We believe in long-term relationships." },
  { title: "Accessibility", line: "Technology and knowledge should be accessible." },
] as const;

export const mission = [
  { verb: "Facilitate", line: "World-class technical education." },
  { verb: "Develop", line: "High-quality standards with social impact." },
  { verb: "Share", line: "Knowledge without unnecessary barriers." },
  { verb: "Forecast", line: "Understand where technology is going." },
  { verb: "Open", line: "Make learning accessible." },
] as const;

export const accessNetwork = ["Technology", "Knowledge", "Design", "Education", "Opportunity"] as const;

// Principles describe how we intend to work — no invented metrics or outcomes.
export const pillars = [
  {
    title: "Human-first",
    line: "We start with the people who will use what we build, and write in language they understand.",
  },
  {
    title: "End-to-end",
    line: "Strategy, design, development and launch under one roof, so nothing is lost between hand-offs.",
  },
  {
    title: "Transparent",
    line: "Clear scope, honest timelines and visible progress. If something changes, you hear it from us first.",
  },
  {
    title: "Long-term",
    line: "We build things that can be maintained and grown, and we stay around after launch.",
  },
  {
    title: "Curious",
    line: "We keep learning so your product benefits from what is new — only when it is genuinely better.",
  },
] as const;

export const processSteps = [
  {
    index: "01",
    title: "Discover",
    line: "Understand the business, the audience and what success looks like before anything is designed.",
  },
  {
    index: "02",
    title: "Define",
    line: "Turn what we learn into a clear scope, structure and plan everyone can agree on.",
  },
  {
    index: "03",
    title: "Design",
    line: "Shape the experience — flows, interface and brand — and test it as a working prototype.",
  },
  {
    index: "04",
    title: "Develop",
    line: "Engineer it properly: accessible, fast, secure and easy for your team to manage.",
  },
  {
    index: "05",
    title: "Deploy",
    line: "Launch carefully with monitoring, analytics and a handover your team can rely on.",
  },
  {
    index: "06",
    title: "Grow",
    line: "Measure, learn and improve. Launch is the start of the product's life, not the end.",
  },
] as const;
