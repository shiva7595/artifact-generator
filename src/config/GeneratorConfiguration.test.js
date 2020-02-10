require('mock-local-storage');

jest.mock('inquirer');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const packageDotJson = require('../../package.json');

const GeneratorConfiguration = require('./GeneratorConfiguration');
const { DEFAULT_CLI_ARTIFACT } = require('./GeneratorConfiguration');

const EXPECTED_VOCAB_LIST_FROM_YAML = [
  {
    description: 'Snippet of Schema.org from Google, Microsoft, Yahoo and Yandex',
    inputResources: ['test/resources/vocabs/schema-snippet.ttl'],
    termSelectionResource: 'test/resources/vocabs/schema-inrupt-ext.ttl',
  },
  {
    description: 'Some dummy online vocabulary',
    nameAndPrefixOverride: 'dummy',
    inputResources: ['http://some.vocabulary.online/dummy'],
  },
];

const EXPECTED_VOCAB_LIST_FROM_CLI = [
  {
    inputResources: ['test/resources/vocabs/schema-snippet.ttl'],
  },
];

// This YAML file will always match the latest version of the generator
const VERSION_MATCHING_YAML = `
artifactName: generated-vocab-common-TEST
##
# This generator version will always mismatch the current artifact version.
##
artifactGeneratorVersion: ${packageDotJson.version}

artifactToGenerate:
  - programmingLanguage: Java
    artifactVersion: 3.2.1-SNAPSHOT
    javaPackageName: com.inrupt.testing
    litVocabTermVersion: "0.1.0-SNAPSHOT"
    artifactDirectoryName: Java
    handlebarsTemplate: java-rdf4j.hbs
    sourceFileExtension: java

vocabList:
  - description: Snippet of Schema.org from Google, Microsoft, Yahoo and Yandex
    inputResources:
      - ./schema-snippet.ttl
    termSelectionResource: schema-inrupt-ext.ttl
`;

const MOCKED_USER_INPUT = { artifactName: 'someName' };

describe('Generator configuration', () => {
  describe('Processing vocab list file.', () => {
    // FAILURE CASES
    it('should fail with non-existent vocab list file', async () => {
      const nonExistFile = ' nonsense file name';
      await expect(() => {
        GeneratorConfiguration.fromYaml(nonExistFile);
      }).toThrow('Failed to read configuration file');
    });

    it('should fail with invalid YAML vocab list file', async () => {
      const notYamlFile = './test/resources/yamlConfig/vocab-list.txt';
      await expect(() => {
        GeneratorConfiguration.fromYaml(notYamlFile);
      }).toThrow('Failed to read configuration file');
    });

    it('should fail with missing artifactDirectoryName in YAML vocab list file', async () => {
      const notYamlFile =
        './test/resources/yamlConfig/vocab-list-missing-artifactDirectoryName.yml';
      await expect(() => {
        GeneratorConfiguration.fromYaml(notYamlFile);
      }).toThrow('The target directory name ');
    });

    it('should throw an error trying to parse an empty YAML file', async () => {
      const configFile = 'empty-config-file.yml';
      const configPath = `./test/resources/yamlConfig/${configFile}`;

      await expect(() => {
        GeneratorConfiguration.fromYaml(configPath);
      }).toThrow('Empty configuration file', configFile);
    });

    it('should throw an error trying to parse a syntactically incorrect YAML file', async () => {
      const configFile = 'not-yaml.yml';
      const configPath = `./test/resources/yamlConfig/${configFile}`;

      await expect(() => {
        GeneratorConfiguration.fromYaml(configPath);
      }).toThrow(/^Failed to read configuration file/, configFile);
    });

    it('should throw an error trying to generate from an empty vocab list', async () => {
      const configFile = 'empty-vocab-list.yml';
      const configPath = `./test/resources/yamlConfig/${configFile}`;

      // Test that the error message contains the expected explanation and file name
      await expect(() => {
        GeneratorConfiguration.fromYaml(configPath);
      }).toThrow(/No vocabularies found/, configFile);
    });

    it('should throw an error trying to generate from an empty artifact list', async () => {
      const configFile = 'no-artifacts.yml';
      const configPath = `./test/resources/yamlConfig/${configFile}`;

      // Test that the error message contains the expected explanation and file name
      await expect(() => {
        GeneratorConfiguration.fromYaml(configPath);
      }).toThrow(/No artifacts found/, configFile);
    });

    it('should fail if a packaging system does not provide any templates', async () => {
      const configPath = `./test/resources/packaging/vocab-list-no-packaging-templates.yml`;

      // Test that the error message contains the expected explanation and file name
      await expect(() => {
        GeneratorConfiguration.fromYaml(configPath);
      }).toThrow('No templates associated to packaging tool');
    });

    it('should fail if the YAML config does not provide a artifactGeneratorVersion', () => {
      expect(() => {
        GeneratorConfiguration.fromYaml('./test/resources/yamlConfig/vocab-list-no-version.yml');
      }).toThrow("Missing 'artifactGeneratorVersion' field");
    });

    // SUCCESS CASE
    it('should generate collected configuration from vocab list file', async () => {
      const generatorConfiguration = new GeneratorConfiguration(
        {
          _: ['generate'],
          vocabListFile: './test/resources/vocabs/vocab-list-including-online.yml',
          noprompt: true,
        },
        undefined
      );

      expect(generatorConfiguration.configuration.noprompt).toBe(true);
      expect(generatorConfiguration.configuration.vocabList).toEqual(EXPECTED_VOCAB_LIST_FROM_YAML);
    });

    it('should not throw on version mismatch, and override the config version with the actual', async () => {
      const generatorConfiguration = new GeneratorConfiguration(
        {
          _: ['generate'],
          vocabListFile: './test/resources/yamlConfig/vocab-list-version-mismatch.yml',
          noprompt: true,
        },
        undefined
      );

      expect(generatorConfiguration.configuration.artifactGeneratorVersion).toEqual(
        packageDotJson.version
      );
    });

    it('should do nothing on version match', async () => {
      const yamlPath = './test/resources/yamlConfig/vocab-list-version-match.yml';

      // The content of the YAML dynamically matches the current generator version
      fs.writeFileSync(yamlPath, VERSION_MATCHING_YAML);

      const generatorConfiguration = new GeneratorConfiguration(
        {
          _: ['generate'],
          vocabListFile: yamlPath,
          noprompt: true,
        },
        undefined
      );

      expect(generatorConfiguration.configuration.artifactGeneratorVersion).toEqual(
        packageDotJson.version
      );
    });

    it('should normalize paths relative to the YAML file', async () => {
      const yamlPath = './test/resources/normalization/';
      const generatorConfiguration = new GeneratorConfiguration(
        {
          _: ['generate'],
          vocabListFile: path.join(yamlPath, 'vocab-list.yml'),
          noprompt: true,
        },
        undefined
      );

      const normalizedConfig = generatorConfiguration.configuration;

      // Templates paths should be normalized wrt the module root
      expect(normalizedConfig.artifactToGenerate[0].handlebarsTemplate).toEqual(
        'templates/java-rdf4j.hbs'
      );
      expect(
        normalizedConfig.artifactToGenerate[0].packaging[0].packagingTemplates[0].template
      ).toEqual('templates/pom.hbs');
      expect(
        normalizedConfig.artifactToGenerate[0].packaging[0].packagingTemplates[1].template
      ).toEqual(path.join(yamlPath, '../../readme.hbs'));
      expect(normalizedConfig.artifactToGenerate[1].handlebarsTemplate).toEqual(
        path.join(yamlPath, '../anotherTemplateDirectory/javascript.hbs')
      );

      expect(generatorConfiguration.configuration.noprompt).toBe(true);
    });
  });

  describe('Processing command line.', () => {
    // FAILURE CASE
    it('should fail with non-existent input resource for generation', async () => {
      await expect(() => {
        GeneratorConfiguration.fromCommandLine({ _: ['generate'] });
      }).toThrow('Missing input resource');
    });

    it('should accept a non-existent input resource for initialization', async () => {
      await expect(() => {
        GeneratorConfiguration.fromCommandLine({ _: ['init'] });
      }).not.toThrow('Missing input resource');
    });

    // SUCCESS CASE
    it('should generate collected configuration from command line', async () => {
      const generatorConfiguration = new GeneratorConfiguration(
        {
          _: ['generate'],
          inputResources: ['test/resources/vocabs/schema-snippet.ttl'],
          moduleNamePrefix: '@lit/generated-vocab-',
          noprompt: true,
        },
        undefined
      );

      expect(generatorConfiguration.configuration.noprompt).toBe(true);
      expect(generatorConfiguration.configuration.vocabList).toEqual(EXPECTED_VOCAB_LIST_FROM_CLI);
      expect(generatorConfiguration.configuration.artifactToGenerate).toEqual(DEFAULT_CLI_ARTIFACT);
    });

    it('should normalize absolute paths', async () => {
      const absolutePath = path.join(
        `${process.cwd()}`,
        'test/resources/vocabs/schema-snippet.ttl'
      );
      const generatorConfiguration = new GeneratorConfiguration(
        {
          _: ['generate'],
          inputResources: [absolutePath],
          moduleNamePrefix: '@lit/generated-vocab-',
          noprompt: true,
        },
        undefined
      );
      expect(generatorConfiguration.configuration.vocabList).toEqual(EXPECTED_VOCAB_LIST_FROM_CLI);
    });

    it('should modify the default publication command if a registry is set', async () => {
      const registry = 'http://my.registry.ninja';
      const generatorConfiguration = new GeneratorConfiguration(
        {
          _: ['generate'],
          inputResources: ['test/resources/vocabs/schema-snippet.ttl'],
          moduleNamePrefix: '@lit/generated-vocab-',
          noprompt: true,
          npmRegistry: 'http://my.registry.ninja',
        },
        undefined
      );

      expect(
        generatorConfiguration.configuration.artifactToGenerate[0].packaging[0].publish[0].command
      ).toEqual(`npm publish --registry ${registry}`);
    });
  });

  describe('Additional questions.', () => {
    it('should fail when not providing info and preventing prompt', async () => {
      inquirer.prompt.mockImplementation(
        jest.fn().mockReturnValue(Promise.resolve(MOCKED_USER_INPUT))
      );

      const generatorConfiguration = new GeneratorConfiguration({
        inputResources: ['test/resources/vocabs/schema-snippet.ttl'],
        noprompt: true,
      });
      expect(generatorConfiguration.completeInitialConfiguration()).rejects.toThrow(
        'Missing LIT VocabTerm version'
      );
    });
  });
});
