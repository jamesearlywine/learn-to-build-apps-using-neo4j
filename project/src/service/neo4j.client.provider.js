const neo4j = require('neo4j-driver');
const driver = neo4j.driver(
    'neo4j://localhost',
    neo4j.auth.basic('neo4j', 'toast')
);

module.exports = {
    newSession: function() {
        return driver.session();
    },
    run: async function(queryTemplate, data) {
        const neo4j = this.newSession();
        const result = await neo4j.run(queryTemplate, data);
        neo4j.close();

        return result;
    }
};

