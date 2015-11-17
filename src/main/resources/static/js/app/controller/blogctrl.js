var app = angular.module("app", []);

app.controller("blogCtrl", function ($scope, $log, $http) {
    $scope.entry = {title: "Title",
    content: "Content"};
    $scope.entries = [];
    $log.debug('se creo el $scope');


    /**
     * getEntries
     * http GET
     */
    $scope.loadData = function () {
        $http({
            method: "GET",
            url: "http://10.2.67.89:8080/blogs"
        }).success(function (data) {
            $scope.entries = data;
        }).error(function (data, status, headers, config) {
            alert("Ha fallado la petición. Estado HTTP:" + status);
        });
    };
    $scope.loadData();


    /**
     * postEntry
     * http POST
     */
    $scope.processForm = function () {
        $log.debug($scope.entry);
        $http({
            method: 'POST',
            url: 'http://10.2.67.89:8080/blog',
            data: $scope.entry
        }).success(function (data) {
            console.log(data);
            $scope.loadData();
        });
    };


    /**
     * editEntry
     * http PUT
     */
    $scope.processEdit = function (index) {        
        $scope.entryEdit = {title: document.getElementsByName("titleE")[index].value,
                            content: document.getElementsByName("contentE")[index].value};
        //$scope.entryEdit.title=document.getElementsByName("titleE")[index].value;
        //$scope.entryEdit.content=document.getElementsByName("contentE")[index].value;
        
        $log.debug($scope.entryEdit);
        $http({
            method  : 'PUT',
            url     : 'http://10.2.67.89:8080/blog/'+index,
            data    :  $scope.entryEdit,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).success(function (data) {            
            $scope.loadData();            
        }).error(function(data,status,headers,config) {
         alert("Ha fallado la petición EDIT. :"+status);
         });
    };


    /**
     * deleteEntry
     * http DELETE
     */
    $scope.processDelete = function (indx) {
        $log.debug($scope.entries[indx]);
        $http({
            method: 'DELETE',
            url: 'http://10.2.67.89:8080/blog',
            data: indx,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).success(function (data) {
            $scope.loadData();
        }).error(function (data, status, headers, config) {
            alert("Ha fallado la petición DELETE. :" + status);
        });
    };

});
