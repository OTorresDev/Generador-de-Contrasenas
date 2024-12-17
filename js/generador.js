//Selección de Elementos
const cantidad = document.querySelector(".cantidad");
const btnGenerar = document.querySelector(".btn-generar");
const btnLimpiar = document.querySelector(".btn-limpiar");
const contraseña = document.querySelector(".contraseña");
const alerta = document.querySelector(".alerta");

//Caracteres disponibles para la contraseña
const MAYUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const NUMEROS = "0123456789";
const ESPECIALES = "!@#$%^&*()";

const caracteres = MAYUSCULAS + MINUSCULAS + NUMEROS + ESPECIALES;

//Asignar eventos
btnGenerar.addEventListener("click", generarContraseña);
btnLimpiar.addEventListener("click", limpiarFormulario);

//Función para generar la contraseña
function generarContraseña(e) {
    e.preventDefault();

    const longitud = parseInt(cantidad.value);
    
    if (!longitudValida(longitud)) return;

    const password = Array.from({ length: longitud }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join("");
    contraseña.value = password;
    validarContraseña(password);  
}

//Validar si la longitud es correcta
function longitudValida(longitud) {
    if (isNaN(longitud) || longitud == "") {
        mostrarAlerta("No has ingresado un número de caracter valido.", "error");
        return false;
    } else if (isNaN(longitud) || longitud < 8) {
        mostrarAlerta("La cantidad de caracteres debe ser mayor o igual a 8.", "error");
        return false;
    }
    return true;
}

//Mostrar alerta con mensaje y tipo
function mostrarAlerta(mensaje, tipo) {
    alerta.textContent = mensaje;
    alerta.className = `alerta ${tipo}`;
    alerta.style.display = "block";
    setTimeout(ocultarAlerta, 3000);
}

//Ocultar Alerta
function ocultarAlerta(){
    alerta.style.display = "none";
}

//Validar la fuerza de la contraseña
function validarContraseña(password) {
    let esFuerte = /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()]/.test(password);
    esFuerte ? mostrarAlerta("La contraseña es fuerte.", "success") 
    : mostrarAlerta("Contraseña debil. Incluye mayúsculas, minúsculas, números y caracteres especiales.", "error");
}

// Función para limpiar los campos
function limpiarFormulario(e){
    e.preventDefault();
    contraseña.value = "";
    cantidad.value = "";
    ocultarAlerta();
}

// Copiar la contraseña al portapapeles
function copiarContraseña(){
    if(!contraseña.value){
        mostrarAlerta("No hay ninguna contraseña para copiar.", "error");
        return;
    }
    contraseña.select();
    document.execCommand("copy");
    mostrarAlerta("Contraseña copiada al portapapeles.", "success");
}