## Mach Bands

In the following p5 sketch we mixed Perlin terrain generation, mach bands and voronoi diagrams.

First we create a set of random points in a plane, then we compute the voronoi diagram for this set of points using the [gorhill](https://github.com/gorhill/Javascript-Voronoi) javascript library.

- You can see the resulting Voronoi diagram using the toggle control "voronoi diagram".

Then we add perlin noise over the plane, this noise is going to be mixed with the inverse of the distance between each point and its respective polygon in the voronoi diagram.

- You can see the terrain generated with the inverse of the distance to the center of each polygon using the toggle control "perlin"

- When the "perlin" checkbox is marked, then the sketch shows the resulting perlin noise over the voronoi diagrams.

Additionally, to improve visualization, we have two more toggle controls.
- "stroke" shows the stroke in the triangles that generates the surface.
- "band" make a coloring based on Mach bands for each triangle.

The first slider changes the density or scale of the triangles, and also amplifies the terrain keeping the Voronoi diagram information.

The second slider changes the speed of rotation.

{{< p5-iframe sketch="/showcase/sketches/exercises/mach_bands/terrain.js" width="1000" height="1000" >}}

This sketch is based on Daniel Shiffman terrain generation with perlin noise and Mach bands highlighting by Jean Pierre Charalambos.

This work has [applications](https://www.redblobgames.com/x/2022-voronoi-maps-tutorial/) on the videogame terrrain generation area.
