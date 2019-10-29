var folder = "./images/";

$.ajax({
  url: folder,
  success: function (data) {
    $(data).find("a").attr("href", function(i, val) {
      if(val.match(/\.(jpe?g|png|gif)$/)) {
        var alt = val.replace(/[^0-9a-z]/g, ' ');
        if(i === 0) {
          $(".container ul").append("<li style=\"display: inline-block;\"><img alt=\"" + alt + "\" src='" + folder + val +"'/></li>");
        }
        else {
          $(".container ul").append("<li style=\"display: inline-block;\"><img alt=\"" + alt + "\" src='" + folder + val +"'/></li>");
        }
      }
    });
  }
});


$( window ).on('load', function() {
  // var currentIndex = 0,
  // items = $('.container div'),
  // itemAmt = items.length;
  //
  // function cycleItems() {
  //   var item = $('.container div').eq(currentIndex);
  //   // items.hide();
  //   // item.css('display','inline-block');
  // }
  //
  // $('.next').click(function() {
  //   // clearInterval(autoSlide);
  //   currentIndex += 1;
  //   if (currentIndex > itemAmt - 1) {
  //     currentIndex = 0;
  //   }
  //   var container = $(".container");
  //   var width = $(".container div").width();
  //   container.scrollLeft(container.scrollLeft() - width);
  //   // cycleItems();
  // });
  //
  // $('.prev').click(function() {
  //   // clearInterval(autoSlide);
  //   currentIndex -= 1;
  //   if (currentIndex < 0) {
  //     currentIndex = itemAmt - 1;
  //   }
  //   var container = $(".container");
  //   var width = $(".container div").width();
  //   container.scrollLeft(container.scrollLeft() + width);
  //   // cycleItems();
  // });


  var gallery = $('#gallery ul'),
      items   = gallery.find('li'),
      len     = items.length,
      current = 1,  /* the current item we're looking */

      first   = items.filter(':first-child'),
      second  = items.filter((index)=>index==1),
      last    = items.filter(':last-child'),
      secondlast = items.filter((index)=>index==items.length-2),

      triggers = $('.button');

console.log("second 1 " + second);

  /* 1. Cloning first and last item */
  first.before(secondlast.clone(true));
  first.before(last.clone(true));
  last.after(second.clone(true));
  last.after(first.clone(true));

  /* 2. Set button handlers */
  triggers.on('click', function() {

    if (gallery.is(':not(:animated)')) {
        var width = $("#gallery").width();
        var cycle = false,
            delta = (this.id === "prev")? -1 : 1;
            /* in the example buttons have id "prev" or "next" */

        gallery.animate({ left: "+=" + (-width * delta) }, function() {

            current += delta;

            /**
             * we're cycling the slider when the the value of "current"
             * variable (after increment/decrement) is 0 or when it exceeds
             * the initial gallery length
             */
            cycle = !!(current === 0 || current > len);

            if (cycle) {
                /* we switched from image 1 to 4-cloned or
                   from image 4 to 1-cloned */
                current = (current === 0)? len : 1;
                gallery.css({left:  -width * (current + 1) });
            }
        });
     }

  });
});
