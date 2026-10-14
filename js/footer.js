(async function initFooter() {
    const pathname = window.location.pathname.replace(/\\/g, "/");

    let rootPath = "./";

    if (/\/pages\/motor\//.test(pathname)) {
        rootPath = "../../";
    } else if (/\/pages\/[^/]+\/index\.html$/.test(pathname)) {
        rootPath = "../../";
    } else if (/\/pages\//.test(pathname)) {
        rootPath = "../";
    }

    const mount = document.getElementById("site-footer-mount");

    if (!mount) {
        console.error('Footer mount "#site-footer-mount" tidak ditemukan.');
        return;
    }

    try {
        const response = await fetch(
            `${rootPath}components/footer.html`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        mount.innerHTML = await response.text();

        // Tahun copyright otomatis
        const year = mount.querySelector("#footerYear");

        if (year) {
            year.textContent = new Date().getFullYear();
        }

        // Link halaman
        const routes = {
            home: "index.html",
            motor: "pages/motor/index.html",
            mobil: "pages/mobil/index.html",
            terms: "pages/rental-terms/index.html",
            news: "pages/news/index.html",
            book: "pages/contact/index.html"
        };

        mount.querySelectorAll("[data-footer-link]").forEach((link) => {
            const destination = routes[link.dataset.footerLink];

            if (destination) {
                link.href = `${rootPath}${destination}`;
            }
        });

        // Tombol kembali ke atas
        const backToTop = mount.querySelector(".footer-back-top");

        if (backToTop) {
            backToTop.addEventListener("click", (event) => {
                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }

        console.log("Footer berhasil dimuat.");
    } catch (error) {
        console.error("Gagal memuat footer:", error);
    }
})();
