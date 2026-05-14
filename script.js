document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");

  const updateNav = () => {
    if (!nav) return;

    if (window.scrollY > 20) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  };

  const closeMenu = () => {
    if (!menu || !menuToggle) return;

    menu.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menü öffnen");
  };

  const toggleMenu = () => {
    if (!menu || !menuToggle) return;

    const isOpen = menu.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
  };

  updateNav();
  window.addEventListener("scroll", updateNav);

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      closeMenu();

      const navHeight = nav ? nav.offsetHeight : 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });
});
