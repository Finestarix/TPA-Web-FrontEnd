export class Validator {

  static isNoValue(checkValue: string): boolean {
    return (checkValue === '') ? true : false;
  }

  static isNumeric(checkNumeric: string): boolean {
    const ruleDigit = /^\d+$/;
    return ruleDigit.test(checkNumeric);
  }

  static isContainPhone(checkPhone: string): boolean {
    return (checkPhone.toLowerCase().includes('phone') === true) ? true : false;
  }

  static validatePhoneRule(checkPhone: string): boolean {
    const rulePhone = /^[0-9]{11,13}$/;
    return rulePhone.test(checkPhone);
  }

  static isContainEmail(checkEmail: string): boolean {
    return (checkEmail.toLowerCase().includes('email') === true) ? true : false;
  }

  static validateEmailRule(checkEmail: string): boolean {
    const ruleEmail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
    return ruleEmail.test(checkEmail);
  }

}
