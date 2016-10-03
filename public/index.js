var init = function() {
  var $frameWidth = $('#frameWidth');
  var $matWidth = $('#matWidth');
  var $profile = $('#profileName');
  var $profileImg = $('#profileImg');
  var $leftProfile = $('#leftProfile');
  var $rightProfile = $('#rightProfile');
  var $style = $('input:radio[name=styleSelect]');
  var $matRadio = $('input:radio[name=matColor]');
  var $customStyle = $('#customForm');
  var $finalize = $('#finalize');
  var $mat = $('#mat');
  var $frame = $('#frame');
  var $photo = $('#photo');
  var photoUrl = 'http://jennyross.com/gallery/d/439-3/Panda+Portrait.jpg';
  var photoWidth = 0;
  var photoHeight = 0;
  $.get('/session', function(resp){
    photoUrl = resp.photoUrl;
    photoWidth = Number(resp.photoWidth);
    photoHeight = resp.photoHeight;
    $photo.attr('src', photoUrl);
    photoResize();
  })
  $('#photoDetailerForm').submit(false);
  
  var photoResize = function() {
    var scale = (2 * Number($matWidth.val())) + (2 * Number($frameWidth.val())) + photoWidth;
    $frame.css('border-width', ($frameWidth.val()/scale * 24 + 'em'));
    $photo.css({
      'border-width': ($matWidth.val()/scale * 24 + 'em'),
      'width': (24 - ($frameWidth.val()/scale * 24) + 'em'),
    });

  }

  var profiles = [{
    name:'Black Maple',
    photoUrl:'https://d29mtkonxnc5fw.cloudfront.net/site_assets/corner_shots/black-corner-large.jpg',
    color:'#21171f'
    },
    {
    name: 'White Maple',
    photoUrl: 'https://d29mtkonxnc5fw.cloudfront.net/site_assets/corner_shots/white-corner-large.jpg',
    color: '#f6f1ed'
    },
    {
    name: 'Natural Maple',
    photoUrl: 'https://d29mtkonxnc5fw.cloudfront.net/site_assets/corner_shots/maple-corner-large.jpg',
    color: '#feede3'
    },
    {
    name: 'Natural Walnut',
    photoUrl: 'https://d29mtkonxnc5fw.cloudfront.net/site_assets/corner_shots/walnut-corner-large.jpg',
    color: '#885249'
  }];
  var selected = 0;
  var frameChange = function() {
    $profileImg.attr('src', profiles[selected].photoUrl);
    $profile.text(profiles[selected].name);
    $frame.css('border-color', profiles[selected].color);
  };

  
  $matRadio.change(function() {
    $photo.css('border-color', $(this).val());
  });
  $style.change(function() {
    var photoArea = photoWidth * photoHeight
    var newFrame;
    var newMat;
    if ($(this).val() == 'ratio') {
      $frameWidth.attr('disabled', true);
      $matWidth.attr('disabled', true);
      if (photoArea > 900) {
        newFrame = 1.25;
        newMat = 3
      }
      else if(photoArea > 600 && photoArea <= 900) {
        newFrame = 1.25;
        newMat = 2.5
      }
      else if(photoArea > 480 && photoArea <= 600) {
        newFrame = 0.75
        newMat = 2.5
      }
      else if(photoArea > 360 && photoArea <= 480) {
        newFrame = 0.75
        newMat = 2
      }
      else if(photoArea > 180 && photoArea <= 360) {
        newFrame = 0.75
        newMat = 1.5
      }
      else {
        newFrame = 0.75
        newMat = 1
      }
      $frameWidth.val(newFrame).change();
      $matWidth.val(newMat).change();
    }
    else {
      $frameWidth.attr('disabled', false);
      $matWidth.attr('disabled', false);
    }
  });
  $finalize.on('click', (e)=>{
    e.preventDefault();
    var specs = {};
    specs.photoHeight = photoHeight;
    specs.photoWidth = photoWidth;
    specs.frameWidth = Number($frameWidth.val());
    specs.matWidth = Number($matWidth.val());
    specs.profile = $profile.text();
    specs.matColor = $('input:radio[name=matColor]:checked').val();
    $.post('/', specs, function(resp) {
      window.location = resp;
    });
  });
  $frameWidth.change(function(e) {
    e.preventDefault();
    photoResize();
  });
  $matWidth.change(function(e) {
    e.preventDefault();
    photoResize();
  });
  $leftProfile.click(function(e) {
    if (selected > 0) {
      selected --;
    }
    else {
      selected = 3;
    }
    frameChange();
  });
  $rightProfile.click(function(e) {
    if (selected < 3) {
      selected ++;
    }
    else {
      selected = 0;
    }
    frameChange();
  });

};