console.log('JS loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'loading...'
    messageTwo.textContent = '' 
    message3.textContent = ''
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
    response.json().then((data = {}) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            message3.textContent =  data.daily //'Tomorrow: ' + Math.round(data.daily[1].temp.day) + ' degrees \nThe day after tomorrow: ' + Math.round(data.daily[2].temp.day)
        }
    })
})
})