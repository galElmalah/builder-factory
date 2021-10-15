# builder-factory

> Generated using [Scaffolder](https://github.com/galElmalah/scaffolder)!

[![npm version](https://badge.fury.io/js/builder-factory-creator.svg)](https://badge.fury.io/js/builder-factory-creator)


typescript friendly builder creator!

## Installation

`npm i builder-factory-creator`

## Usage

### Basic usage

All properties will be prefixed with the a `with` key word.

```typescript
import { builderFactory } from 'builder-factory-creator';
const schema = {
  this: 1,
  what: 3,
  that: 'a',
};
const mySchemaBuilder = builderFactory(schema).aBuilder();

// withThis, withThat etc are type safe.
const schemaObject = mySchemaBuilder
  .withThis(13)
  .withThat('some string')
  .build();
/*
schemaObject will be a new object containing the following fields
{
  this:13,
  what:3,
  that: 'some string'
}
*/
```

### Factory schema function

If you want each builder instance to have different values you can pass a function that return the schema object

```typescript
import { builderFactory } from 'builder-factory-creator';
const schema = () => ({
  random: Math.random(),
});

const aBuilder = builderFactory(schema).aBuilder();
const anotherBuilder = builderFactory(schema).aBuilder();

// Each builder will get a new instance of the schema object
aBuilder.build().random !== anotherBuilder.build().random;
```

### Composing builders

If you want each builder instance to have different values you can pass a function that return the schema object

```typescript
import { builderFactory } from 'builder-factory-creator';

const subSchema = {
  a: Math.random(),
  b: 3,
  c: 'im a sub builder',
};
const subBuilder = builderFactory(subSchema).aBuilder();

const mainSchema = () => ({
  a: Math.random(),
  b: 3,
  c: 'a',
  complex: subBuilder.build(),
});

const mainBuilder = builderFactory(mainSchema).aBuilder();

const mainSchemaObject = mainBuilder.build();
/*
schemaObject will be a new object containing the following fields
{
  a: <some number>,
  b: 3,
  c: 'a'
  complex: { // this is the sub builder instance
    a: <some number>,
    b: 3,
    c: 'im a sub builder',
  }
}
*/
```

### Custom setters

You can extend the factory with custom setters as well.

```typescript
import { builderFactory } from 'builder-factory-creator';
const schema = {
  this: 1,
  what: 3,
  that: [],
};
const mySchemaBuilder = builderFactory(schema, {
  myCustomSetter: (state, value) => state.that.push('yo yo'),
}).aBuilder();

// withThis, withThat etc are type safe.
const schemaObject = mySchemaBuilder
  .withThis(13)
  .myCustomSetter('some string')
  .build();
/*
schemaObject will be a new object containing the following fields
{
  this:13,
  what:3,
  that: ['yo yo']
}
*/
```
