window.addEventListener('DOMContentLoaded', (e) => {

    const inputs = document.querySelectorAll('input')
    const labels = document.querySelectorAll('label')
    const lastInput = inputs[inputs.length-1]

    lastInput.parentElement.classList.remove('m6')
    lastInput.parentElement.classList.add('m12')

    inputs.forEach(inp => {
        inp.classList.add('validate')
    })

    labels.forEach((label, index) => {
        label.setAttribute('for', inputs[++index].id)
    })

})