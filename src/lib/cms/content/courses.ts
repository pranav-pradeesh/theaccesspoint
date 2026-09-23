import type { Course } from "../types";

/**
 * Training courses offered by The Access Point. Durations and fees are not published yet.
 * Some courses run as affiliated programmes: add `affiliation: { partner, certificate }` to those
 * entries (e.g. the university or certification body and the certificate students receive).
 */
export const courses: Course[] = [
  {
    slug: "android-programming",
    title: "Android Programming",
    category: "Programming",
    summary:
      "Takes you from the basics of object-oriented programming and core Java to Android programming, so you can develop your own apps.",
    topics: ["OOP fundamentals", "Core Java", "Android development"],
  },
  {
    slug: "hybrid-mobile-apps",
    title: "Hybrid Mobile App Development",
    category: "Programming",
    summary: "Build hybrid mobile apps using web technologies such as HTML, CSS, jQuery Mobile and PhoneGap.",
    topics: ["HTML", "CSS", "jQuery Mobile", "PhoneGap"],
  },
  {
    slug: "client-side-web-programming",
    title: "Client-Side Web Programming",
    category: "Programming",
    summary:
      "Takes you from HTML, CSS, JavaScript and JavaScript libraries to developing and hosting a full-fledged website.",
    topics: ["HTML", "CSS", "JavaScript", "JavaScript libraries", "Hosting"],
  },
  {
    slug: "microsoft-dotnet",
    title: "Microsoft .NET",
    category: "Programming",
    summary: "Takes you from HTML, CSS, JavaScript and C# to developing dynamic, database-driven web applications.",
    topics: ["HTML", "CSS", "JavaScript", "C#", "Databases"],
  },
  {
    slug: "java-programming",
    title: "Java Programming",
    category: "Programming",
    summary:
      "Covers object-oriented programming, best practices for OOP design patterns, the core Java libraries and JDBC for building desktop applications.",
    topics: ["OOP", "Design patterns", "Core Java libraries", "JDBC"],
  },
  {
    slug: "php-training",
    title: "PHP Training",
    category: "Programming",
    summary: "Takes you from HTML, CSS, JavaScript and PHP to developing dynamic, database-driven web applications.",
    topics: ["HTML", "CSS", "JavaScript", "PHP", "Databases"],
  },
  {
    slug: "animation",
    title: "Animation",
    category: "Creative",
    summary: "Covers 2D and 3D animation, visual effects and multimedia.",
    topics: ["2D animation", "3D animation", "VFX", "Multimedia"],
  },
  {
    slug: "hardware-and-networking",
    title: "Hardware & Networking",
    category: "Infrastructure",
    summary: "Covers A+ and N+, along with CCNA and ethical hacking using scripts.",
    topics: ["A+", "N+", "CCNA", "Ethical hacking"],
  },
  {
    slug: "cloud-computing",
    title: "Cloud Computing",
    category: "Infrastructure",
    summary: "Covers the basics of cloud computing and its applications.",
    topics: ["Cloud fundamentals", "Applications"],
  },
];
