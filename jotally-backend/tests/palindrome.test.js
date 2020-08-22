const palindrome = require('../utils/for-testing').palindrome

test('Palindrome of a', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

test('Palindrome of React', () => {
  const result = palindrome('React')

  expect(result).toBe('tcaeR')
})

test('palindrome of releveler', () => {
  const result = palindrome('releveler')

  expect(result).toBe('releveler')
})