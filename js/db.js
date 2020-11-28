// offline data
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition') {
            console.log('Persistence failed');
        } else if (err.code == 'unimplemented') {
            console.log('Persistence is not availble');
        }
    });

// real-time listener
db.collection('movies').onSnapshot( (snapshot) => {
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach( change => { 
        //console.log(change, change.doc.data(), change.doc.id); 
        if(change.type === 'added'){
            // add the document data to the webpage
            renderMovie(change.doc.data(), change.doc.id);
        }
        if(change.type === 'removed'){
            // remove the document data from the webpage
            removeMovie(change.doc.id);
        }
    });
})

// add new movie
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const movie = {
        title: form.title.value,
        director: form.director.value
    };

    if(movie.title) {
        db.collection('movies').add(movie)
        .catch(err => console.log(err));
        form.title.value = '';
        form.director.value = '';
    }
    else if (movie.director) {
        form.title.value = 'TITLE NEEDED!'; 
    }
    else {
        form.title.value = 'TITLE NEEDED!';    
        form.director.value = 'DIRECTOR NEEDED!';
    }
});

// delete movie
const moviesContainer = document.querySelector('.movies');
moviesContainer.addEventListener('click', evt => {
    // console.log(evt);
    if(evt.target.tagName === 'I') {
        const id = evt.target.getAttribute('data-id');
        db.collection('movies').doc(id).delete();
    }
});

