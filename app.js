const endpoint = 'https://api.thecatapi.com/v1/images/search';

const imageContainer = document.getElementById('image-container');
const newImageButton = document.getElementById('new-image-button');

function getNewImage() {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data[0].url;
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageContainer.innerHTML = '';
      imageContainer.appendChild(imageElement);
    });
}

getNewImage();

newImageButton.addEventListener('click', getNewImage);