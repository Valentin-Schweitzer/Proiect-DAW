// Mică interacțiune: scroll lin către „Povestea aplicației”
document.addEventListener('click', (e) => {
  const el = e.target.closest('a[href^="#"]');
  if(!el) return;
  const id = el.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if(target){
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Reveal ușor pe carduri la intrarea în viewport
const reveal = (entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.transition = 'transform .5s ease, opacity .5s ease';
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
      obs.unobserve(entry.target);
    }
  });
};

const io = new IntersectionObserver(reveal, { threshold: 0.15 });
document.querySelectorAll('.card').forEach(card => {
  card.style.transform = 'translateY(12px)';
  card.style.opacity = '0';
  io.observe(card);
});

document.querySelectorAll('.role-card, .flow-step').forEach(el => {
  el.style.transform = 'translateY(12px)';
  el.style.opacity = '0';
  io.observe(el);
});
