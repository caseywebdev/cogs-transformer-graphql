var helper = require('cogs-test-helper');

helper.run({
  'test/config.json': {
    'test/input.graphql': helper.getFileBuffer('test/output.js'),
    'test/error.graphql': Error
  }
});
