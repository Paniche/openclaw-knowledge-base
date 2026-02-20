(function() {
  'use strict';

  const App = {
    searchData: [],
    currentTheme: 'light',

    init() {
      this.loadTheme();
      this.initSidebar();
      this.initSearch();
      this.initBackToTop();
      this.initCopyButtons();
      this.buildSearchIndex();
      this.setActiveNav();
    },

    loadTheme() {
      const savedTheme = localStorage.getItem('pcb-theme');
      if (savedTheme) {
        this.currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.currentTheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    },

    toggleTheme() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      localStorage.setItem('pcb-theme', this.currentTheme);
    },

    initSidebar() {
      const menuToggle = document.querySelector('.menu-toggle');
      const sidebar = document.querySelector('.sidebar');
      const overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);

      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
      });

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });

      document.querySelector('.theme-toggle').addEventListener('click', () => {
        this.toggleTheme();
      });
    },

    initSearch() {
      const searchInput = document.querySelector('.search-input');
      const searchResults = document.querySelector('.search-results');

      if (!searchInput) return;

      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) {
          searchResults.classList.remove('active');
          return;
        }

        const results = this.searchData.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.content.toLowerCase().includes(query)
        ).slice(0, 10);

        if (results.length > 0) {
          searchResults.innerHTML = results.map(item => `
            <a href="${item.url}" class="search-result-item">
              <span class="result-title">${this.highlightMatch(item.title, query)}</span>
              <span class="result-path">${item.path}</span>
            </a>
          `).join('');
          searchResults.classList.add('active');
        } else {
          searchResults.innerHTML = '<div class="search-result-item"><span class="result-title">未找到相关内容</span></div>';
          searchResults.classList.add('active');
        }
      });

      searchInput.addEventListener('blur', () => {
        setTimeout(() => searchResults.classList.remove('active'), 200);
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchResults.classList.remove('active');
          searchInput.blur();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          searchInput.focus();
        }
      });
    },

    highlightMatch(text, query) {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<span class="highlight">$1</span>');
    },

    buildSearchIndex() {
      const navLinks = document.querySelectorAll('.nav-link');
      this.searchData = Array.from(navLinks).map(link => ({
        title: link.textContent.trim(),
        url: link.getAttribute('href'),
        path: this.getPathFromUrl(link.getAttribute('href')),
        content: ''
      }));
    },

    getPathFromUrl(url) {
      const parts = url.split('/');
      parts.pop();
      return parts.join('/') || '/';
    },

    initBackToTop() {
      const backToTop = document.querySelector('.back-to-top');
      if (!backToTop) return;

      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      });

      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },

    initCopyButtons() {
      document.querySelectorAll('.code-block').forEach(block => {
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = '复制';
        btn.addEventListener('click', () => {
          const code = block.querySelector('code').textContent;
          navigator.clipboard.writeText(code).then(() => {
            btn.textContent = '已复制!';
            setTimeout(() => btn.textContent = '复制', 2000);
          });
        });
        block.appendChild(btn);
      });
    },

    setActiveNav() {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
          link.classList.add('active');
        }
      });
    }
  };

  document.addEventListener('DOMContentLoaded', () => App.init());
})();
