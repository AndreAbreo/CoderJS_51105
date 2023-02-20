alert("Bienvenido al simulador de Préstamos: Estás listo para comenzar?")

let monto = prompt("Ingrese el monto que quiere pedir en $ (solo numeros sin puntos ni guiones)");
let cantCuotas = prompt("Ingrese cantidad de cuotas: 6, 12 o 18 ");
let montCouta = 0;
let recargo = 0;
function recargarPagina() {
    location.reload();
  }  

while (cantCuotas !== "6" && cantCuotas !== "12" && cantCuotas !== "18") {
    cantCuotas = prompt("Cantidad de cuotas inválida. Ingrese 6, 12 o 18.")}

switch (cantCuotas) {
    case "6":
        recargo = (parseInt(monto) * 0.15);
        montCouta = ((parseInt(monto) + recargo) / 6).toFixed(2);
        break;
    case "12":
        recargo = (parseInt(monto) * 0.19);
        montCouta = ((parseInt(monto) + recargo) / 12).toFixed(2);
        break;
    case "18":
        recargo = (parseInt(monto) * 0.24);
        montCouta = ((parseInt(monto) + recargo) / 18).toFixed(2);
        break;
}

let total = (parseInt(monto) + recargo).toFixed(2);

alert("El monto de la cuota que debe abonar es $" + montCouta);
alert("El monto total del préstamo que debe abonar es $" + total);

let continuar = (prompt("Desea consultar de nuevo: s/n"));
if (continuar != "S" && continuar != "s") { 
    alert("Gracias; vuelva a recargar la página para simular otro préstamo.");
} else { recargarPagina(); }
    
    // Simulador creado por André Abreo //
