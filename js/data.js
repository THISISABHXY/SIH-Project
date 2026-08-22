// ── Seed data initializer ──────────────────────────────────
function initSeedData() {
  const isSeeded = localStorage.getItem('campusfix_seeded');
  const storedUsers = DB.get('users');
  const storedReports = DB.get('reports');
  // If seeded but missing rich profile schema, unique_id or still using legacy Delhi coordinates, refresh seed
  if (isSeeded && storedUsers && storedUsers.length >= 9 && storedUsers[0].phone && storedReports && storedReports[0]?.location?.lat < 25) return;

  const now = Date.now();
  const h = (n) => now - n * 3600000;

  // --- Users ---
  const users = [
    {
      id: 'u1', email: 'arjun.k@greenfield.edu', name: 'Arjun Kumar', role: 'reporter', avatar: '🧑‍💻',
      phone: '+91 98765 43210', id_number: 'GU-2023-CS-0842',
      designation: 'B.Tech Computer Science (3rd Year)', location: 'Hostel A — Room 314',
      bio: 'Passionate about improving campus facilities, smart infrastructure, and student living conditions.',
      joined_date: 'August 2023', reputation_points: 540,
      badges: ['first_responder', 'eagle_eye', 'civic_pioneer', 'eco_guardian', 'community_pillar'],
      preferences: { notify_email: true, notify_sms: true, default_anon: false, lang: 'en', auto_cluster_alerts: true }
    },
    {
      id: 'u2', email: 'priya.s@greenfield.edu', name: 'Priya Singh', role: 'reporter', avatar: '👩‍🎓',
      phone: '+91 98765 43211', id_number: 'GU-2024-EC-0119',
      designation: 'B.Tech Electronics & Comm. (2nd Year)', location: 'Hostel B — Room 208',
      bio: 'Advocate for sustainable, clean, and accessible campus spaces for all students.',
      joined_date: 'July 2024', reputation_points: 380,
      badges: ['first_responder', 'eco_guardian', 'civic_pioneer'],
      preferences: { notify_email: true, notify_sms: false, default_anon: false, lang: 'en', auto_cluster_alerts: true }
    },
    {
      id: 'u3', email: 'ravi.m@greenfield.edu', name: 'Ravi Mehta', role: 'reporter', avatar: '🧑‍🎓',
      phone: '+91 98765 43212', id_number: 'GU-2022-ME-0451',
      designation: 'B.Tech Mechanical Engineering (4th Year)', location: 'Hostel C — Room 102',
      bio: 'Student council representative focusing on library facilities, sports complex, and dining hygiene.',
      joined_date: 'August 2022', reputation_points: 620,
      badges: ['first_responder', 'civic_pioneer', 'community_pillar', 'eagle_eye'],
      preferences: { notify_email: true, notify_sms: true, default_anon: true, lang: 'hi', auto_cluster_alerts: true }
    },
    {
      id: 'u4', email: 'neha.t@greenfield.edu', name: 'Neha Tiwari', role: 'reporter', avatar: '👩‍💻',
      phone: '+91 98765 43213', id_number: 'GU-2023-BT-0932',
      designation: 'M.Tech Biotechnology (1st Year)', location: 'PG Hostel — Block D',
      bio: 'Laboratory research scholar; monitoring lab maintenance, safety equipment, and bio-waste management.',
      joined_date: 'August 2023', reputation_points: 410,
      badges: ['first_responder', 'eagle_eye', 'eco_guardian'],
      preferences: { notify_email: true, notify_sms: true, default_anon: false, lang: 'en', auto_cluster_alerts: false }
    },
    {
      id: 'u5', email: 'john.d@greenfield.edu', unique_id: 'FAC-8821', name: 'John D\'souza', role: 'resolver', dept: 'd1', avatar: '🔧',
      phone: '+91 98765 11223', id_number: 'GU-STAFF-FM-104',
      designation: 'Senior Facilities Lead & Master Electrician', location: 'Facilities Workshop — Block B',
      bio: '12+ years maintaining campus electrical grids, backup generators, high-voltage transformers, and plumbing.',
      joined_date: 'January 2018', duty_status: 'on_duty', shift_hours: '08:00 AM – 05:00 PM (Shift Alpha)',
      sla_compliance: 97.4, avg_response_hrs: 2.1, resolved_count: 148, active_queue_count: 3, rating: 4.9,
      skills: ['High Voltage Electricals', 'Substation Maintenance', 'Commercial Plumbing', 'HVAC Chillers', 'Fire Suppression'],
      certifications: ['Licensed Master Electrician (Grade A)', 'Campus Safety ISO 45001 Auditor', 'First Aid Certified'],
      assigned_zones: ['Hostels A, B & C', 'Main Academic Quad', 'Engineering Labs'],
      preferences: { urgent_sms: true, sound_alerts: true, auto_accept_critical: true, lang: 'en' }
    },
    {
      id: 'u6', email: 'it.team@greenfield.edu', unique_id: 'IT-4402', name: 'IT Support Team', role: 'resolver', dept: 'd2', avatar: '💻',
      phone: '+91 98765 44556', id_number: 'GU-STAFF-IT-220',
      designation: 'Campus Network & Systems Operations', location: 'Server Room & NOC — CS Block',
      bio: 'Managing 120+ access points, 10Gbps fiber backbone, e-library proxies, classroom smart boards, and lab rigs.',
      joined_date: 'March 2020', duty_status: 'on_duty', shift_hours: '24/7 Rotational Operations',
      sla_compliance: 98.2, avg_response_hrs: 1.4, resolved_count: 312, active_queue_count: 2, rating: 4.85,
      skills: ['Cisco CCNA/CCNP', 'Ubiquiti Fiber APs', 'Smart Projectors', 'RADIUS Auth', 'Subnet Routing', 'DHCP/DNS'],
      certifications: ['Cisco Certified Network Associate', 'Red Hat Certified Engineer', 'Fortinet Security Expert'],
      assigned_zones: ['Library Block', 'CS Department', 'Admin Block', 'Central Auditorium'],
      preferences: { urgent_sms: true, sound_alerts: true, auto_accept_critical: true, lang: 'en' }
    },
    {
      id: 'u7', email: 'admin@greenfield.edu', unique_id: 'ADM-9901', name: 'Dr. Meera Nair', role: 'admin', avatar: '🛡️',
      phone: '+91 98765 99887', id_number: 'GU-EXEC-001',
      designation: 'Dean of Campus Infrastructure & Student Affairs', location: 'Administrative Tower — Suite 401',
      bio: 'Directing university capital works, multi-department SLA standards, participatory budgeting, and campus safety.',
      joined_date: 'July 2015', clearance_level: 'Level 3 — Super Administrator',
      governance_scope: 'All 5 Campus Departments • University Budget • Policy Execution',
      managed_budget: '₹12,00,000 (Sem I 2025-26)', campus_sla_health: 94.6,
      admin_stats: { active_resolvers: 8, total_reports_managed: 840, budget_proposals_approved: 12, ai_routing_accuracy: 92.5 },
      preferences: { daily_digest: true, emergency_sms: true, audit_broadcasts: true, lang: 'en' }
    },
    {
      id: 'u8', email: 'security@greenfield.edu', unique_id: 'SEC-9104', name: 'Campus Security', role: 'resolver', dept: 'd4', avatar: '🔒',
      phone: '+91 98765 77889', id_number: 'GU-STAFF-SEC-012',
      designation: 'Chief Security Officer & Surveillance Lead', location: 'Main Gate Control Center',
      bio: 'Overseeing perimeter security, 140+ CCTV surveillance feeds, night patrol units, and emergency response.',
      joined_date: 'November 2019', duty_status: 'on_duty', shift_hours: '24/7 Security Command Desk',
      sla_compliance: 99.1, avg_response_hrs: 0.6, resolved_count: 89, active_queue_count: 1, rating: 4.95,
      skills: ['Surveillance AI Feeds', 'Perimeter Protection', 'Emergency Lockdown', 'Crowd Management', 'Fire Drills'],
      certifications: ['Certified Protection Officer (CPO)', 'Disaster Response & Triage', 'First Aid Responder'],
      assigned_zones: ['Campus Perimeter', 'Gates 1 to 4', 'Basement Parking', 'Hostel Boundary Walls'],
      preferences: { urgent_sms: true, sound_alerts: true, auto_accept_critical: true, lang: 'en' }
    },
    {
      id: 'u9', email: 'housekeeping@greenfield.edu', unique_id: 'SAN-3319', name: 'Housekeeping & Sanitation', role: 'resolver', dept: 'd3', avatar: '🧹',
      phone: '+91 98765 33445', id_number: 'GU-STAFF-HK-055',
      designation: 'Sanitation Lead & Campus Cleanliness Officer', location: 'Central Housekeeping Hub — Block C',
      bio: 'Managing 20+ sanitation personnel, waste segregation, periodic deep cleans, and dining hall hygiene.',
      joined_date: 'February 2021', duty_status: 'on_duty', shift_hours: '06:00 AM – 03:00 PM (Shift Morning)',
      sla_compliance: 96.2, avg_response_hrs: 1.8, resolved_count: 210, active_queue_count: 2, rating: 4.8,
      skills: ['Waste Segregation', 'Deep Sanitization', 'Pest Control', 'Hazardous Waste Handling', 'Floor Care'],
      certifications: ['Hospital Grade Sanitization Protocol', 'Occupational Safety & Health (OSHA)'],
      assigned_zones: ['Canteen & Dining Area', 'Academic Restrooms', 'Hostel Corridors', 'Central Plaza'],
      preferences: { urgent_sms: true, sound_alerts: true, auto_accept_critical: true, lang: 'en' }
    },
  ];

  // --- Departments ---
  const departments = [
    { id: 'd1', name: 'Facilities & Maintenance', icon: '🔧', categories: ['electrical','plumbing','furniture','structural'], sla_hours: 24, head: 'John D\'souza' },
    { id: 'd2', name: 'IT & Network Services', icon: '💻', categories: ['it','wifi'], sla_hours: 12, head: 'IT Support Team' },
    { id: 'd3', name: 'Housekeeping & Cleanliness', icon: '🧹', categories: ['cleanliness'], sla_hours: 8, head: 'Housekeeping Dept' },
    { id: 'd4', name: 'Security & Safety', icon: '🔒', categories: ['safety'], sla_hours: 2, head: 'Campus Security' },
    { id: 'd5', name: 'Administration', icon: '🏛️', categories: ['other'], sla_hours: 48, head: 'Dr. Meera Nair' },
  ];

  // --- Clusters ---
  const clusters = [
    { id: 'cl1', report_ids: ['r1','r2','r3'], representative_id: 'r1', category: 'wifi', location: 'ITER Central Library', count: 3 },
    { id: 'cl2', report_ids: ['r4','r5'], representative_id: 'r4', category: 'electrical', location: "ITER, Boy's Hostel 6 (BH-6)", count: 2 },
  ];

  // --- Reports ---
  const reports = [
    {
      id: 'r1', cluster_id: 'cl1', category: 'it', title: 'WiFi not working in ITER Central Library',
      description: 'The WiFi has been down in the entire library for 2 days. Cannot access e-resources.',
      location: { label: 'ITER Central Library, 2nd Floor', lat: 20.248470495996642, lng: 85.80031455230156 },
      language: 'en', anonymous: false, reporter_id: 'u1',
      dept_id: 'd2', status: 'inprogress', confidence: 0.92,
      media: [], created_at: h(48), updated_at: h(5),
      cluster_count: 3,
    },
    {
      id: 'r2', cluster_id: 'cl1', category: 'it', title: 'No internet in library reading hall',
      description: 'WiFi signal completely gone since Monday morning.',
      location: { label: 'ITER Central Library Ground Floor', lat: 20.248470495996642, lng: 85.80031455230156 },
      language: 'en', anonymous: true, reporter_id: 'u2',
      dept_id: 'd2', status: 'inprogress', confidence: 0.92,
      media: [], created_at: h(46), updated_at: h(5),
      cluster_count: 3,
    },
    {
      id: 'r3', cluster_id: 'cl1', category: 'it', title: 'लाइब्रेरी पार्किंग में WiFi बंद है',
      description: 'पुस्तकालय पार्किंग क्षेत्र में इंटरनेट नहीं चल रहा। कृपया जल्दी ठीक करें।',
      location: { label: 'Library Parking area', lat: 20.248001806471862, lng: 85.80044994297329 },
      language: 'hi', anonymous: true, reporter_id: 'u3',
      dept_id: 'd2', status: 'inprogress', confidence: 0.92,
      media: [], created_at: h(44), updated_at: h(5),
      cluster_count: 3,
    },
    {
      id: 'r4', cluster_id: 'cl2', category: 'electrical', title: 'Power outage in Boy\'s Hostel 6 (BH-6)',
      description: 'Entire BH-6 block has had no power since last night. Water heaters not working.',
      location: { label: 'ITER, Boy\'s Hostel 6 (BH-6)', lat: 20.246622049860083, lng: 85.80218296098084 },
      language: 'en', anonymous: false, reporter_id: 'u4',
      dept_id: 'd1', status: 'acknowledged', confidence: 0.88,
      media: [], created_at: h(14), updated_at: h(10),
      cluster_count: 2,
    },
    {
      id: 'r5', cluster_id: 'cl2', category: 'electrical', title: 'No electricity in ITER BH-05',
      description: 'Power cut in hostel BH-05 wing, affecting 40+ students.',
      location: { label: 'ITER BH-05', lat: 20.246076389890984, lng: 85.80226879563143 },
      language: 'en', anonymous: false, reporter_id: 'u1',
      dept_id: 'd1', status: 'acknowledged', confidence: 0.88,
      media: [], created_at: h(13), updated_at: h(10),
      cluster_count: 2,
    },
    {
      id: 'r6', cluster_id: null, category: 'plumbing', title: 'Leaking pipe in \'F\' Block Washroom',
      description: 'Water leaking from the overhead pipe in the F Block washroom. Flooded corridor.',
      location: { label: '\'F\' Block', lat: 20.248569266630494, lng: 85.80175419104118 },
      language: 'en', anonymous: false, reporter_id: 'u2',
      dept_id: 'd1', status: 'reported', confidence: 0.95,
      media: [], created_at: h(2), updated_at: h(2),
      cluster_count: 1,
    },
    {
      id: 'r7', cluster_id: null, category: 'safety', title: 'Damaged surveillance camera near Girls Hostel Gate',
      description: 'The CCTV camera near the Girls Hostel entrance gate has been damaged. Security blind spot.',
      location: { label: 'ITER GIRLS HOSTEL GATE', lat: 20.24760935445469, lng: 85.80024331172831 },
      language: 'en', anonymous: true, reporter_id: 'u3',
      dept_id: 'd4', status: 'resolved', confidence: 0.97,
      media: [], created_at: h(96), updated_at: h(12),
      cluster_count: 1,
    },
    {
      id: 'r8', cluster_id: null, category: 'cleanliness', title: 'Garbage bins overflowing near ITER Food Court',
      description: 'Bins overflowing near the food court seating area. Unhygienic conditions.',
      location: { label: 'Food Court, ITER, SIKSHA \'O\' Anusandhan', lat: 20.248174329288915, lng: 85.8022458728335 },
      language: 'en', anonymous: false, reporter_id: 'u4',
      dept_id: 'd3', status: 'resolved', confidence: 0.91,
      media: [], created_at: h(72), updated_at: h(24),
      cluster_count: 1,
    },
    {
      id: 'r9', cluster_id: null, category: 'furniture', title: 'Broken seating in SOA Auditorium',
      description: 'Multiple armrests and backrests broken in Row G of SOA Auditorium.',
      location: { label: 'SOA Auditorium', lat: 20.24916909295392, lng: 85.8015785371737 },
      language: 'en', anonymous: false, reporter_id: 'u1',
      dept_id: 'd1', status: 'inprogress', confidence: 0.84,
      media: [], created_at: h(36), updated_at: h(8),
      cluster_count: 1,
    },
    {
      id: 'r10', cluster_id: null, category: 'it', title: 'Projector bulb fused in Centre for Data Science',
      description: 'The smart projector in Data Science Lab 2 has a blown bulb. Practical session interrupted.',
      location: { label: 'Centre for Data Science', lat: 20.249471585514364, lng: 85.80127510498602 },
      language: 'en', anonymous: false, reporter_id: 'u2',
      dept_id: 'd2', status: 'acknowledged', confidence: 0.79,
      media: [], created_at: h(20), updated_at: h(18),
      cluster_count: 1,
    },
  ];

  // --- Status Updates ---
  const statusUpdates = [
    { id: 'su1', report_id: 'r1', actor_id: 'u1', from: null, to: 'reported', timestamp: h(48), note: 'Issue reported by student.', evidence_url: null },
    { id: 'su2', report_id: 'r1', actor_id: 'u6', from: 'reported', to: 'acknowledged', timestamp: h(36), note: 'Acknowledged by IT team. Investigating router fault in Library wing.', evidence_url: null },
    { id: 'su3', report_id: 'r1', actor_id: 'u6', from: 'acknowledged', to: 'inprogress', timestamp: h(10), note: 'ISP called. Core router replacement ordered. ETA: 24 hours.', evidence_url: null },
    { id: 'su4', report_id: 'r4', actor_id: 'u4', from: null, to: 'reported', timestamp: h(14), note: 'Issue filed.', evidence_url: null },
    { id: 'su5', report_id: 'r4', actor_id: 'u5', from: 'reported', to: 'acknowledged', timestamp: h(12), note: 'Electrician dispatched to Hostel A.', evidence_url: null },
    { id: 'su6', report_id: 'r7', actor_id: 'u3', from: null, to: 'reported', timestamp: h(96), note: 'Reported anonymously.', evidence_url: null },
    { id: 'su7', report_id: 'r7', actor_id: 'u8', from: 'reported', to: 'acknowledged', timestamp: h(90), note: 'Security team noted. Camera unit inspected.', evidence_url: null },
    { id: 'su8', report_id: 'r7', actor_id: 'u8', from: 'acknowledged', to: 'inprogress', timestamp: h(72), note: 'Replacement camera unit procured.', evidence_url: null },
    { id: 'su9', report_id: 'r7', actor_id: 'u8', from: 'inprogress', to: 'resolved', timestamp: h(12), note: 'New CCTV camera installed and operational. Tested successfully.', evidence_url: 'resolved_photo' },
    { id: 'su10', report_id: 'r6', actor_id: 'u2', from: null, to: 'reported', timestamp: h(2), note: 'New issue filed.', evidence_url: null },
    { id: 'su11', report_id: 'r8', actor_id: 'u4', from: null, to: 'reported', timestamp: h(72), note: 'Reported by staff.', evidence_url: null },
    { id: 'su12', report_id: 'r8', actor_id: 'u7', from: 'reported', to: 'resolved', timestamp: h(24), note: 'Garbage cleared. Daily collection schedule updated.', evidence_url: null },
  ];

  // --- Proposals ---
  const proposals = [
    {
      id: 'p1', title: 'Campus-wide WiFi Repeater Network',
      description: 'Install 12 WiFi repeaters across dead-zones identified from 15+ recurring outage reports — Library, Hostel A/B corridors, and the Sports Complex. Will eliminate the single-router bottleneck.',
      category: 'it', pattern_source: true, pattern_reports: 15,
      budget_ask: 180000, votes: 247, status: 'voting',
      funded: false, created_at: h(240),
      location: 'Campus-wide',
    },
    {
      id: 'p2', title: 'Hostel A Electrical Rewiring',
      description: 'The existing 1990s wiring in Hostel A causes recurring breaker trips and power cuts. A full rewiring project will make it safe and reliable for 200+ residents.',
      category: 'electrical', pattern_source: true, pattern_reports: 8,
      budget_ask: 320000, votes: 189, status: 'approved',
      funded: true, allocated: 320000, spent: 145000, created_at: h(360),
      location: 'Hostel A',
    },
    {
      id: 'p3', title: 'Smart Dustbin System for Canteen',
      description: 'Replace 8 overflowing bins with IoT-enabled compacting dustbins that alert housekeeping when 80% full. Recurring cleanliness reports in canteen area motivated this.',
      category: 'cleanliness', pattern_source: true, pattern_reports: 11,
      budget_ask: 95000, votes: 134, status: 'voting',
      funded: false, created_at: h(180),
      location: 'Student Canteen',
    },
    {
      id: 'p4', title: 'Library Study Room Air Conditioning Upgrade',
      description: 'The library study rooms have had 6 AC failure reports this semester. Replace the 10-year-old units with energy-efficient inverter ACs for year-round comfort.',
      category: 'electrical', pattern_source: false,
      budget_ask: 240000, votes: 98, status: 'voting',
      funded: false, created_at: h(120),
      location: 'Library Block',
    },
    {
      id: 'p5', title: 'CCTV Expansion — 20 New Cameras',
      description: 'Add 20 high-definition cameras at blind spots identified by security team — basement parking, hostel entry/exit points, and pathway between canteen and hostels.',
      category: 'safety', pattern_source: false,
      budget_ask: 150000, votes: 176, status: 'completed',
      funded: true, allocated: 150000, spent: 148500, created_at: h(720),
      location: 'Multiple locations',
    },
  ];

  // --- Votes ---
  const votes = [];

  // --- Budget Cycles ---
  const budgetCycles = [
    { id: 'bc1', label: 'Semester I 2025-26', envelope: 1200000, allocated: 470000, spent: 293500, cycle_start: h(8760), cycle_end: h(-2880) },
  ];

  // --- Audit Log ---
  const auditLog = [
    { id: 'al1',  timestamp: h(48), action: 'REPORT_CREATED',    actor_id: 'u1', entity_type: 'Report', entity_id: 'r1', meta: { category: 'it', dept: 'IT & Network Services' } },
    { id: 'al2',  timestamp: h(36), action: 'STATUS_CHANGED',    actor_id: 'u6', entity_type: 'Report', entity_id: 'r1', meta: { from: 'reported', to: 'acknowledged' } },
    { id: 'al3',  timestamp: h(35), action: 'AUTO_ROUTED',       actor_id: 'SYSTEM', entity_type: 'Report', entity_id: 'r2', meta: { dept: 'IT & Network Services', confidence: 0.92 } },
    { id: 'al4',  timestamp: h(34), action: 'CLUSTER_MERGED',    actor_id: 'SYSTEM', entity_type: 'Cluster', entity_id: 'cl1', meta: { reports: 3, reason: 'geo+semantic match' } },
    { id: 'al5',  timestamp: h(20), action: 'STATUS_CHANGED',    actor_id: 'u6', entity_type: 'Report', entity_id: 'r1', meta: { from: 'acknowledged', to: 'inprogress' } },
    { id: 'al6',  timestamp: h(14), action: 'REPORT_CREATED',    actor_id: 'u4', entity_type: 'Report', entity_id: 'r4', meta: { category: 'electrical', dept: 'Facilities & Maintenance' } },
    { id: 'al7',  timestamp: h(13), action: 'AUTO_ROUTED',       actor_id: 'SYSTEM', entity_type: 'Report', entity_id: 'r4', meta: { dept: 'Facilities & Maintenance', confidence: 0.88 } },
    { id: 'al8',  timestamp: h(12), action: 'CLUSTER_MERGED',    actor_id: 'SYSTEM', entity_type: 'Cluster', entity_id: 'cl2', meta: { reports: 2, reason: 'geo proximity < 50m' } },
    { id: 'al9',  timestamp: h(12), action: 'STATUS_CHANGED',    actor_id: 'u8', entity_type: 'Report', entity_id: 'r7', meta: { from: 'inprogress', to: 'resolved' } },
    { id: 'al10', timestamp: h(10), action: 'ESCALATED',         actor_id: 'SYSTEM', entity_type: 'Report', entity_id: 'r4', meta: { reason: 'SLA exceeded 12h', dept: 'Facilities & Maintenance' } },
    { id: 'al11', timestamp: h(5),  action: 'BUDGET_APPROVED',   actor_id: 'u7', entity_type: 'Proposal', entity_id: 'p2', meta: { amount: 320000, approved_by: 'Admin' } },
    { id: 'al12', timestamp: h(2),  action: 'REPORT_CREATED',    actor_id: 'u2', entity_type: 'Report', entity_id: 'r6', meta: { category: 'plumbing' } },
    { id: 'al13', timestamp: h(1),  action: 'LOW_CONFIDENCE_FLAGGED', actor_id: 'SYSTEM', entity_type: 'Report', entity_id: 'r10', meta: { confidence: 0.79, flagged_for: 'admin_review' } },
  ];

  // --- Ambiguous / routing queue items ---
  const routingQueue = [
    {
      id: 'rq1', report_id: 'r10', confidence: 0.79,
      suggested_dept: 'd2', suggested_label: 'IT & Network Services',
      alt_dept: 'd1', alt_label: 'Facilities & Maintenance',
      reason: 'Category "projector" overlaps both IT and Facilities',
      title: 'Projector bulb fused in Lab 204',
      description: 'The projector in CS Lab 204 has a blown bulb. Classes affected.',
      created_at: h(20),
    },
  ];

  // Persist
  const store = {
    users, departments, clusters, reports, statusUpdates,
    proposals, votes, budgetCycles, auditLog, routingQueue,
    currentUser: null,
  };
  Object.entries(store).forEach(([k, v]) => {
    localStorage.setItem('cf_' + k, JSON.stringify(v));
  });
  localStorage.setItem('campusfix_seeded', '1');
}

// ── Storage helpers ────────────────────────────────────────
const DB = {
  get: (key) => JSON.parse(localStorage.getItem('cf_' + key) || 'null'),
  set: (key, val) => localStorage.setItem('cf_' + key, JSON.stringify(val)),
  push: (key, item) => {
    const arr = DB.get(key) || [];
    arr.push(item);
    DB.set(key, arr);
    return item;
  },
  update: (key, id, patch) => {
    const arr = DB.get(key) || [];
    const idx = arr.findIndex(x => x.id === id);
    if (idx >= 0) { arr[idx] = { ...arr[idx], ...patch }; DB.set(key, arr); return arr[idx]; }
    return null;
  },
  find: (key, id) => (DB.get(key) || []).find(x => x.id === id),
  where: (key, pred) => (DB.get(key) || []).filter(pred),
};

// ── Auth helpers ───────────────────────────────────────────
const Auth = {
  current: () => {
    const u = DB.get('currentUser');
    if (!u) return null;
    const fresh = (DB.get('users') || []).find(x => x.id === u.id);
    return fresh ? { ...u, ...fresh } : u;
  },
  login: (user) => DB.set('currentUser', user),
  logout: () => DB.set('currentUser', null),
  isLoggedIn: () => !!DB.get('currentUser'),
};

// Initialize on load
initSeedData();
