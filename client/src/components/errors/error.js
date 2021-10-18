
export const setErrors = (fullname, email, contact_num, location, reg_date) => {
    
    let errors = {};
    
    //validate Fullname
    if (!fullname) {
        errors.fullname = "Full Name field cannot be blank*.";
    } else {

        if (fullname.length >= 30) {
            errors.fullname = "Full Name field accept up to 30 in size only*.";
        }

        if (typeof fullname !== "undefined") {
            var reg = (/^[-.,a-zA-Z ]+[-,.a-zA-Z ]+$/);
            if (!reg.test(fullname)) {
                errors.fullname = "Full Name field accept characters values only*.";
            }
        }
    }

    //Validate Email
    if (!email) {
       
        errors.email = "Email Address field cannot be blank*.";
    }
    else if (email.length > 45) {
        errors.email = "Email Address field accept up to 45 in size only*.";
    }
    else if (typeof email !== "undefined") {

        let lastAtPos = email.lastIndexOf("@");
        let lastDotPos = email.lastIndexOf(".");

        if (
            !(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                email.indexOf("@@") === -1 &&
                lastDotPos > 2 &&
                email.length - lastDotPos > 2
            )
        ) {
          
            errors.email = "Email Address field should have email domain*.";
        }
    }

    // Validate Contact Number
    if (!contact_num) {
        errors.contact_num = "Contact Number field cannot be blank*.";
    } else {

        if (contact_num.length > 11) {
            errors.contact_num = "Contact Number field accept up to 11 in size only*.";
        }

        if (typeof contact_num !== "undefined") {
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(contact_num)) {
                // formIsValid = false;
                errors.contact_num = "Contact Number field accept numbers only*.";
            }
        }
    }


    //Validate Location
    if (!location) {
        errors.location = "Location field cannot be blank*.";
    }


    //Validation Of Dates;
    if (!reg_date) {
        errors.reg_date = "Registered Date field cannot be blank*.";
    }
    else {

        const today = new Date();
        const currentDate =
            today.getFullYear() + "-" 
            + (today.getMonth() > 8 ? today.getMonth() + 1 : "0"
            + (today.getMonth() + 1)) + "-" 
            + (today.getDate() > 9 ? today.getDate() : "0" + today.getDate());

        if (currentDate !== reg_date) {
            errors.reg_date = "Registered Date field must be today*.";
        }
    }

    return errors;

}