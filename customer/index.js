var customerDetails = document.getElementById('customerDetails');
function search1() {
  fetch("https://api.npoint.io/b8e4760225ed1bcf6aa4")
    .then((res) => res.json())
    .then((data) => {
      var customerNumber = document.getElementById("customernumber").value.trim();

      const present = data.find((yes1) => customerNumber == yes1.Mobile);

      if (present) {
        // var customerDetails = document.getElementById('customerDetails');
        customerDetails.style.display = "block"

        customerDetails.innerHTML = `<span onclick="close1()" style="color: black;">X</span> <h1>${present.Name}</h1> <h1>${present.Mobile}</h1>`
      } else {
        alert("❌ Not Found");
      }
    })
    .catch((err) => console.log("Error:", err));
}

function close1() {
  customerDetails.style.display = "none"
}