# Lethe-Vorlagen-Reise

Statische Seite „Lethe-Vorlagen-Reise“ der LETHE Exterior Doors GmbH mit den Vorlagen Spesenabrechnung, Abrechnung gegen Beleg, KM-Abrechnung, Eigenbeleg und Montagebericht. Sie läuft komplett im Browser, ohne Server und ohne Build-Schritt.

## Funktionen

1. Sprache wählen: Deutsch, Englisch oder Russisch.
2. Vorlage wählen: Montagebericht, Spesenabrechnung, Abrechnung gegen Beleg, Eigenbeleg oder KM-Abrechnung.
3. Formular ausfüllen. Summen, Stunden und Kilometergeld (0,30 € je km) werden automatisch berechnet.
4. Im Feld unterschreiben (Maus, Finger oder Stift).
5. Sichern ist erst nach Name, Projektname / Vorgang und Unterschrift möglich:
   - **PDF-Auszug sichern** öffnet den Druckdialog des Browsers im A4-Layout. Dort „Als PDF speichern“ wählen.
   - **Daten als Datei sichern** lädt eine `.json`-Datei herunter, die sich später wieder laden lässt.

### Montagebericht

Nach der Word-Vorlage „Stundennachweis / Service Report“: Vorgangs-Nr., Kunde, Einsatzort, Projekt Schiff, Zeitraum, Zeittabelle (Datum, Name, Arbeitszeit, Reisezeit, Mehrarbeit), Bemerkung, ausgeführte Arbeiten, Vertragstext, Unterschriften.

- Zwei Unterschriftsfelder: Monteur und Auftraggeber (Kunde). Pflicht sind der Kundenname und die Unterschrift des Monteurs, die Kundenunterschrift ist freiwillig.
- Der Zeitraum wird automatisch aus dem frühesten und spätesten Datum der Zeittabelle berechnet.
- Bemerkung und ausgeführte Arbeiten lassen sich formatieren: fett, kursiv, unterstrichen, durchgestrichen, Aufzählung, Nummerierung, Formatierung entfernen (Schaltflächen über dem Feld, Tastenkürzel Strg+B, Strg+I, Strg+U). Beim Einfügen wird nur reiner Text übernommen.
- Dateiname beim Export und beim Sichern: `Vorgang_Kunde_Projekt-Schiff_Datum`, zum Beispiel `V-2026_114_Meyer_MS-Nordstern_2026-11-11`. Leere Angaben entfallen.
- Fotos mit Bemerkung (Kamera oder Galerie, höchstens 30, werden verkleinert). Sie erscheinen im PDF auf einer eigenen Seite.
- Vor dem PDF-Export erscheint eine Prüfung von Rechtschreibung und Satzzeichen mit der Möglichkeit, einfache Fehler automatisch zu korrigieren. Sie läuft auf dem Gerät und findet typische Fehler (doppelte Wörter, Leerzeichen, Satzzeichen, Großschreibung am Satzanfang, häufige Tippfehler, fehlendes Komma vor „dass“ / „weil“). Eine vollständige Rechtschreibprüfung leistet zusätzlich der Browser in den Textfeldern.
- Vor dem Export fragt ein Dialog bei **allen** Vorlagen nach der Exportsprache: Deutsch oder Englisch (beim Montagebericht zusätzlich zweisprachig wie die Vorlage). Beschriftungen und Vertragstext wechseln die Sprache, eigene Eingaben werden nicht übersetzt.

### Aussehen und Export

- Tabellenköpfe und Titelbalken sind dunkelblau mit rotem Strich (Farben aus dem LETHE-Logo: `#143868` und `#b61f52`).
- Das LETHE-Logo steht allein oben rechts auf jeder Vorlage (im Formular und im PDF), ohne Firmenname und Anschrift. Die Anschrift steht nur in der Fußzeile. Es ist in `app.js` eingebettet (`LOGO`), braucht also keine weitere Datei.
- Jede Druckseite endet mit einer Fußzeile: Marschgehren 14 | 28779 Bremen / Germany | Telefon | Telefax | E-Mail | Internet (in `index.html`, Klasse `print-foot`).

Es wird nichts ins Netz gesendet. Eine Content-Security-Policy in `index.html` blockiert jede Netzwerkverbindung der Seite. Gespeichert wird nur über den Download in den Browser auf dem eigenen Gerät.

## Auf GitHub Pages veröffentlichen

1. Neues Repository auf GitHub anlegen, zum Beispiel `Lethe-Vorlagen-Reise`.
2. Alle Dateien aus diesem Ordner hochladen (`index.html`, `style.css`, `app.js`, `orte.js`, `sw.js`, `manifest.webmanifest`, `icons/`, `favicon.ico`, `README.md`, `GLOSSARY.md`, `docs/`).
3. Im Repository **Settings → Pages** öffnen, bei **Source** „Deploy from a branch“ wählen, Branch `main` und Ordner `/ (root)` einstellen, speichern.
4. Nach etwa einer Minute ist die Seite unter `https://<benutzername>.github.io/Lethe-Vorlagen-Reise/` erreichbar.

Bei einem privaten Repository ist GitHub Pages nur mit bestimmten GitHub-Tarifen verfügbar.

## Dateien

| Datei | Inhalt |
| --- | --- |
| `index.html` | Seitengerüst und Content-Security-Policy |
| `style.css` | Oberfläche und Druck-Layout |
| `orte.js` | Länder, Orte und Pauschbeträge (über 8 h / 24 h) für die Auswahl „Ort / Land“ (aus der Übersicht der Auslandspauschalen 2026) |
| `favicon.ico`, `icons/` | App-Symbol und Windows-Symbol aus dem LETHE-Logo |
| `app.js` | Texte in drei Sprachen, Formulare, Berechnung, Unterschrift, Sichern |
| `GLOSSARY.md` | Begriffe der Reisekostenabrechnung, abgeleitet aus den Vorlagen |
| `docs/regeln.md` | Regeln und offene Punkte |

## Anpassen

- Kilometersatz: Konstante `KM_RATE` am Anfang von `app.js`.
- Zeilenlimits je Vorlage: `LIMITS` in `app.js`.
- Texte und Übersetzungen: Objekt `I18N` in `app.js`.
