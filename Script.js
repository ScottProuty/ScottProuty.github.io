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
  slider.style.transform = `translateX(-${slide * 95}vw)`;
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
