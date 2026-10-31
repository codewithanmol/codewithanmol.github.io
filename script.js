(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const typed = document.getElementById("typed");
  const roles = [
    "secure systems.",
    "AI-powered browsers.",
    "local-first assistants.",
    "automation that ships.",
  ];

  if (typed && !reduceMotion) {
    let role = 0;
    let length = roles[0].length;
    let deleting = false;

    const tick = () => {
      const word = roles[role];

      if (!deleting) {
        length += 1;
        typed.textContent = word.slice(0, length);
        if (length >= word.length) {
          deleting = true;
          window.setTimeout(tick, 1900);
          return;
        }
        window.setTimeout(tick, 52 + Math.random() * 46);
        return;
      }

      length -= 1;
      typed.textContent = word.slice(0, length);
      if (length <= 0) {
        deleting = false;
        role = (role + 1) % roles.length;
        window.setTimeout(tick, 340);
        return;
      }
      window.setTimeout(tick, 26);
    };

    window.setTimeout(tick, 1500);
  }

  const revealItems = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("in"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((el, index) => {
      el.style.transitionDelay = `${(index % 3) * 70}ms`;
      observer.observe(el);
    });
  }

  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
