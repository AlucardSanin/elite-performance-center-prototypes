// Per-view titles and descriptions for the hash-routed concepts (Clubhouse and Performance Lab).
// At launch each view should become its own URL (/baseball/, /pricing/ ...) with these values in static HTML.
window.epcMeta = (() => {
  const brand = 'Elite Performance Center';
  const meta = {
    home: ['Indoor Baseball & Softball Training in Clovis, CA', 'Indoor, air-conditioned baseball and softball training in Clovis, CA. Batting lanes with pitching machines, private lessons, HitTrax, and team rentals.'],
    baseball: ['Baseball Batting Lanes in Clovis, CA', 'Rent an indoor baseball batting lane with a pitching machine in Clovis, CA. $40 per hour for up to four players. Reserve your lane online.'],
    softball: ['Softball Batting Lanes in Clovis, CA', 'Indoor softball batting lanes with pitching machines in Clovis, CA. $40 per hour for up to four players. Reserve your lane online.'],
    lessons: ['Private Baseball & Softball Lessons in Clovis', 'One-on-one baseball and softball lessons in Clovis, CA. Contact Elite Performance Center about coaching availability and rates.'],
    hittrax: ['HitTrax Batting Practice in Clovis, CA', 'Batting practice with HitTrax real-time swing data in Clovis, CA. See your swing mechanics and adjust as you practice.'],
    pricing: ['Lane Rental & Membership Rates', 'Lane rental $40 per hour, single membership $250 per month, team membership $600 per month. Current rates at Elite Performance Center in Clovis.'],
    contact: ['Hours, Location & Contact', 'Visit Elite Performance Center at 906 Barstow Ave, Suite A, Clovis, CA 93612. Opening hours, phone, email, and directions.']
  };
  const set = (sel, attr, value) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, value); };
  return page => {
    const [title, description] = meta[page] || meta.home;
    const full = page === 'home' ? `${brand} | ${title}` : `${title} | ${brand}`;
    document.title = full;
    set('meta[name="description"]', 'content', description);
    set('meta[property="og:title"]', 'content', full);
    set('meta[property="og:description"]', 'content', description);
  };
})();
