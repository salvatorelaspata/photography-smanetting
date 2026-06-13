/**
 * Contenuti teorici approfonditi per ogni concetto (mostrati come prima sezione del dettaglio).
 * Contenuti localizzati (it/en) accessibili tramite theoryFor(id, locale).
 * Ogni blocco può avere: paragrafi, elenco puntato, formula, una figura SVG (TheoryFigure) e un tip "Lo sapevi?".
 */

import type { Locale } from '../types';

export interface TheoryBlock {
  heading: string;
  paragraphs: string[];
  points?: string[];
  formula?: string;
  /** Curiosità / tip evidenziato in un riquadro "Lo sapevi?". */
  tip?: string;
  /** Id di una figura SVG didattica (vedi TheoryFigure) mostrata nel blocco. */
  figure?: string;
}

export const THEORY: Record<string, TheoryBlock[]> = {
  shutter: [
    {
      heading: 'Che cos’è il tempo di otturazione',
      paragraphs: [
        'Il tempo di otturazione (o tempo di posa) è la durata per cui l’otturatore resta aperto e la luce raggiunge il sensore. Si misura in secondi e frazioni: 1/1000, 1/250, 1/30, 1″, 30″…',
        'Ogni “stop” raddoppia o dimezza il tempo, e quindi la quantità di luce raccolta: da 1/250 a 1/125 entra il doppio della luce. Nel sistema APEX il valore di tempo è Tv = log₂(1/T), così 1/250 s corrisponde a Tv ≈ 8.',
      ],
      figure: 'motion-speeds',
    },
    {
      heading: 'Congelare o lasciar fluire il movimento',
      paragraphs: [
        'Il “mosso” è lo spostamento dell’immagine del soggetto sul sensore durante la posa: un tempo breve congela perché il soggetto si sposta di pochissimi pixel mentre l’otturatore è aperto.',
        'Quanto mosso ottieni dipende da tre fattori: la velocità del soggetto, il tempo di posa e quanto il soggetto è ingrandito nel fotogramma (focale e distanza).',
      ],
      points: [
        'Sport e azione: 1/1000 s o più per congelare.',
        'Persone che camminano: di solito basta 1/250 s.',
        'Acqua setosa o scie di luce: da 1/4 s a diversi secondi, su treppiede.',
      ],
      tip: 'Al cinema vale la “regola dei 180°”: l’angolo di otturazione di 180° espone metà del tempo di ogni fotogramma, quindi a 24 fps si usa 1/48 s (arrotondato a 1/50). È il mosso che il pubblico percepisce come “cinematografico”; Salvate il soldato Ryan usò di proposito ~45° (≈1/192 s) per un effetto nervoso e tagliente.',
    },
    {
      heading: 'Otturatore a tendina e tempo di sincro',
      paragraphs: [
        'La maggior parte delle reflex/mirrorless usa un otturatore a tendina (focal-plane) con due tendine. Oltre il tempo di sincro flash la seconda tendina inizia a chiudersi prima che la prima sia del tutto aperta: solo una fessura mobile espone il sensore.',
        'Il tempo di sincro (≈1/200 s Canon, 1/250 s Nikon) è il più rapido in cui il sensore è scoperto tutto insieme. Per andare più veloci col flash serve l’High-Speed Sync, che fa pulsare il flash come una luce continua.',
      ],
      tip: 'L’otturatore elettronico (silenzioso) legge il sensore riga per riga: sui soggetti veloci produce la distorsione “rolling shutter” e, sotto luci a LED/fluorescenti, fasce di banding.',
    },
    {
      heading: 'La regola del tempo di sicurezza',
      paragraphs: [
        'A mano libera il micro-tremolio produce mosso. Regola classica: non usare un tempo più lungo di 1/(focale equivalente). Con un 200 mm, almeno 1/200 s.',
        'Gli stabilizzatori (ottici o sul sensore) fanno guadagnare 3–5 stop, permettendo tempi molto più lunghi a mano libera — ma non congelano un soggetto in movimento.',
      ],
      tip: 'Mito da sfatare: il tempo di otturazione non influisce sulla profondità di campo. Quella dipende solo da diaframma, focale e distanza; il tempo regola esposizione e mosso.',
    },
  ],

  aperture: [
    {
      heading: 'Diaframma e numero f',
      paragraphs: [
        'Il diaframma è l’apertura regolabile dentro l’obiettivo. Il numero f è il rapporto tra focale e diametro della pupilla d’ingresso: N = focale ÷ diametro. Per questo f/2.8 su un 50 mm e su un 200 mm hanno pupille di diametro molto diverso.',
        'La luce raccolta è proporzionale a 1/N²: la serie a stop pieni (1, 1.4, 2, 2.8, 4, 5.6, 8…) procede per √2 perché ogni passo dimezza o raddoppia l’area della pupilla. In APEX l’apertura vale Av = 2·log₂(N).',
      ],
      figure: 'aperture-fnumber',
    },
    {
      heading: 'Profondità di campo',
      paragraphs: [
        'La profondità di campo (PdC) è la fascia di distanze che appare nitida. Si assottiglia aprendo il diaframma (N piccolo), allungando la focale e avvicinando il soggetto.',
        'Aprire a f/1.4 isola il soggetto su uno sfondo cremoso; chiudere a f/11 tiene a fuoco dal primo piano allo sfondo, utile in paesaggio.',
      ],
      tip: 'Al cinema si usano i T-stop invece degli f-stop: misurano la luce realmente trasmessa attraverso tutte le lenti e i trattamenti, così ottiche diverse mantengono la stessa esposizione. Un obiettivo f/1.8 può trasmettere solo T/2.',
    },
    {
      heading: 'Il bokeh e la forma delle luci',
      paragraphs: [
        'Il bokeh è l’aspetto delle zone sfocate. La quantità di sfocato dipende da apertura, focale e distanza; la forma delle luci fuori fuoco dipende invece dalle lamelle del diaframma.',
        'Poche lamelle dritte danno luci poligonali; circa 9 lamelle arrotondate avvicinano il cerchio. Ai bordi del fotogramma, a tutta apertura, le luci diventano a “occhio di gatto” per la vignettatura ottica.',
      ],
      tip: 'Mito da sfatare: più lamelle non significano “più bokeh”. Le lamelle definiscono la forma delle luci, non la quantità di sfocato, che dipende da diametro reale dell’apertura, focale e distanza.',
    },
  ],

  iso: [
    {
      heading: 'Che cos’è l’ISO',
      paragraphs: [
        'L’ISO regola l’amplificazione applicata al segnale dopo la cattura dei fotoni: non cambia la “sensibilità” fisica del sensore, ma quanto il segnale registrato viene mappato in luminosità d’uscita.',
        'Alzare l’ISO di uno stop schiarisce di uno stop, permettendo tempi più brevi o diaframmi più chiusi quando la luce è poca — al prezzo di un’immagine più “rumorosa”.',
      ],
      figure: 'iso-noise',
    },
    {
      heading: 'Da dove viene davvero il rumore',
      paragraphs: [
        'Il rumore più evidente è il rumore di fotone (shot noise): l’arrivo casuale dei fotoni. Il suo peso relativo è ≈ √(segnale), quindi il rapporto segnale/rumore migliora con più luce, non con un ISO più basso di per sé.',
        'Il colpevole reale è la poca luce (sotto-esposizione, scene buie). Il rumore di lettura, dell’elettronica, è la parte su cui l’amplificazione ISO può incidere.',
      ],
      tip: 'Molti sensori sono quasi “ISO-invarianti”: scattare in RAW sotto-esposto e schiarire in post dà un risultato simile ad alzare l’ISO. Conta più esporre bene che il numero ISO.',
    },
    {
      heading: 'ISO base, dual-gain ed esteso',
      paragraphs: [
        'L’ISO base (di solito 100, a volte 64 o 200) offre la massima gamma dinamica. Gli ISO “estesi” (L50, H51200) sono spinte software, non vero guadagno hardware, e tagliano alte luci o aggiungono rumore.',
        'Molti sensori moderni hanno due guadagni di conversione (dual-gain): superata la soglia (spesso ISO 500–800) il rumore di lettura cala di colpo.',
      ],
      tip: 'Curiosità contro-intuitiva: su una fotocamera dual-gain, ISO 640 può risultare più pulito di ISO 400, perché entra in gioco il secondo guadagno a basso rumore.',
    },
  ],

  focal: [
    {
      heading: 'Focale e angolo di campo',
      paragraphs: [
        'La lunghezza focale (in mm) determina l’angolo di campo: corta = grandangolo (campo ampio), lunga = teleobiettivo (campo stretto, soggetti ingranditi).',
        'L’angolo è pura geometria: AoV = 2·arctan(d / 2f), dove d è la dimensione del sensore e f la focale. Il legame non è lineare: dimezzare la focale al grandangolo più che raddoppia l’angolo, ma al tele cambia pochissimo.',
      ],
      formula: 'AoV = 2 · arctan(d / 2f)',
      figure: 'angle-of-view',
    },
    {
      heading: 'La “compressione” è distanza, non focale',
      paragraphs: [
        'La cosiddetta compressione prospettica dipende dalla distanza di ripresa, non dalla focale. Le dimensioni relative di primo piano e sfondo dipendono solo dal rapporto tra le distanze camera-soggetto e camera-sfondo.',
        'Un tele non “schiaccia” la scena: ti invita semplicemente ad allontanarti, ed è l’allontanarti che comprime. Dallo stesso punto, una focale lunga ingrandisce una prospettiva già fissata.',
      ],
      figure: 'compression',
      tip: 'Prova del nove: puoi rifare lo stesso scatto “tele compresso” con un grandangolo dallo stesso punto e poi ritagliare. La prospettiva è identica — la cambia solo spostarti.',
    },
    {
      heading: 'La focale “normale”',
      paragraphs: [
        'Una focale è “normale” quando è circa pari alla diagonale del sensore (~43 mm su full-frame): più corta è grandangolo, più lunga è tele. Il 50 mm è diventato lo standard perché vicino a questa resa “naturale”.',
        'La sensazione “come l’occhio” del 50 mm è una convenzione percettiva, non un’uguaglianza ottica: il nostro campo visivo è molto più ampio, ma l’attenzione centrale è stretta.',
      ],
    },
  ],

  triangle: [
    {
      heading: 'Una sola equazione',
      paragraphs: [
        'Esposizione, diaframma, tempo e ISO non sono tre manopole indipendenti ma un’unica relazione. In APEX: Av + Tv = Bv + Sv (apertura + tempo = luce della scena + sensibilità).',
        'Ogni parametro è quantizzato in stop (×2 di luce), quindi i tre sono interscambiabili per l’esposizione: f/2.8 a 1/250 ISO 100 = f/4 a 1/125 ISO 100 = f/4 a 1/250 ISO 200.',
      ],
      formula: 'Av + Tv = Bv + Sv',
      figure: 'exposure-triangle',
    },
    {
      heading: 'Esposizioni equivalenti, immagini diverse',
      paragraphs: [
        'Le “esposizioni equivalenti” danno la stessa luminosità ma immagini diverse: cambiano profondità di campo, mosso e rumore. Sono i tre effetti collaterali che scegli quando bilanci il triangolo.',
        'Il triangolo è un vincolo, non tre libertà: fissata l’esposizione, muovere un parametro obbliga a compensare con un altro.',
      ],
      tip: 'Regola Sunny-16: in pieno sole a f/16 il tempo corretto è ≈ 1/ISO (ISO 100 → ~1/100 s). Una stima dell’esposizione senza esposimetro, perché la luce solare vale circa EV 15.',
    },
    {
      heading: 'ISO: davvero parte dell’esposizione?',
      paragraphs: [
        'A rigore solo diaframma e tempo (più la luce della scena) determinano l’esposizione, cioè la luce sul sensore. L’ISO è una schiaritura successiva alla cattura.',
        'È una semplificazione comoda metterlo nel “triangolo”, ma fisicamente è un passo separato: per questo, in molte situazioni, conviene tenerlo basso e badare prima a tempo e diaframma.',
      ],
    },
  ],

  composition: [
    {
      heading: 'Comporre dentro il fotogramma',
      paragraphs: [
        'La composizione è il modo in cui disponi gli elementi nel fotogramma per guidare lo sguardo. Il bordo dell’immagine è già una scelta: cosa includere e cosa lasciare fuori.',
        'L’occhio non legge i pixel a caso: i principi della Gestalt descrivono come raggruppa ciò che vede — per vicinanza, somiglianza, continuità e chiusura — e come separa la figura dallo sfondo. Comporre vuol dire sfruttare queste tendenze.',
      ],
    },
    {
      heading: 'La regola dei terzi',
      paragraphs: [
        'Immagina due linee verticali e due orizzontali che dividono il fotogramma in nove parti. Mettere il soggetto su una linea o, meglio, su un’intersezione (un “punto forte”), e l’orizzonte su un terzo invece che a metà, rende l’immagine più dinamica del centro esatto.',
        'Curiosità storica: il termine “regola dei terzi” fu coniato dal pittore John Thomas Smith nel 1797 in Remarks on Rural Scenery, citando Reynolds. In origine parlava di masse in proporzione 1/3–2/3 (terra e cielo), non della griglia simmetrica che insegniamo oggi.',
      ],
      figure: 'rule-of-thirds',
      tip: 'È una linea guida, non una legge. Mito da sfatare: l’idea che studi di eye-tracking “dimostrino” che l’occhio cada sulle intersezioni dei terzi è infondata — uno studio peer-reviewed (Amirshahi et al., 2014) non ha trovato l’effetto. La maggior parte delle fotocamere offre comunque la griglia (e spesso anche la phi grid) nel mirino.',
    },
    {
      heading: 'Sezione aurea e spirale',
      paragraphs: [
        'La “phi grid” usa il numero aureo φ ≈ 1,618: divide il fotogramma a 0,382 e 0,618, linee un po’ più vicine al centro rispetto ai terzi (0,333 e 0,667). La spirale aurea è una spirale logaritmica che cresce di φ a ogni quarto di giro: il soggetto va nel suo “occhio”.',
        'Attenzione: terzi e sezione aurea sono costruzioni diverse (0,333 vs 0,382) che danno risultati simili — non l’una la “versione semplificata” dell’altra.',
      ],
      figure: 'golden-ratio',
      tip: 'Mito da sfatare: la presunta superiorità estetica della sezione aurea è in gran parte una leggenda retrodatata. Il matematico Keith Devlin la definisce “il Mozart Effect dell’Ottocento”, nata dalle teorie non scientifiche di Adolf Zeising; persino la “spirale aurea” del nautilus è falsa (le misure danno ~1,33, non 1,618). φ è reale in natura (fillotassi), ma la preferenza estetica universale no.',
    },
    {
      heading: 'Linee guida, equilibrio e spazio',
      paragraphs: [
        'Le linee guida (strade, fiumi, staccionate) portano lo sguardo dentro la scena e verso il soggetto; le diagonali danno energia, le orizzontali calma, e il “dutch angle” (orizzonte inclinato) crea tensione. La simmetria funziona quando è il punto: riflessi, architetture, ritratti formali. Inquadrare nell’inquadratura (archi, finestre, rami) aggiunge profondità.',
        'Il peso visivo — dato da dimensione, contrasto, colore, nitidezza e presenza di volti — va equilibrato nel fotogramma. Lo spazio negativo isola il soggetto e dà respiro; l’headroom è lo spazio sopra la testa, il lead room (o spazio di lettura) è quello davanti a chi guarda o si muove.',
      ],
      points: [
        'Un soggetto in movimento vuole più spazio davanti che dietro: tagliarlo sul bordo “soffoca” il movimento.',
        'Orizzonte su un terzo: basso per dare risalto al cielo, alto per il primo piano.',
      ],
      figure: 'leading-lines',
      tip: 'Mito da sfatare: “il soggetto non va mai al centro”. Falso — il centro è potentissimo per simmetria, riflessi e ritratti formali. Le regole si imparano proprio per poterle infrangere con criterio.',
    },
  ],

  histogram: [
    {
      heading: 'Leggere la luce dal grafico',
      paragraphs: [
        'L’istogramma mostra quanti pixel cadono in ogni livello tonale: a sinistra le ombre, a destra le alte luci, in mezzo i mezzitoni. L’altezza è il conteggio dei pixel.',
        'È codificato in gamma, perciò i mezzitoni occupano una porzione di larghezza maggiore rispetto ai dati lineari del sensore. Si calcola per canale (R, G, B) più la luminanza.',
      ],
      figure: 'histogram-zones',
    },
    {
      heading: 'Clipping: dettaglio perso',
      paragraphs: [
        'Quando un canale si “impila” contro un bordo, c’è clipping: alte luci bruciate (bianco senza dettaglio) a destra, ombre chiuse (nero) a sinistra. Le alte luci bruciate sono irrecuperabili.',
        'Non esiste un istogramma “giusto” universale: una scena scura deve stare a sinistra, una in alta chiave a destra. La forma corretta è quella della scena reale.',
      ],
      tip: 'L’istogramma sul dorso della fotocamera è calcolato dall’anteprima JPEG (con bilanciamento e profilo applicati), non dal RAW. Per questo segnala il clipping circa 0,5–1 stop prima che il RAW si saturi davvero.',
    },
    {
      heading: 'Esporre a destra (ETTR)',
      paragraphs: [
        'Esporre a destra significa spingere l’istogramma verso destra senza clipping, per massimizzare il segnale: il sensore è lineare e lo stop più luminoso contiene metà di tutti i livelli registrati.',
        'Più fotoni nelle alte luci = ombre più pulite quando si riabbassa l’esposizione in post. È la strategia per il minimo rumore.',
      ],
    },
  ],

  whiteBalance: [
    {
      heading: 'Temperatura colore in Kelvin',
      paragraphs: [
        'Il bilanciamento del bianco neutralizza la dominante della luce. La temperatura colore (in Kelvin) descrive la tinta della sorgente: candela ~1900 K, tungsteno ~3200 K, luce diurna/flash ~5500 K, cielo coperto ~6500 K, ombra ~7500 K, cielo azzurro fino a ~10000 K.',
        'L’occhio si adatta e vede neutri quasi tutti i bianchi; il sensore no. Per questo esiste il bilanciamento: è una coppia di guadagni sui canali rosso e blu rispetto al verde, applicata in sviluppo.',
      ],
      figure: 'kelvin-scale',
    },
    {
      heading: 'Tinta e luci non-Planckiane',
      paragraphs: [
        'Oltre all’asse caldo-freddo c’è l’asse perpendicolare verde↔magenta (tint), che corregge sorgenti non a corpo nero: fluorescenti e LED virano spesso al verde, alcune lampade al magenta.',
        'Per un bianco fedele, niente batte un cartoncino grigio fotografato nella stessa luce: dà un bilanciamento personalizzato più affidabile dei preset.',
      ],
      tip: 'Mito da sfatare: “Kelvin più alto = foto più fredda”. È il contrario sul cursore: una sorgente ad alti Kelvin è più blu, ma impostare un valore Kelvin più alto scalda l’immagine, perché dici alla camera che la luce è più blu di quanto sia.',
    },
    {
      heading: 'WB e RAW',
      paragraphs: [
        'In RAW il bilanciamento è una scelta di post: il valore “come scattato” è solo un metadato e non altera i dati del sensore, quindi lo puoi cambiare senza perdite. In JPEG, invece, viene cotto nell’immagine.',
        'Attenzione all’auto-WB: può “correggere” il calore di un tramonto che invece volevi mantenere.',
      ],
    },
  ],

  panning: [
    {
      heading: 'Seguire il movimento',
      paragraphs: [
        'Il panning insegue un soggetto in movimento con una posa volutamente lenta: il soggetto resta nitido mentre lo sfondo si striscia, comunicando velocità.',
        'La tecnica: rotazione fluida dal bacino, accompagnamento dopo lo scatto, autofocus continuo (AF-C) e velocità di rotazione pari a quella angolare del soggetto.',
      ],
      figure: 'panning-arc',
    },
    {
      heading: 'Che tempo usare',
      paragraphs: [
        'Il tempo scala in modo inverso alla velocità del soggetto: persone che camminano ~1/15–1/30 s, ciclisti ~1/30–1/60 s, auto ~1/60–1/125 s, motorsport veloce 1/125–1/250 s.',
        'Più lento è il tempo, più sfondo strisciato ottieni — ma più scatti mancati. La modalità a raffica alza molto la percentuale di “keeper”.',
      ],
      points: [
        'Focali più corte perdonano di più: lo stesso errore angolare copre meno pixel.',
        'Un leggero mosso su ruote/arti spesso è più dinamico di un soggetto perfettamente fermo.',
      ],
      tip: 'Mito da sfatare: non serve spegnere lo stabilizzatore. Molte ottiche rilevano il panning o offrono una “Modalità 2” che disattiva solo l’asse orizzontale: lasciarlo attivo di solito aiuta.',
    },
  ],

  crop: [
    {
      heading: 'Dimensione del sensore e fattore di crop',
      paragraphs: [
        'Il fattore di crop è il rapporto tra la diagonale del full-frame (43,3 mm) e quella del sensore: APS-C ≈ 1,5× (Nikon/Sony) o 1,6× (Canon), Micro 4/3 = 2,0×.',
        'Un sensore più piccolo registra solo la porzione centrale dell’immagine proiettata dall’obiettivo: stessa focale, inquadratura più stretta.',
      ],
      figure: 'crop-frames',
    },
    {
      heading: 'Focale equivalente ed equivalenza',
      paragraphs: [
        'La focale equivalente (solo per l’inquadratura) = focale reale × fattore di crop: un 35 mm su APS-C inquadra come un ~52 mm su full-frame. La focale fisica e l’ottica non cambiano.',
        'Per la stessa profondità di campo a parità di inquadratura, moltiplica anche il numero f per il fattore di crop: f/2.8 su m4/3 ≈ f/5.6 su full-frame, sia come campo sia come sfocato.',
      ],
      formula: 'crop = 43,3 mm ÷ diagonale sensore',
      tip: 'Mito da sfatare: il crop non cambia la focale dell’obiettivo. Un 50 mm resta un 50 mm; il fattore di crop descrive solo il campo più stretto catturato dal sensore più piccolo.',
    },
    {
      heading: 'Perché il full-frame “raccoglie più luce”',
      paragraphs: [
        'A pari esposizione e inquadratura, il sensore più grande raccoglie più luce totale: per questo, a parità di condizioni, mostra meno rumore. Per eguagliare davvero un formato più piccolo bisognerebbe aprire il diaframma del fattore di crop.',
        'Anche iperfocale e soglia di diffrazione si spostano col formato, perché dipendono dal circolo di confusione che scala con la dimensione del sensore.',
      ],
    },
  ],

  diffraction: [
    {
      heading: 'Il disco di Airy',
      paragraphs: [
        'Chiudendo molto il diaframma, la diffrazione allarga ogni punto in un “disco di Airy”. Il suo diametro è ≈ 2,44·λ·N (λ ≈ 0,55 µm per il verde, N numero f): a f/16 ~21 µm, a f/4 solo ~5,4 µm.',
        'Il disco dipende solo da numero f e lunghezza d’onda, non dal sensore; ma diventa visibile quando supera 2–3 volte la dimensione del pixel.',
      ],
      formula: 'Ø Airy ≈ 2,44 · λ · N',
      figure: 'diffraction-curve',
    },
    {
      heading: 'Lo sweet spot dell’obiettivo',
      paragraphs: [
        'A tutta apertura dominano le aberrazioni; chiudendo, calano ma cresce la diffrazione. La nitidezza massima è dove le due curve si incrociano: di solito 2–3 stop sotto la massima apertura (spesso f/5.6–f/8 su full-frame).',
        'Chiudere oltre la soglia di diffrazione abbassa la nitidezza di picco ma aumenta la profondità di campo: è un compromesso, non un errore.',
      ],
      points: [
        'Soglia tipica: compatte ~f/4–5.6, m4/3 ~f/5.6–8, APS-C ~f/8–11, full-frame ~f/11–16.',
      ],
      tip: 'Per questo gli smartphone quasi non chiudono il diaframma: con pixel minuscoli diventerebbero subito “soft” per diffrazione, perciò regolano l’esposizione con tempo e ISO.',
    },
  ],

  portrait: [
    {
      heading: 'La distanza che deforma',
      paragraphs: [
        'La “distorsione” dei volti nei ritratti è prospettica e dipende dalla distanza camera-viso, non dall’obiettivo. Da vicino, il rapporto naso-camera vs orecchie-camera diventa grande: naso ingrandito, orecchie rimpicciolite.',
        'Un 85 mm e un 50 mm scattati dalla stessa distanza rendono la stessa forma del viso: l’85 mm inquadra solo più stretto.',
      ],
      figure: 'portrait-distance',
    },
    {
      heading: 'Le focali classiche del ritratto',
      paragraphs: [
        'Su full-frame le focali da ritratto sono ~85–135 mm. L’85 mm è lo standard “mezzo busto” perché impone una distanza di lavoro confortevole di ~2–3 m, che dà proporzioni lusinghiere.',
        'Su APS-C dividi per il fattore di crop: un ~56 mm replica campo e distanza di un 85 mm full-frame.',
      ],
      tip: 'Mito da sfatare: l’85 mm non è lusinghiero perché “comprime” il viso. La resa gradevole nasce dalla maggiore distanza di lavoro che impone; la focale di per sé non rimodella i tratti. Un ritratto grandangolare “naso grande” si corregge facendo un passo indietro.',
    },
  ],

  hyperfocal: [
    {
      heading: 'L’iperfocale',
      paragraphs: [
        'La distanza iperfocale H è la messa a fuoco che rende nitido da H/2 fino all’infinito. È la mossa classica per massimizzare la nitidezza in paesaggio.',
        'Formula: H = f²/(N·c) + f, dove f è la focale, N il numero f e c il circolo di confusione. Il termine +f è quasi sempre trascurabile, quindi H ≈ f²/(N·c).',
      ],
      formula: 'H = f² / (N · c) + f',
      figure: 'hyperfocal',
    },
    {
      heading: 'Il circolo di confusione',
      paragraphs: [
        'Il circolo di confusione c è la massima sfocatura ancora percepita come punto: ~0,03 mm su full-frame, ~0,02 mm su APS-C. Deriva da una stampa 20×25 cm vista a ~25 cm con vista 10/10.',
        'Poiché c scala col formato, la stessa scena richiede impostazioni iperfocali diverse su full-frame e su APS-C. La PdC è asimmetrica: a distanze medie circa ⅓ davanti e ⅔ dietro il punto a fuoco.',
      ],
      tip: 'Mito da sfatare: mettere a fuoco sull’iperfocale non rende l’infinito “perfettamente” nitido — solo “accettabilmente” nitido. Il piano più nitido è a H, e i dettagli lontani sono leggermente più morbidi.',
    },
    {
      heading: 'Zone focusing',
      paragraphs: [
        'Lo zone focusing preimposta fuoco e diaframma perché un intervallo noto di distanze cada dentro la PdC, senza rimettere a fuoco: ideale per street e azione. Un 28 mm a f/8 tiene nitido da ~1,5 m a infinito.',
        'Attenzione al “fuoco e ricomponi”: ruotare la camera dopo aver bloccato il fuoco sposta il piano di messa a fuoco, soprattutto a tutta apertura e a corta distanza. Meglio spostare il punto AF.',
      ],
    },
  ],

  metering: [
    {
      heading: 'Il grigio 18% e i tre modi',
      paragraphs: [
        'L’esposimetro riflesso presume che la scena mediamente rifletta come un grigio al 18%: per questo tende a scurire le scene molto chiare (neve) e a schiarire quelle scure. È la ragione per cui esiste la compensazione.',
        'Spot misura un piccolo cerchio centrale (~1–5% del fotogramma); media pesata pesa tutto il fotogramma con bias al centro; matrix/valutativa divide l’inquadratura in zone.',
      ],
      figure: 'metering-zones',
    },
    {
      heading: 'La matrix “intelligente”',
      paragraphs: [
        'La misurazione matrix confronta il pattern di luminosità delle zone con un database interno di decine di migliaia di scene di riferimento (Nikon cita ~30.000) per classificare la situazione (controluce, neve, tramonto) e correggere.',
        'Le matrix moderne integrano anche distanza di messa a fuoco, focale e riconoscimento dei volti, pesando l’esposizione verso il soggetto a fuoco.',
      ],
      tip: 'Mito da sfatare: lo spot non sempre misura sul punto AF. Su molte fotocamere è fisso al centro; solo alcuni corpi lo collegano al punto attivo — controlla il manuale.',
    },
    {
      heading: 'La compensazione dell’esposizione',
      paragraphs: [
        'La compensazione sposta il “bersaglio” dell’esposimetro a passi di ⅓ di stop (spesso ±5 EV): +EV schiarisce (“questo deve essere più chiaro del grigio”), −EV scurisce.',
        'Per soggetti molto contrastati, misurare in spot un mezzotono noto (o la pelle, poi +1 EV per incarnati chiari) è più affidabile che fidarsi della matrix.',
      ],
    },
  ],

  stabilization: [
    {
      heading: 'Contro il tremolio, non il soggetto',
      paragraphs: [
        'Lo stabilizzatore corregge il micro-tremolio della fotocamera. Lo stabilizzatore ottico (IS/VR/OSS) sposta un gruppo di lenti; quello sul sensore (IBIS) muove il sensore su fino a 5 assi: beccheggio, imbardata, rollio, X, Y.',
        'Corregge solo il movimento della camera: non congela un soggetto in movimento, per cui serve comunque un tempo rapido.',
      ],
      figure: 'stabilization-axes',
    },
    {
      heading: 'La regola del reciproco',
      paragraphs: [
        'Il tempo minimo a mano libera è ≈ 1/(focale); su un corpo crop moltiplica prima la focale per il fattore di crop (50 mm × 1,5 → 1/75 s). La regola contrasta il tremolio angolare, che si amplifica con la focale.',
        'La stabilizzazione si misura in stop di guadagno (spesso 5–8 secondo lo standard CIPA), che permettono di scendere parecchi stop sotto il tempo di sicurezza.',
      ],
      formula: 'tempo sicuro ≈ 1 / (focale × crop)',
      tip: 'IS dell’obiettivo e IBIS possono cooperare (“Sync IS”/“Dual IS”): la lente gestisce beccheggio e imbardata, il corpo il resto, per i rating di stop più alti. I valori CIPA sono da laboratorio: nella realtà conta la tecnica.',
    },
  ],

  flash: [
    {
      heading: 'Il tempo di sincronizzazione',
      paragraphs: [
        'L’otturatore a tendina espone tutto il sensore insieme solo fino al tempo di sincro (~1/200 s Canon, 1/250 s Nikon). Più veloce, le due tendine formano una fessura mobile: il flash, lampo brevissimo, illumina solo la parte scoperta e lascia una banda nera.',
        'Il sincro è semplicemente il tempo più rapido a cui il sensore è del tutto scoperto in un istante.',
      ],
      figure: 'flash-sync',
    },
    {
      heading: 'HSS e tendina',
      paragraphs: [
        'L’High-Speed Sync (HSS/FP) supera il limite facendo pulsare il flash migliaia di volte, così si comporta come una luce continua che “scorre” con la fessura — al costo di 1,5–2 stop di potenza.',
        'La sincronizzazione sulla prima tendina lampeggia all’apertura; sulla seconda tendina (rear-curtain) lampeggia poco prima della chiusura, così le scie di un soggetto in movimento cadono dietro di lui, in modo naturale.',
      ],
      tip: 'Al buio è la durata del lampo (spesso 1/1000–1/20000 s a bassa potenza), non il tempo di otturazione, a congelare il movimento. Il numero guida (NG = diaframma × distanza a ISO 100) codifica il calo con la distanza — ma cambia se è in metri o in piedi.',
    },
    {
      heading: 'Ambiente vs flash',
      paragraphs: [
        'Mito da sfatare: un tempo più veloce non fa entrare “più flash”. Entro il sincro, il tempo controlla solo l’esposizione della luce ambiente; il flash è regolato da diaframma, ISO, potenza e distanza.',
        'Per dosare flash e ambiente: regola il tempo per lo sfondo (entro il sincro) e diaframma/ISO/potenza per il soggetto illuminato dal lampo.',
      ],
    },
  ],

  bracketing: [
    {
      heading: 'Quando una posa non basta',
      paragraphs: [
        'Il sensore cattura una gamma dinamica limitata. In scene a fortissimo contrasto (interno con finestra, tramonto) una sola esposizione non tiene insieme alte luci e ombre.',
        'L’AEB (Auto Exposure Bracketing) scatta una raffica all’esposizione misurata più fotogrammi simmetrici sotto e sopra, di solito a ±1 o ±2 EV (i corpi avanzati arrivano a ±3 EV e più fotogrammi).',
      ],
      figure: 'bracketing-merge',
    },
    {
      heading: 'Fondere in HDR',
      paragraphs: [
        'I fotogrammi si combinano in una fusione HDR che cuce le parti ben esposte di ciascuno in un’unica mappa di radianza a 32 bit, più ampia di qualsiasi singolo scatto.',
        'Quell’immagine va poi “tone-mapped” verso 8/16 bit per essere mostrata: è qui che nascono aloni e l’aspetto “grunge” quando si esagera. Lo spaziamento va scelto in base al contrasto della scena.',
      ],
      points: [
        'AEB ≠ HDR: l’AEB cattura i fotogrammi, l’HDR è la fusione.',
        'Il bracketing serve anche al focus stacking e alla riduzione rumore (median stacking).',
      ],
      tip: 'Mito da sfatare: l’HDR non è per forza l’effetto saturo e irreale. Quello è tone-mapping aggressivo; una fusione naturale è invisibile e tiene insieme cielo e ombre. Spesso un singolo RAW moderno copre già la scena che si crede serva l’HDR.',
    },
  ],

  filters: [
    {
      heading: 'A che servono i filtri',
      paragraphs: [
        'I filtri si montano davanti all’obiettivo e modificano la luce prima del sensore. I due più usati sono il filtro a densità neutra (ND) e il polarizzatore circolare (CPL).',
        'Ciò che fanno non è del tutto replicabile in post: l’ND cambia il tempo di posa reale, il polarizzatore agisce fisicamente sulla luce polarizzata.',
      ],
    },
    {
      heading: 'ND: rallentare il tempo',
      paragraphs: [
        'Il filtro ND è un “vetro scuro” neutro: riduce la luce di un certo numero di stop senza alterare i colori. Serve per usare tempi lunghi in pieno giorno: acqua setosa, nuvole mosse, folle che spariscono.',
        'Ogni stop equivale a densità ottica 0,3 e a un fattore 2^stop: un ND da 6 stop trasforma 1/125 s in ~mezzo secondo.',
      ],
      points: [
        'ND a stop fissi: ND8 = 3 stop, ND64 = 6 stop, ND1000 = 10 stop.',
        'Sempre su treppiede: i tempi lunghi richiedono stabilità.',
      ],
    },
    {
      heading: 'Polarizzatore: togliere i riflessi',
      paragraphs: [
        'Il polarizzatore blocca un piano della luce polarizzata: elimina i riflessi su acqua e vetro, taglia la foschia, satura il cielo. L’effetto è massimo inquadrando a ~90° dal sole e si regola ruotando il filtro, al costo di ~1–2 stop di luce.',
        'Il “circolare” si riferisce a una lamina a quarto d’onda che tiene attivi autofocus ed esposimetro, non alla forma.',
      ],
      figure: 'polarizer-angle',
      tip: 'L’effetto del polarizzatore (riflessi e foschia) non è replicabile in post: va intercettata la luce polarizzata prima del sensore. Sui grandangoli spinti scurisce il cielo in modo disuniforme, perché la banda a 90° attraversa il fotogramma. Il filtro UV, su digitale, è ormai solo protezione frontale.',
    },
  ],

  modes: [
    {
      heading: 'P, A, S, M: chi decide cosa',
      paragraphs: [
        'Le modalità stabiliscono quali parametri imposti tu e quali calcola la fotocamera per ottenere l’esposizione corretta. ISO a parte, i parametri sono apertura e tempo.',
        'In A scegli l’apertura, in S il tempo, in M entrambi, in P nessuno. Non esiste una modalità “migliore”: cambia solo chi tiene il controllo.',
      ],
      figure: 'modes-grid',
    },
    {
      heading: 'Le priorità e il Program shift',
      paragraphs: [
        'In Priorità diaframmi (A/Av) controlli la profondità di campo e la camera calcola il tempo: è la semi-automatica più usata. In Priorità tempi (S/Tv) controlli il mosso e la camera regola l’apertura — ma in poca luce può arrivare a tutta apertura e sotto-esporre.',
        'In Programma (P) la camera sceglie una coppia equilibrata, e con il Program shift puoi scorrere tra coppie equivalenti (tempo più veloce ↔ diaframma più aperto) mantenendo l’EV.',
      ],
      tip: 'Auto-ISO trasforma la M in un’ibrida “automatica”: fissi tempo e diaframma e l’ISO fluttua per l’esposizione, con la compensazione che agisce sull’ISO scelto. Senza Auto-ISO, la compensazione in M pura non fa nulla: non c’è un parametro automatico da spostare.',
    },
    {
      heading: 'Manuale: controllo, non magia',
      paragraphs: [
        'In Manuale imposti tutto: l’esposimetro ti consiglia solo tramite la scala. Mito da sfatare: la M non dà esposizioni “migliori” delle automatiche — usa lo stesso esposimetro. Dà controllo, indispensabile in luce costante o col flash in studio.',
        'In luce uniforme, A o S sono spesso più rapide e altrettanto corrette.',
      ],
    },
  ],

  raw: [
    {
      heading: 'Dato grezzo, non immagine',
      paragraphs: [
        'Il RAW non è un’immagine pronta: è il dato grezzo del sensore, di solito a 12 bit (4096 livelli) o 14 bit (16.384), quasi lineare, da sviluppare. Il JPEG è già demosaicizzato, bilanciato, con curva e nitidezza applicate, compresso a 8 bit (256 livelli).',
        'Il RAW è un mosaico di Bayer: ogni fotosito legge un solo colore (50% verde, 25% rosso, 25% blu). La demosaicizzazione interpola i due canali mancanti per ogni pixel.',
      ],
      figure: 'bayer-demosaic',
    },
    {
      heading: 'La latitudine di recupero',
      paragraphs: [
        'Poiché il RAW è lineare, metà dei valori descrive lo stop più luminoso e ogni stop più scuro ne ha la metà: le ombre profonde sono codificate in modo grossolano anche a 14 bit. In compenso permette tipicamente 1–3 stop di recupero in post con poche perdite.',
        'Il JPEG cuoce la curva: alte luci oltre 255 o ombre schiacciate sono perse. Anche il bilanciamento è una scelta di post in RAW (solo moltiplicatori), mentre nel JPEG è permanente.',
      ],
      tip: 'Mito da sfatare: il RAW non è “un JPEG di qualità più alta” né un file non compresso — è dato non sviluppato che va per forza demosaicizzato e renderizzato prima di vederlo. La differenza 14 vs 12 bit si nota solo schiarendo molto le ombre.',
    },
  ],

  dynamic: [
    {
      heading: 'Che cos’è la gamma dinamica',
      paragraphs: [
        'La gamma dinamica è il rapporto, in stop (EV), tra la saturazione del fotosito (full-well) e il rumore di fondo (read noise). I sensori full-frame moderni vanno da ~11–12 stop (criterio “fotografico”, Photons-to-Photos) a ~14–15 stop (criterio “engineering/landscape”, DxOMark): due metri diversi, non una contraddizione.',
        'Se la scena è più contrastata della gamma del sensore, qualcosa si perde: alte luci bruciate o ombre chiuse, a seconda di come esponi.',
      ],
      figure: 'dr-ladder',
    },
    {
      heading: 'I bit non sono la gamma dinamica',
      paragraphs: [
        'La profondità di bit indica in quanti livelli si suddivide quel range, non la sua ampiezza: 8 bit = 256, 12 bit = 4096, 14 bit = 16.384. Un sensore pulito a 16 stop letto da un ADC a 14 bit dà comunque ~14 stop utili.',
        'La gamma è limitata dal rumore (di fotone e di lettura), non dai bit: quando il rumore di quantizzazione scende sotto il rumore analogico, altri bit non aggiungono gamma reale.',
      ],
      tip: 'Mito da sfatare: “più bit = più gamma dinamica”. Un file a 16 bit da un sensore rumoroso non ha più gamma utile di uno a 14 bit: i bit in più codificano solo il rumore più finemente. Pochi bit, dopo un editing pesante, danno banding nelle sfumature.',
    },
    {
      heading: 'Sfruttare la gamma',
      paragraphs: [
        'L’ISO base di solito offre la massima gamma; alzando l’ISO in genere si riduce. Per scene contrastate: esponi a destra, scatta in RAW o usa il bracketing.',
        'Poiché l’istogramma sul dorso viene dall’anteprima JPEG, chi pratica l’ETTR lascia di proposito che tocchi appena il bordo destro.',
      ],
    },
  ],

  colorSpace: [
    {
      heading: 'Che cos’è uno spazio colore',
      paragraphs: [
        'Uno spazio colore definisce quali colori un’immagine può rappresentare — il suo “gamut” — e come i numeri dei pixel diventano colori reali. È dato da primari, punto di bianco e curva di trasferimento (gamma), formalizzato in un profilo ICC che mappa verso lo spazio indipendente CIE XYZ/Lab.',
        'Il diagramma di cromaticità CIE 1931 (il “ferro di cavallo”) racchiude tutti i colori visibili; ogni spazio è un triangolo i cui vertici sono i suoi primari, e l’area interna è il suo gamut.',
      ],
      figure: 'color-gamut',
    },
    {
      heading: 'sRGB, Adobe RGB, ProPhoto',
      paragraphs: [
        'In ordine di ampiezza: sRGB ⊂ Adobe RGB ⊂ ProPhoto. sRGB è lo standard di web e schermi (gamut più piccolo ma “sicuro”). Adobe RGB è ~35% più ampio, soprattutto nei verdi-ciano, utile per la stampa.',
        'ProPhoto è enorme: i suoi primari verde e blu cadono fuori dal locus spettrale, quindi ~13% dei suoi valori sono colori “immaginari” che non esistono fisicamente e nessun dispositivo mostrerà mai.',
      ],
      tip: 'Mito da sfatare: “lavora sempre in ProPhoto/Adobe RGB per i colori migliori”. I gamut ampi richiedono 16 bit e gestione del colore: a 8 bit o se mostrati senza profilo danno banding e colori spenti, peggio di un semplice sRGB.',
    },
    {
      heading: 'Bit, gestione ed esportazione',
      paragraphs: [
        'A parità di bit, un gamut più ampio “spalma” gli stessi 256 livelli (8 bit) su un volume maggiore, allargando il salto tra colori vicini: per questo ProPhoto va usato a 16 bit (65.536 livelli) e converte in 8 bit sRGB solo all’esportazione finale per il web.',
        'Perché i colori restino coerenti, il profilo deve “viaggiare” col file e gli schermi vanno calibrati: un’immagine Adobe RGB vista come sRGB appare desaturata. Le immagini senza tag sono assunte sRGB dai browser.',
      ],
    },
  ],
};

const THEORY_EN: Record<string, TheoryBlock[]> = {
  shutter: [
    {
      heading: 'What shutter speed is',
      paragraphs: [
        'Shutter speed is how long the shutter stays open and light reaches the sensor. It is measured in seconds and fractions: 1/1000, 1/250, 1/30, 1″, 30″…',
        'Each “stop” doubles or halves the time, and so the light gathered: from 1/250 to 1/125 lets in twice the light. In APEX the Time Value is Tv = log₂(1/T), so 1/250 s is Tv ≈ 8.',
      ],
      figure: 'motion-speeds',
    },
    {
      heading: 'Freeze or let motion flow',
      paragraphs: [
        'Motion blur is the subject’s image shift on the sensor during the exposure: a fast shutter freezes because the subject moves only a few pixels while the shutter is open.',
        'How much blur you get depends on three things: subject speed, shutter time, and how magnified the subject is in the frame (focal length and distance).',
      ],
      points: [
        'Sports and action: 1/1000 s or faster to freeze.',
        'People walking: usually 1/250 s is enough.',
        'Silky water or light trails: 1/4 s to several seconds, on a tripod.',
      ],
      tip: 'Cinema follows the “180° shutter rule”: a 180° shutter angle exposes half of each frame interval, so 24 fps uses 1/48 s (rounded to 1/50). It is the blur audiences read as “filmic”; Saving Private Ryan deliberately used ~45° (≈1/192 s) for a sharp, staccato look.',
    },
    {
      heading: 'Focal-plane shutter and sync speed',
      paragraphs: [
        'Most cameras use a focal-plane shutter with two curtains. Above the flash sync speed the second curtain starts closing before the first is fully open: only a moving slit exposes the sensor.',
        'Sync speed (≈1/200 s Canon, 1/250 s Nikon) is the fastest speed at which the sensor is fully uncovered at one instant. To go faster with flash you need High-Speed Sync, which pulses the flash like a continuous light.',
      ],
      tip: 'The electronic (silent) shutter reads the sensor line by line: on fast subjects it produces “rolling shutter” skew and, under LED/fluorescent light, banding.',
    },
    {
      heading: 'The safe-shutter rule',
      paragraphs: [
        'Handheld, hand tremor causes blur. A classic rule: don’t use a shutter longer than 1/(equivalent focal length). With a 200 mm, at least 1/200 s.',
        'Stabilisers (optical or in-body) gain 3–5 stops, allowing much longer handheld speeds — but they don’t freeze a moving subject.',
      ],
      tip: 'Myth to bust: shutter speed does not affect depth of field. That depends only on aperture, focal length and distance; the shutter controls exposure and motion.',
    },
  ],

  aperture: [
    {
      heading: 'Aperture and the f-number',
      paragraphs: [
        'The aperture is the adjustable opening inside the lens. The f-number is focal length over entrance-pupil diameter: N = focal length ÷ diameter. That’s why f/2.8 on a 50 mm and on a 200 mm have very different pupil sizes.',
        'Light gathered is proportional to 1/N²: the full-stop series (1, 1.4, 2, 2.8, 4, 5.6, 8…) steps by √2 because each step halves or doubles the pupil area. In APEX, Av = 2·log₂(N).',
      ],
      figure: 'aperture-fnumber',
    },
    {
      heading: 'Depth of field',
      paragraphs: [
        'Depth of field (DoF) is the band of distances that looks sharp. It thins as you open the aperture (small N), lengthen the focal length and move closer to the subject.',
        'Opening to f/1.4 isolates the subject on a creamy background; closing to f/11 keeps everything sharp from foreground to background, useful for landscapes.',
      ],
      tip: 'Cinema uses T-stops instead of f-stops: they measure the light actually transmitted through all the glass and coatings, so different lenses keep the same exposure. An f/1.8 lens may transmit only T/2.',
    },
    {
      heading: 'Bokeh and the shape of highlights',
      paragraphs: [
        'Bokeh is the look of the out-of-focus areas. The amount of blur depends on aperture, focal length and distance; the shape of out-of-focus highlights depends instead on the aperture blades.',
        'Few straight blades give polygonal highlights; about 9 rounded blades approximate a circle. Toward the frame edges, wide open, highlights become “cat’s-eye” shaped from optical vignetting.',
      ],
      tip: 'Myth to bust: more blades don’t mean “more bokeh”. Blade count shapes the highlight outline, not the amount of blur, which is set by the real aperture diameter, focal length and distance.',
    },
  ],

  iso: [
    {
      heading: 'What ISO is',
      paragraphs: [
        'ISO sets the amplification applied to the signal after the photons are captured: it doesn’t change the sensor’s physical “sensitivity”, only how the recorded signal maps to output brightness.',
        'Raising ISO by a stop brightens by a stop, letting you use faster shutters or smaller apertures in low light — at the cost of a noisier image.',
      ],
      figure: 'iso-noise',
    },
    {
      heading: 'Where noise really comes from',
      paragraphs: [
        'The most visible noise is shot noise: the random arrival of photons. Its relative weight is ≈ √(signal), so signal-to-noise improves with more light, not with a lower ISO per se.',
        'The real culprit is too little light (under-exposure, dark scenes). Read noise, from the electronics, is the part ISO amplification can affect.',
      ],
      tip: 'Many sensors are nearly “ISO-invariant”: shooting RAW under-exposed and lifting in post gives a result similar to raising the ISO. Exposing well matters more than the ISO number.',
    },
    {
      heading: 'Base, dual-gain and extended ISO',
      paragraphs: [
        'Base ISO (usually 100, sometimes 64 or 200) gives the maximum dynamic range. “Extended” ISO (L50, H51200) is a software push/pull, not real hardware gain, and clips highlights or adds noise.',
        'Many modern sensors have two conversion gains (dual-gain): cross the threshold (often ISO 500–800) and read noise drops sharply.',
      ],
      tip: 'Counter-intuitive fact: on a dual-gain camera, ISO 640 can be cleaner than ISO 400, because the low-noise second gain kicks in.',
    },
  ],

  focal: [
    {
      heading: 'Focal length and angle of view',
      paragraphs: [
        'Focal length (in mm) sets the angle of view: short = wide-angle (broad field), long = telephoto (narrow field, magnified subjects).',
        'The angle is pure geometry: AoV = 2·arctan(d / 2f), where d is the sensor dimension and f the focal length. The link is non-linear: halving focal length at wide angles more than doubles the angle, but at telephoto barely changes it.',
      ],
      formula: 'AoV = 2 · arctan(d / 2f)',
      figure: 'angle-of-view',
    },
    {
      heading: '“Compression” is distance, not focal length',
      paragraphs: [
        'So-called perspective compression depends on shooting distance, not focal length. The relative sizes of foreground and background depend only on the ratio of camera-to-subject and camera-to-background distances.',
        'A telephoto doesn’t “squash” the scene: it just invites you to step back, and stepping back is what compresses. From the same spot, a long lens magnifies an already-fixed perspective.',
      ],
      figure: 'compression',
      tip: 'Proof: you can recreate the same “telephoto compressed” shot with a wide-angle from the same spot and then crop. The perspective is identical — only moving changes it.',
    },
    {
      heading: 'The “normal” focal length',
      paragraphs: [
        'A focal length is “normal” when it roughly equals the sensor diagonal (~43 mm on full-frame): shorter is wide, longer is tele. The 50 mm became the standard because it’s close to this “natural” rendering.',
        'The “like the eye” feel of 50 mm is a perceptual convention, not an optical match: our visual field is far wider, but central attention is narrow.',
      ],
    },
  ],

  triangle: [
    {
      heading: 'One single equation',
      paragraphs: [
        'Exposure — aperture, shutter and ISO — is not three independent knobs but one relationship. In APEX: Av + Tv = Bv + Sv (aperture + time = scene luminance + sensitivity).',
        'Each parameter is quantised in stops (×2 light), so the three are interchangeable for exposure: f/2.8 at 1/250 ISO 100 = f/4 at 1/125 ISO 100 = f/4 at 1/250 ISO 200.',
      ],
      formula: 'Av + Tv = Bv + Sv',
      figure: 'exposure-triangle',
    },
    {
      heading: 'Equivalent exposures, different images',
      paragraphs: [
        '“Equivalent exposures” give the same brightness but different images: depth of field, motion blur and noise change. They are the three side-effects you choose when you balance the triangle.',
        'The triangle is a constraint, not three freedoms: fix the exposure and moving one parameter forces a compensating change in another.',
      ],
      tip: 'Sunny-16 rule: in direct sun at f/16 the correct shutter is ≈ 1/ISO (ISO 100 → ~1/100 s). A meter-free exposure estimate, because sunlight is about EV 15.',
    },
    {
      heading: 'Is ISO really part of exposure?',
      paragraphs: [
        'Strictly, only aperture and shutter (plus scene light) set the exposure, i.e. the light on the sensor. ISO is a brightening applied after capture.',
        'It’s a handy simplification to put it in the “triangle”, but physically it’s a separate step: that’s why, in many situations, it’s best to keep it low and look after shutter and aperture first.',
      ],
    },
  ],

  composition: [
    {
      heading: 'Composing within the frame',
      paragraphs: [
        'Composition is how you arrange elements within the frame to guide the eye. The edge of the image is already a choice: what to include and what to leave out.',
        'The eye doesn’t read pixels at random: the Gestalt principles describe how it groups what it sees — by proximity, similarity, continuation and closure — and how it separates figure from ground. Composing means using these tendencies.',
      ],
    },
    {
      heading: 'The rule of thirds',
      paragraphs: [
        'Picture two vertical and two horizontal lines dividing the frame into nine parts. Placing the subject on a line or, better, on an intersection (a “power point”), and the horizon on a third rather than the middle, makes the image more dynamic than dead-centre.',
        'A historical note: the phrase “rule of thirds” was coined by the painter John Thomas Smith in 1797 in Remarks on Rural Scenery, quoting Reynolds. He originally meant 1/3-to-2/3 proportional masses (land and sky), not the symmetric grid we teach today.',
      ],
      figure: 'rule-of-thirds',
      tip: 'It’s a guideline, not a law. Myth to bust: the idea that eye-tracking studies “prove” the eye lands on the thirds intersections is unsupported — a peer-reviewed study (Amirshahi et al., 2014) found no such effect. Most cameras still offer the grid (and often a phi grid) in the viewfinder.',
    },
    {
      heading: 'The golden ratio and spiral',
      paragraphs: [
        'The “phi grid” uses the golden number φ ≈ 1.618: it divides the frame at 0.382 and 0.618, lines slightly closer to the centre than the thirds (0.333 and 0.667). The golden spiral is a logarithmic spiral that grows by φ every quarter-turn: the subject goes in its “eye”.',
        'Note: thirds and golden ratio are different constructions (0.333 vs 0.382) that give similar results — not one a “simplified version” of the other.',
      ],
      figure: 'golden-ratio',
      tip: 'Myth to bust: the supposed aesthetic superiority of the golden ratio is largely a retrofitted legend. Mathematician Keith Devlin calls it “the 19th-century equivalent of the Mozart Effect”, born from Adolf Zeising’s unscientific theories; even the nautilus “golden spiral” is false (measurements give ~1.33, not 1.618). φ is real in nature (phyllotaxis), but the universal aesthetic preference isn’t.',
    },
    {
      heading: 'Leading lines, balance and space',
      paragraphs: [
        'Leading lines (roads, rivers, fences) carry the eye into the scene and toward the subject; diagonals add energy, horizontals calm, and a “Dutch angle” (tilted horizon) creates tension. Symmetry works when it’s the point: reflections, architecture, formal portraits. Framing within the frame (arches, windows, branches) adds depth.',
        'Visual weight — set by size, contrast, colour, sharpness and the presence of faces — must be balanced across the frame. Negative space isolates the subject and gives it room; headroom is the space above the head, lead room (or look room) the space ahead of someone looking or moving.',
      ],
      points: [
        'A moving subject wants more space in front than behind: cropping it to the edge “suffocates” the motion.',
        'Horizon on a third: low to emphasise the sky, high to emphasise the foreground.',
      ],
      figure: 'leading-lines',
      tip: 'Myth to bust: “the subject must never be centred”. False — the centre is powerful for symmetry, reflections and formal portraits. You learn the rules precisely so you can break them with intent.',
    },
  ],

  histogram: [
    {
      heading: 'Reading light from the graph',
      paragraphs: [
        'The histogram shows how many pixels fall at each tonal level: shadows on the left, highlights on the right, midtones in between. Height is the pixel count.',
        'It is gamma-encoded, so midtones take up more width than the sensor’s linear data. It is computed per channel (R, G, B) plus luminance.',
      ],
      figure: 'histogram-zones',
    },
    {
      heading: 'Clipping: lost detail',
      paragraphs: [
        'When a channel piles up against a wall, you have clipping: blown highlights (white with no detail) on the right, crushed shadows (black) on the left. Blown highlights are unrecoverable.',
        'There’s no universal “good” histogram: a dark scene should sit left, a high-key one right. The correct shape is the real scene’s shape.',
      ],
      tip: 'The histogram on the back of the camera is computed from the JPEG preview (white-balanced, with a profile applied), not the RAW. So it flags clipping about 0.5–1 stop before the RAW actually clips.',
    },
    {
      heading: 'Exposing to the right (ETTR)',
      paragraphs: [
        'Exposing to the right means pushing the histogram right without clipping, to maximise signal: the sensor is linear and the brightest stop holds half of all recorded levels.',
        'More photons in the highlights = cleaner shadows when you pull exposure back in post. It’s the strategy for minimum noise.',
      ],
    },
  ],

  whiteBalance: [
    {
      heading: 'Colour temperature in Kelvin',
      paragraphs: [
        'White balance neutralises the colour cast of the light. Colour temperature (in Kelvin) describes the source’s hue: candle ~1900 K, tungsten ~3200 K, daylight/flash ~5500 K, overcast ~6500 K, shade ~7500 K, blue sky up to ~10000 K.',
        'The eye adapts and sees most whites as neutral; the sensor doesn’t. That’s why WB exists: it’s a pair of gains on the red and blue channels relative to green, applied during development.',
      ],
      figure: 'kelvin-scale',
    },
    {
      heading: 'Tint and non-blackbody sources',
      paragraphs: [
        'Besides the warm-cool axis there’s the perpendicular green↔magenta (tint) axis, which corrects non-blackbody sources: fluorescents and LEDs often skew green, some lamps magenta.',
        'For a true white nothing beats a grey card shot in the same light: it gives a custom balance more reliable than presets.',
      ],
      tip: 'Myth to bust: “higher Kelvin = cooler photo”. It’s the opposite on the slider: a high-Kelvin source is bluer, but dialling a higher Kelvin value warms the image, because you tell the camera the light is bluer than it is.',
    },
    {
      heading: 'WB and RAW',
      paragraphs: [
        'In RAW, white balance is a post decision: the “as shot” value is only metadata and doesn’t alter the sensor data, so you can change it losslessly. In JPEG it is baked into the image.',
        'Watch out for auto-WB: it can “correct away” the warmth of a sunset you actually wanted to keep.',
      ],
    },
  ],

  panning: [
    {
      heading: 'Following the motion',
      paragraphs: [
        'Panning tracks a moving subject with a deliberately slow exposure: the subject stays sharp while the background streaks, conveying speed.',
        'Technique: smooth rotation from the hips, follow-through after the shot, continuous autofocus (AF-C), and a rotation speed matched to the subject’s angular speed.',
      ],
      figure: 'panning-arc',
    },
    {
      heading: 'Which shutter to use',
      paragraphs: [
        'Shutter scales inversely with subject speed: walking people ~1/15–1/30 s, cyclists ~1/30–1/60 s, cars ~1/60–1/125 s, fast motorsport 1/125–1/250 s.',
        'The slower the shutter, the more background streak — but the more misses. Burst mode greatly raises the keeper rate.',
      ],
      points: [
        'Wider focal lengths are more forgiving: the same angular error spans fewer pixels.',
        'A little residual blur on wheels/limbs often looks more dynamic than a perfectly frozen subject.',
      ],
      tip: 'Myth to bust: you don’t need to switch stabilisation off. Many lenses detect panning or offer a “Mode 2” that disables only the horizontal axis: leaving it on usually helps.',
    },
  ],

  crop: [
    {
      heading: 'Sensor size and crop factor',
      paragraphs: [
        'Crop factor is the ratio of the full-frame diagonal (43.3 mm) to the sensor’s: APS-C ≈ 1.5× (Nikon/Sony) or 1.6× (Canon), Micro Four Thirds = 2.0×.',
        'A smaller sensor records only the central portion of the image the lens projects: same focal length, tighter framing.',
      ],
      figure: 'crop-frames',
    },
    {
      heading: 'Equivalent focal length and equivalence',
      paragraphs: [
        'Equivalent focal length (for framing only) = actual focal length × crop factor: a 35 mm on APS-C frames like a ~52 mm on full-frame. The physical focal length and optics don’t change.',
        'For the same depth of field at matched framing, multiply the f-number by the crop factor too: f/2.8 on MFT ≈ f/5.6 full-frame, both in field of view and background blur.',
      ],
      formula: 'crop = 43.3 mm ÷ sensor diagonal',
      tip: 'Myth to bust: crop factor doesn’t change a lens’s focal length. A 50 mm is always 50 mm; the crop factor only describes the narrower field of view the smaller sensor captures.',
    },
    {
      heading: 'Why full-frame “gathers more light”',
      paragraphs: [
        'At the same exposure and framing, the larger sensor gathers more total light: so, all else equal, it shows less noise. To truly match a smaller format you’d have to open the aperture by the crop factor.',
        'Hyperfocal distance and the diffraction threshold also shift with format, because they depend on the circle of confusion, which scales with sensor size.',
      ],
    },
  ],

  diffraction: [
    {
      heading: 'The Airy disk',
      paragraphs: [
        'Stop down a lot and diffraction spreads each point into an “Airy disk”. Its diameter is ≈ 2.44·λ·N (λ ≈ 0.55 µm for green, N the f-number): at f/16 ~21 µm, at f/4 only ~5.4 µm.',
        'The disk depends only on f-number and wavelength, not the sensor; but it becomes visible once it exceeds 2–3 times the pixel size.',
      ],
      formula: 'Airy Ø ≈ 2.44 · λ · N',
      figure: 'diffraction-curve',
    },
    {
      heading: 'The lens sweet spot',
      paragraphs: [
        'Wide open, aberrations dominate; as you stop down they fall but diffraction grows. Peak sharpness is where the two curves cross: usually 2–3 stops down from maximum aperture (often f/5.6–f/8 on full-frame).',
        'Stopping down past the diffraction threshold lowers peak sharpness but increases depth of field: it’s a trade-off, not a mistake.',
      ],
      points: [
        'Typical threshold: compacts ~f/4–5.6, MFT ~f/5.6–8, APS-C ~f/8–11, full-frame ~f/11–16.',
      ],
      tip: 'That’s why phones barely stop down: with tiny pixels they’d go diffraction-soft almost immediately, so they control exposure with shutter and ISO.',
    },
  ],

  portrait: [
    {
      heading: 'The distance that distorts',
      paragraphs: [
        'Facial “distortion” in portraits is perspective and depends on the camera-to-face distance, not the lens. Up close, the nose-to-camera vs ears-to-camera ratio gets large: nose enlarged, ears shrunk.',
        'An 85 mm and a 50 mm shot from the same distance render the same face shape: the 85 mm just frames tighter.',
      ],
      figure: 'portrait-distance',
    },
    {
      heading: 'The classic portrait focal lengths',
      paragraphs: [
        'On full-frame, portrait focal lengths are ~85–135 mm. The 85 mm is the “head-and-shoulders” standard because it forces a comfortable ~2–3 m working distance that yields flattering proportions.',
        'On APS-C divide by the crop factor: a ~56 mm replicates the field of view and working distance of an 85 mm full-frame.',
      ],
      tip: 'Myth to bust: the 85 mm isn’t flattering because it “compresses” the face. The pleasing look comes from the longer working distance it requires; the focal length itself doesn’t reshape features. A wide-angle “big nose” portrait is fixed by stepping back.',
    },
  ],

  hyperfocal: [
    {
      heading: 'The hyperfocal',
      paragraphs: [
        'The hyperfocal distance H is the focus point that renders everything from H/2 to infinity sharp. It’s the classic move to maximise sharpness in landscapes.',
        'Formula: H = f²/(N·c) + f, where f is focal length, N the f-number and c the circle of confusion. The +f term is almost always negligible, so H ≈ f²/(N·c).',
      ],
      formula: 'H = f² / (N · c) + f',
      figure: 'hyperfocal',
    },
    {
      heading: 'The circle of confusion',
      paragraphs: [
        'The circle of confusion c is the largest blur still seen as a point: ~0.03 mm on full-frame, ~0.02 mm on APS-C. It’s derived from an 8×10-inch print viewed at ~25 cm with 20/20 vision.',
        'Since c scales with format, the same scene needs different hyperfocal settings on full-frame and APS-C. DoF is asymmetric: at moderate distances about ⅓ in front and ⅔ behind the focus point.',
      ],
      tip: 'Myth to bust: focusing at the hyperfocal doesn’t make infinity “perfectly” sharp — only “acceptably” sharp. The sharpest plane is at H, and distant detail is slightly softer.',
    },
    {
      heading: 'Zone focusing',
      paragraphs: [
        'Zone focusing presets focus and aperture so a known range of distances falls inside the DoF without refocusing: ideal for street and action. A 28 mm at f/8 keeps ~1.5 m to infinity sharp.',
        'Beware “focus and recompose”: pivoting the camera after locking focus shifts the focal plane, especially wide open and up close. Better to move the AF point.',
      ],
    },
  ],

  metering: [
    {
      heading: '18% grey and the three modes',
      paragraphs: [
        'The reflective meter assumes the scene averages to an 18% grey: so it tends to darken very bright scenes (snow) and brighten dark ones. That’s why compensation exists.',
        'Spot meters a small central circle (~1–5% of the frame); centre-weighted averages the whole frame with a centre bias; matrix/evaluative divides the frame into zones.',
      ],
      figure: 'metering-zones',
    },
    {
      heading: '“Smart” matrix metering',
      paragraphs: [
        'Matrix metering compares the zone-brightness pattern to an internal database of tens of thousands of reference scenes (Nikon cites ~30,000) to classify the situation (backlight, snow, sunset) and bias accordingly.',
        'Modern matrix metering also folds in focus distance, focal length and face detection, weighting exposure toward the in-focus subject.',
      ],
      tip: 'Myth to bust: spot doesn’t always meter at the AF point. On many cameras it’s fixed at the centre; only some bodies link it to the active point — check the manual.',
    },
    {
      heading: 'Exposure compensation',
      paragraphs: [
        'Compensation shifts the meter’s “target” in ⅓-stop steps (often ±5 EV): +EV brightens (“this should be lighter than grey”), −EV darkens.',
        'For high-contrast subjects, spot-metering a known midtone (or skin, then +1 EV for light skin) is more reliable than trusting matrix.',
      ],
    },
  ],

  stabilization: [
    {
      heading: 'Against shake, not the subject',
      paragraphs: [
        'Stabilisation corrects camera shake. Optical IS (IS/VR/OSS) shifts a lens group; in-body IBIS moves the sensor on up to 5 axes: pitch, yaw, roll, X, Y.',
        'It corrects only camera motion: it doesn’t freeze a moving subject, for which you still need a fast shutter.',
      ],
      figure: 'stabilization-axes',
    },
    {
      heading: 'The reciprocal rule',
      paragraphs: [
        'The minimum handheld shutter is ≈ 1/(focal length); on a crop body multiply the focal length by the crop factor first (50 mm × 1.5 → 1/75 s). The rule counters angular shake, which magnifies with focal length.',
        'Stabilisation is rated in stops of reduction (often 5–8 under the CIPA standard), letting you drop several stops below the safe shutter.',
      ],
      formula: 'safe shutter ≈ 1 / (focal × crop)',
      tip: 'Lens IS and IBIS can cooperate (“Sync IS”/“Dual IS”): the lens handles pitch and yaw, the body the rest, for the highest stop ratings. CIPA ratings are lab figures: in the real world, technique matters.',
    },
  ],

  flash: [
    {
      heading: 'The sync speed',
      paragraphs: [
        'The focal-plane shutter exposes the whole sensor at once only up to the sync speed (~1/200 s Canon, 1/250 s Nikon). Faster, the two curtains form a moving slit: the flash, a very brief burst, lights only the uncovered part and leaves a black band.',
        'Sync is simply the fastest speed at which the sensor is fully uncovered at one instant.',
      ],
      figure: 'flash-sync',
    },
    {
      heading: 'HSS and curtain sync',
      paragraphs: [
        'High-Speed Sync (HSS/FP) overcomes the limit by pulsing the flash thousands of times, so it acts like a continuous light scanning with the slit — at the cost of 1.5–2 stops of power.',
        'First-curtain sync fires the flash as the exposure opens; second/rear-curtain fires it just before it closes, so a moving subject’s trails fall behind it, naturally.',
      ],
      tip: 'In the dark it’s the flash duration (often 1/1000–1/20000 s at low power), not the shutter speed, that freezes motion. The guide number (GN = aperture × distance at ISO 100) encodes the falloff with distance — but it differs in metres vs feet.',
    },
    {
      heading: 'Ambient vs flash',
      paragraphs: [
        'Myth to bust: a faster shutter doesn’t let in “more flash”. Within sync, shutter speed controls only the ambient exposure; the flash is set by aperture, ISO, power and distance.',
        'To balance flash and ambient: set the shutter for the background (within sync) and aperture/ISO/power for the flash-lit subject.',
      ],
    },
  ],

  bracketing: [
    {
      heading: 'When one exposure isn’t enough',
      paragraphs: [
        'The sensor captures a limited dynamic range. In very high-contrast scenes (interior with a window, sunset) one exposure can’t hold both highlights and shadows.',
        'AEB (Auto Exposure Bracketing) fires a burst at the metered exposure plus symmetric under and over frames, usually ±1 or ±2 EV (high-end bodies reach ±3 EV and more frames).',
      ],
      figure: 'bracketing-merge',
    },
    {
      heading: 'Merging into HDR',
      paragraphs: [
        'The frames combine in an HDR merge that stitches the well-exposed parts of each into a single 32-bit radiance map, wider than any one shot.',
        'That image is then tone-mapped down to 8/16 bit to be shown: this is where halos and the “grungy” look come from when overdone. Spacing should match the scene’s contrast.',
      ],
      points: [
        'AEB ≠ HDR: AEB captures the frames, HDR is the merge.',
        'Bracketing also serves focus stacking and noise reduction (median stacking).',
      ],
      tip: 'Myth to bust: HDR isn’t necessarily that saturated, surreal look. That’s aggressive tone-mapping; a natural merge is invisible and just holds both sky and shadows. Often a single modern RAW already covers the scene people think needs HDR.',
    },
  ],

  filters: [
    {
      heading: 'What filters are for',
      paragraphs: [
        'Filters mount in front of the lens and change the light before the sensor. The two most used are the neutral density (ND) filter and the circular polariser (CPL).',
        'What they do is not fully reproducible in post: the ND changes the actual shutter time, the polariser physically acts on polarised light.',
      ],
    },
    {
      heading: 'ND: slowing time down',
      paragraphs: [
        'The ND filter is a neutral “dark glass”: it cuts light by a set number of stops without shifting colours. It’s for long shutter speeds in broad daylight: silky water, streaking clouds, vanishing crowds.',
        'Each stop equals optical density 0.3 and a factor of 2^stops: a 6-stop ND turns 1/125 s into ~half a second.',
      ],
      points: [
        'ND in fixed stops: ND8 = 3 stops, ND64 = 6 stops, ND1000 = 10 stops.',
        'Always on a tripod: long exposures need stability.',
      ],
    },
    {
      heading: 'Polariser: removing reflections',
      paragraphs: [
        'The polariser blocks one plane of polarised light: it removes reflections on water and glass, cuts haze and saturates the sky. The effect peaks shooting ~90° from the sun and is set by rotating the filter, at a ~1–2 stop light cost.',
        'The “circular” refers to a quarter-wave plate that keeps autofocus and metering working, not to a shape.',
      ],
      figure: 'polarizer-angle',
      tip: 'A polariser’s effect (reflections and haze) can’t be replicated in post: you must intercept polarised light before the sensor. On ultra-wide lenses it darkens the sky unevenly, because the 90° band crosses the frame. A UV filter, on digital, is now only front-element protection.',
    },
  ],

  modes: [
    {
      heading: 'P, A, S, M: who decides what',
      paragraphs: [
        'Modes set which parameters you choose and which the camera works out for a correct exposure. ISO aside, the parameters are aperture and shutter.',
        'In A you pick the aperture, in S the shutter, in M both, in P neither. There’s no “best” mode: it only changes who keeps control.',
      ],
      figure: 'modes-grid',
    },
    {
      heading: 'The priorities and Program shift',
      paragraphs: [
        'In Aperture priority (A/Av) you control depth of field and the camera works out the shutter: it’s the most-used semi-auto. In Shutter priority (S/Tv) you control motion and the camera sets the aperture — but in low light it may hit maximum aperture and underexpose.',
        'In Program (P) the camera picks a balanced pair, and with Program shift you can slide through equivalent pairs (faster shutter ↔ wider aperture) keeping EV constant.',
      ],
      tip: 'Auto-ISO turns M into a hybrid “auto” mode: you fix shutter and aperture and ISO floats for exposure, with compensation acting on the chosen ISO. Without Auto-ISO, compensation does nothing in plain M: there’s no auto variable to shift.',
    },
    {
      heading: 'Manual: control, not magic',
      paragraphs: [
        'In Manual you set everything: the meter only advises via the scale. Myth to bust: M doesn’t give “better” exposures than the auto modes — it uses the same meter. It gives control, essential in constant light or with studio flash.',
        'In even light, A or S are often faster and just as correct.',
      ],
    },
  ],

  raw: [
    {
      heading: 'Raw data, not an image',
      paragraphs: [
        'RAW is not a finished image: it’s the sensor’s raw data, usually 12-bit (4096 levels) or 14-bit (16,384), nearly linear, to be developed. JPEG is already demosaiced, white-balanced, with curve and sharpening applied, compressed to 8-bit (256 levels).',
        'RAW is a Bayer mosaic: each photosite reads only one colour (50% green, 25% red, 25% blue). Demosaicing interpolates the two missing channels for every pixel.',
      ],
      figure: 'bayer-demosaic',
    },
    {
      heading: 'Recovery latitude',
      paragraphs: [
        'Because RAW is linear, half the values describe the brightest stop and each darker stop gets half as many: deep shadows are coarsely encoded even at 14-bit. In return it typically allows 1–3 stops of recovery in post with little loss.',
        'JPEG bakes in the curve: highlights past 255 or crushed shadows are gone. White balance is also a post choice in RAW (just multipliers), while in JPEG it’s permanent.',
      ],
      tip: 'Myth to bust: RAW isn’t “a higher-quality JPEG” nor an uncompressed file — it’s undeveloped data that must be demosaiced and rendered before you can see it. The 14 vs 12-bit difference only shows when lifting shadows hard.',
    },
  ],

  dynamic: [
    {
      heading: 'What dynamic range is',
      paragraphs: [
        'Dynamic range is the ratio, in stops (EV), between photosite saturation (full-well) and the noise floor (read noise). Modern full-frame sensors run from ~11–12 stops (“photographic” criterion, Photons-to-Photos) to ~14–15 stops (“engineering/landscape” criterion, DxOMark): two different yardsticks, not a contradiction.',
        'If the scene is more contrasty than the sensor’s range, something is lost: blown highlights or crushed shadows, depending on how you expose.',
      ],
      figure: 'dr-ladder',
    },
    {
      heading: 'Bits are not dynamic range',
      paragraphs: [
        'Bit depth says into how many levels that range is split, not its width: 8-bit = 256, 12-bit = 4096, 14-bit = 16,384. A clean 16-stop sensor read by a 14-bit ADC still gives ~14 usable stops.',
        'Range is limited by noise (shot and read), not bits: once quantisation noise drops below the analog noise, more bits add no real range.',
      ],
      tip: 'Myth to bust: “more bits = more dynamic range”. A 16-bit file from a noisy sensor has no more usable range than a 14-bit one: the extra bits just encode noise more finely. Too few bits, after heavy editing, cause banding in gradients.',
    },
    {
      heading: 'Making the most of the range',
      paragraphs: [
        'Base ISO usually offers the most range; raising ISO generally shrinks it. For contrasty scenes: expose to the right, shoot RAW or bracket.',
        'Since the back-of-camera histogram comes from the JPEG preview, ETTR practitioners deliberately let it just touch the right edge.',
      ],
    },
  ],

  colorSpace: [
    {
      heading: 'What a colour space is',
      paragraphs: [
        'A colour space defines which colours an image can represent — its “gamut” — and how the pixel numbers become real colours. It’s set by primaries, white point and a transfer (gamma) curve, formalised in an ICC profile that maps to the device-independent CIE XYZ/Lab space.',
        'The CIE 1931 chromaticity diagram (the “horseshoe”) holds all visible colours; each space is a triangle whose corners are its primaries, and the area inside is its gamut.',
      ],
      figure: 'color-gamut',
    },
    {
      heading: 'sRGB, Adobe RGB, ProPhoto',
      paragraphs: [
        'By size: sRGB ⊂ Adobe RGB ⊂ ProPhoto. sRGB is the standard of web and screens (smallest gamut but “safe”). Adobe RGB is ~35% larger, especially in the green-cyans, useful for print.',
        'ProPhoto is huge: its green and blue primaries fall outside the spectral locus, so ~13% of its values are “imaginary” colours that don’t physically exist and no device will ever show.',
      ],
      tip: 'Myth to bust: “always work in ProPhoto/Adobe RGB for the best colour”. Wide gamuts demand 16-bit and colour management: at 8-bit, or shown untagged, they band and dull — worse than plain sRGB.',
    },
    {
      heading: 'Bits, management and export',
      paragraphs: [
        'At equal bit depth, a wider gamut spreads the same 256 levels (8-bit) over a larger volume, widening the gap between adjacent colours: that’s why ProPhoto must be used at 16-bit (65,536 levels) and converted to 8-bit sRGB only on final export for the web.',
        'For colours to stay consistent the profile must “travel” with the file and screens must be calibrated: an Adobe RGB image shown as sRGB looks desaturated. Untagged images are assumed sRGB by browsers.',
      ],
    },
  ],
};

/** Restituisce i blocchi di teoria per il concetto e la lingua (fallback all'italiano). */
export function theoryFor(id: string, locale: Locale): TheoryBlock[] {
  return (locale === 'en' ? THEORY_EN[id] : THEORY[id]) ?? THEORY[id] ?? [];
}
