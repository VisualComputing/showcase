# Visual Computing Template

Welcome to the [UN / DISI](http://www.ingenieria.unal.edu.co/dependencias/departamentos/departamento-de-ingenieria-de-sistemas-e-industrial) _visual computing_ course template site.

## Hacking

The template [gohugo](https://gohugo.io/) [static site generator](https://jamstack.org/generators/).

```sh
$git clone https://github.com/VisualComputing/hugo-vc
$cd hugo-vc
$git submodule update --init --recursive
$hugo server -D --disableFastRender
```

Deploy with `git push` after redefined `baseURL` in config.toml which should point to your actual public remote.