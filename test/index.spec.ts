import 'cross-fetch/polyfill';
import { abortableFetch, FetchPro, FetchType } from '../src';

const url = (status: number, sleep: number): string => `https://httpstat.us/${status}?sleep=${sleep}`;

test('abortableFetch', async () => {
  const client = abortableFetch(url(200, 6e6));
  expect(client).toHaveProperty('abort');
  client.abort();
  expect(client.ready).toMatchObject({});
});

test(FetchType.CancelAndResend, async () => {
  const client = new FetchPro(FetchType.CancelAndResend);
  client.fetch(url(404, 500), {});
  client.fetch(url(200, 1));
  const result = await client.ready;
  expect(result?.status).toBe(200);
});

test(FetchType.Prevent, async () => {
  const client = new FetchPro(FetchType.Prevent);
  client.fetch(url(200, 500));
  client.fetch(url(404, 500), {});
  const result = await client.ready;
  expect(result?.status).toBe(200);
});
