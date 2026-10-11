/* Finance calculators. Add a new one by adding an item inside C.push(...). */
C.push(
{g: 'Finance', id: 'emi', t: 'EMI calculator', d: 'Work out the monthly instalment for a home, car or personal loan.',
 F: [fn('p', 'Loan amount (\u20B9)', 1000000), fn('r', 'Interest rate (% per year)', 8.5), fn('y', 'Loan tenure (years)', 20)],
 R: v => {const i = v.r / 1200, m = v.y * 12, e = i ? v.p * i * Math.pow(1 + i, m) / (Math.pow(1 + i, m) - 1) : v.p / m, tot = e * m;
   return [['Monthly EMI', rs(e), 1], ['Total interest', rs(tot - v.p)], ['Total payment', rs(tot)]];},
 N: 'EMI = P x i x (1+i)^n / ((1+i)^n - 1), where i is the monthly rate and n is the number of months.'},

{g: 'Finance', id: 'sip', t: 'SIP calculator', d: 'Estimate what a monthly mutual fund SIP could grow to.',
 F: [fn('p', 'Monthly investment (\u20B9)', 5000), fn('r', 'Expected return (% per year)', 12), fn('y', 'Time period (years)', 10)],
 R: v => {const i = v.r / 1200, m = v.y * 12, inv = v.p * m, fv = i ? v.p * ((Math.pow(1 + i, m) - 1) / i) * (1 + i) : inv;
   return [['Amount invested', rs(inv)], ['Estimated returns', rs(fv - inv)], ['Future value', rs(fv), 1]];},
 N: 'Assumes a constant return and payment at the start of each month. Market returns are not guaranteed.'},

{g: 'Finance', id: 'compound', t: 'Compound interest calculator', d: 'See how interest earned on interest grows your money.',
 F: [fn('p', 'Principal (\u20B9)', 100000), fn('r', 'Interest rate (% per year)', 7), fn('y', 'Time (years)', 5), fs('k', 'Compounded', FREQ, 1)],
 R: v => {const a = comp(v.p, v.r, +v.k, v.y); return [['Interest earned', rs(a - v.p)], ['Maturity amount', rs(a), 1]];},
 N: 'A = P x (1 + r/k)^(k x t).'},

{g: 'Finance', id: 'simple', t: 'Simple interest calculator', d: 'Interest calculated only on the original amount.',
 F: [fn('p', 'Principal (\u20B9)', 100000), fn('r', 'Interest rate (% per year)', 7), fn('y', 'Time (years)', 3)],
 R: v => {const i = v.p * v.r * v.y / 100; return [['Simple interest', rs(i)], ['Total amount', rs(v.p + i), 1]];},
 N: 'Simple interest = P x r x t / 100.'},

{g: 'Finance', id: 'fd', t: 'FD calculator', d: 'Maturity value of a fixed deposit.',
 F: [fn('p', 'Deposit amount (\u20B9)', 100000), fn('r', 'Interest rate (% per year)', 7), fn('y', 'Tenure (years)', 5), fs('k', 'Compounded', FREQ, 4)],
 R: v => {const a = comp(v.p, v.r, +v.k, v.y); return [['Interest earned', rs(a - v.p)], ['Maturity amount', rs(a), 1]];},
 N: 'Most banks compound FD interest quarterly. Check your bank\'s terms.'},

{g: 'Finance', id: 'rd', t: 'RD calculator', d: 'Maturity value of a recurring deposit.',
 F: [fn('d', 'Monthly deposit (\u20B9)', 5000), fn('r', 'Interest rate (% per year)', 6.5), fn('m', 'Tenure (months)', 36)],
 R: v => {const i = v.r / 400, q = v.m / 3, inv = v.d * v.m, mat = i ? v.d * (Math.pow(1 + i, q) - 1) / (1 - Math.pow(1 + i, -1 / 3)) : inv;
   return [['Total deposited', rs(inv)], ['Interest earned', rs(mat - inv)], ['Maturity amount', rs(mat), 1]];},
 N: 'Uses quarterly compounding, the usual method for recurring deposits in India.'},

{g: 'Finance', id: 'tax', t: 'Income tax calculator (India)', d: 'Estimate yearly tax under the new regime.',
 F: [fn('inc', 'Annual income (\u20B9)', 1200000)],
 R: v => {const x = Math.max(0, v.inc - 75000), S = [[400000, 0], [800000, .05], [1200000, .1], [1600000, .15], [2000000, .2], [2400000, .25], [Infinity, .3]];
   let tax = 0, lo = 0; for (const [hi, rt] of S) {if (x > lo) tax += (Math.min(x, hi) - lo) * rt; lo = hi;}
   tax = x <= 1200000 ? 0 : Math.min(tax, x - 1200000);
   const cess = tax * .04;
   return [['Taxable income', rs(x)], ['Income tax', rs(tax)], ['Health and education cess (4%)', rs(cess)], ['Total tax', rs(tax + cess), 1], ['Approx. per month', rs((tax + cess) / 12)]];},
 N: 'New regime, resident individual under 60, FY 2025-26 slabs, with \u20B975,000 standard deduction and rebate up to \u20B912 lakh taxable income. Surcharge, other deductions and the old regime are not included. Always check the latest rules at incometax.gov.in.'},

{g: 'Finance', id: 'gst', t: 'GST calculator', d: 'Add GST to a price or remove it from a GST-inclusive price.',
 F: [fn('a', 'Amount (\u20B9)', 1000), fn('rt', 'GST rate (%)', 18), fs('m', 'Mode', [['add', 'Add GST (price excludes GST)'], ['rem', 'Remove GST (price includes GST)']], 'add')],
 R: v => {const add = v.m == 'add', base = add ? v.a : v.a * 100 / (100 + v.rt), g = add ? v.a * v.rt / 100 : v.a - base;
   return [['Price before GST', rs(base)], ['GST amount', rs(g)], ['CGST (half)', rs(g / 2)], ['SGST / UTGST (half)', rs(g / 2)], ['Final price', rs(base + g), 1]];},
 N: 'Check the current GST rate for your product or service on the official GST portal.'}
);
