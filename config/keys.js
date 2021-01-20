// For production usage, change the mongoURI to the Mongo Atlas cluster connection URI
// If you want to locally run the app, then you need to change this mongoURI to "mongodb://localhost:27017/inpro"
// TODO: Fix this!
module.exports = {
    mongoURI: "mongodb://mongodb:27017/inpro",
    secretOrKey: "secret"
};
