'use strict';
(function () {
  /* ---------- Konstanten ---------- */
  var KM_RATE = 0.30;
  var LOCALES = { de: 'de-DE', en: 'en-GB', ru: 'ru-RU' };
  var LANG_NAMES = { de: 'Deutsch', en: 'English', ru: 'Kyrillisch' };
  var TYPES = ['spesen', 'beleg', 'km', 'eigen', 'montage'];
  var FILE_NAMES = { spesen: 'Spesenabrechnung', beleg: 'Abrechnung_gegen_Beleg', km: 'KM-Abrechnung', eigen: 'Eigenbeleg', montage: 'Montagebericht' };
  var LIMITS = { meal: 20, other: 2, beleg: 17, km: 11, eigen: 12, mrow: 14 };
  var START = { meal: 6, other: 2, beleg: 8, km: 6, eigen: 12, mrow: 8 };
  var MAX_PHOTOS = 30, PHOTO_PX = 1600;
  /* LETHE-Logo, direkt eingebettet, damit es ohne weitere Dateien angezeigt wird. */
  var LOGO = 'data:image/jpeg;base64,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';
  var BLANK = {
    meal: function () { return { date: '', from: '', to: '', amount: '' }; },
    other: function () { return { period: '', text: '', amount: '' }; },
    beleg: function () { return { date: '', text: '', amount: '' }; },
    km: function () { return { date: '', dest: '', km: '' }; },
    eigen: function () { return { date: '', text: '', amount: '' }; },
    mrow: function () { return { date: '', name: '', work: '', travel: '', extra: '' }; }
  };
  var PHOTO_RE = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/;
  var SIG_RE = /^data:image\/png;base64,[A-Za-z0-9+\/=]+$/;

  var topLogo = document.getElementById('top-logo');
  if (topLogo) topLogo.src = LOGO;

  /* ---------- Texte ---------- */
  var I18N = {
    de: {
      ui: {
        appTitle: 'Reisekostenabrechnung',
        privacy: 'Alle Eingaben bleiben auf diesem Gerät. Die Seite sendet nichts ins Netz.',
        stepLang: 'Sprache', stepType: 'Art der Vorlage', stepFill: 'Ausfüllen',
        stepSign: 'Unterschreiben', stepSave: 'Sichern',
        signHint: 'Unterschreiben Sie im Feld mit Maus, Finger oder Stift. Erst danach lässt sich speichern.',
        clear: 'Unterschrift löschen', addRow: 'Zeile hinzufügen', removeRow: 'Zeile entfernen',
        btnPdf: 'PDF-Auszug sichern', btnJson: 'Daten als Datei sichern', btnLoad: 'Gesicherte Daten laden',
        missing: 'Zum Sichern fehlt noch: ', ready: 'Bereit. Beim PDF-Auszug wählen Sie im Druckdialog „Als PDF speichern“.',
        fName: 'Name', fOccasion: 'Projektname / Vorgang', fSignature: 'Unterschrift',
        pick: 'Bitte wählen',
        loadOk: 'Daten geladen.', loadErr: 'Die Datei konnte nicht gelesen werden.',
        btnPdfAlt: 'Druckfertige Datei sichern',
        readyFile: 'Bereit. Die gesicherte Datei öffnen Sie im Browser und drucken sie dort als PDF (Strg+P).',
        saved: 'Gesichert.', saveErr: 'Das Sichern hat nicht geklappt.',
        fCustomer: 'Kunde', fSigTech: 'Unterschrift Monteur', fSigClient: 'Unterschrift Auftraggeber',
        padTech: 'Monteur', padClient: 'Auftraggeber',
        photosBusy: 'Fotos werden verarbeitet …', photosOk: 'Fotos hinzugefügt: ', photosMax: 'Es sind höchstens 30 Fotos möglich.',
        exTitle: 'Vor dem Export', exCheckH: 'Rechtschreib- und Satzprüfung', exNone: 'Keine Auffälligkeiten gefunden.',
        exFound: 'Auffälligkeiten: ', exFix: 'Einfache Fehler korrigieren', exFixed: 'Korrekturen angewendet: ', exMore: 'Weitere Hinweise werden nicht angezeigt.',
        exSpell: 'Geprüft werden typische Schreib- und Satzzeichenfehler. Eine vollständige Rechtschreibprüfung leistet zusätzlich Ihr Browser (rot unterstrichene Wörter in den Textfeldern).',
        exLangH: 'Exportsprache', exDe: 'Deutsch', exEn: 'Englisch', exBi: 'Zweisprachig (wie Vorlage)',
        exNote: 'Beschriftungen und Vertragstext erscheinen in der gewählten Sprache. Ihre eigenen Eingaben werden nicht übersetzt.',
        exBack: 'Zurück zum Bearbeiten', exGo: 'Exportieren', exField: 'Feld',
        mDouble: 'Wort doppelt: „%1“', mSpace2: 'Doppeltes Leerzeichen', mSpaceBefore: 'Leerzeichen vor dem Satzzeichen', mSpaceAfter: 'Leerzeichen nach dem Satzzeichen fehlt',
        mCapital: 'Satz beginnt mit Kleinbuchstaben', mNoEnd: 'Satz endet ohne Satzzeichen', mPunct: 'Satzzeichen doppelt', mBracket: 'Klammer oder Anführungszeichen nicht geschlossen',
        mTypo: 'Schreibweise: „%1“ → „%2“', mComma: 'Vor „%1“ fehlt vermutlich ein Komma', mLong: 'Sehr langer Satz (über 40 Wörter), besser teilen', mI: '„i“ als Wort bitte groß schreiben (I)',
        t: { spesen: 'Spesenabrechnung', beleg: 'Abrechnung gegen Beleg', km: 'KM-Abrechnung', eigen: 'Eigenbeleg', montage: 'Montagebericht' }
      },
      f: {
        name: 'Name:', occasion: 'Projektname / Vorgang:', date: 'Datum', signature: 'Unterschrift Mitarbeiter',
        spTitle: 'Spesenabrechnung',
        spS1: '1.) pauschale Verpflegungsmehraufwendungen / Erstattung mit Lohnabrechnung',
        spS1Note: 'Erstattung nur innerhalb der ersten drei Monate auf neuer Werft',
        colDate: 'Datum', colTime: 'Uhrzeit', colFrom: 'von', colTo: 'bis', colHours: 'Anz. Std.', colPlace: 'Ort', colAmount: 'Betrag €',
        spS2: '2) Sonstige pauschale Kostenerstattungen',
        spS2Note: 'z.B. pauschale Erstattung von Telefonkosten, Unterkunft, etc.',
        colPeriod: 'Zeitraum', colText: 'Text',
        spTotal: 'Summe pauschale Kosten / Erstattung mit Lohnabrechnung:', spLa: 'LA 9976) stfr',
        hospTitle: 'Bei Bewirtung: Geldwerter Vorteil aus Arbeitnehmerbewirtung',
        hospIntro: 'Ich habe vom Arbeitgeber unentgeltlich erhalten:',
        hospB: 'x Frühstück je 20%', hospL: 'x Mittagessen je 40%', hospD: 'x Abendessen je 40%',
        hospOffset: 'Verrechnung mit pauschaler Verpflegung', hospTax: 'Versteuerung als laufender Arbeitslohn',
        beTitle: 'Abrechnung gegen Beleg', beSec: 'b.) Sonstiges / Auslagen', beSecNote: '(Original-Belege beigefügt):', bePay: 'Überweisung',
        kmTitle: 'KM-Abrechnung', kmIntro: 'Pauschale Kostenerstattung für Dienstfahrten im betrieblichen Auftrag',
        kmPlate: "poliz. Kennz. des priv. PKW's:", kmDest: 'Ziel der Fahrt (Firma, Ort)', kmCol: 'KM',
        kmSum: 'Summe gefahrene Kilometer:', kmEur: 'Summe in Euro:', kmUnit: 'KM', kmLa: 'LA 51)',
        destLabel: 'Ort / Land:', destHome: 'Deutschland (Inland)',
        rate14: 'Abwesenheit über 14 h', rate24: 'Abwesenheit über 24 h', rateNone: 'Inland: 14 € über 14 h, 28 € über 24 h.',
        eiTitle: 'Eigenbeleg', eiCol: 'Ausgaben ohne Beleg:', eiTotal: 'total', eiPlace: 'Ort:', eiDate: 'Datum:', eiSign: 'Unterschrift'
      }
    },
    en: {
      ui: {
        appTitle: 'Travel expense report',
        privacy: 'Everything you enter stays on this device. This page sends nothing over the network.',
        stepLang: 'Language', stepType: 'Type of form', stepFill: 'Fill in',
        stepSign: 'Sign', stepSave: 'Save',
        signHint: 'Sign in the box with a mouse, finger or pen. Saving is possible only after that.',
        clear: 'Clear signature', addRow: 'Add row', removeRow: 'Remove row',
        btnPdf: 'Save PDF extract', btnJson: 'Save data as file', btnLoad: 'Load saved data',
        missing: 'Still missing before saving: ', ready: 'Ready. For the PDF extract, choose “Save as PDF” in the print dialog.',
        fName: 'Name', fOccasion: 'Project name / reference', fSignature: 'Signature',
        pick: 'Please select',
        loadOk: 'Data loaded.', loadErr: 'The file could not be read.',
        btnPdfAlt: 'Save print-ready file',
        readyFile: 'Ready. Open the saved file in your browser and print it as PDF there (Ctrl+P).',
        saved: 'Saved.', saveErr: 'Saving did not work.',
        fCustomer: 'Customer', fSigTech: 'Signature of technician', fSigClient: 'Signature of client',
        padTech: 'Technician', padClient: 'Client',
        photosBusy: 'Processing photos …', photosOk: 'Photos added: ', photosMax: 'A maximum of 30 photos is possible.',
        exTitle: 'Before exporting', exCheckH: 'Spelling and sentence check', exNone: 'No issues found.',
        exFound: 'Issues: ', exFix: 'Fix simple errors', exFixed: 'Corrections applied: ', exMore: 'Further hints are not shown.',
        exSpell: 'This checks typical spelling and punctuation errors. Your browser adds a full spell check (red underlined words in the text fields).',
        exLangH: 'Export language', exDe: 'German', exEn: 'English', exBi: 'Bilingual (as in the template)',
        exNote: 'Labels and contract text appear in the chosen language. Your own entries are not translated.',
        exBack: 'Back to editing', exGo: 'Export', exField: 'Field',
        mDouble: 'Word repeated: “%1”', mSpace2: 'Double space', mSpaceBefore: 'Space before punctuation mark', mSpaceAfter: 'Space after punctuation mark missing',
        mCapital: 'Sentence starts with a lowercase letter', mNoEnd: 'Sentence has no closing punctuation', mPunct: 'Punctuation repeated', mBracket: 'Bracket or quotation mark not closed',
        mTypo: 'Spelling: “%1” → “%2”', mComma: 'A comma may be missing before “%1”', mLong: 'Very long sentence (over 40 words), consider splitting', mI: 'The word “i” should be capitalised (I)',
        t: { spesen: 'Flat-rate allowances', beleg: 'Reimbursement against receipts', km: 'Mileage claim', eigen: 'Self-issued receipt', montage: 'Assembly report' }
      },
      f: {
        name: 'Name:', occasion: 'Project name / reference:', date: 'Date', signature: 'Employee signature',
        spTitle: 'Allowance claim',
        spS1: '1.) Flat-rate meal allowances / reimbursed with payroll',
        spS1Note: 'Reimbursement only within the first three months at a new shipyard',
        colDate: 'Date', colTime: 'Time', colFrom: 'from', colTo: 'to', colHours: 'Hours', colPlace: 'Place', colAmount: 'Amount €',
        spS2: '2) Other flat-rate reimbursements',
        spS2Note: 'e.g. flat-rate reimbursement of phone costs, accommodation, etc.',
        colPeriod: 'Period', colText: 'Description',
        spTotal: 'Total flat-rate costs / reimbursed with payroll:', spLa: 'LA 9976) tax-free',
        hospTitle: 'For hospitality: non-cash benefit from employer-provided meals',
        hospIntro: 'I received free of charge from my employer:',
        hospB: 'x breakfast at 20%', hospL: 'x lunch at 40%', hospD: 'x dinner at 40%',
        hospOffset: 'Offset against flat-rate meal allowance', hospTax: 'Taxed as regular salary',
        beTitle: 'Reimbursement against receipts', beSec: 'b.) Other / expenses', beSecNote: '(original receipts attached):', bePay: 'Bank transfer',
        kmTitle: 'Mileage claim', kmIntro: 'Flat-rate reimbursement for business trips in a private car',
        kmPlate: 'Licence plate of private car:', kmDest: 'Destination (company, place)', kmCol: 'KM',
        kmSum: 'Total kilometres driven:', kmEur: 'Total in euros:', kmUnit: 'KM', kmLa: 'LA 51)',
        destLabel: 'Place / country:', destHome: 'Germany (domestic)',
        rate14: 'Absence over 14 h', rate24: 'Absence over 24 h', rateNone: 'The list has no amounts for domestic trips.',
        eiTitle: 'Self-issued receipt', eiCol: 'Expenses without receipt:', eiTotal: 'total', eiPlace: 'Place:', eiDate: 'Date:', eiSign: 'Signature'
      }
    },
    ru: {
      ui: {
        appTitle: 'Отчёт о командировочных расходах',
        privacy: 'Все данные остаются на этом устройстве. Страница ничего не отправляет в сеть.',
        stepLang: 'Язык', stepType: 'Тип формы', stepFill: 'Заполнить',
        stepSign: 'Подписать', stepSave: 'Сохранить',
        signHint: 'Распишитесь в поле мышью, пальцем или стилусом. Сохранить можно только после этого.',
        clear: 'Стереть подпись', addRow: 'Добавить строку', removeRow: 'Удалить строку',
        btnPdf: 'Сохранить выписку в PDF', btnJson: 'Сохранить данные в файл', btnLoad: 'Загрузить сохранённые данные',
        missing: 'Для сохранения ещё не хватает: ', ready: 'Готово. Для PDF в окне печати выберите «Сохранить как PDF».',
        fName: 'ФИО', fOccasion: 'Название проекта / дело', fSignature: 'Подпись',
        pick: 'Выберите',
        loadOk: 'Данные загружены.', loadErr: 'Не удалось прочитать файл.',
        btnPdfAlt: 'Сохранить файл для печати',
        readyFile: 'Готово. Откройте сохранённый файл в браузере и распечатайте его в PDF (Ctrl+P).',
        saved: 'Сохранено.', saveErr: 'Не удалось сохранить.',
        fCustomer: 'Заказчик', fSigTech: 'Подпись монтажника', fSigClient: 'Подпись заказчика',
        padTech: 'Монтажник', padClient: 'Заказчик',
        photosBusy: 'Фото обрабатываются …', photosOk: 'Добавлено фото: ', photosMax: 'Можно добавить не более 30 фото.',
        exTitle: 'Перед экспортом', exCheckH: 'Проверка орфографии и предложений', exNone: 'Замечаний нет.',
        exFound: 'Замечания: ', exFix: 'Исправить простые ошибки', exFixed: 'Исправлений: ', exMore: 'Остальные замечания не показаны.',
        exSpell: 'Проверяются типичные ошибки написания и пунктуации. Полную проверку орфографии дополнительно выполняет браузер (слова с красным подчёркиванием).',
        exLangH: 'Язык экспорта', exDe: 'Немецкий', exEn: 'Английский', exBi: 'На двух языках (как в шаблоне)',
        exNote: 'Подписи и текст условий выводятся на выбранном языке. Ваши собственные записи не переводятся.',
        exBack: 'Вернуться к редактированию', exGo: 'Экспортировать', exField: 'Поле',
        mDouble: 'Слово повторяется: «%1»', mSpace2: 'Двойной пробел', mSpaceBefore: 'Пробел перед знаком препинания', mSpaceAfter: 'Нет пробела после знака препинания',
        mCapital: 'Предложение начинается со строчной буквы', mNoEnd: 'Предложение без знака в конце', mPunct: 'Знак препинания повторяется', mBracket: 'Скобка или кавычка не закрыта',
        mTypo: 'Написание: «%1» → «%2»', mComma: '', mLong: 'Очень длинное предложение (более 40 слов), лучше разделить', mI: '',
        t: { spesen: 'Суточные и пауш. расходы', beleg: 'Возмещение по чекам', km: 'Возмещение за километраж', eigen: 'Собственный документ (без чека)', montage: 'Монтажный отчёт' }
      },
      f: {
        name: 'ФИО:', occasion: 'Название проекта / дело:', date: 'Дата', signature: 'Подпись сотрудника',
        spTitle: 'Отчёт о суточных расходах',
        spS1: '1.) Пауш. возмещение дополнительных расходов на питание / выплата с зарплатой',
        spS1Note: 'Выплата только в течение первых трёх месяцев на новой верфи',
        colDate: 'Дата', colTime: 'Время', colFrom: 'с', colTo: 'до', colHours: 'Кол-во ч.', colPlace: 'Место', colAmount: 'Сумма €',
        spS2: '2) Прочие пауш. возмещения расходов',
        spS2Note: 'напр. пауш. возмещение расходов на телефон, проживание и т. д.',
        colPeriod: 'Период', colText: 'Текст',
        spTotal: 'Итого пауш. расходы / выплата с зарплатой:', spLa: 'LA 9976) не облагается налогом',
        hospTitle: 'При угощении: денежная выгода работника от питания за счёт работодателя',
        hospIntro: 'Я бесплатно получил(а) от работодателя:',
        hospB: 'x завтрак по 20%', hospL: 'x обед по 40%', hospD: 'x ужин по 40%',
        hospOffset: 'Зачёт в счёт пауш. питания', hospTax: 'Налогообложение как текущая зарплата',
        beTitle: 'Возмещение расходов по чекам', beSec: 'б.) Прочее / расходы', beSecNote: '(оригиналы чеков приложены):', bePay: 'Банковский перевод',
        kmTitle: 'Отчёт о километраже', kmIntro: 'Пауш. возмещение расходов на служебные поездки по поручению предприятия',
        kmPlate: 'Гос. номер личного автомобиля:', kmDest: 'Цель поездки (фирма, город)', kmCol: 'КМ',
        kmSum: 'Всего пройдено километров:', kmEur: 'Сумма в евро:', kmUnit: 'км', kmLa: 'LA 51)',
        destLabel: 'Место / страна:', destHome: 'Германия (внутри страны)',
        rate14: 'Отсутствие более 14 ч', rate24: 'Отсутствие более 24 ч', rateNone: 'Для поездок по Германии в списке нет сумм.',
        eiTitle: 'Собственный документ (без чека)', eiCol: 'Расходы без чека:', eiTotal: 'итого', eiPlace: 'Место:', eiDate: 'Дата:', eiSign: 'Подпись'
      }
    }
  };

  /* ---------- Zustand ---------- */
  function pad2(n) { return String(n).padStart(2, '0'); }
  function localToday() {
    var d = new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }
  function makeRows(k) {
    var a = [];
    for (var i = 0; i < START[k]; i++) a.push(BLANK[k]());
    return a;
  }
  function blankHosp() { return { b: '', l: '', d: '', mode: '' }; }

  /* Nur in einer Umgebung ohne Druckdialog (z. B. Vorschau-Link) gesetzt: Sichern läuft dann über eine Datei. */
  var dl = null;

  var state = {
    lang: 'de', type: 'spesen',
    name: '', occasion: '', dest: '', city: '', date: localToday(), sig: null, plate: '',
    meal: makeRows('meal'), other: makeRows('other'), beleg: makeRows('beleg'), km: makeRows('km'), eigen: makeRows('eigen'),
    hosp: { spesen: blankHosp(), beleg: blankHosp() },
    mrow: makeRows('mrow'), sigCust: null,
    mo: { vorgang: '', kunde: '', ort: '', schiff: '', zeitraum: '', liefer: false, montage: true, arbeiten: '', bemerkung: '' },
    mofotos: []
  };

  /* ---------- Helfer ---------- */
  var $ = function (s) { return document.querySelector(s); };
  var paperEl = $('#paper');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function T() { return I18N[state.lang]; }

  function parseNum(v) {
    var s = String(v == null ? '' : v).trim().replace(/[\s€]/g, '');
    if (!s) return 0;
    var lc = s.lastIndexOf(','), ld = s.lastIndexOf('.');
    if (lc > -1 && ld > -1) {
      s = lc > ld ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
    } else {
      s = s.replace(',', '.');
    }
    var n = Number(s);
    return isFinite(n) && n > 0 ? n : 0;
  }
  function fmtEur(n) {
    return new Intl.NumberFormat(LOCALES[state.lang], { style: 'currency', currency: 'EUR' }).format(n);
  }
  function fmtNum(n, digits) {
    return new Intl.NumberFormat(LOCALES[state.lang], { minimumFractionDigits: 0, maximumFractionDigits: digits }).format(n);
  }
  function sum(list, field) {
    var t = 0;
    list.forEach(function (r) { t += parseNum(r[field]); });
    return Math.round(t * 100) / 100;
  }
  function hours(from, to) {
    if (!from || !to) return '';
    var a = from.split(':'), b = to.split(':');
    var m = (+b[0] * 60 + +b[1]) - (+a[0] * 60 + +a[1]);
    if (m < 0) m += 1440;
    return m / 60;
  }
  function setOut(id, text) {
    var el = paperEl.querySelector('#' + id);
    if (el) el.textContent = text;
  }

  /* ---------- Formular zeichnen ---------- */
  function rmCell(k, i) {
    return '<td class="noprint c-rm" data-c="rm"><button type="button" class="rm" data-rm="' + k + '" data-i="' + i + '" aria-label="' +
      esc(T().ui.removeRow) + '"' + (state[k].length <= 1 ? ' disabled' : '') + '>×</button></td>';
  }
  function addBtn(k) {
    return '<button type="button" class="add noprint" data-add="' + k + '"' +
      (state[k].length >= LIMITS[k] ? ' disabled' : '') + '>+ ' + esc(T().ui.addRow) + '</button>';
  }
  function cell(k, i, field, type, value, label, cls) {
    return '<input type="' + type + '" data-k="' + k + '" data-i="' + i + '" data-f="' + field + '"' +
      (cls ? ' class="' + cls + '"' : '') + (type === 'text' && cls === 'num' ? ' inputmode="decimal"' : '') +
      ' value="' + esc(value) + '" aria-label="' + esc(label) + '">';
  }

  /* ---------- Montagebericht: Beschriftungen (nach der Vorlage „Stundennachweis / Service Report“) ---------- */
  var MO = {
    de: { title: 'Stundennachweis', vorgang: 'Vorgangs-Nr.', kunde: 'Kunde', ort: 'Einsatzort', schiff: 'Projekt Schiff', zeitraum: 'Zeitraum',
      liefer: 'Lieferschein', montage: 'Montagebericht', cDate: 'Datum', cName: 'Name', cWork: 'Arbeitszeit', cTravel: 'Reisezeit', cExtra: 'Mehrarbeit',
      remarks: 'Bemerkung', activities: 'Ausgeführte Arbeiten', sigTech: 'Unterschrift Monteur', date: 'Datum', sigClient: 'Unterschrift Auftraggeber',
      photos: 'Fotos', addPhoto: 'Fotos hinzufügen', photoRemark: 'Bemerkung zum Foto', rmPhoto: 'Foto entfernen',
      legal: ['Die Monteure sind angewiesen, die Arbeiten schnell und gewissenhaft durchzuführen. Samstags-, Sonn- und Feiertagsstunden sowie Überstundenzuschläge werden nach gültigem Tarif berechnet.',
        'Die Richtigkeit der Arbeitszeit und der Materialien wird bestätigt. Die aufgeführten Leistungen werden hiermit bescheinigt und abgenommen. Wegzeit zählt mit.',
        'Die Ware bleibt bis zur restlosen Bezahlung Eigentum der Lethe Exterior Doors GmbH.'] },
    en: { title: 'Service Report', vorgang: 'Case no.', kunde: 'Customer', ort: 'Place of work', schiff: 'Project vessel', zeitraum: 'Period',
      liefer: 'Delivery note', montage: 'Assembly report', cDate: 'Date', cName: 'Name', cWork: 'Time of work', cTravel: 'Travel time', cExtra: 'Extra work',
      remarks: 'Remarks', activities: 'Activities carried out', sigTech: 'Signature of technician', date: 'Date', sigClient: 'Signature of client',
      photos: 'Photos', addPhoto: 'Add photos', photoRemark: 'Remark on photo', rmPhoto: 'Remove photo',
      legal: ['Our technicians are advised to perform the work quick and precise. Working hours on weekends and official holidays as well as premium rates are calculated according to the tariff in force.',
        'Correctness of working times and materials is confirmed. Herewith the performed service is confirmed and approved. Travel times to be added. Unless fully paid the goods shall remain our property of Lethe Exterior Doors GmbH.'] },
    ru: { title: 'Табель рабочего времени', vorgang: 'Номер дела', kunde: 'Заказчик', ort: 'Место работ', schiff: 'Проект (судно)', zeitraum: 'Период',
      liefer: 'Накладная', montage: 'Монтажный отчёт', cDate: 'Дата', cName: 'Имя', cWork: 'Время работы', cTravel: 'Время в пути', cExtra: 'Сверхурочные',
      remarks: 'Примечание', activities: 'Выполненные работы', sigTech: 'Подпись монтажника', date: 'Дата', sigClient: 'Подпись заказчика',
      photos: 'Фото', addPhoto: 'Добавить фото', photoRemark: 'Примечание к фото', rmPhoto: 'Удалить фото', legal: null }
  };
  /* Beim Export gesetzt: 'de', 'en' oder 'bi' (zweisprachig). Sonst gilt die Sprache der Oberfläche. */
  var exportMode = null;
  function moMode() { return exportMode || state.lang; }
  function L(key) {
    var m = moMode();
    if (m === 'bi') return MO.de[key] + ' / ' + MO.en[key];
    return MO[m][key];
  }
  function legalHtml() {
    var m = moMode();
    var col = function (l) { return '<div>' + (MO[l].legal || MO.de.legal).map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('') + '</div>'; };
    return '<div class="mo-legal' + (m === 'bi' ? '' : ' one') + '">' + (m === 'bi' ? col('de') + col('en') : col(m === 'en' ? 'en' : (m === 'ru' ? 'ru' : 'de'))) + '</div>';
  }

  /* Orte und Länder kommen aus orte.js. Gespeichert wird immer der deutsche Name. */
  var HOME = 'Deutschland (Inland)';
  function destList() {
    var out = [];
    (window.ORTE || []).forEach(function (e) {
      if (Array.isArray(e[1])) e[1].forEach(function (o) {
        out.push({ group: e[0], value: e[0] + ' – ' + o[0], label: e[0] + ' – ' + o[0], r24: o[1], r8: o[2] });
      });
      else out.push({ group: '', value: e[0], label: e[0], r24: e[1], r8: e[2] });
    });
    return out;
  }
  function destValid(v) {
    return v === HOME || destList().some(function (d) { return d.value === v; });
  }
  /* Zeigt die Beträge des gewählten Ortes: über 14 h = Spalte "mehr als 8 Stunden / An- und Abreisetag", über 24 h = Spalte "mindestens 24 Stunden". */
  function ratesHtml() {
    var f = T().f;
    if (!state.dest) return '';
    var hit = state.dest === HOME ? { r8: 14, r24: 28 } : destList().filter(function (d) { return d.value === state.dest; })[0];
    if (!hit) return '';
    return '<div><span>' + esc(f.rate14) + '</span><b>' + esc(fmtEur(hit.r8)) + '</b></div>' +
      '<div><span>' + esc(f.rate24) + '</span><b>' + esc(fmtEur(hit.r24)) + '</b></div>';
  }
  function updateRates() {
    var el = paperEl.querySelector('#dest-rates');
    if (el) el.innerHTML = ratesHtml();
  }

  function destSelect() {
    var f = T().f, ui = T().ui;
    var html = '<select id="f-dest" data-k="dest" aria-label="' + esc(f.destLabel) + '">' +
      '<option value="">' + esc(ui.pick) + '</option>' +
      '<option value="' + esc(HOME) + '"' + (state.dest === HOME ? ' selected' : '') + '>' + esc(f.destHome) + '</option>';
    var group = null;
    destList().forEach(function (d) {
      if (d.group !== group) {
        if (group) html += '</optgroup>';
        if (d.group) html += '<optgroup label="' + esc(d.group) + '">';
        group = d.group;
      }
      html += '<option value="' + esc(d.value) + '"' + (state.dest === d.value ? ' selected' : '') + '>' + esc(d.label) + '</option>';
    });
    if (group) html += '</optgroup>';
    return html + '</select>';
  }

  function headBlock(title, withDest) {
    var f = T().f;
    return '<div class="p-head"><h2 class="p-title">' + esc(title) + '</h2>' +
      '<address class="p-company">LETHE Exterior Doors GmbH<br>Marschgehren 14<br>28779 Bremen</address></div>' +
      '<div class="p-meta">' +
      '<label class="line"><span>' + esc(f.name) + '</span><input type="text" id="f-name" data-k="name" autocomplete="name" value="' + esc(state.name) + '"></label>' +
      '<label class="line"><span>' + esc(f.occasion) + '</span><input type="text" id="f-occasion" data-k="occasion" value="' + esc(state.occasion) + '"></label>' +
      (withDest ? '<label class="line"><span>' + esc(f.destLabel) + '</span>' + destSelect() + '</label>' +
        '<div class="rates" id="dest-rates" aria-live="polite">' + ratesHtml() + '</div>' : '') +
      '</div>';
  }

  function hospBlock(tk) {
    var f = T().f, h = state.hosp[tk];
    var counts = [['b', 'hospB'], ['l', 'hospL'], ['d', 'hospD']].map(function (p) {
      return '<label class="cnt"><input type="number" min="0" step="1" inputmode="numeric" data-k="hosp" data-t="' + tk +
        '" data-f="' + p[0] + '" value="' + esc(h[p[0]]) + '" aria-label="' + esc(f[p[1]]) + '"><span>' + esc(f[p[1]]) + '</span></label>';
    }).join('');
    var modes = [['offset', 'hospOffset'], ['tax', 'hospTax']].map(function (p) {
      return '<label class="opt"><input type="radio" name="hm-' + tk + '" data-k="hosp" data-t="' + tk +
        '" data-f="mode" value="' + p[0] + '"' + (h.mode === p[0] ? ' checked' : '') + '><span>' + esc(f[p[1]]) + '</span></label>';
    }).join('');
    return '<div class="hosp"><div><p>' + esc(f.hospTitle) + '</p><p>' + esc(f.hospIntro) + '</p>' + counts + '</div>' +
      '<div class="hosp-r">' + modes + '</div></div>';
  }

  function signBlock(withDate) {
    var f = T().f;
    var img = state.sig ? '<img src="' + esc(state.sig) + '" alt="">' : '';
    var date = withDate
      ? '<div class="sg sg-date"><div class="sg-top"><input type="date" id="f-date" data-k="date" value="' + esc(state.date) +
        '" aria-label="' + esc(f.date) + '"></div><div class="sg-line"></div><span>' + esc(f.date) + '</span></div>'
      : '';
    return '<div class="p-sign">' + date + '<div class="sg sg-sig"><div class="sg-top">' + img +
      '</div><div class="sg-line"></div><span>' + esc(f.signature) + '</span></div></div>';
  }

  function paperSpesen() {
    var f = T().f;
    var meal = state.meal.map(function (r, i) {
      return '<tr class="r-meal"><td data-c="date" data-label="' + esc(f.colDate) + '">' + cell('meal', i, 'date', 'date', r.date, f.colDate) + '</td>' +
        '<td data-c="from" data-label="' + esc(f.colFrom) + '">' + cell('meal', i, 'from', 'time', r.from, f.colFrom) + '</td>' +
        '<td data-c="to" data-label="' + esc(f.colTo) + '">' + cell('meal', i, 'to', 'time', r.to, f.colTo) + '</td>' +
        '<td class="num" data-c="hrs" data-label="' + esc(f.colHours) + '"><output data-hours="' + i + '"></output></td>' +
        '<td data-c="amount" data-label="' + esc(f.colAmount) + '">' + cell('meal', i, 'amount', 'text', r.amount, f.colAmount, 'num') + '</td>' + rmCell('meal', i) + '</tr>';
    }).join('');
    var other = state.other.map(function (r, i) {
      return '<tr class="r-other"><td data-c="period" data-label="' + esc(f.colPeriod) + '">' + cell('other', i, 'period', 'text', r.period, f.colPeriod) + '</td>' +
        '<td colspan="3" data-c="text" data-label="' + esc(f.colText) + '">' + cell('other', i, 'text', 'text', r.text, f.colText) + '</td>' +
        '<td data-c="amount" data-label="' + esc(f.colAmount) + '">' + cell('other', i, 'amount', 'text', r.amount, f.colAmount, 'num') + '</td>' + rmCell('other', i) + '</tr>';
    }).join('');
    return headBlock(f.spTitle, true) +
      '<h3 class="p-sec">' + esc(f.spS1) + '</h3><p class="p-note">' + esc(f.spS1Note) + '</p>' +
      '<table class="grid"><colgroup><col class="m-date"><col class="m-time"><col class="m-time"><col class="m-hrs"><col class="m-amt"><col class="noprint c-rm"></colgroup>' +
      '<thead><tr><th rowspan="2">' + esc(f.colDate) + '</th><th colspan="2">' + esc(f.colTime) + '</th><th rowspan="2">' + esc(f.colHours) +
      '</th><th rowspan="2">' + esc(f.colAmount) + '</th><th rowspan="2" class="noprint c-rm"></th></tr>' +
      '<tr><th>' + esc(f.colFrom) + '</th><th>' + esc(f.colTo) + '</th></tr></thead>' +
      '<tbody>' + meal + '</tbody>' +
      '<tfoot><tr><td colspan="4"></td><td class="sum"><output id="sum-meal"></output></td><td class="noprint"></td></tr></tfoot></table>' +
      addBtn('meal') +
      '<h3 class="p-sec">' + esc(f.spS2) + '</h3><p class="p-note">' + esc(f.spS2Note) + '</p>' +
      '<table class="grid"><colgroup><col class="m-date"><col class="m-time"><col class="m-time"><col class="m-hrs"><col class="m-amt"><col class="noprint c-rm"></colgroup>' +
      '<thead><tr><th>' + esc(f.colPeriod) + '</th><th colspan="3">' + esc(f.colText) + '</th><th>' + esc(f.colAmount) + '</th><th class="noprint c-rm"></th></tr></thead>' +
      '<tbody>' + other + '</tbody></table>' + addBtn('other') +
      '<div class="p-total"><span>' + esc(f.spTotal) + '</span><output id="tot"></output><span class="la">' + esc(f.spLa) + '</span></div>' +
      hospBlock('spesen') + signBlock(false);
  }

  function paperBeleg() {
    var f = T().f;
    var body = state.beleg.map(function (r, i) {
      return '<tr class="r-beleg"><td data-c="date" data-label="' + esc(f.colDate) + '">' + cell('beleg', i, 'date', 'date', r.date, f.colDate) + '</td>' +
        '<td data-c="text" data-label="' + esc(f.colText) + '">' + cell('beleg', i, 'text', 'text', r.text, f.colText) + '</td>' +
        '<td data-c="amount" data-label="' + esc(f.colAmount) + '">' + cell('beleg', i, 'amount', 'text', r.amount, f.colAmount, 'num') + '</td>' + rmCell('beleg', i) + '</tr>';
    }).join('');
    return headBlock(f.beTitle) +
      '<h3 class="p-sec">' + esc(f.beSec) + ' <span class="norm">' + esc(f.beSecNote) + '</span></h3>' +
      '<table class="grid"><colgroup><col class="c-date"><col><col class="c-amt"><col class="noprint c-rm"></colgroup>' +
      '<thead><tr><th>' + esc(f.colDate) + '</th><th>' + esc(f.colText) + '</th><th>' + esc(f.colAmount) + '</th><th class="noprint c-rm"></th></tr></thead>' +
      '<tbody>' + body + '</tbody></table>' + addBtn('beleg') +
      '<div class="p-total"><span>' + esc(f.bePay) + '</span><output id="tot"></output><span class="la"></span></div>' +
      hospBlock('beleg') + signBlock(true);
  }

  function paperKm() {
    var f = T().f;
    var body = state.km.map(function (r, i) {
      return '<tr class="r-km"><td data-c="date" data-label="' + esc(f.colDate) + '">' + cell('km', i, 'date', 'date', r.date, f.colDate) + '</td>' +
        '<td data-c="dest" data-label="' + esc(f.kmDest) + '">' + cell('km', i, 'dest', 'text', r.dest, f.kmDest) + '</td>' +
        '<td data-c="km" data-label="' + esc(f.kmCol) + '">' + cell('km', i, 'km', 'text', r.km, f.kmCol, 'num') + '</td>' + rmCell('km', i) + '</tr>';
    }).join('');
    return headBlock(f.kmTitle) +
      '<h3 class="p-sec">' + esc(f.kmIntro) + '</h3>' +
      '<div class="plate"><div class="plate-h">' + esc(f.kmPlate) + '</div><input type="text" id="f-plate" data-k="plate" autocapitalize="characters" value="' + esc(state.plate) + '" aria-label="' + esc(f.kmPlate) + '"></div>' +
      '<table class="grid cyan gap"><colgroup><col class="c-date"><col><col class="c-km"><col class="noprint c-rm"></colgroup>' +
      '<thead><tr><th class="t-c">' + esc(f.colDate) + '</th><th>' + esc(f.kmDest) + '</th><th class="t-c">' + esc(f.kmCol) + '</th><th class="noprint c-rm"></th></tr></thead>' +
      '<tbody>' + body + '</tbody></table>' + addBtn('km') +
      '<div class="km-sums">' +
      '<div class="km-row"><span>' + esc(f.kmSum) + '</span><span></span><output class="box" id="km-sum"></output><span></span></div>' +
      '<div class="km-row"><span>' + esc(f.kmEur) + '</span><span class="rate">× ' + esc(fmtEur(KM_RATE)) + '</span><output class="eur" id="km-eur"></output><em>' + esc(f.kmLa) + '</em></div>' +
      '<div class="km-row strong"><span>' + esc(f.spTotal) + '</span><span></span><output class="eur" id="tot"></output><span></span></div>' +
      '</div>' + signBlock(true);
  }

  function paperEigen() {
    var f = T().f;
    var body = state.eigen.map(function (r, i) {
      return '<tr class="r-eigen"><td data-c="date" data-label="' + esc(f.colDate) + '">' + cell('eigen', i, 'date', 'date', r.date, f.colDate) + '</td>' +
        '<td data-c="text" data-label="' + esc(f.eiCol) + '">' + cell('eigen', i, 'text', 'text', r.text, f.eiCol) + '</td>' +
        '<td data-c="amount" data-label="' + esc(f.colAmount) + '">' + cell('eigen', i, 'amount', 'text', r.amount, f.colAmount, 'num') + '</td>' + rmCell('eigen', i) + '</tr>';
    }).join('');
    var img = state.sig ? '<img src="' + esc(state.sig) + '" alt="">' : '';
    return '<h2 class="p-title">' + esc(f.eiTitle) + '</h2>' +
      '<div class="p-meta">' +
      '<label class="line"><span>' + esc(f.name) + '</span><input type="text" id="f-name" data-k="name" autocomplete="name" value="' + esc(state.name) + '"></label>' +
      '<label class="line"><span>' + esc(f.occasion) + '</span><input type="text" id="f-occasion" data-k="occasion" value="' + esc(state.occasion) + '"></label>' +
      '</div>' +
      '<table class="grid eb"><colgroup><col class="c-date"><col><col class="c-amt"><col class="noprint c-rm"></colgroup>' +
      '<thead><tr><th>' + esc(f.colDate) + '</th><th>' + esc(f.eiCol) + '</th><th class="t-r">€</th><th class="noprint c-rm"></th></tr></thead>' +
      '<tbody>' + body + '</tbody>' +
      '<tfoot><tr><td class="tl" colspan="2">' + esc(f.eiTotal) + '</td><td class="sum"><output id="tot"></output></td><td class="noprint"></td></tr></tfoot></table>' +
      addBtn('eigen') +
      '<div class="p-sign eb-sign">' +
      '<div class="sg sg-city"><div class="sg-top"><input type="text" id="f-city" data-k="city" value="' + esc(state.city) + '" aria-label="' + esc(f.eiPlace) + '"></div><div class="sg-line"></div><span>' + esc(f.eiPlace) + '</span></div>' +
      '<div class="sg sg-date"><div class="sg-top"><input type="date" id="f-date" data-k="date" value="' + esc(state.date) + '" aria-label="' + esc(f.eiDate) + '"></div><div class="sg-line"></div><span>' + esc(f.eiDate) + '</span></div>' +
      '<div class="sg sg-sig"><div class="sg-top">' + img + '</div><div class="sg-line"></div><span>' + esc(f.eiSign) + '</span></div></div>';
  }

  /* ---------- Montagebericht: Formular ---------- */
  function moLine(field, label, extra) {
    return '<label class="line"><span>' + esc(label) + '</span><input type="text" data-k="mo" data-f="' + field + '" value="' + esc(state.mo[field]) + '"' + (extra || '') + '></label>';
  }
  function moArea(k, f, i, value, label, rows) {
    var idx = i === null ? '' : ' data-i="' + i + '"';
    return '<textarea class="mo-area" data-k="' + k + '"' + idx + ' data-f="' + f + '" rows="' + rows + '" spellcheck="true" lang="' + state.lang +
      '" aria-label="' + esc(label) + '">' + esc(value) + '</textarea><div class="pt" aria-hidden="true"></div>';
  }
  function paperMontage() {
    var m = state.mo, f = T().f;
    var rows = state.mrow.map(function (r, i) {
      return '<tr class="r-mrow">' +
        '<td data-c="date" data-label="' + esc(L('cDate')) + '">' + cell('mrow', i, 'date', 'date', r.date, L('cDate')) + '</td>' +
        '<td data-c="mname" data-label="' + esc(L('cName')) + '">' + cell('mrow', i, 'name', 'text', r.name, L('cName')) + '</td>' +
        '<td data-c="mwork" data-label="' + esc(L('cWork')) + '">' + cell('mrow', i, 'work', 'text', r.work, L('cWork'), 'num') + '</td>' +
        '<td data-c="mtravel" data-label="' + esc(L('cTravel')) + '">' + cell('mrow', i, 'travel', 'text', r.travel, L('cTravel'), 'num') + '</td>' +
        '<td data-c="mextra" data-label="' + esc(L('cExtra')) + '">' + cell('mrow', i, 'extra', 'text', r.extra, L('cExtra'), 'num') + '</td>' + rmCell('mrow', i) + '</tr>';
    }).join('');
    var photos = state.mofotos.map(function (ph, i) {
      return '<div class="mo-ph"><img src="' + esc(ph.src) + '" alt="' + esc(L('photos')) + ' ' + (i + 1) + '">' +
        '<div class="mo-cap"><span class="mo-no">' + (i + 1) + '</span>' + moArea('mofotos', 'text', i, ph.text, L('photoRemark') + ' ' + (i + 1), 2) + '</div>' +
        '<button type="button" class="add noprint" data-rmphoto="' + i + '">× ' + esc(L('rmPhoto')) + '</button></div>';
    }).join('');
    var sigImg = function (d) { return d ? '<img src="' + esc(d) + '" alt="">' : ''; };
    return '<div class="mo-top"><div class="mo-main">' +
        moLine('vorgang', L('vorgang')) +
        '<h2 class="p-title mo-title">' + esc(moMode() === 'bi' ? MO.de.title + ' / ' + MO.en.title : MO[moMode()].title) + '</h2>' +
        moLine('kunde', L('kunde') + ':', ' autocomplete="off"') + moLine('ort', L('ort') + ':', ' autocomplete="off"') +
        moLine('schiff', L('schiff') + ':') + moLine('zeitraum', L('zeitraum') + ':') +
      '</div></div>' +
      '<table class="grid mo"><colgroup><col class="mc-date"><col class="mc-name"><col class="mc-h"><col class="mc-h"><col class="mc-h"><col class="noprint c-rm"></colgroup>' +
      '<thead><tr><th>' + esc(L('cDate')) + '</th><th>' + esc(L('cName')) + '</th><th>' + esc(L('cWork')) + '</th><th>' + esc(L('cTravel')) + '</th><th>' + esc(L('cExtra')) +
      '</th><th class="noprint c-rm"></th></tr></thead><tbody>' + rows + '</tbody></table>' + addBtn('mrow') +
      '<h3 class="mo-bar">' + esc(L('remarks')) + '</h3>' + moArea('mo', 'bemerkung', null, m.bemerkung, L('remarks'), 3) +
      '<h3 class="mo-bar">' + esc(L('activities')) + '</h3>' + moArea('mo', 'arbeiten', null, m.arbeiten, L('activities'), 8) +
      legalHtml() +
      '<div class="mo-sign">' +
        '<div class="sg"><div class="sg-top">' + sigImg(state.sig) + '</div><div class="sg-line"></div><span>' + esc(L('sigTech')) + '</span></div>' +
        '<div class="sg"><div class="sg-top"><input type="date" id="f-date" data-k="date" value="' + esc(state.date) + '" aria-label="' + esc(L('date')) + '"></div><div class="sg-line"></div><span>' + esc(L('date')) + '</span></div>' +
        '<div class="sg"><div class="sg-top">' + sigImg(state.sigCust) + '</div><div class="sg-line"></div><span>' + esc(L('sigClient')) + '</span></div>' +
      '</div>' +
      '<section class="mo-photos' + (state.mofotos.length ? ' has' : '') + '">' +
        '<h3 class="mo-bar' + (state.mofotos.length ? '' : ' noprint') + '">' + esc(L('photos')) + '</h3>' +
        '<label class="add noprint filebtn"><span>+ ' + esc(L('addPhoto')) + '</span><input type="file" id="mo-files" accept="image/*" multiple></label>' +
        (photos ? '<div class="mo-grid">' + photos + '</div>' : '') +
      '</section>';
  }

  /* Textfelder werden im Druck als Text ausgegeben, damit nichts abgeschnitten wird. */
  function syncPrintText() {
    paperEl.querySelectorAll('textarea').forEach(function (t) {
      var d = t.nextElementSibling;
      if (d && d.classList.contains('pt')) d.textContent = t.value;
    });
  }

  function shrink(file) {
    return new Promise(function (resolve) {
      var fr = new FileReader();
      fr.onerror = function () { resolve(null); };
      fr.onload = function () {
        var img = new Image();
        img.onerror = function () { resolve(null); };
        img.onload = function () {
          var k = Math.min(1, PHOTO_PX / Math.max(img.width, img.height));
          var c = document.createElement('canvas');
          c.width = Math.max(1, Math.round(img.width * k));
          c.height = Math.max(1, Math.round(img.height * k));
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          resolve(c.toDataURL('image/jpeg', 0.8));
        };
        img.src = String(fr.result);
      };
      fr.readAsDataURL(file);
    });
  }
  function addPhotos(list) {
    var ui = T().ui;
    var files = Array.prototype.slice.call(list || []).filter(function (x) { return /^image\//.test(x.type); });
    if (!files.length) return;
    var room = MAX_PHOTOS - state.mofotos.length;
    if (files.length > room) { setStatus(ui.photosMax, false); files = files.slice(0, Math.max(0, room)); }
    if (!files.length) return;
    setStatus(ui.photosBusy, true);
    Promise.all(files.map(shrink)).then(function (res) {
      var n = 0;
      res.forEach(function (src) { if (src) { state.mofotos.push({ src: src, text: '' }); n++; } });
      renderPaper();
      setStatus(ui.photosOk + n, true);
    });
  }

  function renderPaper() {
    var build = { spesen: paperSpesen, beleg: paperBeleg, km: paperKm, eigen: paperEigen, montage: paperMontage };
    paperEl.innerHTML = '<div class="p-logo"><img src="' + LOGO + '" alt="LETHE exterior doors"></div>' + build[state.type]();
    syncPrintText();
    calc();
  }

  /* ---------- Berechnung ---------- */
  function calc() {
    if (state.type === 'spesen') {
      state.meal.forEach(function (r, i) {
        var o = paperEl.querySelector('[data-hours="' + i + '"]');
        var h = hours(r.from, r.to);
        if (o) o.textContent = h === '' ? '' : fmtNum(h, 1);
      });
      var s1 = sum(state.meal, 'amount'), s2 = sum(state.other, 'amount');
      setOut('sum-meal', fmtEur(s1));
      setOut('tot', fmtEur(Math.round((s1 + s2) * 100) / 100));
    } else if (state.type === 'beleg') {
      setOut('tot', fmtEur(sum(state.beleg, 'amount')));
    } else if (state.type === 'eigen') {
      setOut('tot', fmtEur(sum(state.eigen, 'amount')));
    } else {
      var km = sum(state.km, 'km');
      var eur = Math.round(km * KM_RATE * 100) / 100;
      setOut('km-sum', fmtNum(km, 1) + ' ' + T().f.kmUnit);
      setOut('km-eur', fmtEur(eur));
      setOut('tot', fmtEur(eur));
    }
  }

  /* ---------- Auswahl und Texte ---------- */
  function renderChoices() {
    var ui = T().ui;
    $('#choice-lang').innerHTML = Object.keys(LANG_NAMES).map(function (l) {
      return '<label><input type="radio" name="lang" value="' + l + '"' + (state.lang === l ? ' checked' : '') +
        '><span class="opt">' + esc(LANG_NAMES[l]) + '</span></label>';
    }).join('');
    $('#choice-type').innerHTML = TYPES.map(function (t) {
      var orig = I18N.de.ui.t[t];
      var sub = state.lang !== 'de' ? '<small>' + esc(orig) + '</small>' : '';
      return '<label><input type="radio" name="type" value="' + t + '"' + (state.type === t ? ' checked' : '') +
        '><span class="opt">' + esc(ui.t[t]) + sub + '</span></label>';
    }).join('');
  }
  function applyChrome() {
    var ui = T().ui;
    document.documentElement.lang = state.lang;
    document.title = ui.appTitle;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (ui[key] != null) el.textContent = ui[key];
    });
    var mont = state.type === 'montage';
    $('#pad').setAttribute('aria-label', mont ? ui.fSigTech : ui.fSignature);
    $('#pad2').setAttribute('aria-label', ui.fSigClient);
    $('#client-sign').hidden = !mont;
    $('#lab-pad1').hidden = !mont;
    $('#lab-pad1').textContent = ui.padTech;
    $('#lab-pad2').textContent = ui.padClient;
    $('#clear-sig2').textContent = ui.clear;
  }

  /* ---------- Prüfung vor dem Sichern ---------- */
  function updateStatus() {
    var ui = T().ui, miss = [];
    if (state.type === 'montage') {
      if (!state.mo.kunde.trim()) miss.push(ui.fCustomer);
      if (!state.sig) miss.push(ui.fSigTech);
      if (!state.sigCust) miss.push(ui.fSigClient);
    } else {
      if (!state.name.trim()) miss.push(ui.fName);
      if (!state.occasion.trim()) miss.push(ui.fOccasion);
      if (!state.sig) miss.push(ui.fSignature);
    }
    $('#btn-pdf').disabled = miss.length > 0;
    $('#btn-json').disabled = miss.length > 0;
    var st = $('#status');
    st.className = 'status' + (miss.length ? '' : ' ok');
    st.textContent = miss.length ? ui.missing + miss.join(', ') : (dl ? ui.readyFile : ui.ready);
  }
  function setStatus(text, ok) {
    var st = $('#status');
    st.className = 'status' + (ok ? ' ok' : '');
    st.textContent = text;
  }

  function renderAll() {
    renderChoices();
    applyChrome();
    renderPaper();
    updateStatus();
  }

  /* ---------- Rechtschreib- und Satzprüfung (läuft vollständig auf dem Gerät) ---------- */
  var TYPO = {
    de: { standart: 'Standard', garnicht: 'gar nicht', vieleicht: 'vielleicht', villeicht: 'vielleicht', nähmlich: 'nämlich', desshalb: 'deshalb', obwol: 'obwohl',
      seperat: 'separat', aluminum: 'Aluminium', dannach: 'danach', entgültig: 'endgültig', gewehrleistung: 'Gewährleistung', regenrine: 'Regenrinne',
      abgedichted: 'abgedichtet', montirt: 'montiert', terasse: 'Terrasse', terassen: 'Terrassen', terassendach: 'Terrassendach', terassenüberdachung: 'Terrassenüberdachung',
      verschidene: 'verschiedene', ausgefürt: 'ausgeführt', durchgefürt: 'durchgeführt', fertiggestelt: 'fertiggestellt', defeckt: 'defekt', reklamazion: 'Reklamation',
      aufmas: 'Aufmaß', wiederspruch: 'Widerspruch', morgends: 'morgens', abens: 'abends', bischen: 'bisschen', nähmlichen: 'nämlichen', lehrer: 'Lehrer' },
    en: { recieve: 'receive', recieved: 'received', seperate: 'separate', occured: 'occurred', untill: 'until', definately: 'definitely', alot: 'a lot', teh: 'the',
      adress: 'address', sucessful: 'successful', instaled: 'installed', instalation: 'installation', mesurement: 'measurement', alluminium: 'aluminium',
      dont: "don't", cant: "can't", wich: 'which', thier: 'their', beleive: 'believe', recomend: 'recommend', completly: 'completely', finised: 'finished', finnished: 'finished' }
  };
  delete TYPO.de.lehrer;
  var ABBR = /^(z|b|d|h|u|a|o|v|s|e|g|i|m|ca|bzw|usw|ggf|inkl|zzgl|evtl|nr|tel|str|vgl|etc|max|min|mm|cm|km|dr|prof|sog|bspw|ff|fa|mo|di|mi|do|fr|sa|so|vs|no|approx|incl|pcs|dept)$/i;
  var FIXABLE = { mDouble: 1, mSpace2: 1, mSpaceBefore: 1, mSpaceAfter: 1, mCapital: 1, mTypo: 1 };
  var CONJ = /^(und|oder|sowie|sondern|aber|doch|bzw|auch|nur|nicht|schon|noch|selbst|gerade|vor|nach|mit|ohne|bis|seit|von)$/i;

  function matchCase(orig, rep) {
    var up = orig.charAt(0) !== orig.charAt(0).toLowerCase();
    if (rep.charAt(0) !== rep.charAt(0).toLowerCase()) return rep;
    return up ? rep.charAt(0).toUpperCase() + rep.slice(1) : rep;
  }
  function typoOf(word, lang) {
    var map = TYPO[lang];
    if (!map) return null;
    var low = word.toLowerCase();
    return Object.prototype.hasOwnProperty.call(map, low) ? matchCase(word, map[low]) : null;
  }
  function isAbbr(tok) {
    var t = tok.replace(/[.!?]+$/, '').replace(/^[("„“‚'\[]+/, '');
    return /\./.test(t) || /^\d+$/.test(t) || t.length <= 2 || ABBR.test(t);
  }
  function ctxOf(line, idx, len) {
    var a = Math.max(0, idx - 14), b = Math.min(line.length, idx + len + 14);
    return (a > 0 ? '…' : '') + line.slice(a, b) + (b < line.length ? '…' : '');
  }

  function scanText(text, lang) {
    var out = [], lines = String(text || '').split(/\r?\n/), prevEnd = true, m;
    var add = function (code, ctx, a, b) { out.push({ code: code, ctx: ctx, a: a, b: b }); };
    lines.forEach(function (raw) {
      var ln = raw;
      if (!ln.trim()) { prevEnd = true; return; }
      var listed = /^\s*(?:[-–•*]|\d+[.)])\s+/.test(ln);
      var body = ln.replace(/^\s*(?:[-–•*]|\d+[.)])\s+/, '');
      // doppelte Wörter
      var re = /(^|[^\p{L}\d'’])(\p{L}{2,})[ \t]+\2(?![\p{L}\d])/giu;
      while ((m = re.exec(ln))) {
        if (lang === 'en' && /^(that|had)$/i.test(m[2])) continue;
        add('mDouble', ctxOf(ln, m.index, m[0].length), m[2]);
      }
      if (/\S[ \t]{2,}\S/.test(body)) add('mSpace2', ctxOf(ln, ln.search(/\S[ \t]{2,}\S/), 4));
      if ((m = /[\p{L}\d][ \t]+[,;:!?]/u.exec(ln))) add('mSpaceBefore', ctxOf(ln, m.index, m[0].length));
      if ((m = /[\p{L}\d][ \t]+\.(?=\s|$)/u.exec(ln))) add('mSpaceBefore', ctxOf(ln, m.index, m[0].length));
      if ((m = /[,;!?](?=\p{L})/u.exec(ln)) || (m = /\p{Ll}{3,}\.(?=\p{Lu})/u.exec(ln))) add('mSpaceAfter', ctxOf(ln, m.index, m[0].length));
      if ((m = /([,;:])\1+|[!?]{2,}|(?<!\.)\.\.(?!\.)|\.{4,}|,\./.exec(ln))) add('mPunct', ctxOf(ln, m.index, m[0].length));
      var open = (ln.match(/\(/g) || []).length - (ln.match(/\)/g) || []).length;
      var q = (ln.match(/["„“]/g) || []).length;
      if (open !== 0 || (q % 2 === 1)) add('mBracket', ctxOf(ln, 0, Math.min(ln.length, 28)));
      // Satzanfang
      var cap = false;
      if (/^\p{Ll}/u.test(body) && (prevEnd || listed) && !isAbbr(body.split(/\s+/)[0])) { cap = true; add('mCapital', ctxOf(ln, ln.indexOf(body), Math.min(body.length, 20))); }
      var toks = body.split(/(\s+)/);
      for (var i = 0; i + 2 < toks.length; i += 2) {
        var w = toks[i], nx = toks[i + 2];
        if (/[.!?]$/.test(w) && /^\p{Ll}/u.test(nx) && !isAbbr(w)) add('mCapital', w + ' ' + nx);
      }
      // Wörter: Tippfehler, englisches „i“
      var wr = /\p{L}+/gu;
      while ((m = wr.exec(ln))) {
        var fixd = typoOf(m[0], lang);
        if (fixd) add('mTypo', ctxOf(ln, m.index, m[0].length), m[0], fixd);
        if (lang === 'en' && m[0] === 'i' && ln.charAt(m.index - 1) !== "'" && !/\d/.test(ln.charAt(m.index - 1) + ln.charAt(m.index + 1))) add('mI', ctxOf(ln, m.index, 1));
      }
      // Komma vor Nebensatz (Deutsch)
      if (lang === 'de') {
        var cr = /(^|[^,\s])\s+(dass|weil|obwohl|sodass)\b/giu;
        while ((m = cr.exec(ln))) {
          var before = (ln.slice(0, m.index + m[1].length).match(/\p{L}+$/u) || [''])[0];
          if (m[1] && !CONJ.test(before)) add('mComma', ctxOf(ln, m.index, m[0].length), m[2]);
        }
      }
      // Satzschluss und Länge
      var words = body.trim().split(/\s+/).length;
      if (words >= 6 && !/[.!?:;)"“]$/.test(body.trim())) add('mNoEnd', ctxOf(ln, Math.max(0, ln.length - 24), 24));
      body.split(/(?<=[.!?])\s+/).forEach(function (sn) { if (sn.trim().split(/\s+/).length > 40) add('mLong', sn.slice(0, 40) + '…'); });
      prevEnd = /[.!?:;]$/.test(body.trim());
    });
    return out;
  }

  function fixText(text, lang) {
    var lines = String(text || '').split(/\r?\n/), prevEnd = true;
    var res = lines.map(function (ln) {
      if (!ln.trim()) { prevEnd = true; return ln; }
      var lead = (/^\s*(?:[-–•*]|\d+[.)])\s+/.exec(ln) || [''])[0];
      var body = ln.slice(lead.length);
      body = body.replace(/[ \t]+$/g, '').replace(/(\S)[ \t]{2,}(?=\S)/g, '$1 ');
      body = body.replace(/([\p{L}\d])[ \t]+([,;:!?])/gu, '$1$2').replace(/([\p{L}\d])[ \t]+\.(?=\s|$)/gu, '$1.');
      body = body.replace(/([,;!?])(?=\p{L})/gu, '$1 ').replace(/(\p{Ll}{3,})\.(?=\p{Lu})/gu, '$1. ');
      body = body.replace(/(^|[^\p{L}\d'’])(\p{L}{2,})([ \t]+)\2(?![\p{L}\d])/giu, function (all, pre, w) {
        return lang === 'en' && /^(that|had)$/i.test(w) ? all : pre + w;
      });
      body = body.replace(/\p{L}+/gu, function (w) { return typoOf(w, lang) || w; });
      var toks = body.split(/(\s+)/);
      if (toks.length && /^\p{Ll}/u.test(toks[0]) && (prevEnd || lead) && !isAbbr(toks[0])) toks[0] = toks[0].charAt(0).toUpperCase() + toks[0].slice(1);
      for (var i = 0; i + 2 < toks.length; i += 2) {
        if (/[.!?]$/.test(toks[i]) && /^\p{Ll}/u.test(toks[i + 2]) && !isAbbr(toks[i])) toks[i + 2] = toks[i + 2].charAt(0).toUpperCase() + toks[i + 2].slice(1);
      }
      body = toks.join('');
      prevEnd = /[.!?:;]$/.test(body.trim());
      return lead + body;
    });
    return res.join('\n');
  }

  function checkFields() {
    var ui = T().ui, list = [];
    list.push({ label: L('activities'), get: function () { return state.mo.arbeiten; }, set: function (v) { state.mo.arbeiten = v; } });
    list.push({ label: L('remarks'), get: function () { return state.mo.bemerkung; }, set: function (v) { state.mo.bemerkung = v; } });
    state.mofotos.forEach(function (ph, i) {
      list.push({ label: L('photos') + ' ' + (i + 1), get: function () { return ph.text; }, set: function (v) { ph.text = v; } });
    });
    return list;
  }
  var CHECK_LIMIT = 40;
  function collectFindings() {
    var lang = state.lang, all = [];
    checkFields().forEach(function (fl) {
      scanText(fl.get(), lang).forEach(function (x) { x.label = fl.label; all.push(x); });
    });
    return all;
  }
  function fillMsg(x) {
    var ui = T().ui, t = ui[x.code] || x.code;
    return t.replace('%1', x.a == null ? '' : x.a).replace('%2', x.b == null ? '' : x.b);
  }

  /* ---------- Export-Dialog ---------- */
  var exSel = 'de', exNotice = '';
  function dialogHtml() {
    var ui = T().ui, fnd = collectFindings(), fixable = fnd.filter(function (x) { return FIXABLE[x.code]; }).length;
    var h = '<h2 id="dlg-title">' + esc(ui.exTitle) + '</h2><h3>' + esc(ui.exCheckH) + '</h3>';
    if (exNotice) h += '<p class="status ok">' + esc(exNotice) + '</p>';
    if (!fnd.length) h += '<p class="status ok">' + esc(ui.exNone) + '</p>';
    else {
      h += '<p class="status">' + esc(ui.exFound + fnd.length) + '</p><ul class="fl">' +
        fnd.slice(0, CHECK_LIMIT).map(function (x) {
          return '<li><b>' + esc(x.label) + ':</b> ' + esc(fillMsg(x)) + (x.ctx ? ' <q>' + esc(x.ctx) + '</q>' : '') + '</li>';
        }).join('') + '</ul>' + (fnd.length > CHECK_LIMIT ? '<p class="hint">' + esc(ui.exMore) + '</p>' : '');
      if (fixable) h += '<p><button type="button" class="btn" data-dact="fix">' + esc(ui.exFix) + ' (' + fixable + ')</button></p>';
    }
    h += '<p class="hint">' + esc(ui.exSpell) + '</p><h3>' + esc(ui.exLangH) + '</h3><div class="seg" role="radiogroup" aria-label="' + esc(ui.exLangH) + '">' +
      [['de', 'exDe'], ['en', 'exEn'], ['bi', 'exBi']].map(function (o) {
        return '<label><input type="radio" name="exlang" value="' + o[0] + '"' + (exSel === o[0] ? ' checked' : '') + '><span class="opt">' + esc(ui[o[1]]) + '</span></label>';
      }).join('') + '</div><p class="hint">' + esc(ui.exNote) + '</p>' +
      '<div class="row"><button type="button" class="btn" data-dact="back">' + esc(ui.exBack) + '</button>' +
      '<button type="button" class="btn primary" data-dact="go">' + esc(ui.exGo) + '</button></div>';
    return h;
  }
  function openExport() {
    exSel = state.lang === 'en' ? 'en' : 'de';
    exNotice = '';
    var dlg = $('#dlg');
    $('#dlg-body').innerHTML = dialogHtml();
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
  }
  function closeDialog() {
    var dlg = $('#dlg');
    if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
  }
  $('#dlg').addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-dact]');
    if (!b) return;
    var a = b.getAttribute('data-dact');
    if (a === 'back') closeDialog();
    else if (a === 'go') { closeDialog(); doExport(exSel); }
    else if (a === 'fix') {
      var n = 0, lang = state.lang;
      checkFields().forEach(function (fl) {
        var before = scanText(fl.get(), lang).filter(function (x) { return FIXABLE[x.code]; }).length;
        var nv = fixText(fl.get(), lang);
        if (nv !== fl.get()) fl.set(nv);
        var after = scanText(fl.get(), lang).filter(function (x) { return FIXABLE[x.code]; }).length;
        n += Math.max(0, before - after);
      });
      exNotice = T().ui.exFixed + n;
      renderPaper();
      $('#dlg-body').innerHTML = dialogHtml();
    }
  });
  $('#dlg').addEventListener('change', function (e) {
    if (e.target.name === 'exlang') exSel = e.target.value;
  });

  /* ---------- Ereignisse ---------- */
  paperEl.addEventListener('input', function (e) {
    var el = e.target, k = el.dataset.k;
    if (!k) return;
    var v = el.value;
    if (el.dataset.i !== undefined) state[k][+el.dataset.i][el.dataset.f] = v;
    else if (k === 'hosp') state.hosp[el.dataset.t][el.dataset.f] = v;
    else if (k === 'mo') state.mo[el.dataset.f] = el.type === 'checkbox' ? el.checked : v;
    else state[k] = v;
    if (k === 'dest') updateRates();
    calc();
    updateStatus();
  });
  paperEl.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    var add = btn.getAttribute('data-add'), rm = btn.getAttribute('data-rm'), rp = btn.getAttribute('data-rmphoto');
    if (rp !== null) {
      state.mofotos.splice(+rp, 1);
      renderPaper();
    } else if (add && state[add].length < LIMITS[add]) {
      state[add].push(BLANK[add]());
      renderPaper();
    } else if (rm && state[rm].length > 1) {
      state[rm].splice(+btn.getAttribute('data-i'), 1);
      renderPaper();
    }
  });
  paperEl.addEventListener('change', function (e) {
    if (e.target.id === 'mo-files') { addPhotos(e.target.files); e.target.value = ''; }
  });
  $('#choice-lang').addEventListener('change', function (e) {
    if (LANG_NAMES[e.target.value]) { state.lang = e.target.value; renderAll(); }
  });
  $('#choice-type').addEventListener('change', function (e) {
    if (TYPES.indexOf(e.target.value) > -1) { state.type = e.target.value; renderAll(); }
  });

  /* ---------- Unterschrift ---------- */
  function makePad(canvas, key, clearBtn) {
    var c = canvas.getContext('2d');
    c.lineWidth = 5; c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = '#111';
    var drawing = false, last = null, moved = false;
    function pos(e) {
      var r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * canvas.width / r.width, y: (e.clientY - r.top) * canvas.height / r.height };
    }
    canvas.addEventListener('pointerdown', function (e) {
      drawing = true; moved = false; last = pos(e);
      canvas.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!drawing) return;
      var q = pos(e);
      c.beginPath(); c.moveTo(last.x, last.y); c.lineTo(q.x, q.y); c.stroke();
      last = q; moved = true;
    });
    function end() {
      if (!drawing) return;
      drawing = false;
      if (moved) {
        state[key] = canvas.toDataURL('image/png');
        renderPaper();
        updateStatus();
      }
    }
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
    clearBtn.addEventListener('click', function () {
      c.clearRect(0, 0, canvas.width, canvas.height);
      state[key] = null;
      renderPaper();
      updateStatus();
    });
    return {
      redraw: function () {
        c.clearRect(0, 0, canvas.width, canvas.height);
        if (!state[key]) return;
        var img = new Image();
        img.onload = function () { c.drawImage(img, 0, 0, canvas.width, canvas.height); };
        img.src = state[key];
      }
    };
  }
  var pad1 = makePad($('#pad'), 'sig', $('#clear-sig'));
  var pad2 = makePad($('#pad2'), 'sigCust', $('#clear-sig2'));
  function drawSigFromState() { pad1.redraw(); pad2.redraw(); }

  /* ---------- Sichern: PDF-Auszug (Druckdialog) und Datei ---------- */
  function slug(s) {
    return s.trim().replace(/[^\p{L}\p{N}-]+/gu, '_').replace(/^_+|_+$/g, '').slice(0, 40);
  }
  function fileBase() {
    var parts = [FILE_NAMES[state.type]];
    var n = slug(state.type === 'montage' ? state.mo.kunde : state.name);
    if (n) parts.push(n);
    parts.push(state.date || localToday());
    return parts.join('_');
  }

  function saveViaCapability(filename, data) {
    dl.save({ filename: filename, data: data }).then(function () {
      setStatus(T().ui.saved, true);
    }).catch(function (err) {
      if (err && err.code === 'declined') return;
      setStatus(T().ui.saveErr, false);
    });
  }

  /* Eigenständige HTML-Datei mit dem ausgefüllten Formular, die sich im Browser als PDF drucken lässt. */
  function printReadyHtml() {
    var live = paperEl.querySelectorAll('input');
    var copy = paperEl.cloneNode(true);
    copy.querySelectorAll('input').forEach(function (inp, i) {
      var src = live[i];
      if (inp.type === 'radio' || inp.type === 'checkbox') {
        if (src.checked) inp.setAttribute('checked', ''); else inp.removeAttribute('checked');
      } else {
        inp.setAttribute('value', src.value);
      }
    });
    var liveSel = paperEl.querySelectorAll('select');
    copy.querySelectorAll('select').forEach(function (sel, i) {
      Array.prototype.forEach.call(sel.options, function (o) {
        if (o.value === liveSel[i].value) o.setAttribute('selected', ''); else o.removeAttribute('selected');
      });
    });
    markEmpty(copy);
    copy.querySelectorAll('.noprint').forEach(function (n) { n.remove(); });
    var css = Array.prototype.map.call(document.querySelectorAll('style'), function (s) { return s.textContent; }).join('\n');
    return '<!doctype html><html lang="' + state.lang + '"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1"><title>' + esc(fileBase()) + '</title>' +
      '<style>' + css + '</style></head><body><main class="app"><section class="step"><div class="paper-scroll">' +
      copy.outerHTML + '</div></section></main></body></html>';
  }

  /* Leere Datums- und Zeitfelder sollen im Ausdruck keine Platzhalter zeigen. */
  function markEmpty(root) {
    root.querySelectorAll('input[type=date], input[type=time]').forEach(function (inp) {
      if (inp.value === '') inp.setAttribute('data-empty', ''); else inp.removeAttribute('data-empty');
    });
  }
  window.addEventListener('beforeprint', function () { markEmpty(paperEl); syncPrintText(); });

  /* Montagebericht: Beschriftungen in der Exportsprache ausgeben (de, en oder bi), danach zurück zur Oberflächensprache. */
  function doExport(mode) {
    exportMode = mode;
    renderPaper();
    var prev = document.title;
    document.title = fileBase();
    var done = function () { exportMode = null; document.title = prev; renderPaper(); };
    if (dl) { saveViaCapability(fileBase() + '.html', printReadyHtml()); done(); return; }
    window.addEventListener('afterprint', done, { once: true });
    window.print();
  }

  $('#btn-pdf').addEventListener('click', function () {
    if (state.type === 'montage') { openExport(); return; }
    if (dl) { saveViaCapability(fileBase() + '.html', printReadyHtml()); return; }
    var prev = document.title;
    document.title = fileBase();
    var restore = function () { document.title = prev; };
    window.addEventListener('afterprint', restore, { once: true });
    window.print();
  });

  $('#btn-json').addEventListener('click', function () {
    var data = {
      version: 1, lang: state.lang, type: state.type,
      name: state.name, occasion: state.occasion, dest: state.dest, city: state.city, date: state.date, plate: state.plate,
      meal: state.meal, other: state.other, beleg: state.beleg, km: state.km, eigen: state.eigen,
      hosp: state.hosp, sig: state.sig,
      mrow: state.mrow, mo: state.mo, mofotos: state.mofotos, sigCust: state.sigCust
    };
    var json = JSON.stringify(data, null, 2);
    if (dl) { saveViaCapability(fileBase() + '.json', json); return; }
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = fileBase() + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });

  function str(v) { return typeof v === 'string' ? v.slice(0, 500) : ''; }
  function applyLoaded(d) {
    if (!d || typeof d !== 'object') throw new Error('invalid');
    if (LANG_NAMES[d.lang]) state.lang = d.lang;
    if (TYPES.indexOf(d.type) > -1) state.type = d.type;
    ['name', 'occasion', 'city', 'date', 'plate'].forEach(function (k) { state[k] = str(d[k]); });
    Object.keys(LIMITS).forEach(function (k) {
      if (!Array.isArray(d[k])) return;
      var rows = d[k].slice(0, LIMITS[k]).map(function (r) {
        var b = BLANK[k]();
        Object.keys(b).forEach(function (f) { b[f] = str(r && r[f]); });
        return b;
      });
      state[k] = rows.length ? rows : [BLANK[k]()];
    });
    ['spesen', 'beleg'].forEach(function (t) {
      var h = d.hosp && d.hosp[t];
      if (!h) return;
      ['b', 'l', 'd'].forEach(function (c) { state.hosp[t][c] = str(h[c]); });
      state.hosp[t].mode = h.mode === 'offset' || h.mode === 'tax' ? h.mode : '';
    });
    state.dest = destValid(str(d.dest)) ? str(d.dest) : '';
    state.sig = typeof d.sig === 'string' && SIG_RE.test(d.sig) ? d.sig : null;
    state.sigCust = typeof d.sigCust === 'string' && SIG_RE.test(d.sigCust) ? d.sigCust : null;
    var mo = d.mo && typeof d.mo === 'object' ? d.mo : {};
    ['vorgang', 'kunde', 'ort', 'schiff', 'zeitraum'].forEach(function (k) { state.mo[k] = str(mo[k]); });
    state.mo.arbeiten = typeof mo.arbeiten === 'string' ? mo.arbeiten.slice(0, 5000) : '';
    state.mo.bemerkung = typeof mo.bemerkung === 'string' ? mo.bemerkung.slice(0, 5000) : '';
    state.mo.liefer = mo.liefer === true;
    state.mo.montage = mo.montage === true;
    state.mofotos = (Array.isArray(d.mofotos) ? d.mofotos : []).slice(0, MAX_PHOTOS).filter(function (ph) {
      return ph && typeof ph.src === 'string' && PHOTO_RE.test(ph.src);
    }).map(function (ph) { return { src: ph.src, text: typeof ph.text === 'string' ? ph.text.slice(0, 1000) : '' }; });
  }
  $('#file-load').addEventListener('change', function (e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        applyLoaded(JSON.parse(String(reader.result)));
        renderAll();
        drawSigFromState();
        setStatus(T().ui.loadOk, true);
      } catch (err) {
        setStatus(T().ui.loadErr, false);
      }
    };
    reader.onerror = function () { setStatus(T().ui.loadErr, false); };
    reader.readAsText(file);
    e.target.value = '';
  });

  renderAll();

  if (window.claude && typeof window.claude.use === 'function') {
    window.claude.use('downloads').then(function (d) {
      if (!d) return;
      dl = d;
      $('#btn-pdf').setAttribute('data-i18n', 'btnPdfAlt');
      applyChrome();
      updateStatus();
    }).catch(function () {});
  }

  /* App-Modus: speichert nur die eigenen Programmdateien, damit die Seite auch ohne Netz startet. */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
