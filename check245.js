var http=require('https');
http.get('https://boppfilmsale-new.vercel.app/api/data',{headers:{'Accept':'application/json'}},function(res){
  var b='';
  res.on('data',function(c){b+=c;});
  res.on('end',function(){
    var idx=b.indexOf('"id":245');
    if(idx<0){
      console.log('product 245 not found in JSON');
      // Search the last few products
      var last=b.lastIndexOf('"id":');
      console.log('Last id entries: '+b.substring(Math.max(0,last-30),last+150));
    } else {
      console.log('Found! '+b.substring(idx,400));
    }
  });
});
