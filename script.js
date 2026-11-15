document.getElementById("y").textContent = new Date().getFullYear();

const BADGES = [
  // Free Chains
  { id: 'purple_chain', name: 'Purple Chain', type: 'free', req: '1 Day Watch Time', svg: `<svg viewBox="0 0 64 64"><defs><linearGradient id="gP" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#b026ff"/><stop offset="100%" stop-color="#7000df"/></linearGradient></defs><path d="M22 14l10-8 10 8" fill="none" stroke="#ddd" stroke-width="4" stroke-linecap="round"/><path d="M14 24h10l-4 30h10l-4-30h10" fill="url(#gP)" stroke="#fff" stroke-width="1.5"/></svg>` },
  { id: 'bronze_chain', name: 'Bronze Chain', type: 'free', req: '2 Days Watch Time', svg: `<svg viewBox="0 0 64 64"><defs><linearGradient id="gBr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#cd7f32"/><stop offset="100%" stop-color="#8b4513"/></linearGradient></defs><path d="M22 14l10-8 10 8" fill="none" stroke="#ddd" stroke-width="4" stroke-linecap="round"/><path d="M14 24h10l-4 30h10l-4-30h10" fill="url(#gBr)" stroke="#fff" stroke-width="1.5"/></svg>` },
  { id: 'silver_chain', name: 'Silver Chain', type: 'free', req: '3 Days Watch Time', svg: `<svg viewBox="0 0 64 64"><defs><linearGradient id="gS" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e0e0e0"/><stop offset="100%" stop-color="#999"/></linearGradient></defs><path d="M22 14l10-8 10 8" fill="none" stroke="#ddd" stroke-width="4" stroke-linecap="round"/><path d="M14 24h10l-4 30h10l-4-30h10" fill="url(#gS)" stroke="#fff" stroke-width="1.5"/></svg>` },
  { id: 'gold_chain', name: 'Gold Chain', type: 'free', req: '4 Days Watch Time', svg: `<svg viewBox="0 0 64 64"><defs><linearGradient id="gG" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffd700"/><stop offset="100%" stop-color="#cca100"/></linearGradient></defs><path d="M22 14l10-8 10 8" fill="none" stroke="#ddd" stroke-width="4" stroke-linecap="round"/><path d="M14 24h10l-4 30h10l-4-30h10" fill="url(#gG)" stroke="#fff" stroke-width="1.5"/></svg>` },
  { id: 'diamond_chain', name: 'Diamond Chain', type: 'free', req: '5 Days Watch Time', svg: `<svg viewBox="0 0 64 64"><defs><linearGradient id="gD" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00f2fe"/><stop offset="100%" stop-color="#4facfe"/></linearGradient></defs><path d="M22 14l10-8 10 8" fill="none" stroke="#ddd" stroke-width="4" stroke-linecap="round"/><path d="M14 24h10l-4 30h10l-4-30h10" fill="url(#gD)" stroke="#fff" stroke-width="1.5"/></svg>` },
  { id: 'miami_chain', name: 'Miami Chain', type: 'free', req: '6 Days Watch Time', svg: `<svg viewBox="0 0 64 64"><defs><linearGradient id="gM" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ff007f"/><stop offset="100%" stop-color="#7928ca"/></linearGradient></defs><path d="M22 14l10-8 10 8" fill="none" stroke="#ddd" stroke-width="4" stroke-linecap="round"/><path d="M14 24h10l-4 30h10l-4-30h10" fill="url(#gM)" stroke="#fff" stroke-width="1.5"/></svg>` },
  // Paid Badges
  { id: 'bleed_miami', name: 'Bleed Miami', type: 'paid', req: 'Paid Subscription / Gift', svg: `<svg viewBox="0 0 64 64"><defs><linearGradient id="gBm" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ff2a85"/><stop offset="100%" stop-color="#2a75ff"/></linearGradient></defs><path d="M32 54s-20-14-20-28a12 12 0 0 1 20-8 12 12 0 0 1 20 8c0 14-20 28-20 28z" fill="url(#gBm)"/></svg>` },
  { id: 'welcome_miami', name: 'Welcome 2 Miami', type: 'paid', req: 'Paid Subscription / Gift', svg: `<svg viewBox="0 0 64 64"><defs><linearGradient id="gWm" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00ffff"/><stop offset="100%" stop-color="#ff00ff"/></linearGradient></defs><path d="M32 8v48m-12-8h24m-18-12h12m-16-12h20" stroke="url(#gWm)" stroke-width="4" stroke-linecap="round"/></svg>` },
  { id: 'scored_big', name: 'Scored Big', type: 'paid', req: 'Paid Subscription / Gift', svg: `<svg viewBox="0 0 64 64"><defs><linearGradient id="gSb" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#22c55e"/><stop offset="100%" stop-color="#15803d"/></linearGradient></defs><circle cx="32" cy="32" r="24" fill="url(#gSb)"/><text x="32" y="40" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">$</text></svg>` }
];

const IGUANA_SVG = `<svg viewBox="0 0 64 64"><defs><linearGradient id="gIg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#b45309"/></linearGradient></defs><rect x="8" y="8" width="48" height="48" rx="10" fill="url(#gIg)"/><path d="M20 32c6-10 18-10 24 0-4 12-16 12-24 0z" fill="#10b981" stroke="#fff" stroke-width="2"/></svg>`;

let unlockedIds = JSON.parse(localStorage.getItem('twitch_tracker_badges') || '[]');
let activeFilter = 'all';

const freeGrid = document.getElementById('free-chain-grid');
const paidGrid = document.getElementById('paid-badge-grid');
const iguanaContainer = document.getElementById('iguana-svg-container');
const modalIguanaContainer = document.getElementById('modal-iguana-container');

iguanaContainer.innerHTML = IGUANA_SVG;
modalIguanaContainer.innerHTML = IGUANA_SVG;

function saveState() {
  localStorage.setItem('twitch_tracker_badges', JSON.stringify(unlockedIds));
  render();
}

function render() {
  freeGrid.innerHTML = '';
  paidGrid.innerHTML = '';

  let freeCount = 0;
  let paidCount = 0;
  let totalUnlocked = unlockedIds.length;

  BADGES.forEach(badge => {
    const isUnlocked = unlockedIds.includes(badge.id);
    if (isUnlocked) {
      if (badge.type === 'free') freeCount++;
      if (badge.type === 'paid') paidCount++;
    }

    if (activeFilter === 'free' && badge.type !== 'free') return;
    if (activeFilter === 'paid' && badge.type !== 'paid') return;
    if (activeFilter === 'unlocked' && !isUnlocked) return;
    if (activeFilter === 'missing' && isUnlocked) return;

    const card = document.createElement('div');
    card.className = `badge-card ${isUnlocked ? 'unlocked' : ''}`;
    card.innerHTML = `
      <div class="badge-icon-box">${badge.svg}</div>
      <div class="badge-info">
        <p class="badge-name">${badge.name}</p>
        <p class="badge-req">${badge.req}</p>
      </div>
      <div class="badge-check"></div>
    `;
    card.addEventListener('click', () => {
      if (isUnlocked) {
        unlockedIds = unlockedIds.filter(id => id !== badge.id);
      } else {
        unlockedIds.push(badge.id);
      }
      saveState();
    });

    if (badge.type === 'free') freeGrid.appendChild(card);
    else paidGrid.appendChild(card);
  });

  document.getElementById('stat-collected').textContent = `${totalUnlocked} / 10`;
  document.getElementById('stat-free').textContent = `${freeCount} / 6`;
  document.getElementById('stat-paid').textContent = `${paidCount} / 3`;

  const pct = Math.round((totalUnlocked / 10) * 100);
  document.getElementById('total-pct').textContent = `${pct}%`;
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (pct / 100) * circumference;
  document.getElementById('ring-fill').style.strokeDashoffset = offset;

  const baseUnlockedCount = BADGES.filter(b => unlockedIds.includes(b.id)).length;
  const iguanaUnlocked = baseUnlockedCount === 9;

  const iguanaCard = document.getElementById('iguana-card');
  const iguanaBadge = document.getElementById('iguana-status-badge');
  const iguanaFill = document.getElementById('iguana-progress-fill');
  const iguanaText = document.getElementById('iguana-progress-text');

  iguanaFill.style.width = `${(baseUnlockedCount / 9) * 100}%`;
  iguanaText.textContent = `${baseUnlockedCount} / 9 badges collected`;

  if (iguanaUnlocked) {
    iguanaCard.style.borderColor = 'var(--accent)';
    iguanaBadge.textContent = 'Unlocked';
    iguanaBadge.className = 'status-badge unlocked';
    if (!unlockedIds.includes('golden_iguana')) {
      unlockedIds.push('golden_iguana');
      localStorage.setItem('twitch_tracker_badges', JSON.stringify(unlockedIds));
      showModal();
    }
  } else {
    iguanaBadge.textContent = 'Locked';
    iguanaBadge.className = 'status-badge locked';
    const idx = unlockedIds.indexOf('golden_iguana');
    if (idx > -1) {
      unlockedIds.splice(idx, 1);
      localStorage.setItem('twitch_tracker_badges', JSON.stringify(unlockedIds));
    }
  }
}

function showModal() {
  document.getElementById('completion-modal').classList.add('active');
}

document.getElementById('modal-close-btn').addEventListener('click', () => {
  document.getElementById('completion-modal').classList.remove('active');
});

document.getElementById('preview-popup-btn').addEventListener('click', showModal);

document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('Reset all badge progress?')) {
    unlockedIds = [];
    saveState();
  }
});

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    render();
  });
});

document.getElementById('mark-all-free').addEventListener('click', () => {
  BADGES.filter(b => b.type === 'free').forEach(b => {
    if (!unlockedIds.includes(b.id)) unlockedIds.push(b.id);
  });
  saveState();
});

document.getElementById('mark-all-paid').addEventListener('click', () => {
  BADGES.filter(b => b.type === 'paid').forEach(b => {
    if (!unlockedIds.includes(b.id)) unlockedIds.push(b.id);
  });
  saveState();
});

render();
