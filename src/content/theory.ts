/**
 * Contenuti teorici approfonditi per ogni concetto (mostrati come prima sezione del dettaglio).
 * Contenuti localizzati (it/en) accessibili tramite theoryFor(id, locale).
 */

import type { Locale } from '../types';

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

  histogram: [
    {
      heading: 'Leggere i toni',
      paragraphs: [
        'L’istogramma è un grafico della distribuzione dei toni: ombre a sinistra, mezzitoni al centro, alte luci a destra. L’altezza indica quanti pixel hanno quel valore.',
        'Non esiste un istogramma “giusto” in assoluto: dipende dalla scena. Una scena scura avrà la gobba a sinistra, una scena chiara a destra.',
      ],
    },
    {
      heading: 'Evitare il clipping',
      paragraphs: [
        'Quando i toni si accumulano contro un bordo sono “tagliati” (clipping): le alte luci bruciate diventano bianco puro senza dettaglio, le ombre chiuse nero puro. Sono perdite irrecuperabili.',
        'La tecnica “esponi a destra” (ETTR) spinge l’istogramma il più a destra possibile senza bruciare le alte luci, massimizzando il segnale e riducendo il rumore nelle ombre.',
      ],
    },
  ],

  whiteBalance: [
    {
      heading: 'Il colore della luce',
      paragraphs: [
        'Ogni sorgente ha una temperatura colore, in kelvin: candela e tramonto sono caldi (2000–3000 K, arancio), il sole di mezzogiorno è neutro (~5500 K), ombra e cielo coperto sono freddi (7000–9000 K, blu).',
        'Il bilanciamento del bianco indica alla fotocamera il colore della luce, così da riportare i bianchi a neutro ed evitare dominanti indesiderate.',
      ],
    },
    {
      heading: 'Neutralizzare o interpretare',
      paragraphs: [
        'Impostare la temperatura corretta elimina la dominante; sbagliarla di proposito è uno strumento creativo: una dominante calda rende un ritratto accogliente, una fredda lo rende più severo.',
        'In RAW il bilanciamento del bianco si modifica liberamente in post-produzione; in JPEG conviene azzeccarlo già allo scatto.',
      ],
    },
  ],

  panning: [
    {
      heading: 'Seguire il soggetto',
      paragraphs: [
        'Il panning consiste nel seguire il soggetto in movimento con la fotocamera mentre scatti a un tempo relativamente lungo: il soggetto, fermo rispetto all’inquadratura, resta nitido, mentre lo sfondo si striscia in scie orizzontali.',
        'È la tecnica classica per dare velocità ad auto, moto, ciclisti e animali in corsa.',
      ],
    },
    {
      heading: 'Tempo e tecnica',
      paragraphs: [
        'Il tempo si sceglie in base alla velocità: 1/30–1/60 s per un’auto, più lungo per soggetti lenti. Troppo breve e lo sfondo non si striscia abbastanza; troppo lungo ed è difficile tenere il soggetto a fuoco.',
        'Conta il movimento fluido: si ruota con il corpo seguendo il soggetto, scattando a raffica per aumentare le probabilità di uno scatto nitido.',
      ],
    },
  ],

  crop: [
    {
      heading: 'Cosa cambia con la dimensione',
      paragraphs: [
        'Il sensore registra solo la parte centrale dell’immagine proiettata dall’obiettivo: un sensore più piccolo “ritaglia” un’inquadratura più stretta. È l’effetto crop.',
        'Il fattore di crop misura il ritaglio rispetto al full frame (APS-C ~1.5×, Micro 4/3 2.0×): moltiplicando la focale per il crop si ottiene la focale equivalente.',
      ],
    },
    {
      heading: 'Vantaggi e compromessi',
      paragraphs: [
        'I sensori più piccoli rendono i teleobiettivi “più lunghi” (utile per sport e natura) e permettono corpi e ottiche più compatti.',
        'In cambio raccolgono meno luce (più rumore ad alti ISO) e, a parità di inquadratura, offrono meno stacco dallo sfondo rispetto al full frame.',
      ],
    },
  ],

  diffraction: [
    {
      heading: 'Lo sweet spot dell’obiettivo',
      paragraphs: [
        'A tutta apertura gli obiettivi soffrono di aberrazioni che ammorbidiscono l’immagine; chiudendo migliorano, fino a un punto ottimale (di solito f/5.6–f/8).',
        'Oltre quel punto entra in gioco la diffrazione: a f/16–f/22 l’immagine torna a perdere nitidezza, in modo uniforme su tutto il fotogramma.',
      ],
    },
    {
      heading: 'Quando chiudere comunque',
      paragraphs: [
        'Se serve molta profondità di campo (paesaggi, macro) può valere la pena accettare un po’ di diffrazione: una nitidezza diffusa è preferibile a uno sfocato netto fuori dal piano di fuoco.',
        'Sui sensori piccoli la diffrazione si nota prima (a numeri f più bassi), perché i fotositi sono più fitti.',
      ],
    },
  ],

  portrait: [
    {
      heading: 'La prospettiva è questione di distanza',
      paragraphs: [
        'Avvicinandoti molto al volto, i tratti più vicini all’obiettivo (il naso) si ingrandiscono rispetto a quelli lontani (orecchie): nasce la classica “distorsione” da grandangolo, anche se è la distanza ravvicinata a causarla.',
        'Allontanandoti e usando una focale più lunga per riempire l’inquadratura, le proporzioni del viso tornano naturali.',
      ],
    },
    {
      heading: 'Focali da ritratto',
      paragraphs: [
        'Per ritratti gradevoli si scatta tipicamente da 1,5–3 m con focali medio-lunghe (85–135mm su full frame): comprimono leggermente e lusingano i lineamenti.',
        'I grandangoli da vicino vanno usati con consapevolezza, per effetti voluti o ritratti ambientati, non per primi piani.',
      ],
    },
  ],

  hyperfocal: [
    {
      heading: 'La messa a fuoco che massimizza il nitido',
      paragraphs: [
        'La distanza iperfocale (H) è la messa a fuoco che rende nitido tutto da H/2 fino all’infinito. È preziosa per paesaggi e street, dove vuoi profondità di campo massima.',
        'H dipende da focale, apertura e sensore: chiudendo il diaframma o usando focali corte, H si avvicina e la zona nitida si estende.',
      ],
    },
    {
      heading: 'Zone focusing',
      paragraphs: [
        'Mettendo a fuoco sull’iperfocale (o impostando la distanza in manuale) puoi scattare senza rifocheggiare ogni volta: tutto entro la zona resta accettabilmente nitido.',
        'È la tecnica dello “scatto rapido” street: imposti f/8, fuoco sull’iperfocale, e sei pronto a cogliere l’attimo.',
      ],
    },
  ],

  metering: [
    {
      heading: 'Come la fotocamera misura la luce',
      paragraphs: [
        'L’esposimetro non vede i colori: misura la luce e cerca di rendere ciò che inquadra un grigio medio (18%). Le modalità decidono quale parte della scena pesare.',
        'Matrix (valutativa) media tutta la scena; la pesata-al-centro privilegia il centro; lo spot legge solo un piccolo punto.',
      ],
    },
    {
      heading: 'Quando usarle',
      paragraphs: [
        'Matrix va bene per la maggior parte delle scene equilibrate. Lo spot è prezioso nei controluce o nelle scene a forte contrasto, per esporre esattamente il soggetto.',
        'Ricorda: la misura mira al grigio medio, quindi la neve o una pagina nera ingannano l’esposimetro — serve compensare.',
      ],
    },
  ],

  stabilization: [
    {
      heading: 'Il tempo di sicurezza',
      paragraphs: [
        'A mano libera il tremolio delle mani produce mosso se il tempo è troppo lungo. La regola classica: tempo ≥ 1/(focale equivalente). Con un 200mm, almeno 1/200 s.',
        'Più lunga è la focale, più il tremolio è amplificato: i teleobiettivi richiedono tempi più rapidi.',
      ],
    },
    {
      heading: 'Cosa fa la stabilizzazione',
      paragraphs: [
        'Gli stabilizzatori (ottici, sul sensore o entrambi) compensano i micromovimenti e fanno guadagnare 3–5 stop: puoi usare tempi molto più lunghi a mano libera.',
        'Attenzione: la stabilizzazione non congela il soggetto in movimento, solo il tremolio della fotocamera. Per soggetti mossi serve comunque un tempo rapido.',
      ],
    },
  ],

  flash: [
    {
      heading: 'Il tempo di sincronizzazione',
      paragraphs: [
        'L’otturatore a tendina espone tutto il sensore in una volta sola fino a un certo tempo (il sync, spesso 1/200–1/250 s). Più veloce, e le due tendine formano una fessura che corre sul sensore.',
        'Se il flash lampeggia mentre c’è una fessura, illumina solo la parte scoperta: il resto resta una banda nera.',
      ],
    },
    {
      heading: 'Lavorare con e oltre il sync',
      paragraphs: [
        'Per congelare con il flash resta entro il tempo di sincro. Per scattare più veloci (es. flash di schiarita in pieno sole) serve l’High-Speed Sync (HSS), che fa lampeggiare il flash in rapida sequenza.',
        'In alternativa, riduci la luce ambiente con diaframma e ISO invece che con tempi oltre il sync.',
      ],
    },
  ],

  bracketing: [
    {
      heading: 'Quando una posa non basta',
      paragraphs: [
        'Il sensore cattura una gamma dinamica limitata (intorno a 10–14 stop). In scene a fortissimo contrasto (interno con finestra, tramonto) una sola esposizione non tiene insieme alte luci e ombre.',
        'Il bracketing scatta più foto a esposizioni diverse (sotto, corretta, sopra) per coprire l’intera gamma.',
      ],
    },
    {
      heading: 'Fondere in HDR',
      paragraphs: [
        'Unendo le pose (HDR) si recuperano i dettagli sia nelle alte luci sia nelle ombre. Lo spaziamento tra gli scatti (in EV) decide quanta gamma copri.',
        'Serve un soggetto fermo (o un treppiede): per scene in movimento il bracketing è più difficile da fondere senza artefatti.',
      ],
    },
  ],

  filters: [
    {
      heading: 'A che servono i filtri',
      paragraphs: [
        'I filtri si montano davanti all’obiettivo e modificano la luce prima che raggiunga il sensore. I due più usati sono il filtro a densità neutra (ND) e il polarizzatore circolare (CPL).',
        'A differenza di molti effetti, ciò che fanno non è del tutto replicabile in post: l’ND cambia il tempo di posa reale, il polarizzatore agisce fisicamente sulla luce polarizzata.',
      ],
    },
    {
      heading: 'ND: rallentare il tempo',
      paragraphs: [
        'Il filtro ND è un “vetro scuro” neutro: riduce la luce di un certo numero di stop senza alterare i colori. Serve per usare tempi lunghi in pieno giorno: acqua setosa, nuvole mosse, folle che spariscono.',
        'Un ND da 6 stop trasforma 1/125 s in circa mezzo secondo; un ND molto denso (10 stop) porta a pose di molti secondi.',
      ],
      points: [
        'ND a stop fissi: ND8 = 3 stop, ND64 = 6 stop, ND1000 = 10 stop.',
        'Sempre su treppiede: i tempi lunghi richiedono stabilità.',
      ],
    },
    {
      heading: 'Polarizzatore: togliere i riflessi',
      paragraphs: [
        'Il polarizzatore taglia la luce polarizzata: elimina i riflessi su acqua e vetro, riduce l’abbagliamento delle foglie bagnate e satura il cielo rendendolo di un blu più profondo.',
        'L’effetto si regola ruotando il filtro ed è massimo inquadrando a 90° rispetto al sole; cala quasi a zero puntando verso o contro il sole.',
      ],
    },
  ],

  modes: [
    {
      heading: 'P, A, S, M: chi decide cosa',
      paragraphs: [
        'Le modalità di scatto stabiliscono quali parametri imposti tu e quali calcola la fotocamera per ottenere l’esposizione corretta. ISO a parte, i parametri in gioco sono apertura e tempo.',
        'Non esiste una modalità “migliore”: cambia solo chi tiene il controllo. I fotografi esperti usano spesso A o M.',
      ],
    },
    {
      heading: 'Le priorità: A e S',
      paragraphs: [
        'In Priorità diaframmi (A o Av) scegli l’apertura — quindi la profondità di campo — e la camera calcola il tempo. È la modalità più usata: controlli lo sfocato e lasci che la macchina pensi all’esposizione.',
        'In Priorità tempi (S o Tv) scegli il tempo — quindi il mosso — e la camera regola l’apertura. Utile per sport e azione, dove congelare (o lasciare la scia) è la priorità.',
      ],
    },
    {
      heading: 'Programma e Manuale',
      paragraphs: [
        'In Programma (P) la camera sceglie sia tempo sia apertura su una “linea programma” equilibrata; tu puoi spostarla (program shift). È un automatismo intelligente per scatti veloci.',
        'In Manuale (M) imposti entrambi: pieno controllo, ma se non leggi l’esposimetro rischi foto troppo chiare o scure. Indispensabile in luce costante o con il flash in studio.',
      ],
    },
  ],

  raw: [
    {
      heading: 'Due formati, due filosofie',
      paragraphs: [
        'Il JPEG è la foto “già sviluppata”: la fotocamera applica bilanciamento del bianco, contrasto, nitidezza e comprime tutto a 8 bit. Pronto all’uso, ma con pochi dati per modifiche spinte.',
        'Il RAW è il dato grezzo del sensore (di solito 12–14 bit): nessuno sviluppo applicato in modo definitivo, molti più livelli tonali, file più pesanti che richiedono un programma di sviluppo.',
      ],
    },
    {
      heading: 'La latitudine di recupero',
      paragraphs: [
        'La differenza pratica si vede quando “spingi” il file in post: alzando le ombre o recuperando le alte luci il RAW mantiene gradazioni pulite, mentre il JPEG mostra banding (gradini), rumore di colore e zone bruciate non recuperabili.',
        'Con 8 bit hai 256 livelli per canale; con 14 bit oltre 16.000. Tirare molto un JPEG “finisce i livelli” molto prima.',
      ],
      points: [
        'Scatta in RAW se prevedi di editare o in scene difficili.',
        'JPEG va bene se esposizione e bilanciamento sono già giusti e serve velocità.',
      ],
    },
  ],

  dynamic: [
    {
      heading: 'Che cos’è la gamma dinamica',
      paragraphs: [
        'La gamma dinamica è l’intervallo, misurato in stop, tra l’ombra più scura e l’alta luce più chiara che il sensore registra con dettaglio. I sensori moderni arrivano intorno a 12–15 stop.',
        'Se la scena è più contrastata della gamma del sensore qualcosa va perso: le alte luci bruciano (bianco puro) o le ombre si chiudono (nero pieno), a seconda di come esponi.',
      ],
    },
    {
      heading: 'I bit: i gradini del tono',
      paragraphs: [
        'La profondità di bit non è la gamma dinamica: indica in quanti livelli viene suddiviso quell’intervallo. 8 bit = 256 livelli per canale, 12 bit = 4096, 14 bit = 16.384.',
        'Pochi livelli, dopo un editing pesante, producono banding: le sfumature morbide (un cielo) diventano fasce a gradini. Più bit significano transizioni più fluide.',
      ],
      points: [
        'Esporre “a destra” (ETTR) sfrutta meglio i livelli disponibili.',
        'Scene oltre la gamma: RAW + bracketing o filtri GND.',
      ],
    },
  ],

  colorSpace: [
    {
      heading: 'Che cos’è uno spazio colore',
      paragraphs: [
        'Uno spazio colore definisce quali colori un’immagine può rappresentare — il suo “gamut” — e come i numeri dei pixel si traducono in colori reali. Gli stessi valori RGB appaiono diversi in spazi diversi.',
        'I tre più comuni in fotografia sono sRGB, Adobe RGB e ProPhoto RGB, in ordine di ampiezza crescente del gamut.',
      ],
    },
    {
      heading: 'sRGB, Adobe RGB, ProPhoto',
      paragraphs: [
        'sRGB è lo standard del web e della maggior parte degli schermi: gamut più piccolo ma “sicuro”, perché è ciò che quasi tutti i dispositivi mostrano. Adobe RGB è più ampio soprattutto nei verdi-ciano, utile per la stampa.',
        'ProPhoto RGB è enorme — include colori che nessun monitor mostra — e si usa solo in editing a 16 bit per non perdere sfumature; a 8 bit rischia banding.',
      ],
      points: [
        'Esporta in sRGB per web e condivisione: evita colori spenti sui browser non gestiti.',
        'Lavora in Adobe RGB/ProPhoto a 16 bit se stampi o editi pesantemente.',
        'Il RAW non ha uno spazio colore finché non lo sviluppi: lo scegli in esportazione.',
      ],
    },
    {
      heading: 'Gestione del colore',
      paragraphs: [
        'Perché i colori restino coerenti, il profilo (ICC) deve “viaggiare” con il file e gli schermi vanno calibrati. Un’immagine Adobe RGB vista come sRGB appare desaturata.',
        'In pratica: scatta in RAW, edita in uno spazio ampio a 16 bit, esporta in sRGB per lo schermo e nel profilo richiesto dal laboratorio per la stampa.',
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
        'Each “stop” doubles or halves the time, and so the amount of light gathered: going from 1/250 to 1/125 lets in twice the light.',
      ],
    },
    {
      heading: 'Freeze or let motion flow',
      paragraphs: [
        'A short time “freezes” the action: during the exposure the subject moves very little. A long time records the movement as a trail (blur).',
        'How much blur depends on three factors: the subject’s speed, the shutter time, and how large the subject is in the frame (focal length and distance).',
      ],
      points: [
        'Sports and action: 1/1000 s or faster to freeze.',
        'People walking: 1/250 s is usually enough.',
        'Silky water or light trails: from 1/4 s to several seconds, on a tripod.',
      ],
    },
    {
      heading: 'The safe shutter speed rule',
      paragraphs: [
        'Handheld, the tiny shake of your hands causes blur. A classic rule: never use a time longer than 1/(equivalent focal length). With a 200mm, at least 1/200 s.',
        'Stabilisers (in-lens or in-body) gain 3–5 stops, allowing much longer handheld times.',
      ],
    },
    {
      heading: 'Blur as a creative choice',
      paragraphs: [
        'Blur isn’t always a mistake. Panning — following the subject at medium times (1/30–1/60 s) — keeps it sharp against a streaked background, conveying speed. Long exposures turn crowds, clouds and water into soft flows.',
      ],
    },
  ],

  aperture: [
    {
      heading: 'What the aperture is',
      paragraphs: [
        'The aperture is an iris of blades that sets the diameter of the hole light passes through. It is expressed by the f-number (f/1.4, f/2.8, f/8…), the ratio of focal length to entrance-pupil diameter.',
        'Small f-numbers mean wide apertures (lots of light); large ones, narrow apertures (little light). The full-stop sequence — 1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22 — doubles or halves the area at each step.',
      ],
    },
    {
      heading: 'Depth of field',
      paragraphs: [
        'Depth of field is the range of distances that appears in focus. It depends on aperture (wider → shallower), focus distance (closer → shallower), focal length and sensor size.',
        'The hyperfocal distance is the focus setting that maximises the sharp zone: focused on it, everything from half that distance to infinity is acceptably sharp.',
      ],
      formula: 'H = f² / (N · c) + f   ·   depth ↑ as N closes',
    },
    {
      heading: 'Bokeh: the quality of the blur',
      paragraphs: [
        'Bokeh is the look of the out-of-focus areas. Point lights in the background become discs, bigger the wider the aperture. The number and shape of the aperture blades set their shape: more rounded blades give softer circles.',
      ],
    },
    {
      heading: 'Beware of diffraction',
      paragraphs: [
        'Closing the aperture a lot (f/16, f/22) extends depth of field but introduces diffraction, which slightly softens the whole image. Peak sharpness is often 2–3 stops below the maximum aperture: the lens’s “sweet spot”.',
      ],
    },
  ],

  iso: [
    {
      heading: 'What ISO is',
      paragraphs: [
        'ISO indicates how much the sensor signal is amplified. Raising it brightens the image without changing time or aperture: each doubling (100 → 200 → 400) is +1 stop of brightness.',
        'The amplification, though, doesn’t tell useful signal from noise: the higher the ISO, the more visible the grain.',
      ],
    },
    {
      heading: 'Where noise comes from',
      paragraphs: [
        'There are two main components: read noise (from the electronics) and “shot” noise (the statistical nature of photons). In low light few photons arrive, the signal-to-noise ratio (SNR) collapses and grain emerges — especially in the shadows, where the signal is weakest.',
      ],
      points: [
        'Low ISO (100–400): clean image, maximum dynamic range.',
        'Medium ISO (800–3200): manageable noise, useful indoors.',
        'High ISO (6400+): obvious grain, reduced dynamic range.',
      ],
    },
    {
      heading: 'Dynamic range and strategy',
      paragraphs: [
        'As ISO rises, dynamic range drops — the ability to record highlights and shadows together. Use the lowest ISO compatible with the shutter and aperture the shot needs.',
        'Many sensors have one or two “native ISOs” where they perform best (dual-gain), and some are nearly “ISO-invariant”. When in doubt, expose to the right without blowing the highlights.',
      ],
    },
  ],

  focal: [
    {
      heading: 'Focal length and angle of view',
      paragraphs: [
        'Focal length (in mm) sets how much you frame: short focal lengths (16–35mm) have a wide angle of view, long ones (100–300mm) a narrow angle that magnifies distant subjects.',
        'The angle of view also depends on sensor size: the same 50mm on a smaller sensor frames less (the “crop” effect). The crop factor compares focal lengths across formats: 50mm on APS-C ≈ 75mm equivalent.',
      ],
    },
    {
      heading: 'Perspective and compression: distance is what counts',
      paragraphs: [
        'Contrary to intuition, focal length doesn’t change perspective: the distance from the subject does. A telephoto “compresses” the background because you usually use it from far; a wide angle “expands” because you get close.',
        'The proof is the dolly zoom: if you step back and lengthen the focal length to keep the subject the same size, the background changes scale while the subject stays identical.',
      ],
    },
    {
      heading: 'Distortion and portraits',
      paragraphs: [
        'Using a wide angle very close exaggerates the features nearest the lens (the nose, in portraits). For portraits, medium-long focal lengths (85–135mm) from a greater distance are preferred, giving more natural proportions.',
      ],
    },
  ],

  triangle: [
    {
      heading: 'Three parameters, one exposure',
      paragraphs: [
        'Shutter, aperture and ISO together set the exposure. They are measured in “stops”: each stop doubles or halves the light. The same exposure can be reached with countless equivalent combinations.',
      ],
    },
    {
      heading: 'Reciprocity and compensation',
      paragraphs: [
        'If you open the aperture by one stop (more light) you can shorten the shutter by one stop (less light) to keep the same brightness: the look changes — depth of field, blur, noise — but not the overall exposure.',
        'EV (Exposure Value) sums up this relationship: combinations with the same EV give the same brightness for the same scene light.',
      ],
      formula: 'EV = log₂(N² / t)   ·   at ISO 100',
    },
    {
      heading: 'Which parameter to prioritise',
      paragraphs: [
        'It depends on intent. Want a blurred background? Start from the aperture (aperture priority). Need to freeze motion? Start from the shutter (shutter priority). ISO is the last lever: raise it only as much as needed to get the desired shutter and aperture.',
      ],
    },
    {
      heading: 'Reading the histogram',
      paragraphs: [
        'The histogram shows the tone distribution: shadows on the left, highlights on the right. A hump squashed to the right with “clipped” values means blown highlights (unrecoverable); to the left, blocked shadows. A meter at 0 indicates correct exposure for the scene’s average.',
      ],
    },
  ],

  histogram: [
    {
      heading: 'Reading the tones',
      paragraphs: [
        'The histogram is a graph of the tone distribution: shadows on the left, midtones in the centre, highlights on the right. The height shows how many pixels have that value.',
        'There’s no absolutely “right” histogram: it depends on the scene. A dark scene has its hump on the left, a bright one on the right.',
      ],
    },
    {
      heading: 'Avoiding clipping',
      paragraphs: [
        'When tones pile up against an edge they are “clipped”: blown highlights become pure white without detail, blocked shadows pure black. These are unrecoverable losses.',
        'The “expose to the right” (ETTR) technique pushes the histogram as far right as possible without blowing the highlights, maximising the signal and reducing shadow noise.',
      ],
    },
  ],

  whiteBalance: [
    {
      heading: 'The colour of light',
      paragraphs: [
        'Every source has a colour temperature, in kelvin: candle and sunset are warm (2000–3000 K, orange), midday sun is neutral (~5500 K), shade and overcast sky are cool (7000–9000 K, blue).',
        'White balance tells the camera the colour of the light, so whites come back to neutral and unwanted casts are avoided.',
      ],
    },
    {
      heading: 'Neutralise or interpret',
      paragraphs: [
        'Setting the right temperature removes the cast; getting it wrong on purpose is a creative tool: a warm cast makes a portrait welcoming, a cool one more severe.',
        'In RAW, white balance can be changed freely in post; in JPEG it’s better to nail it at capture.',
      ],
    },
  ],

  panning: [
    {
      heading: 'Following the subject',
      paragraphs: [
        'In panning you follow the moving subject with the camera while shooting at a relatively long time: the subject, still relative to the frame, stays sharp, while the background streaks in horizontal trails.',
        'It’s the classic technique to convey speed in cars, motorbikes, cyclists and running animals.',
      ],
    },
    {
      heading: 'Time and technique',
      paragraphs: [
        'The time is chosen by speed: 1/30–1/60 s for a car, longer for slow subjects. Too short and the background doesn’t streak enough; too long and it’s hard to keep the subject sharp.',
        'Smooth movement matters: rotate with your body following the subject, shooting in bursts to improve the odds of a sharp frame.',
      ],
    },
  ],

  crop: [
    {
      heading: 'What changes with size',
      paragraphs: [
        'The sensor records only the central part of the image the lens projects: a smaller sensor “crops” a tighter framing. That’s the crop effect.',
        'The crop factor measures the crop relative to full frame (APS-C ~1.5×, Micro 4/3 2.0×): multiply the focal length by the crop to get the equivalent focal length.',
      ],
    },
    {
      heading: 'Benefits and trade-offs',
      paragraphs: [
        'Smaller sensors make telephotos “longer” (useful for sports and wildlife) and allow more compact bodies and lenses.',
        'In exchange they gather less light (more noise at high ISO) and, for the same framing, give less subject separation than full frame.',
      ],
    },
  ],

  diffraction: [
    {
      heading: 'The lens sweet spot',
      paragraphs: [
        'Wide open, lenses suffer from aberrations that soften the image; stopping down improves things, up to an optimal point (usually f/5.6–f/8).',
        'Past that point diffraction kicks in: at f/16–f/22 the image loses sharpness again, uniformly across the whole frame.',
      ],
    },
    {
      heading: 'When to stop down anyway',
      paragraphs: [
        'If you need lots of depth of field (landscapes, macro) it can be worth accepting some diffraction: a slight overall softness beats sharp out-of-focus areas.',
        'On small sensors diffraction shows up earlier (at lower f-numbers), because the photosites are more densely packed.',
      ],
    },
  ],

  portrait: [
    {
      heading: 'Perspective is about distance',
      paragraphs: [
        'Getting very close to a face, the features nearest the lens (the nose) grow relative to the far ones (ears): the classic wide-angle “distortion”, even though it’s the close distance that causes it.',
        'Stepping back and using a longer focal length to fill the frame, the face’s proportions return to natural.',
      ],
    },
    {
      heading: 'Portrait focal lengths',
      paragraphs: [
        'For flattering portraits you typically shoot from 1.5–3 m with medium-long focal lengths (85–135mm on full frame): they compress slightly and flatter the features.',
        'Wide angles up close should be used deliberately, for intended effects or environmental portraits, not for tight headshots.',
      ],
    },
  ],

  hyperfocal: [
    {
      heading: 'The focus that maximises sharpness',
      paragraphs: [
        'The hyperfocal distance (H) is the focus setting that keeps everything sharp from H/2 to infinity. It’s invaluable for landscapes and street, where you want maximum depth of field.',
        'H depends on focal length, aperture and sensor: closing the aperture or using short focal lengths brings H closer and extends the sharp zone.',
      ],
    },
    {
      heading: 'Zone focusing',
      paragraphs: [
        'Focusing on the hyperfocal (or setting the distance manually) lets you shoot without refocusing each time: everything within the zone stays acceptably sharp.',
        'It’s the street “snapshot” technique: set f/8, focus on the hyperfocal, and you’re ready to catch the moment.',
      ],
    },
  ],

  metering: [
    {
      heading: 'How the camera measures light',
      paragraphs: [
        'The meter doesn’t see colours: it measures light and tries to render what it frames as a middle grey (18%). The modes decide which part of the scene to weight.',
        'Matrix (evaluative) averages the whole scene; center-weighted favours the centre; spot reads only a small point.',
      ],
    },
    {
      heading: 'When to use them',
      paragraphs: [
        'Matrix works for most balanced scenes. Spot is invaluable in backlight or high-contrast scenes, to expose exactly for the subject.',
        'Remember: metering aims for middle grey, so snow or a black page fool the meter — you need to compensate.',
      ],
    },
  ],

  stabilization: [
    {
      heading: 'The safe shutter speed',
      paragraphs: [
        'Handheld, hand shake causes blur if the shutter is too long. The classic rule: shutter ≥ 1/(equivalent focal length). With a 200mm, at least 1/200 s.',
        'The longer the focal length, the more shake is amplified: telephotos demand faster shutters.',
      ],
    },
    {
      heading: 'What stabilisation does',
      paragraphs: [
        'Stabilisers (in-lens, in-body or both) compensate for micro-movements and gain 3–5 stops: you can use much longer handheld times.',
        'Note: stabilisation doesn’t freeze a moving subject, only camera shake. For moving subjects you still need a fast shutter.',
      ],
    },
  ],

  flash: [
    {
      heading: 'The flash sync speed',
      paragraphs: [
        'The focal-plane shutter exposes the whole sensor at once only up to a certain time (the sync, often 1/200–1/250 s). Faster, and the two curtains form a slit that travels across the sensor.',
        'If the flash fires while there’s a slit, it lights only the uncovered part: the rest stays a black band.',
      ],
    },
    {
      heading: 'Working with and beyond sync',
      paragraphs: [
        'To freeze with flash, stay within the sync speed. To shoot faster (e.g. fill flash in bright sun) you need High-Speed Sync (HSS), which pulses the flash in rapid sequence.',
        'Alternatively, cut the ambient light with aperture and ISO instead of shutter speeds beyond sync.',
      ],
    },
  ],

  bracketing: [
    {
      heading: 'When one exposure isn’t enough',
      paragraphs: [
        'The sensor captures a limited dynamic range (around 10–14 stops). In very high-contrast scenes (interior with a window, sunset) a single exposure can’t hold highlights and shadows together.',
        'Bracketing takes several shots at different exposures (under, correct, over) to cover the whole range.',
      ],
    },
    {
      heading: 'Merging into HDR',
      paragraphs: [
        'Merging the shots (HDR) recovers detail in both highlights and shadows. The spacing between shots (in EV) decides how much range you cover.',
        'It needs a still subject (or a tripod): for moving scenes bracketing is harder to merge without artefacts.',
      ],
    },
  ],

  filters: [
    {
      heading: 'What filters are for',
      paragraphs: [
        'Filters mount in front of the lens and change the light before it reaches the sensor. The two most used are the neutral density (ND) filter and the circular polariser (CPL).',
        'Unlike many effects, what they do is not fully reproducible in post: the ND changes the actual shutter time, the polariser physically acts on polarised light.',
      ],
    },
    {
      heading: 'ND: slowing time down',
      paragraphs: [
        'The ND filter is a neutral “dark glass”: it cuts light by a set number of stops without shifting colours. It lets you use long shutter speeds in broad daylight: silky water, streaking clouds, vanishing crowds.',
        'A 6-stop ND turns 1/125 s into about half a second; a very dense ND (10 stops) leads to exposures of many seconds.',
      ],
      points: [
        'ND in fixed stops: ND8 = 3 stops, ND64 = 6 stops, ND1000 = 10 stops.',
        'Always on a tripod: long exposures need stability.',
      ],
    },
    {
      heading: 'Polariser: removing reflections',
      paragraphs: [
        'The polariser cuts polarised light: it removes reflections on water and glass, reduces glare from wet leaves and saturates the sky into a deeper blue.',
        'The effect is set by rotating the filter and peaks when you shoot at 90° to the sun; it drops almost to zero pointing toward or away from the sun.',
      ],
    },
  ],

  modes: [
    {
      heading: 'P, A, S, M: who decides what',
      paragraphs: [
        'Shooting modes set which parameters you choose and which the camera works out for a correct exposure. ISO aside, the parameters in play are aperture and shutter.',
        'There is no “best” mode: it only changes who keeps control. Experienced photographers often use A or M.',
      ],
    },
    {
      heading: 'The priorities: A and S',
      paragraphs: [
        'In Aperture priority (A or Av) you pick the aperture — and so depth of field — and the camera works out the shutter. It is the most used mode: you control the blur and let the camera handle exposure.',
        'In Shutter priority (S or Tv) you pick the shutter — and so motion blur — and the camera sets the aperture. Useful for sports and action, where freezing (or streaking) is the priority.',
      ],
    },
    {
      heading: 'Program and Manual',
      paragraphs: [
        'In Program (P) the camera picks both shutter and aperture on a balanced “program line”; you can shift it (program shift). It is a smart auto mode for quick shots.',
        'In Manual (M) you set both: full control, but ignore the meter and you risk photos that are too bright or dark. Essential in constant light or with studio flash.',
      ],
    },
  ],

  raw: [
    {
      heading: 'Two formats, two philosophies',
      paragraphs: [
        'JPEG is the “already developed” photo: the camera applies white balance, contrast, sharpening and compresses everything to 8 bit. Ready to use, but with little data for heavy edits.',
        'RAW is the sensor’s raw data (usually 12–14 bit): no development baked in, far more tonal levels, heavier files that need a development app.',
      ],
    },
    {
      heading: 'Recovery latitude',
      paragraphs: [
        'The practical difference shows when you push the file in post: lifting shadows or pulling back highlights, RAW keeps clean gradations while JPEG shows banding (steps), colour noise and blown areas you cannot recover.',
        'With 8 bit you have 256 levels per channel; with 14 bit over 16,000. Push a JPEG hard and it “runs out of levels” far sooner.',
      ],
      points: [
        'Shoot RAW if you plan to edit or in tricky scenes.',
        'JPEG is fine when exposure and white balance are already right and speed matters.',
      ],
    },
  ],

  dynamic: [
    {
      heading: 'What dynamic range is',
      paragraphs: [
        'Dynamic range is the interval, measured in stops, between the darkest shadow and the brightest highlight the sensor records with detail. Modern sensors reach around 12–15 stops.',
        'If the scene is more contrasty than the sensor’s range, something is lost: highlights blow (pure white) or shadows crush (solid black), depending on how you expose.',
      ],
    },
    {
      heading: 'Bits: the steps of tone',
      paragraphs: [
        'Bit depth is not dynamic range: it states into how many levels that interval is split. 8 bit = 256 levels per channel, 12 bit = 4096, 14 bit = 16,384.',
        'Few levels, after heavy editing, produce banding: smooth gradients (a sky) turn into stepped bands. More bits mean smoother transitions.',
      ],
      points: [
        'Exposing “to the right” (ETTR) makes better use of the available levels.',
        'Scenes beyond the range: RAW + bracketing or GND filters.',
      ],
    },
  ],

  colorSpace: [
    {
      heading: 'What a colour space is',
      paragraphs: [
        'A colour space defines which colours an image can represent — its “gamut” — and how the pixel numbers translate into real colours. The same RGB values look different in different spaces.',
        'The three most common in photography are sRGB, Adobe RGB and ProPhoto RGB, in order of increasing gamut size.',
      ],
    },
    {
      heading: 'sRGB, Adobe RGB, ProPhoto',
      paragraphs: [
        'sRGB is the standard of the web and of most screens: the smallest gamut, but “safe”, because it is what nearly every device shows. Adobe RGB is wider especially in the green-cyans, useful for print.',
        'ProPhoto RGB is huge — it includes colours no monitor can show — and is used only in 16-bit editing to avoid losing gradations; at 8 bit it risks banding.',
      ],
      points: [
        'Export in sRGB for web and sharing: avoids dull colours on unmanaged browsers.',
        'Work in Adobe RGB/ProPhoto at 16 bit if you print or edit heavily.',
        'RAW has no colour space until you develop it: you choose it on export.',
      ],
    },
    {
      heading: 'Colour management',
      paragraphs: [
        'For colours to stay consistent, the profile (ICC) must “travel” with the file and screens must be calibrated. An Adobe RGB image shown as sRGB looks desaturated.',
        'In practice: shoot RAW, edit in a wide space at 16 bit, export in sRGB for the screen and in the profile your lab asks for when printing.',
      ],
    },
  ],
};

/** Restituisce i blocchi di teoria per il concetto e la lingua (fallback all'italiano). */
export function theoryFor(id: string, locale: Locale): TheoryBlock[] {
  return (locale === 'en' ? THEORY_EN[id] : THEORY[id]) ?? THEORY[id] ?? [];
}
