const brightness = document.getElementById("brightness");
const saturation = document.getElementById("saturation");
const inversion = document.getElementById("inversion");
const grayscale = document.getElementById("grayscale");
const slider = document.querySelector(".slider > input");
const reset = document.querySelector(".reset-filter");
const choose = document.querySelector(".choose-img");
const save = document.querySelector(".save-img");
var image = document.querySelector(".preview-img img");
var inpFile = document.querySelector(".file-input");
var filterOptions = document.querySelector(".filter .options");
var nam = document.querySelector(".slider > .filter-info > .name");
var val = document.querySelector(".slider > .filter-info > .value");
const blur = document.getElementById('blur');
const rotate = document.getElementById('rotate');
const sepia = document.getElementById('sepia');
const flip = document.getElementById('flip');

var selected = brightness;

const wrapper = document.querySelector('.wrapper input');
wrapper.setAttribute('disabled', 'disabled');
blur.setAttribute('disabled', 'disabled');
rotate.setAttribute('disabled', 'disabled');
sepia.setAttribute('disabled', 'disabled');
flip.setAttribute('disabled', 'disabled');
save.disabled = true;
save.style.cursor = "not-allowed";

var bright=100, satur=100, inver=0, gray=0;
var blurVal=0, rotateVal=0, sepiaVal=0, flipVal=1;

choose.addEventListener('click', ()=>{
    inpFile.click();
})
const load = (event)=>{
    console.log("loaded")
    image.src = URL.createObjectURL(event.target.files[0]);
    wrapper.removeAttribute('disabled');
    blur.removeAttribute('disabled');
    rotate.removeAttribute('disabled');
    sepia.removeAttribute('disabled');
    flip.removeAttribute('disabled');
    save.disabled = false;
    save.style.cursor = "pointer";
}
inpFile.addEventListener('change', load);

const filterApply = ()=>{
    image.style.filter = `brightness(${bright}%) blur(${blurVal}px) saturate(${satur}%) invert(${inver}%) sepia(${sepiaVal}%) grayscale(${gray}%)`;
    image.style.transform = `rotate(${rotateVal*10}deg) scaleX(${flipVal})`;
}

// save.addEventListener('click', () => {
//     var element = document.createElement('a');
//     const url = URL.createObjectURL(image.src);
//     element.setAttribute('href', url);
//     element.setAttribute('download', "myImage.jpg");
//     document.body.appendChild(element);
//     element.click();
// })

const changeNameValue = ()=>{
    nam.innerHTML = selected.innerHTML;
    if(selected == brightness){
        val.innerHTML = bright + "%" 
        slider.value = bright;
    }
    if(selected == saturation){
        val.innerHTML = satur + "%" 
        slider.value = satur;
    }
    if(selected == inversion){
        val.innerHTML = inver + "%" 
        slider.value = inver;
    }
    if(selected == grayscale){
        val.innerHTML = gray + "%" 
        slider.value = gray;
    }
}

const active = ()=>{
    saturation.removeAttribute('class');
    inversion.removeAttribute('class');
    grayscale.removeAttribute('class');
    brightness.removeAttribute('class');
    selected.setAttribute('class', 'active');
}

brightness.addEventListener('click', ()=>{
    selected = brightness;
    slider.setAttribute('max', '200');
    active();
    changeNameValue();
})
saturation.addEventListener('click', ()=>{
    selected = saturation;
    slider.setAttribute('max', '200');
    active();
    changeNameValue();
})
inversion.addEventListener('click', ()=>{
    selected = inversion;
    slider.setAttribute('max', '100');
    active();
    changeNameValue();
})
grayscale.addEventListener('click', ()=>{
    selected = grayscale;
    slider.setAttribute('max', '100');
    active();
    changeNameValue();
})
brightness.click();


slider.addEventListener('change', ()=>{
    if(selected == brightness){
        bright = slider.value;
        val.value = bright;
        // slider.setAttribute('max', '200');
        // image.style.filter = `brightness(${bright}%)`;
        filterApply();
        selected.click();
    }
    if(selected == saturation){
        satur = slider.value;
        val.value = satur;
        // slider.setAttribute('max', '200');
        // image.style.filter = `saturate(${satur}%)`;
        filterApply();
        selected.click();
    }
    if(selected == inversion){
        inver = slider.value;
        val.value = inver;
        // slider.setAttribute('max', '100');
        // image.style.filter = `invert(${inver}%)`;
        filterApply();
        selected.click();
    }
    if(selected == grayscale){
        gray = slider.value;
        val.value = gray;
        // slider.setAttribute('max', '100');
        // image.style.filter = `grayscale(${gray}%)`;
        filterApply();
        selected.click();
    }
})

                // From here functionality of Rotate starts

// var blurVal=0, rotateVal=0, sepiaVal=0, flipVal=0;
blur.addEventListener('change', ()=>{
    blurVal = blur.value;
    document.getElementById('blurVal').innerHTML = blurVal;
    document.getElementById('blurVal').click();
    // image.style.filter = `blur(${blurVal}px)`;
    filterApply();
    // console.log(blurVal)
})
rotate.addEventListener('change', ()=>{
    rotateVal = rotate.value;
    document.getElementById('rotateVal').innerHTML = rotateVal*10;
    // image.style.transform = `rotate(${rotateVal*10}deg)`;
    filterApply();
    // console.log(rotateVal)
})
sepia.addEventListener('change', ()=>{
    sepiaVal = sepia.value;
    document.getElementById('sepiaVal').innerHTML = sepiaVal;
    // image.style.filter = `sepia(${sepiaVal}%)`;
    filterApply();
    // console.log(sepiaVal)
})
flip.addEventListener('change', ()=>{
    if(flip.value != 0)
        flipVal = flip.value;
    document.getElementById('flipVal').innerHTML = flipVal;
    // image.style.transform = `scaleX(${flipVal})`;
    filterApply();
    // console.log(flipVal)
})

reset.addEventListener('click', ()=> {
    bright=100;satur=100; inver=0; gray=0;
    blurVal=0, rotateVal=0, sepiaVal=0, flipVal=1;
    saturation.click();
    slider.click();
    inversion.click();
    slider.click();
    grayscale.click();
    slider.click();
    brightness.click();
    slider.click();

    blur.value = 0; document.getElementById('blurVal').innerHTML = 0; 
    rotate.value = 0; document.getElementById('rotateVal').innerHTML = 0;
    sepia.value = 0; document.getElementById('sepiaVal').innerHTML = 0;
    flip.value = 0; document.getElementById('flipVal').innerHTML = 0;

    image.style.filter = `brightness(${bright}%) blur(${blurVal}px) saturate(${satur}%) invert(${inver}%) sepia(${sepiaVal}%) grayscale(${gray}%)`;
    image.style.transform = `rotate(${rotateVal*10}deg) scaleX(${flipVal})`;
})

save.addEventListener('click', () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    
    ctx.filter = `blur(${blurVal}px) brightness(${bright}%) sepia(${sepiaVal}%) saturate(${satur}%) invert(${inver}%) grayscale(${gray}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotateVal*10);
    }
    ctx.scale(flipVal, 1);
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
});




