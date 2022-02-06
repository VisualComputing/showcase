PImage prueba;
PImage smaller;
PImage[] allImages;
float[] brightness;
PImage[] brightImages;


//Armar el mosaico a partir de imagenes que tengan el nivel de brillo mas parecido
// a cada uno de los pixeles que conforman la imagen original

int scl = 5; // Factor de escala
int w;
int h;
void setup () {
  size(1600, 1749);
  prueba = loadImage("Bruno.jpg");
  
  File[] files = listFiles("e:/img/"); // se cargan en un array las imagenes que van a ser parte del mosico E:\img
  allImages = new PImage[files.length-1]; // vector de tipo PImages con todas las imagenes
  //allImages = new PImage[60];
  brightness = new float[allImages.length];
  brightImages = new PImage[256];
  
  
  for (int i = 0; i < allImages.length; i++){ //se recorre el array con todas las imagenes
    String filename = files[i+1].toString();
    PImage img = loadImage(filename);
    
    allImages[i] = createImage(scl,scl,RGB);
    allImages[i].copy(img,0,0,img.width,img.height,0,0,scl,scl);
    allImages[i].loadPixels();
    float avg = 0;
    for (int j = 0; j < allImages[i].pixels.length; j++){ //a cada una de las imagenes del vector se le saca el brillo promedio
      float b = brightness(allImages[i].pixels[j]);
      avg += b;
    }
    avg = avg/allImages[i].pixels.length;
    brightness[i] = avg; //El arreglo brightness tiene el brillo promedio de cada una de las imagenes del array de imagenes
  }
  //printArray(brightness); 
  
  for (int i = 0; i < brightImages.length; i++) {
    float record = 256;
    for (int j = 0; j < brightness.length; j++){
      float diff = abs(i - brightness[j]);
      if (diff < record) {
        record = diff;
        brightImages[i] = allImages[j];
    }
  }
  }
  
  println();
  //printArray(files);// linea auxiliar para ver que si cargaran los nombres de los archivos en el arreglo
  
  w = prueba.width/scl;
  h = prueba.width/scl;
  smaller = createImage(w,h,RGB);
  smaller.copy(prueba,0,0,prueba.width,prueba.height,0,0,w,h);
}

/*
void draw(){
  background(0);
  smaller.loadPixels();
  for(int x = 0; x < w; x++){
    for(int y = 0; y < h ;y++){
      int index = x + y * w; //posición en el arreglo de pixeles
      color c = smaller.pixels[index];
      int imageIndex = int(brightness(c));
      //fill(brightness(c));//Pasa la imagena  blanco y negro (solo por valor de brillo en cada pixel)
      //noStroke();//funcion que elimina la cuadricula de la imagen
      //rect(x*scl,y*scl,scl,scl);
      image(brightImages[imageIndex], x*scl, y*scl, scl, scl);
    }
  }  
  //image(prueba,0,0);
  //image(smaller,0,0);
*/  

void draw(){
  background(0);
  smaller.loadPixels();
  for(int x = 0; x < w; x++){
    for(int y = 0; y < h ;y++){
      int index = x + y * w; //posición en el arreglo de pixeles
      color c = smaller.pixels[index];
      int imageIndex = int(brightness(c));
      //fill(c);
      fill(brightness(c));//Pasa la imagena  blanco y negro (solo por valor de brillo en cada pixel)
      noStroke();//funcion que elimina la cuadricula de la imagen
      rect(x*scl,y*scl,scl,scl);
      image(brightImages[imageIndex], x*scl, y*scl, scl, scl);
    }
  } 

  noLoop();
  
} 
