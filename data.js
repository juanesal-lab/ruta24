/* =====================================================================
   RUTA 24 — datos del curso
   Juan: los links viven SOLO en LINKS (abajo). Cambia la url y listo.
   ===================================================================== */

const BUILD = 19; // sube este número en cada publicación (rompe la caché del navegador)

const LINKS = {
  // Calculadoras (por defecto viven dentro de la página)
  C1: { t: 'Calculadora BEP y precio', url: '#/herramientas/bep', tipo: 'calc' },
  C2: { t: 'BEP efectivo COD (tasa de entrega)', url: '#/herramientas/bep', tipo: 'calc' },
  C3: { t: 'Presupuesto inicial y escalado +15 %', url: '#/herramientas/escalado', tipo: 'calc' },
  C4: { t: 'Bundles 1 / 2 / 3', url: '#/herramientas/bundles', tipo: 'calc' },
  C5: { t: 'Diagnóstico de campaña', url: '#/herramientas/diag', tipo: 'calc' },
  C6: { t: 'Tablero diario de campaña', url: '#/herramientas/diario', tipo: 'sheet' },
  C7: { t: 'Tablero de operación COD', url: '#/herramientas/cod', tipo: 'sheet' },
  // Cheat sheets
  S1: { t: 'Características de un producto ganador', url: 'https://docs.google.com/document/d/1_i37c0zHtGHC8V_dHJMncadtW-ctuBpDeIf4ZZz4f2Q/edit?usp=sharing', tipo: 'cheat' },
  S2: { t: 'Anatomía de landing COD + checklist 25', url: '#/herramientas/checklist25', tipo: 'cheat' },
  S3: { t: 'Matriz de 9 ads + plantillas de hook', url: '#/herramientas/matriz9', tipo: 'cheat' },
  S4: { t: 'Las 7 reglas de Meta Ads', url: '#/kit/reglas', tipo: 'cheat' },
  S5: { t: 'Tabla síntoma → causa → acción', url: '#/herramientas/diag', tipo: 'cheat' },
  S6: { t: 'Fatiga creativa: señales y qué hacer', url: '#/kit/fatiga', tipo: 'cheat' },
  S7: { t: 'Anuncios que Meta rechaza (y cómo decirlo para que pase)', url: '#/kit/rechazos', tipo: 'cheat' },
  S9: { t: 'Glosario', url: '#/kit/glosario', tipo: 'cheat' },
  S10:{ t: 'Las IAs que usamos para imagen y video', url: 'https://docs.google.com/document/d/18J3209bd7bWAHhZ3ZBIJf0dGeI7VB1i40DT2YM6OImQ/edit?usp=sharing', tipo: 'cheat' },
  // Plantillas
  T1: { t: 'Ficha de diagnóstico', url: '#/herramientas/diagnostico', tipo: 'plantilla' },
  T2: { t: 'Ficha de producto', url: '#/herramientas/ficha', tipo: 'plantilla' },
  T5: { t: 'Swipe file', url: '#/herramientas/swipe', tipo: 'plantilla' },
  T6: { t: 'Nomenclatura de creativos', url: '#/herramientas/nombrador', tipo: 'plantilla' },
  T7: { t: 'Checklist de lanzamiento', url: '#/herramientas/lanzamiento', tipo: 'plantilla' },
  T8: { t: 'Plan de contingencia', url: '#/herramientas/contingencia', tipo: 'plantilla' },
  T9: { t: 'Rutina semanal del dueño (5 h)', url: '#/herramientas/rutina', tipo: 'plantilla' },
  T10:{ t: 'Plan de 90 días', url: '#/herramientas/plan90', tipo: 'plantilla' },
  // Herramientas externas
  H1: { t: 'Meta Ads Library', url: 'https://www.facebook.com/ads/library/', tipo: 'ext' },
  H2: { t: 'Google Trends', url: 'https://trends.google.com/trends/?geo=CO', tipo: 'ext' },
  H3: { t: 'Dropi', url: 'http://app.dropi.co/ivancaicedo', tipo: 'ext' },
  H4: { t: 'TikTok Creative Center', url: 'https://ads.tiktok.com/business/creativecenter/', tipo: 'ext' },
  H5: { t: 'Microsoft Clarity', url: 'https://clarity.microsoft.com/', tipo: 'ext' },
  H6: { t: 'PageSpeed Insights', url: 'https://pagespeed.web.dev/', tipo: 'ext' },
  H7: { t: 'Meta Test Events', url: 'https://business.facebook.com/events_manager2/', tipo: 'ext' },
  H8: { t: 'CapCut', url: 'https://www.capcut.com/', tipo: 'ext' },
  H9: { t: 'ElevenLabs', url: 'https://elevenlabs.io/', tipo: 'ext' },
  H10:{ t: 'Claude Code (documentación)', url: 'https://docs.claude.com/en/docs/claude-code', tipo: 'ext' },
  H11:{ t: 'Políticas de anuncios de Meta', url: 'https://transparency.meta.com/policies/ad-standards/', tipo: 'ext' },
  H12:{ t: 'Grabaciones de las clases', url: 'https://drive.google.com/drive/folders/1i3hCBSDR0jiF6fg-7uFAZHlh1xwCp25V?usp=sharing', tipo: 'carpeta' },
  H13:{ t: 'Tu carpeta de trabajo: mi-negocio/', url: 'https://drive.google.com/drive/folders/1_DL2SkmiDeC3SxjZfPV4IxgoCAF-z5Jh?usp=sharing', tipo: 'carpeta' },
  K0: { t: 'Kit del curso en Drive (todos los documentos)', url: 'https://drive.google.com/drive/folders/1r7g8QqdJghLniRDgyY8TIX3ozv0b1Pmp?usp=sharing', tipo: 'carpeta' },
  // Documentos del profe (vienen del cronograma de Manuel)
  H14:{ t: 'Extensiones de Chrome que vas a usar', url: 'https://docs.google.com/document/d/17Ozwk9fcaiF59YpuNd3NXTLjWa2B8S07TO8OqV13JM4/edit?usp=sharing', tipo: 'ext' },
  H15:{ t: 'Herramientas para buscar productos', url: 'https://docs.google.com/document/d/18wwO12zYVxYq2yn6fUa3KxAbU7UC_pmUzhBxm4yRN-U/edit?usp=sharing', tipo: 'cheat' },
  H16:{ t: 'Shopify: 1 dólar al mes por 90 días', url: 'https://shopify.pxf.io/c/3541896/1515035/13624?subId2=MasterEscala', tipo: 'ext' },
  H17:{ t: 'Prompts de IA (doc del profe)', url: 'https://docs.google.com/document/d/1aNVjPlPOm7gua25XHCv_r6NopUgkyaiyYHJPNqPi8rw/edit?usp=sharing', tipo: 'cheat' },
  H18:{ t: 'Páginas web para landings y creativos', url: 'https://docs.google.com/document/d/1YnhmtmlgTZQtz5hltCdWKeNFrCbyLE3DdlCLDijXh_Q/edit?usp=sharing', tipo: 'cheat' },
  H19:{ t: 'Gems de Gemini del curso', url: 'https://docs.google.com/document/d/1GTJAldHYrlgBso29qrQBDTjGpXk83glB89eUm7EenRw/edit?usp=sharing', tipo: 'cheat' },
  H20:{ t: 'Verificar tu negocio en Meta y TikTok', url: 'https://docs.google.com/document/d/1NehQGJOgVXD0tEva-GiuX7KiYd2mpVHKIz1jxt8XvOQ/edit?usp=sharing', tipo: 'cheat' },
  H21:{ t: 'Video: organización de métricas', url: 'https://drive.google.com/file/d/19gUexRofi1XVZGh3-GzYV4ZCL3NZiXSM/view?usp=sharing', tipo: 'ext' },
  H22:{ t: 'Hooks validados', url: 'https://docs.google.com/document/d/1ZTwjf3HKnU6DxZO1lyv1X42QIghPaxEmYZXiICnDehQ/edit?usp=sharing', tipo: 'cheat' },
  T11:{ t: 'Plantilla Shopify 2026 (carpeta)', url: 'https://drive.google.com/drive/folders/1hoVy53ZKM1ufDhtqV0Ge9k-UQnLwLDqK?usp=sharing', tipo: 'plantilla' },
  C8: { t: 'Dropshipping Simón (calculadora de precios, control diario, análisis de productos)', url: 'https://docs.google.com/spreadsheets/d/1PtB3P9VYpB4HNMmS2SlX6lgwJbfGDrV_p6Jh8wGJPTY/edit?usp=sharing', tipo: 'sheet' },
};

/* ---------------------------------------------------------------------
   EJEMPLOS por clase (Juan). Cada uno: t (título), url, tipo (imagen · noticia ·
   html · demo · video · estatico · caso), nota ("fíjate en…"), pruebas: true si es
   una landing en tema de pruebas. Una clase sin lista (o con lista vacía) no muestra
   la tarjeta. tipo 'caso' lleva serie [[fecha, gasto, pedidos, entregados], …] y bep.
   --------------------------------------------------------------------- */
const G = 'https://vidaria-store.myshopify.com/products/gastritis-y-ulceras?preview_theme_id=182430925101&view=';
const CASO_MASCOTAS = {
  t: 'Caso real: un accesorio para mascotas, octubre de 2025', tipo: 'caso', bep: 42000, precio: 93000, costo: 24000,
  nota: 'Veintiún días de una campaña real del profe. Precio $93.000, costo $24.000, BEP $42.000. Arrastra el día y decide como si fuera tu plata: ¿escalar, esperar, iterar o pausar?',
  serie: [
    ['2025-10-01', 83273, 5, 4], ['2025-10-02', 142224, 15, 11], ['2025-10-03', 144626, 18, 13], ['2025-10-04', 70000, 7, 5], ['2025-10-05', 236839, 19, 15],
    ['2025-10-06', 233625, 13, 10], ['2025-10-07', 193426, 11, 4], ['2025-10-08', 193885, 13, 10], ['2025-10-09', 249635, 13, 9], ['2025-10-10', 250985, 8, 6],
    ['2025-10-11', 135426, 11, 8], ['2025-10-12', 103866, 10, 7], ['2025-10-14', 98066, 3, 2], ['2025-10-15', 60488, 2, 1], ['2025-10-16', 60358, 5, 4],
    ['2025-10-17', 105841, 5, 4], ['2025-10-18', 100749, 4, 3], ['2025-10-19', 19309, 3, 2], ['2025-10-21', 0, 1, 1], ['2025-10-22', 55294, 5, 4], ['2025-10-23', 61207, 5, 4],
  ],
  lecciones: [
    'Días 1-5: de 5 a 19 pedidos. El presupuesto pasó de 83 K a 237 K en cinco días (casi 3×), no +15 % cada 3 días.',
    'Días 6-10: el gasto sigue subiendo hasta 251 K y los pedidos caen a 8. El CPA pasa de 12 K a 31 K. Un solo anuncio cargaba el grupo.',
    'Día 7: 40 % de pedidos cancelados. De 11 pedidos se entregaron 4: la operación también decide si ganas plata.',
    'Días 14-23: 2-5 pedidos con 60-105 K de gasto. Los creativos nuevos entraron el día 9, cuando ya venía cayendo.',
    'Compara el CPA por pedido con el CPA por pedido entregado: el segundo es el que pagas de verdad. El día 7 fue de 17 K a 48 K.',
    'Los días 13 y 20 no tienen registro: así se ve un hueco en el tablero.',
  ],
};
const EJEMPLOS = {
  5: [
    { t: 'Un producto, cuatro formatos · imagen', url: G + 'f2-imagen-tratamiento-gastritis', tipo: 'imagen', pruebas: true, nota: 'Infografías apiladas: cada pantalla cierra un argumento. Fíjate en qué posición cae la oferta y en el botón "PAGAR EN CASA".' },
    { t: 'Un producto, cuatro formatos · noticia', url: G + 'f2-noticia-tratamiento-gastritis', tipo: 'noticia', pruebas: true, nota: 'Advertorial: te convence del mecanismo antes de mostrar el producto. Cuenta cuántas pantallas pasan antes del primer botón.' },
    { t: 'Un producto, cuatro formatos · HTML', url: G + 'f2-html-tratamiento-gastritis', tipo: 'html', pruebas: true, nota: 'Secciones de texto e imagen alternadas, reseñas y FAQ. Compárala con la de imagen: mismo producto, otro peso del argumento.' },
    { t: 'Un producto, cuatro formatos · demo', url: G + 'f2-estructural-tratamiento-gastritis', tipo: 'demo', pruebas: true, nota: 'Escena en bucle → prueba → botón, repetido. Mide cada cuántos scrolls aparece un botón.' },
    { t: 'HTML en vivo: la alfombra de 18 colores', url: 'https://vidaria-store.myshopify.com/products/tapete-alfombras-peluda', tipo: 'html', nota: 'Cuando el comprador tiene que elegir algo (color, talla), el formato es HTML. Prueba el selector de color y el formulario.' },
    { t: 'Demo en vivo: detector de cámaras ocultas', url: 'https://vidaria-store.myshopify.com/products/spyguard-t01%E2%84%A2-a075-detector-runsecret-4', tipo: 'demo', nota: 'GIF → prueba → botón, cuatro veces. También tiene errores para cazar: reseñas en inglés y una sección vacía.' },
  ],
  8: [
    { t: 'Una landing terminada y vendiendo', url: 'https://vidaria-store.myshopify.com/products/tapete-alfombras-peluda', tipo: 'html', nota: 'La meta de la clase 9 se ve así: publicada, con formulario, pixel y pedido de prueba hecho. Ábrela en el celular y cronometra cuánto tarda en cargar.' },
  ],
  10: [
    { t: '"No lo creía hasta que la probé" · 2,4 M de vistas', url: 'https://www.tiktok.com/@vidaria.store0/video/7568962726756617484', tipo: 'video', nota: 'Del profe. Hook de objeción y prueba táctil: la persona toca y pisa la alfombra. Descomponlo: hook, desarrollo, prueba, cierre.' },
    { t: 'Mismo hook, variante 2 · 1,4 M', url: 'https://www.tiktok.com/@vidaria.store0/video/7568759286055046411', tipo: 'video', nota: '¿Qué cambió respecto a la primera? Así se prueba un hook: tres versiones, un solo ángulo.' },
    { t: 'Mismo hook, variante 3 · 857 K', url: 'https://www.tiktok.com/@vidaria.store0/video/7568870110073523468', tipo: 'video', nota: 'La tercera versión. Anota cuál de las tres retiene más en los primeros 3 segundos y por qué.' },
    { t: '"¿Quieres crecer más o al menos verte más alto?"', url: 'https://www.tiktok.com/@davit_gc/video/7556379619398733112', tipo: 'video', nota: '606 K likes y 308 K guardados: la prueba está en el ratio de guardados. Pregunta con escape ("o al menos").' },
    { t: '"Alfombras peludas por solo 139 mil" · vendedor colombiano', url: 'https://www.tiktok.com/@gyccolombia/video/7361615648209915142', tipo: 'video', nota: '2,1 M. Ángulo precio, producto en mano, cierre directo. Un competidor real en Colombia.' },
    { t: 'UGC = demostración, no testimonio', url: 'https://vidaria-store.myshopify.com/cdn/shop/t/17/assets/f2h-gastritis-ugc-1.mp4', tipo: 'video', nota: 'Del profe. Hook contra los remedios de TikTok, muestra el frasco y la etiqueta, precio al final y línea legal quemada. Nunca "a mí me curó".' },
  ],
  11: [
    { t: 'Galería de estáticos COD en Colombia', url: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=CO&q=pago%20contra%20entrega&search_type=keyword_unordered&media_type=image', tipo: 'estatico', nota: 'Más de mil anuncios de imagen activos con "pago contra entrega". Cuenta cuántos usan chips de envío y pago, y botones dibujados.' },
    { t: 'Chips y "paga 1 lleva 4" · un estático corriendo desde junio', url: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=CO&view_all_page_id=101342529541327&search_type=page&media_type=image', tipo: 'estatico', nota: 'Un anuncio de imagen con meses activo es un ganador. Mira la oferta apilada y si el texto se lee en 375 px.' },
    { t: 'Corrector de postura: el que lleva meses corriendo', url: 'https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=CO&q=corrector%20de%20postura&search_type=keyword_unordered&media_type=image', tipo: 'estatico', nota: 'Ordena por fecha de inicio: el más viejo que sigue activo es el que vende. Descomponlo: hook, prueba, oferta, botón.' },
    { t: 'Estático del profe · "Otra vez te quedaste sin almorzar"', url: 'https://drive.google.com/file/d/1O7JPYM-aye_kIVYSbQWusHhsSibPveL-/view?usp=sharing', tipo: 'estatico', nota: 'Problema crudo en el titular, apoyo de una línea, precio en pastilla. Fíjate en el tamaño de la letra: se lee en 375 px.' },
    { t: 'Estático del profe · "Antiácido vs. cápsulas"', url: 'https://drive.google.com/file/d/1IOH4sdRpSELeX-0UcRCidYH2oSF6S3j4/view?usp=sharing', tipo: 'estatico', nota: 'Formato comparativa (versus). El producto real integrado en la escena, no pegado encima.' },
    { t: 'Estático del profe · "Cuando se pega todo, no es la comida"', url: 'https://drive.google.com/file/d/1ZXmc8U0r_I1zHAov37R63OTbJACeZhBw/view?usp=sharing', tipo: 'estatico', nota: 'Metáfora fotografiable: la olla pegada cuenta el problema sin nombrar la enfermedad.' },
    { t: 'Estático del profe · "El mes completo son 2 frascos"', url: 'https://drive.google.com/file/d/11Xdslj4QL1Sw9-_URXuDeSh6uHunWXaT/view?usp=sharing', tipo: 'estatico', nota: 'Oferta apilada: el bundle de 2 como titular. Compara el precio de 1 y el de 2.' },
  ],
  12: [
    { t: '"Recupera el colágeno…" · stop-motion con IA, 17 s', url: 'https://www.tiktok.com/@remediosnaturalesia/video/7623077251617148190', tipo: 'video', nota: '5,7 M. Personaje animado, voz de IA, mecanismo explicado con dibujos. Ojo: esa promesa en Meta se rechaza (ver "Anuncios que Meta rechaza").' },
    { t: 'UGC con IA · "Hagamos la cuenta"', url: 'https://vidaria-store.myshopify.com/cdn/shop/t/17/assets/f2h-gastritis-ugc-2.mp4', tipo: 'video', nota: 'Del profe. Tres clips de 8 s generados con el frasco real como referencia; el hook es el precio y la cuenta se hace en cámara.' },
    { t: 'UGC con IA · "Son cápsulas de plantas. Mira"', url: 'https://vidaria-store.myshopify.com/cdn/shop/t/17/assets/f2h-gastritis-ugc-3.mp4', tipo: 'video', nota: 'Del profe. La objeción "¿pastillas de qué?" resuelta mostrando la etiqueta. Fíjate en la línea legal quemada.' },
  ],
  18: [CASO_MASCOTAS],
  19: [CASO_MASCOTAS],
};

const MODULOS = [
  { id: 0, nombre: 'Arranque',            clases: [1] },
  { id: 1, nombre: 'Producto',            clases: [2, 3, 4] },
  { id: 2, nombre: 'Landing',             clases: [5, 6, 7, 8, 9] },
  { id: 3, nombre: 'Creativos',           clases: [10, 11, 12, 13] },
  { id: 4, nombre: 'Lanzamiento',         clases: [14, 15, 16] },
  { id: 5, nombre: 'Claude Code I',       clases: [17] },
  { id: 6, nombre: 'Escalamiento',        clases: [18, 19, 20, 21] },
  { id: 7, nombre: 'Sostenibilidad',      clases: [22] },
  { id: 8, nombre: 'Claude Code II y cierre', clases: [23, 24] },
];

const HITOS = [
  { id: 'H1', clase: 4,  nombre: 'Producto elegido',      que: 'Ficha de producto completa + muestra pedida' },
  { id: 'H2', clase: 9,  nombre: 'Landing publicada',     que: 'URL en vivo, pedido de prueba hecho, pixel disparando' },
  { id: 'H3', clase: 13, nombre: 'Set de 9 creativos',    que: '9 ads nombrados y organizados (TOFU / MOFU / BOFU)' },
  { id: 'H4', clase: 16, nombre: 'Campaña al aire',       que: '1 campaña / 1 adset / 9 ads, presupuesto ≥ 3× BEP' },
  { id: 'H5', clase: 19, nombre: 'Primera escala con datos', que: 'Decisión justificada con 7 días de datos' },
  { id: 'H6', clase: 24, nombre: 'Sistema automatizado',  que: 'CLAUDE.md, 3 skills propias, reporte semanal y plan de 90 días' },
];

const PREREQ = [
  'Tienda Shopify (plan básico) con dominio propio',
  'Cuenta de Dropi activa (o tu proveedor COD)',
  'Meta Business Manager: página, cuenta publicitaria, pixel creado, método de pago, identidad verificada',
  'WhatsApp Business',
  'Google Sheets / Drive con carpeta compartida con el profe',
  'Cuenta en un generador de imágenes y en uno de video',
  'CapCut instalado',
  'Cuenta de Claude (Pro o Max) — se usa desde la clase 17',
  'Computador donde puedas instalar programas',
  'Presupuesto de prueba: mínimo 3× BEP diario durante 7 días',
  'Carpeta mi-negocio/ creada en tu computador',
];

/* ---------------------------------------------------------------------
   LAS 24 CLASES
   --------------------------------------------------------------------- */
const CLASES = [
{ n: 1, mod: 0, titulo: 'El mapa del sistema y tus números',
  objetivo: 'Ver el negocio como una cadena de 6 eslabones, saber dónde se te rompió la última vez y salir con tu BEP calculado.',
  lleva: 'Ficha de diagnóstico + BEP de un producto real + las reglas del curso.',
  hora: [
    [0,10,'Diagnóstico guiado','Qué has probado, qué pasó, cuánto gastaste, qué tienes montado, dónde sientes que se cae.'],
    [10,25,'La cadena de 6 eslabones','Producto → Oferta → Landing → Creativos → Tráfico → Operación. La pregunta que ordena todo: ¿dónde se rompió la cadena? Ubicar tus fracasos anteriores en un eslabón.'],
    [25,45,'Economía unitaria','Precio, costo, envío, comisión, tasa de entrega COD, BEP, BEP efectivo, CPA objetivo, presupuesto ≥ 3× BEP. Práctica: calcular el BEP de tu último producto.'],
    [45,55,'Cómo funciona el curso','Hilo conductor, 6 hitos, tareas, carpeta compartida, tres reglas.'],
    [55,60,'Tarea','']],
  actividad: 'Calcular BEP y BEP efectivo con tus números reales (calculadora abajo) y ubicar tu último producto en la cadena.',
  tarea: ['Ficha de diagnóstico (T1) completa', 'Capturas del Ads Manager de los últimos 30 días', 'Lista de 3 nichos que te interesan', 'Instalar las herramientas de "Antes de empezar"', 'Crear la carpeta mi-negocio/'],
  recursos: ['C1','C2','C8','T1','H14'], tools: ['bep','diagnostico'],
  checkpoint: 'Explicas con tus palabras qué es BEP y por qué el presupuesto inicial debe ser ≥ 3× BEP; señalas qué eslabón se te rompió.',
  profe: 'Empieza con una victoria (que salga con su BEP). No corrijas todo lo que hizo mal el primer día: anótalo y úsalo como ejemplo en la clase que corresponda. Muestra un caso tuyo real anonimizado de cadena rota.',
  quiz: [
    { q: '¿Qué es el BEP?', o: ['El presupuesto diario de la campaña', 'El CPA máximo que puedes pagar sin perder plata', 'El ROAS objetivo'], a: 1, w: 'BEP = precio − costo − envío − comisión. Si el CPA lo supera, pierdes en cada venta.' },
    { q: 'Presupuesto inicial mínimo para que el adset salga del aprendizaje:', o: ['1× BEP', '3× BEP', '10× BEP'], a: 1, w: 'Con menos de 3× BEP el adset nunca consigue suficiente señal.' },
    { q: 'Tu última campaña tuvo CTR alto pero nadie compró. ¿Qué eslabón se rompió?', o: ['Creativos', 'Landing / oferta', 'Producto'], a: 1, w: 'El creativo hizo su trabajo (clics). La caída ocurre después del clic.' }] },

{ n: 2, mod: 1, titulo: 'Qué es un producto ganador (y cuáles ya están quemados)',
  objetivo: 'Distinguir un ganador real de uno que "todo el mundo ya vio" y aprender a hacer scouting en vivo.',
  lleva: 'Los criterios + 5 candidatos crudos en tu Sheet.',
  hora: [
    [0,5,'Tarea','Diagnóstico y nichos.'],
    [5,25,'Los criterios','Score 0-100: margen 3-5× (15) · wow / resuelve problema (15) · ads +45 días en otros países (15) · ads activos en 3-4 países (10) · TikTok creators (10) · Trends CO (10) · Dropi <7 días (10) · comentarios/Reddit (5) · sin marca ni riesgo de ban (5) · creativos fáciles (5). Los 4 pesados: margen, wow, ads +45d, saturación CO.'],
    [25,35,'Lo que parece ganador y no lo es','Producto quemado (si ya lo conoces, ya pasó su pico). Peso >1,5 kg, baterías, frágil, sourcing >USD 20. Estacionalidad. Claims que tumban cuentas. Saturación = tiendas Shopify CO anunciando en Ads Library, NO listings de Mercado Libre. Momentum: ad de 45-120 días con variantes creciendo.'],
    [35,55,'Scouting en vivo','Ads Library con país (España, Italia, Alemania, Francia, Brasil, México), keywords del nicho, fecha de inicio, # variantes. 5 candidatos crudos al Sheet.'],
    [55,60,'Tarea','']],
  actividad: 'Scouting en 2 países / 2 keywords: 5 candidatos crudos (nombre, tienda, URL del ad, fecha inicio, # variantes, país).',
  tarea: ['10 candidatos crudos en el Sheet', 'Gate −1 por candidato: buscar en Dropi la palabra del PROBLEMA y contar proveedores (≤3 virgen · 4-6 tibia · ≥7 categoría quemada)'],
  recursos: ['S1','H15','H1','H2','H3','T2'], tools: [],
  checkpoint: 'Nombras los 4 criterios pesados y explicas por qué 500 listings en Mercado Libre no significan saturación.',
  profe: 'Cuenta la historia de un producto que se te quemó y qué señal ignoraste. Ese relato vale más que la tabla.',
  quiz: [
    { q: '¿Cómo se mide la saturación de un producto en Colombia?', o: ['Listings en Mercado Libre', 'Tiendas Shopify CO anunciando en Meta Ads Library', 'Cantidad de videos en TikTok'], a: 1, w: 'ML son importadores orgánicos: sirven como benchmark de precio, no como competencia directa.' },
    { q: 'Un producto que "todo el mundo conoce":', o: ['Es ganador seguro', 'Probablemente ya pasó su pico', 'Hay que testearlo con más presupuesto'], a: 1, w: 'Si está en tu memoria, ya tuvo su ciclo viral.' },
    { q: '¿Cuál es una trampa logística?', o: ['Producto de 300 g en bodega colombiana', 'Producto de 2 kg con batería de litio', 'Producto con 3 proveedores en Dropi'], a: 1, w: 'Peso, baterías y fragilidad se comen el margen y generan devoluciones.' }] },

{ n: 3, mod: 1, titulo: 'Validar sin engañarte: los gates y el scoring',
  objetivo: 'Descartar rápido y barato antes de enamorarte, y puntuar solo con evidencia.',
  lleva: 'Los 3 gates aplicados a tus candidatos + un candidato con score.',
  hora: [
    [0,5,'Tarea','Los 10 candidatos y el gate −1.'],
    [5,20,'Los 3 gates (en orden, eliminatorios)','Gate 0 anti-quemado: Trends CO 24 meses + ads CO pasados. Gate 1 saturación CO: matriz de 7 keywords (marca, genérico, sinónimos, categoría, problema, inglés, función), contar tiendas Shopify distintas: 0-2 baja · 3-4 moderada · ≥5 descarte. Gate 2 margen: costo landed = proveedor + envío + empaque + comisión (~3,5 %) + riesgo COD (5-10 %); precio = ML × 1,3-1,5; margen <3× descarte.'],
    [20,30,'Scoring con evidencia','Sin URL + captura = 0 puntos. <60 descartar · 60-69 segunda ronda · 70-84 testear · 85+ agresivo. Score >70 exige evidencia en los 4 pesados. Ángulo abierto.'],
    [30,55,'Práctica','Correr los 3 gates sobre 3 candidatos (≈8 min cada uno), llenando la matriz de 7 keywords. Descartar sin piedad.'],
    [55,60,'Tarea','']],
  actividad: 'Tres candidatos por los tres gates, con la matriz de saturación (herramienta abajo).',
  tarea: ['Dossier de 1 hoja del mejor candidato (score con evidencia, ángulo abierto, sourcing, riesgos)', 'Shortlist de 3 ordenada'],
  recursos: ['S1','H1','H2','H3','T2'], tools: ['saturacion'],
  checkpoint: 'Descartaste al menos un producto y dices exactamente qué gate falló; tu score no tiene puntos sin URL.',
  profe: 'Si en clase no aparece ningún ganador, dilo: "hoy no hubo ganador" es un resultado correcto. Que no se lleve un producto malo por presión de la clase.',
  quiz: [
    { q: 'Orden correcto de los gates:', o: ['Margen → saturación → anti-quemado', 'Anti-quemado → saturación CO → margen', 'Da igual el orden'], a: 1, w: 'Los gates baratos van primero para no gastar tiempo en productos que van a fallar.' },
    { q: 'La matriz muestra 6 tiendas Shopify CO distintas en la unión de keywords:', o: ['Moderada, viable', 'Saturado, descarte', 'Depende del margen'], a: 1, w: '≥5 tiendas distintas = saturado. No se promedia.' },
    { q: 'Un criterio sin URL ni captura vale:', o: ['0 puntos', 'La mitad', 'Lo que estimes conservador'], a: 0, w: 'Sin evidencia no hay puntos. Así se evitan los scores inflados.' }] },

{ n: 4, mod: 1, titulo: 'De producto a promesa: avatar, ángulo y oferta', hito: 'H1',
  objetivo: 'Convertir el producto en una promesa concreta con una oferta que cierra.',
  lleva: 'Ficha de producto completa: el documento que alimenta landing, creativos y ads.',
  hora: [
    [0,5,'Tarea','Elegir el producto de la shortlist. Decisión tomada, no se reabre.'],
    [5,20,'Avatar y lenguaje','Quién compra, para quién, momento del dolor, qué ya intentó, qué le da miedo. Banco de 20 frases textuales (comentarios, reseñas, hilos). Nunca inventar el lenguaje del cliente.'],
    [20,30,'Mecanismo, promesa y ángulo','Por qué funciona en una frase. Resultado concreto sin claims prohibidos. Ángulo abierto vs ángulos de la competencia CO. Riesgo legal por categoría.'],
    [30,45,'La oferta','Precio ancla (ML × 1,3-1,5), bundles 1 / 2 / 3, garantía que sí puedes cumplir, bono digital, envío gratis COD, "PAGAR EN CASA". BEP por bundle.'],
    [45,55,'Práctica','Llenar la ficha en vivo con los prompts P1 y P2.'],
    [55,60,'Tarea','']],
  actividad: 'Ficha de producto completa + bundles con la calculadora.',
  tarea: ['Ficha de producto terminada', 'Pedir muestra al proveedor', '6-10 fotos del producto real con buena luz (referencia para la IA)', 'Nombre comercial + wordmark simple (no gastes días en el logo)'],
  recursos: ['P1','P2','C4','C8','T2','H17'], tools: ['ficha','bundles'],
  checkpoint: 'Lees tu promesa en voz alta y no contiene ninguna palabra que Meta o la SIC sancionen; sabes el BEP de cada bundle.',
  profe: 'Aquí se define el nombre. Corta la parálisis de branding: nombre + tipografía + un color, y adelante.',
  quiz: [
    { q: 'El banco de frases del cliente sale de:', o: ['Tu imaginación', 'Comentarios, reseñas e hilos reales', 'Un generador de texto'], a: 1, w: 'Regla dura: hooks y copy salen de frases textuales, nunca inventadas.' },
    { q: '¿Cuál promesa es válida?', o: ['"Resultados garantizados o es gratis"', '"Ordena tu cocina en una tarde, sin taladro"', '"El mejor del mercado, aprobado por médicos"'], a: 1, w: 'Concreta, sostenible y sin claims prohibidos.' },
    { q: 'Los bundles de 3 niveles sirven para:', o: ['Subir el ticket promedio y el margen por pedido', 'Confundir al cliente', 'Bajar el BEP'], a: 0, w: 'Un pedido de 2 unidades paga el mismo envío y la misma confirmación.' }] },

{ n: 5, mod: 2, titulo: 'Anatomía de una landing COD que convierte',
  objetivo: 'Reconocer los 4 formatos, saber cuál te sirve y detectar los errores que matan conversiones.',
  lleva: 'Formato elegido + auditoría de 2 competidores.',
  hora: [
    [0,5,'Tarea','Ficha y fotos.'],
    [5,20,'Los 4 formatos','Imagen (infografías apiladas, una pantalla por argumento) · Noticia/advertorial (convence de un mecanismo invisible) · HTML/PDP (el comprador elige color/talla/sabor) · Estructural (demo en movimiento: GIF → prueba → CTA repetido). La pregunta que decide: ¿qué carga el peso del argumento? Imagen es el default.'],
    [20,35,'Bloques universales','Hero tipo Amazon · problema · mecanismo · beneficios con icono · nosotros vs ellos · prueba social honesta · oferta con bundles · garantía · cómo llega (timeline) · FAQ de objeciones COD · CTA cada ~1.000 px · botón "PAGAR EN CASA" · header sin links · prueba social después del último CTA.'],
    [35,45,'Errores que matan','Popup vendiendo otro producto, cifras que no cuadran, reseñas en inglés, contadores falsos, secciones vacías, CTA dentro de una imagen, header lleno de links. Legal (Ley 1480/SIC): sin médicos inventados, reseñas fabricadas ni escasez falsa. La estructura vende sin mentir.'],
    [45,55,'Práctica','Auditar 2 landings de competidores CO con el checklist de 25.'],
    [55,60,'Tarea','']],
  actividad: 'Auditoría de 2 landings + elegir formato.',
  tarea: ['Wireframe (T3): secciones, orden, dónde va cada CTA', 'Lista de 6 objeciones COD para el FAQ (¿cuándo llega? ¿pago al recibir? ¿y si no me sirve? ¿es original? ¿garantía? ¿cómo se usa?)'],
  recursos: ['S2','H18'], tools: [],
  checkpoint: 'Justificas el formato con la pregunta clave, no con "me gusta".',
  profe: 'Ten a mano 4 landings (una por formato) ya abiertas. No pierdas 10 minutos buscando en clase.',
  quiz: [
    { q: '¿Qué decide el formato de la landing?', o: ['Lo que te guste', 'Qué carga el peso del argumento de venta', 'El nicho del producto'], a: 1, w: 'Demo en movimiento, lista de atributos, una decisión del comprador o creencia en un mecanismo.' },
    { q: 'Un error que mata conversiones:', o: ['CTA cada 1.000 px', 'Popup de prueba social vendiendo otro producto', 'FAQ de objeciones COD'], a: 1, w: 'Pasa cuando se copia un bloque de demo sin editarlo. Se ve en landings reales publicadas.' },
    { q: 'La prueba social va:', o: ['Solo antes del hero', 'También después del último CTA', 'Solo en el footer'], a: 1, w: 'El que llegó al final necesita el último empujón de confianza.' }] },

{ n: 6, mod: 2, titulo: 'Copy que vende',
  objetivo: 'Escribir la landing con el lenguaje del cliente, una idea por sección, sin nada que no puedas sostener.',
  lleva: 'Hero + problema + oferta escritos; el resto queda de tarea.',
  hora: [
    [0,5,'Tarea','Wireframe.'],
    [5,25,'Copy por sección','Hero: titular de deseo concreto (3-6 palabras) + subtítulo con mecanismo + CTA. Problema con frases del banco. Mecanismo en 3 pasos. Beneficios ≠ características. Nosotros vs ellos. Prueba social honesta. Oferta con ancla y ahorro visible. Garantía. Cómo llega. FAQ. Fórmulas: "Vuelve a X" · "X sin Y" · "Para quienes X".'],
    [25,35,'Trabajar con IA sin que se note','P3 toma la ficha y escribe por secciones. Regla: editar, no aceptar. Leer en voz alta. Quitar adjetivos vacíos. Números concretos.'],
    [35,55,'Práctica','Hero + problema + oferta en vivo. Comparar 2 versiones de titular.'],
    [55,60,'Tarea','']],
  actividad: 'Escribir hero, problema y oferta con el prompt P3 y editarlos a mano.',
  tarea: ['Copy completo en el doc (T4), todas las secciones del wireframe', 'Los 6 FAQ respondidos'],
  recursos: ['P3','H22','H19'], tools: [],
  checkpoint: 'Cada viñeta de beneficios responde "¿y eso qué me da a mí?"; el titular cabe en 6 palabras.',
  profe: 'El error típico es copy que suena a IA (perfecto y sin alma). Enséñale a meter una frase textual de cliente en cada sección.',
  quiz: [
    { q: '"Tiene 3 velocidades" es:', o: ['Un beneficio', 'Una característica', 'Un CTA'], a: 1, w: 'El beneficio responde "¿y eso qué me da?": "se limpia en 2 minutos".' },
    { q: 'El titular del hero:', o: ['≤6 palabras y un deseo concreto', 'Un párrafo con toda la explicación', 'El nombre del producto'], a: 0, w: 'En el celular se leen 6 palabras. El deseo concreto detiene el scroll.' },
    { q: 'El copy que genera la IA:', o: ['Se publica tal cual', 'Se edita y se le mete lenguaje del cliente', 'No sirve para nada'], a: 1, w: 'La IA da estructura; la frase textual del cliente da verdad.' }] },

{ n: 7, mod: 2, titulo: 'Imágenes con IA: el hero y las infografías',
  objetivo: 'Generar imágenes de landing con el texto ya incrustado y el producto integrado de verdad (no recortado y pegado).',
  lleva: '2 imágenes de hero + 1 infografía hechas en clase y el método para el resto.',
  hora: [
    [0,5,'Tarea','Copy.'],
    [5,20,'Anatomía del prompt de imagen','Escena + "EXACTAMENTE el producto de la imagen de referencia, etiqueta hacia la cámara" + texto corto entre comillas (3-6 palabras) + estilo + relación de aspecto. Producto integrado por la IA con su luz y su sombra. Generar 4, elegir 1. Revisar que la etiqueta se lea.'],
    [20,30,'El patrón Amazon para el hero (7 imágenes)','1 gancho con persona + titular gigante · 2 "ayuda con" en cajas con icono · 3 cifras alrededor del producto · 4 ingredientes/partes con flechas · 5 cómo se usa con la mano · 6 producto en escena + oferta · 7 sellos + persona. Producto ≥40 % del alto. Truco: pasar una imagen de Amazon como referencia de composición.'],
    [30,35,'Infografías de landing','768×1376 (una pantalla de móvil = un argumento). JPG <200 KB. Una idea por imagen.'],
    [35,55,'Práctica','Generar hero #1, #2 y una infografía iterando el prompt con P6.'],
    [55,60,'Tarea','']],
  actividad: 'Tres imágenes generadas en vivo con tu foto real como referencia.',
  tarea: ['7 imágenes de hero', 'Las infografías del wireframe (6-8)', 'Todas optimizadas <200 KB en imagenes/'],
  recursos: ['P6','S10','H19','H18'], tools: [],
  checkpoint: 'En tus imágenes el producto tiene sombra coherente con la escena y el texto es legible en el celular.',
  profe: 'Que use SU foto real como referencia desde la primera. Si la muestra no ha llegado, foto del proveedor limpia en fondo blanco.',
  quiz: [
    { q: 'El producto en la imagen generada:', o: ['Recortado y pegado sobre un fondo', 'Integrado por la IA con luz y sombra, usando tu foto de referencia', 'Dibujado de memoria por la IA'], a: 1, w: 'El recorte se nota. La referencia de imagen reproduce el producto e integra la escena.' },
    { q: 'Texto dentro de la imagen:', o: ['Cuanto más, mejor', '3-6 palabras, entre comillas en el prompt', 'Nunca se pone texto'], a: 1, w: 'El texto largo se garabatea. Corto y entre comillas sale exacto.' },
    { q: 'En el patrón Amazon el producto ocupa:', o: ['10 % de la imagen', 'Al menos 40 % del alto', 'Toda la imagen sin texto'], a: 1, w: 'Producto grande + titular grande + beneficio. Así se lee en el feed.' }] },

{ n: 8, mod: 2, titulo: 'Taller: construir la landing en Shopify',
  objetivo: 'Montar la landing completa y hacer un pedido de prueba de punta a punta.',
  lleva: 'Landing montada (aunque falten ajustes) + pedido de prueba.',
  hora: [
    [0,5,'Tarea','Imágenes listas.'],
    [5,15,'Piezas de Shopify','Producto y variantes (bundles como variantes), plantilla alterna de producto (una tienda, N landings sin tocar la PDP normal), tema Dawn, secciones, formulario COD (nombre, teléfono, ciudad, dirección, barrio/referencia; botón "PAGAR EN CASA"), pixel de Meta nativo con CAPI, dominio, footer con políticas y contacto.'],
    [15,50,'Montaje en vivo','Compartes pantalla y montas sección por sección. Header vacío. Sin apps innecesarias.'],
    [50,58,'Pedido de prueba','Formulario → ¿llega el pedido? ¿notificación? ¿dispara Purchase en Test Events?'],
    [58,60,'Tarea','']],
  actividad: 'Montaje completo con tu pantalla compartida.',
  tarea: ['Terminar la landing', 'Pedido de prueba completo', 'Video de 1 minuto (Loom) explicando tu landing sección por sección'],
  recursos: ['T11','H16','H7'], tools: [],
  checkpoint: 'El pedido de prueba llegó y el pixel disparó Purchase.',
  profe: 'Ten un checklist de 10 pasos de Shopify para no improvisar. Si su tema no es Dawn, adapta pero no cambies de tema en clase.',
  quiz: [
    { q: 'La plantilla alterna de producto sirve para:', o: ['Cambiar el tema', 'Tener varias landings en una tienda sin tocar la PDP normal', 'Bajar el precio'], a: 1, w: 'Una plantilla por landing; el producto sigue igual para el resto de la tienda.' },
    { q: 'El formulario COD debe tener:', o: ['12 campos para conocer al cliente', 'Solo nombre, teléfono, ciudad, dirección y barrio/referencia', 'Tarjeta de crédito'], a: 1, w: 'Cada campo extra baja la conversión. Lo demás se confirma por WhatsApp.' },
    { q: 'Antes de dar por terminada la landing:', o: ['Pedido de prueba y ver Purchase en Test Events', 'Compartirla en Instagram', 'Subir el presupuesto'], a: 0, w: 'Si el pixel no dispara, la campaña va a optimizar a ciegas.' }] },

{ n: 9, mod: 2, titulo: 'CRO: auditar, medir y mejorar', hito: 'H2',
  objetivo: 'Auditar tu propia landing como un extraño y saber qué probar primero.',
  lleva: 'Landing publicada y corregida + Clarity instalado.',
  hora: [
    [0,5,'Tarea','Ver el Loom.'],
    [5,20,'Cómo se mide una landing','LPV → ATC → compra. CVR objetivo COD 2-4 %. Velocidad (<3 s). Clarity: heatmaps y grabaciones. Qué probar primero: hero > oferta > prueba social > el resto. Un cambio a la vez.'],
    [20,50,'Auditoría en vivo','A 375 px, con el checklist de 25: técnico, copy, confianza, legal, coherencia. Corregir los 5 fallos más graves.'],
    [50,58,'Publicar','Landing en vivo.'],
    [58,60,'Tarea','']],
  actividad: 'Checklist de 25 puntos sobre tu landing (herramienta abajo).',
  tarea: ['Aplicar el resto de correcciones', 'Instalar Clarity', 'Test de los 10 segundos: 3 personas de tu avatar entran desde el celular y dicen qué entienden'],
  recursos: ['S2','P4','H5','H6'], tools: ['checklist25'],
  checkpoint: '≥22/25 en el checklist; sabes qué vas a probar primero y por qué.',
  profe: 'El test de 10 segundos con gente real vale más que cualquier herramienta. Insiste en que lo haga.',
  quiz: [
    { q: '¿Qué se prueba primero en una landing?', o: ['El footer', 'Hero, luego oferta, luego prueba social', 'Todo a la vez'], a: 1, w: 'El hero decide si siguen leyendo. Un cambio a la vez para saber qué funcionó.' },
    { q: 'CVR objetivo en COD (LPV → compra):', o: ['0,1 %', '2-4 %', '20 %'], a: 1, w: 'Por debajo de 2 % con tráfico correcto, la landing o la oferta tienen un problema.' },
    { q: 'El test de los 10 segundos es:', o: ['Medir velocidad de carga', 'Que alguien del avatar diga qué entiende en 10 s', 'Un A/B test en Meta'], a: 1, w: 'Si no entiende qué es y para quién en 10 s, el hero falló.' }] },

{ n: 10, mod: 3, titulo: 'Los creativos son la única variable que controlas',
  objetivo: 'Entender que en Meta hoy el creativo ES el targeting, y dominar la estructura y la matriz de 9.',
  lleva: 'Matriz de 9 ángulos con un hook por slot.',
  hora: [
    [0,5,'Tarea','Landing publicada.'],
    [5,15,'Por qué','El motor hace el targeting; tú alimentas variedad creativa. Un solo ad cargando el adset = colapso cuando se fatiga.'],
    [15,30,'Estructura y matriz','Hook (0-3 s) → desarrollo → prueba/demo → CTA. 9 ads = 3 TOFU + 3 MOFU + 3 BOFU, con/sin persona, 9 ángulos. UGC = demostración, no testimonio: la persona muestra el producto, lee la etiqueta, cuenta cómo se usa y el precio; nunca "a mí me curó".'],
    [30,50,'Práctica','Descomponer 3 ads ganadores en hook / desarrollo / prueba / CTA + ángulo + etapa. Llenar la matriz de 9 con P5.'],
    [50,60,'Tarea','']],
  actividad: 'Matriz de 9 rellenada (herramienta abajo).',
  tarea: ['Matriz de 9 con un hook escrito por slot, guardada en matriz-9-ads.md'],
  recursos: ['S3','H22','P5','H1','T5'], tools: ['matriz9'],
  checkpoint: 'Para cada uno de tus 9 hooks dices a qué etapa y ángulo pertenece.',
  profe: 'Muéstrale un adset real donde el ad "caro" alimentaba al ganador. Es la idea más contraintuitiva del curso; hay que verla en datos.',
  quiz: [
    { q: 'En Meta hoy, el targeting lo hace:', o: ['Tu selección de intereses', 'El motor; tú alimentas creativos variados', 'El pixel solo'], a: 1, w: 'Por eso 9 ads con ángulos distintos: cada uno encuentra su audiencia.' },
    { q: 'Los 9 ads son:', o: ['9 variaciones del mismo video', '3 TOFU + 3 MOFU + 3 BOFU con ángulos distintos', '9 productos distintos'], a: 1, w: 'Frío, consideración y cierre. Con y sin persona.' },
    { q: 'Un UGC-demostración:', o: ['"A mí me curó en una semana"', 'Muestra el producto, la etiqueta, cómo se usa y el precio', 'Un médico recomendándolo'], a: 1, w: 'Demostrar, no prometer. Es legal y convierte.' }] },

{ n: 11, mod: 3, titulo: 'Scouting creativo, swipe file y ads estáticos',
  objetivo: 'Construir tu swipe file y producir tus primeros ads estáticos con formatos que paran el scroll.',
  lleva: 'Swipe file iniciado + 2 ads estáticos.',
  hora: [
    [0,5,'Tarea','Matriz de 9.'],
    [5,20,'Dónde y cómo buscar','Ads Library: activos +30 días con varias variantes = ganadores. TikTok: por producto y por problema, más gustados, creators, sonidos. Frankenstein: hook de A + demo de B + CTA de C. Swipe file: URL, formato, hook, ángulo, por qué funciona, qué clonar.'],
    [20,35,'Ads estáticos que paran el scroll','Falso play / "parece video", selector ("¿cuál eres?"), comparativa, "toca para ver", antes/después honesto, testimonio-demostración con texto, metáfora visual. Safe zones. Texto legible en 375 px.'],
    [35,55,'Práctica','6 referencias al swipe + generar 2 ads estáticos (slots 1 y 7).'],
    [55,60,'Tarea','']],
  actividad: 'Swipe file con 6 referencias + 2 estáticos generados.',
  tarea: ['Swipe file con 20 referencias (10 del producto, 10 del problema)', '3 ads estáticos finales'],
  recursos: ['T5','H22','P6','H1','H4','S7'], tools: ['swipe'],
  checkpoint: 'Cada referencia del swipe tiene escrito "por qué funciona" y "qué clono".',
  profe: 'El swipe file es el activo más subestimado. Si lo mantiene, nunca más se queda sin ideas. Revísalo en cada clase de creativos.',
  quiz: [
    { q: 'Un ad ganador en Ads Library se reconoce por:', o: ['Muchos likes', 'Activo +30 días con varias variantes', 'Buena música'], a: 1, w: 'Nadie paga 30 días por un ad que no vende.' },
    { q: 'Frankenstein es:', o: ['Copiar un ad entero', 'Hook de A + demo de B + CTA de C', 'Un formato de landing'], a: 1, w: 'Combinas las partes que ya funcionan en otros y las adaptas a tu producto.' },
    { q: 'Cada referencia del swipe lleva:', o: ['Solo el link', 'Link, hook, ángulo, por qué funciona y qué clonar', 'El precio del producto'], a: 1, w: 'Un link sin análisis no enseña nada dentro de un mes.' }] },

{ n: 12, mod: 3, titulo: 'Video con IA I: del guion a las escenas',
  objetivo: 'Producir un ad de video con IA de principio a fin: guion → escenas → prompts → generación.',
  lleva: 'Guion de 1 ad TOFU en 5 escenas con prompts + la primera escena generada.',
  hora: [
    [0,5,'Tarea','Swipe + estáticos.'],
    [5,15,'El stack','Generadores de video, voz (ElevenLabs), edición (CapCut). Qué hace bien la IA y qué no: escenas cortas sí; texto largo, manos precisas y etiquetas perfectas no.'],
    [15,30,'El pipeline','Guion (hook / desarrollo / prueba / CTA, 15-30 s) → 5-6 escenas de 3-5 s → prompt por escena con el producto por referencia (persona consistente) → generar → ensamblar. Híbrido: b-roll real con el celular + escenas IA. UGC-demostración: "objeción → mostrar". Si es salud: línea legal quemada.'],
    [30,55,'Práctica','Con P7: guion TOFU-dolor → 5 escenas → 5 prompts → generar la escena 1.'],
    [55,60,'Tarea','']],
  actividad: 'Guion + escenas + prompts + escena 1 generada.',
  tarea: ['Generar las 5 escenas', 'Voz en off (ElevenLabs o tu voz)'],
  recursos: ['P7','S10','H18','H9','T5'], tools: [],
  checkpoint: 'Tu prompt de cada escena describe una sola acción de 3-5 s y referencia el producto real.',
  profe: 'El estudiante va a querer que la IA haga TODO el video en un prompt. Corta eso: escenas cortas, siempre.',
  quiz: [
    { q: 'Cada escena generada con IA dura:', o: ['30 segundos', '3-5 segundos con una sola acción', 'Lo que salga'], a: 1, w: 'Una acción por escena es lo que la IA hace bien. El ritmo lo pones en edición.' },
    { q: 'El producto en el video:', o: ['Se describe con palabras', 'Se pasa por referencia de imagen', 'No se muestra'], a: 1, w: 'Sin referencia la IA inventa un producto parecido. Con referencia lo reproduce.' },
    { q: 'El texto en pantalla:', o: ['Se pide en el prompt de video', 'Se pone en edición', 'No se usa'], a: 1, w: 'Los generadores garabatean el texto. CapCut lo pone exacto.' }] },

{ n: 13, mod: 3, titulo: 'Video con IA II: ensamblar, variar y producir el set de 9', hito: 'H3',
  objetivo: 'Cerrar el pipeline en CapCut y salir con el sistema para producir 9 ads por semana.',
  lleva: '1 ad terminado + 2 variantes de hook + plan de producción del set.',
  hora: [
    [0,5,'Tarea','Escenas.'],
    [5,20,'Ensamblaje en CapCut','Cortes al ritmo, subtítulos grandes, voz IA, música, texto en pantalla, safe zones 9:16, línea legal, CTA final con texto.'],
    [20,30,'Variaciones baratas y lote','Cambiar los primeros 3 s = ad nuevo. 3 hooks × 1 cuerpo = 3 ads. Nomenclatura. Checklist de calidad antes de subir.'],
    [30,55,'Práctica','Ensamblar el ad + 2 variantes de hook.'],
    [55,60,'Tarea','']],
  actividad: 'Ad ensamblado + 2 variantes; nombrar todo con el nombrador.',
  tarea: ['Set completo de 9 (mínimo 6 video + 3 estáticos) nombrados y en carpeta', 'Cada uno con su slot de la matriz'],
  recursos: ['T6','H8','S7','H11','T5'], tools: ['nombrador'],
  checkpoint: '9 archivos con nombre PRODUCTO_ETAPA_ANGULO_FORMATO_v1, todos pasan el checklist.',
  profe: 'Revisa los 9 antes de la clase 16. Rechaza los que tengan claims que tumben la cuenta — mejor 7 limpios que 9 con riesgo.',
  quiz: [
    { q: 'La variación más barata de un ad:', o: ['Cambiar los primeros 3 segundos', 'Regrabar todo', 'Cambiar la música'], a: 0, w: 'El hook decide el 80 % del resultado. Tres hooks sobre el mismo cuerpo = tres ads.' },
    { q: 'Nombre correcto de archivo:', o: ['video_final_2.mp4', 'PRODUCTO_TOFU_dolor_video_v1', 'ad.mp4'], a: 1, w: 'Cuando tengas 40 ads, el nombre es lo único que te dice qué ángulo ganó.' },
    { q: 'Un ad con un claim de salud fuerte:', o: ['Se sube, a ver si pasa', 'Se descarta: puede tumbar la cuenta', 'Se sube sin texto'], a: 1, w: 'Un rechazo suma. Varios restringen la cuenta.' }] },

{ n: 14, mod: 4, titulo: 'Infraestructura de Meta: que no te tumben antes de empezar',
  objetivo: 'Dejar la cuenta sana, el pixel con señal y un respaldo listo.',
  lleva: 'Auditoría de infraestructura en verde + Test Events funcionando.',
  hora: [
    [0,5,'Tarea','Los 9.'],
    [5,20,'Las piezas','BM, cuenta publicitaria, página, dominio verificado, pixel + CAPI (nativo de Shopify en etapa 1), EMQ, método de pago + respaldo, límite de gasto, 2FA.'],
    [20,35,'Por qué banean y cómo no','Claims, landing sin políticas/contacto, cuenta nueva + gasto alto el día 1, cambios bruscos, mezclar nichos en un mismo pixel. Calentamiento. Segundo BM desde ya. Las 4 etapas de infraestructura y qué NO necesitas todavía (antidetect, proxies, LLC).'],
    [35,55,'Práctica','Checklist de infraestructura sobre tu cuenta; pedido de prueba con Test Events abierto (PageView → ViewContent → AddToCart → Purchase).'],
    [55,60,'Tarea','']],
  actividad: 'Auditoría de infraestructura + Test Events.',
  tarea: ['Checklist en verde', 'Segundo BM creado y con página', 'Método de pago de respaldo'],
  recursos: ['H20','H7','H11'], tools: [],
  checkpoint: 'Ves tus 4 eventos en Test Events con EMQ aceptable; explicas por qué no mezclas nichos en la misma cuenta.',
  profe: 'Presenta las opciones grises (agency accounts, antidetect) con sus riesgos reales y en qué etapa tienen sentido. No moralices, pero tampoco lo mandes ahí en etapa 1.',
  quiz: [
    { q: 'Mezclar productos de nichos distintos en la misma cuenta:', o: ['Ahorra tiempo', 'Fragmenta el aprendizaje del pixel', 'Es obligatorio'], a: 1, w: 'El pixel aprende por nicho. Mascotas y belleza en la misma cuenta confunden la señal.' },
    { q: 'En etapa 1 (probando, 0-30 días) necesitas:', o: ['LLC, antidetect y proxies', '1 BM, 1 cuenta, pixel + CAPI nativo', 'Agency account'], a: 1, w: 'La infraestructura crece con la operación. Antes es gasto y complejidad sin retorno.' },
    { q: 'Test Events sirve para:', o: ['Ver si los 4 eventos disparan', 'Subir el presupuesto', 'Apelar un rechazo'], a: 0, w: 'Sin Purchase disparando, la campaña optimiza a ciegas.' }] },

{ n: 15, mod: 4, titulo: 'Operación COD: la parte que decide si ganas plata',
  objetivo: 'Tener el flujo de confirmación y el tablero listos ANTES de que entre el primer pedido.',
  lleva: 'Guion de WhatsApp, tablero de operación, BEP efectivo recalculado.',
  hora: [
    [0,5,'Tarea','Infraestructura.'],
    [5,25,'El flujo del pedido','Pedido → confirmación por WhatsApp en <1 h → despacho → tránsito 2-5 días → entrega → pago. Tasas: confirmación >85 %, entrega ≥75 %. Causas de devolución. Novedades. La devolución la pagas tú (flete ida y vuelta). Flujo de caja: plata atrapada 1-3 semanas. Servicio al cliente y reclamos.'],
    [25,50,'Práctica','Guion con P10 y respuestas rápidas; recalcular BEP efectivo con tasa de entrega real; montar el tablero.'],
    [50,60,'Tarea','']],
  actividad: 'Guion de WhatsApp + BEP efectivo con la calculadora.',
  tarea: ['WhatsApp Business con respuestas rápidas', 'Tablero de operación listo', 'Stock confirmado con el proveedor', 'Horario de confirmación definido'],
  recursos: ['P10','C2','C7'], tools: ['cod','bep'],
  checkpoint: 'Sabes cuánto te cuesta cada devolución y cuánto baja tu CPA máximo real con una tasa de entrega del 70 %.',
  profe: 'Esta clase va ANTES de lanzar a propósito: los pedidos entran la misma noche y si no confirma en 1 hora, la tasa de entrega se desploma. Enséñalo con tu número real.',
  quiz: [
    { q: 'Confirmar un pedido COD en menos de:', o: ['24 horas', '1 hora', '3 días'], a: 1, w: 'El impulso de compra se enfría. Cada hora sin confirmar baja la tasa de entrega.' },
    { q: 'Una devolución la paga:', o: ['El cliente', 'Tú (flete de ida y vuelta)', 'La transportadora'], a: 1, w: 'Por eso el BEP efectivo descuenta las devoluciones.' },
    { q: 'Con tasa de entrega del 70 %, tu CPA máximo real:', o: ['Sube', 'Baja', 'No cambia'], a: 1, w: 'Pagas el ad por cada pedido, pero solo cobras los entregados.' }] },

{ n: 16, mod: 4, titulo: 'Estructura de campaña y lanzamiento', hito: 'H4',
  objetivo: 'Montar y lanzar la campaña correctamente y comprometerte a 7 días sin tocar.',
  lleva: 'Campaña al aire y tablero diario.',
  hora: [
    [0,5,'Tarea','Operación lista.'],
    [5,20,'Las 7 reglas','1 campaña / 1 adset / 9 ads · evaluación por CPA conjunto del adset · 7 días sin tocar · +15 % máximo cada 3 días · cambios 10 am-12 m · no fragmentar (creativos nuevos al adset existente) · presupuesto ≥ 3× BEP. Advantage+ Sales, audiencia amplia, ubicaciones. Lo que ya no funciona.'],
    [20,50,'Montaje en vivo','Nombrado, objetivo ventas, evento Purchase, presupuesto, audiencia amplia, los 9 ads con copy primario (3 variantes), título, CTA, URL con parámetros. Checklist de lanzamiento.'],
    [50,58,'Lanzar','Publicar (o programar para 10 am).'],
    [58,60,'Compromiso','7 días sin tocar. Registro diario. Única excepción: gasto > 2× BEP con >50 LPV y 0 ventas → revisar pixel, landing y checkout (no la campaña).']],
  actividad: 'Checklist de lanzamiento (herramienta abajo) + presupuesto inicial con la calculadora.',
  tarea: ['Registrar diario: gasto, impresiones, CTR saliente, CPM, LPV, ATC, compras, CPA', 'Confirmar pedidos en <1 h', 'Anotar cada novedad'],
  recursos: ['S4','T7','C3','C6','C7'], tools: ['lanzamiento','escalado','diario'],
  checkpoint: 'Recitas las 7 reglas y explicas la de "no pausar el ad caro".',
  profe: 'Los primeros 3 días va a querer tocar. Acuerda desde hoy que cualquier cambio pasa por ti por WhatsApp antes de hacerlo. Esa contención es parte del servicio.',
  quiz: [
    { q: 'Estructura por producto:', o: ['1 campaña / 5 adsets / 2 ads', '1 campaña / 1 adset / 9 ads', '3 campañas por producto'], a: 1, w: 'Varias campañas del mismo producto compiten entre sí e inflan el CPM.' },
    { q: 'Ventana sin tocar tras lanzar:', o: ['24 horas', '7 días', '30 días'], a: 1, w: 'Antes de 7 días no hay muestra para evaluar CPA.' },
    { q: 'Un ad "parece caro" el día 3:', o: ['Lo pausas', 'No; se evalúa el adset completo', 'Le subes presupuesto'], a: 1, w: 'Ese ad puede estar alimentando el aprendizaje del adset.' }] },

{ n: 17, mod: 5, titulo: 'Claude Code desde cero: tu asistente de operaciones',
  objetivo: 'Instalar Claude Code, darle contexto del negocio y correr el primer flujo real con tus propios documentos.',
  lleva: 'Claude Code funcionando, carpeta mi-negocio/ con CLAUDE.md, y tu matriz de hooks regenerada desde la ficha.',
  hora: [
    [0,5,'Campaña','Ver el tablero diario. Tocar nada.'],
    [5,15,'Qué es y qué no es','Chat vs agente: lee y escribe archivos, ejecuta herramientas, sigue instrucciones guardadas. Modelos, permisos (leer / escribir / ejecutar), credenciales nunca en el chat (van a .env).'],
    [15,30,'Instalación y contexto','Instalar, iniciar sesión, abrir mi-negocio/. CLAUDE.md con P12: quién eres, mercado, productos + BEP, las 7 reglas, tono, qué nunca hacer. Los archivos del curso como fuente de verdad.'],
    [30,40,'Cómo pedir','Contexto + tarea + formato + criterio de éxito + ejemplo. Iterar. Claude propone, tú decides.'],
    [40,55,'Primer flujo','"Lee productos/X/ficha.md y genera una matriz de 9 hooks" → comparar con la tuya. "Revisa copy.md contra el checklist y lista fallos".'],
    [55,60,'Tarea','']],
  actividad: 'Instalar + carpeta + CLAUDE.md + primer flujo.',
  tarea: ['Subir todos los documentos del curso a la carpeta', 'Pedirle a Claude un análisis de tu swipe file (patrones de hook)', 'Escribir 5 tareas repetitivas que te gustaría automatizar (insumo de la clase 23)'],
  recursos: ['P12','H10','H13','C6'], tools: ['diario'],
  checkpoint: 'Tu CLAUDE.md tiene el BEP y las 7 reglas; sabes qué permiso estás dando cuando aceptas una acción.',
  profe: 'Construye SU flujo desde cero con SUS archivos, no le muestres el tuyo. Si le entregas skills (por ejemplo una de setup de Shopify), que sea como recurso separado y opcional.',
  quiz: [
    { q: 'Claude Code, a diferencia de un chat:', o: ['Es lo mismo con otro nombre', 'Lee y escribe archivos, ejecuta herramientas y sigue instrucciones guardadas', 'Solo genera imágenes'], a: 1, w: 'Por eso tu carpeta con la ficha, el copy y la matriz es lo que lo hace útil.' },
    { q: 'Las credenciales (tokens, API keys):', o: ['Se pegan en el chat', 'Van en un archivo .env', 'Van en CLAUDE.md'], a: 1, w: 'Lo que va al chat queda en el historial.' },
    { q: 'CLAUDE.md debe contener:', o: ['Todo el copy de la landing', 'Quién eres, productos + BEP, reglas no negociables y qué nunca hacer', 'Nada, se llena solo'], a: 1, w: 'Es el contexto que lee en cada sesión. Corto y con lo que importa.' }] },

{ n: 18, mod: 6, titulo: 'Leer las métricas sin pánico',
  objetivo: 'Diagnosticar con 7 días de datos usando el árbol de decisión, no la ansiedad.',
  lleva: 'Diagnóstico escrito de tu campaña con una acción propuesta.',
  hora: [
    [0,5,'Tarea','Tablero de 7 días.'],
    [5,20,'Antes de mirar: ¿hay muestra?','1.000 impresiones para CTR · 50 LPV para CVR · 7 días para CPA. Si no hay, no se toca. Columnas personalizadas. CTR saliente, no "todos los clics".'],
    [20,35,'La tabla síntoma → causa → acción','CTR alto + CPA alto = landing/oferta · CTR bajo + CPM alto = creativo frío o pixel sin señal · CTR bajo + CPM bajo = creativo malo · CTR alto + CVR alto + CPA alto = oferta mal calculada · ventas erráticas = presupuesto < 3× BEP · gasta y 0 ventas = pixel/landing/checkout. CPA vs BEP. Evaluar el adset, no el ad.'],
    [35,55,'Práctica','Con tus datos reales (o 3 casos del profe): diagnóstico con la calculadora, luego pegar el CSV a Claude con P8 y comparar.'],
    [55,60,'Tarea','']],
  actividad: 'Diagnóstico con tus números (herramienta abajo).',
  tarea: ['Diagnóstico escrito (1 página) con la acción propuesta', 'NO ejecutarla hasta la clase 19'],
  recursos: ['C5','C6','H21','S5','P8','S9'], tools: ['diag','diario'],
  checkpoint: 'Con 3 casos distintos eliges la fila correcta de la tabla y dices qué NO harías.',
  profe: 'Prepara 3 casos reales anonimizados con capturas (uno de landing, uno de creativo, uno de pixel). Si su campaña aún no tiene muestra, la clase corre igual con tus casos.',
  quiz: [
    { q: 'Antes de evaluar CPA necesitas:', o: ['1 día de datos', '7 días sin cambios', '1 hora'], a: 1, w: 'Menos de 7 días es ruido, no señal.' },
    { q: 'CTR alto + CPA alto indica:', o: ['Creativo malo', 'Landing u oferta débil', 'Pixel frío'], a: 1, w: 'La gente hace clic y no compra: el problema está después del clic.' },
    { q: 'El CTR se mide con:', o: ['Todos los clics', 'CTR saliente (outbound)', 'Reacciones'], a: 1, w: '"Todos los clics" cuenta clics en el perfil y en "ver más". Solo el saliente va a tu landing.' }] },

{ n: 19, mod: 6, titulo: 'Escalar: cuándo, cuánto y cómo', hito: 'H5',
  objetivo: 'Tomar la primera decisión de escala con criterio y un calendario.',
  lleva: 'Plan de escalado a 30 días y (si aplica) la primera escala ejecutada.',
  hora: [
    [0,5,'Tarea','Diagnóstico.'],
    [5,20,'Condiciones y mecánica','Escalar solo si: 3 días con CPA < BEP, sin fatiga, sin cambios recientes. Vertical: +15 % cada 3 días, 10-12 m. Horizontal: creativos nuevos al adset ganador. Duplicados: 2-3 días de aprendizaje es normal; no pausar en 48 h. Cuándo pausar: 7 días y CPA > 1,5× BEP. Zona gris: esperar o iterar.'],
    [20,45,'Simulador de escalado','6 casos: decides (escalar / esperar / iterar / pausar) y justificas.'],
    [45,55,'Decisión real','Aplicar el árbol a tu campaña. Si cumple, ejecutar la escala con P9 como plan.'],
    [55,60,'Tarea','']],
  actividad: 'Simulador de escalado + tabla de +15 % (herramientas abajo).',
  tarea: ['Plan de escalado a 30 días en el tablero (fechas de cada +15 %)', 'Registrar cada cambio con fecha'],
  recursos: ['C3','P9','S4','C6'], tools: ['sim','escalado'],
  checkpoint: 'Explicas por qué +40 % de golpe resetea el aprendizaje y qué pasa si pausas un duplicado a las 24 h.',
  profe: 'El simulador es la actividad más valiosa del módulo: decisiones sin plata en juego. Guarda los casos para reusarlos con otros estudiantes.',
  quiz: [
    { q: 'Escala máxima recomendada:', o: ['+50 % diario', '+15 % cada 3 días', 'Duplicar cada día'], a: 1, w: 'Más que eso resetea el aprendizaje del adset.' },
    { q: 'Un duplicado lleva 24 h sin ventas:', o: ['Pausarlo', 'Esperar 3 días: está aprendiendo', 'Subirle presupuesto'], a: 1, w: 'Pausarlo es tirar el gasto inicial sin recuperar el aprendizaje.' },
    { q: 'Los creativos nuevos van a:', o: ['Una campaña nueva', 'El adset ganador existente', 'Otra cuenta'], a: 1, w: 'Campañas paralelas del mismo producto compiten entre sí.' }] },

{ n: 20, mod: 6, titulo: 'Fatiga creativa y el pipeline semanal',
  objetivo: 'Detectar fatiga antes del colapso y tener un ritmo de producción que la evite.',
  lleva: 'Los 3 próximos creativos definidos + 1 hook nuevo producido + calendario semanal.',
  hora: [
    [0,5,'Tarea','Plan de escalado.'],
    [5,20,'Señales y respuesta','CPA subiendo 5+ días hacia el BEP · CTR cayendo · frecuencia > 3 · CPM subiendo sin causa externa. Respuesta: 3+ creativos nuevos al adset; no pausar el fatigado de golpe. "Funcionó 2 semanas y colapsó" = un solo ad cargaba todo.'],
    [20,35,'Pipeline semanal','Lunes datos → martes-miércoles producir 3-5 → jueves subir → registrar. Nuevos hooks del ganador, ángulos no usados, formato distinto. El breakdown por ad es para APRENDER, no para pausar.'],
    [35,55,'Práctica','Leer el breakdown; definir los 3 próximos (slot, ángulo, formato); producir un hook nuevo en vivo.'],
    [55,60,'Tarea','']],
  actividad: 'Breakdown + 3 próximos creativos + 1 hook nuevo.',
  tarea: ['Subir 3 creativos nuevos al adset (jueves, 10-12)', 'Calendario semanal (T9)'],
  recursos: ['S6','S7','T9','S3'], tools: [],
  checkpoint: 'Describes las 4 señales de fatiga en orden de gravedad; sabes por qué no se pausa el ad fatigado.',
  profe: 'Aquí se conecta con Claude: que le pida "con la matriz y el breakdown, propón los 3 siguientes creativos". Es la semilla de la skill de la clase 23.',
  quiz: [
    { q: 'Señal de fatiga creativa:', o: ['CPA subiendo 5+ días, CTR cayendo, frecuencia > 3', 'Muchas ventas seguidas', 'CPM bajando'], a: 0, w: 'En ese orden de gravedad. Cuando la frecuencia pasa de 3, la audiencia ya vio el ad demasiadas veces.' },
    { q: 'Respuesta correcta a la fatiga:', o: ['Pausar el ad fatigado ya', 'Subir 3+ creativos nuevos al adset', 'Cambiar de producto'], a: 1, w: 'El algoritmo redistribuye solo. Pausar de golpe rompe el aprendizaje.' },
    { q: '"Funcionó 2 semanas y colapsó" significa:', o: ['Un solo ad cargaba el adset y se fatigó', 'Meta bloqueó el producto', 'El pixel murió'], a: 0, w: 'Lección: nunca depender de un ad.' }] },

{ n: 21, mod: 6, titulo: 'Crisis: rechazos, restricciones, CPA disparado y productos que se caen',
  objetivo: 'No improvisar en crisis: cada escenario tiene un protocolo escrito.',
  lleva: 'Plan de contingencia.',
  hora: [
    [0,5,'Tarea','Creativos subidos.'],
    [5,20,'Escenarios','Ad rechazado: revisar claims, antes/después, landing; corregir y reenviar; apelar solo si está limpio. Cuenta restringida: apelar una vez, bien. BM baneado: fresh start por niveles; errores post-baneo; 7-14 días de CPA inflado con pixel frío. CPA disparado: checklist (pixel, landing, pasarela, stock, competencia, estacionalidad, CPM).'],
    [20,30,'Cuando "el producto se cae"','¿Es creativo (CTR), oferta (CVR), mercado (CPM y competencia CO) o cuenta (todo a la vez)? Cada uno tiene respuesta distinta.'],
    [30,50,'Simulacros','3 escenarios: dices qué haces paso a paso; el profe mete complicaciones. Redactar una apelación con P11.'],
    [50,60,'Plan de contingencia','Llenar el plan (herramienta abajo).']],
  actividad: 'Simulacros + plan de contingencia.',
  tarea: ['Plan de contingencia completo', 'Respaldos verificados: segundo BM con página y método de pago; copia de todos los creativos y del copy fuera de Meta'],
  recursos: ['T8','P11','H11','S6','S7'], tools: ['contingencia'],
  checkpoint: 'Para cada escenario dices el primer paso sin mirar el plan.',
  profe: 'Cuenta tu peor baneo y qué harías distinto. Es la clase donde más vale tu experiencia.',
  quiz: [
    { q: 'Ad rechazado por un claim que sí viola la política:', o: ['Apelar', 'Corregir y reenviar', 'Subirlo a otra cuenta'], a: 1, w: 'Apelar algo que viola la política suma marcas a la cuenta.' },
    { q: 'Cuenta restringida:', o: ['Apelar una vez, bien redactado', 'Apelar 5 veces seguidas', 'Crear 3 cuentas nuevas con los mismos datos'], a: 0, w: 'Insistir o clonar cuentas empeora el historial.' },
    { q: 'El CPA se disparó de un día a otro. Primero revisas:', o: ['Pixel, landing, checkout y stock', 'Subes el presupuesto', 'Pausas todo'], a: 0, w: 'Lo más común es algo roto, no un cambio del algoritmo.' }] },

{ n: 22, mod: 7, titulo: 'Que el producto no se caiga: ciclo de vida y portafolio',
  objetivo: 'Alargar la vida de un ganador y nunca depender de un solo producto.',
  lleva: 'Plan de "segundo aire" + calendario de portafolio + research del producto #2 iniciado.',
  hora: [
    [0,5,'Tarea','Plan de contingencia.'],
    [5,20,'Ciclo de vida','Lanzamiento → escala → meseta → declive; señales de cada fase. Cómo alargarlo: ángulos y avatares nuevos, formatos, oferta (bundles, upsell), landing nueva (otro formato), otro mercado COD, remarketing, WhatsApp post-venta y recompra. Cuándo soltarlo.'],
    [20,30,'Portafolio','Siempre: 1 escalando + 1 en prueba + 2 en research. Rutina semanal de 5 horas: lunes datos y decisiones · martes-miércoles creativos · jueves subir y research · viernes operación y caja.'],
    [30,55,'Práctica','Plan de segundo aire (3 acciones con fecha) + calendario de portafolio + arrancar gate −1 y scouting del producto #2.'],
    [55,60,'Tarea','']],
  actividad: 'Plan de segundo aire + arranque del producto #2.',
  tarea: ['Research completo del producto #2 (clases 2-3 aplicadas solo) → dossier'],
  recursos: ['T9','S1','H1'], tools: ['rutina'],
  checkpoint: 'Nombras 3 señales de que tu producto entró en meseta y 3 acciones para el segundo aire.',
  profe: 'Si el producto #1 murió antes de esta clase, la clase es un post-mortem honesto: qué eslabón falló. Es igual de valiosa.',
  quiz: [
    { q: 'Portafolio sano:', o: ['1 producto y ya', '1 escalando + 1 en prueba + 2 en research', '10 en prueba a la vez'], a: 1, w: 'Cuando el #1 entre en meseta, el #2 ya tiene datos.' },
    { q: 'Señal de meseta:', o: ['CPA sube, CPM sube, más tiendas CO anunciando', 'Más ventas cada semana', 'CTR subiendo'], a: 0, w: 'La competencia llegó y la audiencia ya vio el producto.' },
    { q: 'Segundo aire de un producto:', o: ['Bajar el precio', 'Ángulo/avatar nuevo, formato nuevo, oferta, otro mercado, remarketing', 'Cambiar el tema de Shopify'], a: 1, w: 'El producto es el mismo; cambia a quién y cómo se lo cuentas.' }] },

{ n: 23, mod: 8, titulo: 'Skills y MCPs: automatizar la producción',
  objetivo: 'Convertir tus procesos repetitivos en skills propias y conectar Claude a Shopify.',
  lleva: 'Primera skill creada y corrida + Shopify conectado.',
  hora: [
    [0,5,'Tarea','Dossier del #2 y tu lista de 5 tareas repetitivas.'],
    [5,20,'Skills','Un archivo de instrucciones reutilizables que se invoca con /nombre. Anatomía: cuándo se activa, qué entra, pasos, qué sale, reglas. Una skill = un resultado verificable. Candidatas: ficha-producto, copy-landing, matriz-9-ads, prompts-imagen, guion-video, diagnostico-campaña.'],
    [20,30,'MCPs','Un conector. Shopify Admin API: crear producto, subir plantilla, leer pedidos (credenciales en .env). Navegador para scouting. Llamar APIs de imagen/video desde un script.'],
    [30,55,'Práctica','Crear matriz-9-ads como skill a partir de P5 y correrla sobre el producto #2; conectar el MCP de Shopify y crear el producto #2 en borrador.'],
    [55,60,'Tarea','']],
  actividad: 'Primera skill + Shopify conectado.',
  tarea: ['Crear copy-landing y diagnostico-campaña como skills', 'Documentar en skills/README.md qué hace cada una y cómo se verifica'],
  recursos: ['P5','P3','P8','H10'], tools: [],
  checkpoint: 'Tu skill corre en un producto nuevo sin editarla; sabes dónde viven tus credenciales.',
  profe: 'Que las skills nazcan de los prompts que ya usó en el curso (P1-P11): así entiende que una skill es un prompt que se volvió proceso. Nada de tu flujo interno: lo suyo, desde sus archivos.',
  quiz: [
    { q: 'Una skill es:', o: ['Un plugin pago', 'Instrucciones reutilizables con entrada, pasos, salida y reglas', 'Un video tutorial'], a: 1, w: 'Un prompt que se volvió proceso y se invoca con /nombre.' },
    { q: 'Un MCP es:', o: ['Un conector a herramientas externas (Shopify, navegador)', 'Un modelo de lenguaje', 'Un formato de landing'], a: 0, w: 'Le da a Claude manos: leer pedidos, crear productos, navegar.' },
    { q: 'El output de una skill:', o: ['Se publica sin mirar', 'Siempre se revisa', 'Se borra'], a: 1, w: 'Claude propone, tú decides. Siempre.' }] },

{ n: 24, mod: 8, titulo: 'El sistema semanal automatizado + plan de 90 días', hito: 'H6',
  objetivo: 'Cerrar con un sistema que corre cada semana y un plan concreto de 90 días.',
  lleva: 'Reporte semanal corriendo con datos reales + plan de 90 días + autoevaluación.',
  hora: [
    [0,5,'Tarea','Skills.'],
    [5,25,'El sistema semanal','Lunes: CSV del Ads Manager → Claude lo cruza con el árbol de decisiones y el BEP → propone → tú decides. Martes: skill de creativos propone los 3 siguientes. Jueves: research quincenal. Viernes: tablero de operación y caja. Reglas: Claude nunca ejecuta cambios sin confirmación; nunca inventa cifras.'],
    [25,40,'Práctica','Correr el reporte semanal en vivo con tu CSV real; ajustar el prompt hasta que el output sea útil.'],
    [40,52,'Repaso y autoevaluación','Los 6 hitos: qué cumpliste, qué quedó a medias. Las 10 preguntas de cierre.'],
    [52,60,'Plan de 90 días','#1 escalado a $X/día con CPA < BEP · #2 lanzado · sistema semanal 12 semanas seguidas · 2 productos en research. Qué seguir aprendiendo.']],
  actividad: 'Reporte semanal en vivo + examen final + plan de 90 días (herramientas abajo).',
  tarea: ['Plan de 90 días completo', 'Carpeta mi-negocio/ documentada', 'Sistema semanal corriendo'],
  recursos: ['T10','P8','T9'], tools: ['plan90','examen'],
  checkpoint: 'Respondes las 10 preguntas de cierre sin mirar; tu sistema semanal produjo un reporte real en clase.',
  profe: 'Cierra con lo que él era en la clase 1 vs hoy (usa su ficha de diagnóstico). Ofrece una revisión a los 30 días.',
  quiz: [
    { q: 'Cada lunes, Claude:', o: ['Escala la campaña solo', 'Analiza el CSV y propone; tú decides', 'Crea campañas nuevas'], a: 1, w: 'La decisión con plata siempre es tuya.' },
    { q: 'Claude nunca:', o: ['Lee tus archivos', 'Ejecuta cambios en Meta sin confirmación ni inventa cifras', 'Escribe copy'], a: 1, w: 'Está escrito en CLAUDE.md por una razón.' },
    { q: 'El plan de 90 días incluye:', o: ['Solo escalar el #1', '#1 escalado, #2 lanzado, sistema semanal, 2 en research', 'Cambiar de nicho'], a: 1, w: 'Un producto es un ingreso; un sistema es un negocio.' }] },
];

/* ---------------------------------------------------------------------
   HERRAMIENTAS: datos de apoyo
   --------------------------------------------------------------------- */
const MATRIZ9 = [
  { s: 1, etapa: 'TOFU', persona: 'Sin persona', angulo: 'Dolor' },
  { s: 2, etapa: 'TOFU', persona: 'Con persona', angulo: 'Curiosidad' },
  { s: 3, etapa: 'TOFU', persona: 'Sin persona', angulo: 'Transformación' },
  { s: 4, etapa: 'MOFU', persona: 'Con persona', angulo: 'Sensorial' },
  { s: 5, etapa: 'MOFU', persona: 'Sin persona', angulo: 'Beneficios' },
  { s: 6, etapa: 'MOFU', persona: 'Con persona', angulo: 'Demostración (UGC)' },
  { s: 7, etapa: 'BOFU', persona: 'Sin persona', angulo: 'Precio / valor' },
  { s: 8, etapa: 'BOFU', persona: 'Con persona', angulo: 'Objeciones' },
  { s: 9, etapa: 'BOFU', persona: 'Sin persona', angulo: 'Urgencia honesta' },
];

const HOOKS = {
  'Dolor': ['¿Cansada de [problema]?', 'El error que el 90 % comete con [categoría].'],
  'Curiosidad': ['Esto NO es lo que parece.', 'Me dijeron que era imposible hasta que probé esto.'],
  'Transformación': ['De [estado A] a [estado B] en [tiempo].', 'Mira lo que pasa cuando…'],
  'Sensorial': ['POV: acabas de recibir tu [producto].', 'Así se siente usar [producto].'],
  'Beneficios': ['3 razones por las que [target] está obsesionada con esto.', 'Lo que hace este [producto] que ningún otro hace.'],
  'Demostración (UGC)': ['Les muestro qué trae y cómo se usa.', 'Esto es lo que dice la etiqueta, sin cuento.'],
  'Precio / valor': ['¿Caro? Hagamos la cuenta.', 'Por menos de [precio] te llevas…'],
  'Objeciones': ['Las dudas que tenía antes de pedirlo.', 'Pensé que era estafa hasta que…'],
  'Urgencia honesta': ['Stock disponible esta semana.', 'Solo quedan [N] unidades en bodega.'],
};

const CHECKLIST25 = [
  ['Técnico', ['Carga rápida (imágenes livianas, <3 s)', 'Se ve bien a 375 px', 'Botón de pedido visible sin hacer scroll', 'Formulario con solo los campos necesarios', 'Header sin links que distraigan']],
  ['Copy', ['Titular concreto en ≤6 palabras', 'Promesa clara en 5 segundos', 'Problema en lenguaje del cliente', 'Mecanismo explicado', 'Beneficios, no características', 'Oferta con ancla y ahorro visible', 'CTA cada ~1.000 px']],
  ['Confianza', ['Prueba social honesta y cifras que cuadran', 'Garantía concreta', 'Cómo llega (timeline de entrega)', 'FAQ con objeciones COD', 'Políticas y contacto en el footer', 'Sin contadores ni escasez falsa']],
  ['Legal', ['Sin claims de salud prohibidos', 'Sin profesionales inventados', 'Sin reseñas fabricadas', 'Sin antes/después engañoso']],
  ['Coherencia', ['El hero coincide con el ángulo del anuncio', 'El precio es el mismo en toda la página', 'Las imágenes muestran el producto real']],
];

const LANZAMIENTO = [
  'Campaña nombrada con producto y fecha',
  'Objetivo: ventas, evento Purchase del pixel correcto',
  'Presupuesto diario ≥ 3× BEP',
  'Audiencia amplia (Advantage+), sin 20 adsets de intereses',
  'Ubicaciones automáticas',
  '9 ads cargados con su nombre (PRODUCTO_ETAPA_ANGULO_FORMATO_v1)',
  'Copy primario con 3 variantes; título y CTA definidos',
  'URL de la landing con parámetros de seguimiento',
  'Pedido de prueba hecho HOY y Purchase visto en Test Events',
  'Operación lista: WhatsApp con respuestas rápidas, stock confirmado',
  'Publicación programada entre 10 am y 12 m',
  'Tablero diario creado',
  'Compromiso firmado: 7 días sin tocar',
];

const SIM_OPCIONES = ['Escalar +15 %', 'Esperar', 'Subir 3 creativos nuevos', 'Revisar landing / oferta', 'Revisar pixel / checkout', 'Pausar'];
const SIM_CASOS = [
  { t: 'Caso 1', d: 'BEP $40.000. CPA de los últimos 7 días: $31.000. 4 días sin cambios. CTR saliente estable en 1,8 %. Frecuencia 1,8. Presupuesto $150.000/día.', a: 0, w: 'Cumple todo: 3+ días con CPA < BEP, sin fatiga, sin cambios recientes. Escalar a $172.500 entre 10 am y 12 m.' },
  { t: 'Caso 2', d: 'BEP $40.000. CPA 7 días: $44.000 y subiendo cada día desde hace 5. CTR saliente bajó de 1,6 % a 1,1 %. Frecuencia 3,2. Sin cambios en 8 días.', a: 2, w: 'Fatiga creativa de manual: CPA subiendo, CTR cayendo, frecuencia > 3. Subir 3+ creativos nuevos al adset; no pausar el fatigado.' },
  { t: 'Caso 3', d: 'BEP $40.000. Campaña lanzada hace 2 días. CPA $95.000. 30 LPV. 1 compra.', a: 1, w: 'No hay muestra: ni 50 LPV ni 7 días. Con 1 compra el CPA no significa nada. Esperar.' },
  { t: 'Caso 4', d: 'BEP $40.000. CPA 7 días: $68.000 durante 6 días seguidos. 400 LPV. CTR saliente 2,1 %. CVR 0,6 %. Sin cambios en 9 días.', a: 3, w: 'CTR alto + CPA alto con muestra suficiente = el problema está después del clic. Revisar landing y oferta antes de pausar.' },
  { t: 'Caso 5', d: 'Duplicaste el adset ganador hace 36 horas. El duplicado gastó 2× BEP y lleva 0 ventas. El original sigue con CPA $30.000.', a: 1, w: 'Un duplicado pasa 2-3 días calibrando. Pausarlo a las 36 h es tirar el gasto inicial. Evaluar al tercer día completo.' },
  { t: 'Caso 6', d: 'BEP $40.000. En 3 días gastaste $360.000. 120 LPV. 0 añadir al carrito. 0 compras. CTR saliente 1,9 %.', a: 4, w: '"Gasta y 0 ventas" con clics normales y cero carritos = algo roto: pixel, formulario o checkout. Hacer un pedido de prueba antes de tocar la campaña.' },
];

/* ---------------------------------------------------------------------
   S7 · ANUNCIOS QUE META RECHAZA (y cómo decirlo para que pase) — #/kit/rechazos
   --------------------------------------------------------------------- */
const RECHAZOS = {
  intro: 'Meta revisa cada anuncio con un sistema automático que mira el video, la imagen, el texto y la landing buscando los patrones de abajo. Si los conoces, escribes el mismo mensaje de una forma que pasa a la primera. Un rechazo suelto no marca la cuenta; varios seguidos empiezan a pesar. Por eso conviene corregir y reenviar antes que apelar.',
  general: [
    ['Hablarle a la persona por su condición: "¿Tienes gastritis?", "¿Sufres de dolor de rodilla?"', 'Atributos personales: el anuncio afirma algo sobre quien lo ve', 'Habla del problema en tercera persona: "La gastritis no avisa", "Para las rodillas que se quejan al subir escaleras"'],
    ['Antes y después: dos fotos lado a lado, el "antes" tachado', 'Resultados exagerados sobre salud o apariencia', 'Muestra el producto en uso y el resultado en el objeto, no en el cuerpo: la ropa doblada, el piso limpio, la mesa servida'],
    ['Resultado con cifra y plazo: "pierde 8 kg en 2 semanas", "se va el dolor en 3 días"', 'Resultado no realista', 'Promesa concreta y sostenible: "úsalo 10 minutos al día", "lo sientes desde la primera semana", sin cifras de resultado'],
    ['"Cura", "elimina", "sana", "reemplaza al médico", "aprobado por médicos"', 'Afirmación médica sin respaldo', 'Alivio, apoyo, rutina y sensación: "ayuda a que la digestión sea más tranquila"'],
    ['Zoom a partes del cuerpo: abdomen, glúteos, piel muy de cerca', 'Contenido adulto o cuerpo como foco', 'Plano medio, ropa normal, la persona haciendo algo con el producto'],
    ['Escasez inventada: "quedan 3 unidades", contadores que se reinician', 'Engaño al comprador', 'Urgencia real: "envío gratis esta semana", "el combo de 2 termina el domingo" (y que sea cierto)'],
    ['Logos, marcas o famosos ajenos: "como en Shark Tank", "el viral de TikTok"', 'Propiedad de otros o respaldo que no existe', 'Tu marca, tu nombre, tu gente'],
    ['El anuncio promete una cosa y la landing muestra otra: precio distinto, producto distinto, botón que no funciona', 'Landing engañosa o rota', 'Mismo producto, mismo precio y mismo nombre en el anuncio y en la página; prueba el botón antes de subirlo'],
    ['MAYÚSCULAS GRITADAS, "!!!", palabras deformadas para esquivar el filtro (g4stritis)', 'Baja calidad o intento de evadir la revisión', 'Texto limpio y normal: el sistema lee peor lo raro y lo marca'],
    ['Comentarios de "clientes" como prueba de resultado: "a mí me quitó el dolor"', 'Testimonio usado como afirmación de salud', 'UGC = demostración: la persona muestra el producto, cómo se usa y qué se siente al usarlo'],
  ],
  categorias: [
    { n: 'Salud y suplementos', items: [
      ['Nombrar la enfermedad como algo que el producto resuelve ("para la gastritis y las úlceras")', 'Nombra la situación y el ingrediente: "con jengibre y cúrcuma para después de comer"'],
      ['Comparar con medicamentos ("mejor que el omeprazol")', 'Describe lo que hace tu producto sin nombrar fármacos'],
      ['"Tratamiento", "dosis", "receta"', '"Cápsulas", "rutina diaria", "un frasco = 30 días"'],
      ['Suplementos y productos de peso mostrados a menores', 'Audiencia solo mayores de 18'],
    ]},
    { n: 'Belleza y piel', items: [
      ['"Borra arrugas", "quita manchas en 7 días", acné muy de cerca', '"Piel más suave", "rutina de noche en 2 pasos", plano medio con la persona aplicándolo'],
      ['Antes y después de la piel', 'La textura del producto, el gesto de aplicarlo, el frasco'],
    ]},
    { n: 'Peso y figura', items: [
      ['Cinta métrica, báscula, "quema grasa", cuerpo de "antes"', 'La rutina (10 minutos al día), el producto en uso, la ropa que vuelve a cerrar'],
      ['Fajas: "pierde tallas", "adelgaza"', 'La prenda puesta y cómo se siente; sin promesas de talla'],
    ]},
    { n: 'Hogar y gadgets', items: [
      ['"Reemplaza a tu electricista", "nunca más pagues X"', '"Lo instalas tú en 5 minutos"'],
      ['Demos editadas donde el producto parece hacer algo que no hace', 'Demo real, con las manos en cámara'],
      ['"El más vendido de Colombia" sin fuente', '"Más de 400 pedidos entregados", si es tu cifra real'],
    ]},
    { n: 'Ropa, fajas y ortopedia', items: [
      ['Corregir la postura o "curar" la espalda', '"Te recuerda enderezarte", "soporte para las horas de oficina"'],
      ['Modelos en ropa interior con zoom', 'Prenda puesta sobre ropa normal, plano medio'],
    ]},
    { n: 'Mascotas', items: [
      ['"Cura la artritis de tu perro", "reemplaza al veterinario"', '"Apoyo para articulaciones de perros mayores", "pregúntale a tu veterinario"'],
    ]},
  ],
  cierre: [
    'Lee el motivo en el Ads Manager: casi siempre es una de las filas de arriba.',
    'Corrige (texto, imagen o landing) y vuelve a enviar. Suele pasar en horas.',
    'Apela solo si el anuncio ya está limpio y el motivo no aplica. Apelar algo que sí rompe la regla suma una marca más.',
    'Guarda la versión aprobada en tu swipe: es tu propio patrón que pasa.',
  ],
};

/* ---------------------------------------------------------------------
   S6 · FATIGA CREATIVA: señales y qué hacer — #/kit/fatiga
   --------------------------------------------------------------------- */
const FATIGA = {
  intro: 'Un anuncio se gasta. La misma gente lo ve tres, cuatro veces, deja de reaccionar y Meta empieza a cobrarte más por mostrarlo. No es que el producto dejó de funcionar: es que el anuncio dejó de ser nuevo. Se ve venir con días de anticipación si miras el tablero.',
  senales: [
    ['CTR saliente bajando 5 días seguidos', 'La primera pista. El hook ya no para el scroll.'],
    ['CPA diario subiendo poco a poco hacia el BEP', 'Confirmación. Sigue vendiendo, pero cada venta cuesta más.'],
    ['Frecuencia por encima de 3', 'La audiencia ya lo vio demasiadas veces. Entre 2 y 3 ya toca empezar a rotar.'],
    ['CPM subiendo sin causa externa', 'No es temporada ni un competidor nuevo: Meta le está bajando el alcance.'],
    ['Comentarios negativos o gente ocultando el anuncio', 'Urgente. El anuncio ya molesta.'],
  ],
  hacer: [
    'Sube 3 o más creativos nuevos al mismo grupo de anuncios, entre 10 am y 12 m. El algoritmo reparte solo.',
    'De dónde salen: nuevos hooks del ganador (mismo desarrollo, otros primeros 3 segundos), ángulos de la matriz que no has usado, otro formato (si el ganador es video, prueba un estático; si es con persona, prueba sin persona).',
    'Deja el anuncio fatigado corriendo. Se apaga solo cuando los nuevos lo superan.',
    'Anota la fecha: los 3 días para la próxima escala cuentan desde ese cambio.',
  ],
  acelera: [
    'Pausar el anuncio fatigado de golpe: reinicia el aprendizaje del grupo.',
    'Crear una campaña nueva para los creativos nuevos: fragmenta la señal del pixel.',
    'Subir el presupuesto "porque vendía bien": le mete más plata a un anuncio que ya se está gastando.',
  ],
  colapso: 'Casi siempre es esto: un solo anuncio cargaba todo el grupo y se fatigó. Con 9 anuncios distintos desde el día 1, cuando uno se gasta otro toma el relevo. Por eso la matriz de 9 no es opcional.',
  ritmo: [
    ['Lunes', 'Datos del tablero; decidir qué slot de la matriz se renueva.'],
    ['Martes y miércoles', 'Producir 3-5 creativos.'],
    ['Jueves, 10-12', 'Subirlos al grupo que ya corre. Anotar.'],
    ['Siempre', 'El desglose por anuncio es para aprender qué hook ganó, no para pausar.'],
  ],
  chequeo: ['¿CTR de esta semana menor que el de la anterior?', '¿CPA subió 3 días seguidos?', '¿Frecuencia mayor que 2,5?', '¿CPM subió sin explicación?'],
  chequeoCierre: 'Dos síes = esta semana entran creativos nuevos.',
};

/* ---------------------------------------------------------------------
   T9 · RUTINA SEMANAL DEL DUEÑO (5 horas) — #/herramientas/rutina
   --------------------------------------------------------------------- */
const RUTINA = [
  { dia: 'Lunes', foco: 'Datos y decisión', items: ['Cerrar los 7 días en el tablero diario', 'CPA 7 d vs BEP: escalar, esperar, iterar o pausar', 'Pegar el registro a Claude (P8) y comparar el diagnóstico', 'Anotar la decisión con fecha'] },
  { dia: 'Martes', foco: 'Creativos: qué', items: ['Elegir los 3 slots de la matriz que se renuevan', 'Escribir 3 hooks nuevos del ganador', 'Generar escenas o imágenes'] },
  { dia: 'Miércoles', foco: 'Creativos: terminar', items: ['Terminar y nombrar los 3-5 creativos (nomenclatura)', 'Revisar la landing: test de 10 segundos y pedido de prueba', 'Guardar los creativos fuera de Meta'] },
  { dia: 'Jueves', foco: 'Subir y buscar', items: ['Subir los creativos al grupo que ya corre (10 am-12 m)', 'Registrar el cambio en el tablero', 'Producto #2: 30 minutos de gate −1 y scouting'] },
  { dia: 'Viernes', foco: 'Operación y caja', items: ['Tablero COD: pedidos, confirmados, entregados, devueltos', 'Novedades y devoluciones con la transportadora', 'Caja: cuánto entró, cuánto está atrapado, pago al proveedor', 'Swipe file: 3 referencias nuevas'] },
];

/* ---------------------------------------------------------------------
   FICHAS (formulario + copiar en markdown) — T2 producto, T1 diagnóstico
   Campo: [clave, etiqueta, tipo ('text' | 'ta' | 'sel'), opciones?]
   --------------------------------------------------------------------- */
const FICHA_PRODUCTO = [
  { s: 'Producto', f: [
    ['nombre', 'Nombre comercial', 'text'],
    ['que', 'Qué es, en una frase', 'text'],
    ['proveedor', 'Proveedor y costo (con el envío hasta ti)', 'text'],
    ['ancla', 'Precio ancla (Mercado Libre × 1,3-1,5)', 'text'],
    ['precio', 'Precio de venta de 1 unidad', 'text'],
    ['bundles', 'Bundles 2 y 3 (precio de cada uno)', 'text'],
  ]},
  { s: 'Cliente', f: [
    ['quien', 'Quién compra y para quién', 'ta'],
    ['momento', 'Momento del dolor: cuándo lo busca', 'ta'],
    ['intento', 'Qué ya intentó y por qué no le sirvió', 'ta'],
    ['miedo', 'Qué le da miedo al comprar', 'ta'],
    ['frases', '5 frases textuales del cliente (comentarios, reseñas, hilos)', 'ta'],
  ]},
  { s: 'Mecanismo y promesa', f: [
    ['mecanismo', 'Por qué funciona, en una frase', 'ta'],
    ['promesa', 'Promesa concreta: resultado y cómo, sin cifras de resultado', 'ta'],
    ['angulo', 'Ángulo abierto: qué dice la competencia en Colombia y qué vas a decir tú', 'ta'],
    ['riesgo', 'Palabras de tu categoría que Meta rechaza (mira el kit)', 'text'],
  ]},
  { s: 'Oferta', f: [
    ['garantia', 'Garantía que sí puedes cumplir', 'text'],
    ['bono', 'Bono digital', 'text'],
    ['envio', 'Envío y pago (gratis, contra entrega)', 'text'],
  ]},
  { s: 'Marca', f: [
    ['marca', 'Nombre + un color + una tipografía', 'text'],
  ]},
];
const FICHA_DIAG = [
  { s: 'Lo que has hecho', f: [
    ['vendido', 'Qué has vendido o intentado vender: producto, cuánto tiempo, qué pasó', 'ta'],
    ['inversion', 'Cuánto has invertido en Meta Ads en total', 'text'],
    ['mejor', 'Tu mejor resultado hasta hoy', 'ta'],
    ['peor', 'Tu peor pérdida y por qué crees que pasó', 'ta'],
  ]},
  { s: 'Lo que tienes', f: [
    ['montado', 'Qué tienes montado hoy (tienda, pixel, Dropi, WhatsApp, IA)', 'ta'],
    ['horas', 'Horas por semana para el negocio', 'text'],
    ['bep', 'BEP de tu último producto (de la calculadora)', 'text'],
  ]},
  { s: 'Dónde estás', f: [
    ['eslabon', 'Dónde sientes que se te cae', 'sel', ['Producto', 'Oferta', 'Landing', 'Creativos', 'Tráfico', 'Operación', 'No sé']],
    ['nichos', '3 nichos que te interesan', 'ta'],
    ['meta', 'Qué quieres lograr con el curso, en una frase', 'ta'],
  ]},
];

const GLOSARIO = [
  ['BEP', 'Break-even point: el CPA máximo que puedes pagar sin perder plata. Precio − costo − envío − comisión.'],
  ['BEP efectivo', 'El BEP descontando devoluciones: tasa de entrega × BEP − (1 − tasa) × costo de devolución.'],
  ['CPA', 'Costo por adquisición: gasto ÷ compras.'],
  ['CPM', 'Costo por mil impresiones. Sube con competencia, audiencia saturada o pixel sin señal.'],
  ['CTR saliente', 'Clics que salen hacia tu landing ÷ impresiones. No confundir con "todos los clics".'],
  ['CPC', 'Costo por clic.'],
  ['CVR', 'Tasa de conversión: compras ÷ LPV. Objetivo COD 2-4 %.'],
  ['LPV', 'Landing page views: personas que cargaron la landing.'],
  ['ATC', 'Add to cart / pedido iniciado.'],
  ['ROAS', 'Retorno sobre inversión publicitaria: ingresos ÷ gasto.'],
  ['AOV', 'Ticket promedio por pedido. Los bundles lo suben.'],
  ['Frecuencia', 'Veces que la misma persona vio tu ad. > 3 es señal de fatiga.'],
  ['Hook rate', 'Personas que vieron 3 s ÷ impresiones. Mide el gancho del video.'],
  ['Hold rate', 'Personas que vieron 15 s ÷ las que vieron 3 s. Mide si el desarrollo retiene.'],
  ['EMQ', 'Event match quality: qué tan bien Meta identifica a quien compró. Sube con CAPI.'],
  ['CAPI', 'Conversions API: el servidor envía los eventos, no solo el navegador.'],
  ['ASC / Advantage+', 'Campaña de ventas con audiencia amplia que el motor decide.'],
  ['CBO / ABO', 'Presupuesto a nivel campaña o a nivel adset. Con 1 adset da igual.'],
  ['TOFU / MOFU / BOFU', 'Frío (descubrir) / consideración / cierre.'],
  ['Andromeda', 'Motor de targeting de Meta: el creativo es la señal principal.'],
  ['COD', 'Contra entrega: el cliente paga al recibir.'],
  ['Fresh start', 'Volver a empezar con cuenta/BM nuevos tras un baneo.'],
];

const EXAMEN = [
  { q: '¿Cómo se mide la saturación de un producto en Colombia?', o: ['Listings en Mercado Libre', 'Tiendas Shopify CO anunciando en Ads Library (matriz de 7 keywords)', 'Videos en TikTok'], a: 1 },
  { q: 'Presupuesto inicial y BEP:', o: ['1× BEP, luego se sube', '3× BEP para que el adset consiga señal', 'Lo que haya'], a: 1 },
  { q: 'En una landing "estructural" el peso del argumento lo carga:', o: ['La demo en movimiento', 'Un artículo de noticia', 'Una tabla de tallas'], a: 0 },
  { q: 'El hero tipo Amazon lleva:', o: ['Foto bonita sin texto', 'Titular grande + producto ≥40 % + beneficio', 'Un video largo'], a: 1 },
  { q: 'Evaluar por CPA conjunto del adset significa:', o: ['Pausar los ads caros', 'Mirar el CPA de los 9 juntos, nunca uno por uno', 'Mirar solo el mejor ad'], a: 1 },
  { q: 'UGC-demostración vs testimonio:', o: ['Son lo mismo', 'La demostración muestra el producto sin afirmar resultados; es legal y convierte', 'El testimonio siempre es mejor'], a: 1 },
  { q: 'Señales de fatiga y respuesta:', o: ['CTR sube → escalar', 'CPA subiendo 5+ días, CTR cayendo, frecuencia > 3 → 3+ creativos nuevos al adset', 'CPM baja → pausar'], a: 1 },
  { q: 'Escalar:', o: ['+15 % cada 3 días entre 10 am y 12 m', '+50 % cuando haya ventas', 'Duplicar la campaña'], a: 0 },
  { q: 'CPA disparado de un día a otro. Los primeros chequeos:', o: ['Pausar todo', 'Pixel, landing, checkout, stock, competencia, estacionalidad', 'Cambiar de producto'], a: 1 },
  { q: 'Qué hace Claude cada lunes y qué nunca hace solo:', o: ['Escala solo', 'Analiza el CSV y propone; nunca ejecuta cambios sin tu confirmación', 'Crea campañas'], a: 1 },
];

const TIPS_PROFE = [
  'Un concepto, una práctica sobre su producto, un entregable. Si una clase no deja algo en su carpeta, no hubo clase.',
  'Los primeros 5 minutos son suyos. Él muestra la tarea. Tú no arrancas explicando.',
  '60 % de la hora es él haciendo. Si te descubres hablando 40 minutos seguidos, para y pásale el control.',
  'Enseña decisiones, no herramientas. Las herramientas cambian cada 3 meses; el árbol de decisión no.',
  'Teach-back de 2 minutos al final: "explícame lo de hoy como si yo fuera tu socio".',
  'Graba todas las clases y comparte el link. Él anota 3 cosas por clase.',
  'Historias reales anonimizadas en cada módulo: el producto que se te quemó, el adset donde el ad caro alimentaba al ganador, tu peor baneo, tu tasa de entrega real.',
  'Prepara casos de estudio con capturas para las clases 18, 19 y 20.',
  'Plan B por clase: si la herramienta falla, qué se hace. Tenlo escrito.',
  'Canal de dudas con regla: 1 pregunta = 1 captura + qué ya intentó. Ningún cambio en Meta sin avisarte primero (clases 16-21).',
  'Alcance por escrito: 24 clases de 60 min, tareas, horario del canal de dudas, cancelación con 24 h.',
  'Costos claros desde el día 1: herramientas + presupuesto de prueba.',
  'No le pases tu flujo interno. Que construya el suyo desde sus archivos.',
  'Al final de cada clase, 30 segundos: ¿qué sobró? ¿qué faltó? Ajusta para el siguiente estudiante.',
  'Ofrece seguimiento a 30 días después de la clase 24.',
];

const CALENDARIO = [
  ['Semana 1', '1, 2, 3', '3 clases por semana'],
  ['Semana 2', '4, 5, 6', 'H1 producto elegido'],
  ['Semana 3', '7, 8, 9', 'H2 landing publicada · la muestra ya debería haber llegado'],
  ['Semana 4', '10, 11, 12', ''],
  ['Semana 5', '13, 14, 15', 'H3 set de 9 · el profe revisa los creativos antes de la 16'],
  ['Semana 6', '16 (lunes), 17 (jueves)', 'H4 campaña al aire · la 17 no toca la campaña'],
  ['Semana 7', '18, 19', '2 por semana desde aquí · la 18 cae ≥7 días después del lanzamiento'],
  ['Semana 8', '20, 21', 'Las escalas van cada 3 días'],
  ['Semana 9', '22, 23', ''],
  ['Semana 10', '24', 'H6 sistema automatizado'],
];

/* ---------------------------------------------------------------------
   PROMPTS GUÍA (P1-P12). Campos {{ }} se reemplazan con lo del estudiante.
   --------------------------------------------------------------------- */
const PROMPTS = [
{ id: 'P1', t: 'Ficha de producto (brief)', clase: 4, txt:
`Actúa como estratega de ofertas para dropshipping contra entrega en Colombia. Voy a darte información cruda de un producto y quiero que armes la FICHA DE PRODUCTO que va a alimentar mi landing, mis creativos y mis anuncios.

PRODUCTO: {{nombre genérico y qué es}}
PARA QUÉ SIRVE / QUÉ PROBLEMA RESUELVE: {{en tus palabras}}
COSTO EN PROVEEDOR: {{$}} · ENVÍO: {{$}} · COMISIÓN COD/PASARELA: {{%}}
PRECIO PROMEDIO EN MERCADO LIBRE CO: {{$}}
QUIÉN LO COMPRA (lo que sé hasta ahora): {{…}}
FRASES TEXTUALES DE CLIENTES (comentarios, reseñas, hilos):
{{pega 10-20 frases tal cual, sin corregir}}
ÁNGULOS QUE YA USA LA COMPETENCIA EN COLOMBIA: {{lo que viste en Ads Library}}
CATEGORÍA (salud / belleza / hogar / mascotas / otro): {{…}}

Entrega la ficha con EXACTAMENTE estas secciones:
1. Nombre comercial propuesto (3 opciones, cortas, pronunciables en Colombia)
2. Avatar: quién compra, para quién, en qué momento del dolor, qué ya intentó, qué le da miedo (usa las frases textuales, no inventes)
3. Dolor principal en una frase (en lenguaje del cliente)
4. Mecanismo: por qué funciona, en una frase que un niño entienda
5. Promesa: resultado concreto SIN claims que Meta o la SIC sancionen (nada de "cura", "elimina", "garantizado", "milagroso", antes/después médico)
6. Tres ángulos de venta, marcando cuál es el ángulo ABIERTO (el que la competencia CO no usa)
7. Oferta: precio ancla (ML × 1,3-1,5), bundles 1 / 2 / 3 con precio y ahorro visible, garantía que sí se puede cumplir, bono digital sugerido
8. BEP por bundle = precio − costo − envío − comisión (muestra la cuenta)
9. Seis objeciones COD y su respuesta corta
10. Riesgos: legal (Ley 1480 / SIC, INVIMA si aplica), políticas de Meta, logística (peso, fragilidad)

Reglas: español colombiano neutro, sin adjetivos vacíos, todo lo que afirmes sobre resultados debe poder sostenerse. Si te falta un dato, pregúntamelo antes de inventarlo.` },

{ id: 'P2', t: 'Avatar y banco de frases → ángulos', clase: 4, txt:
`Te paso comentarios y reseñas reales de personas que hablan de {{producto o problema}}. Quiero entender cómo hablan del problema para escribir en SU lenguaje.

FRASES:
{{pega 20-50 frases tal cual}}

Haz esto:
1. Agrupa las frases por tema (dolor, intento fallido, deseo, miedo, objeción). Cita la frase textual en cada grupo.
2. Saca las 10 palabras o expresiones que más se repiten (las voy a usar en titulares y hooks).
3. Describe 2 avatares distintos que aparecen en las frases (quién es, momento del dolor, qué ya intentó).
4. Propón 5 ángulos de venta, cada uno anclado en una frase textual. Marca cuáles ya usa la competencia ({{ángulos vistos en Ads Library CO}}) y cuál queda ABIERTO.
5. Escribe 5 hooks de 1 línea usando las expresiones del punto 2.

No inventes frases: si algo no está en el material, dilo.` },

{ id: 'P3', t: 'Copy de landing por secciones', clase: 6, txt:
`Actúa como copywriter de respuesta directa para landings contra entrega en Colombia. Escribe el copy de mi landing sección por sección a partir de mi ficha.

FICHA DE PRODUCTO:
{{pega la ficha completa (P1)}}

FORMATO DE LANDING: {{imagen / noticia / html / estructural}}
SECCIONES EN ORDEN (mi wireframe): {{lista}}

Para cada sección entrega:
- Titular (máx. 6 palabras)
- Texto (corto: la gente lee en el celular)
- Si aplica: viñetas con beneficio (no característica), cada una responde "¿y eso qué me da?"
- CTA (texto del botón: "PAGAR EN CASA" o "Pedir contra entrega")

Reglas:
- Una idea por sección.
- Mete al menos una frase textual de cliente por sección (de la ficha), entre comillas.
- Prueba social honesta: si no hay reseñas, escribe "primeros clientes" y no inventes cifras.
- Sin claims prohibidos (cura, elimina, garantizado, médicos, antes/después clínico).
- Timeline de entrega: "Pides hoy → lo confirmamos por WhatsApp → llega en 2-5 días hábiles → pagas al recibir".
- FAQ con las 6 objeciones COD respondidas en 1-2 líneas cada una.
- Al final, 3 versiones alternativas del titular del hero para elegir.

Entrega en Markdown, con el nombre de cada sección como encabezado.` },

{ id: 'P4', t: 'Auditoría de landing (checklist de 25)', clase: 9, txt:
`Eres auditor de landings contra entrega. Te paso el texto completo de mi landing (o su URL) y quiero una auditoría con puntaje.

LANDING: {{URL o texto pegado}}
PRODUCTO: {{una línea}}
AVATAR: {{una línea}}

Evalúa 25 puntos, 1 punto cada uno, y di SÍ/NO con una razón de una línea:

Técnico (5): carga rápida · se ve bien a 375 px · botón de pedido visible sin scroll · formulario con solo los campos necesarios · header sin links que distraigan.
Copy (7): titular concreto en ≤6 palabras · promesa clara en 5 segundos · problema en lenguaje del cliente · mecanismo explicado · beneficios (no características) · oferta con ancla y ahorro visible · CTA cada ~1.000 px.
Confianza (6): prueba social honesta y cifras que cuadran · garantía concreta · cómo llega (timeline) · FAQ con objeciones COD · políticas y contacto en el footer · sin contadores ni escasez falsa.
Legal (4): sin claims de salud prohibidos · sin profesionales inventados · sin reseñas fabricadas · sin "antes/después" engañoso.
Coherencia (3): el hero coincide con el ángulo del anuncio · el precio es el mismo en toda la página · las imágenes muestran el producto real.

Termina con: puntaje /25, los 5 fallos más graves en orden, y qué probaría primero (hero, oferta o prueba social) y por qué.` },

{ id: 'P5', t: 'Matriz de 9 ads con hooks', clase: 10, txt:
`Actúa como estratega creativo para Meta Ads. Con mi ficha de producto, arma la MATRIZ DE 9 ANUNCIOS para un adset: 3 TOFU + 3 MOFU + 3 BOFU.

FICHA: {{pega la ficha (P1)}}
FRASES DEL CLIENTE MÁS REPETIDAS: {{del P2}}
ÁNGULO ABIERTO: {{…}}

Distribución fija:
1 TOFU · sin persona · dolor
2 TOFU · con persona · curiosidad
3 TOFU · sin persona · transformación
4 MOFU · con persona · sensorial
5 MOFU · sin persona · beneficios
6 MOFU · con persona · demostración (UGC que muestra el producto; NO testimonio de resultados)
7 BOFU · sin persona · precio/valor
8 BOFU · con persona · objeciones
9 BOFU · sin persona · urgencia honesta (sin escasez inventada)

Para cada slot entrega:
- Hook (primeros 3 segundos: texto exacto en pantalla + qué se ve)
- Desarrollo (2-3 líneas)
- Prueba o demo (qué se muestra)
- CTA
- Formato sugerido (video 9:16 / imagen estática / carrusel)
- Nombre de archivo: {{PRODUCTO}}_{{ETAPA}}_{{ANGULO}}_{{FORMATO}}_v1

Reglas: hooks en lenguaje del cliente (usa las frases); nada que tumbe la cuenta; cada ad debe entenderse sin sonido. Si es salud, incluye la línea "Suplemento dietario, no medicamento" (o la que aplique) en el texto en pantalla del slot 6.` },

{ id: 'P6', t: 'Prompt de imagen (hero Amazon / infografía / ad)', clase: 7, txt:
`Voy a generar una imagen con IA usando MI FOTO REAL DEL PRODUCTO como referencia. Escríbeme el prompt (en inglés) para este tipo de imagen:

TIPO: {{hero-amazon-1 (gancho con persona + titular) / hero-amazon-2 ("ayuda con" en cajas con icono) / hero-amazon-3 (cifras alrededor del producto) / hero-amazon-4 (ingredientes o partes con flechas) / hero-amazon-5 (cómo se usa, con la mano) / hero-amazon-6 (producto en escena + oferta) / hero-amazon-7 (sellos + persona) / infografía de landing / ad estático: falso-play / selector / comparativa / antes-después honesto}}
PRODUCTO: {{qué es, forma, color del envase, qué dice la etiqueta grande}}
TEXTO QUE DEBE APARECER EN LA IMAGEN (corto, máx. 6 palabras por bloque): "{{…}}"
COLOR DE FONDO / MARCA: {{hex o nombre}}
RELACIÓN DE ASPECTO: {{1:1 / 4:5 / 9:16 / 768x1376}}
ESCENA (si aplica): {{mesa de cocina, baño, persona de 40 años sonriendo…}}

El prompt debe:
1. Empezar describiendo la escena y la luz.
2. Decir literalmente: "EXACTLY the product from the reference image, label facing the camera, integrated into the scene with matching light and shadow" (no recortado ni pegado).
3. Poner el producto ocupando al menos 40 % del alto.
4. Escribir el texto entre comillas y decir tipografía (bold sans-serif), tamaño (large) y posición.
5. Terminar con el estilo (clean e-commerce photography, high resolution) y lo que NO quiero (no extra text, no watermark, no distorted label).

Dame el prompt listo para pegar y una lista de 3 cosas que debo revisar en el resultado (etiqueta legible, sombra coherente, texto exacto).` },

{ id: 'P7', t: 'Guion UGC-demostración → escenas → prompts de video', clase: 12, txt:
`Actúa como director de videos cortos para Meta Ads. Quiero un video de 15-25 segundos, formato 9:16, para el slot {{n}} de mi matriz (etapa {{TOFU/MOFU/BOFU}}, ángulo {{…}}).

FICHA: {{pega la ficha (P1)}}
HOOK ELEGIDO: {{del P5}}
TIPO: {{UGC-demostración (una persona muestra el producto, lee la etiqueta, cuenta cómo se usa y el precio; NUNCA afirma resultados personales ni cura nada) / demo sin persona / problema-solución}}
SI ES SALUD, LÍNEA LEGAL EN PANTALLA: "{{Suplemento dietario, no medicamento}}"

Entrega:
1. GUION con tiempos: [0-3 s] hook · [3-10 s] desarrollo · [10-20 s] prueba/demostración · [20-25 s] CTA. Voz en off palabra por palabra y texto en pantalla.
2. LISTA DE ESCENAS: 5-6 escenas de 3-5 segundos. Cada una = UNA sola acción, con qué se ve, ángulo de cámara y si aparece el producto.
3. PROMPT DE VIDEO por escena (en inglés), que:
   - describa una sola acción,
   - diga "the product from the reference image" cuando aparezca el producto,
   - mantenga la misma descripción de la persona en todas las escenas (edad, ropa, cabello, lugar),
   - no pida texto dentro del video (el texto lo pongo en edición),
   - termine con estilo (handheld smartphone look, natural light, vertical 9:16).
4. QUÉ GRABO YO con el celular en vez de generarlo (b-roll de la muestra real: destapar, mostrar la etiqueta, usarlo).
5. Checklist de edición: subtítulos grandes, CTA en pantalla, línea legal, sonido.

Regla: cero afirmaciones de resultado ("a mí me funcionó", "cura", "elimina"). Demostrar, no prometer.` },

{ id: 'P8', t: 'Diagnóstico de campaña', clase: 18, txt:
`Actúa como media buyer senior. Te paso los datos de mi adset y quiero un diagnóstico con el árbol de decisión, no opiniones.

PRODUCTO: {{…}} · BEP (CPA máximo): {{$}} · Presupuesto diario: {{$}} · Días sin cambios: {{n}}
DATOS DE LOS ÚLTIMOS 7 DÍAS (del adset completo):
Gasto {{$}} · Impresiones {{n}} · Clics salientes {{n}} · LPV {{n}} · Añadir al carrito {{n}} · Compras {{n}} · Frecuencia {{n}}
(Opcional) Tabla por ad: {{pega el export CSV}}
(Opcional) Datos de los 7 días anteriores: {{…}}

Sigue este orden y muéstrame cada paso:
1. ¿Hay muestra? (≥1.000 impresiones para CTR, ≥50 LPV para CVR, ≥7 días para CPA). Si no, di "esperar" y para.
2. Calcula CTR saliente, CPM, CPC, CVR (LPV→compra), CPA y compáralo con el BEP (≤BEP rentable · BEP-1,5× zona gris · >1,5× problema).
3. Ubica el caso en la tabla: CTR alto + CPA alto = landing/oferta · CTR bajo + CPM alto = creativo frío o pixel sin señal · CTR bajo + CPM bajo = creativo malo · CTR alto + CVR alto + CPA alto = oferta mal calculada · ventas erráticas = presupuesto < 3× BEP · gasto sin ventas = pixel/landing/checkout.
4. Busca señales de fatiga: CPA subiendo 5+ días, CTR cayendo, frecuencia > 3, CPM subiendo.
5. Si hay tabla por ad: dime qué ÁNGULOS ganan para aprender, pero evalúa el adset completo; NO me recomiendes pausar ads individuales.
6. Recomienda UNA acción: escalar +15 % / esperar / subir 3 creativos nuevos / revisar landing / revisar pixel / pausar. Con la razón y cuándo (entre 10 am y 12 m).

Reglas: no inventes números; si falta un dato, pídelo. Nunca ejecutes nada: yo decido.` },

{ id: 'P9', t: 'Plan de escalado', clase: 19, txt:
`Mi adset cumple las condiciones para escalar (3 días con CPA < BEP, sin fatiga, sin cambios recientes). Arma el plan de escalado a 30 días.

Presupuesto actual: {{$}}/día · BEP: {{$}} · CPA actual (7 días): {{$}} · Fecha del último cambio: {{fecha}}
Creativos en el adset: {{n}} · Fecha del último creativo subido: {{fecha}}

Entrega una tabla día a día con:
- Fecha · presupuesto (+15 % máximo cada 3 días, redondeado) · acción (escalar / esperar / revisar) · qué revisar ese día · criterio para NO escalar ese día
- Cada 7 días: "subir 3 creativos nuevos al adset" como tarea programada
- Regla de freno: si CPA > BEP dos días seguidos, se congela el presupuesto; si CPA > 1,5× BEP por 5 días con muestra, se evalúa iterar creativos o pausar
- Recordatorio: todos los cambios entre 10 am y 12 m hora Colombia; nunca crear una campaña nueva para el mismo producto

Al final, calcula el presupuesto en el día 30 si todo se cumple y el gasto acumulado del mes.` },

{ id: 'P10', t: 'Guion de confirmación por WhatsApp', clase: 15, txt:
`Escribe los mensajes de WhatsApp Business para confirmar pedidos contra entrega en Colombia. Producto: {{…}} · Precio: {{$}} · Envío: {{gratis / $}} · Tiempo de entrega: {{2-5 días hábiles}} · Nombre de la tienda: {{…}}

Necesito:
1. Mensaje de confirmación (en menos de 1 hora tras el pedido): saludo con nombre, resumen del pedido con monto exacto, confirmar dirección + barrio + punto de referencia + ciudad, preguntar "¿lo recibes tú o alguien más?", ventana de entrega, y pedir un "sí" explícito.
2. Recordatorio si no responde en 3 horas (corto).
3. Segundo recordatorio a las 24 horas con salida elegante ("si ya no lo necesitas, dime y lo cancelo").
4. Mensaje de despachado con número de guía y transportadora.
5. Mensaje de "novedad" (dirección incompleta / no lo encontraron) con opciones concretas.
6. Mensaje post-entrega: gracias + cómo usarlo + invitación a escribir si algo no salió bien.
7. Respuestas rápidas para las 6 objeciones COD.

Tono: cercano, colombiano, sin emojis en exceso, mensajes cortos. Nada de presión falsa.` },

{ id: 'P11', t: 'Apelación de anuncio o cuenta', clase: 21, txt:
`Meta {{rechazó mi anuncio / restringió mi cuenta publicitaria}}. Ayúdame a (1) diagnosticar y (2) redactar la apelación.

Motivo que muestra Meta: "{{texto exacto}}"
Texto del anuncio: {{…}}
Qué se ve en el creativo: {{…}}
URL de la landing: {{…}}
Categoría del producto: {{…}}

Haz esto:
1. Lista qué pudo violar la política: claims de salud, antes/después, atributos personales ("¿tienes X?"), resultados garantizados, landing sin políticas/contacto, producto restringido. Di cuál es la causa más probable.
2. Dime qué corregir ANTES de apelar (si hay algo que sí viola, no se apela: se corrige y se reenvía).
3. Si el anuncio está limpio, redacta la apelación: corta, respetuosa, factual, en el idioma de la cuenta; cita la política y explica por qué el anuncio cumple; sin súplicas ni amenazas.
4. Dime qué NO hacer: reenviar 5 veces lo mismo, subir el mismo creativo a otra cuenta, crear cuentas nuevas con los mismos datos.` },

{ id: 'P12', t: 'CLAUDE.md del negocio', clase: 17, txt:
`Redacta el archivo CLAUDE.md de mi carpeta de negocio. Es el contexto que vas a leer en cada sesión. Debe ser corto (≤80 líneas) y contener exactamente esto:

## Quién soy
{{nombre, ciudad, qué vendo, desde cuándo}}. Vendo por dropshipping contra entrega en Colombia con Meta Ads.

## Estructura de la carpeta
productos/<producto>/ficha.md, copy.md, matriz-9-ads.md, guiones/, imagenes/ · tableros en Sheets (links) · skills/ · esta es la fuente de verdad: lee la ficha antes de proponer nada sobre un producto.

## Productos activos
{{nombre · BEP · precio · bundle · estado (prueba / escalando / meseta)}}

## Reglas no negociables de Meta Ads
1 campaña / 1 adset / 9 ads · evaluar por CPA del adset · 7 días sin tocar · +15 % máximo cada 3 días · cambios 10 am-12 m Colombia · creativos nuevos van al adset existente · presupuesto inicial ≥ 3× BEP.

## Reglas de contenido
Lenguaje del cliente (frases de ficha.md) · sin claims prohibidos · UGC = demostración, no testimonio · prueba social honesta · línea legal si es salud.

## Qué nunca haces
Inventar cifras o reseñas · ejecutar cambios en Meta o Shopify sin que yo confirme · pedir credenciales por chat (van en .env) · proponer productos "de memoria".

## Cómo me respondes
Español, directo, sin relleno. Si falta un dato, pregúntalo. Cuando propongas una acción, di el porqué y el riesgo.` },
];

/* ---------------------------------------------------------------------
   CONFIG (Juan)
   --------------------------------------------------------------------- */
const CONFIG = {
  profeWa: '573054775017', // número de WhatsApp del profe con indicativo, sin +
  profeNombre: 'Juan',
};

/* ---------------------------------------------------------------------
   EXAMEN DE ARRANQUE — sin respuestas buenas ni malas. Mide en qué punto está.
   Por cada clase, UNA pregunta en lenguaje normal con 4 opciones que describen
   cómo lo hace hoy (escalera 0-3). Por módulo, una abierta: "cómo lo haces hoy".
   tipo: 'abierta' | 'select' | 'multi' | 'nivel'
   --------------------------------------------------------------------- */
const ESLABONES = [
  ['producto', 'Producto'], ['landing', 'Oferta y landing'], ['creativos', 'Creativos'], ['trafico', 'Tráfico (Meta)'], ['operacion', 'Operación COD'], ['ia', 'IA y Claude'],
];
const EXAMEN_INICIO = [
  { b: 'Tu contexto', items: [
    { id: 'A1', tipo: 'abierta', q: '¿Qué has vendido o intentado vender? (producto, cuánto tiempo, qué pasó)' },
    { id: 'A2', tipo: 'select', q: '¿Cuánto has invertido en Meta Ads en total, más o menos?', o: ['Nada todavía', 'Menos de $1 millón', '$1 a $5 millones', '$5 a $20 millones', 'Más de $20 millones'] },
    { id: 'A3', tipo: 'abierta', q: 'Tu mejor resultado hasta hoy (ventas en un día o una semana, y con qué)' },
    { id: 'A4', tipo: 'abierta', q: 'Tu peor pérdida y por qué crees que pasó' },
    { id: 'A5', tipo: 'select', q: 'Horas por semana que puedes dedicarle al negocio', o: ['Menos de 5', '5 a 10', '10 a 20', 'Más de 20'] },
    { id: 'A6', tipo: 'multi', q: '¿Qué tienes montado hoy?', o: ['Tienda Shopify', 'Business Manager con pixel', 'Cuenta de Dropi', 'WhatsApp Business', 'Generador de imágenes con IA', 'Generador de video con IA', 'Claude o ChatGPT', 'Nada de esto'] },
    { id: 'A7', tipo: 'abierta', q: '¿Qué quieres lograr con el curso? (una frase)' },
  ]},
  { b: 'Módulo 0 · Arranque', items: [
    { id: 'L1', tipo: 'nivel', clase: 1, q: 'Los números de tu producto: cuánto te cuesta, cuánto ganas por venta y cuánto puedes pagar de publicidad por cada venta.', o: ['No los tengo claros; miro si vende o no', 'Sé más o menos cuánto gano por venta, pero no lo calculo antes de pautar', 'Calculo el margen antes de pautar, pero no lo uso para decidir cuánto gastar', 'Sé exactamente cuánto puedo pagar por venta y con eso decido presupuesto y cuándo parar'] },
  ]},
  { b: 'Módulo 1 · Producto', items: [
    { id: 'L2', tipo: 'nivel', clase: 2, q: 'Buscar productos para vender.', o: ['No sé por dónde empezar', 'Elijo lo que veo de moda en TikTok o lo que me recomiendan', 'Busco en Ads Library o Dropi, pero sin criterios fijos', 'Tengo un método con criterios (competencia, margen, tendencia) y lo aplico siempre'] },
    { id: 'L3', tipo: 'nivel', clase: 3, q: 'Validar un producto antes de invertirle plata.', o: ['Lanzo y veo qué pasa', 'Miro si otros lo venden y ya', 'Reviso varias cosas (tendencia, competencia, margen) pero a ojo', 'Descarto productos con datos antes de gastar un peso; tengo una lista de descartados'] },
    { id: 'L4', tipo: 'nivel', clase: 4, q: 'Conocer al cliente y armar la oferta (precio, combos, garantía).', o: ['Vendo el producto tal cual, con la descripción del proveedor', 'Tengo una idea de quién compra, pero no lo escribo', 'Escribo a quién le vendo y qué le prometo, pero la oferta la improviso', 'Tengo ficha del producto: cliente, promesa, precio, combos 1/2/3 y garantía antes de la landing'] },
    { id: 'O1', tipo: 'abierta', q: 'Cuéntame cómo eliges un producto hoy, paso a paso.' },
  ]},
  { b: 'Módulo 2 · Landing', items: [
    { id: 'L5', tipo: 'nivel', clase: 5, q: 'La estructura de una página que vende.', o: ['No sé qué secciones lleva', 'Copio la estructura de alguna que vi', 'Sé qué secciones van, pero no por qué ni en qué orden', 'Sé qué formato usar según el producto y qué va en cada sección'] },
    { id: 'L6', tipo: 'nivel', clase: 6, q: 'Escribir el texto de la página.', o: ['Uso la descripción del proveedor o lo que me da la IA tal cual', 'Escribo algo yo, sin método', 'Escribo con una estructura (problema, cómo funciona, oferta), pero me cuesta que suene a cliente real', 'Escribo landings completas con el lenguaje del cliente y convierten'] },
    { id: 'L7', tipo: 'nivel', clase: 7, q: 'Imágenes con IA para la página.', o: ['Nunca he generado imágenes con IA', 'He generado, pero el producto no sale igual o se ve pegado', 'Genero con mi producto de referencia, pero el texto o la calidad fallan', 'Genero las imágenes de mi landing con el producto real integrado y el texto dentro'] },
    { id: 'L8', tipo: 'nivel', clase: 8, q: 'Montar la página en Shopify con formulario contra entrega.', o: ['Nunca he montado una', 'He montado páginas con dificultad; no sé de formulario contra entrega ni pixel', 'Monto landings con formulario, pero no sé si el pixel registra las compras', 'Monto landings completas con formulario, pixel funcionando y pedido de prueba'] },
    { id: 'L9', tipo: 'nivel', clase: 9, q: 'Medir y mejorar la página.', o: ['No mido nada de la página', 'Miro si hay ventas o no', 'Miro visitas y ventas, pero no sé qué cambiar', 'Uso datos (conversión, grabaciones) y pruebo cambios uno a uno'] },
    { id: 'O2', tipo: 'abierta', q: '¿Cómo armas hoy la página de un producto? (qué usas, cuánto te toma, qué te cuesta más)' },
  ]},
  { b: 'Módulo 3 · Creativos', items: [
    { id: 'L10', tipo: 'nivel', clase: 10, q: 'Tus anuncios: cuántos y qué tan distintos.', o: ['Uso 1 o 2 anuncios y espero', 'Hago varios, pero parecidos entre sí', 'Hago anuncios con distintos ángulos, pero sin un sistema por etapa', 'Armo sets de 9 anuncios con ángulos y etapas definidas'] },
    { id: 'L11', tipo: 'nivel', clase: 11, q: 'Buscar referencias de anuncios que funcionan.', o: ['No busco referencias', 'Veo anuncios de otros de vez en cuando', 'Guardo referencias, pero desordenadas', 'Tengo un archivo de referencias con por qué funcionan y lo uso para crear'] },
    { id: 'L12', tipo: 'nivel', clase: 12, q: 'Video con IA.', o: ['Nunca he hecho un video con IA', 'He probado, pero no logro que el producto salga bien', 'Hago escenas con IA, pero me cuesta armar un anuncio completo', 'Produzco anuncios de video con IA de principio a fin'] },
    { id: 'L13', tipo: 'nivel', clase: 13, q: 'Edición (CapCut) y producir varios anuncios seguidos.', o: ['No edito videos', 'Edito lo básico (cortar, música)', 'Edito con subtítulos, voz y texto, pero cada anuncio me toma mucho', 'Produzco varios anuncios por semana con variaciones (cambiar el inicio, etc.)'] },
    { id: 'O3', tipo: 'abierta', q: '¿Cómo haces hoy tus anuncios? (quién los hace, con qué, cuántos por producto)' },
  ]},
  { b: 'Módulo 4 · Lanzamiento', items: [
    { id: 'L14', tipo: 'nivel', clase: 14, q: 'Tu cuenta publicitaria y el pixel.', o: ['No tengo cuenta o no sé cómo está configurada', 'Tengo cuenta y pixel, pero no sé si registra bien', 'Tengo todo configurado; me han rechazado o restringido alguna vez y no sé bien por qué', 'Tengo cuenta sana, pixel verificado y una cuenta de respaldo'] },
    { id: 'L15', tipo: 'nivel', clase: 15, q: 'Manejar los pedidos contra entrega.', o: ['Nunca he manejado pedidos contra entrega', 'Confirmo pedidos cuando puedo; no llevo registro', 'Confirmo por WhatsApp, pero no mido cuántos se entregan ni las devoluciones', 'Tengo guion de confirmación, tablero de entregas y sé mi tasa de entrega'] },
    { id: 'L16', tipo: 'nivel', clase: 16, q: 'Lanzar una campaña.', o: ['Nunca he lanzado una campaña', 'He lanzado, pero sin saber bien la estructura ni cuánto poner', 'Lanzo con estructura, pero me cuesta no tocarla los primeros días', 'Lanzo con estructura clara, presupuesto calculado y la dejo correr sin tocar'] },
    { id: 'O4', tipo: 'abierta', q: 'Cuéntame cómo fue tu última campaña: cuánto pusiste por día, cuántos días duró, qué le fuiste cambiando.' },
  ]},
  { b: 'Módulo 5 · Claude Code', items: [
    { id: 'L17', tipo: 'nivel', clase: 17, q: 'Claude o ChatGPT en el negocio.', o: ['Nunca los he usado para el negocio', 'Los uso de vez en cuando para textos', 'Los uso seguido, pero solo en el chat', 'Uso Claude Code (o algo similar) trabajando sobre mis archivos'] },
  ]},
  { b: 'Módulo 6 · Escalamiento', items: [
    { id: 'L18', tipo: 'nivel', clase: 18, q: 'Leer las métricas del administrador de anuncios.', o: ['No las entiendo', 'Miro gasto y ventas', 'Miro varias métricas, pero no sé qué me dicen ni qué hacer', 'Diagnostico con las métricas y sé qué cambiar (anuncio, página u oferta)'] },
    { id: 'L19', tipo: 'nivel', clase: 19, q: 'Subir el presupuesto cuando una campaña vende.', o: ['Nunca he escalado', 'Cuando vende, subo el presupuesto de golpe', 'Subo poco a poco, pero sin calendario ni reglas fijas', 'Escalo con reglas: cuánto, cada cuánto y cuándo parar'] },
    { id: 'L20', tipo: 'nivel', clase: 20, q: 'Mantener viva una campaña que ya vende.', o: ['Cuando deja de vender, no sé qué pasó', 'Cuando baja, cambio cosas al azar', 'Sé que hay que meter anuncios nuevos, pero no lo hago con regularidad', 'Tengo un ritmo semanal de anuncios nuevos y detecto el desgaste antes de que colapse'] },
    { id: 'L21', tipo: 'nivel', clase: 21, q: 'Rechazos, restricciones y bloqueos de Meta.', o: ['Nunca me ha pasado y no sabría qué hacer', 'Me ha pasado y improvisé', 'Sé más o menos qué hacer, pero no tengo respaldo', 'Tengo un plan escrito y cuentas de respaldo'] },
    { id: 'O5', tipo: 'abierta', q: '¿Qué haces cuando una campaña vende un día y al otro no?' },
  ]},
  { b: 'Módulo 7 · Sostenibilidad', items: [
    { id: 'L22', tipo: 'nivel', clase: 22, q: 'Cuando un producto que vendía se cae.', o: ['Cambio de producto', 'Intento cosas sueltas', 'Trato de revivirlo con anuncios nuevos, sin saber qué falló', 'Reviso qué falló (anuncio, oferta, mercado o cuenta) y tengo otros productos en fila'] },
  ]},
  { b: 'Módulo 8 · Claude Code II', items: [
    { id: 'L23', tipo: 'nivel', clase: 23, q: 'Automatizar tareas del negocio con IA (skills, conectar Shopify).', o: ['No sé qué es eso', 'He oído, no lo he hecho', 'He probado automatizar algo, sin resultado sólido', 'Tengo automatizaciones que uso cada semana'] },
    { id: 'L24', tipo: 'nivel', clase: 24, q: 'Tu rutina semanal.', o: ['No tengo rutina; reacciono a lo que pasa', 'Tengo una idea de qué hacer cada semana, pero no la cumplo', 'Tengo rutina, pero se me va toda en operación', 'Tengo rutina fija: datos, anuncios, búsqueda de productos, operación'] },
  ]},
];

/* Estados de partida por clase (según el nivel 0-3 que eligió) */
const ESTADOS = {
  dominada: { label: 'Ya lo haces con método', modo: 'repaso rápido', min: 20, cls: 'good' },
  practica: { label: 'Lo haces, falta método', modo: 'práctica', min: 45, cls: 'warn' },
  parcial:  { label: 'Lo has hecho a tu manera', modo: 'completa', min: 60, cls: 'mid' },
  nueva:    { label: 'Nuevo para ti', modo: 'completa', min: 60, cls: 'new' },
};
const NIVEL_ESTADO = ['nueva', 'parcial', 'practica', 'dominada'];

/* Qué eslabón mide cada clase (para las pistas automáticas) */
const CLASE_ESL = { 1: 'trafico', 2: 'producto', 3: 'producto', 4: 'producto', 5: 'landing', 6: 'landing', 7: 'landing', 8: 'landing', 9: 'landing', 10: 'creativos', 11: 'creativos', 12: 'creativos', 13: 'creativos', 14: 'trafico', 15: 'operacion', 16: 'trafico', 17: 'ia', 18: 'trafico', 19: 'trafico', 20: 'creativos', 21: 'trafico', 22: 'operacion', 23: 'ia', 24: 'ia' };

/* ---------------------------------------------------------------------
   DEMO — respuestas de un estudiante ficticio (Camilo). Se cargan con #/demo
   (solo en modo profe) para ver cómo queda el examen completado.
   --------------------------------------------------------------------- */
const DEMO_RESP = {
  A1: 'Un corrector de postura (2 meses) y una lámpara de luna (1 mes). El corrector vendió 3 semanas y se cayó; la lámpara nunca vendió.',
  A2: 2, A3: '11 pedidos en un día con el corrector, la segunda semana',
  A4: 'Perdí como 2 millones con la lámpara: la vi en TikTok, la monté en 3 días, puse 100 mil diarios y en una semana nada',
  A5: 2, A6: ['Tienda Shopify', 'Business Manager con pixel', 'Cuenta de Dropi', 'WhatsApp Business', 'Claude o ChatGPT'],
  A7: 'Tener un producto estable que me dé 20-30 pedidos al día y saber escalarlo sin que se caiga',
  L1: 2, L2: 1, L3: 1, L4: 0, L5: 1, L6: 2, L7: 1, L8: 3, L9: 1, L10: 1, L11: 1, L12: 0, L13: 2, L14: 2, L15: 2, L16: 1, L17: 1, L18: 1, L19: 1, L20: 1, L21: 1, L22: 0, L23: 0, L24: 0,
  O1: 'Veo qué está sonando en TikTok, busco si está en Dropi y si el precio da, lo monto',
  O2: 'Copio una landing que vi, cambio fotos y texto con ChatGPT, me toma 2 o 3 días. Lo que más me cuesta son las fotos',
  O3: 'Yo mismo en CapCut con videos del proveedor, 2 o 3 por producto',
  O4: 'Puse 100 mil por día. A los 3 días apagué el anuncio que no vendía y subí a 200 mil el que sí. A la semana se cayó todo',
  O5: 'Le subo plata o lo apago',
};

/* ---------------------------------------------------------------------
   VISUAL — color (tono hsl) e ilustración por módulo, iconos de hitos y herramientas
   --------------------------------------------------------------------- */
const MOD_HUE = { 0: 215, 1: 28, 2: 340, 3: 268, 4: 12, 5: 178, 6: 142, 7: 82, 8: 232 };
const MOD_TAG = { 0: 'Arranque', 1: 'Producto', 2: 'Landing', 3: 'Creativos', 4: 'Lanzamiento', 5: 'Claude I', 6: 'Escalar', 7: 'Que no se caiga', 8: 'Claude II' };
const ILUS = {
  0: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="46" fill="var(--m-soft)"/><circle cx="60" cy="60" r="34" fill="none" stroke="var(--m)" stroke-width="5"/><path d="M60 28 L71 60 L60 92 L49 60 Z" fill="var(--m)"/><path d="M60 28 L71 60 L49 60 Z" fill="var(--ink)"/><circle cx="60" cy="60" r="5" fill="var(--surface)"/></svg>',
  1: '<svg viewBox="0 0 120 120"><path d="M20 46 L50 30 L108 46 L78 62 Z" fill="var(--m-soft)"/><rect x="20" y="46" width="58" height="46" rx="6" fill="var(--m)"/><rect x="45" y="46" width="9" height="46" fill="var(--surface)" opacity=".55"/><circle cx="86" cy="82" r="15" fill="var(--surface)" stroke="var(--ink)" stroke-width="6"/><path d="M97 93 L110 106" stroke="var(--ink)" stroke-width="8" stroke-linecap="round"/></svg>',
  2: '<svg viewBox="0 0 120 120"><rect x="36" y="12" width="48" height="96" rx="11" fill="var(--ink)"/><rect x="41" y="21" width="38" height="78" rx="6" fill="var(--surface)"/><rect x="46" y="29" width="28" height="20" rx="4" fill="var(--m)"/><rect x="46" y="54" width="28" height="4" rx="2" fill="var(--m-soft)"/><rect x="46" y="62" width="20" height="4" rx="2" fill="var(--m-soft)"/><rect x="46" y="74" width="28" height="13" rx="6.5" fill="var(--m)"/></svg>',
  3: '<svg viewBox="0 0 120 120"><rect x="20" y="48" width="80" height="52" rx="7" fill="var(--m)"/><path d="M20 48 L100 48 L100 34 L28 22 Z" fill="var(--ink)"/><path d="M40 25 L49 40 M58 28 L67 43 M76 31 L85 46" stroke="var(--surface)" stroke-width="5"/><path d="M52 62 L78 74 L52 86 Z" fill="var(--surface)"/></svg>',
  4: '<svg viewBox="0 0 120 120"><path d="M60 12 C79 29 84 56 75 78 L45 78 C36 56 41 29 60 12 Z" fill="var(--m)"/><circle cx="60" cy="47" r="9" fill="var(--surface)"/><path d="M45 68 L28 84 L46 84 Z M75 68 L92 84 L74 84 Z" fill="var(--ink)"/><path d="M51 82 L60 106 L69 82 Z" fill="var(--m-soft)"/></svg>',
  5: '<svg viewBox="0 0 120 120"><path d="M20 28h80a10 10 0 0 1 10 10v40a10 10 0 0 1-10 10H56L36 104V88H20A10 10 0 0 1 10 78V38a10 10 0 0 1 10-10z" fill="var(--m-soft)"/><path d="M60 40l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill="var(--m)"/><circle cx="86" cy="44" r="4" fill="var(--ink)"/></svg>',
  6: '<svg viewBox="0 0 120 120"><rect x="20" y="70" width="18" height="32" rx="4" fill="var(--m-soft)"/><rect x="46" y="54" width="18" height="48" rx="4" fill="var(--m-soft)"/><rect x="72" y="38" width="18" height="64" rx="4" fill="var(--m)"/><path d="M26 56 L54 42 L80 30 L100 20" stroke="var(--ink)" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M88 18 L101 18 L101 31" stroke="var(--ink)" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  7: '<svg viewBox="0 0 120 120"><path d="M60 102V56" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/><path d="M60 72C38 72 28 56 28 38C46 38 60 50 60 72Z" fill="var(--m)"/><path d="M60 58C82 58 92 42 92 24C74 24 60 36 60 58Z" fill="var(--m-soft)"/><rect x="38" y="98" width="44" height="10" rx="5" fill="var(--m-soft)"/></svg>',
  8: '<svg viewBox="0 0 120 120"><circle cx="44" cy="68" r="22" fill="none" stroke="var(--m)" stroke-width="11" stroke-dasharray="11 6"/><circle cx="44" cy="68" r="8" fill="var(--m)"/><path d="M82 22V102" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/><path d="M82 24H110L102 39L110 54H82Z" fill="var(--m-soft)"/></svg>',
};
const ICONO = {
  hito: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  inicio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/></svg>',
  clases: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 12h16M4 19h10"/></svg>',
  herramientas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 15l3-3 3 3 4-5"/></svg>',
  kit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16v13H4zM9 7V4h6v3M4 12h16"/></svg>',
  calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h3M13 12h3M8 16h3M13 16h3"/></svg>',
  lista: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6l2 2 4-4M5 13l2 2 4-4M5 20l2 2 4-4M13 6h7M13 13h7M13 20h7"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l14 8-14 8z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4h12l-2 4 2 4H5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l11-11-4-4L4 16z"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8c1.6.7 2.2.7 2.9.6a2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/></svg>',
};
const TOOL_ICON = { bep: 'calc', bundles: 'calc', saturacion: 'grid', checklist25: 'lista', matriz9: 'grid', nombrador: 'tag', lanzamiento: 'lista', escalado: 'chart', diag: 'chart', sim: 'play', contingencia: 'shield', plan90: 'flag', examen: 'edit', diario: 'chart', cod: 'lista', diagnostico: 'edit', ficha: 'edit', swipe: 'grid', rutina: 'lista' };
