document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".skill-card");
    if (!cards.length) return;

    const animateCard = (card) => {
        const idx = parseInt(card.dataset.index || "0", 10);
        const fill = card.querySelector(".progress-fill");
        const pct = card.querySelector(".skill-percent");
        const target = parseInt((pct && pct.dataset.target) || "0", 10);

        setTimeout(() => {
            card.classList.add("in-view");

            if (!fill || !pct) return;

            setTimeout(() => {
                fill.style.width = fill.dataset.width || "0%";

                let count = 0;
                const step = Math.max(1, Math.ceil(target / 60));
                const timer = setInterval(() => {
                    count = Math.min(count + step, target);
                    pct.textContent = count + "%";
                    if (count >= target) clearInterval(timer);
                }, 25);
            }, 400);
        }, idx * 130);
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                animateCard(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        cards.forEach(card => observer.observe(card));
    } else {
        cards.forEach(animateCard);
    }

    cards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);

            const rotX = (-dy * 12).toFixed(2);
            const rotY = (dx * 12).toFixed(2);
            const gX = (50 + dx * 30).toFixed(1);
            const gY = (50 + dy * 30).toFixed(1);
            const glow = card.querySelector(".card-glow");

            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgba(255,106,0,0.22), transparent 65%)`;
            }
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            const glow = card.querySelector(".card-glow");
            if (glow) {
                glow.style.background = "";
            }
        });
    });
});
