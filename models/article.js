const mongoose = require(mongoose)

// CREATE SCHEME
const Schema = mongoose.schema
const ArticleSchema = new Schema ({
  headline: {
    type: string,
    required: true,
  },

  summary: {
    type: string,
    required: true,
  },

  url: {
    type: string,
    required: true,
  }
});

// CREATE MONGOOSE MODEL
const ScrapedNews = mongoose.model('ScrapedNews', ArticleSchema);

// EXPORT
module.exports = ScrapedNews