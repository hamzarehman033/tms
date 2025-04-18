export interface filterObj {
    type: 'text' | 'dropdown';
    key: string; // for API payload
    placeholder: string;
    value: string,
    options?: { label: string, value: any }[]; // if dropdown
  }