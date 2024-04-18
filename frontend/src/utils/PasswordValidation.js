const PasswordValidation = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return "Heslo musí obsahovat alespoň jedno písmeno, jedno číslo a jeden speciální znak a mít alespoň 8 znaků.";
    }
    return "";
}

export default PasswordValidation;