lightGallery(document.querySelector('.photo-gallery'), {
  plugins: [lgZoom, lgThumbnail, lgShare, lgRotate, lgAutoplay],
  licenseKey: 'your_license_key',
  speed: 500,
});