import './css/styles.css';
import fetchImages from "./fetchImages";
import Notiflix from 'notiflix';


//import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
//import "simplelightbox/dist/simple-lightbox.min.css";

// let lightbox = new SimpleLightbox('.photo-card a', { 
//     /* options */ 
//     captionsData: "alt",
//     captionDelay: 250,
//     captionPosition: "bottom",

// });


const searchForm = document.querySelector(`.search-form`)
const gallery = document.querySelector(`.gallery`)
const loadMoreBtn = document.querySelector(`.load-more`)
loadMoreBtn.classList.add('is-hidden');

let currentPage = 1;
let searchQuery = '';

searchForm.addEventListener(`submit`, onFormSubmit);
loadMoreBtn.addEventListener(`click`, onLoadMoreBtn);

function resetPage() {
    currentPage = 1;
};

async function onFormSubmit(event){
    event.preventDefault();
    clearGallery()
  resetPage();

  searchQuery = event.currentTarget.searchQuery.value.trim();
  
  if (searchQuery === ``) {
    return Notiflix.Notify.failure(`Please enter the text request`);
  }
  const response = await fetchImages(searchQuery, currentPage);
  if (response.length < 1) {
   return Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`); 
  }
  else {
    displayImageInfo(response);
  };

    if (response.length >= 40) {
  loadMoreBtn.classList.remove('is-hidden');
  };  
};

async function onLoadMoreBtn() {
   currentPage += 1; 
     const response = await fetchImages(searchQuery, currentPage);
  displayImageInfo(response);
  
  // const totalHits = response.totalHits;
  
  // if (totalHits >= response.length) {
  //   loadMoreBtn.classList.add('is-hidden');
  //   Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
  // }
};

function displayImageInfo(images) {
        const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
          return `<div class="photo-card">
            <a class="photo-card__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;
  }
  )
        .join('');
      gallery.innerHTML = markup;   
};

function clearGallery() {
    gallery.innerHTML = ``;
};


//Your API key: 31186027-a505e8b90e1642af76a363134

// async function getUser(
//     '/user', {
//     params: {
//       ID: 12345
//     }
//   }
// ) {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }