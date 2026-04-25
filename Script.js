const videos = document.querySelectorAll("video");

function Play(video) {
  video.play();
}

function Stop(video) {
  video.pause();
}
videos.forEach((video) => {
  video.addEventListener("mouseenter", () => {
    Play(video);
  });

  video.addEventListener("touchstart", () => {
    Play(video);
  });

  video.addEventListener("mouseleave", () => {
    Stop(video);
  });
});

const slider = document.querySelector("#cardHolder");
const footerTemplate = document.getElementById("footerTemplate");
const cardSections = document.querySelectorAll(".cardSlider");

let currentSlide = 0;

// Nav bar slider behavior
function goToSlide(slide) {
  currentSlide = slide;
  const cardWidth = cardSections[1].offsetWidth; // The [1] is arbitrary, they're all the same width
  slider.style.transform = `translateX(-${slide * (cardWidth + 30)}px)`;
  slider.style.height = cardSections[slide].scrollHeight + "px";
}

// Add footer template to bottom of each sliding section
cardSections.forEach((section) => {
  const footerClone = footerTemplate.content.cloneNode(true);
  section.appendChild(footerClone);
});

// Animate footer links
const animatedLinks = document.querySelectorAll("#contactInfo a");

const observerOptions = {
  threshold: 1.0,
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
animatedLinks.forEach((el) => observer.observe(el)); // observe each of the contactInfo links

const coloredTags = document.querySelectorAll(".tag");
const styles = [
  {
    background: "rgb(0, 100, 0)",
    border: "2px solid rgb(0, 200, 0)",
    color: "rgb(220, 255, 220)",
  },
  {
    background: "rgb(0, 0, 100)",
    border: "2px solid rgb(0, 0, 200)",
    color: "rgb(220, 220, 255)",
  },
  {
    background: "rgb(100, 0, 100)",
    border: "2px solid rgb(200, 0, 200)",
    color: "rgb(255, 220, 255)",
  },
  {
    background: "rgb(0, 100, 100)",
    border: "2px solid rgb(0, 200, 200)",
    color: "rgb(220, 255, 255)",
  },
  {
    background: "rgb(100, 0, 0)",
    border: "2px solid rgb(200, 0, 0)",
    color: "rgb(255, 220, 220)",
  },
  {
    background: "rgb(100, 100, 0)",
    border: "2px solid rgb(200, 200, 0)",
    color: "rgb(255, 255, 220)",
  },
];

// Apply styles based on the index
coloredTags.forEach((tag, index) => {
  const style = styles[index % 6]; // Cycle through styles
  tag.style.backgroundColor = style.background;
  tag.style.border = style.border;
  tag.style.color = style.color;
});

// Set initial height and update on resize
slider.style.height = cardSections[0].scrollHeight + "px";
window.addEventListener("resize", () => goToSlide(currentSlide));

// On mobile: prevent scroll restoration and re-measure height after full load
const isMobile = () => window.matchMedia("(max-width: 830px)").matches;
if (isMobile() && history.scrollRestoration) history.scrollRestoration = "manual";
window.addEventListener("load", () => {
  slider.style.transition = "none";
  slider.style.height = cardSections[0].scrollHeight + "px";
  if (isMobile()) window.scrollTo(0, 0);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    slider.style.transition = "";
  }));
});

// Contact modal
const contactModal = document.getElementById("contactModal");

function openContact() {
  contactModal.classList.add("open");
}

document.getElementById("modalClose").addEventListener("click", () => {
  contactModal.classList.remove("open");
});

contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) contactModal.classList.remove("open");
});

// Lightbox for renders
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".renderItem img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
  });
});

document.getElementById("lightboxClose").addEventListener("click", () => {
  lightbox.classList.remove("open");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("open");
});

// Close any open modal on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach((m) => m.classList.remove("open"));
  }
});

// Sticky nav: show when header scrolls out of view
const stickyNav = document.getElementById("stickyNav");
const stickyObserver = new IntersectionObserver(
  ([entry]) => {
    stickyNav.classList.toggle("visible", !entry.isIntersecting);
  },
  { threshold: 0 }
);
stickyObserver.observe(document.getElementById("header"));
