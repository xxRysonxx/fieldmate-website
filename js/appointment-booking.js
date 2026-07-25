/* ============================================================
   EXAMPLE CONVERSATION REVEAL
============================================================ */

const exampleChat = document.getElementById('exampleChat');

if(exampleChat){

  const bubbles = exampleChat.querySelectorAll('.msg');

  const obs = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        bubbles.forEach((bubble, i) => {

          setTimeout(() => {
            bubble.classList.add('show');
          }, i * 500);

        });

        obs.disconnect();

      }

    });

  }, {
    threshold:0.4
  });


  obs.observe(exampleChat);

}