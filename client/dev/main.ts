import { bootstrap }    from '@angular/platform-browser-dynamic';
// import { enableProdMode } from '@angular/core';
import { provide, ReflectiveInjector } from '@angular/core';

import { AppComponent } from './app.component';
import { QueryService, MockDataService } from './services/services';
import { CService } from './subfolder/c.service';
// enableProdMode();
bootstrap(AppComponent);



// let ServiceFactory = (q: QueryService, m: MockDataService) => {
//   return new CService(q, m);
// }

// let FacDef = {
//    useFactory: ServiceFactory,
//    deps: [QueryService, MockDataService]
// };
// let MyServiceProvider = provide(FacDef, FacDef);
// bootstrap(AppComponent, [MyServiceProvider, QueryService, MockDataService]);




