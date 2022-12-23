using Serilog;

namespace test.Data
{
    public class BooksDbObjects
    {
        public static void Initial(BooksDbContext content)
        {
            if (!content.DB_Books.Any())
            {
                content.DB_Books.AddRange(
                    new Book { Name = "Доктор-Шифр", Year = "2022", Autor = "Роман-Ньюман", Genre = "Фэнтези" },
                    new Book { Name = "Ньют, нарушитель законов физики", Year = "2021", Autor = "Егор Михайлович Кириченко", Genre = "Фантастика" },
                    new Book { Name = "Человек, который умер смеясь", Year = "1860", Autor = "Виктор Гюго", Genre = "Детектив" }
                    );
                Log.Debug("В базу данных DB_Books добавлены стартовые значения");

                content.SaveChanges();
            }
        }
    }
}
