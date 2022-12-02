const burgerBtn = document.querySelector(".admin-panel__main__nav__burger-btn");

burgerBtn.addEventListener("click", function () {
  document.querySelector(".admin-panel__sidebar").classList.toggle("sidebar-closed");
});


