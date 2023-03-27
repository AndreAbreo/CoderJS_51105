const btnSwal = document.getElementById('botonSwal');

let clientes = [];

if (localStorage.getItem('clientes')) {
  clientes = JSON.parse(localStorage.getItem('clientes'));
} else if (sessionStorage.getItem('clientes')) {
  clientes = JSON.parse(sessionStorage.getItem('clientes'));
}

document.querySelector('#formulario').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.querySelector('#inputNombre').value;
  const apellido = document.querySelector('#inputApellido').value;
  const cedula = document.querySelector('#inputCedula').value;
  const pass = document.querySelector('#inputPassword').value;
  const categoria = document.querySelector('#inputCategoria').value;

  const usuarioRegistrado = clientes.some(function (cliente) {
    return cliente.cedula === cedula;
  });

  if (usuarioRegistrado) {
      Swal.fire({
      title: 'Este usuario ya está registrado',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
    
    document.querySelector('#formulario').reset();

    return;
  }

  const cliente = {
    nombre: nombre,
    apellido: apellido,
    cedula: cedula,
    pass: pass,
    categoria: categoria
  };

  clientes.push(cliente);

  if (document.querySelector('#gridCheck').checked) {
    localStorage.setItem('clientes', JSON.stringify(clientes));
  } else {
    sessionStorage.setItem('clientes', JSON.stringify(clientes));
  }
  Swal.fire({
    title: 'FELICITACIONES!!',
    text: 'Usted a registrado a un nuevo cliente',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  })
  document.querySelector('#formulario').reset();
});

let prestamos = [];

if (localStorage.getItem('prestamos') !== null) {
  prestamos = JSON.parse(localStorage.getItem('prestamos'));
}

let simularBtn = document.querySelector("#simularBtn");
let confirmarBtn = document.querySelector("#confirmarBtn");

let montoInput;
let cuotasInput;
let montCouta;
let total;
let cedulaInput;

if (simularBtn) {
  simularBtn.addEventListener("click", function () {
    montoInput = document.querySelector("#monto");
    cuotasInput = document.querySelector("#cuotas");
    cedulaInput = document.querySelector("#cedula");
    let outputMontoCouta = document.querySelector("#monto-couta");
    let outputTotal = document.querySelector("#total");

    if (!montoInput.value || !cuotasInput.value || !cedulaInput.value) {
        Swal.fire({
        title: 'Por favor, complete los campos de MONTO, CUOTAS y CÉDULA',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return;
    }

    let recargo = 0;

    switch (cuotasInput.value) {
      case "6":
        recargo = parseInt(montoInput.value) * 0.15;
        montCouta = ((parseInt(montoInput.value) + recargo) / 6).toFixed(2);
        break;
      case "12":
        recargo = parseInt(montoInput.value) * 0.19;
        montCouta = ((parseInt(montoInput.value) + recargo) / 12).toFixed(2);
        break;
      case "18":
        recargo = parseInt(montoInput.value) * 0.24;
        montCouta = ((parseInt(montoInput.value) + recargo) / 18).toFixed(2);
        break;
    }

    total = (parseInt(montoInput.value) + recargo).toFixed(2);

    if (outputMontoCouta) {
      outputMontoCouta.innerHTML = "$" + montCouta;
    }

    if (outputTotal) {
      outputTotal.innerHTML = "$" + total;
    }
  });
}

if (confirmarBtn) {
  confirmarBtn.addEventListener("click", function () {
    if (!montoInput.value || !cuotasInput.value || !cedulaInput.value) {
      Swal.fire({
        title: 'Por favor, complete los campos de MONTO, CUOTAS y CÉDULA',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return;
    }

    let prestamo = {
      cedula: cedulaInput.value,
      monto: montoInput.value,
      cuotas: cuotasInput.value,
      montoCuota: montCouta,
      total: total
    };

    prestamos.push(prestamo);
    localStorage.setItem('prestamos', JSON.stringify(prestamos));
    Swal.fire({
      title: 'FELICITACIONES!!',
      text: 'Usted a adquirido un nuevo préstamo',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    })
    actualizarTotal();
    cedulaInput.value = "";
    montoInput.value = "";
    cuotasInput.value = "";
  });
}

function buscarCliente(cedula) {
  return clientes.find((cliente) => cliente.cedula === cedula);
}

function buscarPrestamos(cedula) {
  return prestamos.filter((prestamo) => prestamo.cedula === cedula);
}

let buscarBtn = document.getElementById("buscarBtn")
let resultadoDiv = document.querySelector("#resultado");

buscarBtn.addEventListener("click", function () {
  resultadoDiv.innerHTML = "";

  let cedulaInput = document.getElementById("cedula1");
  let cedula = cedulaInput.value;

  let cliente = buscarCliente(cedula);

  if (cliente) {
    resultadoDiv.innerHTML = `Cliente encontrado: <br>Nombre: ${cliente.nombre} ${cliente.apellido} (${cliente.categoria})`;
  }

  let prestamos = buscarPrestamos(cedula);

  if (prestamos.length > 0) {
    resultadoDiv.innerHTML += `<br>Préstamos encontrados:<ul>`;
    prestamos.forEach((prestamo) => {
      resultadoDiv.innerHTML += `<li>Monto: $${prestamo.monto}, Cuotas: ${prestamo.cuotas}, Monto cuota: $${prestamo.montoCuota}, Total a pagar: $${prestamo.total}</li>`;
    });
    resultadoDiv.innerHTML += `</ul>`;
  } else {
    resultadoDiv.innerHTML += `<br>No se encontraron préstamos para esta cédula.`;
  }
  let offcanvas = document.getElementById("offcanvasDarkNavbar");
  let offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
  offcanvasInstance.hide();
  cedulaInput.value = "";

});

function actualizarTotal() {
  let total = prestamos.reduce((acumulador, prestamo) => acumulador + Number(prestamo.monto), 0);
  document.getElementById("total1").innerHTML = `$${total}`;
}


// Actualizar total al cargar la página
actualizarTotal();



// Simulador creado por André Abreo //
