const recipe = require('../entities/recipe/recipe.routes');
const user = require('../entities/user/user.routes');

module.exports = app => {
	app.use('/api', recipe);
    app.use('/auth', user);
};
