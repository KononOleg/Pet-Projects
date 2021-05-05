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
    if(this.checked){
        document.body.style.overflow="hidden"
    }
    else{
        document.body.style.overflow="visible"
    }
});


const watch_input = document.querySelector('.watch-online__progress-bar input'),
watch_output = document.querySelector('.watch-online__progress-bar output'),
watch_carousel = document.querySelector(".watch-online__slider-wrapper"),
card  = document.querySelectorAll(".watch-online__slider-wrapper .pet");
let cardArr = Array.prototype.slice.call(card), currIndex=2;

function watchSlider(index){
    if(index!==event){
        watch_input.value=index+1;
    }

    watch_output.innerHTML="0"+watch_input.value+"/";

    cardArr[currIndex-1].classList.remove("pet_active");

    let  width  = Math.min(Number.parseInt(getComputedStyle(cardArr[0]).width),Number.parseInt(getComputedStyle(cardArr[cardArr.length-1]).width)),
    
    gap =Number.parseInt(getComputedStyle(watch_carousel).gap);
    watch_carousel.style.transform = `translateX(${(-1*(width + gap )*(watch_input.value-2))}px)`;
  
    cardArr[watch_input.value-1].classList.add("pet_active");
    currIndex=watch_input.value;
}

watch_input.addEventListener("input",watchSlider);
card.forEach(card=>card.addEventListener("mousedown",(event)=>{
    for (let i = 0; i < cardArr.length; i++) {
        if(event.target===cardArr[i]) watchSlider(i);  
      }
}))


const works_input = document.querySelector('.how-it-works__progress-bar input'),
works_output = document.querySelector('.how-it-works__progress-bar output'),
works_carousel = document.querySelector(".how-it-works-slider__wripper");

function worksSlider(){
    works_output.innerHTML="0"+works_input.value+"/";
    works_carousel.style.transform = `translateX(${-100*(works_input.value-1)}%)`;
    
}

works_input.addEventListener("input",worksSlider);



const pets_input = document.querySelector('.pets_progress-bar input'),
pets_output = document.querySelector('.pets_progress-bar output'),
pets_slider = document.querySelector(".pets__slider"),
pets_carousel = document.querySelector(".pets__slider-wrapper"),
pets_content = document.querySelector(".pets-slider__inner"),
pet = document.querySelectorAll(".pets-slider__inner .pets__pet"),
pets_bnt_left = document.querySelector('.pets__arrow .arrow_left'),
pets_bnt_right = document.querySelector('.pets__arrow .arrow_right'),
pets_wrapper = document.querySelector('.pets__wrapper');
let currentIndex=1,lastIndex,firstIndex=1;
let petArr = Array.prototype.slice.call(pet);
let  translate=0;


function petsSlider(dir){

    let  width  = Number.parseInt(getComputedStyle( petArr[0]).width),
    gap =Number.parseInt(getComputedStyle(pets_content).gap);
    let countActiveElements=Math.min(Math.floor((Number.parseInt(getComputedStyle(pets_slider).width)+gap)/(width+gap)),Math.floor((Number.parseInt(getComputedStyle(pets_wrapper).width)+gap)/(width+gap)));
    if(lastIndex===undefined){
        lastIndex=countActiveElements;
    }
    
    if(dir!==undefined){
        if(dir=="left") 
        {
            if(pets_input.value==1){
                pets_input.value=8
                lastIndex=petArr.length+1;
                firstIndex=lastIndex-countActiveElements;
                translate =-1*(width + gap)*countActiveElements;
                pets_content.style.transform = `translateX(${translate}px)`;
            }
            else

            pets_input.value--;
        }
        else if(pets_input.value==8)
        {
            pets_input.value=0
            lastIndex=countActiveElements;
            firstIndex=1;
            translate =0;
            pets_content.style.transform = `translateX(${translate}px)`;
        }
        else pets_input.value++;
    }

    pets_output.innerHTML="0"+pets_input.value+"/";

    
    petArr[pets_input.value-1].classList.add("pets__pet_active");
    petArr[currentIndex-1].classList.remove("pets__pet_active");


    if(pets_input.value>lastIndex || pets_input.value<firstIndex)
    {   
        let direction=pets_input.value>lastIndex?-1:1;
        let step =Math.min(Math.abs(pets_input.value-lastIndex),Math.abs(pets_input.value-firstIndex))
        translate +=direction*(width + gap)*step;
        pets_content.style.transform = `translateX(${translate}px)`;
        if(pets_input.value-currentIndex>=1) {lastIndex=Number.parseInt(pets_input.value);  firstIndex=Number.parseInt(pets_input.value)-countActiveElements+1;}
        else {lastIndex=Number.parseInt(pets_input.value)+countActiveElements-1;     firstIndex=Number.parseInt(pets_input.value);}
    }

    currentIndex=pets_input.value;
}
pets_bnt_left.addEventListener("mousedown",()=>petsSlider("left"));
pets_bnt_right.addEventListener("mousedown",()=>petsSlider("right"));
pets_input.addEventListener("input",()=>petsSlider());










const testimonials_input = document.querySelector('.testimonials__progress-bar input'),
testimonials_output = document.querySelector('.testimonials__progress-bar output'),
testimonials_carousel = document.querySelector(".testimonials-slider__inner"),
testimonial = document.querySelector(".testimonials-slider__inner .testimonial"),
testimonials_bnt_left = document.querySelector('.testimonials__arrow .arrow_left'),
testimonials_bnt_right = document.querySelector('.testimonials__arrow .arrow_right')

let slides = document.querySelectorAll(".testimonial");
document.getElementsByClassName(".testimonial");

function testimonialsSlider(dir){

    let  width  = Number.parseInt(getComputedStyle(testimonial).width)+Number.parseInt(getComputedStyle(testimonial).paddingLeft)+Number.parseInt(getComputedStyle(testimonial).paddingRight),
    gap =Number.parseInt(getComputedStyle(testimonials_carousel).gap);
    let transform;

    if(dir!==undefined){

        if(dir=="left") {
            if(testimonials_input.value==1) transform=0;
            else {testimonials_input.value--;}
        }
        else{
            if(testimonials_input.value==8) transform=-1*(width + gap )*(9);
            else {testimonials_input.value++;}
        }
    } 

        testimonials_carousel.addEventListener("transitionend",()=>{

            if (transform==0)
            {
                testimonials_input.value=8;
                testimonials_carousel.style.transform = `translateX(${-1*(width + gap )*(8)}px)`;
                testimonials_carousel.style.transition="0s"
            }

            else if(transform==-1*(width + gap )*(9))
            {
                testimonials_input.value=1;
                testimonials_carousel.style.transform = `translateX(${-1*(width + gap )}px)`;
                testimonials_carousel.style.transition="0s"
            }

            transform=1;
            testimonials_output.innerHTML="0"+testimonials_input.value+"/";
        })
        transform=transform<=0?transform:(-1*(width + gap )*(testimonials_input.value))
        testimonials_carousel.style.transform = `translateX(${transform}px)`;
        testimonials_carousel.style.transition="0.3s linear"
        testimonials_output.innerHTML="0"+testimonials_input.value+"/";

}


testimonials_bnt_left.addEventListener("mousedown",()=>testimonialsSlider("left"));
testimonials_bnt_right.addEventListener("mousedown",()=>testimonialsSlider("right"));
testimonials_input.addEventListener("input",()=>testimonialsSlider());
testimonialsSlider();






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


let resizeTimer;

window.onresize=function()
{
    if(resizeTimer){
        clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(function() {
        
        let  width  = Number.parseInt(getComputedStyle( petArr[0]).width),
        gap =Number.parseInt(getComputedStyle(pets_content).gap);
        let countActiveElements=Math.min(Math.floor((Number.parseInt(getComputedStyle(pets_slider).width)+gap)/(width+gap)),Math.floor((Number.parseInt(getComputedStyle(pets_wrapper).width)+gap)/(width+gap)));
        if(pets_input.value<countActiveElements){
            
            pets_content.style.transform = `translateX(${0}px)`;
            lastIndex=countActiveElements;
            firstIndex=1 
        }
       
        else if(pets_input.value > petArr.length-countActiveElements){
            translate=-1*(width + gap)*(petArr.length-countActiveElements);
            pets_content.style.transform = `translateX(${translate}px)`;
            firstIndex=petArr.length-countActiveElements+1;
            lastIndex=8;
        }
        
        else{
            translate=-1*(width + gap)*(pets_input.value-countActiveElements);
              pets_content.style.transform = `translateX(${translate}px)`;
              firstIndex=Number.parseInt(pets_input.value)-countActiveElements+1
              lastIndex=Number.parseInt(pets_input.value);
        }

          width  = Number.parseInt(getComputedStyle(testimonial).width)+Number.parseInt(getComputedStyle(testimonial).paddingLeft)+Number.parseInt(getComputedStyle(testimonial).paddingRight),
        gap =Number.parseInt(getComputedStyle(testimonials_carousel).gap);
        testimonials_carousel.style.transform = `translateX(${-1*(width+gap)*testimonials_input.value}px)`;


        resizeTimer = null;
        },1100);
    };
