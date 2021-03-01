export function isValidAccountName(accountName: string): boolean {
    if (accountName && (accountName.indexOf(';') > 0 || accountName.length > 36)) {
        return true;
    }
    return false;
}

export function isValidFullName(fullName: string): boolean {
    const fullNameRegex = /^([a-zA-ZåæøÅÆØé]{2,18}\s){2,5}$/i;
    // Regex tests for 2 (first & last name) to 5 groups of letters (both uppercase & lowercase, including åæøé),
    // 1 to 18 chars, succeeded by space (removing last space at return time, in the line below)
    return fullNameRegex.test(`${fullName} `) ? false : true;
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^([\w-\u00E5\u00E6\u00D8]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    // Regex include unicode for alphabets åæø
    return emailRegex.test(email) ? false : true;
}

export function isValidPostNumber(postNumber: string): boolean {
    const postNumberRegex = /^\d{4}$/i;
    // Regex tests for 4 digits input
    return postNumberRegex.test(postNumber) ? false : true;
}

export function isValidHouseLetter(houseLetter: string): boolean {
    const houseLetterRegex = /^[a-zA-Z]$/i;
    // Regex tests for 1 letter (case insensitive) input
    return houseLetterRegex.test(houseLetter) ? false : true;
}

export function isValidFloorNumber(floorNumber: string): boolean {
    const floorNumberRegex = /^((\d{1,2})|(st))$/i;
    // Regex tests for 1-2 digits input or "st"
    return floorNumberRegex.test(floorNumber) ? false : true;
}

export function isValidDoorNumber(doorNumber: string): boolean {
    const doorNumberRegex = /^((\d{1,3})|(tv|th|mf))$/i;
    // Regex tests for 1-3 digits input or "tv", "th" or "mf"
    return doorNumberRegex.test(doorNumber) ? false : true;
}

export function isValidStreetNumber(streetNumber: string): boolean {
    const streetNumberRegex = /^\d{1,4}([a-zA-Z]?)$/i;
    // Regex tests for up to 4 digits input, optionally followed by a letter
    return streetNumberRegex.test(streetNumber) ? false : true;
}

export function isValidEAN(eanNumber: string): boolean {
    const eanRegex = /^(57)\d{11}$/i;
    // Regex tests for 13 digits input, where first two are 57
    return eanRegex.test(eanNumber) ? false : true;
}

export function isValidStreetOrCity(streetOrCity: string): boolean {
    const streetOrCityRegex = /^([a-zA-ZåæøÅÆØé,.-\d]{1,18}\s){1,5}$/i;
    // Regex tests for 1 to 5 groups of letters (both uppercase & lowercase,
    // including åæøé,.;- and digits), 1 to 18 chars, succeeded by space (removing last space
    // at return time, in the line below)
    return streetOrCityRegex.test(`${streetOrCity} `) ? false : true;
}

export function isValidCvrNumber(cvr: string): boolean {
    if (cvr) {
        return false;
    }
    return true;
}
export function isValidAddress(address: string): boolean {
    if (address) {
        return false;
    }
    return true;
}
export function isValidPhoneNumber(cvr: string): boolean {
    const cvrRegex = /^\d{8}$/i;
    // Regex tests for 8 digits input
    return cvrRegex.test(cvr) ? false : true;
}

export function isValidRegNumber(regNr: string): boolean {
    const regNrRegex = /^\d{4}$/i;
    // Regex tests for 4 digits input
    return regNrRegex.test(regNr) ? false : true;
}

export function isValidBankAccountNumber(bankAccountNr: string): boolean {
    const bankAccountNrRegex = /^\d{10}$/i;
    // Regex tests for 10 digits input
    return bankAccountNrRegex.test(bankAccountNr) ? false : true;
}

export function isValidMessage(message: string): boolean {
    return message.length < 10;
}
