const textEnglish = "Mexican food cooking class in Japan.\nDifusión de la cultura alimentaria de México."; // Texto en inglés
const textJapanese = "日本でのメキシコ料理の料理教室。\nメキシコの食文化の普及。"; // Texto en japonés
const textArray = [textEnglish, textJapanese]; // Array con los dos textos
let textIndex = 0; // Índice del texto actual
let index = 0; // Índice del carácter actual

function writeText() {
    if (index < textArray[textIndex].length) {
        const currentChar = textArray[textIndex].charAt(index);

        // Si el carácter es un salto de línea, usa <br> para crear una nueva línea
        if (currentChar === '\n') {
            document.getElementById('writingText').innerHTML += '<br>';
        } else {
            document.getElementById('writingText').innerHTML += currentChar;
        }

        index++;
        setTimeout(writeText, 100); // Cambia el valor para ajustar la velocidad
    } else {
        // Después de escribir el texto, espera 1 segundo y luego borra
        setTimeout(() => {
            eraseText();
        }, 3000); // Espera 1 segundo antes de borrar
    }
}

function eraseText() {
    if (index > 0) {
        // Borra el último carácter
        document.getElementById('writingText').innerHTML = textArray[textIndex].substring(0, index - 1);
        index--;
        setTimeout(eraseText, 50); // Cambia el valor para ajustar la velocidad de borrado
    } else {
        // Cambia al siguiente texto
        textIndex = (textIndex + 1) % textArray.length; // Cambia entre los textos
        index = 0; // Reinicia el índice del carácter
        setTimeout(writeText, 500); // Espera medio segundo antes de escribir el siguiente texto
    }
}

writeText(); // Inicia el efecto de escritura