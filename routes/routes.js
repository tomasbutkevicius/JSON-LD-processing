const express = require("express");
const jsonld = require('jsonld');
const router = express.Router();
const Ajv = require('ajv')
const schemaorg = require('schemaorg-jsd')
var jsonld_request = require('jsonld-request');

router.post("/compact", async (req, res) => {
    const compacted = await jsonld.compact(req.body, {});
    res.send(compacted);
});

router.post("/expand", async (req, res) => {
    const compacted = await jsonld.compact(req.body, {});
    res.send(await jsonld.expand(compacted));
});

router.post("/validate", async (req, res) => {
    const compacted = await jsonld.compact(req.body, {});
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