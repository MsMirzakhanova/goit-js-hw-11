import './css/styles.css';
import fetchImages from "./fetchImages"


searchForm = document.querySelector(`.search-form`)
gallery = document.querySelector(`.gallery`)
loadMoreBtn = document.querySelector(`.load-more`)

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

searchForm.addEventListener(`submit`, onFormSubmit);
loadMoreBtn.addEventListener(`click`, onLoadMoreBtn);

function resetPage() {
    currentPage = 1;
};

function onFormSubmit(event){
    event.preventDefault();
    clearGallery()

    resetPage();
    
    searchQuery = event.currentTarget.searchQuery.value.trim();
    fetchImages(searchQuery, currentPage).then(displayImageInfo);
    currentPage += 1;
    
};
function onLoadMoreBtn() {
    fetchImages(searchQuery, currentPage);
    currentPage += 1;
};

function displayImageInfo(hits) {
        const markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
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
}

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