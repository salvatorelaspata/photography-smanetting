/**
 * Contenuti teorici approfonditi per ogni concetto (mostrati come prima sezione del dettaglio).
 * Italiano per la v1; in futuro spostabili nel catalogo i18n.
 */

export interface TheoryBlock {
  heading: string;
  paragraphs: string[];
  points?: string[];
  formula?: string;
}

export const THEORY: Record<string, TheoryBlock[]> = {
  shutter: [
    {
      heading: 'Che cos’è il tempo di otturazione',
      paragraphs: [
        'Il tempo di otturazione (o tempo di posa) è la durata per cui l’otturatore resta aperto e la luce raggiunge il sensore. Si misura in secondi e frazioni: 1/1000, 1/250, 1/30, 1″, 30″…',
        'Ogni “stop” raddoppia o dimezza il tempo, e quindi la quantità di luce raccolta: passare da 1/250 a 1/125 fa entrare il doppio della luce.',
      ],
    },
    {
      heading: 'Congelare o lasciar fluire il movimento',
      paragraphs: [
        'Un tempo breve “congela” l’azione: durante l’esposizione il soggetto si sposta di pochissimo. Un tempo lungo registra lo spostamento come scia (mosso).',
        'La quantità di mosso dipende da tre fattori: la velocità del soggetto, il tempo di posa e quanto il soggetto è ingrandito nel fotogramma (lunghezza focale e distanza).',
      ],
      points: [
        'Sport e azione: 1/1000 s o più per congelare.',
        'Persone che camminano: di solito basta 1/250 s.',
        'Acqua setosa o scie di luce: da 1/4 s a diversi secondi, su treppiede.',
      ],
    },
    {
      heading: 'La regola del tempo di sicurezza',
      paragraphs: [
        'A mano libera il micro-tremolio delle mani produce mosso. Una regola classica: non usare un tempo più lungo di 1/(focale equivalente). Con un 200mm, almeno 1/200 s.',
        'Gli stabilizzatori (ottici o sul sensore) fanno guadagnare 3–5 stop, permettendo tempi molto più lunghi a mano libera.',
      ],
    },
    {
      heading: 'Il mosso come scelta creativa',
      paragraphs: [
        'Il mosso non è sempre un errore. Il panning — seguire il soggetto con tempi medi (1/30–1/60 s) — lo mantiene nitido su uno sfondo strisciato, dando senso di velocità. Le lunghe esposizioni trasformano folle, nuvole e acqua in flussi morbidi.',
      ],
    },
  ],

  aperture: [
    {
      heading: 'Che cos’è l’apertura del diaframma',
      paragraphs: [
        'Il diaframma è un’iride di lamelle che regola il diametro del foro attraverso cui passa la luce. L’apertura si esprime con il numero f (f/1.4, f/2.8, f/8…), pari al rapporto tra la lunghezza focale e il diametro della pupilla d’ingresso.',
        'Numeri f piccoli significano aperture ampie (molta luce); numeri grandi, aperture chiuse (poca luce). La sequenza a stop pieni — 1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22 — raddoppia o dimezza l’area a ogni passo.',
      ],
    },
    {
      heading: 'La profondità di campo',
      paragraphs: [
        'La profondità di campo è l’intervallo di distanze che appare a fuoco. Dipende da: apertura (più ampia → più ridotta), distanza di messa a fuoco (più vicina → più ridotta), lunghezza focale e dimensione del sensore.',
        'La distanza iperfocale è la messa a fuoco che massimizza la zona nitida: mettendo a fuoco su di essa, tutto da metà di quella distanza fino all’infinito risulta accettabilmente nitido.',
      ],
      formula: 'H = f² / (N · c) + f   ·   profondità ↑ chiudendo N',
    },
    {
      heading: 'Bokeh: la qualità dello sfocato',
      paragraphs: [
        'Il bokeh è l’aspetto delle zone fuori fuoco. Le luci puntiformi sullo sfondo diventano dischi tanto più grandi quanto più ampia è l’apertura. Numero e forma delle lamelle del diaframma ne determinano la forma: più lamelle arrotondate danno cerchi più morbidi.',
      ],
    },
    {
      heading: 'Attenzione alla diffrazione',
      paragraphs: [
        'Chiudere molto il diaframma (f/16, f/22) estende la profondità di campo ma introduce la diffrazione, che ammorbidisce leggermente tutta l’immagine. Spesso la massima nitidezza si ottiene 2–3 stop sotto l’apertura massima: è lo “sweet spot” dell’obiettivo.',
      ],
    },
  ],

  iso: [
    {
      heading: 'Che cos’è l’ISO',
      paragraphs: [
        'L’ISO indica quanto il segnale del sensore viene amplificato. Alzarlo schiarisce l’immagine senza cambiare tempo o diaframma: ogni raddoppio (100 → 200 → 400) corrisponde a +1 stop di luminosità.',
        'L’amplificazione però non distingue il segnale utile dal rumore: più alzi l’ISO, più la grana diventa visibile.',
      ],
    },
    {
      heading: 'Da dove viene il rumore',
      paragraphs: [
        'Ci sono due componenti principali: il rumore di lettura (dell’elettronica) e il rumore “shot” (la natura statistica dei fotoni). In poca luce arrivano pochi fotoni, il rapporto segnale/rumore (SNR) crolla e la grana emerge — soprattutto nelle ombre, dove il segnale è più debole.',
      ],
      points: [
        'ISO basso (100–400): immagine pulita, massima gamma dinamica.',
        'ISO medio (800–3200): rumore gestibile, utile in interni.',
        'ISO alto (6400+): grana evidente, gamma dinamica ridotta.',
      ],
    },
    {
      heading: 'Gamma dinamica e strategia',
      paragraphs: [
        'Salendo di ISO si riduce la gamma dinamica, cioè la capacità di registrare insieme alte luci e ombre. Conviene usare l’ISO più basso compatibile con il tempo e il diaframma che lo scatto richiede.',
        'Molti sensori hanno uno o due “ISO nativi” a cui rendono al meglio (dual-gain) e alcuni sono quasi “ISO-invarianti”. In dubbio, esponi bene a destra senza bruciare le alte luci.',
      ],
    },
  ],

  focal: [
    {
      heading: 'Lunghezza focale e angolo di campo',
      paragraphs: [
        'La lunghezza focale (in mm) determina quanto inquadri: focali corte (16–35mm) hanno un angolo di campo ampio, focali lunghe (100–300mm) un angolo stretto che ingrandisce i soggetti lontani.',
        'L’angolo di campo dipende anche dalla dimensione del sensore: lo stesso 50mm su un sensore più piccolo inquadra meno (effetto “crop”). Il fattore di crop confronta le focali tra formati diversi: 50mm su APS-C ≈ 75mm equivalenti.',
      ],
    },
    {
      heading: 'Prospettiva e compressione: conta la distanza',
      paragraphs: [
        'Contrariamente all’intuizione, la lunghezza focale non cambia la prospettiva: a cambiarla è la distanza dal soggetto. Un teleobiettivo “comprime” lo sfondo perché di solito lo usi da lontano; un grandangolo “dilata” perché ti avvicini.',
        'La prova è il dolly zoom: se ti allontani e allunghi la focale per mantenere il soggetto della stessa dimensione, lo sfondo cambia scala pur restando il soggetto identico.',
      ],
    },
    {
      heading: 'Distorsione e ritratti',
      paragraphs: [
        'Usare un grandangolo molto da vicino esagera i tratti più vicini all’obiettivo (il naso, nei ritratti). Per i ritratti si preferiscono focali medio-lunghe (85–135mm) da una distanza maggiore, che rendono proporzioni più naturali.',
      ],
    },
  ],

  triangle: [
    {
      heading: 'Tre parametri, un’unica esposizione',
      paragraphs: [
        'Tempo, diaframma e ISO controllano insieme quanta luce forma l’immagine. Si misurano in “stop”: ogni stop raddoppia o dimezza la luce. La stessa esposizione si può ottenere con infinite combinazioni equivalenti.',
      ],
    },
    {
      heading: 'Reciprocità e compensazione',
      paragraphs: [
        'Se apri il diaframma di uno stop (più luce) puoi accorciare il tempo di uno stop (meno luce) per mantenere la stessa luminosità: cambia la resa — profondità di campo, mosso, rumore — ma non l’esposizione complessiva.',
        'L’EV (Exposure Value) riassume questa relazione: combinazioni con lo stesso EV danno la stessa luminosità a parità di luce nella scena.',
      ],
      formula: 'EV = log₂(N² / t)   ·   a ISO 100',
    },
    {
      heading: 'Quale parametro privilegiare',
      paragraphs: [
        'La scelta dipende dall’intento. Vuoi lo sfondo sfocato? Parti dal diaframma (priorità diaframmi). Devi congelare il movimento? Parti dal tempo (priorità tempi). L’ISO è l’ultima leva: alzalo solo quanto basta per ottenere il tempo e il diaframma desiderati.',
      ],
    },
    {
      heading: 'Leggere l’istogramma',
      paragraphs: [
        'L’istogramma mostra la distribuzione dei toni: a sinistra le ombre, a destra le alte luci. Una gobba schiacciata a destra con valori “tagliati” indica alte luci bruciate (irrecuperabili); a sinistra, ombre chiuse. L’esposimetro a 0 indica l’esposizione corretta secondo la media della scena.',
      ],
    },
  ],
};
