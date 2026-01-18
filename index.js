var selectlist = document.getElementById('listid');
var name1 = document.getElementById('name1');
var mobile1 = document.getElementById('mobile1');
var gmail1 = document.getElementById('gmail1');
var address1 = document.getElementById('address1');
var whatsappbtn = document.getElementById("whatsappbtn");

document.getElementById('messagetowhatsapp').addEventListener('click', () => {
    // Create WhatsApp message
    var message = `Mujhe Iconstar ki ${selectlist.value} chahiye. 
    Mera naam ${name1.value}, mobile number ${mobile1.value}, 
    gmail ${gmail1.value}, address ${address1.value}. 
    Yeh hai, reply kare.`;

    // Encode message for URL
    var encodedMessage = encodeURIComponent(message);

    // Create link
    var a = document.createElement('a');
    a.href = `https://wa.me/916387215755?text=${encodedMessage}`;
    a.target = "_blank"; // open in new tab / WhatsApp app

    // Create button
    var btn1 = document.createElement('button');
    btn1.style.display = "block";
    btn1.innerHTML = "Send via WhatsApp";

    // When button is clicked, go to WhatsApp link
    btn1.addEventListener('click', () => {
        window.open(a.href, '_blank');
    });

    // Clear old button and append new one
    whatsappbtn.innerHTML = '';
    a.appendChild(btn1);
    whatsappbtn.appendChild(a);
});


