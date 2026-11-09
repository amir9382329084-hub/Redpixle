// REDPIXEL main-site interactions + Supabase
(() => {
  const cfg = window.REDPIXEL_SUPABASE;
  const clientLib = window.supabase;
  const db = (cfg && clientLib) ? clientLib.createClient(cfg.url, cfg.publishableKey) : null;

  // Theme
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') body.classList.add('light-theme');
  if (themeToggle) {
    themeToggle.innerHTML = body.classList.contains('light-theme')
      ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      const isLight = body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  }

  // Mobile navigation
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !nav.classList.contains('active'));
        icon.classList.toggle('fa-times', nav.classList.contains('active'));
      }
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
      }
    }));
  }

  // Smooth scrolling only for on-page links.
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const selector = this.getAttribute('href');
      if (!selector || selector === '#') return;
      const target = document.querySelector(selector);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  const showStatus = (el, text, ok = true) => {
    if (!el) return;
    el.textContent = text;
    el.style.color = ok ? 'var(--accent)' : '#ff7777';
  };

  // Load portfolio projects managed from the admin panel.
  async function loadProjects() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid || !db) return;
    const { data, error } = await db.from('projects')
      .select('id,title,description,category,image_url,project_url')
      .eq('is_published', true).order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (error || !data || !data.length) return; // Keep the existing sample cards as a fallback.
    grid.replaceChildren();
    data.forEach(project => {
      const card = document.createElement('article');
      card.className = 'portfolio-card';
      const imageWrap = document.createElement('div');
      imageWrap.className = 'card-img';
      const img = document.createElement('img');
      img.src = project.image_url || 'https://picsum.photos/400/250?grayscale';
      img.alt = project.title || 'نمونه‌کار REDPIXEL';
      img.loading = 'lazy';
      imageWrap.appendChild(img);
      const info = document.createElement('div');
      info.className = 'card-info';
      const title = document.createElement('h3');
      title.textContent = project.title || '';
      const desc = document.createElement('p');
      desc.textContent = project.description || '';
      info.append(title, desc);
      card.append(imageWrap, info);
      if (project.project_url) {
        const link = document.createElement('a');
        link.href = project.project_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'portfolio-project-link';
        link.textContent = 'مشاهده پروژه';
        info.appendChild(link);
      }
      grid.appendChild(card);
    });
  }
  loadProjects();

  // Save order requests to the messages table.
  const orderForm = document.getElementById('order-form');
  const orderStatus = document.getElementById('form-message');
  if (orderForm) orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!db) return showStatus(orderStatus, 'اتصال سایت آماده نیست. کمی بعد دوباره تلاش کنید.', false);
    const name = document.getElementById('name')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const serviceSelect = document.getElementById('service');
    const service = serviceSelect?.selectedOptions?.[0]?.textContent || 'نامشخص';
    const description = document.getElementById('description')?.value.trim() || '';
    showStatus(orderStatus, 'در حال ارسال درخواست...', true);
    const { error } = await db.from('messages').insert({
      name, email: email || null, subject: `سفارش طراحی | ${service} | تلفن: ${phone}`,
      message: description
    });
    if (error) return showStatus(orderStatus, 'ارسال انجام نشد. لطفاً دوباره تلاش کنید.', false);
    showStatus(orderStatus, 'درخواست شما با موفقیت ثبت شد. ممنون از اعتمادتان!');
    orderForm.reset();
  });

  // Save contact messages to the same inbox.
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-message');
  if (contactForm) contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!db) return showStatus(contactStatus, 'اتصال سایت آماده نیست. کمی بعد دوباره تلاش کنید.', false);
    const name = document.getElementById('contact-name')?.value.trim() || '';
    const email = document.getElementById('contact-email')?.value.trim() || '';
    const message = document.getElementById('contact-text')?.value.trim() || '';
    showStatus(contactStatus, 'در حال ارسال پیام...', true);
    const { error } = await db.from('messages').insert({
      name, email, subject: 'پیام از فرم تماس', message
    });
    if (error) return showStatus(contactStatus, 'ارسال انجام نشد. لطفاً دوباره تلاش کنید.', false);
    showStatus(contactStatus, 'پیام شما با موفقیت ارسال شد.');
    contactForm.reset();
  });
})();
