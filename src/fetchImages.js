import axios from 'axios';

export default async function fetchImages(value, page) {
    try {
        const url = 'https://pixabay.com/api/';
        const key = '31186027-a505e8b90e1642af76a363134';
        const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

        const response = await axios.get(`${url}${filter}`);
        const data = await response.data;
        const hits = await data.hits;
        return hits;
        
    } catch (error) {
        console.error(error);
    }
};



// export default async function fetchImages(value, page) {
//     const url = 'https://pixabay.com/api/';
//     const key = '31186027-a505e8b90e1642af76a363134';
//     const filter = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
//     const response = await axios.get(`${url}${filter}`)
// }

// export default function fetchImages(img) {
//     return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
//          .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
// }


