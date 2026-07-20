"""
LoL HUD — bridge local.
Poll l'API Live Client Data du client LoL (https://127.0.0.1:2999)
toutes les 2 s et pousse le JSON vers le Worker Cloudflare.

Usage :
    pip install requests
    python bridge.py

À lancer AVANT ou PENDANT une partie. Ctrl+C pour arrêter.
"""

import json
import time

import requests
import urllib3

# ====== CONFIG — à adapter ======
WORKER_URL = "https://TON-WORKER.workers.dev"        # URL de ton Worker déployé
SECRET = "change-moi-petit-secret"                    # même valeur que dans worker.js
POLL_S = 2
# ================================

LOL_URL = "https://127.0.0.1:2999/liveclientdata/allgamedata"

# le certificat du client LoL est auto-signé : on ignore la vérification TLS
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


def main():
    print(f"Bridge LoL HUD -> {WORKER_URL}/update (poll {POLL_S}s)")
    in_game = False
    while True:
        try:
            r = requests.get(LOL_URL, verify=False, timeout=3)
            if r.status_code == 200:
                data = r.json()
                resp = requests.post(
                    f"{WORKER_URL}/update",
                    data=json.dumps(data),
                    headers={
                        "Content-Type": "application/json",
                        "X-Hud-Secret": SECRET,
                    },
                    timeout=5,
                )
                if not in_game:
                    print("Partie detectee, envoi en cours...")
                    in_game = True
                if resp.status_code != 200:
                    print(f"  worker: HTTP {resp.status_code} — {resp.text[:80]}")
            else:
                if in_game:
                    print("Partie terminee.")
                in_game = False
        except requests.exceptions.ConnectionError:
            # client LoL fermé ou pas en partie : on attend
            if in_game:
                print("Partie terminee (client injoignable).")
            in_game = False
        except Exception as e:  # noqa: BLE001 — on veut survivre à tout
            print(f"  erreur: {e}")
        time.sleep(POLL_S)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nBridge arrete.")
