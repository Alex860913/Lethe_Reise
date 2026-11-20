# Regeln und offene Punkte

Begriffe stehen in `GLOSSARY.md`.

## Regeln

- Name, Projektname / Vorgang und Unterschrift sind vor dem Sichern Pflicht.
- Der Ort wird auf der Spesenabrechnung einmal oben unter Projektname / Vorgang aus der Liste in `orte.js` gewählt. Die Tabelle hat keine Spalte „Ort“ mehr. Die Auswahl ist kein Pflichtfeld.
- Unter der Auswahl stehen die Pauschbeträge des gewählten Landes bzw. Ortes (Auslandspauschalen ab 1. Januar 2026): „Abwesenheit über 14 h“ = Spalte „Abwesenheitsdauer über 8 Stunden“ der Liste, „Abwesenheit über 24 h“ = Spalte „Abwesenheitsdauer von mindestens 24 Stunden“. Für „Deutschland (Inland)“ werden 14 € (über 14 h) und 28 € (über 24 h) angezeigt; sie stehen in `app.js`, nicht in `orte.js`. Die Beträge sind nur eine Anzeige und werden nicht automatisch in die Tabelle übernommen.
- Spesenabrechnung, Tabelle 1: je Zeile Datum, Auswahl „über 14 Std.“ / „über 24 Std.“, Ankreuzfelder Frühstück (20 %), Mittagessen (40 %), Abendessen (40 %) und Betrag. Der Betrag wird berechnet: Satz des gewählten Ortes / Landes für „über 14“ bzw. „über 24“, davon werden die Prozentsätze der angekreuzten Mahlzeiten abgezogen (nicht unter 0). Ohne Ort / Land bleibt der Betrag leer.
- Der Bereich „Bei Bewirtung: Geldwerter Vorteil …“ (Verrechnung / Versteuerung) ist in Spesenabrechnung und Abrechnung gegen Beleg entfallen.
- Abrechnung gegen Beleg und Eigenbeleg: Währung € oder $ je Vorlage wählbar. Abrechnung gegen Beleg: je Zeile Art FA (Firmenausgaben) oder PA (Privatausgelegt) hinter dem Betrag; „Überweisung“ = Summe aller PA-Zeilen. In der Kürzel-Übersicht darunter stehen die Teilsummen FA und PA. Zeilen ohne Art zählen in keiner Summe.
- Verpflegungsmehraufwand wird nur innerhalb der ersten drei Monate auf einer neuen Werft erstattet (Hinweis der Vorlage).
- Kilometergeld = Summe der Kilometer × 0,30 €.
- Summe der Spesenabrechnung = Summe Verpflegungsmehraufwand + Summe sonstige pauschale Erstattungen (LA 9976, steuerfrei).
- Summe der Abrechnung gegen Beleg (Überweisung) = nur privat ausgelegte Beträge (PA).
- Summe des Eigenbelegs = Summe aller Ausgaben ohne Beleg.
- Mahlzeitenabzug: Frühstück 20 %, Mittag- und Abendessen je 40 % vom Betrag der Zeile (Vorgabe des Auftraggebers; steuerrechtlich wird üblicherweise vom Tagessatz für 24 Stunden gekürzt).
- Zeilenlimits je Vorlage: Verpflegung 20, sonstige Pauschalen 2, Auslagen 17, Fahrten 11, Eigenbeleg 12.
- Montagebericht: Pflicht sind Kunde und Unterschrift Monteur. Die Unterschrift des Auftraggebers ist freiwillig, der Export geht auch ohne sie. Name und Projektname gelten hier nicht, der Name steht je Zeile in der Tabelle.
- Montagebericht: Vor dem Export werden die Textfelder (Bemerkung, ausgeführte Arbeiten, Fotobemerkungen) auf Fehler geprüft. Der Export ist trotz Hinweisen möglich.
- Alle Vorlagen: Vor dem Export wählt man die Exportsprache (Deutsch oder Englisch, beim Montagebericht auch zweisprachig). Sie ändert nur Beschriftungen und Vertragstext. Eingaben werden nicht übersetzt.
- Montagebericht: Der Zeitraum ist ein Berechnungsfeld (frühestes bis spätestes Datum der Zeittabelle) und nicht von Hand änderbar.
- Montagebericht: Höchstens 30 Fotos, je längste Seite 1600 px.
- Jede Druckseite hat die Fußzeile mit Anschrift, Telefon, Telefax, E-Mail und Internet. Oben rechts steht auf jeder Vorlage nur das LETHE-Logo, ohne Firmenname und Anschrift.
- Farben: Tabellenköpfe, Titelbalken und Kennzeichenfeld in Dunkelblau (#143868) mit rotem Strich (#b61f52).
- Montagebericht: Bemerkung und ausgeführte Arbeiten werden als bereinigtes HTML gespeichert (erlaubt: fett, kursiv, unterstrichen, durchgestrichen, Listen, Zeilenumbrüche). Die Prüfung und die automatische Korrektur arbeiten auf dem Text und erhalten die Formatierung. Fotobemerkungen bleiben reiner Text.
- Montagebericht: Der Dateiname lautet Vorgang_Kunde_Projekt-Schiff_Datum (Datum = Datum neben der Unterschrift). Sonderzeichen werden zu Unterstrichen, leere Teile entfallen.
- Alle Eingaben bleiben auf dem Gerät. Es gibt keine Übertragung ins Netz.

## Offene Punkte

- Die feste Fußzeile wurde nur in Chromium (Chrome, Edge) geprüft. Safari und Firefox können sie anders umbrechen.

- Die Prüfung des Montageberichts ist regelbasiert und enthält keine vollständige Wörterliste. Sie ersetzt keine Korrektur durch eine Person.
- Eine echte Übersetzung der eigenen Eingaben ins Englische ist ohne Netzverbindung nicht möglich.
- Die Bemerkung steht im Formular als ein Feld unter der Tabelle, in der Word-Vorlage als Spalte neben den Zeilen.

- `orte.js` enthält Länder, Orte und die zwei Pauschbeträge je Eintrag (214 Zeilen, 166 Länder), von Hand aus den Seiten der PDF-Übersicht übertragen und mit der 2/3-Regel (über 8 h ≈ 2/3 von 24 h) sowie einer Sichtprüfung kontrolliert. Länder und Orte stehen in allen Sprachen auf Deutsch. Beträge der Übernachtung sind nicht enthalten.
- Die Bezeichnung „über 14 h“ folgt der Vorgabe des Auftraggebers; die Spalte der Liste gilt rechtlich ab mehr als 8 Stunden Abwesenheit.
- Die Inlandsbeträge 14 € und 28 € sind fest in `app.js` hinterlegt, weil die Liste sie nicht enthält.
- Alte JSON-Dateien: Uhrzeiten und handgeschriebene Beträge der Spesen-Tabelle 1 werden nicht übernommen, weil die Tabelle neu aufgebaut ist.
- Der Aufbau von `GLOSSARY.md` folgt der Konvention aus dem Commit `d80fa0f` im Repository `mattpocock/skills`. Die Dateien `SKILL.md` und `GLOSSARY-FORMAT.md` des Skills konnten nicht gelesen werden, das genaue Format ist daher nicht abgeglichen.

- Montagebericht, Zeittabelle: Datum, Name, Startzeit, Endzeit, Std., Ankreuzfelder Arbeitszeit / Reisezeit / Mehrarbeit. Std. = Endzeit minus Startzeit (über Mitternacht möglich) abzüglich Pausen: über 2:15 h = 15 min, über 6:30 h = weitere 15 min, über 9:00 h = weitere 15 min (Auslegung der Angabe „2,15 / 6,30 / 9,00“ als Stunden:Minuten). Anzeige als Dezimalstunden.
- Bewirtungsbeleg: Felder nach der Vorlage zu § 4 Abs. 5 Nr. 2 EStG (Tag, Ort, Anlass, bewirtete Personen, Rechnungsbetrag, Trinkgeld, Ort / Datum, Unterschrift des Gastgebers), Währung € / $ wählbar. Pflicht zum Sichern: Anlass und Unterschrift.
