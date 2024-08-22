$( ".inputCell" ).on( "click", function(){
    if ($(".selectedPrimary").length == 1 && !$(".selectedPrimary").hasClass("locked")) {
        const selectedCell = $(".selectedPrimary").first()
        const selectedNumber = $(this).attr("id").charAt(2)
        const id = $(selectedCell).attr("id")
        const cellX = Number(id.charAt(0))
        const cellY = Number(id.charAt(1))

        if (selectedNumber == "0" || selectedCell.children().eq(0).html() == selectedNumber) {
            selectedCell.children().eq(0).html("")
            board[cellX][cellY] = 0
        } else {
            selectedCell.children().eq(0).html(selectedNumber)
            board[cellX][cellY] = Number(selectedNumber)
            
        }
        checkErrors()
    }
    })

$(document).on( "keydown", function(event) {
    if ([0,1,2,3,4,5,6,7,8,9].includes(Number(event.key))) {
        if ($(".selectedPrimary").length == 1 && !$(".selectedPrimary").hasClass("locked")) {
            const selectedCell = $(".selectedPrimary").first()
            const selectedNumber = event.key
            const id = $(selectedCell).attr("id")
            const cellX = Number(id.charAt(0))
            const cellY = Number(id.charAt(1))

            if (selectedNumber == "0" || selectedCell.children().eq(0).html() == selectedNumber) {
                selectedCell.children().eq(0).html("")
                board[cellX][cellY] = 0
            } else {
                selectedCell.children().eq(0).html(selectedNumber)
                board[cellX][cellY] = Number(selectedNumber)
            }
            
        }
        checkErrors()
    }
});