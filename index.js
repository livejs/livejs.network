var Metalsmith  = require('metalsmith');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var layouts = require('metalsmith-layouts');
var sass = require('metalsmith-sass');

// TODO only use serve in dev

Metalsmith(__dirname)
  .metadata({
    title: "Web VJ's present Live JS",
    description: "Audio visual browser awesome",
    generator: "Metalsmith",
    url: "http://webvj.ninja/"
  })
  .source('./src')
  .destination('./docs')
  .clean(false)
  .use(sass({
    outputDir: 'assets/',   // This changes the output dir to "build/assets/"
    sourceMap: true
  }))
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(serve())
  .use(
    watch({
      paths: {
        "${source}/**/*": true,
        "templates/**/*": "**/*.md",
      }
    })
  )
  .build(function(err, files) {
    if (err) { throw err; }
  });