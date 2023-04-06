const btnSwal = document.getElementById('botonSwal');

// Registrar un nuevo cliente
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

// Simular un nuevo prestamo
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

// Buscar clientes y/o prestamos
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
    resultadoDiv.innerHTML = `Cliente encontrado: <br>Nombre: ${cliente.nombre} ${cliente.apellido} Cédula ${cliente.cedula} (${cliente.categoria})`;
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



  cedulaInput.value = "";

});

// Acumulador de prestamos
function actualizarTotal() {
  let total = prestamos.reduce((acumulador, prestamo) => acumulador + Number(prestamo.monto), 0);
  document.getElementById("total1").innerHTML = `$${total}`;
}

// login de cliente
const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;


  if (username.trim() === "" || password.trim() === "") {
    Swal.fire({
      title: 'Por favor, ingresa tu Cédula y Contraseña',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    })
    return;
  }

  let cliente = null;
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula === username) {
      cliente = clientes[i];
      break;
    }
  }

  if (cliente === null) {
    Swal.fire({
      title: 'Usuario no autorizado',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
    return;
  }

  if (cliente.pass !== password) {
    Swal.fire({
      title: 'Contraseña incorrecta',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
    return;
  }

  // Redirigimos a la página "info.html"
  window.location.href = "info.html";
});


// Uso de API
const formulario = document.querySelector("#form-search");
const selectCripto = document.querySelector("#criptomonedas");
const formularioContenedor = document.querySelector(".form-side");
const contenedorRespuesta = document.querySelector(".container-answer");

const objBusqueda = {
  moneda: 'USD',
  criptomoneda: ''
}

document.addEventListener('DOMContentLoaded', () => {
  consultarCriptos();

  formulario.addEventListener('submit', enviarFormulario);
  selectCripto.addEventListener('change', obtenerValor);
})

async function enviarFormulario(e) {
  e.preventDefault();
  const { moneda, criptomoneda } = objBusqueda;
  if (criptomoneda === '') {
    mostrarError('Seleccione una criptomoneda...');
    return;
  }
  try {
    const resultado = await consultarAPI(moneda, criptomoneda);
    mostrarCotizacion(resultado.DISPLAY[criptomoneda][moneda]);
  } catch (error) {
    console.log(error);
  }
}

async function consultarAPI(moneda, criptomoneda) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error('No se pudo obtener la cotización.');
  }
  const resultadoJson = await respuesta.json();
  return resultadoJson;
}

function mostrarCotizacion(data) {
  limpiarHTML();
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = data;
  const respuesta = document.createElement('div');
  respuesta.classList.add('display-info');
  respuesta.innerHTML = `
    <p class="main-price">Precio: <span>${PRICE}</span></p>
    <p>Precio más alto del día:: <span>${HIGHDAY}</span></p>
    <p>Precio más bajo del día: <span>${LOWDAY}</span></p>
    <p>Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>
    <p>Última Actualización: <span>${LASTUPDATE}</span></p>
  `;
  contenedorRespuesta.appendChild(respuesta);
}

function mostrarError(mensaje) {
  const error = document.createElement('p');
  error.classList.add("error");
  error.textContent = mensaje;
  formularioContenedor.appendChild(error);
  setTimeout(() => error.remove(), 3000);
}

function obtenerValor(e) {
  objBusqueda[e.target.name] = e.target.value;
}

async function consultarCriptos() {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error('No se pudo obtener la lista de criptomonedas.');
    }
    const respuestaJson = await respuesta.json();
    selectCriptos(respuestaJson.Data);
  } catch (error) {
    console.log(error);
  }
}

function selectCriptos(criptos) {
  criptos.forEach(cripto => {
    const { FullName, Name } = cripto.CoinInfo;
    const opcion = document.createElement("option");
    opcion.value = Name;
    opcion.textContent = FullName;
    selectCripto.appendChild(opcion);
  });
}

function limpiarHTML() {
  contenedorRespuesta.innerHTML = '';
}

// Actualizar total al cargar la página
actualizarTotal();

// PROGRAMA DE SIMULACIÓN REALIZADO POR ANDRÉ ABREO
