(async function initNavbar() {
    // ==========================================
    // 1. MENENTUKAN LOKASI HALAMAN
    // ==========================================
    const isPagesDirectory = /\/pages\/[^/]*$/.test(
        window.location.pathname
    );

    const pathname = window.location.pathname.replace(/\\/g, "/");

let rootPath = "./";

if (/\/pages\/motor\//.test(pathname)) {
    rootPath = "../../";
} else if (/\/pages\/[^/]+\/index\.html$/.test(pathname)) {
    rootPath = "../../";
} else if (/\/pages\//.test(pathname)) {
    rootPath = "../";
}

    // ==========================================
    // 2. MEMUAT KOMPONEN NAVBAR
    // ==========================================
    const mount = document.getElementById("site-navbar");

    if (!mount) {
        console.error(
            'Navbar mount "#site-navbar" tidak ditemukan.'
        );
        return;
    }

    try {
        const response = await fetch(
            `${rootPath}components/navbar.html`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        mount.innerHTML = await response.text();
    } catch (error) {
        console.error("Gagal memuat navbar:", error);

        mount.innerHTML = `
            <p style="padding: 16px; color: white;">
                Navbar gagal dimuat. Jalankan website menggunakan Live Server.
            </p>
        `;

        return;
    }

    // ==========================================
    // 3. MENGAMBIL ELEMEN NAVBAR
    // ==========================================
    const navbar = mount.querySelector("#navbar");
    const toggle = mount.querySelector("#navbarToggle");
    const closeButton = mount.querySelector("#navbarClose");
    const mobilePanel = mount.querySelector("#navbarMobilePanel");

    // Validasi elemen utama
    if (!navbar || !toggle || !mobilePanel) {
        console.error("Elemen utama navbar tidak ditemukan.", {
            navbar,
            toggle,
            mobilePanel
        });

        return;
    }

    // ==========================================
    // 4. DAFTAR HALAMAN NAVIGASI
    // ==========================================
    const routes = {
        home: "index.html",
        motor: "pages/motor/index.html",
        mobil: "pages/mobil/index.html",
        terms: "pages/rental-terms/index.html",
        news: "pages/news/index.html",
        book: "pages/contact/index.html"
    };

    // Mengatur URL navigasi secara otomatis
    navbar.querySelectorAll("[data-nav]").forEach((link) => {
        const key = link.dataset.nav;
        const destination = routes[key];

        if (destination) {
            link.href = `${rootPath}${destination}`;
        }
    });

    // ==========================================
    // 5. MEMBUKA MENU MOBILE
    // ==========================================
    function openMenu() {
        navbar.classList.add("is-open");

        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Tutup menu navigasi");

        mobilePanel.setAttribute("aria-hidden", "false");

        document.body.classList.add("navbar-menu-open");
    }

    // ==========================================
    // 6. MENUTUP MENU MOBILE
    // ==========================================
    function closeMenu() {
        navbar.classList.remove("is-open");

        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Buka menu navigasi");

        mobilePanel.setAttribute("aria-hidden", "true");

        document.body.classList.remove("navbar-menu-open");
    }

    // ==========================================
    // 7. EVENT TOMBOL HAMBURGER
    // ==========================================
    toggle.addEventListener("click", () => {
        const isOpen = navbar.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // ==========================================
    // 8. EVENT TOMBOL CLOSE (X)
    // ==========================================
    if (closeButton) {
        closeButton.addEventListener("click", closeMenu);
    }

    // ==========================================
    // 9. MENUTUP MENU SAAT LINK DIPILIH
    // ==========================================
    mobilePanel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // ==========================================
    // 10. MENUTUP MENU DENGAN TOMBOL ESCAPE
    // ==========================================
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // ==========================================
    // 11. MENUTUP MENU SAAT KEMBALI KE DESKTOP
    // ==========================================
    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });

    // ==========================================
    // 12. STATUS NAVBAR
    // ==========================================
    console.log("Navbar berhasil dimuat.");
})();