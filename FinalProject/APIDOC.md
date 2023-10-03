# *Julian Navarro and Favour Okodogbe* API Documentation
*API gives the clothing name, image, types, price, description, and quantity
of the LA Clothing Store.

If there is an error, by being a bad request it returns the error 400 with 
a message saying "Did not pass in ________ information.

## *Fill in Endpoint 1
**Request Type:** */data*

**Returned Data Format**: JSON

**Description:** *Gets the information in data.json by reading the file. This information is of the products that out company offers.*

**Supported Parameters** *(req, res)*

**Example Request:** *N/A*

**Example Response:**
```json
{
    "tag-name": "Women-Top1",
    "image": "imgs/ftop1.jpeg",
    "name": "Lakers Shirt",
    "clothing-type": "tops",
    "gender-type": "female",
    "product-quatity": "1",
    "price": "35.50",
    "description": "Support the local basketball team, the Lakers, with this loose-fitted shirt!"
  }
```

**Error Handling:**
*If an error is found it returns:*
*"Error in fetching data"*


## *Fill in Endpoint 2
**Request Format:** */cart*

**Returned Data Format**: JSON

**Description:** *This get the information from the cart.json file by reading the file. This information is about the items
                  that the client has added to its cart.*

**Supported Parameters** *(req, res)*

**Example Request:** *N/A*

**Example Response:**
```json
{
    "name": "Lakers Shirt",
    "size": "S",
    "color": "Red",
    "image": "http://localhost:8000/imgs/ftop1.jpeg",
    "price": "35.50",
    "quantity": "1"
}
```

**Error Handling:**
*If an error is found it returns:*
*"Error in fetching data"*



## *Fill in Endpoint 3 
**Request Format:** */review*

**Returned Data Format**: JSON

**Description:** *This get the information that is in review.json file about the reviews 
                  that the client has done from different products*

**Supported Parameters** *(req, res)*

**Example Request:** *N/A*

**Example Response:**
```json
{
    "name": "Lakers Shirt",
    "review": "Nice!"
}
```

**Error Handling:**
*If an error is found it returns:*
*"Error in fetching data"*


## *Fill in Endpoint 4
**Request Format:** */addToCart*

**Returned Data Format**: Plain text

**Description:** *Adds the information of the item that the client wants to add to their cart to cart.json.*

**Supported Parameters** *(req, res)*

**Example Request:** *N/A*

**Example Response:**
```
Item has been added to cart!
```

**Error Handling:**
*If an error is found it returns:*
*"Error in fetching data"*



## *Fill in Endpoint 5
**Request Format:** */updateQuantity*

**Returned Data Format**: Plain text

**Description:** *Updates the quantity of the prodcuts in data.json*

**Supported Parameters** *(req, res)*

**Example Request:** *N/A*

**Example Response:**
```
"Item has been added to cart!"
```

**Error Handling:**
*If an error is found it returns:*
*"Error in fetching data"*


## *Fill in Endpoint 6
**Request Format:** */restoreQuantity*

**Returned Data Format**: Plain text

**Description:** *Restores the quantity after the user removes items from the cart in data.json*

**Supported Parameters** *(req, res)*

**Example Request:** *N/A*

**Example Response:**
```
"Item has been added to cart!"
```

**Error Handling:**
*If an error is found it returns:*
*"Error in fetching data"*



## *Fill in Endpoint 7
**Request Format:** */addToContact*

**Returned Data Format**: Plain text

**Description:** *Adds the information of the person who wants to contact our company to contact.json*

**Supported Parameters** *(req, res)*

**Example Request:** *N/A*

**Example Response:**
```
"Your information has been sent!"
```

**Error Handling:**
*If an error is found it returns:*
*"Error in fetching data"*


## *Fill in Endpoint 8
**Request Format:** */removeCart*

**Returned Data Format**: Plain text

**Description:** *Removes an item that the client wants to remove from his cart. It removes the item and its information from cart.json*

**Supported Parameters** *(req, res)*

**Example Request:** *N/A*

**Example Response:**
```
"Item has been removed to cart!"
```

**Error Handling:**
*If an error is found it returns:*
*"Error in fetching data"*

## *Fill in Endpoint 9
**Request Format:** */clearCart*

**Returned Data Format**: Plain text

**Description:** *Clear the cart of the client when this presses check out in cart.json*

**Supported Parameters** *(req, res)*

**Example Request:** *N/A*

**Example Response:**
```
"Item has been removed to cart!"
```

**Error Handling:**
*If an error is found it returns:*
*"Error in fetching data"*

## *Fill in Endpoint 10
**Request Format:** */addToReviews*

**Returned Data Format**: Plain text

**Description:** *Adds the review of a product and information of the client to review.json, for a client leaving a review
                  of a product of our company. *

**Supported Parameters** *(req, res)*

**Example Request:** *N/A*

**Example Response:**
```
"Item has been added to review page!"
```

**Error Handling:**
*If an error is found it returns:*
*"Error in fetching data"*