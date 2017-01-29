/* Import dependencies, declare constants */
var admin = require("firebase-admin");

// go to firebase project settings, generate new key, download the json and retrieve the information for initialization
admin.initializeApp({
  credential: admin.credential.cert({
    "project_id": "",
    "client_email": "",
    "private_key": "-----BEGIN PRIVATE KEY-----\\n-----END PRIVATE KEY-----\n",
  }),
  databaseURL: "" // found in the database tab of your firebase project
});

/**
* Your function call
* @param {Object} params Execution parameters
*   Members
*   - {Array} args Arguments passed to function
*   - {Object} kwargs Keyword arguments (key-value pairs) passed to function
*   - {String} remoteAddress The IPv4 or IPv6 address of the caller
*
* @param {Function} callback Execute this to end the function call
*   Arguments
*   - {Error} error The error to show if function fails
*   - {Any} returnValue JSON serializable (or Buffer) return value
*/
module.exports = (params, callback) => {

  var message = "user ";
  var idToken = params.args[0];

  admin.auth().verifyIdToken(idToken)
    .then(function (decodedToken) {
      // do whatever you need with the decoded Token
      var uid = decodedToken.uid;
      console.log("decoded token: " + uid);
      message += "is authenticated";
      callback(null, message);
    }).catch(function (error) {
      // Handle error
      callback(error);
    });
};
