const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageZero = document.querySelector('#message-0')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')


fetch('/ip').then((response) => {
    response.json().then((data = {}) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageZero.textContent = 'Your current location is ' + data.location + '.'
            messageOne.textContent = 'Weather forecast for ' + data.location + ':'
            messageTwo.textContent = data.forecast
            message3.textContent =  data.daily
        }
    })
})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'loading...'
    messageTwo.textContent = '' 
    message3.textContent = ''
    fetch('/weather?address=' + search.value).then((response) => {
    response.json().then((data = {}) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = 'Weather forecast for ' + data.location + ':'
            messageTwo.textContent = data.forecast
            message3.textContent =  data.daily
        }
    })
})
})