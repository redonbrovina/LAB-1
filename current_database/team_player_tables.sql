-- Create Teams table
CREATE TABLE IF NOT EXISTS teams (
    TeamId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

-- Create Players table
CREATE TABLE IF NOT EXISTS players (
    PlayerId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Number INT NOT NULL,
    BirthYear INT NOT NULL,
    TeamId INT NOT NULL,
    FOREIGN KEY (TeamId) REFERENCES teams(TeamId) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert sample teams
INSERT INTO teams (TeamId, Name) VALUES 
(1, 'FC Barcelona'),
(2, 'Paris Saint-Germain');

-- Insert sample players
INSERT INTO players (PlayerId, Name, Number, BirthYear, TeamId) VALUES 
(1, 'Lionel Messi', 30, 1987, 1),
(2, 'Neymar Jr.', 10, 1992, 2),
(3, 'Kylian Mbappé', 7, 1998, 2),
(4, 'Sergio Busquets', 5, 1988, 1),
(5, 'Gerard Piqué', 3, 1987, 1),
(6, 'Marco Verratti', 6, 1992, 2);
