let name1: string = "Daniyal";
let age: number = 20;
let isAdmin: boolean = true;
console.log(`Name: ${name1}, Age: ${age}, isAdmin: ${isAdmin}`);

function add(a: number, b: number):number{
    return a+b;
}

// console.log(add("10",20)); compile time error 
console.log(add(10,20));

// const user: {name: string, role: string} = {
//     name: "Ali",
//     role: "admin"
// };

// console.log(user.name, user.role);

interface User{
    id: string
    name: string
    email: string
    role: "admin" | "user"  
}
const person1 : User = {
    id: "1",
    name: "Daniyal",
    email : "123@gmail.com",
    role: "user"
};

interface Product {
    id: string
    name: string
    price: number
    stock?: number // ? means optional (may or may not)
}

const product1: Product = {
    id: "101",
    name : "Laptop",
    price : 200000,
    stock : 1000
}

console.log(product1.stock);

let numbers: number[] = [1, 2, 3]
console.log(numbers);

// union types for api's
let stat: "success" | "fail" | "error";
stat = "success"; // valid
// stat = 2; invalid
console.log(stat);