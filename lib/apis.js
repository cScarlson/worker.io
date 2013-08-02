/**
 * AUTHOR: Cody S. Carlson
 * Implements: Revealing Module Pattern, Protagonist Pattern, Pseudo-Entanglement.
 * Facade Pattern for HTML5 SharedWorkers API (Client)
 */
var $bee = $bee || (function(){
  'use strict';
  
  var self;
  
  function Apis(){
    self = this;
    return function protagonist(opts){
      opts.path = opts.path || '/js/scriptorium.js';
      opts.ns = opts.ns || 'Apis-Scriptorium-SharedWorker';
      self.sw = (opts) && new SharedWorker(opts.path, opts.ns);
      self.port = self.sw.port;
      
      self.port.addEventListener('message', function(e){
        var dta = JSON.parse(e.data);
        //if(dta.type === '$message') console.log('We got a message type!', dta.type, dta);
        //else console.log('Not a message type?', dta.type, dta);
        var evt = new MessageEvent(dta.type, {data: dta.data});
        self.sw.dispatchEvent(evt);
      }, false);
      
      window.onbeforeunload = function(){
        //self.sw.port.emit('destroy port');
        //return '';
      };
      
      return {
        self: self,
        sw: self.sw,
        port: self.port,
        start: self.start,
        ready: self.ready,
        listen: self.listen,
        on: self.on,
        post: self.post,
        send: self.send,
        emit: self.emit,
        bcast: self.bcast,
        error: self.error
      };
    };
  };
  
  Apis.prototype = (function(){
    
    function start(){
      self.port.start();
      return this;
    };
    
    function ready(callback){
      start();
      (callback) && callback(this, self.port, self.sw);
      return this;
    };
    
    function listen(callback){
      return this;
    };
    
    function on(event, callback){
      var evt = ((event === 'message') && '$message') || event;
      self.sw.addEventListener(evt, callback, false);
      return this;
    };
    
    function post(data){
      self.port.postMessage(data);
      return this;
    };
    
    function send(data){
      emit('message', data);
      return this;
    };
    
    function broadcast(data){
      return this;
    };
    
    function emit(event, data, callback){
      var evt = ((event === 'message') && '$message') || event
        , evt = JSON.stringify(new MessageEvent(evt, {data: data}));
      
      self.port.postMessage(evt);
      return this
    };
    
    function error(cb){
      self.port.addEventListener('error', function(e){
        var errorMsg = e.message + " (" + e.filename + ":" + e.lineno + ")";
        cb && cb(errorMsg);
        throw new Error(errorMsg);
      }, false);
      
      return this;
    };
    
    return {
      start: start,
      ready: ready,
      listen: listen,
      on: on,
      post: post,
      send: send,
      emit: emit,
      bcast: broadcast,
      error: error
    };
  })();
  
  return new Apis();
})();













