/* ============================================================
   NAV SCROLL STATE
============================================================ */

const header = document.getElementById('siteHeader');

if(header){

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });

}


/* ============================================================
   MOBILE NAV MENU
============================================================ */

const navMenuBtn = document.getElementById('navMenuBtn');
const navLinks = document.getElementById('navLinks');
const navCta = document.getElementById('navCta');
const navCtaBtn = document.getElementById('navCtaBtn');


function closeMobileMenu(){

  if(!navLinks || !navMenuBtn) return;

  navLinks.classList.remove('open');

  navMenuBtn.classList.remove('open');

  navMenuBtn.setAttribute(
    'aria-expanded',
    'false'
  );

}



if(navMenuBtn && navLinks){

  navMenuBtn.addEventListener('click', () => {

    const isOpen = navLinks.classList.toggle('open');

    navMenuBtn.classList.toggle(
      'open',
      isOpen
    );

    navMenuBtn.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

  });

}


/* ============================================================
   FEATURES DROPDOWN TOGGLE
============================================================ */

const dropdownParent = document.querySelector('.has-dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');


if(dropdownParent && dropdownToggle){

  dropdownToggle.addEventListener('click', () => {

    const isOpen =
      dropdownParent.classList.toggle('open');


    dropdownToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

  });

}


/* ============================================================
   NAV LINK HANDLING
============================================================ */

if(navLinks){

  navLinks.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      closeMobileMenu();

    });

  });

}


if(navCtaBtn){

  navCtaBtn.addEventListener(
    'click',
    closeMobileMenu
  );

}


/* ============================================================
   MOVE CTA BUTTON RESPONSIVE
============================================================ */

const navBreakpoint =
  window.matchMedia('(max-width: 860px)');


function placeNavCtaBtn(e){

  if(!navLinks || !navCta || !navCtaBtn) return;


  if(e.matches){

    navLinks.appendChild(navCtaBtn);

  } else {

    navCta.insertBefore(
      navCtaBtn,
      navMenuBtn
    );

    closeMobileMenu();

  }

}


navBreakpoint.addEventListener(
  'change',
  placeNavCtaBtn
);


placeNavCtaBtn(navBreakpoint);



/* ============================================================
   SCROLL REVEAL
============================================================ */

const revealEls =
  document.querySelectorAll('.reveal');


if(revealEls.length){

  const revealObserver =
    new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.classList.add('in');

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold:0.15
    });


  revealEls.forEach(el =>
    revealObserver.observe(el)
  );

}