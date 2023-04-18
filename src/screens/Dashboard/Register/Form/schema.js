const schema = () => ({
  type: 'object',
  required: ['username', 'password', 'otp_sent'],
  properties: {
    otp_sent: {
      type: 'string',
      title: 'otp_sent'
    },
    username: {
      type: 'string',
      title: 'username'
    },
    password: {
      type: 'string',
      title: 'password',
      format: 'password'
    }
    // email: {
    //   type: 'string',
    //   title: 'email'
    // },
    // first_name: {
    //   type: 'string',
    //   title: 'first_name'
    // },
    // last_name: {
    //   type: 'string',
    //   title: 'last_name'
    // }
  }
});

export default schema;
