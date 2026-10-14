document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("detailGallery");

    if (!gallery) return;

    const windowEl = document.getElementById("galleryWindow");
    const track = document.getElementById("galleryTrack");
    const slides = Array.from(track.querySelectorAll(".gallery-slide"));
    const dots = Array.from(
        document.querySelectorAll("#galleryDots .gallery-dot")
    );
    const prevButton = document.getElementById("galleryPrev");
    const nextButton = document.getElementById("galleryNext");
    const counter = document.getElementById("galleryCounter");
    const progress = document.getElementById("galleryProgress");

    if (!slides.length) return;

    const INTERVAL = 5000;

    let currentIndex = 0;
    let timer = null;
    let animationFrame = null;
    let startX = 0;
    let startY = 0;
    let isPointerDown = false;
    let hasMoved = false;
    let isHovering = false;
    let isDragging = false;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

const colorOptions = document.querySelectorAll(".motor-color-option");
const selectedColorName = document.getElementById("selectedColorName");

colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
        colorOptions.forEach((item) => {
            item.classList.remove("is-selected");
            item.setAttribute("aria-pressed", "false");
        });

        option.classList.add("is-selected");
        option.setAttribute("aria-pressed", "true");

        if (selectedColorName) {
            selectedColorName.textContent = option.dataset.color;
        }
    });
});
    function updateGallery() {
        track.style.transform =
            `translate3d(-${currentIndex * 100}%, 0, 0)`;

        slides.forEach((slide, index) => {
            slide.classList.toggle("is-current", index === currentIndex);
        });

        dots.forEach((dot, index) => {
            const active = index === currentIndex;

            dot.classList.toggle("is-active", active);
            dot.setAttribute("aria-current", active ? "true" : "false");
        });

        counter.innerHTML =
            `${String(currentIndex + 1).padStart(2, "0")} ` +
            `<span>/</span> ${String(slides.length).padStart(2, "0")}`;
    }

    function stopTimer() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }

    function startProgress() {
        progress.style.transition = "none";
        progress.style.width = "0%";

        // Reset progress animation before starting a new cycle.
        void progress.offsetWidth;

        if (prefersReducedMotion) return;

        progress.style.transition = `width ${INTERVAL}ms linear`;
        progress.style.width = "100%";
    }

    function scheduleNext() {
        stopTimer();

        if (isHovering || document.hidden || slides.length < 2) {
            return;
        }

        startProgress();

        timer = setTimeout(() => {
            goTo(currentIndex + 1);
        }, INTERVAL);
    }

    function goTo(index, restartTimer = true) {
        currentIndex = (index + slides.length) % slides.length;

        updateGallery();

        if (restartTimer) {
            scheduleNext();
        }
    }

    function next() {
        goTo(currentIndex + 1);
    }

    function previous() {
        goTo(currentIndex - 1);
    }

    nextButton.addEventListener("click", next);
    prevButton.addEventListener("click", previous);

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goTo(index));
    });

    // Pause while the pointer is over the gallery.
    gallery.addEventListener("mouseenter", () => {
        isHovering = true;
        stopTimer();
    });

    gallery.addEventListener("mouseleave", () => {
        isHovering = false;
        scheduleNext();
    });

    // Pause autoplay while the tab is hidden.
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopTimer();
        } else {
            scheduleNext();
        }
    });

    // Touch and mouse swipe.
    windowEl.addEventListener("pointerdown", (event) => {
        if (event.target.closest("button")) return;

        isPointerDown = true;
        hasMoved = false;
        isDragging = false;
        startX = event.clientX;
        startY = event.clientY;
    });

    windowEl.addEventListener("pointermove", (event) => {
        if (!isPointerDown) return;

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        if (Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY)) {
            hasMoved = true;
            isDragging = true;
        }
    });

    function finishSwipe(event) {
        if (!isPointerDown) return;

        isPointerDown = false;

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        if (
            hasMoved &&
            Math.abs(deltaX) > 45 &&
            Math.abs(deltaX) > Math.abs(deltaY)
        ) {
            if (deltaX < 0) {
                next();
            } else {
                previous();
            }
        }

        isDragging = false;
    }

    windowEl.addEventListener("pointerup", finishSwipe);
    windowEl.addEventListener("pointercancel", finishSwipe);

    // Keyboard navigation when gallery is focused.
    windowEl.tabIndex = 0;

    windowEl.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            next();
        }

        if (event.key === "ArrowLeft") {
            previous();
        }
    });

    // Avoid accidental image dragging.
    windowEl.addEventListener("dragstart", (event) => {
        event.preventDefault();
    });

    // Keep the browser's normal vertical scrolling.
    windowEl.addEventListener("click", (event) => {
        if (isDragging) {
            event.preventDefault();
        }
    });

    updateGallery();
    scheduleNext();
});
