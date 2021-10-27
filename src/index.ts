export interface AbortableFetch {
  abort: () => void;
  ready: Promise<Response>;
}

export function abortableFetch(request: RequestInfo, opts: RequestInit = {}): AbortableFetch {
  const controller = new AbortController();
  const { signal } = controller;

  return {
    abort: (): void => controller.abort(),
    ready: fetch(request, { ...opts, signal }).catch((reason) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (reason?.type === 'aborted') {
        return {} as Response;
      }
      return Promise.reject(reason);
    })
  };
}

export enum FetchType {
  CancelAndResend = 'CancelAndResend',
  Prevent = 'Prevent'
}

export class FetchPro {
  private client: AbortableFetch | null = null;

  public get ready(): Promise<Response> {
    if (this.client?.ready) {
      return this.client.ready;
    }
    return Promise.resolve({} as Response);
  }

  // eslint-disable-next-line no-useless-constructor
  constructor(public readonly type: FetchType) {}

  public abort(): void {
    if (this.client) {
      this.client.abort();
      this.client = null;
    }
  }

  public fetch(request: RequestInfo, opts: RequestInit = {}): Promise<Response> {
    if (this.client) {
      if (this.type === FetchType.Prevent) {
        return this.client.ready;
      }
      this.client.abort();
      this.client = null;
    }

    this.client = abortableFetch(request, opts);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.client.ready.then((res: Response) => {
      this.client = null;
      return res;
    });
    return this.client.ready;
  }
}
