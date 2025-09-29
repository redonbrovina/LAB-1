-- Planet and Satellite tables with faculty ID suffix
-- Faculty ID: 212299999 (example - replace with actual faculty ID)

-- Create Planet table
CREATE TABLE `Planet212299999` (
  `PlanetId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Type` varchar(100) NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`PlanetId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Satellite table
CREATE TABLE `Satellite212299999` (
  `SatelliteId` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `PlanetId` int(11) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`SatelliteId`),
  KEY `PlanetId` (`PlanetId`),
  CONSTRAINT `Satellite212299999_ibfk_1` FOREIGN KEY (`PlanetId`) REFERENCES `Planet212299999` (`PlanetId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO `Planet212299999` (`Name`, `Type`) VALUES
('Earth', 'Terrestrial'),
('Mars', 'Terrestrial'),
('Jupiter', 'Gas Giant'),
('Saturn', 'Gas Giant'),
('Venus', 'Terrestrial');

INSERT INTO `Satellite212299999` (`Name`, `PlanetId`) VALUES
('Moon', 1),
('Phobos', 2),
('Deimos', 2),
('Io', 3),
('Europa', 3),
('Ganymede', 3),
('Callisto', 3),
('Titan', 4),
('Enceladus', 4);
