import { builderFactory } from '.';

describe('createBuilder', () => {
  it('should invoke custom setters', () => {
    const schema = {
      a: 1,
      b: 3,
      c: [],
    };
    const builder = builderFactory(schema, {
      push: (state, value) => {
        state.c.push(value);
      },
    }).aBuilder();
    builder.push(123);
    expect(builder.build().c).toHaveLength(1);
    expect(builder.build().c[0]).toBe(123);
  });

  it('should prefix all methods with the "with" and "omit" key word', () => {
    const schema = {
      a: 1,
      b: 3,
      c: 'a',
    };
    const builder = builderFactory(schema).aBuilder();

    expect(Object.keys(builder).sort()).toEqual(
      ['withA', 'withB', 'withC','omitA', 'omitB', 'omitC', 'build', 'getSchema'].sort()
    );
  });

  it('all properties should be of type function', () => {
    const schema = {
      a: 1,
      b: 3,
      c: 'a',
    };

    const builder = builderFactory(schema).aBuilder();
    Object.values(builder).forEach((v) => {
      expect(v).toBeInstanceOf(Function);
    });
  });

  it('should change the values without mutating the schema', () => {
    const schema = {
      a: 1,
      b: 3,
      c: 'a',
    };
    const newA = 1234;
    const builder = builderFactory(schema)
      .aBuilder()
      .withA(123)
      .withC('my new string');
    const built = builder.withA(newA).build();
    expect(built.a).toBe(newA);
    expect(schema.a).toBe(1);
  });

  it('should return a copy of the schema', () => {
    const schema = {
      a: 1,
      b: 3,
      c: 'a',
    };
    const newA = 1234;
    const builder = builderFactory(schema)
      .aBuilder()
      .withA(123)
      .withC('my new string');
    builder.withA(newA).build();
    expect(builder.getSchema()).not.toBe(schema);
    expect(builder.getSchema()).toEqual(schema);
  });

  it('should return different builders on each aBuilder call', () => {
    const schema = {
      a: 1,
      b: 3,
      c: 'a',
    };


    const builderOne = builderFactory(schema)
      .aBuilder()
      .withA(123)
      .withC('my new string')
      .build();

    const builderTwo = builderFactory(schema)
      .aBuilder()
      .withA(1234)
      .withC('my string')
      .build();

    expect(builderOne).not.toBe(builderTwo);
    expect(builderOne).not.toEqual(builderTwo);
  });

  it('should accept a function as schema and invoke it for each builder instance', () => {
    const schema = () => ({
      a: Math.random(),
      b: 3,
      c: 'a',
    });

    const builderOne = builderFactory(schema).aBuilder();
    const builderTwo = builderFactory(schema).aBuilder();

    expect(builderOne.build()).not.toEqual(builderTwo.build());
  });

	it('should be composable', () => {
    const subSchema = {
      a: Math.random(),
      b: 3,
      c: 'a',
    };
    const subBuilder = builderFactory(subSchema).aBuilder();

    const mainSchema = () => ({
      a: Math.random(),
      b: 3,
      c: 'a',
			complex: subBuilder.build()
    });

    const mainBuilder = builderFactory(mainSchema).aBuilder();

    expect(mainBuilder.build().complex).toEqual(subBuilder.build());
  });

  it('should allow to omit properties', () => {
    const subSchema = {
      a: Math.random(),
      b: 3,
      c: 'a',
    };

    const subBuilder = builderFactory(subSchema).aBuilder();

    const mainSchema = () => ({
      a: Math.random(),
      b: 3,
      c: 'a',
			complex: subBuilder.build()
    });

    const mainBuilder = builderFactory(mainSchema).aBuilder().omitComplex()

    expect(mainBuilder.build()).not.toContain('complex')
    expect(mainBuilder.omitA().build()).not.toContain('a')
  });
});
