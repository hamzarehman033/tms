import { ValidatorFn } from "@angular/forms";

export interface filterObj {
    type: 'text' | 'dropdown';
    key: string; // for API payload
    placeholder: string;
    value: string;
    options?: { label: string, value: any }[]; // if dropdown
  }

  export interface modalObj {
    type: 'text' | 'dropdown' | 'date';
    key: string; // for API payload
    placeholder: string;
    value: string;
    options?: { label: any, value: any }[]; // if dropdown
    hidden?: boolean;
    validators?: ValidatorFn[];
  }