var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Mmdr
 * ==========
 */

var Mmdr = new keystone.List('Mmdr', {
	map: { name: 'mrdid' },
	autokey: { path: 'slug', from: 'mrdid', unique: true }
});

Mmdr.add({
	mrdid: { type: String, required: true },
	mappingdetails: { type: String },
	journal: { type: String },
	accountm: { type: String },
	accountproduct: { type: String },
	tcsetup: { type: String },
	defaultt: { type: String },
	fieldmapping: { type: String },
	batch: { type: String },
	batch2: { type: String },
	state: { type: String },
	groupid: { type: String }
});

/*
Mmdr.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});*/

Mmdr.defaultColumns = 'mrdid';
Mmdr.register();
