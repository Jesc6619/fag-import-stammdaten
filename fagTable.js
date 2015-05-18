/**
  * Created by Jens on 01-Apr-2015.
*/
var fs = require('fs');
var parse = require('csv-parse');
var _ = require('underscore')

fagTable = function (tableName) {
    
    if (!(this instanceof fagTable)) {
        return new fagTable(tableName);
    }

    var that = this;
    
    that.TableName = tableName;
    that.FileName = '';
    
    that.Error = null;
    
    var DataRows = {};
    
    // --------------------------------------------------------------------------------------------
    that.readToEnd = function (csvFileName, whenFinished) {
        
        that.FileName = csvFileName;
        that.DataRows = [];

        var firstRow = null;
        
        // Create the parser
        var parser = parse({
            delimiter: ';',
            //escape: '"',
            quote: "",
            columns: true
        });
        
        // Use the writable stream api
        parser.on('readable', function () {

            while (dataRow = parser.read()) {

                if (dataRow == null) {
                    return;
                }
                else {

                    that.DataRows.push(dataRow);
                }
            }
        });
        
        parser.on('error', function (err) {
            console.log('   Table ' + that.TableName + ' error:' + err);
            that.Error = err;
            if (whenFinished) {
                whenFinished(err, that);
            }
         });
        
        parser.on('finish', function () {
            //console.log('Table ' + that.TableName + ' successfully read to end. ' + that.count() + ' data rows.');
            if (whenFinished) {
                whenFinished(null, that);
            }
        });
        
        fs.createReadStream(csvFileName)
               //.pipe(process.stdout);
               .pipe(parser);
       
       return that;
    }
}

_.extend(fagTable.prototype, {

    forEach : function (func) {
        _.each(this.DataRows, func);
        //this.DataRows.forEach(func);
        return this;
    },
    
    findWhere : function (attrs) {
        return _.findWhere(this.DataRows, attrs);
    },
    
    count : function () {
        return this.DataRows.length;
    },

    getDataRow : function (no) {
        return no >= 0 && no < this.DataRows.length 
                      ? this.DataRows[no] 
                      : null;
    }

});

