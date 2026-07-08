var http=require('https');
http.get('https://boppfilmsale-new.vercel.app/api/data',function(r){
  var b='';
  r.on('data',function(c){b+=c;});
  r.on('end',function(){
    var d=JSON.parse(b);
    [192,193,194,195].forEach(function(id){
      var p=d.data.products.find(function(x){return x.id===id;});
      if(p){
        console.log('--- ID:'+id+' ---');
        console.log('nameEn:'+(p.nameEn||''));
        console.log('nameZh:'+(p.nameZh||''));
        console.log('detailLink:'+(p.detailLink||''));
        console.log('category:'+(p.category||''));
        console.log('descEn:'+((p.descEn||'').substring(0,80)));
        console.log('');
      }
    });
  });
});
