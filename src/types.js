export const types = {
  get: function(prop) {
    return Object.prototype.toString.call(prop);
  },
  object: '[object Object]',
  array: '[object Array]',
  string: '[object String]',
  boolean: '[object Boolean]',
  number: '[object Number]',
};

//Use it like this:
//if(types.get(prop) == types.number) {};
