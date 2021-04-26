const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const FileSystem = require("fs");
const csvtojson = require("csvtojson");

CSVToJSON().fromFile("./4ELE.csv").then(source => {
    //console.log(source);
    source.sort(function (a, b) {
        return a["ENRNO"] - b["ENRNO"];
    });
    //FileSystem.writeFileSync("./jsData_sorted.json", JSON.stringify(source));
    let count = 1;
    //for (let j = 0; j < 42; j++) {
    while (source.length > 0) {
        let temp;
        if (source.length > 25000) {
            let lastId = source[24999]["ENRNO"];
            temp = source.splice(0, 25000);
            if (source[0]["ENRNO"] === lastId) {
                while (source[0]["ENRNO"] === lastId) {
                    temp.push(source.shift());
                }
            }
        }
        else { temp = source; source = []; }
        const csv = JSONToCSV(temp, { fields: ["ENRNO", "PROGRAM", "SSSN", "COURSE", "SEM_YEAR", "REMARKS"] });
        FileSystem.writeFileSync(`./LOT${count}.csv`, csv);
        count++;
    }
});

