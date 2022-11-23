const neo4j = require('../service/neo4j.client.provider').getNeo4jClient();
const PersonMapper = require('../mappers/person.mapper');

const get = async (req, res) => {
    const result = await neo4j.run("MATCH (n:Person) RETURN n");
    // console.log("result records: ", JSON.stringify(result.records));

    let persons = result.records.map(PersonMapper.fromNeo4jRecord);

    res.render("index", {
        persons
    });
};



module.exports = {
    get
}



// neo4j.run("Create (a:Person {name:'Arthur', title: 'King'}) return a").then((result) => {
//     console.log("created King Arthur, result", JSON.stringify(result.records));
// });
