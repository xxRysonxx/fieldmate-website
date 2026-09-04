/* ============================================================
   HERO PHONE - call -> chat -> lock screen sequence
============================================================ */

const callView = document.getElementById('callView');
const chatView = document.getElementById('chatView');
const lockView = document.getElementById('lockView');

const callLabel = document.getElementById('callLabel');
const chatBody = document.getElementById('chatBody');
const lockNotif = document.getElementById('lockNotif');

const prefersReduced =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


const chatScript = [
{ type: 'out', text: "Hey, this is ABC Plumbing! Sorry we missed your call. How can we help?" },

{ type: 'in', text: "Hi, my kitchen sink has been draining really slowly." },

{ type: 'out', text: "Got it. Is it just the kitchen sink, or are any other drains affected?" },

{ type: 'in', text: "Just the kitchen sink." },

{ type: 'out', text: "That's frustrating. What's the service address and your name?" },

{ type: 'in', text: "123 Main Street. Sarah." },

{ type: 'out', text: "Perfect, Sarah. A team member will follow up with you as soon as possible." }
];


function sleep(ms){
  return new Promise(res => setTimeout(res, ms));
}


function showView(view){

  [callView, chatView, lockView]
    .forEach(v => v.classList.remove('active'));

  view.classList.add('active');

}


function addMsg(type, text){

  const m = document.createElement('div');

  m.className = 'msg ' + type;

  m.textContent = text;

  chatBody.appendChild(m);

  chatBody.scrollTop = chatBody.scrollHeight;

  return m;

}


function addTyping(){

  const t = document.createElement('div');

  t.className = 'typing';

  t.innerHTML = '<i></i><i></i><i></i>';

  chatBody.appendChild(t);

  chatBody.scrollTop = chatBody.scrollHeight;

  return t;

}


if(prefersReduced){

  showView(chatView);

  chatScript.forEach(item => {
    addMsg(item.type, item.text);
  });


} else {


  (async function runDemo(){

    while(true){


      // 1. Incoming call

      callLabel.textContent = 'Incoming Call';

      callLabel.classList.remove('missed');

      showView(callView);

      await sleep(2200);



      // 2. Missed call

      callLabel.textContent = 'Missed Call';

      callLabel.classList.add('missed');

      await sleep(1500);



      // 3. Chat conversation

      chatBody.innerHTML = '';

      showView(chatView);


      for(const item of chatScript){


        if(item.type === 'in'){

          const typingEl = addTyping();

          await sleep(1100);

          typingEl.remove();

          addMsg('in', item.text);


        } else {


          await sleep(900);

          addMsg('out', item.text);


        }


        await sleep(1900);


      }


      await sleep(4300);



      // 4. Lock screen notification

      lockNotif.classList.remove('show');

      lockView.classList.remove('celebrate');

      showView(lockView);


      await sleep(500);


      lockView.classList.add('celebrate');

      lockNotif.classList.add('show');


      await sleep(3800);


    }

  })();

}



/* ============================================================
   ESCALATION SEQUENCE
============================================================ */

const escRows = document.querySelectorAll('.esc-row');


const escObserver = new IntersectionObserver((entries) => {


  entries.forEach(entry => {


    if(entry.isIntersecting){


      escRows.forEach((row, i) => {


        setTimeout(() => {

          row.classList.add('show');

        }, i * 450);


      });


      escObserver.disconnect();


    }


  });


}, { threshold: 0.4 });



if(escRows.length){

  escObserver.observe(
    document.querySelector('.esc-panel')
  );

}