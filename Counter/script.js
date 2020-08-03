let count = 0;

function modify(amount) {
    count = count + amount;
    document.getElementById("counter").innerText = count;
    console.log("Modified");
}

// function increment() {
//     count++;
//     document.getElementById("counter").innerText = count;
//     console.log("Incremented");
// }
// function decrement() {
//     count--;
//     document.getElementById("counter").innerText = count;
//     console.log("Decremented");
//}
function reset() {
    count = 0;
    document.getElementById("counter").innerText = count;
    console.log("Reset to 0");
}