(function(){
  var libcantonese = {}
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = libcantonese;
  } else {
    this.libcantonese = libcantonese;
  }
  var jyutping_onsets = [
    'b', 'p', 'm', 'f',
    'd', 't', 'n', 'l',
    'g', 'k', 'h', 'ng',
    'z', 'c', 's', 'gw',
    'kw', 'j', 'w'
  ];
  var jyutping_to_yale_onset = {
    'z': 'j',
    'c': 'ch',
    'j': 'y'
  };
  var jyutping_to_yale_final = {
    'aa': 'a',
    'oe': 'eu',
    'oeng': 'eung',
    'oek': 'euk',
    'eoi': 'eui',
    'eon': 'eun',
    'eot': 'eut'
  };
  var jyutping_to_hked_onset = {
    'z': 'dz',
    'c': 'ts'
  };
  var jyutping_to_hked_final = {
    'aa': 'a',
    'eoi': 'oey',
    'eon': 'oen',
    'eot': 'oet',
    'yu': 'y',
    'yun': 'yn',
    'yut': 'yt'
  };
  var jyutping_to_sidneylau_onset = {
    'z': 'j',
    'c': 'ch',
    'j': 'y'
  };
  var jyutping_to_sidneylau_final = {
    'aa': 'a',
    'o': 'oh',
    'ou': 'o',
    'u': 'oo',
    'ui': 'ooi',
    'un': 'oon',
    'ut': 'oot',
    'oe': 'euh',
    'oeng': 'eung',
    'oek': 'euk',
    'eoi': 'ui',
    'eon': 'un',
    'eot': 'ut',
    'yu': 'ue',
    'yun': 'uen',
    'yut': 'uet'
  };
  var jyutping_to_sidneylau_tones = {
    '1': '<sup>1°</sup>',
    '2': '<sup>2</sup>',
    '3': '<sup>3</sup>',
    '4': '<sup>4</sup>',
    '5': '<sup>5</sup>',
    '6': '<sup>6</sup>',
    '': ''
  }
  var parse_jyutping = function (jp) {
    var parts = ['', '', ''];
    var offset = 0;
    // find onset and onset offset
    for (var i = 0; i < jyutping_onsets.length; i++) {
      if (jp.indexOf(jyutping_onsets[i]) === 0) {
        parts[0] = jyutping_onsets[i];
        offset = jyutping_onsets[i].length;
        break;
      }
    }
    var final_len = jp.length - offset;
    // if last character is valid tone, take it
    if (/^[1-6]$/.test(jp[jp.length-1])) {
      parts[2] = jp[jp.length-1];
      final_len -= 1;
    }
    // FIXME: check whether final is valid
    parts[1] = jp.substr(offset, final_len);
    return parts;
  };
  libcantonese.parse_jyutping = parse_jyutping;
  libcantonese.jyutping_to_yale = function (jp) {
    var parts = parse_jyutping(jp);
    // map onset
    if (parts[0] in jyutping_to_yale_onset) {
      parts[0] = jyutping_to_yale_onset[parts[0]];
    }
    // map final
    if (parts[1] in jyutping_to_yale_final) {
      parts[1] = jyutping_to_yale_final[parts[1]];
    }
    // fix double y
    if (parts[0] === 'y' && parts[1].indexOf('y') === 0) {
      parts[0] = '';
    }
    // TODO: yale tone mark
    return parts.join('');
  }
  libcantonese.jyutping_to_hked = function (jp) {
    var parts = parse_jyutping(jp);
    // map onset
    if (parts[0] in jyutping_to_hked_onset) {
      parts[0] = jyutping_to_hked_onset[parts[0]];
    }
    // map final
    if (parts[1] in jyutping_to_hked_final) {
      parts[1] = jyutping_to_hked_final[parts[1]];
    }
    var tail = parts[1][parts[1].length-1];
    // fix hked tone
    if (tail === 'k' || tail === 'p' || tail === 't') {
      switch (parts[2]) {
      case '1':
        parts[2] = '7';
        break;
      case '3':
        parts[2] = '8';
        break;
      case '6':
        parts[2] = '9';
        break;
      }
    }
    return parts.join('');
  }
  libcantonese.jyutping_to_sidneylau = function (jp) {
    var parts = parse_jyutping(jp);
    if (parts[0] in jyutping_to_sidneylau_onset) {
      parts[0] = jyutping_to_sidneylau_onset[parts[0]];
    }
    if (parts[1] in jyutping_to_sidneylau_final) {
      parts[1] = jyutping_to_sidneylau_final[parts[1]];
    }
    parts[2] = jyutping_to_sidneylau_tones[parts[2]];
    return parts.join('');
  }
}.call(this));
