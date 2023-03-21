---
title: Introduction
type: docs
---

# Showcase Template

Welcome to the [gohugo](https://gohugo.io/) template to create rich content [academic reports](https://www.wordy.com/writers-workshop/writing-an-academic-report/) having [p5.js](https://p5js.org/) sketches.

## Hacking

Create a github [user account](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account) or [organization](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/creating-a-new-organization-from-scratch), and install [git](https://git-scm.com/) and the [gohugo](https://gohugo.io/) [static site generator](https://jamstack.org/generators/) then:

1. Login into GitHUb and create a new repo [from this template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template) into your user account or organization. **Don't rename the repo but leave it as 'showcase'**.
2. Grant [read and write permissions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#configuring-the-default-github_token-permissions) to your newly created repo workflow. **Observation:** If you're deploying an organization site this permission need to be granted within the organization settings.
3. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) your newly created repo.
4. Install the site default theme:
   ```sh
   $cd showcase
   $git submodule update --init --recursive
   ```
5. Redefined `baseURL` in `hugo.toml` to point to your site url, i.e., https://*username*.github.io/showcase/ where *username* is your username (or organization name) on GitHub. Refer to [GitHub pages](https://pages.github.com/) for details about url naming conventions. **Don't forget to [commit](https://github.com/git-guides/git-commit) your changes**.

Render your site locally: `$hugo server -D --disableFastRender`.

Deploy with `$git push`. Don't forget to select the `gh-pages` branch as the one to serve your site from at the [pages section of your repo configuration page](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Remark

{{< hint info >}}
The **showcase** template uses the [hugo-book](https://github.com/alex-shpak/hugo-book) theme by default. Check the [hugo themes site](https://themes.gohugo.io/) if you wish to add other ones.
{{< /hint >}}