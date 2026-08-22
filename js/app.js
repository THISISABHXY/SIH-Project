/* =========================================================
   CampusFix — App Entry Point
   Initializes and renders all pages.
   ========================================================= */

window.addEventListener('DOMContentLoaded', () => {
  initTheme();   // apply saved theme + bind toggle button
  _initRouter(); // then render the page
});


/* ═══════════════════════════════════════════════════════════
   PAGE 1 — LANDING
   ═══════════════════════════════════════════════════════════ */
function renderLanding(root) {
  const reports = DB.get('reports') || [];
  const resolved = reports.filter(r => r.status === 'resolved').length;
  const proposals = DB.get('proposals') || [];

  root.innerHTML = `
<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="container">
    <div class="hero-grid">
      <div class="hero-content">
        <div class="hero-eyebrow">🏫 Greenfield University Platform</div>
        <h1 class="hero-title">Fix Campus Issues.<br><span class="highlight">Together.</span></h1>
        <p class="hero-subtitle">Report facility problems via text, voice, or photo. We deduplicate, route, and track every case to resolution — publicly and transparently.</p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg" data-page="submit">📋 Report an Issue</button>
          <button class="btn btn-ghost btn-lg" data-page="feed">🗺️ View Public Feed</button>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat-value">${reports.length}</span>
            <span class="hero-stat-label">Reports Filed</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">${resolved}</span>
            <span class="hero-stat-label">Resolved</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">${proposals.length}</span>
            <span class="hero-stat-label">Proposals Active</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">94%</span>
            <span class="hero-stat-label">Satisfaction</span>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-card-stack">
          <div class="hero-card-mini hero-card-mini-1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span>🤖</span>
              <span style="font-size:11px;font-weight:700;color:var(--color-primary-light)">AI ROUTER</span>
            </div>
            <div style="font-size:12px;color:var(--text-secondary);">Category detected: <strong style="color:var(--text-primary)">IT / Network</strong></div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:3px;">Routing → <strong style="color:var(--color-success)">IT Department</strong></div>
            <div style="margin-top:6px;"><span class="confidence-chip confidence-high" style="font-size:10px;">92% confident</span></div>
          </div>
          <div class="hero-card-main">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:1.4rem;">📡</span>
              <div>
                <div class="hero-report-title">WiFi outage — Library Block</div>
                <div class="hero-report-meta">📍 Library, 2nd Floor • <span class="badge badge-inprogress">In Progress</span></div>
              </div>
            </div>
            <div class="hero-progress mt-4">
              <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:6px;">
                <span>Resolution progress</span><span>75%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:75%"></div></div>
            </div>
            <div class="hero-status-row mt-4">
              <span style="font-size:12px;color:var(--text-muted);">🔗 3 reports clustered</span>
              <span style="font-size:12px;color:var(--color-success);">⏱ 8h remaining SLA</span>
            </div>
            <div style="display:flex;gap:8px;margin-top:12px;">
              <div style="flex:1;background:var(--bg-elevated);border-radius:8px;padding:8px;text-align:center;">
                <div style="font-size:10px;color:var(--text-muted);">REPORTED</div>
                <div style="font-size:11px;font-weight:700;color:var(--status-reported);margin-top:2px;">✓</div>
              </div>
              <div style="flex:1;background:var(--bg-elevated);border-radius:8px;padding:8px;text-align:center;">
                <div style="font-size:10px;color:var(--text-muted);">ACK'D</div>
                <div style="font-size:11px;font-weight:700;color:var(--status-acknowledged);margin-top:2px;">✓</div>
              </div>
              <div style="flex:1;background:var(--color-primary);border-radius:8px;padding:8px;text-align:center;">
                <div style="font-size:10px;color:rgba(255,255,255,.7);">IN PROGRESS</div>
                <div style="font-size:11px;font-weight:700;color:white;margin-top:2px;">●</div>
              </div>
              <div style="flex:1;background:var(--bg-elevated);border-radius:8px;padding:8px;text-align:center;opacity:.4;">
                <div style="font-size:10px;color:var(--text-muted);">RESOLVED</div>
                <div style="font-size:11px;font-weight:700;color:var(--text-muted);margin-top:2px;">○</div>
              </div>
            </div>
          </div>
          <div class="hero-card-mini hero-card-mini-2">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span>🔒</span>
              <span style="font-size:11px;font-weight:700;color:var(--color-accent)">IDENTITY PROTECTED</span>
            </div>
            <div style="font-size:12px;color:var(--text-secondary);">Reporter shown as <strong style="color:var(--text-primary)">Anonymous #a3f2</strong></div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:3px;">Public feed never reveals identity</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section class="features-section">
  <div class="container">
    <div class="text-center">
      <div class="section-tag">Platform Features</div>
      <h2 class="section-title">Everything campus governance needs</h2>
      <p class="section-sub" style="margin:auto">From a broken AC to a semester-long improvement budget — one transparent system.</p>
    </div>
    <div class="features-grid">
      ${[
        ['📸', 'Multi-channel Intake', 'Submit issues via text, photo, or voice note. Auto language detection normalizes Hindi, English, and regional language reports.'],
        ['🤖', 'AI-powered Routing', 'Keyword + semantic classifier routes reports to the right department with a confidence score. Low confidence → admin review.'],
        ['🔗', 'Smart Deduplication', 'Geo-proximity + text similarity detects duplicate reports and clusters them — so one WiFi outage stays one ticket.'],
        ['📍', 'Public Tracking Map', 'Live map and feed of all open issues. Resolver attaches before/after photos at closure. Reporter identity always withheld.'],
        ['💰', 'Participatory Budgeting', 'Recurring issue patterns auto-surface as improvement proposals. Students vote to prioritize within a transparent budget envelope.'],
        ['📋', 'Immutable Audit Log', 'Every status change, routing decision, and budget action writes a timestamped, actor-linked log entry. Nothing is hidden.'],
      ].map(([icon, title, desc]) => `
        <div class="feature-card">
          <div class="feature-icon">${icon}</div>
          <h3>${title}</h3>
          <p>${desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="how-section">
  <div class="container">
    <div class="text-center">
      <div class="section-tag">How It Works</div>
      <h2 class="section-title">From report to resolution</h2>
    </div>
    <div class="steps-row">
      ${[
        ['1', 'File a Report', 'Snap a photo, type a description, or record a voice note. Toggle anonymity for sensitive issues.'],
        ['2', 'Auto-routed', 'AI classifies the issue and routes it to the responsible department. Duplicates are merged automatically.'],
        ['3', 'Track Progress', 'Watch the status update in real-time on the public feed. SLA timers keep departments accountable.'],
        ['4', 'See Evidence', 'Resolvers attach before/after photos when closing. Proof is public — accountability built in.'],
        ['5', 'Vote for Improvements', 'Recurring issues become campus improvement proposals. Community votes shape how the budget is spent.'],
      ].map(([n, t, d]) => `
        <div class="step-item">
          <div class="step-num">${n}</div>
          <h4>${t}</h4>
          <p>${d}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- ROLES -->
<section class="roles-section">
  <div class="container">
    <div class="text-center">
      <div class="section-tag">User Roles</div>
      <h2 class="section-title">Built for the whole campus</h2>
    </div>
    <div class="roles-grid">
      ${[
        ['🧑‍🎓', 'Reporter', 'Student, faculty, or staff who files issues and tracks their status.', 'hsla(245,80%,60%,.15)'],
        ['🔧', 'Resolver', 'Department staff who action cases, update status, and attach evidence.', 'hsla(142,70%,45%,.15)'],
        ['🛡️', 'Admin', 'Routes ambiguous cases, manages SLA escalations, and oversees the budget cycle.', 'hsla(38,95%,58%,.15)'],
        ['👁️', 'Public Viewer', 'Anyone can browse the transparency feed and map — no login required.', 'hsla(220,15%,55%,.15)'],
      ].map(([icon, name, desc, bg]) => `
        <div class="role-card">
          <div class="role-avatar" style="background:${bg}">${icon}</div>
          <h4>${name}</h4>
          <p>${desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="container">
    <div class="cta-box">
      <div class="section-tag" style="margin:0 auto var(--space-5)">Get Started</div>
      <h2 class="section-title">Ready to fix campus together?</h2>
      <p style="color:var(--text-secondary);margin:var(--space-5) auto var(--space-8);max-width:480px;">Sign in with your @greenfield.edu email to report your first issue in under 60 seconds.</p>
      <div style="display:flex;gap:var(--space-4);justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-primary btn-lg" data-page="auth">Get Started — It's Free</button>
        <button class="btn btn-ghost btn-lg" data-page="feed">Browse Public Feed</button>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <p>🏫 CampusFix — Greenfield University | Built with transparency in mind | <span style="color:var(--color-primary-light)">report.greenfield.edu</span></p>
  </div>
</footer>
  `;
}

/* ═══════════════════════════════════════════════════════════
   PAGE 2 — MULTI-PORTAL AUTHENTICATION (STUDENT, SOLVER, ADMIN)
   ═══════════════════════════════════════════════════════════ */
function renderAuth(root, { redirect } = {}) {
  let activePortal = 'student'; // 'student' | 'solver' | 'admin'
  let studentMode = 'login';   // 'login' | 'register'
  let authStep = 'input';      // 'input' | 'otp'

  // Dynamic session state
  let authSession = {
    targetUser: null,
    pendingStudentData: null,
    generatedOtp: '',
    identifier: '',
    portal: 'student',
    expiresAt: 0,
    timerInterval: null
  };

  function generateRandomOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  function doLoginUser(targetUser) {
    if (authSession.timerInterval) clearInterval(authSession.timerInterval);
    Auth.login(targetUser);
    auditLog('USER_LOGIN', targetUser.id, 'User', targetUser.id, {
      email: targetUser.email,
      role: targetUser.role,
      portal: activePortal
    });
    
    showToast('success', `Welcome, ${targetUser.name.split(' ')[0]}! 👋`, `Signed in as ${targetUser.role.toUpperCase()}`);
    
    if (redirect) {
      navigate(redirect);
      return;
    }
    if (targetUser.role === 'admin') navigate('admin');
    else if (targetUser.role === 'resolver') navigate('dept');
    else navigate('profile');
  }

  function render() {
    const isStudent = activePortal === 'student';
    const isSolver  = activePortal === 'solver';
    const isAdmin   = activePortal === 'admin';

    root.innerHTML = `
<div class="auth-page auth-portal-${activePortal}">
  <div class="auth-box ${activePortal === 'student' && studentMode === 'register' ? 'auth-box-wide' : ''}">
    
    <!-- Portal Header & Tabs -->
    <div class="auth-portal-header">
      <div class="auth-logo">
        ${isStudent ? '🎓' : isSolver ? '🔧' : '🛡️'}
      </div>
      <h1 class="auth-title">
        ${isStudent ? 'Student & Reporter Portal' : isSolver ? 'Department Solver Access' : 'Executive Administration'}
      </h1>
      <p class="auth-sub">
        ${isStudent 
          ? 'Sign in or register your full student profile with your college email' 
          : isSolver 
            ? 'Authorized solvers must authenticate via their assigned Unique Solver ID' 
            : 'Restricted Level-3 Dean & Administrator clearance portal'}
      </p>

      <!-- 3-Way Portal Selector -->
      <div class="portal-nav-tabs">
        <button class="portal-tab ${isStudent ? 'active' : ''}" data-set-portal="student">
          <span>🎓</span> <span>Student</span>
        </button>
        <button class="portal-tab ${isSolver ? 'active' : ''}" data-set-portal="solver">
          <span>🔧</span> <span>Solver ID</span>
        </button>
        <button class="portal-tab ${isAdmin ? 'active' : ''}" data-set-portal="admin">
          <span>🛡️</span> <span>Admin</span>
        </button>
      </div>
    </div>

    ${authStep === 'input' ? `
      <!-- ══════════ PORTAL 1: STUDENT ══════════ -->
      ${isStudent ? `
        <div class="student-mode-toggle">
          <button class="student-mode-btn ${studentMode === 'login' ? 'active' : ''}" data-student-mode="login">
            Student Sign In
          </button>
          <button class="student-mode-btn ${studentMode === 'register' ? 'active' : ''}" data-student-mode="register">
            New Student Registration (Full Details)
          </button>
        </div>

        ${studentMode === 'login' ? `
          <!-- Student Login Form -->
          <form id="form-student-login" class="auth-form">
            <div class="form-group">
              <label class="form-label" for="stud-login-email">College Email Address</label>
              <input class="form-input" type="email" id="stud-login-email" placeholder="e.g. arjun.k@greenfield.edu" required autocomplete="email"/>
            </div>
            <div class="auth-hint-box">
              <span>🔐</span>
              <span>Accepts registered <strong>@greenfield.edu</strong> student accounts. A random 6-digit OTP will be generated.</span>
            </div>
            <button type="submit" class="btn btn-primary w-full mt-4" style="height:48px;">
              Generate Random OTP & Sign In →
            </button>
          </form>
        ` : `
          <!-- Student Full Details Registration Form -->
          <form id="form-student-register" class="auth-form student-reg-grid">
            <div class="reg-col-2">
              <div class="form-group">
                <label class="form-label" for="reg-name">Full Name *</label>
                <input class="form-input" type="text" id="reg-name" placeholder="e.g. Ananya Sharma" required/>
              </div>
              <div class="form-group">
                <label class="form-label" for="reg-email">College Email Address *</label>
                <input class="form-input" type="email" id="reg-email" placeholder="ananya.s@greenfield.edu" required/>
              </div>
            </div>

            <div class="reg-col-2">
              <div class="form-group">
                <label class="form-label" for="reg-roll">Student Roll / ID No. *</label>
                <input class="form-input" type="text" id="reg-roll" placeholder="GU-2024-CS-0412" required/>
              </div>
              <div class="form-group">
                <label class="form-label" for="reg-phone">Phone Number *</label>
                <input class="form-input" type="tel" id="reg-phone" placeholder="+91 98765 12345" required/>
              </div>
            </div>

            <div class="reg-col-2">
              <div class="form-group">
                <label class="form-label" for="reg-branch">Department / Academic Branch *</label>
                <select class="form-input" id="reg-branch" required>
                  <option value="">Select Branch...</option>
                  <option value="B.Tech Computer Science & Eng.">B.Tech Computer Science & Eng.</option>
                  <option value="B.Tech Electronics & Comm.">B.Tech Electronics & Comm.</option>
                  <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                  <option value="B.Tech Civil Engineering">B.Tech Civil Engineering</option>
                  <option value="M.Tech Biotechnology">M.Tech Biotechnology</option>
                  <option value="B.Des Design & Media">B.Des Design & Media</option>
                  <option value="MBA / School of Management">MBA / School of Management</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="reg-year">Current Academic Year *</label>
                <select class="form-input" id="reg-year" required>
                  <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                  <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                  <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                  <option value="4th Year (Senior)">4th Year (Senior)</option>
                  <option value="Postgraduate / Research Scholar">Postgraduate / Research Scholar</option>
                </select>
              </div>
            </div>

            <div class="reg-col-2">
              <div class="form-group">
                <label class="form-label" for="reg-hostel">Campus Residence / Hostel *</label>
                <select class="form-input" id="reg-hostel" required>
                  <option value="Hostel A (Boys)">Hostel A (Boys)</option>
                  <option value="Hostel B (Girls)">Hostel B (Girls)</option>
                  <option value="Hostel C (Boys Senior)">Hostel C (Boys Senior)</option>
                  <option value="PG & Research Block D">PG & Research Block D</option>
                  <option value="Day Scholar / Off-Campus">Day Scholar / Off-Campus</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="reg-room">Room / Block Info</label>
                <input class="form-input" type="text" id="reg-room" placeholder="e.g. Room 314, Block 2"/>
              </div>
            </div>

            <!-- Avatar Selection -->
            <div class="form-group">
              <label class="form-label">Choose Student Avatar</label>
              <div class="avatar-selection-row" id="reg-avatar-choices">
                ${['🧑‍💻', '👩‍🎓', '🧑‍🎓', '👩‍💻', '📚', '🎒', '⚡', '🔬'].map((emoji, i) => `
                  <button type="button" class="avatar-opt-btn ${i === 0 ? 'selected' : ''}" data-avatar-emoji="${emoji}">${emoji}</button>
                `).join('')}
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="reg-bio">Student Bio / Interests</label>
              <input class="form-input" type="text" id="reg-bio" placeholder="e.g. Interested in campus sustainability and sports facilities"/>
            </div>

            <button type="submit" class="btn btn-primary w-full mt-2" style="height:48px;">
              Register Profile & Generate Verification OTP →
            </button>
          </form>
        `}
      ` : ''}

      <!-- ══════════ PORTAL 2: SOLVER (UNIQUE ID) ══════════ -->
      ${isSolver ? `
        <form id="form-solver-login" class="auth-form">
          <div class="form-group">
            <label class="form-label" for="solver-unique-id">Unique Solver ID or Solver Email *</label>
            <input class="form-input" type="text" id="solver-unique-id" placeholder="e.g. FAC-8821, IT-4402, SEC-9104, SAN-3319" required autofocus/>
          </div>

          <div class="auth-hint-box" style="background:hsla(142,70%,45%,.08);border-color:hsla(142,70%,45%,.25);">
            <span>🔧</span>
            <div style="font-size:12px;color:var(--text-secondary);line-height:1.4;">
              <strong>Authorized Solver Credential Required:</strong><br/>
              Enter your assigned staff unique ID (e.g. <code>FAC-8821</code> for Facilities, <code>IT-4402</code> for IT, <code>SEC-9104</code> for Security, <code>SAN-3319</code> for Housekeeping).
            </div>
          </div>

          <div class="solver-id-badges-rack">
            <span class="id-badge-chip" data-fill-solver="FAC-8821">FAC-8821 (Facilities)</span>
            <span class="id-badge-chip" data-fill-solver="IT-4402">IT-4402 (IT Team)</span>
            <span class="id-badge-chip" data-fill-solver="SEC-9104">SEC-9104 (Security)</span>
            <span class="id-badge-chip" data-fill-solver="SAN-3319">SAN-3319 (Sanitation)</span>
          </div>

          <button type="submit" class="btn btn-success w-full mt-4" style="height:48px;">
            Verify Solver ID & Generate Random OTP →
          </button>
        </form>
      ` : ''}

      <!-- ══════════ PORTAL 3: ADMIN (UNIQUE ID) ══════════ -->
      ${isAdmin ? `
        <form id="form-admin-login" class="auth-form">
          <div class="form-group">
            <label class="form-label" for="admin-unique-id">Unique Admin Security ID or Executive Email *</label>
            <input class="form-input" type="text" id="admin-unique-id" placeholder="e.g. ADM-9901 or admin@greenfield.edu" required autofocus/>
          </div>

          <div class="auth-hint-box" style="background:hsla(38,95%,58%,.08);border-color:hsla(38,95%,58%,.25);">
            <span>🛡️</span>
            <div style="font-size:12px;color:var(--text-secondary);line-height:1.4;">
              <strong>Executive Level-3 Clearance Required:</strong><br/>
              Only authorized University Administrators and Deans with unique credential <code>ADM-9901</code> can enter this portal.
            </div>
          </div>

          <div class="solver-id-badges-rack">
            <span class="id-badge-chip" data-fill-admin="ADM-9901" style="border-color:var(--color-accent);color:var(--color-accent);">ADM-9901 (Dean Meera Nair)</span>
          </div>

          <button type="submit" class="btn btn-primary w-full mt-4" style="height:48px;background:linear-gradient(135deg,hsl(38,95%,50%),hsl(25,90%,45%));">
            Verify Clearance & Generate Random OTP →
          </button>
        </form>
      ` : ''}
    ` : `
      <!-- ══════════ STEP 2: RANDOM OTP VERIFICATION ══════════ -->
      <div class="auth-otp-screen">
        <div class="otp-security-banner">
          <div class="otp-banner-icon">🎲</div>
          <div class="otp-banner-content">
            <div class="otp-banner-title">Random Security OTP Generated!</div>
            <div class="otp-banner-target">Dispatched for: <strong>${authSession.identifier}</strong></div>
            <div class="otp-generated-display">
              <span class="otp-number-display">${authSession.generatedOtp}</span>
              <button type="button" class="btn btn-sm btn-ghost" id="btn-copy-fill-otp" title="1-Click Fill OTP">
                📋 Auto-Fill OTP
              </button>
            </div>
          </div>
        </div>

        <p class="otp-instruction-text">
          Enter the 6-digit randomly generated security verification code below:
        </p>

        <div class="otp-inputs" id="otp-inputs">
          ${Array(6).fill(0).map((_,i) => `<input class="otp-input" maxlength="1" type="number" id="otp-${i}" autocomplete="off" inputmode="numeric"/>`).join('')}
        </div>

        <div class="otp-timer-row">
          <span id="otp-countdown-text">⏳ Code valid for: <strong id="otp-timer-val">60s</strong></span>
          <button type="button" class="btn-link" id="btn-resend-otp" style="font-size:12px;cursor:pointer;background:none;border:none;color:var(--color-primary-light);">
            🔄 Generate New Random OTP
          </button>
        </div>

        <button type="button" class="btn btn-primary w-full mt-4" id="btn-verify-otp" style="height:48px;">
          Confirm & Enter Dashboard →
        </button>

        <button type="button" class="btn btn-ghost w-full mt-2" id="btn-back-to-input" style="font-size:13px;">
          ← Back to Credentials
        </button>
      </div>
    `}

  </div>
</div>
    `;

    bindEvents();
  }

  function startOtpCountdown() {
    if (authSession.timerInterval) clearInterval(authSession.timerInterval);
    let secondsLeft = 60;
    authSession.expiresAt = Date.now() + 60000;
    
    authSession.timerInterval = setInterval(() => {
      secondsLeft--;
      const timerEl = document.getElementById('otp-timer-val');
      if (timerEl) {
        timerEl.textContent = `${secondsLeft}s`;
      }
      if (secondsLeft <= 0) {
        clearInterval(authSession.timerInterval);
        if (timerEl) timerEl.textContent = 'Expired';
      }
    }, 1000);
  }

  function triggerOtpStep(identifier, targetUser, pendingData = null) {
    const randomOtp = generateRandomOtp();
    authSession.generatedOtp = randomOtp;
    authSession.identifier = identifier;
    authSession.targetUser = targetUser;
    authSession.pendingStudentData = pendingData;
    authSession.portal = activePortal;
    authStep = 'otp';

    showToast('success', '🔐 Random OTP Dispatched!', `Generated Code: ${randomOtp} (Valid for 60s)`);
    render();
    startOtpCountdown();

    setTimeout(() => {
      document.getElementById('otp-0')?.focus();
    }, 100);
  }

  function bindEvents() {
    // Portal Switcher Tabs
    root.querySelectorAll('[data-set-portal]').forEach(btn => {
      btn.addEventListener('click', () => {
        activePortal = btn.dataset.setPortal;
        authStep = 'input';
        render();
      });
    });

    // Student Mode Switcher
    root.querySelectorAll('[data-student-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        studentMode = btn.dataset.studentMode;
        render();
      });
    });

    // Solver ID chip fill helper
    root.querySelectorAll('[data-fill-solver]').forEach(chip => {
      chip.addEventListener('click', () => {
        const inp = document.getElementById('solver-unique-id');
        if (inp) inp.value = chip.dataset.fillSolver;
      });
    });

    // Admin ID chip fill helper
    root.querySelectorAll('[data-fill-admin]').forEach(chip => {
      chip.addEventListener('click', () => {
        const inp = document.getElementById('admin-unique-id');
        if (inp) inp.value = chip.dataset.fillAdmin;
      });
    });

    // Avatar picker in registration
    let chosenEmoji = '🧑‍💻';
    root.querySelectorAll('.avatar-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        root.querySelectorAll('.avatar-opt-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        chosenEmoji = btn.dataset.avatarEmoji;
      });
    });

    // Student Sign In Form Submit
    document.getElementById('form-student-login')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('stud-login-email').value.trim().toLowerCase();
      if (!email.endsWith('@greenfield.edu')) {
        showToast('error', 'Invalid Domain', 'Please use your institutional @greenfield.edu address.');
        return;
      }

      const users = DB.get('users') || [];
      const user = users.find(u => u.email.toLowerCase() === email && u.role === 'reporter');

      if (!user) {
        showToast('warning', 'Student Account Not Found', 'No student found with this email. Please click "New Student Registration".');
        return;
      }

      triggerOtpStep(user.email, user);
    });

    // Student Registration Form Submit
    document.getElementById('form-student-register')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim().toLowerCase();
      const roll = document.getElementById('reg-roll').value.trim().toUpperCase();
      const phone = document.getElementById('reg-phone').value.trim();
      const branch = document.getElementById('reg-branch').value;
      const year = document.getElementById('reg-year').value;
      const hostel = document.getElementById('reg-hostel').value;
      const room = document.getElementById('reg-room').value.trim();
      const bio = document.getElementById('reg-bio').value.trim();

      if (!email.endsWith('@greenfield.edu')) {
        showToast('error', 'Invalid Domain', 'Email must end with @greenfield.edu');
        return;
      }

      const users = DB.get('users') || [];
      const existing = users.find(u => u.email.toLowerCase() === email);
      if (existing) {
        showToast('warning', 'Email Registered', 'This email is already registered. Please use Student Sign In.');
        return;
      }

      const fullLocation = room ? `${hostel} — ${room}` : hostel;
      const designation = `${branch} (${year})`;

      const pendingData = {
        name,
        email,
        id_number: roll,
        phone,
        designation,
        location: fullLocation,
        bio: bio || `Student of ${branch} at Greenfield University.`,
        avatar: chosenEmoji,
        role: 'reporter',
        joined_date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        reputation_points: 100,
        badges: ['first_responder'],
        preferences: { notify_email: true, notify_sms: true, default_anon: false, lang: 'en', auto_cluster_alerts: true }
      };

      triggerOtpStep(email, null, pendingData);
    });

    // Solver Login Form Submit
    document.getElementById('form-solver-login')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawInput = document.getElementById('solver-unique-id').value.trim();
      const cleanInput = rawInput.toLowerCase();

      const users = DB.get('users') || [];
      const solverUser = users.find(u => 
        u.role === 'resolver' && (
          (u.unique_id && u.unique_id.toLowerCase() === cleanInput) ||
          u.email.toLowerCase() === cleanInput ||
          (u.id_number && u.id_number.toLowerCase() === cleanInput)
        )
      );

      if (!solverUser) {
        showToast('error', 'Invalid Solver ID', 'No solver account found matching this Unique ID or staff email.');
        return;
      }

      triggerOtpStep(solverUser.unique_id ? `${solverUser.name} (${solverUser.unique_id})` : solverUser.email, solverUser);
    });

    // Admin Login Form Submit
    document.getElementById('form-admin-login')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawInput = document.getElementById('admin-unique-id').value.trim();
      const cleanInput = rawInput.toLowerCase();

      const users = DB.get('users') || [];
      const adminUser = users.find(u => 
        u.role === 'admin' && (
          (u.unique_id && u.unique_id.toLowerCase() === cleanInput) ||
          u.email.toLowerCase() === cleanInput ||
          (u.id_number && u.id_number.toLowerCase() === cleanInput)
        )
      );

      if (!adminUser) {
        showToast('error', 'Clearance Denied', 'Invalid Administrator Unique ID or executive credential.');
        return;
      }

      triggerOtpStep(`${adminUser.name} (${adminUser.unique_id || 'ADMIN'})`, adminUser);
    });

    // OTP auto-focus and backspace
    const otpInputs = root.querySelectorAll('.otp-input');
    otpInputs.forEach((inp, idx) => {
      inp.addEventListener('input', () => {
        if (inp.value && otpInputs[idx + 1]) otpInputs[idx + 1].focus();
      });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !inp.value && otpInputs[idx - 1]) otpInputs[idx - 1].focus();
      });
    });

    // Auto-fill OTP button
    document.getElementById('btn-copy-fill-otp')?.addEventListener('click', () => {
      const code = authSession.generatedOtp;
      if (code && code.length === 6) {
        code.split('').forEach((digit, i) => {
          const inp = document.getElementById(`otp-${i}`);
          if (inp) inp.value = digit;
        });
        showToast('info', 'OTP Auto-filled ✓', 'Random code entered into verification fields.');
      }
    });

    // Resend new random OTP
    document.getElementById('btn-resend-otp')?.addEventListener('click', () => {
      const newOtp = generateRandomOtp();
      authSession.generatedOtp = newOtp;
      const displayEl = root.querySelector('.otp-number-display');
      if (displayEl) displayEl.textContent = newOtp;
      showToast('success', '🎲 New Random OTP Generated!', `New Code: ${newOtp}`);
      startOtpCountdown();
    });

    // Back to input
    document.getElementById('btn-back-to-input')?.addEventListener('click', () => {
      if (authSession.timerInterval) clearInterval(authSession.timerInterval);
      authStep = 'input';
      render();
    });

    // Confirm & Verify OTP
    document.getElementById('btn-verify-otp')?.addEventListener('click', () => {
      const enteredOtp = [0,1,2,3,4,5].map(i => document.getElementById(`otp-${i}`)?.value || '').join('');
      
      if (enteredOtp.length < 6) {
        showToast('error', 'Incomplete Code', 'Please enter all 6 digits of the OTP.');
        return;
      }

      if (enteredOtp !== authSession.generatedOtp) {
        showToast('error', 'Invalid OTP', 'The verification code you entered is incorrect. Please check the generated code.');
        return;
      }

      // Check if this was a new student registration
      if (authSession.pendingStudentData) {
        const newStudent = {
          ...authSession.pendingStudentData,
          id: 'u_' + Date.now()
        };
        DB.push('users', newStudent);
        showToast('success', 'Registration Successful! 🎉', 'Your complete student profile has been created.');
        doLoginUser(newStudent);
      } else if (authSession.targetUser) {
        doLoginUser(authSession.targetUser);
      }
    });
  }

  render();
}

/* ═══════════════════════════════════════════════════════════
   PAGE 3 — SUBMIT REPORT
   ═══════════════════════════════════════════════════════════ */
function renderSubmit(root) {
  const user = Auth.current();
  let wizardStep = 1;
  let formData = {
    category: '', title: '', description: '', location: null,
    anonymous: false, mediaNames: [], language: 'en',
  };
  let locationMap = null;
  let locationMarker = null;
  let duplicates = [];

  const CATEGORIES = [
    { id: 'electrical', icon: '⚡', label: 'Electrical' },
    { id: 'plumbing',   icon: '🔧', label: 'Plumbing' },
    { id: 'it',         icon: '💻', label: 'IT / Network' },
    { id: 'safety',     icon: '🔒', label: 'Safety' },
    { id: 'cleanliness',icon: '🧹', label: 'Cleanliness' },
    { id: 'furniture',  icon: '🪑', label: 'Furniture' },
  ];

  const BUILDINGS = typeof ITER_CAMPUS_LOCATIONS !== 'undefined' 
    ? ITER_CAMPUS_LOCATIONS.map(l => l.name)
    : [
        'ITER Central Library',
        'Library Parking area',
        'Institute of Technical Education & Research',
        'SOA University Examination Cell',
        'Bank of India ATM',
        'F-Block Road',
        'ECO GYM, ITER',
        "Food Court, ITER, SIKSHA 'O' Anusandhan",
        "'F' Block",
        'SOA University - Physics Department',
        'E Block Lawn',
        "ITER, Boy's Hostel 6 (BH-6)",
        'ITER GIRLS HOSTEL GATE',
        'ITER BH-05',
        'BH-10',
        'Lh 1 Girls Hostel (ITER Campus)',
        'SOA Auditorium',
        "Office of Dean - Siksha 'O' Anusandhan University",
        'Administration Block Road',
        'Indoor Basketball Court 🏀',
        'Sports Complex',
        "'E' Block",
        'Centre for Data Science',
        'ITER, SOA Campus Center'
      ];

  function renderWizard() {
    root.innerHTML = `
<div class="submit-page">
  <div class="submit-page-header">
    <h1>📋 Report an Issue</h1>
    <p style="color:var(--text-secondary);margin-top:8px;font-size:14px;">Help us fix it fast — takes under 2 minutes</p>
  </div>
  <!-- Progress dots -->
  <div class="step-dots">
    <div class="step-dot ${wizardStep > 1 ? 'done' : wizardStep === 1 ? 'active' : ''}" id="wd1">1</div>
    <div class="step-line ${wizardStep > 1 ? 'done' : ''}"></div>
    <div class="step-dot ${wizardStep > 2 ? 'done' : wizardStep === 2 ? 'active' : ''}" id="wd2">2</div>
    <div class="step-line ${wizardStep > 2 ? 'done' : ''}"></div>
    <div class="step-dot ${wizardStep === 3 ? 'active' : ''}" id="wd3">3</div>
  </div>

  ${wizardStep === 1 ? renderStep1() : wizardStep === 2 ? renderStep2() : renderStep3()}
</div>
    `;
    bindWizardEvents();
  }

  function renderStep1() {
    return `
<div id="wizard-step-1">
  <h2 style="font-family:var(--font-display);font-weight:700;margin-bottom:var(--space-6);">Step 1: Describe the Issue</h2>
  <div class="form-group mb-4">
    <label class="form-label">Category</label>
    <div class="category-grid">
      ${CATEGORIES.map(c => `
        <div class="cat-option ${formData.category === c.id ? 'selected' : ''}" data-cat="${c.id}">
          <span class="cat-option-icon">${c.icon}</span>
          <div class="cat-option-name">${c.label}</div>
        </div>
      `).join('')}
    </div>
  </div>
  <div class="form-group mb-4">
    <label class="form-label" for="rep-title">Issue Title</label>
    <input class="form-input" id="rep-title" placeholder="e.g. Leaking pipe in Boys Washroom" value="${formData.title}" />
  </div>
  <div class="form-group mb-4">
    <label class="form-label" for="rep-desc">Description</label>
    <div style="position:relative;">
      <textarea class="form-textarea" id="rep-desc" placeholder="Describe the issue in detail — what, where, since when, how severe...">${formData.description}</textarea>
      <div id="lang-badge" style="position:absolute;top:8px;right:8px;"></div>
    </div>
    <div id="cat-suggestion" style="margin-top:6px;"></div>
  </div>
  <div id="duplicate-warning-box"></div>
  <div style="display:flex;justify-content:flex-end;margin-top:var(--space-6);">
    <button class="btn btn-primary" id="step1-next" ${formData.category && formData.title ? '' : 'disabled'}>Next: Location →</button>
  </div>
</div>
    `;
  }

  function renderStep2() {
    return `
<div id="wizard-step-2">
  <h2 style="font-family:var(--font-display);font-weight:700;margin-bottom:var(--space-6);">Step 2: Where is the issue?</h2>
  <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;">📍 Click the map or select from official ITER, SOA building references below.</p>
  
  <!-- Campus Reference Quick Filter Pills -->
  <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;margin-bottom:10px;" class="hide-scrollbar">
    <button type="button" class="btn btn-xs btn-ghost campus-ref-filter active" data-ref-tag="all">All References</button>
    <button type="button" class="btn btn-xs btn-ghost campus-ref-filter" data-ref-tag="Academic">📚 Academic</button>
    <button type="button" class="btn btn-xs btn-ghost campus-ref-filter" data-ref-tag="Hostel">🛏️ Hostels</button>
    <button type="button" class="btn btn-xs btn-ghost campus-ref-filter" data-ref-tag="Admin">🛡️ Admin</button>
    <button type="button" class="btn btn-xs btn-ghost campus-ref-filter" data-ref-tag="Dining">🍽️ Dining</button>
    <button type="button" class="btn btn-xs btn-ghost campus-ref-filter" data-ref-tag="Sports">🏀 Sports</button>
  </div>

  <div class="location-map" id="location-map-wrap"></div>
  ${formData.location ? `<p style="font-size:12px;color:var(--color-success);margin-top:6px;display:flex;justify-content:space-between;align-items:center;"><span>✓ Pinned: <strong>${formData.location.label}</strong></span> <a href="${getGoogleMapsUrl(formData.location.lat, formData.location.lng)}" target="_blank" style="color:var(--color-primary-light);font-size:11px;text-decoration:underline;">Open Google Maps ↗</a></p>` : ''}
  
  <div class="location-alt">
    <div class="location-alt-line"></div>
    <div class="location-alt-text">OR select official campus landmark</div>
    <div class="location-alt-line"></div>
  </div>
  <div class="form-group mb-4">
    <label class="form-label" for="rep-building">Building / Reference Location</label>
    <select class="form-select" id="rep-building">
      <option value="">— Select building / reference —</option>
      ${BUILDINGS.map(b => {
        const loc = typeof ITER_CAMPUS_LOCATIONS !== 'undefined' ? ITER_CAMPUS_LOCATIONS.find(l => l.name === b) : null;
        return `<option value="${b}" ${formData.location?.label?.startsWith(b) ? 'selected' : ''}>${loc?.icon || '📍'} ${b} ${loc?.ref ? `(${loc.ref})` : ''}</option>`;
      }).join('')}
    </select>
  </div>
  <div class="form-group mb-4">
    <label class="form-label" for="rep-room">Room / Floor / Landmark Note (optional)</label>
    <input class="form-input" id="rep-room" placeholder="e.g. Room 204, Ground Floor, Near Gate" value="${formData.location?.room || ''}" />
  </div>
  <div style="display:flex;justify-content:space-between;margin-top:var(--space-6);">
    <button class="btn btn-ghost" id="step2-back">← Back</button>
    <button class="btn btn-primary" id="step2-next" ${formData.location ? '' : 'disabled'}>Next: Media & Privacy →</button>
  </div>
</div>
    `;
  }

  function renderStep3() {
    return `
<div id="wizard-step-3">
  <h2 style="font-family:var(--font-display);font-weight:700;margin-bottom:var(--space-6);">Step 3: Media & Privacy</h2>
  <div class="form-group mb-6">
    <label class="form-label">Attach Photos (optional)</label>
    <div class="photo-upload-zone" id="photo-zone">
      <div style="font-size:2rem;margin-bottom:8px;">📷</div>
      <p>Click to upload photos, or drag and drop</p>
      <p style="font-size:11px;margin-top:4px;">JPG, PNG, WEBP up to 10MB each</p>
      <input type="file" id="photo-input" accept="image/*" multiple style="display:none"/>
    </div>
    <div class="photo-preview-grid" id="photo-previews"></div>
  </div>

  <div class="card mb-6" style="background:var(--bg-elevated)">
    <div class="toggle-row">
      <div>
        <div class="toggle-label">🔒 Submit Anonymously</div>
        <div class="toggle-desc">Your identity will be hidden from public view and all resolvers. Only used to prevent abuse.</div>
      </div>
      <label class="toggle">
        <input type="checkbox" id="anon-toggle" ${formData.anonymous ? 'checked' : ''}/>
        <div class="toggle-track"></div>
      </label>
    </div>
    <div id="anon-note" class="hidden" style="margin-top:12px;font-size:12px;color:var(--text-muted);background:hsla(0,80%,60%,.08);border:1px solid hsla(0,80%,60%,.2);border-radius:8px;padding:10px 12px;">
      ⚠️ Anonymous reports are still processed normally. Your email is stored encrypted and is only accessible to the Admin in cases of policy violations.
    </div>
  </div>

  <!-- Summary card -->
  <div class="card mb-6">
    <div class="form-label mb-2">📋 Summary</div>
    <div style="font-size:14px;display:flex;flex-direction:column;gap:6px;">
      <div>Category: ${catBadge(formData.category)}</div>
      <div style="color:var(--text-secondary);">Title: <strong style="color:var(--text-primary)">${formData.title}</strong></div>
      <div style="color:var(--text-secondary);">Location: <strong style="color:var(--text-primary)">${formData.location?.label || '—'}</strong></div>
      <div style="color:var(--text-secondary);">Language: <strong style="color:var(--text-primary)">${LANG_LABELS[formData.language] || 'English'}</strong></div>
    </div>
    <!-- Routing preview -->
    <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border-subtle);">
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">🤖 ROUTING PREVIEW</div>
      ${(() => {
        const r = routeReport(formData.category, 0.9);
        return `<div style="display:flex;align-items:center;gap:8px;font-size:13px;">
          <span>→</span>
          <strong>${r.dept_name}</strong>
          ${r.needs_review ? `<span class="badge badge-pending">Needs Admin Review</span>` : `<span class="badge badge-success">Auto-routed</span>`}
        </div>`;
      })()}
    </div>
  </div>

  <div style="display:flex;justify-content:space-between;margin-top:var(--space-6);">
    <button class="btn btn-ghost" id="step3-back">← Back</button>
    <button class="btn btn-primary btn-lg" id="submit-btn">🚀 Submit Report</button>
  </div>
</div>
    `;
  }

  function bindWizardEvents() {
    // ── STEP 1 ──
    if (wizardStep === 1) {
      root.querySelectorAll('[data-cat]').forEach(el => {
        el.addEventListener('click', () => {
          root.querySelectorAll('[data-cat]').forEach(x => x.classList.remove('selected'));
          el.classList.add('selected');
          formData.category = el.dataset.cat;
          checkStep1Valid();
          checkDuplicates();
        });
      });

      const titleInp = document.getElementById('rep-title');
      const descInp  = document.getElementById('rep-desc');

      titleInp.addEventListener('input', () => {
        formData.title = titleInp.value;
        checkStep1Valid();
        checkDuplicates();
        // Auto-suggest category from title
        if (!formData.category || true) {
          const res = classifyCategory(titleInp.value + ' ' + descInp.value);
          const box = document.getElementById('cat-suggestion');
          if (res.category !== 'other') {
            box.innerHTML = `<div style="font-size:12px;color:var(--text-muted);">🤖 AI suggests: ${catBadge(res.category)} ${confidenceChip(res.confidence)}</div>`;
            if (!formData.category) {
              formData.category = res.category;
              root.querySelectorAll('[data-cat]').forEach(x => {
                x.classList.toggle('selected', x.dataset.cat === res.category);
              });
            }
          } else { box.innerHTML = ''; }
        }
      });

      descInp.addEventListener('input', () => {
        formData.description = descInp.value;
        const lang = detectLanguage(descInp.value);
        formData.language = lang;
        const badge = document.getElementById('lang-badge');
        if (lang !== 'en') {
          badge.innerHTML = `<span class="badge badge-primary" style="font-size:10px">${LANG_LABELS[lang]} detected</span>`;
        } else { badge.innerHTML = ''; }
        checkDuplicates();
      });

      document.getElementById('step1-next').addEventListener('click', () => {
        if (!formData.category || !formData.title) return;
        wizardStep = 2;
        renderWizard();
        setTimeout(initLocationMap, 100);
      });

      function checkStep1Valid() {
        const btn = document.getElementById('step1-next');
        if (btn) btn.disabled = !(formData.category && formData.title.trim());
      }

      function checkDuplicates() {
        if (!formData.title.trim()) return;
        duplicates = findDuplicates({ ...formData, title: formData.title, description: formData.description, category: formData.category });
        const box = document.getElementById('duplicate-warning-box');
        if (!box) return;
        if (duplicates.length > 0) {
          const top = duplicates[0];
          box.innerHTML = `
            <div class="duplicate-warning">
              <div class="duplicate-warning-icon">⚠️</div>
              <div>
                <strong style="font-size:13px">Possible duplicate detected (${Math.round(top.score*100)}% match)</strong>
                <p style="font-size:12px;color:var(--text-secondary);margin-top:4px;">"${top.report.title}" — ${top.report.location?.label} (${timeAgo(top.report.created_at)})</p>
                <p style="font-size:11px;color:var(--text-muted);margin-top:4px;">You can still submit — the system will group similar reports automatically.</p>
              </div>
            </div>`;
        } else { box.innerHTML = ''; }
      }
    }

    // ── STEP 2 ──
    if (wizardStep === 2) {
      document.getElementById('step2-back').addEventListener('click', () => { wizardStep = 1; renderWizard(); });

      const bldSel = document.getElementById('rep-building');
      const roomInp = document.getElementById('rep-room');

      // Reference category filter pills
      root.querySelectorAll('.campus-ref-filter').forEach(btn => {
        btn.addEventListener('click', () => {
          root.querySelectorAll('.campus-ref-filter').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const tag = btn.dataset.refTag;
          const filtered = (typeof ITER_CAMPUS_LOCATIONS !== 'undefined' ? ITER_CAMPUS_LOCATIONS : [])
            .filter(l => tag === 'all' || l.tag === tag);
          bldSel.innerHTML = `<option value="">— Select building / reference —</option>` +
            filtered.map(l => `<option value="${l.name}">${l.icon || '📍'} ${l.name} ${l.ref ? `(${l.ref})` : ''}</option>`).join('');
        });
      });

      const updateLocationFromForm = () => {
        const b = bldSel.value, r = roomInp.value;
        if (b) {
          const loc = (typeof ITER_CAMPUS_LOCATIONS !== 'undefined' ? ITER_CAMPUS_LOCATIONS : []).find(l => l.name === b);
          const lat = loc ? loc.lat : 20.248470;
          const lng = loc ? loc.lng : 85.800315;
          formData.location = { label: b + (r ? ', ' + r : ''), lat, lng, room: r };
          document.getElementById('step2-next').disabled = false;
          if (locationMarker) locationMarker.remove();
          locationMarker = L.marker([lat, lng]).addTo(locationMap);
          locationMap.flyTo([lat, lng], 18);
        }
      };
      bldSel.addEventListener('change', updateLocationFromForm);
      roomInp.addEventListener('input', updateLocationFromForm);

      document.getElementById('step2-next').addEventListener('click', () => {
        if (!formData.location) return;
        wizardStep = 3;
        renderWizard();
      });
    }

    // ── STEP 3 ──
    if (wizardStep === 3) {
      document.getElementById('step3-back').addEventListener('click', () => { wizardStep = 2; renderWizard(); setTimeout(initLocationMap, 100); });

      const photoZone = document.getElementById('photo-zone');
      const photoInput = document.getElementById('photo-input');
      photoZone.addEventListener('click', () => photoInput.click());
      photoZone.addEventListener('dragover', (e) => { e.preventDefault(); photoZone.classList.add('dragover'); });
      photoZone.addEventListener('dragleave', () => photoZone.classList.remove('dragover'));
      photoZone.addEventListener('drop', (e) => { e.preventDefault(); photoZone.classList.remove('dragover'); handlePhotoFiles(e.dataTransfer.files); });
      photoInput.addEventListener('change', () => handlePhotoFiles(photoInput.files));

      document.getElementById('anon-toggle').addEventListener('change', (e) => {
        formData.anonymous = e.target.checked;
        const note = document.getElementById('anon-note');
        note.classList.toggle('hidden', !formData.anonymous);
      });

      document.getElementById('submit-btn').addEventListener('click', submitReport);
    }
  }

  function handlePhotoFiles(files) {
    const previews = document.getElementById('photo-previews');
    [...files].forEach(file => {
      if (!file.type.startsWith('image/')) return;
      formData.mediaNames.push(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const div = document.createElement('div');
        div.className = 'photo-preview-item';
        div.innerHTML = `<img src="${e.target.result}" alt="${file.name}"/><button class="photo-preview-remove" title="Remove">×</button>`;
        div.querySelector('.photo-preview-remove').addEventListener('click', () => div.remove());
        previews.appendChild(div);
      };
      reader.readAsDataURL(file);
    });
  }

  function initLocationMap() {
    const wrap = document.getElementById('location-map-wrap');
    if (!wrap) return;
    locationMap = L.map(wrap, { center: CAMPUS_CENTER, zoom: CAMPUS_ZOOM });
    darkTileLayer().addTo(locationMap);

    // Render interactive ITER Campus Landmark Pins
    if (typeof ITER_CAMPUS_LOCATIONS !== 'undefined') {
      ITER_CAMPUS_LOCATIONS.forEach(loc => {
        const landmarkIcon = L.divIcon({
          className: 'campus-landmark-pin',
          html: `<div style="background:var(--bg-card);border:1px solid var(--border-mid);border-radius:12px;padding:3px 8px;font-size:11px;font-weight:700;display:flex;align-items:center;gap:4px;box-shadow:var(--shadow-sm);white-space:nowrap;cursor:pointer;color:var(--text-primary);"><span style="font-size:12px;">${loc.icon}</span><span style="max-width:130px;overflow:hidden;text-overflow:ellipsis;">${loc.name}</span></div>`,
          iconSize: [140, 24],
          iconAnchor: [70, 12]
        });
        const lm = L.marker([loc.lat, loc.lng], { icon: landmarkIcon }).addTo(locationMap);
        lm.bindTooltip(`📍 ${loc.name} (${loc.ref || loc.tag})`, { direction: 'top', offset: [0, -10] });
        lm.on('click', () => {
          const bldSel = document.getElementById('rep-building');
          if (bldSel) {
            bldSel.value = loc.name;
            const r = document.getElementById('rep-room')?.value || '';
            formData.location = { label: loc.name + (r ? ', ' + r : ''), lat: loc.lat, lng: loc.lng, room: r };
            if (locationMarker) locationMarker.remove();
            locationMarker = L.marker([loc.lat, loc.lng]).addTo(locationMap);
            document.getElementById('step2-next').disabled = false;
            showToast('success', 'Building Selected!', loc.name);
          }
        });
      });
    }

    if (formData.location) {
      locationMarker = L.marker([formData.location.lat, formData.location.lng]).addTo(locationMap);
    }
    locationMap.on('click', (e) => {
      const { lat, lng } = e.latlng;
      formData.location = { label: `Pinned location (${lat.toFixed(5)}, ${lng.toFixed(5)})`, lat, lng };
      if (locationMarker) locationMarker.remove();
      locationMarker = L.marker([lat, lng]).addTo(locationMap);
      document.getElementById('step2-next').disabled = false;
      showToast('success', 'Location pinned!', `${formData.location.label}`);
    });
  }

  async function submitReport() {
    const user = Auth.current();
    if (!user) { navigate('auth'); return; }

    const confirmed = await showConfirm('📋', 'Submit Report?', `Your report "${formData.title}" will be filed and routed to the relevant department.`, 'Submit Report', false);
    if (!confirmed) return;

    const { category, confidence } = classifyCategory(formData.title + ' ' + formData.description);
    const finalCat = formData.category || category;
    const routing  = routeReport(finalCat, confidence);
    const id = 'r' + uid();
    const clusterId = null;

    // Find potential cluster
    const allDups = findDuplicates({ ...formData, category: finalCat });
    let assignedCluster = null;
    if (allDups.length > 0 && allDups[0].score > 0.55) {
      assignedCluster = allDups[0].report.cluster_id;
      if (assignedCluster) {
        const clusters = DB.get('clusters') || [];
        const c = clusters.find(x => x.id === assignedCluster);
        if (c) {
          c.report_ids.push(id);
          c.count = c.report_ids.length;
          DB.set('clusters', clusters);
        }
      }
    }

    const newReport = {
      id, cluster_id: assignedCluster, category: finalCat,
      title: formData.title, description: formData.description,
      location: formData.location, language: formData.language,
      anonymous: formData.anonymous, reporter_id: user.id,
      dept_id: routing.dept_id, status: 'reported',
      confidence, media: formData.mediaNames,
      created_at: Date.now(), updated_at: Date.now(), cluster_count: 1,
    };
    DB.push('reports', newReport);

    // Status update
    DB.push('statusUpdates', { id: 'su' + uid(), report_id: id, actor_id: user.id, from: null, to: 'reported', timestamp: Date.now(), note: 'Issue submitted via web portal.', evidence_url: null });

    // Auto-route or flag
    if (routing.needs_review) {
      DB.push('routingQueue', { id: 'rq' + uid(), report_id: id, confidence, suggested_dept: routing.dept_id, suggested_label: routing.dept_name, alt_dept: null, alt_label: null, reason: 'Low classification confidence', title: formData.title, description: formData.description, created_at: Date.now() });
      auditLog('LOW_CONFIDENCE_FLAGGED', 'SYSTEM', 'Report', id, { confidence, flagged_for: 'admin_review' });
    } else {
      auditLog('AUTO_ROUTED', 'SYSTEM', 'Report', id, { dept: routing.dept_name, confidence });
    }
    auditLog('REPORT_CREATED', user.id, 'Report', id, { category: finalCat, dept: routing.dept_name });

    showToast('success', 'Report Submitted! ✅', `Routed to ${routing.dept_name}. You can track it in My Reports.`);
    if (routing.needs_review) {
      setTimeout(() => showToast('warning', 'Admin Review Queued', 'Low classification confidence — an admin will verify routing.'), 1500);
    }
    navigate('my-reports');
  }

  renderWizard();
  if (wizardStep === 2) setTimeout(initLocationMap, 100);
}

/* ═══════════════════════════════════════════════════════════
   PAGE 4 — MY REPORTS
   ═══════════════════════════════════════════════════════════ */
function renderMyReports(root) {
  const user = Auth.current();
  const reports = DB.where('reports', r => r.reporter_id === user?.id);
  const allReports = DB.get('reports') || [];

  let selectedId = null;

  function render() {
    root.innerHTML = `
<div class="container my-reports-page">
  <div class="reports-header">
    <h1>My Reports</h1>
    <button class="btn btn-primary" data-page="submit">+ New Report</button>
  </div>
  ${reports.length === 0 ? `
    <div class="empty-state">
      <div class="empty-state-icon">📋</div>
      <h3>No reports yet</h3>
      <p>Submit your first issue to get started.</p>
      <button class="btn btn-primary mt-4" data-page="submit">Report an Issue</button>
    </div>
  ` : `
    <div style="display:grid;grid-template-columns:${selectedId ? '1fr 1fr' : '1fr'};gap:24px;align-items:start;">
      <div>
        <div class="tab-nav">
          <button class="tab-btn active" id="tab-all">All (${reports.length})</button>
          <button class="tab-btn" id="tab-open">Open (${reports.filter(r => !['resolved','closed'].includes(r.status)).length})</button>
          <button class="tab-btn" id="tab-resolved">Resolved (${reports.filter(r => r.status === 'resolved').length})</button>
        </div>
        ${reports.map(r => renderReportCard(r, r.id === selectedId)).join('')}
      </div>
      ${selectedId ? renderDetailPanel(DB.find('reports', selectedId)) : ''}
    </div>
  `}
</div>
    `;
    bindMyReportEvents();
  }

  function renderReportCard(r, selected) {
    return `
<div class="report-card ${selected ? 'card-hoverable' : ''}" data-report-id="${r.id}" style="${selected ? 'border-color:var(--color-primary)' : ''}">
  <div class="report-card-top">
    <div>
      <div class="report-card-title">${r.title}</div>
      <div class="report-card-meta" style="margin-top:4px;">
        ${catBadge(r.category)}
        ${statusBadge(r.status)}
        ${anonLabel(r)}
        <span>📍 ${r.location?.label || '—'}</span>
        <span>🕐 ${timeAgo(r.created_at)}</span>
      </div>
    </div>
    <div style="flex-shrink:0;">${slaChip(r)}</div>
  </div>
  <div class="report-card-body">${r.description.slice(0, 140)}${r.description.length > 140 ? '...' : ''}</div>
  ${r.cluster_count > 1 ? `<div class="cluster-notice">🔗 ${r.cluster_count} reports clustered — you're not alone!</div>` : ''}
</div>
    `;
  }

  function renderDetailPanel(r) {
    if (!r) return '';
    const updates = DB.where('statusUpdates', su => su.report_id === r.id).sort((a,b) => a.timestamp - b.timestamp);
    const dept = DB.find('departments', r.dept_id);
    return `
<div class="card" style="position:sticky;top:calc(var(--nav-height)+16px)">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
    <h2 style="font-family:var(--font-display);font-weight:800;font-size:18px;">${r.title}</h2>
    <button class="btn btn-ghost btn-sm" id="close-detail">✕</button>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
    ${catBadge(r.category)} ${statusBadge(r.status)} ${anonLabel(r)}
  </div>
  <div style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;">${r.description}</div>
  <div style="font-size:12px;display:flex;flex-direction:column;gap:6px;margin-bottom:16px;padding:12px;background:var(--bg-elevated);border-radius:10px;">
    <div>📍 ${r.location?.label || '—'}</div>
    <div>🏢 Department: <strong>${dept?.name || 'Unknown'}</strong></div>
    <div>🕐 Filed: ${formatDate(r.created_at)}</div>
    ${r.cluster_count > 1 ? `<div>🔗 Clustered with ${r.cluster_count - 1} similar report(s)</div>` : ''}
    <div>${confidenceChip(r.confidence)} routing confidence</div>
  </div>
  <div class="form-label mb-2">Status Timeline</div>
  <div class="timeline">
    ${updates.map((su, i) => `
      <div class="timeline-item">
        <div class="timeline-dot ${su.to} ${i === updates.length - 1 ? 'active' : ''}"></div>
        <div class="timeline-content">
          <div style="font-weight:700;font-size:13px;">${STATUS_META[su.to]?.label || su.to}</div>
          ${su.note ? `<div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">${su.note}</div>` : ''}
          ${su.evidence_url ? `<div style="margin-top:6px;font-size:11px;color:var(--color-success);">📸 Resolution photo attached</div>` : ''}
        </div>
        <div class="timeline-time">${timeAgo(su.timestamp)}</div>
      </div>
    `).join('')}
  </div>
</div>
    `;
  }

  function bindMyReportEvents() {
    root.querySelectorAll('[data-report-id]').forEach(el => {
      el.addEventListener('click', () => {
        selectedId = selectedId === el.dataset.reportId ? null : el.dataset.reportId;
        render();
      });
    });
    const closeBtn = document.getElementById('close-detail');
    if (closeBtn) closeBtn.addEventListener('click', () => { selectedId = null; render(); });
  }

  render();
}

/* ═══════════════════════════════════════════════════════════
   PAGE 5 — PUBLIC FEED & MAP
   ═══════════════════════════════════════════════════════════ */
function renderFeed(root) {
  let filterStatus = 'all';
  let filterCat = 'all';
  let feedMap = null;
  let markers = [];
  let selectedReport = null;

  function getFilteredReports() {
    return (DB.get('reports') || []).filter(r => {
      const statusOk = filterStatus === 'all' || r.status === filterStatus;
      const catOk = filterCat === 'all' || r.category === filterCat;
      return statusOk && catOk;
    }).sort((a,b) => b.created_at - a.created_at);
  }

  function renderPage() {
    const reports = getFilteredReports();
    root.innerHTML = `
<div class="feed-page">
  <div class="feed-map-col"><div id="feed-map"></div></div>
  <div class="feed-list-col">
    <h1 style="font-family:var(--font-display);font-weight:800;font-size:22px;margin-bottom:14px;">🗺️ Live Campus Feed</h1>
    <!-- Filters -->
    <div class="feed-filters">
      <span class="filter-chip ${filterStatus==='all'?'active':''}" data-filter-status="all">All Status</span>
      ${['reported','acknowledged','inprogress','resolved'].map(s =>
        `<span class="filter-chip ${filterStatus===s?'active':''}" data-filter-status="${s}">${STATUS_META[s].label}</span>`
      ).join('')}
    </div>
    <div class="feed-filters">
      <span class="filter-chip ${filterCat==='all'?'active':''}" data-filter-cat="all">All Categories</span>
      ${Object.entries(CAT_META).map(([k,v]) =>
        `<span class="filter-chip ${filterCat===k?'active':''}" data-filter-cat="${k}">${v.icon} ${v.label}</span>`
      ).join('')}
    </div>
    <div style="font-size:12px;color:var(--text-muted);margin-bottom:14px;">${reports.length} issue(s) shown</div>
    <!-- Report cards -->
    <div id="feed-cards">
      ${reports.length === 0 ? `<div class="empty-state"><div class="empty-state-icon">🗺️</div><h3>No issues match filters</h3></div>` :
        reports.map(r => renderFeedCard(r)).join('')}
    </div>
  </div>
</div>
    `;
    setTimeout(() => initFeedMap(reports), 50);
    bindFeedEvents(reports);
  }

  function renderFeedCard(r) {
    return `
<div class="report-card card-hoverable" data-feed-report="${r.id}" style="margin-bottom:12px;${selectedReport===r.id?'border-color:var(--color-primary);':''}" >
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
    <div style="font-weight:700;font-size:14px;line-height:1.4;max-width:260px;">${r.title}</div>
    ${statusBadge(r.status)}
  </div>
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">${catBadge(r.category)} ${r.cluster_count > 1 ? `<span class="badge badge-primary">🔗 ${r.cluster_count} reports</span>` : ''}</div>
  <div style="font-size:12px;color:var(--text-secondary);margin-bottom:8px;">📍 ${r.location?.label || '—'}</div>
  <div style="font-size:12px;display:flex;justify-content:space-between;color:var(--text-muted);">
    <span>🕐 ${timeAgo(r.created_at)}</span>
    <span class="anon-pill">🔒 Reporter hidden</span>
  </div>
</div>
    `;
  }

  function initFeedMap(reports) {
    const mapEl = document.getElementById('feed-map');
    if (!mapEl) return;
    feedMap = L.map(mapEl, { center: CAMPUS_CENTER, zoom: CAMPUS_ZOOM });
    darkTileLayer().addTo(feedMap);

    // Add ITER Campus Landmark Markers Layer
    if (typeof ITER_CAMPUS_LOCATIONS !== 'undefined') {
      ITER_CAMPUS_LOCATIONS.forEach(loc => {
        const landmarkIcon = L.divIcon({
          className: 'campus-landmark-pin',
          html: `<div style="background:var(--bg-card);border:1px solid var(--border-mid);border-radius:12px;padding:2px 7px;font-size:10px;font-weight:700;display:flex;align-items:center;gap:3px;box-shadow:var(--shadow-sm);white-space:nowrap;cursor:pointer;color:var(--text-secondary);opacity:0.9;"><span>${loc.icon}</span><span style="max-width:110px;overflow:hidden;text-overflow:ellipsis;">${loc.name}</span></div>`,
          iconSize: [130, 22],
          iconAnchor: [65, 11]
        });
        const lm = L.marker([loc.lat, loc.lng], { icon: landmarkIcon }).addTo(feedMap);
        lm.bindPopup(`
          <div style="font-family:var(--font-sans);min-width:180px;">
            <div style="font-weight:800;font-size:13px;display:flex;align-items:center;gap:4px;"><span>${loc.icon}</span><span>${loc.name}</span></div>
            <div style="font-size:11px;color:var(--color-primary-light);margin-top:2px;">🏛️ ${loc.tag} Reference: <strong>${loc.ref || loc.name}</strong></div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:4px;font-family:monospace;">${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}</div>
            <div style="margin-top:8px;padding-top:6px;border-top:1px solid var(--border-subtle);">
              <a href="${getGoogleMapsUrl(loc.lat, loc.lng)}" target="_blank" style="color:var(--color-primary-light);font-size:11px;font-weight:700;text-decoration:underline;display:inline-flex;align-items:center;gap:4px;">🧭 Open in Google Maps ↗</a>
            </div>
          </div>
        `);
      });
    }

    markers = [];
    reports.forEach(r => {
      if (!r.location?.lat) return;
      const m = L.marker([r.location.lat, r.location.lng], { icon: mapIcon(r) });
      m.bindPopup(`
        <div style="min-width:190px;">
          <div style="font-weight:700;font-size:13px;margin-bottom:4px;">${r.title}</div>
          <div style="font-size:11px;display:flex;gap:4px;flex-wrap:wrap;">${catBadge(r.category)} ${statusBadge(r.status)}</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:6px;">📍 ${r.location.label}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">🕐 ${timeAgo(r.created_at)}</div>
          ${r.cluster_count > 1 ? `<div style="font-size:11px;color:var(--color-primary-light);margin-top:4px;">🔗 ${r.cluster_count} reports clustered</div>` : ''}
          <div style="margin-top:8px;padding-top:6px;border-top:1px solid var(--border-subtle);">
            <a href="${getGoogleMapsUrl(r.location.lat, r.location.lng)}" target="_blank" style="color:var(--color-primary-light);font-size:11px;font-weight:700;text-decoration:underline;display:inline-flex;align-items:center;gap:4px;">🧭 Navigate on Google Maps ↗</a>
          </div>
        </div>
      `);
      m.addTo(feedMap);
      markers.push({ marker: m, id: r.id });
    });
  }

  function bindFeedEvents(reports) {
    root.querySelectorAll('[data-filter-status]').forEach(el => {
      el.addEventListener('click', () => { filterStatus = el.dataset.filterStatus; renderPage(); });
    });
    root.querySelectorAll('[data-filter-cat]').forEach(el => {
      el.addEventListener('click', () => { filterCat = el.dataset.filterCat; renderPage(); });
    });
    root.querySelectorAll('[data-feed-report]').forEach(el => {
      el.addEventListener('click', () => {
        selectedReport = el.dataset.feedReport;
        const r = reports.find(x => x.id === selectedReport);
        if (r?.location && feedMap) {
          feedMap.flyTo([r.location.lat, r.location.lng], 17);
          const m = markers.find(x => x.id === selectedReport);
          if (m) m.marker.openPopup();
        }
      });
    });
  }

  renderPage();
}

/* ═══════════════════════════════════════════════════════════
   PAGE 6 — PARTICIPATORY BUDGETING
   ═══════════════════════════════════════════════════════════ */
function renderBudget(root) {
  const proposals = DB.get('proposals') || [];
  const cycle = (DB.get('budgetCycles') || [])[0];
  const user = Auth.current();
  let activeTab = 'vote';
  let budgetChart = null;

  function render() {
    const userVotes = (DB.get('votes') || []).filter(v => v.user_id === user?.id).map(v => v.proposal_id);
    const sortedProposals = [...proposals].sort((a,b) => b.votes - a.votes);
    const votingProps = sortedProposals.filter(p => p.status === 'voting');
    const approvedProps = sortedProposals.filter(p => p.status === 'approved' || p.status === 'completed');

    root.innerHTML = `
<div class="container budget-page">
  <!-- Budget Hero -->
  <div class="budget-hero">
    <div style="position:relative;z-index:1;">
      <div class="section-tag" style="margin-bottom:12px;">Semester I 2025-26</div>
      <div class="budget-title">🏛️ Campus Improvement Fund</div>
      <div class="budget-sub">Community-driven projects funded by recurring issue patterns and student votes</div>
      <div class="budget-envelope">
        <div>
          <div class="budget-num" style="color:var(--color-primary-light);">${formatCurrency(cycle?.envelope || 1200000)}</div>
          <div class="budget-num-label">Total Envelope</div>
        </div>
        <div>
          <div class="budget-num" style="color:var(--color-accent);">${formatCurrency(cycle?.allocated || 470000)}</div>
          <div class="budget-num-label">Allocated</div>
        </div>
        <div>
          <div class="budget-num" style="color:var(--color-success);">${formatCurrency(cycle?.spent || 293500)}</div>
          <div class="budget-num-label">Spent</div>
        </div>
        <div>
          <div class="budget-num" style="color:var(--text-secondary);">${formatCurrency((cycle?.envelope || 1200000) - (cycle?.allocated || 470000))}</div>
          <div class="budget-num-label">Remaining</div>
        </div>
      </div>
      <div class="progress-bar mt-4" style="height:12px;max-width:500px;">
        <div class="progress-fill" style="width:${Math.round((cycle?.allocated||0)/(cycle?.envelope||1)*100)}%;background:linear-gradient(90deg,var(--color-primary),var(--color-accent));"></div>
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:6px;">${Math.round((cycle?.allocated||0)/(cycle?.envelope||1)*100)}% of budget allocated</div>
    </div>
  </div>

  <!-- Budget donut chart -->
  <div class="grid-2 mb-6" style="align-items:start;">
    <div class="card">
      <div class="form-label mb-4">Budget Breakdown</div>
      <canvas id="budget-chart" height="200"></canvas>
    </div>
    <div class="card">
      <div class="form-label mb-4">📊 Pattern Statistics</div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${[
          ['WiFi / IT Outages', 15, 'it'],
          ['Electrical Issues', 8, 'electrical'],
          ['Cleanliness Reports', 11, 'cleanliness'],
          ['Safety Concerns', 4, 'safety'],
          ['Furniture Damage', 6, 'furniture'],
        ].map(([label, count, cat]) => {
          const m = CAT_META[cat] || CAT_META.other;
          return `
            <div>
              <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                <span>${m.icon} ${label}</span>
                <strong>${count} reports this semester</strong>
              </div>
              <div class="progress-bar" style="height:6px;">
                <div class="progress-fill" style="width:${Math.min(100,count*5)}%;"></div>
              </div>
            </div>`;
        }).join('')}
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Patterns with ≥5 reports auto-generate proposals</div>
      </div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="tab-nav">
    <button class="tab-btn ${activeTab==='vote'?'active':''}" data-budget-tab="vote">🗳️ Voting (${votingProps.length})</button>
    <button class="tab-btn ${activeTab==='funded'?'active':''}" data-budget-tab="funded">✅ Funded & Completed (${approvedProps.length})</button>
    ${user?.role === 'admin' ? `<button class="tab-btn ${activeTab==='submit'?'active':''}" data-budget-tab="submit">+ Submit Proposal</button>` : ''}
  </div>

  <!-- Proposals -->
  <div id="proposals-container">
    ${activeTab === 'vote' ? votingProps.map(p => renderProposal(p, userVotes.includes(p.id))).join('') : ''}
    ${activeTab === 'funded' ? approvedProps.map(p => renderProposal(p, userVotes.includes(p.id), true)).join('') : ''}
    ${activeTab === 'submit' ? renderSubmitProposal() : ''}
  </div>
</div>
    `;
    bindBudgetEvents();
    initBudgetChart(cycle);
  }

  function renderProposal(p, hasVoted, funded = false) {
    const approvedPct = p.funded ? Math.round((p.allocated || p.budget_ask) / (cycle?.envelope || 1200000) * 100) : 0;
    return `
<div class="proposal-card" id="prop-${p.id}">
  <div class="proposal-card-top">
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        ${catBadge(p.category)}
        ${p.pattern_source ? `<span class="proposal-pattern">🔗 From ${p.pattern_reports} recurring reports</span>` : '<span class="badge badge-primary">Community Proposal</span>'}
        ${p.status === 'completed' ? '<span class="badge badge-success">✓ Completed</span>' : ''}
      </div>
      <div class="proposal-title">${p.title}</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">📍 ${p.location}</div>
    </div>
    <div style="text-align:right;flex-shrink:0;">
      <div style="font-family:var(--font-display);font-size:22px;font-weight:800;color:var(--color-accent);">${formatCurrency(p.budget_ask)}</div>
      <div style="font-size:11px;color:var(--text-muted);">budget requested</div>
    </div>
  </div>
  <div class="proposal-body">${p.description}</div>
  ${p.funded ? `
    <div style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-secondary);margin-bottom:6px;">
        <span>Spent: ${formatCurrency(p.spent || 0)} / Allocated: ${formatCurrency(p.allocated || p.budget_ask)}</span>
        <span>${Math.round((p.spent||0)/(p.allocated||p.budget_ask)*100)}%</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${Math.round((p.spent||0)/(p.allocated||p.budget_ask)*100)}%;background:linear-gradient(90deg,var(--color-success),hsl(142,70%,60%));"></div></div>
    </div>` : ''}
  <div class="proposal-footer">
    <div style="display:flex;align-items:center;gap:12px;">
      ${!funded ? `
        <button class="vote-btn ${hasVoted?'voted':''}" data-vote="${p.id}" ${!user?'disabled title="Sign in to vote"':''}>
          ${hasVoted ? '💜' : '🤍'} ${hasVoted ? 'Voted' : 'Vote'} · <strong>${p.votes}</strong>
        </button>
      ` : `<span style="font-size:13px;color:var(--text-muted);">💜 ${p.votes} supporters</span>`}
    </div>
    <div class="proposal-budget">Budget ask: <span>${formatCurrency(p.budget_ask)}</span></div>
  </div>
</div>
    `;
  }

  function renderSubmitProposal() {
    return `
<div class="card">
  <h3 style="font-family:var(--font-display);font-weight:700;margin-bottom:16px;">Submit a New Proposal</h3>
  <div class="form-group mb-4"><label class="form-label">Title</label><input class="form-input" id="prop-title" placeholder="e.g. Solar panels for hostel rooftops"/></div>
  <div class="form-group mb-4"><label class="form-label">Description</label><textarea class="form-textarea" id="prop-desc" placeholder="Describe the improvement, why it's needed, and expected impact..."></textarea></div>
  <div class="form-group mb-4"><label class="form-label">Category</label><select class="form-select" id="prop-cat">${Object.entries(CAT_META).map(([k,v])=>`<option value="${k}">${v.icon} ${v.label}</option>`).join('')}</select></div>
  <div class="form-group mb-4"><label class="form-label">Location</label><input class="form-input" id="prop-loc" placeholder="e.g. Hostel complex, Library block"/></div>
  <div class="form-group mb-4"><label class="form-label">Budget Request (₹)</label><input class="form-input" type="number" id="prop-budget" placeholder="e.g. 150000"/></div>
  <button class="btn btn-primary" id="prop-submit-btn">Submit Proposal →</button>
</div>
    `;
  }

  function initBudgetChart(cycle) {
    const canvas = document.getElementById('budget-chart');
    if (!canvas) return;
    if (budgetChart) { budgetChart.destroy(); }
    budgetChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Spent', 'Allocated (unspent)', 'Unallocated'],
        datasets: [{
          data: [cycle?.spent || 293500, (cycle?.allocated || 470000) - (cycle?.spent || 293500), (cycle?.envelope || 1200000) - (cycle?.allocated || 470000)],
          backgroundColor: ['hsl(142,70%,45%)','hsl(245,80%,60%)','hsl(222,20%,25%)'],
          borderWidth: 0,
        }],
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: { position: 'bottom', labels: { color: 'hsl(220,15%,65%)', font: { size: 12 } } },
        },
      },
    });
  }

  function bindBudgetEvents() {
    root.querySelectorAll('[data-budget-tab]').forEach(el => {
      el.addEventListener('click', () => { activeTab = el.dataset.budgetTab; render(); });
    });

    root.querySelectorAll('[data-vote]').forEach(el => {
      el.addEventListener('click', () => {
        if (!user) { showToast('info','Sign In Required','Sign in to vote on proposals.'); return; }
        const pid = el.dataset.vote;
        const votes = DB.get('votes') || [];
        const existing = votes.find(v => v.proposal_id === pid && v.user_id === user.id);
        const props = DB.get('proposals') || [];
        const prop = props.find(p => p.id === pid);
        if (!prop) return;
        if (existing) {
          DB.set('votes', votes.filter(v => !(v.proposal_id === pid && v.user_id === user.id)));
          prop.votes = Math.max(0, prop.votes - 1);
          showToast('info', 'Vote Removed', `Your vote on "${prop.title}" has been removed.`);
        } else {
          DB.push('votes', { id: 'v' + uid(), proposal_id: pid, user_id: user.id, timestamp: Date.now() });
          prop.votes += 1;
          showToast('success', 'Vote Cast! 💜', `You voted for "${prop.title}"`);
          auditLog('VOTE_CAST', user.id, 'Proposal', pid, { proposal: prop.title });
        }
        DB.set('proposals', props);
        render();
      });
    });

    const submitPropBtn = document.getElementById('prop-submit-btn');
    if (submitPropBtn) {
      submitPropBtn.addEventListener('click', async () => {
        const title = document.getElementById('prop-title')?.value;
        const desc  = document.getElementById('prop-desc')?.value;
        const cat   = document.getElementById('prop-cat')?.value;
        const loc   = document.getElementById('prop-loc')?.value;
        const budget = parseInt(document.getElementById('prop-budget')?.value || '0');
        if (!title || !desc || !budget) { showToast('error','Missing Fields','Fill all required fields.'); return; }
        const confirmed = await showConfirm('📋','Submit Proposal?',`"${title}" will be submitted for community review.`, 'Submit', false);
        if (!confirmed) return;
        const newProp = { id: 'p' + uid(), title, description: desc, category: cat, location: loc, budget_ask: budget, votes: 0, status: 'voting', funded: false, pattern_source: false, created_at: Date.now() };
        DB.push('proposals', newProp);
        auditLog('PROPOSAL_SUBMITTED', user.id, 'Proposal', newProp.id, { title, budget });
        showToast('success','Proposal Submitted!','It will appear in the voting list.');
        activeTab = 'vote';
        render();
      });
    }
  }

  render();
}

/* ═══════════════════════════════════════════════════════════
   PAGE 7 — DEPARTMENT DASHBOARD
   ═══════════════════════════════════════════════════════════ */
function renderDept(root) {
  const user = Auth.current();
  const depts = DB.get('departments') || [];
  // Admin can see all depts; resolver sees their own
  const myDept = user?.role === 'admin' ? depts[0] : depts.find(d => d.id === user?.dept) || depts[0];
  let currentDeptId = myDept?.id || 'd1';
  let activeTab = 'queue';

  function render() {
    const dept = depts.find(d => d.id === currentDeptId) || depts[0];
    const deptReports = DB.where('reports', r => r.dept_id === currentDeptId && !['resolved','closed'].includes(r.status));
    const resolvedDeptReports = DB.where('reports', r => r.dept_id === currentDeptId && r.status === 'resolved');
    const overdueCount = deptReports.filter(r => getSLAStatus(r).status === 'overdue').length;

    root.innerHTML = `
<div class="container dept-page">
  <div class="reports-header">
    <h1>🏢 Department Dashboard</h1>
    ${user?.role === 'admin' ? `
      <select class="form-select" id="dept-selector" style="max-width:250px;">
        ${depts.map(d => `<option value="${d.id}" ${d.id === currentDeptId ? 'selected' : ''}>${d.icon} ${d.name}</option>`).join('')}
      </select>` : ''}
  </div>

  <div class="dept-layout">
    <!-- Sidebar -->
    <div class="dept-sidebar">
      <div class="dept-sidebar-name">${dept?.icon || '🏢'} ${dept?.name}</div>
      <div class="dept-stat-row"><span>Open Cases</span><strong style="color:var(--color-primary-light)">${deptReports.length}</strong></div>
      <div class="dept-stat-row"><span>Overdue</span><strong style="color:${overdueCount>0?'var(--color-danger)':'var(--color-success)'}">${overdueCount}</strong></div>
      <div class="dept-stat-row"><span>Resolved</span><strong style="color:var(--color-success)">${resolvedDeptReports.length}</strong></div>
      <div class="dept-stat-row"><span>SLA</span><span>${dept?.sla_hours}h response time</span></div>
      <div class="dept-stat-row"><span>Categories</span><div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;">${(dept?.categories||[]).map(c => `<span class="cat-badge ${CAT_META[c]?.cls||''}" style="font-size:10px;">${CAT_META[c]?.icon||''} ${c}</span>`).join('')}</div></div>
      <div class="divider"></div>
      <div style="font-size:12px;color:var(--text-muted);">Department Head: <strong style="color:var(--text-secondary)">${dept?.head}</strong></div>
    </div>

    <!-- Main area -->
    <div>
      <div class="tab-nav">
        <button class="tab-btn ${activeTab==='queue'?'active':''}" data-dept-tab="queue">Queue (${deptReports.length})</button>
        <button class="tab-btn ${activeTab==='resolved'?'active':''}" data-dept-tab="resolved">Resolved (${resolvedDeptReports.length})</button>
      </div>

      ${activeTab === 'queue' ? (deptReports.length === 0
        ? `<div class="empty-state"><div class="empty-state-icon">✅</div><h3>All clear!</h3><p>No open cases in this department.</p></div>`
        : deptReports.sort((a,b) => {
            const sa = getSLAStatus(a), sb = getSLAStatus(b);
            return (sa.status==='overdue'?-1:0) - (sb.status==='overdue'?-1:0);
          }).map(r => renderQueueItem(r)).join('')
      ) : ''}

      ${activeTab === 'resolved' ? (resolvedDeptReports.length === 0
        ? `<div class="empty-state"><div class="empty-state-icon">📋</div><h3>No resolved cases yet</h3></div>`
        : resolvedDeptReports.map(r => renderQueueItem(r, true)).join('')
      ) : ''}
    </div>
  </div>
</div>
    `;
    bindDeptEvents();
  }

  function renderQueueItem(r, resolved = false) {
    const sla = getSLAStatus(r);
    const reporter = DB.find('users', r.reporter_id);
    return `
<div class="queue-item">
  <div class="queue-item-header">
    <div style="font-weight:700;font-size:15px;">${r.title}</div>
    <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
      ${statusBadge(r.status)} ${slaChip(r)}
    </div>
  </div>
  <div class="queue-item-meta">
    ${catBadge(r.category)}
    <span>📍 ${r.location?.label || '—'}</span>
    <span>🕐 Filed ${timeAgo(r.created_at)}</span>
    <span>👤 ${r.anonymous ? '🔒 Anonymous' : (reporter?.name || 'Unknown')}</span>
    ${confidenceChip(r.confidence)}
  </div>
  <p style="font-size:13px;color:var(--text-secondary);margin-bottom:14px;">${r.description}</p>
  ${!resolved ? `
    <div class="queue-item-actions">
      ${r.status === 'reported'     ? `<button class="btn btn-ghost btn-sm" data-action-ack="${r.id}">✅ Acknowledge</button>` : ''}
      ${r.status === 'acknowledged' ? `<button class="btn btn-primary btn-sm" data-action-start="${r.id}">▶ Start Work</button>` : ''}
      ${r.status === 'inprogress'   ? `<button class="btn btn-success btn-sm" data-action-resolve="${r.id}">🏁 Mark Resolved</button>` : ''}
      <button class="btn btn-ghost btn-sm" data-action-note="${r.id}">📝 Add Note</button>
      ${user?.role === 'admin' ? `<button class="btn btn-ghost btn-sm" data-action-reroute="${r.id}">🔀 Re-route</button>` : ''}
    </div>` : `
    <div style="font-size:12px;color:var(--color-success);display:flex;align-items:center;gap:6px;">✓ Resolved ${timeAgo(r.updated_at)}</div>`}
</div>
    `;
  }

  function bindDeptEvents() {
    const deptSel = document.getElementById('dept-selector');
    if (deptSel) {
      deptSel.addEventListener('change', () => { currentDeptId = deptSel.value; render(); });
    }
    root.querySelectorAll('[data-dept-tab]').forEach(el => {
      el.addEventListener('click', () => { activeTab = el.dataset.deptTab; render(); });
    });

    // Acknowledge
    root.querySelectorAll('[data-action-ack]').forEach(el => {
      el.addEventListener('click', async () => {
        const id = el.dataset.actionAck;
        const ok = await showConfirm('✅','Acknowledge Case?','This will notify the reporter that their issue has been received.','Acknowledge', false);
        if (!ok) return;
        DB.update('reports', id, { status: 'acknowledged', updated_at: Date.now() });
        DB.push('statusUpdates', { id: 'su'+uid(), report_id: id, actor_id: user.id, from:'reported', to:'acknowledged', timestamp: Date.now(), note: `Acknowledged by ${user.name}.`, evidence_url: null });
        auditLog('STATUS_CHANGED', user.id, 'Report', id, { from: 'reported', to: 'acknowledged' });
        showToast('success','Case Acknowledged','Status updated and reporter notified.');
        render();
      });
    });

    // Start work
    root.querySelectorAll('[data-action-start]').forEach(el => {
      el.addEventListener('click', async () => {
        const id = el.dataset.actionStart;
        const ok = await showConfirm('▶','Start Work?','Mark this case as In Progress.','Start Work', false);
        if (!ok) return;
        DB.update('reports', id, { status: 'inprogress', updated_at: Date.now() });
        DB.push('statusUpdates', { id: 'su'+uid(), report_id: id, actor_id: user.id, from:'acknowledged', to:'inprogress', timestamp: Date.now(), note: `Work started by ${user.name}.`, evidence_url: null });
        auditLog('STATUS_CHANGED', user.id, 'Report', id, { from: 'acknowledged', to: 'inprogress' });
        showToast('success','Work Started','Status updated to In Progress.');
        render();
      });
    });

    // Resolve
    root.querySelectorAll('[data-action-resolve]').forEach(el => {
      el.addEventListener('click', async () => {
        const id = el.dataset.actionResolve;
        const ok = await showConfirm('🏁','Mark as Resolved?','Confirm that this issue has been fully fixed. Attach a resolution note.','Mark Resolved', false);
        if (!ok) return;
        const note = prompt('Add a resolution note (optional, will be public):') || `Resolved by ${user.name}.`;
        DB.update('reports', id, { status: 'resolved', updated_at: Date.now() });
        DB.push('statusUpdates', { id: 'su'+uid(), report_id: id, actor_id: user.id, from:'inprogress', to:'resolved', timestamp: Date.now(), note, evidence_url: 'resolution_photo' });
        auditLog('STATUS_CHANGED', user.id, 'Report', id, { from: 'inprogress', to: 'resolved', note });
        showToast('success','Issue Resolved! ✅','The case has been closed and the resolution is now publicly visible.');
        render();
      });
    });

    // Re-route
    root.querySelectorAll('[data-action-reroute]').forEach(el => {
      el.addEventListener('click', async () => {
        const id = el.dataset.actionReroute;
        const depts = DB.get('departments') || [];
        const choice = prompt(`Re-route to which department?\n${depts.map((d,i) => `${i+1}. ${d.name}`).join('\n')}\n\nEnter number:`);
        if (!choice) return;
        const idx = parseInt(choice) - 1;
        if (idx < 0 || idx >= depts.length) { showToast('error','Invalid Choice'); return; }
        const newDept = depts[idx];
        const ok = await showConfirm('🔀','Re-route Case?',`This case will be moved from current department to ${newDept.name}. An audit entry will be created.`,'Re-route', false);
        if (!ok) return;
        DB.update('reports', id, { dept_id: newDept.id, updated_at: Date.now() });
        auditLog('REROUTED', user.id, 'Report', id, { new_dept: newDept.name });
        showToast('success','Case Re-routed',`Moved to ${newDept.name}`);
        render();
      });
    });
  }

  render();
}

/* ═══════════════════════════════════════════════════════════
   PAGE 8 — ADMIN PANEL
   ═══════════════════════════════════════════════════════════ */
function renderAdmin(root) {
  const user = Auth.current();
  let activeTab = 'routing';

  function render() {
    const routingQueue = DB.get('routingQueue') || [];
    const auditLogs = (DB.get('auditLog') || []).sort((a,b) => b.timestamp - a.timestamp);
    const reports = DB.get('reports') || [];
    const depts = DB.get('departments') || [];
    const escalated = reports.filter(r => {
      const s = getSLAStatus(r);
      return s.status === 'overdue' && !['resolved','closed'].includes(r.status);
    });

    // Auto-find dup pairs from clusters
    const clusters = DB.get('clusters') || [];
    const dupPairs = clusters.filter(c => c.count >= 2).map(c => ({
      cluster: c,
      rep: reports.find(r => r.id === c.representative_id),
      others: c.report_ids.filter(id => id !== c.representative_id).map(id => reports.find(r => r.id === id)).filter(Boolean),
    }));

    root.innerHTML = `
<div class="container admin-page">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
    <div>
      <h1 style="margin-bottom:4px;">🛡️ Admin Panel</h1>
      <p style="font-size:13px;color:var(--text-muted);">Greenfield University — CampusFix Management Console</p>
    </div>
    <div style="display:flex;gap:8px;">
      ${escalated.length>0?`<span class="badge badge-danger">🚨 ${escalated.length} Escalated</span>`:''}
      ${routingQueue.length>0?`<span class="badge badge-pending">⚠️ ${routingQueue.length} Pending Review</span>`:''}
    </div>
  </div>

  <!-- Quick stats -->
  <div class="grid-4 mb-8">
    ${[
      { label: 'Total Reports', val: reports.length, icon: '📋', color: 'var(--color-primary-light)' },
      { label: 'Open Cases', val: reports.filter(r=>!['resolved','closed'].includes(r.status)).length, icon: '🔓', color: 'var(--color-accent)' },
      { label: 'Escalated', val: escalated.length, icon: '🚨', color: 'var(--color-danger)' },
      { label: 'Resolved Today', val: reports.filter(r=>r.status==='resolved' && Date.now()-r.updated_at<86400000).length, icon: '✅', color: 'var(--color-success)' },
    ].map(s => `
      <div class="stat-card">
        <div style="font-size:1.5rem;margin-bottom:4px;">${s.icon}</div>
        <div class="stat-value" style="color:${s.color}">${s.val}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('')}
  </div>

  <!-- Tabs -->
  <div class="tab-nav">
    <button class="tab-btn ${activeTab==='routing'?'active':''}" data-admin-tab="routing">⚠️ Routing Queue (${routingQueue.length})</button>
    <button class="tab-btn ${activeTab==='duplicates'?'active':''}" data-admin-tab="duplicates">🔗 Duplicate Review (${dupPairs.length})</button>
    <button class="tab-btn ${activeTab==='escalations'?'active':''}" data-admin-tab="escalations">🚨 Escalations (${escalated.length})</button>
    <button class="tab-btn ${activeTab==='audit'?'active':''}" data-admin-tab="audit">📋 Audit Log (${auditLogs.length})</button>
  </div>

  <!-- Routing Queue Tab -->
  ${activeTab === 'routing' ? `
    <div id="routing-tab">
      ${routingQueue.length === 0 ? `<div class="empty-state"><div class="empty-state-icon">✅</div><h3>All reports auto-routed</h3><p>No ambiguous cases require review.</p></div>` :
        routingQueue.map(rq => `
          <div class="routing-queue-item">
            <div class="routing-queue-item-header">
              <div>
                <div style="font-weight:700;font-size:15px;">${rq.title}</div>
                <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">Filed ${timeAgo(rq.created_at)}</div>
              </div>
              ${confidenceChip(rq.confidence)}
            </div>
            <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;">${rq.description}</p>
            <div style="background:var(--bg-elevated);border-radius:10px;padding:12px;font-size:13px;margin-bottom:14px;">
              <div style="color:var(--text-muted);margin-bottom:6px;font-size:11px;font-weight:700;letter-spacing:.05em;">ROUTING DECISION NEEDED</div>
              <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
                <span>AI suggests: <strong style="color:var(--color-primary-light)">${rq.suggested_label}</strong></span>
                <span style="color:var(--text-muted)">vs</span>
                <span>Alt: <strong>${rq.alt_label || 'Manual selection'}</strong></span>
              </div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:6px;">Reason for uncertainty: ${rq.reason}</div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button class="btn btn-primary btn-sm" data-approve-route="${rq.id}">✓ Approve Suggested Route</button>
              ${depts.filter(d => d.id !== rq.suggested_dept).map(d =>
                `<button class="btn btn-ghost btn-sm" data-manual-route="${rq.id}" data-dept-id="${d.id}" data-dept-name="${d.name}">→ ${d.name}</button>`
              ).join('')}
            </div>
          </div>
        `).join('')}
    </div>` : ''}

  <!-- Duplicates Tab -->
  ${activeTab === 'duplicates' ? `
    <div id="dup-tab">
      ${dupPairs.length === 0 ? `<div class="empty-state"><div class="empty-state-icon">🔗</div><h3>No duplicate clusters to review</h3></div>` :
        dupPairs.map(dp => `
          <div class="card mb-4">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
              <div>
                <span class="badge badge-primary">🔗 Cluster: ${dp.cluster.count} reports</span>
                <span style="font-size:12px;color:var(--text-muted);margin-left:8px;">Category: ${dp.cluster.category} · Location: ${dp.cluster.location}</span>
              </div>
              <button class="btn btn-danger btn-sm" data-unmerge="${dp.cluster.id}">Unmerge Cluster</button>
            </div>
            <div class="dup-compare">
              <div class="dup-card">
                <h4>🏷️ Representative Report</h4>
                <div style="font-size:13px;font-weight:600;margin-bottom:6px;">${dp.rep?.title || '—'}</div>
                <div style="font-size:12px;color:var(--text-secondary);">${dp.rep?.description?.slice(0,120) || ''}...</div>
                <div style="font-size:11px;color:var(--text-muted);margin-top:6px;">📍 ${dp.rep?.location?.label || '—'} · ${timeAgo(dp.rep?.created_at||0)}</div>
              </div>
              <div>
                ${dp.others.map(o => `
                  <div class="dup-card mb-2">
                    <h4>📄 Merged Report</h4>
                    <div style="font-size:13px;font-weight:600;margin-bottom:6px;">${o.title}</div>
                    <div style="font-size:12px;color:var(--text-secondary);">${o.description?.slice(0,100)||''}...</div>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:6px;">📍 ${o.location?.label||'—'} · ${timeAgo(o.created_at||0)}</div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="dup-similarity">⟷ Merged based on geo-proximity + semantic similarity</div>
          </div>
        `).join('')}
    </div>` : ''}

  <!-- Escalations Tab -->
  ${activeTab === 'escalations' ? `
    <div id="esc-tab">
      ${escalated.length === 0 ? `<div class="empty-state"><div class="empty-state-icon">🎉</div><h3>No escalations</h3><p>All cases are within SLA.</p></div>` :
        escalated.map(r => {
          const s = getSLAStatus(r);
          const dept = depts.find(d => d.id === r.dept_id);
          return `
            <div class="queue-item" style="border-left:3px solid var(--color-danger);">
              <div class="queue-item-header">
                <div style="font-weight:700;">${r.title}</div>
                <span class="sla-timer sla-overdue">🚨 ${s.label}</span>
              </div>
              <div class="queue-item-meta">
                ${catBadge(r.category)} ${statusBadge(r.status)}
                <span>🏢 ${dept?.name || 'Unknown'}</span>
                <span>Filed ${timeAgo(r.created_at)}</span>
              </div>
              <div style="display:flex;gap:8px;margin-top:8px;">
                <button class="btn btn-danger btn-sm" data-escalate-ping="${r.id}">🔔 Ping Department</button>
                <button class="btn btn-ghost btn-sm" data-action-reroute="${r.id}">🔀 Re-route</button>
              </div>
            </div>`;
        }).join('')}
    </div>` : ''}

  <!-- Audit Log Tab -->
  ${activeTab === 'audit' ? `
    <div id="audit-tab">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:13px;color:var(--text-muted);">Immutable log — ${auditLogs.length} entries</span>
        <span class="badge badge-primary">🔒 Read-only</span>
      </div>
      <div class="scroll-list" style="max-height:600px;">
        <table class="audit-table">
          <thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Entity</th><th>Details</th></tr></thead>
          <tbody>
            ${auditLogs.map(entry => {
              const actor = entry.actor_id === 'SYSTEM' ? '🤖 System' : (DB.find('users', entry.actor_id)?.name || entry.actor_id);
              const actionColors = {
                REPORT_CREATED: 'var(--color-primary-light)',
                STATUS_CHANGED: 'var(--color-success)',
                AUTO_ROUTED: 'var(--color-accent)',
                CLUSTER_MERGED: 'var(--status-inprogress)',
                ESCALATED: 'var(--color-danger)',
                BUDGET_APPROVED: 'var(--color-success)',
                LOW_CONFIDENCE_FLAGGED: 'var(--color-warning)',
                REROUTED: 'var(--color-accent)',
                VOTE_CAST: 'var(--color-primary-light)',
              };
              return `
                <tr>
                  <td class="text-muted" style="white-space:nowrap;font-size:11px;">${timeAgo(entry.timestamp)}</td>
                  <td style="font-weight:600;font-size:12px;">${actor}</td>
                  <td><span style="color:${actionColors[entry.action]||'var(--text-secondary)'};font-size:12px;font-weight:700;">${entry.action.replace(/_/g,' ')}</span></td>
                  <td style="font-size:12px;color:var(--color-primary-light);">${entry.entity_type} #${entry.entity_id}</td>
                  <td style="font-size:11px;color:var(--text-muted);">${Object.entries(entry.meta||{}).map(([k,v])=>`${k}: ${v}`).join(' · ')}</td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>` : ''}
</div>
    `;
    bindAdminEvents();
  }

  function bindAdminEvents() {
    root.querySelectorAll('[data-admin-tab]').forEach(el => {
      el.addEventListener('click', () => { activeTab = el.dataset.adminTab; render(); });
    });

    // Approve routing
    root.querySelectorAll('[data-approve-route]').forEach(el => {
      el.addEventListener('click', async () => {
        const rqId = el.dataset.approveRoute;
        const rq = (DB.get('routingQueue')||[]).find(x => x.id === rqId);
        if (!rq) return;
        const ok = await showConfirm('✅','Approve Routing?',`Route "${rq.title}" to ${rq.suggested_label}. This action is logged.`,'Approve',false);
        if (!ok) return;
        DB.update('reports', rq.report_id, { dept_id: rq.suggested_dept });
        DB.set('routingQueue', (DB.get('routingQueue')||[]).filter(x => x.id !== rqId));
        auditLog('ROUTE_APPROVED', user.id, 'Report', rq.report_id, { dept: rq.suggested_label, approved_by: user.name });
        showToast('success','Routing Approved',`Report routed to ${rq.suggested_label}`);
        render();
      });
    });

    // Manual route
    root.querySelectorAll('[data-manual-route]').forEach(el => {
      el.addEventListener('click', async () => {
        const rqId = el.dataset.manualRoute;
        const deptId = el.dataset.deptId;
        const deptName = el.dataset.deptName;
        const rq = (DB.get('routingQueue')||[]).find(x => x.id === rqId);
        if (!rq) return;
        const ok = await showConfirm('🔀','Override Routing?',`Manually route "${rq.title}" to ${deptName}. This overrides the AI suggestion and is logged.`,'Override',true);
        if (!ok) return;
        DB.update('reports', rq.report_id, { dept_id: deptId });
        DB.set('routingQueue', (DB.get('routingQueue')||[]).filter(x => x.id !== rqId));
        auditLog('ROUTE_OVERRIDDEN', user.id, 'Report', rq.report_id, { ai_suggested: rq.suggested_label, overridden_to: deptName });
        showToast('success','Routing Overridden',`Report manually routed to ${deptName}`);
        render();
      });
    });

    // Unmerge cluster
    root.querySelectorAll('[data-unmerge]').forEach(el => {
      el.addEventListener('click', async () => {
        const cId = el.dataset.unmerge;
        const ok = await showConfirm('🔓','Unmerge Cluster?','This will split the clustered reports into individual cases. Cannot be auto-undone.','Unmerge',true);
        if (!ok) return;
        const cluster = DB.find('clusters', cId);
        if (cluster) {
          cluster.report_ids.forEach(rid => DB.update('reports', rid, { cluster_id: null, cluster_count: 1 }));
          DB.set('clusters', (DB.get('clusters')||[]).filter(c => c.id !== cId));
        }
        auditLog('CLUSTER_UNMERGED', user.id, 'Cluster', cId, { reason: 'Admin manual review' });
        showToast('success','Cluster Unmerged','Reports are now individual cases.');
        render();
      });
    });

    // Ping dept
    root.querySelectorAll('[data-escalate-ping]').forEach(el => {
      el.addEventListener('click', async () => {
        const id = el.dataset.escalatePing;
        const r = DB.find('reports', id);
        const dept = DB.find('departments', r?.dept_id);
        const ok = await showConfirm('🔔','Ping Department?',`Send an escalation notice to ${dept?.name} for "${r?.title}". This is logged.`,'Send Ping',true);
        if (!ok) return;
        auditLog('ESCALATION_PINGED', user.id, 'Report', id, { dept: dept?.name, reason: 'SLA overdue' });
        showToast('success','Department Pinged',`${dept?.name} has been notified about the overdue case.`);
        render();
      });
    });
  }

  render();
}

/* ═══════════════════════════════════════════════════════════
   PAGE 9 — COMPREHENSIVE PROFILE (USER, SOLVER, ADMIN)
   ═══════════════════════════════════════════════════════════ */
function renderProfile(root, params = {}) {
  let currentUser = Auth.current();
  if (!currentUser) {
    navigate('auth', { redirect: 'profile' });
    return;
  }

  // Ensure rich profile fields exist with sensible fallbacks
  currentUser = _ensureUserProfileFields(currentUser);

  let activeTab = params.tab || 'overview';

  function render() {
    currentUser = Auth.current() || currentUser;
    currentUser = _ensureUserProfileFields(currentUser);

    const isReporter = currentUser.role === 'reporter';
    const isResolver = currentUser.role === 'resolver';
    const isAdmin    = currentUser.role === 'admin';

    const allUsers = DB.get('users') || [];
    const reports  = DB.get('reports') || [];
    const myReports = reports.filter(r => r.reporter_id === currentUser.id);
    const resolvedMyReports = myReports.filter(r => r.status === 'resolved');

    root.innerHTML = `
<div class="profile-page">

  <!-- ── Hero Profile Card ── -->
  <div class="profile-hero">
    <div class="profile-hero-banner ${isResolver ? 'banner-resolver' : isAdmin ? 'banner-admin' : ''}"></div>
    <div class="profile-hero-body">
      <div class="profile-main-meta">
        <div class="profile-avatar-container" id="profile-avatar-btn" title="Click to change avatar">
          <div class="profile-avatar">${currentUser.avatar || '👤'}</div>
          <div class="profile-avatar-edit-badge">✎</div>
        </div>
        <div class="profile-identity">
          <div class="profile-name-row">
            <h1 class="profile-fullname">${currentUser.name}</h1>
            <span class="profile-role-pill role-${currentUser.role}">
              ${isReporter ? '🧑‍🎓 Student Reporter' : isResolver ? '🔧 Certified Solver' : '🛡️ Campus Administrator'}
            </span>
            ${isAdmin ? '<span class="badge" style="background:hsla(38,95%,58%,.2);color:var(--color-accent);font-size:11px;">Clearance: Level 3</span>' : ''}
          </div>
          <div class="profile-subtitle">
            <span class="profile-info-pill">🏛️ ${currentUser.designation || (isReporter ? 'Student Member' : isResolver ? 'Field Operations' : 'Administration')}</span>
            <span>•</span>
            <span class="profile-info-pill">🆔 ${currentUser.id_number || 'GU-2025-001'}</span>
            <span>•</span>
            <span class="profile-info-pill">📍 ${currentUser.location || 'Greenfield Campus'}</span>
          </div>
          <p class="profile-bio">${currentUser.bio || 'Active member of the Greenfield University CampusFix community.'}</p>
        </div>
      </div>
      <div class="profile-hero-actions">
        <button class="btn btn-primary" id="btn-edit-profile">
          <span>✏️</span> Edit Profile
        </button>
        <button class="btn btn-ghost" id="btn-share-profile" title="Copy profile details link">
          <span>📋</span> Share ID
        </button>
        <button class="btn btn-danger" id="btn-profile-logout" style="font-size:13px;" title="Sign out of current account">
          <span>🚪</span> Sign Out
        </button>
      </div>
    </div>
  </div>

  <!-- ── Navigation Tabs ── -->
  <div class="profile-nav-tabs">
    <button class="profile-tab-btn ${activeTab === 'overview' ? 'active' : ''}" data-ptab="overview">
      <span>📊</span> Overview & Performance
    </button>
    ${isReporter ? `
      <button class="profile-tab-btn ${activeTab === 'reports' ? 'active' : ''}" data-ptab="reports">
        <span>📋</span> My Reports <span class="tab-count">${myReports.length}</span>
      </button>
      <button class="profile-tab-btn ${activeTab === 'badges' ? 'active' : ''}" data-ptab="badges">
        <span>🏆</span> Badges & Achievements <span class="tab-count">${(currentUser.badges||[]).length}</span>
      </button>
    ` : ''}
    ${isResolver ? `
      <button class="profile-tab-btn ${activeTab === 'skills' ? 'active' : ''}" data-ptab="skills">
        <span>⚡</span> Skills & Certifications <span class="tab-count">${(currentUser.skills||[]).length}</span>
      </button>
      <button class="profile-tab-btn ${activeTab === 'cases' ? 'active' : ''}" data-ptab="cases">
        <span>🛠️</span> Resolution Queue & Showcase
      </button>
    ` : ''}
    ${isAdmin ? `
      <button class="profile-tab-btn ${activeTab === 'oversight' ? 'active' : ''}" data-ptab="oversight">
        <span>🏛️</span> Department Oversight
      </button>
      <button class="profile-tab-btn ${activeTab === 'audit' ? 'active' : ''}" data-ptab="audit">
        <span>📜</span> Executive Audit Stream
      </button>
    ` : ''}
    <button class="profile-tab-btn ${activeTab === 'settings' ? 'active' : ''}" data-ptab="settings">
      <span>⚙️</span> Settings & Privacy
    </button>
  </div>

  <!-- ── Dynamic Tab Content ── -->
  <div id="profile-tab-content">
    ${renderTabContent(activeTab, currentUser)}
  </div>

</div>

<!-- ── Modal: Edit Profile ── -->
<div id="edit-profile-modal" class="modal-overlay hidden" role="dialog" aria-modal="true">
  <div class="modal-box modal-lg">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-4);">
      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);display:flex;align-items:center;gap:8px;">
        <span>✏️</span> Edit Complete Profile
      </h3>
      <button class="btn btn-ghost btn-sm" id="edit-modal-close" style="font-size:1.2rem;">✕</button>
    </div>

    <form id="edit-profile-form">
      <div style="margin-bottom:var(--space-4);">
        <label class="form-label">Choose Avatar Emoji</label>
        <div class="avatar-picker-grid" id="avatar-picker">
          ${['🧑‍💻','👩‍🎓','🧑‍🎓','👩‍💻','🔧','💻','🛡️','🔒','👷','👩‍🏫','👨‍💼','🔬','📐','⚡','💡','🧹','🌿','🎓'].map(emoji => `
            <div class="avatar-choice ${emoji === currentUser.avatar ? 'selected' : ''}" data-emoji="${emoji}">${emoji}</div>
          `).join('')}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
        <div class="form-group">
          <label class="form-label" for="ep-name">Full Name</label>
          <input class="form-input" id="ep-name" value="${currentUser.name}" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="ep-phone">Phone / Contact</label>
          <input class="form-input" id="ep-phone" value="${currentUser.phone || '+91 98765 00000'}" />
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-top:var(--space-3);">
        <div class="form-group">
          <label class="form-label" for="ep-designation">${isReporter ? 'Academic Branch / Year' : isResolver ? 'Position / Specialization' : 'Executive Designation'}</label>
          <input class="form-input" id="ep-designation" value="${currentUser.designation || ''}" />
        </div>
        <div class="form-group">
          <label class="form-label" for="ep-location">Campus Location / Residence</label>
          <input class="form-input" id="ep-location" value="${currentUser.location || ''}" />
        </div>
      </div>

      <div class="form-group" style="margin-top:var(--space-3);">
        <label class="form-label" for="ep-bio">Bio & Responsibilities</label>
        <textarea class="form-input" id="ep-bio" rows="3">${currentUser.bio || ''}</textarea>
      </div>

      ${isResolver ? `
        <div class="form-group" style="margin-top:var(--space-3);">
          <label class="form-label" for="ep-skills">Technical Skills (comma-separated)</label>
          <input class="form-input" id="ep-skills" value="${(currentUser.skills || []).join(', ')}" />
        </div>
      ` : ''}

      <div class="modal-actions" style="margin-top:var(--space-6);">
        <button type="button" class="btn btn-ghost" id="edit-modal-cancel">Cancel</button>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </div>
    </form>
  </div>
</div>
    `;

    bindProfileEvents(currentUser);
  }

  function renderTabContent(tab, u) {
    if (tab === 'overview') {
      if (u.role === 'reporter') return renderReporterOverview(u);
      if (u.role === 'resolver') return renderResolverOverview(u);
      if (u.role === 'admin')    return renderAdminOverview(u);
    }
    if (tab === 'reports')   return renderReporterReportsTab(u);
    if (tab === 'badges')    return renderReporterBadgesTab(u);
    if (tab === 'skills')    return renderResolverSkillsTab(u);
    if (tab === 'cases')     return renderResolverCasesTab(u);
    if (tab === 'oversight') return renderAdminOversightTab(u);
    if (tab === 'audit')     return renderAdminAuditTab(u);
    if (tab === 'settings')  return renderSettingsTab(u);
    return `<div class="profile-card"><p>Tab content not found.</p></div>`;
  }

  /* ── 1. REPORTER TAB RENDERERS ── */
  function renderReporterOverview(u) {
    const reports = DB.get('reports') || [];
    const myReports = reports.filter(r => r.reporter_id === u.id);
    const resolvedCount = myReports.filter(r => r.status === 'resolved').length;
    const inProgressCount = myReports.filter(r => r.status === 'inprogress').length;
    const resRate = myReports.length ? Math.round((resolvedCount / myReports.length) * 100) : 0;
    const proposals = DB.get('proposals') || [];

    return `
      <!-- Stats Grid -->
      <div class="profile-stats-grid">
        <div class="pstat-card">
          <div class="pstat-icon icon-blue">📋</div>
          <div>
            <div class="pstat-val">${myReports.length}</div>
            <div class="pstat-label">Reports Submitted</div>
            <div class="pstat-sub">${resolvedCount} resolved • ${inProgressCount} active</div>
          </div>
        </div>
        <div class="pstat-card">
          <div class="pstat-icon icon-green">✅</div>
          <div>
            <div class="pstat-val">${resRate}%</div>
            <div class="pstat-label">Resolution Rate</div>
            <div class="pstat-sub">Campus average: 82%</div>
          </div>
        </div>
        <div class="pstat-card">
          <div class="pstat-icon icon-amber">⭐</div>
          <div>
            <div class="pstat-val">${u.reputation_points || 540}</div>
            <div class="pstat-label">Reputation XP</div>
            <div class="pstat-sub">Level 4 Campus Champion</div>
          </div>
        </div>
        <div class="pstat-card">
          <div class="pstat-icon icon-purple">🗳️</div>
          <div>
            <div class="pstat-val">3</div>
            <div class="pstat-label">Budget Votes</div>
            <div class="pstat-sub">Participatory democracy</div>
          </div>
        </div>
      </div>

      <div class="profile-content-grid">
        <!-- Left: Recent Activity & Reports -->
        <div>
          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>🕒</span> Recent Issue Submissions</div>
              <button class="btn btn-ghost btn-sm" data-page="submit">+ New Report</button>
            </div>
            ${myReports.length === 0 ? `
              <p style="color:var(--text-muted);font-size:13px;text-align:center;padding:24px 0;">No reports filed yet. Notice a problem on campus? Click above to report!</p>
            ` : myReports.slice(0, 4).map(r => `
              <div class="activity-item">
                <div class="activity-icon-bubble">${CAT_META[r.category]?.icon || '📋'}</div>
                <div class="activity-body">
                  <div class="activity-title-row">
                    <span class="activity-title">${r.title}</span>
                    ${statusBadge(r.status)}
                  </div>
                  <div class="activity-meta">
                    <span>📍 ${r.location?.label || 'Campus'}</span> •
                    <span>🕒 ${timeAgo(r.created_at)}</span> •
                    <span>${r.anonymous ? '🔒 Anonymous' : 'Public'}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>🗳️</span> Participatory Budgeting Activity</div>
              <button class="btn btn-ghost btn-sm" data-page="budget">View All Proposals →</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:12px 16px;display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <div style="font-size:13px;font-weight:700;color:var(--text-primary);">Campus-wide WiFi Repeater Network</div>
                  <div style="font-size:11px;color:var(--text-muted);">Budget Ask: ₹180K • 247 votes cast</div>
                </div>
                <span class="badge badge-inprogress">Voting Open</span>
              </div>
              <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:12px 16px;display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <div style="font-size:13px;font-weight:700;color:var(--text-primary);">Hostel A Electrical Rewiring Project</div>
                  <div style="font-size:11px;color:var(--text-muted);">Budget: ₹320K • Approved by Administration</div>
                </div>
                <span class="badge badge-resolved">Funded & Approved</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Profile Info & Badges Showcase -->
        <div>
          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>👤</span> Student Details</div>
            </div>
            <div class="kv-list">
              <div class="kv-row">
                <span class="kv-key">Email:</span>
                <span class="kv-val">${u.email}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Phone:</span>
                <span class="kv-val">${u.phone || 'Not set'}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Branch:</span>
                <span class="kv-val">${u.designation || 'Engineering'}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Roll No / ID:</span>
                <span class="kv-val">${u.id_number || 'GU-2023-CS-0842'}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Campus Room:</span>
                <span class="kv-val">${u.location || 'Hostel A'}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Member Since:</span>
                <span class="kv-val">${u.joined_date || 'Aug 2023'}</span>
              </div>
            </div>
          </div>

          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>🏆</span> Top Achievements</div>
            </div>
            <div class="badge-shelf">
              <div class="badge-rack-card">
                <span class="badge-icon-lg">🚀</span>
                <div class="badge-name">First Responder</div>
                <div class="badge-desc">Filed first verified campus report</div>
              </div>
              <div class="badge-rack-card">
                <span class="badge-icon-lg">🎯</span>
                <div class="badge-name">Eagle Eye</div>
                <div class="badge-desc">95%+ AI auto-routing confidence</div>
              </div>
              <div class="badge-rack-card">
                <span class="badge-icon-lg">🗳️</span>
                <div class="badge-name">Civic Pioneer</div>
                <div class="badge-desc">Active in campus budget voting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderReporterReportsTab(u) {
    const reports = DB.get('reports') || [];
    const myReports = reports.filter(r => r.reporter_id === u.id);

    return `
      <div class="profile-card">
        <div class="profile-card-header">
          <div class="profile-card-title"><span>📋</span> All Reports Filed by You (${myReports.length})</div>
          <button class="btn btn-primary btn-sm" data-page="submit">+ File New Ticket</button>
        </div>
        ${myReports.length === 0 ? `
          <p style="text-align:center;padding:40px;color:var(--text-muted);">You have not filed any reports yet.</p>
        ` : `
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${myReports.map(r => `
              <div class="activity-item">
                <div class="activity-icon-bubble">${CAT_META[r.category]?.icon || '📋'}</div>
                <div class="activity-body">
                  <div class="activity-title-row">
                    <span class="activity-title" style="font-size:15px;">${r.title}</span>
                    <div style="display:flex;gap:6px;align-items:center;">
                      ${statusBadge(r.status)}
                      ${r.anonymous ? '<span class="anon-pill" style="font-size:10px;">🔒 Anon</span>' : ''}
                    </div>
                  </div>
                  <p style="font-size:13px;color:var(--text-secondary);margin:6px 0;">${r.description}</p>
                  <div class="activity-meta" style="display:flex;gap:12px;flex-wrap:wrap;">
                    <span>📍 ${r.location?.label || 'Campus'}</span>
                    <span>🏛️ Dept: <strong>${(DB.find('departments', r.dept_id)||{}).name || 'Pending'}</strong></span>
                    <span>🕒 Filed ${timeAgo(r.created_at)}</span>
                    ${slaChip(r)}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  function renderReporterBadgesTab(u) {
    const BADGE_DEFS = [
      { id: 'first_responder', icon: '🚀', name: 'First Responder', desc: 'Submitted your first verified campus issue report.', tier: 'Gold' },
      { id: 'eagle_eye',       icon: '🎯', name: 'Eagle Eye', desc: 'Maintained 90%+ AI category classification accuracy.', tier: 'Platinum' },
      { id: 'civic_pioneer',   icon: '🗳️', name: 'Civic Pioneer', desc: 'Voted on 3 or more campus participatory budget proposals.', tier: 'Silver' },
      { id: 'eco_guardian',    icon: '🌿', name: 'Eco Guardian', desc: 'Reported cleanliness & recycling improvements on campus.', tier: 'Gold' },
      { id: 'community_pillar',icon: '🏛️', name: 'Community Pillar', desc: 'Recognized in top 5% most helpful campus reporters.', tier: 'Diamond' },
      { id: 'night_watch',     icon: '🌙', name: 'Night Watchman', desc: 'Reported safety or lighting issues in evening hours.', tier: 'Bronze' },
    ];

    const userBadges = new Set(u.badges || ['first_responder', 'eagle_eye']);

    return `
      <div class="profile-card">
        <div class="profile-card-header">
          <div class="profile-card-title"><span>🏆</span> CampusFix Civic Badges & Honors</div>
          <span style="font-size:12px;color:var(--color-primary-light);font-weight:700;">Unlocked: ${userBadges.size} / ${BADGE_DEFS.length}</span>
        </div>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:var(--space-6);">Earn badges and reputation XP by filing high-quality reports, verifying campus improvements, and participating in university voting.</p>
        <div class="badge-shelf" style="grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:var(--space-4);">
          ${BADGE_DEFS.map(b => {
            const unlocked = userBadges.has(b.id);
            return `
              <div class="badge-rack-card" style="${unlocked ? 'border-color:hsla(245,80%,60%,.4);' : 'opacity:.45;filter:grayscale(0.8);'}">
                <span class="badge-icon-lg">${b.icon}</span>
                <div class="badge-name">${b.name}</div>
                <div style="font-size:10px;font-weight:700;color:${unlocked ? 'var(--color-accent)' : 'var(--text-muted)'};margin-top:2px;">[${b.tier}] ${unlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}</div>
                <div class="badge-desc">${b.desc}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  /* ── 2. SOLVER (RESOLVER) TAB RENDERERS ── */
  function renderResolverOverview(u) {
    const dept = DB.find('departments', u.dept || 'd1') || { name: 'Facilities & Maintenance', sla_hours: 24 };
    const reports = DB.get('reports') || [];
    const deptReports = reports.filter(r => r.dept_id === dept.id);
    const activeCases = deptReports.filter(r => ['reported','acknowledged','inprogress'].includes(r.status));
    const resolvedCases = deptReports.filter(r => r.status === 'resolved');

    return `
      <!-- Solver Stats Grid -->
      <div class="profile-stats-grid">
        <div class="pstat-card">
          <div class="pstat-icon icon-green">⚡</div>
          <div>
            <div class="pstat-val">${u.sla_compliance || 97.4}%</div>
            <div class="pstat-label">SLA Compliance</div>
            <div class="pstat-sub">Target SLA: ${dept.sla_hours}h max</div>
          </div>
        </div>
        <div class="pstat-card">
          <div class="pstat-icon icon-blue">⏱️</div>
          <div>
            <div class="pstat-val">${u.avg_response_hrs || 2.1}h</div>
            <div class="pstat-label">Avg Turnaround</div>
            <div class="pstat-sub">Top 5% fastest across campus</div>
          </div>
        </div>
        <div class="pstat-card">
          <div class="pstat-icon icon-purple">🛠️</div>
          <div>
            <div class="pstat-val">${u.resolved_count || resolvedCases.length + 140}</div>
            <div class="pstat-label">Total Resolved</div>
            <div class="pstat-sub">100% verified with photo proof</div>
          </div>
        </div>
        <div class="pstat-card">
          <div class="pstat-icon icon-amber">⭐</div>
          <div>
            <div class="pstat-val">${u.rating || 4.9} / 5.0</div>
            <div class="pstat-label">Satisfaction Rating</div>
            <div class="pstat-sub">From 64 student reviews</div>
          </div>
        </div>
      </div>

      <div class="profile-content-grid">
        <!-- Left: Duty Status & Live Queue -->
        <div>
          <!-- Live Duty Status Box -->
          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>📡</span> Solver Operational Duty Status</div>
              <span style="font-size:12px;color:var(--text-muted);">${u.shift_hours || 'Shift Alpha (08:00 - 17:00)'}</span>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
              <div>
                <div style="font-size:14px;font-weight:700;color:var(--text-primary);">Current Shift Readiness:</div>
                <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">Dispatches and emergency tickets route to active solvers.</div>
              </div>
              <div class="duty-status-selector" id="duty-toggle-group">
                <button class="duty-opt duty-on ${u.duty_status === 'on_duty' || !u.duty_status ? 'active' : ''}" data-duty="on_duty">
                  <span>🟢</span> On Duty
                </button>
                <button class="duty-opt duty-break ${u.duty_status === 'on_break' ? 'active' : ''}" data-duty="on_break">
                  <span>🟡</span> Break
                </button>
                <button class="duty-opt duty-off ${u.duty_status === 'off_duty' ? 'active' : ''}" data-duty="off_duty">
                  <span>⚪</span> Off Duty
                </button>
              </div>
            </div>
          </div>

          <!-- Active Cases in Solver Dept -->
          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>🛠️</span> Active Tickets in ${dept.name} (${activeCases.length})</div>
              <button class="btn btn-ghost btn-sm" data-page="dept">Open Full Dept Queue →</button>
            </div>
            ${activeCases.length === 0 ? `
              <p style="text-align:center;padding:24px;color:var(--text-muted);">Queue is clear! All assigned department tickets resolved.</p>
            ` : activeCases.slice(0, 3).map(r => `
              <div class="activity-item">
                <div class="activity-icon-bubble">${CAT_META[r.category]?.icon || '🔧'}</div>
                <div class="activity-body">
                  <div class="activity-title-row">
                    <span class="activity-title">${r.title}</span>
                    ${statusBadge(r.status)}
                  </div>
                  <div class="activity-meta">
                    <span>📍 ${r.location?.label || 'Campus'}</span> •
                    <span>🕒 ${timeAgo(r.created_at)}</span> •
                    ${slaChip(r)}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Dept info & Skills shelf -->
        <div>
          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>🏛️</span> Department Info</div>
            </div>
            <div class="kv-list">
              <div class="kv-row">
                <span class="kv-key">Department:</span>
                <span class="kv-val">${dept.name}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Department Lead:</span>
                <span class="kv-val">${dept.head || u.name}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Staff ID:</span>
                <span class="kv-val">${u.id_number || 'GU-STAFF-001'}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">SLA Window:</span>
                <span class="kv-val">${dept.sla_hours} Hours Target</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Assigned Zones:</span>
                <span class="kv-val">${(u.assigned_zones||['Library, Hostels A/B']).join(', ')}</span>
              </div>
            </div>
          </div>

          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>⚡</span> Technical Specializations</div>
            </div>
            <div class="skill-tag-shelf">
              ${(u.skills || ['Electrical Grids', 'Substation Ops', 'Plumbing', 'HVAC']).map(s => `
                <span class="skill-tag">✓ ${s}</span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderResolverSkillsTab(u) {
    const certs = u.certifications || [
      'Licensed Master Electrician (Grade A)',
      'Campus Safety ISO 45001 Auditor',
      'First Aid & Emergency Triage Responder'
    ];

    return `
      <div class="profile-content-grid">
        <div class="profile-card">
          <div class="profile-card-header">
            <div class="profile-card-title"><span>📜</span> Verified Certifications & Licenses</div>
            <span class="badge badge-resolved">Institutional Clearance Active</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${certs.map(c => `
              <div class="cert-item">
                <div class="cert-badge">🏅</div>
                <div>
                  <div class="cert-name">${c}</div>
                  <div class="cert-issuer">Issued by Greenfield University Facility Operations Board • Verified</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="profile-card">
          <div class="profile-card-header">
            <div class="profile-card-title"><span>🛠️</span> Technical Skills Inventory</div>
          </div>
          <div class="skill-tag-shelf" style="margin-bottom:16px;">
            ${(u.skills || ['High Voltage', 'Fiber Network', 'Substation', 'HVAC']).map(s => `
              <span class="skill-tag" style="font-size:13px;padding:6px 14px;">⚡ ${s}</span>
            `).join('')}
          </div>
          <p style="font-size:12px;color:var(--text-muted);">Skills allow the AI auto-routing engine to assign specialized tickets directly to your queue.</p>
        </div>
      </div>
    `;
  }

  function renderResolverCasesTab(u) {
    const statusUpdates = DB.get('statusUpdates') || [];
    const myUpdates = statusUpdates.filter(su => su.actor_id === u.id || su.to === 'resolved');

    return `
      <div class="profile-card">
        <div class="profile-card-header">
          <div class="profile-card-title"><span>📸</span> Verified Resolution Showcase & Logs</div>
          <button class="btn btn-primary btn-sm" data-page="dept">Manage Live Dept Queue</button>
        </div>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:var(--space-5);">Every resolved ticket logs timestamped proof and resolver notes for public campus transparency.</p>
        
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${myUpdates.slice(0, 5).map(su => {
            const report = DB.find('reports', su.report_id);
            return `
              <div class="activity-item">
                <div class="activity-icon-bubble">✅</div>
                <div class="activity-body">
                  <div class="activity-title-row">
                    <span class="activity-title">${report?.title || 'Campus Infrastructure Case'}</span>
                    <span class="badge badge-resolved">${su.to.toUpperCase()}</span>
                  </div>
                  <p style="font-size:13px;color:var(--text-secondary);margin:4px 0;">"${su.note || 'Work completed as per University SLA standard.'}"</p>
                  <div class="activity-meta">
                    <span>🕒 Completed ${timeAgo(su.timestamp)}</span> •
                    <span>📷 Photographic evidence verified</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  /* ── 3. ADMINISTRATION TAB RENDERERS ── */
  function renderAdminOverview(u) {
    const budgetCycle = (DB.get('budgetCycles') || [])[0] || { envelope: 1200000, allocated: 470000, spent: 293500 };
    const departments = DB.get('departments') || [];
    const reports = DB.get('reports') || [];
    const deptsCount = departments.length;
    const auditLogs = DB.get('auditLog') || [];

    const spentPct = Math.round((budgetCycle.spent / budgetCycle.envelope) * 100);
    const allocPct = Math.round((budgetCycle.allocated / budgetCycle.envelope) * 100);

    return `
      <!-- Admin Stats Grid -->
      <div class="profile-stats-grid">
        <div class="pstat-card">
          <div class="pstat-icon icon-amber">🏛️</div>
          <div>
            <div class="pstat-val">${formatCurrency(budgetCycle.envelope)}</div>
            <div class="pstat-label">Budget Envelope</div>
            <div class="pstat-sub">${formatCurrency(budgetCycle.allocated)} allocated to proposals</div>
          </div>
        </div>
        <div class="pstat-card">
          <div class="pstat-icon icon-green">📊</div>
          <div>
            <div class="pstat-val">${u.campus_sla_health || 94.6}%</div>
            <div class="pstat-label">Campus SLA Health</div>
            <div class="pstat-sub">Across 5 university departments</div>
          </div>
        </div>
        <div class="pstat-card">
          <div class="pstat-icon icon-blue">👥</div>
          <div>
            <div class="pstat-val">8 Resolvers</div>
            <div class="pstat-label">Active Field Staff</div>
            <div class="pstat-sub">Facilities, IT, Security, Sanitation</div>
          </div>
        </div>
        <div class="pstat-card">
          <div class="pstat-icon icon-purple">🤖</div>
          <div>
            <div class="pstat-val">92.5%</div>
            <div class="pstat-label">AI Routing Precision</div>
            <div class="pstat-sub">1 ticket in admin review queue</div>
          </div>
        </div>
      </div>

      <div class="profile-content-grid">
        <!-- Left: Budget Oversight & SLA Health -->
        <div>
          <!-- Budget Meter -->
          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>💰</span> University Participatory Budget Status</div>
              <button class="btn btn-ghost btn-sm" data-page="budget">Open Budget Desk →</button>
            </div>
            <div class="budget-meter-container">
              <div class="budget-meter-header">
                <span>Total Cycle Envelope: ${formatCurrency(budgetCycle.envelope)}</span>
                <span style="color:var(--color-success);">${spentPct}% Utilized</span>
              </div>
              <div class="progress-bar" style="height:10px;margin-bottom:8px;">
                <div class="progress-fill" style="width:${allocPct}%;background:var(--color-primary);"></div>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);">
                <span>Spent: <strong style="color:var(--text-primary);">${formatCurrency(budgetCycle.spent)}</strong></span>
                <span>Allocated: <strong style="color:var(--color-primary-light);">${formatCurrency(budgetCycle.allocated)}</strong></span>
                <span>Remaining: <strong style="color:var(--color-success);">${formatCurrency(budgetCycle.envelope - budgetCycle.allocated)}</strong></span>
              </div>
            </div>
          </div>

          <!-- Department SLA Meters -->
          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>⚡</span> Department SLA Compliance Matrix</div>
              <button class="btn btn-ghost btn-sm" data-page="admin">Governance Panel →</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${departments.map(d => {
                const health = d.id === 'd4' ? 99 : d.id === 'd2' ? 98 : d.id === 'd1' ? 97 : 91;
                return `
                  <div class="dept-health-row">
                    <div class="dept-health-info">
                      <span style="font-size:1.3rem;">${d.icon}</span>
                      <div>
                        <div style="font-size:13px;font-weight:700;color:var(--text-primary);">${d.name}</div>
                        <div style="font-size:11px;color:var(--text-muted);">Lead: ${d.head} • SLA: ${d.sla_hours}h</div>
                      </div>
                    </div>
                    <div style="text-align:right;">
                      <span style="font-size:13px;font-weight:700;color:${health > 95 ? 'var(--color-success)' : 'var(--color-warning)'}">${health}%</span>
                      <div style="font-size:10px;color:var(--text-muted);">on-time</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Right: Executive info & Tools -->
        <div>
          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>🛡️</span> Administrative Authority</div>
            </div>
            <div class="kv-list">
              <div class="kv-row">
                <span class="kv-key">Clearance Level:</span>
                <span class="kv-val" style="color:var(--color-accent);">${u.clearance_level || 'Level 3 Super Admin'}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Institution Email:</span>
                <span class="kv-val">${u.email}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Office:</span>
                <span class="kv-val">${u.location || 'Admin Block — Suite 401'}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Audit Logs Access:</span>
                <span class="kv-val">Full Read/Write</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Budget Authority:</span>
                <span class="kv-val">Sign-off Enabled</span>
              </div>
            </div>
          </div>

          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>⚡</span> Executive Actions</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <button class="btn btn-ghost w-full" id="btn-export-data" style="justify-content:flex-start;">
                <span>💾</span> Export Campus Data (JSON)
              </button>
              <button class="btn btn-ghost w-full" id="btn-broadcast-alert" style="justify-content:flex-start;">
                <span>📢</span> Broadcast Campus Notice
              </button>
              <button class="btn btn-ghost w-full" data-page="admin" style="justify-content:flex-start;">
                <span>🛡️</span> Open Admin Review Queue
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderAdminOversightTab(u) {
    const departments = DB.get('departments') || [];
    return `
      <div class="profile-card">
        <div class="profile-card-header">
          <div class="profile-card-title"><span>🏛️</span> University Department Governance Directory</div>
          <button class="btn btn-primary btn-sm" data-page="admin">Manage Routing & SLAs</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:var(--space-4);margin-top:var(--space-4);">
          ${departments.map(d => `
            <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:var(--space-4);">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                <span style="font-size:1.8rem;">${d.icon}</span>
                <div>
                  <div style="font-weight:700;font-size:14px;color:var(--text-primary);">${d.name}</div>
                  <div style="font-size:11px;color:var(--color-primary-light);">Lead: ${d.head}</div>
                </div>
              </div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:8px;">
                <div>⏱️ SLA Commitment: <strong>${d.sla_hours} hours</strong></div>
                <div style="margin-top:4px;">🏷️ Categories: ${d.categories.join(', ')}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderAdminAuditTab(u) {
    const auditLogEntries = DB.get('auditLog') || [];
    return `
      <div class="profile-card">
        <div class="profile-card-header">
          <div class="profile-card-title"><span>📜</span> Campus Immutable Governance Audit Stream</div>
          <span style="font-size:12px;color:var(--text-muted);">${auditLogEntries.length} logged actions</span>
        </div>
        <div class="admin-table-wrap" style="max-height:450px;overflow-y:auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Target</th>
                <th>Metadata</th>
              </tr>
            </thead>
            <tbody>
              ${auditLogEntries.slice().reverse().map(e => `
                <tr>
                  <td class="text-muted" style="white-space:nowrap;font-size:11px;">${timeAgo(e.timestamp)}</td>
                  <td style="font-weight:600;font-size:12px;">${e.actor_id}</td>
                  <td><span class="badge" style="font-size:10px;">${e.action}</span></td>
                  <td style="font-size:12px;color:var(--color-primary-light);">${e.entity_type} #${e.entity_id}</td>
                  <td style="font-size:11px;color:var(--text-muted);">${JSON.stringify(e.meta||{})}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ── 4. SETTINGS & PRIVACY TAB ── */
  function renderSettingsTab(u) {
    const isReporter = u.role === 'reporter';
    const isResolver = u.role === 'resolver';
    const isAdmin    = u.role === 'admin';
    const prefs = u.preferences || {};

    return `
      <div class="profile-content-grid">
        <div>
          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>🔔</span> Notifications & Alert Channels</div>
            </div>
            
            <div class="pref-row">
              <div>
                <div class="pref-title">Email Notifications</div>
                <div class="pref-sub">Receive instant status updates on your filed tickets to ${u.email}</div>
              </div>
              <label class="switch">
                <input type="checkbox" id="pref-email" ${prefs.notify_email !== false ? 'checked' : ''} />
                <span class="switch-slider"></span>
              </label>
            </div>

            <div class="pref-row">
              <div>
                <div class="pref-title">SMS & Urgent Alerts</div>
                <div class="pref-sub">Direct SMS dispatches for critical safety and facility updates</div>
              </div>
              <label class="switch">
                <input type="checkbox" id="pref-sms" ${prefs.notify_sms ? 'checked' : ''} />
                <span class="switch-slider"></span>
              </label>
            </div>

            ${isReporter ? `
              <div class="pref-row">
                <div>
                  <div class="pref-title">Default to Anonymous Reporting</div>
                  <div class="pref-sub">Hide your student identity from the public feed by default</div>
                </div>
                <label class="switch">
                  <input type="checkbox" id="pref-anon" ${prefs.default_anon ? 'checked' : ''} />
                  <span class="switch-slider"></span>
                </label>
              </div>
            ` : ''}

            ${isResolver ? `
              <div class="pref-row">
                <div>
                  <div class="pref-title">Auto-Accept Critical Safety Dispatches</div>
                  <div class="pref-sub">Automatically assign high-severity safety alerts to your shift queue</div>
                </div>
                <label class="switch">
                  <input type="checkbox" id="pref-auto-accept" ${prefs.auto_accept_critical !== false ? 'checked' : ''} />
                  <span class="switch-slider"></span>
                </label>
              </div>
            ` : ''}

            <div style="margin-top:var(--space-6);display:flex;justify-content:flex-end;">
              <button class="btn btn-primary" id="btn-save-prefs">Save Preferences</button>
            </div>
          </div>
        </div>

        <div>
          <div class="profile-card">
            <div class="profile-card-header">
              <div class="profile-card-title"><span>🔒</span> Security & Account</div>
            </div>
            <div class="kv-list">
              <div class="kv-row">
                <span class="kv-key">Auth Mode:</span>
                <span class="kv-val">College SSO OTP</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Account Role:</span>
                <span class="kv-val" style="text-transform:uppercase;">${u.role}</span>
              </div>
              <div class="kv-row">
                <span class="kv-key">Security Status:</span>
                <span class="kv-val" style="color:var(--color-success);">✓ Protected</span>
              </div>
            </div>
            <div style="margin-top:var(--space-6);">
              <button class="btn btn-danger w-full" id="btn-settings-logout">Sign Out of CampusFix</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ── 5. EVENT BINDING ── */
  function bindProfileEvents(u) {
    // Tab switching
    root.querySelectorAll('[data-ptab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.ptab;
        render();
      });
    });

    // Edit Profile Modal
    const modal = document.getElementById('edit-profile-modal');
    const openModal = () => modal.classList.remove('hidden');
    const closeModal = () => modal.classList.add('hidden');

    document.getElementById('btn-edit-profile')?.addEventListener('click', openModal);
    document.getElementById('profile-avatar-btn')?.addEventListener('click', openModal);
    document.getElementById('edit-modal-close')?.addEventListener('click', closeModal);
    document.getElementById('edit-modal-cancel')?.addEventListener('click', closeModal);

    // Avatar picker selection
    let selectedEmoji = u.avatar || '🧑‍💻';
    root.querySelectorAll('.avatar-choice').forEach(choice => {
      choice.addEventListener('click', () => {
        root.querySelectorAll('.avatar-choice').forEach(c => c.classList.remove('selected'));
        choice.classList.add('selected');
        selectedEmoji = choice.dataset.emoji;
      });
    });

    // Edit profile form submit
    document.getElementById('edit-profile-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        name: document.getElementById('ep-name').value.trim(),
        phone: document.getElementById('ep-phone').value.trim(),
        designation: document.getElementById('ep-designation').value.trim(),
        location: document.getElementById('ep-location').value.trim(),
        bio: document.getElementById('ep-bio').value.trim(),
        avatar: selectedEmoji,
      };

      const skillsInput = document.getElementById('ep-skills');
      if (skillsInput) {
        updated.skills = skillsInput.value.split(',').map(s => s.trim()).filter(Boolean);
      }

      // Update in DB and Auth
      DB.update('users', u.id, updated);
      const newAuth = { ...u, ...updated };
      Auth.login(newAuth);
      auditLog('PROFILE_UPDATED', u.id, 'User', u.id, { name: updated.name });

      showToast('success', 'Profile Updated ✓', 'Your changes have been saved.');
      closeModal();
      _updateNav('profile');
      render();
    });

    // Duty status toggle (for resolvers)
    root.querySelectorAll('[data-duty]').forEach(btn => {
      btn.addEventListener('click', () => {
        const newDuty = btn.dataset.duty;
        DB.update('users', u.id, { duty_status: newDuty });
        const newAuth = { ...u, duty_status: newDuty };
        Auth.login(newAuth);
        auditLog('DUTY_STATUS_CHANGED', u.id, 'User', u.id, { status: newDuty });
        showToast('info', 'Duty Status Changed', `Shift status updated to: ${newDuty.replace('_', ' ').toUpperCase()}`);
        render();
      });
    });

    // Share / Copy Profile ID
    document.getElementById('btn-share-profile')?.addEventListener('click', () => {
      const info = `CampusFix Profile: ${u.name} | ${u.role.toUpperCase()} | ID: ${u.id_number || u.id} | Email: ${u.email}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(info).then(() => {
          showToast('success', 'ID Copied!', 'Profile ID & credentials copied to clipboard.');
        }).catch(() => {
          showToast('info', 'Profile ID', info);
        });
      } else {
        showToast('info', 'Profile ID', info);
      }
    });

    // Save preferences
    document.getElementById('btn-save-prefs')?.addEventListener('click', () => {
      const emailPref = document.getElementById('pref-email')?.checked;
      const smsPref   = document.getElementById('pref-sms')?.checked;
      const anonPref  = document.getElementById('pref-anon')?.checked;
      const autoPref  = document.getElementById('pref-auto-accept')?.checked;

      const newPrefs = {
        ...(u.preferences || {}),
        notify_email: emailPref,
        notify_sms: smsPref,
        default_anon: anonPref,
        auto_accept_critical: autoPref,
      };

      DB.update('users', u.id, { preferences: newPrefs });
      Auth.login({ ...u, preferences: newPrefs });
      showToast('success', 'Preferences Saved', 'Your privacy and notification settings are updated.');
    });

    // Data Export (for admin)
    document.getElementById('btn-export-data')?.addEventListener('click', () => {
      const exportPayload = {
        exported_at: new Date().toISOString(),
        exported_by: u.name,
        users: DB.get('users'),
        departments: DB.get('departments'),
        reports: DB.get('reports'),
        proposals: DB.get('proposals'),
        auditLog: DB.get('auditLog'),
      };
      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `campusfix-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      auditLog('CAMPUS_DATA_EXPORTED', u.id, 'System', 'ALL', { count: exportPayload.reports?.length });
      showToast('success', 'Data Exported!', 'Full CampusFix database downloaded as JSON.');
    });

    // Broadcast Alert (for admin)
    document.getElementById('btn-broadcast-alert')?.addEventListener('click', async () => {
      const msg = prompt('Enter campus-wide administrative announcement:');
      if (msg && msg.trim()) {
        auditLog('ADMIN_BROADCAST', u.id, 'System', 'CAMPUS', { message: msg.trim() });
        showToast('warning', '📢 Campus Broadcast Sent', msg.trim(), 6000);
      }
    });

    // Logout triggers
    const doLogout = () => {
      Auth.logout();
      showToast('info', 'Signed Out', 'You have been signed out successfully.');
      navigate('landing');
    };
    document.getElementById('btn-profile-logout')?.addEventListener('click', doLogout);
    document.getElementById('btn-settings-logout')?.addEventListener('click', doLogout);
  }

  render();
}

function _ensureUserProfileFields(u) {
  if (!u) return u;
  // If user object lacks complete fields, populate defaults based on role
  const isReporter = u.role === 'reporter';
  const isResolver = u.role === 'resolver';
  const isAdmin    = u.role === 'admin';

  return {
    ...u,
    phone: u.phone || '+91 98765 00000',
    id_number: u.id_number || (isReporter ? 'GU-2023-ST-041' : isResolver ? 'GU-STAFF-022' : 'GU-EXEC-001'),
    designation: u.designation || (isReporter ? 'B.Tech Student' : isResolver ? 'Field Operations Lead' : 'Campus Administrator'),
    location: u.location || (isReporter ? 'Hostel Complex' : isResolver ? 'Operations Workshop' : 'Admin Tower Suite 401'),
    bio: u.bio || (isReporter ? 'Active student reporter advocating for campus improvements.' : isResolver ? 'Certified department solver keeping campus running smoothly.' : 'Directing university facilities, budgets, and campus governance.'),
    joined_date: u.joined_date || 'August 2023',
    badges: u.badges || ['first_responder', 'eagle_eye', 'civic_pioneer'],
    skills: u.skills || ['Electrical Systems', 'Plumbing', 'Network Routing', 'Safety Compliance'],
    certifications: u.certifications || ['Certified Safety Specialist', 'Greenfield University Master Responder'],
    preferences: u.preferences || { notify_email: true, notify_sms: true, default_anon: false },
    duty_status: u.duty_status || 'on_duty',
    shift_hours: u.shift_hours || 'Shift Alpha (08:00 – 17:00)',
    sla_compliance: u.sla_compliance || 97.4,
    avg_response_hrs: u.avg_response_hrs || 2.1,
    resolved_count: u.resolved_count || 148,
    rating: u.rating || 4.9,
  };
}
