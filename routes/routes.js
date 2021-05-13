const express = require("express");
const jsonld = require('jsonld');
const router = express.Router();
const Ajv = require('ajv')
const schemaorg = require('schemaorg-jsd')
var jsonld_request = require('jsonld-request');

const doc =
{
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
    ],
    "id": "http://example.edu/credentials/3732",
    "type": ["VerifiableCredential", "UniversityDegreeCredential"],
    "issuer": "https://example.edu/issuers/14",
    "issuanceDate": "2010-01-01T19:23:24Z",
    "expirationDate": "2020-01-01T19:23:24Z",
    "credentialSubject": {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
        "degree": {
            "type": "BachelorDegree",
            "name": "Bachelor of Science and Arts"
        }
    },
    "proof": {}
};

router.get("/compact", async (req, res) => {
    const compacted = await jsonld.compact(doc, {});
    res.send(compacted);
});


router.get("/validate", async (req, res) => {
    const compacted = await jsonld.compact(doc, {});
    console.log("Compacted");
    console.log(compacted);
    console.log("END Compacted");
    var schema;
    const ajv = new Ajv()
        .addMetaSchema(await schemaorg.META_SCHEMATA)
        .addSchema(await schemaorg.JSONLD_SCHEMA)
        .addSchema(await schemaorg.SCHEMATA);
    schema = await getRequest('https://www.w3.org/2018/credentials/v1');
    let isValid = ajv.validate(schema, compacted);
    res.send(isValid);

});

function getRequest(url) {
    return new Promise(function (resolve, reject) {
        jsonld_request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            console.log("request body");
            console.log(body);
            console.log("END request body");
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }
  
module.exports = router;