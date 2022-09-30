
import genres from '../../genres.json';



export function findGenresOfMovie(ids) {
  const arr = ids.flatMap(id => genres.filter(element => element.id === id));
  const movieGenres = arr.map(el => el.name);
  if (movieGenres.length > 2) {
    const removedGenres = movieGenres.splice(0, 2);
    removedGenres.push('Other');

    return removedGenres.join(', ');
  }
  return movieGenres.join(', ');
}
export function markupMovies(movies) {
  return movies
    .map(({ poster_path, title, genre_ids, release_date, id }) => {
      const date = new Date(release_date).getFullYear();
      if (poster_path) {
        return `
      <li class="card" id="${id}">
        <img class="card__img" src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}" />
        <div class="card__wrap">
        <p class="card__titel">
        ${title} <br />
          <span class="card__text">${findGenresOfMovie(
            genre_ids
          )} | ${date}</span>
        </p> </div>
  </li>`;
      }
      return `
      <div class="card" id="${id}">
        <img class="card__img" src="" alt="${title}" />
        <p class="card__titel">
        ${title} <br />
          <span class="card__text">${findGenresOfMovie(
            genre_ids
          )} | ${date}</span>
        </p>
  </div>`;
    })
    .join('');
}



