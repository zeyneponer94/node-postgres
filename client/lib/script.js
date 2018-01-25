var testApp = angular.module("testApp", []);
testApp.controller('testController' , function ($scope, $http, $window) {

    $scope.getRequest = function () {
        var pg = require('pg');            
        pg.connect(process.env.HEROKU_POSTGRESQL_AMBER_URL, function(err, client, done)
        {
            if(err)
            {
                return console.error('Client error.', err);
            }
            
            client.query('select * from User', function(err, result){
                done();
                if(err)
                {
                    return console.error('Query error.', err);
                }
                console.log(result.rows);

            });
        });
    } 
 
});


