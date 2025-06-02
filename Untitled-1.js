const API = require('./mock-api');
// To count the matches, call API.countMatches(term) where term is the search term
const EventEmitter = require('events');

class Search extends EventEmitter {
  constructor() {
    super();
  }

  async searchCount(searchText) {
    this.emit('SEARCH_STARTED', searchText);

    if(!searchText) {
      this.emit('SEARCH_ERROR', {
        "term": searchText,
        "message": "INVALID_TERM"
      });
    }
    try {
      const result = await API.countMatches(searchText);
      this.emit('SEARCH_SUCCESS', {
        "term": searchText,
        "count": result
      });
    }catch(e) {
      this.emit('SEARCH_ERROR', {
        "term": searchText,
        "message": e.message
      });
    }
    
  }
}