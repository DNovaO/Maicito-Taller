document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío normal del formulario

    // Crear un objeto FormData para enviar los datos del formulario
    var formData = new FormData(this);

    // Hacer la solicitud AJAX
    fetch('php/register_backend.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Mostrar la respuesta en el contenedor
        document.getElementById('mensaje').innerHTML = data;
        document.getElementById('registroForm').reset(); // Limpiar el formulario
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mensaje').innerHTML = "Ocurrió un error al enviar el registro.";
    });
});