function search1() {
  fetch("https://api.npoint.io/b8e4760225ed1bcf6aa4")
    .then((res) => res.json())
    .then((data) => {
      const customerNumber = document.getElementById("customernumber").value.trim();

      const present = data.find((item) => customerNumber == item.mobile);

      if (present) {
        document.getElementById("customerDetails").style.display = "block";
        document.getElementById("custName").innerText = present.name;
        document.getElementById("custMobile").innerText = present.mobile;
        document.getElementById("custCatagories").innerText = present.category ;
      } else {
        alert("❌ Customer Not Found");
        document.getElementById("customerDetails").style.display = "none";
      }
    })
    .catch((err) => {
      console.log(err);
      alert("❌ API Error");
    });
}

function close1() {
  document.getElementById("customerDetails").style.display = "none";
}

var viewmedicine = document.getElementsByClassName('viewmedicien')[0];

function checkmedicine() {
  viewmedicine.style.display = "block"

}
function close2() {
  viewmedicine.style.display = "none"
}
