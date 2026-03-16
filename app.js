<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NFPA 2001 YH Clean Agent Design Platform</title>
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <div class="container">
    <header class="page-header">
      <h1>NFPA 2001 YH Clean Agent Design Platform</h1>
      <p class="subtitle">Clean Agent Fire Suppression Design Interface</p>
    </header>

    <div class="grid">
      <section class="card">
        <h2>Project Information</h2>

        <label for="companyName">Company Name</label>
        <input id="companyName" type="text" placeholder="Company Name" value="FireSys" />

        <label for="projectName">Project Name</label>
        <input id="projectName" type="text" placeholder="Project Name" value="Server Room Protection" />

        <label for="engineerName">Engineer Name</label>
        <input id="engineerName" type="text" placeholder="Engineer Name" value="Yahya Hawi" />

        <label for="authority">Authority</label>
        <input id="authority" type="text" placeholder="Authority" value="Civil Defense" />

        <label for="email">Engineer Email</label>
        <input id="email" type="email" placeholder="Engineer Email" value="firesys2030@gmail.com" />

        <label for="notes">Engineering Notes</label>
        <textarea id="notes" placeholder="Optional notes"></textarea>
      </section>

      <section class="card">
        <h2>Agent Selection</h2>

        <label for="agentType">Agent Family</label>
        <select id="agentType">
          <option value="fm200">FM-200</option>
          <option value="fk5112">FK-5-1-12</option>
        </select>

        <label for="displayName">Display Name</label>
        <input id="displayName" type="text" readonly />

        <label for="chemicalName">Chemical Name</label>
        <input id="chemicalName" type="text" readonly />

        <label for="systemType">System Type</label>
        <input id="systemType" type="text" value="Clean Agent Total Flooding System" readonly />

        <label for="occupancy">Occupancy</label>
        <select id="occupancy">
          <option value="Normally Occupied">Normally Occupied</option>
          <option value="Normally Unoccupied">Normally Unoccupied</option>
        </select>
      </section>

      <section class="card">
        <h2>Room Data</h2>

        <label for="roomName">Protected Room Name</label>
        <input id="roomName" type="text" placeholder="Room Name" value="Server Room A" />

        <label for="roomLength">Room Length (m)</label>
        <input id="roomLength" type="number" step="0.01" placeholder="Length in meters" value="8" />

        <label for="roomWidth">Room Width (m)</label>
        <input id="roomWidth" type="number" step="0.01" placeholder="Width in meters" value="6" />

        <label for="roomHeight">Room Height (m)</label>
        <input id="roomHeight" type="number" step="0.01" placeholder="Height in meters" value="3.2" />

        <label for="nonPermeableVolume">Non-Permeable Volume (m³)</label>
        <input id="nonPermeableVolume" type="number" step="0.01" value="2" />

        <div class="info-box">
          <strong>Calculated Gross Volume:</strong>
          <span id="volume">0.00</span> m³
        </div>
      </section>

      <section class="card">
        <h2>NFPA 2001 Design Basis</h2>

        <label for="hazardType">Hazard Type</label>
        <select id="hazardType">
          <option value="Electrical / Electronic Equipment">Electrical / Electronic Equipment</option>
          <option value="Class A Surface Fire">Class A Surface Fire</option>
          <option value="Archive / Data / Telecom Room">Archive / Data / Telecom Room</option>
          <option value="Flammable Liquid Hazard">Flammable Liquid Hazard</option>
        </select>

        <label for="designConc">Design Concentration (%)</label>
        <input id="designConc" type="number" readonly />

        <label for="tempMin">Minimum Ambient Temperature (°C)</label>
        <input id="tempMin" type="number" step="0.1" value="18" />

        <label for="tempMax">Maximum Ambient Temperature (°C)</label>
        <input id="tempMax" type="number" step="0.1" value="27" />

        <label for="altitude">Site Altitude Above Sea Level (m)</label>
        <input id="altitude" type="number" step="0.1" value="10" />

        <label for="holdTime">Required Hold Time (min)</label>
        <input id="holdTime" type="number" step="0.1" value="10" />

        <label for="discharge">Required Discharge Time (sec)</label>
        <input id="discharge" type="number" step="0.1" value="10" />

        <label for="safetyFactor">Safety Factor (%)</label>
        <input id="safetyFactor" type="number" step="0.1" value="20" />
      </section>

      <section class="card">
        <h2>System Hardware Inputs</h2>

        <label for="pressureClass">Cylinder Pressure Class (bar)</label>
        <select id="pressureClass">
          <option value="25">25 bar</option>
          <option value="42" selected>42 bar</option>
        </select>

        <label for="cylinderCapacity">Cylinder Capacity (kg)</label>
        <input id="cylinderCapacity" type="number" step="0.1" value="45" />

        <label for="nozzles">Nozzle Count</label>
        <input id="nozzles" type="number" step="1" value="3" />

        <label for="pipe">Pipe Schedule</label>
        <select id="pipe">
          <option value="Schedule 40" selected>Schedule 40</option>
          <option value="Schedule 80">Schedule 80</option>
          <option value="Stainless Steel">Stainless Steel</option>
        </select>

        <label for="mainPipe">Main Pipe Diameter (mm)</label>
        <input id="mainPipe" type="number" step="0.1" value="25" />

        <label for="branchPipe">Branch Pipe Diameter (mm)</label>
        <input id="branchPipe" type="number" step="0.1" value="20" />

        <label for="fittingsCount">Fittings Count</label>
        <input id="fittingsCount" type="number" step="1" value="4" />

        <label for="reserveRequired">Reserve Required</label>
        <select id="reserveRequired">
          <option value="true" selected>Yes</option>
          <option value="false">No</option>
        </select>
      </section>

      <section class="card">
        <h2>Hydraulic Preview</h2>

        <label>Estimated Agent Mass (kg)</label>
        <input id="agentMass" type="text" readonly />

        <label>Estimated Cylinder Quantity</label>
        <input id="cylinderQty" type="text" readonly />

        <label>Estimated Equivalent Pipe Length (m)</label>
        <input id="eqPipeLength" type="text" readonly />

        <label>Estimated Nozzle Pressure (bar)</label>
        <input id="nozzlePressure" type="text" readonly />

        <label>Estimated Discharge Time (sec)</label>
        <input id="calcDischargeTime" type="text" readonly />

        <label>Hydraulic Status</label>
        <input id="hydraulicStatus" type="text" readonly />
      </section>

      <section class="card full">
        <h2>Compliance / Engineering Output</h2>
        <div class="info-box stacked">
          <div><strong>Standard:</strong> NFPA 2001</div>
          <div><strong>Compliance Check:</strong> <span id="complianceResult">Pending</span></div>
          <div><strong>Engineering Warning:</strong> <span id="engineeringWarning">None</span></div>
        </div>
      </section>
    </div>

    <div class="actions">
      <button class="runButton" id="runButton">Run Calculation</button>
      <button class="secondaryButton" id="resetButton" type="button">Reset Form</button>
    </div>

    <section class="resultCard">
      <h2>Webhook Response</h2>
      <pre id="result">No response yet</pre>
    </section>
  </div>

  <script src="./app.js"></script>
</body>
</html>
