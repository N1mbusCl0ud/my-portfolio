// view.js  (needs model.js loaded first)

/* =========================================================
   VIEW  (the only place that reads or changes the HTML)
   ========================================================= */
const View = {

  // Shortcuts to the page elements the View needs
  el: {
    menuBtn: document.getElementById("menuBtn"),
    menu: document.getElementById("menu"),
    aboutText: document.getElementById("aboutText"),
    timeline: document.getElementById("timeline"),
    skillsList: document.getElementById("skillsList"),
    section: document.getElementById("projects"),
    pin: document.querySelector("#projects .pin"),
    track: document.getElementById("track"),
    prev: document.getElementById("prev"),
    next: document.getElementById("next"),
    barFill: document.getElementById("barFill"),
    pageProgress: document.getElementById("pageProgress"),
    typed: document.getElementById("typed"),
    avatar: document.getElementById("avatar"),
    pupils: document.querySelectorAll("#avatar .pupil"),
    glow: document.getElementById("glow"),
    formNote: document.getElementById("formNote"),
    year: document.getElementById("year")
  },

  // Makes text safe to place inside HTML
  esc(text) {
    return String(text).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  },

  // ----- Drawing the content from the Model -----
  renderAbout(profile) {
    this.el.aboutText.innerHTML =
      "<p><strong>" + this.esc(profile.lead) + "</strong></p>" +
      profile.paragraphs.map(t => "<p>" + this.esc(t) + "</p>").join("");
  },

  renderTimeline(items) {
    this.el.timeline.innerHTML = items.map(i =>
      `<li class="${i.now ? "now" : ""}"><h3>${this.esc(i.role)}</h3><span>${this.esc(i.details)}</span></li>`
    ).join("");
  },

  renderSkills(groups) {
    this.el.skillsList.innerHTML = groups.map(g =>
      `<div class="skill-group"><h3>${this.esc(g.group)}</h3><div class="chips">` +
      g.items.map(s => `<span class="chip">${this.esc(s)}</span>`).join("") +
      `</div></div>`
    ).join("");
  },

  renderProjects(projects, illustrations) {
    this.el.track.innerHTML = projects.map(p =>
      `<article class="card">
         <div class="pic">${illustrations[p.art]}</div>
         <div class="desc">
           <h3>${this.esc(p.title)}</h3>
           <p>${this.esc(p.description)}</p>
           <span class="tags">${p.tags.map(t => this.esc(t)).join(" · ")}</span>
         </div>
       </article>`
    ).join("");
  },

  // Fills in the email / LinkedIn / GitHub icon links
  renderContact(profile) {
    document.querySelectorAll("[data-link]").forEach(a => {
      const key = a.dataset.link;
      a.href = key === "email" ? "mailto:" + profile.email : profile.links[key];
    });
  },

  setYear(year) { this.el.year.textContent = year; },

  // ----- Small screen changes -----
  setMenu(open) {
    this.el.menu.classList.toggle("open", open);
    this.el.menuBtn.setAttribute("aria-expanded", open);
  },
  setActiveLink(id) {
    document.querySelectorAll("nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
  },
  setPageProgress(percent) { this.el.pageProgress.style.width = percent + "%"; },
  setTyped(text) { this.el.typed.textContent = text; },
  setFormNote(text) { this.el.formNote.textContent = text; },
  moveGlow(x, y) { this.el.glow.style.transform = `translate(${x}px, ${y}px)`; },
  lookAt(dx, dy) {   // moves the avatar's pupils; dx and dy are between -1 and 1
    this.el.pupils.forEach(p => p.style.transform = `translate(${dx * 3}px, ${dy * 3}px)`);
  },

  // ----- Projects carousel -----
  // Measures the carousel so the Controller can work out how much scrolling it needs
  measureCarousel() {
    return {
      maxX: this.el.track.scrollWidth - this.el.track.clientWidth,   // total sideways distance
      pinTop: parseFloat(getComputedStyle(this.el.pin).top) || 0,    // where the section sticks
      pinHeight: this.el.pin.offsetHeight
    };
  },
  setSectionHeight(px) { this.el.section.style.height = px + "px"; },
  sectionTop() { return this.el.section.getBoundingClientRect().top; },
  cardStep() { return this.el.track.querySelector(".card").offsetWidth + 20; },  // card width + gap
  moveCarousel(progress, maxX) {
    this.el.track.scrollLeft = progress * maxX;
    this.el.barFill.style.width = (progress * 100) + "%";
    this.el.prev.disabled = progress < 0.01;   // grey out arrows at the ends
    this.el.next.disabled = progress > 0.99;
  },
  avatarRect() { return this.el.avatar.getBoundingClientRect(); }
};
