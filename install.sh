cordova create shotpeer com.taboca.imagegrab ShotPeer
cd shotpeer
cordova plugin add cordova-plugin-file-transfer
cordova plugin add cordova-plugin-dialogs
cordova plugin add https://github.com/apache/cordova-plugin-camera.git

rm -rf www
cp -r ../www .
cordova platform add android@5.0.0

