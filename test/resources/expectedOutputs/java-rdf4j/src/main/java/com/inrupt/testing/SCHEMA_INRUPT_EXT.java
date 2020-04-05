/**
 * Generated by artifact generator [@inrupt/lit-artifact-generator], version [0.4.7]
 * as part of artifact: [generated-vocab-common-TEST], version: [3.2.1-SNAPSHOT]
 * on 'Sunday, March 1, 2020 9:16 PM'.
 *
 * Vocabulary built from vocab list file: [./test/resources/vocabs/vocab-list.yml].
 */
package com.inrupt.testing;

import org.eclipse.rdf4j.model.IRI;
import org.eclipse.rdf4j.model.Namespace;
import org.eclipse.rdf4j.model.impl.SimpleNamespace;
import org.eclipse.rdf4j.model.impl.SimpleValueFactory;

import com.pmcb55.lit.vocab.LitVocab;
import com.pmcb55.lit.vocab.LitVocabTerm;

/**
 * Extension to Schema.org terms providing multilingual alternative names and translations for comments (e.g. for use directly as labels or tool-tips in user interfaces or error messages)
 */
public class SCHEMA_INRUPT_EXT implements LitVocab {
    public static final String PREFIX = "schema-inrupt-ext";
    public static final String NAMESPACE = "http://schema.org/";

    public static final IRI NAMESPACE_IRI = SimpleValueFactory.getInstance().createIRI("http://schema.org/");
    public static final Namespace NS = new SimpleNamespace(PREFIX, NAMESPACE);

    @Override
    public final String getNamespacePrefix() {
        return PREFIX;
    }

    @Override
    public final IRI getNamespaceIri() {
        return NAMESPACE_IRI;
    }

    private static String FULL_IRI(final String localName) {
        return NAMESPACE + localName;
    }

    // *****************
    // All the Classes.
    // *****************

    /**
     * A person (alive, dead, undead, or fictional).
     */
    public static final LitVocabTerm Person = new LitVocabTerm(FULL_IRI("Person"), true)
        .addLabel("La personne", "fr")
        .addLabel("Person", "de")
        .addLabel("Persona", "es")
        .addLabel("Persona", "it")
        .addLabelNoLanguage("Person")
        .addComment("Une personne (vivante, morte, mort-vivant ou fictive).", "fr")
        .addComment("Eine Person (lebendig, tot, untot oder fiktiv).", "de")
        .addComment("Una persona (viva, muerta, no muerta o ficticia).", "es")
        .addComment("Una persona (viva, morta, non morta o immaginaria).", "it")
        .addCommentNoLanguage("A person (alive, dead, undead, or fictional).");

    // *******************
    // All the Properties.
    // *******************

    /**
     * Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.
     */
    public static final LitVocabTerm givenName = new LitVocabTerm(FULL_IRI("givenName"), true)
        .addLabel("Given Name", "en")
        .addLabel("Prénom", "fr")
        .addLabel("Vorname", "de")
        .addLabel("Nombre de pila", "es")
        .addLabel("Nome di battesimo", "it")
        .addLabelNoLanguage("givenName")
        .addComment("Prénom. Aux États-Unis, le prénom d’une personne. Ceci peut être utilisé avec familyName au lieu de la propriété name.", "fr")
        .addComment("Vorname. In den USA der Vorname einer Person. Dies kann zusammen mit familyName anstelle der Eigenschaft name verwendet werden.", "de")
        .addComment("Nombre de pila. En los EE. UU., El primer nombre de una persona. Esto se puede usar junto con familyName en lugar de la propiedad name.", "es")
        .addComment("Nome di battesimo. Negli Stati Uniti, il primo nome di una persona. Questo può essere usato insieme a familyName al posto della proprietà name.", "it")
        .addCommentNoLanguage("Given name. In the U.S., the first name of a Person. This can be used along with familyName instead of the name property.");

    /**
     * Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.
     */
    public static final LitVocabTerm familyName = new LitVocabTerm(FULL_IRI("familyName"), true)
        .addLabel("Nom de famille", "fr")
        .addLabel("Nachname", "de")
        .addLabel("Apellido", "es")
        .addLabel("Cognome", "it")
        .addLabelNoLanguage("familyName")
        .addComment("Nom de famille. Aux États-Unis, le nom de famille d’une personne. Ceci peut être utilisé avec GivenName au lieu de la propriété name.", "fr")
        .addComment("Nachname. In den USA der Nachname einer Person. Dies kann zusammen mit givenName anstelle der Eigenschaft name verwendet werden.", "de")
        .addComment("Apellido. En los EE.UU., el apellido de una persona. Esto se puede usar junto con givenName en lugar de la propiedad name.", "es")
        .addComment("Cognome. Negli Stati Uniti, il cognome di una persona. Questo può essere usato insieme a givenName al posto della proprietà name.", "it")
        .addCommentNoLanguage("Family name. In the U.S., the last name of an Person. This can be used along with givenName instead of the name property.");

    /**
     * Additional Name
     */
    public static final LitVocabTerm additionalName = new LitVocabTerm(FULL_IRI("additionalName"), true)
        .addLabel("Additional Name", "en")
        .addLabel("Nom additionnel", "fr")
        .addLabel("Zusätzlicher Name", "de")
        .addLabel("Nombre adicional", "es")
        .addLabel("Nome aggiuntivo", "it")
        .addComment("Un nom supplémentaire pour une personne peut être utilisé pour un deuxième prénom.", "fr")
        .addComment("Ein zusätzlicher Name für eine Person kann für einen zweiten Vornamen verwendet werden.", "de")
        .addComment("Un nombre adicional para una persona, se puede utilizar para un segundo nombre.", "es")
        .addComment("Un nome aggiuntivo per una persona può essere usato per un secondo nome.", "it");

    /**
     * Must have comment too!
     */
    public static final LitVocabTerm newTerm = new LitVocabTerm(FULL_IRI("newTerm"), true)
        .addLabelNoLanguage("newTerm")
        .addComment("Must have comment too!", "en");

}
