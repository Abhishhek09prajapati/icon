function partychange() {
    let fields = ["partyname", "partyaddress", "partynumber", "partygst", "partylincese"];

    if (fields.some(id => !document.getElementById(id).value.trim()))
        return alert("Fill All Box");

    fields.forEach(id => {
        document.getElementById(id + "1").innerHTML = document.getElementById(id).value;
        document.getElementById(id).value = ""; // clear input
    });
}
var showdiv = document.querySelector(".partynamelist");
function addpart() {
    showdiv.style.display = "block"
}
function closeit() {
    showdiv.style.display = "none"
}