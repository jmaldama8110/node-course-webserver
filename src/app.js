
const ruta = require('path')
const express = require('express')
const hbs = require('hbs')

const getForecast = require('../util/getforecast')
const getGeolocal = require('../util/getlugargps')


const folderRecursos = ruta.join(__dirname,'../public')
const folderViews = ruta.join(__dirname,'../templates/views')
const folderPartials = ruta.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.PORT || 3000 // puerto asignado por Heorku o el default es el 3000 (ambiente desarrollo)

/// define las ruta de configuacion de Express
app.set('view engine', 'hbs');
app.set('views', folderViews)
hbs.registerPartials(folderPartials)
/////////////////////////////

/// Configura la ruta de recursos estaticos ---
app.use(    express.static(  folderRecursos    )   )
////////////////////////////////////

const name = 'Jose Manuel Gomez'

// RUTAS de acceso del servicio
app.get('', (req, res) => {
        res.render('index',{  titulo:'Clima',
                              name        })

})

 app.get('/about',( req, res ) => {

  res.render('about', { titulo:'About',
                        name    } )  

})

app.get('/help',( req, res ) => {

  res.render('help', { titulo:'Ayuda en este sitio',
                        name,
                        message:'Me había propuesto no procurar tu atención, al menos, durante la primera mitad de tu administración. Sé que antes de comenzar a exigir resultados, había que dar espacio a que construyeras las bases de tu proyecto de país y lo echaras a andar. Sin embargo, la pandemia del Covid-19 apareció y sus terribles consecuencias están generando hondas heridas en el mundo y en nuestro país...'    } )  

})

app.get('/weather',   ( req, res ) => {
      
  let busquedaCity = req.query.ciudadBusq

              if (! (busquedaCity) ){
                    //// IMPORTANTE, se manda el RETURN res.send, para cortar la peticion y permitir 
                      //que la funcion (res,req) => se interrumpa y se permita una segunda respuesta mas abajo
                    return res.send( { error : 'parametro --ciudadBusqueda-- no definido en la URL...'}  )
              }

          getForecast(busquedaCity, (error,resultado) =>{

                                  if(!error){
                                      
                                    getGeolocal(resultado.Latitud,resultado.Longitud,
                                                    (error2, resultadoGeoLocal = {} )=>{
                                          if(!error2){
                                                
                                                return res.send( {  Nombre: resultadoGeoLocal.Nombre,
                                                                    Estado: resultadoGeoLocal.Estado,
                                                                    CP: resultadoGeoLocal.CP,
                                                                    Latitud: resultado.Ciudad,
                                                                    Temp: resultado.Temp,
                                                                    Sensacion: resultado.Sensacion,
                                                                    Viento: resultado.Viento,
                                                                    Latitud: resultado.Latitud,
                                                                    Longitud: resultado.Longitud })
                                          }
                                          else{
                                              return res.send({error2})
                                          }
                                    })
                                    
                                 }
                              else {
                                  return res.send({error})
                              }

          })
})

/// Nuevas rutas apartir de este punto ->


// response desde cualquier otra peticion que no exista en el servicio
app.get('/help/*',( req, res ) => {

  res.render('error-res-not-found', { contexto:'Help',
                                      error_message:'no se encontro el articulo de ayuda..' })
})

app.get('*',( req, res ) => {
  res.render('error-res-not-found', { contexto:'Global',
                                      error_message:'no se encontro el recurso solicitado..' })

})


    app.listen(port, () =>{
      console.log('Server is up on port 3000...' + port + '...')  
    })





