angular.module('currency.directives',[]).
directive('currencyFormatter',[function(){
  return {
    require: 'ngModel',
    link: function(scope, element, attributes,ngModel){
      // var regex = /^(\$?\d{1,3}(?:,?\d{3})*(?:\.\d{2})?|\.\d{2})?$/g;
      var regex=/^\$?\d+(,\d{3})*(\.\d{2})?$/;
      //var regex
      var nonDigits=/[^0-9.]/g;
      var toView = function(value){

        if(typeof(value) !== 'undefined' && !isNaN(value)){

          var newValue = value.replace(/(\d)(?=(\d{3})+\.)/g,'$1,')
          if(newValue<=0){
            return '';
          }
          console.log('formatter',newValue);
          return newValue;
        }else{
          return '';
        }
      };
      var toModel = function(value){
        //console.log(regex.test(value))
        var isValid = regex.test(value);
      //  console.log(isValid);
        if(!isValid){

          value = value.replace(nonDigits,'');
        //  value = parseFloat(value).toFixed(2);
          //value = value.replace(/(\d)(?=(\d{3})+\.)/g,'$1,');
          console.log('parser',value);
          ngModel.$setViewValue(value);
          ngModel.$render();
          return value;
        }
        return value.replace(/,/g,'');
      };

       ngModel.$formatters.unshift(toView);
       ngModel.$parsers.unshift(toModel);
    }

  }
}]);
