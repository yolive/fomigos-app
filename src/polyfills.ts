// Polyfill para Navigator LockManager
if (!('locks' in navigator)) {
  // @ts-ignore
  navigator.locks = {
    request: (name: string, options: any, callback: Function) => {
      return Promise.resolve(callback());
    }
  };
}