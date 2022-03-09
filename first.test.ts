interface Hello {
  name: string
}
let me : Hello = {
  name: 'me'
}
it('works', () => {
  expect(me.name).toBe('me');
})
