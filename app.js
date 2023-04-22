const endpoint = 'https://api.thecatapi.com/v1/images/search';

const imageContainer = document.getElementById('image-container');
const newImageButton = document.getElementById('new-image-button');

function getNewImages() {
  Promise.all([fetch(endpoint), fetch(endpoint), fetch(endpoint)])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      imageContainer.innerHTML = '';
      data.forEach(imageData => {
        const imageUrl = imageData[0].url;
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageContainer.appendChild(imageElement);
      });
    });
}

getNewImages();

newImageButton.addEventListener('click', getNewImages);
