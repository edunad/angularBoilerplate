
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { RouterModule } from '@angular/router';

import { AppComponent }   from './scripts/app.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([], {
          useHash: true
        })
    ],
    providers: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

//enableProdMode(); // Enable production mode
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
