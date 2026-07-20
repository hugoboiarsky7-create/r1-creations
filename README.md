# r1-creations

Mini web apps statiques pour le Rabbit R1 (240×282, HTML/CSS/JS vanilla, zéro build).
Chaque app s'installe séparément sur le R1 en scannant le QR de sa page `install.html`.

| App | Dossier | Installer (QR) | Description | Contrôles |
|---|---|---|---|---|
| 🃏 **Blackjack Bankroll** | `/blackjack` | [Install QR](https://hugoboiarsky7-create.github.io/r1-creations/blackjack/install.html) | Blackjack avec bankroll fictive persistante (départ 1 000 $), hit/stand/double/split, BJ payé 3:2, stats (winrate, plus gros gain, série) | Molette = mise · tap = distribuer · appui long sur le solde = reset caché |
| 🎤 **Tâches** | `/taches` | [Install QR](https://hugoboiarsky7-create.github.io/r1-creations/taches/install.html) | Capture vocale de tâches, sections AUJOURD'HUI / PLUS TARD, streak quotidien 🔥 | Maintien PTT = dicter · molette = parcourir · clic latéral ou tap = cocher · swipe = changer de section · appui long = supprimer |
| 📡 **Funding Radar** | `/funding` | [Install QR](https://hugoboiarsky7-create.github.io/r1-creations/funding/install.html) | Funding Hyperliquid trié par \|funding\|, horaire + annualisé, ⚡ si >30 %/an, mark price + OI, refresh 30 s | Molette = défiler · clic latéral = refresh + haut de liste |
| 📈 **Guess the Chart** | `/chart-game` | [Install QR](https://hugoboiarsky7-create.github.io/r1-creations/chart-game/install.html) | 40 bougies mystères (coin liquide Hyperliquid, fenêtre historique aléatoire) : LONG ou SHORT, puis révélation des 10 suivantes ; score et série persistants | Tap LONG/SHORT = parier · molette ou tap = manche suivante |
| 🎾 **Score de Padel** | `/padel` | [Install QR](https://hugoboiarsky7-create.github.io/r1-creations/padel/install.html) | Score réel (15/30/40, avantage ou no-ad, sets, tie-break à 6-6), historique des matchs et bilan par adversaire | Tap moitié haute/basse = point A/B · appui long = annuler · clic latéral = historique |
| 📊 **HL Perps** | `/` (racine) | [Install QR](https://hugoboiarsky7-create.github.io/r1-creations/install.html) | Positions perp Hyperliquid en lecture seule | Molette/swipe = position suivante · clic latéral ou tap = onglet ORDRES |

## URLs des apps

- https://hugoboiarsky7-create.github.io/r1-creations/blackjack/
- https://hugoboiarsky7-create.github.io/r1-creations/taches/
- https://hugoboiarsky7-create.github.io/r1-creations/funding/
- https://hugoboiarsky7-create.github.io/r1-creations/chart-game/
- https://hugoboiarsky7-create.github.io/r1-creations/padel/

## Installation sur le R1

1. Ouvrir la page `install.html` de l'app (liens ci-dessus) sur PC ou téléphone.
2. Scanner le QR avec la caméra du R1 → installer.

## Mise à jour d'une app

Le R1 met en cache l'URL d'installation : après une modif, bumper `?v=N` dans
le `install.html` de l'app concernée, pousser, puis rescanner le QR.

## Notes techniques

- Viewport R1 : 240×282, événements natifs `scrollUp`/`scrollDown`/`sideClick`/`longPressStart`/`longPressEnd`.
- Voix : `CreationVoiceHandler` (bridge natif R1) avec repli clavier si indisponible.
- Persistance : `localStorage`, préfixes par app (`bj_`, `tk_`, `cg_`, `pd_`) — les apps partagent la même origine GitHub Pages.
- APIs : `https://api.hyperliquid.xyz/info` (publique, CORS ouvert, aucune clé). Blackjack, tâches et padel fonctionnent 100 % hors ligne.
- Basé sur les tips de [rabbit-r1-creations-public](https://github.com/andr3w-hilton/rabbit-r1-creations-public).
