/* ─── Testimonials (real client reviews) ────────────────────────────── */
export type Testimonial = {
  quote: string;
  name: string;
  service: string; // the Zoho product the work was on
  country: string; // display name
  code: string; // ISO 3166-1 alpha-2 (lowercase) for the flag
};

export const testimonials: Testimonial[] = [
  {
    quote: "Fast delivery and excellent communication.",
    name: "Pat Devlin",
    service: "Zoho Sites",
    country: "Australia",
    code: "au",
  },
  {
    quote:
      "An excellent developer with a lot of experience in this field. They quickly understood what I was looking for and got straight to work. The job was finished in just a few hours. A small problem arose, but they fixed it quickly. I hope to work with you again soon!",
    name: "Masive",
    service: "Zoho Books",
    country: "United States",
    code: "us",
  },
  {
    quote: "Excellent services!",
    name: "Arvin Dreams",
    service: "Zoho Commerce",
    country: "Australia",
    code: "au",
  },
  {
    quote:
      "They built an RFQ management system in Zoho Creator, and it is very good.",
    name: "Meems Aero",
    service: "Zoho Creator",
    country: "UAE",
    code: "ae",
  },
  {
    quote:
      "Very professional developer. Helped us customize Zoho CRM exactly as we needed. Communication was clear and the project was completed on time.",
    name: "John M.",
    service: "Zoho CRM",
    country: "Canada",
    code: "ca",
  },
  {
    quote:
      "Excellent work on our Zoho Creator application. They understood our business process quickly and delivered everything as requested. Highly recommended.",
    name: "Sarah Williams",
    service: "Zoho Creator",
    country: "United Kingdom",
    code: "gb",
  },
  {
    quote:
      "Great experience working together. They automated our inventory workflow and connected it with Zoho Books. Everything works smoothly now.",
    name: "Carlos R.",
    service: "Zoho Inventory",
    country: "Spain",
    code: "es",
  },
  {
    quote:
      "Very knowledgeable in Zoho applications. Our Zoho Desk setup and automation were completed perfectly. Fast response and great support.",
    name: "David Lee",
    service: "Zoho Desk",
    country: "Singapore",
    code: "sg",
  },
  {
    quote:
      "They helped us set up multiple Zoho apps under Zoho One. The automation saved our team a lot of manual work. Very happy with the result.",
    name: "Ahmed Hassan",
    service: "Zoho One",
    country: "Saudi Arabia",
    code: "sa",
  },
  {
    quote:
      "Needed several integrations between Zoho CRM and third-party apps. Everything was completed quickly and worked perfectly from day one.",
    name: "Emma Brown",
    service: "Zoho Flow",
    country: "New Zealand",
    code: "nz",
  },
  {
    quote:
      "Created useful dashboards and reports for our business. The data is now much easier to understand, and our team saves a lot of time.",
    name: "Michael Johnson",
    service: "Zoho Analytics",
    country: "United States",
    code: "us",
  },
  {
    quote:
      "Very satisfied with the Zoho Recruit customization. They added all the features we requested and delivered before the deadline.",
    name: "Priya Sharma",
    service: "Zoho Recruit",
    country: "India",
    code: "in",
  },
  {
    quote:
      "Helped us organize our project management system in Zoho Projects. The setup is clean, simple, and easy for our team to use.",
    name: "Lucas Martin",
    service: "Zoho Projects",
    country: "France",
    code: "fr",
  },
  {
    quote:
      "Built custom Zoho Forms and connected them with Zoho CRM. Everything works exactly as expected. Great communication throughout the project.",
    name: "Daniel Green",
    service: "Zoho Forms",
    country: "Ireland",
    code: "ie",
  },
  {
    quote:
      "Built an attendance management application for our workers with check-in, check-out, and reporting features. The app is easy to use and has made tracking employee attendance much more efficient. Great work and excellent support.",
    name: "Ibrahim Savlkili",
    service: "Zoho Creator",
    country: "Turkey",
    code: "tr",
  },
  {
    quote:
      "Developed a custom order creation application that perfectly matches our business workflow. The application is fast, user-friendly, and has reduced manual work significantly. Highly recommended.",
    name: "Ibrahim Savlkili",
    service: "Zoho Creator",
    country: "Turkey",
    code: "tr",
  },
  {
    quote:
      "Created a site materials management application that helps us track inventory and material usage across multiple projects. Everything works smoothly, and the solution has improved our daily operations.",
    name: "Ibrahim Savlkili",
    service: "Zoho Creator",
    country: "Turkey",
    code: "tr",
  },
  {
    quote:
      "Implemented a custom PDF preview feature inside Zoho CRM exactly as we requested. The solution works flawlessly and makes it much easier for our team to review documents before downloading or sending them.",
    name: "John Smith",
    service: "Zoho CRM",
    country: "Germany",
    code: "de",
  },
  {
    quote:
      "Integrated Nexphone with Zoho CRM to automatically fetch caller information and create leads. The automation works perfectly and saves our sales team a lot of time. Very professional and knowledgeable developer.",
    name: "Max",
    service: "Zoho CRM",
    country: "Switzerland",
    code: "ch",
  },
];
