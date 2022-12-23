using Microsoft.EntityFrameworkCore;

namespace test.Data
{
    public class BooksDbContext:DbContext
    {
        public BooksDbContext(DbContextOptions<BooksDbContext> options)
    : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<Book> DB_Books { get; set; }
    }
}
