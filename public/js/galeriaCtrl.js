(function() {
    angular
        .module('todoApp')
        .controller('GaleriaCtrl', GaleriaCtrl)
        .controller('GaleriaModalCtrl', GaleriaModalCtrl)
        .controller('LinkModalCtrl', LinkModalCtrl);

    function GaleriaCtrl($scope, $uibModal, $http, sweet, Upload) {
        $scope.modal = modal;
        $scope.getGalerias = getGalerias;
        $scope.showLink = showLink;
        
        $scope.getGalerias();
        
        function getGalerias() {
            $http.get('/bluebox/galeria')
                .then(function(res) {
                    $scope.galerias = res.data;
                });
        }

        function modal(galeria) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'galeriaModal.html',
                controller: 'GaleriaModalCtrl',
                controllerAs: 'ctrl',
                size: 'md',
                resolve: {
                    galeria: galeria
                }
            });

            modalInstance.result.then(function() {
            });
        }
        
        function showLink(galeria) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'linkModal.html',
                controller: 'LinkModalCtrl',
                size: 'md',
                resolve: {
                    galeria: galeria
                }
            });

            modalInstance.result.then(function() {
            });
        }
    }

    function GaleriaModalCtrl($scope, $uibModalInstance, $http, Upload, $timeout, sweet, $parse, galeria) {
        $scope.save = save;
        $scope.cancel = cancel;
        $scope.galeria = galeria;
        $scope.uploaded = false;
        $scope.showTooltip = false;
        
        function save() {
            $scope.galeria.imagen.upload = Upload.upload({
                url: '/bluebox/galeria',
                data: $scope.galeria
            });

            $scope.galeria.imagen.upload.then(function (res) {
                $scope.link = res.data.imagen;
                $scope.uploaded = true;
            }, function (res) {
                console.log(res)
            }, function (evt) {
                 $scope.galeria.imagen.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
    
    function LinkModalCtrl($scope, $uibModalInstance, galeria) {
        $scope.link = galeria.imagen;
        $scope.cancel = cancel;
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
