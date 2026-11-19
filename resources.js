"use strict";

// Curated study resources. Add or edit entries here, commit, and Azure redeploys the site.
const CATEGORIES = ["Mathematics", "Science", "Computing", "Cloud & Azure", "General Learning"];

const RESOURCES = [
  // Mathematics
  {
    title: "Khan Academy: Math",
    url: "https://www.khanacademy.org/math",
    category: "Mathematics",
    description: "Free lessons and practice from arithmetic to calculus and linear algebra.",
    tags: ["algebra", "geometry", "calculus", "statistics", "practice"]
  },
  {
    title: "Paul's Online Math Notes",
    url: "https://tutorial.math.lamar.edu/",
    category: "Mathematics",
    description: "Clear notes and worked examples for algebra, calculus and differential equations.",
    tags: ["calculus", "algebra", "differential equations", "notes", "examples"]
  },
  {
    title: "Wolfram MathWorld",
    url: "https://mathworld.wolfram.com/",
    category: "Mathematics",
    description: "An encyclopedia of mathematical concepts, formulas and theorems.",
    tags: ["reference", "formulas", "theorems", "encyclopedia"]
  },
  {
    title: "Desmos Graphing Calculator",
    url: "https://www.desmos.com/calculator",
    category: "Mathematics",
    description: "Plot functions and explore equations interactively in the browser.",
    tags: ["graphing", "functions", "calculator", "plot"]
  },
  {
    title: "GeoGebra",
    url: "https://www.geogebra.org/",
    category: "Mathematics",
    description: "Interactive geometry, algebra and calculus tools for visual learning.",
    tags: ["geometry", "algebra", "interactive", "graphing"]
  },
  {
    title: "3Blue1Brown",
    url: "https://www.3blue1brown.com/",
    category: "Mathematics",
    description: "Visual explanations of linear algebra, calculus and other mathematical ideas.",
    tags: ["video", "linear algebra", "calculus", "visual"]
  },
  {
    title: "OpenStax: Math textbooks",
    url: "https://openstax.org/subjects/math",
    category: "Mathematics",
    description: "Free, peer-reviewed college textbooks covering core mathematics courses.",
    tags: ["textbook", "college", "statistics", "free"]
  },

  // Science
  {
    title: "Khan Academy: Science",
    url: "https://www.khanacademy.org/science",
    category: "Science",
    description: "Free lessons in physics, chemistry, biology and earth science.",
    tags: ["physics", "chemistry", "biology", "practice"]
  },
  {
    title: "PhET Interactive Simulations",
    url: "https://phet.colorado.edu/",
    category: "Science",
    description: "Free interactive science and math simulations from the University of Colorado Boulder.",
    tags: ["physics", "chemistry", "simulation", "interactive"]
  },
  {
    title: "OpenStax: Science textbooks",
    url: "https://openstax.org/subjects/science",
    category: "Science",
    description: "Free college textbooks for biology, chemistry, physics and more.",
    tags: ["textbook", "biology", "chemistry", "physics", "free"]
  },
  {
    title: "Ptable: Periodic Table",
    url: "https://ptable.com/",
    category: "Science",
    description: "An interactive periodic table with properties, isotopes and orbitals.",
    tags: ["chemistry", "elements", "periodic table", "reference"]
  },
  {
    title: "The Physics Classroom",
    url: "https://www.physicsclassroom.com/",
    category: "Science",
    description: "Beginner-friendly physics tutorials, animations and practice problems.",
    tags: ["physics", "mechanics", "electricity", "tutorial", "practice"]
  },
  {
    title: "NASA Science",
    url: "https://science.nasa.gov/",
    category: "Science",
    description: "News, missions and explanations covering astronomy, Earth science and space.",
    tags: ["space", "astronomy", "earth", "planets"]
  },
  {
    title: "CK-12",
    url: "https://www.ck12.org/",
    category: "Science",
    description: "Free STEM lessons and practice for science and math topics.",
    tags: ["biology", "chemistry", "physics", "math", "lessons"]
  },

  // Computing
  {
    title: "freeCodeCamp",
    url: "https://www.freecodecamp.org/",
    category: "Computing",
    description: "Free coding lessons and projects covering web development, data and more.",
    tags: ["programming", "javascript", "python", "web", "projects"]
  },
  {
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org/",
    category: "Computing",
    description: "Reliable documentation and tutorials for HTML, CSS and JavaScript.",
    tags: ["html", "css", "javascript", "web", "documentation"]
  },
  {
    title: "Harvard CS50",
    url: "https://cs50.harvard.edu/x/",
    category: "Computing",
    description: "An introductory computer science course with free lectures and problem sets.",
    tags: ["programming", "computer science", "course", "c", "python"]
  },
  {
    title: "The Python Tutorial",
    url: "https://docs.python.org/3/tutorial/",
    category: "Computing",
    description: "The official guide to learning the Python language.",
    tags: ["python", "programming", "documentation", "tutorial"]
  },
  {
    title: "W3Schools",
    url: "https://www.w3schools.com/",
    category: "Computing",
    description: "Beginner-friendly tutorials with editable examples for many languages.",
    tags: ["html", "css", "sql", "javascript", "tutorial"]
  },
  {
    title: "VisuAlgo",
    url: "https://visualgo.net/",
    category: "Computing",
    description: "Animated visualizations of data structures and algorithms.",
    tags: ["algorithms", "data structures", "sorting", "visualization"]
  },
  {
    title: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/",
    category: "Computing",
    description: "Articles and practice problems on programming and computer science topics.",
    tags: ["programming", "algorithms", "interview", "practice"]
  },

  // Cloud & Azure
  {
    title: "Microsoft Azure Documentation",
    url: "https://learn.microsoft.com/en-us/azure/",
    category: "Cloud & Azure",
    description: "Official documentation, quickstarts and tutorials for Azure services.",
    tags: ["azure", "cloud", "documentation", "microsoft"]
  },
  {
    title: "AZ-900: Azure Fundamentals",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
    category: "Cloud & Azure",
    description: "Certification overview and free learning paths for Azure fundamentals.",
    tags: ["azure", "az-900", "certification", "cloud", "exam"]
  },
  {
    title: "Azure Static Web Apps",
    url: "https://learn.microsoft.com/en-us/azure/static-web-apps/",
    category: "Cloud & Azure",
    description: "Documentation for the Azure service that hosts this website.",
    tags: ["azure", "hosting", "static web apps", "github"]
  },
  {
    title: "Azure Pricing Calculator",
    url: "https://azure.microsoft.com/en-us/pricing/calculator/",
    category: "Cloud & Azure",
    description: "Estimate the cost of Azure services before you use them.",
    tags: ["azure", "cost", "pricing", "calculator"]
  },
  {
    title: "Azure Free Services",
    url: "https://azure.microsoft.com/en-us/pricing/free-services/",
    category: "Cloud & Azure",
    description: "The list of Azure services with free monthly amounts.",
    tags: ["azure", "free", "pricing", "cloud"]
  },
  {
    title: "Azure Architecture Center",
    url: "https://learn.microsoft.com/en-us/azure/architecture/",
    category: "Cloud & Azure",
    description: "Guides and reference architectures for designing cloud solutions.",
    tags: ["azure", "architecture", "design", "cloud"]
  },

  // General learning
  {
    title: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu/",
    category: "General Learning",
    description: "Free course materials from MIT across many subjects.",
    tags: ["university", "courses", "lectures", "free"]
  },
  {
    title: "Open Textbook Library",
    url: "https://open.umn.edu/opentextbooks",
    category: "General Learning",
    description: "Free, openly licensed textbooks for many subjects.",
    tags: ["textbook", "free", "university", "books"]
  },
  {
    title: "TED-Ed",
    url: "https://ed.ted.com/",
    category: "General Learning",
    description: "Short animated lessons on a wide range of subjects.",
    tags: ["video", "lessons", "curiosity"]
  },
  {
    title: "Crash Course",
    url: "https://thecrashcourse.com/",
    category: "General Learning",
    description: "Educational video series on science, history, literature and more.",
    tags: ["video", "history", "science", "literature"]
  },
  {
    title: "Internet Archive",
    url: "https://archive.org/",
    category: "General Learning",
    description: "A free digital library of books, texts, audio and historical web pages.",
    tags: ["books", "literature", "ebooks", "library", "free"]
  },
  {
    title: "Google Scholar",
    url: "https://scholar.google.com/",
    category: "General Learning",
    description: "Search scholarly articles, theses and academic publications.",
    tags: ["research", "papers", "academic", "citations"]
  }
];
