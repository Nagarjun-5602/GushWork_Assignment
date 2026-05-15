document.addEventListener('DOMContentLoaded', () => {

    window.updateHeroImage = (index) => {
        const mainImg = document.getElementById('hero-main-img');
        const thumbnails = document.querySelectorAll('.thumb');
        

        const clickedImgSrc = thumbnails[index].querySelector('img').src;
        mainImg.src = clickedImgSrc;
        

        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnails[index].classList.add('active');
    };

    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    let currentIndex = 0;

    prevBtn?.addEventListener('click', () => {
        const thumbnails = document.querySelectorAll('.thumb');
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        window.updateHeroImage(currentIndex);
    });

    nextBtn?.addEventListener('click', () => {
        const thumbnails = document.querySelectorAll('.thumb');
        currentIndex = (currentIndex + 1) % thumbnails.length;
        window.updateHeroImage(currentIndex);
    });


    const tabLinks = document.querySelectorAll('.tab-link');
    const tabData = {
        raw: {
            title: "High-Grade Raw Material Selection",
            desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
            img: "assets/fishnet.jpg"
        },
        extru: {
            title: "Precision Extrusion Line",
            desc: "Advanced extrusion technology ensures uniform wall thickness and structural integrity.",
            img: "assets/fishnet.jpg"
        },
        cool: {
            title: "Controlled Cooling Process",
            desc: "Multi-stage cooling tanks ensure gradual temperature reduction to prevent internal stress.",
            img: "assets/fishnet.jpg"
        }
    };

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const activePanel = document.querySelector('.tab-panel.active');
            const data = tabData[tabId] || tabData['raw'];

            if (activePanel) {
                activePanel.style.opacity = '0';
                setTimeout(() => {
                    activePanel.querySelector('h3').textContent = data.title;
                    activePanel.querySelector('p').textContent = data.desc;
                    activePanel.querySelector('img').src = data.img;
                    activePanel.style.opacity = '1';
                }, 300);
            }
        });
    });


    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });


    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        const stickyHeader = mainHeader.cloneNode(true);
        stickyHeader.classList.add('sticky-clone');

        stickyHeader.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
        document.body.appendChild(stickyHeader);

        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight * 0.8) {
                stickyHeader.classList.add('visible');
            } else {
                stickyHeader.classList.remove('visible');
            }
        });
    }


    const mainImgWrapper = document.querySelector('.main-image-wrapper');
    const mainImg = document.getElementById('hero-main-img');
    if (mainImgWrapper && mainImg) {
        mainImgWrapper.addEventListener('mousemove', (e) => {
            const rect = mainImgWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
            mainImg.style.transform = 'scale(2)'; // 2x zoom
        });

        mainImgWrapper.addEventListener('mouseleave', () => {
            mainImg.style.transformOrigin = 'center center';
            mainImg.style.transform = 'scale(1)';
        });
    }


    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos="fade-up"]').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const downloadModal = document.getElementById('downloadModal');

    openModalBtn?.addEventListener('click', () => {
        downloadModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    closeModalBtn?.addEventListener('click', () => {
        downloadModal.classList.remove('active');
        document.body.style.overflow = '';
    });


    downloadModal?.addEventListener('click', (e) => {
        if (e.target === downloadModal) {
            downloadModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });


    const openQuoteModalBtn = document.getElementById('openQuoteModalBtn');
    const closeQuoteModalBtn = document.getElementById('closeQuoteModalBtn');
    const quoteModal = document.getElementById('quoteModal');

    openQuoteModalBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        quoteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeQuoteModalBtn?.addEventListener('click', () => {
        quoteModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    quoteModal?.addEventListener('click', (e) => {
        if (e.target === quoteModal) {
            quoteModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

