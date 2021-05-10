const express = require("express");
const jsonld = require('jsonld');
const router = express.Router();
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
    "proof": {
    }
};

router.get("/", async (req, res) => {
    const compacted = await jsonld.compact(doc, {});
    res.send(JSON.stringify(compacted, null, 2));
});

module.exports = router;