
# Coloring for colorblindness
>**Prompt:** Implement a color mapping application that helps people who are color blind see the colors around them.
>
In order to assess this problem, first we need to understand colorblindness and later, pick one of the many forms this may manifest.

## What is colorblindness?
Color blindness is classified according to the number of _color channels_ that are available to a person to conveying color information into: [monochromacy](https://en.wikipedia.org/wiki/Monochromacy), [dichromacy](https://en.wikipedia.org/wiki/Dichromacy) and anomalous trichromacy. Refer to the [Ishihara test](https://en.wikipedia.org/wiki/Ishihara_test) for a color vision dificiency test.

For this particular P5.js implementation, I choose ***protanopia*** as my colorblindess type of interest. **Protanopia** is a kind of red color blindness that nullifies the person's ability to recognize the color red, thus their color spectrum goes only from blue hues to yellow ones, as shown bellow.

![undefined](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Rainbow_Protanopia.svg/1920px-Rainbow_Protanopia.svg.png)

Now, diving into the P5.js implementation, I used a fairly simple mapping function as the backbone of the color mapping process. This mapping function recieves a RGB color as an imput , then process each one of the color channels separately, and outputs a new RGB color that's **protanopia-friendly** in nature.  This is the mapping function in question: 

    let  newR = 0.56667 * r + 0.43333 * g + 0 * b;
    let  newG = 0.55833 * r + 0.44167 * g + 0 * b;
    let  newB = 0 * r + 0.24167 * g + 0.75833 * b;
    
The specific values used in the color mapping function are derived from studies [1] on the spectral sensitivity of the protanopia visual system. By applying these values to the original RGB color, the resulting color is transformed to a protanopia-friendly color that is easier for individuals with protanopia to differentiate from other colors.

It's important to note that the color mapping function I provided assumes a moderate degree of protanopia and may not be appropriate for all cases of protanopia. Additionally, color perception can vary from person to person, so the resulting transformed color may not be perfectly accurate in simulating protanopia for all individuals.

Finally here's the complete P5.js implementation:
{{< p5-iframe sketch="/showcase/sketches/exercises/coloring/1.js" width="450" height="450" >}}

[1] Stockman, A., Sharpe, L. and Vries, R. (1999) _Color Vision: From Genes to Perception_. Cambridge University Press.

## Color modes

