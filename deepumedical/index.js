const inputsearch = document.getElementById('searchinput');
const dataresult = document.getElementById('resultdata');

let allData = [];

// fetch once
fetch('https://api.npoint.io/03185e6a9bfcd7262ccc')
  .then(res => res.json())
  .then(data => 
    allData=data
  );

inputsearch.addEventListener('input', () => {
  // console.log(allData)
  const value = inputsearch.value.toLowerCase();
  dataresult.innerHTML = "";

  if (!value) return;

  const result = allData.filter(item =>
    item.name.toLowerCase().includes(value) || item.description.toLowerCase().includes(value)
  );

  result.forEach(item => {
    const div = document.createElement('div');
    div.style.border = "1px solid #ccc";
    div.style.padding = "8px";
    div.style.margin = "6px 0px";
    div.style.cursor = "pointer";

    div.innerHTML = `
      <b>${item.name}</b><br>
      ${item.description}
    `;

    // ✅ WhatsApp redirect
    div.addEventListener('click', () => {
      const message = item.medicineName1;
      window.location.href = `https://wa.me/916387215755?text=${message}`;
    });

    dataresult.appendChild(div);
  });
});
