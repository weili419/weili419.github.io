import { readFileSync, writeFileSync } from 'node:fs';
import { venues, foodDays, foodSources } from '../app/food-data.ts';

const locations = JSON.parse(readFileSync(new URL('../public/food-locations.json', import.meta.url), 'utf8'));
const items = Object.entries(venues).map(([key, venue], index) => {
  const location = locations[key];
  if (!location || location.ll.length !== 2 || !location.ll.every(Number.isFinite)) throw new Error(`Missing restaurant coordinates: ${key}`);
  const uses = foodDays.flatMap(day => day.meals.flatMap(meal => meal.options.flatMap((option, i) => option.venue === key ? [{
    date: Number(day.date), plan: day.plan ?? 'common', meal: meal.name, option: 'ABC'[i],
    dish: option.dish ?? venue.dish, price: option.price ?? venue.price,
    tip: option.tip ?? venue.tip, mealNote: meal.note ?? '', dayNote: day.note,
  }] : [])));
  return { ...venue, ...location, id: `food-${key}`, key, number: index + 1, en: venue.query ?? venue.name, uses,
    refs: venue.refs.map(id => foodSources[id]), checked: '2026-09-06' };
});
writeFileSync(new URL('../public/food-data.js', import.meta.url), 'window.TRIP_FOOD = ' + JSON.stringify(items).replace(/</g, '\\u003c') + ';\n');
console.log(`Synced ${items.length} food locations and ${items.reduce((n, item) => n + item.uses.length, 0)} meal choices.`);
