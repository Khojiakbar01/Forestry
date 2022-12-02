const mediaTogglers = document.querySelector(".media__togglers");
const photoCard = document.querySelector(".media__photo-gallery");
const videoCard = document.querySelector(".media__video-gallery-card");
const videoCardBtn = document.querySelector(".media__header__video-gallery-btn");
const photoCardBtn = document.querySelector(".media__header__photo-gallery-btn");

mediaTogglers.addEventListener("click", (e) => {
  if (e.target.dataset.type === "video") {
    videoCard.style.display = "block";
    videoCardBtn.classList.add("full-btn");
    videoCardBtn.classList.remove("border-btn");
    photoCard.style.display = "none";
    photoCardBtn.classList.remove("full-btn");
    photoCardBtn.classList.add("border-btn");
  }

  if (e.target.dataset.type === "photo") {
    photoCard.style.display = "block";
    photoCardBtn.classList.add("full-btn");
    photoCardBtn.classList.remove("border-btn");
    videoCard.style.display = "none";
    videoCardBtn.classList.remove("full-btn");
    videoCardBtn.classList.add("border-btn");
  }

  if (!e.target.dataset.type) return;
});
