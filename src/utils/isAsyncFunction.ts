export default function isAsyncFunction(fn: () => unknown): boolean {
  return fn.constructor.name === 'AsyncFunction';
}
