// Mostrar el botón al hacer scroll
window.onscroll = function() {
    const button = document.getElementById('backToTop');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        button.style.display = "block"; // Muestra el botón
    } else {
        button.style.display = "none"; // Oculta el botón
    }
};

// Desplazarse hacia arriba suavemente
document.getElementById('backToTop').onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Desplazamiento suave
    });
};
