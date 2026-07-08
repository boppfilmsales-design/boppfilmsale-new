var http=require('https');
http.get('https://boppfilmsale-new.vercel.app/api/data',function(r){
  var b='';
  r.on('data',function(c){b+=c;});
  r.on('end',function(){
    var d=JSON.parse(b);
    var existingFiles=['bopa-film.html','bopa-film_zh.html','bopa-thermal.html','bopa-thermal_zh.html','bopabopet-thermal.html','bopabopet-thermal_zh.html','product.html','products.html','index.html','about.html','contact.html','why-us.html'];
    d.data.products.forEach(function(p){
      if(p.detailLink && existingFiles.indexOf(p.detailLink.toLowerCase())<0){
        console.log('ID:'+p.id+' detailLink:'+p.detailLink+' nameEn:'+(p.nameEn||''));
      }
    });
  });
});
