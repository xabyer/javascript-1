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

    /*=================================
    =            Local Storage        =
    =================================*/
    //Comprobar si hay elementos en el local Storage e inicializarlos si no los hay.
    const obtenerCursosLS = () => {
        
        let cursosLS;
        if(localStorage.getItem('cursos') === null) {//Si el LS está vacio lo crea

            cursosLS = [];

        }else { //Si no está vacio lee los datos y los almacena en cursosLS

            cursosLS = JSON.parse( localStorage.getItem('cursos') );

        }

        return cursosLS;

    }

    //Guarda los cursos en el Local Storage
    const guardarCursoLS = (curso) => {

        let cursos = obtenerCursosLS();
        cursos.push(curso);
        localStorage.setItem( 'cursos', JSON.stringify(cursos) );

    }

    //Imprime los cursos del Local Storage en el carrito al cargar la página.
    const leerLS = () => {

        let cursosLS = obtenerCursosLS();
        for(let curso of cursosLS) {
            crearDOMCarrito(curso);
        }

    }
        
    /*=====  End of Local Storage  ======*/


    /*=================================
    =            DOM            =
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

    const crearDOMCarrito = function (curso) {

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
        listaCursos.appendChild(fila);//DOM del curso en el carrito.
    }

    // Muestra el curso seleccionado en el html del carrito mediante DOM Y lo guarda en el LS
    const insertarCarrito = (curso) => {

        crearDOMCarrito(curso);//Creamos el DOM del carrito
        
        guardarCursoLS(curso); //guardamos el curso en el Local Storage
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
    /*=====  End of DOM  ======*/

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

        //Al cargar el documento, mostar los elementos del Local Storage
        document.addEventListener('DOMContentLoaded', leerLS );

    })()


    /*=====  End of Listeners  ======*/

})()