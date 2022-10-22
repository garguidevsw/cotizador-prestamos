const calcTotal =  (qty, plazo) => {
    let total;

    // Mayor cantidad menor interes

    if( qty < 5000 ){
        total = qty * 1.5;
    }else if( qty >= 5000 && qty < 10000) {
        total = qty * 1.4;
    }else if( qty >= 10000 && qty < 15000) {
        total = qty * 1.3;
    }else {
        total = qty * 1.2;
    }

    // Plazo - mas plazo mayor interes
    if( plazo === 6 ) {
        total *= 1.1;
    }else if( plazo === 12 ){
        total *= 1.2;
    }else{
        total *= 1.3;
    }

    return total
}

export {
    calcTotal
}