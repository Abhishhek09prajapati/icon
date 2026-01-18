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
    console.log(allData)
    dataresult.innerHTML = "";   // clear loading text
    console.log("Data Loaded Successfully");
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
    dataresult.innerHTML = "<p>No result found</p>";
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
      ${item.description}
    `;

    // WhatsApp redirect with encoding
    div.addEventListener('click', () => {
      const message = `${item.name} - ${item.description}`;
      const encoded = encodeURIComponent(message);

      window.location.href =
        `https://wa.me/916387215755?text=${encoded}`;
    });

    dataresult.appendChild(div);
  });
});
