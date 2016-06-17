var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Mmdr review
 * ==========
 */

var Review = new keystone.List('Review', {
	map: { name: 'mrdid' },
	autokey: { path: 'slug', from: 'mrdid', unique: true }
});

Review.add({
	mrdid: { type: String, required: true },
	status: { type: String },
	tsubmitted: { type: String },
	groupid: { type: String },
	checkedby: {type: String},
	checkedby2: {Type: String }
});

/*
Review.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});*/

Review.defaultColumns = 'mrdid';
Review.register();
