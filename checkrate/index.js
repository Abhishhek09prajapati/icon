let mrp = document.getElementById('mrp')
let rate = document.getElementById('rate')
var result = document.getElementById('result')
if (mrp.value === "") {
    rate.style.display = 'none'
}

mrp.addEventListener('input', () => {
    if (mrp.value === "") {
        rate.style.display = 'none'
        result.innerText = ""
        return
    }
    rate.style.display = "block"
})

rate.addEventListener('input',()=>{
    var payment = 100 - rate.value / mrp.value * 100
    result.innerText = `MRP se yeh discount huha hai ${payment.toFixed(2)}%`
})