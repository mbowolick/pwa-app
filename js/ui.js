// ui variables
const movies = document.querySelector('.movies');

// materialize listener for the left form and right menu
document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

// render movie data
const renderMovie = (data, id) => {
  const html = `
    <div class="card-panel recipe white row" data-id="${id}">
      <img src="/img/clapperboard.png" alt="recipe thumb">
      <div class="recipe-details">
        <div class="recipe-title">${data.title}</div>
        <div class="recipe-ingredients">Dir: ${data.director}</div>
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;
  movies.innerHTML += html;
};

// remove movie from dom
const removeMovie = (id) => {
  const movie = document.querySelector(`.recipe[data-id=${id}]`);
  movie.remove();
};