/* Date and time calculators. Add a new one by adding an item inside C.push(...). */
C.push(
{g: 'Date and time', id: 'age', t: 'Age calculator', d: 'Your exact age in years, months and days.',
 F: [fdt('b', 'Date of birth', '2000-01-01'), fdt('o', 'Age on', 'today')],
 R: v => {const a = D(v.b), b = D(v.o); if (b < a) return 'The "Age on" date must be after the date of birth.';
   let y = b.getUTCFullYear() - a.getUTCFullYear(), m = b.getUTCMonth() - a.getUTCMonth(), d = b.getUTCDate() - a.getUTCDate();
   if (d < 0) {m--; d += new Date(Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), 0)).getUTCDate();}
   if (m < 0) {y--; m += 12;}
   let nb = Date.UTC(b.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()); if (nb < b) nb = Date.UTC(b.getUTCFullYear() + 1, a.getUTCMonth(), a.getUTCDate());
   return [['Age', y + ' years, ' + m + ' months, ' + d + ' days', 1], ['Total days lived', nf((b - a) / DAY, 0)], ['Next birthday in', nf((nb - b) / DAY, 0) + ' days']];}},

{g: 'Date and time', id: 'diff', t: 'Days between dates', d: 'Count the days between two dates.',
 F: [fdt('a', 'From', 'today'), fdt('b', 'To', 'today')],
 R: v => {const n = Math.abs(D(v.b) - D(v.a)) / DAY; return [['Days', nf(n, 0), 1], ['Weeks and days', Math.floor(n / 7) + ' weeks ' + n % 7 + ' days'], ['Approx. months', nf(n / 30.4375, 1)]];}},

{g: 'Date and time', id: 'adddays', t: 'Add or subtract days', d: 'Find the date a number of days before or after a date.',
 F: [fdt('s', 'Start date', 'today'), fn('n', 'Number of days', 30), fs('o', 'Operation', [['a', 'Add days'], ['s', 'Subtract days']], 'a')],
 R: v => [['Resulting date', fd(new Date(D(v.s).getTime() + (v.o == 'a' ? 1 : -1) * v.n * DAY)), 1]]}
);
