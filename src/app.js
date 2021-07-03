const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

// Setup static engine and views location


app.get('', (req, res) => {
    const IP = req.ip
    res.render('index', {
        title: 'Weather',
        name: 'Yuri Bil',
        IP: IP
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yuri Bil'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        mes: 'You are right here, HELLO!',
        title: 'Help',
        name: 'Yuri Bil'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })  
    }
    geocode(req.query.address, (error, data) => { 
        if (error) {
            return res.send({ error })
        }
        forecast(data.latitude, data.longitude,  (error, Data) => {
            if (error) {
                return res.send({
                    error: error
            })
            }
            res.send({
                'forecast': Data.today,
                'location': data.location, //location from geocode
                'address': req.query.address,
                'daily': Data.tomorrow
            })
        })
    })
})






app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        mes: 'Help article not found.',
        name: 'Yuri Bil'
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        mes: 'Page not found',
        name: 'Yuri Bil'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})