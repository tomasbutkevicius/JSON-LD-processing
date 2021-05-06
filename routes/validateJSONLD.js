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
const context = {
    "name": "https://www.w3.org/2018/credentials/v1",
    "homepage": { "@id": "http://example.edu/credentials/3732", "@type": "@id" }
};

router.get("/", async (req, res) => {
    res.send("validate hit");
    // read from URL
    jsonld_request('https://www.w3.org/2018/credentials/v1', function (err, res, data) {
        if(err){
            console.log(err);
            return;
        }
        console.log(data);
    });
});

module.exports = router;