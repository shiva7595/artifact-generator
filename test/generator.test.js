'use strict';

const rdf = require('rdf-ext');

const { RDF, RDFS, SCHEMA } = require('vocab-lit');

const gen = require('../src/generator.js');

const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;

// const person = rdf.namedNode('http://schema.org/Person')
// const givenName = rdf.namedNode('http://schema.org/givenName')
// const familyName = rdf.namedNode('http://schema.org/familyName')

const dataset = rdf
  .dataset()
  .addAll([
    rdf.quad(SCHEMA.Person, RDF.type, RDFS.Class),
    rdf.quad(SCHEMA.Person, RDFS.label, rdf.literal('Person', 'en')),
    rdf.quad(
      SCHEMA.Person,
      RDFS.comment,
      rdf.literal('Person dead of alive', 'en')
    ),

    rdf.quad(SCHEMA.givenName, RDF.type, RDF.Property),
    rdf.quad(SCHEMA.givenName, RDFS.label, rdf.literal('givenName', '')),
    rdf.quad(
      SCHEMA.givenName,
      RDFS.comment,
      rdf.literal('A given name is the first name of a person.', 'en')
    ),

    rdf.quad(SCHEMA.familyName, RDF.type, RDF.Property),
    rdf.quad(SCHEMA.familyName, RDFS.label, rdf.literal('familyName', 'fr')),
    rdf.quad(
      SCHEMA.familyName,
      RDFS.comment,
      rdf.literal('A family name is the last name of a person.', 'en')
    ),
  ]);

const datasetExtension = rdf
  .dataset()
  .addAll([
    rdf.quad(
      SCHEMA.Person,
      SCHEMA.alternateName,
      rdf.literal('Person-fr', 'fr')
    ),
    rdf.quad(
      SCHEMA.Person,
      SCHEMA.alternateName,
      rdf.literal('Person-de', 'de')
    ),
    rdf.quad(
      SCHEMA.Person,
      SCHEMA.alternateName,
      rdf.literal('Person-es', 'es')
    ),
    rdf.quad(
      SCHEMA.Person,
      RDFS.comment,
      rdf.literal('Person dead of alive fr', 'fr')
    ),
    rdf.quad(
      SCHEMA.Person,
      RDFS.comment,
      rdf.literal('Person dead of alive de', 'de')
    ),
    rdf.quad(
      SCHEMA.Person,
      RDFS.comment,
      rdf.literal('Person dead of alive es', 'es')
    ),

    rdf.quad(
      SCHEMA.givenName,
      SCHEMA.alternateName,
      rdf.literal('Given Name', 'en')
    ),
    rdf.quad(
      SCHEMA.givenName,
      SCHEMA.alternateName,
      rdf.literal('Given Name-fr', 'fr')
    ),
    rdf.quad(
      SCHEMA.givenName,
      SCHEMA.alternateName,
      rdf.literal('Given Name-de', 'de')
    ),
    rdf.quad(
      SCHEMA.givenName,
      SCHEMA.alternateName,
      rdf.literal('Given Name-es', 'es')
    ),
    rdf.quad(
      SCHEMA.givenName,
      RDFS.comment,
      rdf.literal('Given name of a person fr', 'fr')
    ),
    rdf.quad(
      SCHEMA.givenName,
      RDFS.comment,
      rdf.literal('Given name of a person de', 'de')
    ),
    rdf.quad(
      SCHEMA.givenName,
      RDFS.comment,
      rdf.literal('Given name of a person es', 'es')
    ),
  ]);

const dataSetA = rdf
  .dataset()
  .addAll([
    rdf.quad(SCHEMA.Person, RDF.type, RDFS.Class),
    rdf.quad(SCHEMA.Person, RDFS.label, rdf.literal('Person')),
  ]);

const dataSetB = rdf
  .dataset()
  .addAll([
    rdf.quad(SCHEMA.givenName, RDF.type, RDF.Property),
    rdf.quad(SCHEMA.givenName, RDFS.label, rdf.literal('Given Name')),
  ]);

const dataSetC = rdf
  .dataset()
  .addAll([
    rdf.quad(SCHEMA.familyName, RDF.type, RDF.Property),
    rdf.quad(SCHEMA.familyName, RDFS.label, rdf.literal('Family Name'), 'en'),
  ]);

const overrideLabelTerms = rdf
  .dataset()
  .addAll([
    rdf.quad(SCHEMA.Person, RDFS.label, rdf.literal('Override Person')),
    rdf.quad(SCHEMA.givenName, RDFS.label, rdf.literal('Override Given Name')),
    rdf.quad(
      SCHEMA.familyName,
      RDFS.label,
      rdf.literal('Override Family Name'),
      'en'
    ),
  ]);

const overrideCommentTerms = rdf
  .dataset()
  .addAll([
    rdf.quad(
      SCHEMA.Person,
      RDFS.comment,
      rdf.literal('Override comment for Person')
    ),
    rdf.quad(
      SCHEMA.givenName,
      RDFS.comment,
      rdf.literal('Override comment for Given Name')
    ),
    rdf.quad(
      SCHEMA.familyName,
      RDFS.comment,
      rdf.literal('Override comment for Family Name'),
      'en'
    ),
  ]);

const overrideAtlNameTerms = rdf
  .dataset()
  .addAll([
    rdf.quad(SCHEMA.Person, SCHEMA.alternateName, rdf.literal('Alt Person')),
    rdf.quad(
      SCHEMA.givenName,
      SCHEMA.alternateName,
      rdf.literal('Alt Given Name')
    ),
    rdf.quad(
      SCHEMA.familyName,
      SCHEMA.alternateName,
      rdf.literal('Alt Family Name'),
      'en'
    ),
  ]);

describe('LIT JS unit tests', () => {
  beforeEach(() => {
    delete process.env.IRI_HINT_APPLICATION;
    delete process.env.DATA_SERVER_SOLID;
  });

  describe('Building the Template input', () => {
    it('should create a simple JSON object with all the fields', () => {
      const result = gen.buildTemplateInput(
        gen.merge([dataset, datasetExtension]),
        gen.merge([datasetExtension])
      );
      expect(result.namespace).to.equal('http://schema.org/');
      expect(result.ontologyPrefix).to.equal('schema');
      expect(result.classes[0].name).to.equal('Person');
      expect(result.classes[0].comment).to.equal('Person dead of alive');
      expect(result.classes[0].labels[0].value).to.equal('Person');
      expect(result.classes[0].alternateNames[0].value).to.equal('Person-fr');
      expect(result.classes[0].alternateNames[1].value).to.equal('Person-de');
      expect(result.classes[0].alternateNames[2].value).to.equal('Person-es');

      expect(result.properties[0].name).to.equal('givenName');
      expect(result.properties[0].comment).to.equal(
        'A given name is the first name of a person.'
      );
      expect(result.properties[0].labels[0].value).to.equal('givenName');
      expect(result.properties[0].alternateNames[0].value).to.equal(
        'Given Name'
      );
      expect(result.properties[0].alternateNames[1].value).to.equal(
        'Given Name-fr'
      );
      expect(result.properties[0].alternateNames[2].value).to.equal(
        'Given Name-de'
      );
      expect(result.properties[0].alternateNames[3].value).to.equal(
        'Given Name-es'
      );
    });

    it('Should merge A and B, and generate code from A and B', () => {
      const result = gen.buildTemplateInput(
        gen.merge([dataSetA, dataSetB]),
        gen.merge([dataSetA, dataSetB])
      );

      expect(result.classes[0].name).to.equal('Person');
      expect(result.properties[0].name).to.equal('givenName');
    });

    it('Should merge A and B, and generate code from A (not B)', () => {
      const result = gen.buildTemplateInput(
        gen.merge([dataSetA, dataSetB]),
        gen.merge([dataSetA])
      );

      expect(result.classes[0].name).to.equal('Person');
      expect(result.properties.length).to.equal(0);
    });

    it('Should merge A and B, and generate code from B (not A)', () => {
      const result = gen.buildTemplateInput(
        gen.merge([dataSetA, dataSetB]),
        gen.merge([dataSetB])
      );

      expect(result.classes.length).to.equal(0);
      expect(result.properties[0].name).to.equal('givenName');
    });

    it('Should merge A B and C, and generate code from A and B (not C)', () => {
      const result = gen.buildTemplateInput(
        gen.merge([dataSetA, dataSetB, dataSetC]),
        gen.merge([dataSetA, dataSetB])
      );

      expect(result.classes[0].name).to.equal('Person');
      expect(result.properties[0].name).to.equal('givenName');
      expect(result.properties.length).to.equal(1);
    });
  });

  describe('Vocab terms from extention dataset', () => {
    it('should override label terms of the main datasets', () => {
      const result = gen.buildTemplateInput(
        gen.merge([dataSetA, dataSetB, dataSetC, overrideLabelTerms]),
        gen.merge([overrideLabelTerms])
      );

      var person = result.classes[0];

      expect(person.name).to.equal('Person');
      expect(person.labels.length).to.equal(1);
      expect(person.labels[0].value).to.equal('Override Person');

      var givenName = result.properties[0];

      expect(givenName.name).to.equal('givenName');
      expect(givenName.labels.length).to.equal(1);
      expect(givenName.labels[0].value).to.equal('Override Given Name');

      var familyName = result.properties[1];

      expect(familyName.name).to.equal('familyName');
      expect(familyName.labels.length).to.equal(1);
      expect(familyName.labels[0].value).to.equal('Override Family Name');
    });

    it('should override comment terms of the main datasets', () => {
      const result = gen.buildTemplateInput(
        gen.merge([dataSetA, dataSetB, dataSetC, overrideCommentTerms]),
        gen.merge([overrideCommentTerms])
      );

      var person = result.classes[0];

      expect(person.name).to.equal('Person');
      expect(person.comments.length).to.equal(1);
      expect(person.comments[0].value).to.equal('Override comment for Person');

      var givenName = result.properties[0];

      expect(givenName.name).to.equal('givenName');
      expect(givenName.comments.length).to.equal(1);
      expect(givenName.comments[0].value).to.equal(
        'Override comment for Given Name'
      );

      var familyName = result.properties[1];

      expect(familyName.name).to.equal('familyName');
      expect(familyName.comments.length).to.equal(1);
      expect(familyName.comments[0].value).to.equal(
        'Override comment for Family Name'
      );
    });

    it('should override label alternativeNames of the main datasets ', () => {
      const result = gen.buildTemplateInput(
        gen.merge([dataSetA, dataSetB, dataSetC, overrideAtlNameTerms]),
        gen.merge([overrideAtlNameTerms])
      );

      var person = result.classes[0];

      expect(person.name).to.equal('Person');
      expect(person.alternateNames.length).to.equal(1);
      expect(person.alternateNames[0].value).to.equal('Alt Person');

      var givenName = result.properties[0];

      expect(givenName.name).to.equal('givenName');
      expect(givenName.alternateNames.length).to.equal(1);
      expect(givenName.alternateNames[0].value).to.equal('Alt Given Name');

      var familyName = result.properties[1];

      expect(familyName.name).to.equal('familyName');
      expect(familyName.alternateNames.length).to.equal(1);
      expect(familyName.alternateNames[0].value).to.equal('Alt Family Name');
    });
  });
});
