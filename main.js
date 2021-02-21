/*global document, window*/

var DOMReady = (function () {

    var isDOMReady = false;
    var methodList = [];

    function eventHandler(event) {

        if (isDOMReady) {
            console.log('DOM is already ready');
            logMe(event);
            return;
        }

        if (event.type === "readystatechange" && document.readyState !== "complete") {
            console.log('DOM is not fully ready');
            logMe(event);
            return;
        }
        // invoke all functions/methods.
        for (var i = 0; i < methodList.length; i++) {
            if (Array.isArray(methodList[i])) {
                methodList[i][0].call(methodList[i][1]);
            } else {
                methodList[i]();
            }
            console.log('method executed here');
            logMe(event);
        }
        isDOMReady = true;
    }
    //attach eventHandler for all 3 events

    document.addEventListener('readystatechange', eventHandler, false);
    document.addEventListener('DOMContentLoaded', eventHandler, false);
    window.addEventListener('DOMContentLoaded', eventHandler, false);

    function logMe(event) {
        console.log('Name = ' + event.type);
        console.log('Name = ' + event.timeStamp);
        console.log('readyState = '+ document.readyState);
        console.log('----------------------------------------');
    }
    
    return function(method, DOMObject) {
        
        if(isDOMReady){
            
            DOMObject === undefined ? method() : method.call(DOMObject);
            
        }else {
            
            DOMObject === undefined ? methodList.push(method) : methodList.push([method, DOMObject]);
            
        }
        
    };
}) ();

var childCount = function() {
    
    console.log(this.childNodes.length);
    
};

var imgeCount = function() {
    
    console.log(document.getElementsByTagName('img').length);
    
};

DOMReady(childCount,document);
DOMReady(imgeCount);