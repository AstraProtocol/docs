<br />
<p align="center">
  <img src="./docs/.vuepress/public/astra.svg" alt="Astra Logo" width="300">
</p>
<br />



# Astra Testnet's Documentation

The documentation in this repository site is meant to provide specifications and implementation details that will be useful to third party developers or contributors to the main repository.

## Getting Started

### Prerequisites

You're going to need:

- **NPM**
- **Oracle JDK** (For generating the pdf, deployment needs this)

### Getting Set Up

1. Clone this repository on Github
3. `cd docs`

```bash
npm install
npm run docs:dev
```

You can now see the docs at [http://localhost:8080](http://localhost:8080).

## Adding new page to the doc

1. Create a markdown file under `/docs/getting-started/`
2. Open `/docs/.vuepress/config.js`
3. Add the file name to `sidebar` under `vuepress-plugin-export` in plugins

``` diff
module.exports = {
  ...,

  themeConfig: {
    ...,

    sidebar: {
      '/getting-started/': [
        '',
        ...,
+        '[Add_Your_New_File_Name_Here]'
        ...
      ],
+      "/chain-details/": [ # Tag of new directory
+        '[Add_Your_New_File_Name_Here]' # or here
+      ],
    }
  },
  ...,
}
```

## Generating a PDF version of the site

Go to ``cronos-docs/docs``, then run:

```bash
vuepress export
```

PDF styling config in `/docs/.vuepress/config.js`, you can refer to [Puppeteer doc](https://pptr.dev/#?product=Puppeteer&version=v2.1.0&show=api-pagepdfoptions) for the complete page API when generating PDF.

``` diff
module.exports = {
  plugins: [
    ['vuepress-plugin-export',
    {
      page: {         // Puppeteer.page.pdf([options])
        format: 'A4',
        printBackground: true,
        margin: {
          top: 60,
          left: 20,
          right: 20,
          bottom: 60
        }
      },
      sorter: function(a,b){
        ...,
      }
    }
    ]
  ]
}
```

a PDF version of the site will be generated under the ``/docs`` path.

## Deploying Chain-doc to Github Pages

1. Make sure you're working on a fork in your own account, not our original repository: `git remote show origin`
2. Commit your changes: `git commit -a -m "YOUR MESSAGE"`
3. Push the changes to GitHub: `git push`
4. Run `./deploy.sh`

You should see your updates on [http://astraprotocol.github.io/docs](http://astraprotocol.github.io/docs).