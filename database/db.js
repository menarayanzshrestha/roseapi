const mongoose  = require('mongoose');

module.exports = {
    mongoose,
    connect: () => {
        let connection_url = process.env.DB_CONNECT_URL
        if (process.env.NODE_ENV === 'test') {
            connection_url = process.env.TEST_DB_CONNECT_URL
        }

        mongoose.Promise = Promise;
        mongoose.connect(
            connection_url,
            { useNewUrlParser: true },

            err => {
                if (!err) {
                    console.log(
                        "MongoDB for rosebayTable connected successfully globally"
                    );
                } else {
                    console.log("Error in db connection", err);
                }
            }
        );
        mongoose.set("useCreateIndex", true); //avoid (node:2028) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
    },
    disconnect: (done) => {
        mongoose.disconnect(done);
    },
};