var http=require('https');
http.get('https://boppfilmsale-new.vercel.app/products-data.js',function(res){
  var b='';
  res.on('data',function(c){b+=c;});
  res.on('end',function(){
    var idx=b.indexOf('"id":245');
    if(idx<0){
      console.log('product 245 not found');
      // Show last 500 chars to see what's at the end
      console.log('END: '+b.substring(b.length-500));
    } else {
      console.log('Found product 245:');
      console.log(b.substring(idx,600));
    }
  });
});
