$(document).ready(function(){
    $("#nav_toggle").click(function(){
        $("#sidebar_wrapper").toggle();
        if($("#maintable").hasClass("col-md-10 col-xs-10") && $("#maintable2").hasClass("col-md-10 col-xs-10") && $("#maintable3").hasClass("col-md-10 col-xs-10") && $("#maintable4").hasClass("col-md-10 col-xs-10")){
            $("#maintable").removeClass("col-md-10 col-xs-10");
            $("#maintable").addClass("col-md-12 col-xs-12");
            $("#maintable2").removeClass("col-md-10 col-xs-10");
            $("#maintable2").addClass("col-md-12 col-xs-12");
            $("#maintable3").removeClass("col-md-10 col-xs-10");
            $("#maintable3").addClass("col-md-12 col-xs-12");
            $("#maintable4").removeClass("col-md-10 col-xs-10");
            $("#maintable4").addClass("col-md-12 col-xs-12");
        } else{
            $("#maintable").removeClass("col-md-12 col-xs-12");
            $("#maintable").addClass("col-md-10 col-xs-10");
            $("#maintable2").removeClass("col-md-12 col-xs-12");
            $("#maintable2").addClass("col-md-10 col-xs-10");
            $("#maintable3").removeClass("col-md-12 col-xs-12");
            $("#maintable3").addClass("col-md-10 col-xs-10");
            $("#maintable4").removeClass("col-md-12 col-xs-12");
            $("#maintable4").addClass("col-md-10 col-xs-10");
        }
    });
});



//$(document).ready(function(){
//    $("body").attr("ng-app","myApp");
var app = angular.module("myApp", ['angularUtils.directives.dirPagination','ui.bootstrap','ngAnimate', 'ngSanitize']);
//ng-show & ng-hide control
var app = angular.module("myApp");
    app.controller("myCtrl", function($scope){
        
        locals = localStorage;
//        locals.clear();
        
//        $scope.legikeys = new Array();
//        $scope.billkeys = new Array();
//        $scope.commikeys = new Array();        
//        for(var i=0;i<locals.length;i++){
//            if(locals.key(i).indexOf("commi")==0){
//                $scope.commikeys.push(locals.key(i).substr(6));
//            }
//        }
//        console.log(locals);
//        console.log(billlocals);
        
        $scope.clicked='1';
    //    $scope.allbills = new Array();
        $scope.legi = function(){
            $scope.clicked='1';
    //            console.log($scope.clicked);
        }
        $scope.bill = function(){
            $scope.clicked='2';
    //            console.log($scope.clicked);
        }
        $scope.commi = function(){
            $scope.clicked='3';
    //            console.log($scope.clicked);
        }
        $scope.favpg = function(){
            $scope.clicked='4';
    //            console.log($scope.clicked);
        }
    //    $scope.$on('legi-to-parent', function(event, data){
    //        $scope.legislators=data;
    ////            console.log($scope.legislators);
    //    });
    //    $scope.$on('abill-to-parent', function(event, data){
    //        $scope.allbills=data;
    //    });
    //    $scope.$on('nbill-to-parent', function(event, data){
    //        $scope.allbills = $scope.allbills.concat(data);
    //        console.log($scope.allbills.length);
    //    });
        $scope.$on('commi-to-parent', function(event, data){
            $scope.committees=data;
    //        console.log($scope.committees);
        });

        $scope.addFav = function(id,obj){
            objtostring =  JSON.stringify(obj);
//            $scope.favdatas = locals;
//            for(var i=0;i<locals.length;i++){
//                console.log(locals.key(i).indexOf("commi"));
//                if(locals.key(i).indexOf("commi")==0){
//                    $scope.commikeys.push(locals.key(i).substr(6));
//                }
//            }
//            if(id.indexOf("comm")==0){
            locals.setItem(id,objtostring);
            console.log(locals);
//                if($scope.commikeys.indexOf(id.substr(6))<0){
//                    $scope.commikeys.push(id.substr(6));
//                }
//            }
//            console.log($scope.commikeys);
//            var test = locals.getItem(id);
//            console.log(id);
//            console.log(JSON.parse(test));
        }
        
        $scope.delFav = function(id){
            if(locals.getItem(id)!=null){
                locals.removeItem(id);
            }  
        }
        
        $scope.ifIn = function(obj){
            var flag = 0;
            for(var i=0;i<locals.length;i++){
//                if(obj == $scope.commikeys[i]){
//                    flag = 1;
//                }
//                console.log(locals.key(i));
                if(obj == locals.key(i).substr(5)){
                    flag = 1;
                }
            }
            if(flag==1){
                return true;
            } else{
                return false;
            }
        }
    
});

//data for legislators
app.controller("LegiCtrl", function($scope, $http){
//        console.log("zhixing");
    $http.get("http://Sample-env.zhd2x5h6wm.us-west-2.elasticbeanstalk.com?cdb=legi").then(function(response){  
//            console.log("zhixingCTR");
        $scope.result = response.data.results;
//            console.log($scope.clicked);
//            $scope.reshouse = filterFilter($scope.result, {chamber: 'house'});
        $scope.chambers = {chamber:""};
        $scope.byhouse = function(){
            $scope.chambers = {chamber:"house"};
        }
        $scope.byallstate = function(){
            $scope.chambers = {chamber:""};
        }
        $scope.bysenate = function(){
            $scope.chambers = {chamber:"senate"};
        }
        $scope.$emit('legi-to-parent', $scope.result);
    }, function errorCallback(response){
        alert("error!");
    });
});

//data for bills
app.controller("aBillCtrl", function($scope, $http){
//        console.log("zhixing");
    $http.get("http://Sample-env.zhd2x5h6wm.us-west-2.elasticbeanstalk.com?cdb=abill").then(function(response){  
//            console.log("zhixingCTR");
        $scope.result2 = response.data.results;
//            console.log($scope.result2);
        $scope.$emit('abill-to-parent', $scope.result2);
    }, function errorCallback(response){
        alert("error!");
    });
});
app.controller("nBillCtrl", function($scope, $http){
//        console.log("zhixing");
    $http.get("http://Sample-env.zhd2x5h6wm.us-west-2.elasticbeanstalk.com?cdb=nbill").then(function(response){  
//            console.log("zhixingCTR");
        $scope.result3 = response.data.results;
//        console.log($scope.result3.length);
        $scope.$emit('nbill-to-parent', $scope.result3);
    }, function errorCallback(response){
        alert("error!");
    });
});

//data for committees
app.controller("CommiCtrl", function($scope, $http){
//        console.log("zhixing");
    $http.get("http://Sample-env.zhd2x5h6wm.us-west-2.elasticbeanstalk.com?cdb=commi").then(function(response){  
//            console.log("zhixingCTR");
        $scope.result4 = response.data.results;
        $scope.$emit('commi-to-parent', $scope.result4);
    }, function errorCallback(response){
        alert("error!");
    });
});

//Uppercase filter
app.filter('firstUpper', function(){
            return function(obj){ 
                 return (!!obj) ? obj.charAt(0).toUpperCase() + obj.substr(1).toLowerCase() : '';
            }
        });

//image url filter
app.filter('imgURL', function(){
    return function(obj){
        return "https://theunitedstates.io/images/congress/225x275/" + obj +".jpg";
    }
});

//twitter url filter
app.filter('twitterURL', function(){
    return function(obj){
        return "http://twitter.com/" + obj;
    }
});

//facebook url filter
app.filter('fbURL', function(){
    return function(obj){
        return "http://www.facebook.com/" + obj;
    }
});

//View LegiDetail
app.controller('subpage', function ($scope, $http) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  $scope.selected = '';
  var slides = $scope.slides = [];
  var currIndex = 0;


  $scope.nextpg = function(obj) {
      $scope.active = 1;
//      console.log(obj);
      $scope.selected = obj;
      
      //get bills
      $http.get("http://Sample-env.zhd2x5h6wm.us-west-2.elasticbeanstalk.com?keyword=detailbill&obj="+obj).then(function(resp){
          $scope.detailval = resp.data.results;
//          console.log($scope.detailval.length);
      }, function errorCallback(resp){
          alert("error!");
      });
      
  }

  $scope.prevpg = function() {
      $scope.active = 0;
  }
  
  $scope.calTerm = function(s, e){
      var now = new Date();
      var start = new Date(s);
      var end = new Date(e);
      var numerator = now-start;
      var denominator = end-start;
      var val = Math.round((numerator/denominator)*100);
//      console.log(val);
      $scope.termval = val;
      return val;
  }
});

//billdetail
app.controller('subpage2', function ($scope, $http) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active1 = 0;
//  $scope.selectedbill = '';
  var slides = $scope.slides = [];
  var currIndex = 0;


  $scope.nextpg2 = function(obj) {
      $scope.active1 = 1;
//      console.log(obj);
//      $scope.selectedbill = obj;
      
      //get bills
      $http.get("http://Sample-env.zhd2x5h6wm.us-west-2.elasticbeanstalk.com?keyword=billdetail&obj="+obj).then(function(resp){
          $scope.allbills = resp.data.results;
//          console.log($scope.allbills.length);
      }, function errorCallback(resp){
          alert("error!");
      });
      
  }

  $scope.prevpg1 = function() {
      $scope.active1 = 0;
  }
});

app.controller("favCtrl", function($scope){
    var flegis = new Array();
    var fbills = new Array();
    var fcommis = new Array();
//    var check = '';
    
    for(var a=0;a<locals.length;a++){
        var mykey = locals.key(a);
        if(mykey.indexOf("legi")==0){
            var myobj = locals.getItem(mykey);
//            if(check.indexOf(mykey)<0){
                flegis = flegis.concat(JSON.parse(myobj));
//                check = check + mykey + " ";
//            }
        } else if(mykey.indexOf("bill")==0){
            var myobjj = locals.getItem(mykey);
//            if(check.indexOf(mykey)<0){
                fbills = fbills.concat(JSON.parse(myobjj));
//                check += mykey;
//                check = check + mykey + " ";
//            }
        } else if(mykey.indexOf("comm")==0){
            var myobjjj = locals.getItem(mykey);
//            if(check.indexOf(mykey)<0){
                fcommis = fcommis.concat(JSON.parse(myobjjj));
//                check += mykey;
//                check = check + mykey + " ";
//            }
        }
    }
    
    $scope.legiss = flegis;
    $scope.billss = fbills;
    $scope.commiss = fcommis;
    
    $scope.$watch(function(){
        return locals.length;
    }, function(){
        var legichange = new Array();
        var billchange = new Array();
        var commichange = new Array();
//        var checks = '';
        
        for(var b=0;b<locals.length;b++){
            var bkey = locals.key(b);
            if(bkey.indexOf("legi")==0){
                var ind = locals.getItem(bkey);
//                if(checks.indexOf(bkey)<0){
                    legichange = legichange.concat(JSON.parse(ind));
//                }
            } else if(bkey.indexOf("bill")==0){
                var indd = locals.getItem(bkey);
//                if(checks.indexOf(bkey)<0){
                    billchange = billchange.concat(JSON.parse(indd));
//                    checks += bkey;
//                }
            } else if(bkey.indexOf("comm")==0){
                var inddd = locals.getItem(bkey);
//                if(checks.indexOf(bkey)<0){
                    commichange = commichange.concat(JSON.parse(inddd));
//                    checks += bkey;
//                }
            }
        }
        
        $scope.legiss = legichange;
        $scope.billss = billchange;
        $scope.commiss = commichange;
    });
});

app.filter("TrueorFalse",function(){
				return function(value){
					if(value){
						return "true";
					} else if(!value) {
						return "false";
					} else {
						return "N.A.";
					}
				}
			});

//});