# r1-creations

Mini web apps statiques pour le Rabbit R1 (240×282, HTML/CSS/JS vanilla, zéro build).
Chaque app s'installe séparément sur le R1 en scannant le QR de sa page `install.html`.

## Apps

| App | Dossier | Installer (QR) | Description | Contrôles |
|---|---|---|---|---|
| 📊 **HL Perps** | `/` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/install.html) | Positions perp Hyperliquid en lecture seule | Molette/swipe = position · clic latéral = ordres |
| 🃏 **Blackjack** | `/blackjack` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/blackjack/install.html) | Blackjack, bankroll persistante, BJ 3:2, stats | Molette = mise · tap = distribuer · appui long solde = reset |
| 🎤 **Tâches** | `/taches` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/taches/install.html) | Tâches dictées au PTT, aujourd'hui/plus tard, streak | PTT = dicter · tap = cocher · swipe = section · long = supprimer |
| 📡 **Funding Radar** | `/funding` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/funding/install.html) | Funding trié, horaire + annualisé, ⚡ >30 %/an | Molette = défiler · clic latéral = refresh |
| 📈 **Guess the Chart** | `/chart-game` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/chart-game/install.html) | 40 bougies mystères, LONG ou SHORT, révélation | Tap = parier · molette = manche suivante |
| 🎾 **Score de Padel** | `/padel` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/padel/install.html) | Score réel, avantage/no-ad, tie-break, historique | Tap haut/bas = point · long = annuler · clic latéral = historique |
| 🚨 **Market Watch** | `/market-watch` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/market-watch/install.html) | Alertes de prix (BTC, XYZ100…), seuil % / fenêtre réglables, plein écran + bip + vibration | Molette = régler · clic latéral = seuil/fenêtre · long = watchlist |
| ♠️ **Poker vs IA** | `/poker` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/poker/install.html) | Hold'em NL, 3 bots à personnalités (rock/LAG/fish), side pots, blinds croissantes en option | Molette = relance · tap = actions · clic latéral = check/call |
| 🐋 **Whale Tape** | `/whale-tape` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/whale-tape/install.html) | Trades ≥ 500k/1M/5M $ en WebSocket, reconnexion auto | Molette = coin · tap = seuil |
| 🌏 **Carnet Asie** | `/carnet-asie` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/carnet-asie/install.html) | J−XXX avant le départ, dépenses dictées (« café 450 yens »), totaux jour/pays, taux cachés offline | PTT = dicter · molette = défiler · long = supprimer/régler |
| 🇯🇵 **Flashcards JP/KR** | `/flashcards` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/flashcards/install.html) | Hiragana, katakana, hangul + 149 phrases de survie, SRS Leitner, streak | Molette = naviguer · tap = retourner · bon/raté |
| 🎮 **LoL Live HUD** | `/lol-hud` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/lol-hud/install.html) | Score, KDA/CS/or, 10 joueurs, objectifs — via bridge local + Worker | Molette = joueurs · clic latéral = refresh |
| 🎬 **Ciné-Roulette** | `/cine` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/cine/install.html) | Watchlist dictée, roulette durée + envie, notes /10, stats | PTT = dicter · clic latéral = roulette/stats · tap = noter |
| ⛳ **Golf** | `/golf` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/golf/install.html) | Carte de score 9/18 trous, par configurable, historique par parcours | Molette = coups · long = annuler · clic latéral = historique |
| 🎧 **Blind Test Rap** | `/blind-test` | [QR](https://hugoboiarsky7-create.github.io/r1-creations/blind-test/install.html) | Extraits 30 s iTunes, 3 playlists (rap FR 2010s, classiques, récent), mode duel | Molette = playlist · tap = révéler · bon/raté |

## Installation sur le R1

1. Ouvrir la page `install.html` de l'app (liens QR ci-dessus) sur PC ou téléphone.
2. Sur le R1 : onglet **create → add via QR code** → scanner.
3. La creation apparaît en bas de la pile de cartes.

## Mise à jour d'une app

Le R1 met en cache l'URL d'installation : après une modif, bumper `?v=N` dans
le `install.html` de l'app concernée, pousser, puis rescanner le QR.

## LoL Live HUD — installation du pipeline

Le HUD a besoin de deux briques en plus de la creation :

1. **Worker Cloudflare** (relay) : le code est dans `lol-hud/worker.js`.
   - `npm i -g wrangler` puis `wrangler login`
   - dans un dossier vide : `wrangler init lol-hud-relay` (Hello World), remplacer `src/index.js` par `worker.js`, changer `SECRET`
   - `wrangler deploy` → note l'URL `https://….workers.dev`
2. **Bridge local** (`lol-hud/bridge/bridge.py`) : mettre `WORKER_URL` + le même `SECRET`, puis
   `pip install requests` et `python bridge.py` avant une partie.
3. Dans `lol-hud/index.html`, renseigner `WORKER_URL`, pousser, bumper le `?v=` et rescanner.

Mode démo sans partie : ouvrir la creation avec `?mock=1`.

## Notes techniques

- Viewport R1 : 240×282, événements natifs `scrollUp`/`scrollDown`/`sideClick`/`longPressStart`/`longPressEnd`.
- Voix : `CreationVoiceHandler` (bridge natif R1) avec repli clavier si indisponible.
- Persistance : `localStorage`, préfixes par app (`bj_`, `tk_`, `cg_`, `pd_`, `mw_`, `pk_`, `wt_`, `ca_`, `fc_`, `cn_`, `gf_`, `bt_`) — même origine GitHub Pages.
- APIs publiques sans clé : `api.hyperliquid.xyz` (info + WebSocket, CORS ouvert), `api.frankfurter.dev` (taux), `itunes.apple.com/search` (extraits 30 s).
- Apps 100 % offline : blackjack, tâches, padel, poker, flashcards, ciné, golf.
- Basé sur les tips de [rabbit-r1-creations-public](https://github.com/andr3w-hilton/rabbit-r1-creations-public).
