// The Performance Lab — the strike zone as the frame, the week as a chart.
(() => {
  const E = EPC;
  E.initTheme(true);

  const btn = (text, url = E.booking, cls = 'l-btn') => `<a class="${cls}" href="${url}"${E.ext(url)}>${text}</a>`;

  // Facts shown as a spec sheet for each service. Only what the current site states.
  const specs = {
    baseball: [['Rate', '$40 per hour'], ['Players', 'Up to 4, $10 each extra'], ['Setup', 'Baseball pitching machine lane'], ['Booking', 'Online scheduler']],
    softball: [['Rate', '$40 per hour'], ['Players', 'Up to 4, $10 each extra'], ['Setup', 'Softball pitching machine lane'], ['Booking', 'Online scheduler']],
    lessons: [['Format', 'One-on-one'], ['Sports', 'Baseball and softball'], ['Rate', 'Shared on request'], ['Booking', 'Email or call the facility']],
    hittrax: [['Rate', '$85 per person, as listed'], ['Players', 'Up to 4, $20 each extra'], ['Output', 'Real-time swing data'], ['Session length', 'Confirm with the facility']],
    teams: [['Space', 'One lane up to the whole facility'], ['Cages', 'Up to six for facility bookings'], ['Team membership', '$600 per month'], ['Booking', 'Coordinate with staff']]
  };

  const header = page => `
    <header class="l-header">
      <a class="l-brand" href="#home"><img src="assets/logo.jpg" alt="Elite Performance Center, home"></a>
      <nav class="l-nav" aria-label="Main">${Object.entries(E.pages).map(([k, v]) => `<a href="#${k}"${k === page ? ' aria-current="page"' : ''}>${v}</a>`).join('')}</nav>
      ${btn('Book now', E.booking, 'l-btn l-btn-small')}
      <button type="button" class="menu-toggle" aria-expanded="false" aria-label="Open navigation"><span></span><span></span><span></span></button>
    </header>`;

  const zone = () => `
    <div class="l-zone" aria-label="Photos of the facility">
      <div class="l-zone-frame">
        ${E.img('facility', 'Coaches running a fielding drill on the indoor infield', 'visible" data-photo="')}
        ${E.img('training', 'A softball player fielding a ground ball inside the facility', '" data-photo="')}
        <div class="l-grid" aria-hidden="true">${'<i></i>'.repeat(9)}</div>
      </div>
      <svg class="l-plate" viewBox="0 0 200 60" aria-hidden="true"><path d="M8 4 H192 V26 L100 56 L8 26 Z"/></svg>
    </div>`;

  // The week drawn on a shared 10 AM – 10 PM axis.
  const week = () => {
    const t = E.today();
    const start = 10, end = 22, pct = h => ((h - start) / (end - start)) * 100;
    return `
    <section class="l-week" aria-labelledby="week-title">
      <div class="l-week-head">
        <h2 id="week-title">When the lanes are open</h2>
        <p class="l-status${t.open ? ' is-open' : ''}">${t.status}</p>
      </div>
      <ol class="l-bars">
        ${E.hours.map((h, i) => `
          <li${i === t.index ? ' class="today"' : ''}>
            <span class="l-day"><span class="long">${h.full}</span><span class="short" aria-hidden="true">${h.d}</span></span>
            <span class="l-track">${h.o === null ? '' : `<span class="l-bar" style="--a:${pct(h.o)}%;--b:${pct(h.c)}%"></span>`}</span>
            <span class="l-time">${E.span(h)}</span>
          </li>`).join('')}
      </ol>
      <div class="l-axis" aria-hidden="true"><span></span><span class="l-ticks">${[10, 13, 16, 19, 22].map(h => `<span style="left:${pct(h)}%">${E.clock(h)}</span>`).join('')}</span><span></span></div>
    </section>`;
  };

  const home = () => `
    <section class="l-hero">
      <video class="l-film" muted loop playsinline preload="metadata" poster="assets/training.jpg" src="assets/facility-preview.mp4" aria-hidden="true"></video>
      <div class="l-hero-copy">
        <h1>Every rep tells you something.</h1>
        <p>Indoor batting lanes, one-on-one coaching, and HitTrax swing data in Clovis. Book a lane, see what your swing is doing, and decide what to work on next.</p>
        <div class="l-actions">${btn('Book a lane')}<a class="l-link" href="#hittrax">How HitTrax works</a></div>
      </div>
      ${zone()}
      <div class="l-controls"><button type="button" data-pause></button><button type="button" data-next>Next photo</button></div>
    </section>
    <section class="l-services" aria-labelledby="svc-title">
      <div class="l-sec-head">
        <h2 id="svc-title">Choose how you want to train.</h2>
        <p>Five ways to use the facility, from a single hour in a lane to the whole building for your team.</p>
      </div>
      <div class="l-tabs" role="group" aria-label="Choose a training service">
        ${E.services.map(s => `<button type="button" aria-controls="l-panel">${s.name}</button>`).join('')}
      </div>
      <div class="l-panel" id="l-panel" aria-live="polite">
        <figure class="l-panel-photo"><img src="assets/facility.jpg" alt="Inside Elite Performance Center in Clovis"><div class="l-grid" aria-hidden="true">${'<i></i>'.repeat(9)}</div></figure>
        <div class="l-panel-copy"></div>
        <dl class="l-specs"></dl>
      </div>
    </section>
    ${week()}
    <section class="l-steps" aria-labelledby="steps-title">
      <h2 id="steps-title">Your first session</h2>
      <ol>
        <li><h3>Pick the session</h3><p>A baseball or softball lane, HitTrax time, or a membership if you plan to come often.</p></li>
        <li><h3>Reserve a time</h3><p>Choose an open slot in the online scheduler. For lessons or team bookings, email or call the facility.</p></li>
        <li><h3>Come to Suite A</h3><p>906 Barstow Ave in Clovis. Bring teammates if you booked for them, up to four per lane.</p></li>
      </ol>
    </section>
    <section class="l-local">
      <div>
        <h2>Built for players from Fresno and Clovis.</h2>
        <p>Elite Performance Center was created to give young athletes access to training resources, experienced instruction, and a supportive place to practice.</p>
        <p>You do not need to be on a team to train here. Individual players, families, and groups are welcome.</p>
      </div>
      <div class="l-faq">${E.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
    </section>`;

  const detail = page => {
    const d = E.detail[page];
    return `
    <section class="l-page-hero">
      <div>
        <h1>${d.title}</h1>
        <p>${d.intro}</p>
        <div class="l-actions">${btn(d.cta[0], d.cta[1])}<a class="l-link" href="#pricing">See all rates</a></div>
      </div>
      <figure class="l-page-photo">${E.img(d.image)}<div class="l-grid" aria-hidden="true">${'<i></i>'.repeat(9)}</div></figure>
    </section>
    <section class="l-detail">
      <div>
        <h2>What to expect</h2>
        <p>${d.body}</p>
      </div>
      <dl class="l-specs l-specs-static">${specs[page].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <ul class="l-checks">${d.expect.map(x => `<li>${x}</li>`).join('')}</ul>
    </section>
    <section class="l-local">
      <div>
        <h2>Questions before you book</h2>
        <p>Not sure which session fits? Email <a class="l-link" href="mailto:${E.email}">${E.email}</a> or call <a class="l-link" href="${E.phone.href}">${E.phone.label}</a>.</p>
      </div>
      <div class="l-faq">${E.faq.slice(0, 3).map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
    </section>`;
  };

  const pricing = () => `
    <section class="l-page-hero l-page-hero-text">
      <div>
        <h1>Rates and memberships</h1>
        <p>Pay by the hour, or make practice part of your month.</p>
      </div>
    </section>
    <section class="l-prices">
      <table>
        <caption class="sr-only">Lane rental and membership rates</caption>
        <thead><tr><th scope="col">Option</th><th scope="col">Price</th><th scope="col">What is included</th><th scope="col"><span class="sr-only">Book</span></th></tr></thead>
        <tbody>${E.prices.map(p => `<tr><th scope="row">${p.name}</th><td class="l-price"><strong>${p.price}</strong> <span>${p.unit}</span></td><td>${p.note}</td><td>${btn('Check availability', E.booking, 'l-btn l-btn-ghost')}</td></tr>`).join('')}</tbody>
      </table>
      <aside class="l-note">
        <h2>HitTrax and group rentals</h2>
        <p>The current site lists HitTrax at $85 per person, plus $20 for each additional person, with a four-person limit. Session length and team lane rates should be confirmed with the facility before booking.</p>
        <a class="l-link" href="mailto:${E.email}">Ask about your session</a>
        <p class="l-fine">Prices reproduced from the existing website for review. Final rates and terms require owner confirmation.</p>
      </aside>
    </section>`;

  const contact = () => `
    <section class="l-page-hero">
      <div>
        <h1>Visit the facility</h1>
        <p>${E.address[0]}<br>${E.address[1]}</p>
        <div class="l-actions">${btn('Get directions', E.maps)}${btn('Open the scheduler', E.booking, 'l-btn l-btn-ghost')}</div>
        <dl class="l-specs l-specs-static l-reach">
          <div><dt>Phone</dt><dd><a href="${E.phone.href}">${E.phone.label}</a></dd></div>
          <div><dt>Email</dt><dd><a href="mailto:${E.email}">${E.email}</a></dd></div>
        </dl>
      </div>
      ${E.map('l-map')}
    </section>
    ${week()}`;

  const footer = () => `
    <section class="l-closing">
      <h2>Need a lane this week?</h2>
      ${btn('View available sessions')}
    </section>
    <footer class="l-footer">
      <div>
        <img class="l-foot-logo" src="assets/logo.jpg" alt="Elite Performance Center">
        <p>Indoor baseball and softball training in Clovis, California.</p>
      </div>
      <nav aria-label="Footer">${Object.entries(E.pages).map(([k, v]) => `<a href="#${k}">${v}</a>`).join('')}</nav>
      <div>
        <p>${E.address[0]}<br>${E.address[1]}</p>
        <p><a href="${E.phone.href}">${E.phone.label}</a><br><a href="mailto:${E.email}">${E.email}</a></p>
      </div>
      <p class="l-copy">© ${new Date().getFullYear()} Elite Performance Center. Website concept for client review.</p>
    </footer>`;

  function services() {
    const sec = document.querySelector('.l-services');
    if (!sec) return;
    const buttons = [...sec.querySelectorAll('.l-tabs button')];
    const photo = sec.querySelector('.l-panel-photo img');
    const copy = sec.querySelector('.l-panel-copy');
    const dl = sec.querySelector('.l-specs');
    const panel = sec.querySelector('.l-panel');
    E.chooser(buttons, i => {
      const s = E.services[i];
      photo.src = `assets/${s.image}.jpg`;
      copy.innerHTML = `<h3>${s.heading}</h3><p>${s.description}</p>${btn(s.action, s.url)}`;
      dl.innerHTML = specs[s.id].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
      panel.classList.remove('swap'); panel.getBoundingClientRect(); panel.classList.add('swap');
    });
  }

  E.router(page => {
    const main = page === 'home' ? home() : page === 'pricing' ? pricing() : page === 'contact' ? contact() : detail(page);
    document.querySelector('#app').innerHTML = E.logoFilter + E.reviewBar('The Performance Lab') + header(page) + `<main>${main}</main>` + footer();
    E.motion(document.querySelector('.l-hero'));
    services();
  });
})();
