// ===== Scroll lin între secțiuni =====
document.addEventListener('click', (e) => {
  const el = e.target.closest('a[href^="#"]');
  if (!el) return;
  const id = el.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// ===== Animație la apariție =====
const reveal = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'transform .5s ease, opacity .5s ease';
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
};

const io = new IntersectionObserver(reveal, { threshold: 0.1 });

document.querySelectorAll('.db-section, .impl-flex').forEach(el => {
  el.style.transform = 'translateY(12px)';
  el.style.opacity = '0';
  io.observe(el);
});


document.addEventListener("DOMContentLoaded", () => {
        // Build modal once
        let modal = document.getElementById("imageModal");
    if (!modal) {
        modal = document.createElement("div");
    modal.id = "imageModal";
    modal.style.display = "none";
    modal.setAttribute("role","dialog");
    modal.setAttribute("aria-modal","true");
    modal.innerHTML = `
    <span class="close" aria-label="Închide" title="Închide">&times;</span>
    <img id="modalImage" alt="">
        `;
        document.body.appendChild(modal);
  }

        const modalImg = modal.querySelector("#modalImage");
        const closeBtn = modal.querySelector(".close");

  // Open on ANY <img> click (except images you mark with data-nozoom)
  document.body.addEventListener("click", (e) => {
    const img = e.target.closest("img");
            if (!img || modal.contains(e.target) || img.hasAttribute("data-nozoom")) return;

            // If image is inside a link, stop navigation so the modal can open
            const link = img.closest("a");
            if (link) e.preventDefault();

            modalImg.src = img.currentSrc || img.src;
            modal.style.display = "flex";
            document.documentElement.style.overflow = "hidden"; // lock scroll
  });

  // Close helpers
  const close = () => {
                modal.style.display = "none";
            modalImg.src = "";
            document.documentElement.style.overflow = "";
  };

            closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.style.display !== "none") close(); });

            // sanity ping in console so you know the script ran
            console.debug("Image zoom modal ready");
});


