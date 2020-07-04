const { LitVocabTerm, getLocalStore } = require("@solid/lit-term");
const dataFactory = require("@rdfjs/data-model");

const { namedNode } = dataFactory;

/**
  Generated by artifact generator [@inrupt/lit-artifact-generator], version [0.10.7]
  as part of artifact: [lit-generated-vocab-schema-inrupt-ext], version: [1.0.0]
  at 'Monday, May 18, 2020 10:32 PM'.

  Vocabulary built from inputs: [./test/resources/vocabs/schema-snippet.ttl, ./test/resources/vocabs/schema-inrupt-ext.ttl].

  Extension to Schema.org terms providing multilingual alternative names and translations for comments (e.g. for use directly as labels or tool-tips in user interfaces or error messages)
 */

function _NS(localName) {
  return namedNode(`http://schema.org/${localName}`);
}

const SCHEMA_INRUPT_EXT = {
  PREFIX: "schema-inrupt-ext",
  NAMESPACE: "http://schema.org/",
  PREFIX_AND_NAMESPACE: { "schema-inrupt-ext": "http://schema.org/" },
  NS: _NS,

  // *****************
  // All the Classes.
  // *****************

  /**
   * A person (alive, dead, undead, or fictional).
   */
  Person: new LitVocabTerm(
    _NS("Person"),
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabelNoLanguage(`Person`)
    .addLabel(`La personne`, "fr")
    .addLabel(`Person`, "de")
    .addLabel(`Persona`, "es")
    .addLabel(`Persona`, "it")
    .addCommentNoLanguage(`A person (alive, dead, undead, or fictional).`)
    .addComment(`Une personne (vivante, morte, mort-vivant ou fictive).`, "fr")
    .addComment(`Eine Person (lebendig, tot, untot oder fiktiv).`, "de")
    .addComment(`Una persona (viva, muerta, no muerta o ficticia).`, "es")
    .addComment(`Una persona (viva, morta, non morta o immaginaria).`, "it"),

  // *******************
  // All the Properties.
  // *******************

  /**
   * Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.
   */
  givenName: new LitVocabTerm(
    _NS("givenName"),
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabelNoLanguage(`givenName`)
    .addLabel(`Given Name`, "en")
    .addLabel(`Prénom`, "fr")
    .addLabel(`Vorname`, "de")
    .addLabel(`Nombre de pila`, "es")
    .addLabel(`Nome di battesimo`, "it")
    .addCommentNoLanguage(`Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.`)
    .addComment(`Prénom. Aux États-Unis, le prénom d’une personne. Ceci peut être utilisé avec familyName au lieu de la propriété name.`, "fr")
    .addComment(`Vorname. In den USA der Vorname einer Person. Dies kann zusammen mit familyName anstelle der Eigenschaft name verwendet werden.`, "de")
    .addComment(`Nombre de pila. En los EE. UU., El primer nombre de una persona. Esto se puede usar junto con familyName en lugar de la propiedad name.`, "es")
    .addComment(`Nome di battesimo. Negli Stati Uniti, il primo nome di una persona. Questo può essere usato insieme a familyName al posto della proprietà name.`, "it"),

  /**
   * Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.
   */
  familyName: new LitVocabTerm(
    _NS("familyName"),
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabelNoLanguage(`familyName`)
    .addLabel(`Nom de famille`, "fr")
    .addLabel(`Nachname`, "de")
    .addLabel(`Apellido`, "es")
    .addLabel(`Cognome`, "it")
    .addCommentNoLanguage(`Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.`)
    .addComment(`Nom de famille. Aux États-Unis, le nom de famille d’une personne. Ceci peut être utilisé avec GivenName au lieu de la propriété name.`, "fr")
    .addComment(`Nachname. In den USA der Nachname einer Person. Dies kann zusammen mit givenName anstelle der Eigenschaft name verwendet werden.`, "de")
    .addComment(`Apellido. En los EE.UU., el apellido de una persona. Esto se puede usar junto con givenName en lugar de la propiedad name.`, "es")
    .addComment(`Cognome. Negli Stati Uniti, il cognome di una persona. Questo può essere usato insieme a givenName al posto della proprietà name.`, "it"),

  /**
   * The country. For example, USA. You can also provide the two-letter <a href="http://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1 alpha-2 country code</a>.
   */
  addressCountry: new LitVocabTerm(
    _NS("addressCountry"),
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabelNoLanguage(`addressCountry`)
    .addCommentNoLanguage(`The country. For example, USA. You can also provide the two-letter <a href="http://en.wikipedia.org/wiki/ISO_3166-1">ISO 3166-1 alpha-2 country code</a>.`),

  /**
   * Additional Name
   */
  additionalName: new LitVocabTerm(
    _NS("additionalName"),
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Additional Name`, "en")
    .addLabel(`Nom additionnel`, "fr")
    .addLabel(`Zusätzlicher Name`, "de")
    .addLabel(`Nombre adicional`, "es")
    .addLabel(`Nome aggiuntivo`, "it")
    .addComment(`Un nom supplémentaire pour une personne peut être utilisé pour un deuxième prénom.`, "fr")
    .addComment(`Ein zusätzlicher Name für eine Person kann für einen zweiten Vornamen verwendet werden.`, "de")
    .addComment(`Un nombre adicional para una persona, se puede utilizar para un segundo nombre.`, "es")
    .addComment(`Un nome aggiuntivo per una persona può essere usato per un secondo nome.`, "it"),

  /**
   * Must have comment too!
   */
  newTerm: new LitVocabTerm(
    _NS("newTerm"),
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabelNoLanguage(`newTerm`)
    .addComment(`Must have comment too!`, "en"),

  //
  // Marker allowing us put commas at the end of all lines above (only the last line does not have a comma).
  //
  END_OF_VOCAB: "End of vocab."
}

module.exports = SCHEMA_INRUPT_EXT;
