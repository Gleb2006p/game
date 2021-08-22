function replaceAt(string, replacementChar, index){
    let newString = "";
    let i = 0;
    for (let char of string){
        if (i !== index) {
            newString += char;
        }
        else {
            newString += replacementChar;
        }
        i ++;
    }
    return newString;
}
