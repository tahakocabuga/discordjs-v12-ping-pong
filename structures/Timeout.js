const client = require('./Client');
class TimeoutManager {
    /**
     * 
     * @param {Client} client 
     */
    constructor(client) {
        setTimeout(() => {
            client.giveaways.map((g, i) => {
                if(g.endsAt >= Date.now()) {
                    g.end();
                } else return false;
            })
        }, 10 * 1000);
    }
};
module.exports = TimeoutManager;