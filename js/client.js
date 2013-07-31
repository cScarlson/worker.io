
$bee({path: '/js/sharedWorker.js', ns: 'NDN'}).ready(function(bee, port, sw){
  
  bee.on('custom', function(e){
    console.log('Really,', e.data);
  });
  
  bee.emit('uncustom', 'I DON\'t like turtles...!');
  
  bee.on('broadcast', function(e){
    alert('New Broadcast Message: ' + e.data);
  });
  
  document.querySelector('button').addEventListener('click', function(){
    var msg = document.querySelector('textarea').value;
    bee.emit('broadcast', msg);
  }, false);
  
});

