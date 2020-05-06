const isEmpty = require('./helpers/isEmpty.js');

module.exports = function () {
	this.messages = {};

	/**
	 * Determine if there are any error messages.
	 */
	this.exist = function () {
		return !isEmpty(this.messages);
	};


	/**
	 * Determine if there are messages for a given field.
	 */
	this.has = function (field) {
		return Object.keys(this.messages).includes(field)
			&& this.messages[field].length > 0
	};


	/**
	 * Get all of the raw errors for the collection.
	 */
	this.all = function () {
		return this.messages;
	};


	/**
	 * Get all of the messages for every field
	 */
	this.list = function () {
		let values = this.messages;

		return Array.isArray(values)
			? values.flat()
			: [];
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
	 * Add array of messages for a given field
	 * @param field
	 * @param errors
	 */
	this.fill = function(field, errors = []) {
		this.messages[field] = errors;
	};

	/**
	 * Set the raw errors for the collection.
	 */
	this.set = function (errors) {
		if (typeof errors === 'object') {
			this.messages = errors;
		} else {
			this.messages = { form: ["Uh oh something's not right"] };
		}
	};


	/**
	 * Remove errors from the collection.
	 */
	this.forget = function (field) {
		if (typeof field === 'undefined') {
			this.messages = {};
		} else {
			this.messages[field] = [];
		}
	};
};
