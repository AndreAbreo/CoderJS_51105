class Cliente {
    constructor(nombre, apellido, cedula) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.cedula = cedula;
    }
  }
  
  let clientes = [];
  let continuarConsulta = true;
  
  alert("Bienvenido al simulador de Préstamos: ¿Estás listo para comenzar?");
  
  let agregarCliente = prompt("Quiere registrarse como cliente? s/n");
while (true) {
  if (agregarCliente.toUpperCase() === "S") {
    let nuevoCliente = new Cliente(prompt("Ingrese su nombre:"), prompt("Ingrese su apellido:"), prompt("Ingrese su cédula: (solo números sin puntos ni guiones)"));
    clientes.push(nuevoCliente);
  } else {
    break;
  }
  agregarCliente = prompt("Quiere registrar otro cliente? s/n");
}
  
  while (continuarConsulta) {
    let monto = prompt("Ingrese el monto que quiere pedir en $ (solo números sin puntos ni guiones)");
    let cantCuotas = prompt("Ingrese cantidad de cuotas a pagar: 6, 12 o 18");
    let montCouta = 0;
    let recargo = 0;
  
    while (cantCuotas !== "6" && cantCuotas !== "12" && cantCuotas !== "18") {
      cantCuotas = prompt("Cantidad de cuotas inválida. Ingrese 6, 12 o 18.");
    }
  
    switch (cantCuotas) {
      case "6":
        recargo = parseInt(monto) * 0.15;
        montCouta = ((parseInt(monto) + recargo) / 6).toFixed(2);
        break;
      case "12":
        recargo = parseInt(monto) * 0.19;
        montCouta = ((parseInt(monto) + recargo) / 12).toFixed(2);
        break;
      case "18":
        recargo = parseInt(monto) * 0.24;
        montCouta = ((parseInt(monto) + recargo) / 18).toFixed(2);
        break;
    }
  
    let total = (parseInt(monto) + recargo).toFixed(2);
  
    alert("El monto de la cuota que debe abonar es $" + montCouta);
    alert("El monto total del préstamo que debe abonar es $" + total);
  
    continuarConsulta = prompt("Desea consultar de nuevo (s/n):") === "s";  
  
    if (!continuarConsulta) {
      let buscarCliente = prompt("Desea buscar si ya esta registrado como cliente (s/n):") === "s";
  
      if (buscarCliente) {
        let cedulaCliente = prompt("Ingrese su número de cédula (solo números sin puntos ni guiones)");
  
        let clienteEncontrado = clientes.find(cliente => cliente.cedula === cedulaCliente);
  
        if (clienteEncontrado) {
            alert(`El cliente con la cédula ${clienteEncontrado.cedula} ya esta registrado.`);
        } else {
            alert(`El cliente con la cédula ${cedulaCliente} no existe.`);
        }
      }
    }
  }
  
  function recargarPagina() {
    location.reload();
  }
  
// Simulador creado por André Abreo //
