const app = require('./app'); // Correctly require the app module
const config = require('./utils/config'); // Ensure config is also required

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
