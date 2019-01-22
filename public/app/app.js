// initalize variables
var qlikApp;
var qlikApp2;
var qlikApp3;
var gQlik;

require.config({
    baseUrl: "https://qlik.jefferson.edu/adfsp/resources",
    paths: {
        "angularRoute": "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.18/angular-ui-router.min"
    }
});

// loading qlikJS
require(["js/qlik"], function (qlik) {
    // creating the angular app and bootstrapping
    require(["angular", 'angularRoute', "routes", 'qlikService', 'dataService', 'navBar','footer','dashboard'],
        function (angular, uiRoute, routes, qlikService, dataService, navBar, footer, dashboard) {
            let config = {
                host: 'qlik.jefferson.edu',
                prefix: '/adfsp/',
                port: '443',
                isSecure: true
            };
            // load components
            let app = angular.module('mashup-app', ['ui.router']);
            app.config(routes);
            app.component('navBar', navBar);
            app.component('dashboardComp', dashboard);
            app.component('footerComponent', footer);
            app.service('dataService', dataService);
            app.service('qlikService', qlikService);
            app.run(['qlikService',function(qlikService){
                qlikService.openApps(qlik,'ef547814-9f78-48d9-a5dd-28a6dd3bad1b','725cb039-513b-4744-a3c5-3ed848fc8a05',
                'ecfda3ff-4f33-4126-bad2-1cde0d07ce4e', 'e31cbe41-9d9a-4c31-9bfa-8e33151a3685', config)
            }]);
            angular.bootstrap(document, ["qlik-angular", "mashup-app"]);
            // gQlik = qlik;
            // qlikApp = qlik.openApp('ef547814-9f78-48d9-a5dd-28a6dd3bad1b', config)
            // qlikApp2 = qlik.openApp('725cb039-513b-4744-a3c5-3ed848fc8a05', config)
            // qlikApp3 = qlik.openApp('ecfda3ff-4f33-4126-bad2-1cde0d07ce4e', config)
        }
    )
});