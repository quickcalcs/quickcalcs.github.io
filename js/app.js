/* Builds the menu, shows the selected calculator and handles Calculate. Loaded last. */
/* ---------- navigation ---------- */
const groups = [...new Set(C.map(c => c.g))];
$('nav').innerHTML = groups.map(g => '<h2>' + g + '</h2><ul>' +
  C.filter(c => c.g == g).map(c => '<li><a href="#' + c.id + '">' + c.t + '</a></li>').join('') + '</ul>').join('');

/* ---------- render one calculator ---------- */
let cur;
function show() {
  cur = C.find(c => c.id == location.hash.slice(1)) || C[0];
  document.title = cur.t + ' - QuickCalcs';
  $('t').textContent = cur.t;
  $('d').textContent = cur.d;
  $('n').textContent = cur.N || '';
  $('r').innerHTML = '';
  $('f').innerHTML = cur.F.map(f => {
    const id = 'f_' + f.id; let el;
    if (f.t == 's') el = '<select id="' + id + '">' + f.o.map(o => '<option value="' + o[0] + '"' + (o[0] == f.def ? ' selected' : '') + '>' + o[1] + '</option>').join('') + '</select>';
    else if (f.t == 'd') el = '<input id="' + id + '" type="date" required value="' + (f.def == 'today' ? today : f.def) + '">';
    else el = '<input id="' + id + '" type="number" inputmode="decimal" step="any" value="' + f.def + '"' + (f.neg ? '' : ' min="0"') + (f.opt ? '' : ' required') + '>';
    return '<div><label for="' + id + '">' + f.label + '</label>' + el + '</div>';
  }).join('') + '<div class="act"><button class="go">Calculate</button><button type="reset" class="rs">Reset</button></div>';
  document.querySelectorAll('nav a').forEach(a => a.getAttribute('href') == '#' + cur.id ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
}

$('f').addEventListener('submit', e => {
  e.preventDefault();
  const v = {};
  cur.F.forEach(f => {const x = $('f_' + f.id).value; v[f.id] = f.t == 'n' ? (parseFloat(x) || 0) : x;});
  const out = cur.R(v);
  $('r').innerHTML = typeof out == 'string' ? '<p class="err">' + out + '</p>' :
    '<dl>' + out.map(o => '<div' + (o[2] ? ' class="big"' : '') + '><dt>' + o[0] + '</dt><dd>' + o[1] + '</dd></div>').join('') + '</dl>';
});
$('f').addEventListener('reset', () => {$('r').innerHTML = '';});

window.addEventListener('hashchange', () => {show(); $('main').focus();});
show();
