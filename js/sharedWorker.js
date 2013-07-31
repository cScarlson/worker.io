self.importScripts('/lib/scriptorium.js');

$hive(function(hive, port, ports, event){

  hive.emit('custom', 'I like turtles...');
  hive.on('uncustom', function(e){
    hive.emit('custom', 'You LOVE turtles...');
  });
  
  hive.on('broadcast', function(e){
    port.postMessage('???');
    //hive.emit('broadcast', e.data);
  });
  
}).load('/lib/fakeLib.js');
