let div;
let data1;
let data2;
let button;

function setup(){
    createCanvas(255, 255);
    background(0);


    div = createDiv();

    data1 = createInput("");
    data1.attribute('placeholder', 'test input');

    button = createButton("test button");

    div.class("container");

    div.child(data1);
    div.child(button);

    div.position(0, 0)
}

function draw(){

}