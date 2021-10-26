export interface AbortableFetch {
  abort: () => void;
  ready: Promise<Response>;
}

export function abortableFetch(request: RequestInfo, opts: RequestInit = {}): AbortableFetch {
  const controller = new AbortController();
  const { signal } = controller;

  return {
    abort: (): void => controller.abort(),
    ready: fetch(request, { ...opts, signal })
  };
}
