# create-builder

> Generated using [Scaffolder](https://github.com/galElmalah/scaffolder)!

typescript friendly builder creator!

### usage

```typescript 
import { builderFactory } from 'create-builder';
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

