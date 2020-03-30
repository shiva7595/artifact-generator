const {LitVocabTermRdfExt} = require('@pmcb55/lit-vocab-term-rdf-ext')

/**
  Generated by artifact generator [@inrupt/lit-artifact-generator], version [0.6.0]
  as part of artifact: [lit-generated-vocab-schema], version: [1.0.0]
  at 'Monday, March 30, 2020 10:32 PM'.

  Vocabulary built from input: [./test/resources/vocabs/schema-snippet.ttl].
 */

function _NS(localName) { return (_NAMESPACE + localName) }

const SCHEMA = {
  PREFIX: 'schema',
  NAMESPACE: 'http://schema.org/',
  NS: _NS,

  // *****************
  // All the Classes.
  // *****************

  /**
   * A person (alive, dead, undead, or fictional).
   */
  Person: new LitVocabTermRdfExt(_NS('Person'), localStorage, false)
    .addLabelNoLanguage(`Person`)
    .addCommentNoLanguage(`A person (alive, dead, undead, or fictional).`),

  // *******************
  // All the Properties.
  // *******************

  /**
   * Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.
   */
  givenName: new LitVocabTermRdfExt(_NS('givenName'), localStorage, false)
    .addLabelNoLanguage(`givenName`)
    .addCommentNoLanguage(`Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.`),

  /**
   * Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.
   */
  familyName: new LitVocabTermRdfExt(_NS('familyName'), localStorage, false)
    .addLabelNoLanguage(`familyName`)
    .addCommentNoLanguage(`Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.`),

  /**
   * The country. For example, USA. You can also provide the two-letter <a href="http://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1 alpha-2 country code</a>.
   */
  addressCountry: new LitVocabTermRdfExt(_NS('addressCountry'), localStorage, false)
    .addLabelNoLanguage(`addressCountry`)
    .addCommentNoLanguage(`The country. For example, USA. You can also provide the two-letter <a href="http://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1 alpha-2 country code</a>.`),

  //
  // Marker allowing us put commas at the end of all lines above (only the last line does not have a comma).
  //
  END_OF_VOCAB: 'End of vocab.'
}

module.exports = SCHEMA;
