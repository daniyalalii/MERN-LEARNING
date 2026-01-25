const storage = {
    "A1": 100,
    "B2": 50,
    "C3": 20
};


// const input = process.argv.slice(2);
let id = "A1";
const qty = 10;

console.log("-----CLI order processor-----");

if (!storage[id]) {
    console.log("There is no product with this id");
}
else if (isNaN(qty) || qty < 0) {
    console.log("Invalid quantity");
}
else {
    const total = storage[id] * qty;
    console.log(`Order Success, Quantity ${qty}, id ${id}, total: ${total}`);
}