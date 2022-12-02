const information = document.querySelector(".information");
const main = document.querySelector("main");
const topScroll = document.querySelector(".top-scroll");
const header = document.querySelector("header");
const section = document.querySelectorAll("section")[0];
const h1 = document.querySelector("h1");
topScroll.addEventListener("click", function () {
  header.scrollIntoView({
    behavior: "smooth",
    inline: "nearest",
    block: "end",
  });
});

const scrollToTop = (entries) => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    topScroll.style.visibility = "hidden";
    topScroll.style.transform = "translateX(100%)";
  } else {
    topScroll.style.visibility = "visible";
    topScroll.style.transform = "translate(0)";
    topScroll.classList.add(".top-scroll-show");
  }
};

const options = {
  root: null,
  threshold: 0,
};

const sectionObserver = new IntersectionObserver(scrollToTop, options);
sectionObserver.observe(section || h1);
