const  mdLinks = require('../cli.js')


describe('mdLinks', () => {
  it('should be a function', () => {
    expect (typeof mdLinks). toBe ('function');
  });
  it('should be return an array', () =>{
    return mdLinks('NEWREADME.md').then(resolve => {
      expect(typeof resolve).toBe('object');
    });
  });
})
