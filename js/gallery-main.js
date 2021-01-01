import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  galleryLink: document.createElement('a'),
  galleryImage: document.createElement('img'),
  divLightbox: document.querySelector('.js-lightbox'),
  imageLigthbox: document.querySelector(`.lightbox__image`),
  closeButton: document.querySelector(`button[data-action="close-lightbox"]`),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
};

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
  return refs.liTag;
});

refs.gallery.append(...galleryArray);

refs.gallery.addEventListener('click', onImageClick);
refs.gallery.addEventListener('click', isOpenModal);
refs.closeButton.addEventListener('click', onCloseButtonClick);
refs.lightboxOverlay.addEventListener('click', onBackDropClick);

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

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  replacesSrcImageLigthbox(event.target.dataset.source);
}

function replacesSrcImageLigthbox(currentLink) {
  refs.imageLigthbox.src = currentLink;
}

function isOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  window.addEventListener('keydown', onPressEscape);
  // window.addEventListener('keydown', onPressArrowLeft);
  // window.addEventListener('keydown', onPressArrowRight);

  addedClass(refs.divLightbox, 'is-open');
  // console.log(event.target.nodeName);
}

function isCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  // window.removeEventListener('keydown', onPressArrowLeft);
  // window.removeEventListener('keydown', onPressArrowRight);

  removedClass(refs.divLightbox, 'is-open');
  refs.imageLigthbox.src = '#';
  // console.log(event.target.nodeName);
}

function onCloseButtonClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  isCloseModal();
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    isCloseModal();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    isCloseModal();
    // console.log('Была нажата клавиша Escape');
  }
}

// function onPressArrowLeft(event) {
//   if (event.code === 'ArrowLeft') {
//     replacesSrcImageLigthbox(
//       event.target.parentNode.previousElementSibling.childNodes[0].firstChild
//         .dataset.source,
//     );

//     console.dir(
//       event.target.parentNode.previousElementSibling.childNodes[0].firstChild
//         .dataset.source,
//     );
//   }
// }

// function onPressArrowRight(event) {
//   if (event.code === 'ArrowRight') {
//     replacesSrcImageLigthbox(
//       event.target.parentNode.nextElementSibling.childNodes[0].firstChild
//         .dataset.source,
//     );

//     console.dir(
//       event.target.parentNode.nextElementSibling.childNodes[0].firstChild,
//     );
//     console.dir(event.target);
//   }
// }
