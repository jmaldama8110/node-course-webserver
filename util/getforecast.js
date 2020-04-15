const request = require('postman-request')

const getForecast = (nombre_ciudad, retroCall ) =>{

    //1. Contruye cadena de Api call
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(nombre_ciudad) +
                '&appid=79c546e94c8176b791ef5cd3ba9af178&units=metric&lang=sp'

    request( {url, json:true }, (error, {body} ) => {

        if( error ){
            retroCall ('1) no se puede conectar al servicio de openweather..',{Latitud:0, Longitud:0})
        } else {
            if(body.cod !== 200 ){
                retroCall('2) no se pudo obtener estado del tiempo.. error:' + body.cod +' -> ' + body.message, { Latitud:0, Longitud:0 })
            } else{
                retroCall(  undefined,  {   Ciudad: body.name,
                                            Estado: body.weather[0].description,
                                            Temp: body.main.temp,
                                            Sensacion: body.main.feels_like,
                                            Latitud: body.coord.lat,
                                            Longitud: body.coord.lon }    )
            }

        }


    })


}

module.exports = getForecast