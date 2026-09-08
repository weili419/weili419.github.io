import fs from 'node:fs';
const root=new URL('../public/',import.meta.url);
const trip=JSON.parse(fs.readFileSync(new URL('trip.json',root),'utf8'));
trip.days=[...trip.commonDays,...trip.plans.A.days];
fs.writeFileSync(new URL('trip-data.js',root),'/* Generated from trip.json. Date key 1001 means October 1. */\nwindow.TRIP = '+JSON.stringify(trip).replace(/</g,'\\u003c')+';\n');
console.log('Synced common route and return plans A / B.');
