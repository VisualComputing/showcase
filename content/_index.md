---
title: Introduction
type: docs
---

# Visual Computing 2023-1
This is a workbook for the Visual Computing class in the National University of Colombia.

# Team
* Andrés Ortega - 
* David Mateus - dmateusb@unal.edu.co
* Andryut Huertas - aahuertasca@unal.edu.co
* Nicolas La Rotta - nlam@unal.edu.co

# Deliveries:
* First delivery link: https://youtu.be/KKfeNefDymY

{{< youtube KKfeNefDymY>}}

## Hacking

Welcome to the [gohugo](https://gohugo.io/) template to create rich content [academic reports](https://www.wordy.com/writers-workshop/writing-an-academic-report/) having [p5.js](https://p5js.org/) sketches.

Install the [gohugo](https://gohugo.io/) [static site generator](https://jamstack.org/generators/) then:

```sh
$git clone https://github.com/VisualComputing/showcase
$cd showcase
$git submodule update --init --recursive
$hugo server -D --disableFastRender
```

Deploy with `$git push` after redefined `baseURL` in `config.toml` which should point to your actual public remote.

{{< hint warning >}}
**Don't rename the repo but leave it as 'showcase'**  
even so if you decided to rename the repo anyways, say to `newreponame`, don't forget to update all url references of the markdown and js file sources, to reflect that change, i.e., look within all [content folder](https://github.com/VisualComputing/showcase/tree/main/content) files for `showcase` occurrences and replace them by `newreponame`, which btw should easily be doable in any recent open source code editor, e.g., 🔎 in [kate](https://kate-editor.org/) or [vs-codium](https://vscodium.com/).
{{< /hint >}}

### Remarks

{{< hint info >}}
If you forked the repo don't forget to activate the [actions](https://github.com/VisualComputing/showcase/actions).
{{< /hint >}}

{{< hint info >}}
Don't forget to select the `gh-pages` branch as the one to serve your site from at the [pages section of your repo configuration page](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), if it is no so by default.
{{< /hint >}}

{{< hint info >}}
The **showcase** template uses the [hugo-book](https://github.com/alex-shpak/hugo-book) theme by default. Check the [hugo themes site](https://themes.gohugo.io/) if you wish to add other ones.
{{< /hint >}}