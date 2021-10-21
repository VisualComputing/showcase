# Visual Computing Template

Welcome to the [UN / DISI](http://www.ingenieria.unal.edu.co/dependencias/departamentos/departamento-de-ingenieria-de-sistemas-e-industrial) _visual computing_ course template site.

## Hacking

Install the [gohugo](https://gohugo.io/) [static site generator](https://jamstack.org/generators/) then:

```sh
$git clone https://github.com/VisualComputing/vc
$cd vc
$git submodule update --init --recursive
$hugo server -D --disableFastRender
```

Deploy with `$git push` after redefined `baseURL` in `config.toml` which should point to your actual public remote.

Note that the **vc** template uses the [hugo-book](https://github.com/alex-shpak/hugo-book) theme by default. Check the [hugo themes site](https://themes.gohugo.io/) if you wish to add other ones.