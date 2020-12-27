import galleryItems from './gallery-items.js';
// console.table(galleryItems);

const refs = {
  gallery: document.querySelector('.js-gallery'),
  galleryLink: document.createElement('a'),
  galleryImage: document.createElement('img'),
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

// console.log(galleryArray);
refs.gallery.append(...galleryArray);

function addedClass(elem, classElem) {
  elem.classList.add(classElem);
}

function getFeaturesItemGallery(galleryItem) {
  refs.galleryLink.href = `${galleryItem.original}`;
  refs.galleryImage.src = `${galleryItem.preview}`;
  refs.galleryImage.setAttribute('data-source', `${galleryItem.original}`);
  refs.galleryImage.alt = `${galleryItem.description}`;
}
