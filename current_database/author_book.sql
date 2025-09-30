-- =====================================================
-- MASTER TEMPLATE DATABASE SCHEMA
-- Author & Book (One-to-Many relationship)
-- =====================================================

-- ==================
-- 1. CREATE TABLES
-- ==================

-- AUTHOR TABLE (Parent - One)
CREATE TABLE author (
    AuthorID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    Country VARCHAR(100),
    IsDeleted BOOLEAN DEFAULT FALSE,
    IsActive BOOLEAN DEFAULT TRUE
);

-- BOOK TABLE (Child - Many)
CREATE TABLE book (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255),
    Description TEXT,
    PublishYear INT,
    Price DECIMAL(10, 2),
    ISBN VARCHAR(20) UNIQUE,
    AuthorID INT,  -- FOREIGN KEY
    IsDeleted BOOLEAN DEFAULT FALSE,
    InStock BOOLEAN DEFAULT TRUE,
    
    -- Foreign Key Constraint me CASCADE
    FOREIGN KEY (AuthorID) REFERENCES author(AuthorID) 
        ON DELETE CASCADE   -- Kur fshijmë Author, fshihen edhe Books
        ON UPDATE CASCADE   -- Kur përditësojmë AuthorID, përditësohen edhe Books
);

-- ==================
-- 2. INSERT SAMPLE DATA
-- ==================

-- Insert Authors
INSERT INTO author (Name, Email, Country, IsDeleted, IsActive) VALUES 
('J.K. Rowling', 'jkrowling@example.com', 'United Kingdom', FALSE, TRUE),
('George R.R. Martin', 'grrm@example.com', 'United States', FALSE, TRUE),
('Stephen King', 'sking@example.com', 'United States', FALSE, TRUE),
('Agatha Christie', 'achristie@example.com', 'United Kingdom', FALSE, FALSE),  -- Inactive
('Jane Austen', 'jausten@example.com', 'United Kingdom', TRUE, FALSE);  -- Deleted

-- Insert Books
INSERT INTO book (Title, Description, PublishYear, Price, ISBN, AuthorID, IsDeleted, InStock) VALUES 
-- J.K. Rowling books (AuthorID = 1)
('Harry Potter and the Philosopher''s Stone', 'First book in Harry Potter series', 1997, 19.99, '978-0439708180', 1, FALSE, TRUE),
('Harry Potter and the Chamber of Secrets', 'Second book in Harry Potter series', 1998, 19.99, '978-0439064873', 1, FALSE, TRUE),
('Harry Potter and the Prisoner of Azkaban', 'Third book in Harry Potter series', 1999, 21.99, '978-0439136365', 1, FALSE, FALSE),  -- Out of stock

-- George R.R. Martin books (AuthorID = 2)
('A Game of Thrones', 'First book in A Song of Ice and Fire', 1996, 29.99, '978-0553103540', 2, FALSE, TRUE),
('A Clash of Kings', 'Second book in A Song of Ice and Fire', 1998, 29.99, '978-0553108033', 2, FALSE, TRUE),

-- Stephen King books (AuthorID = 3)
('The Shining', 'Horror novel about the Overlook Hotel', 1977, 15.99, '978-0307743657', 3, FALSE, TRUE),
('It', 'Horror novel about a shape-shifting entity', 1986, 18.99, '978-1501142970', 3, FALSE, TRUE),
('The Stand', 'Post-apocalyptic horror/fantasy novel', 1978, 22.99, '978-0307743688', 3, TRUE, FALSE),  -- Deleted book

-- Agatha Christie books (AuthorID = 4 - Inactive author)
('Murder on the Orient Express', 'Classic mystery novel', 1934, 12.99, '978-0062693662', 4, FALSE, TRUE),

-- Jane Austen books (AuthorID = 5 - Deleted author)
('Pride and Prejudice', 'Classic romance novel', 1813, 9.99, '978-0141439518', 5, TRUE, TRUE);  -- Deleted book of deleted author


-- ==================
-- 3. USEFUL QUERIES (Shembuj të përdorshëm)
-- ==================

-- A) Merr të gjithë autorët AKTIVË (Jo të fshirë dhe aktivë)
-- SELECT * FROM author WHERE IsDeleted = FALSE AND IsActive = TRUE;

-- B) Merr të gjithë librat me emrin e autorit (JOIN)
-- SELECT b.BookID, b.Title, b.Price, a.Name AS AuthorName 
-- FROM book b 
-- INNER JOIN author a ON b.AuthorID = a.AuthorID 
-- WHERE b.IsDeleted = FALSE;

-- C) Numëro sa libra ka çdo autor
-- SELECT a.Name, COUNT(b.BookID) AS BookCount 
-- FROM author a 
-- LEFT JOIN book b ON a.AuthorID = b.AuthorID AND b.IsDeleted = FALSE 
-- WHERE a.IsDeleted = FALSE 
-- GROUP BY a.AuthorID, a.Name;

-- D) Merr librat që çmimi është midis 10 dhe 20 dollarë
-- SELECT * FROM book WHERE Price BETWEEN 10 AND 20 AND IsDeleted = FALSE;

-- E) Merr librat e publikuar pas vitit 1990
-- SELECT * FROM book WHERE PublishYear >= 1990 AND IsDeleted = FALSE;

-- F) Kërko autor sipas emrit (LIKE)
-- SELECT * FROM author WHERE Name LIKE '%King%' AND IsDeleted = FALSE;

-- G) Merr librat në stok
-- SELECT * FROM book WHERE InStock = TRUE AND IsDeleted = FALSE;

-- H) SOFT DELETE - Marko librin si të fshirë (jo e fshin realisht)
-- UPDATE book SET IsDeleted = TRUE WHERE BookID = 1;

-- I) HARD DELETE - Fshi përfundimisht librin
-- DELETE FROM book WHERE BookID = 1;

-- J) CASCADE DELETE - Fshi autorin (fshihen edhe librat e tij automatikisht)
-- DELETE FROM author WHERE AuthorID = 1;

-- K) RESTORE - Rikthe librin e fshirë
-- UPDATE book SET IsDeleted = FALSE WHERE BookID = 1;
