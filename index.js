const test = require('./smoketest/scanui')

test.run().catch(e => {
  console.error(e)
  process.exit(1)
})
