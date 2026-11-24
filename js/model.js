/* =========================================================
   MVC STRUCTURE (how this file is organized)

   MODEL      = the data (my profile, jobs, skills, projects) and
                the values that change while someone uses the page.
                It never touches the page. To change CONTENT, edit the Model.
   VIEW       = the only code that touches the page (HTML). It draws the
                Model's data and changes what is shown on screen.
                To change how things are DRAWN, edit the View.
   CONTROLLER = listens to what the visitor does (scroll, click, mouse,
                form) and connects the Model and the View.
                To change how things BEHAVE, edit the Controller.
   ========================================================= */


/* =========================================================
   MODEL
   ========================================================= */
const Model = {

  // ----- Who I am -----
  profile: {
    lead: "I’m an IT graduate who learned how businesses run by working inside them.",
    paragraphs: [
      "My path began as an intern in the HR Office. After graduating, I worked as a Quality Assurance Generalist and in administration at J&T Express, and I’m now in IT support for networks and databases in the Finance Section.",
      "Today I help implement SAP Business One. I’m quick to learn, adaptable and reliable, and I like turning everyday office problems into simple tools."
    ],
    email: "angelocastanieto084@gmail.com",
    // TODO: replace the "#" with your real profile links
    links: { linkedin: "#", github: "#" },
    // Words the typing effect in the hero cycles through
    roles: ["IT support", "networks", "databases", "SAP Business One", "web basics"]
  },

  // ----- Work history (newest first). Add or remove items to edit the timeline -----
  timeline: [
    {
      "role": "IT Support, Networks and Database",
      "details": "Finance Section · Now · Helping implement SAP Business One",
      "now": true
    },
    {
      "role": "Quality Assurance Generalist and Administrative",
      "details": "J&T Express · After graduation"
    },
    {
      "role": "Administrative Aide (Intern)",
      "details": "HR Office · First role"
    }
  ],

  // ----- Skills, grouped. Add a group or edit the "items" lists -----
  skills: [
    {
      "group": "Web and databases",
      "items": [
        "HTML",
        "SQL",
        "PHP",
        "JavaScript",
        "Database management basics",
        "Queries and reports"
      ]
    },
    {
      "group": "IT support and networks",
      "items": [
        "Computer literate",
        "Troubleshooting",
        "Hardware and software support",
        "Network basics (LAN, Wi-Fi)",
        "Help desk ticketing"
      ]
    },
    {
      "group": "Business systems",
      "items": [
        "SAP Business One",
        "System implementation support",
        "User training and support",
        "Data entry and validation"
      ]
    },
    {
      "group": "Quality and admin",
      "items": [
        "Quality assurance",
        "Testing and checking",
        "Documentation",
        "Records management"
      ]
    },
    {
      "group": "Working style",
      "items": [
        "Quick to learn",
        "Adaptable",
        "Reliable",
        "Attention to detail",
        "Problem solving",
        "Teamwork"
      ]
    }
  ],

  // ----- Projects. Each "art" is a picture name from "illustrations" below -----
  projects: [
    {
      "title": "Human Resource Management System",
      "description": "A system for keeping employee records and HR processes in one place.",
      "tags": [
        "PHP",
        "SQL",
        "HTML",
        "JavaScript"
      ],
      "art": "hr"
    },
    {
      "title": "Job Order Contract Generator",
      "description": "A tool that fills in job order contracts automatically, so they are faster to produce and more consistent.",
      "tags": [
        "PHP",
        "SQL",
        "JavaScript"
      ],
      "art": "contract"
    },
    {
      "title": "SAP Business One Ticketing System",
      "description": "A ticketing system for reporting and tracking SAP Business One issues and requests.",
      "tags": [
        "Web app",
        "SQL",
        "SAP Business One"
      ],
      "art": "tickets"
    },
    {
      "title": "Implementing SAP Business One",
      "description": "Supporting the Finance Section during the SAP Business One rollout, from the database and network side.",
      "tags": [
        "SAP Business One",
        "Networks",
        "Databases"
      ],
      "art": "sap"
    }
  ],

  // ----- Project pictures (simple drawings). Swap for your own screenshots later -----
  illustrations: {
    hr: `<svg viewBox="0 0 320 200" role="img" aria-label="HR dashboard with employee records">
              <rect x="20" y="20" width="64" height="160" rx="8" fill="#1b2533"/>
              <rect x="30" y="36" width="44" height="6" rx="3" fill="#8fb8ff"/><rect x="30" y="54" width="36" height="6" rx="3" fill="#243040"/><rect x="30" y="70" width="40" height="6" rx="3" fill="#243040"/>
              <g fill="#1b2533"><rect x="98" y="20" width="202" height="44" rx="8"/><rect x="98" y="74" width="202" height="44" rx="8"/><rect x="98" y="128" width="202" height="44" rx="8"/></g>
              <g fill="#8fb8ff"><circle cx="122" cy="42" r="11"/><circle cx="122" cy="96" r="11" opacity=".7"/><circle cx="122" cy="150" r="11" opacity=".45"/></g>
              <g fill="#243040"><rect x="144" y="34" width="90" height="7" rx="3"/><rect x="144" y="46" width="60" height="6" rx="3"/><rect x="144" y="88" width="80" height="7" rx="3"/><rect x="144" y="100" width="54" height="6" rx="3"/><rect x="144" y="142" width="96" height="7" rx="3"/><rect x="144" y="154" width="50" height="6" rx="3"/></g>
            </svg>`,
    contract: `<svg viewBox="0 0 320 200" role="img" aria-label="Contract document with a signature and stamp">
              <rect x="80" y="16" width="160" height="170" rx="8" fill="#1b2533" stroke="#243040"/>
              <rect x="98" y="34" width="80" height="9" rx="4" fill="#8fb8ff"/>
              <g fill="#243040"><rect x="98" y="58" width="124" height="6" rx="3"/><rect x="98" y="72" width="110" height="6" rx="3"/><rect x="98" y="86" width="124" height="6" rx="3"/><rect x="98" y="100" width="90" height="6" rx="3"/></g>
              <path d="M100 156c10-18 16 8 24-8s12 6 22-4" stroke="#8fb8ff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <circle cx="204" cy="150" r="18" fill="none" stroke="#8fb8ff" stroke-width="2.5" opacity=".7"/><path d="M196 150l6 6 11-12" stroke="#8fb8ff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            </svg>`,
    tickets: `<svg viewBox="0 0 320 200" role="img" aria-label="Ticket list with status labels">
              <rect x="24" y="20" width="272" height="28" rx="8" fill="#8fb8ff" opacity=".85"/>
              <g fill="#1b2533"><rect x="24" y="58" width="272" height="36" rx="8"/><rect x="24" y="102" width="272" height="36" rx="8"/><rect x="24" y="146" width="272" height="36" rx="8"/></g>
              <circle cx="44" cy="76" r="6" fill="#e8b86f"/><circle cx="44" cy="120" r="6" fill="#8fb8ff"/><circle cx="44" cy="164" r="6" fill="#7fd3a5"/>
              <g fill="#243040"><rect x="64" y="70" width="120" height="7" rx="3"/><rect x="64" y="114" width="100" height="7" rx="3"/><rect x="64" y="158" width="130" height="7" rx="3"/><rect x="236" y="68" width="46" height="16" rx="8"/><rect x="236" y="112" width="46" height="16" rx="8"/><rect x="236" y="156" width="46" height="16" rx="8"/></g>
            </svg>`,
    sap: `<svg viewBox="0 0 320 200" role="img" aria-label="Database connected to three workstations">
              <g stroke="#243040" stroke-width="2"><path d="M160 90V130M160 130H70V150M160 130H250V150M160 130V150"/></g>
              <path d="M130 40v40c0 8 13 14 30 14s30-6 30-14V40" fill="#1b2533" stroke="#8fb8ff" stroke-width="2"/>
              <ellipse cx="160" cy="40" rx="30" ry="12" fill="#1b2533" stroke="#8fb8ff" stroke-width="2"/>
              <path d="M130 60c0 8 13 14 30 14s30-6 30-14" fill="none" stroke="#8fb8ff" stroke-width="2" opacity=".6"/>
              <g fill="#1b2533" stroke="#243040" stroke-width="2"><rect x="46" y="150" width="48" height="32" rx="5"/><rect x="136" y="150" width="48" height="32" rx="5"/><rect x="226" y="150" width="48" height="32" rx="5"/></g>
              <g fill="#8fb8ff"><circle cx="70" cy="166" r="4"/><circle cx="160" cy="166" r="4" opacity=".7"/><circle cx="250" cy="166" r="4" opacity=".45"/></g>
            </svg>`
  },

  // ----- State: values that change while the visitor uses the page -----
  state: {
    carouselProgress: 0,   // 0 = first project, 1 = last project
    menuOpen: false        // is the mobile menu open?
  },

  // ----- Small rules that change the state or build data -----
  setCarouselProgress(p) { this.state.carouselProgress = Math.min(1, Math.max(0, p)); },
  setMenuOpen(open)      { this.state.menuOpen = open; },
  mailLink(name, message) {
    return "mailto:" + this.profile.email +
      "?subject=" + encodeURIComponent("Portfolio message from " + name) +
      "&body=" + encodeURIComponent(message);
  }
};
