import fs from 'node:fs';
const root=new URL('../public/',import.meta.url);
const trip=JSON.parse(fs.readFileSync(new URL('trip.json',root),'utf8'));
trip.days=[...trip.commonDays,...trip.plans.A.days];
fs.writeFileSync(new URL('trip-data.js',root),'/* Generated from trip.json. */\nwindow.TRIP = '+JSON.stringify(trip).replace(/</g,'\\u003c')+';\n');
console.log('Synced the 9/20—9/30 route with the confirmed Hangzhou return.');
