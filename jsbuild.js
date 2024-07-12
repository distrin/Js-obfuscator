const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const targetFolder = './build';

if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder, { recursive: true });
}

const obfuscationOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: true,
  debugProtectionInterval: 2000,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'mangled',
  log: false,
  renameGlobals: true,
  selfDefending: true,
  splitStrings: true,
  splitStringsChunkLength: 5,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: true,
  numbersToExpressions: true,
  simplify: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersType: 'function',
  stringArrayWrappersParametersMaxCount: 3,
  stringArrayWrappersParametersMinCount: 1,
  forceTransformStrings: ['base64'],
  rotateStringArray: true,
  shuffleStringArray: true,
  splitStrings: true,
  splitStringsChunkLength: 5,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: true
};

const obfuscateFile = async (filePath, targetFile, options) => {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    console.log(`\x1b[36m[+] Ofuscando ${path.basename(filePath)}...\x1b[0m`);

    let obfuscated = JavaScriptObfuscator.obfuscate(fileContent, options).getObfuscatedCode();

    const secondaryOptions = { ...options, controlFlowFlatteningThreshold: 0.5, deadCodeInjectionThreshold: 0.3 };
    obfuscated = JavaScriptObfuscator.obfuscate(obfuscated, secondaryOptions).getObfuscatedCode();

    fs.writeFileSync(targetFile, obfuscated, { encoding: 'utf-8' });
    console.log(`\x1b[32m[+] ${path.basename(filePath)} foi ofuscado com sucesso\x1b[0m`);
  } catch (error) {
    console.error(`\x1b[31mErro ao ofuscar ${path.basename(filePath)}:\x1b[0m`, error);
  }
};

const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Arraste e solte o arquivo .js que você quer ofuscar: ', async (filePath) => {
    if (fs.existsSync(filePath) && path.extname(filePath) === '.js') {
      const targetFile = path.join(targetFolder, path.basename(filePath));
      await obfuscateFile(filePath, targetFile, obfuscationOptions);
    } else {
      console.log('Por favor, forneça um caminho válido para um arquivo .js');
    }
    rl.close();
  });
};

main().catch(error => console.error(`\x1b[31mErro na execução do script:\x1b[0m`, error));