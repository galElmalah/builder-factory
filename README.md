# builder-factory

> Generated using [Scaffolder](https://github.com/galElmalah/scaffolder)!

typescript friendly builder creator!


### Installation

`npm i builder-factory-creator`

### Usage

```typescript 
import { builderFactory } from 'builder-factory-creator';
const schema = {
  a: 1,
  b: 3,
  c: 'a',
};
const mySchemaBuilder = builderFactory(schema).aBuilder();

// withA, withC etc are type safe.
const schemaObject = mySchemaBuilder.withA(13).withC('some string').build();
/*
schemaObject
{
  a:13,
  b:3,
  c: 'some string'
}
*/

```

