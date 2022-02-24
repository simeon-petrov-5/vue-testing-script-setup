import { flushPromises, mount } from '@vue/test-utils';
import LoadingProvider from '../LoadingProvider.vue';
import mockedCharacters from '../../../mock-data/characters.json';
import dataProvider from '../../../dataProvider';

dataProvider.loadCharacters = vi.fn(() => {
  return mockedCharacters;
}) as any;

const createWrapper = () => {
  const wrapper = mount(LoadingProvider);
  return wrapper;
};

describe('LoadingProvider.vue', () => {
  it('should match snapshot', async () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain('Loading with help of a dataProvider');

    // await nextTick();
    await flushPromises();

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.text()).not.toContain('Page is loading');
  });
});
