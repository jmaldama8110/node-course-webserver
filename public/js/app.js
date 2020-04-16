


const weatherForm = document.querySelector('form')
const busquedaValor = document.querySelector('input')
const mensage01 = document.querySelector('#pargraf-01')
const mensage02 = document.querySelector('#pargraf-02')




weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const cadenaBusqueda = busquedaValor.value


    mensage01.textContent = 'Buscando...'
    mensage02.textContent = ''

    fetch(  '/weather?ciudadBusq=' + cadenaBusqueda).then( (response) =>{
        // manda la respuesta a la consola del browser
        response.json().then( (data) =>{
            if(data.error){
                mensage01.textContent = data.error
            }else{
                mensage01.textContent = data.Nombre +'-'+data.Estado + '-CP:'+data.CP
                mensage02.textContent = data.Latitud + ', ' + data.Longitud + ', Sensacion ' + data.Sensacion +', Temp:'+ data.Temp +' -> Viento: '+data.Viento
                
            }
        })

})

})