
//14. TRABAJO GRUPAL
// Elaborar un programa que permita al admin a traves de prompts y alerts lo siguiente:
 
// CREATE
// El admin debe poder crear un nuevo registro de usuario utilizando la funcion 10. (Pueden utilizar un boton que diga "Crear Usuario")

// const Create 
const root = document.getElementById("root");


// El admin debe poder crear un nuevo registro de usuario utilizando la funcion 10. (Pueden utilizar un boton que diga "Crear Usuario")

// objeto creado
let userAdmin = {
    id:0,
    nombre:'',
    apellido: '',
    edad:0,
    profesion:'',
    fecha:'', 
    fecha_actu:''
}

// array para recbir objeto
let lista =[];

let eliminar = false;


function insertarEmpleado(){
    let nombreV = prompt("Escribe tu nombre");
    let apellidoV = prompt("Escribe tu apellido");
    let edadV = parseInt(prompt("Escribe tu edad"));
    let profesionV = prompt("Escribe la profesion");

    if(nombreV=='' || apellidoV==''||edadV==''){
        alert("todos los campos rellena");
        return;
    }
   
    userAdmin.profesion=profesionV;
    userAdmin.nombre = nombreV;
    userAdmin.apellido = apellidoV;
    userAdmin.edad = edadV;
    userAdmin.id++;
    userAdmin.fecha_actu='';

    // Generando la fecha con segundos
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    userAdmin.fecha = hoy.toUTCString();
    crearEmpleado();
}


function crearEmpleado(){
    lista.push({...userAdmin});
    mostrarUsuariosTabla(lista)
}



//READ

  function ordenarPorAtributo(atributo) {
  
    let validInput = ["id", "nombre", "apellido", "edad","profesion", "fecha", "fecha actualizada"]
  
    if (validInput.includes(atributo)) {
      if (atributo === "edad" || atributo === "id") {
        lista.sort((a, b) => a[atributo] - b[atributo])
      } else if(atributo=="profesion" || atributo=="nombre" || atributo=="apellido"){
        lista.sort((a, b) => a[atributo].localeCompare(b[atributo]));
      }
    } else {
      console.log("Debes ingresar un atributo válido");
    }
  }
  
  
  //mostrar encabezado
  const columnas = ["id", "nombre", "apellido", "edad","profesion", "fecha", "fecha actualizada"]
  const table = document.createElement("table")
  table.classList.add("table", "table-bordered")
  
  const thead = document.createElement("thead")
  const trHead = document.createElement("tr")
  
  columnas.forEach(columna => {
    const th = document.createElement("th")
    th.textContent = columna
    th.addEventListener("click", (e) => {
      ordenarPorAtributo(e.target.textContent);
      table.innerHTML = ""
      table.appendChild(thead)
      mostrarUsuariosTabla(lista)
    })
    trHead.appendChild(th)
  })
  thead.appendChild(trHead)
  table.appendChild(thead)
  root.appendChild(table)
  
  
  //funcion mostrar los usuarios en la tabla
  function mostrarUsuariosTabla(lista) {
    table.innerHTML = ""
    table.append(thead)
    for (const index in lista) {
      const tr = document.createElement("tr")
      for (const key in lista[index]) {
        const td = document.createElement("td")
        td.textContent = lista[index][key]
        tr.append(td)
      }
      table.append(tr)
    }
    console.log(lista)
  }
  mostrarUsuariosTabla(lista)
  
  

  // eliminar data
  // Eliminar Empleado
function eliminarData(){

    eliminar = true;
    let id = parseInt(prompt("Ingrese el id a eliminar"));

    lista = lista.filter(data=>data.id !== id);


    mostrarUsuariosTabla(lista);
    return eliminar;
}
  


// Editar
function modificarRegistro() {
    // Pedir al usuario que ingrese el ID del registro que desea modificar
    let id = prompt("Ingrese el ID del registro que desea modificar:");
  
    // Buscar el registro con el ID especificado en el array de usuarios
    let registro = lista.find(users=> users.id == id);
  
    // Verificar si se encontró el registro
    if (!registro) {
      // Si el registro no se encontró, mostrar un mensaje de error
      //alert("No se encontró ningún registro con el ID especificado.");
      window.close();
      return;
    }
  
    // Mostrar un promts para modificar el registro
    let nombre = prompt("Ingrese el nuevo nombre para el usuario:");
    let apellido = prompt("Ingrese el nuevo apellido para el usuario:");
    let edad = prompt("Ingrese la nueva edad para el usuario:");
    let profesion = prompt("Ingrese la nueva profesión para el usuario:");

  
    // Actualizar el registro en el array con los nuevos valores proporcionados por el usuario
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    registro.nombre = nombre;
    registro.apellido = apellido;
    registro.edad = edad;
    registro.profesion = profesion;

    // Generando la fecha con segundos
    registro.fecha_actu = hoy.toUTCString();


    
    mostrarUsuariosTabla(lista);
    
  }


function actualizar(){


    lista = registro.filter(data=>data.id == id);

    modificarRegistro(lista);
    
}

 
//botones
const btnAñadir = document.createElement("button")
btnAñadir.classList.add("btn", "btn-primary")
btnAñadir.textContent = "Agregar usuario"
btnAñadir.onclick=()=>{
    if(lista.length>0){
        btnEliminar.disabled=false;
    }
    insertarEmpleado();
}

const btnEditar = document.createElement("button")
btnEditar.classList.add("btn", "btn-warning", "ms-2")
btnEditar.textContent = "Editar usuario"
btnEditar.onclick=function(){
    modificarRegistro();
}

const btnEliminar = document.createElement("button");
btnEliminar.classList.add("btn", "btn-danger", "ms-2");
btnEliminar.textContent = "Eliminar usuario";
btnEliminar.disabled=true;
btnEliminar.onclick=()=>{
    eliminarData();
}





const botones = document.getElementById("botones")
botones.appendChild(btnAñadir)
botones.appendChild(btnEditar)
botones.appendChild(btnEliminar)
