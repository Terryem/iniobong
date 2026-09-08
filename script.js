

  document.getElementById('year').textContent = new Date().getFullYear();

  // nav theme swap once we cross into the page sections
  const nav = document.getElementById('mainNav');
  const pageStart = document.getElementById('page');
  const navObserver = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.boundingClientRect.top < 0){ nav.classList.add('on-page'); }
      else{ nav.classList.remove('on-page'); }
    });
  }, {threshold:0, rootMargin:"-1px 0px 0px 0px"});
  navObserver.observe(pageStart);

  // fade-in on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); } });
  }, {threshold:0.12});
  document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));
