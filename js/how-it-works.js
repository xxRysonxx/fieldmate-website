/* ============================================================
   DEMO CHAT - staggered reveal
============================================================ */

const demoChat = document.getElementById('demoChat');

if(demoChat){

  const bubbles = demoChat.querySelectorAll('.msg');

  const chatObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        bubbles.forEach((bubble, i) => {

          setTimeout(() => {
            bubble.classList.add('show');
          }, i * 500);

        });

        chatObserver.disconnect();

      }

    });

  }, { threshold:0.4 });

  chatObserver.observe(demoChat);

}