# Photograph attribution

`public/phi-phi-lay.jpg` is an unchanged copy of “Isla Phi Phi Lay, Tailandia, 2013-08-19, DD 04” by Diego Delso (https://delso.photo), licensed under Creative Commons Attribution-ShareAlike 3.0 Unported.

Source: https://commons.wikimedia.org/wiki/File:Isla_Phi_Phi_Lay,_Tailandia,_2013-08-19,_DD_04.JPG

License: https://creativecommons.org/licenses/by-sa/3.0/

The web page displays the original proportions and includes visible credit. It is a historical Phi Phi Leh photograph, not a picture of Racha Yai and not a forecast of September conditions.
## Interactive map

- The embedded offline regional overview uses Natural Earth 1:10m country geometry (public domain): https://www.naturalearthdata.com/about/terms-of-use/ . Source file: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_admin_0_countries.geojson . Selected features are retained in `public/trip-land.js`. It is an overview without streets; small islands may be generalized or omitted. This is not a download of the online basemap provider's tiles.

- MapLibre GL JS and CSS are vendored from the installed `maplibre-gl` package. The complete BSD license is retained at `public/map-vendor/LICENSE.txt`.
- The online basemap is OpenFreeMap Liberty: https://openfreemap.org/quick_start/ . Attribution to OpenFreeMap, OpenMapTiles and OpenStreetMap remains visible on the map. This project does not bulk-download or package map tiles.
- Itinerary point coordinates were queried from OpenStreetMap via Overpass on 2026-09-06. Each point in `public/trip-data.js` retains its OSM object ID; each map popup links to that object. The PVG reference coordinate is from https://www.wikidata.org/wiki/Q36420 . Points are approximate reference locations, not guaranteed entrances or permitted snorkeling sites.
- OSM data is available under ODbL: https://www.openstreetmap.org/copyright . The curated point list is provided in `public/trip-data.js`, with attribution and source IDs preserved in both HTML exports.
- Google Maps outbound place search links follow https://developers.google.com/maps/documentation/urls/get-started . No Google basemap tiles are used or copied.
