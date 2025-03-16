require("dotenv").config();
const { colors } = require("../tools/textFormat");
const connectionURL = "mongodb://127.0.0.1:27017";
const { MongoClient } = require("mongodb");

let mongodbClient = null;
module.exports = {
  async connect() {
    // If the database connection is already establised
    if (mongodbClient != null) {
      return mongodbClient;
    }

    // Connect to database
    try {
      mongodbClient = new MongoClient(process.env.MONGODB_URI);
      await mongodbClient.connect();
      console.log(
        colors.blue +
          "[INFO] Successfully connect to the database" +
          colors.reset
      );

      return mongodbClient;
    } catch (error) {
      console.error(
        colors.red + "[ERROR] Can not connect to the database" + colors.reset
      );
      console.error(error);

      // Throw the error back to the call back function
      throw error;
    }
  },
};
