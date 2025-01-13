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

  video.addEventListener("mouseleave", () => {
    Stop(video);
  });
});

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
