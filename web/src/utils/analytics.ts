export function logEvent(event: string, params: object = {}) {
  // TODO: Set up an analytics library
  console.log('Event log:', event, params);

  if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    window.firebase?.analytics().logEvent(event, params);
  }
}
