const WEBHOOK="https://primary-production-2236a.up.railway.app/webhook/fm200-calc"


const agentType=document.getElementById("agentType")

const displayName=document.getElementById("displayName")

const chemicalName=document.getElementById("chemicalName")


function updateAgent(){

if(agentType.value==="fm200"){

displayName.value="HFC-227ea"
chemicalName.value="HFC-227ea"

document.getElementById("designConc").value=7.9

}

if(agentType.value==="fk"){

displayName.value="FK-5-1-12"
chemicalName.value="FK-5-1-12"

document.getElementById("designConc").value=5.3

}

}


agentType.onchange=updateAgent

updateAgent()


function volume(){

let l=Number(roomLength.value)

let w=Number(roomWidth.value)

let h=Number(roomHeight.value)

let v=l*w*h

document.getElementById("volume").innerText=v

return v

}


roomLength.oninput=volume
roomWidth.oninput=volume
roomHeight.oninput=volume


async function runCalculation(){

let payload={

platform:"NFPA 2001 YH Clean Agent Design Platform",

agent:{

display_name:displayName.value,

chemical:chemicalName.value,

type:agentType.value

},

project:{

name:projectName.value,

client:clientName.value,

engineer:engineerName.value,

email:email.value,

notes:notes.value

},

hazard:hazardType.value,

room:{

name:roomName.value,

length:Number(roomLength.value),

width:Number(roomWidth.value),

height:Number(roomHeight.value),

volume:volume()

},

design:{

concentration:Number(designConc.value),

tempMin:Number(tempMin.value),

tempMax:Number(tempMax.value),

altitude:Number(altitude.value),

discharge:Number(discharge.value)

},

hardware:{

pressure:Number(pressure.value),

nozzles:Number(nozzles.value),

pipe:pipe.value

}

}


document.getElementById("result").innerText="Sending..."


try{

let res=await fetch(WEBHOOK,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(payload)

})


let text=await res.text()

document.getElementById("result").innerText=text

}


catch(e){

document.getElementById("result").innerText="Error : "+e.message

}

}
