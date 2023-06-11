export default function fetchImages(name, page) {
    const API_KEY = '34746813-0de00557aa4b15a41a2766aed';
    return fetch(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`${name} is not found`)
          );
        })
}