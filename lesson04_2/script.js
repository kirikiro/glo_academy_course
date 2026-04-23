function checkTheString(str){
  let s = '';
  if (typeof(str) !== 'string'){
    console.log('передана не строка, выход из функции');
    return 0;
  } else{
      s = str.trim();
  }
  if (s.length > 30){
    console.log(s.slice(0, 30)+'...');
  } else{
    console.log(s);
  }
}

checkTheString('23234');