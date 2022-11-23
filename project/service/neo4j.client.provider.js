const neo4j = require('neo4j-driver');
const driver = neo4j.driver(
    'neo4j://localhost',
    neo4j.auth.basic('neo4j', 'toast')
);

module.exports = {
    neo4jClient: null,
    createNeo4jClient: function() {
        this.neo4jClient = driver.session();
    },
    getNeo4jClient: function() {
        if (!this.neo4jClient) {
            this.createNeo4jClient();
        }

        return this.neo4jClient;
    }
};

