module.exports = {
  fromNeo4jRecord: (record) => {
    return {
      id: record._fields[0].identity.low,
      name: record._fields[0].properties.name
    }
  }
}