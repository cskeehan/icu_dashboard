define( 'dashboard',function () {
    
    function dashboard() {
        dashboardController.$inject = ['$rootScope', 'qlikService'];
        function dashboardController($rootScope,qlikService) {
            var vm = this;
            vm.changeSel = changeSel;
            vm.toggleOpen = toggleOpen;

            var apps;

            $rootScope.$on('apps-loaded',function(a){
                apps = qlikService.getApps();
            init();
            })
           
            function init() {
                // objects from app1
                apps[0].clearAll().then(function(a){
                    // qlikApp.getObject('monthYear-filter', 'gjqBtfF');
                    apps[0].createList({
                            "qDef": {"qFieldDefs": ["Department Group"]},
                                "qInitialDataFetch": [{
                                    qTop : 0,
                                    qLeft : 0,
                                    qHeight : 100,
                                    qWidth : 1
                                }]
                            },
                                parseDepList
                               
                            )
                            apps[0].createList({
                                "qDef": {"qFieldDefs": ["MonthYear"]},
                                    "qInitialDataFetch": [{
                                        qTop : 0,
                                        qLeft : 0,
                                        qHeight : 100,
                                        qWidth : 1
                                    }]
                                },parseYearList)
                                apps[0].getObject('readmissions','ttVvT');
                                apps[0].getObject('patient-hyp','gwVrVqm');
                                apps[0].getObject('icu-mortalities','cEYdus');
                                apps[0].getObject('daily-admissions','KsPmh');
                                apps[0].getObject('CurrentSelections', 'CurrentSelections');
                   
                }) 
                
                // app 3
                apps[2].clearAll().then(function(a){
                    apps[2].getObject('central-line','FZQueRw');
                })
              
    
                // app2
                apps[1].clearAll().then(function(a){
                    apps[1].getObject('unplanned','gDvXEJ');
                    apps[1].getObject('extubations','vhc');
                    apps[1].getObject('vap','GaCPDqg');
                })

                // app4
                apps[3].clearAll().then(function(a){
                    apps[3].getObject('vte','Nuud'); //,{noInteraction: true});
                    apps[3].getObject('filter', 'qtmgcbM')
                })

                // init create list
                // apps[0].createList({
                //     "qDef": {"qFieldDefs": ["Department Group"]},
                //         "qInitialDataFetch": [{
                //             qTop : 0,
                //             qLeft : 0,
                //             qHeight : 100,
                //             qWidth : 1
                //         }]
                //     },parseDepList)

                    // init create list
                   
                }
                
                function changeSel(field, val){
                    // Displays the returned field and value to the console for testing purposes
                    console.log(field,' ', val)
                    let sel;
                    // For MonthYear selections, Qlik will only respond to the numerical value of the date
                    // So if the field is MonthYear, use the num key of the object
                    if(field=='MonthYear'){
                        sel = val.num
                    // Otherwise use the name key of the object
                    }else{
                        sel = val.name
                    }
                    apps[0].field(field).selectValues([sel], true, true);
                    apps[1].field(field).selectValues([sel], true, true);
                    apps[2].field(field).selectValues([sel], true, true);
                    apps[3].field(field).selectValues([sel], true, true);
                }
               
                // Allows the dropdown filters and KPIs to be displayed 
                function toggleOpen(div){
                    $('.'+div).toggle();
                }
                
                // function that grabs all department group options
                function parseDepList(sel){
                    let list = sel.qListObject.qDataPages[0].qMatrix;
                    // initialize an array
                    let depOptions = []
                    list.forEach(function(opt){
                        depOptions.push({name:opt[0].qText, state: opt[0].qState})
                    })
                    // exports 
                    vm.depOptions = depOptions
                }
                
                // function that grabs all month year options
                function parseYearList(sel){
                   
                    // set list to the qMatrix in the Qlik hypercube that contains all month year options
                    let list = sel.qListObject.qDataPages[0].qMatrix;
                    // initialize an array
                    let yearOptions = []
                    list.forEach(function(opt){
                        yearOptions.push({name:opt[0].qText, num: opt[0].qNum, state: opt[0].qState})
                    })
                    // exports
                    vm.yearOptions = yearOptions
                }

                // clears filters from all apps once clear button is clicked
                $("#ClearAll").click(function() {

                    apps[0].clearAll();
                    apps[1].clearAll();
                    apps[2].clearAll();
                    apps[3].clearAll();
                    
                          });
        }
        return {
            bindings: {},
            controller: dashboardController,
            controllerAs: 'cf',
            templateUrl: 'app/components/dashboard/dashboard.component.html'
        }
    }

    return dashboard();
});



