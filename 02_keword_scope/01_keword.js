function compareScopes() {
    if (true) {
        var varVariable = "var";
        let letVariable = "let";
        const constVariable = "const";
    }
    console.log(varVariable); // "var"
    // console.log(letVariable); // ReferenceError
    // console.log(constVariable); // ReferenceError
}
compareScopes();
