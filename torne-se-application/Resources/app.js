
Titanium.UI.setBackgroundColor('#000');

var win = Ti.UI.createWindow({
  backgroundColor:'#ccc',
  title:'Android Cloud Push Notification'
})


var CloudPush = require('ti.cloudpush');
CloudPush.debug = true;
CloudPush.enabled = true;
CloudPush.showTrayNotificationsWhenFocused = true;
CloudPush.focusAppOnPush = false;

var deviceToken;
var Cloud = require('ti.cloud');
Cloud.debug = true;

try{
  Cloud.Users.create({
      username: 'didox',
      password: 'didox',
      password_confirmation: 'didox'
   }, function (e) {
      if (e.success) {
          alert('You are now logged in as ' + e.users[0].username);
      } else {
          alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
      }
  });

  Cloud.Posts.create({
      content: 'Calling ArrowDB from Titanium'
  }, function (e) {
      if (e.success) {
          alert('Post succeeded!');
      } else {
          alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
      }
  });
}catch(e){
  alert(e.message)
}


var submit = Ti.UI.createButton({
  title : 'Register For Push Notification',
  color:'#000',
  height : 53,
  width : 200,
  top : 100,
});

win.add(submit);

submit.addEventListener('click', function(e) {
    CloudPush.retrieveDeviceToken({
            success: function deviceTokenSuccess(e) {
                alert('Device Token: ' + e.deviceToken);
                deviceToken = e.deviceToken
                loginDefault();
            },
            error: function deviceTokenError(e) {
                alert('Failed to register for push! ' + e.error);
          }
    });
  });
  

   function loginDefault(e){
    //Create a Default User in Cloud Console, and login
    Cloud.Users.login({
        login: 'didox',
        password: 'didox'
    }, function (e) {
        if (e.success) {
          alert("login success");
            defaultSubscribe();
        } else {
            alert('Error: ' +((e.error && e.message) || JSON.stringify(e)));
            }
        });
    }
 
    function defaultSubscribe(){
                Cloud.PushNotifications.subscribe({
                    channel: 'alert',
                  device_token: deviceToken,
                  type: 'android'
              }, function (e){
                  if (e.success) {
                     alert('Subscribed for Push Notification!');
                  }else{
                      alert('Error:' +((e.error && e.message) || JSON.stringify(e)));
                  }
                });
    }
 
    CloudPush.addEventListener('callback', function (evt) {
    //alert(evt);
    //alert(evt.payload);
});

CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
    Ti.API.info('Tray Click Launched App (app was not running)');
    //alert('Tray Click Launched App (app was not running');
});

CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
    Ti.API.info('Tray Click Focused App (app was already running)');
    //alert('Tray Click Focused App (app was already running)');
});


win.open();


