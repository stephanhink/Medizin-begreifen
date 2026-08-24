// Zentrale Registrierung aller Themen-Module.
//
// Ein neues Thema wird angelegt, indem eine Datei nach dem Schema aus
// schema.js erstellt und hier in `alleThemen` eingetragen wird. Alles, was
// nicht hier steht, findet die App nicht — und die Prüfung sieht es auch
// nicht an.
//
// Die Reihenfolge im Array ist die Reihenfolge in der App (Themenlandkarte).
// Für „Medizin begreifen" steht der Bogen in notizen/kapitel-planung.md;
// die finale Reihenfolge hat der Betreiber mit der ersten Runde bestätigt.
//
// Stand: Runde 1 hat das erste Kapitel angelegt — „Die Anfänge der
// Heilkunde", Runde 2 die Ägypten-Station, die der Betreiber am 21.08.2026
// mit Kapitel 1 verschmelzen ließ. Runde 3 trägt „China und die TCM" nach,
// Runde 4 „Indien und der Ayurveda", Runde 5 „Hippokrates und Galen".
// Jede weitere Runde trägt ihr Kapitel hier unten an.
//
// CommonJS, damit dieselbe Datei mit blankem `node` prüfbar ist und von
// Metro/Babel in der App geladen werden kann (siehe schema.js).

const anfaengeDerHeilkunde = require('./anfaenge-der-heilkunde');
const chinaTcm = require('./china-tcm');
const indienAyurveda = require('./indien-ayurveda');
const hippokratesGalen = require('./hippokrates-galen');

/** Alle Themen in der Reihenfolge der Themenlandkarte. */
const alleThemen = [
  anfaengeDerHeilkunde,
  chinaTcm,
  indienAyurveda,
  hippokratesGalen,
];

/**
 * Sucht ein Thema anhand seiner id.
 *
 * @param {string} id ASCII-Slug, z. B. 'anfaenge-der-heilkunde'
 * @returns {object|undefined} das Thema oder undefined
 */
function themaNachId(id) {
  return alleThemen.find((thema) => thema.id === id);
}

/**
 * Sucht eine Perspektive innerhalb eines Themas.
 *
 * @param {string} themaId
 * @param {string} perspektiveId z. B. 'schulmedizin'
 * @returns {object|undefined} die Perspektive oder undefined
 */
function perspektiveNachId(themaId, perspektiveId) {
  const thema = themaNachId(themaId);
  if (!thema) return undefined;
  return thema.perspektiven.find((perspektive) => perspektive.id === perspektiveId);
}

/**
 * Kurzfassung aller Themen für Übersichtslisten — ohne die langen Texte.
 *
 * @returns {Array<{id: string, titel: string, epoche: string, frage: string,
 *                  anzahlPerspektiven: number}>}
 */
function themenUebersicht() {
  return alleThemen.map((thema) => ({
    id: thema.id,
    titel: thema.titel,
    epoche: thema.epoche,
    frage: thema.aufhaenger.frage,
    anzahlPerspektiven: thema.perspektiven.length,
  }));
}

module.exports = {
  alleThemen,
  themaNachId,
  perspektiveNachId,
  themenUebersicht,
};
