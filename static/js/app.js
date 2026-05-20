'use strict';

(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================
  // i18n — Romanian (default), English, Russian
  // ============================================================
  var SUPPORTED_LANGS = ['ro', 'en', 'ru'];
  var DEFAULT_LANG = 'ro';
  var STORAGE_KEY = 'wedding-lang';

  var TRANSLATIONS = {
    ro: {
      'page.title': 'Daniela & Cristian — 23 Iulie 2027',
      'page.description': 'Vă invităm la nunta noastră — Daniela & Cristian, 23 Iulie 2027, Chișinău',

      'lang.switchAria': 'Schimbă limba',
      'hero.topLabel': 'Vă invităm la nunta noastră',
      'hero.unmuteAria': 'Activează sunetul',
      'hero.muteAria': 'Dezactivează sunetul',
      'hero.replayAria': 'Reia videoclipul',
      'hero.scrollHint': 'Detalii',
      'hero.scrollHintAria': 'Vezi detaliile',
      'hero.date': '23 · 07 · 2027',

      'quote.text': '„Iubirea este răbdătoare, iubirea este binevoitoare, nu invidiază, nu se laudă, nu se mândrește, nu se poartă necuviincios... iubirea nu cade niciodată."',
      'quote.blessing': 'Cu binecuvântarea părinților',
      'quote.parents': 'Iurie & Aliona · Vasile & Maria',

      'countdown.eyebrow': 'Numărătoarea inversă',
      'countdown.title': 'Mai sunt',
      'countdown.days': 'Zile',
      'countdown.hours': 'Ore',
      'countdown.mins': 'Minute',
      'countdown.secs': 'Secunde',
      'countdown.tagline': 'până când vom spune <em>„Da, pentru totdeauna"</em>',

      'saveDate.eyebrow': 'Save the Date',
      'saveDate.title': 'Invitația noastră',
      'saveDate.cardAria': 'Invitație de nuntă',
      'saveDate.label': 'Vă invităm la nunta noastră',
      'saveDate.date': '23 Iulie 2027',
      'saveDate.welcome': 'vă așteptăm cu drag',
      'saveDate.venue': 'Villa Garden · Chișinău',

      'story.eyebrow': 'Povestea noastră',
      'story.title': 'Cum am ajuns aici',
      'story.item1.date': 'Septembrie 2019',
      'story.item1.title': 'Prima privire',
      'story.item1.text': 'Ne-am întâlnit la o petrecere a prietenilor comuni, într-o seară de toamnă. O privire a fost de ajuns.',
      'story.item2.date': 'Februarie 2021',
      'story.item2.title': 'Primul „te iubesc"',
      'story.item2.text': 'După doi ani de râsete, drumuri și nopți lungi, am rostit pentru prima dată cuvintele care aveau să schimbe totul.',
      'story.item3.date': 'August 2023',
      'story.item3.title': 'Acasă, împreună',
      'story.item3.text': 'Am cumpărat prima noastră casă și am început să visăm la viitorul pe care vrem să-l construim împreună.',
      'story.item4.date': 'Decembrie 2025',
      'story.item4.title': '„Vrei să fii soția mea?"',
      'story.item4.text': 'Sub luminile orașului, în prima zi de iarnă, am spus „Da". Și de atunci, totul are sens.',
      'story.item5.date': '23 Iulie 2027',
      'story.item5.title': 'Pentru totdeauna',
      'story.item5.text': 'Și acum, vrem să avem alături oamenii dragi nouă, ca să sărbătorim împreună începutul unei vieți noi.',

      'events.eyebrow': 'Detaliile zilei',
      'events.title': 'Programul nunții',
      'events.church.type': 'Cununia religioasă',
      'events.church.name': 'la biserică',
      'events.church.time': 'Ora 14:00',
      'events.church.venue': 'Biserica „Sfinții Împărați Constantin și Elena"',
      'events.church.address': 'Strada Mitropolit Varlaam 84, Chișinău',
      'events.party.type': 'Petrecerea',
      'events.party.name': 'restaurantul',
      'events.party.time': 'Ora 17:00',
      'events.party.venue': 'Villa Garden Restaurant',
      'events.party.address': 'Bulevardul Decebal 16, Chișinău',

      'location.eyebrow': 'Locația',
      'location.title': 'Vă așteptăm aici',
      'location.iframeTitle': 'Locația nunții — Villa Garden',
      'location.name': 'Villa Garden',
      'location.address': 'Bulevardul Decebal 16 · Chișinău',
      'location.button': 'Deschide în Google Maps',

      'program.eyebrow': 'Cronologia zilei',
      'program.title': 'Ce vă așteaptă',
      'program.item1.title': 'Cununia religioasă',
      'program.item1.desc': 'Momentul în care vom rosti jurămintele în fața Domnului',
      'program.item2.title': 'Sesiune foto',
      'program.item2.desc': 'Câteva cadre pentru amintire, cu noi și cei mai dragi',
      'program.item3.title': 'Cocktail de bun venit',
      'program.item3.desc': 'Vă întâmpinăm la Villa Garden cu șampanie și aperitive',
      'program.item4.title': 'Cina festivă',
      'program.item4.desc': 'Un meniu pregătit cu grijă pentru o seară perfectă',
      'program.item5.title': 'Primul dans',
      'program.item5.desc': 'Apoi vă invităm pe ringul de dans alături de noi',
      'program.item6.title': 'Tortul miresei',
      'program.item6.desc': 'Un moment dulce înainte de petrecerea care continuă până în zori',

      'dress.eyebrow': 'Dress code',
      'dress.title': 'Ținută',
      'dress.name': 'Elegant romantic',
      'dress.desc': 'Vă rugăm să vă bucurați alături de noi într-o ținută elegantă. Sugestie: nuanțe pastel sau pământii, cu accente metalice. Domnii — costum închis la culoare. Doamnele — rochie de seară.',
      'dress.swatchesAria': 'Sugestii de culori',

      'gallery.eyebrow': 'Galerie',
      'gallery.title': 'Momentele noastre',

      'lightbox.closeAria': 'Închide',
      'lightbox.prevAria': 'Imaginea anterioară',
      'lightbox.nextAria': 'Imaginea următoare',

      'final.msg': '„Pentru că dragostea adevărată<br/>nu se vede cu ochii,<br/>ci se simte cu inima."',

      'footer.text': 'Cu drag, Daniela & Cristian'
    },

    en: {
      'page.title': 'Daniela & Cristian — July 23, 2027',
      'page.description': 'We invite you to our wedding — Daniela & Cristian, July 23, 2027, Chișinău',

      'lang.switchAria': 'Change language',
      'hero.topLabel': 'We invite you to our wedding',
      'hero.unmuteAria': 'Unmute',
      'hero.muteAria': 'Mute',
      'hero.replayAria': 'Replay video',
      'hero.scrollHint': 'Details',
      'hero.scrollHintAria': 'See details',
      'hero.date': '23 · 07 · 2027',

      'quote.text': '„Love is patient, love is kind. It does not envy, it does not boast, it is not proud, it does not dishonor others... Love never fails."',
      'quote.blessing': 'With the blessing of our parents',
      'quote.parents': 'Iurie & Aliona · Vasile & Maria',

      'countdown.eyebrow': 'Counting down',
      'countdown.title': 'Just',
      'countdown.days': 'Days',
      'countdown.hours': 'Hours',
      'countdown.mins': 'Minutes',
      'countdown.secs': 'Seconds',
      'countdown.tagline': 'until we say <em>„I do, forever"</em>',

      'saveDate.eyebrow': 'Save the Date',
      'saveDate.title': 'Our invitation',
      'saveDate.cardAria': 'Wedding invitation',
      'saveDate.label': 'We invite you to our wedding',
      'saveDate.date': 'July 23, 2027',
      'saveDate.welcome': 'we look forward to seeing you',
      'saveDate.venue': 'Villa Garden · Chișinău',

      'story.eyebrow': 'Our story',
      'story.title': 'How we got here',
      'story.item1.date': 'September 2019',
      'story.item1.title': 'First glance',
      'story.item1.text': 'We met at a mutual friends\' party, on an autumn evening. One glance was enough.',
      'story.item2.date': 'February 2021',
      'story.item2.title': 'First „I love you"',
      'story.item2.text': 'After two years of laughter, road trips, and long nights, we spoke for the first time the words that would change everything.',
      'story.item3.date': 'August 2023',
      'story.item3.title': 'Home, together',
      'story.item3.text': 'We bought our first home and started dreaming about the future we want to build together.',
      'story.item4.date': 'December 2025',
      'story.item4.title': '„Will you be my wife?"',
      'story.item4.text': 'Under the city lights, on the first day of winter, we said „Yes". And ever since, everything makes sense.',
      'story.item5.date': 'July 23, 2027',
      'story.item5.title': 'Forever',
      'story.item5.text': 'And now we want our dearest people by our side, to celebrate together the beginning of a new life.',

      'events.eyebrow': 'The day in detail',
      'events.title': 'Wedding program',
      'events.church.type': 'Religious ceremony',
      'events.church.name': 'at the church',
      'events.church.time': '2:00 PM',
      'events.church.venue': '„Saints Constantine and Helen" Church',
      'events.church.address': '84 Mitropolit Varlaam Street, Chișinău',
      'events.party.type': 'Reception',
      'events.party.name': 'the restaurant',
      'events.party.time': '5:00 PM',
      'events.party.venue': 'Villa Garden Restaurant',
      'events.party.address': '16 Decebal Boulevard, Chișinău',

      'location.eyebrow': 'Location',
      'location.title': 'We\'re waiting for you here',
      'location.iframeTitle': 'Wedding location — Villa Garden',
      'location.name': 'Villa Garden',
      'location.address': '16 Decebal Boulevard · Chișinău',
      'location.button': 'Open in Google Maps',

      'program.eyebrow': 'Day timeline',
      'program.title': 'What awaits you',
      'program.item1.title': 'Religious ceremony',
      'program.item1.desc': 'The moment we exchange vows before God',
      'program.item2.title': 'Photo session',
      'program.item2.desc': 'A few keepsake shots with us and our loved ones',
      'program.item3.title': 'Welcome cocktail',
      'program.item3.desc': 'We greet you at Villa Garden with champagne and appetizers',
      'program.item4.title': 'Festive dinner',
      'program.item4.desc': 'A menu prepared with care for a perfect evening',
      'program.item5.title': 'First dance',
      'program.item5.desc': 'Then we invite you to join us on the dance floor',
      'program.item6.title': 'Wedding cake',
      'program.item6.desc': 'A sweet moment before the party continues until dawn',

      'dress.eyebrow': 'Dress code',
      'dress.title': 'Attire',
      'dress.name': 'Elegant romantic',
      'dress.desc': 'Please join us in an elegant outfit. Suggestion: pastel or earthy tones, with metallic accents. Gentlemen — dark suits. Ladies — evening dress.',
      'dress.swatchesAria': 'Color suggestions',

      'gallery.eyebrow': 'Gallery',
      'gallery.title': 'Our moments',

      'lightbox.closeAria': 'Close',
      'lightbox.prevAria': 'Previous image',
      'lightbox.nextAria': 'Next image',

      'final.msg': '„Because true love<br/>is not seen with the eyes,<br/>but felt with the heart."',

      'footer.text': 'With love, Daniela & Cristian'
    },

    ru: {
      'page.title': 'Даниэла и Кристиан — 23 июля 2027',
      'page.description': 'Приглашаем вас на нашу свадьбу — Даниэла и Кристиан, 23 июля 2027, Кишинёв',

      'lang.switchAria': 'Сменить язык',
      'hero.topLabel': 'Приглашаем вас на нашу свадьбу',
      'hero.unmuteAria': 'Включить звук',
      'hero.muteAria': 'Выключить звук',
      'hero.replayAria': 'Повторить видео',
      'hero.scrollHint': 'Подробнее',
      'hero.scrollHintAria': 'Подробности',
      'hero.date': '23 · 07 · 2027',

      'quote.text': '„Любовь терпелива, любовь добра. Она не завидует, она не превозносится, не гордится, не бесчинствует... Любовь никогда не перестаёт."',
      'quote.blessing': 'С благословения родителей',
      'quote.parents': 'Юрий и Алёна · Василий и Мария',

      'countdown.eyebrow': 'Обратный отсчёт',
      'countdown.title': 'Осталось',
      'countdown.days': 'Дней',
      'countdown.hours': 'Часов',
      'countdown.mins': 'Минут',
      'countdown.secs': 'Секунд',
      'countdown.tagline': 'пока мы не скажем <em>„Да, навсегда"</em>',

      'saveDate.eyebrow': 'Save the Date',
      'saveDate.title': 'Наше приглашение',
      'saveDate.cardAria': 'Свадебное приглашение',
      'saveDate.label': 'Приглашаем вас на нашу свадьбу',
      'saveDate.date': '23 июля 2027',
      'saveDate.welcome': 'будем рады видеть вас',
      'saveDate.venue': 'Villa Garden · Кишинёв',

      'story.eyebrow': 'Наша история',
      'story.title': 'Как мы пришли к этому',
      'story.item1.date': 'Сентябрь 2019',
      'story.item1.title': 'Первый взгляд',
      'story.item1.text': 'Мы встретились на вечеринке общих друзей, осенним вечером. Одного взгляда было достаточно.',
      'story.item2.date': 'Февраль 2021',
      'story.item2.title': 'Первое „люблю тебя"',
      'story.item2.text': 'После двух лет смеха, поездок и долгих ночей мы впервые произнесли слова, которые изменили всё.',
      'story.item3.date': 'Август 2023',
      'story.item3.title': 'Дом, вместе',
      'story.item3.text': 'Мы купили свой первый дом и начали мечтать о будущем, которое хотим построить вместе.',
      'story.item4.date': 'Декабрь 2025',
      'story.item4.title': '„Ты выйдешь за меня?"',
      'story.item4.text': 'Под огнями города, в первый день зимы, мы сказали „Да". И с тех пор всё обрело смысл.',
      'story.item5.date': '23 июля 2027',
      'story.item5.title': 'Навсегда',
      'story.item5.text': 'И теперь мы хотим, чтобы рядом были дорогие нам люди, чтобы вместе отпраздновать начало новой жизни.',

      'events.eyebrow': 'День в деталях',
      'events.title': 'Программа свадьбы',
      'events.church.type': 'Венчание',
      'events.church.name': 'в церкви',
      'events.church.time': '14:00',
      'events.church.venue': 'Церковь „Святых Константина и Елены"',
      'events.church.address': 'Улица Митрополит Варлаам 84, Кишинёв',
      'events.party.type': 'Торжество',
      'events.party.name': 'ресторан',
      'events.party.time': '17:00',
      'events.party.venue': 'Ресторан Villa Garden',
      'events.party.address': 'Бульвар Дечебал 16, Кишинёв',

      'location.eyebrow': 'Место',
      'location.title': 'Мы ждём вас здесь',
      'location.iframeTitle': 'Место свадьбы — Villa Garden',
      'location.name': 'Villa Garden',
      'location.address': 'Бульвар Дечебал 16 · Кишинёв',
      'location.button': 'Открыть в Google Maps',

      'program.eyebrow': 'Расписание дня',
      'program.title': 'Что вас ждёт',
      'program.item1.title': 'Венчание',
      'program.item1.desc': 'Момент, когда мы произнесём клятвы перед Богом',
      'program.item2.title': 'Фотосессия',
      'program.item2.desc': 'Несколько снимков на память с нами и самыми дорогими',
      'program.item3.title': 'Приветственный коктейль',
      'program.item3.desc': 'Встречаем вас в Villa Garden с шампанским и закусками',
      'program.item4.title': 'Праздничный ужин',
      'program.item4.desc': 'Меню, приготовленное с заботой о прекрасном вечере',
      'program.item5.title': 'Первый танец',
      'program.item5.desc': 'А затем приглашаем вас на танцпол вместе с нами',
      'program.item6.title': 'Свадебный торт',
      'program.item6.desc': 'Сладкий момент перед вечеринкой, которая продлится до рассвета',

      'dress.eyebrow': 'Дресс-код',
      'dress.title': 'Наряд',
      'dress.name': 'Элегантный романтический',
      'dress.desc': 'Просим вас разделить с нами этот день в элегантном наряде. Совет: пастельные или землистые оттенки с металлическими акцентами. Мужчинам — тёмный костюм. Дамам — вечернее платье.',
      'dress.swatchesAria': 'Цветовые рекомендации',

      'gallery.eyebrow': 'Галерея',
      'gallery.title': 'Наши моменты',

      'lightbox.closeAria': 'Закрыть',
      'lightbox.prevAria': 'Предыдущее фото',
      'lightbox.nextAria': 'Следующее фото',

      'final.msg': '„Потому что настоящая любовь<br/>не видна глазами,<br/>но чувствуется сердцем."',

      'footer.text': 'С любовью, Даниэла и Кристиан'
    }
  };

  function detectInitialLang() {
    // 1. URL param ?lang=xx
    try {
      var urlLang = new URLSearchParams(location.search).get('lang');
      if (urlLang && SUPPORTED_LANGS.indexOf(urlLang) !== -1) return urlLang;
    } catch (e) { /* URLSearchParams not supported, ignore */ }

    // 2. localStorage saved choice
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;
    } catch (e) { /* storage blocked */ }

    // 3. Browser language
    var browser = (navigator.language || navigator.userLanguage || DEFAULT_LANG).slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.indexOf(browser) !== -1) return browser;

    // 4. Fallback
    return DEFAULT_LANG;
  }

  function applyTranslations(lang) {
    var dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];

    // Plain text content
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = dict[key];
      if (val !== undefined) {
        if (el.tagName === 'TITLE') {
          document.title = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // HTML content (allows <em>, <br> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      var val = dict[key];
      if (val !== undefined) el.innerHTML = val;
    });

    // aria-label attribute
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria-label');
      var val = dict[key];
      if (val !== undefined) el.setAttribute('aria-label', val);
    });

    // title attribute (e.g. iframe)
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      var val = dict[key];
      if (val !== undefined) el.setAttribute('title', val);
    });

    // content attribute (meta tags)
    document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-content');
      var val = dict[key];
      if (val !== undefined) el.setAttribute('content', val);
    });

    // Update <html lang="...">
    document.documentElement.setAttribute('lang', lang);

    // Update language switcher state
    document.querySelectorAll('.lang-switch button[data-lang]').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function setLang(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) lang = DEFAULT_LANG;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    applyTranslations(lang);
  }

  // Apply initial language ASAP (script is deferred so DOM is ready)
  var initialLang = detectInitialLang();
  applyTranslations(initialLang);

  // Wire up the switcher buttons
  document.querySelectorAll('.lang-switch button[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-lang'));
    });
  });

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
  // Hero video — autoplay with sound by default
  //
  // Browsers (especially mobile) block autoplay with sound unless the
  // user has interacted with the site or has explicit autoplay permission.
  // Strategy:
  //   1. Try to play unmuted (works on desktop with allow-autoplay or
  //      sites with high engagement score)
  //   2. If blocked, fall back to muted autoplay + show unmute button
  //   3. On first user gesture anywhere, attempt to unmute
  // ============================================================
  var video = document.getElementById('introVideo');
  var unmuteBtn = document.getElementById('unmuteBtn');
  var welcome = document.getElementById('welcome');
  var heroReplayBtn = document.getElementById('heroReplay');
  var hasAutoScrolledFromVideo = false;

  function showReplay() {
    if (heroReplayBtn) heroReplayBtn.classList.add('visible');
  }
  function hideReplay() {
    if (heroReplayBtn) heroReplayBtn.classList.remove('visible');
  }
  function restartVideo() {
    if (!video) return;
    hideReplay();
    try { video.currentTime = 0; } catch (e) { /* ignore */ }
    var p = video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(function () { /* user gesture should suffice; ignore */ });
    }
  }
  if (heroReplayBtn) {
    heroReplayBtn.addEventListener('click', restartVideo);
  }

  function setIcon () {
    if (!video || !unmuteBtn) return;
    var muted = video.muted;
    // Icon: 🔇 cand e mut, 🔊 cand are sunet
    unmuteBtn.innerHTML = muted ? '&#128263;' : '&#128266;';
    // aria-label reflecta actiunea care va avea loc la click
    var ariaKey = muted ? 'hero.unmuteAria' : 'hero.muteAria';
    unmuteBtn.setAttribute('data-i18n-aria-label', ariaKey);
    var lang = document.documentElement.getAttribute('lang') || DEFAULT_LANG;
    var dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    if (dict[ariaKey]) unmuteBtn.setAttribute('aria-label', dict[ariaKey]);
  }

  if (video) {
    // Try unmuted autoplay first
    video.muted = false;
    var playAttempt = video.play();

    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(function () {
        // Browser blocked unmuted autoplay — fall back to muted
        video.muted = true;
        video.play().catch(function () { /* even muted blocked, user must tap */ });
        setIcon();

        // On the first user interaction anywhere, try to unmute
        function tryUnmuteOnGesture() {
          video.muted = false;
          var p = video.play();
          if (p && typeof p.catch === 'function') {
            p.catch(function () { video.muted = true; });
          }
          setIcon();
          window.removeEventListener('pointerdown', tryUnmuteOnGesture);
          window.removeEventListener('keydown', tryUnmuteOnGesture);
        }
        window.addEventListener('pointerdown', tryUnmuteOnGesture, { once: true });
        window.addEventListener('keydown', tryUnmuteOnGesture, { once: true });
      });
    }
    setIcon();
  }

  if (unmuteBtn && video) {
    unmuteBtn.addEventListener('click', function () {
      video.muted = !video.muted;
      if (!video.muted) { video.play().catch(function () {}); }
      setIcon();
    });
  }

  if (video) {
    video.addEventListener('ended', function () {
      // Mereu aratam butonul de replay
      showReplay();
      // Smooth scroll spre welcome doar la primul end (nu si la replay-uri)
      if (!hasAutoScrolledFromVideo && welcome) {
        hasAutoScrolledFromVideo = true;
        var rect = welcome.getBoundingClientRect();
        var targetY = rect.top + (window.scrollY || window.pageYOffset);
        smoothScrollTo(targetY, 900);
      }
    });
    // Cand userul reseteaza video-ul (currentTime=0 sau play dupa ended),
    // ascundem butonul. `playing` se declanseaza cand chiar incepe sa ruleze.
    video.addEventListener('playing', hideReplay);
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
  // Lightbox — click pe poza din galerie => vedere full-screen
  // Suporta: prev/next butoane, sageti tastatura, Esc, swipe pe mobile,
  // preload imagini vecine pentru navigare instanta.
  // ============================================================
  (function setupLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxClose = document.getElementById('lightboxClose');
    var lightboxPrev = document.getElementById('lightboxPrev');
    var lightboxNext = document.getElementById('lightboxNext');
    var lightboxCounter = document.getElementById('lightboxCounter');
    var galleryImgs = document.querySelectorAll('.gallery .gallery-item img');

    if (!lightbox || !lightboxImg || galleryImgs.length === 0) return;

    var images = Array.prototype.map.call(galleryImgs, function (img) {
      return { src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' };
    });
    var currentIndex = 0;
    var lastFocused = null;

    function updateCounter() {
      if (lightboxCounter) {
        lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
      }
    }

    function preloadNeighbors() {
      [-1, 1].forEach(function (offset) {
        var i = (currentIndex + offset + images.length) % images.length;
        var pre = new Image();
        pre.src = images[i].src;
      });
    }

    function showImage(index) {
      if (index < 0) index = images.length - 1;
      if (index >= images.length) index = 0;
      currentIndex = index;
      var img = images[index];

      lightboxImg.classList.remove('loaded');
      lightboxImg.alt = img.alt;

      // Preload then set src + animate in
      var preload = new Image();
      preload.onload = function () {
        lightboxImg.src = img.src;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            lightboxImg.classList.add('loaded');
          });
        });
      };
      preload.src = img.src;

      updateCounter();
      preloadNeighbors();
    }

    function open(index) {
      lastFocused = document.activeElement;
      showImage(index);
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
      // Focus pe butonul close pentru navigare cu tastatura
      setTimeout(function () { lightboxClose && lightboxClose.focus(); }, 50);
    }

    function close() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      // Resetam clasa loaded dupa tranzitie
      setTimeout(function () { lightboxImg.classList.remove('loaded'); }, 350);
      // Restoram focus-ul
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    function next() { showImage(currentIndex + 1); }
    function prev() { showImage(currentIndex - 1); }

    // Click pe poze din galerie -> deschide lightbox
    Array.prototype.forEach.call(galleryImgs, function (img, i) {
      img.addEventListener('click', function () { open(i); });
    });

    lightboxClose.addEventListener('click', close);
    lightboxNext.addEventListener('click', next);
    lightboxPrev.addEventListener('click', prev);

    // Click pe backdrop (nu pe imagine sau butoane) inchide
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-stage')) {
        close();
      }
    });

    // Tastatura — doar cand lightbox-ul e deschis
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    });

    // Swipe pe mobile
    var touchStartX = null;
    var touchStartY = null;
    lightbox.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var endX = e.changedTouches[0].clientX;
      var endY = e.changedTouches[0].clientY;
      var deltaX = endX - touchStartX;
      var deltaY = endY - touchStartY;
      // Swipe orizontal cu prag minim, dominant orizontal
      if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        if (deltaX > 0) prev(); else next();
      }
      touchStartX = null;
      touchStartY = null;
    }, { passive: true });
  })();

  // ============================================================
  // Hero IntersectionObserver — coordoneaza lang switcher + reluare video
  //
  // Probleme rezolvate aici:
  // 1. Browserele moderne pauzeaza video off-screen pentru a economisi resurse.
  //    Cand userul revine pe hero, video ramane "stuck" pauzat. -> reluam.
  // 2. Daca video s-a terminat in timp ce userul citea jos, la revenire
  //    vrem sa-i aratam butonul de replay.
  // 3. Lang switcher e ascuns cat timp hero e vizibil.
  // ============================================================
  var heroSection = document.getElementById('hero');
  var langSwitchEl = document.querySelector('.lang-switch');
  if (heroSection) {
    if ('IntersectionObserver' in window) {
      var heroIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var heroVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;

          // Lang switcher: ascuns pe hero, vizibil pe restul paginii
          if (langSwitchEl) {
            langSwitchEl.classList.toggle('visible', !heroVisible);
          }

          // Video: cand hero revine in viewport...
          if (heroVisible && video) {
            if (video.ended) {
              // ...si video s-a terminat -> arata butonul de replay
              showReplay();
            } else if (video.paused) {
              // ...si e pauzat de browser (off-screen throttling) -> reia
              var p = video.play();
              if (p && typeof p.catch === 'function') {
                p.catch(function () { /* needs user gesture; ignore */ });
              }
            }
          }
        });
      }, { threshold: [0, 0.2, 0.5] });
      heroIO.observe(heroSection);
    } else {
      // Fallback browsere vechi
      if (langSwitchEl) langSwitchEl.classList.add('visible');
    }
  }

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

})();
