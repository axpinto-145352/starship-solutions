// === NAVBAR ===
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// === TABS (All-Stars & Stripes) ===
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function switchTab(tabId) {
  tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  tabContents.forEach(c => c.classList.toggle('active', c.id === 'tab-' + tabId));
  // Scroll to section if not visible
  document.getElementById('allstars').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// === CALENDAR ===
const calMonth = document.getElementById('calMonth');
const calDays = document.getElementById('calDays');
const calPrev = document.getElementById('calPrev');
const calNext = document.getElementById('calNext');

// Events data (month is 0-indexed)
// Weekly Monday meetings + specific events
const events = [
  { date: new Date(2026, 1, 15), title: 'HowMoneyWorks Workshop for Veterans' },
  { date: new Date(2026, 1, 22), title: 'Military Spouse Financial Planning' },
  { date: new Date(2026, 2, 1), title: '7 Money Milestones: Veterans Edition' },
  { date: new Date(2026, 2, 15), title: 'Credit Repair for Service Members' },
];

let currentDate = new Date(2026, 1, 1); // Feb 2026

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  calMonth.textContent = months[month] + ' ' + year;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const today = new Date();

  let html = '';

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="cal-day other-month">${daysInPrev - i}</div>`;
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const currentDayDate = new Date(year, month, d);
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const hasEvent = events.some(e => e.date.getDate() === d && e.date.getMonth() === month && e.date.getFullYear() === year);
    const isMonday = currentDayDate.getDay() === 1; // Monday = weekly meeting

    let cls = 'cal-day';
    if (isToday) cls += ' today';
    if (hasEvent) cls += ' has-event';
    if (isMonday) cls += ' monday has-event'; // All Mondays have the weekly meeting

    html += `<div class="${cls}">${d}</div>`;
  }

  // Fill remaining
  const totalCells = firstDay + daysInMonth;
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="cal-day other-month">${i}</div>`;
  }

  calDays.innerHTML = html;
}

calPrev.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

calNext.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

// === FORMS ===
function showModal(title, message) {
  const modal = document.getElementById('successModal');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('successModal').classList.remove('active');
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('successModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

// Registration form
document.getElementById('registrationForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showModal('Registration Received!', 'Thank you for registering for the All-Stars & Stripes program. Angela will send you a confirmation email with next steps.');
  e.target.reset();
});

// Volunteer form
document.getElementById('volunteerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showModal('Application Received!', 'Thank you for your interest in volunteering! Angela will review your application and reach out within 48 hours.');
  e.target.reset();
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showModal('Message Sent!', 'Thank you for reaching out! Angela will contact you within 24 hours to schedule your free consultation.');
  e.target.reset();
});

// === SMOOTH SCROLL for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Expose switchTab globally for onclick handlers
window.switchTab = switchTab;
window.closeModal = closeModal;
