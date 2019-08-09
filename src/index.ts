import "zone.js/dist/zone";

import { enableProdMode } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";

import { AppModuleNgFactory } from "./app/app.module.ngfactory";

enableProdMode();

platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .catch(err => console.error(err));