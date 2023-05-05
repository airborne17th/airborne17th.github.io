 // Creates the assets to run the images in the ads
 var nextSlide = $("#slides img:first-child");
 var nextCaption;
 var nextSlideSource;
     
 // start slide show
 setInterval( function () {   
 //Sets the intervals as each image and caption will fade in and out and call the next one in the gallery.
        $("#caption").fadeOut(1000);
        $("#slide").fadeOut(1000,
            function () {
                 if (nextSlide.next().length == 0) {
                 nextSlide = $("#slides img:first-child");
             }
             else {
                 nextSlide = nextSlide.next();
             }
             nextSlideSource = nextSlide.attr("src");
             nextCaption = nextSlide.attr("alt");
             $("#slide").attr("src", nextSlideSource).fadeIn(1000);					
             $("#caption").text(nextCaption).fadeIn(1000);
         }
     );    // end callback
 },
 3000);