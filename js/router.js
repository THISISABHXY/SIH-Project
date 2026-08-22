/* =========================================================
   CampusFix — Client-side Router
   ========================================================= */

// Lazy route map — functions are looked up at call time (after app.js loads)
const ROUTES = {
  landing:      (r, p) => renderLanding(r, p),
  auth:         (r, p) => renderAuth(r, p),
  submit:       (r, p) => renderSubmit(r, p),
  'my-reports': (r, p) => renderMyReports(r, p),
  feed:         (r, p) => renderFeed(r, p),
  budget:       (r, p) => renderBudget(r, p),
  dept:         (r, p) => renderDept(r, p),
  admin:        (r, p) => renderAdmin(r, p),
  profile:      (r, p) => renderProfile(r, p),
};

let _currentPage = null;

function navigate(page, params = {}) {
  // Guard protected routes
  const user = Auth.current();
  const protected_ = ['submit', 'my-reports', 'dept', 'admin', 'profile'];
  if (protected_.includes(page) && !user) {
    const intendedPage = page;
    showToast('info', 'Sign In Required', 'Please sign in to access this page.');
    page = 'auth';
    params = { redirect: intendedPage };
  }
  if (page === 'dept' && user?.role !== 'resolver' && user?.role !== 'admin') {
    showToast('warning', 'Access Denied', 'This area is for department resolvers.');
    return;
  }
  if (page === 'admin' && user?.role !== 'admin') {
    showToast('warning', 'Access Denied', 'This area is for administrators only.');
    return;
  }

  _currentPage = page;
  window.location.hash = page;
  _routeTo(page, params);
  _updateNav(page);
  window.scrollTo(0, 0);
}

function _routeTo(page, params) {
  const root = document.getElementById('page-root');
  root.innerHTML = '';
  const fn = ROUTES[page] || ROUTES.landing;
  try {
    fn(root, params);
  } catch (err) {
    console.error('[CampusFix] Render error on page:', page, err);
    root.innerHTML = `
      <div style="max-width:640px;margin:80px auto;padding:32px;background:hsl(0,40%,12%);border:1px solid hsl(0,60%,35%);border-radius:16px;font-family:monospace;">
        <div style="font-size:1.5rem;margin-bottom:12px;">💥 Render Error</div>
        <div style="font-weight:700;color:hsl(0,80%,70%);margin-bottom:8px;">${err.message}</div>
        <pre style="font-size:12px;color:hsl(220,15%,65%);overflow:auto;">${(err.stack||'').replace(/</g,'&lt;')}</pre>
        <p style="margin-top:16px;font-size:13px;color:hsl(220,15%,55%);font-family:sans-serif;">Open DevTools (F12) → Console for full details.</p>
      </div>`;
  }
}

function _updateNav(page) {
  const user = Auth.current();
  const navLinks = document.getElementById('nav-links');
  const mobileLinks = document.getElementById('mobile-nav-links');

  let links = [
    { label: 'Home', page: 'landing' },
    { label: 'Public Feed', page: 'feed' },
    { label: 'Budgeting', page: 'budget' },
  ];

  if (user) {
    if (user.role === 'reporter') {
      links.push({ label: 'Report Issue', page: 'submit' });
      links.push({ label: 'My Reports', page: 'my-reports' });
    }
    if (user.role === 'resolver') {
      links.push({ label: 'Department Queue', page: 'dept' });
    }
    if (user.role === 'admin') {
      links.push({ label: 'Admin Panel', page: 'admin' });
      links.push({ label: 'Dept Queue', page: 'dept' });
    }
    links.push({ label: `${user.avatar} ${user.name.split(' ')[0]}`, page: 'profile', isProfile: true });
    links.push({ label: 'Sign Out', page: '_logout', danger: true });
  } else {
    links.push({ label: 'Sign In', page: 'auth', primary: true });
  }

  const renderLink = (l) => {
    if (l.page === '_logout') return `<a href="#" class="nav-link ${l.danger ? 'text-danger' : ''}" data-action="logout">${l.label}</a>`;
    const activeClass = l.page === page ? 'active' : '';
    if (l.isProfile && user) {
      return `
        <a href="#" class="nav-link nav-link-profile ${activeClass}" data-page="profile" title="View & Edit Profile">
          <span class="nav-profile-pill">
            <span class="nav-avatar">${user.avatar || '👤'}</span>
            <span class="nav-name">${user.name.split(' ')[0]}</span>
            <span class="nav-role-badge badge-${user.role}">${user.role}</span>
          </span>
        </a>
      `;
    }
    const primaryClass = l.primary ? 'nav-link-auth' : '';
    return `<a href="#" class="nav-link ${activeClass} ${primaryClass}" data-page="${l.page}">${l.label}</a>`;
  };

  navLinks.innerHTML = links.map(renderLink).join('');
  mobileLinks.innerHTML = links.map(renderLink).join('');
}

function _bindNavEvents() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-page]');
    const action = e.target.closest('[data-action]');
    const drawer = document.getElementById('mobile-drawer');

    if (link) {
      e.preventDefault();
      if (drawer) drawer.classList.add('hidden');
      navigate(link.dataset.page);
    }
    if (action && action.dataset.action === 'logout') {
      e.preventDefault();
      if (drawer) drawer.classList.add('hidden');
      Auth.logout();
      showToast('info', 'Signed out', 'You have been signed out.');
      navigate('landing');
    }
  });

  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('mobile-drawer');
  hamburger.addEventListener('click', () => {
    drawer.classList.toggle('hidden');
  });
}

// Handle hash-based navigation on load
function _initRouter() {
  _bindNavEvents();
  const hash = (window.location.hash || '').replace('#', '') || 'landing';
  const validPage = ROUTES[hash] ? hash : 'landing';
  _updateNav(validPage);
  _routeTo(validPage, {});
}
