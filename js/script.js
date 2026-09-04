/* ========================================
   FIELD MATE SITE JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", () => {


  /* ========================================
     DEMO BOOKING MODAL
  ======================================== */

  const demoModal = document.getElementById("demo-modal");
  const openDemoButtons = document.querySelectorAll(".js-open-demo");
  const closeDemoButtons = document.querySelectorAll(".js-close-demo");

  function openDemoModal() {
    if (!demoModal) return;

    demoModal.classList.add("is-open");
    demoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeDemoModal() {
    if (!demoModal) return;

    demoModal.classList.remove("is-open");
    demoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  openDemoButtons.forEach((button) => {
    button.addEventListener("click", openDemoModal);
  });

  closeDemoButtons.forEach((button) => {
    button.addEventListener("click", closeDemoModal);
  });


  /* ========================================
     MOBILE NAVIGATION
  ======================================== */

  const navToggle = document.querySelector(".site-nav__toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".site-nav__mobile a");

  if (navToggle && mobileMenu) {

    navToggle.addEventListener("click", () => {

      const isOpen = mobileMenu.classList.toggle("is-open");

      navToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });


    /* Close mobile menu when a link is clicked */

    mobileNavLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("is-open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        navToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      });

    });

  }


  /* ========================================
     ESCAPE KEY
  ======================================== */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      demoModal &&
      demoModal.classList.contains("is-open")
    ) {
      closeDemoModal();
    }

  });


});