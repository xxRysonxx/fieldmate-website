/* ============================================================
   SPOTLIGHT 1: staggered chat reveal
============================================================ */
const demoChat1 = document.getElementById('demoChat1');
if(demoChat1){
  const bubbles = demoChat1.querySelectorAll('.msg');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        bubbles.forEach((bubble, i) => {
          setTimeout(() => bubble.classList.add('show'), i * 500);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  obs.observe(demoChat1);
}

/* ============================================================
   SPOTLIGHT 2: booking slot selects itself, then confirms
============================================================ */
const bookingCard = document.getElementById('bookingCard');
if(bookingCard){
  const confirmEl = document.getElementById('bookingConfirm');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        setTimeout(() => confirmEl.classList.add('show'), 900);
        obs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  obs.observe(bookingCard);
}

/* ============================================================
   SPOTLIGHT 2:Lead FOllow up system chat
============================================================ */

const followupChat = document.getElementById('followupChat');
if(followupChat){
  const items = followupChat.querySelectorAll('.msg, .chat-gap-divider');
  const obs2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('show'), i * 550);
        });
        obs2.disconnect();
      }
    });
  }, { threshold: 0.4 });
  obs2.observe(followupChat);
}

/* ============================================================
   SPOTLIGHT 3: stars fill in one at a time
============================================================ */
const starsRow = document.getElementById('starsRow');
if(starsRow){
  const stars = starsRow.querySelectorAll('svg');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        stars.forEach((star, i) => {
          setTimeout(() => star.classList.add('show'), 300 + i * 200);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  obs.observe(starsRow);
}
/* ============================================================
   SPOTLIGHT 4: laptop wakes -> cursor clicks Get Quote -> laptop
   zooms out/blurs -> phone appears -> short SMS
============================================================ */
const showcaseStage = document.getElementById('showcaseStage');
if(showcaseStage){
  const hvacSite = document.getElementById('hvacSite');
  const laptopVisual = document.getElementById('laptopVisual');
  const cursorArrow = document.getElementById('cursorArrow');
  const quoteBtn = document.getElementById('quoteBtn');
  const miniPhoneHolder = document.getElementById('miniPhoneHolder');
  const quoteChatBody = document.getElementById('quoteChatBody');
  const prefersReducedShowcase = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const quoteScript = [
    { type: 'out', text: "Hey John, we just got your quote request! What can we help you with?" },
    { type: 'in',  text: "Wow, thanks for the quick response! I need a quote for a new central air installation." }
  ];

  function quoteAddMsg(type, text){
    const m = document.createElement('div');
    m.className = 'msg ' + type;
    m.textContent = text;
    quoteChatBody.appendChild(m);
    quoteChatBody.scrollTop = quoteChatBody.scrollHeight;
  }

  function quoteAddTyping(){
    const t = document.createElement('div');
    t.className = 'typing';
    t.innerHTML = '<i></i><i></i><i></i>';
    quoteChatBody.appendChild(t);
    quoteChatBody.scrollTop = quoteChatBody.scrollHeight;
    return t;
  }

  async function playShowcase(){
    if(prefersReducedShowcase){
      // Jump straight to the settled end state, no motion
      hvacSite.classList.add('awake');
      laptopVisual.classList.add('exit');
      miniPhoneHolder.classList.add('in');
      quoteScript.forEach(item => quoteAddMsg(item.type, item.text));
      return;
    }

    await new Promise(r => setTimeout(r, 500));

    // laptop screen wakes up, showing the HVAC website
    hvacSite.classList.add('awake');
    await new Promise(r => setTimeout(r, 2200)); // wait a few seconds on the hero

    // cursor moves across the screen to the Get Quote button.
    // Computed from the button's actual position so it always lines up,
    // regardless of how the mockup content reflows at different screen sizes.
    const siteBox = hvacSite.getBoundingClientRect();
    const btnBox = quoteBtn.getBoundingClientRect();
    const targetTop = ((btnBox.top - siteBox.top) + btnBox.height / 2) - (cursorArrow.offsetHeight / 2);
    const targetLeft = ((btnBox.left - siteBox.left) + btnBox.width / 2) - (cursorArrow.offsetWidth / 2);
    cursorArrow.style.top = targetTop + 'px';
    cursorArrow.style.left = targetLeft + 'px';
    cursorArrow.style.right = 'auto';
    cursorArrow.classList.add('arrived');
    await new Promise(r => setTimeout(r, 850));

    // button highlights, then gets clicked
    quoteBtn.classList.add('highlight');
    await new Promise(r => setTimeout(r, 350));
    cursorArrow.classList.add('press');
    quoteBtn.classList.add('clicked');
    await new Promise(r => setTimeout(r, 220));
    cursorArrow.classList.remove('press');
    await new Promise(r => setTimeout(r, 300));

    // laptop zooms out and blurs into the background, phone appears
    laptopVisual.classList.add('exit');
    miniPhoneHolder.classList.add('in');
    await new Promise(r => setTimeout(r, 800));

    // short SMS exchange, then stop
    for(const item of quoteScript){
      if(item.type === 'in'){
        const typingEl = quoteAddTyping();
        await new Promise(r => setTimeout(r, 1100));
        typingEl.remove();
        quoteAddMsg('in', item.text);
      } else {
        await new Promise(r => setTimeout(r, 500));
        quoteAddMsg('out', item.text);
      }
      await new Promise(r => setTimeout(r, 900));
    }
  }

  const showcaseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        playShowcase();
        showcaseObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  showcaseObserver.observe(showcaseStage);
}