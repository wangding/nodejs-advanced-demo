const requireDirectory = require('require-directory');

/*
const { Book, Area, Author, AuthorBook } = requireDirectory(module);

Book.belongsTo(Area, { foreignKey: 'area_id'  });
Book.hasMany(AuthorBook, { foreignKey: 'book_id'  });
AuthorBook.belongsTo(Author, { foreignKey: 'author_id' });
*/

module.exports = requireDirectory(module);
