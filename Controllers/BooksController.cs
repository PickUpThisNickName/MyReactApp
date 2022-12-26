using Microsoft.AspNetCore.Authorization;
using test.Data;
using Microsoft.AspNetCore.Mvc;

namespace test.Controllers;

[ApiController]
public class BooksController : ControllerBase
{
    private readonly BooksDbContext _booksDbContext;

    public BooksController(BooksDbContext booksDbContext)
    {
        _booksDbContext = booksDbContext;
    }
    [Route("Books/Get")]
    [HttpGet]
    public IEnumerable<Book> Get()
    {
        return(from p in _booksDbContext.DB_Books
                select new Book
                {
                    Id = p.Id,
                    Name = p.Name,
                    Year = p.Year,
                    Genre = p.Genre,
                    Autor = p.Autor
                }).ToArray();
    }
    [Route("Books/Delete")]
    [HttpPost]
    public void Delete([FromBody] Book _book)
    {
       Book book = new Book();
        if (_book.Id != null)
            book = _booksDbContext.DB_Books.FirstOrDefault(p => p.Id == _book.Id);
       
       if (book != null)
       {
           _booksDbContext.DB_Books.Remove(book);
           _booksDbContext.SaveChanges();
       }
    }
    [Route("Books/Change")]
    [HttpPost]
    public void Change([FromBody] Book _book)
    {
        Book book = new Book();
        if (_book.Id != null)
            book = _booksDbContext.DB_Books.FirstOrDefault(p => p.Id == _book.Id);
    
        if (book != null)
        {
            if (_book.Autor != null)
                book.Autor = _book.Autor;
            if (_book.Genre != null)
                book.Genre = _book.Genre;
            if (_book.Name != null)
                book.Name = _book.Name;
            if (_book.Year != null)
                book.Year = _book.Year;
            _booksDbContext.SaveChanges();
        }
    }
    [Route("Books/Add")]
    [HttpGet]
    public Book Add()
    {
        Book book = new Book()
        {
            Autor = "Author",
            Name = "Name",
            Genre = "Genre",
            Year = "Year"
        };
        _booksDbContext.DB_Books.Add(book);
        _booksDbContext.SaveChanges();
        return _booksDbContext.DB_Books
            .OrderByDescending(a => a.Id)
            .FirstOrDefault();
    }
}
