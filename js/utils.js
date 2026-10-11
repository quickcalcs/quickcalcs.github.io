/* Shared helpers. Loaded first. */
const $ = id => document.getElementById(id);

/* Every calculator file adds its items to this list. */
const C = [];

/* ---------- helpers ---------- */
const nf = (x, d = 2, m = d) => isFinite(x) ? Number(x).toLocaleString('en-IN', {minimumFractionDigits: m, maximumFractionDigits: d}) : '-';
const rs = x => '\u20B9' + nf(x);
const pad = x => String(x).padStart(2, '0');
const now = new Date();
const today = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
const D = s => new Date(s + 'T00:00:00Z');
const fd = d => d.toLocaleDateString('en-IN', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'});
const DAY = 864e5;
const comp = (p, r, k, t) => p * Math.pow(1 + r / 100 / k, k * t);

/* field builders: number, select, date */
const fn = (id, label, def, o = {}) => ({t: 'n', id, label, def, ...o});
const fs = (id, label, o, def) => ({t: 's', id, label, o, def});
const fdt = (id, label, def) => ({t: 'd', id, label, def});

const FREQ = [[1, 'Yearly'], [2, 'Half-yearly'], [4, 'Quarterly'], [12, 'Monthly'], [365, 'Daily']];
const SEX = [['m', 'Male'], ['f', 'Female']];
