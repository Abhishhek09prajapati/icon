async function saveHistory() {

    const wallet = document.getElementById("wallet").value;
    const summary = document.getElementById('summary').value;
    const number = document.getElementById('number1').value

    const data = { wallet, summary, number };

    try {

        const res = await fetch("http://localhost:5000/addWallet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        console.log(result);

    } catch (err) {
        console.log("Error:", err);
    }
}
