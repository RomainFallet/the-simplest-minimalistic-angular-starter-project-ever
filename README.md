# The simplest minimalistic Angular starter project ever

**For Angular 8.2.0**

## This repository is for you if:

-   You are a beginner who want to discover the world of Angular in the most simplistic way.
-   You are, like me, sick of CLI & complex tool configuration.
-   You are tired of old tutorials that do not work anymore because of unspecified softwares versions.
-   You want to understand fully what you're doing and create an Angular project completely from scratch.
-   You need an easy jumped-in configuration for small projects.

I am doing this because I don't like how the Angular framework is teached (and JavaScript front-end frameworks in general). Front-end JavaScript framework (especially Angular) are also considered as a bloated nightmare of dependencies, tools and configurations.

Let's change that!

## Requirements

-   NodeJS@10
-   NPM@6

_Be sure to use the same major version in order to have the same result._

## Jumping straight in

```
git clone https://github.com/RomainFallet/the-simplest-minimalistic-angular-starter-project-ever.git
```

Want to understand exactly what you are doing? Just follow what's next to produce the exact same project.

## What do we need for Angular ?

You first need a `./src` folder ("src" stands for "source", this is by convention where we put our source code) with 3 files:

![Capture du 2019-08-09 11-12-01](https://user-images.githubusercontent.com/6952638/62768307-dc931c00-ba96-11e9-934c-0087a7e98921.png)

Yes, Angular does not need more than 3 TypeScript files of source code to start. You can now argue with everyone saying that it's a bloated framework.

**Content of `./src/index.ts`:**

```typescript
import "zone.js/dist/zone";

import { enableProdMode } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";

import { AppModuleNgFactory } from "./app/app.module.ngfactory";

enableProdMode();

platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .catch(err => console.error(err));
```

**Content of `./src/app/app.module.ts`:**

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

**Content of `./src/app/app.component.ts`:**

```typescript
import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <h1>Welcome to {{ title }}!</h1>
    `
})
export class AppComponent {
    title = "Angular";
}
```

As you can see, we are importing 3 dependencies:

-   **`zone.js`**, a dependency needed for Angular to detect changes in your page
-   **`@angular/core`**, the Angular core framework, obviously
-   **`@angular/platform-browser`**, a dependency to make our application available in the browser (because Angular can work in others contexts than the browser)

There are 2 more dependencies needed for Angular to work:

-   **`@angular/common`**, a dependency that implements basic Angular directives and pipes, such as NgIf, NgFor, DecimalPipe, and so on.
-   **`rxjs`**, a dependency that implement Observables (it's an asynchronous programming paradigm related to data streams and propagation of changes, Angular is using it).

You can create your `./package.json` file like this:

**Content of `./package.json`:**

```json
{
    "name": "the-simplest-minimalistic-angular-starter-project-ever",
    "version": "1.0.0",
    "dependencies": {
        "@angular/common": "8.2.0",
        "@angular/core": "8.2.0",
        "@angular/platform-browser": "8.2.0",
        "rxjs": "6.5.2",
        "zone.js": "0.10.1"
    }
}
```

_Be sure to use the same exact versions in order to have the same result._

And then, run:

```
npm install
```

If you have already a `./package.json` file, you can add them by using:

```
npm install --save-exact @angular/common@8.2.0 @angular/core@8.2.0 @angular/platform-browser@8.2.0 zone.js@0.10.1 rxjs@6.5.2
```

You'll end up with a project structure like this:

![Capture du 2019-08-09 12-06-26](https://user-images.githubusercontent.com/6952638/62771707-216e8100-ba9e-11e9-9ce3-f22e91645cfa.png)

The `./package.json` file contains the list of your dependencies, and the `./node_modules` folder contains your depencies once installed with the `npm install` command.

## What's next?

If we want to build for the web, we need a web page. Right?

Let's create an `./index.html` file at the root of the project:

![Capture du 2019-08-09 17-14-07](https://user-images.githubusercontent.com/6952638/62789412-25fc5f00-bac9-11e9-934d-8280117c8583.png)

**Content of ./index.html:**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>My App</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <app-root></app-root>
        <script src="./dist/main.js"></script>
    </body>
</html>
```

Here we are two things:

-   The `<app-root></app-root>` tag, this is the tag where Angular will put our application.
-   The `<script src="./dist/main.js"></script>` tag, this will simply load the JavaScript file that contains our application code from the `./dist` folder.

As you can see, our application needs a unique JavaScript file to work, but for now, we only have multiple TypeScript files. And we don't have a `./dist` folder yet.

We need to transpile our TypeScript files to JavaScript, and them, bundle them into one file, readable for the browser into a `./dist`folder.

## Installing TypeScript

In order to transpile your TypeScript code, you need only one thing: TypeScript. It's crazy, right?

Let's install it as a global dependency (Unix users will need to add `sudo` before this command):

```
npm install -g typescript@3
```

_Be sure to use the same major version in order to have the same result._

This will install the TypeScript core program and its Command Line Interface (CLI, aka the thing that you'll use in your terminal) at the same time.

## Configuring TypeScript

You'll then need to create a little configuration file for TypeScript. Let's create a file called `./tsconfig.json` at the root of your project.

**Content of `./tsconfig.json`:**

```json
{
    "compilerOptions": {
        "target": "ES2015",
        "module": "ES2015",
        "moduleResolution": "node",
        "strict": true,
        "experimentalDecorators": true
    },
    "include": ["./src/**/*.ts"]
}
```

Here are some explanations:

-   That `target` option allows us to specify in which version of [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) we want to transpile into (ECMAScript is the specification that standardize JavaScript).

    Choosing a target version is a balance between performance and compatibility. An old version will increase compatiblity with older browsers but also increase the amount code needed to implement TypeScript features so this will slow down code loading & execution.

    The `ES2015` version also known as `ES6` is currently supported by [all current browsers](https://caniuse.com/#feat=es6) in their latest versions and is a pretty recent version. So, this will be my choice.

-   The `module` option allows us to specify how TypeScript should transpile our TypeScript `import` and `export` statements. This is because, In JavaScript, before the [ES2015 module specification](https://caniuse.com/#feat=es6-module-dynamic-import), there is no way to import a JS file into another in the browser.

    The only way to load a JavaScript file in the browser was by using the `script` tag in the HTML page. Since TypeScript module specification is issued from the ES2015 specification, using `ES2015` value will transpile our imports as is, without any change.

-   The `moduleResolution` option allows use to specify which resolution algorithm TypeScript should use in order to find our dependencies types definitions (because TypeScript needs to find the type of each dependency to determine its shape, if not, it wouldn't be able to inform us if we don't use them properly and taht would be a shame because it's its main purpose).

    TypeScript now mimic the NodeJS resolution algorithm for better consistency and [recommend the `node` value](https://www.typescriptlang.org/docs/handbook/module-resolution.html).

-   The `strict` mode enables strict type checking during compilation.

-   The `experimentalDecorators` allows us to use Angular decorators safely.

-   The `include` option allows us to specify which files must be transpiled. Here we specify all our `.ts` files located under `./src` (we don't want to have files transpiled in `./node_modules` or elsewhere).

## Let's transpile with TypeScript compiler!

Be aware because it's a very difficult step, start a terminal, go into your project folder and run:

```
tsc
```

_"tsc" stands for "TypeScript Compiler"._

You should know have a `.js` file alongside each of your `.ts` files:

![Capture du 2019-08-09 17-47-09](https://user-images.githubusercontent.com/6952638/62791713-03b91000-bace-11e9-95c2-2f03c5306bac.png)

If you are doing things well, you should also have a beautiful error in the terminal:

![Capture du 2019-08-09 17-17-09](https://user-images.githubusercontent.com/6952638/62789585-87bcc900-bac9-11e9-839d-77eddd03e324.png)

We effectively are requesting this `./app/app.module.ngfactory` file at the line 6 of our `./src/index.ts` file and this file does not exist, that's why we get this error.

To understand why, take a look at the generated file, especially the template part:

**Content of `./src/app/app.component.js`:**

```javascript
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "@angular/core";
let AppComponent = class AppComponent {
    constructor() {
        this.title = "Angular";
    }
};
AppComponent = __decorate([
    Component({
        selector: "app-root",
        template: `
        <h1>Welcome to {{ title }}!</h1>
    `
    })
], AppComponent);
export { AppComponent };
```

Our TypeScript code is converted in regular JavaScript, but the template binding is intact, TypeScript did not transpile the binding of our `title` property into the `h1` tag. There is also no code instructing the browser to create and populate our `h1` tag.

This code will never work as expected in the browser. 

This is because we are not dealing with TypeScript stuffs here, but with Angular stuffs. Template binding is not a feature of TypeScript, it's an Angular feature.

We need the Angular compiler to transpile our template from the Angular syntax to regular JavaScript as well!

## Ok... so, let's transpile with Angular Compiler too!

You can install the Angular compiler as a global dependency (Unix users will need to add sudo before this command):

```
npm install -g @angular/compiler@8.2.0 @angular/compiler-cli@8.2.0
```

Unlike TypeScript, Angular has two separate modules for the compiler program and its CLI.

To compile your Angular templates, juste use:

```
ngc
```

_"ngc" stands for "Angular Compiler"._

The beauty of this, is that the Angular compiler is built on top of TypeScript, so using this command will transpile your `.ts` files and compile your Angular templates at the same time, so don't remove your TypeScript installation, it's a requirement of the Angular compiler.

Here is the result:

![Capture du 2019-08-09 17-49-03](https://user-images.githubusercontent.com/6952638/62791717-04ea3d00-bace-11e9-86b2-e1cb3876b02b.png)

If you look at our `./src/app/app.component.js` file, you should notice no difference, but you now have a new `.js` file that has the compiled version of our template:

**Content of `./src/app/app.component.ngfactory.js`:**

```javascript
import * as i0 from "@angular/core";
import * as i1 from "./app.component";
var styles_AppComponent = [];
var RenderType_AppComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_AppComponent, data: {} });
export { RenderType_AppComponent as RenderType_AppComponent };
export function View_AppComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["Welcome to ", "!"]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.title; _ck(_v, 1, 0, currVal_0); }); }
export function View_AppComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)), i0.ɵdid(1, 49152, null, 0, i1.AppComponent, [], null, null)], null, null); }
var AppComponentNgFactory = i0.ɵccf("app-root", i1.AppComponent, View_AppComponent_Host_0, {}, {}, []);
export { AppComponentNgFactory as AppComponentNgFactory };
```

Now that the `ngfactory.js` file is generated, we don't have error anymore, our index file can import it. The others `.json` files are only containing metadatas.

## Why do we need to bundle everything?

So now we have `.js` files, but we need to bundle them together.

Why we need that? Two reasons.

First, it would be annoying to reference each new file into a script tag in our HTML page each time we create a new component.

Secondly, as I said, TypeScript `import` and `export` statements are issued from the standard ECMAScript 2015 module specification but they are not part of it.

For example, in standard ECMAScript 2015 specification, you can import a `.js` file, but you can't import a dependency from your `./node_modules` with this syntax:

```typescript
import { NgModule } from "@angular/core"
```

This is a TypeScript syntax. In ECMAScript 2015, you need to explicitly import the `.js` file.

And when we import a dependency with TypeScript, its only role is to get the types definitions and provide its typing feature, it does not really import nor bundle anything.

That's why we just need to name the dependency so that TypeScript can search the types for us (according to the module resolution algorithm set up in `./tsconfig.json`).

So we definitely need another tool that will search the `.js` files behind our dependencies keywords and combine them with the rest of our code so that all of it can work properly.

For example, for `@angular/core`, it will be `./node_modules/@angular/core/bundles/core.umd.js`.

Without it, our code will simply not work at all.

## Bundling everything with Webpack

Webpack main purpose is to be a `.js` bundler, it will look for `import` statements in your files (that's why we use the `ES2015` value for the `module` property in our `./tsconfig.json` file), find the corresponding `.js` files and combine them with the rest of our code.

First, install Webpack globally (Unix users will need to add sudo before this command):

```
npm install -g webpack@4 webpack-cli@3
```

Like the Angular compiler, Webpack has two separate modules for its program and its CLI.

You'll then need to create a very complicated config file at the root of your project:

**Content of `./webpack.config.js`:**

```javascript
module.exports = {
    mode: "development",
    devtool: "source-map"
};
```

And, that's it.

-   The `mode` option tells Webpack to run in development mode, which is faster and therefore adapted for a development process.
-   The `devtool` option tells Webpack to create a source map, allowing us to debug our app in the browser more easily.

Webpack will look by default for your `./src/index.js` file and compile everything under `./dist/main.js`.

You simply have to run the command:
```
webpack
```
(You'll have some warnings in your terminal but it's OK.)

You'll have this:

![Capture du 2019-08-09 19-15-36](https://user-images.githubusercontent.com/6952638/62796679-15081980-bada-11e9-9c1c-77b4df30fd36.png)

You can now open your `./index.html` file in your favorite browser to see your beautiful app in action!

![Capture du 2019-08-09 19-18-10](https://user-images.githubusercontent.com/6952638/62796825-716b3900-bada-11e9-8dd6-d4090a574acc.png)

Isn't it glorious?

Well, even if it's only two commands, this will be quite repetitive to run them each time we want to see new changes of our app during the development process.

## Let's unlock the power of automation!

You will need once again a lot a configuration to achieve this. To automate the Angular/TypeScript compilation, just run:

```
ngc --watch
```

![Capture du 2019-08-09 19-27-28](https://user-images.githubusercontent.com/6952638/62797405-ef7c0f80-badb-11e9-8faf-c19c8a1995d0.png)

To automate the Webpack process, it will be as difficult as opening a new terminal and run:

```
webpack --watch
```

![Capture du 2019-08-09 19-28-41](https://user-images.githubusercontent.com/6952638/62797431-01f64900-badc-11e9-9fe1-d0c098f48b08.png)

Now, each time you'll update a `.ts` file, Angular will compile it into `.js` and then, Webpack will bundle all `.js` files again.

Now, you just have to reload your web page after each changes to see (it will not be instantly though, the compilation process takes some time).

## I now want a live reload!

But wouldn't it be better if the browser reloads itself once the Webpack bundling is finished? Automatically?

Of course, it would be! Let's do it with the `lite-server` package (Unix users will need to add `sudo` before this command):

```
npm install -g lite-server@2
```

The `lite-server` is built on top of [BrowserSync](https://www.browsersync.io/), a live server for static assets and adapt it for JavaScript applications.

Let's create a tiny configuration file at the root of the project:

**Content of `./bs-config.json`:**

```json
{
    "files": ["./index.html", "./dist/*.{css,js}"]
}
```

We simply instuct `lite-server` to only watch changes of our `./dist` folder (where Webpack bundle everything). It would work without it, but it will reload the browser at each compilation step, so it's a bit annoying.

To launch the live reload server, simply run in a new terminal:

```
lite-server
```

And we're done!

![Capture du 2019-08-09 19-46-06](https://user-images.githubusercontent.com/6952638/62798353-5bf80e00-bade-11e9-97e5-deb10d5b6c6d.png)

## Last step, the production build

Maybe you noticed that the `./dist/main.js` file generated by Webpack is very large. This is because we instruct Webpack to compile in development mode (this is faster). For a final production build, you only have to run:

```
webpack --mode=production
```

![Capture du 2019-08-09 19-49-30](https://user-images.githubusercontent.com/6952638/62798558-d1fc7500-bade-11e9-8f6a-36e5e4c2093d.png)

We have now a production build, ready to be deployed! To deploy your app, you only have to upload your `./index.html` and `./dist/main.js` files in the web server of your choice.
