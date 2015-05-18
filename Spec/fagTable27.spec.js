/**
 * Created by Jens on 01-Apr-2015.
 */

require('./testConfig.js')
require('../fagTable.js');

describe('When opening table 27', function () {
    
    var table27;
    
    var fileName27 = testConfig.path + testConfig.fileName27;
    
    beforeEach(function () {

        new fagTable('Table_27')
                       .readToEnd(fileName27, function (err, table) {
            if (err) {

                fail(err);
            }
            else {
                
                table27 = table;

            }
        });

        waitsFor(function () {
            return table27 !== undefined;
        }, "should open the csv file", 10000);
    });

    it('should be no error', function () {
        var error = table27.Error;
        expect(error).toBe(null);
    });
    
    it("should be file name defined", function () {
        expect(table27.FileName).not.toBe(null);
        expect(table27.FileName).toBe(fileName27);
    });

    it("should table have muliple data rows", function () {
        expect(table27.count()).toBeGreaterThan(1);
    });
    
    it("should be possible to get data row 0", function () {
        var dataRow = table27.getDataRow(0);
        expect(dataRow).not.toBeUndefined();
        expect(dataRow).not.toBeNull();
    });
    
    it("should be possible to get data row 1", function () {
        var dataRow = table27.getDataRow(1);
        expect(dataRow).not.toBeUndefined();
        expect(dataRow).not.toBeNull();
    });
    
    it("should be possible to get last data row", function () {
        var noOfDataRows = table27.count();
        var dataRow = table27.getDataRow(noOfDataRows-1);
        expect(dataRow).not.toBeUndefined();
        expect(dataRow).not.toBeNull();
    });
    
    it("should attempt to access non-existing data row return null", function () {
        var noOfDataRows = table27.count();
        expect(table27.getDataRow(noOfDataRows)).toBe(null);
    });
    
    it("should 'Nr.' column exist in data row", function () {
        table27.forEach(function (dataRow) {
            expect(dataRow).not.toBe(null);
            expect(dataRow.hasOwnProperty('Nr.')).toBe(true);
        });
    });
})

