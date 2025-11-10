// Scroll lin între secțiuni
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

// Animație ușoară la apariție
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

const io = new IntersectionObserver(reveal, { threshold: 0.1 });
document.querySelectorAll('.db-section, .role-card').forEach(el => {
  el.style.transform = 'translateY(12px)';
  el.style.opacity = '0';
  io.observe(el);
});
