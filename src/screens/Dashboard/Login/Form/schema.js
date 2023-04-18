const schema = () => ({
  type: 'object',
  required: ['cellphone', 'password'],
  properties: {
    cellphone: {
      type: 'string',
      title: 'نام کاربری',
      default: ''
    },
    password: {
      type: 'string',
      title: 'رمزعبور',
      format: 'password',
      default: ''
    }
  }
});

export default schema;
