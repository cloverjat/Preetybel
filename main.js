(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const label = document.getElementById('themeLabel');
  const saved = localStorage.getItem('prettybel-theme');

  if (saved === 'dark') root.dataset.theme = 'dark';

  const sync = () => {
    const dark = root.dataset.theme === 'dark';

    label.textContent = dark ? 'Light mode' : 'Dark mode';

    toggle.setAttribute(
      'aria-label',
      dark ? 'Switch to light mode' : 'Switch to dark mode'
    );
  };

  sync();

  toggle.addEventListener('click', () => {
    const dark = root.dataset.theme === 'dark';

    if (dark) {
      delete root.dataset.theme;
      localStorage.setItem('prettybel-theme', 'light');
    } else {
      root.dataset.theme = 'dark';
      localStorage.setItem('prettybel-theme', 'dark');
    }

    sync();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document
    .querySelectorAll('.reveal,.reveal-left,.reveal-scale')
    .forEach((el) => observer.observe(el));
})();
