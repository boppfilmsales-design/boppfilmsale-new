var http=require('https');
http.get('https://boppfilmsale-new.vercel.app/products-data.js',function(r){
  var b='';
  r.on('data',function(c){b+=c;});
  r.on('end',function(){
    var m=b.match(/var productsData/);
    console.log('Status:',r.statusCode,'Has data:',!!m,'Length:',b.length);
    // find tape products
    var idx=b.indexOf('"tape');
    if(idx>=0){
      console.log('Found tape at',idx);
      console.log(b.substring(Math.max(0,idx-30),idx+120));
    }else{
      console.log('No tape product found');
    }
  });
});