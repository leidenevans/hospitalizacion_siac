let unidades= null;
let camas= null
let contenedorCamas=document.getElementById("contenedorCamas")
let contenerdorUnidades=document.getElementById("contenedorUnidades")

document.addEventListener("DOMContentLoaded",async function(){
    unidades=await retornar_opciones (3,7)
    camas=await retornar_opciones(2,7); 
    unidades.forEach((unidad)=>{
        let elementoDiv=document.createElement("div");
        elementoDiv.className="pushable card col-3 border p-0 m-2";
        elementoDiv.innerHTML=`
                    <div class="card-header fw-bold bg-success-subtle text-center ">
                    ${unidad.descripcion}</div>
                    <div class="card-body"></div>`
        contenerdorUnidades.appendChild(elementoDiv);
        elementoDiv.addEventListener("click",function(){renderizarCamas(unidad.id_unidad)});
    })       
    console.log({unidades,camas})
})

function renderizarCamas(idUnidad){
    contenedorCamas.classList.remove("d-none");
    contenerdorUnidades.classList.add("d-none")    
    let html="";
    let camaFiltradas= camas.filter((cama)=>parseInt(cama.id_unidad) === parseInt(idUnidad)) 
    camaFiltradas.forEach((cama)=>{
        html+=` <div class="pushable card col-3 border p-1 m-1 cama">
                    <div class="card-header fw-bold bg-success-subtle text-center">
                    ${cama.codigo}
                    </div>
                    <div class="card-body">paciente:</div>
                </div>`
    })
    contenedorCamas.innerHTML=html;
}

document.querySelectorAll(".volver").forEach((el)=>{
    el.addEventListener("click",function(){
        document.getElementById("contenedorUnidades").classList.remove("d-none");
        document.getElementById("contenedorCamas").classList.add("d-none");
    
    })
})



