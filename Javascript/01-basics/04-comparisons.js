// console.log(2 > 1);
// console.log(2 >= 1);
// console.log(2 < 1);
// console.log(2 == 1);
// console.log(2 != 1);


// console.log("2" > 1); // true
// console.log("02" > 1); // true [JS implicitly converts string to number]

console.log(null > 0);
console.log(null == 0);
console.log(null >= 0);

// comparisons convert null to a number, treating it as 0.
// That's why (3) null >= 0 is true and (1)null > 0 is false

console.log(undefined == 0);
console.log(undefined > 0);
console.log(undefined < 0);


// === 

console.log("2" === 2);