var http=require('https');
http.get('https://boppfilmsale-new.vercel.app/api/data',function(r){
  var b='';
  r.on('data',function(c){b+=c;});
  r.on('end',function(){
    var d=JSON.parse(b);
    var p=d.data.products.find(function(x){return x.id===192;});
    if(p){
      console.log('ID: '+p.id);
      console.log('nameEn: '+p.nameEn);
      console.log('nameZh: '+p.nameZh);
      console.log('detailLink: '+(p.detailLink||'(empty)'));
    }else{
      console.log('192 not found');
    }
  });
});
