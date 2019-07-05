const Generator = require('./src/generator');


const argv = require('yargs')
    .array('i')
    .alias('i', 'input')
    .describe('i', 'One or more ontology files that will be used to build Vocab Terms from.')
    .string('vtf')
    .alias('vtf', 'vocabTermsFrom')
    .describe('vtf', 'Generates Vocab Terms from only the specified ontology file.')
    .string('av')
    .alias('av', 'artifactVersion')
    .describe('av', 'The version of the Node module that will be built.')
    .alias('at', 'artifactType')
    .describe('at', 'The artifact type that will be generated.')
    .choices('at', ['nodejs']) // Add to this when other langanges are supported
    .default('at', 'nodejs')
    .strict()
    .argv


const gen = new Generator(argv.av || '1.0.0');
gen.generate(argv.input || [], argv.vocabTermsFrom);



