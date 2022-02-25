# Vue 3 testing with Script Setup + Vitest (+ TS)

This repository is created to showcase some "strange" results when mocking our REST calls with MSW. The main part of the components/pages is exchanged with examples using the rick&morty API, but the overall usage and setup are the same as in the internal app we develop.

**Versions**
- vue: "^3.2.31"
- vite: "^2.8.4"
- vitest: "^0.5.0"

## The "issue"
When mocking REST calls to our backend with MSW we see that we need to use **multiple** `await flushPromises()` calls and I don't really understand why. Also in many situation the number of flushPromises is different, which makes me think that in this case flushPromises is working more or less as a waiting/timer helper to buy enough time for the test. BTW using `await nextTick` doesn't bring anything, I also checked the examples in VItest from antfu https://github.com/vitest-dev/vitest/blob/main/examples/vue/test/async.test.ts

Full example in `src/examples/MSW-Mocking/__tests__/LoadingAxios.spec.ts`
```
...
export  const  restHandlers = [
	rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
	return  res(ctx.status(200), ctx.json(mockedCharacters));
})];

const  server = setupServer(...restHandlers);
it('should match snapshot', async () => {
	const  wrapper = createWrapper();

	await  flushPromises();
	await  flushPromises();
	await  flushPromises();

	expect(wrapper.element).toMatchSnapshot();
});
```

Are we doing something wrong? Is this way of using either MSW or in general loading data in Vue in some way limited? I'm open to any suggestions :)



## ⚠️Workaround

I have found a workaround of this issue, where we use a "data provider" file, which is a wrapper for the general REST calls. When mocking directly the dataProvider we don't have this issue and a single `flushPromise` or `nextTick` is more than enough. 
Please note - this is not the best way of mocking, it's quick and dirty.

Example from `src/examples/Method-Mocking/__tests__/LoadingProvider.spec.ts`
```
import  dataProvider  from  '../../../dataProvider';

dataProvider.loadCharacters = vi.fn(() => {
	return  mockedCharacters;
}) as  any;
```

And of course using something like `mock-axios-adapter` is a better choice and after testing in the internal app - it works completely fine and as expected (no multiple flushPromises). For this I'm mocking like this

```
import axios from '@/configs/axios/axios.tenant';
import MockAdapter from 'axios-mock-adapter';

import tenantMock from './tenants';

export default () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`/tenant/${tenantMock.tenantBalance.tenantId}/balance`).reply(200, tenantMock.tenantBalance);
  mock.onGet(`/tenant/${tenantMock.tenant.id}`).reply(200, tenantMock.tenant);
  mock.onGet(`/tenant`).reply(200, tenantMock.tenantsWithPagination);
};

```

## ⚠️ A different approach | Workaround 2

Colleagues from a  different project (Vue 2 + TS + Class components, etc.) also had such issues and not very consistent results from MSW + flushPromises/nextTick so they found a different workaround - In almost all of our components we have a var handling the loading state of that component/page. They check if this is set to the correct loading state and await 1ms, which buys enough time for the component to be mounted correctly.

-----------
I haven't tried this approach as we don't have access to the `$data` when using script setup, but probably if we use [defineExpose](https://vuejs.org/api/sfc-script-setup.html#defineexpose) we can manage to simulate the same functionality, but it will be a little too much to always add the expose only for testing with msw..

-----------

**Examples**
```
export  function  ensureIsSet(
	data: Record<string, unknown>, // use wrapper.vm.$data here
	varname: string,
	condition: unknown
	) {
	return  new  Promise(function(resolve) {
		(function  waitFor() {
			if (data[varname] === condition) return  resolve(true);
			setTimeout(waitFor, 1);
		})();
	});
}

and how it is being used
it('should match snapshot - create mode', async () => {
	...
	const  wrapper = wrapperFactory();
	await  ensureIsSet(wrapper.vm.$data, 'dataLoaded', true);
	expect(wrapper.element).toMatchSnapshotUnscoped();
	...
});
``` 