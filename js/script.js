function query_chinese_to_cangjie3(q) {
  if (q in chinese_to_cangjie3) {
    return chinese_to_cangjie3[q].join(',');
  }
  return 'NA';
}

function query_chinese_to_cangjie5(q) {
  if (q in chinese_to_cangjie5) {
    return chinese_to_cangjie5[q].join(',');
  }
  return 'NA';
}

function query_chinese_to_jyutping(q) {
  if (q in chinese_to_jyutping) {
    return chinese_to_jyutping[q].join(',');
  }
  return 'NA';
}

function query_chinese_to_mandarin(q) {
  if (q in chinese_to_mandarin) {
    return chinese_to_mandarin[q].join(',');
  }
  return 'NA';
}

function query_chinese_to_simplified(q) {
  if (q in chinese_to_simplified) {
    return chinese_to_simplified[q].join(',');
  }
  return 'NA';
}

function query_chinese_to_traditional(q) {
  if (q in chinese_to_traditional) {
    return chinese_to_traditional[q].join(',');
  }
  return 'NA';
}

$('#search').submit(function(event){
  var val = $('input').val();
  val = $.trim(val);
  if (!val) {
    $('#result').html('');
    event.preventDefault();
    return;
  }
  var canto_scheme = localStorage.getItem("canto-scheme");
  var content = '<table><thead>';
  content += '<tr><th>字</th><th>簡</th><th>繁</th>';
  content += '<th>倉頡</th>';
  content += '<th>粵語</th><th>國語</th></tr></thead><tbody>';
  for (var i = 0; i < val.length; i++) {
    var q = val[i];
    content += '<tr><td>'+q+'</td>';
    content += '<td>'+query_chinese_to_simplified(q)+'</td>';
    content += '<td>'+query_chinese_to_traditional(q)+'</td>';
    var cj3 = query_chinese_to_cangjie3(q);
    var cj5 = query_chinese_to_cangjie5(q);
    var cj = cangjie_merge(cj5, cj3);
    content += '<td>'+cangjie_convert(cj)+'</td>';
    content += '<td>'+query_chinese_to_jyutping(q)+'</td>';
    content += '<td>'+query_chinese_to_mandarin(q)+'</td>';
    content += '</tr>';
  }
  content += '</tbody></table>';
  $('#result').html(content);
  event.preventDefault();
});

$('#canto-scheme').change(function(event){
  localStorage.setItem("canto-scheme", this.value);
})
