document.addEventListener("DOMContentLoaded", () => {
    const brandFilter = document.getElementById("brandFilter");
    const transmissionFilter = document.getElementById("transmissionFilter");
    const cards = document.querySelectorAll(".motor-card");
    const count = document.getElementById("motorCount");
    const empty = document.getElementById("motorEmpty");

    if (!brandFilter || !transmissionFilter || !count || !empty) {
        return;
    }

    function filterMotorcycles() {
        const brand = brandFilter.value;
        const transmission = transmissionFilter.value;
        let visible = 0;

        cards.forEach((card) => {
            const matchBrand =
                brand === "all" || card.dataset.brand === brand;

            const matchTransmission =
                transmission === "all" ||
                card.dataset.transmission === transmission;

            const show = matchBrand && matchTransmission;

            card.hidden = !show;

            if (show) visible++;
        });

        count.textContent = `${visible} motorcycles`;
        empty.hidden = visible > 0;
    }

    brandFilter.addEventListener("change", filterMotorcycles);
    transmissionFilter.addEventListener("change", filterMotorcycles);

    filterMotorcycles();
});