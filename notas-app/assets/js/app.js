( () => {
    "use strict"

    //Variables y constantes:
    const listaTweets = document.getElementById('lista-tweets');

    

     
    // Functions

    //Añadir tweet del formulario
    const agregarTweet = (e) => {

        e.preventDefault();

        // Leer el valor del textarea
        const tweet = document.getElementById('tweet').value;

        //Crear botón eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';


        //Crear elemento y añadirle contenido a la lista
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        li.innerText = tweet;
        listaTweets.appendChild(ul);
        ul.appendChild(li);
        li.appendChild(botonBorrar);

        //Añadir a Local Storage
        agregarTweetLocalStorage(tweet);

    }

    //Borrar Tweet del formulario
    const borrarTweet = (e) => {

        e.preventDefault();

        //Delegation inside the list
        if(e.target.className === 'borrar-tweet') {

            e.target.parentElement.remove();
            
            borrarTweetLocalStorage(e.target.parentElement.innerText);

        }

    }

    //Obtener items del Local Storage
    const obtenerTweetsLocalStorage = () => {
        let tweets;

        if( localStorage.getItem('tweets') === null ) {

            tweets = [];

        }else {

            tweets = JSON.parse( localStorage.getItem('tweets') );

        }
        return tweets;
    }

    //Cargar y mostrar datos del Local Storage

    const localStorageCargado = () => {

        let tweets = obtenerTweetsLocalStorage();

        tweets.forEach( ( tweet ) => {
            const botonBorrar = document.createElement('a');
            botonBorrar.classList = 'borrar-tweet';
            botonBorrar.innerText = 'X';


            //Crear elemento y añadirle contenido a la lista
            const ul = document.createElement('ul');
            const li = document.createElement('li');
            li.innerText = tweet;
            listaTweets.appendChild(ul);
            ul.appendChild(li);
            li.appendChild(botonBorrar);
        });
        
    }

    //Añadir tweet a local storage
    const agregarTweetLocalStorage = (tweet) => {

        let tweets = obtenerTweetsLocalStorage();         
        tweets.push(tweet);

        //Casting de string a Array y Agregar al Local Storage
        localStorage.setItem( 'tweets', JSON.stringify(tweets) );

    }


    //Eliminar Tweet Local Storage

    const borrarTweetLocalStorage = (tweet) => {

        let tweets, tweetLimpio;

        //Eliminamos la X del tweet
        tweetLimpio = tweet.substring(0, (tweet.length - 1) );

        //Obtenemos todos los tweets del L.S
        tweets = obtenerTweetsLocalStorage();
        tweets.forEach( (tweet, indice) => {//los recorremos

            if( tweetLimpio === tweet) {//eliminamos el tweet

                tweets.splice(indice, 1);

            }

        });

        //Actualizamos datos en el Local Storage
        localStorage.setItem( 'tweets', JSON.stringify(tweets) );
    }


    


    //Event listeners

    ( () => {

        //Cuando se envía el formulario
        document.querySelector('#formulario').addEventListener('submit', agregarTweet);

        //Borrar Tweets
        listaTweets.addEventListener('click', borrarTweet);

        //Cargar contenido del Local Storage
        document.addEventListener('DOMContentLoaded', localStorageCargado);

    } )()

})();