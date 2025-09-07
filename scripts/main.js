document.addEventListener('DOMContentLoaded', () => {
    // Efeito de digitação
    const typingTarget = document.querySelector('[data-typing]');
    if (typingTarget) {
        const text = typingTarget.getAttribute('data-typing');
        let i = 0;
        const speed = 60;
        (function type() {
            typingTarget.textContent = text.slice(0, i);
            i++;
            if (i <= text.length) setTimeout(type, speed);
        })();
    }

    // Revelar seções ao rolar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .card').forEach((el) => observer.observe(el));

    // Atualizar ano no rodapé
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Botão voltar ao topo
    const toTop = document.querySelector('.to-top');
    const toggleToTop = () => {
        const show = window.scrollY > 600;
        toTop && toTop.classList.toggle('visible', show);
    };
    window.addEventListener('scroll', toggleToTop, { passive: true });
    toggleToTop();
});

(function () {
    emailjs.init("z5LzFv05BTID71ne5");
})();

function showAlert(message, type = "sucess") {
    const container = document.getElementById("alert-container");

    const alert = document.createElement("div");
    alert.className = `alert alert--${type}`;
    alert.textContent = message;

    container.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3500);
}

document.getElementById("form_contact").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_lqx07ju", "template_39ms3mr", this)
        .then(() => {
            showAlert("Mensagem enviada com sucesso!", "success");
            this.reset();
        })
        .catch((err) => {
            showAlert("Ops! Algo deu errado, tente novamente.", "error");
            console.error(err);
        });
});