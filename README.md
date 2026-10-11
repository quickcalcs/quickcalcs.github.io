# QuickCalcs

A free multi-calculator website built with plain HTML, CSS and JavaScript. No install and no build step.

## Folder structure

```
calchub/
  index.html                  page structure
  css/style.css               all styling (colors are variables at the top)
  js/utils.js                 shared helpers (formatting, dates, field builders)
  js/calculators/finance.js   EMI, SIP, compound, simple, FD, RD, income tax, GST
  js/calculators/health.js    BMI, calories/BMR, ideal weight, body fat, due date
  js/calculators/datetime.js  age, days between dates, add/subtract days
  js/calculators/everyday.js  percentage, discount, unit converter, CGPA, grade
  js/app.js                   menu, form rendering, Calculate button
```

## Run it
Double-click `index.html`. It works offline.

## Publish free
Upload the whole folder to GitHub Pages, Netlify or Cloudflare Pages. Keep `index.html` at the top level.

## Add a new calculator
Open the matching file in `js/calculators/` (or create a new one and add a `<script>` line in `index.html` before `app.js`). Add an item like this:

```js
{g: 'Finance', id: 'mycalc', t: 'My calculator', d: 'One line description.',
 F: [fn('a', 'First value', 100), fn('b', 'Second value', 5)],
 R: v => [['Result', nf(v.a * v.b), 1]],
 N: 'Short note about the formula.'}
```
- `g` is the menu group, `id` is the page link (`#mycalc`), `t` is the title, `d` the description.
- `F` lists the inputs: `fn` number, `fs` dropdown, `fdt` date.
- `R` returns rows of `[label, value, highlight]`. Return a string to show an error.

## Things to keep updated
- Income tax slabs in `finance.js` (FY 2025-26 new regime). Check incometax.gov.in each year.

## Growing later
- **Better Google ranking:** give each calculator its own page (`emi.html`) with an explanation and FAQs.
- **React:** worth it if you add accounts, saved history or a very large number of pages.
- **Node:** worth it only when you need a backend, such as logins, a database or an API.
