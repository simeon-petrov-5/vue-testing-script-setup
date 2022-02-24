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
Please note - this is not the best way of mocking, it's quick and dirty. I would expect that using something like mock-axios will do the same job.

Example from `src/examples/Method-Mocking/__tests__/LoadingProvider.spec.ts`
```
import  dataProvider  from  '../../../dataProvider';

dataProvider.loadCharacters = vi.fn(() => {
	return  mockedCharacters;
}) as  any;
```