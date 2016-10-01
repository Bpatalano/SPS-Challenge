var init = function() {
  var $heightInch = $('#heightInch');
  var $heightFraction = $('#heightFraction');
  var $widthInch = $('#widthInch');
  var $widthFraction = $('#widthFraction');
  var $frameWidth = $('#frameWidth');
  var $matWidth = $('#matWidth');
  var $profile = $('#profileName');
  var $profileImg = $('#profileImg');
  var $leftProfile = $('#leftProfile');
  var $rightProfile = $('#rightProfile');
  var $style = $('input:radio[name=styleSelect]');
  var $matRadio = $('input:radio[name=matColor]');
  var $customStyle = $('#customForm');
  var $photoUpload = $('#photoUpload');
  var $finalize = $('#finalize');
  var $mat = $('#mat');
  var $frame = $('#frame');
  var $photo = $('#photo');
  
  
  
  var photoResize = function() {
    var photoWidth = Number($widthInch.val()) + Number(eval($widthFraction.val()))
    var scale = (2 * Number($matWidth.val())) + (2 * Number($frameWidth.val())) + photoWidth;
    console.log(scale, ($frameWidth.val()/scale * 12 + 'em'), ($matWidth.val()/scale * 12 + 'em'));
    $frame.css('border-width', ($frameWidth.val()/scale * 24 + 'em'));
    $photo.css('border-width', ($matWidth.val()/scale * 24 + 'em'));
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
  }

  //$photoUpload.on('click', );
  $matRadio.change(function() {
    $photo.css('border-color', $(this).val());
  });
  $style.change(function() {

    if ($(this).val() == 'ratio') {
      $frameWidth.attr('disabled', true);
      $frameWidth.val(1).change();
      $matWidth.attr('disabled', true);
      $matWidth.val(1).change();
    }
    else {
      $frameWidth.attr('disabled', false);
      $matWidth.attr('disabled', false);
    }
  });
  $finalize.on('click', (e)=>{
    e.preventDefault();
    var photoHeight = Number($heightInch.val()) + Number(eval($heightFraction.val()))
    var photoWidth = Number($widthInch.val()) + Number(eval($widthFraction.val()))
    var specs = {};
    specs.photoHeight = photoHeight;
    specs.photoWidth = photoWidth;
    specs.frameWidth = Number($frameWidth.val());
    specs.matWidth = Number($matWidth.val());
    specs.profile = $profile.text();
    specs.matColor = $('input:radio[name=matColor]:checked').val();
    console.log(specs);
  })
  $('#photoDetailerForm').submit(false);
  $widthInch.change(function(e) {
    e.preventDefault();
    photoResize();
  });
  $widthFraction.change(function(e) {
    e.preventDefault();
    photoResize();
  });
  $frameWidth.change(function(e) {
    e.preventDefault();
    photoResize();
  })
  $matWidth.change(function(e) {
    e.preventDefault();
    photoResize();
  })
  $leftProfile.click(function(e) {
    if (selected > 0) {
      selected --;
    }
    else {
      selected = 3;
    }
    frameChange();
  })
  $rightProfile.click(function(e) {
    if (selected < 3) {
      selected ++;
    }
    else {
      selected = 0;
    }
    frameChange();
  })

}