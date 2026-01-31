const inputsearch = document.getElementById("searchinput");
const dataresult = document.getElementById("resultdata");
const closebtn1 = document.getElementById("list");

let allData = [];
let medicne2 = [];

closebtn1.style.display = "none";
dataresult.innerHTML = "<p>Loading data...</p>";


fetch("https://api.npoint.io/03185e6a9bfcd7262ccc")
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    dataresult.innerHTML = "";
  })
  .catch((err) => {
    dataresult.innerHTML = "<p>Error loading data</p>";
    console.log(err);
  });

inputsearch.addEventListener("input", () => {
  const value = inputsearch.value.trim().toLowerCase();
  dataresult.innerHTML = "";

  if (!value) return;

  // ✅ DATA NOT LOADED CHECK
  if (allData.length === 0) {
    dataresult.innerHTML = "<p>Data not loaded yet...</p>";
    return;
  }

  const result = allData.filter((item) => {
    const name = (item.name || "").toLowerCase();
    const desc = (item.description || "").toLowerCase(); // ✅ SAFE
    return name.includes(value) || desc.includes(value);
  });

  if (result.length === 0) {
    dataresult.innerHTML = "this medicine is not available";
    return;
  }

  result.forEach((item) => {
    const div = document.createElement("div");

    div.style.border = "1px solid #000";
    div.style.padding = "8px";
    div.style.margin = "6px 0px";
    div.style.cursor = "pointer";

    div.innerHTML = `
      <b>${item.name || ""}</b><br>
      <span>${item.description || ""}</span>
    `;

    div.addEventListener("click", () => medicinesearch(item));
    dataresult.appendChild(div);
  });
});

function medicinesearch(item) {
  const medicinename = document.getElementById("medicinename");
  const medicneformula = document.getElementById("medicneformula");

  medicinename.innerHTML = item.name || "";
  medicneformula.innerHTML = item.description || "";

  // ✅ old value remove then add
  medicne2 = [item.name || "", item.description || ""];

  closebtn1.style.display = "block";
}

function closeBtn() {
  closebtn1.style.display = "none";
}

function deepumedical() {
  if (!medicne2[0]) return alert("Select Medicine First");

  const encoded = encodeURIComponent(medicne2[0]);
  window.location.href = `https://wa.me/916387215755?text=${encoded}`;
}

function googlesearch() {
  if (!medicne2[0]) return alert("Select Medicine First");

  const encodedk = encodeURIComponent(medicne2[0]);
  window.open(`https://google.com/search?q=${encodedk}`, "_blank");
}
