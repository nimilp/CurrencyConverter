'use strict';
(
  function(){
    angular.module('currency.module',[])
    .controller('currency.controller',['$scope','$http',function($scope,$http){
      // var rupeeSign = $sce.trustAsHtml('&#8377');
      var httpCall = function($http){
        $http({
          method:'GET',
          url:'http://api.fixer.io/latest?base=USD&symbols=INR'
        }).then(success,error);
      };
      var success=function(response){
        $scope.todaysRate = response.data.rates.INR;
        $scope.lastUpdated = new Date().toString().slice(0,24);
      }
      var error = function(error){
        console.error(error);
      }
      // $scope.title=rupeeSign+' to $';
      // $scope.rupeeSign = rupeeSign;
      $scope.todaysRate =0;
      if($scope.todaysRate===0){
        httpCall($http);
      }

      $scope.calculate = function(base){
        if($scope.inr<0) return;
        if(base==undefined){
          base='INR';
        }
        console.log('calculate function ($)',$scope.dollar)

        if(base==='INR'){
          $scope.dollar = convert($scope.inr);
        } else{

          $scope.inr = convert($scope.dollar);
        }
      }

      function convert(amount){
        var amount;
        amount = (amount / $scope.todaysRate).toFixed(2);
        if (amount === 0){
          return '';
        } else{
          return amount;
        }
      }

    }])
  }
)();
