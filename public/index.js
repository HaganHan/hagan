import hagan from '../src/hagan'
const dictionary = new hagan.Dictionary()
dictionary.set('a', 'f')
dictionary.set('b', 'f')
console.log(dictionary.hasKey('a'))
