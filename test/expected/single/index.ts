// const rdf = require('rdf-ext')

const { LitVocabTerm } = require('lit-vocab-term')

/**
  Generated by ontology generator [${generatorClassname}]
  from the source RDF file [${sourceRdfResource}]
  at '${generatedTimestamp}'.

  
 */

const _NAMESPACE = "http://schema.org/";
function _NS (localName) { return (_NAMESPACE + localName) }

const SCHEMA = {
  NAMESPACE: _NAMESPACE,
  NS: _NS,

    // *****************
    // All the Classes.
    // *****************
    
    /**
    * A person (alive, dead, undead, or fictional).
    */
    Person: new LitVocabTerm(_NS('Person'), undefined, true)
      .addLabel('', 'Person')
      .addComment('', `A person (alive, dead, undead, or fictional).`)
,

    // *******************
    // All the Properties.
    // *******************

    /**
    * Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.
    */
    givenName: new LitVocabTerm(_NS('givenName'), undefined, true)
      .addLabel('', 'givenName')
      .addComment('', `Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.`)
,

    /**
    * Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.
    */
    familyName: new LitVocabTerm(_NS('familyName'), undefined, true)
      .addLabel('', 'familyName')
      .addComment('', `Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.`)
,

    /**
    * The country. For example, USA. You can also provide the two-letter &lt;a href&#x3D;&quot;http://en.wikipedia.org/wiki/ISO_3166-1&quot;&gt;ISO 3166-1 alpha-2 country code&lt;/a&gt;.
    */
    addressCountry: new LitVocabTerm(_NS('addressCountry'), undefined, true)
      .addLabel('', 'addressCountry')
      .addComment('', `The country. For example, USA. You can also provide the two-letter &lt;a href&#x3D;&quot;http://en.wikipedia.org/wiki/ISO_3166-1&quot;&gt;ISO 3166-1 alpha-2 country code&lt;/a&gt;.`)
,

  //
  // Marker allowing us put commas at the end of all lines above (only the last line does not have a comma).
  //
  END_OF_VOCAB: 'End of vocab.'
}

module.exports = SCHEMA;
