$(document).on('change', ':file', function () {
  const input = $(this);
  input.trigger('fileselect');
});

$(document).ready(() => {
  $(':file').on('fileselect', (event) => {
    const files = event.target.files;
    let msg = '<p> <br />';
    for (let i = 0; i < files.length; i += 1) {
      msg += ((i + 1) + '. ' + files[i].name + ' - <span class="text-muted">' + files[i].size + 'bytes</span><br />');
    }
    msg += '</p>';
    $('#selected-files').html(msg);
  });
});

$('#div-two').css({ height: (window.innerHeight - 50) + 'px' });

/**
 * It changes the css display of both #landing and #view-two
 * @params {}
 * @returns {} #landing becomes none and #view-two becomes block
 */

function handleClick() {
  $('#landing').css({ display: 'none' });
  $('#view-two').css({ display: 'block' });
}

/**
 * It changes the css display of both #search-form and table tag
 * @params {}
 * @returns {} #search-form becomes none and table becomes block
 */

function createIndex() {
  $('#search-form').css({ display: 'block' });
  $('table').css({ display: 'block' });
}

/**
 * It changes opens the #myModal modal
 * @params {}
 * @returns {} #myModal div opens
 */
function openModal() {
  $('#myModal').modal('show');
}

/**
 * It changes opens the #myModal modal
 * @params {}
 * @returns {} #aboutModal div opens
 */
function openAbout() {
  $('#aboutModal').modal('show');
}
