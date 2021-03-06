class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;
}
/*
let item = new ToDoItem();
item.title = "Testing";
item.dueDate = "2020, 6, 1";
item.isCompleted = false;
*/

window.onload = function(){
    let addItem = document.getElementById("add");
    addItem.onclick = main;

    loadSavedItems();
}

function loadSavedItems(){
    let itemArray = getToDoItems();
    for(let i = 0; i < itemArray.length; i++){
        let currItem = itemArray[i];
        displayToDoItem(currItem);
    }
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}

function isValid():boolean{
    return true;
}

function getToDoItem():ToDoItem{
    let myItem = new ToDoItem();

    let titleInput = getInput("title");
    myItem.title = titleInput.value;

    let dueDateInput = getInput("due-date");
    myItem.dueDate = new Date(dueDateInput.value);

    let isCompleted = getInput("is-complete");
    myItem.isCompleted = isCompleted.checked;

    return myItem;
}

function getInput(id):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;


    let itemDate = document.createElement("p");
    //itemDate.innerText = item.dueDate.toDateString(); 
    //itemDate.innerText = item.dueDate.toLocaleDateString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();


    let itemDiv = document.createElement("div");
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }
    else{
        itemDiv.classList.add("incompleted");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);


    if(item.isCompleted){
        let completedToDos = document.getElementById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = document.getElementById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}

function saveToDo(item:ToDoItem):void{
    let currItems = getToDoItems();
    if(currItems == null){
        currItems = new Array();
    }
    currItems.push(item);

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}

const todokey = "todo";

function getToDoItems():ToDoItem[]{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}

