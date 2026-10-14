document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll("[data-news-filter]");
    const articles = document.querySelectorAll("[data-news-category]");
    const emptyState = document.querySelector(".news-empty-state");

    if (!filterButtons.length || !articles.length) return;

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.newsFilter;
            let visibleCount = 0;

            filterButtons.forEach((item) => {
                const isActive = item === button;

                item.classList.toggle("is-active", isActive);
                item.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            articles.forEach((article) => {
                const matches =
                    selectedCategory === "all" ||
                    article.dataset.newsCategory === selectedCategory;

                article.hidden = !matches;

                if (matches) {
                    visibleCount++;
                }
            });

            if (emptyState) {
                emptyState.hidden = visibleCount > 0;
            }
        });
    });
});
