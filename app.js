const WEBHOOK = "https://primary-production-2236a.up.railway.app/webhook/fm200-calc";

const agentType = document.getElementById("agentType");
const displayName = document.getElementById("displayName");
const chemicalName = document.getElementById("chemicalName");
const designConc = document.getElementById("designConc");
const discharge = document.getElementById("discharge");

const roomLength = document.getElementById("roomLength");
const roomWidth = document.getElementById("roomWidth");
const roomHeight = document.getElementById("roomHeight");

const volumeEl = document.getElementById("volume");

const agentMass = document.getElementById("agentMass");
const cylinderQty = document.getElementById("cylinderQty");
const eqPipeLength = document.getElementById("eqPipeLength");
const nozzlePressure = document.getElementById("nozzlePressure");
const calcDischargeTime = document.getElementById("calcDischargeTime");
const hydraulicStatus = document.getElementById("hydraulicStatus");

const complianceResult = document.getElementById("complianceResult");
const engineeringWarning = document.getElementById("engineeringWarning");
const resultBox = document.getElementById("result");

function updateAgentDefaults() {
  if (agentType.value === "fm200") {
    displayName.value = "HFC-227ea";
    chemicalName.value = "HFC-227ea";
    designConc.value = "7.9";
    discharge.value = "10";
  }

  if (agentType.value === "fk") {
    displayName.value = "FK-5-1-12";
    chemicalName.value = "FK-5-1-12";
    designConc.value = "5.3";
    discharge.value = "10";
  }

  calculateOutputs();
}

function calculateVolume() {
  const l = Number(roomLength.value || 0);
  const w = Number(roomWidth.value || 0);
  const h = Number(roomHeight.value || 0);

  const v = l * w * h;
  volumeEl.innerText = v.toFixed(2);
  return v;
}

function getAgentFactor() {
  if (agentType.value === "fm200") return 1.15;
  if (agentType.value === "fk") return 1.0;
  return 1.0;
}

function calculateOutputs() {
  const volume = calculateVolume();
  const concentration = Number(designConc.value || 0);
  const nozzleCount = Number(document.getElementById("nozzles").value || 0);
  const fittings = Number(document.getElementById("fittingsCount").value || 0);
  const pressureClass = Number(document.getElementById("pressureClass").value || 0);
  const mainPipe = Number(document.getElementById("mainPipe").value || 0);
  const branchPipe = Number(document.getElementById("branchPipe").value || 0);
  const altitude = Number(document.getElementById("altitude").value || 0);

  const agentFactor = getAgentFactor();

  // Simplified conceptual estimate only
  const estimatedMass = volume * (concentration / 100) * 1.2 * agentFactor;
  const estimatedCylinderCapacity = pressureClass === 42 ? 50 : 35;
  const estimatedCylinderQty = estimatedMass > 0 ? Math.ceil(estimatedMass / estimatedCylinderCapacity) : 0;

  const estimatedEqLength = (mainPipe * 0.25) + (branchPipe * 0.18) + (fittings * 1.5);
  const estimatedNozzlePressure =
    pressureClass - (estimatedEqLength * 0.15) - (altitude * 0.00012);

  const estimatedDischarge = 10.0;

  let status = "PASS";
  let warning = "None";

  if (estimatedNozzlePressure < 8) {
    status = "REVIEW REQUIRED";
    warning = "Estimated nozzle pressure is low. Check pipe network and cylinder selection.";
  }

  if (estimatedMass <= 0 || volume <= 0) {
    status = "PENDING INPUT";
    warning = "Enter valid room dimensions to calculate system outputs.";
  }

  agentMass.value = estimatedMass > 0 ? estimatedMass.toFixed(2) : "";
  cylinderQty.value = estimatedCylinderQty ? String(estimatedCylinderQty) : "";
  eqPipeLength.value = estimatedEqLength > 0 ? estimatedEqLength.toFixed(2) : "";
  nozzlePressure.value = estimatedNozzlePressure > 0 ? estimatedNozzlePressure.toFixed(2) : "";
  calcDischargeTime.value = estimatedDischarge.toFixed(1);
  hydraulicStatus.value = status;

  complianceResult.innerText = status;
  engineeringWarning.innerText = warning;
}

function resetForm() {
  document.getElementById("projectName").value = "";
  document.getElementById("clientName").value = "";
  document.getElementById("engineerName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("roomName").value = "";
  roomLength.value = "";
  roomWidth.value = "";
  roomHeight.value = "";
  document.getElementById("hazardType").selectedIndex = 0;
  document.getElementById("tempMin").value = "20";
  document.getElementById("tempMax").value = "30";
  document.getElementById("altitude").value = "0";
  document.getElementById("pressureClass").value = "42";
  document.getElementById("nozzles").value = "1";
  document.getElementById("pipe").selectedIndex = 0;
  document.getElementById("mainPipe").value = "25";
  document.getElementById("branchPipe").value = "20";
  document.getElementById("fittingsCount").value = "4";
  document.getElementById("notes").value = "";
  resultBox.innerText = "No response yet";

  updateAgentDefaults();
  calculateOutputs();
}

async function runCalculation() {
  calculateOutputs();

  const payload = {
    platform_name: "NFPA 2001 YH Clean Agent Design Platform",
    standard: "NFPA 2001",
    system: {
      system_type: document.getElementById("systemType").value,
      agent_family: agentType.value,
      display_name: displayName.value,
      chemical_name: chemicalName.value
    },
    project: {
      name: document.getElementById("projectName").value,
      client: document.getElementById("clientName").value,
      engineer: document.getElementById("engineerName").value,
      email: document.getElementById("email").value,
      notes: document.getElementById("notes").value
    },
    hazard: {
      type: document.getElementById("hazardType").value
    },
    room: {
      name: document.getElementById("roomName").value,
      length_m: Number(roomLength.value || 0),
      width_m: Number(roomWidth.value || 0),
      height_m: Number(roomHeight.value || 0),
      volume_m3: Number(volumeEl.innerText || 0)
    },
    design_basis: {
      concentration_percent: Number(designConc.value || 0),
      min_temp_c: Number(document.getElementById("tempMin").value || 0),
      max_temp_c: Number(document.getElementById("tempMax").value || 0),
      altitude_m: Number(document.getElementById("altitude").value || 0),
      discharge_time_sec: Number(discharge.value || 0)
    },
    hardware_inputs: {
      cylinder_pressure_class_bar: Number(document.getElementById("pressureClass").value || 0),
      nozzle_count: Number(document.getElementById("nozzles").value || 0),
      pipe_schedule: document.getElementById("pipe").value,
      main_pipe_diameter_mm: Number(document.getElementById("mainPipe").value || 0),
      branch_pipe_diameter_mm: Number(document.getElementById("branchPipe").value || 0),
      fittings_count: Number(document.getElementById("fittingsCount").value || 0)
    },
    hydraulic_results: {
      calculated_agent_mass_kg: Number(agentMass.value || 0),
      estimated_cylinder_quantity: Number(cylinderQty.value || 0),
      estimated_total_equivalent_pipe_length_m: Number(eqPipeLength.value || 0),
      estimated_nozzle_pressure_bar: Number(nozzlePressure.value || 0),
      estimated_discharge_time_sec: Number(calcDischargeTime.value || 0),
      hydraulic_status: hydraulicStatus.value
    },
    compliance: {
      result: complianceResult.innerText,
      warning: engineeringWarning.innerText
    }
  };

  resultBox.innerText = "Sending...";

  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await res.json()
      : await res.text();

    resultBox.innerText =
      typeof data === "string" ? data : JSON.stringify(data, null, 2);
  } catch (e) {
    resultBox.innerText = "Error: " + e.message;
  }
}

agentType.addEventListener("change", updateAgentDefaults);
roomLength.addEventListener("input", calculateOutputs);
roomWidth.addEventListener("input", calculateOutputs);
roomHeight.addEventListener("input", calculateOutputs);
document.getElementById("tempMin").addEventListener("input", calculateOutputs);
document.getElementById("tempMax").addEventListener("input", calculateOutputs);
document.getElementById("altitude").addEventListener("input", calculateOutputs);
document.getElementById("pressureClass").addEventListener("change", calculateOutputs);
document.getElementById("nozzles").addEventListener("input", calculateOutputs);
document.getElementById("pipe").addEventListener("change", calculateOutputs);
document.getElementById("mainPipe").addEventListener("input", calculateOutputs);
document.getElementById("branchPipe").addEventListener("input", calculateOutputs);
document.getElementById("fittingsCount").addEventListener("input", calculateOutputs);

updateAgentDefaults();
calculateOutputs();
