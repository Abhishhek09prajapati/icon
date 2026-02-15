var number = localStorage.getItem("usernumber")
// {todayincome: '100', yesterdayincome: '500', monthly: '2500', totalincome: '58000'}


async function loadUsers(a) {
    try {
        const res = await fetch("https://iconstarbusiness.store/u");
        const data = await res.json();

        const user = data.find(u => a == u.number);
        if (user) {
            document.getElementById('username').innerHTML = `${user.position} ID ${user.name}`;
            document.getElementById('today').innerHTML = `<span>₹</span> ${user.wallet.todayincome.toFixed(2)}`;
            document.getElementById('yesterday').innerHTML = `<span>₹</span> ${user.wallet.yesterdayincome.toFixed(2)}`;
            document.getElementById('montly').innerHTML = `<span>₹</span> ${user.wallet.monthly.toFixed(2)}`;
            document.getElementById('total').innerHTML = `<span>₹</span> ${user.wallet.totalincome.toFixed(2)}`;
            var historyTable = document.getElementById("history");

            user.History.reverse();

            let row1 = user.History.slice(0, 25)

            row1.forEach((element, index) => {

                let tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${element.timestamp}</td>
                    <td>${element.summary}</td>
                    <td>₹${element.amount}</td>
                    <td>${element.status}</td>              
                      `;

                historyTable.appendChild(tr);

            });


        } else {
            alert("User not Found")
        }

    } catch (err) {
        console.log("Fetch Error:", err);
    }
}

async function userdata1() {
    var userkanumber = localStorage.getItem('usernumber')
    userdata = { userkanumber }


    try {
        const res1 = await fetch('https://iconstarbusiness.store/o', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userdata)
        });
        const data = await res1.json();
        loadUsers(userkanumber);

    } catch (err) {
        console.log("Error:", err);
    }
}

userdata1();


// open and off side bar



function logout() {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("usernumber");
    localStorage.removeItem("deviceId");

    window.location.href = "../";
}




async function comparepromocode() {
    const promocodeInput = document.getElementById('pcode');
    const amountInput = document.getElementById("pamount");

    const promocode = promocodeInput.value;
    const amount = amountInput.value;

    const promocodedata = { promocode, amount };

    try {

        const res2 = await fetch('https://iconstarbusiness.store/k', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(promocodedata)
        });

        const data2 = await res2.json();


        const matchpromocode = data2.find(
            k => amount == k.amount && promocode == k.promocode && "Active" == k.status
        );


        const userinfo = await fetch('https://iconstarbusiness.store/u');
        const userinfo1 = await userinfo.json()
        const userfilter = await userinfo1.find(o => number == o.number);
        const userfiltername = userfilter.name;
        const refernumber = userfilter.Refferal;
        const addamount = amount / 10.;
        const amount1 = userfilter.wallet.todayincome + addamount;
        const referuser = await userinfo1.find(p => refernumber == p.Refferal);
        const referamount = addamount / 10;
        const referwallet = referuser.wallet.todayincome + referamount;






        if (matchpromocode) {
            try {
                const addamountvalue = { userfiltername, amount1, number, amount, addamount, referamount, referwallet, refernumber, promocode }
                const updatewallet = await fetch('https://iconstarbusiness.store/updatewallet', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(addamountvalue)
                });
                const amountres = await updatewallet.json();


            } catch (err) {
                console.log(err)
            }

            document.getElementById('addpromocode').style.display = "none";
            alert("Your Promocode has Added successfully")

            /* ✅ CLEAR INPUTS CORRECTLY */
            promocodeInput.value = "";
            amountInput.value = "";

        } else {
            alert("Promocode is not valid ❌");
            /* ✅ CLEAR INPUTS */
            promocodeInput.value = "";
            amountInput.value = "";
        }

    } catch (err) {
        console.log("Error:", err);
    }
}





