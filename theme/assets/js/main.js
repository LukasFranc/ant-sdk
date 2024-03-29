function insertAfter (referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function getQueryParamsValue (name, url) {
  if (!url) url = location.href
  name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]')
  var regexS = '[\\?&]' + name + '=([^&#]*)'
  var regex = new RegExp(regexS)
  var results = regex.exec(url)
  return results == null ? null : results[1]
}

function updateQueryString(key, value, url) {
  if (!url) url = window.location.href;
  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
      hash;

  if (re.test(url)) {
    if (typeof value !== 'undefined' && value !== null) {
      return url.replace(re, '$1' + key + "=" + value + '$2$3');
    }
    else {
      hash = url.split('#');
      url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
      if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
        url += '#' + hash[1];
      }
      return url;
    }
  }
  else {
    if (typeof value !== 'undefined' && value !== null) {
      var separator = url.indexOf('?') !== -1 ? '&' : '?';
      hash = url.split('#');
      url = hash[0] + separator + key + '=' + value;
      if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
        url += '#' + hash[1];
      }
      return url;
    }
    else {
      return url;
    }
  }
}

//check ANT-SDT working
console.log('ANT-SDK ready!')