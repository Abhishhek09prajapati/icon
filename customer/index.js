var alldata = [];
var customerNumber = document.getElementById("customernumber")
var searchvalue = document.getElementById('searchvalue')
let close = document.getElementById('customerDetails')
var customerMedicine = []
var medicinedata = document.getElementById('medicinedata')


customerNumber.addEventListener('input', () => {
  fetch("https://api.npoint.io/b8e4760225ed1bcf6aa4")
    .then((res) => res.json())
    .then((data) => {
      alldata = data
    }
    ).catch(err => {
      console.log(err)
    })

  const value = customerNumber.value;
  searchvalue.innerHTML = '';
  close.style.display = "none"

  if (!value) return;

  if (alldata === 0) {
    searchvalue.innerHTML = "this Number is not avaiable"
    return
  }

  const result = alldata.filter((item) => {
    const number = (item.mobile);
    const name = (item.name).toLowerCase()
    return number.includes(value) || name.includes(value)
  })



  if (result.length === 0) {
    searchvalue.innerHTML = "this cutomer is not here"
    return
  }
  result.forEach((item) => {
    const div = document.createElement('div');
    div.style.border = "1px solid #000";
    div.style.padding = "8px";
    div.style.background = "white"
    div.style.margin = "6px 0px";
    div.style.cursor = "pointer";
    div.innerHTML = `
      <b>${item.mobile || item.name}</br>`;
    searchvalue.appendChild(div)


    div.addEventListener('click', () => {
      let custname = document.getElementById('custName')
      let custnumber = document.getElementById('custMobile')
      let Catagories = document.getElementById('custCatagories')
      viewmedicien.style.display = "none"
      medicinedata.innerHTML = ""

      customerMedicine = item.medicine
      custname.innerHTML = item.name
      custnumber.innerHTML = item.mobile
      Catagories.innerHTML = item.category


      close.style.display = "block"
    })
  })
})

function close1() {
  close.style.display = "none"
}

let viewmedicien = document.getElementsByClassName('viewmedicien')[0]

function close2() {
  viewmedicien.style.display = "none"
}


function checkmedicine() {
  // console.log(customerMedicine)
  customerMedicine.forEach(a => {
    console.log(a)
    let li = document.createElement('li')
    li.style.color = "black"
    li.innerText = a
    medicinedata.appendChild(li)
  })
  viewmedicien.style.display = "block"
}