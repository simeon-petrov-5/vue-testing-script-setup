import { flushPromises, mount } from '@vue/test-utils';
import LoadingAxios from '../LoadingAxios.vue';

import { beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import mockedCharacters from '../../../mock-data/characters.json';

export const restHandlers = [
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedCharacters));
  })
];

const server = setupServer(...restHandlers);

const createWrapper = () => {
  const wrapper = mount(LoadingAxios);
  return wrapper;
};

describe('LoadingAxios.vue', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('should match snapshot', async () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain('Dummy Loading page');

    // await nextTick();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    // await nextTick();
    // await nextTick();

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.text()).not.toContain('Page is loading');
  });
});
