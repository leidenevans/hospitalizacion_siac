let unidades= null;
let camas= null
let contenedorCamas=document.getElementById("contenedorCamas")
let contenerdorUnidades=document.getElementById("contenedorUnidades")
let tituloDeSala=document.querySelector("h1")
   document.addEventListener("DOMContentLoaded",async function(){
    unidades=await retornar_opciones (3,7)
    camas=await retornar_opciones(2,7);
   unidades=unidades.filter((unidad)=> unidad.activo==1)
            unidades.forEach((unidad)=>{
       // if(unidad.activo==0)return
        let elementoDiv=document.createElement("div");
        elementoDiv.className="pushable card col-5 border p-0 m-3";
        let totalCamas=camas.filter((cama)=>parseInt(unidad.id_unidad) === parseInt(cama.id_unidad)).length;
        let camasDisponible=camas.filter((cama)=>parseInt(unidad.id_unidad) === parseInt(cama.id_unidad));
        camasDisponible=camasDisponible.filter((cama)=>parseInt(cama.estado_actual_id) === 1).length
        elementoDiv.innerHTML=`
                    <div class="card-header fw-bold bg-success-subtle text-center ">
                    ${unidad.descripcion}</div>
                    <div class="card-body d-flex justify-content-between"><span>Camas: ${totalCamas}</span> <span>Disponible: <span class="badge rounded-pill ${camasDisponible>0?"bg-success":"bg-danger"} text-white">${camasDisponible}</span></span></div>`
        contenerdorUnidades.appendChild(elementoDiv);
        elementoDiv.addEventListener("click",function(){
            renderizarCamas(unidad.id_unidad);
            let tituloString=unidad.descripcion.toLowerCase();
tituloString=tituloString[0].toUpperCase()+tituloString.slice(1)
tituloDeSala.textContent=`Camas de ${tituloString} `
        });
            })
            console.log({unidades,camas})
})

function renderizarCamas(idUnidad){
    contenedorCamas.classList.remove("d-none");
    contenerdorUnidades.classList.add("d-none")    
    let html="";
    let camaFiltradas= camas.filter((cama)=>parseInt(cama.id_unidad) === parseInt(idUnidad)) 
    camaFiltradas.forEach((cama)=>{
        html+=` <div class="pushable card col-3 border p-1 m-1 cama ${cama.estado_actual_id ==1? "":"avisar"}" title= "${cama.estado_actual}" ${cama.estado_actual_id ==1?"data-bs-toggle='modal' data-bs-target='#modalPacientes'":""} >
                    <div class="card-header fw-bold bg-success-subtle text-center">
                    ${cama.codigo}
                    </div>
                    <div class="card-body rounded-bottom" style= "background-color:${cama.color_hex}" >paciente:</div>
                </div>`
    })
    contenedorCamas.innerHTML=html;
    document.querySelectorAll(".avisar").forEach((element)=>{
        element.addEventListener("click",()=>{
            Swal.fire({
                title:"Aviso",
                icon:"info",
                text:"Cama Estado",
            })
        })
    })

}
document.querySelectorAll(".volver").forEach((el)=>{
    el.addEventListener("click",()=>{
        document.getElementById("contenedorUnidades").classList.remove("d-none");
        document.getElementById("contenedorCamas").classList.add("d-none");  
        tituloDeSala.textContent="Salas de Hospitalización"
    })  
})



