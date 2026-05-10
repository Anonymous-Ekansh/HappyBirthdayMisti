
var sections=['s1','s2','s3','s4','s5','s6'];
var darkSections=[2,3,5];
var current=0;
var dotsRow=document.getElementById('dotsRow');
sections.forEach(function(_,i){
  var d=document.createElement('div');
  d.className='dot'+(i===0?' active':'');
  dotsRow.appendChild(d);
});
function changeSection(dir){
  var next=current+dir;
  if(next<0||next>=sections.length)return;
  document.getElementById(sections[current]).classList.remove('active');
  current=next;
  document.getElementById(sections[current]).classList.add('active');
  updateNav();
  onSectionEnter(current);
  window.scrollTo(0,0);
}
function updateNav(){
  document.getElementById('prevBtn').disabled=(current===0);
  document.getElementById('nextBtn').disabled=(current===sections.length-1);
  document.querySelectorAll('.dot').forEach(function(d,i){d.classList.toggle('active',i===current);});
  var nb=document.getElementById('navBar');
  if(darkSections.indexOf(current)>-1){nb.classList.add('dark');}else{nb.classList.remove('dark');}
}
function onSectionEnter(idx){
  if(idx===1)startChat();
  if(idx===3)buildConstellation();
  if(idx===5)animateCredits();
}
window.addEventListener('load',function(){
  setTimeout(function(){
    document.getElementById('curtainL').classList.add('open');
    document.getElementById('curtainR').classList.add('open');
    setTimeout(spawnConfetti,900);
  },300);
});
function spawnConfetti(){
  var colors=['#9b87c4','#5ba5a0','#c9a84c','#e8b8d0','#6b5a9e','#3a7a76','#f0a0a0'];
  var box=document.getElementById('confettiBox');
  for(var i=0;i<90;i++){
    var c=document.createElement('div');
    c.className='confetti-piece';
    c.style.left=Math.random()*100+'vw';
    c.style.background=colors[Math.floor(Math.random()*colors.length)];
    var s=Math.random()*8+4;
    c.style.width=s+'px';c.style.height=s+'px';
    c.style.borderRadius=Math.random()>0.5?'50%':'2px';
    c.style.animationDuration=(Math.random()*2+2)+'s';
    c.style.animationDelay=(Math.random()*1.5)+'s';
    box.appendChild(c);
  }
  setTimeout(function(){box.innerHTML='';},5500);
}
var chatStarted=false;
function startChat(){
  if(chatStarted)return;
  chatStarted=true;
  ['b1','b2','b3','b4','b5','b6'].forEach(function(id,i){
    setTimeout(function(){
      var el=document.getElementById(id);
      if(el)el.classList.add('visible');
      if(i===5)setTimeout(function(){document.getElementById('revealBox').classList.add('visible');},700);
    },i*780);
  });
}
var stars=[
  {label:'The Beginning',date:'16 Sept 2025',memory:'It started with an anonymous text. A stranger who would become one of the closest people in her life. A year later here we are.',x:48,y:14},
  {label:'Percy Jackson',date:'Somewhere in 2025',memory:'Her love for fiction, for Percy Jackson, for worlds that exist between pages. Some things tell you everything about a person.',x:76,y:32},
  {label:'HTTYD',date:'Nov 2025',memory:'The first movie watched together — How to Train Your Dragon. A memory worth keeping.',x:22,y:38},
  {label:'Breeze 26',date:'20-21 Feb 2026',memory:'The college fest, the photo booth strips, the squad doing heart signs at night. Breeze 26 was a whole vibe.',x:62,y:58},
  {label:'The Trip',date:'4 Jan 2026',memory:'Mountains, fog, matching scarves. The trip that made the friendship official.',x:14,y:65},
  {label:'Project Hail Mary',date:'4 Apr 2026',memory:'The day she became Captain America for two seconds, glasses in one hand, shield on her face.',x:40,y:76},
  {label:'Rain Dance',date:'8 Apr 2026',memory:'Nobody planned it. Nobody cared. Everybody showed up.',x:82,y:68},
  {label:'The Waffles Treat Star',date:'Somewhere in 2025–26',memory:'The spontaneous waffle treat at Grub where she called everyone together like the unofficial happiness manager of the group.',x:88,y:20},
  {label:'The Chaos Night',date:'Sometime in 2026',memory:'The night of random drinks, experiments, chaos, and laughter that honestly shouldn\'t have worked but somehow became iconic.',x:58,y:88}
];
var constellationBuilt=false;
function buildConstellation(){
  if(constellationBuilt)return;
  constellationBuilt=true;
  var canvas=document.getElementById('skyCanvas');
  stars.forEach(function(s,i){
    var el=document.createElement('div');
    el.className='star';
    el.style.left=s.x+'%';
    el.style.top=s.y+'%';
    el.innerHTML='<div class="star-dot"></div><div class="star-label">'+s.label+'</div>';
    (function(idx){el.onclick=function(){openStar(idx);};})(i);
    canvas.appendChild(el);
  });
}
function openStar(i){
  document.getElementById('popupDate').textContent=stars[i].date;
  document.getElementById('popupMemory').textContent=stars[i].memory;
  document.getElementById('starPopup').classList.add('show');
  document.querySelectorAll('.star').forEach(function(el,idx){el.classList.toggle('active',idx===i);});
}
function closePopup(){
  document.getElementById('starPopup').classList.remove('show');
  document.querySelectorAll('.star').forEach(function(el){el.classList.remove('active');});
}
var phrases=['Sone do na yr','Kamine log !','Shut up'];
var phraseIdx=0;
var bubbleTimer=null;
document.addEventListener('DOMContentLoaded',function(){
  var zone=document.getElementById('mistiTap');
  if(zone){
    zone.addEventListener('click',function(){
      var bubble=document.getElementById('speechBubble');
      bubble.textContent=phrases[phraseIdx%phrases.length];
      phraseIdx++;
      bubble.classList.remove('show');
      void bubble.offsetWidth;
      bubble.classList.add('show');
      clearTimeout(bubbleTimer);
      bubbleTimer=setTimeout(function(){bubble.classList.remove('show');},2400);
    });
  }
});
var creditsAnimated=false;
function animateCredits(){
  if(creditsAnimated)return;
  creditsAnimated=true;
  document.querySelectorAll('.cast-item').forEach(function(el,i){
    setTimeout(function(){el.classList.add('visible');},i*220+300);
  });
}
