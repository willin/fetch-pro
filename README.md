# fetch-pro

[![willin](https://img.shields.io/github/followers/willin.svg?label=Followers)](https://github.com/willin) [![npm](https://img.shields.io/npm/v/fetch-pro.svg?style=plastic)](https://npmjs.org/package/fetch-pro) [![npm](https://img.shields.io/npm/dm/fetch-pro.svg?style=plastic)](https://npmjs.org/package/fetch-pro) [![npm](https://img.shields.io/npm/dt/fetch-pro.svg?style=plastic)](https://npmjs.org/package/fetch-pro)

Elegant Fetch Lib with Power

## Usage

### abortableFetch

```ts
import { abortableFetch } from 'fetch-pro';

async function demo() {
  const client = abortableFetch(
    {
      method: 'post',
      url: 'xxx'
    },
    {
      data: {}
    }
  );

  // abortable
  client.abort();

  // normal request
  const result = await client.ready;
}
```

### FetchPro

FetchType:

- Prevent
- CancelAndResend

```ts
import { FetchPro, FetchType } from 'fetch-pro';

async function demo() {
  const client = new FetchPro(FetchType.CancelAndResend);
  client.fetch('url');
  client.fetch(
    {
      method: 'get',
      url: 'xxx'
    },
    {}
  );

  const result = await client.ready;

  // cancel manually
  client.abort();
}
```

## LICENSE

Apache-2.0

![qr](https://user-images.githubusercontent.com/1890238/89126156-0f3eeb80-d516-11ea-9046-5a3a5d59b86b.png)
