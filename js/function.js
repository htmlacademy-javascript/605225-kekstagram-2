function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(string) {
  const checkedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = checkedString.length - 1; i > -1; i--) {
    reversedString += checkedString[i];
  }

  return reversedString === checkedString;
}
