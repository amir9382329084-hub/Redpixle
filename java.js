// ===== مدیریت تم (روشن/تاریک) =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-theme');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  body.classList.remove('light-theme');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  const isLight = body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeToggle.innerHTML = isLight
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// ===== منوی موبایل =====
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  if (nav.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// بستن منو با کلیک روی لینک‌ها (در موبایل)
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      nav.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

// ===== اسکرول نرم =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// ===== فرم ثبت سفارش =====
const orderForm = document.getElementById('order-form');
const formMessage = document.getElementById('form-message');

orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formMessage.textContent = '✅ سفارش شما با موفقیت ثبت شد! به زودی با شما تماس می‌گیریم.';
  formMessage.style.color = 'var(--accent)';
  orderForm.reset();
  setTimeout(() => { formMessage.textContent = ''; }, 5000);
});

// ===== فرم تماس =====
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  contactMessage.textContent = '✅ پیام شما ارسال شد! به زودی پاسخ می‌دهیم.';
  contactMessage.style.color = 'var(--accent)';
  contactForm.reset();
  setTimeout(() => { contactMessage.textContent = ''; }, 5000);
});