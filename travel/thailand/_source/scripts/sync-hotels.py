from pathlib import Path
import json
root = Path(__file__).resolve().parents[1]
hotels = json.loads((root / 'public/hotels.json').read_text())
hotels = [{k:v for k,v in h.items() if k != 'historicalQuotes'} for h in hotels]
(root / 'public/hotel-data.js').write_text('/* Actual stay updated 2026-09-25. */\nwindow.TRIP_HOTELS = ' + json.dumps(hotels, ensure_ascii=False) + ';\n')
print(f'Synced {len(hotels)} actual hotel stay for the map.')
