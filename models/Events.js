const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    category: String,
    reminderTime: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  
  module.exports = mongoose.model('Event', eventSchema);
  