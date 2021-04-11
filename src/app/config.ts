import {InjectionToken} from '@angular/core';


export interface AppConfig {
    apiUrl: string;
    courseCacheSize: number;
    // caching a certain amount of courses
}


export const APP_CONFIG: AppConfig = {
    apiUrl: 'http://localhost:9000',
    courseCacheSize: 10
};

export const CONFIG_TOKEN =
    // everything that gets injected anywhere on an Angular application has an associated injection token
    new InjectionToken<AppConfig>('CONFIG_TOKEN',
        // the first parameter, is the unique string that identifies our token, better to use the same name
        {
            providedIn: 'root',
          // this makes a global injectable, accessible at the root of the application
            factory: () => APP_CONFIG
        });
        // this optional second argument makes this tree-shakeable
        // means that it is available when we need it and is only included in the bundle if they are injected otherwise it will not be
        // injected so we will have a smaller bundle and more performant application



// a service that contains plain JS object that contains application wide configuration
