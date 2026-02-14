let products = [
    {
        id: 1,
        name: 'Laptop',
        price: 999.99,
        category: 'Electronics',
        inStock: true
    },
    {
        id: 2,
        name: 'Wireless Mouse',
        price: 29.99,
        category: 'Electronics',
        inStock: true
    },
    {
        id: 3,
        name: 'Desk Chair',
        price: 199.99,
        category: 'Furniture',
        inStock: false
    }
];

let nextId = 4;
module.exports = {
    products,
    getNextId: ()=> nextId++
};
