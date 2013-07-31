
$bee({path: '/js/sharedWorker.js', ns: 'NDN'}).ready(function(bee, port, sw){
  
  bee.on('custom', function(data, e){
    alert('Really, ' + data);
  });
  
  bee.emit('uncustom', 'I DON\'t like turtles...!');
  
});

