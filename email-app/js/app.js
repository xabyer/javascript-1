( () => {

    /*=================================
    =            Variables            =
    =================================*/
    const email = document.getElementById('email');
    const asunto = document.getElementById('asunto');
    const mensaje = document.getElementById('mensaje');
    const btnEnviar = document.getElementById('enviar');
    const formularioEnviar = document.getElementById('enviar-mail');
    const resetBtn = document.getElementById('resetBtn');


    /*=====  End of Variables  ======*/



    /*=================================
    =            Functions            =
    =================================*/

    const inicioApp = () => {

        //Deshabilitamos el botón de envio
        btnEnviar.disabled = true;

    }

    //validar email
    const validarEmail = (campo) => {

        const mensaje = campo.value;
        if(mensaje.indexOf('@') !== -1 ){

            campo.style.borderBottomColor = 'green';
            campo.classList.remove('error');

        }else {

            campo.style.borderBottomColor = 'red';
            campo.classList.add('error');

        }

    }

    //Valida que el campo tenga algo escrito
    const validarCampo = (e) => {

        validarLongitud(e.target);

        if ( e.target.type === 'email' ) {

            validarEmail(e.target);

        }

        let errores = document.querySelectorAll('.error');

        if( email.value !== '' & asunto.value !== '' &   mensaje.value !== '' ) {

            if(errores.length === 0) {

                btnEnviar.disabled = false;

            }

        }

    }

    //Valida la longitud del texto de los campos
    const validarLongitud = (campo) => {

        if(campo.value.length > 0) {

            //Longitud válida
            campo.style.borderBottomColor = 'green';
            campo.classList.remove('error');

        }else {

            //Longitud no válida
            campo.style.borderBottomColor = 'red';
            campo.classList.add('error');

        }

    }

    //Enviar formulario
    const enviarEmail = (e) => {

        //Spinner al presionar Enviar
        const spinnerGif = document.querySelector('#spinner');
        spinnerGif.style.display = 'block';

        //DOM para Gif de email enviado
        const enviado = document.createElement('img');
        enviado.src = 'img/mail.gif';
        enviado.style.display = 'block';

        setTimeout( () => {

            spinnerGif.style.display = 'none';
            document.querySelector('#loaders').appendChild( enviado );

            setTimeout( () => {

                enviado.remove();
                formularioEnviar.reset();

            }, 5000)

        }, 3000)
        
        e.preventDefault();
        

    }


    //Resetear formulario
    const resetFormulario = (e) => {

        formularioEnviar.reset();
        e.preventDefault();

    }

    /*=====  End of Functions  ======*/



    /*=================================
    =            Listeners            =
    =================================*/

    ( () => {

        //Inicio de la aplicación y deshabilitar el submit
        document.addEventListener('DOMContentLoaded', inicioApp);

        //Campos del formulario:
        email.addEventListener('blur', validarCampo);
        asunto.addEventListener('blur', validarCampo);
        mensaje.addEventListener('blur', validarCampo);

        //Enviar el formulario
        formularioEnviar.addEventListener('submit', enviarEmail);

        //Boton reset para borrar el formulario
        resetBtn.addEventListener('click', resetFormulario);
        
    })()

    /*=====  End of Listeners  ======*/

})()