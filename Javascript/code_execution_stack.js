/*
Phases :- 

 1) Global Phase(is assigned to this)
 2) Memory Phase
 3) Execution Phase


*/


// let there is a code

let v1 = 10;
let v2 = 20;

function addNum(s1, s2){
    let total = s1 + s2 ;
    return total;
}

let r1 = addNum(v1, v2);
let r2 = addNum(3,6);

/*
 Step 1) = Global Phase (is assigned to this)

 Step 2) = Memory Phase
 v1 = undefined
 v2 = undefined

 addNum = definition
 r1 = undefined
 r2 = undefined

 Step 3) =  Execution Phase
 v1 = 10
 v2 = 20

 // It is incomplete...to look into it

*/