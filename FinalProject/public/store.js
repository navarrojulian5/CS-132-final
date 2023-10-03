/**
 * Julian Navarro
 * June 1, 2023
 * Java Script file for final project. 
 */

(function() {
    "use strict";

    /**
     * Function fetches the data from data.json. It also adds event listeners to the 
     * navigation bar and the cart image.
     * @param - no parameter
     * @return - returns nothing 
     */
    function init() {
        fetchData();
        id("reviews").addEventListener("click", reviewPage);
        id("contact").addEventListener("click", contactPage);
        id("cart").addEventListener("click", cartPage);
        id("filter-btn").addEventListener("click", fetchFilter);
        id("check-out-btn").addEventListener("click", checkOut);
        id("contact-submit-btn").addEventListener("click", saveContactInfo);
        id("review-submit-btn").addEventListener("click", reviewItem);
    }

    /**
     * Function fetches the data from data.json.
     * @param - no parameter
     * @return - returns nothing
     */
    async function fetchData() {
        const url = "/data";
        try {
            let resp = await fetch(url);
            resp = checkStatus(resp);
            let data = await resp.json();
            populateData(data);
            
        } catch {
            handleError();
        }
    }

    /**
     * Function populates the data into the home page, creating
     * an article, image, and a h2. Then it placed that data in those 
     * html tags. It also adds an event listener to the images. 
     * @param {DOM} data - API data for populating the home page
     * @return returns nothing 
     */
    function populateData(data) {
        for (let i = 0; i < data.length; i++) {
            let article = gen("article");
            let h2 = gen("h2");
            let img = gen("img");
            article.appendChild(h2);
            article.appendChild(img);
            h2.textContent = data[i]["name"];
            img.src = data[i]["image"];
            img.alt = data[i]["name"];
            img.classList.add("clicked-items");
            id("item-container").appendChild(article);
            img.addEventListener("click", () => {
                clickedProduct(data, img)
            });
        }        
    }

    /**
     * Function hides the section "item-container" and makes appear the clicked player info section. 
     * Also it populates the data from each player from data and adds an event listener to the add
     * cart button in the product page for each product.
     * @param {Object} data - API data for populating the product page
     * @param {DOM} img - image of the clicked player
     * @return returns nothing 
     */
    function clickedProduct(data, img) {
        id("home-page").classList.add("hidden");
        id("product-page").classList.remove("hidden");
        for (let i = 0; i < data.length; i++) {
            if (data[i]["name"] === img.alt) {
                id("item-name").textContent = data[i]["name"];
                id("item-description").textContent = data[i]["description"]
                id("product-img").src = data[i]["image"];
                id("item-price").textContent = data[i]["price"];
                id("quantity-left").textContent = data[i]["product-quatity"];
                id("quantity").max = data[i]["product-quatity"];
            }
        } 
        id("cart-btn").addEventListener("click", addToCart);
    }

    /**
     * Function fetches the reviews from review.json.
     * @param - no parameter
     * @return - returns nothing
     */
    async function fetchReviews() {
        const url = "/review";
        try {
            let resp = await fetch(url);
            resp = checkStatus(resp);
            let data = await resp.json();
            populateReviews(data);
            
        } catch {
            handleError();
        }
    }

    /**
     * Function populates the information of the reviews made by clients that
     * is stored in review.json in the reviews page. 
     * @param {DOM} data - data from review.json that is about the reviews that the clients
     * have done of the products. 
     * @return returns nothing 
     */
    function populateReviews(data) {
        for (let i = 0; i < data.length; i++) {
            let h3 = gen("h3");
            let span = gen("span");
            let p = gen("p");
            let hr = gen("hr");
            id("reviews-page").appendChild(h3);
            id("reviews-page").appendChild(p);
            id("reviews-page").appendChild(hr);
            h3.textContent = "Product Name: ";
            span.textContent = data[i]["name"];
            h3.appendChild(span);
            p.textContent = data[i]["review"];    
        }        
    }

    /**
     * Function is being called when the navigation elements "reviews"
     * is being clicked. It hides the other pages and unhides the reviews page 
     * for the client. It also fetches the reviews information and populates it after
     * it shows the review page. 
     * @param - no parameter
     * @return - returns nothing
     */
    function reviewPage() {
        id("reviews-page").classList.remove("hidden");
        id("home-page").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("product-page").classList.add("hidden");
        id("cart-page").classList.add("hidden");
        fetchReviews();
    }

    /**
     * Function fetches the items in the cart from cart.json.
     * @param - no parameter
     * @return - returns nothing
     */
    async function fetchCart() {
        const url = "/cart";
        try {
            let resp = await fetch(url);
            resp = checkStatus(resp);
            let data = await resp.json();
            populateCart(data);
            
        } catch {
            handleError();
        }
    }

    /**
     * Function populates cart page with the products that are in the cart(cart.json). 
     * It also adds shows the total payment and the total number of items for the client. 
     * Finally it adds an event listener for the remove item button for each item. 
     * @param {DOM} data - data from cart.json that is the items that the client has added to their car
     * @return returns nothing 
     */
    function populateCart(data) {
        while (id("items-cart-section").firstChild) {
            id("items-cart-section").removeChild(id("items-cart-section").firstChild);
        }
        let firstH2 = gen("h2");
        firstH2.textContent = "Items in the cart:";
        let itemCount = 0;
        let totalPrice = 0;
        for (let i = 0; i < data.length; i++) {
            let article = gen("article");
            let h2 = gen("h2");
            let img = gen("img");
            let price = gen("p");
            let size = gen("p");
            let color = gen("p");
            let quantity = gen("p");
            let button = gen("button");
            let hr = gen("hr");
            article.appendChild(h2);
            article.appendChild(img);
            article.appendChild(quantity);
            article.appendChild(price);
            article.appendChild(size);
            article.appendChild(color);
            button.textContent = "Remove Item"
            img.src = data[i]["image"];
            img.alt = data[i]["name"];
            let pName = data[i]["name"];
            let pSize = data[i]["size"];
            let pQuantity = data[i]["quantity"];
            let pColor = data[i]["color"];
            let pPrice = data[i]["price"];
            itemCount += parseInt(pQuantity);
            totalPrice += parseFloat(pPrice) * parseFloat(pQuantity);
            quantity.textContent = "Quantity: " + data[i]["quantity"];
            price.textContent = "Price: $" + data[i]["price"] +  " USD";
            size.textContent = "Size: " + data[i]["size"];
            color.textContent = "Color: " + data[i]["color"];
            id("items-cart-section").appendChild(article);
            id("items-cart-section").appendChild(button);
            id("items-cart-section").appendChild(hr);
            h2.textContent = data[i]["name"]; 
            button.addEventListener("click", () => {
                removeCart(pName, pQuantity, pColor, pSize)
            });
        }
        id("total-number-items").textContent = itemCount;  
        id("total-price").textContent = "$" + totalPrice + " USD";
    }

    /**
     * Function saves the information of client contacting the company in
     * contact.json. It saves the name, email, date and concern of the client. 
     * @param - no parameter
     * @return - returns nothing
     */
    async function saveContactInfo() {
        let formData = new FormData();
        let name = id("name-input").value;
        let email = id("email-input").value;
        let date = id("date-input").value;
        let concern = id("concer-input").value;
        formData.append("name", name);
        formData.append("email", email);
        formData.append("date", date);
        formData.append("info", concern);
        try {
            let res = await fetch("/addToContact", {method : "POST", body:formData});
            checkStatus(res);
        } catch {
            handleError();
        }
    }

    /**
     * Function saves the data, in review.json, from the review that the client leaves about 
     * a product. 
     * @param - no parameter
     * @return - returns nothing
     */
    async function reviewItem() {
        let formData = new FormData();
        let itemName = id("item-name").textContent;
        let comments = id("comment-input").value;
        formData.append("name", itemName);
        formData.append("review", comments);
        try {
            let res = await fetch("/addToReviews", {method : "POST", body:formData});
            checkStatus(res);
        } catch {
            handleError();
        }
    }

    /**
     * Function is being called when the cart image in the header is being clicked.
     * It hides the other pages and unhides the cart page for the client. 
     * It also fetches the cart information and populates it after
     * it shows the cart page. 
     * @param - no parameter
     * @return - returns nothing
     */
    function cartPage() {
        id("contact-page").classList.add("hidden");
        id("home-page").classList.add("hidden");
        id("product-page").classList.add("hidden");
        id("cart-page").classList.remove("hidden");
        id("reviews-page").classList.add("hidden");
        fetchCart();
    }

    /**
     * Function adds the item information to the cart in cart.json. 
     * @param - no parameter
     * @return - returns nothing
     */
    async function addToCart(){
        let formData = new FormData();
        if (id("size-drop").value == "Size" || id("color-drop").value == "Color") {
            id("notice").textContent = "Please give a size and color!";
            id("notice").classList.add("red");
        } else {
            id("notice").textContent = "Your item has been added to your cart!";
            id("notice").classList.add("green");
            let name = id("item-name").textContent;
            let size = id("size-drop").value;
            let color = id("color-drop").value;
            let image = id("product-img").src;
            let price = id("item-price").textContent;
            let quantity = id("quantity").value;
            formData.append("name", name);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("image", image);
            formData.append("price", price);
            formData.append("quantity", quantity);
            try {
                let res = await fetch("/addToCart", {method : "POST", body:formData});
                checkStatus(res);
                id("size-drop").value = "Size";
                id("color-drop").value = "Color";
                changeQuantity(name, quantity);
                id("quantity-left").textContent -= quantity;
                id("quantity").max = id("quantity-left").textContent;
                id("quantity").value = "";
            } catch {
                handleError();
            }
        }
    }

    /**
     * Function removes the items from the cart.
     * @param {string} name - name of the product
     * @param {string} quantity - quantity of the product
     * @param {string} color - color of the prodcut
     * @param {string} size - size of the product 
     */
    async function removeCart(name, quantity, color, size) {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("color", color);
        formData.append("size", size);
        formData.append("quantity", quantity);
        try {
            let res = await fetch("/removeCart", {method : "POST", body:formData}); 
            checkStatus(res);
        } catch {
            handleError();
        }
        restoreQuantity(name, quantity);
        fetchCart();
    }

    /**
     * Function changes the quantity of the products. 
     * @param {String} pName - name of the product
     * @param {String} pQuantity - quantity of the product
     */
    async function changeQuantity(pName, pQuantity) {
        let formData = new FormData();
        formData.append("name", pName);
        formData.append("quantity", pQuantity);
        try {
            let res = await fetch("/updateQuantity", {method : "POST", body:formData}); 
            checkStatus(res);
        } catch {
            handleError();
        }
    }

    /**
     * Function restores the quantity of the items. 
     * @param {string} pName - product name
     * @param {string} pQuantity - quantity of the product  
     * returns - returns nothing
     */
    async function restoreQuantity(pName, pQuantity) {
        let formData = new FormData();
        formData.append("name", pName);
        formData.append("quantity", pQuantity);
        try {
            let res = await fetch("/restoreQuantity", {method : "POST", body:formData}); 
            checkStatus(res);
        } catch {
            handleError();
        }
    }

    /**
     * Function is called when the contact us navigation bar is being clicked. It hides all the pages
     * except the contact us which is unhidden. 
     * @param - no parameters;
     * @return - returns nothing
     */
    function contactPage() {
        id("reviews-page").classList.add("hidden");
        id("home-page").classList.add("hidden");
        id("product-page").classList.add("hidden");
        id("contact-page").classList.remove("hidden");
        id("cart-page").classList.add("hidden");
    }

    /**
     * Function fetches the data from data.json for the filter. 
     * @param - no parameters;
     * @return - returns nothing
     */
    async function fetchFilter() {
        const url = "/data";
        let isGender;
        let filter = "";
        let filterVal = document.getElementsByName("type");
        for (let i = 0; i < filterVal.length; i++) {
            if (filterVal[i].checked){
                filter = filterVal[i].value;
                if (filter === "male" || filter === "female" ) {
                    isGender = true;
                } else {
                    isGender = false;
                }
            }
        }
        try {
            let resp = await fetch(url);
            resp = checkStatus(resp);
            let data = await resp.json();
            populateFilter(data, filter, isGender);
            
        } catch {
            handleError();
        }
    }

    /**
     * Function populates the data into the home page, creating
     * an article, image, and a h2. Then it placed that data in those 
     * html tags. It also adds an event listener to the images. 
     * @param {DOM} data - API data for populating the home page
     * @param {string} filter - filter string
     * @param {boolean} isGender - boolean in it is a gender or not
     * @return returns nothing 
     */
    function populateFilter(data, filter, isGender) {
        while (id("item-container").firstChild) {
            id("item-container").removeChild(id("item-container").firstChild);
        }
        if (isGender){
            for (let i = 0; i < data.length; i++) {
                if (data[i]["gender-type"] === filter) {
                    let article = gen("article");
                    let h2 = gen("h2");
                    let img = gen("img");
                    article.appendChild(h2);
                    article.appendChild(img);
                    h2.textContent = data[i]["name"];
                    img.src = data[i]["image"];
                    img.alt = data[i]["name"];
                    img.classList.add("clicked-items");
                    id("item-container").appendChild(article);
                    img.addEventListener("click", () => {
                        clickedProduct(data, img)
                    });
                }
            } 
        } else if (isGender === false) {
            for (let i = 0; i < data.length; i++) {
                if (data[i]["clothing-type"] === filter) {
                    let article = gen("article");
                    let h2 = gen("h2");
                    let img = gen("img");
                    article.appendChild(h2);
                    article.appendChild(img);
                    h2.textContent = data[i]["name"];
                    img.src = data[i]["image"];
                    img.alt = data[i]["name"];
                    img.classList.add("clicked-items");
                    id("item-container").appendChild(article);
                    img.addEventListener("click", () => {
                        clickedProduct(data, img)
                    });
                }
            } 
        }
              
    }

    /**
     * Function handles the event listener from the check out button. It hides all the pages
     * and it unhides the home page. It also clears the cart.json. 
     */
    function checkOut(){
        id("cart-page").classList.add("hidden");
        id("order-otw").textContent = "Your order is on its way!";
        id("order-otw").classList.remove("hidden");
        id("home-page").classList.remove("hidden");
        clearCart()
    }

    /**
     * Function clears cart.json.
     * @param - no parameter
     * @return returns nothing 
     */
    async function clearCart() {
        try {
            let res = await fetch("/clearCart", {method : "POST"}); 
            checkStatus(res);
        } catch {
            handleError();
        }
        fetchCart();
    }

    /**
     * Function returns the error if there is a problem with the API.
     * @param - no parameter
     * @return returns nothing 
     */
    function handleError() {
        id("temp-mess").classList.remove("hidden");
        id("temp-mess").textContent = "There is something wrong with the API, sorry for the inconveniences.";
    }
    
    init();
})();



