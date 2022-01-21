function convert2Table(m, n, bits) {
  let msg = bits.substring(0, m*n)
  let rowparbits = bits.substring(m*n, (m*n)+m)
  let colparbits = bits.substring((m*n)+m, bits.length)
  
  let msg2D = []
  
  for (let i = 0; i < m; i++) {
    let row = []
    let colidx = 0
    for (let j = i * n; j < (i * n) + n; j++) {
      row[colidx] = msg.charAt(j)
      colidx++
    }
    row[colidx] = rowparbits.charAt(i)
    msg2D[i] = row
  }
  msg2D[m] = Array.from(colparbits)
  return msg2D
}

function checkRowParity(row, rowIndex) {
  return row.map(x => parseInt(x)).reduce((prev, cur) => prev + cur) % 2 == 0
}

function checkColumnParity(msg2D, columnIndex, m) {
  let count = 0;
  
  for (let i = 0; i < m + 1; i++) {
    count += parseInt(msg2D[i][columnIndex])
  }
  
  return count % 2 == 0
}

function checkColumnParities(msg2D, m, n, i) {
  for (let j = 0; j < n; j++) {
    if(!checkColumnParity(msg2D, j, m)) {
      changeParity(msg2D, i, j)
      return false
    }
  }
  return true
}

function changeParity(msg2D, x, y) {
  if (msg2D[x][y] == '1')
    msg2D[x][y] = '0'
  else
    msg2D[x][y] = '1'
  
  return msg2D
}

function serialize(msg2D, m, n) {
  let bits = ""
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      bits += msg2D[i][j]
    }
  }
  
  for (let i = 0; i < m; i++) {
    bits += msg2D[i][n]
  }
  
  for (let j = 0; j < n; j++) {
    bits += msg2D[m][j]
  }
  
  return bits
}

/*
 *    m : row count of message
 *    n : column count of message
 * bits : serialized message including row and column parity bits
 */
function correct(m, n, bits) {
  let msg2D = convert2Table(m, n, bits)
  
  for (let i = 0; i < m; i++) {
    if (!checkRowParity(msg2D[i])) {
      if (checkColumnParities(msg2D, m , n, i)) { // only row parity bit has error
        changeParity(msg2D, i, n)
      }
    }
  }
  
  checkColumnParities(msg2D, m , n, m)
  return serialize(msg2D, m, n)
}
