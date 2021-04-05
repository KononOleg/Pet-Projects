
const piano = document.querySelector('.piano');
const pianoKey = document.querySelectorAll('.piano__key');
let flag=false;

piano.addEventListener('mousedown', (event) =>{
    if(!flag && !event.target.classList.contains("active"))
    {
      flag=true;
      playAudio(event)
      pianoKey.forEach(key =>key.addEventListener('mouseover', playAudio));
      pianoKey.forEach(key =>key.addEventListener('mouseout',classList))
    }
 });

window.addEventListener('mouseup', (event) =>{
  if(flag)
  {  
    pianoKey.forEach(key =>key.removeEventListener('mouseover', playAudio));
    pianoKey.forEach(key =>key.removeEventListener('mouseout',classList)) 
    classList(event);
    flag=false;
  }
    
});

function classList(event)
{
   if(event.target.classList.contains("active"))
    event.target.classList.remove("active")
  else
    event.target.classList.add("active")
}

function playAudio(event) 
{
   classList(event);
   const note = event.target.dataset.note;
   const audio = new Audio();
   audio.src = `assets/audio/${note}.mp3`;;
   audio.currentTime = 0;
   audio.play();
 }

 const bnt__letters = document.querySelector('.bnt-letters');
 bnt__letters.addEventListener('click', (event)=>{
 
   pianoKey.forEach(key =>key.classList.add("piano__key__letter"));
   bnt__notes.classList.remove("btn-active");
   bnt__letters.classList.add("btn-active");
 });


 const bnt__notes = document.querySelector('.bnt-notes');
 bnt__notes.addEventListener('click', event=>{

   pianoKey.forEach(key =>key.classList.remove("piano__key__letter"));
   bnt__notes.classList.add("btn-active");
   bnt__letters.classList.remove("btn-active");
 });


 const bnt__fullscreen = document.querySelector('.bnt__fullscreen');
 bnt__fullscreen.addEventListener('click', event =>{

  if (document.fullscreenElement)  document.exitFullscreen(); 
    else  document.documentElement.requestFullscreen();
      
    
 });

 document.addEventListener('fullscreenchange', (event) => {

  if (document.fullscreenElement) bnt__fullscreen.classList.add("fullscreen"); 
  else bnt__fullscreen.classList.remove("fullscreen") 
});

 window.addEventListener('keydown', event => {
   if(event.repeat) return;
      let key =event.code;
      key =key.charAt(key.length-1)
     const letter = document.querySelector(`[data-letter = "${key}"]`);
      if(letter==null) return;
      if(flag) return;
    
      letter.classList.add("active")  
     const audio = new Audio();
     audio.src = `assets/audio/${letter.dataset.note}.mp3`;;
     audio.currentTime = 0;
     audio.play();

 });


 window.addEventListener('keyup', event => {
    let key =event.code;
    key =key.charAt(key.length-1)
    const letter = document.querySelector(`[data-letter = "${key}"]`);
    if(letter==null) return;
    if(flag) return;
    letter.classList.remove("active")
});
