import { Injectable } from '@angular/core';
import {
  FormBuilder as NgFormBuilder,
  AbstractControlOptions as NgAbstractControlOptions,
  FormGroup as NgFormGroup,
  ValidatorFn as NgValidatorFn,
  AsyncValidatorFn as NgAsyncValidatorFn,
  FormControl as NgFormControl,
  FormArray as NgFormArray,
  AbstractControl as NgAbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DeepPartial, Overwrite, Primitive } from './type-helpers';

export type TypedValidatorFn<TControl extends TypedAbstractControl<any>> = (control: TControl) => ReturnType<NgValidatorFn>;

export type TypedAsyncValidatorFn<TControl extends TypedAbstractControl<any>> = (control: TControl) => ReturnType<NgAsyncValidatorFn>;

export type TypedAbstractControlOptions<TControl extends TypedAbstractControl<any>> = Overwrite<NgAbstractControlOptions, {
  validators?: TypedValidatorFn<TControl> | TypedValidatorFn<TControl>[] | null;
  asyncValidators?: TypedAsyncValidatorFn<TControl> | TypedAsyncValidatorFn<TControl>[] | null;
}>;

export type TypedAbstractControl<TValue> = Overwrite<NgAbstractControl, {
  value: TValue;
  valueChanges: Observable<TValue>;
  validator: TypedValidatorFn<TypedAbstractControl<TValue>> | null;
  asyncValidator: TypedAsyncValidatorFn<TypedAbstractControl<TValue>>;
  setValue(value: TValue, options?: object): void;
  patchValue(value?: DeepPartial<TValue> | TValue, options?: object): void;
  reset(value?: TValue, options?: object): void;
  get(path: Array<string | number> | string): TypedAbstractControl<any> | null;
  setValidators(newValidator: TypedValidatorFn<TypedAbstractControl<TValue>> | TypedValidatorFn<TypedAbstractControl<TValue>>[]): void;
  setAsyncValidators(newValidator: TypedAsyncValidatorFn<TypedAbstractControl<TValue>> | TypedAsyncValidatorFn<TypedAbstractControl<TValue>>[]): void;
}>;

export type TypedFormControl<TValue> = Overwrite<NgFormControl, TypedAbstractControl<TValue> & {
  setValue(value: TValue, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }): void;
  patchValue(value: TValue, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }): void;
  reset(value?: TValue, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }): void;
  registerOnChange(fn: ((value: TValue) => void)): void;
}>;

export type TypedFormArray<TControl extends TypedAbstractControl<any>, TValue extends Array<any> = TControl['value'][]> = Overwrite<NgFormArray, TypedAbstractControl<TValue> & {
  controls: TControl[];

  setValue(value: TValue, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;
  patchValue(value: TValue, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;
  reset(value?: TValue, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;
  getRawValue(): TValue;

  at(index: number): TControl;
  insert(index: number, control: TControl): void;
  push(control: TControl): void;
  setControl(index: number, control: TControl): void;
}>;

export type TypedFormGroup<TControls extends { [key: string]: TypedAbstractControl<any> }, TValue extends object = { [P in keyof TControls]: TControls[P]['value'] }> = Overwrite<NgFormGroup, TypedAbstractControl<TValue> & {
  controls: TControls;
  setValue(value: TValue, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;

  patchValue(value: DeepPartial<TValue>, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;
  reset(value?: TValue, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }): void;
  getRawValue(): TValue;
}>;

export type CreateFormType<TConfig> =
  TConfig extends TypedFormControl<infer TValue> ? TypedFormControl<TValue> :
  TConfig extends TypedFormGroup<infer TControls> ? TypedFormGroup<TControls> :
  TConfig extends TypedFormArray<infer TControl> ? TypedFormArray<TControl> :
  TConfig extends [infer TValue, any?, any?] ? TypedFormControl<TValue> :
  TConfig extends { value: infer TValue; disabled: boolean; } ? TypedFormControl<TValue> :
  TypedFormControl<TConfig>;

export type ControlConfig<T extends ControlConfig<any> = ControlConfig<any>> = { value: any; disabled: boolean; } |
  [any | { value: any; disabled: boolean; }, TypedValidatorFn<CreateFormType<T>>] |
  Primitive |
  object;

@Injectable({
  providedIn: 'root',
  useClass: NgFormBuilder
})
export abstract class TypeSafeFormBuilder {

  abstract group<TConfig extends Record<string, ControlConfig>>(
    controlsConfig: TConfig,
    options?: TypedAbstractControlOptions<TypedFormGroup<{ [P in keyof TConfig]: CreateFormType<TConfig[P]>; }>> | NgAbstractControlOptions | { [key: string]: any; } | null
  ): TypedFormGroup<{ [P in keyof TConfig]: CreateFormType<TConfig[P]>; }>;

  abstract array<TConfig extends ControlConfig>(
    controlsConfig: TConfig[],
    validatorOrOpts?: TypedValidatorFn<TypedFormArray<CreateFormType<TConfig>>> | TypedValidatorFn<TypedFormArray<CreateFormType<TConfig>>>[] | TypedAbstractControlOptions<TypedFormArray<CreateFormType<TConfig>>> |
      NgValidatorFn | NgValidatorFn[] | NgAbstractControlOptions | null,
    asyncValidator?: TypedAsyncValidatorFn<TypedFormArray<CreateFormType<TConfig>>> | TypedAsyncValidatorFn<TypedFormArray<CreateFormType<TConfig>>>[] |
      NgAsyncValidatorFn | NgAsyncValidatorFn[] | null
  ): TypedFormArray<CreateFormType<TConfig>>;

  abstract control<TModel>(
    formState: TModel | { value: TModel; disabled: boolean },
    validatorOrOpts?: TypedValidatorFn<TypedFormControl<TModel>> | TypedValidatorFn<TypedFormControl<TModel>>[] | TypedAbstractControlOptions<TypedFormControl<TModel>> |
      NgValidatorFn | NgValidatorFn[] | NgAbstractControlOptions | null,
    asyncValidator?: TypedAsyncValidatorFn<TypedFormControl<TModel>> | TypedAsyncValidatorFn<TypedFormControl<TModel>>[] |
      NgAsyncValidatorFn | NgAsyncValidatorFn[] | null
  ): TypedFormControl<TModel>;

}
