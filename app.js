/**
 * ============================================================================
 * CITY-3 WEDDING INVITATION — APPLICATION & ANIMATION ENGINE
 * ============================================================================
 * Implements:
 *  1. Centralized Config Data Binding (from window.WEDDING_CONFIG)
 *  2. 240Hz Fixed-Timestep Falling Rose Petals Canvas Physics Engine
 *  3. Hero Multi-Plane Spring Entrance & Scroll Parallax
 *  4. Sailing Ship Scroll-In-View & Rocking Dividers
 *  5. Ornate Mirror Infinite Auto-Playing Slideshow (with Touch Swipe)
 *  6. Sticky Scroll-Translated CTA Sections
 *  7. Floating Pulsing Audio Player
 *  8. Live Tabular Countdown Timer
 */

(function () {
  "use strict";

  const CFG = window.WEDDING_CONFIG || {};

  // SVG paths from Framer Audio Component (SlideShow.mjs)
  const PLAY_SVG_PATH =
    "M 5.379 1.292 C 4.968 1.033 4.449 1.017 4.023 1.251 C 3.598 1.486 3.334 1.933 3.333 2.419 L 3.333 13.581 C 3.334 14.067 3.598 14.514 4.023 14.749 C 4.449 14.983 4.968 14.967 5.379 14.708 L 14.215 9.127 C 14.602 8.883 14.836 8.457 14.836 8 C 14.602 7.117 14.215 6.873 14.215 6.873 Z";
  const PAUSE_SVG_HTML =
    '<rect x="3.5" y="2" width="3.2" height="12" rx="1" fill="#333"></rect><rect x="9.3" y="2" width="3.2" height="12" rx="1" fill="#333"></rect>';

  /* ==========================================================================
     1. POPULATE DOM FROM WEDDING_CONFIG
     ========================================================================== */
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined) {
      el.textContent = value;
    }
  }

  function setAttr(id, attr, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined) {
      el.setAttribute(attr, value);
    }
  }

  function applyWeddingConfig() {
    if (CFG.meta?.title) {
      document.title = CFG.meta.title;
    }

    // Hero Section
    if (CFG.hero) {
      setText("hero-groom", CFG.hero.groomName);
      setText("hero-weds", CFG.hero.conjunction);
      setText("hero-bride", CFG.hero.brideName);
    }

    // Invite Section
    if (CFG.invite) {
      setText("invite-mantra", CFG.invite.mantra);
      setAttr("invite-ganesha-img", "src", CFG.invite.ganeshaIcon);
      setText("invite-blessing-intro", CFG.invite.blessingIntro);
      setText("invite-grandparents", CFG.invite.grandparents);
      setText("invite-divider", CFG.invite.divider);
      setText("invite-groom-parents", CFG.invite.groomParents);
      setText("invite-headline", CFG.invite.inviteHeadline);
      setText("invite-subheadline", CFG.invite.inviteSubheadline);
      setText("invite-couple-1", CFG.invite.coupleName1);
      setText("invite-couple-amp", CFG.invite.coupleAmpersand);
      setText("invite-couple-2", CFG.invite.coupleName2);
      setText("invite-bride-relation", CFG.invite.brideParentsRelation);
      setText("invite-bride-parents", CFG.invite.brideParentsNames);
      setText("invite-events-intro", CFG.invite.eventsIntro);
    }

    // Events Grid (6 Cards)
    const eventsGrid = document.getElementById("events-grid");
    if (eventsGrid && Array.isArray(CFG.events)) {
      eventsGrid.innerHTML = CFG.events
        .map(
          (ev) => `
        <div class="event-card-slot">
          <article class="event-card">
            ${
              ev.image
                ? `<div class="event-card-art">
              <div class="event-card-inside">
                <img src="${ev.image}" alt="${ev.title}" loading="lazy" decoding="async" />
              </div>
            </div>`
                : ""
            }
            <div class="event-card-details">
              <h3 class="event-card-title">${ev.title}</h3>
              <p class="event-card-meta">${ev.datetime}</p>
              <p class="event-card-meta">${ev.venue}</p>
              <a class="event-card-link" href="${ev.mapUrl}" target="_blank" rel="noopener noreferrer">${ev.mapLabel || "See the route"}</a>
            </div>
          </article>
        </div>`
        )
        .join("");
    }

    // Location CTA (Rotating Mandala Medallion 1)
    if (CFG.locationCta) {
      setText("cta-location-headline", CFG.locationCta.headline);
      setText("cta-location-subtext", CFG.locationCta.subtext);
      setAttr("cta-location-btn", "href", CFG.locationCta.url);
      if (CFG.locationCta.ringImage)
        setAttr("cta-location-ring-img", "src", CFG.locationCta.ringImage);
      if (CFG.locationCta.innerImage)
        setAttr("cta-location-inner-img", "src", CFG.locationCta.innerImage);
      if (CFG.locationCta.iconImage)
        setAttr("cta-location-icon-img", "src", CFG.locationCta.iconImage);
    }

    // Couple Section & RSVP CTA (Rotating Mandala Medallion 2)
    if (CFG.coupleSection) {
      setText("couple-heading-top", CFG.coupleSection.headingTop);
      setText("couple-heading-bottom", CFG.coupleSection.headingBottom);
      setText("couple-story-message", CFG.coupleSection.message);

      if (CFG.coupleSection.rsvpCta) {
        setText("cta-rsvp-headline", CFG.coupleSection.rsvpCta.headline);
        setText("cta-rsvp-subtext", CFG.coupleSection.rsvpCta.subtext);
        setAttr("cta-rsvp-btn", "href", CFG.coupleSection.rsvpCta.url);
        if (CFG.coupleSection.rsvpCta.ringImage)
          setAttr("cta-rsvp-ring-img", "src", CFG.coupleSection.rsvpCta.ringImage);
        if (CFG.coupleSection.rsvpCta.innerImage)
          setAttr("cta-rsvp-inner-img", "src", CFG.coupleSection.rsvpCta.innerImage);
        if (CFG.coupleSection.rsvpCta.iconImage)
          setAttr("cta-rsvp-icon-img", "src", CFG.coupleSection.rsvpCta.iconImage);
      }
    }

    // Things to Know Section & Instagram CTA (Rotating Mandala Medallion 3)
    if (CFG.thingsToKnow) {
      setText("things-heading-top", CFG.thingsToKnow.headingTop);
      setText("things-heading-bottom", CFG.thingsToKnow.headingBottom);
      setText("things-intro-description", CFG.thingsToKnow.description);

      const thingsGrid = document.getElementById("things-grid");
      if (thingsGrid && Array.isArray(CFG.thingsToKnow.items)) {
        thingsGrid.innerHTML = CFG.thingsToKnow.items
          .map(
            (item) => `
          <div class="thing-card-slot">
            <div class="thing-card">
              ${
                item.icon
                  ? `<div class="thing-icon">
                <img src="${item.icon}" alt="${item.title}" loading="lazy" decoding="async" />
              </div>`
                  : ""
              }
              <h3 class="thing-title">${item.title}</h3>
              <p class="thing-text">${item.text}</p>
            </div>
          </div>`
          )
          .join("");
      }

      if (CFG.thingsToKnow.instagramCta) {
        setText("cta-instagram-headline", CFG.thingsToKnow.instagramCta.headline);
        setText("cta-instagram-subtext", CFG.thingsToKnow.instagramCta.subtext);
        setAttr("cta-instagram-btn", "href", CFG.thingsToKnow.instagramCta.url);
        if (CFG.thingsToKnow.instagramCta.ringImage)
          setAttr("cta-instagram-ring-img", "src", CFG.thingsToKnow.instagramCta.ringImage);
        if (CFG.thingsToKnow.instagramCta.innerImage)
          setAttr("cta-instagram-inner-img", "src", CFG.thingsToKnow.instagramCta.innerImage);
        if (CFG.thingsToKnow.instagramCta.iconImage)
          setAttr("cta-instagram-icon-img", "src", CFG.thingsToKnow.instagramCta.iconImage);
      }
    }

    // Footer & Countdown
    if (CFG.footer) {
      setText("footer-heading-top", CFG.footer.headingTop);
      setText("footer-heading-bottom", CFG.footer.headingBottom);
      setText("footer-closing-line1", CFG.footer.closingLine1);
      setText("footer-closing-line2", CFG.footer.closingLine2);
      setText("footer-back-to-top", CFG.footer.backToTopLabel);
      setText("footer-copyright", CFG.footer.copyright);
    }
  }

  /* ==========================================================================
     2. 240Hz FIXED-TIMESTEP FALLING PETALS CANVAS ENGINE (Exact Port of Sn)
     ========================================================================== */
  function initPetalCanvas() {
    const canvas = document.getElementById("petals-canvas");
    if (!canvas || CFG.petals?.enabled === false) return;

    const pCfg = Object.assign(
      {
        spriteSrc: "assets/petal.png",
        particleCountDesktop: 60,
        particleCountMobile: 30,
        particleSize: 4,
        speed: 0.5,
        rotationSpeed: 5,
        fadeDuration: 2,
        density: 3,
      },
      CFG.petals || {}
    );

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let spriteImg = null;
    const img = new Image();
    img.src = pCfg.spriteSrc;
    img.onload = () => {
      spriteImg = img;
    };

    let dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    let width = 800;
    let height = 600;
    let lastWidth = 0;
    let lastHeight = 0;
    let particles = [];
    let lastTime = 0;
    let accumulator = 0;
    let avgDelta = 1 / 60;
    const FIXED_STEP = 1 / 240;

    function getTargetParticleCount() {
      return window.innerWidth <= 809.98
        ? pCfg.particleCountMobile
        : pCfg.particleCountDesktop;
    }

    function spawnParticles(w, h, count) {
      const list = [];
      const rotFactor = (pCfg.rotationSpeed * 2.25 * Math.PI) / 180;
      for (let i = 0; i < count; i++) {
        const baseVel = 44.94 * pCfg.speed * pCfg.density;
        const x = Math.random() * w;
        const y = Math.random() * h;
        const rot = Math.random() * Math.PI * 2;
        list.push({
          x,
          y,
          prevX: x,
          prevY: y,
          vx: (Math.random() - 0.5) * baseVel * 0.08,
          vy: (Math.random() * 0.6 + 0.4) * baseVel,
          vyMax: (Math.random() * 0.35 + 0.85) * baseVel,
          size: Math.random() * pCfg.particleSize + pCfg.particleSize,
          rotation: rot,
          prevRotation: rot,
          rotationSpeed: (Math.random() * 0.6 + 0.7) * rotFactor,
          fade: Math.random() * Math.max(0.001, pCfg.fadeDuration),
          windPhase: Math.random() * Math.PI * 2,
          windSpeed: Math.random() * 0.06 + 0.02,
        });
      }
      particles = list;
    }

    function stepPhysics(w, h, dt) {
      const respawnVel = 42 * pCfg.speed * pCfg.density;
      const gravity = 21.6 * pCfg.speed * pCfg.density;
      const windAmp = 3.6 * pCfg.speed * pCfg.density;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.prevX = p.x;
        p.prevY = p.y;
        p.prevRotation = p.rotation;

        const wind = Math.sin(p.windPhase) * windAmp;
        p.windPhase += p.windSpeed * dt;
        p.vx += wind * dt;
        p.vx *= 0.995;
        p.vy += gravity * dt;
        if (p.vy > p.vyMax) p.vy = p.vyMax;

        p.x += (p.vx + wind * 0.08) * dt;
        p.y += p.vy * dt;
        p.rotation += p.rotationSpeed * dt;
        if (p.rotation > Math.PI * 2) p.rotation -= Math.PI * 2;
        p.fade += dt;

        if (p.x < -40) {
          p.x = w + 40;
          p.fade = 0;
        } else if (p.x > w + 40) {
          p.x = -40;
          p.fade = 0;
        }

        if (p.y > h + 40) {
          p.y = -40;
          p.x = Math.random() * w;
          p.vy = (Math.random() * 0.6 + 0.4) * respawnVel;
          p.vyMax = (Math.random() * 0.35 + 0.85) * respawnVel;
          p.vx = (Math.random() - 0.5) * respawnVel * 0.08;
          p.fade = 0;
          p.windPhase = Math.random() * Math.PI * 2;
        }
      }
    }

    function renderParticles(w, h, alpha) {
      ctx.clearRect(0, 0, w, h);
      const hasSprite =
        spriteImg && spriteImg.complete && spriteImg.naturalWidth > 0;
      const scaleFactor = Math.min(1, Math.max(0.67, w / 800));
      const interp = Math.max(0, Math.min(1, alpha));
      const fadeDur = pCfg.fadeDuration;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const drawSize = Math.max(2, p.size * 10 * scaleFactor);
        const rx = p.prevX + (p.x - p.prevX) * interp;
        const ry = p.prevY + (p.y - p.prevY) * interp;
        const rRot = p.prevRotation + (p.rotation - p.prevRotation) * interp;

        const linearFade = Math.max(
          0,
          Math.min(1, fadeDur <= 0 ? 1 : p.fade / fadeDur)
        );
        // Hermite smoothstep curve: 3t^2 - 2t^3
        const opacity = linearFade * linearFade * (3 - 2 * linearFade);

        if (hasSprite) {
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.translate(rx, ry);
          ctx.rotate(rRot);
          ctx.drawImage(
            spriteImg,
            -drawSize / 2,
            -drawSize / 2,
            drawSize,
            drawSize
          );
          ctx.restore();
        } else {
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(
            rx,
            ry,
            Math.max(1, p.size * scaleFactor),
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "rgba(255, 210, 220, 0.9)";
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    }

    function measureAndResize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
      const newW = Math.max(1, Math.round(rect.width));
      const newH = Math.max(1, Math.round(rect.height));

      width = newW;
      height = newH;
      canvas.width = Math.max(1, Math.round(newW * dpr));
      canvas.height = Math.max(1, Math.round(newH * dpr));

      const targetCount = getTargetParticleCount();
      if (
        particles.length !== targetCount ||
        Math.abs(lastWidth - newW) > 24 ||
        Math.abs(lastHeight - newH) > 24
      ) {
        spawnParticles(newW, newH, targetCount);
        lastWidth = newW;
        lastHeight = newH;
        lastTime = 0;
        accumulator = 0;
      }
    }

    function tick(now) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const prev = lastTime || now;
      const dt = Math.max(0, (now - prev) / 1000);
      lastTime = now;

      avgDelta = avgDelta * 0.9 + dt * 0.1;
      const clampedDt = Math.min(0.033, avgDelta);

      accumulator = Math.min(0.1, accumulator + clampedDt);
      while (accumulator >= FIXED_STEP) {
        stepPhysics(width, height, FIXED_STEP);
        accumulator -= FIXED_STEP;
      }

      const alpha = accumulator / FIXED_STEP;
      renderParticles(width, height, alpha);
      requestAnimationFrame(tick);
    }

    measureAndResize();
    if (typeof ResizeObserver !== "undefined" && canvas.parentElement) {
      const ro = new ResizeObserver(measureAndResize);
      ro.observe(canvas.parentElement);
    }
    window.addEventListener("resize", measureAndResize, { passive: true });
    requestAnimationFrame(tick);
  }

  /* ==========================================================================
     3. HERO ENTRANCE & SCROLL PARALLAX + STICKY CTA & ROTATING MANDALA MEDALLIONS
     ========================================================================== */
  function initHeroAndScrollEffects() {
    const sky2 = document.getElementById("hero-sky-2");
    const structure = document.getElementById("hero-structure");
    const petalsContainer = document.getElementById("petals-canvas-container");
    const heroWords = document.querySelectorAll(".hero-word");
    const coupleContainer = document.getElementById("hero-couple-container");
    const ctaSections = document.querySelectorAll(".cta-sticky-section");
    const mandalaRings = document.querySelectorAll("[data-mandala-ring]");

    // Store per-medallion scroll rotation state (from Framer's onScroll: 1002deg -> 0deg)
    const mandalaScrollState = new WeakMap();
    mandalaRings.forEach((ring) => {
      mandalaScrollState.set(ring, 0);
    });

    // Trigger Hero entrance animations on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (sky2) sky2.classList.add("is-visible");
        if (structure) structure.classList.add("is-entered");
        if (petalsContainer) petalsContainer.classList.add("is-entered");
        heroWords.forEach((w) => w.classList.add("is-entered"));
      });
    });

    // Scroll Parallax for Couple Names & Scroll-Linked Transforms for Sticky Mandala CTAs
    function updateScrollTransforms() {
      const scrollY = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight || 800;
      const isMobile = window.innerWidth <= 809.98;

      // Couple names parallax (speed: 50 in Framer)
      if (coupleContainer && scrollY < 2800) {
        const parallaxOffset = scrollY * 0.28;
        coupleContainer.style.setProperty(
          "--parallax-y",
          `${parallaxOffset.toFixed(1)}px`
        );
      }

      // Sticky CTA scroll-linked translation & scroll-linked mandala rotation
      const maxTranslate = isMobile ? 280 : 380;
      ctaSections.forEach((sec) => {
        const mover = sec.querySelector(".cta-scroll-mover");
        const ring = sec.querySelector("[data-mandala-ring]");
        const rect = sec.getBoundingClientRect();
        // Progress from when section top enters bottom of viewport to when it leaves top
        const totalTravel = Math.max(1, vh + rect.height);
        const currentTravel = vh - rect.top;
        const progress = Math.max(0, Math.min(1, currentTravel / totalTravel));

        if (mover) {
          const yOffset = progress * maxTranslate;
          mover.style.setProperty("--cta-scroll-y", `${yOffset.toFixed(1)}px`);
        }

        if (ring) {
          // Replicates Framer Motion onScroll rotation (0deg <-> 240deg across section scroll)
          const scrollDeg = (1 - progress) * 240;
          mandalaScrollState.set(ring, scrollDeg);
        }
      });
    }

    // Continuous 10-second ease-in-out mirror loop (0deg <-> 365deg) + scroll rotation
    // Exact port of Framer Mountain mandala animation:
    //   transition: { duration: 10, ease: [0.44, 0, 0.56, 1], repeat: Infinity, repeatType: "mirror" }
    const LOOP_DURATION_MS = 10000;
    const MAX_LOOP_DEG = 365;
    const startTime = performance.now();

    function easeInOutMandala(t) {
      // Smooth cubic-bezier(0.44, 0, 0.56, 1) approximation
      return t < 0.5
        ? 2 * t * t * (1.15 - 0.3 * t)
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function tickMandalaRings(now) {
      const elapsed = Math.max(0, now - startTime);
      const cycle = Math.floor(elapsed / LOOP_DURATION_MS);
      const rawPhase = (elapsed % LOOP_DURATION_MS) / LOOP_DURATION_MS;
      // Mirror ping-pong: even cycles go 0 -> 1, odd cycles go 1 -> 0
      const mirroredPhase = cycle % 2 === 0 ? rawPhase : 1 - rawPhase;
      // Smooth sine/bezier ease-in-out curve in [0, 1]
      const eased = 0.5 - 0.5 * Math.cos(mirroredPhase * Math.PI);
      const loopDeg = eased * MAX_LOOP_DEG;

      mandalaRings.forEach((ring) => {
        const scrollDeg = mandalaScrollState.get(ring) || 0;
        const totalDeg = loopDeg + scrollDeg;
        ring.style.setProperty("--mandala-rot", `${totalDeg.toFixed(2)}deg`);
      });

      requestAnimationFrame(tickMandalaRings);
    }

    window.addEventListener("scroll", updateScrollTransforms, { passive: true });
    window.addEventListener("resize", updateScrollTransforms, { passive: true });
    updateScrollTransforms();

    if (mandalaRings.length > 0) {
      requestAnimationFrame(tickMandalaRings);
    }
  }

  /* ==========================================================================
     4. SAILING SHIP DIVIDERS (SCROLL IN-VIEW ENTRANCE + CONTINUOUS ROCKING)
     ========================================================================== */
  function initShipDividers() {
    const ships = document.querySelectorAll(".ship-entrance-target");
    if (!ships.length) return;

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-inview");
            }
          });
        },
        { threshold: 0.1 }
      );
      ships.forEach((ship) => io.observe(ship));
    } else {
      ships.forEach((ship) => ship.classList.add("is-inview"));
    }
  }

  /* ==========================================================================
     5. ORNATE MIRROR INFINITE SLIDESHOW (Auto-Play + Arrows + Touch Swipe)
     ========================================================================== */
  function initMirrorSlideshow() {
    const viewport = document.getElementById("mirror-slideshow-viewport");
    const track = document.getElementById("mirror-slideshow-track");
    const prevBtn = document.getElementById("mirror-prev-btn");
    const nextBtn = document.getElementById("mirror-next-btn");
    if (!viewport || !track) return;

    const photos = Array.isArray(CFG.coupleSection?.photos)
      ? CFG.coupleSection.photos.filter((p) => p && p.src)
      : [];

    const count = photos.length;
    if (count === 0) {
      const controls = viewport.querySelector(".mirror-controls");
      if (controls) controls.style.display = "none";
      return;
    }

    // Build [lastClone, ...photos, firstClone] for seamless infinite looping
    const slidesData = [photos[count - 1], ...photos, photos[0]];
    track.innerHTML = slidesData
      .map(
        (p) => `
      <div class="mirror-slide">
        <img src="${p.src}" alt="${p.alt || "Wedding couple"}" decoding="async" />
      </div>`
      )
      .join("");

    let currentIndex = 1; // Start on first real slide
    let isTransitioning = false;
    const intervalMs = CFG.coupleSection?.slideshowIntervalMs || 2000;
    let timer = null;

    function updatePosition(animate) {
      track.style.transition = animate
        ? "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)"
        : "none";
      track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
    }

    function goToSlide(index) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex = index;
      updatePosition(true);
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    track.addEventListener("transitionend", () => {
      isTransitioning = false;
      if (currentIndex >= count + 1) {
        currentIndex = 1;
        updatePosition(false);
      } else if (currentIndex <= 0) {
        currentIndex = count;
        updatePosition(false);
      }
    });

    function startAutoPlay() {
      stopAutoPlay();
      timer = setInterval(nextSlide, intervalMs);
    }

    function stopAutoPlay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoPlay();
      });
    }

    // Touch / pointer swipe support
    let startX = 0;
    let isDragging = false;

    viewport.addEventListener(
      "pointerdown",
      (e) => {
        if (e.target.closest("button")) return;
        startX = e.clientX;
        isDragging = true;
        stopAutoPlay();
      },
      { passive: true }
    );

    window.addEventListener(
      "pointerup",
      (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = e.clientX - startX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) nextSlide();
          else prevSlide();
        }
        startAutoPlay();
      },
      { passive: true }
    );

    updatePosition(false);
    startAutoPlay();
  }

  /* ==========================================================================
     6. FLOATING PULSING AUDIO PLAYER
     ========================================================================== */
  function initAudioPlayer() {
    const audio = document.getElementById("wedding-audio");
    const btn = document.getElementById("music-toggle-btn");
    const iconSvg = document.getElementById("music-icon-svg");
    if (!audio || !btn || !iconSvg) return;

    if (CFG.meta?.musicSrc) {
      audio.src = CFG.meta.musicSrc;
    }

    function updateIcon(isPlaying) {
      if (isPlaying) {
        iconSvg.innerHTML = PAUSE_SVG_HTML;
        btn.setAttribute("aria-label", "Pause music");
      } else {
        iconSvg.innerHTML = `<path d="${PLAY_SVG_PATH}" fill="#333"></path>`;
        btn.setAttribute("aria-label", "Play music");
      }
    }

    function togglePlay() {
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }

    btn.addEventListener("click", togglePlay);
    audio.addEventListener("play", () => updateIcon(true));
    audio.addEventListener("pause", () => updateIcon(false));

    // Attempt autoplay if configured, or start on first user interaction
    if (CFG.meta?.autoplayMusic !== false) {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          updateIcon(false);
        });
      }
    }
  }

  /* ==========================================================================
     7. LIVE COUNTDOWN TIMER (DD D  HH H  MM M)
     ========================================================================== */
  function initCountdown() {
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    if (!daysEl || !hoursEl || !minutesEl) return;

    const targetIso = CFG.footer?.targetDate || "2027-03-10T00:00:00.000Z";
    const targetMs = new Date(targetIso).getTime();

    function updateTimer() {
      const now = Date.now();
      const diffMs = Math.max(0, targetMs - now);
      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const days = Math.floor(totalMinutes / (60 * 24));
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
      const minutes = totalMinutes % 60;

      daysEl.textContent = `${String(days).padStart(2, "0")} D `;
      hoursEl.textContent = `${String(hours).padStart(2, "0")} H `;
      minutesEl.textContent = `${String(minutes).padStart(2, "0")} M `;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* ==========================================================================
     INITIALIZE ALL MODULES ON DOM CONTENT LOADED
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    applyWeddingConfig();
    initHeroAndScrollEffects();
    initPetalCanvas();
    initShipDividers();
    initMirrorSlideshow();
    initAudioPlayer();
    initCountdown();
  });
})();

