const WEBHOOK="https://primary-production-2236a.up.railway.app/webhook/fm200-calc"

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

project:{

name:projectName.value,
client:clientName.value,
engineer:engineerName.value,
email:email.value,
notes:notes.value

},

room:{

name:roomName.value,

length:Number(roomLength.value),
width:Number(roomWidth.value),
height:Number(roomHeight.value),

volume:volume()

},

design:{

agent:agentType.value,
hazard:hazardType.value,
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
