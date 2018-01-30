    app = angular.module('myApp', [])
    app.controller('myController', function ($scope, $http) {
        $scope.activation = true;  
        $scope.query = false;      

        $http({method: 'GET', url: '/db/getProductList'}).
        success(function(data, status) { 
          //Field names are case sensitive. Be careful!
          $scope.productlist = [];                    
          var i = 0;
          while(data[i].name!=null){
            var obj = { name: data[i].Name };
            $scope.productlist.push(obj);  
            i++;
          }              
        }).
        error(function(data, status) {
          $scope.dataset = data || "Request failed "; 
        });

        
        //when user selects a product from selection list, ng-change calls that function to get the work order types available for chosen product
        $scope.update = function() {
          $http({method: 'GET', url: '/db/RelatedObjects?singleSelect='+$scope.singleSelect}).
          success(function(data, status) { 
            alert("success heyooo");
            alert(data.productcode);
            alert(data);
/*

            $http({method: 'GET', url: '/db/RelatedObjects_2?productCode='+data[0].productcode}).
            success(function(data, status) { 
              alert("success2");
              $scope.workordertype = [];                    
              var i = 0;
              while(data[i].id!=null){
                var obj = { name: data[i].id };
                $scope.workordertype.push(obj);  
                i++;
              } 
            }).
            error(function(data, status) {
              alert("fail2");
            }); 
*/
        /*    $scope.workordertype = [];                    
            var i = 0;
            while(data[i].name!=null){
              var obj = { name: data[i].name };
              $scope.workordertype.push(obj);  
              i++;
            }*/
          }).
          error(function(data, status) {
            alert(data);
            alert("fail heyoo");
          }); 

       }


       $scope.queryWorkOrder = function () {
         $scope.activation = false;
         $scope.activation_query=true;
         $scope.query=false;
/*
         $http({
          method: "GET",        
          url: 'https://thworkorderfapp.azurewebsites.net/api/HttpTrigger_WorkOrderType', 
        }) 
        .then(function(response){ 
          alert(response.data.ProductName);          
        })
       .error(function (response) {
          $scope.data = response.data; 
        }) */

      }
      $scope.createWorkOrder = function () {
        $scope.activation = true;
        $scope.activation_query=false;
      }

    }); 
    app.controller('updatingDB', function ($scope, $http, $q) {
      //sends customer info as parameter to check whether operating user exists or not. if not new customer is created.
      $scope.customer = function () {
          alert("customer");
          $http({
            method: "GET",        
            url: 'https://thworkorderfapp.azurewebsites.net/api/UpdatingDB', 
            params: {name:$scope.name_id, surname:$scope.surname_id, phone:$scope.phone_id, email:$scope.email_id}
          }) 
          .then(function(response){ 
            $scope.data = response.data;
          })
         
      }
   });

   app.controller('DatepickerDemoCtrl', function ($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
  
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  });
