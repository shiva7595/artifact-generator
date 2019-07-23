const fs = require('fs');
const Handlebars = require('handlebars');

function createArtifact(templateFile, outputFile, templateData) {
  const data = fs.readFileSync(templateFile);

  const template = Handlebars.compile(data.toString());
  const contents = template(templateData);

  fs.writeFileSync(outputFile, contents);
  console.log(`Created artifact: [${outputFile}]`);
}

function createArtifacts(argv, templateData) {
  if (!fs.existsSync(argv.outputDirectory)) {
    fs.mkdirSync(argv.outputDirectory, { recursive: true });
  }

  // To support running from any arbitrary directory, reference our templates relative to this file, and not the
  // current working directory.
  createArtifact(
    `${__dirname}/../templates/javascript-rdf-ext.hbs`,
    `${argv.outputDirectory}/index.js`,
    templateData
  );
  createArtifact(
    `${__dirname}/../templates/package.hbs`,
    `${argv.outputDirectory}/package.json`,
    templateData
  );
}

module.exports.createArtifacts = createArtifacts;
