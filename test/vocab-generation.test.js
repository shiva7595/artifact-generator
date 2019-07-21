'use strict';

const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;

const fs = require('fs');

const del = require('del');

const Generator = require('../src/generator');
const CommandLine = require('../src/command-line');

describe('Suite for generating common vocabularies (marked as [skip] to prevent non-manual execution', () => {
  it.skip('LIT vocabs', async () => {
    generateVocabArtifact(
      ['SHOULD BE RDF, RDFS, Schema.org, etc.'],
      '../../../../Vocab/LIT/Common/GeneratedSourceCodeArtifacts/Javascript',
      '1.0.0',
      '^1.0.0'
    );
  });

  it('Solid Generator UI vocab', async () => {
    generateVocabArtifact({
      input: ['../../../../Vocab/SolidGeneratorUi/SolidGeneratorUi.ttl'],
      outputDirectory: '../../../../Vocab/SolidGeneratorUi/GeneratedSourceCodeArtifacts/Javascript',
      artifactVersion: '1.0.0',
      litVocabTermVersion: 'file:/home/pmcb55/Work/Projects/LIT/src/javascript/lit-vocab-term-js',
      moduleNamePrefix: '@solid/generated-vocab-',
      install: true,
      widoco: true,
    });
  });

  it.skip('Solid Component vocab', async () => {
    generateVocabArtifact({
      input: ['../../../../Vocab/SolidComponent/SolidComponent.ttl'],
      outputDirectory: '../../../../Vocab/SolidComponent/GeneratedSourceCodeArtifacts/Javascript',
      artifactVersion: '1.0.0',
      litVocabTermVersion: 'file:/home/pmcb55/Work/Projects/LIT/src/javascript/lit-vocab-term-js',
      moduleNamePrefix: '@solid/generated-vocab-',
      install: true,
      widoco: true,
    });
  });

  it.skip('Schema.org vocab (we only want a tiny subset of terms from the thousands defined there)', async () => {
    generateVocabArtifact({
      input: [''],
      outputDirectory: '../../../../Vocab/Schema.org/GeneratedSourceCodeArtifacts/Javascript',
      artifactVersion: '1.0.0',
      litVocabTermVersion: 'file:/home/pmcb55/Work/Projects/LIT/src/javascript/lit-vocab-term-js',
      moduleNamePrefix: '@solid/generated-vocab-',
    });
  });
});

async function generateVocabArtifact(argv) {
  await deleteDirectory(argv.outputDirectory);

  const generator = new Generator({ ...argv, noprompt: true });

  const data = await generator
    .generate(CommandLine.askForArtifactInfo)
    .then(CommandLine.askForArtifactVersionBumpType)
    .then(CommandLine.askForArtifactToBeInstalled)
    .then(CommandLine.askForArtifactToBePublished)
    .then(CommandLine.askForArtifactToBeDocumented)
    .catch(error => {
      console.log(`Generation process failed: [${error}]`);
      console.error(error);
      throw new Error(error);
    });

  expect(fs.existsSync(`${argv.outputDirectory}/package.json`)).to.be.true;

  CommandLine.runNpmInstall(data);
  expect(fs.existsSync(`${argv.outputDirectory}/package-lock.json`)).to.be.true;
}

async function deleteDirectory(directory) {
  const deletedPaths = await del([`${directory}/*`], { force: true });
  console.log('Deleted all there files and folders:\n', deletedPaths.join('\n'));
}
