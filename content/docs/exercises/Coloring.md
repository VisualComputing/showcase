# Coloring for colorblindness
>**Prompt:** Implement a color mapping application that helps people who are color blind see the colors around them.
>
In order to assess this problem, first we need to understand colorblindness and later, pick one of the many forms this may manifest.

## What is colorblindness?
Color blindness is classified according to the number of _color channels_ that are available to a person to conveying color information into: [monochromacy](https://en.wikipedia.org/wiki/Monochromacy), [dichromacy](https://en.wikipedia.org/wiki/Dichromacy) and anomalous trichromacy. Refer to the [Ishihara test](https://en.wikipedia.org/wiki/Ishihara_test) for a color vision dificiency test.

For this particular P5.js implementation, I choose ***deuteranopia*** as my colorblindess type of interest. **Deuteranopia** is a kind of green color blindness that nullifies the person's ability to recognize the color green, thus their color spectrum goes only from blue hues to yellow ones, as shown bellow.


![undefined](https://upload.wikimedia.org/wikipedia/commons/5/5a/Rainbow_Deuteranopia.svg)

Now, diving into the P5.js implementation, I used a fairly simple mapping function as the backbone of the color mapping process. This mapping function recieves an image as input, to process the image in the three color channels first we need to load them into a array. This is achieved by the next function: 

    
    newImg.loadPixels();
    
Now that the pixels are loaded to an array it is possible to separate them by the color channels given the RGB order. After having the individual pixels in their respective channels we can finally map them into ***deuteranopia-friendly*** colors thanks to the next function:

	// deuteranopia-friendly color transformation function
	let  rNew = 0.625 * r + 0.375 * g + 0.001 * b;
	let  gNew = 0.7 * r + 0.3 * g + 0 * b;
	let  bNew = 0 * r + 0.3 * g + 0.7 * b;
 
The specific values used in the color mapping function are derived from studies [1] on the spectral sensitivity of the deuteranopia visual system. By applying these values to the original RGB color, the resulting color is transformed to a deuteranopia-friendly color that is easier for individuals with deuteranopia to differentiate from other colors.

It's important to note that the color mapping function I provided assumes a moderate degree of deuteranopia and may not be appropriate for all cases of deuteranopia. Additionally, color perception can vary from person to person, so the resulting transformed color may not be perfectly accurate in simulating protanopia for all individuals.

After this transformation takes place the image is rebuilt with the new pixels and it´s displayed besides the original one.

Finally here's the complete P5.js implementation:

[1] Stockman, A., Sharpe, L. and Vries, R. (1999) _Color Vision: From Genes to Perception_. Cambridge University Press.

{{< p5-iframe sketch="/showcase/sketches/exercises/coloring/1.js" width="500" height="540" >}}

## [Color modes](https://ww2.lacan.upc.edu/doc/intel/ipp/ipp_manual/IPPI/ippi_ch6/ch6_color_models.htm)
>**Prompt:** Research other color models such as HSL, HSB, XYZ.
>

### HSB, and HSL Color Models

The HSL (hue, lightness, saturation) and HSB (hue, saturation, brightness) color models were developed to be more “intuitive” in manipulating with color and were designed to approximate the way humans perceive and interpret color.

Hue defines the color itself. The values for the hue axis vary from 0 to 360 beginning and ending with red and running through green, blue and all intermediary colors.

Saturation indicates the degree to which the hue differs from a neutral gray. The values run from 0, which means no color saturation, to 1, which is the fullest saturation of a given hue at a given illumination.

Intensity component - lightness (HSL) or brightness (HSB), indicates the illumination level. Both vary from 0 (black, no light) to 1 (white, full illumination). The difference between the two is that maximum saturation of hue (S=1) is at brightness B=1 (full illumination) in the HSB color model, and at lightness L=0.5 in the HSL color model.

The HSB color space is essentially a cylinder, but usually it is represented as a cone or hexagonal cone (hexcone) as shown in the Figure "HSB Solid", because the hexcone defines the subset of the HSB space with valid RGB values. The brightness B is the vertical axis, and the vertex B=0 corresponds to black color. Similarly, a color solid, or 3D-representation, of the HSL model is a double hexcone (Figure "HSB Solid") with lightness as the axis, and the vertex of the second hexcone corresponding to white.

Both color models have intensity component decoupled from the color information. The HSB color space yields a greater dynamic range of saturation.

#### HSB Solid
{{< p5-iframe sketch="/showcase/sketches/exercises/coloring/HSV.js" width="500" height="540" >}}

#### HSL Solid
{{< p5-iframe sketch="/showcase/sketches/exercises/coloring/HSL.js" width="500" height="700" >}}

### XYZ Color Model
The XYZ color space is an international standard developed by the CIE (Commission Internationale de l'Eclairage). This model is based on three hypothetical primaries, XYZ, and all visible colors can be represented by using only positive values of X, Y, and Z. The CIE XYZ primaries are hypothetical because they do not correspond to any real light wavelengths. The Y primary is intentionally defined to match closely to luminance, while X and Z primaries give color information. The main advantage of the CIE XYZ space (and any color space based on it) is that this space is completely device-independent. The chromaticity diagram in Figure ["CIE xyY Chromaticity Diagram and Color Gamut"](https://ww2.lacan.upc.edu/doc/intel/ipp/ipp_manual/IPPI/ippi_ch6/ch6_cie_diagram.htm#fig6-1) is in fact a two-dimensional projection of the CIE XYZ sub-space. Note that arbitrarily combining X, Y, and Z values within nominal ranges can easily lead to a "color" outside of the visible color spectrum.

The position of the block of RGB-representable colors in the XYZ space is shown in Figure "RGB Colors Cube in the XYZ Color Space".
#### RGB Colors Cube in the XYZ Color Space
{{< p5-iframe sketch="/showcase/sketches/exercises/coloring/XYZ.js" width="500" height="400" >}}

Use the following basic equations [Rogers85], to convert between gamma-corrected R'G'B' and CIE XYZ models:

```
X = 0.412453*R' + 0.35758 *G' + 0.180423*B'
Y = 0.212671*R' + 0.71516 *G' + 0.072169*B'
Z = 0.019334*R' + 0.119193*G' + 0.950227*B'
```

The equations for X,Y,Z calculation are given on the assumption that R',G', and B' values are normalized to the range [0..1].

```
R' = 3.240479 * X - 1.53715 * Y - 0.498535 * Z
G' = -0.969256 * X + 1.875991 * Y + 0.041556 * Z
B' = 0.055648 * X - 0.204043 * Y + 1.057311 * Z
```

The equations for R',G', and B' calculation are given on the assumption that X,Y, and Z values are in the range [0..1].

[1] Stockman, A., Sharpe, L. and Vries, R. (1999) _Color Vision: From Genes to Perception_. Cambridge University Press.

[Rog85] David Rogers. Procedural Elements for Computer Graphics. McGraw-Hill, 1985.