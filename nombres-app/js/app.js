( () => {

    /*=================================
    =            Functions            =
    =================================*/
    const cargarNombres = (e) => {

        e.preventDefault();
        /*----------  Variables y constantes  ----------*/
        const origen = document.getElementById('origen');
        let origenSelec = origen.options[origen.selectedIndex].value;

        const genero = document.getElementById('genero');
        let generoSelec = genero.options[genero.selectedIndex].value;
        
        let cantidad = document.getElementById('numero').value;

        let url = 'https://randomuser.me/api/?';

        //Añadimos el origen:
        if( origenSelec !== '' ) {

            url += `nat=${origenSelec}&`;

        }

        //Añadir el genero seleccionado (si lo hay)
        if ( generoSelec != "" ) {

            url += `gender=${generoSelec}&`;

        }

        //Añadir la cantidad seleccionada (si lo hay)
        if ( cantidad !== '' ) {

            url += `results=${cantidad}`;

        }
        
        /*----------  AJAX  ----------*/
        // Creamos el objeto de la peticion XMLHTTP
        const xhr = new XMLHttpRequest();

        //abrimos la conexion
        xhr.open('GET', url, true);

        xhr.onload = () => {

            if(xhr.status === 200) {

                let data = JSON.parse(xhr.responseText);
                let nombres = data.results;
                
                //Generamos el DOM
                let htmlNombres = '<h2>Nombres Generados</h2>';
                htmlNombres += '<ul class="lista">'
                
                for (let nombre of nombres) {

                    htmlNombres += `
                        <li>${nombre.name.first}</li>
                    `;
                }

                htmlNombres += '</ul>';

                document.getElementById('resultado').innerHTML = htmlNombres;

            }else {
                console.log('error');
            }

        }
        
        //Enviar la petición:
        xhr.send();

    }
    
    
    /*=====  End of Functions  ======*/


    /*=================================
    =            Listeners            =
    =================================*/
    
    document.getElementById('generar-nombre').addEventListener('submit', cargarNombres);
    
    /*=====  End of Listeners  ======*/

})()