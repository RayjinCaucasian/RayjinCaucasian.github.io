//get choices, global for reuse
const choices = document.getElementById("choices");
//add input listener to choices parent for event delegation
choices.addEventListener("input", inputControl)
//set behavior of input fields for adding and removing input elements 
function inputControl(evt){
    //get target
    const target = evt.target
    //check if target is input for event delegation
    if(target.matches('input') && target.type === "text"){
        //check all inputs for values to set "inputsFull" boolean
        let inputsFull = false;
        for(let input of choices.children){
            if(!input.value){
                inputsFull = false;
                break;
            }
            inputsFull = true;
        }
        //add input element if all others have values
        if(inputsFull == true){
            choices.appendChild(document.createElement("input"))
        }
        //remove input element if value empty 
        if(target.value === '' && choices.children.length > 2){
            target.remove();
            choices.lastChild.focus();
        }
    }
}
//add click linstenr to "roll" button;
document.getElementById("roll").addEventListener("click", roll);

//"roll" for random choice
function roll(){
    //get choices
    const choiceArray = [...choices.children];
    //remove last, always empty
    choiceArray.pop();
    //get random value for index of "choiceArray"
    const randomIndex = Math.floor(Math.random()*choiceArray.length);
    //use "randomIndex" to select choice from "choiceArray"
    document.getElementById("result").innerHTML = `${choiceArray[randomIndex].value.toUpperCase().bold()} has been chosen`; 
}
//add click listener to "clear" button
document.getElementById("clear").addEventListener("click", clearInputs);

//clear input fields
function clearInputs(){
    //remove all but 2 inuput fileds 
    const children = choices.children
    while(children.length > 2){
        children[0].remove();
    }
    //clear value from remaining input field
    children[0].value = "";
    //return focus to children[0];
    children[0].focus();
    //clear value from "result" <p>
    document.getElementById("result").innerText = "";
}