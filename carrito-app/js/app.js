( () => {
    'use strict';
    /*=================================
    =            Variables            =
    =================================*/
    const carrito = document.getElementById('carrito');
    const cursos = document.getElementById('lista-cursos');
    const listaCursos = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


    /*=====  End of Variables  ======*/


    /*=================================
    =            Functions            =
    =================================*/
    const comprarCurso = (e) => { //función que añade el curso al carrito.

        e.preventDefault();
        //Delegation para añadir el carrito.
        if(e.target.classList.contains('agregar-carrito')) {

            const curso = e.target.parentElement.parentElement;
            leerDatosCurso(curso);

        }

    }

    const leerDatosCurso = ( curso ) => {
        //Creamos un objeto con la información del curso:
        const infoCurso = {

            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id')

        }

        insertarCarrito(infoCurso);

    }

    // Muestra el curso seleccionado en el html del carrito mediante DOM
    const insertarCarrito = (curso) => {

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <img src="${curso.imagen}">
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(fila);
    }

    //Elimina el curso del carrito en el DOM
    const eliminarCurso = (e) => {

        e.preventDefault();
        
        let curso;
        if(e.target.classList.contains('borrar-curso')) {

            e.target.parentElement.parentElement.remove();

        }

    }

    //Vaciamos el carrito entero del DOM con el Evento del botón vaciar-carrito
    const vaciarCarrito = (e) => {

        e.preventDefault();
        while(listaCursos.firstChild) {

            listaCursos.removeChild(listaCursos.firstChild);

        }

        return false;

    }


    /*=====  End of Functions  ======*/


    /*=================================
    =            Listeners            =
    =================================*/
    ( () => {

        //Evento click en Agregar Carrito
        cursos.addEventListener( 'click', comprarCurso );

        //Evento para eliminar curso del carrito
        carrito.addEventListener( 'click', eliminarCurso );

        //Evento para el botón vaciar carrito
        vaciarCarritoBtn.addEventListener( 'click', vaciarCarrito );

    })()


    /*=====  End of Listeners  ======*/

})()