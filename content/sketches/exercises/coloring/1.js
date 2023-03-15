let r, g, b;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  // Crea campos de texto para los valores r, g, b.
  rInput = createInput(255);
  rInput.position(20, 20);
  
  gInput = createInput(0);
  gInput.position(20, 50);
  
  bInput = createInput(0);
  bInput.position(20, 80);
  
  // Botón para la transofrmación
  transformButton = createButton('Transformar colores para protanopia');
  transformButton.position(20, 120);
  transformButton.mousePressed(transformColor);
}

function transformColor() {
  // Toma los valores r, g, b de los campos
  r = rInput.value();
  g = gInput.value();
  b = bInput.value();
  
  // Aplica la transformación a los valores ingresados
  let newR = 0.56667 * r + 0.43333 * g + 0 * b;
  let newG = 0.55833 * r + 0.44167 * g + 0 * b;
  let newB = 0 * r + 0.24167 * g + 0.75833 * b;
  
  // Muestra los valores nuevos en la parte inferior del canvas
  fill(r, g, b);
  rect(100, 200, 100, 100);
  
  fill(newR, newG, newB);
  rect(220, 200, 100, 100);
}

function draw() {

}