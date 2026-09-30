(function(){
 var days=[[14,25],[16,25],[16,25],[16,25],[16,25],[14,28],[14,28]];
 // hours per weekday index 0=Sun: [openHour, closeHour(>24 means after midnight)]
 var H={0:[14,24],1:[16,25],2:[16,25],3:[16,25],4:[16,25],5:[14,28],6:[14,28]};
 var now=new Date(),d=now.getDay(),h=now.getHours()+now.getMinutes()/60,open=false;
 var t=H[d];if(h>=t[0]&&h<t[1])open=true;
 var y=H[(d+6)%7];if(y[1]>24&&h<y[1]-24)open=true;
 var s=document.getElementById('status');
 s.classList.toggle('closed',!open);
 s.lastChild.textContent=open?'Open now':'Closed right now, opening soon';
 var li=document.querySelector('#week li[data-d="'+d+'"]');if(li)li.classList.add('now');
 var tabs=[].slice.call(document.querySelectorAll('.tab'));
 tabs.forEach(function(b){b.addEventListener('click',function(){
  tabs.forEach(function(x){var on=x===b;x.setAttribute('aria-selected',on);var p=document.getElementById(x.getAttribute('aria-controls'));p.hidden=!on;p.classList.toggle('on',on)});
 })});
 var dt=document.getElementById('d');dt.min=now.toISOString().slice(0,10);dt.value=dt.min;
 document.getElementById('bookForm').addEventListener('submit',function(e){
  e.preventDefault();
  var n=document.getElementById('n').value.trim(),p=document.getElementById('p').value.trim(),m=document.getElementById('msg');
  if(!n||!p||!dt.value){m.textContent='Add your name, phone number and date to continue.';m.style.color='var(--neon)';return}
  m.style.color='';m.textContent='Opening WhatsApp with your booking.';
  var txt='Hi Top Life Hotel, I would like to book a table.\nName: '+n+'\nDate: '+dt.value+'\nTime: '+document.getElementById('t').value+'\nGuests: '+document.getElementById('g').value+'\nPhone: '+p;
  window.open('https://wa.me/254712364610?text='+encodeURIComponent(txt),'_blank','noopener');
 });
const form = document.querySelector('form');
const hourSel = document.getElementById('hour');
const minSel = document.getElementById('minute');
const hiddenTime = document.getElementById('t');
const msgEl = document.getElementById('msg');
let selectedAmPm = 'PM';

// AM/PM buttons
document.querySelectorAll('.ampm-btn').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.ampm-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    selectedAmPm = b.dataset.ampm;
  });
});

// Choose button
document.getElementById('chooseTime').addEventListener('click', ()=>{
  if(!hourSel.value){ alert('Pick hour'); return; }
  hiddenTime.value = `${hourSel.value}:${minSel.value} ${selectedAmPm}`;
  document.getElementById('chooseTime').textContent = hiddenTime.value + ' ✓';
});

// SEND BOOKING -> WHATSAPP
form.addEventListener('submit', (e)=>{
  e.preventDefault();

  const name = document.getElementById('n').value;
  const dateInput = document.querySelector('input[type="date"]').value;
  const time = hiddenTime.value || 'No time chosen';
  const guests = document.getElementById('g').value;
  const phone = document.getElementById('p').value;

  if(!hiddenTime.value){
    alert('Please click Choose after picking time');
    return;
  }

  const text = `*New Booking - Top Life Hotel*%0A`+
  `Name: ${name}%0A`+
  `Date: ${dateInput}%0A`+
  `Time: ${time}%0A`+
  `Guests: ${guests}%0A`+
  `Phone: ${phone}%0A%0A`+
  `Please confirm my booking.`;

  // YOUR WhatsApp number from your site
  const waNumber = '254712364610';
  const waLink = `https://wa.me/${waNumber}?text=${text}`;
});
})();
