import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  galleryLink: document.createElement('a'),
  galleryImage: document.createElement('img'),
  divLightbox: document.querySelector('.js-lightbox'),
  imageLigthbox: document.querySelector(`.lightbox__image`),
  closeButton: document.querySelector(`button[data-action="close-lightbox"]`),
};

// console.log(refs.gallery);
// console.log(refs.divLightbox);
// console.dir(refs.imageLigthbox);

addedClass(refs.galleryLink, 'gallery__link');
addedClass(refs.galleryImage, 'gallery__image');

refs.galleryLink.insertAdjacentElement('afterbegin', refs.galleryImage);

const galleryArray = galleryItems.map(item => {
  refs.liTag = document.createElement('li');
  addedClass(refs.liTag, 'gallery__item');

  getFeaturesItemGallery(item);

  refs.liTag.insertAdjacentElement(
    'afterbegin',
    refs.galleryLink.cloneNode(true),
  );
  // console.dir(refs.galleryImage);
  return refs.liTag;
});

refs.gallery.append(...galleryArray);

refs.gallery.addEventListener('click', onImageClick);
refs.gallery.addEventListener('click', isOpenModal);
refs.closeButton.addEventListener('click', isCloseModal);

function addedClass(elem, classElem) {
  elem.classList.add(classElem);
}

function removedClass(elem, classElem) {
  elem.classList.remove(classElem);
}

function getFeaturesItemGallery(galleryItem) {
  refs.galleryLink.href = `${galleryItem.original}`;
  refs.galleryImage.src = `${galleryItem.preview}`;
  refs.galleryImage.setAttribute('data-source', `${galleryItem.original}`);
  refs.galleryImage.alt = `${galleryItem.description}`;
}

function isOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  addedClass(refs.divLightbox, 'is-open');
  // console.log(event.target.nodeName);
}

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  refs.imageLigthbox.src = event.target.dataset.source;
}

function isCloseModal(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  removedClass(refs.divLightbox, 'is-open');
  refs.imageLigthbox.src = '#';
  // console.log(event.target.nodeName);
}
