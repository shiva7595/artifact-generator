// const rdf = require('rdf-ext')

const { LitVocabTerm } = require('lit-vocab-term')

/**
  Generated by ontology generator [${generatorClassname}]
  from the source RDF file [${sourceRdfResource}]
  at '${generatedTimestamp}'.

  
 */

const _NAMESPACE = "http://schema.org/";
function _NS (localName) { return (_NAMESPACE + localName) }

const ONTOLOGY = {
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
      .addLabel('en', 'Person')
      .addLabel('fr', 'La personne')
      .addLabel('de', 'Person')
      .addLabel('es', 'Persona')
      .addLabel('it', 'Persona')
      .addComment('', `A person (alive, dead, undead, or fictional).`)
      .addComment('en', `A person (alive, dead, undead, or fictional).`)
      .addComment('fr', `Une personne (vivante, morte, mort-vivant ou fictive).`)
      .addComment('de', `Eine Person (lebendig, tot, untot oder fiktiv).`)
      .addComment('es', `Una persona (viva, muerta, no muerta o ficticia).`)
      .addComment('it', `Una persona (viva, morta, non morta o immaginaria).`),

    // *******************
    // All the Properties.
    // *******************

    /**
    * Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.
    */
    givenName: new LitVocabTerm(_NS('givenName'), undefined, true)
      .addLabel('', 'givenName')
      .addLabel('en', 'Given Name')
      .addLabel('fr', 'Prénom')
      .addLabel('de', 'Vorname')
      .addLabel('es', 'Nombre de pila')
      .addLabel('it', 'Nome di battesimo')
      .addComment('', `Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.`)
      .addComment('en', `Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.`)
      .addComment('fr', `Prénom. Aux États-Unis, le prénom d’une personne. Ceci peut être utilisé avec familyName au lieu de la propriété name.`)
      .addComment('de', `Vorname. In den USA der Vorname einer Person. Dies kann zusammen mit familyName anstelle der Eigenschaft name verwendet werden.`)
      .addComment('es', `Nombre de pila. En los EE. UU., El primer nombre de una persona. Esto se puede usar junto con familyName en lugar de la propiedad name.`)
      .addComment('it', `Nome di battesimo. Negli Stati Uniti, il primo nome di una persona. Questo può essere usato insieme a familyName al posto della proprietà name.`),

    /**
    * Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.
    */
    familyName: new LitVocabTerm(_NS('familyName'), undefined, true)
      .addLabel('', 'familyName')
      .addLabel('en', 'Family Name')
      .addLabel('fr', 'Nom de famille')
      .addLabel('de', 'Nachname')
      .addLabel('es', 'Apellido')
      .addLabel('it', 'Cognome')
      .addComment('', `Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.`)
      .addComment('en', `Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.`)
      .addComment('fr', `Nom de famille. Aux États-Unis, le nom de famille d’une personne. Ceci peut être utilisé avec GivenName au lieu de la propriété name.`)
      .addComment('de', `Nachname. In den USA der Nachname einer Person. Dies kann zusammen mit givenName anstelle der Eigenschaft name verwendet werden.`)
      .addComment('es', `Apellido. En los EE.UU., el apellido de una persona. Esto se puede usar junto con givenName en lugar de la propiedad name.`)
      .addComment('it', `Cognome. Negli Stati Uniti, il cognome di una persona. Questo può essere usato insieme a givenName al posto della proprietà name.`),

    /**
    * The country. For example, USA. You can also provide the two-letter &lt;a href&#x3D;&quot;http://en.wikipedia.org/wiki/ISO_3166-1&quot;&gt;ISO 3166-1 alpha-2 country code&lt;/a&gt;.
    */
    addressCountry: new LitVocabTerm(_NS('addressCountry'), undefined, true)
      .addLabel('', 'addressCountry')
      .addComment('', `The country. For example, USA. You can also provide the two-letter &lt;a href&#x3D;&quot;http://en.wikipedia.org/wiki/ISO_3166-1&quot;&gt;ISO 3166-1 alpha-2 country code&lt;/a&gt;.`),

    /**
    * An additional name for a Person, can be used for a middle name.
    */
    additionalName: new LitVocabTerm(_NS('additionalName'), undefined, true)
      .addLabel('', 'additionalName')
      .addLabel('en', 'Additional Name')
      .addLabel('fr', 'Nom additionnel')
      .addLabel('de', 'Zusätzlicher Name')
      .addLabel('es', 'Nombre adicional')
      .addLabel('it', 'Nome aggiuntivo')
      .addComment('en', `An additional name for a Person, can be used for a middle name.`)
      .addComment('fr', `Un nom supplémentaire pour une personne peut être utilisé pour un deuxième prénom.`)
      .addComment('de', `Ein zusätzlicher Name für eine Person kann für einen zweiten Vornamen verwendet werden.`)
      .addComment('es', `Un nombre adicional para una persona, se puede utilizar para un segundo nombre.`)
      .addComment('it', `Un nome aggiuntivo per una persona può essere usato per un secondo nome.`),

    /**
    * 
    */
    newTerm: new LitVocabTerm(_NS('newTerm'), undefined, true)
      .addLabel('', 'newTerm')

  //
  // Marker allowing us put commas at the end of all lines above (only the last line does not have a comma).
  //
  END_OF_VOCAB: 'End of vocab.'
}

module.exports = ONTOLOGY;
