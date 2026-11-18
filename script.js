
// ==========================================
// DESAFÍO A: CAMINAR O TOMAR TRANSPORTE
// ==========================================

// La distancia está en km y la velocidad en km/h.
// Multiplicamos por 60 para obtener minutos.

function tiempoMinutos(distancia, velocidad) {
    return (distancia / velocidad) * 60;
}

function calcularA() {

    // 1. Leer los datos del usuario.
    var d = parseFloat(document.getElementById("distancia").value);
    var vc = parseFloat(document.getElementById("velocidadCaminar").value);
    var vt = parseFloat(document.getElementById("velocidadTransporte").value);
    var pasaje = parseFloat(document.getElementById("pasaje").value);

    // 2. Validar los datos.
    if (isNaN(d) || isNaN(vc) || isNaN(vt) || isNaN(pasaje) ||
        d <= 0 || vc <= 0 || vt <= 0 || pasaje < 0) {

        document.getElementById("resultadoA").className = "resultado error";
        document.getElementById("resultadoA").innerHTML =
            "Escribe números válidos: distancia y velocidades mayores que cero, y pasaje no negativo.";

        document.getElementById("tablaA").innerHTML = "";
        return;
    }

    // 3. Aplicar las fórmulas.
    var caminar = tiempoMinutos(d, vc);
    var transporte = tiempoMinutos(d, vt);
    var diferencia = caminar - transporte;

    // 4. Comparar los dos escenarios.
    var comparacion = "Ambos tardan lo mismo.";

    if (diferencia > 0) {
        comparacion = "El transporte ahorra " +
            diferencia.toFixed(2) + " minutos.";
    }

    if (diferencia < 0) {
        comparacion = "Caminar ahorra " +
            (-diferencia).toFixed(2) + " minutos.";
    }

    // 5. Mostrar los resultados.
    document.getElementById("resultadoA").className = "resultado";

    document.getElementById("resultadoA").innerHTML =
        "<p><strong>Tiempo caminando:</strong> " + caminar.toFixed(2) + " min</p>" +
        "<p><strong>Tiempo en transporte:</strong> " + transporte.toFixed(2) + " min</p>" +
        "<p><strong>Diferencia (caminar - transporte):</strong> " + diferencia.toFixed(2) + " min</p>" +
        "<p><strong>Costo caminando:</strong> 0.00 Bs</p>" +
        "<p><strong>Costo en transporte:</strong> " + pasaje.toFixed(2) + " Bs</p>" +
        "<p><strong>Comparación:</strong> " + comparacion + "</p>";

    // 6. Realizar cinco pruebas.
    var filas = "";

    for (var i = 1; i <= 5; i++) {

        var pruebaD = d * i;
        var pruebaCaminar = tiempoMinutos(pruebaD, vc);
        var pruebaTransporte = tiempoMinutos(pruebaD, vt);
        var pruebaDiferencia = pruebaCaminar - pruebaTransporte;

        filas = filas + "<tr>" +
            "<td>" + i + "</td>" +
            "<td>" + pruebaD.toFixed(2) + "</td>" +
            "<td>" + pruebaCaminar.toFixed(2) + "</td>" +
            "<td>" + pruebaTransporte.toFixed(2) + "</td>" +
            "<td>" + pruebaDiferencia.toFixed(2) + "</td>" +
            "<td>" + pasaje.toFixed(2) + "</td>" +
            "</tr>";
    }

    document.getElementById("tablaA").innerHTML = filas;
}


// ==========================================
// DESAFÍO C: PANEL SOLAR
// ==========================================

// Modelo: E = P * h * cos(ángulo)

function energiaSolar(potencia, horas, angulo) {

    // Convertir grados a radianes.
    var radianes = angulo * Math.PI / 180;

    // Calcular la energía.
    return potencia * horas * Math.cos(radianes);
}

function calcularC() {

    // 1. Leer los datos.
    var p = parseFloat(document.getElementById("potencia").value);
    var h = parseFloat(document.getElementById("horas").value);
    var a1 = parseFloat(document.getElementById("angulo1").value);
    var a2 = parseFloat(document.getElementById("angulo2").value);
    var a3 = parseFloat(document.getElementById("angulo3").value);

    // 2. Validar los datos.
    if (isNaN(p) || isNaN(h) || isNaN(a1) || isNaN(a2) || isNaN(a3) ||
        p <= 0 || h <= 0 ||
        a1 < 0 || a1 > 90 ||
        a2 < 0 || a2 > 90 ||
        a3 < 0 || a3 > 90) {

        document.getElementById("resultadoC").className = "resultado error";

        document.getElementById("resultadoC").innerHTML =
            "Escribe potencia y horas mayores que cero; todos los ángulos deben estar entre 0° y 90°.";

        document.getElementById("tablaC").innerHTML = "";
        return;
    }

    // 3. Calcular la energía para cada ángulo.
    var e1 = energiaSolar(p, h, a1);
    var e2 = energiaSolar(p, h, a2);
    var e3 = energiaSolar(p, h, a3);

    // 4. Encontrar la mejor posición.
    var mejorAngulo = a1;
    var mejorEnergia = e1;

    if (e2 > mejorEnergia) {
        mejorAngulo = a2;
        mejorEnergia = e2;
    }

    if (e3 > mejorEnergia) {
        mejorAngulo = a3;
        mejorEnergia = e3;
    }

    // 5. Mostrar los resultados.
    document.getElementById("resultadoC").className = "resultado";

    document.getElementById("resultadoC").innerHTML =
        "<p><strong>Energía a " + a1 + "°:</strong> " + e1.toFixed(2) + " Wh</p>" +
        "<p><strong>Energía a " + a2 + "°:</strong> " + e2.toFixed(2) + " Wh</p>" +
        "<p><strong>Energía a " + a3 + "°:</strong> " + e3.toFixed(2) + " Wh</p>" +
        "<p><strong>Mejor ángulo de los ingresados:</strong> " + mejorAngulo + "°</p>" +
        "<p><strong>Mayor energía de los ingresados:</strong> " + mejorEnergia.toFixed(2) + " Wh (" +
        (mejorEnergia / 1000).toFixed(3) + " kWh)</p>";

    // 6. Crear cinco pruebas.
    var angulos = [0, 15, 30, 60, 90];
    var filas = "";

    for (var i = 0; i < 5; i++) {

        var angulo = angulos[i];
        var energia = energiaSolar(p, h, angulo);

        filas = filas + "<tr>" +
            "<td>" + (i + 1) + "</td>" +
            "<td>" + angulo + "</td>" +
            "<td>" + energia.toFixed(2) + "</td>" +
            "<td>" + (energia / 1000).toFixed(3) + "</td>" +
            "</tr>";
    }

    document.getElementById("tablaC").innerHTML = filas;
}


// ==========================================
// EJECUTAR AL ABRIR LA PÁGINA
// ==========================================

window.onload = function () {
    calcularA();
    calcularC();
};
