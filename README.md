[![Build Status](https://travis-ci.org/itigoore01/ngx-type-safe-reactive-form.svg?branch=master)](https://travis-ci.org/itigoore01/ngx-type-safe-reactive-form)
[![npm version](https://badge.fury.io/js/ngx-type-safe-reactive-form.svg)](https://badge.fury.io/js/ngx-type-safe-reactive-form)

# NgxTypeSafeReactiveForm

## Installation 

```bash
npm install --save ngx-type-safe-reactive-form
```

## Usage

Same as the original *Reactive Forms*, but it has a type.  
See [https://angular.io/guide/reactive-forms](https://angular.io/guide/reactive-forms)

```typescript
import { TypeSafeFormBuilder } from 'ngx-type-safe-reactive-form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {

  readonly form = this.formBuilder.group({
    username: '',
    password: '',
    rememberMe: false,
  });

  constructor(
    private formBuilder: TypeSafeFormBuilder
  ) { }

}
```

[Live example](https://stackblitz.com/edit/ngx-type-safe-reactive-form-example)
