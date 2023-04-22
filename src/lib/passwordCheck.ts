export function checkPassword(password: string): boolean {
    // Regular expressions for uppercase, lowercase, special characters, and numbers
    const uppercaseRegex: RegExp = /[A-Z]/;
    const lowercaseRegex: RegExp = /[a-z]/;
    const specialCharRegex: RegExp = /[\W_]/; // This includes non-word characters and underscores
    const numberRegex: RegExp = /\d/;

    // Check the length of the password
    if (password.length < 8) {
        return false;
    }

    // Check for at least one uppercase letter
    if (!uppercaseRegex.test(password)) {
        return false;
    }

    // Check for at least one lowercase letter
    if (!lowercaseRegex.test(password)) {
        return false;
    }

    var specialCharAndNumberCount = 0;

    for (var i = 0; i < password.length; i++) {
        if (specialCharRegex.test(password[i]) || numberRegex.test(password[i])) {
            specialCharAndNumberCount++;
        }
    }

    // Check for at least two special characters or numbers
    if (specialCharAndNumberCount < 2) {
        return false;
    }

    // If all requirements are met, return true
    return true;
}