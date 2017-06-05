var $scrollTop = $('button#ScrollTop'), $doc = $(document);

// Initialize Foundation.
$doc.foundation();

$doc.on('scroll', function() {
  if ($(this).scrollTop() > 200) {
    $scrollTop.stop().fadeIn('fast');
  } else {
    $scrollTop.stop().fadeOut('fast');
  }
});

$scrollTop.on('click', function() {
  $('html, body').animate(
    {
      scrollTop: 0
    },
    500
  );
});
