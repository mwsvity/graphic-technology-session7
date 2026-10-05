/* ============================================================
   script.js  –  Sidebar navigation logic
   ============================================================ */

(function () {
    'use strict';

    /* ── DOM refs ─────────────────────────────────────────── */
    const navItems = document.querySelectorAll('.nav-item, .sidebar__item');
    const navLinks = document.querySelectorAll('.sidebar__link');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');
    const sidebar = document.getElementById('sidebar');
    const sections = document.querySelectorAll('section[id]');

    /* ══════════════════════════════════════════════════════════
       1. ACTIVE LINK — driven by IntersectionObserver
       ══════════════════════════════════════════════════════════ */

    /**
     * Memperbarui menu navigasi aktif:
     * 1. Hapus class .active dari semua .nav-item dan link
     * 2. Cari link yang href-nya sesuai dengan id section (#id)
     * 3. Tambahkan class .active ke link tersebut
     */
    function setActiveSection(sectionId) {
        if (!sectionId) return;

        // 1. Hapus class .active dari semua .nav-item dan link
        navItems.forEach(item => item.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // 2. Cari link yang href-nya sesuai dengan id section
        const activeLink = document.querySelector(`.sidebar__link[href="#${sectionId}"]`);

        // 3. Tambahkan class .active ke link tersebut (dan item pembungkus jika ada)
        if (activeLink) {
            activeLink.classList.add('active');
            const parentItem = activeLink.closest('.nav-item, .sidebar__item');
            if (parentItem) {
                parentItem.classList.add('active');
            }
        }
    }

    /* ── Typing Animation for About Heading ───────────────── */
    const typingText = document.getElementById('typing-text');
    const textToType = "Hi, I'm Melia Winisa!!!";
    let hasTyped = false;

    // Kosongkan teks awal agar siap diketik saat terlihat tanpa merusak layout
    if (typingText) {
        typingText.textContent = '';
    }

    function startAboutTyping() {
        if (hasTyped || !typingText) return;
        hasTyped = true; // Jalankan hanya satu kali

        typingText.textContent = '';
        let i = 0;
        const typingSpeed = 80; // Kecepatan sekitar 70-90 ms per karakter

        function type() {
            if (i < textToType.length) {
                typingText.textContent += textToType.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            } else {
                // Setelah selesai, tampilkan cursor | yang berkedip
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.setAttribute('aria-hidden', 'true');
                cursor.textContent = '|';
                typingText.appendChild(cursor);
            }
        }

        type();
    }

    // Konfigurasi IntersectionObserver yang digunakan bersama untuk active navigation dan animasi typing
    const observerOptions = {
        root: null,
        threshold: [0.2, 0.5]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update active section saat mencapai 50% terlihat
                if (entry.intersectionRatio >= 0.5) {
                    setActiveSection(entry.target.id);
                }

                // Animasi baru dimulai saat section #about terlihat
                if (entry.target.id === 'about') {
                    startAboutTyping();
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    /* ── Smooth Scroll & Click Event ───────────────────────── */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();

                    // Smooth scrolling ke section tujuan
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update URL hash secara rapi tanpa jump
                    if (history.pushState) {
                        history.pushState(null, '', href);
                    }

                    // Langsung aktifkan link yang diklik
                    setActiveSection(targetId);

                    // Tutup sidebar di tampilan mobile jika terbuka
                    closeSidebar();
                }
            }
        });
    });

    /* ══════════════════════════════════════════════════════════
       2. MOBILE — hamburger toggle
       ══════════════════════════════════════════════════════════ */
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    hamburger.addEventListener('click', () => {
        const isOpen = sidebar.classList.contains('open');
        isOpen ? closeSidebar() : openSidebar();
    });

    overlay.addEventListener('click', closeSidebar);

    /* Close with Escape key */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSidebar();
    });

    /* ══════════════════════════════════════════════════════════
       3. CHARACTER EYE TRACKING — 9-Direction Follow Mouse
       ══════════════════════════════════════════════════════════ */
    const charImg = document.getElementById('homeCharacter') || document.querySelector('.home__character');

    if (charImg) {
        // Image paths for all 9 directions
        const IMAGE_PATHS = {
            center: 'assets/image/char-center.png',
            up: 'assets/image/char-up.png',
            down: 'assets/image/char-down.png',
            left: 'assets/image/char-left.png',
            right: 'assets/image/char-right.png',
            upLeft: 'assets/image/char-up-left.png',
            upRight: 'assets/image/char-up-right.png',
            downLeft: 'assets/image/char-down-left.png',
            downRight: 'assets/image/char-down-right.png'
        };

        // 8-directional array indexed by 45° sectors:
        // 0: Right       (-22.5° to 22.5°)
        // 1: Down-Right  (22.5° to 67.5°)
        // 2: Down        (67.5° to 112.5°)
        // 3: Down-Left   (112.5° to 157.5°)
        // 4: Left        (157.5° to 202.5°)
        // 5: Up-Left     (202.5° to 247.5°)
        // 6: Up          (247.5° to 292.5°)
        // 7: Up-Right    (292.5° to 337.5°)
        const DIRECTION_MAP = [
            IMAGE_PATHS.right,
            IMAGE_PATHS.downRight,
            IMAGE_PATHS.down,
            IMAGE_PATHS.downLeft,
            IMAGE_PATHS.left,
            IMAGE_PATHS.upLeft,
            IMAGE_PATHS.up,
            IMAGE_PATHS.upRight
        ];

        // 7. Preload all 9 images to prevent flicker on first hover
        const preloadedImages = {};
        Object.values(IMAGE_PATHS).forEach((src) => {
            const img = new Image();
            img.src = src;
            preloadedImages[src] = img;
        });

        // 8 & 9. Cache current src to prevent unnecessary DOM updates
        let currentSrc = charImg.getAttribute('src') || IMAGE_PATHS.center;
        function updateCharacterImage(newSrc) {
            if (currentSrc !== newSrc) {
                currentSrc = newSrc;
                charImg.src = newSrc;
            }
        }

        // 6. Threshold (deadzone radius around character center in pixels)
        const CENTER_THRESHOLD = 70;

        // 1. Calculate character center coordinates (focused around face/eye level)
        function getCharCenter() {
            const rect = charImg.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return null;

            const naturalWidth = charImg.naturalWidth || 1122;
            const naturalHeight = charImg.naturalHeight || 1402;
            const imageAspect = naturalWidth / naturalHeight;
            const boxAspect = rect.width / rect.height;

            let renderedWidth, renderedHeight, renderedTop, renderedLeft;

            if (boxAspect > imageAspect) {
                // Constrained by container height
                renderedHeight = rect.height;
                renderedWidth = rect.height * imageAspect;
                renderedLeft = rect.left + (rect.width - renderedWidth) / 2;
                renderedTop = rect.top;
            } else {
                // Constrained by container width, bottom-aligned
                renderedWidth = rect.width;
                renderedHeight = rect.width / imageAspect;
                renderedLeft = rect.left;
                renderedTop = rect.bottom - renderedHeight;
            }

            return {
                x: renderedLeft + renderedWidth / 2,
                y: renderedTop + renderedHeight * 0.38
            };
        }

        let mouseX = 0;
        let mouseY = 0;
        let isTicking = false;

        function updateEyeDirection() {
            isTicking = false;

            const center = getCharCenter();
            if (!center) return;

            // 2. Compare mouse position with character center
            const dx = mouseX - center.x;
            const dy = mouseY - center.y;
            const dist = Math.hypot(dx, dy);

            // 4. Near center -> default center pose
            if (dist < CENTER_THRESHOLD) {
                updateCharacterImage(IMAGE_PATHS.center);
                return;
            }

            // 3 & 5. 8 directional sectors based on angle
            const angleRad = Math.atan2(dy, dx);
            const angleDeg = angleRad * (180 / Math.PI); // -180° to 180°

            // Shift by 360 + 22.5 to center the 45° sectors around each axis
            const normalizedDeg = (angleDeg + 360 + 22.5) % 360;
            const dirIndex = Math.floor(normalizedDeg / 45) % 8;

            const targetSrc = DIRECTION_MAP[dirIndex];
            if (targetSrc) {
                updateCharacterImage(targetSrc);
            }
        }

        // Throttle with requestAnimationFrame for 60fps smoothness
        function onPointerMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isTicking) {
                isTicking = true;
                requestAnimationFrame(updateEyeDirection);
            }
        }

        window.addEventListener('mousemove', onPointerMove, { passive: true });

        // Reset to center when mouse leaves the browser window
        document.addEventListener('mouseleave', () => {
            updateCharacterImage(IMAGE_PATHS.center);
        });
    }

    /* ══════════════════════════════════════════════════════════
       4. MATRIX CANVAS ORNAMENT (if present)
       ══════════════════════════════════════════════════════════ */
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const nums = '0123456789';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#a6c0bb';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = nums.charAt(Math.floor(Math.random() * nums.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 50);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    /* ══════════════════════════════════════════════════════════
       5. LANYARD INTERACTION (Hover Sway & Draggable)
       ══════════════════════════════════════════════════════════ */
    const lanyard = document.getElementById('draggableLanyard');
    const aboutSection = document.getElementById('about');

    if (lanyard) {
        // Pastikan transform-origin dari bagian atas tengah (seperti menggantung)
        lanyard.style.transformOrigin = 'top center';
        lanyard.setAttribute('draggable', 'false');

        let isDragging = false;
        let startX = 0, startY = 0;
        let currentX = 0, currentY = 0;
        let baseX = 0, baseY = 0;
        let hoverOffsetX = 0, hoverRotation = 0;
        let previousX = 0;
        let swayRaf = null;

        // Cegah native ghost image drag browser
        lanyard.addEventListener('dragstart', (e) => e.preventDefault());

        /* ── Hover Sway saat Mouse Bergerak di Area #about ──── */
        if (aboutSection) {
            aboutSection.addEventListener('mousemove', (e) => {
                if (isDragging) return;

                if (swayRaf) cancelAnimationFrame(swayRaf);
                swayRaf = requestAnimationFrame(() => {
                    if (isDragging) return;

                    const aboutRect = aboutSection.getBoundingClientRect();
                    if (aboutRect.width === 0) return;

                    // Hitung posisi horizontal mouse relatif terhadap center area #about (-1 s.d. 1)
                    const relX = (e.clientX - (aboutRect.left + aboutRect.width / 2)) / (aboutRect.width / 2);
                    const normX = Math.max(-1, Math.min(1, relX));

                    // Maksimum gerakan horizontal sekitar 60px dan rotasi sekitar 8 derajat
                    hoverOffsetX = normX * 60;
                    hoverRotation = normX * 8;

                    lanyard.style.transition = 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)';
                    lanyard.style.transform = `translate(${baseX + hoverOffsetX}px, ${baseY}px) rotate(${hoverRotation}deg)`;
                });
            }, { passive: true });

            aboutSection.addEventListener('mouseleave', () => {
                if (isDragging) return;
                hoverOffsetX = 0;
                hoverRotation = 0;
                lanyard.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                lanyard.style.transform = `translate(${baseX}px, ${baseY}px) rotate(0deg)`;
            });
        }

        /* ── Drag Logic (Mouse & Touch) ─────────────────────── */
        function startDrag(clientX, clientY) {
            isDragging = true;

            // Simpan posisi visual saat ini agar gambar tidak loncat saat mulai di-drag
            currentX = baseX + hoverOffsetX;
            currentY = baseY;
            hoverOffsetX = 0;
            hoverRotation = 0;

            startX = clientX - currentX;
            startY = clientY - currentY;
            previousX = clientX;

            lanyard.classList.add('is-dragging');
            document.body.classList.add('lanyard-dragging');
            lanyard.style.cursor = 'grabbing';
            lanyard.style.transition = 'transform 0.05s ease-out';
        }

        function onDrag(clientX, clientY) {
            if (!isDragging) return;

            // Izinkan translasi X dan Y
            currentX = clientX - startX;
            currentY = clientY - startY;

            // Izinkan translasi X dan Y ke seluruh area section About (termasuk kolom informasi di kiri)
            currentX = Math.max(-850, Math.min(350, currentX));
            currentY = Math.max(-150, Math.min(600, currentY));

            // Kecepatan horizontal mouse/pointer
            const velocityX = clientX - previousX;
            previousX = clientX;

            // Rotasi mengikuti kecepatan horizontal mouse (dibatasi -30 s.d. 30 derajat)
            let rotation = velocityX * 0.9;
            if (rotation > 30) rotation = 30;
            if (rotation < -30) rotation = -30;

            lanyard.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;
        }

        function endDrag() {
            if (!isDragging) return;
            isDragging = false;

            // Posisi terakhir tetap dipertahankan
            baseX = currentX;
            baseY = currentY;

            lanyard.classList.remove('is-dragging');
            document.body.classList.remove('lanyard-dragging');
            lanyard.style.cursor = 'grab';

            // Rotasi kembali ke 0 derajat dengan easing elastic/spring-like yang halus
            lanyard.style.transition = 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            lanyard.style.transform = `translate(${baseX}px, ${baseY}px) rotate(0deg)`;
        }

        // --- Mouse Events ---
        lanyard.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; // Hanya klik kiri
            e.preventDefault(); // Cegah native image ghost drag
            startDrag(e.clientX, e.clientY);
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                onDrag(e.clientX, e.clientY);
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                endDrag();
            }
        });

        // --- Touch Events (Mobile) ---
        let touchStartX = 0;
        let touchStartY = 0;
        let isTouchDragConfirmed = false;

        lanyard.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1) return;
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            isTouchDragConfirmed = false;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (e.touches.length !== 1) return;
            const touch = e.touches[0];

            if (!isDragging && !isTouchDragConfirmed) {
                const dx = Math.abs(touch.clientX - touchStartX);
                const dy = Math.abs(touch.clientY - touchStartY);

                // Jika gerakan vertikal lebih dominan di awal, izinkan scroll mobile berjalan lancar
                if (dy > dx && dy > 8) {
                    return;
                }

                // Jika gerakan horizontal atau niat drag terlihat jelas, konfirmasi drag lanyard
                if (dx > 8 || dy > 8) {
                    isTouchDragConfirmed = true;
                    startDrag(touch.clientX, touch.clientY);
                }
            }

            if (isDragging) {
                if (e.cancelable) e.preventDefault(); // Cegah scroll layar hanya saat aktif mendrag lanyard
                onDrag(touch.clientX, touch.clientY);
            }
        }, { passive: false });

        document.addEventListener('touchend', () => {
            if (isDragging) {
                endDrag();
            }
            isTouchDragConfirmed = false;
        });

        document.addEventListener('touchcancel', () => {
            if (isDragging) {
                endDrag();
            }
            isTouchDragConfirmed = false;
        });
    }

    /* ══════════════════════════════════════════════════════════
       6. PROJECT HORIZONTAL SLIDER (Smooth & Scroll-Snap)
       ══════════════════════════════════════════════════════════ */
    const sliderWrapper = document.getElementById('projectSliderWrapper');
    const projectPrevBtn = document.getElementById('projectPrevBtn');
    const projectNextBtn = document.getElementById('projectNextBtn');

    if (sliderWrapper) {
        function scrollProjectSlider(direction) {
            const card = sliderWrapper.querySelector('.project-card');
            if (!card) return;

            // Hitung lebar card + gap secara dinamis
            const style = window.getComputedStyle(sliderWrapper);
            const gap = parseFloat(style.gap) || 24;
            const scrollDistance = card.offsetWidth + gap;

            sliderWrapper.scrollBy({
                left: direction === 'next' ? scrollDistance : -scrollDistance,
                behavior: 'smooth'
            });
        }

        if (projectPrevBtn) {
            projectPrevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                scrollProjectSlider('prev');
            });
        }

        if (projectNextBtn) {
            projectNextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                scrollProjectSlider('next');
            });
        }

        // Perbarui feedback tombol saat mencapai ujung awal/akhir
        function updateSliderBtnState() {
            const maxScrollLeft = sliderWrapper.scrollWidth - sliderWrapper.clientWidth;
            const currentScroll = sliderWrapper.scrollLeft;

            if (projectPrevBtn) {
                if (currentScroll <= 5) {
                    projectPrevBtn.classList.add('disabled');
                    projectPrevBtn.style.opacity = '0.4';
                } else {
                    projectPrevBtn.classList.remove('disabled');
                    projectPrevBtn.style.opacity = '1';
                }
            }

            if (projectNextBtn) {
                if (currentScroll >= maxScrollLeft - 5) {
                    projectNextBtn.classList.add('disabled');
                    projectNextBtn.style.opacity = '0.4';
                } else {
                    projectNextBtn.classList.remove('disabled');
                    projectNextBtn.style.opacity = '1';
                }
            }
        }

        sliderWrapper.addEventListener('scroll', updateSliderBtnState, { passive: true });
        window.addEventListener('resize', updateSliderBtnState);
        setTimeout(updateSliderBtnState, 150);
    }

    /* ══════════════════════════════════════════════════════════
       7. POPUP MODAL FOR PROJECT IMAGES (Full Screen & Animated)
       ══════════════════════════════════════════════════════════ */
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('modalImageContainer');
    const closeModalBtn = document.getElementById('modalCloseBtn') || document.querySelector('.modal-close');

    if (modal && modalContent) {
        function openProjectModal(placeholder) {
            const card = placeholder.closest('.project-card');
            const projectTitle = card && card.querySelector('h3') ? card.querySelector('h3').textContent : 'Project Preview';
            const projectCategory = card && card.querySelector('.card-category') ? card.querySelector('.card-category').textContent : '';
            const projectNumber = card && card.querySelector('.card-number') ? card.querySelector('.card-number').textContent : '';
            const projectBadge = card && card.querySelector('.card-badge') ? card.querySelector('.card-badge').textContent : '';

            // Tampilkan gambar lebih besar dan detail project
            modalContent.innerHTML = `
                <div class="modal-preview-box">
                    ${placeholder.innerHTML}
                </div>
                <div class="modal-details">
                    <div class="modal-meta">
                        ${projectNumber ? `<span class="modal-number">${projectNumber}</span>` : ''}
                        ${projectBadge ? `<span class="modal-badge">${projectBadge}</span>` : ''}
                    </div>
                    <h3 class="modal-title">${projectTitle}</h3>
                    ${projectCategory ? `<p class="modal-category">${projectCategory}</p>` : ''}
                </div>
            `;

            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeProjectModal() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        // Buka modal saat area gambar project card diklik
        document.querySelectorAll('.card-img-placeholder').forEach(placeholder => {
            placeholder.addEventListener('click', (e) => {
                e.stopPropagation();
                openProjectModal(placeholder);
            });
        });

        // 1. Tutup dengan klik tombol X
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeProjectModal();
            });
        }

        // 2. Tutup dengan klik area overlay di luar content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProjectModal();
            }
        });

        // 3. Tutup dengan tombol Escape pada keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeProjectModal();
            }
        });
    }

    /* ══════════════════════════════════════════════════════════
       CONTACT — Envelope Touch Toggle & Floating Dots
       ══════════════════════════════════════════════════════════ */
    (function initContactEnvelope() {
        const wrapper = document.getElementById('envelopeWrapper');
        if (!wrapper) return;

        /* On touch devices, :hover doesn't persist — toggle .is-open on tap
           so the letter stays raised and the button remains clickable.       */
        let touchMoved = false;

        wrapper.addEventListener('touchstart', () => {
            touchMoved = false;
        }, { passive: true });

        wrapper.addEventListener('touchmove', () => {
            touchMoved = true;
        }, { passive: true });

        wrapper.addEventListener('touchend', (e) => {
            if (touchMoved) return;
            // Allow native clicks on the CTA button to pass through unaltered
            if (e.target.closest('.cta-btn')) return;
            wrapper.classList.toggle('is-open');
        });

        /* Keyboard: open on Enter/Space, close on Escape */
        wrapper.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                wrapper.classList.toggle('is-open');
            } else if (e.key === 'Escape') {
                wrapper.classList.remove('is-open');
            }
        });

        /* Decorative floating dots in #contact background */
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        const DOT_CONFIG = [
            { size: 9,  top: '12%',  left: '8%',   delay: '0s',    dur: '4.2s' },
            { size: 6,  top: '20%',  left: '78%',  delay: '0.8s',  dur: '5.1s' },
            { size: 11, top: '72%',  left: '12%',  delay: '0.3s',  dur: '3.8s' },
            { size: 7,  top: '80%',  left: '82%',  delay: '1.5s',  dur: '4.7s' },
            { size: 5,  top: '40%',  left: '91%',  delay: '0.6s',  dur: '5.5s' },
            { size: 8,  top: '55%',  left: '4%',   delay: '1.1s',  dur: '4.0s' },
            { size: 5,  top: '88%',  left: '48%',  delay: '0.2s',  dur: '6.2s' },
            { size: 10, top: '8%',   left: '52%',  delay: '1.9s',  dur: '3.5s' },
        ];

        const frag = document.createDocumentFragment();
        DOT_CONFIG.forEach(cfg => {
            const dot = document.createElement('span');
            dot.className = 'contact-dot';
            dot.setAttribute('aria-hidden', 'true');
            dot.style.cssText = `
                position: absolute;
                width: ${cfg.size}px;
                height: ${cfg.size}px;
                border-radius: 50%;
                background: rgba(127, 181, 168, 0.28);
                top: ${cfg.top};
                left: ${cfg.left};
                animation: contactDotFloat ${cfg.dur} ease-in-out ${cfg.delay} infinite alternate;
                pointer-events: none;
                z-index: 0;
            `;
            frag.appendChild(dot);
        });
        contactSection.appendChild(frag);

        /* Inject keyframe only once */
        if (!document.getElementById('contactDotStyle')) {
            const style = document.createElement('style');
            style.id = 'contactDotStyle';
            style.textContent = `
                @keyframes contactDotFloat {
                    from { transform: translateY(0) scale(1); opacity: 0.55; }
                    to   { transform: translateY(-14px) scale(1.18); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    })();

})();
