let input = document.getElementById("newitem");

input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        let value = input.value
        addElementToList(value)
        input.value = ""
    }
});

function addElementToList(value) {
    let ul = document.getElementById("unorder-list");
    let li = document.createElement("li");
    li.appendChild(createInput(ul));
    let span = document.createElement("span")
    span.appendChild(createDel(value))
    // li.appendChild(document.createElement("span").appendChild(createDel(value)))
    li.append(span)
    ul.appendChild(li);
}

function createInput(ul) {
    let input = document.createElement("input");
    input.type = "checkbox";
    input.name = "todo";
    input.value = ul.getElementsByTagName("li").length + 1
    return input;
}

function createDel(value) {
    let del = document.createElement("del");
    del.appendChild(document.createTextNode(value))
    return del
}