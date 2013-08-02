
$bee({path: '/js/sharedWorker.js', ns: 'NDN'}).ready(function(bee, port, sw){
  
  bee.on('custom', function(e){
    console.log('Really,', e.data);
  });
  
  bee.emit('uncustom', 'I DON\'t like turtles...!');
  
  bee.on('msg', function(e){
    console.log('New Message: ', e.data);
  });
  
  bee.on('broadcast', function(e){
    console.log('New Broadcast Message:', e.data);
  });
  
  document.querySelector('button').addEventListener('click', function(){
    var msg = document.querySelector('textarea').value;
    bee.emit('newEvent', msg);
  }, false);
  
});

