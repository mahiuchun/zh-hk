var cangjie_key_to_radical = {
  'a': '日',
  'b': '月',
  'c': '金',
  'd': '木',
  'e': '水',
  'f': '火',
  'g': '土',
  'h': '竹',
  'i': '戈',
  'j': '十',
  'k': '大',
  'l': '中',
  'm': '一',
  'n': '弓',
  'o': '人',
  'p': '心',
  'q': '手',
  'r': '口',
  's': '尸',
  't': '廿',
  'u': '山',
  'v': '女',
  'w': '田',
  'x': '難',
  'y': '卜',
  'z': '重'
};

function cangjie_convert(cj) {
  result = [];
  for (var i = 0; i < cj.length; i++) {
    if (cj[i] in cangjie_key_to_radical) {
      result.push(cangjie_key_to_radical[cj[i]]);
    } else {
      result.push(cj[i]);
    }
  }
  return result.join('');
}

function cangjie_merge(cj1, cj2) {
  result = cj1.split(',');
  cj2 = cj2.split(',');
  for (var i = 0; i < cj2.length; i++) {
    var e = cj2[i];
    if ($.inArray(e, result)) {
      result.push(e);
    }
  }
  return result.join(',');
}
