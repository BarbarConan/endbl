var $scrollTop = $("button#ScrollTop"), $doc = $(document);

// Initialize Foundation.
$doc.foundation();

$doc.on("scroll", function() {
  if (!Foundation.MediaQuery.atLeast("medium")) {
    $scrollTop.hide();
    return;
  }
  if ($(this).scrollTop() > 200) {
    $scrollTop.stop().fadeIn("fast");
  } else {
    $scrollTop.stop().fadeOut("fast");
  }
});

$scrollTop.on("click", function() {
  $("html, body").animate(
    {
      scrollTop: 0
    },
    500
  );
});

// Form validation
Foundation.Abide.defaults.validators["min_length"] = function(
  $el,
  required,
  parent
) {
  // parameter 1 is jQuery selector
  if (!required) return true;
  var from = $el.data("min-length"), to = $el.val().length;
  return parseInt(to) >= parseInt(from);
};

var $Form = new Foundation.Abide($("form#jobForm"));

$Form.$inputs.on("input", function() {
  var $this = $(this), isValid = $Form.validateInput($this);
  if ($this[0].hasAttribute("data-abide-ignore")) return;

  var $icon = $this.next("i").length === 0
    ? $("<i />").addClass("fa").insertAfter($this)
    : $this.next("i");

  if (isValid) {
    $icon.addClass("fa-check").removeClass("fa-times");
  } else {
    $icon.addClass("fa-times").removeClass("fa-check");
  }
});
