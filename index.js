
var name1 = document.getElementById('name1');
var mobile1 = document.getElementById('mobile1');
var address1 = document.getElementById('address1');

document.getElementById('messagetowhatsapp').addEventListener('click', () => {

    if (!name1.value || !mobile1.value || !address1.value) {
        alert("please fill all")
    } else {
        var message = ` ${name1.value}  ${mobile1.value} ${address1.value}`;
        window.location.href = `https://wa.me/916387215755?text=${message}`
    }
});


