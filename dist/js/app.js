$(document).on('change', ':file', function () {
  const input = $(this);
  console.log('change');
  input.trigger('fileselect');
});

$(document).ready(() => {

  $(':file').on('fileselect', (event) => {
  	console.log('call');
    const files = event.target.files;
    console.log(files);
    let msg = '<p> <br />';
    for (let i  = 0; i < files.length; i++) {
      msg += (i + 1 + '. ' + files[i].name + ' - <span class="text-muted">' + files[i].size + 'bytes</span><br />');
    }
    msg += '</p>';
    $('#selected-files').html(msg);
  });
});


function openModal() {
  $('#myModal').modal('show');
}

function openAbout() {
	console.log('open about');
  $('#aboutModal').modal('show');
}