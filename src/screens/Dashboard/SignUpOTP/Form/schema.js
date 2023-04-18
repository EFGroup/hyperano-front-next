const schema = () => ({
  type: 'object',
  required: ['new_phone'],
  properties: {
    new_phone: {
      type: 'string',
      title: 'phone',
      format: 'phone'
    }
  }
});

export default schema;
