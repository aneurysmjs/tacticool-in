/* eslint-disable @typescript-eslint/no-explicit-any */

export type NavLink = {
  id: number;
  path: string;
  name: string;
};

export type NavLinks = Array<NavLink>;

export type valueof<T> = T[keyof T];

export interface BaseAction {
  type: string;
}

export interface AnyAction extends BaseAction {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

export interface Action<T = any> extends AnyAction {
  payload?: T;
  error?: Error | string;
}
