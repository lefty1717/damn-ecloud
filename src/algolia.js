import algoliasearch from 'algoliasearch';

const client = algoliasearch("J7DTFHDUTR","e10436164e8435a553505dab7390062c");

const algolia = client.initIndex("recipes");


export default algolia;