module.exports = {
  getRecords: function(req, res) {   
        var pg = require('pg');  
      
        //You can run command "heroku config" to see what is Database URL from Heroku belt
      
        var conString = process.env.HEROKU_POSTGRESQL_AMBER_URL;
        var client = new pg.Client(conString);

        client.connect();

        var query = client.query("select * from salesforce.User");

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

        
        var query = client.query("insert into salesforce.User (username, LastName, Email, Alias, TimeZoneSidKey, LocaleSidKey, EmailEncodingKey, ProfileId, LanguageLocaleKey) "+ 
        "values ('"+req.query.username_id+"', 'Öner', 'zynp_sk@hotmail.com', 'deneme', 'America/Los_Angeles', 'en_US', 'utf-8', '19', 'heyo')");
    

       

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