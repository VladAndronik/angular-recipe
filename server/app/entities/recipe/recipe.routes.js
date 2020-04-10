const express = require('express');
const recipe = express.Router();
const recipeService = require('./recipe.service');

recipe.route('/recipes')
	.get((req, res) => {
		recipeService.getAllRecipes()
			.then(recipes => {
                console.log("RESPONSE");
				res.send(recipes);
			})
			.catch(err => {
				console.log(err);
			});
	})
	.post((req, res) => {
		recipeService.addRecipe(req.body)
			.then(recipe => {
				res.send(recipe);
			})
			.catch(err => {
				console.log(err);
			});
	});
	

recipe.route('/recipes/:recipeId')
	.patch((req, res) => {
		recipeService.updateRecipe(req.params.recipeId, req.body)
			.then(recipe => {
				res.send(recipe);
			})
			.catch(err => {
				console.log(err);
			});
	})
	.get((req, res) => {
		recipeService.getRecipeById(req.params.recipeId)
			.then(recipe => {
				res.send(recipe);
			})
			.catch(err => {
				console.log(err);
			});
	})
	.delete((req, res) => {
		recipeService.deleteRecipe(req.params.recipeId)
			.then(recipe => {
				res.send(recipe);
			})
			.catch(err => {
				console.log(err);
			});
	});

module.exports = recipe;
