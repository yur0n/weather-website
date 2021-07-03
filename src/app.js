const path = require('path') //Path for ez pathing
const express = require('express')
const hbs = require('hbs') //Handlebars
const geoip = require('geoip-lite')

// Export
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

app.set('trust proxy', true) // Proxy trust for req.ip


// Setup static engine and views location



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Batya',

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Batya'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        mes: 'You are right here, HELLO!',
        title: 'Help',
        name: 'Batya'
    })
})

app.get('/ip', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip
    if (ip === '::1') {          // So it can work on localhost
        ip = '93.77.79.107'
    }
        const geo = geoip.lookup(ip)
        res.render('ip', {
            title: 'IP',
            name: 'Batya',
            ip,
            geo,
            lat: geo.ll[0],
            long: geo.ll[1]
        })
})

app.get('/weather', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip
    const geo = geoip.lookup(ip)
    if (!req.query.address && !geo) {
        return res.send({
            error: 'You must provide an address'
        })  
    }
    geocode(req.query.address || geo.city, (error, geocodeData) => { 
        if (error) {
            return res.send({ error })
        }
        forecast(geocodeData.latitude, geocodeData.longitude,  (error, forecastData ) => {
            if (error) {
                return res.send({
                    error: error
            })
            }
            res.send({
                'forecast': forecastData.today,
                'location': geocodeData.location, //location from geocode
                'address': req.query.address,
                daily: forecastData.tomorrow
            })
        })
    })
})






app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send(
            'You must provide a search term'
        )
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
        name: 'Batya'
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        mes: 'Page not found',
        name: 'Batya'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})