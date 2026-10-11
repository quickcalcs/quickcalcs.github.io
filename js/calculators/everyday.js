/* Everyday and student calculators. Add a new one by adding an item inside C.push(...). */
const UNITS = [
  ['Kilometres to miles', x => x * 0.621371], ['Miles to kilometres', x => x * 1.609344],
  ['Metres to feet', x => x * 3.28084], ['Feet to metres', x => x / 3.28084],
  ['Centimetres to inches', x => x / 2.54], ['Inches to centimetres', x => x * 2.54],
  ['Kilograms to pounds', x => x * 2.20462], ['Pounds to kilograms', x => x / 2.20462],
  ['Celsius to Fahrenheit', x => x * 9 / 5 + 32], ['Fahrenheit to Celsius', x => (x - 32) * 5 / 9],
  ['Litres to US gallons', x => x * 0.264172], ['US gallons to litres', x => x / 0.264172],
  ['Square feet to square metres', x => x * 0.092903], ['Square metres to square feet', x => x / 0.092903],
  ['Acres to hectares', x => x * 0.404686], ['Hectares to acres', x => x / 0.404686]
];

const grade = p => p >= 90 ? 'A+' : p >= 80 ? 'A' : p >= 70 ? 'B' : p >= 60 ? 'C' : p >= 50 ? 'D' : p >= 40 ? 'E' : 'F';

C.push(
{g: 'Everyday and student', id: 'percent', t: 'Percentage calculator', d: 'Three common percentage questions answered at once.',
 F: [fn('a', 'First number (X)', 20), fn('b', 'Second number (Y)', 500)],
 R: v => [[v.a + '% of ' + v.b, nf(v.a * v.b / 100), 1], [v.a + ' is what % of ' + v.b, nf(v.a / v.b * 100) + '%'], ['% change from ' + v.a + ' to ' + v.b, nf((v.b - v.a) / v.a * 100) + '%']]},

{g: 'Everyday and student', id: 'discount', t: 'Discount calculator', d: 'Final price after one or two discounts.',
 F: [fn('p', 'Original price (\u20B9)', 2000), fn('d', 'Discount (%)', 25), fn('e', 'Extra discount (%)', 0)],
 R: v => {const f = v.p * (1 - v.d / 100) * (1 - v.e / 100); return [['You save', rs(v.p - f)], ['Effective discount', nf((v.p - f) / v.p * 100) + '%'], ['Final price', rs(f), 1]];}},

{g: 'Everyday and student', id: 'units', t: 'Unit converter', d: 'Convert length, weight, temperature, volume and area.',
 F: [fs('u', 'Conversion', UNITS.map((u, i) => [i, u[0]]), 0), fn('x', 'Value', 1, {neg: 1})],
 R: v => [[UNITS[v.u][0], nf(UNITS[v.u][1](v.x), 4, 0), 1]]},

{g: 'Everyday and student', id: 'cgpa', t: 'CGPA to percentage', d: 'Convert your CGPA to a percentage.',
 F: [fn('c', 'CGPA', 8.2), fn('m', 'Multiplier', 9.5)],
 R: v => [['Percentage', nf(v.c * v.m) + '%', 1]],
 N: 'CBSE uses a multiplier of 9.5. Many universities use a different formula, so check yours.'},

{g: 'Everyday and student', id: 'grade', t: 'Grade calculator', d: 'Percentage and letter grade from your marks.',
 F: [fn('o', 'Marks obtained', 432), fn('t', 'Total marks', 500)],
 R: v => {const p = v.o / v.t * 100; return [['Percentage', nf(p) + '%', 1], ['Grade', grade(p)]];},
 N: 'Grade bands are a common scale (A+ 90 and above, F below 40). Your institution may differ.'}
);
