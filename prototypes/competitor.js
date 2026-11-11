// The Competitor — one page, built from the facility floor: turf, clay, chalk, and a scoreboard.
(() => {
  const E = EPC;
  E.initTheme(false);

  const btn = (text, url = E.booking, cls = 'c-btn') => `<a class="${cls}" href="${url}"${E.ext(url)}>${text}</a>`;

  // Where each service sits on the diamond, plus the action it leads to on a single page.
  const spots = {
    baseball: { x: 84, y: 50, path: 'M200 336 L336 200', action: ['Reserve a baseball lane', E.booking] },
    softball: { x: 50, y: 16, path: 'M200 336 L336 200 L200 64', action: ['Reserve a softball lane', E.booking] },
    lessons: { x: 50, y: 50, path: 'M200 336 L200 206', action: ['Ask about lessons', `mailto:${E.email}`] },
    hittrax: { x: 50, y: 86, path: 'M200 336 L200 336', action: ['Reserve HitTrax time', E.booking] },
    teams: { x: 16, y: 50, path: 'M200 336 L336 200 L200 64 L64 200', action: ['Ask about a team session', `mailto:${E.email}`] }
  };

  // Nav: service links open that base on the diamond; the rest jump to their section.
  const links = [['home', 'Home'], ['baseball', 'Baseball'], ['softball', 'Softball'], ['lessons', 'Private Lessons'], ['hittrax', 'HitTrax'], ['pricing', 'Pricing'], ['contact', 'Contact']];

  const field = () => `
    <svg class="c-field-art" viewBox="0 0 400 400" aria-hidden="true">
      <path class="outfield" d="M200 392 L10 202 A 190 190 0 0 1 390 202 Z"/>
      <path class="clay" d="M200 372 L40 212 A 161 161 0 1 1 360 212 Z"/>
      <rect class="grass" x="110" y="110" width="180" height="180" rx="4" transform="rotate(45 200 200)"/>
      <circle class="clay" cx="200" cy="338" r="30"/>
      <path class="chalk" d="M200 336 L390 146 M200 336 L10 146" />
      <circle class="clay" cx="200" cy="200" r="24"/>
      <rect class="rubber" x="190" y="198" width="20" height="4" rx="1"/>
      <path class="runner" d="M200 336"/>
      <rect class="bag" x="328" y="192" width="16" height="16" transform="rotate(45 336 200)"/>
      <rect class="bag" x="192" y="56" width="16" height="16" transform="rotate(45 200 64)"/>
      <rect class="bag" x="56" y="192" width="16" height="16" transform="rotate(45 64 200)"/>
      <path class="plate" d="M190 330 h20 v8 l-10 9 l-10 -9z"/>
    </svg>`;

  // Line score: days are innings, "Open" and "Close" are the two teams.
  const scoreboard = () => {
    const t = E.today();
    const cell = (h, i, v) => `<td${i === t.index ? ' class="today"' : ''}>${v}</td>`;
    const num = x => (x > 12 ? x - 12 : x);
    return `
    <div class="c-board" role="region" aria-labelledby="board-title">
      <div class="c-board-head"><h2 id="board-title">Hours</h2><p class="c-live${t.open ? ' is-open' : ''}">${t.status}</p></div>
      <table>
        <caption class="sr-only">Opening hours. Times are PM unless marked AM.</caption>
        <thead><tr><td></td>${E.hours.map((h, i) => `<th scope="col"${i === t.index ? ' class="today"' : ''}><abbr title="${h.full}">${h.d}</abbr></th>`).join('')}</tr></thead>
        <tbody>
          <tr><th scope="row">Open</th>${E.hours.map((h, i) => cell(h, i, h.o === null ? '—' : h.o < 12 ? `${h.o}<small>am</small>` : num(h.o))).join('')}</tr>
          <tr><th scope="row">Close</th>${E.hours.map((h, i) => cell(h, i, h.c === null ? '—' : num(h.c))).join('')}</tr>
        </tbody>
      </table>
    </div>`;
  };

  const header = () => `
    <header class="c-header">
      <div class="c-wrap c-header-in">
        <a class="c-brand" href="#home"><img src="assets/logo.jpg" alt="Elite Performance Center, back to top"></a>
        <nav class="c-nav" aria-label="Main">${links.map(([k, v]) => `<a href="#${k}" data-link="${k}">${v}</a>`).join('')}</nav>
        ${btn('Book now', E.booking, 'c-btn c-btn-small')}
        <button type="button" class="menu-toggle" aria-expanded="false" aria-label="Open navigation"><span></span><span></span></button>
      </div>
    </header>`;

  const page = () => `
    <section class="c-hero" id="home">
      <video class="c-film" muted loop playsinline preload="metadata" poster="assets/facility.jpg" src="assets/facility-preview.mp4" aria-hidden="true"></video>
      <div class="c-wrap c-hero-in">
        <div class="c-hero-copy">
          <h1>Indoor baseball <span>&amp; softball</span> <span>in Clovis</span></h1>
          <p>Batting lanes with pitching machines, private lessons, and HitTrax under one air-conditioned roof on Barstow Avenue. Book an hour, bring a teammate, or bring the whole team.</p>
          <div class="c-actions">${btn('Book a lane')}<a class="c-link" href="#pricing">See rates</a></div>
        </div>
        <div class="c-hero-side">
          <figure class="c-plate">
            <img class="visible" data-photo src="assets/facility.jpg" alt="Coaches running a fielding drill on the indoor infield">
            <img data-photo src="assets/training.jpg" alt="A softball player fielding a ground ball inside the facility">
          </figure>
          <div class="c-controls"><button type="button" data-pause></button><button type="button" data-next>Next photo</button></div>
        </div>
        ${scoreboard()}
      </div>
    </section>

    <section class="c-sec c-train" id="train" aria-labelledby="field-title">
      <div class="c-wrap">
        <div class="c-sec-head">
          <h2 id="field-title">Pick your spot on the field.</h2>
          <p>Every way to train at Elite, laid out on the diamond. Hover, tap, or use your arrow keys to move between them.</p>
        </div>
        <div class="c-diamond-grid">
          <div class="c-diamond">
            ${field()}
            ${E.services.map(s => `<button type="button" class="c-base" data-id="${s.id}" style="--x:${spots[s.id].x}%;--y:${spots[s.id].y}%" aria-controls="c-play">${s.name}</button>`).join('')}
          </div>
          <div class="c-play" id="c-play" aria-live="polite">
            <figure class="c-plate-photo"><img src="assets/facility.jpg" alt="Inside Elite Performance Center in Clovis"></figure>
            <div class="c-play-copy"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="c-sec c-pricing" id="pricing" aria-labelledby="rates-title">
      <div class="c-wrap">
        <div class="c-sec-head">
          <h2 id="rates-title">Rates</h2>
          <p>Pay by the hour, or make practice part of the month. Lane bookings go through the online scheduler.</p>
        </div>
        <div class="c-rates">
          ${E.prices.map(p => `
            <article class="c-rate">
              <h3>${p.name}</h3>
              <p class="c-rate-price"><strong>${p.price}</strong> ${p.unit}</p>
              <p>${p.note}</p>
              ${btn('Check availability', E.booking, 'c-btn c-btn-ghost')}
            </article>`).join('')}
        </div>
        <p class="c-rate-note"><strong>HitTrax</strong> is currently listed at $85 per person, plus $20 for each additional person, up to four. Session length and team lane rates are confirmed by the facility. <a class="c-link" href="mailto:${E.email}">Ask about your session</a></p>
      </div>
    </section>

    <section class="c-sec c-about" id="about">
      <div class="c-wrap c-two">
        <div>
          <h2>A local place to learn the game.</h2>
          <p>Elite Performance Center serves baseball and softball players from Fresno and Clovis. The facility was created to give young athletes access to training resources, experienced instruction, and a supportive place to practice.</p>
          <p>You do not need to be on a team to train here. Individual players, families, and groups are all welcome.</p>
        </div>
        <div class="c-faq">
          <h3>Before your first visit</h3>
          ${E.faq.slice(0, 3).map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}
        </div>
      </div>
    </section>

    <section class="c-sec c-visit" id="contact" aria-labelledby="visit-title">
      <div class="c-wrap c-visit-in">
        <div class="c-visit-info">
          <h2 id="visit-title">Find us on Barstow.</h2>
          <p class="c-address">${E.address[0]}<br>${E.address[1]}</p>
          <dl class="c-reach">
            <dt>Call</dt><dd><a href="${E.phone.href}">${E.phone.label}</a></dd>
            <dt>Email</dt><dd><a href="mailto:${E.email}">${E.email}</a></dd>
          </dl>
          <div class="c-actions">${btn('Get directions', E.maps)}${btn('Open the scheduler', E.booking, 'c-btn c-btn-ghost')}</div>
          <p class="c-follow">See what's happening at the facility on Instagram and Facebook.</p>
          ${E.social}
        </div>
        ${E.map('c-map')}
      </div>
    </section>`;

  const footer = () => `
    <footer class="c-footer">
      <div class="c-wrap c-footer-in">
        <img class="c-foot-logo" src="assets/logo.jpg" alt="Elite Performance Center">
        <p>Indoor baseball and softball training in Clovis, California.</p>
        ${E.social}
        <p class="c-copy">© ${new Date().getFullYear()} Elite Performance Center. Website concept for client review.</p>
      </div>
    </footer>`;

  document.querySelector('#app').innerHTML = E.logoFilter + E.reviewBar('The Competitor') + header() + `<main>${page()}</main>` + footer();
  E.wire();
  E.motion(document.querySelector('.c-hero'));

  // Diamond
  const sec = document.querySelector('.c-train');
  const bases = [...sec.querySelectorAll('.c-base')];
  const photo = sec.querySelector('.c-plate-photo img');
  const copy = sec.querySelector('.c-play-copy');
  const runner = sec.querySelector('.runner');
  let activeService = 'baseball';
  let current = 'home';
  const navLinks = [...document.querySelectorAll('[data-link]')];
  E.chooser(bases, i => {
    const s = E.services[i];
    activeService = s.id;
    runner.setAttribute('d', spots[s.id].path);
    runner.style.animation = 'none'; runner.getBoundingClientRect(); runner.style.animation = '';
    photo.src = `assets/${s.image}.jpg`;
    const [label, url] = spots[s.id].action;
    copy.innerHTML = `<h3>${s.heading}</h3><p>${s.description}</p><ul>${s.details.map(x => `<li>${x}</li>`).join('')}</ul>${btn(label, url)}`;
    spy();
  });

  // Jump to a section or a base, accounting for the sticky header.
  const jump = (hash, smooth = true) => {
    const id = hash.replace('#', '') || 'home';
    const index = E.services.findIndex(s => s.id === id);
    const target = index >= 0 ? sec : document.getElementById(id);
    if (!target) return;
    if (index >= 0) bases[index].click();
    target.scrollIntoView({ behavior: smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto' });
  };
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.remove('nav-open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
    history.replaceState(null, '', a.getAttribute('href'));
    jump(a.getAttribute('href'));
  }));
  if (location.hash) requestAnimationFrame(() => jump(location.hash, false));

  // Highlight the nav link for whatever is on screen.
  function spy() {
    const key = current === 'train' ? activeService : current === 'about' ? null : current;
    navLinks.forEach(a => a.toggleAttribute('aria-current', a.dataset.link === key));
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { current = en.target.id; spy(); } });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main > section').forEach(s => observer.observe(s));
})();
