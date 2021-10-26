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

export enum FetchType {
  CancelAndResend = 'CancelAndResend',
  Prevent = 'Prevent'
}

export class FetchPro {
  private client: AbortableFetch | null = null;

  // eslint-disable-next-line no-useless-constructor
  constructor(public readonly type: FetchType) {}

  public abort(): void {
    if (this.client) {
      this.client.abort();
      this.client = null;
    }
  }

  public fetch(request: RequestInfo, opts: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const { signal } = controller;

    if (this.client) {
      if (this.type === FetchType.Prevent) {
        return this.client.ready;
      }
      this.client.abort();
      this.client = null;
    }

    this.client = {
      abort: (): void => controller.abort(),
      ready: fetch(request, { ...opts, signal }).then((res: Response) => {
        this.client = null;
        return res;
      })
    };
    return this.client.ready;
  }
}
