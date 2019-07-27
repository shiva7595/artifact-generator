const fs = require('fs');
const yaml = require('js-yaml');

const FileGenerator = require('./FileGenerator');
const VocabGenerator = require('./VocabGenerator');

const DatasetHandler = require('../DatasetHandler');

module.exports = class ArtifactGenerator {
  constructor(argv, inquirerProcess) {
    this.artifactData = argv;
    this.inquirerProcess = inquirerProcess;

    // This collection will be populated with an entry per generated vocab (when processing a vocab list file, we may
    // be generating an artifact that bundles many generated vocabs).
    this.artifactData.generatedVocabs = [];
    this.artifactData.authorSet = new Set();
  }

  /**
   * If we are bundling vocabs from a list, then we run our inquirer first, then run our generation. But if we are
   * only generating a single vocab, then process our inputs first and then run our inquirer, as our input vocab may
   * have provided suggested default values for our inquirer (e.g. the suggested name of the vocab may come from the
   * vocab itself).
   *
   * @param inquirerProcess
   * @returns {Promise<void>}
   */
  async generate() {
    console.log();

    if (this.artifactData.vocabListFile) {
      if (this.inquirerProcess) {
        this.artifactData = await this.inquirerProcess(this.artifactData);
      }

      console.log(
        `Generating artifact from vocabulary list file: [${this.artifactData.vocabListFile}]`
      );

      await this.generateFromVocabListFile();
    } else {
      console.log(
        `Generating artifact from vocabulary files: [${this.artifactData.input.toString()}]`
      );

      const vocabData = await new VocabGenerator(
        this.artifactData,
        this.inquirerProcess
      ).generate();

      this.artifactData.artifactName = vocabData.artifactName;
      this.artifactData.description = vocabData.description;
      this.artifactData.authors = Array.from(vocabData.authorSet).join(', ');
      this.artifactData.generatedVocabs.push({
        vocabName: vocabData.vocabName,
        vocabNameUpperCase: vocabData.vocabNameUpperCase,
      });
    }

    return FileGenerator.createPackagingFiles(this.artifactData);
  }

  async generateFromVocabListFile() {
    let generationDetails;
    try {
      console.log(`Processing YAML file...`);
      generationDetails = yaml.safeLoad(fs.readFileSync(this.artifactData.vocabListFile, 'utf8'));
    } catch (error) {
      throw new Error(
        `Failed to read vocabulary list file [${this.artifactData.vocabListFile}]: ${error}`
      );
    }

    // Set our overall artifact name directly from the YAML value.
    this.artifactData.artifactName = generationDetails.artifactName;

    const vocabGenerationPromises = generationDetails.vocabList.map(vocabDetails => {
      // Override our vocab inputs using this vocab list entry.
      this.artifactData.input = vocabDetails.inputFiles;
      this.artifactData.vocabTermsFrom = vocabDetails.termSelectionFile;
      this.artifactData.vocabNameAndPrefixOverride = vocabDetails.vocabNameAndPrefixOverride;

      return new VocabGenerator(this.artifactData).generate();
    });

    // Wait for all our vocabs to be generated.
    const datasets = await Promise.all(vocabGenerationPromises);

    // Collect details from each generated vocab (to bundle them all together into our packaging artifact).
    const authorsAcrossAllVocabs = new Set();
    let description = `Bundle of vocabularies that includes the following:`;
    datasets.forEach(vocabData => {
      description += `\n  ${vocabData.vocabName}: ${vocabData.description}`;
      vocabData.authorSet.forEach(author => authorsAcrossAllVocabs.add(author));

      this.artifactData.generatedVocabs.push({
        vocabName: vocabData.vocabName,
        vocabNameUpperCase: vocabData.vocabNameUpperCase,
      });
    });

    this.artifactData.authors = `Vocabularies authored by: ${Array.from(
      authorsAcrossAllVocabs
    ).join(', ')}.`;
    this.artifactData.description = DatasetHandler.escapeStringForJson(description);
  }
};
