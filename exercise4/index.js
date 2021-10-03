const express = require('express')
const app = express()
const port = 4000
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const cors = require('cors')

app.use(cors());

let rawdata = fs.readFileSync('productData.json');
let products = JSON.parse(rawdata).products;

function createProduct(req) {
    const product = {
        id: uuidv4(),
        productName: req.body.productName,
        manufacturer: req.body.manufacturer,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
    };
    products.push(product);
    return products;
}

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Product Test')
})

app.post('/products/create', (req, res) => {
    console.log('Creating product');
    console.log(req.body);

    const product = createProduct(req);
    res.statusCode = 201;

    res.json(products);
    res.send('Product created with id' + product.id);
})

app.get('/products', (req, res) => {
    console.log('Getting all products');
    console.log(req.body);

    res.json(products);
})

app.get('/products/:id/find', (req, res) => {
    console.log('Getting a product');
    console.log(req.body);

    const result = products.find(p => p.id === req.params.id);
    res.json(result);
})

app.put('/products/modify', (req, res) => {
    console.log('Modifying product');
    console.log(req.body);

    const result = products.findIndex(p => p.id === req.body.id);

    if (result === undefined) {
        createProduct(req);
        res.statusCode = 201;
        res.send('Product created with id: ' + product.id);
    }
    else {
        res.statusCode = 200;
        products[result] = req.body;
        res.send('Product updated');
    }
})

app.delete('/products/:id/delete', (req, res) => {
    console.log('Deleting product');
    console.log(req.params);

    const filteredProducts = products
    .filter(i => i.id !== req.params.id);

    products = filteredProducts;
    
    console.log(products);

    res.json(products);
})

app.get('/products/search', (req, res) => {
    console.log('Searching products');
    console.log(req.body);

    const result = products.filter(p =>
        p[req.body.propertyName] !== undefined &&
        p[req.body.propertyName].includes(req.body.searchValue));

    console.log(result);

    if (result !== undefined && result.length > 0) {
        res.json(result);
    }
    else {
        res.statusCode = 404;
        res.send('Not found')
    }
})

let users = [];

app.post('/users/create', (req, res) => {
    console.log('Creating a user');
    console.log(req.body);

    const user = {
        id: uuidv4(),
        ...req.body
    }
    users.push(user);

    res.json(user);
})

let userInvoices = [];

function createInvoice(userId, body) {
    const purchasedProducts = products
        .filter(p => body.productIds.includes(p.id));

    const totalSum = purchasedProducts
        .map(p => p.price)
        .reduce((prev, p) => prev + p);
    console.log(totalSum);

    const userInvoice = {
        id: uuidv4(),
        userId: userId,
        invoice: {

            products: purchasedProducts,
            sum: totalSum
        }
    }
    userInvoices.push(userInvoice);
}

app.post('/users/:id/purchase', (req, res) => {
    createInvoice(req.params.id, req.body);

    res.send('Purchased products')
})

app.get('/users/:id/invoices', (req, res) => {
    console.log('Getting user invoices');

    const allInvoicesOfUser = userInvoices
        .filter(i => i.userId === req.params.id);

    console.log(allInvoicesOfUser);
    res.json(allInvoicesOfUser);
})

app.get('/users/:id/invoices/:invoiceId', (req, res) => {
    console.log('Getting a user invoice');

    const userInvoice = userInvoices
        .filter(i => i.userId === req.params.id)
        .find(i => i.id === req.params.invoiceId);

    console.log(userInvoice);
    res.json(userInvoice);
})

app.delete('/users/:id/invoices/:invoiceId', (req, res) => {
    console.log('Deleting invoice');

    const invoices = userInvoices
        .filter(i => i.id !== req.params.invoiceId);

    userInvoices = invoices;

    res.send('Deleted')
})

app.listen(port, () => {
    console.log('Listening')
})