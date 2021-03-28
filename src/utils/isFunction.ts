export default (element: unknown): element is Function => typeof element === 'function';
