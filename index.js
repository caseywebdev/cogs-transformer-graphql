const { parse } = require('graphql');

const IMPORT_RE = /^# import (.+)$/gm;

const clean = node => {
  if (typeof node !== 'object' || node == null) return;

  delete node.loc;
  if (node.arguments && !node.arguments.length) delete node.arguments;
  if (node.directives && !node.directives.length) delete node.directives;
  if (node.variableDefinitions && !node.variableDefinitions.length) {
    delete node.variableDefinitions;
  }
  Object.values(node).forEach(clean);
};

module.exports = ({ file: { buffer } }) => {
  const source = buffer.toString();
  const document = parse(source);
  clean(document);
  const paths = [];
  let match;
  while ((match = IMPORT_RE.exec(source))) paths.push(match[1]);
  const imports = paths.map((path, i) => ({ name: `i${i}`, path }));
  return {
    buffer: Buffer.from(
      imports
        .map(
          ({ name, path }) => `import ${name} from ${JSON.stringify(path)};\n`
        )
        .join('') +
        `export default {\n` +
        `  kind: "Document",\n` +
        `  definitions: [].concat(\n` +
        imports.map(({ name }) => `    ${name}.definitions,\n`).join('') +
        `    ${JSON.stringify(document.definitions, null, 2).replace(
          /\n/g,
          '\n    '
        )}\n` +
        '  )\n' +
        `};\n`
    )
  };
};
