/* =========================================================
   CampusFix — Utility Functions
   ========================================================= */

// ── Toast system ───────────────────────────────────────────
function showToast(type, title, message, duration = 4000) {
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || 'ℹ️'}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 250ms ease forwards';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

// ── Confirm modal ──────────────────────────────────────────
function showConfirm(icon, title, message, okLabel = 'Confirm', dangerBtn = true) {
  return new Promise((resolve) => {
    const modal = document.getElementById('confirm-modal');
    document.getElementById('confirm-icon').textContent = icon;
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    const okBtn = document.getElementById('confirm-ok');
    okBtn.textContent = okLabel;
    okBtn.className = `btn ${dangerBtn ? 'btn-danger' : 'btn-primary'}`;
    modal.classList.remove('hidden');
    const ok = () => { cleanup(); resolve(true); };
    const cancel = () => { cleanup(); resolve(false); };
    const cleanup = () => {
      modal.classList.add('hidden');
      okBtn.removeEventListener('click', ok);
      document.getElementById('confirm-cancel').removeEventListener('click', cancel);
    };
    okBtn.addEventListener('click', ok);
    document.getElementById('confirm-cancel').addEventListener('click', cancel);
    modal.addEventListener('click', (e) => { if (e.target === modal) cancel(); });
  });
}

// ── Language detection (keyword-based) ────────────────────
const LANG_HINTS = {
  hi: ['है', 'का', 'में', 'नहीं', 'कृपया', 'बंद', 'चल', 'ठीक', 'हो', 'रहा', 'पानी', 'बिजली'],
  ta: ['இல்லை', 'தண்ணீர்', 'வேண்டும்', 'இல்'],
  te: ['లేదు', 'నీళ్ళు', 'కరెంట్'],
  en: [],
};
function detectLanguage(text) {
  const t = text || '';
  for (const [lang, hints] of Object.entries(LANG_HINTS)) {
    if (lang === 'en') continue;
    if (hints.some(h => t.includes(h))) return lang;
  }
  return 'en';
}
const LANG_LABELS = { en: '🇬🇧 English', hi: '🇮🇳 Hindi', ta: '🇮🇳 Tamil', te: '🇮🇳 Telugu' };

// ── Category classifier ───────────────────────────────────
const CAT_KEYWORDS = {
  electrical: ['power','electricity','light','electrical','voltage','trip','breaker','outlet','socket','fan','heater','ac','air cond','bulb','tube','fuse','plug','wiring','wire','switch'],
  plumbing:   ['water','pipe','leak','drip','flood','tap','faucet','drain','sewage','toilet','washroom','bathroom','geyser','overflow'],
  it:         ['wifi','internet','network','projector','computer','laptop','server','router','printer','lab','software','system','online','connection','bandwidth','cable','screen','display'],
  safety:     ['cctv','camera','security','fire','escape','emergency','lock','dark','unsafe','broken gate','ragging','harassment','threat'],
  cleanliness:['garbage','trash','waste','dirty','hygiene','smell','odour','cleaning','dustbin','bin','sweep','pest','rodent','cockroach'],
  furniture:  ['chair','table','bench','desk','broken','damaged','furniture','cupboard','shelf','door','window','glass'],
};
function classifyCategory(text) {
  const t = (text || '').toLowerCase();
  const scores = {};
  for (const [cat, kws] of Object.entries(CAT_KEYWORDS)) {
    scores[cat] = kws.filter(k => t.includes(k)).length;
  }
  const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]);
  if (sorted[0][1] === 0) return { category: 'other', confidence: 0.4 };
  const total = sorted.reduce((s,[,v]) => s + v, 0);
  const confidence = Math.min(0.97, 0.5 + (sorted[0][1] / total) * 0.5);
  return { category: sorted[0][0], confidence: parseFloat(confidence.toFixed(2)) };
}

// ── Routing engine ─────────────────────────────────────────
const CAT_TO_DEPT = {
  electrical: 'd1', plumbing: 'd1', furniture: 'd1', structural: 'd1',
  it: 'd2', wifi: 'd2',
  cleanliness: 'd3',
  safety: 'd4',
  other: 'd5',
};
function routeReport(category, confidence) {
  const dept_id = CAT_TO_DEPT[category] || 'd5';
  const dept = DB.find('departments', dept_id);
  return { dept_id, dept_name: dept?.name || 'Administration', confidence, needs_review: confidence < 0.80 };
}

// ── Duplicate detector ─────────────────────────────────────
const GEO_THRESHOLD_M = 150; // meters
const TEXT_THRESHOLD  = 0.45;

function haversineM(lat1, lng1, lat2, lng2) {
  const R = 6371000, toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function wordSimilarity(a, b) {
  const wordsA = new Set((a || '').toLowerCase().split(/\s+/).filter(w => w.length > 3));
  const wordsB = new Set((b || '').toLowerCase().split(/\s+/).filter(w => w.length > 3));
  if (!wordsA.size || !wordsB.size) return 0;
  const intersection = [...wordsA].filter(w => wordsB.has(w)).length;
  return intersection / Math.max(wordsA.size, wordsB.size);
}

function findDuplicates(newReport) {
  const reports = DB.get('reports') || [];
  const matches = [];
  for (const r of reports) {
    if (!r.location?.lat || !newReport.location?.lat) continue;
    const dist = haversineM(newReport.location.lat, newReport.location.lng, r.location.lat, r.location.lng);
    const textSim = wordSimilarity(newReport.description + ' ' + newReport.title, r.description + ' ' + r.title);
    const catMatch = newReport.category === r.category ? 0.3 : 0;
    const geoScore = dist < GEO_THRESHOLD_M ? (1 - dist / GEO_THRESHOLD_M) * 0.4 : 0;
    const score = Math.min(1, geoScore + textSim * 0.3 + catMatch);
    if (score > 0.35) matches.push({ report: r, score: parseFloat(score.toFixed(2)), dist: Math.round(dist) });
  }
  return matches.sort((a,b) => b.score - a.score).slice(0, 3);
}

// ── SLA helpers ────────────────────────────────────────────
function getSLAStatus(report) {
  const dept = DB.find('departments', report.dept_id);
  if (!dept) return { status: 'ok', hoursLeft: null, label: '' };
  const slaMs = dept.sla_hours * 3600000;
  const elapsed = Date.now() - report.created_at;
  const remaining = slaMs - elapsed;
  const hoursLeft = Math.round(remaining / 3600000);
  if (remaining < 0) return { status: 'overdue', hoursLeft, label: `${Math.abs(hoursLeft)}h overdue` };
  if (remaining < slaMs * 0.25) return { status: 'warning', hoursLeft, label: `${hoursLeft}h left` };
  return { status: 'ok', hoursLeft, label: `${hoursLeft}h left` };
}

// ── Audit logger ───────────────────────────────────────────
function auditLog(action, actor_id, entity_type, entity_id, meta = {}) {
  const entry = {
    id: 'al' + Date.now(),
    timestamp: Date.now(),
    action,
    actor_id,
    entity_type,
    entity_id,
    meta,
  };
  DB.push('auditLog', entry);
  return entry;
}

// ── Formatting helpers ─────────────────────────────────────
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatCurrency(n) {
  return '₹' + (n / 1000).toFixed(0) + 'K';
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// ── Category meta ──────────────────────────────────────────
const CAT_META = {
  electrical:  { icon: '⚡', label: 'Electrical', cls: 'cat-electrical' },
  plumbing:    { icon: '🔧', label: 'Plumbing',   cls: 'cat-plumbing' },
  it:          { icon: '💻', label: 'IT / Network', cls: 'cat-it' },
  safety:      { icon: '🔒', label: 'Safety',     cls: 'cat-safety' },
  cleanliness: { icon: '🧹', label: 'Cleanliness', cls: 'cat-cleanliness' },
  furniture:   { icon: '🪑', label: 'Furniture',  cls: 'cat-furniture' },
  other:       { icon: '📋', label: 'Other',      cls: 'cat-other' },
};

const STATUS_META = {
  reported:     { label: 'Reported',     cls: 'badge-reported',     dot: 'reported' },
  acknowledged: { label: 'Acknowledged', cls: 'badge-acknowledged', dot: 'acknowledged' },
  inprogress:   { label: 'In Progress',  cls: 'badge-inprogress',   dot: 'inprogress' },
  resolved:     { label: 'Resolved',     cls: 'badge-resolved',     dot: 'resolved' },
  closed:       { label: 'Closed',       cls: 'badge-closed',       dot: 'resolved' },
};

function catBadge(cat) {
  const m = CAT_META[cat] || CAT_META.other;
  return `<span class="cat-badge ${m.cls}">${m.icon} ${m.label}</span>`;
}

function statusBadge(status) {
  const m = STATUS_META[status] || STATUS_META.reported;
  return `<span class="badge ${m.cls}">${m.label}</span>`;
}

function confidenceChip(score) {
  const pct = Math.round(score * 100);
  const cls = pct >= 85 ? 'confidence-high' : pct >= 70 ? 'confidence-medium' : 'confidence-low';
  const label = pct >= 85 ? 'High confidence' : pct >= 70 ? 'Medium confidence' : 'Needs review';
  return `<span class="confidence-chip ${cls}">${pct}% — ${label}</span>`;
}

function anonLabel(report) {
  if (!report.anonymous) return '';
  return `<span class="anon-pill">🔒 Anonymous</span>`;
}

function slaChip(report) {
  const s = getSLAStatus(report);
  if (['resolved','closed'].includes(report.status)) return '';
  const cls = s.status === 'ok' ? 'sla-ok' : s.status === 'warning' ? 'sla-warning' : 'sla-overdue';
  const icon = s.status === 'ok' ? '🕐' : s.status === 'warning' ? '⚠️' : '🚨';
  return `<span class="sla-timer ${cls}">${icon} SLA: ${s.label}</span>`;
}

// ── Map marker color by category ──────────────────────────
const CAT_COLORS = {
  electrical: '#F59E0B', plumbing: '#38BDF8', it: '#818CF8',
  safety: '#F87171', cleanliness: '#34D399', furniture: '#FB923C', other: '#94A3B8',
};
const STATUS_COLORS = {
  reported: '#60A5FA', acknowledged: '#FBBF24', inprogress: '#A78BFA', resolved: '#34D399', closed: '#94A3B8',
};

function mapIcon(report) {
  const color = STATUS_COLORS[report.status] || '#94A3B8';
  const cm = CAT_META[report.category] || CAT_META.other;
  return L.divIcon({
    html: `<div style="background:${color};width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;">
      <span style="transform:rotate(45deg);font-size:14px;">${cm.icon}</span></div>`,
    className: '',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -36],
  });
}

// ── Leaflet tile layer — theme-aware ───────────────────────
function getTileLayer() {
  const isLight = document.body.classList.contains('light-mode');
  if (isLight) {
    // CARTO Voyager: warm, detailed, looks great on light backgrounds
    return L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19,
      subdomains: 'abcd',
    });
  }
  return L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 19,
    subdomains: 'abcd',
  });
}
// Keep old name as alias for any legacy calls
const darkTileLayer = getTileLayer;

// ── Campus center & ITER SOA Landmarks ──────────────────
const CAMPUS_CENTER = [20.2482, 85.8012];
const CAMPUS_ZOOM   = 17;

const ITER_CAMPUS_LOCATIONS = [
  { name: 'ITER Central Library', lat: 20.248470495996642, lng: 85.80031455230156, icon: '📚', tag: 'Academic', ref: 'Central Library Building' },
  { name: 'Library Parking area', lat: 20.248001806471862, lng: 85.80044994297329, icon: '🅿️', tag: 'Facilities', ref: 'Parking' },
  { name: 'Institute of Technical Education & Research', lat: 20.24938203591257, lng: 85.80115685837413, icon: '🏛️', tag: 'Academic', ref: 'Main Campus Block' },
  { name: 'SOA University Examination Cell', lat: 20.24944455360351, lng: 85.800357798778, icon: '📝', tag: 'Admin', ref: 'Exam Cell' },
  { name: 'Bank of India ATM', lat: 20.24790460826515, lng: 85.80086868254465, icon: '🏧', tag: 'Services', ref: 'ATM & Finance' },
  { name: 'F-Block Road', lat: 20.247639, lng: 85.800750, icon: '🛣️', tag: 'Infrastructure', ref: 'F-Block Link Rd' },
  { name: 'ECO GYM, ITER', lat: 20.248316992470368, lng: 85.79981625072534, icon: '🏋️', tag: 'Sports', ref: 'Eco Gym' },
  { name: "Food Court, ITER, SIKSHA 'O' Anusandhan", lat: 20.248174329288915, lng: 85.8022458728335, icon: '🍽️', tag: 'Dining', ref: 'Canteen & Food Court' },
  { name: "'F' Block", lat: 20.248569266630494, lng: 85.80175419104118, icon: '🏢', tag: 'Academic', ref: 'F-Block Building' },
  { name: 'SOA University - Physics Department', lat: 20.24852774522614, lng: 85.80089185720512, icon: '🔬', tag: 'Academic', ref: 'Physics Dept' },
  { name: 'E Block Lawn', lat: 20.24751818741829, lng: 85.80104740504385, icon: '🌳', tag: 'Outdoors', ref: 'E-Block Green Lawn' },
  { name: "ITER, Boy's Hostel 6 (BH-6)", lat: 20.246622049860083, lng: 85.80218296098084, icon: '🛏️', tag: 'Hostel', ref: 'Boys Hostel BH-6' },
  { name: 'ITER GIRLS HOSTEL GATE', lat: 20.24760935445469, lng: 85.80024331172831, icon: '🚪', tag: 'Hostel', ref: 'LH Girls Gate' },
  { name: 'ITER BH-05', lat: 20.246076389890984, lng: 85.80226879563143, icon: '🛏️', tag: 'Hostel', ref: 'Boys Hostel BH-5' },
  { name: 'BH-10', lat: 20.245713677419047, lng: 85.80236208704476, icon: '🛏️', tag: 'Hostel', ref: 'Boys Hostel BH-10' },
  { name: 'BOYS HOSTEL 12 (BH-12)', lat: 20.246350, lng: 85.801650, icon: '🛏️', tag: 'Hostel', ref: 'BH-12 Block' },
  { name: 'Lh 1 Girls Hostel (ITER Campus)', lat: 20.247363254034024, lng: 85.80063168293206, icon: '🛏️', tag: 'Hostel', ref: 'LH-1 Girls Hostel' },
  { name: 'LH-2 Hostel (Girls Hostel)', lat: 20.247200, lng: 85.800500, icon: '🛏️', tag: 'Hostel', ref: 'LH-2 Girls Hostel' },
  { name: 'LH 3 Girls Hostel', lat: 20.246950, lng: 85.801000, icon: '🛏️', tag: 'Hostel', ref: 'LH-3 Girls Hostel' },
  { name: 'SOA Auditorium', lat: 20.24916909295392, lng: 85.8015785371737, icon: '🎭', tag: 'Events', ref: 'Main Auditorium' },
  { name: "Office of Dean - Siksha 'O' Anusandhan University", lat: 20.24955496965557, lng: 85.80083587633878, icon: '🛡️', tag: 'Admin', ref: 'Dean SOA Office' },
  { name: "'B' Block (Administrative Block)", lat: 20.249250, lng: 85.800650, icon: '🏢', tag: 'Admin', ref: 'B-Block Admin' },
  { name: 'Administration Block Road', lat: 20.249466508087377, lng: 85.80092655983732, icon: '🛣️', tag: 'Infrastructure', ref: 'Admin Road' },
  { name: 'ITER Main Campus Gate', lat: 20.249850, lng: 85.800150, icon: '⛩️', tag: 'Infrastructure', ref: 'Main Entrance' },
  { name: 'Patra Electrical & ATM Area', lat: 20.249700, lng: 85.800400, icon: '⚡', tag: 'Services', ref: 'Main Gate Market' },
  { name: 'Indoor Basketball Court 🏀', lat: 20.248625932896225, lng: 85.80156712816182, icon: '🏀', tag: 'Sports', ref: 'Basketball Court' },
  { name: 'Sports Complex', lat: 20.248480561798747, lng: 85.80126137514563, icon: '⚽', tag: 'Sports', ref: 'Sports Complex' },
  { name: "'E' Block", lat: 20.247914359544147, lng: 85.80095853652745, icon: '🏢', tag: 'Academic', ref: 'E-Block Academic' },
  { name: 'Centre for Data Science', lat: 20.249471585514364, lng: 85.80127510498602, icon: '💻', tag: 'Academic', ref: 'CDS Lab & Research' },
  { name: 'ITER, SOA Campus Center', lat: 20.25011323243892, lng: 85.80027994895656, icon: '📍', tag: 'Campus Hub', ref: 'Campus Center' },
];

function getGoogleMapsUrl(lat, lng, label) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

// ── Theme management ──────────────────────────────────────
function _applyTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('light-mode', isLight);
  document.body.classList.toggle('dark-mode', !isLight);

  const icon = document.getElementById('theme-icon');
  const btn  = document.getElementById('theme-toggle');
  if (icon) icon.textContent = isLight ? '🌙' : '☀️';
  if (btn)  btn.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';

  localStorage.setItem('cf_theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('cf_theme') || 'dark';
  _applyTheme(saved);
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  _applyTheme(next);
  // If a Leaflet map is active, re-render the current page so tiles update
  const hash = (window.location.hash || '').replace('#', '');
  if (hash === 'feed' || hash === 'submit') {
    setTimeout(() => navigate(hash), 0);
  }
}

