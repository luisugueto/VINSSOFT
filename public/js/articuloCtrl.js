(function() {
    angular
        .module('todoApp')
        .controller('ArticuloCtrl', ArticuloCtrl)
        .controller('BuscarGaleriaModalCtrl', BuscarGaleriaModalCtrl);
        
    function ArticuloCtrl($scope, $uibModal, $http, sweet, Upload, $timeout, DTOptionsBuilder, DTColumnDefBuilder) {
        $scope.state = 'listing';
        $scope.isLoading = false;
        $scope.articulos = [];
        $scope.secciones = [];
        $scope.categorias = [];
        $scope.posiciones = ['Principal', 'Secundaria', 'Otras', 'Portada'];
        $scope.statuses = [{ id: 1, label: 'Activo' }, { id: 2, label: 'Inactivo' }];
        
        $scope.initDt = initDt;
        $scope.getArticulos = getArticulos;
        $scope.getSecciones = getSecciones;
        $scope.getCategorias = getCategorias;
        $scope.destroy = destroy;
        $scope.detailsArticulo = detailsArticulo;
        $scope.changeArticlePosition = changeArticlePosition;
        $scope.save = save;
        $scope.create = create;
        $scope.edit = edit;
        $scope.cancel = cancel;
        $scope.createGaleriaModal = createGaleriaModal;
        $scope.buscarGaleriaModal = buscarGaleriaModal;
        
        $scope.initDt();
        $scope.getSecciones();
        
        function initDt() {
            $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withColumnFilter({
                    aoColumns: [
                        null, {
                            type: 'text',
                        }, {
                            type: 'text'
                        }, {
                            type: 'text'
                        }, {
                            type: 'text'
                        }, null, null]
                });
            
            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(0).notSortable(),
                DTColumnDefBuilder.newColumnDef(1),
                DTColumnDefBuilder.newColumnDef(2),
                DTColumnDefBuilder.newColumnDef(3),
                DTColumnDefBuilder.newColumnDef(4),
                DTColumnDefBuilder.newColumnDef(5),
                DTColumnDefBuilder.newColumnDef(6).notSortable(),
            ];
        }
        
        function create() {
            $scope.state = 'creating';
            $scope.articulo = {
                status: 2,
                fecha: moment().format('DD/MM/YYYY h:mm a'),
            };  
        }
        
        function edit(articulo) {
            $scope.getCategorias(articulo.categoria_id);
            $scope.state = 'editing';
            $scope.articulo = articulo;
            $scope.articulo.fecha = moment($scope.articulo.fecha).format('DD/MM/YYYY h:mm a');
        }
        
        function getArticulos() {
           $scope.isLoading = true;
            $scope.articulos = [];
            $http.get('/bluebox/articulos')
                .then(function(res) {
                    $scope.articulos = res.data;
                    $scope.isLoading = false;
                }); 
        }
        
        function getSecciones() {
            return $http.get('/api/secciones')
                .then(function(res) {
                    $scope.secciones = res.data;
                });  
        }
        
        function getCategorias() {
            $http.get('/api/categorias?seccionId=' + $scope.articulo.categoria_id)
                .then(function(res) {
                    $scope.categorias = res.data;
                }); 
        }
        
        function destroy(id) {
            $scope.loading = true;
    
            sweet.show({
                title: 'Confirmar',
                text: 'Borrar este Artículo',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Si, Borrar',
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    $http.delete('/bluebox/articulos/' + id)
                        .success(function() {
                            $scope.getArticulos();
                        });
                    sweet.show('Borrado!', 'Ha sido borrado con éxito.', 'success');
                }else{
                    sweet.show('Cancelar', 'error');
                }
            });
        }
        
        function detailsArticulo(id) {
            window.location = "/blueboxarticulos/"+ id+"";
        }
        
        function changeArticlePosition(articulo, position) {
            articulo.posicion = position;
            
            $scope.isLoading = true;
            $http.put('/bluebox/articulos/' + articulo.id, articulo)
                .then(function(res) {
                    $scope.getArticulos();
                    $scope.isLoading = false;
                });
        }
        
        function save() {
            if ($scope.articulo.id) {
                if (Upload.isFile($scope.articulo.imagen)){
                    $scope.articulo._method = 'put';
                    $scope.articulo.imagen.upload = Upload.upload({
                        url: '/bluebox/articulos/' + $scope.articulo.id,
                        data: $scope.articulo,
                        method: 'POST',
                    });
                    
                    $scope.articulo.imagen.upload.then(function (response) {
                        $timeout(function () {
                            sweet.show('Realizado con éxito');
                            $scope.getArticulos();
                            $scope.state = 'listing';
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        $scope.articulo.imagen.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                } else {
                    $http.put('/bluebox/articulos/' + $scope.articulo.id, $scope.articulo)
                        .then(function(res) {
                            sweet.show('Realizado con éxito');
                            $scope.getArticulos();
                            $scope.state = 'listing';
                        });
                }
            } else {
                if (Upload.isFile($scope.articulo.imagen)) {
                    $scope.articulo.imagen.upload = Upload.upload({
                        url: '/bluebox/articulos',
                        data: $scope.articulo,
                    });
                    
                    $scope.articulo.imagen.upload.then(function (response) {
                        $timeout(function () {
                            sweet.show('Realizado con éxito');
                            $scope.getArticulos();
                            $scope.state = 'listing';
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        $scope.articulo.imagen.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                } else {
                    $http.post('/bluebox/articulos', $scope.articulo)
                        .then(function(res) {
                            sweet.show('Realizado con éxito');
                            $scope.getArticulos();
                            $scope.state = 'listing';
                        });
                }
            }
        }
        
        function cancel() {
            $scope.state = 'listing';
        }
        
        function createGaleriaModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'galeriaModal.html',
                controller: 'GaleriaModalCtrl',
                controllerAs: 'ctrl',
                size: 'md',
                resolve: {
                    galeria: {}
                }
            });

            modalInstance.result.then(function() {
            });
        }
        
        function buscarGaleriaModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'buscarGaleriaModal.html',
                controller: 'BuscarGaleriaModalCtrl',
                controllerAs: 'ctrl',
                size: 'lg',
            });

            modalInstance.result.then(function() {
            });
        }
    }
    
    
    function BuscarGaleriaModalCtrl($scope, $uibModalInstance, $uibModal, $http)
    {
        $scope.getGalerias = getGalerias;
        $scope.showLink = showLink;        
        $scope.cancel = cancel;

        $scope.getGalerias();
        
        function getGalerias() {
            $http.get('/bluebox/galeria')
                .then(function(res) {
                    $scope.galerias = res.data;
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
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();