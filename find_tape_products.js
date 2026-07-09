var http=require('https');
http.get('https://boppfilmsale-new.vercel.app/api/data',function(r){
  var b='';
  r.on('data',function(c){b+=c;});
  r.on('end',function(){
    try{
      var d=JSON.parse(b);
      if(!d||!d.data||!d.data.products){console.log('ERR: data structure invalid');return;}
      var ps=d.data.products;
      var maxId=0;
      ps.forEach(function(p){if(p.id>maxId)maxId=p.id;});
      console.log('Total products:',ps.length,'Max ID:',maxId);
      // search tape products
      var tape=ps.filter(function(p){return (p.nameEn||'').toLowerCase().indexOf('tape')>=0||(p.nameZh||'').indexOf('胶带')>=0;});
      console.log('Tape products found:',tape.length);
      if(tape.length){
        tape.forEach(function(p){console.log('  ID:'+p.id+' nameEn:'+(p.nameEn||'')+' detailLink:'+(p.detailLink||'empty'));});
      }
      // also search for detailLink matching tape-crystal-jumbo or tape-sealing
      var link=ps.filter(function(p){return (p.detailLink||'').indexOf('tape-')>=0;});
      console.log('Matching tape- detailLink:',link.length);
      link.forEach(function(p){console.log('  ID:'+p.id+' nameEn:'+(p.nameEn||'')+' detailLink:'+p.detailLink);});
    }catch(e){console.log('PARSE ERR:',e.message);}
  });
});