// Floating call + message dock, shared by all three concepts.
// Colors come from each design: --epc-accent / --epc-accent-ink, plus --surface, --ink, --muted, --line.
// Prototype note: there is no server on GitHub Pages, so "Send" opens the visitor's email app with the
// message filled in. A form service (Formspree, Netlify Forms, etc.) is needed to upload attachments directly.
(() => {
  const EMAIL = 'info@eliteperformancecenterca.com';
  const PHONE = { label: '(559) 274-2130', href: 'tel:+15592742130' };
  const topics = ['Lane booking', 'Private lessons', 'HitTrax', 'Team or group rental', 'Memberships', 'Something else'];

  const icon = {
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    clip: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 11-8.6 8.6a5 5 0 0 1-7-7L14 4a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4L16 6.6"/></svg>'
  };

  const css = `
  .epc-dock{position:fixed;right:20px;bottom:20px;z-index:60;display:flex;flex-direction:column;align-items:flex-end;gap:12px;font:inherit}
  .epc-fab{position:relative;display:grid;place-items:center;width:58px;height:58px;border-radius:50%;border:0;cursor:pointer;text-decoration:none;box-shadow:0 10px 24px -8px #0008;transition:transform .2s,box-shadow .2s}
  .epc-fab svg{width:25px;height:25px}
  .epc-fab:hover{transform:translateY(-2px);box-shadow:0 14px 28px -8px #0009}
  .epc-fab:focus-visible{outline:3px solid var(--epc-accent);outline-offset:4px}
  .epc-call{background:var(--ink);color:var(--bg,#fff)}
  .epc-msg{background:var(--epc-accent);color:var(--epc-accent-ink,#fff)}
  .epc-msg[aria-expanded=true] .epc-i-mail,.epc-msg:not([aria-expanded=true]) .epc-i-close{display:none}
  .epc-label{position:absolute;right:calc(100% + 12px);top:50%;transform:translateY(-50%) translateX(6px);white-space:nowrap;padding:7px 14px;border-radius:999px;background:var(--surface);color:var(--ink);font-size:14px;font-weight:600;box-shadow:0 6px 18px -6px #0006;border:1px solid var(--line);opacity:0;pointer-events:none;transition:opacity .2s,transform .2s}
  .epc-fab:hover .epc-label,.epc-fab:focus-visible .epc-label,.epc-dock.hello .epc-hello{opacity:1;transform:translateY(-50%)}
  .epc-msg[aria-expanded=true] .epc-label{opacity:0!important}
  .epc-panel{width:min(380px,calc(100vw - 40px));max-height:min(640px,calc(100svh - 120px));overflow:auto;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:20px;box-shadow:0 24px 60px -20px #000a;transform-origin:bottom right;animation:epc-in .22s ease-out}
  .epc-dock [hidden]{display:none!important}
  @keyframes epc-in{from{opacity:0;transform:translateY(10px) scale(.97)}}
  .epc-head{padding:20px 22px 14px;background:var(--epc-accent);color:var(--epc-accent-ink,#fff)}
  .epc-head h2{margin:0 0 4px;font-size:22px;line-height:1.15;letter-spacing:0;color:inherit;font-family:inherit;font-weight:700;text-transform:none}
  .epc-head p{margin:0;font-size:14px;line-height:1.45;color:inherit;opacity:.88;max-width:none}
  .epc-form{display:grid;gap:12px;padding:18px 22px 22px}
  .epc-form label{display:grid;gap:5px;font-size:13px;font-weight:600;color:var(--ink)}
  .epc-form input,.epc-form select,.epc-form textarea{width:100%;box-sizing:border-box;font:inherit;font-size:15px;font-weight:400;color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:10px 12px;min-height:44px}
  .epc-form textarea{min-height:96px;resize:vertical}
  .epc-form input:focus,.epc-form select:focus,.epc-form textarea:focus{outline:2px solid var(--epc-accent);outline-offset:1px;border-color:transparent}
  .epc-form .epc-attach{display:flex;align-items:center;gap:8px;justify-content:center;min-height:44px;border:1.5px dashed var(--line);border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;color:var(--ink);transition:border-color .2s,background .2s}
  .epc-attach:hover,.epc-attach:focus-within{border-color:var(--epc-accent)}
  .epc-attach.drag{background:color-mix(in srgb,var(--epc-accent),transparent 88%);border-color:var(--epc-accent)}
  .epc-attach svg{width:18px;height:18px}
  .epc-attach input{position:absolute;width:1px;height:1px;opacity:0}
  .epc-files{display:flex;flex-wrap:wrap;gap:6px;margin:-4px 0 0;padding:0;list-style:none}
  .epc-files li{display:flex;align-items:center;gap:6px;max-width:100%;padding:4px 6px 4px 10px;border-radius:999px;background:var(--bg);border:1px solid var(--line);font-size:12px;color:var(--ink)}
  .epc-files span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px}
  .epc-files button{display:grid;place-items:center;width:22px;height:22px;border:0;border-radius:50%;background:none;color:var(--muted);cursor:pointer}
  .epc-files button:hover{color:var(--ink);background:var(--line)}
  .epc-files button svg{width:14px;height:14px}
  .epc-send{min-height:48px;border:0;border-radius:999px;background:var(--epc-accent);color:var(--epc-accent-ink,#fff);font:inherit;font-weight:700;font-size:15px;cursor:pointer;transition:filter .2s}
  .epc-send:hover{filter:brightness(1.08)}
  .epc-alt{margin:0;font-size:13px;color:var(--muted);text-align:center;max-width:none}
  .epc-alt a{color:var(--ink);font-weight:600}
  .epc-done{padding:26px 22px 24px;display:grid;gap:12px}
  .epc-done h3{margin:0;font-size:20px;font-family:inherit;letter-spacing:0;line-height:1.2;color:var(--ink);text-transform:none}
  .epc-done p{margin:0;font-size:14px;color:var(--muted);max-width:none}
  .epc-done button{justify-self:start;min-height:44px;padding:0 18px;border-radius:999px;border:1px solid var(--line);background:none;color:var(--ink);font:inherit;font-weight:600;cursor:pointer}
  @media(max-width:600px){
    .epc-dock{right:14px;bottom:14px;gap:10px}
    .epc-fab{width:52px;height:52px}
    .epc-panel{position:fixed;left:10px;right:10px;bottom:76px;width:auto;max-height:calc(100svh - 96px)}
    .epc-label{display:none}
    .epc-dock.open .epc-call{display:none}
    .epc-dock.hello .epc-hello{display:block}
  }
  @media(prefers-reduced-motion:reduce){.epc-panel{animation:none}.epc-fab,.epc-label{transition:none}}`;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);

  const dock = document.createElement('div');
  dock.className = 'epc-dock';
  dock.innerHTML = `
    <section class="epc-panel" id="epc-panel" role="dialog" aria-labelledby="epc-title" hidden>
      <div class="epc-head">
        <h2 id="epc-title">Send us a message</h2>
        <p>Questions about lanes, lessons, or a team rental? Leave a note and the team will get back to you.</p>
      </div>
      <form class="epc-form" novalidate>
        <label>Your name<input name="name" autocomplete="name" required></label>
        <label>Email or phone<input name="contact" autocomplete="email" required></label>
        <label>What is it about?<select name="topic">${topics.map(t => `<option>${t}</option>`).join('')}</select></label>
        <label>Message<textarea name="message" required placeholder="Days and times you're looking at, number of players, anything we should know."></textarea></label>
        <label class="epc-attach">${icon.clip}<span>Attach photos or files</span><input type="file" name="files" multiple accept="image/*,.pdf,.doc,.docx"></label>
        <ul class="epc-files" aria-label="Attached files"></ul>
        <button class="epc-send" type="submit">Send message</button>
        <p class="epc-alt">Prefer to talk? Call <a href="${PHONE.href}">${PHONE.label}</a></p>
      </form>
      <div class="epc-done" hidden tabindex="-1">
        <h3>Your message is ready in your email app.</h3>
        <p class="epc-done-text"></p>
        <button type="button" class="epc-again">Write another message</button>
      </div>
    </section>
    <a class="epc-fab epc-call" href="${PHONE.href}" aria-label="Call Elite Performance Center at ${PHONE.label}">${icon.phone}<span class="epc-label" aria-hidden="true">Call ${PHONE.label}</span></a>
    <button type="button" class="epc-fab epc-msg" aria-expanded="false" aria-controls="epc-panel" aria-label="Send us a message"><span class="epc-i-mail">${icon.mail}</span><span class="epc-i-close">${icon.close}</span><span class="epc-label epc-hello" aria-hidden="true">We'd love to hear from you</span></button>`;
  document.body.append(dock);

  const panel = dock.querySelector('.epc-panel');
  const toggle = dock.querySelector('.epc-msg');
  const form = dock.querySelector('.epc-form');
  const done = dock.querySelector('.epc-done');
  const fileInput = form.querySelector('input[type=file]');
  const list = form.querySelector('.epc-files');
  const drop = form.querySelector('.epc-attach');
  let files = [];

  const setOpen = open => {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close message form' : 'Send us a message');
    dock.classList.remove('hello');
    dock.classList.toggle('open', open);
    if (open) (done.hidden ? form.querySelector('input') : done).focus();
  };
  toggle.addEventListener('click', () => setOpen(panel.hidden));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { setOpen(false); toggle.focus(); } });

  // Greeting bubble, once per visit.
  let greeted = false;
  try { greeted = sessionStorage.getItem('epc-hello') === '1'; } catch (e) {}
  if (!greeted) {
    setTimeout(() => { if (panel.hidden) dock.classList.add('hello'); }, 1800);
    setTimeout(() => dock.classList.remove('hello'), 9000);
    try { sessionStorage.setItem('epc-hello', '1'); } catch (e) {}
  }

  const renderFiles = () => {
    list.innerHTML = files.map((f, i) => `<li><span>${f.name.replace(/</g, '&lt;')}</span><button type="button" data-i="${i}" aria-label="Remove ${f.name.replace(/"/g, '')}">${icon.close}</button></li>`).join('');
  };
  const addFiles = incoming => { files = files.concat([...incoming]); renderFiles(); };
  fileInput.addEventListener('change', () => { addFiles(fileInput.files); fileInput.value = ''; });
  list.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { files.splice(Number(b.dataset.i), 1); renderFiles(); } });
  ['dragenter', 'dragover'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add('drag'); }));
  ['dragleave', 'drop'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove('drag'); }));
  drop.addEventListener('drop', e => addFiles(e.dataTransfer.files));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const missing = [...form.querySelectorAll('[required]')].find(el => !el.value.trim());
    if (missing) { missing.setAttribute('aria-invalid', 'true'); missing.focus(); missing.reportValidity?.(); return; }
    const d = new FormData(form);
    const lines = [d.get('message'), '', `Name: ${d.get('name')}`, `Reply to: ${d.get('contact')}`];
    if (files.length) lines.push('', `Attachments: ${files.map(f => f.name).join(', ')}`);
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Website message: ${d.get('topic')}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
    done.querySelector('.epc-done-text').textContent = files.length
      ? `Add your ${files.length === 1 ? 'file' : `${files.length} files`} (${files.map(f => f.name).join(', ')}) to the email, then send it. If your email app did not open, write to ${EMAIL}.`
      : `Review it and press send. If your email app did not open, write to ${EMAIL}.`;
    form.hidden = true; done.hidden = false; done.focus();
  });
  form.addEventListener('input', e => e.target.removeAttribute('aria-invalid'));
  dock.querySelector('.epc-again').addEventListener('click', () => {
    form.reset(); files = []; renderFiles(); done.hidden = true; form.hidden = false; form.querySelector('input').focus();
  });
})();
