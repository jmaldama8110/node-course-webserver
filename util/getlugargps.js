const request = require('postman-request')

const getLugarGps = (lat,lon,retroCall) => {

    //1. Contruye la cadena de Api call
    const url =    'https://api.mapbox.com/geocoding/v5/mapbox.places/' + lon +',' + lat +
                    '.json?access_token=pk.eyJ1Ijoiam1hbGRhbWEiLCJhIjoiY2s4b3hkbnN6MDFkNTNlcXV3NzZoYWYxdyJ9.NlXxpRMR26apzlNBiV8MfA'

   request( {url, json:true}, (error,{body}) =>  {

            if( error ) {
                    retroCall('no se puede conectar al Api de mapbox...',undefined)
            } else{
            if( body.features.length === 0 ){
                    retroCall('no encontrado..' +lat + ',' + lon , undefined )
            }
                    else{
                            retroCall(undefined, {
                                                    Nombre: body.features[0].place_name,
                                                    Estado: body.features[2].place_name,
                                                    CP: body.features[0].context[0].text
                                                    })
                    }
            }
    })
                            
}

module.exports = getLugarGps