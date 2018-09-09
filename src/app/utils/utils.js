
const commentToken = {
    "//": ["cpp", "c", "cc", "java", "js", "cs", "scl", "tsx", "ts"],
    "#": ["hs", "sh", "coffee", "pl", "rb", "py"] 
};

const findCommentTokenFromExtension = (ext) => {
    // return comment token if found, empty string if not found
    let result = "";
    for(const token in commentToken){
        const idx = commentToken[token].indexOf(ext);
        if( idx >= 0 ){
            result = token;
        }
    }
    return result;
}

const addComments = (input, extension, isis_phrases_list) => {
    let token = findCommentTokenFromExtension(extension);
    const lines = input.split("\n");

    if(!token){
        token = prompt("Cannot recongize the file, please specify the comment identifier:", "");
    }

    let newLines = lines.map( line => {
        let result = "";
        const randNum = Math.floor((Math.random() * 5) + 1);  // range: [1, 5]

        if(randNum===1){
            // 1/5 chance to add a comment
            const spacesNum = line[0]===" " ? line.search(/\S/) : 0;
            const prefixSpaces = spacesNum >=0 ? " ".repeat(spacesNum) : "";
            const tabsNum = line[0]==="\t" ? line.split(/[^\t]/)[0].length : 0;
            const prefixtabs = tabsNum >=0 ? "\t".repeat(tabsNum) : "";

            const phrasesIdx = Math.floor((Math.random() * isis_phrases_list.length));
            result += prefixtabs + prefixSpaces + token + isis_phrases_list[phrasesIdx] + "\n";
        }

        result += line;
        return result;
    });

    
    let commentedText = token + isis_phrases_list[0] + "\n" + newLines.join("\n");


    return commentedText;
}



export { addComments };
