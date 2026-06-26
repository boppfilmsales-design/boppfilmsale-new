// ============ MOBILE NAV ============
function setupMobileNav(){
  var toggle=document.querySelector('.mobile-menu-toggle');
  var header=document.querySelector('header');
  if(toggle&&header){
    toggle.addEventListener('click',function(){
      header.classList.toggle('nav-open');
      var expanded=toggle.getAttribute('aria-expanded')==='true';
      toggle.setAttribute('aria-expanded',!expanded);
    });
  }
}
document.addEventListener('DOMContentLoaded',setupMobileNav);

// ============ FADE IN (run immediately + on scroll) ============
function checkFadeIn(){
  var fades=document.querySelectorAll('.fade-in');
  for(var i=0;i<fades.length;i++){
    var el=fades[i];
    if(el.classList.contains('visible'))continue;
    var rect=el.getBoundingClientRect();
    if(rect.top<window.innerHeight-40&&rect.bottom>0){
      el.classList.add('visible');
    }
  }
}
document.addEventListener('DOMContentLoaded',checkFadeIn);
window.addEventListener('scroll',checkFadeIn);

// ============ SCROLL PROGRESS ============
window.addEventListener('scroll',function(){
  var bar=document.getElementById('scrollProgress');
  if(!bar)return;
  var h=document.documentElement;
  var scrolled=h.scrollTop;
  var total=h.scrollHeight-h.clientHeight;
  var pct=total>0?(scrolled/total)*100:0;
  bar.style.width=pct+'%';
});

// ============ LANGUAGE ============
var currentLang=localStorage.getItem('aec-lang')||'en';
function setLang(l){
  currentLang=l;
  localStorage.setItem('aec-lang',l);
  document.documentElement.lang=l;
  if(l==='ar'){document.documentElement.dir='rtl'}else{document.documentElement.dir='ltr'}
  var s=document.getElementById('langSelect');
  if(s)s.value=l;

  // Get current page filename
  var path = window.location.pathname;
  var page = path.split('/').pop() || 'index.html';

  if(l==='zh'){
    // Switch to Chinese version
    if(page.includes('_zh.html')){
      // Already on Chinese version, do nothing
    }else{
      var zhPage = page.replace('.html','_zh.html');
      // Check if Chinese version exists, otherwise stay on current page
      window.location.href = zhPage;
    }
  }else if(l==='en'){
    // Switch to English version
    if(page.includes('_zh.html')){
      var enPage = page.replace('_zh.html','.html');
      window.location.href = enPage;
    }
    // Already on English version, do nothing
  }
}

// Check if requested page exists, fallback to available version
function checkPageExists(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', url, true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      callback(xhr.status === 200);
    }
  };
  xhr.send();
}

document.addEventListener('DOMContentLoaded',function(){
  setLang(currentLang);
});

// ============ HERO SLIDER ============
var currentSlide=0,slideInterval;
function goSlide(n){
  var slides=document.querySelectorAll('.slide');
  var dots=document.querySelectorAll('.dot');
  if(!slides.length)return;
  currentSlide=n;
  for(var i=0;i<slides.length;i++){
    slides[i].classList.remove('active');
    if(dots[i])dots[i].classList.remove('active');
  }
  if(slides[n])slides[n].classList.add('active');
  if(dots[n])dots[n].classList.add('active');
  resetSlideTimer();
}
function nextSlide(){
  var slides=document.querySelectorAll('.slide');
  goSlide((currentSlide+1)%slides.length);
}
function prevSlide(){
  var slides=document.querySelectorAll('.slide');
  goSlide((currentSlide-1+slides.length)%slides.length);
}
function resetSlideTimer(){
  clearInterval(slideInterval);
  slideInterval=setInterval(nextSlide,5000);
}
document.addEventListener('DOMContentLoaded',function(){
  slideInterval=setInterval(nextSlide,5000);
});

// ============ SPEC TABS ============
function showSpec(btn,id){
  var tabs=document.querySelectorAll('.stab');
  for(var i=0;i<tabs.length;i++)tabs[i].classList.remove('active');
  btn.classList.add('active');
  var panels=document.querySelectorAll('.spec-panel');
  for(var i=0;i<panels.length;i++)panels[i].classList.remove('active-panel');
  var panel=document.getElementById(id);
  if(panel)panel.classList.add('active-panel');
}

// ============ CONTACT FORM ============
function handleSubmit(e){
  if(e)e.preventDefault();
  var fs=document.getElementById('form-success');
  if(fs)fs.style.display='block';
  var form=e?e.target:null;
  if(form)form.reset();
  setTimeout(function(){if(fs)fs.style.display='none';},4000);
  return false;
}

// ============ ABOUT READ MORE ============
function toggleAbout(){
  var c=document.getElementById('aboutContent');
  var b=document.getElementById('aboutToggle');
  if(!c)return;
  c.classList.toggle('collapsed');
  c.classList.toggle('expanded');
  if(b)b.textContent=c.classList.contains('collapsed')?'Read More 阅读更多 →':'收起内容 ←';
}

function toggleAboutZh(){
  var c=document.getElementById('aboutContentZh');
  var b=document.getElementById('aboutToggleZh');
  if(!c)return;
  c.classList.toggle('collapsed');
  c.classList.toggle('expanded');
  if(b)b.textContent=c.classList.contains('collapsed')?'Read More 阅读更多 →':'收起内容 ←';
}

// ============ COMPANY INTRODUCE ============
function toggleCi(id,btn){
  var el=document.getElementById(id);
  if(!el)return;
  el.classList.toggle('collapsed');
  el.classList.toggle('expanded');
  if(btn)btn.textContent=el.classList.contains('collapsed')?'Read More 阅读更多 →':'收起内容 ←';
}

// ============ EQUIPMENT THUMBS ============
function toggleThumbs(id,btn){
  var el=document.getElementById(id);
  if(!el)return;
  el.classList.toggle('eq-thumbs-collapsed');
  if(btn)btn.textContent=el.classList.contains('eq-thumbs-collapsed')?'Read More 查看更多 ▾':'收起 ↑';
}

// ============ BOPP CATEGORY ACCORDION ============
function toggleCategory(header){
  var sub=header.nextElementSibling;
  var arrow=header.querySelector('.bopp-cat-arrow');
  if(!sub)return;
  if(sub.classList.contains('collapsed')){
    sub.classList.remove('collapsed');
    header.classList.add('active');
    if(arrow)arrow.style.transform='rotate(90deg)';
  }else{
    sub.classList.add('collapsed');
    header.classList.remove('active');
    if(arrow)arrow.style.transform='rotate(0deg)';
  }
}

// ============ CHATBOT (simple) ============
function getChatResponseKey(input){
  var responses={
    'product':'We offer BOPP, BOPET, CPP, POF, PVDC coating films and more. Visit our Products page for details! 欢迎查看产品页面了解更多！',
    'price':'Pricing depends on specification and quantity. Contact us for a quote! 请联系我们获取报价！',
    'spec':'You can find technical specifications on our Specs page. 请查看技术规格页面。',
    'order':'Lead time is typically 2-4 weeks. Contact us for details. 通常2-4周交货，请联系确认。',
    'contact':'Email: sale@boppfilmsale.com | WhatsApp: +86 18919659471 | Address: Hefei, Anhui, China'
  };
  var key=input.toLowerCase();
  if(key.indexOf('product')>-1||key.indexOf('产品')>-1)return responses.product;
  if(key.indexOf('price')>-1||key.indexOf('价格')>-1||key.indexOf('报价')>-1)return responses.price;
  if(key.indexOf('spec')>-1||key.indexOf('规格')>-1||key.indexOf('技术')>-1)return responses.spec;
  if(key.indexOf('order')>-1||key.indexOf('订购')>-1||key.indexOf('交期')>-1)return responses.order;
  if(key.indexOf('contact')>-1||key.indexOf('联系')>-1)return responses.contact;
  return 'Thank you for your enquiry! Please email sale@boppfilmsale.com for more details. 感谢您的询盘，请发送邮件至 sale@boppfilmsale.com';
}

function sendMessage(){
  var input=document.getElementById('chatInput');
  if(!input)return;
  var msg=input.value.trim();
  if(!msg)return;
  var panel=document.getElementById('chatPanel');
  if(!panel)return;
  var div=document.createElement('div');
  div.className='chat-msg user';
  div.innerHTML='<div class="chat-avatar">👤</div><div class="chat-bubble">'+msg+'</div>';
  panel.appendChild(div);
  input.value='';
  setTimeout(function(){
    var reply=document.createElement('div');
    reply.className='chat-msg bot';
    reply.innerHTML='<div class="chat-avatar">🤖</div><div class="chat-bubble">'+getChatResponseKey(msg)+'</div>';
    panel.appendChild(reply);
    panel.scrollTop=panel.scrollHeight;
  },600);
  panel.scrollTop=panel.scrollHeight;
}

function askQuestion(type){
  var input=document.getElementById('chatInput');
  if(input){
    input.value=type;
    sendMessage();
  }
}

// ========== CHAT WIDGET ==========
function toggleChat(){
  var panel=document.getElementById('chatPanel');
  if(!panel)return;
  if(panel.classList.contains('open')){
    panel.classList.remove('open');
    document.body.style.overflow='';
  }else{
    panel.classList.add('open');
    document.body.style.overflow='hidden';
    document.getElementById('chatInput').focus();
  }
}

function sendChat(){
  var input=document.getElementById('chatInput');
  var body=document.getElementById('chatBody');
  if(!input||!body)return;
  var msg=input.value.trim();
  if(!msg)return;
  // Add user message
  var div=document.createElement('div');
  div.className='chat-msg user';
  div.innerHTML='<div class="chat-bubble">'+msg+'</div>';
  body.appendChild(div);
  input.value='';
  body.scrollTop=body.scrollHeight;
  // Bot response
  setTimeout(function(){
    var reply=document.createElement('div');
    reply.className='chat-msg bot';
    var response=getChatResponse(msg);
    reply.innerHTML='<div class="chat-bubble">'+response+'</div>';
    body.appendChild(reply);
    body.scrollTop=body.scrollHeight;
  },800);
}

function sendQuick(type){
  var input=document.getElementById('chatInput');
  if(!input)return;
  input.value=type;
  sendChat();
}

function getChatResponse(input){
  var responses={
    'product':'We offer BOPP, BOPET, CPP, POF, PVDC coating films and more. Visit our Products page for details! 欢迎查看产品页面了解更多！',
    'price':'Pricing depends on specification and quantity. Contact us for a quote! 请联系我们获取报价！',
    'spec':'You can find technical specifications on our Specs page. 请查看技术规格页面。',
    'order':'Lead time is typically 2-4 weeks. Contact us for details. 通常2-4周交货，请联系确认。',
    'contact':'Email: sale@boppfilmsale.com | WhatsApp: +86 18919659471 | Address: Hefei, Anhui, China'
  };
  var key=input.toLowerCase();
  if(key.indexOf('product')>-1||key.indexOf('产品')>-1)return responses.product;
  if(key.indexOf('price')>-1||key.indexOf('价格')>-1||key.indexOf('报价')>-1)return responses.price;
  if(key.indexOf('spec')>-1||key.indexOf('规格')>-1||key.indexOf('技术')>-1)return responses.spec;
  if(key.indexOf('order')>-1||key.indexOf('订购')>-1||key.indexOf('交期')>-1)return responses.order;
  if(key.indexOf('contact')>-1||key.indexOf('联系')>-1)return responses.contact;
  return 'Thank you for your enquiry! Please email sale@boppfilmsale.com for more details. 感谢您的询盘，请发送邮件至 sale@boppfilmsale.com 了解更多。';
}

// Close chat panel when clicking outside
document.addEventListener('click',function(e){
  var panel=document.getElementById('chatPanel');
  var toggle=document.querySelector('.chat-toggle');
  if(panel&&!panel.contains(e.target)&&!toggle.contains(e.target)){
    panel.classList.remove('open');
  }
});
