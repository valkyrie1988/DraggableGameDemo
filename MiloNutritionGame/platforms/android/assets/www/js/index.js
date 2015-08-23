/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        $( "#mCSB_1_container" ).sortable({
             revert: true
        });
        $( ".draggable-food" ).draggable({
            revert: "invalid",
            helper: function(){
              $copy = $(this).clone();
              return $copy;
            },
            appendTo: 'body',
            scroll: false,
            start: function(event, ui) {
                dropped = false;
                $(this).addClass("hide");
            },
            stop: function(event, ui) {
                if (dropped==true) {
                    $(this).remove();
                } else {
                    $(this).removeClass("hide");
                }
            }
        });



        $( "#droppable" ).droppable({
            drop: function( event, ui ) {

                $("#result").text( ui.draggable.attr("id") + " Dropped");
                dropped = true;
                $.ui.ddmanager.current.cancelHelperRemoval = true;
                ui.helper.appendTo(this);
                var $clone = ui.helper.clone();
                //$(ui.helper).clone()
                $clone.addClass('inside-droppable').draggable({
                                   revert: "invalid",
                                              helper: function(){
                                                $copy = $(this).clone();
                                                return $copy;
                                              },
                                              appendTo: 'body',
                                              scroll: false,
                                              start: function(event, ui) {
                                                  dropped = false;
                                                  $(this).addClass("hide");
                                              },
                                              stop: function(event, ui) {
                                                  if (dropped==true) {
                                                      $(this).hide();
                                                  } else {
                                                      $(this).removeClass("hide");
                                                  }
                                              }
                              });
                $(this).append($clone);
                //var html = $(ui.draggable).clone(true);
                ui.draggable.draggable('enable');
            }
        });


		console.log("draggable init");

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       // var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

    }
};

app.initialize();

 // Wait for device API libraries to load
//
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);

}

// device APIs are available
//
function onDeviceReady() {

}