exports.index = (req, res) => {
  res.render('travel', {
    title: 'Travel | Travlr Getaways',
    isTravel: true
  });
};
