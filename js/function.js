function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(string) {
  let checkedString = string.replaceAll(' ', '');
  checkedString = checkedString.toLowerCase();
  let reversedString = '';
  for (let i = checkedString.length - 1; i > -1; i--) {
    reversedString += checkedString[i];
  }
  return reversedString === checkedString;
}
