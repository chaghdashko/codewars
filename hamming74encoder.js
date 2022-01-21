//         msg = x3 x2 x1 x0
// encoded msg = p1 p2 x3 p4 x2 x1 x0
//
// p1 = x3 XOR x2 XOR x0
// p2 = x3 XOR x1 XOR x0
// p4 = x2 XOR x1 XOR x0
function encodeMessage(message) {
  const p1 = xor(message.charAt(3), xor(message.charAt(0), message.charAt(1)))
  const p2 = xor(message.charAt(3), xor(message.charAt(0), message.charAt(2)))
  const p4 = xor(message.charAt(3), xor(message.charAt(1), message.charAt(2)))
  
  return(p1 + p2 + message.charAt(0) + p4 + message.substring(1, message.length))
}

function xor(a, b) {
  return (a !== b) ? "1" : "0"
}
