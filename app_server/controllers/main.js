const port = process.env.PORT || 3000;
const tripsApiUrl = `http://127.0.0.1:${port}/api/trips`;

const renderPage = (view, title) => async (req, res, next) => {
  try {
    let trips = [];

    if (view === 'travel') {
      const response = await fetch(tripsApiUrl);

      if (!response.ok) {
        throw new Error(`Trips API returned HTTP ${response.status}`);
      }

      trips = await response.json();
    }

    res.render(view, {
      title,
      trips,
      isHome: view === 'index',
      isTravel: view === 'travel',
      isRooms: view === 'rooms',
      isMeals: view === 'meals',
      isNews: view === 'news',
      isAbout: view === 'about',
      isContact: view === 'contact'
    });
  } catch (error) {
    next(error);
  }
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