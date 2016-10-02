/**
 * Created by edgar on 03/06/16.
 */
var app = angular.module('todoApp', ['ui.bootstrap', 'datatables', 'hSweetAlert', 'ngFileUpload', 'rgkevin.datetimeRangePicker', 'textAngular', 'datatables.columnfilter', 'ngclipboard'], function() {

});

app.run(function(DTDefaultOptions) {
    DTDefaultOptions.setLanguage({
        sUrl: 'https://cdn.datatables.net/plug-ins/1.10.12/i18n/Spanish.json'
    });
});

app.controller('AddperfilCtrl', function($scope, $http, $uibModal, $rootScope, DTOptionsBuilder, sweet){

    $scope.init = function() {
        $scope.loading = true;
        $scope.perfil = [];
        $http.get('/bluebox/addperfiles').
        success(function(data, status, headers, config) {
            $scope.perfil = data;
        });
    };
    $scope.animationsEnabled = true;
    $scope.open3 = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContentdd.html',
            controller: 'ModaladdperfilCtrl',
            size: 'lg'

        });
        modalInstance.result.then(function () {
        }, function () {
        });
    };
    $scope.editperfil = function (datos) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContenteditt.html',
            controller: 'ModalperfileditCtrl',
            size: 'md',
            resolve: {
                data: function () {
                    return datos;
                }
            }

        });
        modalInstance.result.then(function () {
        }, function () {

        });
    };

    $scope.deleteperfil = function(id){
        console.log(id);
        sweet.show({
            title: 'Confirmar',
            text: 'Borrar este perfil?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                $http.delete('/bluebox/addperfiles/' + id)
                    .success(function() {
                        $scope.init();
                        $scope.loading = false;

                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });

    }
    $rootScope.$on("CallParentMethod", function(){
        $scope.init();
    });
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('ModaladdperfilCtrl', function($scope, $http,  $uibModalInstance,$uibModal, $rootScope,$timeout, DTOptionsBuilder, sweet, Upload){

    $scope.guardar = function(file) {
        file.upload = Upload.upload({
            method: 'POST',
            url: '/bluebox/addperfiles',
            data: {texto:$scope.from_one ,archivo: file}
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile2   = '';

                    $uibModalInstance.close();
                    sweet.show('Exitoso', 'success');
                    $rootScope.$emit("CallParentMethod", {});

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
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


app.controller('ModalperfileditCtrl', function ($scope, $uibModalInstance, data,$http, $rootScope, Upload, $timeout, sweet) {
    $scope.datos= [];
    $scope.datos= data[0];


    $scope.checkboxModel=true;
    // $scope.from_one = $scope.datos.texto; 
    // $scope.picFile = $scope.datos.imagen; 


    $scope.uploadPic = function(file) {

        file.upload = Upload.upload({
            method: 'POST',
            url: '/bluebox/addperfiles/' + $scope.datos.id,
            data: {texto:$scope.datos.texto ,archivo: file}
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile2   = '';

                    $uibModalInstance.close();
                    sweet.show('Exitoso', 'success');
                    $rootScope.$emit("CallParentMethod", {});

                }
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');

    };
});

app.controller('SurveyCtrl', function ($scope, $http, $uibModal, $rootScope, DTOptionsBuilder, sweet, Upload) {

    $scope.init = function() {
        $scope.loading = true;
        $scope.sur = [];
        $http.get('/bluebox/survey').
        success(function(data, status, headers, config) {
            $scope.sur = data;
        });
    };

    $scope.animationsEnabled = true;
    $scope.open2 = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalsurveyCtrl',
            size: size

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };
    $scope.modaloptions = function (user) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent12.html',
            controller: 'ModalsurveyoptionsCtrl',
            size: 'md',
            resolve: {
                id: function () {
                    return user;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };
    $scope.modalResultados = function (user) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalResults.html',
            controller: 'ModalsurveyAnswerCtrl',
            size: 'md',
            resolve: {
                id: function () {
                    return user;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.editsurvey = function (id,name,status) {
        datos = {'id':id,'name':name,'status':status};
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContentEdit.html',
            controller: 'ModalsurveyeditCtrl',
            size: 'md',
            resolve: {
                id2: function () {
                    return datos;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.deletesurvey = function(id){

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar este Usuario',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                $http.delete('/bluebox/survey/' + id)
                    .success(function() {
                        $scope.init();
                        $scope.loading = false;

                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });

    };

    $rootScope.$on("CallParentMethod", function(){
        $scope.init();
    });
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


app.controller('ModalsurveyeditCtrl', function ($scope, $uibModalInstance, id2,$http, $rootScope, Upload, $timeout, sweet) {

    $scope.datos= id2;
    $scope.items = [];
    $scope.titulo = $scope.datos.name;
    $scope.status = $scope.datos.status;

    $http.get('/bluebox/survey/'+ $scope.datos.id).
    success(function(data, status, headers, config) {
        console.log(data);
        $scope.opt = data;
        $.map($scope.opt,function(d,i){
            $scope.items.push({
                placeholder: "Opcion",
                text: d.name,
                id: d.id,
                id_survey: d.id_survey
            });
        });

    });

    $scope.add_options=function(){
        $scope.items.push({
            placeholder: "Opcion",
            text: ""
        });
    }
    $scope.update2 = function() {
        $http.put('/bluebox/survey/' + $scope.datos.id, {
            titulo: $scope.titulo,
            status: $scope.status,
            done: $scope.items
        }).success(function(data, status, headers, config) {
            $uibModalInstance.close();
            console.log(data.Error);
            if(data.Error){
                $rootScope.$emit("CallParentMethod", {});
                sweet.show(data.Error.message, '');
            }else{
                $rootScope.$emit("CallParentMethod", {});
                sweet.show('Exitoso', 'success');
            }
        });
        // $http({
        //    method: 'put',
        //    url: '/survey'+ $scope.datos.id,
        //    data: {'titulo': $scope.titulo, 'opciones': $scope.items}
        //  }).success(function(data, status, headers, config) {
        //    $uibModalInstance.close();
        //       sweet.show('Exitoso', 'success');
        //  }).error(function(data, status, headers, config) {
        //      alert("Ha fallado la petición. Estado HTTP:"+status);
        //  });
    };


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('ModalsurveyCtrl', function ($scope, $uibModalInstance, $http,$rootScope, Upload, $timeout, sweet) {

    $scope.user = {};
    $scope.users = [];
    $scope.items = [];
    $scope.add_options=function(){
        $scope.items.push({
            placeholder: "Opcion",
            text: ""
        });
    }
    $scope.save = function() {

        $http({
            method: 'POST',
            url: '/bluebox/survey',
            data: {titulo: $scope.titulo, opciones: $scope.items}
        }).success(function(data, status, headers, config) {

            $scope.loading = true;
            $scope.sur = [];
            // $http.get('/survey').
            // success(function(data, status, headers, config) {
            //     $scope.sur = data;
            // });

            $uibModalInstance.close();

            sweet.show('Exitoso', 'success');
            $rootScope.$emit("CallParentMethod", {});
        }).error(function(data, status, headers, config) {
            alert("Ha fallado la petición. Estado HTTP:"+status);
        });
    };


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('ModalsurveyoptionsCtrl', function ($scope, $uibModalInstance,id, $http, $rootScope, Upload, $timeout, sweet) {
    $scope.user2 = id;
    $scope.opt = [];
    $http.get('/bluebox/survey/'+ id)
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.opt = data;

        });
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('ModalsurveyAnswerCtrl', function ($scope, $uibModalInstance,id, $http, $rootScope, Upload, $timeout, sweet) {
    $scope.user2 = id;
    $scope.opt = [];
    $http.get('/bluebox/encuestaResultados/'+ id)
        .success(function(data, status, headers, config) {
            $scope.opt = data;
        })
        .error(function(data,status,headers,config){
            $scope.error = data.message;
        });
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});



app.controller('cmsController', function($scope, $http, $uibModal, $rootScope, DTOptionsBuilder, sweet, Upload) {

    $scope.users = [];
    $scope.loading = false;
    var a = 1;

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', true);

    $scope.init = function() {
        $scope.loading = true;
        $http.get('/bluebox/usuario_cms').
        success(function(data, status, headers, config) {
            $scope.users = data;
            $scope.loading = false;

        });
    };

    $scope.updateUser = function(todo) {
        $scope.loading = true;

        $http.put('/bluebox/home' + todo.id, {
            title: todo.title,
            done: todo.done
        }).success(function(data, status, headers, config) {
            todo = data;
            $scope.loading = false;

        });
    };

    $scope.deleteUser = function(index) {
        $scope.loading = true;

        // var user = $scope.user[index];

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar este Usuario',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                $http.delete('/bluebox/usuario_cms/' + index)
                    .success(function() {
                        $scope.init();
                        $scope.loading = false;

                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });


    };

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modalUserCMS.html',
            controller: 'ModalInstanceCtrl',
            size: size

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.editUser = function (user) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent1.html',
            controller: 'ModalEditCtrl',
            size: 'md',
            resolve: {
                user: function () {
                    return user;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $rootScope.$on("CallParentMethod", function(){
        $scope.init();
    });


    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $http, $rootScope, Upload, $timeout, sweet) {

    $scope.user = {};
    $scope.users = [];
    $scope.server = null;

    $scope.save = function (form) {

        $scope.submitted = true;
        if (form.$valid) {
            $http.post('/bluebox/usuario_cms', $scope.user)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("CallParentMethod", {});
                });
            $uibModalInstance.close();
        }
    };


    $scope.uploadPic = function(file, form) {
        $scope.isBusy = true;
        $scope.submitted = true;

        console.log(file);

        if(file === undefined){
            if (form.$valid) {
                $http.post('/bluebox/usuario_cms', $scope.user)
                    .success(function (data, status, headers, config) {
                        $rootScope.$emit("CallParentMethod", {});
                        sweet.show('Exitoso', 'success');
                        $uibModalInstance.close();
                    })
                    .error(function(data, status, headers, config) {
                        $scope.server = data.message;
                        console.log($scope.server);
                    });
            }
        }else{
            file.upload = Upload.upload({
                url: '/bluebox/usuario_cms',
                data: {archivo: file, copy_archivo: file, login: $scope.user.login, password: $scope.user.password,
                    permisos: $scope.user.permisos, email: $scope.user.email, nombre: $scope.user.nombre}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    if(file.result){

                        $scope.user.picFile   = '';

                        $uibModalInstance.close();
                        sweet.show('Exitoso', 'success');
                        $rootScope.$emit("CallParentMethod", {});

                    }
                });
            }, function (response) {
                $scope.server = response.data.message;

                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditCtrl', function ($scope, $uibModalInstance, user, $http, $rootScope, Upload, $timeout, sweet) {

    $scope.user = user;
    $scope.user.password = user.re_password;

    $scope.uploadPic = function(file, form) {
        $scope.submitted = true;

        if(file == undefined){
            if (form.$valid) {
                $http.post('/bluebox/usuarios_cms/' + $scope.user.id, $scope.user)
                    .success(function (data, status, headers, config) {
                        $rootScope.$emit("CallParentMethod", {});
                        sweet.show('Exitoso', 'success');
                        $uibModalInstance.close();
                    })
                    .error(function(data, status, headers, config) {
                        $scope.server = data.message;
                        
                    });

            }
        }else{
            file.upload = Upload.upload({
                url: '/bluebox/usuarios_cms/' + $scope.user.id,
                data: {archivo: file, copy_archivo: file, login: $scope.user.login, password: $scope.user.password,
                    permisos: $scope.user.permisos, email: $scope.user.email, nombre: $scope.user.nombre}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    if(file.result){
                        $scope.user.picFile   = '';

                        $uibModalInstance.close();
                        sweet.show('Exitoso', 'success');
                        $rootScope.$emit("CallParentMethod", {});

                    }
                });
            }, function (response) {
                $scope.server = response.data.message;
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('variablesController', function($scope, $http, $uibModal, $rootScope, DTOptionsBuilder, sweet) {

    $scope.variables = [];
    $scope.loading = false;

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', false);

    $scope.initVariable = function() {
        $scope.loading = true;
        $http.get('/bluebox/variables1').
        success(function(data, status, headers, config) {
            $scope.variables = data;
            console.log($scope.variables);
            $scope.loading = false;

        });
    };

    $scope.updateUser = function(todo) {
        $scope.loading = true;

        $http.put('/bluebox/home' + todo.id, {
            title: todo.title,
            done: todo.done
        }).success(function(data, status, headers, config) {
            todo = data;
            $scope.loading = false;

        });
    };

    $scope.deleteVariable = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar este Articulo',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/variables1/'+ index)
                    .success(function() {
                        $scope.initVariable();
                        $scope.loading = false;

                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });

    };


    $scope.animationsEnabled = true;

    $scope.addVariables = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalAddVariableCtrl',
            size: size

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.editVariable = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent1.html',
            controller: 'ModalEditVariableCtrl',
            size: 'md',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $rootScope.$on("CallParentMethod1", function(){
        $scope.initVariable();
    });


    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

app.controller('ModalAddVariableCtrl', function ($scope, $uibModalInstance, $http, $rootScope) {

    $scope.save = function (form) {

        $scope.submitted = true;
        if (form.$valid) {
            $http.post('/bluebox/variables1', $scope.variable)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("CallParentMethod1", {});
                });

            $uibModalInstance.close();

        }

    };


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditVariableCtrl', function ($scope, $uibModalInstance, variable, $http, $rootScope) {

    $scope.variable = variable;

    $scope.edit = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            $http.put('/bluebox/variables1/' + $scope.variable.id, $scope.variable)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("CallParentMethod1", {});
                });

            $uibModalInstance.close();

        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('SliderCtrl', function ($scope, $uibModal, $http, sweet) {

    $scope.sliders = [];

    $scope.initSlider = function() {
        $scope.loading = true;
        $http.get('/bluebox/sliders').
        success(function(data, status, headers, config) {
            $scope.sliders = data;
        });
    };


    $scope.addSlider = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalFileCtrl',
            size: size
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.editSlider = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalEditSliderCtrl',
            size: 'md',
            resolve: {
                slider: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.deleteSlider = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar este Slider',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/sliders/' + index)
                    .success(function() {
                        $scope.initSlider();
                        $scope.loading = false;

                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });

    };


});

app.controller('ModalFileCtrl', function ($scope, $uibModalInstance, $http, $rootScope, Upload, $timeout, sweet) {

    console.log($scope);
    $scope.uploadPic = function(file, file1, file2) {
        $scope.isBusy = true;
        file.upload = Upload.upload({
            url: '/bluebox/sliders',
            data: {archivo: file ,copyArchivo: file, thumbs:file2 , copyThumbs: file2, titulo: $scope.titulo, texto: $scope.texto,
                descripcion: $scope.descripcion, nivel: $scope.nivel }
        });


        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile1   = '';
                    $scope.picFile2   = '';
                    $scope.picFile3   = '';
                    $uibModalInstance.close();
                    sweet.show('Exitoso', 'success');

                    $scope.sliders = [];

                    $http.get('/bluebox/sliders').
                    success(function(data, status, headers, config) {
                        $scope.sliders = data;
                    })
                }
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditSliderCtrl', function ($scope, $uibModalInstance, slider, $http, $rootScope, Upload) {

    $scope.slider = slider;

    console.log(slider);

    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
            method: 'POST',
            url: '/bluebox/slider/' + $scope.slider.id,
            data: {archivo: file, /*icono:file1,*/ thumbs:file2, titulo: $scope.titulo, texto: $scope.texto,
                descripcion: $scope.descripcion, nivel: $scope.nivel }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile1   = '';
                    //$scope.picFile2   = '';
                    $scope.picFile3   = '';
                    $uibModalInstance.close();
                    sweet.show('Exitoso', 'success');

                    $scope.sliders = [];

                    $http.get('/bluebox/sliders').
                    success(function(data, status, headers, config) {
                        $scope.sliders = data;
                    })
                }
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


app.controller('AlianzasController', function($scope, $http, $uibModal, $rootScope, DTOptionsBuilder, sweet) {

    $scope.alianzas = [];
    $scope.loading = false;

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withOption('bLengthChange', false);

    $scope.initAlianzas = function() {
        $scope.loading = true;
        $http.get('/bluebox/alianzas').
        success(function(data, status, headers, config) {
            $scope.alianzas  = data;
            $scope.loading = false;

        });
    };

    $scope.addAlianza = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modalAlianza.html',
            controller: 'ModalAlianzaCtrl',
            size: size

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.updateAlianzas = function(todo) {
        $scope.loading = true;

        $http.put('/bluebox/alianzas' + todo.id, {
            title: todo.title,
            done: todo.done
        }).success(function(data, status, headers, config) {
            todo = data;
            $scope.loading = false;

        });;
    };

    $scope.deleteAlianzas = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar este Alianza',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/alianzas/' + index)
                    .success(function() {
                        $scope.initAlianzas();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };
    $scope.editAlianza = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent1.html',
            controller: 'ModalEditAlianzaCtrl',
            size: 'md',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $rootScope.$on("alianza", function(){
        $scope.initAlianzas();
    });


    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

app.controller('ModalAlianzaCtrl', function ($scope, $uibModalInstance, $http, $rootScope, Upload, $timeout, sweet) {

    $scope.uploadPic = function(file) {
        $scope.isBusy = true;
        file.upload = Upload.upload({
            url: '/bluebox/alianzas',
            data: {archivo: file, titulo: $scope.titulo, url: $scope.url, copyArchivo: file}
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile1   = '';
                    $scope.picFile2   = '';
                    $scope.picFile3   = '';
                    $uibModalInstance.close();
                    sweet.show('Exitoso', 'success');

                    $scope.sliders = [];
                    $rootScope.$emit("alianza", {});
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

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


});


app.controller('ModalEditAlianzaCtrl', function ($scope, $uibModalInstance, variable, $http, $timeout , $rootScope, Upload, sweet ) {

    $scope.alianzas = variable;

    //console.log(user);

    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
            method: 'PUT',
            url: '/bluebox/alianzas/' + $scope.alianzas.id,
            data: {archivo: file, titulo: $scope.alianzas.titulo, url: $scope.alianzas.url, copyArchivo: file}
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile   = '';

                    $uibModalInstance.close();
                    sweet.show('Exitoso', 'success');

                    $rootScope.$emit("alianza", {});

                }
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('principalCtrl', function ($scope, $uibModal, $http, $rootScope, sweet) {

    $scope.principals = [];
    $scope.initPrincipals = function() {
        $http.get('/bluebox/principals').
        success(function(data, status, headers, config) {
            $scope.principals = data;
        });
    };

    $scope.addPrincipal = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalPrincipalCtrl',
            size: 'lg'

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.editPrincipals = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalEditPrincipalCtrl',
            size: 'md',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.deletePrincipals = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar este Articulo',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/principals/' + index)
                    .success(function() {
                        $scope.initPrincipals();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };

    $rootScope.$on("principals", function(){
        $scope.initPrincipals();
    });

});

app.controller('tiposCtrl', function ($scope, $uibModal, $http, $rootScope, sweet) {

    $scope.tipos = [];
    $scope.initTipos = function() {
        $http.get('/bluebox/tipos').
        success(function(data, status, headers, config) {
            $scope.tipos = data;
        });
    };


    $scope.addTipos = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalTipoCtrl',
            size: 'md'
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.editTipos = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalEditTipoCtrl',
            size: 'md',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.deleteTipos = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar esta Sección',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/tipos/' + index)
                    .success(function() {
                        $scope.initTipos();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };

    $rootScope.$on("tipos", function(){
        $scope.initTipos();
    });


});

app.controller('ModalTipoCtrl', function ($scope, $uibModalInstance, $http, $rootScope, sweet, $rootScope, Upload, $timeout) {

    $scope.save = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
            $http({
                method: 'POST',
                url: '/bluebox/tipos',
                data: {name: $scope.name, descripcion: $scope.descripcion}
            }).success(function (data, status, headers, config) {

                $scope.loading = true;
                $scope.sur = [];
                // $http.get('/survey').
                // success(function(data, status, headers, config) {
                //     $scope.sur = data;
                // });

                $uibModalInstance.close();

                sweet.show('Exitoso', 'success');
                $rootScope.$emit("tipos", {});
            }).error(function (data, status, headers, config) {
                alert("Ha fallado la petición. Estado HTTP:" + status);
            });
        }
    };

    /*
     $scope.uploadPic = function(file) {
     file.upload = Upload.upload({
     method: 'POST',
     url: '/bluebox/tipos',
     data: {archivo: file, copy: file, name: $scope.name, contenido: $scope.descripcion}
     });

     file.upload.then(function (response) {
     $timeout(function () {
     file.result = response.data;
     if(file.result){

     $scope.picFile   = '';

     $uibModalInstance.close();
     sweet.show('Exitoso', 'success');

     $rootScope.$emit("tipos", {});

     }
     });
     }, function (response) {
     if (response.status > 0)
     $scope.errorMsg = response.status + ': ' + response.data;
     }, function (evt) {
     // Math.min is to fix IE which reports 200% sometimes
     file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
     });
     };*/

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('ModalEditTipoCtrl', function ($scope, $uibModalInstance, variable, $http, $rootScope, sweet, Upload, $timeout) {

    $scope.tipo = variable;

    console.log(variable);
    $scope.name        = $scope.tipo.nombre;
    $scope.descripcion = $scope.tipo.contenido;
    $scope.picFile     = $scope.tipo.imagen;

    //console.log(user);

    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
            method: 'POST',
            url: '/bluebox/tipos/' + $scope.tipo.id,
            data: {archivo: file, copy: file, name: $scope.name, contenido: $scope.descripcion}
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile   = '';

                    $uibModalInstance.close();
                    sweet.show('Exitoso', 'success');

                    $rootScope.$emit("alianza", {});

                }
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditArticuloCtrl', function ($scope, $uibModalInstance, variable ,Upload,$timeout , $http, $rootScope, sweet) {

    $scope.categorias = [];
    $scope.subcategorias = [];
    $scope.posiciones = [{name: 'Principal' },{name:'Secundaria'}, {name:'Otras noticias'},{name:'TopStories'}];

    $http.get('/bluebox/categorias').
    success(function(data, status, headers, config) {
        $scope.categorias = data;
    });

    $http.get('/bluebox/subcategorias').
    success(function(data, status, headers, config) {
        $scope.subcategorias = data;
    });

    $scope.categoria = variable.categoria;
    $scope.subcategoria = variable.subcategoria;
    $scope.titulo = variable.titulo;
    $scope.texto = variable.pie;
    $scope.video = variable.video;
    $scope.posicion = variable.posicion;
    $scope.status = variable.status;
    $scope.from_one = variable.contenido;

    console.log($scope.from_one);

    $scope.uploadPic = function(file,file1,file2) {
        $scope.isBusy = true;
        file.upload = Upload.upload({
            method : 'PUT',
            url: '/bluebox/articulos/'+ variable.id,
            data: {audio: file1, imagen:file, categoria: $scope.categoria.id,posicion: $scope.posicion, tipo: $scope.subcategoria.id, thumbs:file2, titulo: $scope.titulo, pie: $scope.texto,
                contenido: $scope.from_one, video: $scope.video, status: $scope.status }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){
                    $scope.picFile2   = '';
                    $rootScope.$emit("articulos", {});
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
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


app.controller('ModalPrincipalCtrl', function ($scope, $uibModalInstance, $http, $rootScope, sweet, $rootScope) {

    $scope.save = function (form) {

        $scope.submitted = true;
        if (form.$valid) {
            $http.post('/bluebox/principals', $scope.principal)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("principals", {});
                    sweet.show('Exitoso', 'success');
                });
            $uibModalInstance.close();
        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditPrincipalCtrl', function ($scope, $uibModalInstance, variable, $http, $rootScope, sweet) {

    $scope.principal = variable;
    $scope.edit = function (form) {

        $scope.submitted = true;
        if (form.$valid) {
            $http.put('/bluebox/principals/' + $scope.principal.id, $scope.principal)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("principals", {});
                    sweet.show('Exitoso', 'success');
                });

            $uibModalInstance.close();

        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('contactoCtrl', function ($scope, $uibModal, $http, $rootScope, sweet, DTOptionsBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(4)
        .withOption('bLengthChange', true);

    $scope.contactos = [];
    $scope.initContactos = function() {
        $http.get('/bluebox/contactos').
        success(function(data, status, headers, config) {
            $scope.contactos = data;
        });
    };

    $scope.addContacto = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalContactoCtrl',
            size: 'md'

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.editContacto = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent1.html',
            controller: 'ModalEditContactoCtrl',
            size: 'md',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.deleteContacto = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar este Contacto',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/contactos/' + index)
                    .success(function() {
                        $scope.initContactos();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };

    $rootScope.$on("contactos", function(){
        $scope.initContactos();
    });

});
app.controller('ModalContactoCtrl', function ($scope, $uibModalInstance, $http, $rootScope, sweet, $rootScope) {
    $scope.save = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            $http.post('/bluebox/contactos', $scope.contacto)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("contactos", {});
                    sweet.show('Exitoso', 'success');
                });
            $uibModalInstance.close();
        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('ModalEditContactoCtrl', function ($scope, $uibModalInstance, variable, $http, $rootScope, sweet) {

    $scope.contacto = variable;
    $scope.edit = function (form) {

        $scope.submitted = true;
        if (form.$valid) {
            $http.put('/bluebox/contactos/' + $scope.contacto.id, $scope.contacto)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("contactos", {});
                    sweet.show('Exitoso', 'success');
                });

            $uibModalInstance.close();

        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('categoriaController', function ($scope, $uibModal, $http, $rootScope, sweet, DTOptionsBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(4)
        .withOption('bLengthChange', true);

    $scope.categorias = [];
    $scope.initCategorias = function() {
        $http.get('/bluebox/categorias').
        success(function(data, status, headers, config) {
            $scope.categorias = data;
        });
    };

    $scope.addCategoria = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalCategoriaCtrl',
            size: 'md'
        });

        modalInstance.result.then(function () {
        }, function () {
        });
    };

    $scope.editCategorias = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent1.html',
            controller: 'ModalEditCategoriaCtrl',
            size: 'md',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.deleteCategorias = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar esta Categoria',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/categorias/' + index)
                    .success(function() {
                        $scope.initCategorias();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };

    $rootScope.$on("categorias", function(){
        $scope.initCategorias();
    });

});

app.controller('ModalCategoriaCtrl', function ($scope, $uibModalInstance, $http, $rootScope, sweet, $rootScope) {

    $scope.posiciones = [{
        name: 'Arriba-Izquierda',
        value: 'A',
    },{
        name: 'Arriba-Derecha',
        value: 'B',
    },{
        name: 'Medio-Izquierda',
        value: 'C',
    },{
        name: 'Medio-Derecha',
        value: 'D',
    },{
        name: 'Abajo-Izquierda',
        value: 'E',
    },{
        name: 'Abajo-Derecha',
        value: 'F',
    },
        {
            name: 'Ninguna',
            value: 'X',
        }];

    $scope.save = function (form) {
        $scope.submitted = true;
        $scope.categoria1 = {
            nombre : $scope.categoria.nombre,
            color: $scope.categoria.color,
            posicion: $scope.categoria.posicion.name,
            lugar: $scope.categoria.posicion.value
        };
        if (form.$valid) {
            $http.post('/bluebox/categorias', $scope.categoria1)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("categorias", {});
                    sweet.show('Exitoso', 'success');
                });
            $uibModalInstance.close();
        }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditCategoriaCtrl', function ($scope, $uibModalInstance, variable, $http, $rootScope, sweet) {

    $scope.categoria = variable;

    $scope.posiciones = [{
        name: 'Arriba-Izquierda',
        value: 'A',
    },{
        name: 'Arriba-Derecha',
        value: 'B',
    },{
        name: 'Medio-Izquierda',
        value: 'C',
    },{
        name: 'Medio-Derecha',
        value: 'D',
    },{
        name: 'Abajo-Izquierda',
        value: 'E',
    },{
        name: 'Abajo-Derecha',
        value: 'F',
    },
        {
            name: 'Ninguna',
            value: 'X',
        }];


    $scope.edit = function (form) {

        $scope.submitted = true;
        if (form.$valid) {
            $scope.categoria1 = {
                color: $scope.categoria.color,
                nombre : $scope.categoria.nombre,
                posicion: $scope.categoria.posicion.name,
                lugar: $scope.categoria.posicion.value
            };
            $http.put('/bluebox/categorias/' + $scope.categoria.id, $scope.categoria1)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("categorias", {});
                    sweet.show('Exitoso', 'success');
                });
            $uibModalInstance.close();
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('subcategoriaController', function ($scope, $uibModal, $http, $rootScope, sweet, DTOptionsBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(4)
        .withOption('bLengthChange', true);

    $scope.subcategorias = [];
    $scope.initSubcategorias = function() {
        $http.get('/bluebox/subcategorias').
        success(function(data, status, headers, config) {
            $scope.subcategorias = data;
        });
    };

    $scope.addSubCategoria = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalSubCategoriaCtrl',
            size: 'md'

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.editSubCategorias = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent1.html',
            controller: 'ModalEditSubCategoriaCtrl',
            size: 'md',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.deleteSubCategorias = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar esta SubCategoria',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/subcategorias/' + index)
                    .success(function() {
                        $scope.initSubcategorias();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };

    $rootScope.$on("subcategorias", function(){
        $scope.initSubcategorias();
    });

});
app.controller('ModalSubCategoriaCtrl', function ($scope, $uibModalInstance, $http, $rootScope, sweet, $rootScope) {

    $scope.categorias = [];
    $http.get('/bluebox/categorias').
    success(function(data, status, headers, config) {
        $scope.categorias = data;
    });


    $scope.save = function (form) {
        $scope.submitted = true;
        $scope.subcategoria1 = {
            categoria: $scope.subcategoria.categorias.id,
            nombre : $scope.subcategoria.nombre
        };
        console.log($scope.subcategoria1);
        if (form.$valid) {
            $http.post('/bluebox/subcategorias', $scope.subcategoria1)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("subcategorias", {});
                    sweet.show('Exitoso', 'success');
                });
            $uibModalInstance.close();
        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('ModalEditSubCategoriaCtrl', function ($scope, $uibModalInstance, variable, $http, $rootScope, sweet) {

    $scope.subcategoria = variable;

    $scope.categorias = [];
    $http.get('/bluebox/categorias').
    success(function(data, status, headers, config) {
        $scope.categorias = data;
    });

    $scope.edit = function (form) {

        $scope.submitted = true;
        if (form.$valid) {

            $scope.categoria1 = {
                tipo: $scope.subcategoria.categorias.id,
                nombre : $scope.subcategoria.nombre
            };
            $http.put('/bluebox/subcategorias/' + $scope.subcategoria.id, $scope.categoria1)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("subcategorias", {});
                    sweet.show('Exitoso', 'success');
                });

            $uibModalInstance.close();

        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('WorkgroupCtrl', function ($scope, $uibModal, $http, sweet, $rootScope) {

    $scope.workgroups = [];

    $scope.initWorkgroup = function() {
        $scope.loading = true;
        $http.get('/bluebox/workgroups').
        success(function(data, status, headers, config) {
            $scope.workgroups = data;
        });
    };


    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalWorkgroupCtrl',
            size: 'lg'

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.editWorkgroup = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent1.html',
            controller: 'ModalEditWorkgroupCtrl',
            size: 'lg',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.deleteWorkgroup = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar esta Usuario',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/workgroups/' + index)
                    .success(function() {
                        $scope.initWorkgroup();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };

    $rootScope.$on("workgroups", function(){
        $scope.initWorkgroup();
    });


});

app.controller('ModalWorkgroupCtrl', function ($scope, $uibModalInstance, $http, $rootScope, Upload, $timeout, sweet, $rootScope) {

    $scope.uploadPic = function(file) {
        $scope.isBusy = true;
        file.upload = Upload.upload({
            url: '/bluebox/workgroups',
            data: {archivo: file, archivo1: file, titulo: $scope.titulo, email: $scope.email,
                cargo: $scope.cargo, contenido: $scope.from_one }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile2   = '';
                    $rootScope.$emit("workgroups", {});
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
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditWorkgroupCtrl', function ($scope, $uibModalInstance, variable, $http, $rootScope, sweet) {

    $scope.workgroup = variable;
    $scope.workgroup.from_one = variable.contenido;

    console.log($scope.workgroup.from_one);

    $scope.uploadPic = function(file) {
        $scope.isBusy = true;
        file.upload = Upload.upload({
            url: '/bluebox/workgroups',
            data: {archivo: file, archivo1: file, titulo: $scope.titulo, email: $scope.email,
                cargo: $scope.cargo, contenido: $scope.from_one }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile2   = '';
                    $rootScope.$emit("workgroups", {});
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
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('afiliacionesController', function ($scope, $uibModal, $http, $rootScope, sweet, DTOptionsBuilder) {


    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(4)
        .withOption('bLengthChange', true);

    $scope.afiliaciones = [];

    $scope.initAfiliaciones = function() {
        $http.get('/bluebox/afiliacion').
        success(function(data, status, headers, config) {
            $scope.afiliaciones = data;
        });
    };

    $scope.addAfiliaciones = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modalAfiliacion.html',
            controller: 'ModalAfiliacionCtrl',
            size: 'lg'
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.editAfiliaciones = function(variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modaleditAfiliaciones.html',
            controller: 'ModalEditAfiliacionCtrl',
            size: 'lg',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.deleteAfiliaciones = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar esta Categoria',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/afiliacion/' + index)
                    .success(function() {
                        $scope.initAfiliaciones();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };

    $rootScope.$on("afiliacion", function(){
        $scope.initAfiliaciones();
    });

});
app.controller('ModalAfiliacionCtrl', function ($scope, $uibModalInstance, $http, $rootScope, Upload, $timeout, sweet, $rootScope) {

    $scope.uploadPic = function(file) {
        $scope.isBusy = true;
        file.upload = Upload.upload({
            url: '/bluebox/afiliacion',
            data: {archivo: file, copyArchivo: file ,url: $scope.url }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile   = '';
                    $rootScope.$emit("afiliacion", {});
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
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('ModalEditAfiliacionCtrl', function ($scope, $uibModalInstance, variable, $http, $rootScope, sweet, Upload, $timeout) {

    $scope.afiliacion = variable;


    $scope.uploadPic = function(file) {
        $scope.isBusy = true;
        file.upload = Upload.upload({
            url: '/bluebox/afiliacion/' + $scope.afiliacion.id,
            data: {archivo: file, url: $scope.afiliacion.url }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile   = '';
                    $rootScope.$emit("afiliacion", {});
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
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.value('uiTinymceConfig', {});
app.directive('uiTinymce', ['uiTinymceConfig', function(uiTinymceConfig) {
    uiTinymceConfig = uiTinymceConfig || {};
    var generatedIds = 0;
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ngModel) {
            var expression, options, tinyInstance;
            // generate an ID if not present
            if (!attrs.id) {
                attrs.$set('id', 'uiTinymce' + generatedIds++);
            }
            options = {
                // Update model when calling setContent (such as from the source editor popup)
                setup: function(ed) {
                    ed.on('init', function(args) {
                        ngModel.$render();
                    });
                    // Update model on button click
                    ed.on('ExecCommand', function(e) {
                        ed.save();
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    });
                    // Update model on keypress
                    ed.on('KeyUp', function(e) {
                        console.log(ed.isDirty());
                        ed.save();
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    });
                },
                mode: 'exact',
                elements: attrs.id
            };
            if (attrs.uiTinymce) {
                expression = scope.$eval(attrs.uiTinymce);
            } else {
                expression = {};
            }
            angular.extend(options, uiTinymceConfig, expression);
            setTimeout(function() {
                tinymce.init(options);
            });


            ngModel.$render = function() {
                if (!tinyInstance) {
                    tinyInstance = tinymce.get(attrs.id);
                }
                if (tinyInstance) {
                    tinyInstance.setContent(ngModel.$viewValue || '');
                }
            };
        }
    };
}]);

///////////////////////////////////////////////////////////////
////////////////////////// Tarifas
///////////////////////////////////////////////////////////////

app.controller('tarifasController', function ($scope, $uibModal, $http, $rootScope, sweet, DTOptionsBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(4)
        .withOption('bLengthChange', true);

    $scope.tarifas = [];
    $http.get('/bluebox/tarifas').
    success(function(data, status, headers, config) {
        $scope.tarifas = data;
    });

    $scope.initTarifas = function() {
        $http.get('/bluebox/tarifas').
        success(function(data, status, headers, config) {
            $scope.tarifas = data;
        });
    };

    $scope.addTarifas = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modalTarifas.html',
            controller: 'ModalTarifaCtrl',
            size: 'lg'

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.editTarifa = function (data) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modaTarifasEdit.html',
            controller: 'ModalEditTarifaCtrl',
            size: 'md',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.deleteTarifas = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar esta Descripcion',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/tarifas/' + index)
                    .success(function() {
                        $scope.initTarifas();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };

    $rootScope.$on("tarifas", function(){
        $scope.initTarifas();
    });

});

app.controller('ModalTarifaCtrl', function ($scope, $uibModalInstance, $http, $rootScope, sweet, $rootScope) {


    $scope.save = function (form) {
        $scope.submitted = true;
        $scope.content = {
            contenido: $scope.contenido
        };
        if (form.$valid) {
            $http.post('/bluebox/tarifas', $scope.content)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("tarifas", {});
                    sweet.show('Exitoso', 'success');
                });
            $uibModalInstance.close();
        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditTarifaCtrl', function ($scope, $uibModalInstance, $http, $rootScope, sweet, data) {

    $scope.tarifas = data;

    $scope.edit = function (form) {

        $scope.submitted = true;
        if (form.$valid) {
            $scope.content = {
                contenido: $scope.contenido
            };
            $http.put('/bluebox/tarifas/' + $scope.tarifas.id, $scope.content)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("categorias", {});
                    sweet.show('Exitoso', 'success');
                });

            $uibModalInstance.close();

        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


///////////////////////////////////////////////////////////////
////////////////////////// Anuncios
///////////////////////////////////////////////////////////////

app.controller('anuncioCtrl', function ($scope, $uibModal, $http, $rootScope, sweet, DTOptionsBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(4)
        .withOption('bLengthChange', true);


    $scope.articulos = [];
    $scope.initAnuncios = function() {
        $http.get('/bluebox/anuncio').
        success(function(data, status, headers, config) {
            $scope.articulos = data;
        });
    };

    $scope.addAnuncio = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modalAnuncio.html',
            controller: 'ModalAnuncioCtrl',
            size: 'lg'

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.editAnuncio = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent1.html',
            controller: 'ModalEditAnuncioCtrl',
            size: 'lg',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.deleteAnuncio = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar este Anuncio',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/anuncios/' + index)
                    .success(function() {
                        $scope.initArticulos();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };

    $rootScope.$on("anuncio", function(){
        $scope.initAnuncios();
    });

    $scope.detailsArticulo = function(id) {
        console.log("/bluebox/anuncio/"+ id+"");

        window.location = "/bluebox/anuncio/"+ id+"";

    };


});
app.controller('ModalAnuncioCtrl', function ($scope, $uibModalInstance, $http, $rootScope, sweet, $rootScope, Upload, $timeout) {

    $scope.categorias = [];
    $scope.subcategorias = [];

    $http.get('/bluebox/categorias').
    success(function(data, status, headers, config) {
        $scope.categorias = data;
    });

    $http.get('/bluebox/subcategorias').
    success(function(data, status, headers, config) {
        $scope.subcategorias = data;
    });

    $scope.myDatetimeRange = {
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


    $scope.myDatetimeLabels = {

    };

    $scope.today = function() {
        $scope.dt = new Date();
        $scope.dt1 = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
        $scope.dt1 = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
        $scope.dt1 = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.format1 = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };

    $scope.uploadPic = function(file, file1, file2) {
        console.log($scope.tipo);
        $scope.isBusy = true;
        file.upload = Upload.upload({
            url: '/bluebox/articulos',
            data: {audio: file1, imagen:file, categoria: $scope.categoria.id, tipo: $scope.tipo.id, thumbs:file2, titulo: $scope.titulo, pie: $scope.texto,
                contenido: $scope.from_one, video: $scope.video, status: $scope.status }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile1   = '';
                    $scope.picFile2   = '';
                    $scope.picFile3   = '';
                    $uibModalInstance.close();
                    sweet.show('Exitoso', 'success');

                    $rootScope.$emit("articulos", {});



                }
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditAnuncioCtrl', function ($scope, $uibModalInstance, variable, $http, $rootScope, sweet) {

    $scope.categoria = variable.categoria;
    $scope.tipo = variable.tipo;
    $scope.titulo = variable.titulo;
    $scope.texto = variable.pie;
    $scope.video = variable.video;
    $scope.status = variable.status;
    $scope.from_one = variable.contenido;

    console.log($scope.from_one);

    $scope.uploadPic = function(file) {
        $scope.isBusy = true;
        file.upload = Upload.upload({
            url: '/bluebox/articulos/'+ variable.id,
            data: {audio: file1, imagen:file, categoria: $scope.categoria.id, tipo: $scope.tipo.id, thumbs:file2, titulo: $scope.titulo, pie: $scope.texto,
                contenido: $scope.from_one, video: $scope.video, status: $scope.status }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile2   = '';
                    $rootScope.$emit("articulos", {});
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
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

/*
 Humor Controller
 */

app.controller('humorCtrl', function ($scope, $uibModal, $http, $rootScope, sweet, DTOptionsBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(4)
        .withOption('bLengthChange', true);

    $scope.humores = [];
    $scope.initHumor = function() {
        $http.get('/bluebox/humores').
        success(function(data, status, headers, config) {
            $scope.humores = data;
        });
    };

    $scope.addHumor = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modalHumor.html',
            controller: 'ModalHumorCtrl',
            size: 'lg'

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.editHumor = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'editModalHumor.html',
            controller: 'ModalEditHumorCtrl',
            size: 'lg',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.deleteHumor = function(index) {
        $scope.loading = true;

        sweet.show({
            title: 'Confirmar',
            text: 'Borrar este Articulo',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/humores/' + index)
                    .success(function() {
                        $scope.initHumor();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };

    $rootScope.$on("humor", function(){
        $scope.initHumor();
    });

});

app.controller('ModalHumorCtrl', function ($scope, $uibModalInstance, $http, $rootScope, sweet, $rootScope, Upload, $timeout) {


    $scope.uploadPic = function(file) {
        $scope.isBusy = true;
        file.upload = Upload.upload({
            url: '/bluebox/humores',
            data: {imagen: file, copy_imagen:file, status: $scope.status }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile2   = '';

                    $uibModalInstance.close();
                    sweet.show('Exitoso', 'success');

                    $rootScope.$emit("humor", {});



                }
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('ModalEditHumorCtrl', function ($scope, $uibModalInstance, variable, $http, $rootScope, Upload, sweet, $timeout) {

    $scope.status = variable;
    $scope.picFile2 = variable.imagen;
    console.log(variable);

    $scope.uploadPic = function(file) {
        $scope.isBusy = true;
        file.upload = Upload.upload({
            url: '/bluebox/humores/'+ variable.id,
            data: {imagen: file, copy_imagen:file, status: $scope.status }
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile2   = '';
                    $rootScope.$emit("humor", {});
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
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('videoCtrl', function ($scope, $uibModal, $http, $rootScope, sweet, DTOptionsBuilder) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(4)
        .withOption('bLengthChange', true);

    $scope.videos = [];
    $scope.initVideos = function() {
        $http.get('/bluebox/video').
        success(function(data, status, headers, config) {
            $scope.videos = data;
        });
    };

    $scope.addVideo = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalVideoCtrl',
            size: 'lg'

        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };


    $scope.editVideo = function (variable) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent1.html',
            controller: 'ModalEditVideoCtrl',
            size: 'md',
            resolve: {
                variable: function () {
                    return variable;
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.deleteVideo = function(index) {
        $scope.loading = true;
        console.log(index);
        sweet.show({
            title: 'Confirmar',
            text: 'Borrar este Articulo',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, Borrar',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                // var user = $scope.user[index];
                $http.delete('/bluebox/video/' + index)
                    .success(function() {
                        $scope.initVideos();
                    });
                sweet.show('Borrado!', 'Ha sido Borrado con Exito.', 'success');
            }else{
                sweet.show('Cancelar', ':)', 'error');
            }
        });
    };

    $rootScope.$on("videos", function(){
        $scope.initVideos();
    });

});
app.controller('ModalVideoCtrl', function ($scope, $uibModalInstance, $http, $rootScope, sweet, $rootScope) {
    $scope.save = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            $http.post('/bluebox/video', $scope.video)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("videos", {});
                    sweet.show('Exitoso', 'success');
                });
            $uibModalInstance.close();
        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('ModalEditVideoCtrl', function ($scope, $uibModalInstance, variable, $http, $rootScope, sweet) {

    $scope.video = variable;

    //console.log(user);

    $scope.edit = function (form) {

        $scope.submitted = true;
        if (form.$valid) {
            $http.put('/bluebox/video/' + variable.id, $scope.video)
                .success(function(data, status, headers, config) {
                    $rootScope.$emit("videos", {});
                    sweet.show('Exitoso', 'success');
                });

            $uibModalInstance.close();

        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('userProfileController', function ($scope, $http, $uibModal, sweet, $rootScope) {




    $scope.server = null;
    $scope.animationsEnabled = true;

    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalAddUserImageCtrl',
            size: 'xs'
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $rootScope.$on("CallParentMethod", function(){
        $scope.init();
    });

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});

app.controller('ModalAddUserImageCtrl', function($scope, $http, $uibModalInstance, $uibModal, $rootScope, $timeout, Upload, sweet){


    $scope.user = [];
    $scope.server = null;

    $scope.init = function() {
        $http.get('/bluebox/usuario_cms/1').
        success(function(data, status, headers, config) {
            $scope.user = data;
            $scope.user.password = data.re_password;
        });
    };
    $scope.init();

    $scope.uploadPic = function(file) {

        if(file !== undefined){


        file.upload = Upload.upload({
            method: 'POST',
            url: '/bluebox/updatePerfil/' + $scope.user.id,
            data: {archivo: file, copy_archivo: file, login: $scope.user.login, nombre: $scope.user.nombre, email: $scope.user.email,
                   password: $scope.user.password}
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                if(file.result){

                    $scope.picFile2   = '';
                    sweet.show('Exitoso', 'success');
                    window.location.reload();
                    $uibModalInstance.close();
                    // $rootScope.$emit("CallParentMethod", {});

                }
            });
        }, function (response) {
            if (response.status > 0)
                $scope.server = response.data.message;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

    }else {
            console.log($scope.user);
            $http.put('/bluebox/usuario_cms/' + $scope.user.id, $scope.user)
                .success(function (data, status, headers, config) {
                    $rootScope.$emit("CallParentMethod", {});
                    sweet.show('Exitoso', 'success');
                    $uibModalInstance.close();
                    window.location.reload();

                })
                .error(function(data, status, headers, config) {
                    $scope.server = data.message;
                    console.log($scope.server);
                });
        }
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
