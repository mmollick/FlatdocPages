Flatdoc Pages
=============

Flatdoc Pages adds some extra functionality to the already great [Flatdoc](http://ricostacruz.com/flatdoc/) library. This makes it easy to turn your existing Flatdoc website into a SPA. With just a single html file you can load any number of versions or languages of documentation you might have.

In the documentation *FlatdocPages* will be referred to as *Pages*

Getting Started
---------------

To get started load `flatdoc-pages.js` after `flatdoc.js`. Then replace Flatdoc's initializer with the one seen below. This will tell Pages to begin looking for flatdoc attributes.

``` javascript
FlatdocPages();
```

###Routing
Pages also includes an optional router that can be attached by including the `flatdoc-router.js` file after `flatdoc-pages.js`. Once included you can add hashbang's to your link's `href` attribute. This will allow the pages to be bookmarked by the user.

``` html
<a href='#/docs' data-flatdoc data-source="file" data-path="readme.md">FlatdocPages</a>
```

Data Attributes
---------------
Pages utilizes data attributes to attach event listeners and to define state options. All the following attributes can be added to any html element utilizing the `data-` prefix.

###data-flatdoc
This tells the script that this will change the page state. You can optionally set this attribute to `default` to define the default state, otherwise the first element with the `flatdoc` data attribute will be selected.

Once you give an element this attribute you must also tell it where it can find the markdown file using the `source` and `path` data attributes.

``` html
<a href='#' data-flatdoc>Flatdoc Page</a>
<a href='#' data-flatdoc='default'>Flatdoc Default Page</a>
```

###data-source
This tells the script where the markdown file is hosted. `file`, `github` and `bitbucket` are the supported options for this method.

For both the `github` and `bitbucket` options you must pass a `repo` attribute.

``` html
<a href='#'
    data-flatdoc
    data-source='[file|github|bitbucket]'>Flatdoc Page</a>
```

###data-path
This tells the script where the markdown file is located on the host.

``` html
<a href='#'
    data-flatdoc
    data-source='file'
    data-path='readme.md'>Flatdoc Page</a>
```

###data-repo
When using either `github` or `bitbucket` as the source attribute you must tell Flatdoc the repository this file is located in.

``` html
<a href='#'
    data-flatdoc
    data-souce='github'
    data-repo='mmollick/FlatdocPages'
    data-path='readme.md'>Flatdoc Page</a>
```

###data-branch
When using either `github` or `bitbucket` as the source attribute you can optionally tell it what branch to pull from.

``` html
<a href='#'
    data-flatdoc
    data-souce='github'
    data-repo='mmollick/FlatdocPages'
    data-repo='gh-pages'
    data-path='readme.md'>Flatdoc Page</a>
```

Acknowledgements
================
This is authored and maintained by [Mike Mollick](https://github.com/mmollick).

© 2015, Mike Mollick. Released under the MIT License.