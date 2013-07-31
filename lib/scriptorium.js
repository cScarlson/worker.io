/**
 * AUTHOR: Cody S. Carlson
 * Implements: Revealing Module Pattern, Protagonist Pattern, Pseudo-Entanglement.
 * Facade Pattern for HTML5 SharedWorkers API
 */
var $hive = $hive || (function(self){
  var hive, ports = [];
  
  function Hive(){
    hive = this;
    
    return function(callback){
      self.addEventListener('connect', function(e){
        var port = e.ports[0];
        hive.port = port;
        ports.push(port);
        hive.self = self;
        
        hive.port.addEventListener('message', function(e){
          hive.port = e.target; // IMPORTANT! - ASSIGN hive.port to current!
          var dta = JSON.parse(e.data)
            , evt = new MessageEvent(dta.type, {data: dta.data});
          hive.port.dispatchEvent(evt);
        }, false);
        
        port.start();
        (callback) && callback(hive, port, ports, e);
      }, false);
      
      return {
        hive: hive,
        port: hive.port,
        ports: ports,
        load: hive.load,
        listen: hive.listen,
        on: hive.on,
        post: hive.post,
        send: hive.send,
        emit: hive.emit,
        bcast: hive.bcast
      };
    };
  };
  
  Hive.prototype = (function(){
    
    function load(scripts){
      self.importScripts(scripts);
      return this;
    };
    
    function listen(callback){
      return this;
    };
    
    function on(event, callback){
      hive.port.addEventListener(event, callback, false);
      return this;
    };
    
    function post(data){
      emit('message', data);
      return this;
    };
    
    function send(data){
      hive.port.postMessage(data);
      return this;
    };
    
    function broadcast(data){
      ports.forEach(function(p, i, a){
        p.postMessage(data, a);
      });
      
      return this;
    };
    
    function emit(event, data, callback){
      var _event = ((event === 'message') && '_message') || event
        , evt = JSON.stringify(new MessageEvent(_event, {data: data}));
      
      if(_event === 'broadcast'){
        broadcast(evt);
      }else{
        hive.port.postMessage(evt);
      }
      return this;
    };
    
    
    return {
      load: load,
      listen: listen,
      on: on,
      post: post,
      send: send,
      emit: emit,
      bcast: broadcast
    };
  })();
  
  
  return new Hive();
})(self);











