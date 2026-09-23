import type { Course } from "../types";

/**
 * Training courses offered by The Access Point. Durations and fees are not published yet.
 * `modules` are syllabus outlines built from each course's published topics; confirm them against
 * the current syllabus. Some courses run as affiliated programmes: add
 * `affiliation: { partner, certificate }` to those entries (e.g. the university or certification
 * body and the certificate students receive).
 */
export const courses: Course[] = [
  {
    slug: "android-programming",
    title: "Android Programming",
    seoTitle: "Android App Development Course in Coimbatore",
    category: "Programming",
    summary:
      "Takes you from the basics of object-oriented programming and core Java to Android programming, so you can develop your own apps.",
    topics: ["OOP fundamentals", "Core Java", "Android development"],
    overview:
      "The Android Programming course at The Access Point teaches you to build Android apps from scratch. It starts with object-oriented programming and core Java, the foundation Android is built on, then moves to Android development: screens and layouts, user input, storing data and publishing an app. By the end you build and run your own Android app.",
    audience: [
      "Students in engineering, computer science, BCA, MCA and related courses",
      "Graduates preparing for jobs as Android or mobile developers",
      "Working professionals and entrepreneurs who want to build their own apps",
    ],
    prerequisites:
      "No prior programming experience is required, as the course starts with programming fundamentals. Basic computer skills are expected.",
    modules: [
      {
        title: "Object-oriented programming",
        points: ["Classes and objects", "Encapsulation, inheritance and polymorphism", "Interfaces and abstraction"],
      },
      {
        title: "Core Java",
        points: ["Syntax, data types and control flow", "Collections", "Exception handling", "Working with files"],
      },
      {
        title: "Android fundamentals",
        points: ["Android Studio and project structure", "Activities and the app lifecycle", "Layouts and UI components"],
      },
      {
        title: "Building complete apps",
        points: ["Handling user input and navigation", "Storing data on the device", "Connecting to web services", "Testing and publishing an app"],
      },
    ],
    outcomes: [
      "Write object-oriented programs in Java",
      "Design Android screens that work on different phone sizes",
      "Build, test and run a complete Android app",
      "Understand the steps to publish an app",
    ],
    faqs: [
      {
        q: "Do I need to know Java before joining the Android course?",
        a: "No. The course teaches object-oriented programming and core Java first, then moves on to Android development.",
      },
      {
        q: "Will I build a real app during the course?",
        a: "Yes. The course is practical, and you build and run your own Android app by the end of it.",
      },
    ],
  },
  {
    slug: "hybrid-mobile-apps",
    title: "Hybrid Mobile App Development",
    seoTitle: "Hybrid Mobile App Development Course in Coimbatore",
    category: "Programming",
    summary: "Build hybrid mobile apps using web technologies such as HTML, CSS, jQuery Mobile and PhoneGap.",
    topics: ["HTML", "CSS", "jQuery Mobile", "PhoneGap"],
    overview:
      "Hybrid mobile apps are built with web technologies (HTML, CSS and JavaScript) and packaged to run on phones like native apps. This course teaches you to build them: you learn HTML and CSS, mobile interfaces with jQuery Mobile, and packaging with PhoneGap and Apache Cordova, so one codebase can target both Android and iPhone.",
    audience: [
      "Web developers who want to build mobile apps with the skills they already have",
      "Students who want a fast route into mobile development",
      "Businesses and freelancers who need apps on more than one platform",
    ],
    prerequisites: "Basic computer skills. Some familiarity with HTML is helpful but not required.",
    modules: [
      { title: "Web foundations", points: ["HTML structure", "CSS styling and layout", "JavaScript basics"] },
      { title: "Mobile interfaces", points: ["Designing for touch screens", "jQuery Mobile pages and widgets", "Responsive layouts"] },
      {
        title: "Packaging hybrid apps",
        points: ["PhoneGap and Apache Cordova", "Accessing device features such as the camera and storage", "Building for Android and iPhone"],
      },
    ],
    outcomes: [
      "Build mobile interfaces with HTML, CSS and JavaScript",
      "Package a web app as an installable mobile app",
      "Use device features from a hybrid app",
    ],
    faqs: [
      {
        q: "What is the difference between a hybrid app and a native app?",
        a: "A native app is written in the platform's own language, such as Java or Kotlin for Android. A hybrid app is written once with web technologies and packaged for each platform. Hybrid apps are faster to build for several platforms; native apps can get more performance and deeper device access.",
      },
      {
        q: "Can one hybrid app run on both Android and iPhone?",
        a: "Yes. That is the main advantage of hybrid development: the same code is packaged for each platform.",
      },
    ],
  },
  {
    slug: "client-side-web-programming",
    title: "Client-Side Web Programming",
    seoTitle: "Web Development Course in Coimbatore (HTML, CSS, JavaScript)",
    category: "Programming",
    summary:
      "Takes you from HTML, CSS, JavaScript and JavaScript libraries to developing and hosting a full-fledged website.",
    topics: ["HTML", "CSS", "JavaScript", "JavaScript libraries", "Hosting"],
    overview:
      "Client-side web programming is everything that runs in the browser: the structure, design and behaviour of a website. This course takes you from HTML and CSS to JavaScript and JavaScript libraries, and finishes with you building and hosting a complete website on the internet.",
    audience: [
      "Beginners who want to start a career in web development",
      "Students who want to build websites for projects or freelance work",
      "Designers who want to turn their designs into working pages",
    ],
    prerequisites: "No programming experience is required. Basic computer skills are expected.",
    modules: [
      { title: "HTML", points: ["Page structure and semantic elements", "Forms, tables and media", "Accessibility basics"] },
      { title: "CSS", points: ["Selectors and the box model", "Flexbox and grid layouts", "Responsive design for mobile"] },
      { title: "JavaScript", points: ["Variables, functions and events", "Working with the DOM", "Form validation"] },
      { title: "Libraries and hosting", points: ["Using JavaScript libraries", "Domain names and hosting", "Publishing a complete website"] },
    ],
    outcomes: [
      "Build responsive web pages with HTML and CSS",
      "Add interactivity with JavaScript",
      "Publish and host a complete website",
    ],
    faqs: [
      {
        q: "What is the difference between client-side and server-side programming?",
        a: "Client-side code (HTML, CSS and JavaScript) runs in the visitor's browser and controls what they see and interact with. Server-side code (such as PHP, Java or C#) runs on the web server and handles databases and business logic. Our PHP and .NET courses cover the server side.",
      },
      {
        q: "Will I have a website online by the end of the course?",
        a: "Yes. The course finishes with building and hosting a full website.",
      },
    ],
  },
  {
    slug: "microsoft-dotnet",
    title: "Microsoft .NET",
    seoTitle: ".NET Course in Coimbatore (C#, ASP.NET)",
    category: "Programming",
    summary: "Takes you from HTML, CSS, JavaScript and C# to developing dynamic, database-driven web applications.",
    topics: ["HTML", "CSS", "JavaScript", "C#", "Databases"],
    overview:
      "The Microsoft .NET course teaches you to build dynamic, database-driven web applications with C# and the .NET platform. You start with the web front end (HTML, CSS and JavaScript), learn the C# language, then connect applications to databases to build complete web applications of the kind used by companies.",
    audience: [
      "Students and graduates aiming for .NET developer roles",
      "Developers moving to the Microsoft technology stack",
      "Professionals who maintain or build business applications",
    ],
    prerequisites: "Basic computer skills. Prior programming experience helps but is not required.",
    modules: [
      { title: "Web front end", points: ["HTML and CSS", "JavaScript basics"] },
      { title: "C# programming", points: ["Syntax and types", "Object-oriented programming in C#", "Collections and exception handling"] },
      { title: "Databases", points: ["SQL fundamentals", "Designing tables and relationships", "Querying data from C#"] },
      { title: "Web applications with .NET", points: ["Building dynamic pages", "Forms and validation", "Deploying a web application"] },
    ],
    outcomes: [
      "Write C# programs using object-oriented principles",
      "Design a database and query it with SQL",
      "Build and deploy a database-driven web application on .NET",
    ],
    faqs: [
      {
        q: "What is .NET used for?",
        a: ".NET is Microsoft's platform for building web applications, business software, APIs and services, mainly using the C# language. It is widely used in companies for internal and customer-facing applications.",
      },
      {
        q: "Do I need to know C# before joining?",
        a: "No. The course teaches C# from the basics before moving on to web applications.",
      },
    ],
  },
  {
    slug: "java-programming",
    title: "Java Programming",
    seoTitle: "Java Course in Coimbatore",
    category: "Programming",
    summary:
      "Covers object-oriented programming, best practices for OOP design patterns, the core Java libraries and JDBC for building desktop applications.",
    topics: ["OOP", "Design patterns", "Core Java libraries", "JDBC"],
    overview:
      "The Java Programming course teaches object-oriented programming in Java, good design with common OOP design patterns, the core Java libraries, and JDBC for connecting Java programs to databases. You finish by building database-backed desktop applications.",
    audience: [
      "Engineering, BCA and MCA students learning Java for coursework, projects or interviews",
      "Graduates preparing for Java developer roles",
      "Anyone planning to learn Android, which is built on Java",
    ],
    prerequisites: "No prior programming experience is required. Basic computer skills are expected.",
    modules: [
      { title: "Java fundamentals", points: ["Syntax, data types and operators", "Control flow and arrays", "Methods"] },
      { title: "Object-oriented programming", points: ["Classes and objects", "Inheritance, polymorphism and interfaces", "Packages and access control"] },
      { title: "Design patterns", points: ["Why design patterns matter", "Common creational, structural and behavioural patterns", "Writing maintainable code"] },
      { title: "Core libraries and JDBC", points: ["Collections and generics", "Exceptions and file I/O", "Connecting to databases with JDBC", "Building a desktop application"] },
    ],
    outcomes: [
      "Write well-structured object-oriented Java code",
      "Apply common design patterns",
      "Build a desktop application that stores data in a database",
    ],
    faqs: [
      {
        q: "Is Java good for beginners?",
        a: "Yes. Java's clear structure makes it a good first language for learning object-oriented programming, and it is still widely used in companies and for Android development.",
      },
      {
        q: "What is JDBC?",
        a: "JDBC (Java Database Connectivity) is the standard Java API for connecting to relational databases, running SQL queries and reading the results.",
      },
    ],
  },
  {
    slug: "php-training",
    title: "PHP Training",
    seoTitle: "PHP Course in Coimbatore",
    category: "Programming",
    summary: "Takes you from HTML, CSS, JavaScript and PHP to developing dynamic, database-driven web applications.",
    topics: ["HTML", "CSS", "JavaScript", "PHP", "Databases"],
    overview:
      "PHP is a server-side language that powers a large share of the web, including WordPress. This course takes you from the front end (HTML, CSS and JavaScript) to PHP and databases, so you can build dynamic, database-driven websites and web applications such as login systems, admin panels and online forms.",
    audience: [
      "Beginners who want to become full-stack web developers",
      "Front-end developers who want to learn server-side programming",
      "Freelancers building websites for clients",
    ],
    prerequisites: "No programming experience is required. Basic computer skills are expected.",
    modules: [
      { title: "Web front end", points: ["HTML and CSS", "JavaScript basics"] },
      { title: "PHP fundamentals", points: ["Syntax, variables and functions", "Handling forms", "Sessions and cookies"] },
      { title: "Databases", points: ["SQL fundamentals", "Connecting PHP to a database", "Create, read, update and delete operations"] },
      { title: "Web applications", points: ["User login and access control", "Security basics", "Deploying to a web server"] },
    ],
    outcomes: [
      "Build dynamic web pages with PHP",
      "Store and retrieve data from a database",
      "Build and deploy a complete database-driven web application",
    ],
    faqs: [
      {
        q: "Is PHP still used?",
        a: "Yes. PHP runs a large share of websites, including sites built on WordPress, and is common in web agencies and freelance work.",
      },
      {
        q: "Does the PHP course include front-end development?",
        a: "Yes. It covers HTML, CSS and JavaScript before moving on to PHP and databases.",
      },
    ],
  },
  {
    slug: "animation",
    title: "Animation",
    seoTitle: "Animation Course in Coimbatore (2D, 3D, VFX & Multimedia)",
    category: "Creative",
    summary: "Covers 2D and 3D animation, visual effects and multimedia.",
    topics: ["2D animation", "3D animation", "VFX", "Multimedia"],
    overview:
      "The Animation course covers 2D animation, 3D animation, visual effects (VFX) and multimedia. You learn the principles of animation, create 2D and 3D work, and combine animation, video and effects into finished multimedia projects for your portfolio.",
    audience: [
      "Students interested in careers in animation, film, gaming or advertising",
      "Designers who want to add motion to their skills",
      "Content creators who want to produce animated and video content",
    ],
    prerequisites: "No prior experience is required. An interest in drawing or design is helpful.",
    modules: [
      { title: "Principles of animation", points: ["Timing and spacing", "Storyboarding", "Character and object movement"] },
      { title: "2D animation", points: ["Drawing and designing for animation", "Frame-by-frame and tweened animation"] },
      { title: "3D animation", points: ["Modelling", "Texturing and lighting", "Rigging and animating", "Rendering"] },
      { title: "VFX and multimedia", points: ["Compositing and visual effects", "Combining video, audio and graphics", "Portfolio projects"] },
    ],
    outcomes: [
      "Apply the core principles of animation",
      "Create 2D and 3D animations",
      "Add visual effects and assemble multimedia projects",
      "Build a portfolio of your work",
    ],
    faqs: [
      {
        q: "Do I need to be good at drawing to learn animation?",
        a: "No. Drawing helps with 2D animation, but 3D animation, VFX and multimedia depend more on software skills, observation and practice.",
      },
      {
        q: "What is VFX?",
        a: "VFX (visual effects) is the creation or alteration of imagery that cannot be filmed directly, such as combining live footage with computer-generated elements. It is used in films, advertising and online video.",
      },
    ],
  },
  {
    slug: "hardware-and-networking",
    title: "Hardware & Networking",
    seoTitle: "Hardware & Networking Course in Coimbatore (A+, N+, CCNA)",
    category: "Infrastructure",
    summary: "Covers A+ and N+, along with CCNA and ethical hacking using scripts.",
    topics: ["A+", "N+", "CCNA", "Ethical hacking"],
    overview:
      "The Hardware & Networking course covers computer hardware and troubleshooting (A+), networking fundamentals (N+), Cisco networking (CCNA), and ethical hacking using scripts. It prepares you to assemble, repair and support computers, set up and manage networks, and understand how networks are secured and attacked.",
    audience: [
      "Students aiming for jobs in IT support, system administration or network engineering",
      "Professionals preparing for CompTIA A+, CompTIA Network+ or Cisco CCNA exams",
      "Anyone interested in starting a career in cyber security",
    ],
    prerequisites: "Basic computer skills. No prior hardware or networking experience is required.",
    modules: [
      { title: "Computer hardware (A+)", points: ["PC components and assembly", "Installing and configuring operating systems", "Troubleshooting and repair"] },
      { title: "Networking fundamentals (N+)", points: ["Network types and topologies", "IP addressing and subnetting", "Network devices and cabling"] },
      { title: "Cisco networking (CCNA)", points: ["Configuring routers and switches", "Routing and switching concepts", "VLANs and network services"] },
      { title: "Ethical hacking", points: ["How attacks work", "Scripting for security testing", "Securing systems and networks"] },
    ],
    outcomes: [
      "Assemble, configure and troubleshoot computers",
      "Design and configure small and medium networks",
      "Configure Cisco routers and switches",
      "Understand common attacks and how to defend against them",
    ],
    faqs: [
      {
        q: "What do A+, N+ and CCNA mean?",
        a: "A+ (CompTIA A+) covers computer hardware, operating systems and troubleshooting. N+ (CompTIA Network+) covers networking fundamentals. CCNA (Cisco Certified Network Associate) covers configuring and managing Cisco networks. They are industry certifications with their own exams.",
      },
      {
        q: "Does the course include the certification exams?",
        a: "The course prepares you for the topics these certifications cover. The exams are run by CompTIA and Cisco and are booked separately. Ask us about exam preparation and booking.",
      },
      {
        q: "What is ethical hacking?",
        a: "Ethical hacking is testing systems for security weaknesses with the owner's permission, so they can be fixed before attackers find them.",
      },
    ],
  },
  {
    slug: "cloud-computing",
    title: "Cloud Computing",
    seoTitle: "Cloud Computing Course in Coimbatore",
    category: "Infrastructure",
    summary: "Covers the basics of cloud computing and its applications.",
    topics: ["Cloud fundamentals", "Applications"],
    overview:
      "Cloud computing is the delivery of servers, storage, databases and software over the internet, paid for as you use them. This course covers the fundamentals of cloud computing, the main service and deployment models, and how businesses use the cloud to host websites, store data and run applications.",
    audience: [
      "Students and graduates starting a career in cloud or IT infrastructure",
      "Developers who want to deploy applications to the cloud",
      "Business owners and managers deciding whether to move to the cloud",
    ],
    prerequisites: "Basic computer skills. Familiarity with networking basics is helpful.",
    modules: [
      { title: "Cloud fundamentals", points: ["What cloud computing is", "Virtualisation", "Benefits, costs and risks"] },
      {
        title: "Service and deployment models",
        points: ["IaaS, PaaS and SaaS", "Public, private and hybrid clouds", "Major cloud providers"],
      },
      { title: "Applications of the cloud", points: ["Hosting websites and applications", "Cloud storage and backup", "Security and access control"] },
    ],
    outcomes: [
      "Explain cloud service and deployment models",
      "Choose appropriate cloud services for common business needs",
      "Understand the basics of deploying and securing applications in the cloud",
    ],
    faqs: [
      {
        q: "What is the difference between IaaS, PaaS and SaaS?",
        a: "IaaS (infrastructure as a service) rents you servers, storage and networks. PaaS (platform as a service) gives you a ready platform to run your code without managing servers. SaaS (software as a service) is finished software you use over the internet, such as email.",
      },
      {
        q: "Do I need programming skills for the cloud computing course?",
        a: "No. The course focuses on concepts and applications. Programming helps if you later want to build and deploy your own applications.",
      },
    ],
  },
];
