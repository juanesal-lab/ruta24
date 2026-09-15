/* =====================================================================
   RUTA 24 — app (v8: rediseño simple, móvil primero)
   ===================================================================== */
(function () {
'use strict';

/* ---------- utilidades ---------- */
const $ = (s, el) => (el || document).querySelector(s);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = CALC.num; // vive en calc.js (probado con node scripts/test-calcs.js)
const fmt = (n) => '$ ' + Math.round(n).toLocaleString('es-CO');
const pct = (n, d) => (isFinite(n) ? n.toFixed(d == null ? 1 : d).replace('.', ',') : '–') + ' %';
const hoy = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); }; // fecha local, no UTC
const fechaCorta = (d) => d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });
const claseDe = (n) => CLASES.find((c) => c.n === n);
const modDe = (id) => MODULOS.find((m) => m.id === id);
const ico = (k) => `<i class="ico">${ICONO[k] || ''}</i>`;
const ilus = (mod, cls) => `<span class="ilus ${cls || ''}" style="--h:${MOD_HUE[mod]}">${ILUS[mod]}</span>`;

/* semanas (del calendario) */
const SEMANAS = CALENDARIO.map((r, i) => ({ n: i + 1, clases: (r[1].match(/\d+/g) || []).map(Number), nota: r[2] }));
const SEMANA_DE = {}; SEMANAS.forEach((s) => s.clases.forEach((c) => { SEMANA_DE[c] = s.n; }));

/* ---------- estado ---------- */
const KEY = 'ruta24.v1';
const defState = () => ({ nombre: '', clases: {}, prereq: [], tools: {}, examen: null, updated: null });
let S = defState();
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(defState(), JSON.parse(raw)); } catch (e) {}
let saveT = null;
function save() { S.updated = new Date().toISOString(); clearTimeout(saveT); saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }, 150); }
function cl(n) { if (!S.clases[n]) S.clases[n] = { estado: 'pendiente', tareas: [], quizSel: {}, quiz: null }; return S.clases[n]; }
function tool(id) { if (!S.tools[id]) S.tools[id] = {}; return S.tools[id]; }
function tv(id, f, d) { const t = tool(id); return t[f] == null || t[f] === '' ? (d == null ? '' : d) : t[f]; }
let PROFE = false; try { PROFE = localStorage.getItem('ruta24.profe') === '1'; } catch (e) {}
let EDIT_NAME = false;

/* ---------- derivados ---------- */
const hechas = () => CLASES.filter((c) => cl(c.n).estado === 'hecha').length;
const siguiente = () => CLASES.find((c) => cl(c.n).estado !== 'hecha') || null;
const hitoOk = (h) => cl(h.clase).estado === 'hecha';
const P_de = (n) => (typeof PERSONALIZADO !== 'undefined' && PERSONALIZADO.clases && PERSONALIZADO.clases[n]) || {};

/* ---------- router ---------- */
function route() { const p = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean); return { v: p[0] || 'inicio', a: p[1], b: p[2] }; }
function go(h) { location.hash = h; }

/* ---------- render ---------- */
function render() {
  try { renderInner(); } catch (err) {
    console.error(err);
    $('#main').innerHTML = `<section class="view"><h1>Algo no cargó bien</h1><p class="lead">Suele ser una versión vieja guardada en el navegador. Recarga forzando: <span class="mono">Cmd + Shift + R</span> (Mac) o <span class="mono">Ctrl + Shift + R</span> (Windows).</p><div class="btn-row"><button class="btn btn-primary" data-action="reload">Recargar</button><button class="btn" data-action="reset-all">Borrar progreso y empezar de cero</button></div><p class="muted small mono">${esc(String(err && err.message || err))}</p></section>`;
  }
}
function renderInner() {
  const r = route();
  if (r.v === 'demo') { { S.inicio = { resp: Object.assign({}, DEMO_RESP), done: true, fecha: hoy(), v: 3 }; S.nombre = S.nombre || 'Camilo (ejemplo)'; save(); } go('/examen'); return; }
  if (r.v === 'profe') { PROFE = !PROFE; try { localStorage.setItem('ruta24.profe', PROFE ? '1' : '0'); } catch (e) {} go('/inicio'); return; }
  document.documentElement.classList.toggle('profe', PROFE);
  let html = '';
  if (r.v === 'clase') html = viewClase(parseInt(r.a, 10) || 1);
  else if (r.v === 'clases') html = viewClases();
  else if (r.v === 'herramientas') html = r.a ? viewTool(r.a) : viewHerramientas();
  else if (r.v === 'kit') html = viewKit(r.a);
  else if (r.v === 'examen' || r.v === 'examen-inicio') html = viewExamen();
  else html = viewInicio();
  $('#main').innerHTML = html;
  $('#topbar').innerHTML = topbar(r);
  $('#bottomnav').innerHTML = bottomnav(r);
  window.scrollTo({ top: 0 });
  document.querySelectorAll('[data-toolbox]').forEach((el) => calc(el.getAttribute('data-toolbox')));
}
const TABS = [['inicio', 'Inicio'], ['clases', 'Clases'], ['herramientas', 'Herramientas'], ['kit', 'Links']];
function topbar(r) {
  const n = hechas();
  return `<a class="brand" href="#/inicio"><span class="brand-num">24</span><span>Ruta 24</span></a>
    <nav class="tabs">${TABS.map(([k, t]) => `<a href="#/${k}" class="${r.v === k || (k === 'clases' && r.v === 'clase') ? 'on' : ''}">${t}</a>`).join('')}</nav>
    <div class="top-progress" title="${n} de 24 clases"><div class="bar"><i style="width:${n / 24 * 100}%"></i></div><span class="mono">${n}/24</span></div>${PROFE ? '<span class="pill pill-profe">profe</span>' : ''}`;
}
function bottomnav(r) {
  return TABS.map(([k, t]) => `<a href="#/${k}" class="${r.v === k || (k === 'clases' && r.v === 'clase') ? 'on' : ''}">${ico(k)}<span>${t}</span></a>`).join('');
}

const TOOLS = [
  ['bep', 'BEP y BEP efectivo', 'Clases 1 y 15'],
  ['diagnostico', 'Ficha de diagnóstico', 'Clase 1'],
  ['saturacion', 'Matriz de saturación CO', 'Clase 3'],
  ['ficha', 'Ficha de producto', 'Clases 2 a 4'],
  ['bundles', 'Bundles 1 / 2 / 3', 'Clase 4'],
  ['checklist25', 'Checklist de landing (25 puntos)', 'Clase 9'],
  ['matriz9', 'Matriz de 9 ads', 'Clase 10'],
  ['swipe', 'Swipe file', 'Clases 10 a 13'],
  ['nombrador', 'Nombre de creativo', 'Clase 13'],
  ['cod', 'Tablero de operación COD', 'Clase 15'],
  ['lanzamiento', 'Checklist de lanzamiento', 'Clase 16'],
  ['escalado', 'Presupuesto inicial y escalado +15 %', 'Clases 16 y 19'],
  ['diario', 'Tablero diario de campaña', 'Clases 16 a 19'],
  ['diag', 'Diagnóstico de campaña', 'Clase 18'],
  ['sim', 'Simulador de escalado', 'Clase 19'],
  ['contingencia', 'Plan de contingencia', 'Clase 21'],
  ['rutina', 'Rutina semanal (5 h)', 'Clase 22'],
  ['plan90', 'Plan de 90 días', 'Clase 24'],
  ['examen', 'Examen final', 'Clase 24'],
];

const inp = (id, f, label, d, opts) => { opts = opts || {}; return `<label class="f"><span>${label}</span><input type="${opts.type || 'text'}" inputmode="${opts.type === 'date' ? 'none' : opts.type === 'url' ? 'url' : 'decimal'}" autocomplete="off" data-tool="${id}" data-f="${f}" value="${esc(tv(id, f, d))}" ${opts.ph ? `placeholder="${esc(opts.ph)}"` : ''}></label>`; };
const sel = (id, f, label, options, d) => `<label class="f"><span>${label}</span><select data-tool="${id}" data-f="${f}">${options.map((o) => `<option value="${esc(o)}" ${tv(id, f, d) === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></label>`;
const ta = (id, f, label, ph) => `<label class="f f-wide"><span>${label}</span><textarea rows="3" data-tool="${id}" data-f="${f}" placeholder="${esc(ph || '')}">${esc(tv(id, f, ''))}</textarea></label>`;
const chk = (id, f, label) => `<label class="task"><input type="checkbox" data-tool="${id}" data-f="${f}" data-type="bool" ${tv(id, f, false) ? 'checked' : ''}><span>${label}</span></label>`;

function toolBody(id) {
  switch (id) {
    case 'bep': return `<p class="muted small">Ejemplo cargado con cifras típicas de un producto COD en Colombia. Reemplázalas con las tuyas.</p>
      <div class="fields">${inp(id, 'precio', 'Precio de venta (COP)', 89900)}${inp(id, 'costo', 'Costo del producto', 28000)}${inp(id, 'envio', 'Envío', 12000)}${inp(id, 'comision', 'Comisión / pasarela (%)', 3.5)}${inp(id, 'otros', 'Otros costos por pedido (empaque, confirmador)', 2000)}${inp(id, 'tasa', 'Tasa de entrega (%)', 75)}${inp(id, 'devolucion', 'Costo de una devolución (flete ida y vuelta)', 18000)}</div><div class="res" id="res-${id}"></div>`;
    case 'bundles': return `<div class="fields">${inp(id, 'costo', 'Costo unitario', 28000)}${inp(id, 'envio', 'Envío por pedido', 12000)}${inp(id, 'comision', 'Comisión (%)', 3.5)}${inp(id, 'p1', 'Precio 1 unidad', 89900)}${inp(id, 'p2', 'Precio bundle 2', 149900)}${inp(id, 'p3', 'Precio bundle 3', 199900)}</div><div class="res" id="res-${id}"></div>`;
    case 'saturacion': { const kws = ['Marca / nombre comercial', 'Nombre genérico en español', 'Sinónimos colombianos', 'Categoría / nicho', 'El problema que resuelve', 'Término en inglés', 'Función / beneficio']; return `<p class="muted small">Busca cada variante en Meta Ads Library con país = Colombia (activos y todos) y cuenta tiendas Shopify distintas.</p>
      <div class="fields">${kws.map((k, i) => `<label class="f"><span>${i + 1}. ${k}</span><input type="text" data-tool="${id}" data-f="k${i}" placeholder="keyword usada" value="${esc(tv(id, 'k' + i, ''))}"><input type="text" inputmode="numeric" data-tool="${id}" data-f="n${i}" placeholder="# tiendas" value="${esc(tv(id, 'n' + i, ''))}"></label>`).join('')}${inp(id, 'union', 'Tiendas distintas en la unión de las 7', '', { ph: 'sin repetir' })}</div><div class="res" id="res-${id}"></div>`; }
    case 'checklist25': return `<div class="cl25">${CHECKLIST25.map((g, gi) => `<div class="cl25-g"><h4>${g[0]} <span class="mono muted">${g[1].length}</span></h4>${g[1].map((it, i) => chk(id, `c${gi}_${i}`, esc(it))).join('')}</div>`).join('')}</div><div class="res" id="res-${id}"></div>`;
    case 'matriz9': return `<div class="fields">${inp(id, 'producto', 'Producto (para los nombres de archivo)', '', { ph: 'ej. ORDENADOR' })}</div>
      <div class="m9">${MATRIZ9.map((r) => `<div class="m9-row ${tv(id, 'ok' + r.s, false) ? 'ok' : ''}">
        <div class="m9-meta"><span class="mono">${r.s}</span><b>${r.etapa}</b><span>${r.persona}</span><span class="ang">${r.angulo}</span></div>
        <textarea rows="2" data-tool="${id}" data-f="h${r.s}" placeholder="${esc(HOOKS[r.angulo].join('  ·  '))}">${esc(tv(id, 'h' + r.s, ''))}</textarea>
        <div class="m9-ctl">${sel(id, 'f' + r.s, 'Formato', ['video', 'estatico', 'carrusel'], 'video')}${chk(id, 'ok' + r.s, 'listo')}</div>
      </div>`).join('')}</div>
      <div class="res" id="res-${id}"></div><button class="btn small" data-action="copy-matriz">Copiar matriz como texto</button>`;
    case 'nombrador': return `<div class="fields">${inp(id, 'producto', 'Producto', '', { ph: 'ej. ORDENADOR' })}${sel(id, 'etapa', 'Etapa', ['TOFU', 'MOFU', 'BOFU'], 'TOFU')}${sel(id, 'angulo', 'Ángulo', MATRIZ9.map((r) => r.angulo), 'Dolor')}${sel(id, 'formato', 'Formato', ['video', 'estatico', 'carrusel'], 'video')}${inp(id, 'v', 'Versión', 1)}</div><div class="res" id="res-${id}"></div>`;
    case 'lanzamiento': return `<div class="tasks">${LANZAMIENTO.map((t, i) => chk(id, 'l' + i, esc(t))).join('')}</div><div class="res" id="res-${id}"></div>`;
    case 'escalado': return `<div class="fields">${inp(id, 'bep', 'BEP (CPA máximo)', 45000)}${inp(id, 'actual', 'Presupuesto diario actual (vacío = 3× BEP)', '')}${inp(id, 'inicio', 'Fecha del último cambio', hoy(), { type: 'date' })}${inp(id, 'dias', 'Días a proyectar', 30)}</div><div class="res" id="res-${id}"></div>`;
    case 'diag': return `<p class="muted small">Datos del adset completo, últimos 7 días. Ejemplo cargado.</p><div class="fields">${inp(id, 'bep', 'BEP (CPA máximo)', 45000)}${inp(id, 'dias', 'Días sin cambios', 7)}${inp(id, 'gasto', 'Gasto', 1050000)}${inp(id, 'imp', 'Impresiones', 82000)}${inp(id, 'clics', 'Clics salientes', 1230)}${inp(id, 'lpv', 'LPV', 980)}${inp(id, 'atc', 'Añadir al carrito / pedidos iniciados', 74)}${inp(id, 'compras', 'Compras', 26)}${inp(id, 'freq', 'Frecuencia', 1.7)}${inp(id, 'cpmref', 'CPM habitual de tu cuenta (para comparar)', 15000)}</div><div class="res" id="res-${id}"></div>`;
    case 'sim': { const t = tool(id); const resp = t.resp || {}; return `<p class="muted small">Decide como si fuera tu plata. Sin mirar la tabla.</p>${SIM_CASOS.map((c, i) => { const ch = resp[i]; return `<div class="q ${ch == null ? '' : ch === c.a ? 'ok' : 'bad'}"><p class="q-t"><b>${c.t}.</b> ${esc(c.d)}</p><div class="q-o">${SIM_OPCIONES.map((o, j) => `<button class="opt ${ch === j ? 'sel' : ''} ${ch != null && j === c.a ? 'right' : ''}" data-sim="${i}" data-o="${j}" ${ch != null ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>${ch != null ? `<p class="q-w">${ch === c.a ? '✓ Correcto.' : '✗ No.'} ${esc(c.w)}</p>` : ''}</div>`; }).join('')}<div class="res" id="res-${id}"></div><button class="btn small" data-action="sim-reset">Repetir simulador</button>`; }
    case 'contingencia': return `<p class="muted small">Escribe el primer paso, el segundo y quién lo hace. Cuando pase, no vas a pensar: vas a leer.</p><div class="fields fields-1">${ta(id, 'rechazo', 'Ad rechazado', 'Revisar claims / antes-después / landing → corregir y reenviar → apelar solo si está limpio')}${ta(id, 'restriccion', 'Cuenta publicitaria restringida', 'Apelar una vez, bien. Mientras tanto: ...')}${ta(id, 'baneo', 'BM baneado', 'Fresh start nivel ... con ... Qué NO reutilizo: ...')}${ta(id, 'cpa', 'CPA disparado de un día a otro', 'Chequeo: pixel → pedido de prueba → checkout → stock → competencia CO → CPM')}${ta(id, 'caida', 'El producto se cae (meseta / declive)', '¿Creativo, oferta, mercado o cuenta? Primer paso: ...')}</div>
      <h4>Respaldos</h4><div class="tasks">${['Segundo BM creado, con página y método de pago', 'Método de pago de respaldo', 'Copia de todos los creativos fuera de Meta', 'Copia del copy y las imágenes fuera de Shopify', '2FA activo en Meta, Shopify, correo y WhatsApp'].map((t, i) => chk(id, 'r' + i, t)).join('')}</div><div class="res" id="res-${id}"></div>`;
    case 'plan90': return `<div class="fields">${inp(id, 'meta1', 'Producto #1: meta de gasto diario (COP)', '', { ph: 'ej. 600000' })}${inp(id, 'cpa1', 'Producto #1: CPA objetivo (< BEP)', '', { ph: 'ej. 38000' })}${inp(id, 'p2', 'Producto #2: nombre', '', { ph: 'en research' })}${inp(id, 'f2', 'Producto #2: fecha de lanzamiento', '', { type: 'date' })}${inp(id, 'rev', 'Revisión con el profe a los 30 días', '', { type: 'date' })}</div>
      <div class="fields fields-1">${ta(id, 'semana', 'Sistema semanal (qué pasa cada lunes, martes, jueves y viernes)', 'Lunes: CSV → Claude → decisión. Martes: 3 creativos. Jueves: subir + research. Viernes: operación y caja.')}${ta(id, 'research', 'Los 2 productos en research permanente', '')}${ta(id, 'aprender', 'Qué sigo aprendiendo', '')}</div><div class="res" id="res-${id}"></div><button class="btn small" data-action="copy-plan90">Copiar plan</button>`;
    case 'diario': return `<p class="muted small">Un día por fila. Escribe lo del día y guarda: el tablero calcula el CPA de los últimos 7 días y lo compara con tu BEP.</p>
      <div class="fields">${inp(id, 'producto', 'Producto / campaña', '', { ph: 'ej. Organizador de cocina' })}${inp(id, 'bep', 'BEP (CPA máximo)', bepAuto(), { ph: 'sale de la calculadora BEP' })}</div>
      <h4>Registrar un día</h4>
      <div class="fields">${inp(id, 'd_fecha', 'Fecha', hoy(), { type: 'date' })}${inp(id, 'd_gasto', 'Gasto del día (COP)', '', { ph: 'ej. 150.000' })}${inp(id, 'd_compras', 'Compras (pedidos)', '', { ph: 'ej. 4' })}</div>
      <details class="mas"><summary>Más datos del día (opcional)</summary><div class="fields">${inp(id, 'd_imp', 'Impresiones', '')}${inp(id, 'd_clics', 'Clics salientes', '')}${inp(id, 'd_lpv', 'LPV', '')}${inp(id, 'd_atc', 'Pedidos iniciados', '')}</div></details>
      <div class="btn-row"><button class="btn btn-primary" data-action="fila-save" data-tool="diario">Guardar día</button>${filasDe(id)[tv(id, 'd_fecha', hoy())] ? `<button class="btn" data-action="fila-del" data-tool="diario" data-f="${esc(tv(id, 'd_fecha', hoy()))}">Borrar este día</button>` : ''}<span class="muted small" id="msg-diario"></span></div>
      <div class="res" id="res-${id}"></div>`;
    case 'cod': return `<p class="muted small">Cada fila es un día de pedidos. Vuelve a la fila cuando se confirmen, se entreguen o se devuelvan: las tasas se actualizan solas.</p>
      <div class="fields">${inp(id, 'bep', 'BEP (CPA máximo)', bepAuto(), { ph: 'de la calculadora BEP' })}${inp(id, 'devolucion', 'Costo de una devolución (flete ida y vuelta)', tv('bep', 'devolucion', ''), { ph: 'ej. 18.000' })}</div>
      <h4>Pedidos de un día</h4>
      <div class="fields">${inp(id, 'c_fecha', 'Fecha del pedido', hoy(), { type: 'date' })}${inp(id, 'c_pedidos', 'Pedidos', '')}${inp(id, 'c_confirmados', 'Confirmados', '')}${inp(id, 'c_entregados', 'Entregados', '')}${inp(id, 'c_devueltos', 'Devueltos', '')}</div>
      <div class="btn-row"><button class="btn btn-primary" data-action="fila-save" data-tool="cod">Guardar día</button>${filasDe(id)[tv(id, 'c_fecha', hoy())] ? `<button class="btn" data-action="fila-del" data-tool="cod" data-f="${esc(tv(id, 'c_fecha', hoy()))}">Borrar este día</button>` : ''}<span class="muted small" id="msg-cod"></span></div>
      <div class="res" id="res-${id}"></div>`;
    case 'ficha': return `<p class="muted small">Este documento alimenta la landing, los creativos y los anuncios. Llénalo con tus palabras; "Copiar" lo saca en markdown listo para tu carpeta y para Claude Code.</p>${fichaForm(id, FICHA_PRODUCTO)}<div class="res" id="res-${id}"></div>${fichaBotones(id)}`;
    case 'diagnostico': return `<p class="muted small">Tu punto de partida, con tus palabras. Lo que respondiste en el examen de arranque ya viene puesto; ajústalo si quieres.</p>${fichaForm(id, FICHA_DIAG)}<div class="res" id="res-${id}"></div>${fichaBotones(id)}`;
    case 'swipe': return `<p class="muted small">Una referencia = link + hook + ángulo + por qué funciona + qué clono. Un link sin análisis no enseña nada dentro de un mes.</p>
      <div class="fields">${inp(id, 's_url', 'Link (TikTok, Ads Library, landing)', '', { ph: 'https://…', type: 'url' })}${sel(id, 's_tipo', 'Es del…', ['producto', 'problema'], 'producto')}${sel(id, 's_formato', 'Formato', ['video', 'estático', 'carrusel', 'landing'], 'video')}${sel(id, 's_angulo', 'Ángulo', MATRIZ9.map((r) => r.angulo), 'Dolor')}</div>
      <div class="fields fields-1">${ta(id, 's_hook', 'Hook (los primeros 3 segundos o el titular)', 'Escríbelo textual')}${ta(id, 's_porque', 'Por qué funciona', 'Qué hace que pares el scroll o que creas')}${ta(id, 's_clono', 'Qué clono para mi producto', 'La parte que me llevo, adaptada')}</div>
      <div class="btn-row"><button class="btn btn-primary" data-action="swipe-save">${tool(id).editando != null ? 'Guardar cambios' : 'Guardar referencia'}</button>${tool(id).editando != null ? '<button class="btn" data-action="swipe-cancel">Cancelar</button>' : ''}</div>
      <div class="res" id="res-${id}"></div>`;
    case 'rutina': return `<p class="muted small">Cinco horas a la semana, una por día. Marca lo hecho; el lunes siguiente empieza una semana nueva.</p>
      <div class="fields">${inp(id, 'semana', 'Semana del', hoy(), { type: 'date' })}</div>
      <div class="rutina">${RUTINA.map((d, di) => `<div class="rutina-d"><h4>${d.dia} <span class="muted">· ${esc(d.foco)} · 1 h</span></h4><div class="tasks">${d.items.map((it, i) => chk(id, `r${di}_${i}`, esc(it))).join('')}</div></div>`).join('')}</div>
      <div class="res" id="res-${id}"></div><button class="btn small" data-action="rutina-reset">Nueva semana</button>`;
    case 'examen': { const t = tool(id); const resp = t.resp || {}; const done = Object.keys(resp).length === EXAMEN.length; const score = EXAMEN.filter((q, i) => resp[i] === q.a).length; return `<p class="muted small">Las 10 preguntas de cierre. Una por eslabón y por regla.</p>${EXAMEN.map((q, i) => { const ch = resp[i]; return `<div class="q ${ch == null ? '' : ch === q.a ? 'ok' : 'bad'}"><p class="q-t"><span class="mono">${i + 1}</span> ${esc(q.q)}</p><div class="q-o">${q.o.map((o, j) => `<button class="opt ${ch === j ? 'sel' : ''} ${ch != null && j === q.a ? 'right' : ''}" data-exam="${i}" data-o="${j}" ${ch != null ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div></div>`; }).join('')}${done ? `<div class="res"><div class="big ${score >= 8 ? 'good' : score >= 6 ? 'warn' : 'bad'}"><b>${score}/10</b><span>${score >= 8 ? 'Listo. El sistema es tuyo.' : score >= 6 ? 'Casi. Repasa las que fallaste con el profe.' : 'Vuelve a las clases de las preguntas falladas antes de cerrar.'}</span></div></div><button class="btn small" data-action="exam-reset">Repetir examen</button>` : ''}`; }
  }
  return '';
}

/* ---------- cálculos ---------- */
function calc(id) {
  const out = document.getElementById('res-' + id); if (!out) return;
  const g = (f, d) => num(tv(id, f, d));
  let h = '';
  if (id === 'bep') {
    const precio = g('precio', 89900), costo = g('costo', 28000), envio = g('envio', 12000), com = g('comision', 3.5), otros = g('otros', 2000), t = g('tasa', 75) / 100, dev = g('devolucion', 18000);
    const bep = precio - costo - envio - precio * com / 100 - otros;
    const efec = t * bep - (1 - t) * dev;
    h = `<div class="big ${bep > 0 ? 'good' : 'bad'}"><b>${fmt(bep)}</b><span>BEP: CPA máximo por pedido (${pct(precio ? bep / precio * 100 : 0, 0)} del precio)</span></div>
      <div class="big ${efec > 0 ? (efec / bep > 0.6 ? 'good' : 'warn') : 'bad'}"><b>${fmt(efec)}</b><span>BEP efectivo con ${pct(t * 100, 0)} de entrega: ${pct(t * 100, 0)} × BEP − ${pct((1 - t) * 100, 0)} × devolución</span></div>
      <div class="kv"><div><b>Presupuesto inicial</b><span>3× BEP = ${fmt(3 * bep)} / día</span></div><div><b>CPA objetivo para escalar cómodo</b><span>≈ 70 % del BEP efectivo = ${fmt(efec * 0.7)}</span></div><div><b>Cada devolución te cuesta</b><span>${fmt(dev)} + el margen que no cobraste</span></div></div>
      ${efec <= 0 ? '<p class="warn-txt">Con esa tasa de entrega pierdes plata aunque el ad sea gratis. Sube la confirmación o el precio antes de pautar.</p>' : ''}`;
  } else if (id === 'bundles') {
    const costo = g('costo', 28000), envio = g('envio', 12000), com = g('comision', 3.5) / 100;
    const rows = [[1, g('p1', 89900)], [2, g('p2', 149900)], [3, g('p3', 199900)]].map(([u, p]) => { const bep = p - costo * u - envio - p * com; return `<tr><td class="mono">${u}</td><td class="mono">${fmt(p)}</td><td class="mono">${fmt(p / u)}</td><td class="mono ${bep > 0 ? 'good' : 'bad'}">${fmt(bep)}</td><td class="mono">${pct(p ? bep / p * 100 : 0, 0)}</td><td class="mono">${u > 1 ? pct((1 - p / (u * g('p1', 89900))) * 100, 0) : '–'}</td></tr>`; }).join('');
    h = `<div class="table-wrap"><table class="tbl"><thead><tr><th>Unid.</th><th>Precio</th><th>Por unidad</th><th>BEP (margen)</th><th>Margen</th><th>Ahorro vs 1×</th></tr></thead><tbody>${rows}</tbody></table></div><p class="muted small">Un pedido de 2 paga el mismo envío y la misma confirmación: el margen por pedido casi se duplica.</p>`;
  } else if (id === 'saturacion') {
    let max = 0, filled = 0; for (let i = 0; i < 7; i++) { const v = tv(id, 'n' + i, ''); if (v !== '') { filled++; max = Math.max(max, num(v)); } }
    const union = num(tv(id, 'union', ''));
    let v, cls;
    if (filled < 7) { v = `Faltan ${7 - filled} keywords. El gate no está aprobado hasta buscar las 7.`; cls = 'warn'; }
    else if (max >= 5 || union >= 5) { v = 'SATURADO. Descarte.'; cls = 'bad'; }
    else if (union >= 3) { v = 'Moderada (3-4 tiendas). Viable si hay ángulo abierto.'; cls = 'warn'; }
    else { v = 'Baja (0-2 tiendas). Pasa el gate 1.'; cls = 'good'; }
    h = `<div class="big ${cls}"><b>${union || max}</b><span>${v}</span></div>`;
  } else if (id === 'checklist25') {
    let tot = 0; const per = CHECKLIST25.map((gr, gi) => { let k = 0; gr[1].forEach((_, i) => { if (tv(id, `c${gi}_${i}`, false)) k++; }); tot += k; return `<div><b>${gr[0]}</b><span class="mono">${k}/${gr[1].length}</span></div>`; }).join('');
    h = `<div class="big ${tot >= 22 ? 'good' : tot >= 18 ? 'warn' : 'bad'}"><b>${tot}/25</b><span>${tot >= 22 ? 'Lista para tráfico.' : tot >= 18 ? 'Corrige lo que falta antes de pautar.' : 'Todavía no. Revisa la clase 5 y 6.'}</span></div><div class="kv">${per}</div>`;
  } else if (id === 'matriz9') {
    const ok = MATRIZ9.filter((r) => tv(id, 'ok' + r.s, false)).length, con = MATRIZ9.filter((r) => tv(id, 'h' + r.s, '').trim()).length;
    h = `<div class="kv"><div><b>Hooks escritos</b><span class="mono">${con}/9</span></div><div><b>Listos para producir</b><span class="mono">${ok}/9</span></div></div>`;
  } else if (id === 'nombrador') {
    const clean = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
    const name = `${clean(tv(id, 'producto', 'PRODUCTO') || 'PRODUCTO').toUpperCase()}_${tv(id, 'etapa', 'TOFU')}_${clean(tv(id, 'angulo', 'Dolor')).toLowerCase()}_${tv(id, 'formato', 'video')}_v${parseInt(tv(id, 'v', 1), 10) || 1}`;
    h = `<div class="big good"><b class="mono" id="nombre-out">${esc(name)}</b><span>Así se llama el archivo. Cuando tengas 40 ads, el nombre es lo único que te dice qué ángulo ganó.</span></div><button class="btn small" data-action="copy" data-target="nombre-out">Copiar nombre</button>`;
  } else if (id === 'lanzamiento') {
    const k = LANZAMIENTO.filter((_, i) => tv(id, 'l' + i, false)).length;
    h = `<div class="big ${k === LANZAMIENTO.length ? 'good' : 'warn'}"><b>${k}/${LANZAMIENTO.length}</b><span>${k === LANZAMIENTO.length ? 'Listo para lanzar. Programa entre 10 am y 12 m y no toques nada 7 días.' : 'No se lanza con la lista incompleta.'}</span></div>`;
  } else if (id === 'escalado') {
    const bep = g('bep', 45000); let b = num(tv(id, 'actual', '')) || 3 * bep; const dias = Math.min(90, Math.max(1, parseInt(tv(id, 'dias', 30), 10) || 30));
    const ini = tv(id, 'inicio', hoy()); const d0 = new Date(ini + 'T12:00:00'); if (isNaN(d0)) d0.setTime(Date.now());
    let rows = '', acum = 0;
    for (let i = 1; i <= dias; i++) { const d = new Date(d0.getTime() + i * 864e5); let acc = 'mantener'; if (i % 3 === 0) { b = Math.round(b * 1.15 / 100) * 100; acc = 'escalar +15 %'; } if (i % 7 === 0) acc += ' · subir 3 creativos'; acum += b; rows += `<tr class="${i % 3 === 0 ? 'hl' : ''}"><td class="mono">${i}</td><td>${fechaCorta(d)}</td><td class="mono">${fmt(b)}</td><td>${acc}</td></tr>`; }
    h = `<div class="kv"><div><b>Presupuesto inicial</b><span>3× BEP = ${fmt(3 * bep)}</span></div><div><b>Día ${dias}</b><span>${fmt(b)} / día si cada escala se cumple</span></div><div><b>Gasto acumulado</b><span>${fmt(acum)}</span></div></div>
      <p class="muted small">Cada +15 % solo si: 3 días con CPA < BEP, sin fatiga, sin otros cambios. Si CPA > BEP dos días seguidos, congela.</p>
      <div class="table-wrap tall"><table class="tbl"><thead><tr><th>Día</th><th>Fecha</th><th>Presupuesto</th><th>Acción</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  } else if (id === 'diag') {
    const bep = g('bep', 45000), dias = g('dias', 7), gasto = g('gasto', 1050000), imp = g('imp', 82000), clics = g('clics', 1230), lpv = g('lpv', 980), atc = g('atc', 74), compras = g('compras', 26), freq = g('freq', 1.7), cpmref = g('cpmref', 15000);
    const ctr = imp ? clics / imp * 100 : 0, cpm = imp ? gasto / imp * 1000 : 0, cpc = clics ? gasto / clics : 0, cvr = lpv ? compras / lpv * 100 : 0, cpa = compras ? gasto / compras : Infinity;
    const falta = []; if (imp < 1000) falta.push('1.000 impresiones (CTR)'); if (lpv < 50) falta.push('50 LPV (CVR)'); if (dias < 7) falta.push('7 días sin cambios (CPA)');
    const ctrCls = ctr < 0.8 ? 'bad' : ctr < 1.5 ? 'warn' : 'good', cvrCls = cvr < 1 ? 'bad' : cvr < 2 ? 'warn' : 'good', cpaCls = cpa <= bep ? 'good' : cpa <= 1.5 * bep ? 'warn' : 'bad';
    const cpmAlto = cpmref > 0 && cpm > cpmref * 1.3;
    let fila, accion, cls = 'warn';
    if (falta.length) { fila = 'Sin muestra estadística'; accion = 'Esperar. Falta: ' + falta.join(', ') + '. No se toca.'; }
    else if (compras === 0 && gasto > 2 * bep) { fila = 'Gasta y 0 ventas'; accion = 'Revisar pixel (Test Events), hacer un pedido de prueba, revisar checkout. No tocar la campaña.'; cls = 'bad'; }
    else if (cpa <= bep) { fila = 'Rentable'; accion = dias >= 3 ? 'Si llevas 3 días así y no hay fatiga: escalar +15 % entre 10 am y 12 m.' : 'Rentable, pero espera 3 días completos sin cambios antes de escalar.'; cls = 'good'; }
    else if (ctr >= 1.5 && cvr >= 2) { fila = 'CTR alto + CVR alto + CPA alto'; accion = 'Producto y creativo funcionan; la oferta está mal calculada. Revisar BEP, precio, bundles y costos.'; }
    else if (ctr >= 1.5) { fila = 'CTR alto + CPA alto'; accion = 'El problema está después del clic: revisar landing (test de 10 s), oferta, garantías, formulario.'; }
    else if (ctr < 0.8 && cpmAlto) { fila = 'CTR bajo + CPM alto'; accion = 'Creativo frío o pixel sin señal: creativos nuevos y verificar CAPI / EMQ.'; cls = 'bad'; }
    else if (ctr < 0.8) { fila = 'CTR bajo + CPM normal'; accion = 'Creativo malo: iterar hooks (los primeros 3 s) con ángulos nuevos de la matriz.'; cls = 'bad'; }
    else { fila = 'Zona gris'; accion = cpa <= 1.5 * bep ? 'CPA entre BEP y 1,5× BEP: esperar más datos o subir 3 creativos nuevos. No escalar todavía.' : 'CPA > 1,5× BEP con muestra: iterar creativos ya; si sigue 5+ días, pausar.'; if (cpa > 1.5 * bep) cls = 'bad'; }
    const fat = freq > 3 || false;
    h = `<div class="metrics">
        <div class="${ctrCls}"><b>${pct(ctr, 2)}</b><span>CTR saliente</span></div>
        <div class="${cpmAlto ? 'warn' : ''}"><b>${fmt(cpm)}</b><span>CPM</span></div>
        <div><b>${fmt(cpc)}</b><span>CPC</span></div>
        <div class="${cvrCls}"><b>${pct(cvr, 2)}</b><span>CVR (LPV→compra)</span></div>
        <div class="${cpaCls}"><b>${isFinite(cpa) ? fmt(cpa) : '∞'}</b><span>CPA vs BEP ${fmt(bep)}</span></div>
        <div class="${fat ? 'bad' : ''}"><b>${freq.toFixed(1).replace('.', ',')}</b><span>Frecuencia</span></div>
      </div>
      <div class="big ${cls}"><b>${esc(fila)}</b><span>${esc(accion)}</span></div>
      ${fat ? '<p class="warn-txt">Frecuencia > 3: señal de fatiga. Prepara 3 creativos nuevos aunque el CPA aún aguante.</p>' : ''}
      ${atc && lpv ? `<p class="muted small">Embudo: ${lpv} LPV → ${atc} pedidos iniciados (${pct(atc / lpv * 100, 1)}) → ${compras} compras (${pct(atc ? compras / atc * 100 : 0, 0)} de los iniciados). Si muchos inician y pocos terminan, el formulario o la confirmación fallan.</p>` : ''}`;
  } else if (id === 'sim') {
    const resp = tool(id).resp || {}; const n = Object.keys(resp).length; const ok = SIM_CASOS.filter((c, i) => resp[i] === c.a).length;
    h = n === SIM_CASOS.length ? `<div class="big ${ok >= 5 ? 'good' : ok >= 4 ? 'warn' : 'bad'}"><b>${ok}/${SIM_CASOS.length}</b><span>${ok >= 5 ? 'Criterio de media buyer. Puedes tomar la decisión real.' : 'Repasa la tabla síntoma → causa → acción y repite.'}</span></div>` : `<p class="muted small">${n}/${SIM_CASOS.length} casos decididos.</p>`;
  } else if (id === 'contingencia') {
    const esc5 = ['rechazo', 'restriccion', 'baneo', 'cpa', 'caida'].filter((f) => tv(id, f, '').trim()).length; const r = [0, 1, 2, 3, 4].filter((i) => tv(id, 'r' + i, false)).length;
    h = `<div class="kv"><div><b>Protocolos escritos</b><span class="mono">${esc5}/5</span></div><div><b>Respaldos</b><span class="mono">${r}/5</span></div></div>`;
  } else if (id === 'plan90') {
    const f = ['meta1', 'cpa1', 'p2', 'f2', 'rev', 'semana', 'research', 'aprender'].filter((k) => String(tv(id, k, '')).trim()).length;
    h = `<div class="kv"><div><b>Campos completos</b><span class="mono">${f}/8</span></div></div>`;
  } else if (id === 'diario') {
    const r = CALC.cpa7(filasDe(id), { bep: num(tv(id, 'bep', bepAuto())) });
    h = tableroDiario(r, { id });
  } else if (id === 'cod') {
    h = tableroCOD(CALC.tasasCOD(filasDe(id), { bep: num(tv(id, 'bep', bepAuto())) || null, devolucion: num(tv(id, 'devolucion', '')) }), id);
  } else if (id === 'ficha' || id === 'diagnostico') {
    const def = id === 'ficha' ? FICHA_PRODUCTO : FICHA_DIAG; const all = def.flatMap((sec) => sec.f); const k = all.filter((f) => String(fichaVal(id, f)).trim()).length;
    h = `<div class="kv"><div><b>Campos completos</b><span class="mono">${k}/${all.length}</span></div></div>`;
    const a = document.getElementById('wa-' + id); if (a) a.href = waLink(fichaMD(id));
  } else if (id === 'swipe') {
    const refs = tool(id).refs || []; const conAnalisis = refs.filter((r) => (r.porque || '').trim() && (r.clono || '').trim()).length;
    const lista = refs.map((r, i) => `<div class="swipe-it ${tool(id).editando === i ? 'ed' : ''}"><div class="swipe-h"><span class="pill">${esc(r.formato || '')}</span><span class="pill">del ${esc(r.tipo || 'producto')}</span><span class="pill">${esc(r.angulo || '')}</span></div><b>${esc(r.hook || '(sin hook)')}</b>${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener" class="small">${esc(r.url.replace(/^https?:\/\//, '').slice(0, 48))}${r.url.length > 56 ? '…' : ''}</a>` : ''}<p class="small"><b>Por qué:</b> ${esc(r.porque || '–')}<br><b>Clono:</b> ${esc(r.clono || '–')}</p><div class="btn-row"><button class="btn small" data-action="swipe-edit" data-i="${i}">Editar</button><button class="btn small" data-action="swipe-del" data-i="${i}">Borrar</button></div></div>`).join('');
    h = `<div class="kv"><div><b>Referencias</b><span class="mono">${refs.length} · ${refs.filter((r) => r.tipo === 'problema').length} del problema</span></div><div><b>Con análisis completo</b><span class="mono">${conAnalisis}/${refs.length}</span></div></div>${lista ? `<div class="swipe-list">${lista}</div><button class="btn small" data-action="copy-swipe">Copiar swipe (markdown)</button>` : '<p class="muted small">Todavía no hay referencias. La primera es la que más cuesta.</p>'}`;
  } else if (id === 'rutina') {
    let tot = 0, ok = 0; const per = RUTINA.map((d, di) => { const k = d.items.filter((_, i) => tv(id, `r${di}_${i}`, false)).length; tot += d.items.length; ok += k; return `<div><b>${d.dia}</b><span class="mono">${k}/${d.items.length}</span></div>`; }).join('');
    h = `<div class="big ${ok === tot ? 'good' : ok ? 'warn' : ''}"><b>${ok}/${tot}</b><span>${ok === tot ? 'Semana completa: las cinco horas hechas.' : 'Semana del ' + esc(tv(id, 'semana', hoy())) + '. Una hora al día alcanza si es la misma hora.'}</span></div><div class="kv">${per}</div>`;
  }
  out.innerHTML = h;
}


/* ---------- examen de arranque (asistente: una pregunta por pantalla) ---------- */
function ini() {
  if (!S.inicio) S.inicio = { resp: {}, done: false, fecha: null, v: 3, pos: -1 };
  if (!S.inicio.resp) S.inicio.resp = {};
  if (S.inicio.v !== 3) { const keep = {}; Object.keys(S.inicio.resp).forEach((k) => { if (/^A\d$/.test(k)) keep[k] = S.inicio.resp[k]; }); S.inicio = { resp: keep, done: false, fecha: null, v: 3, pos: -1 }; save(); }
  if (S.inicio.pos == null) S.inicio.pos = -1;
  return S.inicio;
}
const EX_ITEMS = EXAMEN_INICIO.flatMap((sec) => sec.items.map((it) => Object.assign({ sec: sec.b }, it)));
function respondida(it, v) { return v != null && v !== '' && !(Array.isArray(v) && !v.length); }
function calcInicio() {
  const r = ini().resp; const clases = {}; let minutos = 0; const cuenta = { dominada: 0, practica: 0, parcial: 0, nueva: 0 }; const nivelDe = {};
  EX_ITEMS.forEach((it) => { if (it.tipo === 'nivel' && r[it.id] != null) nivelDe[it.clase] = { n: r[it.id], txt: it.o[r[it.id]] }; });
  CLASES.forEach((c) => { const nv = nivelDe[c.n]; const estado = nv ? NIVEL_ESTADO[nv.n] : 'nueva'; const P = P_de(c.n); const min = P.duracion || ESTADOS[estado].min; minutos += min; cuenta[estado]++; clases[c.n] = { estado, nivel: nv ? nv.n : null, txt: nv ? nv.txt : '', min, modo: P.modo || ESTADOS[estado].modo }; });
  const total = EX_ITEMS.length, resp = EX_ITEMS.filter((it) => respondida(it, r[it.id])).length;
  return { clases, cuenta, minutos, total, resp };
}
function textoInicio(res) {
  const r = ini().resp;
  const abiertas = EX_ITEMS.filter((it) => it.tipo !== 'nivel').map((it) => { const v = r[it.id]; return `${it.id}: ${Array.isArray(v) ? v.join(', ') : it.tipo === 'select' ? (it.o[v] || '–') : (v || '–')}`; });
  return [`RUTA 24 · EXAMEN DE ARRANQUE · ${S.nombre || 'estudiante'} · ${ini().fecha || hoy()}`,
    `Ruta: ${res.cuenta.dominada} con método · ${res.cuenta.practica} falta método · ${res.cuenta.parcial} a su manera · ${res.cuenta.nueva} nuevas · ≈ ${(res.minutos / 60).toFixed(1).replace('.', ',')} h de 24`,
    'Nivel por clase (0 nuevo · 1 a su manera · 2 lo hace sin método · 3 con método): ' + CLASES.map((c) => `${c.n}:${res.clases[c.n].nivel == null ? '-' : res.clases[c.n].nivel}`).join(' '),
    'Respuestas: ' + abiertas.join(' | '),
    `CÓDIGO: RUTA24X:${btoa(unescape(encodeURIComponent(JSON.stringify({ nombre: S.nombre, inicio: S.inicio }))))}`].join('\n');
}
function waLink(txt) { return `https://wa.me/${CONFIG.profeWa || ''}?text=${encodeURIComponent(txt)}`; }

function viewExamen() {
  const st = ini(); const r = st.resp; const res = calcInicio();
  if (st.done) return viewResultado(res);
  const pos = st.pos, total = EX_ITEMS.length;
  if (pos < 0) return `<section class="view ex-intro">
    <div class="ex-hero">${ilus(0, 'big')}<p class="eyebrow">Paso 0 · antes de la clase 1</p><h1>¿En qué punto estás?</h1></div>
    <ul class="bul"><li>No hay respuestas buenas ni malas.</li><li>Por cada tema marcas cómo lo haces hoy. Una pregunta por pantalla.</li><li>Unos 15 minutos. Se guarda solo: puedes parar y seguir después.</li></ul>
    <button class="btn btn-primary btn-big" data-action="ex-start">${res.resp ? 'Continuar' : 'Empezar'} ${ico('next')}</button>
    ${res.resp ? `<p class="muted small">Llevas ${res.resp} de ${total}.</p>` : ''}
  </section>`;
  if (pos >= total) return `<section class="view ex-intro">
    <div class="ex-hero">${ilus(6, 'big')}<p class="eyebrow">Listo</p><h1>Ya está.</h1></div>
    <p class="lead">Con esto armamos tu ruta: qué clases van completas, cuáles se vuelven práctica y cuáles se repasan rápido.</p>
    <div class="btn-row"><button class="btn btn-primary btn-big" data-action="ex-done">Ver mi ruta ${ico('next')}</button><button class="btn" data-action="ex-prev">${ico('back')} Atrás</button></div>
  </section>`;
  const it = EX_ITEMS[pos]; const v = r[it.id]; const ok = respondida(it, v);
  let body = '';
  if (it.tipo === 'nivel') body = `<div class="ladder">${it.o.map((o, j) => `<button class="opt ${v === j ? 'sel' : ''}" data-exw="${it.id}" data-t="idx" data-o="${j}"><span class="n">${j}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
  else if (it.tipo === 'select') body = `<div class="ladder">${it.o.map((o, j) => `<button class="opt ${v === j ? 'sel' : ''}" data-exw="${it.id}" data-t="idx" data-o="${j}"><span>${esc(o)}</span></button>`).join('')}</div>`;
  else if (it.tipo === 'multi') body = `<div class="chips">${it.o.map((o) => `<button class="opt ${(v || []).includes(o) ? 'sel' : ''}" data-exw="${it.id}" data-t="multi" data-o="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
  else body = `<textarea rows="4" class="ex-ta" data-exw="${it.id}" data-t="txt" placeholder="Escribe con tus palabras…">${esc(v || '')}</textarea>`;
  const cls = it.clase ? claseDe(it.clase) : null;
  return `<section class="view ex-step">
    <div class="ex-top"><span class="eyebrow">${esc(it.sec)}${cls ? ` · clase ${it.clase}` : ''}</span><span class="mono muted">${pos + 1} / ${total}</span></div>
    <div class="ex-bar"><i style="width:${(pos) / total * 100}%"></i></div>
    <h2 class="ex-q">${esc(it.q)}</h2>
    ${it.tipo === 'nivel' ? '<p class="muted small">Marca la frase que más se parece a cómo lo haces hoy.</p>' : it.tipo === 'multi' ? '<p class="muted small">Puedes marcar varias.</p>' : ''}
    ${body}
    <div class="ex-nav"><button class="btn" data-action="ex-prev">${ico('back')} Atrás</button><button class="btn btn-primary" data-action="ex-next" ${ok ? '' : 'disabled'}>Siguiente ${ico('next')}</button></div>
  </section>`;
}
function tilesRuta(res) {
  return `<div class="tiles">${['dominada', 'practica', 'parcial', 'nueva'].map((k) => `<div class="tile ${ESTADOS[k].cls}"><b>${res.cuenta[k]}</b><span>${ESTADOS[k].label}</span><em>${ESTADOS[k].modo} · ${ESTADOS[k].min} min</em></div>`).join('')}<div class="tile total"><b>${(res.minutos / 60).toFixed(1).replace('.', ',')} h</b><span>de 24 estimadas</span><em>el profe ajusta el resto</em></div></div>`;
}
function viewResultado(res) {
  const txt = textoInicio(res);
  return `<section class="view">
    <div class="ex-hero">${ilus(6, 'big')}<p class="eyebrow">Examen de arranque · ${esc(ini().fecha || '')}</p><h1>Tu ruta</h1></div>
    <p class="lead">Qué clases van completas, cuáles son práctica y cuáles repaso rápido. El profe lo toma de aquí para armar tu cronograma.</p>
    ${tilesRuta(res)}
    <div class="card send"><h3>Mándaselo al profe</h3><p class="muted">Con esto arma tu cronograma y prepara la clase 1 para ti.</p><div class="btn-row"><a class="btn btn-primary" href="${waLink(txt)}" target="_blank" rel="noopener">${ico('wa')} Enviar por WhatsApp</a><button class="btn" data-action="copy-inicio">Copiar</button></div><p class="muted small" id="io-msg"></p></div>
    <h2 class="h2">Clase por clase</h2>
    ${MODULOS.map((m) => `<div class="mod-list" style="--h:${MOD_HUE[m.id]}"><div class="mod-list-h">${ilus(m.id, 'sm')}<b>${esc(MOD_TAG[m.id])}</b></div>${m.clases.map((k) => { const c = claseDe(k); const e = res.clases[k]; return `<a class="row" href="#/clase/${k}"><span class="num">${k}</span><span class="t">${esc(c.titulo)}<small>${esc(e.txt)}</small></span><span class="pill ${ESTADOS[e.estado].cls}">${e.modo} · ${e.min}'</span></a>`; }).join('')}</div>`).join('')}
    <p class="muted small" style="margin-top:20px"><button class="btn small" data-action="ex-reset">Volver a responder</button></p>
    <textarea class="hidden-txt" id="inicio-txt" readonly>${esc(txt)}</textarea>
  </section>`;
}

/* ---------- "para ti" y cierre ---------- */
function paraTi(n) {
  const st = ini(); const p = (typeof PERSONALIZADO !== 'undefined' && PERSONALIZADO.ejemplo && !PROFE && !st.done) ? {} : P_de(n); let pista = '';
  if (st.done) { const e = calcInicio().clases[n]; const E = ESTADOS[e.estado]; const t = { dominada: 'repaso rápido: 20 minutos y el resto es práctica con tu producto.', practica: 'ya lo haces; hoy le ponemos método con tu producto.', parcial: 'lo has hecho a tu manera; hoy ves qué cambia con método.', nueva: 'va completa y con calma. Pregunta todo.' }[e.estado]; pista = `<span class="pill ${E.cls}">${E.label}</span> ${t}${p.nota ? ` <b>${esc(p.nota)}</b>` : ''}`; }
  if (!p.enfoque && !p.paraTi && !pista) return '';
  return `<div class="card parati"><span class="pill pill-ti">para ti${S.nombre ? ', ' + esc(S.nombre.split(' ')[0]) : ''}</span>
    ${pista ? `<p>${pista}</p>` : ''}${p.enfoque ? `<p class="parati-enf">${esc(p.enfoque)}</p>` : ''}${p.paraTi && p.paraTi.length ? `<ul class="bul">${p.paraTi.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}${p.saltamos && p.saltamos.length ? `<p class="muted small"><b>Nos saltamos:</b> ${p.saltamos.map(esc).join(' · ')}</p>` : ''}</div>`;
}
function textoCierre(n) {
  const c = claseDe(n), s = cl(n), ci = s.cierre || {};
  return [`RUTA 24 · CIERRE CLASE ${n} · ${S.nombre || 'estudiante'} · ${hoy()}`, c.titulo, `Quiz ${s.quiz ? s.quiz.score + '/' + s.quiz.total : '–'} · Tareas ${(s.tareas || []).filter(Boolean).length}/${c.tarea.length} · Confianza ${ci.conf || '–'}/5 · Tarea solo: ${ci.solo || '–'}`, `Me llevo: ${ci.llevo || '–'}`, `No me quedó claro: ${ci.duda || '–'}`].join('\n');
}
function cierreClase(n) {
  const ci = cl(n).cierre || {}; const txt = textoCierre(n);
  return `<div class="card cierre"><h3>Al terminar la clase <span class="muted small">2 minutos</span></h3>
    <label class="f"><span>¿Qué te llevas de hoy?</span><textarea rows="2" data-cierre="llevo">${esc(ci.llevo || '')}</textarea></label>
    <label class="f"><span>¿Qué no te quedó claro?</span><textarea rows="2" data-cierre="duda">${esc(ci.duda || '')}</textarea></label>
    <div class="f"><span>Confianza para aplicarlo solo</span><div class="rating">${[1, 2, 3, 4, 5].map((k) => `<button class="opt ${+ci.conf === k ? 'sel' : ''}" data-cierre-btn="conf" data-o="${k}">${k}</button>`).join('')}</div></div>
    <div class="f"><span>¿Puedes hacer la tarea sin ayuda?</span><div class="chips">${['sí', 'no', 'con dudas'].map((o) => `<button class="opt ${ci.solo === o ? 'sel' : ''}" data-cierre-btn="solo" data-o="${o}">${o}</button>`).join('')}</div></div>
    <div class="btn-row"><a class="btn btn-primary" href="${waLink(txt)}" target="_blank" rel="noopener">${ico('wa')} Enviar al profe</a><button class="btn small" data-action="copy" data-target="cierre-txt-${n}" data-label="Copiar">Copiar</button></div>
    <textarea class="hidden-txt" id="cierre-txt-${n}" readonly>${esc(txt)}</textarea></div>`;
}

/* ---------- tableros: diario y COD (filas por fecha, un día por fila) ---------- */
const FILAS = { diario: { pref: 'd_', campos: ['gasto', 'compras', 'imp', 'clics', 'lpv', 'atc'] }, cod: { pref: 'c_', campos: ['pedidos', 'confirmados', 'entregados', 'devueltos'] } };
function filasDe(id) { const t = tool(id); if (!t.filas) t.filas = {}; return t.filas; }
function bepAuto() { const b = tool('bep'); if (!b.precio) return ''; const precio = num(b.precio), costo = num(tv('bep', 'costo', 28000)), envio = num(tv('bep', 'envio', 12000)), com = num(tv('bep', 'comision', 3.5)), otros = num(tv('bep', 'otros', 2000)); const v = Math.round(precio - costo - envio - precio * com / 100 - otros); return v > 0 ? v : ''; }
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fechaDia = (f) => { const p = String(f).split('-'); return p.length === 3 ? `${parseInt(p[2], 10)} ${MESES[parseInt(p[1], 10) - 1] || ''}` : f; };
const ESTADO_DIARIO = {
  'sin-bep': { cls: '', tag: '· sin BEP', titulo: 'Escribe tu BEP', txt: () => 'Sin BEP no hay semáforo: el CPA se compara contra él. Sale de la calculadora BEP (clase 1).' },
  'pocos': { cls: '', tag: '· esperando', titulo: 'Todavía no son 7 días', txt: (r) => `Llevas ${r.registrados} de 7. La decisión se toma con 7 días completos sin cambios; mientras tanto solo se registra.` },
  'sin-ventas-revisar': { cls: 'bad', tag: '! revisar', titulo: 'Gasto sin ventas', txt: () => 'Ya van más de 2× BEP gastados sin una venta: revisa el pixel (Test Events), haz un pedido de prueba y revisa el checkout. La campaña no se toca.' },
  'sin-ventas-esperar': { cls: 'warn', tag: '~ esperar', titulo: 'Sin ventas todavía', txt: () => 'Normal en los primeros días: el gasto aún no llega a 2× BEP. Espera y sigue registrando.' },
  'rentable': { cls: 'good', tag: '✓ rentable', titulo: 'Rentable', txt: (r) => r.racha >= 3 ? 'Tres días seguidos con CPA bajo el BEP y sin cambios: escala +15 % entre 10 am y 12 m y anota la fecha.' : 'CPA bajo el BEP. Espera 3 días seguidos así, sin tocar nada, antes de escalar.' },
  'gris': { cls: 'warn', tag: '~ zona gris', titulo: 'Entre BEP y 1,5× BEP', txt: () => 'Ni escalar ni pausar: espera más datos o sube 3 creativos nuevos al grupo que ya corre.' },
  'alto': { cls: 'bad', tag: '! sobre 1,5× BEP', titulo: 'CPA alto', txt: () => 'Con 7 días de muestra: itera creativos ya (3 nuevos al mismo grupo). Si sigue así 5 días más, pausa y diagnostica.' },
};
function tileEntregados(r) { // solo cuando las filas traen entregados (el caso real): el CPA que de verdad pagas
  const con = r.dias.filter((d) => !d.sinDato && d.entregados != null); if (!con.length) return '';
  const ent = con.reduce((a, d) => a + d.entregados, 0), gasto = con.reduce((a, d) => a + d.gasto, 0); const cpaE = ent > 0 ? gasto / ent : null;
  const cls = cpaE == null || !r.bep ? '' : cpaE <= r.bep ? 'good' : cpaE <= 1.5 * r.bep ? 'warn' : 'bad';
  return `<div class="${cls}"><b>${cpaE == null ? '—' : fmt(cpaE)}</b><span>CPA por pedido entregado</span><em>${ent} entregados de ${r.compras} pedidos${cls === 'bad' ? ' · ! sobre el BEP' : cls === 'warn' ? ' · ~ cerca del BEP' : ''}</em></div>`;
}
function tilesDiario(r) {
  const E = ESTADO_DIARIO[r.estado] || ESTADO_DIARIO.pocos; const n = r.conDatos;
  return `<div class="metrics">
    <div class="${E.cls}"><b>${r.cpa == null ? (r.gasto ? 'sin ventas' : '—') : fmt(r.cpa)}</b><span>CPA ${n} d${r.bep ? ' · BEP ' + fmt(r.bep) : ''}</span><em>${E.tag}</em></div>
    <div><b>${fmt(r.gasto)}</b><span>Gasto ${n} d</span></div>
    <div><b>${r.compras}</b><span>Ventas ${n} d</span></div>
    <div class="${r.racha >= 3 && r.estado === 'rentable' ? 'good' : ''}"><b>${r.racha}</b><span>días seguidos con CPA &lt; BEP</span><em>${r.racha >= 3 ? '✓ puedes escalar +15 %' : 'con 3 seguidos, +15 %'}</em></div>
    ${tileEntregados(r)}
  </div><div class="big ${E.cls}"><b>${E.titulo}</b><span>${esc(E.txt(r))}</span></div>`;
}
/* Sparkline: arriba el CPA por día (línea) contra el BEP; abajo las ventas (barras). Sin librerías. */
function spark(dias, bep, resalta) {
  const n = dias.length; if (!n) return '';
  const W = 336, H = 100, top = 8, hL = 52, hB = 26, yB = H - 2;
  const cpas = dias.filter((d) => !d.sinDato && d.cpa != null).map((d) => d.cpa);
  const maxC = Math.max(bep ? bep * 1.7 : 0, ...cpas, 1), maxV = Math.max(...dias.filter((d) => !d.sinDato).map((d) => d.compras), 1);
  const x = (i) => n === 1 ? W / 2 : 10 + i * (W - 20) / (n - 1);
  const yL = (v) => top + hL - Math.min(v, maxC) / maxC * hL;
  const bw = Math.max(3, Math.min(14, (W - 20) / n - 2));
  let path = '', prev = false;
  dias.forEach((d, i) => { const ok = !d.sinDato && d.cpa != null; if (ok) path += (prev ? 'L' : 'M') + x(i).toFixed(1) + ' ' + yL(d.cpa).toFixed(1) + ' '; prev = ok; });
  const tit = (d) => `${fechaDia(d.fecha)}: ${d.compras} ventas · gasto ${fmt(d.gasto)}${d.cpa != null ? ' · CPA ' + fmt(d.cpa) : ''}`;
  const enV = (i) => resalta ? (i >= resalta[0] && i <= resalta[1]) : i === n - 1;
  const bars = dias.map((d, i) => { if (d.sinDato) return `<rect x="${(x(i) - 1.5).toFixed(1)}" y="${yB - 3}" width="3" height="3" class="sp-gap"><title>${fechaDia(d.fecha)}: sin registro</title></rect>`; const hh = Math.max(d.compras ? 2 : 0, d.compras / maxV * hB); return `<rect x="${(x(i) - bw / 2).toFixed(1)}" y="${(yB - hh).toFixed(1)}" width="${bw.toFixed(1)}" height="${hh.toFixed(1)}" rx="2" class="sp-bar ${enV(i) ? 'on' : ''}"><title>${tit(d)}</title></rect>`; }).join('');
  const pts = dias.map((d, i) => { if (d.sinDato) return ''; if (d.cpa == null) return `<circle cx="${x(i).toFixed(1)}" cy="${(top + hL).toFixed(1)}" r="3" class="sp-zero"><title>${tit(d)}</title></circle>`; return `<circle cx="${x(i).toFixed(1)}" cy="${yL(d.cpa).toFixed(1)}" r="${enV(i) ? 4 : 2.5}" class="sp-pt ${enV(i) ? 'on' : ''} ${bep && d.cpa > bep ? 'over' : ''}"><title>${tit(d)}</title></circle>`; }).join('');
  const bepL = bep ? `<line x1="4" x2="${W - 4}" y1="${yL(bep).toFixed(1)}" y2="${yL(bep).toFixed(1)}" class="sp-bep"/>` : '';
  const base = `<line x1="4" x2="${W - 4}" y1="${(top + hL + 0.5).toFixed(1)}" y2="${(top + hL + 0.5).toFixed(1)}" class="sp-axis"/>`;
  return `<figure class="spark"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="CPA por día contra el BEP, y ventas por día">${base}${bepL}<path d="${path.trim()}" class="sp-line"/>${pts}${bars}</svg>
    <figcaption><span class="mono">${fechaDia(dias[0].fecha)}</span><span class="spark-leg"><i class="k-line"></i>CPA por día${bep ? ' <i class="k-bep"></i>BEP' : ''} <i class="k-bar"></i>ventas</span><span class="mono">${fechaDia(dias[n - 1].fecha)}</span></figcaption></figure>`;
}
function tablaDiario(id, dias, edit) {
  const conImp = dias.some((d) => !d.sinDato && d.imp), conEnt = dias.some((d) => !d.sinDato && d.entregados != null);
  const rows = dias.slice().reverse().filter((d) => !d.sinDato).map((d) => `<tr><td class="dia">${edit ? `<button class="linkish dia-btn" data-action="fila-edit" data-tool="${id}" data-f="${d.fecha}" aria-label="Editar el ${fechaDia(d.fecha)}">${fechaDia(d.fecha)} ${ico('edit')}</button>` : fechaDia(d.fecha)}</td><td class="mono">${fmt(d.gasto)}</td><td class="mono">${d.compras}</td>${conEnt ? `<td class="mono">${d.entregados == null ? '–' : d.entregados}</td>` : ''}<td class="mono ${d.cpa == null ? '' : d.cpa <= (num(tv(id, 'bep', bepAuto())) || Infinity) ? 'good' : 'bad'}">${d.cpa == null ? '–' : fmt(d.cpa)}</td>${conImp ? `<td class="mono">${d.ctr == null ? '–' : pct(d.ctr, 2)}</td>` : ''}</tr>`).join('');
  return `<div class="table-wrap tall"><table class="tbl"><thead><tr><th>Día</th><th>Gasto</th><th>Ventas</th>${conEnt ? '<th>Entreg.</th>' : ''}<th>CPA</th>${conImp ? '<th>CTR</th>' : ''}</tr></thead><tbody>${rows}</tbody></table></div>${edit ? '<p class="muted small">Toca la fecha de un día para editarlo.</p>' : ''}`;
}
function tableroDiario(r, opts) {
  const id = opts.id; const filas = filasDe(id); const todas = CALC.serie(filas);
  if (!todas.length) return `<p class="muted small">Sin días registrados. El primero cuesta; del segundo en adelante es rutina.</p>`;
  return `${tilesDiario(r)}${spark(todas.length > 7 ? todas : r.dias, r.bep, todas.length > 7 ? [todas.length - r.dias.length, todas.length - 1] : null)}${tablaDiario(id, todas, true)}
    <div class="btn-row"><button class="btn small" data-action="copy-diario">Copiar registro (para Claude)</button></div>`;
}
function textoDiario() {
  const t = tool('diario'); const dias = CALC.serie(filasDe('diario')).filter((d) => !d.sinDato);
  return [`TABLERO DIARIO · ${t.producto || 'producto'} · BEP ${fmt(num(tv('diario', 'bep', bepAuto())))}`, '', '| Día | Gasto | Compras | CPA | Impresiones | Clics | LPV |', '|---|---|---|---|---|---|---|'].concat(dias.map((d) => `| ${d.fecha} | ${Math.round(d.gasto)} | ${d.compras} | ${d.cpa == null ? '' : Math.round(d.cpa)} | ${d.imp || ''} | ${d.clics || ''} | ${d.lpv || ''} |`)).join('\n');
}
function tableroCOD(r, id) {
  if (!r.filas.length) return `<p class="muted small">Sin pedidos registrados. Cuando entre el primero, anótalo el mismo día.</p>`;
  const P = (v) => v == null ? '—' : pct(v * 100, 0);
  const w = (v) => r.pedidos ? Math.round(v / r.pedidos * 100) : 0;
  const tasaReal = r.entregaSobrePedidos == null ? null : Math.round(r.entregaSobrePedidos * 100);
  const rows = r.filas.slice().reverse().map((f) => `<tr><td class="dia"><button class="linkish dia-btn" data-action="fila-edit" data-tool="${id}" data-f="${f.fecha}" aria-label="Editar el ${fechaDia(f.fecha)}">${fechaDia(f.fecha)} ${ico('edit')}</button></td><td class="mono">${f.pedidos}</td><td class="mono">${f.confirmados}</td><td class="mono">${f.entregados}</td><td class="mono ${f.devueltos ? 'bad' : ''}">${f.devueltos}</td><td class="mono">${f.transito}</td></tr>`).join('');
  return `<div class="metrics">
      <div class="${r.estados.conf || ''}"><b>${P(r.conf)}</b><span>Confirmación</span><em>${r.estados.conf === 'good' ? '✓ meta ≥ 85 %' : r.estados.conf ? '! meta ≥ 85 %' : 'meta ≥ 85 %'}</em></div>
      <div class="${r.estados.entrega || ''}"><b>${P(r.entrega)}</b><span>Entrega (de los resueltos)</span><em>${r.estados.entrega === 'good' ? '✓ meta ≥ 75 %' : r.estados.entrega ? '! meta ≥ 75 %' : 'aún nada resuelto'}</em></div>
      <div class="${r.devol != null && r.devol > 0.25 ? 'bad' : ''}"><b>${P(r.devol)}</b><span>Devoluciones</span><em>${r.devueltos} de ${r.entregados + r.devueltos} resueltos</em></div>
      <div><b>${r.transito}</b><span>En tránsito</span><em>confirmados sin resolver</em></div>
    </div>
    <div class="funnel">
      <div class="fu-row"><span>Pedidos</span><i style="width:100%"></i><b>${r.pedidos}</b></div>
      <div class="fu-row"><span>Confirmados</span><i style="width:${w(r.confirmados)}%"></i><b>${r.confirmados}</b></div>
      <div class="fu-row"><span>Entregados</span><i style="width:${w(r.entregados)}%"></i><b>${r.entregados}</b></div>
      <div class="fu-row bad"><span>Devueltos</span><i style="width:${w(r.devueltos)}%"></i><b>${r.devueltos}</b></div>
      <div class="fu-row mute"><span>En tránsito</span><i style="width:${w(r.transito)}%"></i><b>${r.transito}</b></div>
    </div>
    ${r.bepEfectivo != null ? `<div class="big ${r.bepEfectivo > 0 ? (r.bepEfectivo / r.bep > 0.6 ? 'good' : 'warn') : 'bad'}"><b>${fmt(r.bepEfectivo)}</b><span>BEP efectivo real: de cada pedido que pagas en Meta, esto es lo que de verdad te queda como margen para publicidad. Confirmación ${P(r.conf)} × (entrega ${P(r.entrega)} × BEP − devoluciones ${P(r.devol)} × ${fmt(num(tv(id, 'devolucion', '')))}).</span></div>` : tasaReal != null ? '<p class="muted small">Escribe tu BEP y el costo de una devolución para ver el BEP efectivo real.</p>' : ''}
    ${tasaReal != null ? `<div class="btn-row"><button class="btn small" data-action="cod-usar-tasa" data-v="${tasaReal}">Usar mi tasa real (${tasaReal} % de los pedidos) en la calculadora BEP</button><span class="muted small" id="msg-tasa"></span></div>` : ''}
    <div class="table-wrap tall"><table class="tbl"><thead><tr><th>Pedidos del</th><th>Ped.</th><th>Conf.</th><th>Entr.</th><th>Dev.</th><th>Tráns.</th></tr></thead><tbody>${rows}</tbody></table></div><p class="muted small">Toca la fecha de un día para actualizarlo.</p>
    <div class="btn-row"><button class="btn small" data-action="copy-cod">Copiar tablero (para Claude)</button></div>`;
}
function textoCOD() {
  const r = CALC.tasasCOD(filasDe('cod'));
  return [`TABLERO COD · pedidos ${r.pedidos} · confirmación ${r.conf == null ? '–' : Math.round(r.conf * 100) + ' %'} · entrega ${r.entrega == null ? '–' : Math.round(r.entrega * 100) + ' %'}`, '', '| Pedidos del | Pedidos | Confirmados | Entregados | Devueltos | En tránsito |', '|---|---|---|---|---|---|'].concat(r.filas.map((f) => `| ${f.fecha} | ${f.pedidos} | ${f.confirmados} | ${f.entregados} | ${f.devueltos} | ${f.transito} |`)).join('\n');
}

/* ---------- fichas (formulario + copiar en markdown) ---------- */
function fichaVal(id, f) {
  const v = tv(id, f[0], ''); if (v !== '' || id !== 'diagnostico') return v;
  const r = ini().resp; const it = (k) => EX_ITEMS.find((x) => x.id === k); // el diagnóstico arranca con lo del examen
  const de = { vendido: 'A1', inversion: 'A2', mejor: 'A3', peor: 'A4', horas: 'A5', montado: 'A6', meta: 'A7' }[f[0]]; if (!de || r[de] == null) return '';
  const x = it(de); const val = r[de]; if (Array.isArray(val)) return val.join(', '); if (x && x.tipo === 'select') return x.o[val] || ''; return val;
}
function fichaForm(id, def) {
  return def.map((sec) => `<h4>${esc(sec.s)}</h4><div class="fields fields-1">${sec.f.map((f) => f[2] === 'ta' ? `<label class="f f-wide"><span>${esc(f[1])}</span><textarea rows="2" data-tool="${id}" data-f="${f[0]}">${esc(fichaVal(id, f))}</textarea></label>` : f[2] === 'sel' ? sel(id, f[0], f[1], [''].concat(f[3]), '') : `<label class="f"><span>${esc(f[1])}</span><input type="text" inputmode="text" data-tool="${id}" data-f="${f[0]}" value="${esc(fichaVal(id, f))}"></label>`).join('')}</div>`).join('');
}
function fichaBotones(id) { return `<div class="btn-row"><button class="btn btn-primary" data-action="copy-ficha" data-tool="${id}">Copiar ficha (markdown)</button><a class="btn" id="wa-${id}" href="${waLink(fichaMD(id))}" target="_blank" rel="noopener">${ico('wa')} Enviar al profe</a></div>`; }
function fichaMD(id) {
  const def = id === 'ficha' ? FICHA_PRODUCTO : FICHA_DIAG; const t = tool(id);
  const nombre = id === 'ficha' ? (t.nombre || 'mi producto') : (S.nombre || 'estudiante');
  const slug = String(nombre).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'producto';
  const head = id === 'ficha' ? [`# Ficha de producto — ${nombre}`, `<!-- guardar como mi-negocio/productos/${slug}/ficha.md -->`] : [`# Ficha de diagnóstico — ${nombre}`, '<!-- guardar como mi-negocio/diagnostico.md -->'];
  const out = head.concat([`_Ruta 24 · ${hoy()}_`, '']);
  def.forEach((sec) => { out.push(`## ${sec.s}`); sec.f.forEach((f) => { const v = String(fichaVal(id, f)).trim(); out.push(`- **${f[1]}:** ${v ? v.replace(/\n+/g, ' / ') : '_(pendiente)_'}`); }); out.push(''); });
  return out.join('\n');
}
function textoSwipe() {
  const refs = tool('swipe').refs || [];
  return [`# Swipe file — ${S.nombre || 'estudiante'} · ${hoy()}`, ''].concat(refs.map((r, i) => [`## ${i + 1}. ${r.hook || '(sin hook)'}`, `- **Link:** ${r.url || '–'}`, `- **Formato:** ${r.formato || '–'} · **del ${r.tipo || 'producto'}** · **ángulo:** ${r.angulo || '–'}`, `- **Por qué funciona:** ${r.porque || '–'}`, `- **Qué clono:** ${r.clono || '–'}`, ''].join('\n'))).join('\n');
}

/* ---------- ejemplos del profe dentro de la clase ---------- */
function ejemplosCard(n) {
  const ej = (typeof EJEMPLOS !== 'undefined' && EJEMPLOS[n]) || []; if (!ej.length) return '';
  const items = ej.map((e, i) => e.tipo === 'caso' ? casoBox(e, n) : `<a class="rec ej" href="${esc(e.url)}" target="_blank" rel="noopener"><span class="pill">${esc(e.tipo)}</span><span><b>${esc(e.t)}</b>${e.pruebas ? ' <span class="pill warn">en pruebas</span>' : ''}<small>${esc(e.nota || '')}</small></span>${ico('next')}</a>`).join('');
  return `<div class="card"><h3>Ejemplos</h3><p class="muted small">Del profe. Ábrelos en el celular; cada uno dice en qué fijarte.</p><div class="rec-list">${items}</div></div>`;
}
function casoFilas(e) { const f = {}; e.serie.forEach((r) => { f[r[0]] = { gasto: r[1], compras: r[2], entregados: r[3] }; }); return f; }
function casoOut(e) {
  const filas = casoFilas(e); const todas = CALC.serie(filas); const t = tool('caso'); const hasta = t.hasta && filas[t.hasta] ? t.hasta : todas[todas.length - 1].fecha;
  const idx = todas.findIndex((d) => d.fecha === hasta); const r = CALC.cpa7(filas, { bep: e.bep, hasta });
  const ini0 = Math.max(0, idx - r.dias.length + 1);
  return `${tilesDiario(r)}${spark(todas, e.bep, [ini0, idx])}`;
}
function casoBox(e, n) {
  const filas = casoFilas(e); const todas = CALC.serie(filas); const t = tool('caso'); const hasta = t.hasta && filas[t.hasta] ? t.hasta : todas[todas.length - 1].fecha; const idx = todas.findIndex((d) => d.fecha === hasta);
  return `<div class="caso" id="caso-${n}"><div class="caso-h"><span class="pill">caso real</span><b>${esc(e.t)}</b><p class="small">${esc(e.nota)}</p></div>
    <label class="caso-range"><span>Estás en el <b id="caso-dia">día ${idx + 1} · ${fechaDia(hasta)}</b></span><input type="range" min="0" max="${todas.length - 1}" value="${idx}" data-caso="${n}" aria-label="Día del caso"></label>
    <div class="caso-out">${casoOut(e)}</div>
    <details class="plain"><summary>Todos los días y lo que enseña</summary>${tablaDiario('caso', todas, false)}<ul class="bul small">${(e.lecciones || []).map((l) => `<li>${esc(l)}</li>`).join('')}</ul></details></div>`;
}

/* ---------- kit: rechazos y fatiga ---------- */
function rechazosHTML() {
  const R = RECHAZOS;
  return `<p class="small">${esc(R.intro)}</p>
    <h4>En cualquier categoría</h4>
    <div class="rech">${R.general.map((f) => `<div class="rech-it"><p class="rech-no">${esc(f[0])}</p><p class="rech-why muted small">${esc(f[1])}</p><p class="rech-si">${esc(f[2])}</p></div>`).join('')}</div>
    ${R.categorias.map((c) => `<h4>${esc(c.n)}</h4><div class="rech">${c.items.map((f) => `<div class="rech-it"><p class="rech-no">${esc(f[0])}</p><p class="rech-si">${esc(f[1])}</p></div>`).join('')}</div>`).join('')}
    <h4>Si igual te lo rechazan</h4><ol class="rules">${R.cierre.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`;
}
function fatigaHTML() {
  const F = FATIGA;
  return `<p class="small">${esc(F.intro)}</p>
    <h4>Las señales, en orden de gravedad</h4><ol class="rules">${F.senales.map((x) => `<li><b>${esc(x[0])}.</b> ${esc(x[1])}</li>`).join('')}</ol>
    <h4>Qué hacer</h4><ul class="bul small">${F.hacer.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    <h4>Lo que acelera el colapso</h4><ul class="bul small">${F.acelera.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    <h4>"Funcionó dos semanas y se cayó"</h4><p class="small">${esc(F.colapso)}</p>
    <h4>El ritmo que la evita</h4><div class="kv">${F.ritmo.map((x) => `<div><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('')}</div>
    <h4>Chequeo de 1 minuto, cada lunes</h4><ul class="bul small">${F.chequeo.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><p class="small"><b>${esc(F.chequeoCierre)}</b></p>`;
}

/* ---------- vista: inicio ---------- */
function viewInicio() {
  const n = hechas(), sig = siguiente(); const st = ini(); const RES = st.done ? calcInicio() : null;
  const P0 = (typeof PERSONALIZADO !== 'undefined' && PERSONALIZADO.perfil) || null;
  const P = P0 && (!PERSONALIZADO.ejemplo || PROFE || st.done) ? P0 : null; // el ejemplo no se muestra a un estudiante nuevo
  const nombre = (S.nombre || '').trim();
  const r = 26, circ = 2 * Math.PI * r;
  const next = !st.done
    ? `<a class="next" href="#/examen" style="--h:${MOD_HUE[0]}">${ilus(0)}<div><span class="eyebrow">Paso 0 · 15 min</span><b>¿En qué punto estás?</b><span class="muted">Sin respuestas buenas ni malas. Con esto se arma tu ruta.</span></div>${ico('next')}</a>`
    : sig ? `<a class="next" href="#/clase/${sig.n}" style="--h:${MOD_HUE[sig.mod]}">${ilus(sig.mod)}<div><span class="eyebrow">${n === 0 ? 'Empieza por aquí' : 'Siguiente clase'} · Semana ${SEMANA_DE[sig.n] || '–'}</span><b>${sig.n}. ${esc(sig.titulo)}</b><span class="muted">${esc(sig.lleva)}</span></div>${ico('next')}</a>`
    : `<div class="next done" style="--h:${MOD_HUE[8]}">${ilus(8)}<div><span class="eyebrow">Curso completo</span><b>Las 24 clases están hechas.</b><span class="muted">Ahora lo importante: que tu rutina semanal corra 12 semanas seguidas.</span></div></div>`;
  return `<section class="view">
    <header class="hello">
      <div><p class="eyebrow">Ruta 24 · dropshipping con IA</p><h1>${nombre ? 'Hola, ' + esc(nombre.split(' ')[0]) : 'Hola'} ${nombre && !EDIT_NAME ? `<button class="linkish" data-action="edit-name" title="Cambiar nombre">${ico('edit')}</button>` : ''}</h1>
      ${(!nombre || EDIT_NAME) ? `<form class="name-form" data-form="nombre"><input type="text" name="nombre" value="${esc(S.nombre || '')}" placeholder="Escribe tu nombre" autocomplete="off" maxlength="40"><button class="btn small btn-primary" type="submit">Guardar</button></form>` : ''}
      <p class="muted">${n === 0 ? 'Todavía no has empezado.' : `${n} de 24 clases hechas.`}</p></div>
      <div class="ring-wrap"><svg viewBox="0 0 64 64" class="ring"><circle cx="32" cy="32" r="${r}" class="ring-bg"/><circle cx="32" cy="32" r="${r}" class="ring-fg" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - n / 24)}"/></svg><b>${n}</b></div>
    </header>
    ${next}
    ${RES ? `<h2 class="h2">Tu ruta ajustada <a class="small linkish" href="#/examen">ver</a></h2>${tilesRuta(RES)}` : ''}
    ${P ? `<div class="card perfil"><span class="pill pill-ti">del profe</span>${PERSONALIZADO.ejemplo ? '<span class="pill">ejemplo</span>' : ''}<p>${esc(P.resumen || '')}</p>${PERSONALIZADO.ruta && PERSONALIZADO.ruta.resumen ? `<p class="muted small">${esc(PERSONALIZADO.ruta.resumen)}</p>` : ''}</div>` : ''}
    <h2 class="h2">Los 6 hitos</h2>
    <div class="hitos">${HITOS.map((h) => `<a href="#/clase/${h.clase}" class="hito ${hitoOk(h) ? 'ok' : ''}">${ico(hitoOk(h) ? 'check' : 'hito')}<b>${esc(h.nombre)}</b><span>clase ${h.clase}</span></a>`).join('')}</div>
    <h2 class="h2">El camino</h2>
    <div class="camino">${MODULOS.map((m) => { const done = m.clases.filter((k) => cl(k).estado === 'hecha').length; const sem = [...new Set(m.clases.map((k) => SEMANA_DE[k]))].filter(Boolean); return `<details class="mod" style="--h:${MOD_HUE[m.id]}" ${sig && m.clases.includes(sig.n) ? 'open' : ''}><summary>${ilus(m.id)}<div><span class="eyebrow">Módulo ${m.id} · ${sem.length ? 'semana ' + sem.join('-') : ''}</span><b>${esc(MOD_TAG[m.id])}</b><span class="muted small">${m.clases.length === 1 ? '1 clase' : m.clases.length + ' clases'}${done ? ` · ${done} hechas` : ''}</span></div><span class="mod-prog"><i style="height:${done / m.clases.length * 100}%"></i></span></summary>${m.clases.map((k) => claseRow(k, RES)).join('')}</details>`; }).join('')}</div>
    <details class="card plain"><summary><b>Antes de la clase 1: lo que necesitas</b> <span class="mono muted">${S.prereq.filter(Boolean).length}/${PREREQ.length}</span></summary><div class="tasks">${PREREQ.map((t, i) => `<label class="task"><input type="checkbox" data-prereq="${i}" ${S.prereq[i] ? 'checked' : ''}><span>${esc(t)}</span></label>`).join('')}</div><p class="muted small">Presupuesto de prueba: mínimo 3× tu BEP por día durante 7 días (normalmente $150.000-$300.000/día). Herramientas: ≈ USD 80-150/mes.</p></details>
    ${PROFE ? profeResumen() : ''}
    <footer class="foot"><div class="btn-row"><button class="btn small" data-action="export">Copiar mi progreso</button><button class="btn small" data-action="import-show">Pegar progreso</button><button class="btn small" data-action="resumen">Resumen para el profe</button></div><form class="import-form" data-form="import" hidden><textarea rows="3" name="codigo" placeholder="Pega aquí el código de progreso (empieza por RUTA24:)"></textarea><button class="btn small btn-primary" type="submit">Cargar</button></form><p class="muted small" id="io-msg"></p><p class="muted small"><a href="#/profe">${PROFE ? 'Salir del modo profe' : 'Modo profe'}</a> · <span class="mono">v${typeof BUILD !== 'undefined' ? BUILD : '?'}</span>${PROFE ? ' · <a href="#/demo">Ver ejemplo (Camilo)</a>' : ''} · <button class="linkish" data-action="reset-all">Borrar progreso</button></p></footer>
  </section>`;
}
function claseRow(k, RES) {
  const c = claseDe(k); const st = cl(k).estado; const e = RES && RES.clases[k]; const P = P_de(k);
  return `<a class="row st-${st}" href="#/clase/${k}"><span class="num">${k}</span><span class="t">${esc(c.titulo)}${c.hito ? ` <span class="h">${c.hito}</span>` : ''}</span><span class="st">${st === 'hecha' ? ico('check') : st === 'en-curso' ? '<span class="pill warn">en curso</span>' : e ? `<span class="pill ${ESTADOS[e.estado].cls}">${P.modo || e.modo}</span>` : ''}</span></a>`;
}
function profeResumen() {
  const rows = CLASES.map((c) => { const s = cl(c.n); return `<tr><td class="mono">${c.n}</td><td>${esc(c.titulo)}</td><td><span class="pill st-${s.estado}">${s.estado.replace('-', ' ')}</span></td><td class="mono">${(s.tareas || []).filter(Boolean).length}/${c.tarea.length}</td><td class="mono">${s.quiz ? s.quiz.score + '/' + s.quiz.total : '–'}</td></tr>`; }).join('');
  return `<details class="card plain"><summary><b>Estado del estudiante</b> <span class="pill pill-profe">profe</span></summary><div class="table-wrap"><table class="tbl"><thead><tr><th>#</th><th>Clase</th><th>Estado</th><th>Tareas</th><th>Quiz</th></tr></thead><tbody>${rows}</tbody></table></div>
  ${ini().done ? `<details class="prompt"><summary>Examen de arranque (texto para /curso-24 perfil)</summary><div class="prompt-body"><button class="btn small" data-action="copy" data-target="pt-inicio" data-label="Copiar">Copiar</button><pre id="pt-inicio">${esc(textoInicio(calcInicio()))}</pre></div></details>` : '<p class="muted small">Examen de arranque: sin presentar.</p>'}</details>`;
}

/* ---------- vista: clases por semana (como el doc) ---------- */
function viewClases() {
  const RES = ini().done ? calcInicio() : null;
  return `<section class="view">
    <p class="eyebrow">Las 24 clases</p><h1>Semana a semana</h1>
    <p class="muted">3 por semana hasta la 15; 2 por semana desde el lanzamiento, porque la campaña necesita días sin tocarla.</p>
    ${SEMANAS.map((s) => `<div class="semana"><div class="semana-h"><b>Semana ${s.n}</b>${s.nota ? `<span class="muted small">${esc(s.nota)}</span>` : ''}</div>${s.clases.map((k) => { const c = claseDe(k); return `<div style="--h:${MOD_HUE[c.mod]}">${claseRow(k, RES)}</div>`; }).join('')}</div>`).join('')}
  </section>`;
}

/* ---------- vista: clase ---------- */
function viewClase(n) {
  const c = claseDe(n); if (!c) return '<p>No existe esa clase.</p>';
  const s = cl(n), m = modDe(c.mod), P = P_de(n);
  const hito = c.hito ? HITOS.find((h) => h.id === c.hito) : null;
  const prev = n > 1 ? claseDe(n - 1) : null, next = n < 24 ? claseDe(n + 1) : null;
  const temas = c.hora.filter((b) => !/^(tarea|compromiso|publicar|lanzar|campaña|decisión real|plan de contingencia)$/i.test(b[2])).map((b) => b[2]);
  const tareas = c.tarea.map((t, i) => `<label class="task"><input type="checkbox" data-task="${i}" ${s.tareas[i] ? 'checked' : ''}><span>${esc(t)}</span></label>`).join('') + (P.tareaExtra || []).map((t) => `<label class="task extra"><input type="checkbox" disabled><span>${esc(t)}</span></label>`).join('');
  const recursos = c.recursos.map(recursoLink).join('');
  const tools = c.tools.map((id, i) => `<details class="tool-d" ${i === 0 ? 'open' : ''}><summary>${ico(TOOL_ICON[id] || 'calc')} ${esc((TOOLS.find((t) => t[0] === id) || [])[1] || id)}</summary>${toolBox(id)}</details>`).join('');
  const hora = c.hora.map((b) => `<div class="hora-row"><span class="mono">${b[0]}–${b[1]}</span><div><b>${esc(b[2])}</b>${b[3] ? `<p>${esc(b[3])}</p>` : ''}</div></div>`).join('');
  return `<article class="view clase" style="--h:${MOD_HUE[c.mod]}">
    <a class="back" href="#/clases">${ico('back')} Semana ${SEMANA_DE[n] || '–'} · ${esc(MOD_TAG[c.mod])}</a>
    <header class="clase-head"><div><p class="eyebrow">Clase ${n} de 24${hito ? ` · <span class="hito-tag">${ico('hito')} ${esc(hito.nombre)}</span>` : ''}</p><h1>${esc(c.titulo)}</h1><p class="lead">${esc(c.objetivo)}</p></div>${ilus(c.mod, 'big')}</header>
    <div class="chips estado">${['pendiente', 'en-curso', 'hecha'].map((e) => `<button class="opt ${s.estado === e ? 'sel' : ''}" data-action="estado" data-v="${e}">${e.replace('-', ' ')}</button>`).join('')}</div>
    ${paraTi(n)}
    <div class="card"><h3>Hoy vemos</h3><ul class="bul">${temas.map((t) => `<li>${esc(t)}</li>`).join('')}</ul><p class="muted small"><b>Te llevas:</b> ${esc(c.lleva)}</p></div>
    <div class="card"><h3>Vas a hacer</h3><p>${esc(c.actividad)}</p>${tools}</div>
    <div class="card"><h3>Tarea</h3><div class="tasks">${tareas}</div></div>
    ${recursos ? `<div class="card"><h3>Links</h3><div class="rec-list">${recursos}</div></div>` : ''}
    ${ejemplosCard(n)}
    ${cierreClase(n)}
    <details class="card plain"><summary><b>La hora, minuto a minuto</b></summary><div class="hora">${hora}</div></details>
    <details class="card plain"><summary><b>Quiz rápido</b> <span class="muted small">3 preguntas, para ti</span></summary>${quiz(n)}</details>
    <details class="card plain"><summary><b>¿Cómo sé que lo aprendí?</b></summary><p>${esc(c.checkpoint)}</p></details>
    ${PROFE ? `<details class="card plain profe-box" open><summary><b>Notas para el profe</b> <span class="pill pill-profe">profe</span></summary><p>${esc(c.profe)}</p></details>` : ''}
    <div class="clase-actions">${s.estado === 'hecha' ? `<span class="done-msg">${ico('check')} Clase hecha</span>` : `<button class="btn btn-primary btn-big" data-action="estado" data-v="hecha">Marcar clase hecha</button>`}</div>
    <nav class="pager">${prev ? `<a href="#/clase/${prev.n}">${ico('back')}<span><small>Anterior</small>${prev.n}. ${esc(prev.titulo)}</span></a>` : '<span></span>'}${next ? `<a href="#/clase/${next.n}" class="r"><span><small>Siguiente</small>${next.n}. ${esc(next.titulo)}</span>${ico('next')}</a>` : `<a href="#/inicio" class="r"><span>Volver al inicio</span>${ico('next')}</a>`}</nav>
  </article>`;
}
function recursoLink(k) {
  if (k[0] === 'P') { const p = PROMPTS.find((x) => x.id === k); return `<a class="rec" href="#/kit/${k}"><span class="pill">prompt</span><span>${esc(p.t)}</span>${ico('next')}</a>`; }
  const l = LINKS[k]; if (!l) return ''; const pend = !l.url; const ext = /^https?:/.test(l.url);
  return `<a class="rec ${pend ? 'pend' : ''}" href="${pend ? '#/kit' : esc(l.url)}" ${ext ? 'target="_blank" rel="noopener"' : ''}><span class="pill">${pend ? 'pronto' : l.url[0] === '#' ? 'aquí' : l.tipo === 'carpeta' ? 'carpeta' : /docs\.google|drive\.google/.test(l.url) ? 'doc' : 'web'}</span><span>${esc(l.t)}</span>${ico('next')}</a>`;
}
function quiz(n) {
  const c = claseDe(n), s = cl(n); const sel = s.quizSel || {};
  const qs = c.quiz.map((q, i) => { const ch = sel[i]; return `<div class="q ${ch == null ? '' : ch === q.a ? 'ok' : 'bad'}"><p class="q-t">${esc(q.q)}</p><div class="chips">${q.o.map((o, j) => `<button class="opt ${ch === j ? 'sel' : ''} ${ch != null && j === q.a ? 'right' : ''}" data-quiz="${i}" data-o="${j}" ${ch != null ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>${ch != null ? `<p class="q-w">${ch === q.a ? '✓' : '✗'} ${esc(q.w)}</p>` : ''}</div>`; }).join('');
  const done = Object.keys(sel).length === c.quiz.length; const score = c.quiz.filter((q, i) => sel[i] === q.a).length;
  return `<div class="quiz">${qs}${done ? `<p><span class="pill ${score === 3 ? 'good' : score === 2 ? 'warn' : 'bad'}">${score}/3</span> <button class="btn small" data-action="quiz-reset">Repetir</button></p>` : ''}</div>`;
}

/* ---------- vista: herramientas ---------- */
function viewHerramientas() {
  return `<section class="view"><p class="eyebrow">Herramientas</p><h1>Calculadoras y checklists</h1><p class="muted">Lo que escribes se guarda. Cada una también aparece dentro de su clase.</p>
    <div class="tool-grid">${TOOLS.map((t) => `<a class="tool-card" href="#/herramientas/${t[0]}">${ico(TOOL_ICON[t[0]] || 'calc')}<b>${esc(t[1])}</b><span class="muted small">${esc(t[2])}</span></a>`).join('')}</div></section>`;
}
function viewTool(id) {
  const meta = TOOLS.find((t) => t[0] === id); if (!meta) return viewHerramientas();
  return `<section class="view"><a class="back" href="#/herramientas">${ico('back')} Herramientas</a><h1>${esc(meta[1])}</h1><p class="muted small">${esc(meta[2])}</p>${toolBox(id)}</section>`;
}
function toolBox(id) { return `<section class="tool" id="tool-${id}" data-toolbox="${id}">${toolBody(id)}</section>`; }

/* ---------- vista: kit ---------- */
function viewKit(sec) {
  const esGoogle = (u) => /docs\.google|drive\.google/.test(u);
  const ks = Object.keys(LINKS);
  const carpetas = ks.filter((k) => LINKS[k].tipo === 'carpeta');
  const docs = ks.filter((k) => LINKS[k].tipo !== 'carpeta' && esGoogle(LINKS[k].url));
  const externas = ks.filter((k) => /^https?:/.test(LINKS[k].url) && !esGoogle(LINKS[k].url) && LINKS[k].tipo !== 'carpeta');
  const internas = ks.filter((k) => LINKS[k].url.startsWith('#/'));
  const lista = (arr) => `<div class="rec-list">${arr.map(recursoLink).join('')}</div>`;
  const openP = sec && sec[0] === 'P';
  return `<section class="view"><p class="eyebrow">Links</p><h1>Dónde está todo</h1>
    <p class="muted">Lo que vive fuera de la página, en un solo lugar. Lo que está dentro de la página lo encuentras en <a href="#/herramientas">Herramientas</a>.</p>
    <div class="card"><h3>Carpetas</h3>${lista(carpetas)}</div>
    <div class="card"><h3>Documentos del curso</h3><p class="muted small">Se abren en Google Docs. Cada uno dice al inicio para qué sirve y en qué clase se usa.</p>${lista(docs)}</div>
    <div class="card"><h3>Herramientas externas</h3>${lista(externas)}</div>
    <details class="card plain"><summary><b>Lo que vive dentro de la página</b> <span class="mono muted">${internas.length}</span></summary>${lista(internas)}</details>
    <h2 class="h2">Guías rápidas</h2>
    <details class="card plain" ${openP ? 'open' : ''}><summary><b>Prompts guía</b> <span class="mono muted">${PROMPTS.length}</span></summary><p class="muted small">Pide contexto real; lo que sale es un borrador. Nunca pegues credenciales en un chat.</p>${PROMPTS.map((p) => `<details class="prompt" id="kit-${p.id}" ${sec === p.id ? 'open' : ''}><summary><span class="mono">${p.id}</span> ${esc(p.t)} <span class="muted small">clase ${p.clase}</span></summary><div class="prompt-body"><button class="btn small" data-action="copy" data-target="pt-${p.id}" data-label="Copiar prompt">Copiar prompt</button><pre id="pt-${p.id}">${esc(p.txt)}</pre></div></details>`).join('')}</details>
    <details class="card plain" ${sec === 'reglas' ? 'open' : ''}><summary><b>Las 7 reglas de Meta Ads</b></summary><ol class="rules"><li><b>1 campaña · 1 grupo · 9 anuncios</b> por producto.</li><li>Se evalúa el <b>grupo completo</b>, nunca un anuncio solo.</li><li><b>7 días sin tocar</b> antes de decidir.</li><li>Escalar máximo <b>+15 % cada 3 días</b>.</li><li>Cambios <b>entre 10 am y 12 m</b>.</li><li>Creativos nuevos van <b>al grupo que ya corre</b>.</li><li>Presupuesto inicial <b>≥ 3× BEP</b>.</li></ol></details>
    <details class="card plain" ${sec === 'rechazos' ? 'open' : ''}><summary><b>Anuncios que Meta rechaza</b> <span class="muted small">y cómo decirlo para que pase</span></summary><div>${rechazosHTML()}</div></details>
    <details class="card plain" ${sec === 'fatiga' ? 'open' : ''}><summary><b>Fatiga creativa</b> <span class="muted small">señales y qué hacer</span></summary><div>${fatigaHTML()}</div></details>
    <details class="card plain" ${sec === 'glosario' ? 'open' : ''}><summary><b>Glosario</b></summary><dl class="glos">${GLOSARIO.map((g) => `<div><dt>${esc(g[0])}</dt><dd>${esc(g[1])}</dd></div>`).join('')}</dl></details>
    ${PROFE ? `<details class="card plain profe-box"><summary><b>Tips para el profe</b> <span class="pill pill-profe">profe</span></summary><ol class="rules">${TIPS_PROFE.map((t) => `<li>${esc(t)}</li>`).join('')}</ol></details>` : ''}
  </section>`;
}

/* ---------- export / import ---------- */
function copyText(txt, msgEl) {
  const done = () => { if (msgEl) msgEl.textContent = 'Copiado.'; };
  const fallback = () => { const t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (e) { if (msgEl) msgEl.textContent = 'No se pudo copiar; selecciona y copia a mano.'; } t.remove(); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fallback); else fallback();
}
function resumen() {
  const n = hechas(); const sig = siguiente();
  const lines = [`RUTA 24 — ${S.nombre || 'estudiante'}`, `Clases hechas: ${n}/24`, `Hitos: ${HITOS.filter(hitoOk).map((h) => h.id).join(', ') || 'ninguno aún'}`, sig ? `Siguiente: clase ${sig.n} — ${sig.titulo}` : 'Curso completo'];
  CLASES.forEach((c) => { const s = cl(c.n); if (s.estado !== 'pendiente' || s.quiz) lines.push(`${c.n}. ${s.estado}${s.quiz ? ` · quiz ${s.quiz.score}/${s.quiz.total}` : ''} · tareas ${(s.tareas || []).filter(Boolean).length}/${c.tarea.length}`); });
  if (S.examen) lines.push(`Examen final: ${S.examen.score}/${S.examen.total}`);
  if (ini().done) { const res = calcInicio(); lines.push(`Ruta: ${res.cuenta.dominada} D · ${res.cuenta.practica} P · ${res.cuenta.parcial} M · ${res.cuenta.nueva} N · ≈ ${(res.minutos / 60).toFixed(1)} h`); }
  return lines.join('\n');
}
function rerenderKeep() { const y = window.scrollY; render(); window.scrollTo(0, y); }

/* ---------- eventos ---------- */
document.addEventListener('click', (e) => {
  const exw = e.target.closest('[data-exw][data-t="idx"],[data-exw][data-t="multi"]');
  if (exw) { const st = ini(); const r = st.resp; const id = exw.dataset.exw; if (exw.dataset.t === 'multi') { let arr = Array.isArray(r[id]) ? r[id].slice() : []; const o = exw.dataset.o; const i = arr.indexOf(o); if (i >= 0) arr.splice(i, 1); else if (o === 'Nada de esto') arr = [o]; else { arr = arr.filter((x) => x !== 'Nada de esto'); arr.push(o); } r[id] = arr; save(); rerenderKeep(); } else { r[id] = parseInt(exw.dataset.o, 10); save(); exw.classList.add('sel'); setTimeout(() => { st.pos = Math.min(st.pos + 1, EX_ITEMS.length); save(); render(); }, 260); } return; }
  const qz = e.target.closest('[data-quiz]');
  if (qz) { const n = parseInt(route().a, 10); const s = cl(n); s.quizSel = s.quizSel || {}; s.quizSel[qz.dataset.quiz] = parseInt(qz.dataset.o, 10); const c = claseDe(n); if (Object.keys(s.quizSel).length === c.quiz.length) s.quiz = { score: c.quiz.filter((q, i) => s.quizSel[i] === q.a).length, total: c.quiz.length, fecha: hoy() }; save(); rerenderKeep(); return; }
  const sm = e.target.closest('[data-sim]');
  if (sm) { const t = tool('sim'); t.resp = t.resp || {}; t.resp[sm.dataset.sim] = parseInt(sm.dataset.o, 10); save(); rerenderKeep(); return; }
  const ex = e.target.closest('[data-exam]');
  if (ex) { const t = tool('examen'); t.resp = t.resp || {}; t.resp[ex.dataset.exam] = parseInt(ex.dataset.o, 10); if (Object.keys(t.resp).length === EXAMEN.length) S.examen = { score: EXAMEN.filter((q, i) => t.resp[i] === q.a).length, total: EXAMEN.length, fecha: hoy() }; save(); rerenderKeep(); return; }
  const cb = e.target.closest('[data-cierre-btn]');
  if (cb) { const n = parseInt(route().a, 10); const s = cl(n); s.cierre = s.cierre || {}; const f = cb.dataset.cierreBtn; s.cierre[f] = f === 'conf' ? parseInt(cb.dataset.o, 10) : cb.dataset.o; save(); rerenderKeep(); return; }
  const a = e.target.closest('[data-action]'); if (!a) return;
  const act = a.dataset.action;
  // acciones destructivas: doble toque en vez de confirm() (los diálogos del navegador no funcionan dentro del visor)
  if (['reset-all', 'ex-reset', 'fila-del', 'swipe-del', 'rutina-reset'].includes(act) && !a.dataset.armed) { a.dataset.armed = '1'; a.dataset.txt = a.innerHTML; a.textContent = '¿Seguro? Toca otra vez'; a.classList.add('armed'); setTimeout(() => { if (a.isConnected) { a.innerHTML = a.dataset.txt; delete a.dataset.armed; a.classList.remove('armed'); } }, 4000); return; }
  if (act === 'reload') { location.reload(); return; }
  if (act === 'reset-all') { { try { localStorage.removeItem(KEY); } catch (e) {} S = defState(); location.hash = '#/inicio'; location.reload(); } return; }
  if (act === 'edit-name') { EDIT_NAME = true; render(); const i = $('.name-form input'); if (i) i.focus(); return; }
  if (act === 'estado') { const n = parseInt(route().a, 10); cl(n).estado = a.dataset.v; save(); rerenderKeep(); return; }
  if (act === 'quiz-reset') { const n = parseInt(route().a, 10); const s = cl(n); s.quizSel = {}; s.quiz = null; save(); rerenderKeep(); return; }
  if (act === 'sim-reset') { tool('sim').resp = {}; save(); rerenderKeep(); return; }
  if (act === 'exam-reset') { tool('examen').resp = {}; S.examen = null; save(); rerenderKeep(); return; }
  if (act === 'ex-start') { const st = ini(); const first = EX_ITEMS.findIndex((it) => !respondida(it, st.resp[it.id])); st.pos = first < 0 ? EX_ITEMS.length : first; save(); render(); return; }
  if (act === 'ex-next') { const st = ini(); st.pos = Math.min(st.pos + 1, EX_ITEMS.length); save(); render(); return; }
  if (act === 'ex-prev') { const st = ini(); st.pos = Math.max(st.pos - 1, -1); save(); render(); return; }
  if (act === 'ex-done') { const st = ini(); st.done = true; st.fecha = hoy(); save(); render(); return; }
  if (act === 'ex-reset') { { S.inicio = { resp: {}, done: false, fecha: null, v: 3, pos: -1 }; save(); render(); } return; }
  if (act === 'copy-inicio') { copyText(textoInicio(calcInicio()), $('#io-msg')); return; }
  if (act === 'copy') { const el = document.getElementById(a.dataset.target); if (el) { copyText(el.textContent, null); const lbl = a.dataset.label || 'Copiar'; a.textContent = 'Copiado ✓'; setTimeout(() => { a.textContent = lbl; }, 1500); } return; }
  if (act === 'copy-matriz') { const txt = MATRIZ9.map((r) => `${r.s}. ${r.etapa} · ${r.persona} · ${r.angulo} · ${tv('matriz9', 'f' + r.s, 'video')}\n   ${tv('matriz9', 'h' + r.s, '(sin hook)')}`).join('\n'); copyText(`MATRIZ DE 9 — ${tv('matriz9', 'producto', 'producto')}\n` + txt, null); a.textContent = 'Copiado ✓'; setTimeout(() => { a.textContent = 'Copiar matriz como texto'; }, 1500); return; }
  if (act === 'copy-plan90') { const t = tool('plan90'); copyText(['PLAN DE 90 DÍAS', `Producto #1: ${t.meta1 || '?'} COP/día con CPA ${t.cpa1 || '?'}`, `Producto #2: ${t.p2 || '?'} · lanzamiento ${t.f2 || '?'}`, `Sistema semanal: ${t.semana || '?'}`, `Research: ${t.research || '?'}`, `Aprender: ${t.aprender || '?'}`, `Revisión 30 días: ${t.rev || '?'}`].join('\n'), null); a.textContent = 'Copiado ✓'; setTimeout(() => { a.textContent = 'Copiar plan'; }, 1500); return; }
  if (act === 'fila-save') { const id = a.dataset.tool, P = FILAS[id], t = tool(id); const f = String(t[P.pref + 'fecha'] || hoy()); const msg = document.getElementById('msg-' + id);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(f)) { if (msg) msg.textContent = 'Falta la fecha.'; return; }
    const row = {}; let any = false; P.campos.forEach((c) => { const v = t[P.pref + c]; if (v != null && String(v).trim() !== '') { row[c] = String(v).trim(); any = true; } });
    if (!any) { if (msg) msg.textContent = 'Escribe al menos un dato del día.'; return; }
    filasDe(id)[f] = Object.assign({}, filasDe(id)[f] || {}, row); /* si el día ya existía, solo cambia lo que escribiste */ P.campos.forEach((c) => { delete t[P.pref + c]; }); const sig = new Date(f + 'T12:00:00'); sig.setDate(sig.getDate() + 1); const sigF = sig.toISOString().slice(0, 10); t[P.pref + 'fecha'] = sigF <= hoy() ? sigF : hoy(); save(); rerenderKeep(); return; }
  if (act === 'fila-edit') { const id = a.dataset.tool, P = FILAS[id], t = tool(id); const row = filasDe(id)[a.dataset.f] || {}; t[P.pref + 'fecha'] = a.dataset.f; P.campos.forEach((c) => { t[P.pref + c] = row[c] == null ? '' : row[c]; }); save(); rerenderKeep(); const el = document.querySelector(`[data-tool="${id}"][data-f="${P.pref}gasto"],[data-tool="${id}"][data-f="${P.pref}pedidos"]`); if (el) { el.scrollIntoView({ block: 'center' }); el.focus(); } return; }
  if (act === 'fila-del') { const id = a.dataset.tool, P = FILAS[id], t = tool(id); { delete filasDe(id)[a.dataset.f]; if (t[P.pref + 'fecha'] === a.dataset.f) { P.campos.forEach((c) => { delete t[P.pref + c]; }); t[P.pref + 'fecha'] = hoy(); } save(); rerenderKeep(); } return; }
  if (act === 'copy-diario') { copyText(textoDiario(), null); a.textContent = 'Copiado ✓'; setTimeout(() => { a.textContent = 'Copiar registro (para Claude)'; }, 1500); return; }
  if (act === 'copy-cod') { copyText(textoCOD(), null); a.textContent = 'Copiado ✓'; setTimeout(() => { a.textContent = 'Copiar tablero (para Claude)'; }, 1500); return; }
  if (act === 'cod-usar-tasa') { tool('bep').tasa = a.dataset.v; save(); const m = document.getElementById('msg-tasa'); if (m) m.textContent = 'Listo: la calculadora BEP ya usa ' + a.dataset.v + ' %.'; return; }
  if (act === 'copy-ficha') { copyText(fichaMD(a.dataset.tool), null); a.textContent = 'Copiado ✓'; setTimeout(() => { a.textContent = 'Copiar ficha (markdown)'; }, 1500); return; }
  if (act === 'swipe-save') { const t = tool('swipe'); t.refs = t.refs || []; const r = { url: (t.s_url || '').trim(), tipo: t.s_tipo || 'producto', formato: t.s_formato || 'video', angulo: t.s_angulo || 'Dolor', hook: (t.s_hook || '').trim(), porque: (t.s_porque || '').trim(), clono: (t.s_clono || '').trim() };
    if (!r.url && !r.hook) return; if (t.editando != null) t.refs[t.editando] = r; else t.refs.push(r); ['s_url', 's_hook', 's_porque', 's_clono'].forEach((k) => { delete t[k]; }); delete t.editando; save(); rerenderKeep(); return; }
  if (act === 'swipe-edit') { const t = tool('swipe'); const r = (t.refs || [])[+a.dataset.i]; if (!r) return; t.editando = +a.dataset.i; t.s_url = r.url; t.s_tipo = r.tipo; t.s_formato = r.formato; t.s_angulo = r.angulo; t.s_hook = r.hook; t.s_porque = r.porque; t.s_clono = r.clono; save(); rerenderKeep(); return; }
  if (act === 'swipe-cancel') { const t = tool('swipe'); delete t.editando; ['s_url', 's_hook', 's_porque', 's_clono'].forEach((k) => { delete t[k]; }); save(); rerenderKeep(); return; }
  if (act === 'swipe-del') { const t = tool('swipe'); { t.refs.splice(+a.dataset.i, 1); delete t.editando; save(); rerenderKeep(); } return; }
  if (act === 'copy-swipe') { copyText(textoSwipe(), null); a.textContent = 'Copiado ✓'; setTimeout(() => { a.textContent = 'Copiar swipe (markdown)'; }, 1500); return; }
  if (act === 'rutina-reset') { { const t = tool('rutina'); Object.keys(t).forEach((k) => { if (/^r\d+_\d+$/.test(k)) delete t[k]; }); t.semana = hoy(); save(); rerenderKeep(); } return; }
  if (act === 'export') { copyText('RUTA24:' + btoa(unescape(encodeURIComponent(JSON.stringify(S)))), $('#io-msg')); return; }
  if (act === 'import-show') { const f = $('.import-form'); if (f) { f.hidden = !f.hidden; if (!f.hidden) f.querySelector('textarea').focus(); } return; }
  if (act === 'import') { const v = a.dataset.codigo; if (!v) return; try { const j = JSON.parse(decodeURIComponent(escape(atob(v.replace(/^RUTA24:/, '').trim())))); S = Object.assign(defState(), j); save(); render(); $('#io-msg').textContent = 'Progreso cargado.'; } catch (err) { $('#io-msg').textContent = 'Ese código no es válido.'; } return; }
  if (act === 'resumen') { copyText(resumen(), $('#io-msg')); return; }
});
document.addEventListener('input', (e) => {
  const t = e.target;
  if (t.matches('[data-caso]')) { const n = parseInt(t.dataset.caso, 10); const e0 = (EJEMPLOS[n] || []).find((x) => x.tipo === 'caso'); if (!e0) return; const todas = CALC.serie(casoFilas(e0)); const d = todas[+t.value]; if (!d) return; tool('caso').hasta = d.fecha; save(); const box = document.getElementById('caso-' + n); if (box) { box.querySelector('.caso-out').innerHTML = casoOut(e0); box.querySelector('#caso-dia').textContent = `día ${+t.value + 1} · ${fechaDia(d.fecha)}`; } return; }
  if (t.matches('[data-exw][data-t="txt"]')) { ini().resp[t.dataset.exw] = t.value; save(); const b = $('[data-action="ex-next"]'); if (b) b.disabled = !t.value.trim(); return; }
  if (t.matches('[data-cierre]')) { const n = parseInt(route().a, 10); const s = cl(n); s.cierre = s.cierre || {}; s.cierre[t.dataset.cierre] = t.value; save(); const ta = document.getElementById('cierre-txt-' + n); if (ta) ta.value = textoCierre(n); const a = t.closest('.cierre').querySelector('a.btn'); if (a) a.href = waLink(textoCierre(n)); return; }
  if (t.matches('[data-tool]') && t.dataset.type !== 'bool' && t.tagName !== 'SELECT') { tool(t.dataset.tool)[t.dataset.f] = t.value; save(); calc(t.dataset.tool); }
});
document.addEventListener('change', (e) => {
  const t = e.target;
  if (t.matches('[data-task]')) { const n = parseInt(route().a, 10); const s = cl(n); s.tareas = s.tareas || []; s.tareas[parseInt(t.dataset.task, 10)] = t.checked; if (s.estado === 'pendiente' && t.checked) { s.estado = 'en-curso'; rerenderKeep(); } save(); return; }
  if (t.matches('[data-prereq]')) { S.prereq[parseInt(t.dataset.prereq, 10)] = t.checked; save(); return; }
  if (t.matches('[data-tool]')) { const id = t.dataset.tool; tool(id)[t.dataset.f] = t.dataset.type === 'bool' ? t.checked : t.value; save(); calc(id); if (id === 'matriz9' && t.dataset.type === 'bool') { const row = t.closest('.m9-row'); if (row) row.classList.toggle('ok', t.checked); } }
});
document.addEventListener('submit', (e) => {
  const f = e.target.closest('[data-form]'); if (!f) return; e.preventDefault();
  if (f.dataset.form === 'nombre') { S.nombre = (f.querySelector('input').value || '').trim(); EDIT_NAME = false; save(); render(); return; }
  if (f.dataset.form === 'import') { const v = (f.querySelector('textarea').value || '').trim(); if (!v) return; try { const j = JSON.parse(decodeURIComponent(escape(atob(v.replace(/^RUTA24:/, '').trim())))); S = Object.assign(defState(), j); save(); render(); $('#io-msg').textContent = 'Progreso cargado.'; } catch (err) { $('#io-msg').textContent = 'Ese código no es válido.'; } return; }
});
window.addEventListener('hashchange', render);
render();
})();
