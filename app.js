const express = require('express')
const hbs = require('hbs')
const path = require('path')
const request = require('request')

let app = express()
const publicDir = path.join(__dirname,'./public')

app.set('view engine','hbs')
app.use(express.static(publicDir))


app.get('/',(req,res)=>{

    res.render('index',{
        title: 'Weather',
        name : 'Pallab Nath'
    })
})

app.get('/weather',(req,res)=>{

        if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })    
    }
    
    const url = 'http://api.weatherstack.com/current?access_key=551e32e00755826396c1baf8deb8a4d5&query=' + req.query.address 

    request(url,(error,response)=>{
        const data = JSON.parse(response.body)
        if(data.success==false)
        {
            return res.send({error:'location not found'})
        }
        res.send({
            location: [data.location.name, data.location.region,data.location.country],
            info: [ data.current.temperature , data.current.humidity, data.current.weather_descriptions[0]]
        })
    })
})


app.listen('3000',()=> console.log('Server running on port 3000'));