## Fotomosaico

El fotomosaico es una imagen, retrato o fotografía que se divide por figuras geométricas, generalmente
por cuadrados o rectángulos del mismo tamaño, esto con el fin de remplazar las mismas
por otros retratos, fotografías o imágenes que concuerden con los colores promedio que encierran las
figuras geométricas de la imagen original, logrando que al visualizar la
imagen de un punto lejano se logre ver como la original , pero que al ver de un punto cercano o al 
hacer zoom se pueda percibir que se compone de otras imágenes.

# Fotomosaico

##  Fotomosaico por hardware

La implementación del fotomosaico se puede realizar a través de hardware, es decir, la construcción de un algoritmo que se encargue de convertir la imagen original en un mosaico de otras.

En la funcion `preload` definimos el fragmento a usar demoninado `photomosaic.frag`, a partir de ahi al mosaico final vamos a definir ciertos parametros que van a ser obtenidos al momento de recorrer la imagen, aqui se comparan los texeles del color promedio que posee cada pixel de la imagen o video original.

Los colores promedio de la imagen original son comparados con la imagen devuelta por el quadrille, haciendo uso de una tolerancia que va aumentando hasta encontrar el color mas cercano al del original y de esta forma ese color encontrado es el que se usa para llenar en la imagen que se muestra como resultado.

{{< p5-iframe sketch="/visual_computing/sketches/photomosaic.js" lib1="/visual_computing/sketches/libraries/p5.shaderbox.js" lib2="/visual_computing/sketches/libraries/p5.quadrille.js" width="675" height="675" >}}
