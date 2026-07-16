// ==========================================================
// FrontDesk AI — front-end interactions
// ==========================================================

document.getElementById('year').textContent = new Date().getFullYear();

const dateEl = document.getElementById('ledgerDate');
if (dateEl) {
  dateEl.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long' });
}

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );
}

/* ---------- Live ledger simulation (signature element) ---------- */
const script = [
  { time: '09:41', status: 'new',     label: 'New',      channel: 'Website',  text: 'New enquiry: <b>"Do you handle same-week bookings?"</b>' },
  { time: '09:41', status: 'qualify', label: 'Qualifying', channel: 'FrontDesk AI', text: 'Asking budget, timeline &amp; location — <b>2 of 3 answered</b>' },
  { time: '09:42', status: 'booked',  label: 'Booked',   channel: 'Calendar', text: 'Consultation booked — <b>Thursday, 2:00 PM</b>' },
  { time: '10:07', status: 'new',     label: 'New',      channel: 'WhatsApp', text: 'New enquiry: <b>"What are your prices?"</b>' },
  { time: '10:07', status: 'qualify', label: 'Qualifying', channel: 'FrontDesk AI', text: 'Lead scored <b>high intent</b> — routing to sales' },
  { time: '10:08', status: 'booked',  label: 'Follow-up', channel: 'FrontDesk AI', text: 'Quote sent — <b>reminder set for Friday</b>' },
  { time: '11:52', status: 'new',     label: 'New',      channel: 'Instagram', text: 'New enquiry from a story reply — <b>details captured</b>' },
  { time: '11:53', status: 'booked',  label: 'Booked',   channel: 'Calendar', text: 'Discovery call booked — <b>Monday, 9:30 AM</b>' },
];

const ledgerBody = document.getElementById('ledgerBody');
const statusClass = { new: 'ledger__status--new', qualify: 'ledger__status--qualify', booked: 'ledger__status--booked' };
let i = 0;
const MAX_ROWS = 4;

function renderRow(entry) {
  const row = document.createElement('div');
  row.className = 'ledger__row';
  row.innerHTML = `
    <span class="ledger__time">${entry.time}</span>
    <span class="ledger__status ${statusClass[entry.status]}">${entry.label}</span>
    <span class="ledger__text">${entry.text} <span style="color:var(--muted)">· ${entry.channel}</span></span>
  `;
  return row;
}

function tick() {
  if (!ledgerBody) return;
  const entry = script[i % script.length];
  ledgerBody.appendChild(renderRow(entry));

  while (ledgerBody.children.length > MAX_ROWS) {
    ledgerBody.removeChild(ledgerBody.firstElementChild);
  }
  i++;
}

if (ledgerBody) {
  for (let n = 0; n < 3; n++) tick();
  setInterval(tick, 2600);
}

/* ---------- Contact form (static-site friendly placeholder) ---------- */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Replace this with your form backend of choice (Formspree, Getform, etc.)
    // or swap the <form> action/method for a direct POST.
    formNote.textContent = 'Thanks — we\u2019ve got your details. We reply within one business day.';
    formNote.style.color = 'var(--gold-bright)';
    form.reset();
  });
                       }
