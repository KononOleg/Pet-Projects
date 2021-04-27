const inputs = document.querySelectorAll(".filters input")

function handleUpdate(){
    this.nextElementSibling.value=this.value
    const suffix=this.dataset.sizing || ''
    document.documentElement.style.setProperty(`--${this.name}`,this.value + suffix)
}

inputs.forEach(input=>input.addEventListener("input",handleUpdate))

let inputBlur;
inputs.forEach(element => {
  if(element.name==="blur") inputBlur=element;
 });

 const buttons = document.querySelectorAll(".btn-container button")

 buttons.forEach(input=>input.addEventListener("mousedown",(event)=>{
        buttons.forEach(button=>button.classList.remove("btn-active"))
        event.target.classList.add("btn-active")
 }))


const images = ["01.jpg", '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

const image = document.querySelector('.editor img');
const btnnext = document.querySelector('.btn-next');
let base;
const morning = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/';
const day = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/';
const evening = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/';
const night = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/';

function viewBgImage(src) { 

  const img = new Image();
  img.src = src;
  img.onload = () => {      
    image.src = src;
  }; 
}

function getImage() {
  let date = new Date()
  let hours = date.getHours();

  if(hours>=6 && hours<12) base=morning;
  if(hours>=12 && hours<18) base=day;
  if(hours>=18 && hours<24) base=evening;
  if(hours>=0 && hours<6) base=night;

  const index = i % images.length;
  const imageSrc = base + images[index];
  viewBgImage(imageSrc);
  i++;
  btnnext.disabled = true;
  setTimeout(function() { btnnext.disabled = false }, 1000);
} 
btnnext.addEventListener('click', getImage);


const fileInput = document.querySelector('input[type="file"]');

fileInput.addEventListener('change', function(event) {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    image.src = img.src;
  }
  reader.readAsDataURL(file);
  event.target.value="";
});


const btnReset = document.querySelector(".btn-reset");

btnReset.addEventListener('click', () => {

        inputs.forEach(input=>{
            let x =input.defaultValue;
            input.value=x;
            input.nextElementSibling.value=x;
            const suffix=input.dataset.sizing || '';
            document.documentElement.style.setProperty(`--${input.name}`, x + suffix)
        })
});


const canvas = document.querySelector('canvas');
const btnSave = document.querySelector(".btn-save");
btnSave.addEventListener("click",download)

function download() {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous'); 
  img.src = image.src;
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;

    let coef;
      coef=(img.height/image.height)*inputBlur.value;

    const ctx = canvas.getContext("2d");

    ctx.filter=("blur("+ coef+"px)"+
                "invert("+ getComputedStyle(image).getPropertyValue("--invert")+")"+
                "sepia("+ getComputedStyle(image).getPropertyValue("--sepia")+")"+
                "saturate("+ getComputedStyle(image).getPropertyValue("--saturate")+")"+
                "hue-rotate("+ getComputedStyle(image).getPropertyValue("--hue")+")")
    ctx.drawImage(img, 0, 0);

    var link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;  
  };  
}



const bnt__fullscreen = document.querySelector('.fullscreen');
bnt__fullscreen.addEventListener('click', event =>{

 if (document.fullscreenElement)  document.exitFullscreen(); 
   else  document.documentElement.requestFullscreen(); 
});


document.addEventListener('fullscreenchange', (event) => {

  if (document.fullscreenElement) bnt__fullscreen.classList.add(":-webkit-full-screen .fullscreen"); 
  else bnt__fullscreen.classList.remove(":-webkit-full-screen .fullscreen") 
});
