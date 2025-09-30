-- Create Planeti table
CREATE TABLE planeti (
    PlanetID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Type VARCHAR(255),
    IsDeleted BOOLEAN DEFAULT FALSE
);

-- Create Sateliti table
CREATE TABLE sateliti (
    SatelliteID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    IsDeleted BOOLEAN DEFAULT FALSE,
    PlanetID INT,
    FOREIGN KEY (PlanetID) REFERENCES planeti(PlanetID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert sample data
INSERT INTO planeti (Name, Type, IsDeleted) VALUES 
('Earth', 'Terrestrial', FALSE),
('Mars', 'Terrestrial', FALSE),
('Jupiter', 'Gas Giant', FALSE);

INSERT INTO sateliti (Name, IsDeleted, PlanetID) VALUES 
('Moon', FALSE, 1),
('Phobos', TRUE, 2),
('Deimos', TRUE, 2),
('Europa', TRUE, 3);
