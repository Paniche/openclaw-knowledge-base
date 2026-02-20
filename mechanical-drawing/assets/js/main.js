document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.getElementById('searchContainer');
    const searchResults = document.getElementById('searchResults');
    const sidebar = document.getElementById('sidebar');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    const searchData = [
        { title: '机械制图概述', url: 'basics/introduction.html', content: '机械制图是用图样确切表示机械的结构形状、尺寸大小、工作原理和技术要求的学科' },
        { title: '制图工具与仪器', url: 'basics/drawing-tools.html', content: '图板、丁字尺、三角板、圆规、分规、比例尺等制图工具的使用方法' },
        { title: '图纸幅面与格式', url: 'basics/sheet-layout.html', content: 'A0-A4图纸幅面、标题栏、明细栏的尺寸和格式规定' },
        { title: '图线类型', url: 'basics/lines.html', content: '粗实线、细实线、虚线、点画线、双点画线等图线类型和应用场合' },
        { title: '比例', url: 'basics/scales.html', content: '原值比例、放大比例、缩小比例的选择和使用' },
        { title: '字体', url: 'basics/fonts.html', content: '汉字、数字、字母的书写规范和字体要求' },
        { title: 'ISO国际标准', url: 'standards/iso.html', content: 'ISO 128技术制图通用表示规则、ISO 129尺寸标注等' },
        { title: '中国国家标准GB', url: 'standards/gb.html', content: 'GB/T 14689-2008图纸幅面、GB/T 14690-1993比例等' },
        { title: 'ASME美国标准', url: 'standards/asme.html', content: 'ASME Y14.5尺寸标注公差表示、ASME Y14.35工程图样等' },
        { title: 'DIN德国标准', url: 'standards/din.html', content: 'DIN 6图样画法、DIN 406尺寸标注等德国工业标准' },
        { title: '正投影法', url: 'projection/orthographic.html', content: '正投影法原理、三视图的形成和投影规律' },
        { title: '视图', url: 'projection/views.html', content: '基本视图、向视图、局部视图、斜视图的表达方法' },
        { title: '剖视图', url: 'projection/sections.html', content: '全剖、半剖、局部剖、旋转剖、阶梯剖等剖视图画法' },
        { title: '断面图', url: 'projection/cuts.html', content: '移出断面、重合断面的画法和标注' },
        { title: '轴测图', url: 'projection/axonometric.html', content: '正等测、斜二测轴测图的画法' },
        { title: '透视图', url: 'projection/perspective.html', content: '透视图的基本概念和作图方法' },
        { title: '尺寸标注基本原则', url: 'dimensioning/principles.html', content: '尺寸标注的基本原则、尺寸组成、尺寸标注注意事项' },
        { title: '线性尺寸标注', url: 'dimensioning/linear.html', content: '线性尺寸的标注方法、尺寸线、尺寸界线、尺寸数字' },
        { title: '角度尺寸标注', url: 'dimensioning/angular.html', content: '角度尺寸的标注方法和要求' },
        { title: '半径与直径标注', url: 'dimensioning/radii-diameters.html', content: '半径R、直径Φ的标注方法和特殊情况' },
        { title: '特殊尺寸标注', url: 'dimensioning/special.html', content: '倒角、退刀槽、均布孔等特殊结构的尺寸标注' },
        { title: '公差与配合基本概念', url: 'tolerances/fundamentals.html', content: '尺寸公差、基本尺寸、极限尺寸、实际尺寸等基本概念' },
        { title: '配合类型', url: 'tolerances/fits.html', content: '间隙配合、过盈配合、过渡配合的定义和应用' },
        { title: '公差等级', url: 'tolerances/tolerance-grades.html', content: 'IT01-IT18公差等级的选择和应用' },
        { title: '基本偏差', url: 'tolerances/deviation.html', content: '孔、轴的28个基本偏差代号和公差带' },
        { title: '几何公差', url: 'tolerances/geometric.html', content: '形状、方向、位置、跳动公差的标注和含义' },
        { title: '表面粗糙度', url: 'tolerances/surface.html', content: 'Ra、Rz、Ry等表面粗糙度参数的标注' },
        { title: '焊接符号', url: 'symbols/welding.html', content: '焊接符号的组成、标注方法和常见焊接形式' },
        { title: '螺纹画法与标注', url: 'symbols/threads.html', content: '螺纹的牙型、旋向、螺距的表示和标注方法' },
        { title: '齿轮画法', url: 'symbols/gears.html', content: '直齿轮、斜齿轮、锥齿轮的画法' },
        { title: '弹簧画法', url: 'symbols/springs.html', content: '螺旋弹簧的画法和简化画法' },
        { title: '滚动轴承画法', url: 'symbols/bearings.html', content: '滚动轴承的简化画法和特征画法' },
        { title: '表面处理与镀涂', url: 'symbols/surface-treatment.html', content: '表面处理、镀涂的符号表示' },
        { title: '常用金属材料', url: 'materials/metals.html', content: '钢、铸铁、有色金属的分类和牌号' },
        { title: '非金属材料', url: 'materials/non-metals.html', content: '塑料、橡胶、陶瓷等非金属材料的特性' },
        { title: '热处理工艺', url: 'materials/heat-treatment.html', content: '淬火、回火、退火、正火等热处理工艺' },
        { title: '材料牌号表示方法', url: 'materials/designation.html', content: '金属材料牌号的表示方法和含义' }
    ];

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                searchResults.classList.remove('active');
                searchResults.innerHTML = '';
                return;
            }

            const results = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.content.toLowerCase().includes(query)
            ).slice(0, 10);

            if (results.length > 0) {
                searchResults.innerHTML = results.map(item => `
                    <a href="${item.url}" class="search-result-item">
                        <div class="search-result-title">${item.title}</div>
                        <div class="search-result-preview">${item.content.substring(0, 80)}...</div>
                    </a>
                `).join('');
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-preview">未找到相关内容</div></div>';
                searchResults.classList.add('active');
            }
        });

        searchInput.addEventListener('focus', function() {
            if (searchInput.value.trim().length >= 2) {
                searchResults.classList.add('active');
            }
        });

        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target) && !searchInput.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchResults.classList.remove('active');
            searchInput.blur();
        }
    });
});
