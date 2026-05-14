document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll('a[href^="#"]');

  const updateNav = () => {
    if (!nav) return;

    if (window.scrollY > 20) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  };

  updateNav();
  window.addEventListener("scroll", updateNav);

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      const navHeight = nav ? nav.offsetHeight : 0;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
});
