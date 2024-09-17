$( ".cell" ).on( "click", function() {
    if ($(this).hasClass("selectedPrimary")) {
        $(".cell").removeClass("selectedPrimary")
        $(".cell").removeClass("selectedSecondary")
    } else {
        $(".cell").removeClass("selectedPrimary")
        $(".cell").removeClass("selectedSecondary")
        const id = $(this).attr("id")
        const cellX = Number(id.charAt(0))
        const cellY = Number(id.charAt(1))
        for (let i=0; i <9; i++) {
            $("#" + cellX + i).addClass("selectedSecondary")
            $("#" + i + cellY).addClass("selectedSecondary")
        }
        $(this).removeClass("selectedSecondary")
        $(this).addClass("selectedPrimary")
    }
} );