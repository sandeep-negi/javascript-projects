const user = {
    username: "hitesh",
    price: 999,

    welcomeMessage: function() {
        console.log(`${this.username} , welcome to website`);
        console.log(this);
    }

}

// user.welcomeMessage()
// user.username = "sam"
// user.welcomeMessage()

// Return empty Object in node environment
// console.log(this);

// function chai(){
//     let username = "hitesh"
//     console.log(this.username); // Will give undefined as this works only inside object and not inside functions/methods
// }

// chai()

// const chai = function () {
//     let username = "hitesh"
//     console.log(this.username);
// }

const chai =  () => {
    let username = "hitesh"
    console.log(this);
}


// chai()


// Explicit return { return num1 + num2}
// const addTwo = (num1, num2) => {
//     return num1 + num2
// }


// Implicit return (num1 + num2) [means we do not need to write return with () brackets]
// const addTwo = (num1, num2) =>  num1 + num2

// const addTwo = (num1, num2) => ( num1 + num2 )


// To return object we use ({})
const addTwo = (num1, num2) => ({username: "hitesh"})


console.log(addTwo(3, 4))


// const myArray = [2, 5, 3, 7, 8]

// myArray.forEach()