const btn_encriptar = document.getElementById("btn_encriptar");
const btn_desencriptar = document.getElementById("btn_desencriptar");
const btn_copiar = document.getElementById("btn_copiar");
const input = document.getElementById("input_texto");
const inicio = document.getElementById('inicio');
const resultado = document.getElementById("resultado");
const circle_alert = document.getElementById("circle_alert");


// funcion para  filtrar datos ingresados
const func_error = (texto) => {
  if (texto.trim() === "") {
    input.placeholder = "Debe ingresar texto";
    input.classList.add("error-color");
  } else if (!/^[a-z\s]+$/u.test(texto)) {
    document.getElementById("error_message").style.color = "red";
    circle_alert.src = "./img/circle-red.svg";
  } else {
    input.placeholder = "Ingrese el texto aqui";
    input.classList.remove("error-color");
    document.getElementById("error_message").style.color = "#495057";
    circle_alert.src = "./img/circle-gray.svg";
    return true;
  }
}

// evento encriptar
btn_encriptar.addEventListener("click", () => {
  let texto_ingresado = input.value;
  if (func_error(texto_ingresado)) {
    let texto_encriptado = encriptarTexto(texto_ingresado);
    document.getElementById("textoEncriptado").innerHTML = texto_encriptado;
    input.value = '';
    inicio.style.display = "none";
    resultado.style.display = "flex";
  }
  
});
// envento desencriptar
btn_desencriptar.addEventListener("click", () => {
  let texto_encriptado = input.value;
  if (func_error(texto_encriptado)) {
    let texto_desencriptado = desencriptarTexto(texto_encriptado);
    document.getElementById("textoEncriptado").innerHTML = texto_desencriptado;
    input.value = "";
    inicio.style.display = "none";
    resultado.style.display = 'flex'
  }
});
btn_copiar.addEventListener("click", () => {
  let contenido_a_copiar = document.getElementById("textoEncriptado").textContent;
  
  const texto_temporal = document.createElement("textarea");
  texto_temporal.value = contenido_a_copiar;
  document.body.appendChild(texto_temporal);
  texto_temporal.select();
  // document.execCommand("copy"); este metodo ya esta en desuso
  navigator.clipboard.writeText(contenido_a_copiar)
  document.body.removeChild(texto_temporal);

  document.getElementById("message_copiado").innerHTML = '¡Mensaje copiado con éxito!';
  setTimeout(() => {
    document.getElementById("message_copiado").innerHTML = "";
  },2000)
   
});
// funcion encriptar
const encriptarTexto = (texto) => {
  let encriptacion = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };
  let texto_encriptado = texto.replace(/[eioua]/g, (letra) => {
    return encriptacion[letra];
  });
  return texto_encriptado;
};
// funcion desencriptar
const desencriptarTexto = (texto_encriptado) => {
  let desencriptacion = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };
  let texto_desencriptado = texto_encriptado.replace(
    /(enter|imes|ai|ober|ufat)/g,
    (clave) => {
      return desencriptacion[clave];
    }
  );
  return texto_desencriptado;
};

