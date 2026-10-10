const content = window.portfolioContent;
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function safeLink(value, email = false) {
  if (!value) return null;
  try {
    const url = new URL(email ? `mailto:${value}` : value, location.href);
    return (email ? url.protocol === 'mailto:' : ['http:', 'https:'].includes(url.protocol)) ? url.href : null;
  } catch { return null; }
}
function resource(label, value, email = false) {
  const href = safeLink(value, email);
  const node = element(href ? 'a' : 'span', `resource ${href ? '' : 'pending'}`);
  node.append(element('span', '', label), element('small', '', href ? 'เปิด ↗' : 'เร็ว ๆ นี้'));
  if (href) { node.href = href; if (!email) { node.target = '_blank'; node.rel = 'noopener noreferrer'; } }
  return node;
}
function photoSlot(src, label, index) {
  const figure = element('figure', 'photo-slot');
  const fallback = () => { figure.replaceChildren(element('span', 'photo-index', `FRAME / 0${index + 1}`), element('span', 'photo-symbol', '⌗'), element('figcaption', '', label), element('small', '', 'พื้นที่สำหรับภาพจริง')); };
  fallback();
  if (safeLink(src)) {
    const img = new Image(); img.alt = label; img.loading = 'lazy';
    img.addEventListener('load', () => { figure.classList.add('has-photo'); figure.replaceChildren(img, element('figcaption', '', label)); });
    img.addEventListener('error', fallback); img.src = src;
  }
  return figure;
}

// Portrait, kept intentionally abstract until a real photo is supplied.
const portrait = element('div', 'portrait-card');
portrait.append(photoSlot(content.portrait, 'Punjapol Inthaprasart', 0));
portrait.querySelector('.photo-symbol').textContent = 'PI';
document.querySelector('.signature').before(portrait);
document.querySelector('.about-copy h3').textContent = 'สวัสดีครับ ผม Punjapol.';
const interests = element('div', 'interest-note');
interests.innerHTML = '<span class="eyebrow muted">WHERE MY INTERESTS CONNECT</span><p>เว็บแอปพลิเคชัน × โลกจริง × Machine Learning</p><span>จากพื้นที่เกษตรถึงพื้นที่ส่วนรวม สองโปรเจ็กต์ที่เชื่อมเทคโนโลยีกับชีวิตประจำวัน</span>';
document.querySelector('.about-copy').append(interests);

// Expand the existing project dialog with editable case-study sections.
const caseStudy = element('div', 'case-study');
document.querySelector('#project-dialog .dim').remove();
document.querySelector('#project-dialog .close-bottom').before(caseStudy);
const briefs = {
  farm: { question: 'เทคโนโลยีจะช่วยให้มองเห็นข้อมูลในพื้นที่เกษตรได้ชัดขึ้นอย่างไร?', direction: 'เชื่อมข้อมูลจากพื้นที่เกษตรกับหน้าเว็บที่อ่านและติดตามได้ง่าย', flow: ['ข้อมูลจากพื้นที่', 'ระบบจัดการข้อมูล', 'หน้าเว็บแสดงผล'] },
  canteen: { question: 'จะช่วยให้ผู้ใช้มองเห็นพื้นที่ว่างในโรงอาหารได้อย่างไร?', direction: 'ใช้ Machine Learning ช่วยแปลข้อมูลภาพเป็นสถานะพื้นที่ที่เข้าใจง่าย', flow: ['ภาพพื้นที่', 'การวิเคราะห์ด้วย ML', 'สถานะพื้นที่ว่าง'] }
};
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.project, p = content.projects[key], brief = briefs[key];
  if (key === 'canteen') document.querySelector('#dialog-description').textContent = 'โปรเจ็กต์ Machine Learning สำหรับตรวจสอบพื้นที่ว่างในโรงอาหาร';
  caseStudy.replaceChildren();
  const gallery = element('div', 'case-gallery');
  p.photoLabels.forEach((label, i) => gallery.append(photoSlot(p.photos[i], label, i)));
  const intro = element('div', 'case-intro');
  intro.append(element('span', 'eyebrow muted', 'CONCEPT / โครงเรื่องแนวคิด'), element('h3', '', brief.question), element('p', '', brief.direction));
  const flow = element('ol', 'flow');
  brief.flow.forEach((step, i) => flow.append(element('li', '', `0${i + 1} / ${step}`)));
  const facts = element('div', 'case-facts');
  for (const [label, value] of [['MY CONTRIBUTION', p.role || 'รอเพิ่มบทบาทและส่วนที่พัฒนาจริง'], ['TECH STACK', p.technologies.join(' · ') || 'รอเพิ่มภาษา เฟรมเวิร์ก และเครื่องมือที่ใช้จริง'], ['RESULTS & LEARNINGS', p.results || 'รอเพิ่มผลทดสอบ สิ่งที่ได้เรียนรู้ และข้อจำกัดของระบบ']]) {
    const fact = element('div', 'case-fact'); fact.append(element('span', 'eyebrow muted', label), element('p', '', value)); facts.append(fact);
  }
  const links = element('div', 'resource-grid'); links.append(resource('Live Demo', p.demo), resource('Source / GitHub', p.repository));
  caseStudy.append(gallery, intro, flow, facts, links);
  if (key === 'canteen') { const link = element('a', 'demo-jump', 'ลองเดโมจำลองโรงอาหาร ↓'); link.href = '#playground'; link.addEventListener('click', () => dialog.close()); caseStudy.append(link); }
}));

const playground = element('section', 'section playground'); playground.id = 'playground';
playground.innerHTML = `<div class="section-head"><div><div class="eyebrow muted">INTERACTIVE LAB / 01</div><h2>Less searching.<br><em>More space.</em></h2></div><p>ลองสำรวจแนวคิดด้วยตัวเอง<br>กดที่โต๊ะเพื่อเปลี่ยนสถานะว่าง / มีคนใช้งาน</p></div>
<div class="lab-layout"><div class="floor-panel"><div class="lab-top"><span>โรงอาหาร / FLOOR 01</span><span class="simulation-badge">SIMULATION</span></div><div class="floor-grid" role="group" aria-label="โต๊ะจำลองในโรงอาหาร"></div><div class="floor-entry">ENTRANCE ↑ <span>ทางเข้าโรงอาหาร</span></div></div><div class="lab-sidebar"><div class="eyebrow muted">SPACE AT A GLANCE</div><div class="availability" role="status" aria-live="polite" aria-atomic="true"></div><div class="capacity-bar" aria-hidden="true"><span></span></div><div class="legend"><span><i></i> ว่าง</span><span><i></i> มีคนใช้งาน</span></div><p class="lab-description">สถานะจะเปลี่ยนตามโต๊ะที่คุณกด<br>ลองจัดพื้นที่ แล้วดูภาพรวมทางด้านบน</p><div class="lab-actions"><button class="button" id="reset-floor">เริ่มใหม่ <span>↺</span></button><button class="outline-button" id="empty-floor">ทำให้ว่างทั้งหมด</button></div><p class="simulation-note">เดโมแบบโต้ตอบนี้ใช้ข้อมูลจำลอง ไม่ได้เชื่อมกล้องหรือเรียกใช้โมเดล Machine Learning จริง</p></div></div>`;
document.querySelector('#about').before(playground);
const initial = [false, true, false, true, true, false, false, true];
let occupied = [...initial];
const grid = playground.querySelector('.floor-grid');
initial.forEach((_, i) => { const table = element('button', 'demo-table'); table.type = 'button'; table.innerHTML = `<span class="table-id">T${String(i + 1).padStart(2, '0')}</span><span class="table-top" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="table-status"></span>`; table.addEventListener('click', () => { occupied[i] = !occupied[i]; updateFloor(); }); grid.append(table); });
function updateFloor() {
  const available = occupied.filter(v => !v).length;
  grid.querySelectorAll('button').forEach((table, i) => { table.classList.toggle('occupied', occupied[i]); table.setAttribute('aria-pressed', String(occupied[i])); table.setAttribute('aria-label', `โต๊ะ ${i + 1}: ${occupied[i] ? 'มีคนใช้งาน' : 'ว่าง'} กดเพื่อสลับสถานะ`); table.querySelector('.table-status').textContent = occupied[i] ? 'มีคนใช้งาน' : 'ว่าง'; });
  playground.querySelector('.availability').innerHTML = `<strong>${available}<span>/ 8</span></strong><span>โต๊ะว่าง · มีคนใช้งาน ${8 - available} โต๊ะ</span>`;
  playground.querySelector('.capacity-bar span').style.width = `${available / 8 * 100}%`;
}
document.querySelector('#reset-floor').addEventListener('click', () => { occupied = [...initial]; updateFloor(); });
document.querySelector('#empty-floor').addEventListener('click', () => { occupied.fill(false); updateFloor(); }); updateFloor();
const heroDemo = element('a', 'hero-demo-link', 'ลองเล่นเดโมโรงอาหาร →'); heroDemo.href = '#playground'; document.querySelector('.hero-copy').append(heroDemo);

// Connect skill areas to evidence, without inventing a technology stack.
document.querySelectorAll('.skill-row').forEach((row, i) => {
  const projectKey = i === 2 ? 'canteen' : 'farm';
  const link = element('button', 'skill-project', i === 2 ? 'ดูโปรเจ็กต์ Canteen ↗' : 'ดูโปรเจ็กต์ Smart Farm ↗');
  link.addEventListener('click', () => document.querySelector(`[data-project="${projectKey}"]`).click()); row.append(link);
});
const contactLinks = element('div', 'resource-grid contact-resources');
contactLinks.append(resource('Email', content.email, true), resource('GitHub', content.github), resource('LinkedIn', content.linkedin), resource('Résumé / CV', content.resume));
document.querySelector('.contact-note').before(contactLinks);
document.querySelector('.contact-note').textContent = 'ช่องทางติดต่อและเรซูเม่จะเปิดใช้งานเมื่อเพิ่มข้อมูลจริง';
