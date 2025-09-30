-- Create Team table
CREATE TABLE team (
    TeamId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255)
);

-- Create Player table
CREATE TABLE player (
    PlayerId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Number INT,
    BirthYear INT,
    TeamId INT,
    FOREIGN KEY (TeamId) REFERENCES team(TeamId) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert Teams (as per requirements)
INSERT INTO team (TeamId, Name) VALUES 
(1, 'FC Barcelona'),
(2, 'Paris Saint-Germain');

-- Insert Players (as per requirements)
INSERT INTO player (PlayerId, Name, Number, BirthYear, TeamId) VALUES 
(1, 'Lionel Messi', 30, 1987, 1),
(2, 'Neymar Jr.', 10, 1992, 2),
(3, 'Kylian Mbappe', 7, 1998, 2),
(4, 'Sergio Busquets', 5, 1988, 1),
(5, 'Gerard Pique', 3, 1987, 1),
(6, 'Marco Verratti', 6, 1992, 2);
