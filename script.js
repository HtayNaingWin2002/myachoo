const menuContainer = document.querySelector(".menu-container");
const navGroup = document.querySelector(".nav-group");
const sectionContainer = document.querySelectorAll("section");

menuContainer.addEventListener("click", () => {
  navGroup.classList.toggle("show-nav");
});
const toggleContainer = document.querySelector(".toggle-container");
toggleContainer.addEventListener("click", (e) => {
  let mode = "false";
  if (e.target.closest(".toggle-dark")) {
    document.querySelector("body").classList.add("dark");
    localStorage.setItem("mode", "true");
    mode = "true";
  } else {
    localStorage.getItem("mode");
    document.querySelector("body").classList.remove("dark");
    localStorage.removeItem("mode");
  }
});
window.addEventListener("DOMContentLoaded", () => {
  if ("true" === localStorage.getItem("mode")) {
    document.querySelector("body").classList.add("dark");
    localStorage.setItem("mode", "true");
    mode = "true";
  } else {
    localStorage.getItem("mode");
    document.querySelector("body").classList.remove("dark");
    localStorage.removeItem("mode");
    mode = "false";
  }
});
navGroup.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.closest(".nav-link")) {
    const link = e.target.getAttribute("href");
    document.querySelector(link).scrollIntoView({
      behavior: "smooth",
    });
  }
});
const sectionReveal = (entries, observer) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  } else {
    return;
  }
};
const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.1,
});
sectionContainer.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
const blurImage = document.querySelectorAll("img[data-src]");
const imageReveal = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(imageReveal, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});
blurImage.forEach((blur) => {
  imageObserver.observe(blur);
});
