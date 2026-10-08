(() => {
  const byId = (id) => document.getElementById(id);
  const navToggle = byId('navToggle');
  const mobileNav = byId('mobileNav');
  const setMenu = (open) => {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !open;
  };
  navToggle.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) setMenu(false); });

  const slides = [
    {src:'assets/issue-open.webp',alt:'Conceptual open interior spread'},
    {src:'assets/actual-issue1.webp',alt:'Real physical copy of the previous issue, Issue 01'},
    {src:'assets/closeup-pages.webp',alt:'Editorial photography and page design concept'}
  ];
  let index = 0;
  const main = byId('galleryMain'); const count = byId('galleryCount');
  const thumbs = Array.from(document.querySelectorAll('.thumb'));
  function showSlide(next) {
    index = (next + slides.length) % slides.length;
    main.classList.add('transitioning');
    window.setTimeout(() => {
      main.src=slides[index].src; main.alt=slides[index].alt;
      count.textContent=String(index+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
      thumbs.forEach((btn,n)=>{const active=n===index;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active))});
      main.classList.remove('transitioning');
    },130);
  }
  byId('galleryPrev').addEventListener('click', () => showSlide(index-1));
  byId('galleryNext').addEventListener('click', () => showSlide(index+1));
  thumbs.forEach(btn=>btn.addEventListener('click',()=>showSlide(Number(btn.dataset.slide))));

  const dialog = byId('checkoutDialog');
  document.querySelectorAll('[data-checkout]').forEach(button => button.addEventListener('click',()=>dialog.showModal()));
  byId('dialogClose').addEventListener('click',()=>dialog.close());
  byId('dialogDone').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',(e)=>{if(e.target===dialog)dialog.close()});
  const videoDialog=byId('videoDialog');
  byId('filmButton').addEventListener('click',()=>videoDialog.showModal());
  byId('videoClose').addEventListener('click',()=>videoDialog.close());
  byId('videoDone').addEventListener('click',()=>videoDialog.close());
  videoDialog.addEventListener('click',(e)=>{if(e.target===videoDialog)videoDialog.close()});

  const progress=byId('scrollProgress');
  let scheduled=false;
  function updateProgress(){const range=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(range>0?Math.min(100,window.scrollY/range*100):0)+'%';scheduled=false;}
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress)}},{passive:true});
  updateProgress();
  if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer=new IntersectionObserver((entries)=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}},{threshold:.08,rootMargin:'0px 0px -28px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
})();
