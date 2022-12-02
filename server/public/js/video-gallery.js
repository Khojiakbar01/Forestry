import lightGallery from "https://cdn.skypack.dev/lightgallery@2.3.0-beta.4";

import lgVideo from "https://cdn.skypack.dev/lightgallery@2.3.0-beta.4/plugins/video";

import PhotoSwipeLightbox from "https://unpkg.com/photoswipe/dist/photoswipe-lightbox.esm.js";


lightGallery(document.getElementById("gallery-videos-demo"), {
  speed: 500,
  plugins: [lgVideo],
  selector: ".media__video-gallery-card__item",
});

const lightbox = new PhotoSwipeLightbox({
  gallery: "#my-gallery",
  children: ".media__photo-gallery__item",
  pswpModule: () => import("https://unpkg.com/photoswipe"),
});

lightbox.init();
