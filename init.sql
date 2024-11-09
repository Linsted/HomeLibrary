-- Підключення до бази даних `tsl_employee`
\c tsl_employee;

-- Створення таблиці `tech_authors`
CREATE TABLE tech_authors (
  ID INT PRIMARY KEY NOT NULL,
  NAME TEXT NOT NULL,
  TYPE TEXT NOT NULL,
  CATEGORY TEXT NOT NULL,
  ATICLES INT NOT NULL
);

-- Вставка даних в таблицю `tech_authors`
INSERT INTO tech_authors VALUES (1, 'Laiba', 'Senior', 'Docker', 50);
