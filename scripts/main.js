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
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CÓDIGO DO FORMULÁRIO DE MENSAGEM
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form-contato');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-popup');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("https://formsubmit.co/ajax/diniz.alexandreh@gmail.com", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            popup.style.display = 'flex';
            form.reset();
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Houve um erro ao enviar a mensagem. Tente novamente!");
        });
    });

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target == popup) {
            popup.style.display = 'none';
        }
    });
});