const wrapper = document.querySelector(".devswiper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".devswiper i");
const firstCardWidth = carousel.querySelector(".dev-card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragging) return; //if isDragging is false return from here
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false
  carousel.classList.remove("dragging");
}

const autoPlay = () => {
  if(window.innerWidth < 800) return;
  //autoplay after every 2000ms
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2000);
}
autoPlay();

const infiniteScroll = () => {
  // Scroll left wrap
  if (carousel.scrollLeft <= 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }

  // Scroll right wrap
  if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 1) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Restart autoplay if not hovering
  clearTimeout(timeoutId);
  if (wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);