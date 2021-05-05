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

const map_button = document.querySelector('.map__button');

function goToPage()
{
    if(currentAnimal!=null)
    document.location.href= "../zoos/"+currentAnimal+"/"+currentAnimal+".html"
}
map_button.addEventListener("mousedown", goToPage)


const pets_input = document.querySelector('.map__progress-bar input'),
pets_output = document.querySelector('.map__progress-bar output'),
pets_slider = document.querySelector(".slider__wrapper"),
pets_carousel = document.querySelector(".slider__wrapper"),
pets_content = document.querySelector(".slider__inner"),
pet = document.querySelectorAll(".slider__inner .pet"),
pets_bnt_left = document.querySelector('.pet__arrow .arrow_left'),
pets_bnt_right = document.querySelector('.pet__arrow .arrow_right'),
pets_wrapper = document.querySelector('.slider__wrapper'),
pets_placeholder = document.querySelectorAll('.geogr-map__placeholder');
let currentIndex=2,lastIndex,firstIndex=1;
let petArr = Array.prototype.slice.call(pet);
let placeholderArr = Array.prototype.slice.call(pets_placeholder);
let  translate=0, currentAnimal="Panda";


function mapSlider(dir){

    let  width  = Math.min(Number.parseInt(getComputedStyle( petArr[0]).width) + Number.parseInt(getComputedStyle( petArr[0]).marginLeft)+Number.parseInt(getComputedStyle( petArr[0]).marginRight),Number.parseInt(getComputedStyle( petArr[petArr.length-1]).width) + Number.parseInt(getComputedStyle( petArr[petArr.length-1]).marginLeft)+Number.parseInt(getComputedStyle( petArr[petArr.length-1]).marginRight));
    let countActiveElements=Math.floor((Number.parseInt(getComputedStyle(pets_slider).width))/(width));
    if(lastIndex===undefined){
        lastIndex=countActiveElements;
    }
    if(dir!==undefined){
        if(dir=="left") 
        {
            if(pets_input.value==1){
                pets_input.value=petArr.length
                lastIndex=petArr.length+1;
                firstIndex=lastIndex-countActiveElements;
                translate =-1*(width)*(lastIndex-countActiveElements-1);
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

    
    
    petArr[currentIndex-1].classList.remove("pet_active");
    petArr[pets_input.value-1].classList.add("pet_active");
    currentAnimal=null
    placeholderArr.forEach(element => {
        if(element.title==petArr[pets_input.value-1].title){
            placeholderArr.forEach(element => {
                element.classList.remove("placeholder_active")
            
            });
            element.classList.add("placeholder_active")
            currentAnimal=element.title;
           
        }
        else {element.classList.remove("placeholder_active"); }

    });
    if(pets_input.value>lastIndex || pets_input.value<firstIndex)
    { 
        let direction=pets_input.value>lastIndex?-1:1;
        let step =Math.min(Math.abs(pets_input.value-lastIndex),Math.abs(pets_input.value-firstIndex))
        translate +=direction*(width)*step;
        pets_content.style.transform = `translateX(${translate}px)`;
        if(pets_input.value-currentIndex>=1) {lastIndex=Number.parseInt(pets_input.value);  firstIndex=Number.parseInt(pets_input.value)-countActiveElements+1;}
        else {lastIndex=Number.parseInt(pets_input.value)+countActiveElements-1;     firstIndex=Number.parseInt(pets_input.value);}
    }

    currentIndex=Number.parseInt(pets_input.value);
    console.log( currentAnimal)
}
pets_bnt_left.addEventListener("mousedown",()=>mapSlider("left"));
pets_bnt_right.addEventListener("mousedown",()=>mapSlider("right"));
pets_input.addEventListener("input",()=>mapSlider());

pets_placeholder.forEach(element=>element.addEventListener("mousedown",()=>{
    for(i=0;i<petArr.length;i++){
        if(element.title==petArr[i].title){
            pets_input.value=i+1;
            mapSlider();   
        }
    }
}))

pet.forEach(element=>element.addEventListener("mousedown",()=>{
            for(i=0;i<petArr.length;i++){
                if(petArr[i]==element){
                   pets_input.value=i+1;
                   mapSlider();
                }
            }
}))





let resizeTimer;

window.onresize=function()
{
    if(resizeTimer){
        clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(function() {
        
        let  width  = Number.parseInt(getComputedStyle( petArr[0]).width) + Number.parseInt(getComputedStyle( petArr[0]).marginLeft)+Number.parseInt(getComputedStyle( petArr[0]).marginRight);
        let countActiveElements=Math.min(Math.floor((Number.parseInt(getComputedStyle(pets_slider).width))/(width)),Math.floor((Number.parseInt(getComputedStyle(pets_wrapper).width))/(width)));
        if(pets_input.value<countActiveElements){
            
            pets_content.style.transform = `translateX(${0}px)`;
            lastIndex=countActiveElements;
            firstIndex=1 
        }
       
        else if(pets_input.value > petArr.length-countActiveElements){
            translate=-1*(width)*(petArr.length-countActiveElements);
            pets_content.style.transform = `translateX(${translate}px)`;
            firstIndex=petArr.length-countActiveElements+1;
            lastIndex=8;
        }
        
        else{
            translate=-1*(width)*(pets_input.value-countActiveElements);
              pets_content.style.transform = `translateX(${translate}px)`;
              firstIndex=Number.parseInt(pets_input.value)-countActiveElements+1
              lastIndex=Number.parseInt(pets_input.value);
        }

        resizeTimer = null;
        },400);
    };