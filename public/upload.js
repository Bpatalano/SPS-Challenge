var init = function() {
  filepicker.setKey(filestackAPIkey);
  // var $heightInch = $('#heightInch');
  // var $heightFraction = $('#heightFraction');
  var $widthInch = $('#widthInch');
  var $widthFraction = $('#widthFraction');
  var $continue = $('#continue');
  var $upload = $('#photoUploadButton');
  var $uploadedPhoto = $('#uploadedPhoto');
  var photoUrl = 'http://jennyross.com/gallery/d/439-3/Panda+Portrait.jpg';
  var photoWidth = 4;
  var photoHeight = 4;
  var photoRatio = 1;
  // $heightInch.change(function(e) {
  //   e.preventDefault();
  // });
  // $heightFraction.change(function(e) {
  //   e.preventDefault();
  // });
  var widthChange = function(){
    photoWidth = Number($widthInch.val()) + Number(eval($widthFraction.val()));
    photoHeight = photoRatio * photoWidth;
  };

  $widthInch.change(function(e) {
    e.preventDefault();
    widthChange();
  });

  $widthFraction.change(function(e) {
    e.preventDefault();
    widthChange();
  });

  $upload.click(function(e) {
    e.preventDefault();
    filepicker.pick(
      function(Blob){

      photoUrl = Blob.url;
      
      photoRatio = Blob.cropped.cropArea.size[1]/Blob.cropped.cropArea.size[0];
      photoHeight = photoRatio * photoWidth;
      $uploadedPhoto.attr('src', photoUrl);
    }
    );
  })
  $continue.click(function(e){
    e.preventDefault();
    var photoDetails ={
      photoUrl: photoUrl,
      photoWidth: photoWidth,
      photoHeight: photoHeight
    }
    $.post('/upload', photoDetails, function(resp){
      window.location = resp;
    });
  })

};