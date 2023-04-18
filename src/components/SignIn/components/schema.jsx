export const signInSchema = {
    cellphone: {
        presence: { allowEmpty: false, message: 'is required' },
        // email: true,
        length: {
            maximum: 64
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    }
};

export const phoneSchema = {
    cellphone: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 14
        }
    },
};

export const logisterSchema = {
    cellphone: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 14
        }
    },
    register_code: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 64
        }
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    }
};

export const signUpSchema = {
    username: {
        presence: { allowEmpty: false, message: 'is required' },
        // email: true,
        length: {
            maximum: 64
        }
    },
    // first_name: {
    //     presence: { allowEmpty: false, message: 'is required' },
    //     // email: true,
    //     length: {
    //         maximum: 64
    //     }
    // },
    // last_name: {
    //     presence: { allowEmpty: false, message: 'is required' },
    //     // email: true,
    //     length: {
    //         maximum: 64
    //     }
    // },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
        
    },
    // re_password: {
    //   presence: { allowEmpty: false, message: 'is required' },
    //   length: {
    //       maximum: 128
    //   },
    //   equality:{
    //     attribute: "password",
    //     message: "مقدار وارد شده با مقدار رمز عبور متفاوت است",
    //   } 
    // }
};

export const resetPassSchema = {
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
        
    },
    re_password: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
          maximum: 128
      },
      equality:{
        attribute: "password",
        message: "مقدار وارد شده با مقدار رمز عبور متفاوت است",
      } 
    }
};

export const userUpdateSchema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 64
        }
    },
    firstname: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    },
    lastname: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128
        }
    }
};