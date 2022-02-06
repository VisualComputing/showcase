# Shaders

## Fotomosaico

Se crea un programa en processing por medio del cual se pueda realizar el fotomosaico de una imagen a partir de un conjunto de imagenes pre existentes

![Imagen Original](https://github.com/snriverar84/vc-1/blob/Entrega2/files/Bruno.jpg?raw=true)

El mosaico se arma a partir de imagenes que tengan el nivel de brillo mas parecido a cada uno de los pixeles (o regiones) que conforman la imagen original

El primer paso es la obtención de un banco de imagenes las cuales serviran para construir el fotomosaico. Para esto, se hace uso de un Web Crawler que dada una URL y una ruta en un servidor local, descarga todas las imagenes de la pagina dada. Sin embargo, se identifico que tambien descarga archivos que nos imagenes pero que hacen parte de la construcción de ciertos tipos de paginas web, por lo que posterior a la descarga de las imagenes se procede a borrar todas aquellas que no tengan una extensión de tipo .jpg, .jpeg, .png y .gif.

El Web Crawler esta implmentado en Java. Este es el código utilizado:

<div style="height:600px;width:800px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;">

```tpl
package study;

import java.util.*;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

public class meizi {
    /**
     * Download the picture to the specified directory
     *
     * @param filePath File path
     * @param imgUrl   Picture URL
     */
	
    public static void downImages(String filePath, String imgUrl) {
        // If the specified folder does not exist, create it first
        File dir = new File(filePath);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        
     // Intercept image file name
        String fileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length());

        try {
            // There may be Chinese or blank in the file name, so we need to deal with it here. But spaces are converted to plus by URLEncoder
            String urlTail = URLEncoder.encode(fileName, "UTF-8");
            // Therefore, the plus sign should be converted to% 20 in UTF-8 format.
            imgUrl = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1) + urlTail.replaceAll("\\+", "\\%20");

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
       
        
        // Written paths
        File file = new File(filePath + File.separator + fileName);

        try {
            // Get the picture URL
            URL url = new URL(imgUrl);
            // Get connected
            URLConnection connection = url.openConnection();
            // Set the corresponding time of 10 seconds
            connection.setConnectTimeout(10 * 1000);
            //connection.setReadTimeout(20*1000);
            // Get the input stream
            InputStream in = connection.getInputStream();
            // Obtain the output stream
            BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(file));
            // Building Buffers
            byte[] buf = new byte[1024];
            int size;
            // Write to a file
            while (-1 != (size = in.read(buf))) {
                out.write(buf, 0, size);
            }
            out.close();
            in.close();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    
    public static void findhref(String hrefURL) {
    	// Getting Connections Using Jsoup
        Connection connect = Jsoup.connect(hrefURL);
        try {
            // Get the Document object
            Document document = connect.get();
            // Find all img Tags
            Elements imgs = document.getElementsByTag("img");
            System.out.println("A total of the following were detected imgURL: ");
            // Traverse the img tag and get the attributes of src
            for (Element element : imgs) {
                //Get each a tag URL "abs:" for the absolute path
                String imgUrl = element.attr("abs:src");
                // Print URL
                if(imgUrl.charAt(4)=='s') {
                	if(imgUrl.charAt(6)=='/' && imgUrl.charAt(7)!='/') {
                		imgUrl = imgUrl.substring(0,6) + '/' + imgUrl.substring(6,imgUrl.length());
                	}
                }
                System.out.println(imgUrl);
                //Download pictures to local
                meizi.downImages("e:/img", imgUrl);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    

    public static void main(String[] args) {
        // Getting Connections Using Jsoup
        Connection connect = Jsoup.connect("https://www.metpage.org");
        try {
            // Get the Document object
            Document document = connect.get();
            // Find all a Tags
            Elements hrefs = document.getElementsByTag("a");
            System.out.println("Start downloading");
            // Traverse the a tag and get the attributes of href
            for (Element element : hrefs) {
                //Get each a tag URL "abs:" for the absolute path
                String hrefURL = element.attr("abs:href");
                //Download pictures to local
                if(hrefURL.equals("")) {
                	//System.out.println("1111111111111111:");
                	continue;
                }
                
                meizi.findhref(hrefURL);
            }
            System.out.println("Download complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
       
        // Here we delete all files that doesn't have image extension
        File folder = new File("e:/img");
        File fList[] = folder.listFiles();

        for (File f : fList) {
            //if (!f.getName().endsWith(".png")) {
           if (!f.getName().endsWith(".png")&&!f.getName().endsWith(".gif")&&!f.getName().endsWith(".jpg")&&!f.getName().endsWith(".jpeg")) {    
                f.delete(); 
            }}
        System.out.println("Delete done");
           
    }
      
}
```

</div>

El código implementado en processing tiene la siguiente estructura:

1. Se definen algunas variables a utilizar (entre ellas el factor de escala) y la ruta donde quedaron almacenadas las imagenes obtenidas por el Web Crawler

```tpl
int scl = 5; // Factor de escala
int w;
int h;
void setup () {
  size(1600, 1749);
  prueba = loadImage("Bruno.jpg");
```

2. Se cargan en un vector de tipo PImages las imagenes que van a ser parte del foto mosaico

```tpl
  File[] files = listFiles("e:/img/"); // se cargan en un array las imagenes que van a ser parte del mosico E:\img
  allImages = new PImage[files.length-1]; // vector de tipo PImages con todas las imagenes
  //allImages = new PImage[60];
  brightness = new float[allImages.length];
  brightImages = new PImage[256];
```

3. Se recorre el Array con todas las imágenes, se obtiene el brillo promedio de todas las imagenes y se crea un array de nombre "brightness" con el brillo promedio de cada una de las imagenes de array de imágenes

```tpl
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
```

4. La imagen original se cuadricula y se convierte a escala de grises (calculando el brillo de cada cuadro). Se elimina la cuadricula de la imagen y cada uno de los recuadros es reemplazado por la imagenj del image array cuyo promedio de brillo sea el mas parecido

```tpl
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
```
El codigo completo en processing es el siguiente:

<div style="height:600px;width:800px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;">

```tpl

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

```
</div>

Al final, la imagen del fotomosaico obtenida es la siguiente:

![Imagen Obtenida](https://github.com/snriverar84/vc-1/blob/Entrega2/files/Bruno%20Fotomosaico.png?raw=true)






