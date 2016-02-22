var query_string;

function query_chinese_to_big5(q) {
  if (q in chinese_to_big5) {
    return chinese_to_big5[q];
  }
  return 'NA';
}

function query_chinese_to_cangjie(q) {
  if (q in chinese_to_cangjie) {
    return chinese_to_cangjie[q].join(',');
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

function render_result() {
  var val = query_string;
  if (!val) {
    $('#result').html('');
    return;
  }
  var canto_scheme = localStorage.getItem('canto-scheme');
  var scheme_to_cname = {
    'jyutping': 'LSHK',
    'yale': 'Yale',
    'hked': '教院式',
    'sidneylau': '劉錫翔'
  };
  var content = '<table><thead>';
  content += '<tr><th>字</th><th>簡</th><th>繁</th>';
  content += '<th>大五碼</th>';
  content += '<th>倉頡碼</th>';
  content += '<th>廣東話('+scheme_to_cname[canto_scheme]+')</th>';
  content += '<th>普通話</th></tr></thead><tbody>';
  for (var i = 0; i < val.length; i++) {
    var q = val[i];
    content += '<tr><td><a target="_blank" href="https://www.moedict.tw/'+q+'">'+q+'</a></td>';
    content += '<td>'+query_chinese_to_simplified(q)+'</td>';
    content += '<td>'+query_chinese_to_traditional(q)+'</td>';
    var big5 = query_chinese_to_big5(q);
    content += '<td>'+big5+'</td>';
    var cj = cangjie_convert(query_chinese_to_cangjie(q));
    if (big5 !== 'NA') {
      content += '<td><a target="_blank" href="http://input.foruto.com/cjdict/Images/CJZD_JPG/'
                 +big5+'.JPG">'+cj+'</a></td>';
    } else {
      content += '<td>'+cj+'</td>';
    }
    var jplst = query_chinese_to_jyutping(q).split(',')
    if (jplst[0] !== 'NA') {
      switch (canto_scheme) {
        case 'yale':
          for (var j = 0; j < jplst.length; j++) {
            jplst[j] = libcantonese.jyutping_to_yale(jplst[j]);
          }
          break;
        case 'hked':
          for (var j = 0; j < jplst.length; j++) {
            jplst[j] = libcantonese.jyutping_to_hked(jplst[j]);
          }
          break;
        case 'sidneylau':
          for (var j = 0; j < jplst.length; j++) {
            jplst[j] = libcantonese.jyutping_to_sidneylau(jplst[j]);
          }
      }
    }
    var canto = jplst.join(',');
    if (big5 !== 'NA') {
      content += '<td><a target="_blank" href="http://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/search.php?q=%'
                 +big5.substr(0, 2)+'%'+big5.substr(2)+'">'+canto+'</a></td>';
    } else {
      content += '<td>'+canto+'</td>';
    }
    content += '<td>'+query_chinese_to_mandarin(q)+'</td>';
    content += '</tr>';
  }
  content += '</tbody></table>';
  $('#result').html(content);
}

$('#search').submit(function(event){
  var val = $('input').val();
  query_string = $.trim(val);
  render_result();
  event.preventDefault();
});

if (localStorage.getItem('canto-scheme') === null) {
  localStorage.setItem('canto-scheme', 'jyutping');
}
$('#canto-scheme').val(localStorage.getItem('canto-scheme'));
$('#canto-scheme').change(function(event){
  localStorage.setItem('canto-scheme', this.value);
  render_result();
})
