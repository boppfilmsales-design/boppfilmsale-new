var http=require('https');
http.get('https://boppfilmsale-new.vercel.app/api/data',function(r){
  var b='';
  r.on('data',function(c){b+=c;});
  r.on('end',function(){
    var d=JSON.parse(b);
    var found=d.data.products.filter(function(x){
      return (x.nameEn && x.nameEn.toLowerCase().indexOf('12mic')>=0) ||
             (x.nameZh && x.nameZh.indexOf('12mic')>=0) ||
             (x.nameEn && x.nameEn.toLowerCase().indexOf('bopa-12')>=0);
    });
    if(found.length){
      found.forEach(function(p){console.log('ID:'+p.id+' nameEn:'+(p.nameEn||'')+' nameZh:'+(p.nameZh||''));});
    }else{
      console.log('No product found with "12mic"');
      // Show some recent products to help
      var all=d.data.products;
      console.log('Total products:',all.length);
      var last=all.slice(-5);
      last.forEach(function(p){console.log('  ID:'+p.id+' nameEn:'+(p.nameEn||''));});
    }
  });
});
