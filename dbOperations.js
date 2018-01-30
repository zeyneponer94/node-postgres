module.exports = {

    RelatedObjects: function(req, res) {   
        var pg = require('pg');  
      
        //You can run command "heroku config" to see what is Database URL from Heroku belt
      
        var conString = process.env.HEROKU_POSTGRESQL_AMBER_URL;
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("select productcode from salesforce.Product2 where name="+req.query.singleSelect);

        query.on("row", function (row, result) { 
            result.addRow(row); 
        });

        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
    },

    RelatedObjects_2: function(req, res) {   
        var pg = require('pg');  
      
        //You can run command "heroku config" to see what is Database URL from Heroku belt
      
        var conString = process.env.HEROKU_POSTGRESQL_AMBER_URL;
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("select id from salesforce.Asset where name="+req.query.productCode);

        query.on("row", function (row, result) { 
            result.addRow(row); 
        });

        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
    },

    getProductList: function(req, res) {   
        var pg = require('pg');  
      
        //You can run command "heroku config" to see what is Database URL from Heroku belt
      
        var conString = process.env.HEROKU_POSTGRESQL_AMBER_URL;
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("select name from salesforce.Product2");

        query.on("row", function (row, result) { 
            result.addRow(row); 
        });

        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
    },
    getRecords: function(req, res) {   
        var pg = require('pg');  
      
        //You can run command "heroku config" to see what is Database URL from Heroku belt
      
        var conString = process.env.HEROKU_POSTGRESQL_AMBER_URL;
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("select * from salesforce.Customer__c where username__c="+req.query.username+" and password__c="+req.query.password);

        query.on("row", function (row, result) { 
            result.addRow(row); 
        });

        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
    },
    

    addRecord : function(req, res){
        var pg = require('pg');  
        
        var conString = process.env.HEROKU_POSTGRESQL_AMBER_URL;
        var client = new pg.Client(conString);

        client.connect();

        
        var query = client.query("insert into salesforce.Customer__c (username__c, password__c) "+ 
        "values ('"+req.query.username_id+"','"+req.query.password_id+"')");       

        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        });

    },
    
     delRecord : function(req, res){
        var pg = require('pg');   
        
        var conString = process.env.HEROKU_POSTGRESQL_AMBER_URL;
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "Delete from salesforce.user Where id ="+req.query.username_id);
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        }); 

    },

    updateRecords : function(req, res){
        var pg = require('pg');   
        
        var conString = process.env.HEROKU_POSTGRESQL_AMBER_URL;
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "update salesforce.user set lastname='MODIFIED' Where lastname ='"+req.query.username_id+"'");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Success');
            res.end();  
        }); 

    },

    Search : function(req, res){

        var pg = require('pg');   
        var conString = process.env.HEROKU_POSTGRESQL_AMBER_URL;
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query( "select * from salesforce.Customer__c where username__c ='"+req.query.username_id+"' and password__c ='"+req.query.password_id+"'");
        var count = 0;

        
        query.on("row", function (row, result) { 
            result.addRow(row); 
            count++;
        });
        query.on("end", function (result) {          
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            if (count!=0)
                res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            else 
                res.write('0');
            res.end();  
        });
    },
    
    createTable : function(req, res){
      /*  var pg = require('pg');   
        
        var conString = process.env.HEROKU_POSTGRESQL_AMBER_URL;
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "CREATE TABLE employee"+
                                    "("+
                                      "firstname character varying(50),"+
                                      "lastname character varying(20),"+
                                      "email character varying(30),"+
                                      "mobile character varying(12),"+
                                      "id serial NOT NULL"+
                                    ")");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Table Schema Created');
            res.end();  
        });
*/
    },
    
    dropTable : function(req, res){
      /*  var pg = require('pg');   
        
        var conString = process.env.HEROKU_POSTGRESQL_AMBER_URL;
        var client = new pg.Client(conString);

        client.connect();
         
        var query = client.query( "Drop TABLE employee");
    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Table Schema Deleted');
            res.end();  
        });
*/
    }

    
};