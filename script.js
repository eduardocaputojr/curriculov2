document.addEventListener("DOMContentLoaded", () => {
  
  // --- Progress Bar de Scroll ---
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const percentage = (window.scrollY / totalScroll) * 100;
      scrollProgress.style.width = `${percentage}%`;
    }
  });

  // --- Efeito Cursor Glow ---
  const cursorGlow = document.getElementById("cursorGlow");
  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
  document.addEventListener("mouseenter", () => cursorGlow.classList.add("active"));
  document.addEventListener("mouseleave", () => cursorGlow.classList.remove("active"));
  if (window.scrollY > 0) cursorGlow.classList.add("active");

  // --- Menu Mobile ---
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = mobileMenu.querySelectorAll("a");

  const toggleMenu = () => {
    navToggle.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  };

  navToggle.addEventListener("click", toggleMenu);
  mobileLinks.forEach(link => link.addEventListener("click", toggleMenu));

  // --- Contador de KPIs Animado ---
  const kpis = document.querySelectorAll(".kpi .num");
  const animateKPIs = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute("data-count"), 10);
        const suffix = target.getAttribute("data-suffix") || "";
        let startValue = 0;
        const duration = 1500;
        const startTime = performance.now();

        const step = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const value = Math.floor(progress * (endValue - startValue) + startValue);
          target.textContent = value + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
        observer.unobserve(target);
      }
    });
  };

  const kpiObserver = new IntersectionObserver(animateKPIs, { threshold: 0.5 });
  kpis.forEach(kpi => kpiObserver.observe(kpi));

  // --- Abas de Competências ---
  const tabs = document.querySelectorAll(".skill-tab");
  const panels = document.querySelectorAll(".skill-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetPanel = document.getElementById(tab.getAttribute("data-target"));
      targetPanel.classList.add("active");

      // Anima as barras de progresso ao ativar a aba
      const fills = targetPanel.querySelectorAll(".skill-bar-fill");
      fills.forEach(fill => {
        fill.style.width = fill.getAttribute("data-width");
      });
    });
  });

  // Inicializa a primeira aba ativa
  if(tabs.length > 0) tabs[0].click();

  // --- Clique para Copiar ---
  const copyableLinks = document.querySelectorAll(".clink.copyable");
  const toast = document.getElementById("toast");

  copyableLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const textToCopy = link.getAttribute("data-copy");
      navigator.clipboard.writeText(textToCopy).then(() => {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
      });
    });
  });

  // --- Botão Voltar ao Topo & Efeitos Reveal ---
  const toTopBtn = document.getElementById("toTop");
  const revealElements = document.querySelectorAll("[data-reveal]");

  const handleScroll = () => {
    // Botão voltar ao topo
    if (window.scrollY > 400) {
      toTopBtn.classList.add("show");
    } else {
      toTopBtn.classList.remove("show");
    }

    // Scroll reveal
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add("in");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  toTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  handleScroll(); // Executa uma vez no início

  // --- Efeito Parallax Tilt na Foto Principal ---
  const photoWrap = document.querySelector(".photo-wrap");
  if(photoWrap) {
    document.addEventListener("mousemove", (e) => {
      const ax = -(window.innerWidth / 2 - e.clientX) / 30;
      const ay = (window.innerHeight / 2 - e.clientY) / 30;
      photoWrap.style.transform = `rotateY(${ax}deg) rotateX(${ay}deg)`;
    });
  }

  // --- Sanfona (Accordion) da Trajetória ---
  const tlItems = document.querySelectorAll(".tl-item");
  tlItems.forEach(item => {
    const top = item.querySelector(".tl-top");
    top.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
});
