(function() {
  const siteData = {
    pages: [
      { title: "首页", path: "index.html", category: "home" },
      { title: "电阻", path: "components/resistors.html", category: "components" },
      { title: "电容", path: "components/capacitors.html", category: "components" },
      { title: "电感", path: "components/inductors.html", category: "components" },
      { title: "二极管", path: "components/diodes.html", category: "components" },
      { title: "晶体管", path: "components/transistors.html", category: "components" },
      { title: "集成电路", path: "components/ics.html", category: "components" },
      { title: "连接器", path: "components/connectors.html", category: "components" },
      { title: "被动元件", path: "components/passive.html", category: "components" },
      { title: "主动元件", path: "components/active.html", category: "components" },
      { title: "基本电学原理", path: "basics/principles.html", category: "basics" },
      { title: "电路符号", path: "basics/symbols.html", category: "basics" },
      { title: "参数解读", path: "basics/parameters.html", category: "basics" },
      { title: "封装类型", path: "basics/packages.html", category: "basics" },
      { title: "制造流程", path: "manufacturing/process.html", category: "manufacturing" },
      { title: "材料科学", path: "manufacturing/materials.html", category: "manufacturing" },
      { title: "测试与检验", path: "manufacturing/testing.html", category: "manufacturing" },
      { title: "国际标准", path: "standards/international.html", category: "standards" },
      { title: "国家标准", path: "standards/national.html", category: "standards" },
      { title: "行业标准", path: "standards/industry.html", category: "standards" },
      { title: "质量等级", path: "quality/grades.html", category: "quality" },
      { title: "可靠性分析", path: "quality/reliability.html", category: "quality" },
      { title: "认证体系", path: "quality/certification.html", category: "quality" }
    ]
  };

  function init() {
    initTheme();
    initBackToTop();
    initMobileMenu();
    initSearch();
    highlightCurrentPage();
  }

  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);

    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
      });
      updateThemeIcon(theme);
    }
  }

  function updateThemeIcon(theme) {
    const themeToggle = document.querySelector(".theme-toggle");
    if (!themeToggle) return;
    
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>`;
    
    themeToggle.innerHTML = theme === "dark" ? sunIcon + "浅色模式" : moonIcon + "深色模式";
  }

  function initBackToTop() {
    const backToTop = document.querySelector(".back-to-top");
    if (!backToTop) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    if (!menuToggle || !sidebar) return;

    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      if (overlay) overlay.classList.toggle("active");
    });

    if (overlay) {
      overlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
      });
    }
  }

  function initSearch() {
    const searchInput = document.querySelector(".search-input");
    const searchResults = document.querySelector(".search-results");

    if (!searchInput || !searchResults) return;

    let searchTimeout;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        searchResults.classList.remove("active");
        return;
      }

      searchTimeout = setTimeout(() => {
        performSearch(query);
      }, 200);
    });

    searchInput.addEventListener("focus", () => {
      if (searchInput.value.trim().length >= 2) {
        searchResults.classList.add("active");
      }
    });

    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove("active");
      }
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchResults.classList.remove("active");
        searchInput.blur();
      }
    });
  }

  function performSearch(query) {
    const searchResults = document.querySelector(".search-results");
    if (!searchResults) return;

    const lowerQuery = query.toLowerCase();
    const results = siteData.pages.filter(page => 
      page.title.toLowerCase().includes(lowerQuery) ||
      page.path.toLowerCase().includes(lowerQuery)
    );

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">未找到相关页面</div>';
    } else {
      searchResults.innerHTML = results.slice(0, 10).map(page => `
        <a href="${page.path}" class="search-result-item">
          <div class="search-result-title">${page.title}</div>
          <div class="search-result-path">${page.path}</div>
        </a>
      `).join("");
    }

    searchResults.classList.add("active");
  }

  function highlightCurrentPage() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navItems = document.querySelectorAll(".nav-item");
    
    navItems.forEach(item => {
      const href = item.getAttribute("href");
      if (href === currentPath || (currentPath === "" && href === "index.html")) {
        item.classList.add("active");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
