import { Component } from '@angular/core'

@Component({
  selector: 'ngx-root',
  template: `
    <h1>{{ title }}</h1>
  `
})
export class AppComponent {
  title = 'Welcome to Angular!'
}
