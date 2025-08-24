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

// CÓDIGO DO FORMULÁRIO DE MENSAGEM
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form-contato');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-popup');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // impede o envio normal

        const formData = new FormData(form); // pega os dados do formulário

        fetch("https://formsubmit.co/ajax/diniz.alexandreh@gmail.com", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // opcional: para debug
            popup.style.display = 'flex'; // mostra popup de sucesso
            form.reset(); // limpa o formulário
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