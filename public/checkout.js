var init = function(){
  var $description = $('#description');
  $.get('/session', function(resp) {
      $description.text('Your photo is a ' + resp.photoHeight.toString().slice(0, (resp.photoHeight.toString().indexOf(".")) + 3) + 'x' + resp.photoWidth + ' on a ' + resp.matWidth + ' inch wide ' + resp.matColor.toLowerCase() + ' mat with a ' + resp.frameWidth + ' inch wide ' + resp.profile.toLowerCase() + ' frame.');
  });
}