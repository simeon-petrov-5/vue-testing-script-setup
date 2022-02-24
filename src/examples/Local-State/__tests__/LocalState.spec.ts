import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import LocalState from '../LocalState.vue';

const createWrapper = () => {
  const wrapper = mount(LocalState);

  return wrapper;
};

describe('LocalState.vue', () => {
  it('should match snapshot', () => {
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();

    expect(wrapper.text()).toContain('Listing data from local state');
    expect(wrapper.text()).not.toContain('More info: Character links');
  });

  it('show more info', async () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).not.toContain('More info: Character links');

    const button = wrapper.find('button');
    await button.trigger('click');
    await nextTick();
    expect(wrapper.text()).toContain('More info: Character links');
  });
});
