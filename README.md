# Showcase Template

Welcome to the [gohugo](https://gohugo.io/) template to create rich content [academic reports](https://www.wordy.com/writers-workshop/writing-an-academic-report/) having [p5.js](https://p5js.org/) sketches.

## Hacking

Install the [gohugo](https://gohugo.io/) [static site generator](https://jamstack.org/generators/) then:

```sh
$git clone https://github.com/VisualComputing/showcase
$cd showcase
$git submodule update --init --recursive
$hugo server -D --disableFastRender
```

Deploy with `$git push` after redefined `baseURL` in `config.toml` which should point to your actual public remote.

### Remarks

1. If you renamed the repo don't forget to update all url references found at the markdown and js file sources (found at the repo [content folder](https://github.com/VisualComputing/showcase/tree/main/content)) to reflect that change. Examples:
   1. [Here](https://github.com/VisualComputing/showcase/blob/main/content/docs/shortcodes/p5/iframe.md) `{{< p5-iframe sketch="/showcase/sketches/colors.js" width="725" height="425" >}}` should become `{{< p5-iframe sketch="/<new-repo-name>/sketches/colors.js" width="725" height="425" >}}`; and
   2. [Here](https://github.com/VisualComputing/showcase/blob/main/content/sketches/sound.js) `dingdong = loadSound('/showcase/sketches/doorbell.mp3')` should become `dingdong = loadSound('/<new-repo-name>/sketches/doorbell.mp3')`.
2. If you forked the repo don't forget to activate the [actions](https://github.com/VisualComputing/showcase/actions).
3. Don´t forget to select the `gh-pages` branch as the one to serve your site from at the [pages section of your repo configuration page](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), if it is no so by default.
4. The **showcase** template uses the [hugo-book](https://github.com/alex-shpak/hugo-book) theme by default. Check the [hugo themes site](https://themes.gohugo.io/) if you wish to add other ones.