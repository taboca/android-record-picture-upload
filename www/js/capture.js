
/* uploadFile

*/

var gFileURL = null;

function startUploadFile() {

  var fileURL = gFileURL;

  var options = new FileUploadOptions();
  options.fileKey = "file";
  options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
  options.mimeType = "audio/x-wav";

//  var params = {};
//  params.value1 = "test";
//  params.value2 = "param";

  options.chunkedMode = false; // Transfer picture to server
  options.headers = {
       Connection: "close"
   }

//  options.params = params;

  var win = function (r) {
      document.getElementById('container').innerHTML=''
      navigator.notification.alert("Code = " + r.responseCode);
      navigator.notification.alert("Response = " + r.response);
      navigator.notification.alert("Sent = " + r.bytesSent);
  }

  var fail = function (error) {
      navigator.notification.alert("An error has occurred: Code = " + error.code);
      navigator.notification.alert("upload error source " + error.source);
      navigator.notification.alert("upload error target " + error.target);
  }

  var ft = new FileTransfer();
  ft.upload(fileURL, encodeURI("http://192.168.2.2:3000/"), win, fail, options);
  ft.onprogress = function(progressEvent) {
      if (progressEvent.lengthComputable) {
          //navigator.notification.alert(progressEvent.loaded / progressEvent.total);
      } else {
      }
  };
}


/**
 *
 */
var initUIEvents = function () {
  document.getElementById("startCapture").addEventListener("click", startCapture);
  document.getElementById("startCaptureIntent").addEventListener("click", startCaptureIntent);
};

function startCapture() {

  var tapEnabled = true; //enable tap take picture
  var dragEnabled = true; //enable preview box drag across the screen
  var toBack = true; //send preview box to the back of the webview
  var rect = {x: 100, y: 100, width: 200, height:200};
  cordova.plugins.camerapreview.startCamera(rect, "front", tapEnabled, dragEnabled, toBack);

  cordova.plugins.camerapreview.setOnPictureTakenHandler(function(result){
      document.getElementById('myImg').src = result[0];//originalPicturePath;
  });

  cordova.plugins.camerapreview.takePicture({maxWidth:640, maxHeight:640});

}

function startCaptureIntent() {

    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI });

    function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

}
/**
 * When cordova fires the deviceready event, we initialize everything needed for audio input.
 */
var onDeviceReady = function () {

    if (window.cordova && window.cordova.file) {
        initUIEvents();
    }
    else {
        disableAllButtons();
    }
};

// Make it possible to run the demo on desktop
if (!window.cordova) {
    // Make it possible to run the demo on desktop
    navigator.notification.alert("Running on desktop!");
    onDeviceReady();
}
else {
    // For Cordova apps
    document.addEventListener('deviceready', onDeviceReady, false);
}
