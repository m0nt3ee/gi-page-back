import { When, Then, Given, After } from '@cucumber/cucumber';
import axios, { AxiosResponse } from 'axios';
import expect from 'expect';
import { Agent } from 'http';
import { deepCompare } from '../_helper/deep-compare';

const apiBaseUrl = 'http://localhost:3000';
const httpAgent = new Agent({ keepAlive: false });
let apiToken: string | null | undefined = undefined;
let apiResponse: AxiosResponse;

Given('I use admin token', async () => {
  apiToken = 'admin-token';
});

Given('I use destructive actions token', async () => {
  apiToken = 'destructive-actions-token';
});

Given('I use a wrong token', async () => {
  apiToken = 'wrong-token';
});

Given('I do not use a token', async () => {
  apiToken = null;
});

When(
  'I send a {string} request to {string}',
  async (method: string, path: string) => {
    const url = `${apiBaseUrl}${path}`;
    const headers: Record<string, string> = {};

    if (apiToken !== null && apiToken !== undefined) {
      headers['Authorization'] = `Bearer ${apiToken}`;
    }

    apiResponse = await axios.request({
      method: method,
      url: url,
      httpAgent,
      validateStatus: () => true,
      headers,
    });
  },
);

When(
  'I send a {string} request to {string} with body:',
  async (method: string, path: string, body: string) => {
    const url = `${apiBaseUrl}${path}`;
    const headers: Record<string, string> = {};

    if (apiToken !== null && apiToken !== undefined) {
      headers['Authorization'] = `Bearer ${apiToken}`;
    }

    apiResponse = await axios.request({
      method: method,
      url: url,
      data: JSON.parse(body),
      httpAgent,
      validateStatus: () => true,
      headers,
    });
  },
);

Then('the response status should be {int}', (statusCode: number) => {
  expect(apiResponse.status).toBe(statusCode);
});

Then(
  'the response body should have the property {string}',
  (property: string) => {
    expect(apiResponse.data).toHaveProperty(property);
  },
);

Then('the response body should contain:', async function (docString: string) {
  const expected = JSON.parse(docString);
  const actual = apiResponse.data;

  deepCompare(actual, expected);
});

Then('I dump response', () => {
  console.log(JSON.stringify(apiResponse.data));
});

After(() => {
  apiToken = undefined;
});
