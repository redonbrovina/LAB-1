-- Create Employee table
CREATE TABLE employee (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Surname VARCHAR(255)
);

-- Create Contract table
CREATE TABLE contract (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Employee INT,
    Title VARCHAR(255),
    Description TEXT,
    FOREIGN KEY (Employee) REFERENCES employee(ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert sample employees
INSERT INTO employee (Name, Surname) VALUES 
('John', 'Doe'),
('Jane', 'Smith'),
('Michael', 'Johnson');

-- Insert sample contracts
INSERT INTO contract (Employee, Title, Description) VALUES 
(1, 'Full-time Employment', 'Standard full-time contract with benefits'),
(1, 'NDA Agreement', 'Non-disclosure agreement for sensitive projects'),
(2, 'Part-time Employment', 'Part-time contract, 20 hours per week'),
(3, 'Consulting Agreement', 'Contract for consulting services');
