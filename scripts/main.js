const cards = document.querySelectorAll(".card");
let current = 0;

function updateCards() {
    cards.forEach((card, index) => {
        card.classList.remove("active", "left", "right");

        if (index === current) {
            card.classList.add("active");
        } else if (index === (current - 1 + cards.length) % cards.length) {
            card.classList.add("left");
        } else if (index === (current + 1) % cards.length) {
            card.classList.add("right");
        }
    });
}

document.getElementById("next").addEventListener("click", () => {
    current = (current + 1) % cards.length;
    updateCards();
});

document.getElementById("prev").addEventListener("click", () => {
    current = (current - 1 + cards.length) % cards.length;
    updateCards();
});

updateCards();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // bloqueia o comportamento padrão

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth', // rolagem suave
                block: 'start'      // topo da seção
            });
        }
    });
});