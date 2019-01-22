// qlikService is not used
define('qlikService', function () {

    qlikService.$inject = ['$rootScope']
    function qlikService($rootScope) {

        var service = this;
        var app1;
        var app2;
        var app3;
        var app4;
        let app;
        let qlik;
        let config;
        service.setQlik = setQlik
        service.getApp = getApp
        service.openApp = openApp;
        service.openApps = openApps;
        service.getApps = getApps;

        function openApp(qlik, appId, config) {
            this.app = qlik.openApp(appId, config)
            this.config = config;
            this.qlik = qlik;
        }

        function openApps(qlik, appId_1, appId_2, appId_3, appId_4, config) {
            app1 = qlik.openApp(appId_1, config)
            app1.model.waitForOpen.promise.then(function(a){
                app2 = qlik.openApp(appId_2,config);
                app2.model.waitForOpen.promise.then(function(a){
                    app3 = qlik.openApp(appId_3,config);
                    app3.model.waitForOpen.promise.then(function(a){
                        app4 = qlik.openApp(appId_4,config);
                        app4.model.waitForOpen.promise.then(function(a){
                            $rootScope.$broadcast('apps-loaded')
                        })
                    })
                })
            })
            aConfig = config;
            aQlik = qlik;
        }

        function setQlik(qlikJS) {
            this.qlik = qlikJS;
        }

        function getApps(){
            return [app1,app2,app3,app4]
        }

        function getApp() {
            return this.app;
        }
    }
    return qlikService;
})