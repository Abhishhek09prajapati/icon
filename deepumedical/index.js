const inputsearch = document.getElementById('searchinput');
const dataresult = document.getElementById('resultdata');

let allData = [];


// Show loading initially
dataresult.innerHTML = "<p>Loading data...</p>";

// Fetch data once
fetch('https://api.npoint.io/03185e6a9bfcd7262ccc')
  .then(res => res.json())
  .then(data => {
    allData = data;
    dataresult.innerHTML = "";   // clear loading text
  })
  .catch(err => {
    dataresult.innerHTML = "<p>Error loading data</p>";
    console.log(err);
  });

// Search functionality
inputsearch.addEventListener('input', () => {

  const value = inputsearch.value.toLowerCase();
  dataresult.innerHTML = "";

  if (!value) return;
  const result = allData.filter(item => {
    return item.name.toLowerCase().includes(value) || item.description.toLowerCase().includes(value)
  });

  if (result.length === 0) {
    dataresult.innerHTML = `this medicine is not avaiable`
    return;
  }

  result.forEach(item => {
    const div = document.createElement('div');
    div.style.border = "1px solid #000000";
    div.style.padding = "8px";
    div.style.margin = "6px 0px";
    div.style.cursor = "pointer";

    div.innerHTML = `
      <b>${item.name}</b><br>
      <span style="width:100% ; heigth:max-width;"> ${item.description}</span>
    `;

    // WhatsApp redirect with encoding
    div.addEventListener('click', () => medicinesearch(item));
    dataresult.appendChild(div);
  });
});

var closebtn1 = document.getElementById('list');
closebtn1.style.display = "none";

var medicne2 = [] ;

function medicinesearch(item) {
  var medicinename = document.getElementById("medicinename");
  var medicneformula = document.getElementById("medicneformula");
  medicinename.innerHTML = item.name
  medicneformula.innerHTML = item.description
  medicne2.push(item.name,item.description)
  // console.log(medicne2)
  closebtn1.style.display = "block"
}

function closeBtn() {
  closebtn1.style.display = "none"
}


function deepumedical() {
  var message = `${medicne2[0]}`;
  const encoded = encodeURIComponent(message);
  window.location.href = `https://wa.me/916387215755?text=${encoded}`;

}
function googlesearch() {
  var messagek = `${medicne2[0]}`;
  const encodedk = encodeURIComponent(messagek);
  window.open(`https://google.com/search?q=${encodedk}`, "_blank");
}