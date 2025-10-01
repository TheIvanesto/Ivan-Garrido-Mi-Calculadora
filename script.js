// Variables globales para operaciones binarias
let operando1 = null;
let operador = null;
let logs = [];

// Utilidad para actualizar el campo informativo
const rellenar_info = (operacion, resultado) => {
    const info = document.getElementById('info');
    let mensaje = '';
    if (operacion === 'cuadrado') {
        if (resultado < 100) mensaje = 'Info: El resultado es menor que 100';
        else if (resultado >= 100 && resultado <= 200) mensaje = 'Info: El resultado está entre 100 y 200';
        else mensaje = 'Info: El resultado es superior a 200';
    } else if (operacion === 'suma') {
        mensaje = `Operación: Suma. Resultado entre 100 y 200: ${resultado >= 100 && resultado <= 200}`;
    } else if (operacion === 'csv') {
        mensaje = 'Lista de valores procesada.';
    } else if (operacion === 'raiz') {
        mensaje = resultado >= 0 ? 'Raíz de número positivo.' : 'Raíz de número negativo.';
    } else if (operacion === 'modulo') {
        mensaje = resultado < 0 ? 'Módulo de número negativo.' : 'Módulo de número positivo.';
    } else if (operacion === 'factorial') {
        mensaje = 'Factorial calculado.';
    } else if (operacion === 'cubo') {
        mensaje = 'Elevado al cubo.';
    } else if (operacion === 'potencia') {
        mensaje = `Elevado a la potencia.`;
    } else if (operacion === 'multiplicacion') {
        mensaje = 'Operación: Multiplicación.';
    } else if (operacion === 'media') {
        mensaje = 'Media calculada.';
    } else {
        mensaje = 'Operación realizada.';
    }
    info.textContent = mensaje;
};

// Validación de entrada
const validar = (entrada, tipo = 'numero') => {
    if (tipo === 'numero') {
        if (entrada === '' || isNaN(entrada)) {
            registrarError('Entrada vacía o no numérica');
            return false;
        }
        return true;
    } else if (tipo === 'csv') {
        if (!entrada || entrada.trim() === '') {
            registrarError('Lista CSV vacía');
            return false;
        }
        const valores = entrada.split(',').map(v => v.trim());
        if (valores.length === 0 || valores.some(v => v === '' || isNaN(v))) {
            registrarError('Lista CSV incompleta o con valores no numéricos');
            return false;
        }
        return true;
    }
    return false;
};

// Registro de errores
const registrarError = (mensaje) => {
    logs.push(`${new Date().toLocaleString()}: ${mensaje}`);
    document.getElementById('logErrores').value = logs.join('\n');
    document.getElementById('info').textContent = 'Error: ' + mensaje;
};

// Operaciones unitarias
const cuadrado = () => {
    const input = document.getElementById('input').value;
    if (!validar(input)) return;
    const resultado = Math.pow(Number(input), 2);
    document.getElementById('resultado').value = resultado;
    rellenar_info('cuadrado', resultado);
};

const mod = () => {
    const input = document.getElementById('input').value;
    if (!validar(input)) return;
    const num = Number(input);
    const resultado = num < 0 ? -num : num;
    document.getElementById('resultado').value = resultado;
    rellenar_info('modulo', resultado);
};

const fact = () => {
    const input = document.getElementById('input').value;
    if (!validar(input)) return;
    const num = Number(input);
    if (num < 0 || !Number.isInteger(num)) {
        registrarError('El factorial solo está definido para enteros no negativos');
        return;
    }
    let resultado = 1;
    for (let i = 2; i <= num; i++) resultado *= i;
    document.getElementById('resultado').value = resultado;
    rellenar_info('factorial', resultado);
};

const raiz = () => {
    const input = document.getElementById('input').value;
    if (!validar(input)) return;
    const num = Number(input);
    const resultado = Math.sqrt(num);
    document.getElementById('resultado').value = resultado;
    rellenar_info('raiz', num);
};

const cubo = () => {
    const input = document.getElementById('input').value;
    if (!validar(input)) return;
    const resultado = Math.pow(Number(input), 3);
    document.getElementById('resultado').value = resultado;
    rellenar_info('cubo', resultado);
};

const potenciar = () => {
    const input = document.getElementById('input').value;
    const potencia = document.getElementById('potencia').value;
    if (!validar(input) || !validar(potencia)) return;
    const resultado = Math.pow(Number(input), Number(potencia));
    document.getElementById('resultado').value = resultado;
    rellenar_info('potencia', resultado);
};

// Operaciones binarias
const prepararOperacion = (op) => {
    const input = document.getElementById('input').value;
    if (!validar(input)) return;
    operando1 = Number(input);
    operador = op;
    document.getElementById('input').value = '';
    document.getElementById('info').textContent = `Operador ${op} preparado. Introduce el segundo número y pulsa =`;
};

const eq = () => {
    const input = document.getElementById('input').value;
    if (!validar(input)) return;
    const operando2 = Number(input);
    let resultado;
    if (operador === 'suma') resultado = operando1 + operando2;
    else if (operador === 'multiplicacion') resultado = operando1 * operando2;
    else {
        registrarError('Operador no soportado');
        return;
    }
    document.getElementById('resultado').value = resultado;
    rellenar_info(operador, resultado);
    operando1 = null;
    operador = null;
};

// Operaciones CSV
const sumatorio = () => {
    const input = document.getElementById('input').value;
    if (!validar(input, 'csv')) return;
    const valores = input.split(',').map(Number);
    const resultado = valores.reduce((a, b) => a + b, 0);
    document.getElementById('resultado').value = resultado;
    rellenar_info('csv', resultado);
};

const media = () => {
    const input = document.getElementById('input').value;
    if (!validar(input, 'csv')) return;
    const valores = input.split(',').map(Number);
    const resultado = valores.reduce((a, b) => a + b, 0) / valores.length;
    document.getElementById('resultado').value = resultado;
    rellenar_info('media', resultado);
};

const ordenar = () => {
    const input = document.getElementById('input').value;
    if (!validar(input, 'csv')) return;
    const valores = input.split(',').map(Number).sort((a, b) => a - b);
    document.getElementById('resultado').value = valores.join(', ');
    rellenar_info('csv', valores);
};

const revertir = () => {
    const input = document.getElementById('input').value;
    if (!validar(input, 'csv')) return;
    const valores = input.split(',').map(Number).reverse();
    document.getElementById('resultado').value = valores.join(', ');
    rellenar_info('csv', valores);
};

const quitar = () => {
    const input = document.getElementById('input').value;
    const elemento = document.getElementById('quitarElemento').value;
    if (!validar(input, 'csv')) return;
    let valores = input.split(',').map(v => v.trim());
    if (elemento) {
        const idx = valores.indexOf(elemento);
        if (idx === -1) {
            registrarError('Elemento no encontrado en la lista');
            return;
        }
        valores.splice(idx, 1);
    } else {
        valores.pop();
        valores.pop();
    }
    document.getElementById('resultado').value = valores.join(', ');
    rellenar_info('csv', valores);
};

// Descargar logs
const descargarLogs = () => {
    const blob = new Blob([logs.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logs_errores.txt';
    a.click();
    URL.revokeObjectURL(url);
};

// Accesibilidad: navegación por teclado
const botones = document.querySelectorAll('.botones button');
botones.forEach(btn => {
    btn.addEventListener('keydown', e => {
        if (e.key === 'Tab') btn.classList.add('active');
    });
    btn.addEventListener('keyup', e => {
        btn.classList.remove('active');
    });
});

// Animación de carga para operaciones CSV
const animarCarga = () => {
    const resultado = document.getElementById('resultado');
    resultado.classList.add('loading');
    setTimeout(() => resultado.classList.remove('loading'), 800);
};

// Asignación de eventos
window.onload = () => {
    document.getElementById('cuadrado').onclick = cuadrado;
    document.getElementById('modulo').onclick = mod;
    document.getElementById('factorial').onclick = fact;
    document.getElementById('raiz').onclick = raiz;
    document.getElementById('cubo').onclick = cubo;
    document.getElementById('potenciar').onclick = potenciar;
    document.getElementById('suma').onclick = () => prepararOperacion('suma');
    document.getElementById('multiplicacion').onclick = () => prepararOperacion('multiplicacion');
    document.getElementById('igual').onclick = eq;
    document.getElementById('sumatorio').onclick = () => { animarCarga(); sumatorio(); };
    document.getElementById('media').onclick = () => { animarCarga(); media(); };
    document.getElementById('ordenar').onclick = () => { animarCarga(); ordenar(); };
    document.getElementById('revertir').onclick = () => { animarCarga(); revertir(); };
    document.getElementById('quitar').onclick = () => { animarCarga(); quitar(); };
    document.getElementById('descargarLogs').onclick = descargarLogs;
};
