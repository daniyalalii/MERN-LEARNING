console.log("Figuring out event-loop (awareness)");

setTimeout(() => {
    console.log("this will work after 2 seconds");
}, 2000);

for(let i = 0; i< 10; i++){
    for(let j = 0; j< 10; j++){
        console.log(`Value of i and j: ${i}, ${j}`);
    }
}
