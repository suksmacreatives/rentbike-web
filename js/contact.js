document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const service = document.getElementById("contactService").value;
        const date = document.getElementById("contactDate").value;
        const message = document.getElementById("contactMessage").value.trim();

        const formattedDate = date
            ? new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })
            : "Belum ditentukan";

        const whatsappMessage = [
            "Halo Juli Rentbike, saya ingin bertanya mengenai layanan rental.",
            "",
            `Nama: ${name}`,
            `Email: ${email}`,
            `Kebutuhan: ${service}`,
            `Tanggal rental: ${formattedDate}`,
            "",
            "Pesan:",
            message
        ].join("\n");

        // Ganti nomor ini dengan nomor WhatsApp resmi Juli Rentbike.
        const whatsappNumber = "6281234567890";

        const whatsappUrl =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
});
