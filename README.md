# builder-factory

> Generated using [Scaffolder](https://github.com/galElmalah/scaffolder)!

typescript friendly builder creator!


### Installation

`npm i builder-factory-creator`

### Usage

All properties will be prefixed with the a `with` key word.
```typescript 
import { builderFactory } from 'builder-factory-creator';
const schema = {
  this: 1,
  what: 3,
  that: 'a',
};
const mySchemaBuilder = builderFactory(schema).aBuilder();

// withA, withC etc are type safe.
const schemaObject = mySchemaBuilder.withThis(13).withThat('some string').build();
/*
schemaObject will be a new object containing the following fields
{
  this:13,
  what:3,
  that: 'some string'
}
*/

```

You can extend the factory with custom setters as well.
```typescript 
import { builderFactory } from 'builder-factory-creator';
const schema = {
  this: 1,
  what: 3,
  that: [],
};
const mySchemaBuilder = builderFactory(schema, {myCustomSetter: (state, value) => state.that.push('yo yo')}).aBuilder();

// withA, withC etc are type safe.
const schemaObject = mySchemaBuilder.withThis(13).myCustomSetter('some string').build();
/*
schemaObject will be a new object containing the following fields
{
  this:13,
  what:3,
  that: ['yo yo']
}
*/

```

