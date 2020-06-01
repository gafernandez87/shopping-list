const PORT = process.env.PORT || 4001;
const MONGO_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1/shopping-list";
// const MONGO_DB = process.env.MONGO_DB || "shoppear";

module.exports = {
    PORT,
    MONGO_URI,
};
