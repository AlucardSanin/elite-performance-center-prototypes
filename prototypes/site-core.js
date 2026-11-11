// Shared content and behavior for The Competitor and The Performance Lab.
// The Clubhouse keeps its own app.js / clubhouse.js / services.js stack.
const EPC = (() => {
  const booking = 'https://eliteperformancecenterca.ezfacility.com/';
  const email = 'info@eliteperformancecenterca.com';
  const phone = { label: '(559) 274-2130', href: 'tel:+15592742130' };
  const address = ['906 Barstow Ave, Suite A', 'Clovis, CA 93612'];
  const maps = 'https://www.google.com/maps/search/?api=1&query=906+Barstow+Ave+Suite+A+Clovis+CA+93612';

  const pages = { home: 'Home', baseball: 'Baseball', softball: 'Softball', lessons: 'Private Lessons', hittrax: 'HitTrax', pricing: 'Pricing', contact: 'Contact' };

  // Hours in 24h numbers so they can be drawn as well as read.
  const hours = [
    { d: 'Mon', full: 'Monday', o: 15, c: 21 },
    { d: 'Tue', full: 'Tuesday', o: 15, c: 21 },
    { d: 'Wed', full: 'Wednesday', o: 14, c: 21 },
    { d: 'Thu', full: 'Thursday', o: 15, c: 21 },
    { d: 'Fri', full: 'Friday', o: 15, c: 21 },
    { d: 'Sat', full: 'Saturday', o: 11, c: 16 },
    { d: 'Sun', full: 'Sunday', o: null, c: null }
  ];
  const clock = h => (h === 12 ? '12 PM' : h > 12 ? `${h - 12} PM` : `${h} AM`);
  const span = h => (h.o === null ? 'Closed' : `${clock(h.o)}–${clock(h.c)}`);

  const services = [
    { id: 'baseball', name: 'Baseball lanes', heading: 'A lane for your next practice.', description: 'Rent an indoor batting lane for individual work or a small group. Baseball pitching machine lanes are available, and the air-conditioned space gives you a comfortable place to practice throughout the year.', details: ['Standard lane rental: $40 per hour', 'Additional players: $10 each; four players maximum', 'Reserve available times through the online scheduler'], image: 'facility', action: 'Explore baseball lanes', url: '#baseball' },
    { id: 'softball', name: 'Softball lanes', heading: 'Make time for your softball game.', description: 'Bring your hitting routine indoors. Softball pitching machine lanes welcome individual players and small groups, whether you are getting ready for the season or making practice part of your week.', details: ['Softball pitching machine lane options', 'Standard lane rental: $40 per hour', 'Up to four players per lane, with additional-player fees'], image: 'training', action: 'Explore softball lanes', url: '#softball' },
    { id: 'lessons', name: 'Private lessons', heading: 'Work on the skills that matter to you.', description: 'Get personal attention from an experienced coach. One-on-one instruction gives baseball and softball players space to work on individual skills, refine technique, and ask questions along the way.', details: ['Personalized baseball and softball instruction', 'Support for individual skill development', 'Contact the team about coaching availability and rates'], image: 'facility', action: 'Learn about private lessons', url: '#lessons' },
    { id: 'hittrax', name: 'HitTrax', heading: 'Bring feedback into your batting practice.', description: 'HitTrax adds real-time data and analytics to your session. Use that feedback to understand your swing mechanics and make more informed adjustments as you practice.', details: ['Real-time data during batting practice', 'Feedback to support swing development', 'Ask the team about session length and current rates'], image: 'training', action: 'Discover HitTrax', url: '#hittrax' },
    { id: 'teams', name: 'Teams & groups', heading: 'Bring your team. Give everyone room.', description: 'Reserve space for a group session or ask about the whole facility. Elite welcomes individuals, groups, and teams, with room for batting practice and drills. Staff can help you choose the right arrangement for your group.', details: ['Single-lane and whole-facility rental options', 'Up to six cages for facility bookings', 'Contact us to coordinate group size, timing, and pricing'], image: 'facility', action: 'Ask about a team session', url: `mailto:${email}` }
  ];

  const detail = {
    baseball: { title: 'Baseball batting lanes', intro: 'Build your routine in an indoor, air-conditioned training space. Rent a single lane for individual practice or bring teammates along.', body: 'Pitching machine lanes let you put in steady, repeatable work on your swing, whatever the weather is doing outside. Reserve an hour, bring up to three teammates, and use the time the way your practice needs.', expect: ['Individual and small-group practice', 'Baseball pitching machine lane options', 'Up to four people per lane rental', '$40 per hour, plus $10 for each additional player'], image: 'facility', cta: ['Reserve a lane', booking] },
    softball: { title: 'Softball batting lanes', intro: 'A welcoming place for softball players to work on their game. Practice with purpose, stay comfortable, and make time for the skills that matter.', body: 'Softball pitching machine lanes are set up for focused hitting sessions. Come on your own, with a teammate, or with a small group from your team, and keep your timing sharp between games.', expect: ['Softball pitching machine lane options', 'Indoor, air-conditioned practice', 'Space for individuals and teammates', '$40 per hour, plus $10 for each additional player'], image: 'training', cta: ['Reserve a lane', booking] },
    lessons: { title: 'Private baseball & softball lessons', intro: 'Work with an experienced coach on your individual development. Personalized instruction helps athletes refine their skills and build confidence.', body: 'Lessons are arranged directly with the facility. Tell us about the player, their position, and what they want to work on, and the team will help you find a time and the right coach.', expect: ['One-on-one instruction', 'Baseball and softball skill development', 'A supportive environment for growing athletes', 'Rates and availability shared on request'], image: 'facility', cta: ['Ask about lessons', `mailto:${email}`] },
    hittrax: { title: 'Batting practice with HitTrax', intro: 'Use real-time data and analytics to bring more insight to your batting practice. HitTrax helps connect what you feel with what happens in your swing.', body: 'Every swing gives you something to look at. Use the feedback during your session to test an adjustment, see what changed, and leave with a clearer idea of what to practice next.', expect: ['Real-time training feedback', 'Swing mechanics and performance insights', 'A purposeful addition to your practice routine', 'Currently listed at $85 per person, $20 per additional person, up to four'], image: 'training', cta: ['Reserve HitTrax time', booking] }
  };

  const prices = [
    { name: 'Lane rental', price: '$40', unit: 'per hour', note: 'Baseball and softball lane options. Additional players are $10 each, with a maximum of four people per lane.' },
    { name: 'Single membership', price: '$250', unit: 'per month', note: 'One hour of hitting per day, subject to lane availability and team bookings.' },
    { name: 'Team membership', price: '$600', unit: 'per month', note: 'Whole-facility access one day per week for two hours. Coordinate your schedule with the facility.' }
  ];

  const faq = [
    ['How do I reserve a lane?', 'Use the online scheduler to see availability and reserve your session. Contact the facility directly for lessons or group arrangements.'],
    ['Can I train with friends?', 'Yes. Standard lane rentals allow up to four players, with a fee for each additional player. For larger groups, ask about facility rentals.'],
    ['Do I need to be on a team?', 'No. Individual players, families, and groups are all welcome to book time.'],
    ['Where is the facility?', `${address[0]}, ${address[1]}. Hours and directions are on the contact page.`]
  ];

  const logoFilter = '<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs><filter id="logo-ink" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 3 0"/></filter></defs></svg>';

  // Today's index and a plain-language status, in the facility's own time zone.
  function today() {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t)?.value;
    const index = hours.findIndex(h => h.d === get('weekday'));
    const now = Number(get('hour')) + Number(get('minute')) / 60;
    const h = hours[index];
    let status;
    if (h.o === null) status = 'Closed today';
    else if (now < h.o) status = `Opens today at ${clock(h.o)}`;
    else if (now < h.c) status = `Open now until ${clock(h.c)}`;
    else status = 'Closed for the day';
    return { index, status, open: h.o !== null && now >= h.o && now < h.c };
  }

  const ext = url => (/^https?:/.test(url) ? ' target="_blank" rel="noopener"' : '');
  // Google Maps embed (no key needed), tinted by each design's CSS, with a home-plate pin on top.
  const mapSrc = 'https://maps.google.com/maps?q=906%20Barstow%20Ave%20Suite%20A%2C%20Clovis%2C%20CA%2093612&z=15&output=embed';
  const map = (cls = '') => `<div class="epc-map ${cls}"><iframe src="${mapSrc}" title="Map showing Elite Performance Center at 906 Barstow Ave, Clovis" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><svg class="epc-pin" viewBox="0 0 40 44" aria-hidden="true"><path d="M2 2 H38 V22 L20 42 L2 22 Z"/></svg></div>`;

  const social = '<div class="epc-social"><a href="https://www.instagram.com/eliteperformancecenter_clovis/" target="_blank" rel="noopener" aria-label="Elite Performance Center on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg></a><a href="https://www.facebook.com/profile.php?id=61594280009550" target="_blank" rel="noopener" aria-label="Elite Performance Center on Facebook"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3.2h-3V8.3c0-.9.3-1.6 1.6-1.6h1.6V3.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.5H7.9v3.2h2.6V21h3z"/></svg></a></div>';

  const img = (file, alt = 'Baseball and softball training at Elite Performance Center in Clovis', cls = '') => `<img class="${cls}" src="assets/${file}.jpg" alt="${alt}">`;

  function initTheme(defaultDark) {
    let saved = null;
    try { saved = localStorage.getItem('elite-theme'); } catch (e) {}
    document.body.classList.toggle('dark', saved ? saved === 'dark' : defaultDark);
  }
  function toggleTheme() {
    const dark = document.body.classList.toggle('dark');
    try { localStorage.setItem('elite-theme', dark ? 'dark' : 'light'); } catch (e) {}
  }

  function reviewBar(name) {
    return `<div class="review"><a href="index.html">← All concepts</a><span>${name} — client preview</span><button type="button" class="theme-toggle" aria-label="Switch between light and dark mode"><span aria-hidden="true">◐</span> Light / Dark</button></div>`;
  }

  // Wires the shared chrome after each render.
  function wire() {
    document.querySelector('.theme-toggle')?.addEventListener('click', toggleTheme);
    const menu = document.querySelector('.menu-toggle');
    menu?.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      menu.setAttribute('aria-expanded', String(open));
    });
  }

  // Background film + photo rotation, with one pause control for both.
  let timer;
  function motion(root, { interval = 6500 } = {}) {
    clearInterval(timer);
    if (!root) return;
    const video = root.querySelector('video');
    if (video) { video.muted = true; video.defaultMuted = true; video.playsInline = true; }
    const photos = [...root.querySelectorAll('[data-photo]')];
    const pause = root.querySelector('[data-pause]');
    const next = root.querySelector('[data-next]');
    let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;
    const show = i => { index = (i + photos.length) % photos.length; photos.forEach((p, j) => p.classList.toggle('visible', j === index)); root.dispatchEvent(new CustomEvent('photochange', { detail: index })); };
    const start = () => { clearInterval(timer); if (!paused && photos.length > 1) timer = setInterval(() => show(index + 1), interval); };
    const update = () => {
      if (pause) { pause.textContent = paused ? 'Play motion' : 'Pause motion'; pause.setAttribute('aria-pressed', String(paused)); }
      if (paused) { video?.pause(); clearInterval(timer); }
      else { video?.play().catch(e => { if (e.name === 'NotAllowedError') { paused = true; update(); } }); start(); }
    };
    pause?.addEventListener('click', () => { paused = !paused; update(); });
    next?.addEventListener('click', () => { show(index + 1); start(); });
    update();
  }

  // Accessible service chooser: hover (mouse), click, focus, arrows, Home/End.
  function chooser(buttons, onChoose) {
    let active = -1;
    const choose = i => { if (i === active) return; active = i; buttons.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i))); onChoose(i); };
    buttons.forEach((b, i) => {
      b.addEventListener('click', () => choose(i));
      b.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') choose(i); });
      b.addEventListener('focus', () => choose(i));
      b.addEventListener('keydown', e => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (e.key in keys || e.key === 'Home' || e.key === 'End') {
          e.preventDefault();
          const n = e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length - 1 : (i + keys[e.key] + buttons.length) % buttons.length;
          buttons[n].focus();
        }
      });
    });
    choose(0);
  }

  function router(render) {
    const go = () => {
      let page = location.hash.slice(1) || 'home';
      if (!pages[page]) page = 'home';
      if (window.epcMeta) window.epcMeta(page); else document.title = `${pages[page]} | Elite Performance Center`;
      document.body.classList.remove('nav-open');
      render(page);
      wire();
    };
    window.addEventListener('hashchange', () => { go(); window.scrollTo(0, 0); });
    go();
  }

  return { booking, email, phone, address, maps, pages, hours, clock, span, services, detail, prices, faq, logoFilter, today, map, social, wire, ext, img, initTheme, reviewBar, motion, chooser, router };
})();
