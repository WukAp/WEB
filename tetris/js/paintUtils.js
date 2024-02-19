function paintGrid(
  ctx, 
  grid,
  startPositionX = 0,
  startPositionY = 0, 
  isFill = true
) {
  grid.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {

        ctx.fillStyle = TETRAMINO_COLOR
        ctx.strokeStyle = TETRAMINO_HINT_COLOR
        ctx.beginPath()
        ctx.arc(
          startPositionX + x + 0.5,
          startPositionY + y + 0.5,
          isFill?0.5:0.05,
          0,
          Math.PI * 2
        )
        if(isFill){
          ctx.fill()
        } else {
        ctx.stroke()
        }
      }
    })
  })
}

function paintGameOver(){
HEADING.textContent = 'GAME OVER'

let records
if(!localStorage["tetris.recordTable"]){
  records = [[userName, toNumber(score)]]
} else {
  records = JSON.parse(localStorage["tetris.recordTable"])
  records.push([userName, toNumber(score)])

  for (let i = 0; i<records.length; i++) {
    if(toNumber(score)>= +records[i][1]) {
      records.splice(i, 0, [userName, toNumber(score)])
      records.pop()
      break
    }
  }
  console.log(records)
}
let text = ''
records.forEach(function(element){
  text+= element[0] + ': '+ element[1] + '<br>'
})
text.trim()
RECORD_TABLE.innerHTML  = text
localStorage["tetris.recordTable"] = JSON.stringify(records)
DIALOG_SCORE.showModal()
closeFra
}

function paintStartNameDialog(){
  INPUT_NAME_TEXT.placeholder = getUserName()
  DIALOG_NAME.showModal()
}
