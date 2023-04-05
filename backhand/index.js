const express = require('express');
const app = express();
require('./db/config')
const jwt = require('jsonwebtoken');
const User = require('./db/user')
const Product = require('./db/product')
const cors = require('cors')
const jwtkey = "e-comm";

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "something went wrong" })
        }
        res.send({ result, auth: token })
    })
    result = result.toObject();
    delete result.password
})

app.post("/login", async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "something went wrong" })
                }
                res.send({ user, auth: token })
            })
        } else {
            res.send({ result: "No data found" })
        }
    } else {
        res.send({ result: "no data found" })
    }
})

app.post('/add-product',verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})

app.get("/products",verifyToken, async (req, res) => {
    let products = await Product.find();
    res.status(200).json(products)
})

app.delete('/product/:id',verifyToken, async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id })
    res.status(200).json(result);
})

app.get('/product/:id',verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.status(200).json(result)
    } else {
        res.send({ result: "Not Found" })
    }
})

app.put('/product/:id',verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    })
    res.send(result);
})


function verifyToken(req, res, next) {
    let token = req.header("Authorization");
    if (!token) {
        return res.status(403).send("Access Denied");
    }
    if (token.startsWith("bearer ")) {
        token = token.slice(7, token.length).trimLeft();
    }
    jwt.verify(token, jwtkey, (err, valid) => {
        if (err) {
            res.status(401).send({ result: "Please Provide valid token" })
        } else {
            next();
        }
    })
}

app.listen(5000);