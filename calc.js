/* =====================================================================
   RUTA 24 — cálculos puros (sin DOM). Se usan en app.js y se prueban con
   `node scripts/test-calcs.js`. Fechas: 'YYYY-MM-DD'.
   ===================================================================== */
(function (root, factory) {
  const m = factory();
  if (typeof module === 'object' && module.exports) module.exports = m;
  root.CALC = m;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  /* "3.5" y "3,5" → 3.5 · "89.900" y "1.234.567" → miles · acepta $ % y espacios */
  function num(v) {
    if (typeof v === 'number') return isFinite(v) ? v : 0;
    let t = String(v == null ? '' : v).trim().replace(/[\s$%]/g, ''); if (!t) return 0;
    if (/,\d{1,2}$/.test(t)) t = t.replace(/\./g, '').replace(',', '.');
    else if (/^-?\d{1,3}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
    else t = t.replace(/,/g, '');
    const n = parseFloat(t); return isFinite(n) ? n : 0;
  }

  const diaUTC = (f) => { const p = f.split('-').map(Number); return Date.UTC(p[0], p[1] - 1, p[2]); };
  const fechaDe = (ms) => new Date(ms).toISOString().slice(0, 10);
  const fechas = (filas) => Object.keys(filas || {}).filter((k) => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort();

  /* Un día del tablero con sus derivados; sin fila → hueco. */
  function dia(filas, f) {
    const r = filas[f]; if (!r) return { fecha: f, sinDato: true };
    const gasto = num(r.gasto), compras = num(r.compras), imp = num(r.imp), clics = num(r.clics), lpv = num(r.lpv), atc = num(r.atc), entregados = r.entregados == null ? null : num(r.entregados);
    return { fecha: f, gasto, compras, imp, clics, lpv, atc, entregados,
      cpa: compras > 0 ? gasto / compras : null,
      ctr: imp > 0 ? clics / imp * 100 : null, cpm: imp > 0 ? gasto / imp * 1000 : null, cvr: lpv > 0 ? compras / lpv * 100 : null };
  }
  function diasEntre(filas, desde, hasta) { const out = []; for (let ms = diaUTC(desde); ms <= diaUTC(hasta); ms += 864e5) out.push(dia(filas, fechaDe(ms))); return out; }

  /* Serie completa (caso de estudio): todos los días entre el primero y el último registrados. */
  function serie(filas) { const ks = fechas(filas); return ks.length ? diasEntre(filas, ks[0], ks[ks.length - 1]) : []; }

  /* Tablero diario: ventana de 7 días calendario que termina en `hasta` (por defecto el último día registrado). */
  function cpa7(filas, opts) {
    opts = opts || {}; const bep = num(opts.bep) || 0;
    const ks = fechas(filas); const registrados = ks.length;
    const hasta = opts.hasta || ks[ks.length - 1];
    let dias = [];
    if (hasta) {
      const fin = diaUTC(hasta); const desde = Math.max(diaUTC(ks[0] || hasta), fin - 6 * 864e5); // nunca antes del primer día registrado
      dias = diasEntre(filas, fechaDe(desde), fechaDe(fin));
    }
    const con = dias.filter((d) => !d.sinDato);
    const gasto = con.reduce((a, d) => a + d.gasto, 0), compras = con.reduce((a, d) => a + d.compras, 0);
    const cpa = compras > 0 ? gasto / compras : null;
    let racha = 0;
    for (let i = dias.length - 1; i >= 0; i--) { const d = dias[i]; if (d.sinDato || d.cpa == null || !bep || d.cpa >= bep) break; racha++; }
    let estado;
    if (!bep) estado = 'sin-bep';
    else if (compras === 0 && gasto > 2 * bep) estado = 'sin-ventas-revisar';
    else if (compras === 0 && gasto > 0) estado = 'sin-ventas-esperar';
    else if (registrados < 7) estado = 'pocos';
    else if (cpa <= bep) estado = 'rentable';
    else if (cpa <= 1.5 * bep) estado = 'gris';
    else estado = 'alto';
    return { dias, conDatos: con.length, registrados, hasta: hasta || null, gasto, compras, cpa, bep, racha, estado };
  }

  /* Tablero COD: cohortes por fecha del pedido. */
  function tasasCOD(filas, opts) {
    opts = opts || {}; const bep = opts.bep == null ? null : num(opts.bep); const devolucion = num(opts.devolucion);
    const rows = fechas(filas).map((f) => { const r = filas[f]; const pedidos = num(r.pedidos), confirmados = num(r.confirmados), entregados = num(r.entregados), devueltos = num(r.devueltos);
      return { fecha: f, pedidos, confirmados, entregados, devueltos, transito: Math.max(0, confirmados - entregados - devueltos) }; });
    const sum = (k) => rows.reduce((a, r) => a + r[k], 0);
    const pedidos = sum('pedidos'), confirmados = sum('confirmados'), entregados = sum('entregados'), devueltos = sum('devueltos');
    const resueltos = entregados + devueltos;
    const conf = pedidos > 0 ? confirmados / pedidos : null;
    const entrega = resueltos > 0 ? entregados / resueltos : null;
    const devol = resueltos > 0 ? devueltos / resueltos : null;
    const entregaSobrePedidos = conf != null && entrega != null ? conf * entrega : null;
    const bepEfectivo = bep != null && bep > 0 && conf != null && entrega != null ? conf * (entrega * bep - devol * devolucion) : null;
    const estados = {
      conf: conf == null ? null : conf >= 0.85 ? 'good' : conf >= 0.70 ? 'warn' : 'bad',
      entrega: entrega == null ? null : entrega >= 0.75 ? 'good' : entrega >= 0.60 ? 'warn' : 'bad',
    };
    return { filas: rows, pedidos, confirmados, entregados, devueltos, transito: Math.max(0, confirmados - resueltos), conf, entrega, devol, entregaSobrePedidos, bepEfectivo, estados };
  }

  return { num, cpa7, tasasCOD, serie };
});
