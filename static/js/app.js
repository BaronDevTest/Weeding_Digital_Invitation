'use strict';

(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================
  // Smooth scroll engine
  //
  // Custom RAF-based smooth scroll with ease-out cubic + manual
  // scroll cancellation. Feels noticeably smoother than CSS
  // scroll-behavior: smooth on mobile.
  // ============================================================
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function smoothScrollTo(targetY, duration) {
    duration = duration || 750;

    if (prefersReducedMotion) {
      window.scrollTo(0, targetY);
      return;
    }

    var startY = window.scrollY || window.pageYOffset;
    var distance = targetY - startY;
    if (Math.abs(distance) < 2) return;

    var startTime = null;
    var cancelled = false;
    var lastY = startY;

    function onUserScroll(e) {
      // Only cancel if movement was truly user-driven, not our own scrollTo.
      // Our programmatic scroll fires scroll events too — but never wheel/touch.
      cancelled = true;
      cleanup();
    }
    function cleanup() {
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('touchmove', onUserScroll);
      window.removeEventListener('keydown', onUserScroll);
    }

    window.addEventListener('wheel', onUserScroll, { passive: true });
    window.addEventListener('touchmove', onUserScroll, { passive: true });
    window.addEventListener('keydown', onUserScroll);

    function step(now) {
      if (cancelled) return;
      if (startTime === null) startTime = now;
      var elapsed = now - startTime;
      var t = Math.min(elapsed / duration, 1);
      var eased = easeOutCubic(t);
      var y = startY + distance * eased;
      window.scrollTo(0, y);
      lastY = y;
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        cleanup();
      }
    }
    requestAnimationFrame(step);
  }

  // Intercept all in-page anchor clicks. We preventDefault to avoid the
  // browser's native (uncontrollable) smooth scroll, then run our own.
  // If JS fails to load, the native CSS smooth scroll still works as fallback.
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    var target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();

    // Pause the bob animation while scrolling so the button doesn't jitter
    link.classList.add('is-scrolling');
    setTimeout(function () { link.classList.remove('is-scrolling'); }, 900);

    // Update the URL hash without triggering native scroll
    if (history.pushState) {
      history.pushState(null, '', hash);
    }

    var rect = target.getBoundingClientRect();
    var targetY = rect.top + (window.scrollY || window.pageYOffset);
    smoothScrollTo(targetY, 750);
  });

  // ============================================================
  // Loader
  // ============================================================
  window.addEventListener('load', function () {
    setTimeout(function () {
      var loader = document.getElementById('loader');
      if (loader) loader.classList.add('hidden');
    }, 1400);
  });

  // ============================================================
  // Falling petals (decorative, skipped if user prefers reduced motion)
  // ============================================================
  (function createPetals () {
    var container = document.getElementById('petals');
    if (!container || prefersReducedMotion) return;
    var count = 14;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.className = 'petal';
      p.style.left = (Math.random() * 100) + 'vw';
      p.style.animationDuration = (10 + Math.random() * 12) + 's';
      p.style.animationDelay = (Math.random() * 18) + 's';
      p.style.transform = 'scale(' + (0.6 + Math.random() * 0.8) + ')';
      p.style.opacity = (0.35 + Math.random() * 0.45);
      container.appendChild(p);
    }
  })();

  // ============================================================
  // Hero video — unmute toggle + smooth scroll on end
  // ============================================================
  var video = document.getElementById('introVideo');
  var unmuteBtn = document.getElementById('unmuteBtn');
  var welcome = document.getElementById('welcome');

  function setIcon () {
    if (!video || !unmuteBtn) return;
    unmuteBtn.innerHTML = video.muted ? '&#128263;' : '&#128266;';
  }
  setIcon();

  if (unmuteBtn && video) {
    unmuteBtn.addEventListener('click', function () {
      video.muted = !video.muted;
      if (!video.muted) { video.play().catch(function () {}); }
      setIcon();
    });
  }

  if (video && welcome) {
    video.addEventListener('ended', function () {
      var rect = welcome.getBoundingClientRect();
      var targetY = rect.top + (window.scrollY || window.pageYOffset);
      smoothScrollTo(targetY, 900);
    });
  }

  // ============================================================
  // Countdown — editeaza data nuntii (an, luna-1, zi, ore, minute)
  // ============================================================
  var weddingDate = new Date(2027, 6, 23, 14, 0, 0).getTime();

  function pad(n, l) {
    l = l || 2;
    var s = String(n);
    while (s.length < l) s = '0' + s;
    return s;
  }

  function updateCountdown () {
    var diff = Math.max(0, weddingDate - Date.now());
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff / 3600000) % 24);
    var mins = Math.floor((diff / 60000) % 60);
    var secs = Math.floor((diff / 1000) % 60);
    var d = document.getElementById('cd-days');
    var h = document.getElementById('cd-hours');
    var m = document.getElementById('cd-mins');
    var s = document.getElementById('cd-secs');
    if (d) d.textContent = pad(days, 3);
    if (h) h.textContent = pad(hours);
    if (m) m.textContent = pad(mins);
    if (s) s.textContent = pad(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ============================================================
  // Scroll reveal (IntersectionObserver)
  // ============================================================
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  // ============================================================
  // RSVP form
  // ============================================================
  window.handleRsvp = function (e) {
    e.preventDefault();
    var form = document.getElementById('rsvpForm');
    var success = document.getElementById('formSuccess');
    if (!form || !success) return;

    // TODO: trimite datele catre backend / Google Form / email
    // fetch('/api/rsvp', { method: 'POST', body: new FormData(form) });

    form.style.display = 'none';
    success.classList.add('active');

    var rect = success.getBoundingClientRect();
    var targetY = rect.top + (window.scrollY || window.pageYOffset) - window.innerHeight / 4;
    smoothScrollTo(Math.max(0, targetY), 600);
  };
})();
