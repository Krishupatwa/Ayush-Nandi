// ================= FILTER + VIDEO HOVER =================
document.addEventListener("DOMContentLoaded", () => {

    // ── FILTER BUTTONS ──
    const buttons = document.querySelectorAll(".filter-btn");
    const cards   = document.querySelectorAll(".project-card");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            cards.forEach(card => {
                card.style.display =
                    (filter === "all" || filter === card.dataset.category)
                    ? "block"
                    : "none";
            });
        });
    });

    // ── VIDEO HOVER PLAY ──
    document.querySelectorAll(".project-card video").forEach(video => {
        video.addEventListener("mouseenter", () => {
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === "function") {
                playPromise.catch(() => {});
            }
        });
        video.addEventListener("mouseleave", () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // ── EXPLORE LINK (filter-aware) ──
    const exploreLink = document.getElementById("exploreLink");
    const links = {
        all:     "https://drive.google.com/drive/folders/1URT6phaLJU0rGzLwVT2z7jC5vx2NTwCe?usp=sharing",
        reels:   "https://drive.google.com/drive/folders/1URT6phaLJU0rGzLwVT2z7jC5vx2NTwCe?usp=sharing",
        youtube: "https://drive.google.com/drive/folders/1URT6phaLJU0rGzLwVT2z7jC5vx2NTwCe?usp=sharing",
        ads:     "https://drive.google.com/drive/folders/1URT6phaLJU0rGzLwVT2z7jC5vx2NTwCe?usp=sharing",
    };

    if (exploreLink) {
        exploreLink.href = links.all;

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                exploreLink.href = links[btn.dataset.filter] || links.all;
            });
        });
    }

});
