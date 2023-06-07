const ColorPickerEl = document.querySelector("#color-picker");
const SchemeSelectEl = document.querySelector("#scheme-select");
const RandomSchemeBtn = document.querySelector("#random-scheme");
const colorsContainerEl = document.querySelector("#colors-container");
const messageEl = document.querySelector("#message");
const baseUrl = "https://www.thecolorapi.com"
let selectedColorValue = ""
let selectedScheme = ""
let colorsArray = []

// Render the color schemes from the array
function render() {
    let schemes = ["monochrome", "monochrome-dark", "monochrome-light", "analogic", "complement", "analogic-complement", "triad", "quad"]
    let schemesHtml = "";
    for(let scheme in schemes){
        
        schemesHtml += `
            <option value="${schemes[scheme]}" data-${schemes[scheme]}>${schemes[scheme]}</option>`        
    }
    SchemeSelectEl.innerHTML = schemesHtml;   
}

async function loadColors() {
    getColorValues()
    const URL = `https://www.thecolorapi.com/scheme?hex=${selectedColorValue}&mode=${selectedScheme}&count=5`;

    const response = await fetch(URL)        
    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json()
    renderColorsHtml(data)
}

function renderColorsHtml(data){
    data.colors.map((color) => {
        console.log(color)
        colorsArray.unshift(color.hex.value)        
    })
    
        let colorHTML = colorsArray.map((color) => `
            <div onclick="copyToClip('${color}')"  class="color-section-container">
                <div class="color-section" style="background-color: ${color}"></div>
                <p class="hex-value"> ${color}</p>
            </div> 
        `        
        ).join('')
        colorsContainerEl.innerHTML = colorHTML
        ColorPickerEl.value = "#e66465"
        colorsArray = []
}

function getColorValues() {
    // using slice(1) to remove "#" from the color value
    selectedColorValue = ColorPickerEl.value.slice(1)
    selectedScheme = SchemeSelectEl.value
}

function randomColors() {
     // get random color value
     const color = Math.floor(Math.random()*16777215).toString(16);
     selectedColorValue = color;
     ColorPickerEl.value = `#${color}`
     // loadColors will now load with updated random color value
     loadColors()
}

RandomSchemeBtn.addEventListener("click", randomColors)
SchemeSelectEl.addEventListener("change", loadColors)

function copyToClip(color) {
    navigator.clipboard.writeText(color)
    messageEl.innerHTML=`${color} Copied`
    messageEl.style.display='block'
    setTimeout(()=>{
        messageEl.style.display='none'
    },1700)
}

render()
