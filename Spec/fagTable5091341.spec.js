/**
 * Created by Jens on 05-Apr-2015.
 */

require('./testConfig.js')
require('../fagTable.js');

describe('When opening table 5091341', function () {
    
    var table5091341;
    
    var fileName5091341 = testConfig.path + testConfig.fileName5091341;
     
    beforeEach(function () {
        new fagTable('Table_5091341')
                       .readToEnd(fileName5091341, function (err, table) {
               table5091341 = table;
        });

        waitsFor(function () {
            return table5091341 !== undefined;
        }, "should open the csv file", 10000);
    });

    it('should be no error', function () {
        var error = table5091341.Error;
        expect(error).toBe(null);
    });
    
    it("should be file name defined", function () {
        expect(table5091341.FileName).not.toBe(null);
        expect(table5091341.FileName).toBe(fileName5091341);
    });

    it("should table have muliple data lines", function () {
        expect(table5091341.count()).toBeGreaterThan(1);
    });
    
  
    it("should be possible to get dataline 0", function () {
        var dataRow = table5091341.getDataRow(0);
        expect(dataRow).not.toBeUndefined();
        expect(dataRow).not.toBeNull();
    });
    
    it("should be possible to get dataline 1", function () {
        var dataRow = table5091341.getDataRow(1);
        expect(dataRow).not.toBeUndefined();
        expect(dataRow).not.toBeNull();
    });

    it("should be possible to get last dataline", function () {
        var noOfDataRows = table5091341.count();
        var dataRow = table5091341.getDataRow(noOfDataRows - 1);
        expect(dataRow).not.toBeUndefined();
        expect(dataRow).not.toBeNull();
    });
    
    it("should attempt to access non-existing dataline return null", function () {
        var noOfDataRows = table5091341.count();
        expect(table5091341.getDataRow(noOfDataRows)).toBe(null);
    });
    
    it("should 'Artikelnr.' column exist in data row", function () {
        
        table5091341.forEach(function (dataRow) {
            expect(dataRow).not.toBe(null);
            expect(dataRow.hasOwnProperty('Artikelnr.')).toBe(true);
        });
    });

})

