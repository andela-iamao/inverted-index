$(document).on('change', ':file', function () {
  var input = $(this);
  input.trigger('fileselect');
});

$(document).ready( () => {
  $(':file').on('fileselect', (event) => {
    const files = event.target.files;
    let msg = '<p> <br />';
    for (let i  = 0; i < files.length; i++) {
      msg += (i + 1 + '. '+files[i].name + ' - <span class="text-muted">'+files[i].size+'bytes</span><br />');
    }
    msg += '</p>';
    $('#selected-files').html(msg);
  });
});

$('#div-two').css({height : (window.innerHeight- 50) + 'px'});

function handleClick() {
  $('#landing').css({display : 'none'});
  $('#view-two').css({display : 'block'});
  
}

function createIndex() {
  $('#search-form').css({display : 'block'});
  $('table').css({display : 'block'});
  
}

function openModal() {
  $('#myModal').modal('show');
}
function openAbout() {
  $('#aboutModal').modal('show');
}