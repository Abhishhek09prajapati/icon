require("dotenv").config();   // ALWAYS FIRST
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Static login folder
app.use(express.static(path.join(__dirname)));
// Correct sendFile (must be file, not folder)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login", "index.html"));
});
// Read Mongo URI from dotenv
const mongoURI = process.env.MONGO_URI;

/* ✅ MongoDB Connect */
mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log("Mongo Error:", err));
/* ✅ Schema */
const userSchema = new mongoose.Schema({

    name: String,
    wallet: {
        todayincome: Number,
        yesterdayincome: Number,
        monthly: Number,
        totalincome: Number
    },
    number: { type: String, unique: true },
    password: String,
    History: [
        {
            timestamp: String,
            summary: String,
            amount: Number,
            status: String
        }
    ],
    position: String,
    SuperID: [
        {
            name: String,
            number: String
        }
    ],
    MasterID: [
        {
            name: String,
            number: String
        }
    ],
    Distribitor: [
        {
            name: String,
            number: String
        }
    ],
    Customer: [
        {
            name: String,
            number: String
        }
    ],
    Gmail: { type: String, unique: true },
    address: String,
    Refferal: String,
    Device: String

});
/* ✅ Model */
const User = mongoose.model("users", userSchema);

app.post("/add-user", async (req, res) => {
    try {

        const { name, number, gmail, address, position, password, mob } = req.body;
        const newUser = new User({
            name,
            wallet: {
                todayincome: 0,
                yesterdayincome: 0,
                monthly: 0,
                totalincome: 0
            },
            number: number,
            password: password,
            position: position,
            Gmail: gmail,
            address: address,
            Refferal: mob,
            Device: ""

        });

        await User.updateOne(
            { number: mob },
            {
                $push: {
                    Customer: {
                        name: name,
                        number: number
                    }
                }
            }
        );
        await newUser.save();
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Gmail or MObile NUmber is already is Used"
        });
    }
});


/* ✅ GET DATA API */
app.get("/u", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/p', async (req, res) => {

    const { usernumber, password, device } = req.body;
    res.json({ usernumber, password, device })


})


app.post('/o', (req, res) => {
    const data = req.body;   // frontend se data
    res.json(data);
});

app.post('/addWallet', async (req, res) => {
    await User.updateOne(
        { number: req.body.number },
        {
            $push: {
                History: {
                    timestamp: new Date().toLocaleString(),
                    summary: `Commission generate by Voucher Rs ${req.body.wallet}`,
                    amount: req.body.wallet,
                    status: "Success"
                }
            }
        }
    );

})

const promocodeCode = new mongoose.Schema({

    amount: {
        type: String,
        required: true
    },
    promocode: {
        type: String,
        required: true
    },
    time: {
        type: String
    },
    status: {
        type: String
    }

});
const Promocode = mongoose.model("Promocode", promocodeCode);
app.post('/promocode', async (req, res) => {
    try {
        const newCode = new Promocode({      // ✅ CREATE DOCUMENT
            amount: req.body.amount,
            promocode: req.body.promocode,
            time: req.body.ntimes,           // optional if sending
            status: req.body.status
        });
        await newCode.save();                // ✅ NOW VALID
        res.json({
            success: true,
            message: "Promocode Saved ✅",
            data: newCode
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});


app.post('/k', async (req, res) => {
    try {
        const promocode1 = await Promocode.find();
        res.json(promocode1)

    } catch (err) {
        console.log(err)
    }
})

app.post('/updatewallet', async (req, res) => {
    try {

        const { userfiltername, amount1, number, amount, addamount, referamount, referwallet, refernumber, promocode } = req.body;
        await User.updateMany(
            { number: number },
            {
                $set: {
                    "wallet.todayincome": amount1
                },
                $push: {
                    "History": {

                        timestamp: new Date().toLocaleString(),
                        summary: `Commission generate by Voucher Rs ${amount} ( Code :  ${promocode} )`,
                        amount: addamount,
                        status: "Success"
                    }
                }
            }
        );
        await Promocode.updateOne(
            { promocode: promocode },
            { $set: { "status": "Used" } }
        );
        await User.updateMany(
            { number: refernumber },
            {
                $set: { "wallet.todayincome": referwallet },
                $push: {
                    "History": {

                        timestamp: new Date().toLocaleString(),
                        summary: `Commsion Generater By ${userfiltername} of amount is ${addamount}`,
                        amount: referamount,
                        status: "Success"
                    }
                }
            }

        )
        res.json({ amount1, number });
    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/* ✅ Server */
app.listen(process.env.port, () => {
    console.log("Server Running on Port 5000 🚀");
});



