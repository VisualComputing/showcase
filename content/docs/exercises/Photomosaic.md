## Photomosaic

The photomosaic is an image, portrait, or photograph that is divided into geometric figures, usually squares or rectangles of the same size. This is done in order to replace them with other portraits, photographs, or images that match the average colors enclosed by the geometric figures of the original image. The goal is to make the image, when viewed from a distance, appear as the original, but when viewed from a close point or zoomed in, it becomes apparent that it is composed of other images.

# Photomosaic

##  Hardware Photomosaic

The implementation of the photomosaic can be done through hardware, which means constructing an algorithm that converts the original image into a mosaic of others.

In the `preload` function, we define the fragment to be used, called `photomosaic.frag`. From there, we define certain parameters for the final mosaic that will be obtained while traversing the image. Here, we compare the average color of each pixel in the original image or video with the texels of the returned image.

The average colors of the original image are compared with the image returned by the quadrille, using a tolerance that increases until the closest color to the original is found. This found color is then used to fill in the resulting image that is displayed.

{{< p5-iframe sketch="/showcase/content/sketches/exercises/photomosaic/photomosaic.js" lib1="/showcase/content/sketches/libs/p5.shaderbox.js" lib2="/showcase/content/sketches/libs/" width="675" height="675" >}}

