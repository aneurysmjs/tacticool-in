/* eslint-disable @typescript-eslint/no-explicit-any */
export type FieldValues = Record<string, any>;

export type FieldElement<TFieldValues extends FieldValues = FieldValues> =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | CustomElement<TFieldValues>;

export type CustomElement<TFieldValues extends FieldValues> = {
  checked?: boolean;
  files?: FileList | null;
  focus?: () => void;
  name: string;
  options?: HTMLOptionsCollection;
  type?: string;
  value?: any;
};
