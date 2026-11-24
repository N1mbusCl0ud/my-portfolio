// controller.js  (needs model.js and view.js loaded first)

/* =========================================================
   CONTROLLER  (reacts to the visitor, then updates Model and View)
   ========================================================= */
const Controller = {

  // Numbers used by the scrolling carousel
  maxX: 0, extra: 300, ratio: 1, pinTop: 0,

  // Runs once when the page loads
  init() {
    // 1. Ask the View to draw everything from the Model
    View.renderAbout(Model.profile);
    View.renderTimeline(Model.timeline);
    View.renderSkills(Model.skills);
    View.renderProjects(Model.projects, Model.illustrations);
    View.renderContact(Model.profile);
    View.setYear(new Date().getFullYear());

    // 2. Start listening for what the visitor does
    this.bindMenu();
    this.bindNavHighlight();
    this.bindGlow();
    this.bindAvatar();
    this.bindCarousel();
    this.bindPageProgress();
    this.bindForm();
    this.startTyping();
  },

  // Mobile menu: Menu button and link taps
  bindMenu() {
    View.el.menuBtn.addEventListener("click", () => {
      Model.setMenuOpen(!Model.state.menuOpen);
      View.setMenu(Model.state.menuOpen);
    });
    View.el.menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      Model.setMenuOpen(false);
      View.setMenu(false);
    }));
  },

  // Highlight the nav link of the section on screen
  bindNavHighlight() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) View.setActiveLink(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
  },

  // Hero glow follows the mouse
  bindGlow() {
    document.getElementById("home").addEventListener("mousemove", e => {
      View.moveGlow((e.clientX / window.innerWidth - 0.5) * 120, (e.clientY / window.innerHeight - 0.5) * 80);
    });
  },

  // Avatar eyes follow the cursor while it is over the box
  bindAvatar() {
    const box = View.el.avatar;
    box.addEventListener("pointermove", e => {
      const r = View.avatarRect();
      const clamp = n => Math.max(-1, Math.min(1, n));
      View.lookAt(clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2)),
                  clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    });
    box.addEventListener("pointerleave", () => View.lookAt(0, 0));   // look straight ahead again
  },

  // Page scrolling moves the carousel sideways
  bindCarousel() {
    window.addEventListener("scroll", () => this.updateCarousel(), { passive: true });
    window.addEventListener("resize", () => this.measureCarousel());
    window.addEventListener("load", () => this.measureCarousel());
    // Arrow buttons scroll the page by the amount that moves the cards one step
    View.el.prev.addEventListener("click", () => window.scrollBy({ top: -View.cardStep() * this.ratio, behavior: "smooth" }));
    View.el.next.addEventListener("click", () => window.scrollBy({ top: View.cardStep() * this.ratio, behavior: "smooth" }));
    this.measureCarousel();
  },
  measureCarousel() {
    const m = View.measureCarousel();
    this.maxX = m.maxX;
    this.pinTop = m.pinTop;
    this.extra = Math.max(this.maxX * 2.2, 300);          // page distance used while the cards move
    this.ratio = this.extra / Math.max(this.maxX, 1);
    View.setSectionHeight(m.pinHeight + this.extra);
    this.updateCarousel();
  },
  updateCarousel() {
    Model.setCarouselProgress((this.pinTop - View.sectionTop()) / this.extra);
    View.moveCarousel(Model.state.carouselProgress, this.maxX);
  },

  // Thin bar at the top showing how far down the page you are
  bindPageProgress() {
    window.addEventListener("scroll", () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      View.setPageProgress(max > 0 ? window.scrollY / max * 100 : 0);
    }, { passive: true });
  },

  // Contact form: opens the visitor's email app
  bindForm() {
    document.getElementById("contactForm").addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const message = document.getElementById("msg").value;
      window.location.href = Model.mailLink(name, message);
      View.setFormNote("Opening your email app…");
    });
  },

  // Typing effect: types a word, pauses, deletes it, then the next one
  startTyping() {
    const words = Model.profile.roles;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      View.setTyped("IT support, networks and databases");   // no animation for people who prefer less motion
      return;
    }
    let w = 0, c = 0, deleting = false;
    const tick = () => {
      const word = words[w];
      View.setTyped(word.slice(0, c));
      if (!deleting && c === word.length) { deleting = true; return setTimeout(tick, 1400); }
      if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; }
      c += deleting ? -1 : 1;
      setTimeout(tick, deleting ? 40 : 80);
    };
    tick();
  }
};

// Start the app
Controller.init();
