const getProfileData = () => ({
  _id: 1221,
  firstName: 'John',
  surname: 'Smith',
  company: {
    name: 'acme co.',
    abn: '4334344343'
  },
  phone: [{ number: '322332423', extension: '32' }],
  address: [
    { street: 'Frank St', suburb: 'Graceville', country: 'AU' },
    { pobox: '401a', suburb: 'Sherwood', country: 'EU' },
    { pobox: '601', suburb: 'Glenberry', country: 'US' }
  ]
});

export default getProfileData;
