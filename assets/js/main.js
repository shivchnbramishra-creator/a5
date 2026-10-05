(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  // Generic tablists
  document.querySelectorAll('[role="tablist"]').forEach(function(list){
    var tabs=list.querySelectorAll('[role="tab"]');
    function sel(t){tabs.forEach(function(x){x.setAttribute('aria-selected','false');x.tabIndex=-1;document.getElementById(x.getAttribute('aria-controls')).hidden=true;});t.setAttribute('aria-selected','true');t.tabIndex=0;document.getElementById(t.getAttribute('aria-controls')).hidden=false;}
    tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t);});t.addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!d)return;var nx=tabs[(i+d+tabs.length)%tabs.length];sel(nx);nx.focus();});});
  });
  // Chronograph simulator
  var sh=document.getElementById('h-sec');
  if(sh){var mh=document.getElementById('h-min'),rh=document.getElementById('h-run'),rd=document.getElementById('c-read'),st=document.getElementById('c-state'),
      bS=document.getElementById('cs'),bR=document.getElementById('cr'),bF=document.getElementById('cf'),run=false,acc=0,t0=0,flyN=0;
    function el(){return acc+(run?performance.now()-t0:0);}
    function fmt(ms){var s=ms/1000,m=Math.floor(s/60),ss=s-m*60;return (m<10?'0':'')+m+':'+(ss<10?'0':'')+ss.toFixed(1);}
    function draw(){var ms=el(),s=ms/1000;sh.setAttribute('transform','rotate('+((s%60)*6)+' 100 100)');mh.setAttribute('transform','rotate('+(((s/60)%30)*12)+' 100 136)');
      var now=new Date(),rs=now.getSeconds()+now.getMilliseconds()/1000;rh.setAttribute('transform','rotate('+(rs*6)+' 64 100)');rd.textContent=fmt(ms);
      requestAnimationFrame(draw);}
    function ui(){bS.textContent=run?'Stop':'Start';bR.disabled=run||acc===0;bF.disabled=!run;st.textContent=run?(flyN?'Running · flyback ×'+flyN:'Running'):(acc?'Stopped':'Ready');}
    bS.addEventListener('click',function(){if(run){acc+=performance.now()-t0;run=false;}else{t0=performance.now();run=true;}ui();});
    bR.addEventListener('click',function(){if(!run){acc=0;flyN=0;ui();}});
    bF.addEventListener('click',function(){if(run){acc=0;t0=performance.now();flyN++;ui();}});
    ui();requestAnimationFrame(draw);}
  // Tachymeter
  var tr=document.getElementById('tq');
  function tachy(){if(!tr)return;var t=parseFloat(tr.value);document.getElementById('tq-v').textContent=t.toFixed(1)+' s';document.getElementById('tq-o').textContent=Math.round(3600/t);}
  if(tr){tr.addEventListener('input',tachy);tachy();}
  var tl=document.getElementById('tl');
  function tele(){if(!tl)return;var t=parseFloat(tl.value),km=t*0.343;document.getElementById('tl-v').textContent=t.toFixed(1)+' s';document.getElementById('tl-o').textContent=km.toFixed(2);document.getElementById('tl-mi').textContent=(km*0.6214).toFixed(2)+' miles';}
  if(tl){tl.addEventListener('input',tele);tele();}
  // Contact form -> email app
  var cf=document.getElementById('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=document.getElementById('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  // Cookie
  var c=document.getElementById('cookie'),v=null;try{v=localStorage.getItem('fc_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('fc_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
