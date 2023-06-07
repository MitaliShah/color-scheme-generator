const ColorPickerEl = document.querySelector("#color-picker");
const SchemeSelectEl = document.querySelector("#scheme-select");
const RandomSchemeBtn = document.querySelector("#random-scheme");


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

render()
