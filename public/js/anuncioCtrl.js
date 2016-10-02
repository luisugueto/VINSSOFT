(function() {
    angular
        .module('todoApp')
        .controller('AnuncioCtrl', AnuncioCtrl)
        .controller('AnuncioModalCtrl', AnuncioModalCtrl);

    function AnuncioCtrl($scope, $uibModal, $http, sweet, Upload, $parse) {
        var vm = this;

        vm.modal = modal;
        vm.destroy = destroy;
        vm.getAnuncios = getAnuncios;
        vm.moment = moment;

        vm.getAnuncios();

        function getAnuncios() {
            $http.get('/bluebox/anuncio')
                .then(function(res) {
                    vm.anuncios = res.data;
                });
        }

        function modal(anuncio) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'createAnuncioModal.html',
                controller: 'AnuncioModalCtrl',
                controllerAs: 'ctrl',
                size: 'md',
                resolve: {
                    anuncio: anuncio
                }
            });

            modalInstance.result.then(function() {
                if (anuncio.id) {
                    sweet.show('Actualizado con éxito', 'Anuncio actualizado');
                } else {
                    sweet.show('Creado con éxito', 'Anuncio creado');
                }

                vm.getAnuncios();
            });
        }

        function destroy(id){
            sweet.show({
                title: 'Confirmar',
                text: 'Borrar este anuncio?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Si, Borrar',
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    $http.delete('/bluebox/anuncio/' + id)
                        .success(function() {
                            vm.getAnuncios();
                            sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
                        });
                }else{
                    sweet.show('Cancelar', ':)', 'error');
                }
            });
        }
    }

    function AnuncioModalCtrl($scope, $uibModalInstance, $http, anuncio, Upload, $timeout, $parse, sweet) {
        var vm = this;

        vm.anuncio = anuncio;
        console.log(vm.anuncio);
        vm.anuncio.seccion_id = parseInt(vm.anuncio.seccion_id);
        vm.save = save;
        vm.getCountries = getCountries;
        vm.getStates = getStates;
        vm.getCities = getCities;
        vm.getSections = getSections;
        vm.cancel = cancel;
        vm.showCategories = true;

        vm.getCountries();
        vm.getSections();

        if (vm.anuncio.id) {
            vm.anuncio.desde = moment(vm.anuncio.desde).format('DD/MM/YYYY h:mm a');
            vm.anuncio.hasta = moment(vm.anuncio.hasta).format('DD/MM/YYYY h:mm a');
            vm.getStates();
            vm.getCities();
        } else {
            vm.anuncio.desde = moment().format('DD/MM/YYYY h:mm a');
            vm.anuncio.hasta = moment().format('DD/MM/YYYY h:mm a');
        }

        function save(file) {
            console.log(file);

            if (vm.anuncio.id) {
                file.upload = Upload.upload({
                    url: '/bluebox/anuncio1/' + vm.anuncio.id,
                    data: { imagen: file, copy_imagen: file, nombre: vm.anuncio.nombre, desde: vm.anuncio.desde, hasta: vm.anuncio.hasta,
                        seccion: vm.anuncio.seccion_id, categoria: vm.anuncio.categoria_id, area: vm.anuncio.area, pais: vm.anuncio.pais_id,
                        estado: vm.anuncio.estado_id, ciudad: vm.anuncio.ciudad_id }
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        if(file.result){

                            $scope.picFile   = '';

                            $uibModalInstance.close();
                            sweet.show('Exitoso', 'success');

                        }
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            } else {
                console.log("save");
                file.upload = Upload.upload({
                    url: '/bluebox/anuncio',
                    data: { imagen: file, copy_imagen: file, nombre: vm.anuncio.nombre, desde: vm.anuncio.desde, hasta: vm.anuncio.hasta,
                        seccion: vm.anuncio.seccion_id, categoria: vm.anuncio.categoria_id, area: vm.anuncio.area, pais: vm.anuncio.pais_id,
                        estado: vm.anuncio.estado_id, ciudad: vm.anuncio.ciudad_id }
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        if(file.result){

                            $scope.picFile   = '';

                            $uibModalInstance.close();
                            sweet.show('Exitoso', 'success');
                        }
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function getCountries() {
            $http.get('/api/getCountries')
                .then(function(res) {
                    vm.countries = res.data;
                });
        }

        function getStates() {
            $http.get('/api/getStates/' + vm.anuncio.pais_id)
                .then(function(res) {
                    vm.states = res.data;
                });
        }

        function getCities() {
            $http.get('/api/getCities/' + vm.anuncio.estado_id)
                .then(function(res) {
                    vm.cities = res.data;
                });
        }

        vm.changeOption = function(id){
            $http.get('/api/categorias/'+ id )
                .then(function(res) {
                    vm.categories = res.data;

                    if(vm.categories.length === 0){
                        vm.showCategories = true;
                    }else{
                        vm.showCategories = false;
                    }
                    console.log(res.data);
                });
        };


        function getSections() {
            $http.get('/api/secciones')
                .then(function (res) {
                    vm.sections = res.data;
                    console.log(res.data);
                });
        }

        vm.myDatetimeRange = {
            "time": {
                "from": 480,
                "to": 1020,
                "dFrom": 0,
                "dTo": 1440,
                "step": 15,
                "minRange": 15,
                "hours24": false
            },
            "hasDatePickers": false,
            "hasTimeSliders": true
        };

        vm.openDatepicker = openDatepicker;
        vm.optionsDatepicker = {
            minDate: new Date(),
            showWeeks: false,
        };
        vm.datepicker1 = {
            opened: false,
        };
        vm.datepicker2 = {
            opened: false,
        };
        function openDatepicker(num) {
            if (num == 1) {
                vm.datepicker1.opened = true;
            } else {
                vm.datepicker2.opened = true;
            }
        };
    }

})();
