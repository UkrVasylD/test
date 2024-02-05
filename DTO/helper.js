/**
 *
 * @param {import('joi').Schema} original
 * @returns
 */
function makeOptionalSchema(original) {
  return original.fork(
    original.$_terms.keys.map((item) => item.key),
    (schema) => schema.optional().prefs({ noDefaults: true })
  );
}

module.exports = { makeOptionalSchema };
