const renderPage = (view, title) => (req, res) => {
  res.render(view, { title });
};

module.exports = {
  index: renderPage('index', 'Travlr Getaways'),
  travel: renderPage('travel', 'Travel | Travlr Getaways'),
  rooms: renderPage('rooms', 'Rooms | Travlr Getaways'),
  meals: renderPage('meals', 'Meals | Travlr Getaways'),
  news: renderPage('news', 'News | Travlr Getaways'),
  about: renderPage('about', 'About | Travlr Getaways'),
  contact: renderPage('contact', 'Contact | Travlr Getaways')
};
