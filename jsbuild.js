// me de os créditos por favor h4x <3

const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const targetFolder = './build';

if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder, { recursive: true });
}

const obfuscationOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 1.0,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 1.0,
  debugProtection: true,
  debugProtectionInterval: 4000,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'mangled',
  log: false,
  renameGlobals: true,
  selfDefending: true,
  splitStrings: true,
  splitStringsChunkLength: 3,
  stringArray: true,
  stringArrayEncoding: ['rc4', 'base64'],
  stringArrayThreshold: 1.0,
  transformObjectKeys: true,
  unicodeEscapeSequence: true,
  numbersToExpressions: true,
  simplify: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 5,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersType: 'function',
  stringArrayWrappersParametersMaxCount: 5,
  stringArrayWrappersParametersMinCount: 2,
  forceTransformStrings: ['hexadecimal', 'base64'],
  rotateStringArray: true,
  shuffleStringArray: true,
  splitStrings: true,
  splitStringsChunkLength: 3,
  stringArray: true,
  stringArrayEncoding: ['rc4', 'base64'],
  stringArrayThreshold: 1.0,
  transformObjectKeys: true,
  unicodeEscapeSequence: true
};

const obfuscateFile = async (filePath, targetFile, options) => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    console.log(`\x1b[36m[+] Ofuscando ${path.basename(filePath)}...\x1b[0m`);

    let obfuscated = JavaScriptObfuscator.obfuscate(fileContent, options).getObfuscatedCode();

    const secondaryOptions = { ...options, controlFlowFlatteningThreshold: 0.5, deadCodeInjectionThreshold: 0.5 };
    obfuscated = JavaScriptObfuscator.obfuscate(obfuscated, secondaryOptions).getObfuscatedCode();

    fs.writeFileSync(targetFile, obfuscated, { encoding: 'utf-8' });
    console.log(`\x1b[32m[+] ${path.basename(filePath)} foi ofuscado com sucesso\x1b[0m`);
  } catch (error) {
    console.error(`\x1b[31mErro ao ofuscar ${path.basename(filePath)}:\x1b[0m`, error);
  }
};

const main = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'filePath',
      message: 'Arraste e solte o arquivo .js que você quer ofuscar:',
      validate: function (input) {
        if (fs.existsSync(input) && path.extname(input) === '.js') {
          return true;
        }
        return 'Por favor, forneça um caminho válido para um arquivo .js';
      }
    }
  ]);

  const filePath = answers.filePath;
  const targetFile = path.join(targetFolder, path.basename(filePath));

  await obfuscateFile(filePath, targetFile, obfuscationOptions);
};

main();