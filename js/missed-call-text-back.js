/* ============================================================
   EXAMPLE CONVERSATION - staggered reveal when scrolled into view
============================================================ */
const exampleChat = document.getElementById('exampleChat');
if(exampleChat){
  const bubbles = exampleChat.querySelectorAll('.msg');
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
  obs.observe(exampleChat);
}

/* HERO PHONE - call -> chat -> lock screen sequence */
const callView = document.getElementById('callView');
const chatView = document.getElementById('chatView');
const lockView = document.getElementById('lockView');
const callLabel = document.getElementById('callLabel');
const chatBody = document.getElementById('chatBody');
const lockNotif = document.getElementById('lockNotif');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const chatScript = [
  { type: 'out', text: "Hey, this is ABC Plumbing! Sorry we missed your call, how can we help today?" },
  { type: 'in',  text: "Hi, my kitchen sink is leaking bad under the cabinet." },
  { type: 'out', text: "Sorry to hear that. Is water actively pooling right now?" },
  { type: 'in',  text: "Yes, it's pooling under the cabinet." },
  { type: 'out', text: "Got it, that's urgent. I have a tech free today at 2:30 PM or 4:00 PM. Which works?" },
  { type: 'in',  text: "2:30 works great." },
  { type: 'out', text: "Perfect, you're booked for 2:30 PM today. See you soon!" }
];

function sleep(ms){ return new Promise(res => setTimeout(res, ms)); }

function showView(view){
  [callView, chatView, lockView].forEach(v => v.classList.remove('active'));
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
  chatScript.forEach(item => addMsg(item.type, item.text));
} else {
  (async function runDemo(){
    while(true){
      callLabel.textContent = 'Incoming Call';
      callLabel.classList.remove('missed');
      showView(callView);
      await sleep(2200);

      callLabel.textContent = 'Missed Call';
      callLabel.classList.add('missed');
      await sleep(1500);

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