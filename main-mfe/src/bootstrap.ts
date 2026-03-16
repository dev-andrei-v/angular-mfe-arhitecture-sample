import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, applicationsIcon, userIcon, shoppingBagIcon, displayIcon, dashboardIcon, warningStandardIcon } from '@cds/core/icon';

ClarityIcons.addIcons(applicationsIcon, userIcon, shoppingBagIcon, displayIcon, dashboardIcon, warningStandardIcon);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
