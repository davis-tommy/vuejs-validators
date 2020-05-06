const isEmpty = require('./helpers/isEmpty.js');

const Errors = function (validator) {
	this.messages = {};

	/**
	 * Get Validator
	 *
	 * @returns {*}
	 */
	this.getValidator = function () {
		return validator;
	};

	/**
	 * Determine if there are any error messages.
	 */
	this.any = function () {
		return !isEmpty(this.list());
	};

	/**
	 * Determine if there are messages for a given field.
	 */
	this.has = function (field) {
		return Object.keys(this.messages).includes(field)
			&& this.messages[field].length > 0
	};


	/**
	 * Get all of the raw messages for the errors.
	 */
	this.all = function () {
		return this.messages;
	};


	/**
	 * Array of messages for every field
	 */
	this.list = function (field = false) {
		return field
			? this.messages[field]
			: Object.keys(this.messages)
				.map(field => this.messages[field])
				.reduce((list, messages) => [ ...list,  ...messages ], []);
	};

	/**
	 * Get the first message for a given field.
	 */
	this.get = function (field) {
		if (this.has(field)) {
			return this.messages[field][0];
		}
	};

	/**
	 * Add error messages for a given field
	 * @param field
	 * @param error
	 */
	this.add = function(field, error) {
		this.messages[field] = Array.isArray(this.messages[field])
			? this.messages[field]
			: [];

		this.messages[field].push(error);
	};

	/**
	 * Set the raw errors for the collection.
	 */
	this.set = function (errors, value = []) {
		if (typeof errors === 'object') {
			this.messages = errors;
		} else {
			this.messages[errors] = value;
		}
	};


	/**
	 * Remove messages from all errors or
	 * optionally for errors on a specific field.
	 */
	this.forget = function (field) {
		if (typeof field === 'undefined') {
			this.messages = {};
		} else {
			this.messages[field] = [];
		}
	};
};

const makeErrorBag = (validator = {}) => new Errors(validator);
module.exports = makeErrorBag;
