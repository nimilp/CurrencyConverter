'use strict';
(
  function(){
    angular.module('currency.module',[])
    .controller('currency.controller',['$scope','$sce','$http',function($scope,$sce,$http){
      var rupeeSign = $sce.trustAsHtml('&#8377');
      var httpCall = function($http){
        $http({
          method:'GET',
          url:'http://api.fixer.io/latest?base=USD&symbols=INR'
        }).then(success,error);
      };
      var success=function(response){
        $scope.todaysRate = response.data.rates.INR;
        $scope.lastUpdated = new Date();
      }
      var error = function(error){
        console.error(error);
      }
      $scope.title=rupeeSign+' to $';
      $scope.rupeeSign = rupeeSign;
      $scope.todaysRate =0;
      if($scope.todaysRate===0){
        httpCall($http);
      }

      $scope.calculate = function(base){
        if($scope.inr<0) return;
        if(base==undefined){
          base='INR';
        }
        var amount;
        if(base==='INR'){
          amount = parseFloat(($scope.inr / $scope.todaysRate).toFixed(2));
          $scope.dollar = amount===0?'' :amount;
        }else{
          amount = parseFloat(($scope.dollar*$scope.todaysRate).toFixed(2));
          $scope.inr = amount===0?'':amount;
        }
      }

    }])
  }
)();
