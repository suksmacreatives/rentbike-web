document.addEventListener("DOMContentLoaded", () => {
    const sideLinks = Array.from(
        document.querySelectorAll(".terms-side-link")
    );

    const sections = sideLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (!sideLinks.length || !sections.length) return;

    sideLinks.forEach((link) => {
        link.addEventListener("click", () => {
            sideLinks.forEach((item) => {
                item.classList.remove("is-active");
            });

            link.classList.add("is-active");
        });
    });

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        b.intersectionRatio - a.intersectionRatio
                );

            if (!visibleEntries.length) return;

            const currentId = visibleEntries[0].target.id;

            sideLinks.forEach((link) => {
                const isActive =
                    link.getAttribute("href") === `#${currentId}`;

                link.classList.toggle("is-active", isActive);
            });
        },
        {
            rootMargin: "-15% 0px -65% 0px",
            threshold: [0, 0.1, 0.25, 0.5]
        }
    );

    sections.forEach((section) => observer.observe(section));
});