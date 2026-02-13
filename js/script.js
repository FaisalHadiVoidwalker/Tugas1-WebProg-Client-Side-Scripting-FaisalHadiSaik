document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;

        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  const sections = document.querySelectorAll("main section");
  const header = document.querySelector("header");
  const SCROLL_ACTIVE_OFFSET = 100;

  function highlightNavLink() {
    let currentActive = "";
    const headerHeight = header.offsetHeight;

    sections.forEach((section) => {
      const sectionTop =
        section.offsetTop - headerHeight - SCROLL_ACTIVE_OFFSET;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentActive = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentActive}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);
  window.addEventListener("resize", highlightNavLink);
  highlightNavLink();

  const animatedSections = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedSections.forEach((section) => {
    observer.observe(section);
  });

  const contactForm = document.querySelector("#contact form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageTextarea = document.getElementById("message");

  function showError(inputElement, message) {
    const formGroup = inputElement.closest(".form-group");
    const errorMessageSpan = formGroup.querySelector(".error-message");
    inputElement.classList.add("invalid");
    errorMessageSpan.textContent = message;
    errorMessageSpan.classList.add("visible");
  }

  function clearError(inputElement) {
    const formGroup = inputElement.closest(".form-group");
    const errorMessageSpan = formGroup.querySelector(".error-message");
    inputElement.classList.remove("invalid");
    errorMessageSpan.textContent = "";
    errorMessageSpan.classList.remove("visible");
  }

  nameInput.addEventListener("input", () => clearError(nameInput));
  emailInput.addEventListener("input", () => clearError(emailInput));
  messageTextarea.addEventListener("input", () => clearError(messageTextarea));

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;

      clearError(nameInput);
      clearError(emailInput);
      clearError(messageTextarea);

      if (nameInput.value.trim() === "") {
        showError(nameInput, "Name cannot be empty.");
        isValid = false;
      }

      if (emailInput.value.trim() === "") {
        showError(emailInput, "Email cannot be empty.");
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
      }

      if (messageTextarea.value.trim() === "") {
        showError(messageTextarea, "Message cannot be empty.");
        isValid = false;
      }

      if (isValid) {
        alert("Message sent successfully!");
        contactForm.reset();
      }
    });
  }
});
