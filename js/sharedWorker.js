self.importScripts('/lib/scriptorium.js');

$hive(function(hive, port, ports, e){
  hive.emit('custom', 'I like turtles...');
  hive.on('uncustom', function(data){
    hive.emit('custom', 'You LOVE turtles...');
  });
  
}).load('/lib/fakeLib.js');
