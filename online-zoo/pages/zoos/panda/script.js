const themeSwitcher=document.querySelector(".header__switch input");


var themeColor = localStorage.getItem("themeColor");
if(themeColor==undefined) {localStorage.setItem("themeColor", "dark");}


if(localStorage.getItem('themeColor')=="dark")
{
    themeSwitcher.checked=true;
    document.documentElement.setAttribute("data-theme","dark")
    localStorage.setItem("themeColor", "dark");
}
else{
    themeSwitcher.checked=false;
    document.documentElement.setAttribute("data-theme","light")
    localStorage.setItem("themeColor", "light");
}


themeSwitcher.addEventListener("change",function(){
    if(this.checked){
        document.documentElement.setAttribute("data-theme","dark")
        localStorage.setItem("themeColor", "dark");
    }
    else{
       document.documentElement.setAttribute("data-theme","light")
       localStorage.setItem("themeColor", "light")
    }
});


const burger_toggle=document.getElementById("burger__toggle");

burger_toggle.addEventListener("change",function(){
    if(this.checked) document.body.style.overflow="hidden"
    else document.body.style.overflow="visible"
});


bnt_donate = document.querySelector('.button_donate')
popup = document.querySelector('.popup')
bnt_closePopup = document.querySelector('.popup__button_close')


bnt_donate.addEventListener("mousedown",()=>{
    document.body.style.overflow="hidden"
    popup.style.display="block";
})

bnt_closePopup.addEventListener("mousedown",()=>{
    popup.style.display="none";
    document.body.style.overflow="visible"
})







const switch1=document.getElementById("switch1"),
slider__videos = document.querySelector('.videos__inner');

switch1.addEventListener("change",()=>{
    slider__videos.style.transform="translateX(0px)";
})

const switch2=document.getElementById("switch2");
switch2.addEventListener("change",()=>{
    slider__videos.style.transform=`translateX(${-Number.parseInt(getComputedStyle(slider__videos).width)-Number.parseInt(getComputedStyle(slider__videos).gap)}px)`;
})

const switch3=document.getElementById("switch3");
switch3.addEventListener("change",()=>{
    slider__videos.style.transform=`translateX(${-2*Number.parseInt(getComputedStyle(slider__videos).width)-2*Number.parseInt(getComputedStyle(slider__videos).gap)}px)`;
})

const pet = document.querySelectorAll(".videos__inner .slider__video");
const iframe = document.querySelector("iframe");
const zoo_title = document.querySelector(".zoo__title");

pet.forEach(element=>element.addEventListener("mousedown",()=>{
    iframe.src="https://www.youtube.com/embed/"+element.dataset.embed;
    element.lastElementChild.src="http://i1.ytimg.com/vi/"+iframe.dataset.embed+"/maxresdefault.jpg"

    let tmp=element.dataset.embed;
    element.dataset.embed=iframe.dataset.embed;
    iframe.dataset.embed=tmp;

    tmp=element.title;
    element.title=iframe.title;
    iframe.title=tmp;

    zoo_title.innerHTML=iframe.title;

}))