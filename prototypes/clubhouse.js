// A home-plate photo frame over the facility's own background film.
let photoTimer;
function setupClubhouse(){
  clearInterval(photoTimer);
  const hero=document.querySelector('.hero');
  if(!hero)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  hero.classList.add('home-plate-hero');
  const video=document.createElement('video');
  video.className='facility-film';video.muted=true;video.loop=true;video.playsInline=true;video.preload='metadata';video.poster='assets/facility.jpg';video.setAttribute('aria-hidden','true');
  video.src='assets/facility-preview.mp4';hero.prepend(video);
  const frame=hero.querySelector('figure');frame.classList.add('home-plate');
  frame.innerHTML='<img class="plate-photo visible" src="assets/facility.jpg" alt="Players practicing together at Elite Performance Center"><img class="plate-photo" src="assets/training.jpg" alt="Inside the Elite baseball and softball training facility">';
  const controls=document.createElement('div');controls.className='scene-controls';
  controls.innerHTML='<button type="button" class="scene-pause"></button><button type="button" class="scene-next">Next photo <span aria-hidden="true">›</span></button>';
  hero.append(controls);
  const pause=controls.querySelector('.scene-pause');let paused=reduced;let index=0;
  function next(){index=(index+1)%2;frame.querySelectorAll('img').forEach((img,i)=>img.classList.toggle('visible',i===index));}
  function update(){pause.textContent=paused?'Play background':'Pause motion';pause.setAttribute('aria-pressed',String(paused));clearInterval(photoTimer);if(paused){video.pause();}else{video.play().catch(()=>{paused=true;pause.textContent='Play background';pause.setAttribute('aria-pressed','true');clearInterval(photoTimer);});photoTimer=setInterval(next,6500);}}
  pause.onclick=()=>{paused=!paused;update();};controls.querySelector('.scene-next').onclick=()=>{next();if(!paused){clearInterval(photoTimer);photoTimer=setInterval(next,6500);}};
  update();
}
setupClubhouse();window.addEventListener('hashchange',setupClubhouse);
