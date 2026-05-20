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

      'footer.text': 'Cu drag, Daniela & Cristian',

      'loader.skip': 'Sari peste',

      'daysCounter.eyebrow': 'Povestea noastră în cifre',
      'daysCounter.title': 'De atunci pentru totdeauna',
      'daysCounter.daysLabel': 'zile de când ne-am cunoscut',
      'daysCounter.untilWedding': 'și încă',
      'daysCounter.untilWeddingSuffix': 'până la „Da, pentru totdeauna"',

      'addCalendar.button': 'Adaugă în calendar',
      'addCalendar.title': 'Salvează data',
      'addCalendar.modalTitle': 'Adaugă în calendar',
      'addCalendar.description': 'Alege serviciul tău preferat — îți pregătim invitația completă cu locație și program.',
      'addCalendar.google': 'Google Calendar',
      'addCalendar.apple': 'Apple Calendar',
      'addCalendar.outlook': 'Outlook',
      'addCalendar.eventTitle': 'Nunta Daniela & Cristian',
      'addCalendar.eventDescription': 'Cununia la Biserica Sfinții Împărați Constantin și Elena (14:00). Petrecerea la Villa Garden (17:00).',
      'addCalendar.eventLocation': 'Villa Garden, Bulevardul Decebal 16, Chișinău',

      'share.button': 'Trimite invitația',
      'share.title': 'Trimite invitația',
      'share.modalTitle': 'Cum vrei să trimiți?',
      'share.whatsapp': 'WhatsApp',
      'share.telegram': 'Telegram',
      'share.email': 'Email',
      'share.copy': 'Copiază linkul',
      'share.copied': 'Copiat ✓',
      'share.toastCopied': 'Link copiat',
      'share.shareText': 'Vă invităm cu drag la nunta noastră — 23 Iulie 2027, Chișinău',
      'share.emailSubject': 'Invitație la nuntă — Daniela & Cristian',

      'qr.button': 'Cod QR',
      'qr.title': 'Cod QR',
      'qr.modalTitle': 'Pentru invitațiile tipărite',
      'qr.description': 'Tipărește acest cod pe invitațiile fizice — oaspeții pot accesa pagina cu un scan.',
      'qr.download': 'Descarcă PNG',

      'modal.closeAria': 'Închide'
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

      'footer.text': 'With love, Daniela & Cristian',

      'loader.skip': 'Skip',

      'daysCounter.eyebrow': 'Our story in numbers',
      'daysCounter.title': 'From then to forever',
      'daysCounter.daysLabel': 'days since we met',
      'daysCounter.untilWedding': 'and another',
      'daysCounter.untilWeddingSuffix': 'until „I do, forever"',

      'addCalendar.button': 'Add to calendar',
      'addCalendar.title': 'Save the date',
      'addCalendar.modalTitle': 'Add to calendar',
      'addCalendar.description': 'Pick your favourite service — we\'ll prepare the full invitation with venue and program.',
      'addCalendar.google': 'Google Calendar',
      'addCalendar.apple': 'Apple Calendar',
      'addCalendar.outlook': 'Outlook',
      'addCalendar.eventTitle': 'Daniela & Cristian\'s Wedding',
      'addCalendar.eventDescription': 'Religious ceremony at „Saints Constantine and Helen" Church (14:00). Reception at Villa Garden (17:00).',
      'addCalendar.eventLocation': 'Villa Garden, 16 Decebal Boulevard, Chișinău',

      'share.button': 'Share invitation',
      'share.title': 'Share invitation',
      'share.modalTitle': 'How would you like to share?',
      'share.whatsapp': 'WhatsApp',
      'share.telegram': 'Telegram',
      'share.email': 'Email',
      'share.copy': 'Copy link',
      'share.copied': 'Copied ✓',
      'share.toastCopied': 'Link copied',
      'share.shareText': 'You\'re warmly invited to our wedding — 23 July 2027, Chișinău',
      'share.emailSubject': 'Wedding invitation — Daniela & Cristian',

      'qr.button': 'QR code',
      'qr.title': 'QR code',
      'qr.modalTitle': 'For printed invitations',
      'qr.description': 'Print this code on physical invitations — guests can reach the page with a single scan.',
      'qr.download': 'Download PNG',

      'modal.closeAria': 'Close'
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

      'footer.text': 'С любовью, Даниэла и Кристиан',

      'loader.skip': 'Пропустить',

      'daysCounter.eyebrow': 'Наша история в цифрах',
      'daysCounter.title': 'С тех пор и навсегда',
      'daysCounter.daysLabel': 'дней с тех пор, как мы встретились',
      'daysCounter.untilWedding': 'и ещё',
      'daysCounter.untilWeddingSuffix': 'до „Да, навсегда"',

      'addCalendar.button': 'Добавить в календарь',
      'addCalendar.title': 'Сохранить дату',
      'addCalendar.modalTitle': 'Добавить в календарь',
      'addCalendar.description': 'Выберите ваш сервис — мы подготовим приглашение с местом и программой.',
      'addCalendar.google': 'Google Календарь',
      'addCalendar.apple': 'Apple Calendar',
      'addCalendar.outlook': 'Outlook',
      'addCalendar.eventTitle': 'Свадьба Daniela и Cristian',
      'addCalendar.eventDescription': 'Венчание в церкви „Святых Константина и Елены" (14:00). Торжество в Villa Garden (17:00).',
      'addCalendar.eventLocation': 'Villa Garden, Бульвар Дечебал 16, Кишинёв',

      'share.button': 'Поделиться приглашением',
      'share.title': 'Поделиться',
      'share.modalTitle': 'Как хотите поделиться?',
      'share.whatsapp': 'WhatsApp',
      'share.telegram': 'Telegram',
      'share.email': 'Email',
      'share.copy': 'Копировать ссылку',
      'share.copied': 'Скопировано ✓',
      'share.toastCopied': 'Ссылка скопирована',
      'share.shareText': 'Приглашаем вас на нашу свадьбу — 23 июля 2027, Кишинёв',
      'share.emailSubject': 'Приглашение на свадьбу — Daniela и Cristian',

      'qr.button': 'QR-код',
      'qr.title': 'QR-код',
      'qr.modalTitle': 'Для печатных приглашений',
      'qr.description': 'Распечатайте этот код на физических приглашениях — гости смогут открыть страницу одним сканом.',
      'qr.download': 'Скачать PNG',

      'modal.closeAria': 'Закрыть'
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

  function t(key) {
    var lang = document.documentElement.getAttribute('lang') || DEFAULT_LANG;
    var dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    return dict[key] !== undefined ? dict[key] : (TRANSLATIONS[DEFAULT_LANG][key] || '');
  }
  function currentLocale() {
    var lang = document.documentElement.getAttribute('lang') || DEFAULT_LANG;
    return lang === 'ro' ? 'ro-RO' : lang === 'ru' ? 'ru-RU' : 'en-US';
  }

  // ============================================================
  // Toast — notificari rapide (ex: "Copiat ✓")
  // ============================================================
  var toastEl = document.getElementById('toast');
  var toastTimeout = null;
  function showToast(message, ms) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('shown');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toastEl.classList.remove('shown');
    }, ms || 2200);
  }

  // ============================================================
  // Generic modal — open / close / focus trap / esc / backdrop
  // ============================================================
  var lastModalFocus = null;

  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return null;
    lastModalFocus = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    // Focus pe primul element focusabil
    setTimeout(function () {
      var first = modal.querySelector('.modal-close, button, [href], input, [tabindex]:not([tabindex="-1"])');
      if (first) first.focus();
    }, 50);
    return modal;
  }
  function closeModal(modal) {
    if (typeof modal === 'string') modal = document.getElementById(modal);
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    // Inchide global doar daca nu mai sunt alte modale deschise
    if (!document.querySelector('.modal-overlay.open')) {
      document.body.classList.remove('modal-open');
    }
    if (lastModalFocus && typeof lastModalFocus.focus === 'function') {
      try { lastModalFocus.focus(); } catch (e) { /* ignore */ }
    }
  }
  function closeAllModals() {
    document.querySelectorAll('.modal-overlay.open').forEach(function (m) { closeModal(m); });
  }

  // Click pe X / pe backdrop / Esc
  document.querySelectorAll('.modal-overlay').forEach(function (modal) {
    modal.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function () { closeModal(modal); });
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal(modal);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.querySelector('.modal-overlay.open')) {
      e.preventDefault();
      closeAllModals();
    }
  });
  // Focus trap — Tab cycleaza in interiorul modalului deschis
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var modal = document.querySelector('.modal-overlay.open .modal-card');
    if (!modal) return;
    var focusables = modal.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // ============================================================
  // Days counter — zile de cand ne-am cunoscut + zile pana la nunta
  // ============================================================
  var DATE_MET_UTC = Date.UTC(2021, 11, 24);    // 24 Decembrie 2021
  var DATE_WED_UTC = Date.UTC(2027, 6, 23);     // 23 Iulie 2027
  var daysSinceEl = document.getElementById('daysSinceMet');
  var daysUntilEl = document.getElementById('daysUntilWedding');

  function todayUTCMidnight() {
    var d = new Date();
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }
  function updateDaysCounter() {
    if (!daysSinceEl && !daysUntilEl) return;
    var today = todayUTCMidnight();
    var since = Math.max(0, Math.floor((today - DATE_MET_UTC) / 86400000));
    var until = Math.max(0, Math.floor((DATE_WED_UTC - today) / 86400000));
    var nf;
    try { nf = new Intl.NumberFormat(currentLocale()); }
    catch (e) { nf = { format: function (n) { return String(n); } }; }
    if (daysSinceEl) daysSinceEl.textContent = nf.format(since);
    if (daysUntilEl) daysUntilEl.textContent = nf.format(until);
  }
  updateDaysCounter();
  // Update la fiecare ora (suficient pentru zile)
  setInterval(updateDaysCounter, 3600000);

  // Hook into language change -> reformatare cu noul locale
  var originalSetLang = setLang;
  setLang = function (lang) {
    originalSetLang(lang);
    updateDaysCounter();
    refreshShareButtonLabel();
    if (typeof setIcon === 'function') setIcon();
  };
  // Si la click pe butoane (originalSetLang nu e folosit direct de listener-ul existent...
  // de fapt da, e folosit prin closure). Re-leg butoanele ca sa cheme noul setLang:
  document.querySelectorAll('.lang-switch button[data-lang]').forEach(function (btn) {
    var newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', function () {
      setLang(newBtn.getAttribute('data-lang'));
    });
  });

  // ============================================================
  // CALENDAR — Google / Apple (.ics) / Outlook
  // ============================================================
  // Eveniment: 23 Iulie 2027 14:00 -> 24 Iulie 2027 03:00 ora Chișinău (UTC+3 in iulie / EEST)
  // In UTC: 23 Iulie 2027 11:00 -> 24 Iulie 2027 00:00
  var EVENT_START_UTC = '20270723T110000Z';
  var EVENT_END_UTC   = '20270724T000000Z';
  var EVENT_START_LOCAL = '20270723T140000';
  var EVENT_END_LOCAL   = '20270724T030000';

  function buildGoogleUrl() {
    var params = [
      'action=TEMPLATE',
      'text=' + encodeURIComponent(t('addCalendar.eventTitle')),
      'dates=' + EVENT_START_LOCAL + '/' + EVENT_END_LOCAL,
      'ctz=Europe/Chisinau',
      'details=' + encodeURIComponent(t('addCalendar.eventDescription')),
      'location=' + encodeURIComponent(t('addCalendar.eventLocation'))
    ];
    return 'https://calendar.google.com/calendar/render?' + params.join('&');
  }
  function buildOutlookUrl() {
    var params = [
      'path=/calendar/action/compose',
      'rru=addevent',
      'subject=' + encodeURIComponent(t('addCalendar.eventTitle')),
      'startdt=2027-07-23T14:00:00',
      'enddt=2027-07-24T03:00:00',
      'body=' + encodeURIComponent(t('addCalendar.eventDescription')),
      'location=' + encodeURIComponent(t('addCalendar.eventLocation'))
    ];
    return 'https://outlook.live.com/calendar/0/deeplink/compose?' + params.join('&');
  }
  function buildIcs() {
    var nowStamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    var lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Daniela Cristian//Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VTIMEZONE',
      'TZID:Europe/Chisinau',
      'BEGIN:DAYLIGHT',
      'TZOFFSETFROM:+0200',
      'TZOFFSETTO:+0300',
      'TZNAME:EEST',
      'DTSTART:19700329T030000',
      'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
      'END:DAYLIGHT',
      'BEGIN:STANDARD',
      'TZOFFSETFROM:+0300',
      'TZOFFSETTO:+0200',
      'TZNAME:EET',
      'DTSTART:19701025T040000',
      'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
      'END:STANDARD',
      'END:VTIMEZONE',
      'BEGIN:VEVENT',
      'UID:wedding-daniela-cristian-2027@cristian-and-daniela-weeding.eu',
      'DTSTAMP:' + nowStamp,
      'DTSTART;TZID=Europe/Chisinau:' + EVENT_START_LOCAL,
      'DTEND;TZID=Europe/Chisinau:' + EVENT_END_LOCAL,
      'SUMMARY:' + t('addCalendar.eventTitle'),
      'DESCRIPTION:' + t('addCalendar.eventDescription').replace(/\n/g, '\\n'),
      'LOCATION:' + t('addCalendar.eventLocation'),
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    return lines.join('\r\n');
  }
  function downloadIcs() {
    var blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'nunta-daniela-cristian.ics';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  var openCalBtn = document.getElementById('openCalendarModal');
  if (openCalBtn) {
    openCalBtn.addEventListener('click', function () {
      // Update URL-uri inainte de a deschide (in caz ca s-a schimbat limba)
      var g = document.getElementById('calGoogle');
      var o = document.getElementById('calOutlook');
      if (g) g.href = buildGoogleUrl();
      if (o) o.href = buildOutlookUrl();
      openModal('calendarModal');
    });
  }
  var appleBtn = document.getElementById('calApple');
  if (appleBtn) {
    appleBtn.addEventListener('click', function () {
      downloadIcs();
      closeModal('calendarModal');
    });
  }

  // ============================================================
  // SHARE — Web Share API native, fallback la modal cu WA / TG / Email / Copy
  // ============================================================
  var openShareBtn = document.getElementById('openShareModal');
  var shareWhatsApp = document.getElementById('shareWhatsApp');
  var shareTelegram = document.getElementById('shareTelegram');
  var shareEmail = document.getElementById('shareEmail');
  var shareCopy = document.getElementById('shareCopy');
  var shareCopyStatus = document.getElementById('shareCopyStatus');

  function refreshShareButtonLabel() { /* placeholder, hook pentru viitor */ }

  function buildShareUrls() {
    var text = t('share.shareText');
    var url = location.href;
    var subject = t('share.emailSubject');
    return {
      whatsapp: 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + url),
      telegram: 'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text),
      email: 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text + '\n\n' + url)
    };
  }
  function updateShareLinks() {
    var urls = buildShareUrls();
    if (shareWhatsApp) shareWhatsApp.href = urls.whatsapp;
    if (shareTelegram) shareTelegram.href = urls.telegram;
    if (shareEmail) shareEmail.href = urls.email;
  }
  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return fallbackCopy(text); }
      );
    }
    return Promise.resolve(fallbackCopy(text));
  }
  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '0';
      ta.setAttribute('readonly', '');
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }

  if (openShareBtn) {
    openShareBtn.addEventListener('click', function () {
      // Incercam Web Share API mai intai
      if (navigator.share) {
        navigator.share({
          title: t('page.title'),
          text: t('share.shareText'),
          url: location.href
        }).catch(function () { /* user cancel / error - silent */ });
      } else {
        updateShareLinks();
        openModal('shareModal');
      }
    });
  }
  if (shareCopy) {
    shareCopy.addEventListener('click', function () {
      copyToClipboard(location.href).then(function (ok) {
        if (ok) {
          if (shareCopyStatus) {
            shareCopyStatus.classList.add('shown');
            setTimeout(function () { shareCopyStatus.classList.remove('shown'); }, 2000);
          }
          showToast(t('share.toastCopied'));
        }
      });
    });
  }

  // ============================================================
  // QR CODE — lazy load qrcode-generator + render canvas + download PNG
  // ============================================================
  var qrLibLoaded = false;
  var qrLibLoading = null;

  function loadQrLib() {
    if (qrLibLoaded) return Promise.resolve();
    if (qrLibLoading) return qrLibLoading;
    qrLibLoading = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
      script.async = true;
      script.onload = function () { qrLibLoaded = true; resolve(); };
      script.onerror = function () { qrLibLoading = null; reject(new Error('QR lib load failed')); };
      document.head.appendChild(script);
    });
    return qrLibLoading;
  }

  function renderQrToCanvas(text, size) {
    if (typeof window.qrcode !== 'function') return null;
    // type 0 = auto, error correction H (cea mai mare, tolereaza monograma in centru)
    var qr = window.qrcode(0, 'H');
    qr.addData(text);
    qr.make();

    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext('2d');

    // Background cream
    ctx.fillStyle = '#FAF4ED';
    ctx.fillRect(0, 0, size, size);

    var modules = qr.getModuleCount();
    var moduleSize = size / modules;

    // Modules in burgundy (var(--color-text-main))
    ctx.fillStyle = '#6B2030';
    for (var row = 0; row < modules; row++) {
      for (var col = 0; col < modules; col++) {
        if (qr.isDark(row, col)) {
          // Rotunjim usor coordonatele ca sa evitam gap-uri sub-pixel
          var x = Math.floor(col * moduleSize);
          var y = Math.floor(row * moduleSize);
          var w = Math.ceil(moduleSize + 0.5);
          ctx.fillRect(x, y, w, w);
        }
      }
    }
    return canvas;
  }

  var openQrBtn = document.getElementById('openQrModal');
  var qrWrap = document.getElementById('qrWrap');
  var qrDownloadBtn = document.getElementById('qrDownload');

  if (openQrBtn) {
    openQrBtn.addEventListener('click', function () {
      openModal('qrModal');
      loadQrLib().then(function () {
        var canvas = renderQrToCanvas(location.href, 320);
        if (canvas && qrWrap) {
          var existing = qrWrap.querySelector('canvas');
          if (existing) existing.remove();
          canvas.style.maxWidth = '280px';
          canvas.style.width = '100%';
          canvas.style.height = 'auto';
          canvas.style.aspectRatio = '1 / 1';
          canvas.setAttribute('aria-label', t('qr.modalTitle'));
          qrWrap.insertBefore(canvas, qrWrap.firstChild);
        }
      }).catch(function (e) {
        showToast('Eroare: nu am putut încărca QR-ul');
        // eslint-disable-next-line no-console
        console && console.error && console.error(e);
      });
    });
  }
  if (qrDownloadBtn) {
    qrDownloadBtn.addEventListener('click', function () {
      loadQrLib().then(function () {
        var canvas = renderQrToCanvas(location.href, 600);
        if (!canvas) return;
        if (canvas.toBlob) {
          canvas.toBlob(function (blob) {
            if (!blob) return;
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'qr-daniela-cristian.png';
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }, 100);
          }, 'image/png');
        } else {
          // Fallback foarte vechi
          var dataUrl = canvas.toDataURL('image/png');
          var a = document.createElement('a');
          a.href = dataUrl;
          a.download = 'qr-daniela-cristian.png';
          a.click();
        }
      });
    });
  }

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
  // Loader — animatie plic + skip + localStorage flag
  // ============================================================
  (function setupLoader() {
    var loader = document.getElementById('loader');
    if (!loader) return;

    var skipBtn = document.getElementById('loaderSkip');
    var INTRO_KEY = 'dc_seen_intro';
    // Timeline: env-appear (0.1-0.8) → seal pulse + tremble (0.85-1.8) →
    // seal fall + particles (1.8-2.75) → flap opens (2.7-3.65) →
    // card emerges (3.25-4.4) → flower appears (4.0-4.6) → hold + fade
    var ANIM_DURATION = 5200;
    var SKIP_REVEAL_AFTER = 1100;

    var seenBefore = false;
    try { seenBefore = localStorage.getItem(INTRO_KEY) === '1'; } catch (e) { /* storage blocked */ }
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Blocheaza scroll-ul pe durata animatiei (CSS scroll-lock prin clasa pe body)
    document.body.style.overflow = 'hidden';

    function hideLoader(persist) {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      if (persist) {
        try { localStorage.setItem(INTRO_KEY, '1'); } catch (e) { /* ignore */ }
      }
    }

    // Skip cu buton — fade rapid, fara persistare
    if (skipBtn) {
      skipBtn.addEventListener('click', function () { hideLoader(false); });
    }

    if (seenBefore || reduceMotion) {
      // Skip animatia — fade scurt
      setTimeout(function () { hideLoader(false); }, 300);
      return;
    }

    // Animatia ruleaza complet — pornim timerele IMEDIAT,
    // sincronizat cu animatiile CSS (care nu asteapta window.load)
    setTimeout(function () {
      if (skipBtn && !loader.classList.contains('hidden')) {
        skipBtn.classList.add('shown');
      }
    }, SKIP_REVEAL_AFTER);

    setTimeout(function () {
      if (!loader.classList.contains('hidden')) hideLoader(true);
    }, ANIM_DURATION);
  })();

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
