const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    article_id: { 'type': String, 'default': shortid.generate},
    blurb: String,
    title: String, // add unique constraint
    link: String,
    publication_id: {type: Schema.Types.ObjectId, ref: 'Publication'}
}, {timestamps: { createdAt: 'retrieved_on'}});

const PublicationSchema = new Schema({
    pub_id: { 'type': String, 'default': shortid.generate},
    title: {type: String}, //add unique constraint
    short_title: {type: String, required: true},
    base_url: {type: String, required: true, unique: true},
    sections: [{type: String}]
}, {timestamps: { createdAt: 'created_on', updatedAt: 'updated_on'}});

exports.Publication = mongoose.model('Publication', PublicationSchema);

module.exports.get = function (callback, limit) {
    this.Publication.find(callback).limit(limit);
}

exports.Article = mongoose.model('Article', ArticleSchema);