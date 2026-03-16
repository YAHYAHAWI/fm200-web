const WEBHOOK_URL =
  "https://primary-production-2236a.up.railway.app/webhook/fm200-calc";

const roomLength = document.getElementById("roomLength");
const roomWidth = document.getElementById("roomWidth");
const roomHeight = document.getElementById("roomHeight");
const volumeValue = document.getElementById("volumeValue");
const runBtn = document.getElementById("runBtn");
const resultBox = document.getElementById("resultBox");

function getNumber(value) {
  return Number(value || 0);
}

function updateVolume() {
  const volume =
    getNumber(roomLength.value) *
    getNumber(roomWidth.value) *
    getNumber(roomHeight.value);

  volumeValue.textContent = volume.toFixed(2);
}

roomLength.addEventListener("input", updateVolume);
roomWidth.addEventListener("input", updateVolume);
roomHeight.addEventListener("input", updateVolume);

runBtn.addEventListener("click", async () => {
  const payload = {
    project: {
      name: document.getElementById("projectName").value,
      client: document.getElementById("clientName").value,
      engineer: document.getElementById("engineerName").value,
      email: document.getElementById("email").value,
    },
    room: {
      length: getNumber(roomLength.value),
      width: getNumber(roomWidth.value),
      height: getNumber(roomHeight.value),
      volume: getNumber(volumeValue.textContent),
    },
    agent: document.getElementById("agentType").value,
  };

  resultBox.textContent = "Submitting...";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    resultBox.textContent = text || "Success, but empty response.";
  } catch (error) {
    resultBox.textContent = "Error: " + error.message;
  }
});
