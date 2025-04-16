export interface filterObj {
    type: 'text' | 'dropdown';
    key: string; // for API payload
    placeholder: string;
    value: '',
    options?: { label: string, value: any }[]; // if dropdown
  }