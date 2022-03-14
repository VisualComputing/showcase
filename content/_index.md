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

Refer to the [visual computing site](https://visualcomputing.github.io/).

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