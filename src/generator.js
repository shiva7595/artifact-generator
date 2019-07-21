const rdf = require('rdf-ext');

const Resources = require('./resources');
const artifacts = require('./artifacts');
const DatasetHandler = require('./dataset-handler');

module.exports = class Generator {
  constructor(argv) {
    this.argv = argv;

    this.resources = new Resources(argv.input, argv.vocabTermsFrom);
  }

  generate(inquirerProcess) {
    return this.generateData()
      .then(data => {
        return inquirerProcess(data);
      })
      .then(mergedData => {
        return new Promise(resolve => {
          artifacts.createArtifacts(this.argv, mergedData);
          resolve(mergedData);
        });
      });
  }

  generateData() {
    return new Promise((resolve, reject) => {
      this.resources
        .readResources((fullDatasetsArray, vocabTermsOnlyDataset) => {
          const parsed = this.parseDatasets(fullDatasetsArray, vocabTermsOnlyDataset);
          resolve(parsed);
        })
        .catch(error => {
          const result = `Failed to generate: ${error.toString()}`;
          reject(new Error(result));
        });
    });
  }

  parseDatasets(fullDatasetsArray, vocabTermsOnlyDataset) {
    return this.buildTemplateInput(
      Generator.merge(fullDatasetsArray),
      Generator.merge([vocabTermsOnlyDataset])
    );
  }

  buildTemplateInput(fullData, subjectsOnlyDataset) {
    const datasetHandler = new DatasetHandler(fullData, subjectsOnlyDataset, this.argv);
    return datasetHandler.buildTemplateInput();
  }

  static merge(dataSets) {
    let fullData = rdf.dataset();
    dataSets.forEach(ds => {
      if (ds) {
        fullData = fullData.merge(ds);
      }
    });

    return fullData;
  }
};
