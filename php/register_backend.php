<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener y sanitizar los datos del formulario
    $nombre = htmlspecialchars(trim($_POST['nombre']));
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);

    // Validar que los campos no estén vacíos ni inválidos
    if (!$nombre || !$email) {
        echo "Por favor, completa todos los campos correctamente.";
        exit;
    }

    try {
        // Conectar a la base de datos SQLite (archivo .sqlite3)
        $db = new PDO("sqlite:maicito_tallerBD.sqlite");

        // Configurar el manejo de errores para SQLite
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Crear la tabla si no existe
        $sql = "CREATE TABLE IF NOT EXISTS registros (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre_completo TEXT NOT NULL,
                    correo TEXT NOT NULL UNIQUE,
                    fecha_inscripcion TEXT DEFAULT CURRENT_TIMESTAMP
                )";

        $db->exec($sql);

        $sql_select = "SELECT * FROM registros";

        $result = $db->query($sql_select);


        // Verificar la existencia de la tabla
        $sqlCheck = "SELECT name FROM sqlite_master WHERE type='table' AND name='registros'";
        $result = $db->query($sqlCheck);

        // Preparar la inserción del registro en la base de datos
        $stmt = $db->prepare("INSERT INTO registros (nombre_completo, correo) VALUES (:nombre, :email)");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':email', $email);

        if ($stmt->execute()) {
            echo '<div class="alert alert-success" role="alert" style="background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 5px; padding: 10px; margin-top: 10px; text-align: center;">';
            echo "¡Registro exitoso! Te has inscrito a los cursos.";
            echo '</div>';
        }
        
    } catch (PDOException $e) {
        // Manejar errores (por ejemplo, email duplicado)
        if ($e->getCode() == 23000) {  // Código de error de restricción UNIQUE
            echo "El correo ya está registrado.";
        } else {
            echo "Error en la base de datos: " . $e->getMessage();
        }
    }
}
?>
