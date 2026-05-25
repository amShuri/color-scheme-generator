import { modes } from './modes.js'

const url = 'https://www.thecolorapi.com/scheme'
const colorCount = 5

const colorInput = document.getElementById('color-input')
const schemeSelect = document.getElementById('scheme-select')
const paletteColors = document.querySelectorAll('.palette-color')
const paletteButtons = document.querySelectorAll('.palette-color > button')

document.getElementById('submit-btn').addEventListener('click', () => {
    const hex = colorInput.value.slice(1)
    const mode = schemeSelect.value

    fetch(`${url}?hex=${hex}&mode=${mode}&count=${colorCount}`)
        .then(res => res.json())
        .then(data => {
            updateScheme(data.colors)
        })
})

function updateScheme(colors) {
    paletteColors.forEach((paletteColor, i) => { 
        const hexColor = colors[i].hex.value

        paletteColor.style.backgroundColor = hexColor
        paletteButtons[i].dataset.hex = hexColor
        paletteButtons[i].textContent = hexColor
        paletteButtons[i].ariaLabel = `Copy hex color ${hexColor} to clipboard`
    })    
}

function getOptionsHtml() {
    return modes.map((mode) => {
        return `
            <option value="${mode}">${mode}</option>
        `
    }).join('')
}

function renderOptions() {
    document.getElementById('scheme-select').innerHTML = getOptionsHtml()
}

renderOptions()
