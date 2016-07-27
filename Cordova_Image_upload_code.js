  $scope.success =  function (r) {
    var resp = JSON.parse(r.response);
  };

  $scope.error = function (error) {
    $ionicPopup.alert({
      title: "Image Uploading",
      cssClass:'validation-popup error',
      content: "Vehicle image could not upload to server."
    });
    $ionicLoading.hide();
  };

  $scope.submitPhoto = function(imageURI, vImage, field_name){
    var imagefile = imageURI;
    var options = new FileUploadOptions();

    /* Image Upload Start */
    options.fileKey= vImage;
    options.fileName=imagefile.substr(imagefile.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = new Object();
    params.field_name = field_name;

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();

    var upload_path='app/uploadvehicle';

    ft.upload(imagefile, AppGlobalConfigs.upload_base_url+upload_path , $scope.success, $scope.error, options);
    $ionicLoading.show({
      content: 'Loading...',
      showBackdrop: true
    });
  };

  $scope.uploadPhoto = function(field_name){
    window.imagePicker.getPictures(
      function(results) {
        for (var i = 0; i < results.length; i++) {
          $scope.submitPhoto(results[i],"file",field_name);
        }
      }, function (error) {
        $ionicPopup.alert({
          title: "Image Uploading",
          cssClass:'validation-popup error',
          content: "Vehicle image could not select for upload."
        });
      },{
          maximumImagesCount:1
        }
    );
  };