import { builderFactory } from '.';

describe('createBuilder', () => {
	it('should prefix all methods with the "with" key word', () => {
		const schema = {
			a: 1,
			b: 3,
			c: 'a',
		};
		const builder = builderFactory(schema).aBuilder();
		expect(Object.keys(builder).sort()).toEqual(['withA','withB', 'withC', 'build', 'getSchema'].sort())
	});

	it('all properties should be of type function', () => {

		const schema = {
			a: 1,
			b: 3,
			c: 'a',
		};

		const builder = builderFactory(schema).aBuilder();
		Object.values(builder).forEach(v => {
			expect(v).toBeInstanceOf(Function);
		})
	});

	it('should change the values', () => {

		const schema = {
			a: 1,
			b: 3,
			c: 'a',
		};
		const newA = 1234;
		const builder = builderFactory(schema).aBuilder().withA(123).withC('my new string');
		const built = builder.withA(newA).build();
		expect(built.a).toBe(newA)
		expect(schema.a).toBe(1)
	});

	it('should return a copy of the schema', () => {

		const schema = {
			a: 1,
			b: 3,
			c: 'a',
		};
		const newA = 1234;
		const builder = builderFactory(schema).aBuilder().withA(123).withC('my new string');
		const built = builder.withA(newA).build();
		expect(builder.getSchema()).not.toBe(schema)
		expect(builder.getSchema()).toEqual(schema)
	});

	it('should return different builders on each aBuilder call', () => {

		const schema = {
			a: 1,
			b: 3,
			c: 'a',
		};

		const builderOne = builderFactory(schema).aBuilder().withA(123).withC('my new string').build();
		const builderTwo = builderFactory(schema).aBuilder().withA(1234).withC('my string').build();

		expect(builderOne).not.toBe(builderTwo)
		expect(builderOne).not.toEqual(builderTwo)
	});
});
