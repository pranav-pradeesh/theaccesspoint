import type { Faq } from "../types";

/** General questions, shown on /faq with FAQPage structured data. */
export const generalFaqs: { group: string; items: Faq[] }[] = [
  {
    group: "About The Access Point",
    items: [
      {
        q: "What is The Access Point?",
        featured: true,
        a: "The Access Point is a company in Coimbatore, Tamil Nadu, that provides IT services to businesses (web development, software and mobile apps, UI/UX design, branding and digital marketing) and runs practical IT training courses for students and working professionals.",
      },
      {
        q: "Where is The Access Point located?",
        a: "Our office and training centre is at No. 2, Visweswarraya Street, Sai Baba Colony, K.K. Pudur Post, Coimbatore 641038, Tamil Nadu, India.",
      },
      {
        q: "How do I contact The Access Point?",
        a: "Call +91 88381 57323, email theaccesspoint@outlook.com, or use the contact form on this website. For course admissions, use the enquiry form on the Training page.",
      },
      {
        q: "Do you only work with businesses in Coimbatore?",
        a: "Training takes place at our Coimbatore centre. Website, software, design and marketing projects can be run remotely, so contact us wherever you are based.",
      },
    ],
  },
  {
    group: "Training and admissions",
    items: [
      {
        q: "Which IT courses does The Access Point offer?",
        a: "We offer Android Programming, Hybrid Mobile App Development, Client-Side Web Programming, Microsoft .NET, Java Programming, PHP Training, Animation (2D, 3D, VFX and multimedia), Hardware & Networking (A+, N+, CCNA and ethical hacking) and Cloud Computing.",
      },
      {
        q: "What are the course fees and duration?",
        featured: true,
        a: "Fees and duration vary by course and batch. Send a course enquiry or call +91 88381 57323 and we will give you the current fees, duration and batch timings.",
      },
      {
        q: "Are the courses classroom or online?",
        a: "Our courses are taught in the classroom at our Coimbatore centre. Contact us to ask about the options for the course you are interested in.",
      },
      {
        q: "Do I get a certificate after completing a course?",
        featured: true,
        a: "Several courses are offered as affiliated programmes, which lead to a certificate from the affiliated institution. Ask us which certificate the course you are interested in leads to.",
      },
      {
        q: "Who can join the courses?",
        a: "Students, graduates and working professionals. Most courses start from the fundamentals and do not need prior programming experience; each course page lists its prerequisites.",
      },
      {
        q: "How do I get admission?",
        a: "Fill in the course enquiry form on the Training page or on any course page, or call us. We will contact you with the fees, duration and next batch dates.",
      },
    ],
  },
  {
    group: "Projects and services",
    items: [
      {
        q: "How do I start a project with The Access Point?",
        featured: true,
        a: "Send your requirements through the contact form or call us. We discuss what you need, then send a proposal with the scope, timeline and a quote before any work starts.",
      },
      {
        q: "How much does a website or app cost?",
        a: "It depends on the scope: the number of pages or screens, the features and whether you need content. We give a quote after understanding your requirements.",
      },
      {
        q: "Do you support websites and software after launch?",
        a: "Yes. We offer hosting, maintenance, updates and fixes after launch.",
      },
    ],
  },
];
