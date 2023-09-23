const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = true ;
let imagesLoaded = 0;
let totalImages = 0;


// array to take api data

let photosArray = [];

// Unsplash api 

const count = 30;
const apiKey = "kquBV2cGyj30PYZUK_WqWdvbNFpdWkyG2Kg9iUkZyjM"
// const apiKey = '39609570-07ba76b01947b44fec5c4a5d8'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// const apiURL = `https://pixabay.com/api/?key=${apiKey}`


// check images loaded

const imageLoaded = () => {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// helper function to set attributes to elements

function setAttributes(item , attributes) {
    for(const key in attributes) {
        item.setAttribute(key , attributes[key]);
    }
}

// display photos in DOM

function displayPhotos() {
    imagesLoaded =0;
    totalImages = photosArray.length;
    
    photosArray.forEach((photo) => {
        const item = document.createElement('a');

        setAttributes(item , {
            href : photo.links.html,
            target : '_blank'
        });

        const image = document.createElement('img')

        setAttributes(image , {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description
            
        })

        image.addEventListener('load' , imageLoaded);

        item.appendChild(image);
        imageContainer.appendChild(item);
    })
}

// get photos from unsplash api

async function getPhotos() {
    try {

        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
       


    } catch (error) {
        // Catch error
    }
}

// check scrolling near to bottom

window.addEventListener('scroll' , () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();

