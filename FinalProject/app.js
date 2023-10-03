"use strict";

const express = require("express");
const app = express();
const multer = require("multer");
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());
app.use(express.static("public"));
app.use(express.json());
const fsp = require("fs/promises");

app.get("/data", async (req, res) => {
    try {
        let resp = await fsp.readFile("public/data.json", "utf8");
        resp = await JSON.parse(resp);
        res.type("json");
        res.send(resp);
    }
    catch(error) {
        res.status(500).send("Error in fetching data.");
    }
});

app.get("/cart", async (req, res) => {
    try {
        let resp = await fsp.readFile("public/cart.json", "utf8");
        resp = await JSON.parse(resp);
        res.type("json");
        res.send(resp);
    }
    catch(error) {
        res.status(500).send("Error in fetching data.");
    }
});

app.get("/review", async (req, res) => {
    try {
        let resp = await fsp.readFile("public/review.json", "utf8");
        resp = await JSON.parse(resp);
        res.type("json");
        res.send(resp);
    }
    catch(error) {
        res.status(500).send("Error in fetching data.");
    }
});

//app.get("/filter", async (req, res) => {

// });

app.post("/addToCart", async (req, res) => {
    let product_name = req.body.name;
    let product_size = req.body.size;
    let product_color = req.body.color;
    let product_image = req.body.image;
    let product_price = req.body.price;
    let product_quantity = req.body.quantity;
    if (!(product_name && product_size && product_color && product_image && product_price && product_quantity)) {
        res.type("text");
        res.status(400).send("Did not pass in product information.");
        return;
    }
    try {
        let resp = await fsp.readFile("public/cart.json", "utf8");
        resp = JSON.parse(resp);
        let data = {"name": product_name, "size": product_size, "color": product_color,
                    "image": product_image, "price": product_price, "quantity": product_quantity};
        resp.push(data);
        await fsp.writeFile("public/cart.json", JSON.stringify(resp, null, 2), "utf8");
        res.type("text");
        res.send("Item has been added to cart!");
    }
    catch(error) {
        res.type("text");
        res.status(500).send("Error in fetching data.");
    } 
});

app.post("/updateQuantity", async (req, res) => {
    let product_name = req.body.name;
    let product_quantity = req.body.quantity;
    if (!(product_name && product_quantity)) {
        res.type("text");
        res.status(400).send("Did not pass in product information.");
        return;
    }
    try {
        let resp = await fsp.readFile("public/data.json", "utf8");
        resp = JSON.parse(resp);
        for (let i = 0; i < resp.length; i++) {
            if (resp[i]["name"] === product_name) {
                let quant = resp[i]["product-quatity"];
                quant -= product_quantity;
                resp[i]["product-quatity"] = quant.toString();
            }
        }
        await fsp.writeFile("public/data.json", JSON.stringify(resp, null, 2), "utf8");
        res.type("text");
        res.send("Item has been added to cart!");
    }
    catch(error) {
        res.type("text");
        res.status(500).send("Error in fetching data.");
    } 

});

app.post("/restoreQuantity", async (req, res) => {
    let product_name = req.body.name;
    let product_quantity = req.body.quantity;
    if (!(product_name && product_quantity)) {
        res.type("text");
        res.status(400).send("Did not pass in product information.");
        return;
    }
    try {
        let resp = await fsp.readFile("public/data.json", "utf8");
        resp = JSON.parse(resp);
        for (let i = 0; i < resp.length; i++) {
            if (resp[i]["name"] === product_name) {
                let quant = resp[i]["product-quatity"];
                quant = parseInt(quant)
                quant += parseInt(product_quantity);
                resp[i]["product-quatity"] = quant.toString();
            }
        }
        await fsp.writeFile("public/data.json", JSON.stringify(resp, null, 2), "utf8");
        res.type("text");
        res.send("Item has been added to cart!");
    }
    catch(error) {
        res.type("text");
        res.status(500).send("Error in fetching data.");
    } 

});

app.post("/addToContact", async (req, res) => {
    let contact_name = req.body.name;
    let contact_email = req.body.email;
    let contact_date = req.body.date;
    let contact_info = req.body.info;
    if (!(contact_name && contact_date && contact_info && contact_email)) {
        res.type("text");
        res.status(400).send("Did not pass in contact information.");
        return;
    }
    try {
        let resp = await fsp.readFile("public/contact.json", "utf8");
        resp = JSON.parse(resp);
        let data = {"name": contact_name, "email": contact_email, "date": contact_date, "info": contact_info};
        resp.push(data);
        await fsp.writeFile("public/contact.json", JSON.stringify(resp, null, 2), "utf8");
        res.type("text");
        res.send("Your information has been sent!");
    }
    catch(error) {
        res.type("text");
        res.status(500).send("Error in fetching data.");
    } 
});

app.post("/removeCart", async (req, res) => {
    let product_name = req.body.name;
    let product_color = req.body.color;
    let product_size = req.body.size;
    let product_quantity = req.body.quantity;

    if (!(product_name && product_size && product_color && product_quantity )) {
        res.type("text");
        res.status(400).send("Did not pass in product information.");
        return;
    }
    try {
        let resp = await fsp.readFile("public/cart.json", "utf8");
        resp = JSON.parse(resp);
        let data = [product_name, product_size, product_color, product_quantity];
        for (let i = 0; i < resp.length; i++) {
            if(resp[i]["name"] == data[0] && resp[i]["size"] == data[1] && resp[i]["color"] == data[2] && resp[i]["quantity"] == data[3]) {
               resp.splice(i, 1);
            }
        }
        await fsp.writeFile("public/cart.json", JSON.stringify(resp, null, 2), "utf8");
        res.type("text");
        res.send("Item has been removed to cart!");
    }
    catch(error) {
        res.type("text");
        res.status(500).send("Error in fetching data.");
    } 
});

app.post("/clearCart", async (req, res) => {
    try {
        let resp = await fsp.readFile("public/cart.json", "utf8");
        resp = JSON.parse(resp);
        for (let i = 0; i < resp.length; i++) {
            resp.pop();
        }
        await fsp.writeFile("public/cart.json", JSON.stringify(resp, null, 2), "utf8");
        res.type("text");
        res.send("Item has been removed to cart!");
    }
    catch(error) {
        res.type("text");
        res.status(500).send("Error in fetching data.");
    } 
});


app.post("/addToReviews", async (req, res) => {
    let review_name = req.body.name;
    let review_desc = req.body.review;
    if (!(review_name && review_desc)) {
        res.type("text");
        res.status(400).send("Did not pass in review information.");
    }
    try {
        let resp = await fsp.readFile("public/review.json", "utf8");
        resp = await JSON.parse(resp);
        resp.push({"name": review_name, "review": review_desc});
        await fsp.writeFile("public/review.json", JSON.stringify(resp, null, 2), "utf8");
        res.type("text");
        res.send("Item has been added to review page!");
    }
    catch(error) {
        res.type("text");
        res.status(500).send("Error in fetching data.");
    } 
});


const PORT = process.env.PORT || 8000;
app.listen(PORT);