var application = {}
application.win = utils.createWindow(true);

application.webview = Ti.UI.createWebView({
  title: 'Torne-se um programador',
  url: '/index.html',
  willHandleTouches:false,
  enableZoomControls:false,
  backgroundColor: '#333'
});

application.win.add(application.webview);
application.win.open();