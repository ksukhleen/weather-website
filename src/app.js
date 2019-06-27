const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express configh
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {

    res.render('index', {
        title: 'weather app',
        name: 'sukhleen'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About',
        name: 'sukhleen'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help',
        name: 'sukhleen'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Add address property onto JSN hich returns the provided address"
        })

    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            })

        })
        {

        }


    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'sukhleen',
        errorMessage: 'Paeg not Found'
    })
})



app.listen(port, () => {

    console.log('Server is up on port' + port)
})

