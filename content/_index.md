---
title: Introduction
type: docs
---

# Visual Computing Template

Welcome to the [UN / DISI](http://www.ingenieria.unal.edu.co/dependencias/departamentos/departamento-de-ingenieria-de-sistemas-e-industrial) _visual computing_ course template site.

## Goal

To study the process of creation and manipulation of a digital image of a modern visual application, using current hardware.

## Methodology

[Active-learning](https://en.wikipedia.org/wiki/Active_learning) using [free-software](https://en.wikipedia.org/wiki/Free_software) to develop:

* [Slides](https://github.com/orgs/VisualComputing/teams/presentations/repositories).
* [nub](https://github.com/VisualComputing/nub) and [p5.tree](https://github.com/VisualComputing/p5.tree).
* [p5.quadrille.js](https://github.com/objetos/p5.quadrille.js).

## Grading

Workshops [blog posts](https://en.wikipedia.org/wiki/Edublog)-like reports produced with [gohugo](https://gohugo.io/) and [p5.js](https://p5js.org/) and having a basic research structure:
  * Problem statement
  * Background
  * Code (solution) & results
  * Conclusions & future work

## Outline

| To read | Subject                                                            | 
|------------|--------------------------------------------------------------------|
|            | [Introduction](https://github.com/VisualComputing/Introduction)    |
|            | [Processing](https://processing.org/) & [p5.js](https://p5js.org/) |
| [gh-pages](https://pages.github.com/) | [VC Template](https://visualcomputing.github.io/vc/) |
| [Do we see reality as it is?](http://y2u.be/oYp5XuGYqqY) | [Cognitive](https://github.com/VisualComputing/Cognitive) | 
| [The barycentric conspiracy](https://fgiesen.wordpress.com/2013/02/06/the-barycentric-conspirac/) | [Rendering & Algorithm visualization](https://github.com/VisualComputing/Rendering) | 
| [Shaders tutorial](https://processing.org/tutorials/pshader/) | [Fragment Shaders](https://github.com/VisualComputing/FragmentShaders) |
| [3D Math primer for Graphics and Game Development -- chs. 8 & 9](https://tfetimes.com/wp-content/uploads/2015/04/F.Dunn-I.Parberry-3D-Math-Primer-for-Graphics-and-Game-Development.pdf), [Projection matrix](http://www.songho.ca/opengl/gl_projectionmatrix.html) | [Affine Transformations](https://github.com/VisualComputing/Transformations) |
| | [spline](https://visualcomputing.github.io/Curves) |
| [nub](https://github.com/VisualComputing/nub) | [SceneGraphs](https://github.com/VisualComputing/SceneGraphs) |
| [A Survey of Interaction Techniques](https://hal.inria.fr/hal-00789413/document) | [Interaction](https://github.com/VisualComputing/Interaction) |
| [Shaders tutorial](https://processing.org/tutorials/pshader/) | [Vertex Shaders](https://github.com/VisualComputing/VertexShaders) |
| [Visualizing Data](http://media.espora.org/mgoblin_media/media_entries/1633/Visualizing_Data.pdf), [Network Science -- ch. 2](http://networksciencebook.com/chapter/2) | Data Visualization | 

## Hacking

Install the [gohugo](https://gohugo.io/) [static site generator](https://jamstack.org/generators/) then:

```sh
$git clone https://github.com/VisualComputing/vc
$cd vc
$git submodule update --init --recursive
$hugo server -D --disableFastRender
```

Deploy with `$git push` after redefined `baseURL` in `config.toml` which should point to your actual public remote.

{{< hint info >}}
The **vc** template uses the [hugo-book](https://github.com/alex-shpak/hugo-book) theme by default. Check the [hugo themes site](https://themes.gohugo.io/) if you wish to add other ones.
{{< /hint >}}

{{< hint info >}}
If you forked the repo don't forget to activate the [actions](https://github.com/VisualComputing/vc/actions).
{{< /hint >}}

{{< hint info >}}
If you changed the repo name don't forget to update all the js related (both sketches and assets) urls.
{{< /hint >}}