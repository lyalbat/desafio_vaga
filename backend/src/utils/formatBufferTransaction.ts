export function formatBufferTransaction(line:string){
    const formattedLine = line.split(";")
    if(!formattedLine) return 
    const transaction = {
        id: formattedLine[0].split(":")[1],
        nome:formattedLine[1].split(":")[1],
        cpfCnpj:formattedLine[2].split(":")[1],
        data:formattedLine[3].split(":")[1],
        valor: formattedLine[4].split(":")[1]
        }
    return transaction
 }