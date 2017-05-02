var Metalsmith  = require('metalsmith');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var layouts = require('metalsmith-layouts');
var sass = require('metalsmith-sass');
var collections = require('metalsmith-collections');
var addmeta = require('metalsmith-collections-addmeta');
var markdown = require('metalsmith-markdown');
var drafts = require('metalsmith-drafts');
var partials = require('metalsmith-discover-partials');

// TODO only use serve in dev

Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'live:js',
      description: 'Audio visual browser awesome',
      generator: 'Metalsmith',
      url: 'http://livejs.network/'
    }
  })

  .source('./src')
  .destination('./docs')
  .clean(true) // rebuild everything

  .use(sass({
    outputDir: 'assets/',   // This changes the output dir to 'build/assets/'
    sourceMap: true
  }))

  .use(partials({
    directory: './layouts/partials/',
    pattern: /\.hbs$/
  }))

  .use(drafts())
  .use(markdown())

  .use(collections({
    biography: {
      pattern: 'biographies/*.md',
      sortBy: 'order',
    },
    blog: {
      pattern: 'blog/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))

  // .use(addmeta({
  //   biography: {
  //     layout: 'biography-item.hbs'
  //   }
  // }))

  .use(layouts({
    engine: 'handlebars'
  }))

  .use(serve())

  .use(
    watch({
      paths: {
        '${source}/**/*': true,
        'layouts/**/*': true,
      }
    })
  )

  .build(function(err, files) {
    if (err) { throw err; }
  });