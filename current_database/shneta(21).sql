-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2025 at 01:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shneta`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `adminID` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `kodi_personal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`adminID`, `email`, `pass`, `kodi_personal`) VALUES
(1, 'admin@shneta.com', '$2b$12$QAFMXKnp4bVYvxEqoTkVrOH8pnOvf7NnhcWvjj6WZLZgbJEwZUAPG', 12345),
(2, 'admin2@shneta.com', '$2b$12$382HmdKr8zKoGjXPAFtkvOMrvpMwQdX9cx94RVCeSFjvNY3Nyecf6', 67890);

-- --------------------------------------------------------

--
-- Table structure for table `aplikimi`
--

CREATE TABLE `aplikimi` (
  `aplikimiID` int(11) NOT NULL,
  `emri_kompanise` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `aplikimi_statusID` int(11) DEFAULT 1,
  `koha_aplikimit` datetime DEFAULT current_timestamp(),
  `koha_kontrollimit` datetime DEFAULT NULL,
  `Arsyeja` text DEFAULT NULL,
  `adminID` int(11) DEFAULT NULL,
  `adresa` varchar(255) DEFAULT NULL,
  `shtetiId` int(11) DEFAULT NULL,
  `qyteti` varchar(100) DEFAULT NULL,
  `kodi_postal` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aplikimi`
--

INSERT INTO `aplikimi` (`aplikimiID`, `emri_kompanise`, `email`, `aplikimi_statusID`, `koha_aplikimit`, `koha_kontrollimit`, `Arsyeja`, `adminID`, `adresa`, `shtetiId`, `qyteti`, `kodi_postal`, `password`) VALUES
(1, 'Albania Foods Shpk', 'contact@albaniafoods.com', 3, '2025-01-15 10:30:00', '2025-01-16 14:20:00', NULL, 1, 'Rr. Bulevardi 28 Nëntori', 6, 'Tirana', '1001', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(2, 'Vesa Company', 'vesavrellaku14@gmail.com', 3, '2025-01-16 09:15:00', '2025-01-17 11:45:00', NULL, 1, 'Rr. Dëshmorët e Kombit', 250, 'Prishtinë', '10000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(3, 'Pharma Plus', 'info@pharmaplus.com', 3, '2025-01-17 14:20:00', '2025-01-18 16:30:00', NULL, 1, 'Rr. Nëna Terezë', 250, 'Prizren', '20000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(4, 'MedSupply Tirana', 'contact@medsupply.al', 2, '2025-01-18 11:00:00', '2025-01-19 13:15:00', 'Dokumentacioni i paplotë', 1, 'Rr. Myslym Shyri', 6, 'Tirana', '1000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(5, 'Balkan Health', 'info@balkanhealth.com', 1, '2025-01-19 15:30:00', NULL, NULL, NULL, 'Rr. Skënderbeu', 6, 'Durrës', '2000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(6, 'European Pharma', 'contact@europharma.eu', 3, '2025-01-20 08:45:00', '2025-01-21 10:20:00', NULL, 1, 'Rr. Gjergj Kastrioti', 6, 'Vlorë', '9400', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(7, 'Mediterranean Med', 'info@medmed.com', 2, '2025-01-21 12:15:00', '2025-01-22 14:45:00', 'Licenca e skaduar', 1, 'Rr. Ismail Qemali', 6, 'Shkodër', '4000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(8, 'Alpine Pharmaceuticals', 'contact@alpinepharma.ch', 3, '2025-01-22 16:00:00', '2025-01-23 09:30:00', NULL, 1, 'Bahnhofstrasse 1', 42, 'Zürich', '8001', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(9, 'Nordic Health', 'info@nordichealth.no', 1, '2025-01-23 10:30:00', NULL, NULL, NULL, 'Karl Johans gate 1', 168, 'Oslo', '0154', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(10, 'Central European Med', 'contact@cemed.cz', 3, '2025-01-24 13:45:00', '2025-01-25 15:20:00', NULL, 1, 'Václavské náměstí 1', 59, 'Praga', '11000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(11, 'Balkan Health Solutions', 'info@balkanhealth.rs', 2, '2025-01-25 09:20:00', '2025-01-26 11:10:00', 'Certifikimi i paplotë', 1, 'Knez Mihailova 1', 205, 'Beograd', '11000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(12, 'Adriatic Pharmaceuticals', 'contact@adriaticpharma.hr', 3, '2025-01-26 14:15:00', '2025-01-27 16:45:00', NULL, 1, 'Trg bana Jelačića 1', 100, 'Zagreb', '10000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(13, 'Danube Medical', 'info@danubemed.hu', 1, '2025-01-27 11:30:00', NULL, NULL, NULL, 'Váci utca 1', 102, 'Budapest', '1052', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(14, 'Carpathian Pharma', 'contact@carpathianpharma.ro', 3, '2025-01-28 15:45:00', '2025-01-29 17:30:00', NULL, 1, 'Calea Victoriei 1', 189, 'București', '010061', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(15, 'Mediterranean Wellness', 'info@medwellness.gr', 2, '2025-01-29 08:20:00', '2025-01-30 10:15:00', 'Audit i dështuar', 1, 'Syntagma Square 1', 90, 'Athina', '10563', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(16, 'TechMed Solutions', 'contact@techmed.com', 1, '2025-01-30 09:15:00', NULL, NULL, NULL, 'Rr. Dritan Hoxha', 6, 'Tirana', '1001', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(17, 'Digital Health Albania', 'info@digitalhealth.al', 3, '2025-01-31 14:30:00', '2025-02-01 16:45:00', NULL, 1, 'Rr. Myslym Shyri', 6, 'Tirana', '1000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(18, 'Kosovo Medical Center', 'contact@kosovomedical.ks', 2, '2025-02-01 11:20:00', '2025-02-02 13:10:00', 'Dokumentacioni i paplotë', 1, 'Rr. Nëna Terezë', 250, 'Prishtinë', '10000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(20, 'altin', 'altinvrellaku11@gmail.com', 3, '2025-09-21 15:30:00', '2025-09-21 15:30:48', 'klsdjffffffffffffffffffffffffffjdkf', NULL, 'Lagjia e Spitalit', 25, 'Prishtine', '10000', 'Altinvrellaku123'),
(21, 'fjolla', 'fjollanebihi1@gmail.com', 3, '2025-09-26 19:50:52', '2025-09-26 19:51:28', 'se osht ma e mira', NULL, 'Ferizaj', 26, 'Ferizaj', '10000', 'Vesa1234');

-- --------------------------------------------------------

--
-- Table structure for table `aplikimi_status`
--

CREATE TABLE `aplikimi_status` (
  `aplikimi_statusID` int(11) NOT NULL,
  `statusi` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aplikimi_status`
--

INSERT INTO `aplikimi_status` (`aplikimi_statusID`, `statusi`) VALUES
(1, 'pending'),
(2, 'refuzuar'),
(3, 'pranuar');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartID` int(11) NOT NULL,
  `koha_krijimit` datetime DEFAULT current_timestamp(),
  `cmimi_total` decimal(8,2) DEFAULT NULL,
  `klientiID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cartID`, `koha_krijimit`, `cmimi_total`, `klientiID`) VALUES
(1, '2025-01-30 09:30:00', 40.00, 1),
(2, '2025-01-30 10:15:00', 25.00, 2),
(3, '2025-01-30 11:45:00', 0.00, 3),
(4, '2025-01-30 12:20:00', 35.50, 4),
(5, '2025-01-30 13:10:00', 18.75, 5),
(6, '2025-01-30 14:00:00', 0.00, 6),
(7, '2025-01-30 14:45:00', 42.30, 7),
(8, '2025-01-30 15:30:00', 0.00, 8),
(9, '2025-01-30 16:15:00', 28.90, 9),
(10, '2025-01-30 17:00:00', 0.00, 10),
(11, '2025-01-30 17:45:00', 55.75, 11),
(12, '2025-01-30 18:30:00', 0.00, 12),
(13, '2025-01-30 19:15:00', 33.20, 13),
(14, '2025-01-30 20:00:00', 0.00, 14),
(15, '2025-01-30 20:45:00', 47.80, 15),
(16, '2025-09-21 15:32:07', 0.00, 16),
(17, '2025-09-26 19:56:18', 0.00, 17);

-- --------------------------------------------------------

--
-- Table structure for table `doza`
--

CREATE TABLE `doza` (
  `dozaID` int(11) NOT NULL,
  `doza` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doza`
--

INSERT INTO `doza` (`dozaID`, `doza`) VALUES
(1, 25.00),
(2, 50.00),
(3, 100.00),
(4, 125.00),
(5, 250.00),
(6, 500.00),
(7, 750.00),
(8, 1000.00),
(9, 1500.00),
(10, 2000.00),
(11, 2500.00),
(12, 3000.00),
(13, 5000.00),
(14, 10000.00),
(15, 20000.00);

-- --------------------------------------------------------

--
-- Table structure for table `furnitori`
--

CREATE TABLE `furnitori` (
  `furnitoriID` int(11) NOT NULL,
  `emri` varchar(255) DEFAULT NULL,
  `shtetiID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `furnitori`
--

INSERT INTO `furnitori` (`furnitoriID`, `emri`, `shtetiID`) VALUES
(1, 'Pharma Albania', 6),
(2, 'MedSupply Kosovo', 250),
(3, 'Balkan Pharmaceuticals', 6),
(4, 'European Pharma Group', 60),
(5, 'Mediterranean Health', 112),
(6, 'Alpine Medical', 42),
(7, 'Nordic Pharma', 168),
(8, 'Central European Med', 59),
(9, 'Balkan Health Solutions', 205),
(10, 'Adriatic Pharmaceuticals', 100),
(11, 'Danube Medical', 102),
(12, 'Carpathian Pharma', 189),
(13, 'Mediterranean Wellness', 90),
(14, 'Balkan Medical Supply', 149),
(15, 'European Health Partners', 167);

-- --------------------------------------------------------

--
-- Table structure for table `kategoria`
--

CREATE TABLE `kategoria` (
  `kategoriaID` int(11) NOT NULL,
  `emri` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategoria`
--

INSERT INTO `kategoria` (`kategoriaID`, `emri`) VALUES
(1, 'Antibiotike'),
(2, 'Vitaminë'),
(3, 'Analgetikë'),
(4, 'Antiinflamatorë'),
(5, 'Antihistaminikë'),
(6, 'Antacidë'),
(7, 'Antidepressantë'),
(8, 'Antidiabetikë'),
(9, 'Kardiovaskularë'),
(10, 'Respiratorë'),
(11, 'Dermatologjikë'),
(12, 'Ginekologjikë'),
(13, 'Pediatrikë'),
(14, 'Geriatrikë'),
(15, 'Veterinarë');

-- --------------------------------------------------------

--
-- Table structure for table `klienti`
--

CREATE TABLE `klienti` (
  `klientiID` int(11) NOT NULL,
  `adresa` varchar(255) DEFAULT NULL,
  `qyteti` varchar(255) DEFAULT NULL,
  `kodi_postal` varchar(20) DEFAULT NULL,
  `shtetiID` int(11) DEFAULT NULL,
  `aplikimiID` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `emri_kompanise` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `klienti`
--

INSERT INTO `klienti` (`klientiID`, `adresa`, `qyteti`, `kodi_postal`, `shtetiID`, `aplikimiID`, `email`, `emri_kompanise`, `password`) VALUES
(1, 'Rr. Bulevardi 28 Nëntori', 'Tirana', '1001', 6, 1, 'contact@albaniafoods.com', 'Albania Foods Shpk', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(2, 'Rr. Dëshmorët e Kombit', 'Prishtinë', '10000', 250, 2, 'vesavrellaku14@gmail.com', 'Vesa Company', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(3, 'Rr. Nëna Terezë', 'Prizren', '20000', 250, 3, 'info@pharmaplus.com', 'Pharma Plus', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(4, 'Rr. Myslym Shyri', 'Tirana', '1000', 6, 4, 'contact@medsupply.al', 'MedSupply Tirana', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(5, 'Rr. Skënderbeu', 'Durrës', '2000', 6, 5, 'info@balkanhealth.com', 'Balkan Health', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(6, 'Rr. Gjergj Kastrioti', 'Vlorë', '9400', 6, 6, 'contact@europharma.eu', 'European Pharma', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(7, 'Rr. Ismail Qemali', 'Shkodër', '4000', 6, 7, 'info@medmed.com', 'Mediterranean Med', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(8, 'Bahnhofstrasse 1', 'Zürich', '8001', 42, 8, 'contact@alpinepharma.ch', 'Alpine Pharmaceuticals', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(9, 'Karl Johans gate 1', 'Oslo', '0154', 168, 9, 'info@nordichealth.no', 'Nordic Health', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(10, 'Václavské náměstí 1', 'Praga', '11000', 59, 10, 'contact@cemed.cz', 'Central European Med', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(11, 'Knez Mihailova 1', 'Beograd', '11000', 205, 11, 'info@balkanhealth.rs', 'Balkan Health Solutions', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(12, 'Trg bana Jelačića 1', 'Zagreb', '10000', 100, 12, 'contact@adriaticpharma.hr', 'Adriatic Pharmaceuticals', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(13, 'Váci utca 1', 'Budapest', '1052', 102, 13, 'info@danubemed.hu', 'Danube Medical', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(14, 'Calea Victoriei 1', 'București', '010061', 189, 14, 'contact@carpathianpharma.ro', 'Carpathian Pharma', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(15, 'Syntagma Square 1', 'Athina', '10563', 90, 15, 'info@medwellness.gr', 'Mediterranean Wellness', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(16, 'Lagjia e Spitalit', 'Prishtine', '10000', 25, 20, 'altinvrellaku11@gmail.com', 'altin', '$2b$12$e2y3Tl/ejjOq.kW3SapNQ.FC8cVS29b4m3FdDwjwEXxkG9PSulZPq'),
(17, 'Ferizaj', 'Ferizaj', '10000', 26, 21, 'fjollanebihi1@gmail.com', 'fjolla', '$2b$12$qw0J4Ncl17sIMP/LQeMG/uypbuf3xnMcvZ48b/WCyuZahBnH.mAmS');

-- --------------------------------------------------------

--
-- Table structure for table `menyra_pageses`
--

CREATE TABLE `menyra_pageses` (
  `menyra_pagesesID` int(11) NOT NULL,
  `menyra_pageses` varchar(255) DEFAULT NULL,
  `pershkrimi` text DEFAULT NULL,
  `klientiID` int(11) DEFAULT NULL,
  `adminID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menyra_pageses`
--

INSERT INTO `menyra_pageses` (`menyra_pagesesID`, `menyra_pageses`, `pershkrimi`, `klientiID`, `adminID`) VALUES
(1, 'Kartë Krediti', 'Përdorimi i kartës së kreditit për pagesa', NULL, NULL),
(2, 'Kartë Debiti', 'Përdorimi i kartës së debitit për pagesa', NULL, NULL),
(3, 'PayPal', 'Përdorimi i PayPal për pagesa online', NULL, NULL),
(4, 'Stripe', 'Përdorimi i Stripe për pagesa online', NULL, NULL),
(5, 'Apple Pay', 'Përdorimi i Apple Pay për pagesa mobile', NULL, NULL),
(6, 'Google Pay', 'Përdorimi i Google Pay për pagesa mobile', NULL, NULL),
(7, 'Samsung Pay', 'Përdorimi i Samsung Pay për pagesa mobile', NULL, NULL),
(8, 'Transfer Bankar', 'Transfer bankar përmes bankës lokale', NULL, NULL),
(9, 'Bank Transfer', 'Transfer bankar përmes bankës ndërkombëtare', NULL, NULL),
(10, 'Wire Transfer', 'Transfer bankar përmes wire transfer', NULL, NULL),
(11, 'Mobile Payment', 'Pagesa përmes aplikacionit mobile', NULL, NULL),
(12, 'Cryptocurrency', 'Pagesa përmes kriptovalutave', NULL, NULL),
(13, 'Cash', 'Pagesa me para në dorë', NULL, NULL),
(14, 'Cash on Delivery', 'Pagesa me para kur merret porosia', NULL, NULL),
(15, 'Check', 'Pagesa përmes çekut', NULL, NULL),
(16, 'Money Order', 'Pagesa përmes money order', NULL, NULL),
(17, 'Stripe (Credit Card)', 'Online payment via Stripe - Credit/Debit cards, Apple Pay, Google Pay', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pagesa`
--

CREATE TABLE `pagesa` (
  `pagesaID` int(11) NOT NULL,
  `shuma_pageses` decimal(8,2) DEFAULT NULL,
  `koha_pageses` datetime DEFAULT current_timestamp(),
  `porosiaID` int(11) DEFAULT NULL,
  `menyra_pagesesID` int(11) DEFAULT NULL,
  `numri_llogarise` varchar(255) DEFAULT NULL,
  `klientiID` int(11) DEFAULT NULL,
  `adminID` int(11) DEFAULT NULL,
  `furnitoriID` int(11) DEFAULT NULL,
  `produktiID` int(11) DEFAULT NULL,
  `sasia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pagesa`
--

INSERT INTO `pagesa` (`pagesaID`, `shuma_pageses`, `koha_pageses`, `porosiaID`, `menyra_pagesesID`, `numri_llogarise`, `klientiID`, `adminID`, `furnitoriID`, `produktiID`, `sasia`) VALUES
(2, 150.00, '2025-01-16 10:35:00', 2, 2, '2345678901234567', 2, NULL, NULL, NULL, NULL),
(3, 300.00, '2025-01-16 11:20:00', 3, 3, '3456789012345678', 2, NULL, NULL, NULL, NULL),
(4, 75.00, '2025-01-16 12:05:00', 4, 4, '4567890123456789', 3, NULL, NULL, NULL, NULL),
(5, 180.50, '2025-01-17 09:25:00', 6, 5, '5678901234567890', 4, NULL, NULL, NULL, NULL),
(6, 95.75, '2025-01-17 14:20:00', 7, 6, '6789012345678901', 5, NULL, NULL, NULL, NULL),
(7, 250.00, '2025-01-18 11:35:00', 8, 7, '7890123456789012', 6, NULL, NULL, NULL, NULL),
(8, 120.25, '2025-01-18 16:50:00', 9, 8, '8901234567890123', 7, NULL, NULL, NULL, NULL),
(9, 85.90, '2025-01-20 10:50:00', 12, 9, '0123456789012345', 10, NULL, NULL, NULL, NULL),
(10, 195.75, '2025-01-20 15:35:00', 13, 10, '1234567890123456', 11, NULL, NULL, NULL, NULL),
(11, 140.25, '2025-01-21 12:05:00', 14, 11, '2345678901234567', 12, NULL, NULL, NULL, NULL),
(12, 280.00, '2025-01-21 17:20:00', 15, 12, '3456789012345678', 13, NULL, NULL, NULL, NULL),
(13, 36.30, '2025-09-21 15:32:33', 16, 13, NULL, 16, NULL, NULL, NULL, NULL),
(14, 320.50, '2025-01-19 13:25:00', NULL, 10, 'Supplier Purchase - ', NULL, 1, NULL, NULL, NULL),
(15, 85.90, '2025-01-20 10:50:00', NULL, 11, 'Operational Expense ', NULL, 1, NULL, NULL, NULL),
(16, 195.75, '2025-01-20 15:35:00', NULL, 12, 'Inventory Restock - ', NULL, 1, NULL, NULL, NULL),
(17, 140.25, '2025-01-21 12:05:00', NULL, 13, 'Supplier Payment - B', NULL, 1, NULL, NULL, NULL),
(18, 280.00, '2025-01-21 17:20:00', NULL, 14, 'Business Expense - M', NULL, 1, NULL, NULL, NULL),
(19, 175.80, '2025-01-19 08:20:00', NULL, 15, 'Supplier Purchase - ', NULL, 1, NULL, NULL, NULL),
(20, 200.00, '2025-01-16 13:50:00', NULL, 16, 'Operational Expense ', NULL, 1, NULL, NULL, NULL),
(21, 10.34, '2025-09-25 13:06:44', NULL, 14, '', NULL, 1, NULL, NULL, NULL),
(22, 123.34, '2025-09-25 13:12:31', NULL, 9, '', NULL, 1, NULL, NULL, NULL),
(23, 12.43, '2025-09-25 13:17:19', NULL, 14, '', NULL, 1, NULL, NULL, NULL),
(24, 25.36, '2025-09-25 13:19:09', NULL, 13, '', NULL, 1, NULL, NULL, NULL),
(25, 36.30, '2025-09-25 13:46:59', 16, 5, '', 16, NULL, NULL, NULL, NULL),
(26, 36.30, '2025-09-25 13:47:00', 16, 5, '', 16, NULL, NULL, NULL, NULL),
(27, 53.60, '2025-09-25 13:47:35', 18, 13, '', 16, NULL, NULL, NULL, NULL),
(28, 62.00, '2025-09-25 13:47:46', 17, 5, '', 16, NULL, NULL, NULL, NULL),
(29, 247.00, '2025-09-25 13:53:36', NULL, 13, '', NULL, 1, NULL, NULL, NULL),
(30, 270.00, '2025-09-25 14:07:52', NULL, 13, '', NULL, 1, NULL, NULL, NULL),
(31, 60.90, '2025-09-25 14:50:12', 19, 5, '', 16, NULL, NULL, NULL, NULL),
(32, 60.90, '2025-09-25 14:50:13', 19, 5, '', 16, NULL, NULL, NULL, NULL),
(33, 107.88, '2025-09-25 17:19:11', NULL, 1, '12345', NULL, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pagesa_status`
--

CREATE TABLE `pagesa_status` (
  `pagesa_statusID` int(11) NOT NULL,
  `statusi` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pagesa_status`
--

INSERT INTO `pagesa_status` (`pagesa_statusID`, `statusi`) VALUES
(1, 'Në pritje'),
(2, 'E paguar'),
(3, 'E refuzuar'),
(5, 'penddd');

-- --------------------------------------------------------

--
-- Table structure for table `porosia`
--

CREATE TABLE `porosia` (
  `porosiaID` int(11) NOT NULL,
  `koha_krijimit` datetime DEFAULT current_timestamp(),
  `porosia_statusID` int(11) DEFAULT NULL,
  `cmimi_total` decimal(8,2) DEFAULT NULL,
  `pagesa_statusID` int(11) DEFAULT NULL,
  `klientiID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `porosia`
--

INSERT INTO `porosia` (`porosiaID`, `koha_krijimit`, `porosia_statusID`, `cmimi_total`, `pagesa_statusID`, `klientiID`) VALUES
(2, '2025-01-16 10:30:00', 1, 150.00, 1, 2),
(3, '2025-01-16 11:15:00', 2, 300.00, 2, 2),
(4, '2025-01-16 12:00:00', 1, 75.00, 1, 3),
(5, '2025-01-16 13:45:00', 3, 200.00, 3, 3),
(6, '2025-01-17 09:20:00', 2, 180.50, 2, 4),
(7, '2025-01-17 14:15:00', 1, 95.75, 1, 5),
(8, '2025-01-18 11:30:00', 2, 250.00, 2, 6),
(9, '2025-01-18 16:45:00', 1, 120.25, 1, 7),
(10, '2025-01-19 08:15:00', 3, 175.80, 3, 8),
(11, '2025-01-19 13:20:00', 2, 320.50, 2, 9),
(12, '2025-01-20 10:45:00', 1, 85.90, 1, 10),
(13, '2025-01-20 15:30:00', 2, 195.75, 2, 11),
(14, '2025-01-21 12:00:00', 3, 140.25, 1, 12),
(15, '2025-01-21 17:15:00', 2, 280.00, 2, 13),
(16, '2025-09-21 15:32:33', 2, 36.30, 2, 16),
(17, '2025-09-25 13:46:45', 1, 62.00, 2, 16),
(18, '2025-09-25 13:47:22', 1, 53.60, 2, 16),
(19, '2025-09-25 14:20:44', 6, 60.90, 2, 16);

-- --------------------------------------------------------

--
-- Table structure for table `porosia_status`
--

CREATE TABLE `porosia_status` (
  `porosia_statusID` int(11) NOT NULL,
  `statusi` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `porosia_status`
--

INSERT INTO `porosia_status` (`porosia_statusID`, `statusi`) VALUES
(1, 'Në proces'),
(2, 'Përfunduar'),
(3, 'Anuluar');

-- --------------------------------------------------------

--
-- Table structure for table `produkti`
--

CREATE TABLE `produkti` (
  `produktiID` int(11) NOT NULL,
  `emri` varchar(255) DEFAULT NULL,
  `pershkrimi` text DEFAULT NULL,
  `kategoriaID` int(11) DEFAULT NULL,
  `furnitoriID` int(11) DEFAULT NULL,
  `sasia_ne_stok` int(11) NOT NULL DEFAULT 0 CHECK (`sasia_ne_stok` >= 0),
  `dozaID` int(11) DEFAULT NULL,
  `imazhi` varchar(500) DEFAULT NULL,
  `cmimi` decimal(8,2) DEFAULT NULL
) ;

--
-- Dumping data for table `produkti`
--

INSERT INTO `produkti` (`produktiID`, `emri`, `pershkrimi`, `kategoriaID`, `furnitoriID`, `sasia_ne_stok`, `dozaID`, `imazhi`, `cmimi`) VALUES
(1, 'Amoxicillin 500mg', 'Antibiotik i gjerë spektri për infeksione bakteriale', 1, 1, 142, 6, '/src/client/assets/images/amoxicillin.png', 15.50),
(2, 'Vitamin C 1000mg', 'Vitamin C për forcimin e imunitetit dhe mbrojtjen nga sëmundjet', 2, 2, 212, 8, '/src/client/assets/images/vitamin-c.png', 8.99),
(3, 'Paracetamol 500mg', 'Analgetik dhe antipiretik për dhimbje dhe ethe', 3, 3, 300, 6, '/src/client/assets/images/paracetamol.png', 5.25),
(4, 'Ibuprofen 400mg', 'Antiinflamator jo-steroid për dhimbje dhe inflamacion', 4, 4, 180, 5, '/src/client/assets/images/ibuprofen.png', 7.80),
(5, 'Cetirizine 10mg', 'Antihistaminik për alergji dhe rinitis', 5, 5, 141, 2, '/src/client/assets/images/cetirizine.png', 9.50),
(6, 'Omeprazole 20mg', 'Inhibitor i pompës së protonit për ulçerë dhe refluks', 6, 6, 100, 2, '/src/client/assets/images/omeprazole.png', 11.20),
(7, 'Sertraline 50mg', 'Antidepressant SSRI për depresion dhe ankth', 7, 7, 75, 3, '/src/client/assets/images/sertraline.png', 18.75),
(8, 'Metformin 500mg', 'Antidiabetik për diabetin e tipit 2', 8, 8, 90, 6, '/src/client/assets/images/metformin.png', 6.90),
(9, 'Amlodipine 5mg', 'Bllokues i kanaleve të kalciumit për hipertension', 9, 9, 117, 1, '/src/client/assets/images/amlodipine.png', 13.40),
(10, 'Salbutamol Inhaler', 'Bronkodilatator për astmë dhe probleme respiratorë', 10, 10, 111, 15, '/src/client/assets/images/salbutamol.png', 22.50),
(11, 'Hydrocortisone Cream', 'Krem steroid për probleme dermatologjike', 11, 11, 63, 15, '/src/client/assets/images/hydrocortisone.png', 8.75),
(12, 'Folic Acid 5mg', 'Vitamin B9 për gra shtatzëna dhe anemi', 12, 12, 140, 1, '/src/client/assets/images/folic-acid.png', 4.50),
(13, 'Pediatric Paracetamol', 'Paracetamol në formë sirup për fëmijë', 13, 13, 85, 15, '/src/client/assets/images/pediatric-paracetamol.png', 6.25);

-- --------------------------------------------------------

--
-- Table structure for table `produkti_cart`
--

CREATE TABLE `produkti_cart` (
  `produkti_cartID` int(11) NOT NULL,
  `sasia` int(11) DEFAULT NULL CHECK (`sasia` > 0),
  `cmimi` decimal(8,2) DEFAULT NULL,
  `cartID` int(11) DEFAULT NULL,
  `produkt_variacioniID` int(11) DEFAULT NULL,
  `produktiID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produkti_cart`
--

INSERT INTO `produkti_cart` (`produkti_cartID`, `sasia`, `cmimi`, `cartID`, `produkt_variacioniID`, `produktiID`) VALUES
(1, 2, 15.50, 1, 1, 1),
(2, 1, 8.99, 1, 3, 2),
(3, 1, 25.00, 2, 2, 1),
(4, 3, 5.25, 4, 5, 3),
(5, 2, 7.80, 4, 6, 4),
(6, 1, 18.75, 5, 9, 7),
(7, 4, 5.25, 7, 5, 3),
(8, 2, 9.50, 7, 7, 5),
(9, 1, 8.75, 7, 13, 11),
(10, 2, 13.40, 9, 11, 9),
(11, 1, 4.50, 9, 14, 12),
(12, 3, 6.90, 11, 10, 8),
(13, 2, 11.20, 11, 8, 6),
(14, 1, 22.50, 11, 12, 10),
(15, 2, 6.25, 13, 15, 13),
(29, 3, 13.40, 16, 11, 9),
(30, 1, 15.50, 16, 1, 1),
(31, 1, 9.50, 16, 7, 5);

-- --------------------------------------------------------

--
-- Table structure for table `produkti_porosise`
--

CREATE TABLE `produkti_porosise` (
  `produkti_porosiseID` int(11) NOT NULL,
  `porosiaID` int(11) DEFAULT NULL,
  `produkt_variacioniID` int(11) DEFAULT NULL,
  `sasia` int(11) DEFAULT NULL CHECK (`sasia` > 0),
  `cmimi` decimal(8,2) DEFAULT NULL,
  `produktiID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produkti_porosise`
--

INSERT INTO `produkti_porosise` (`produkti_porosiseID`, `porosiaID`, `produkt_variacioniID`, `sasia`, `cmimi`, `produktiID`) VALUES
(3, 2, 5, 20, 5.25, 3),
(4, 2, 6, 10, 7.80, 4),
(5, 3, 2, 8, 25.00, 1),
(6, 3, 4, 12, 12.50, 2),
(7, 4, 7, 8, 9.50, 5),
(8, 5, 8, 15, 11.20, 6),
(9, 6, 9, 6, 18.75, 7),
(10, 6, 10, 8, 6.90, 8),
(11, 7, 11, 5, 13.40, 9),
(12, 8, 12, 3, 22.50, 10),
(13, 8, 13, 8, 8.75, 11),
(14, 9, 14, 15, 4.50, 12),
(15, 9, 15, 10, 6.25, 13),
(16, 16, 11, 1, 13.40, 9),
(17, 16, 7, 1, 9.50, 5),
(18, 16, 11, 1, 13.40, 9),
(19, 17, 1, 1, 15.50, 1),
(20, 17, 1, 3, 15.50, 1),
(21, 18, 11, 4, 13.40, 9),
(22, 19, 11, 1, 13.40, 9),
(23, 19, 7, 1, 9.50, 5),
(24, 19, 7, 4, 9.50, 5);

-- --------------------------------------------------------

--
-- Table structure for table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `tokenID` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `userID` int(11) NOT NULL,
  `userType` enum('klient','admin') NOT NULL,
  `expiresAt` datetime NOT NULL,
  `isRevoked` tinyint(1) DEFAULT 0,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`tokenID`, `token`, `userID`, `userType`, `expiresAt`, `isRevoked`, `createdAt`, `updatedAt`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODMxMjgyMywiZXhwIjoxNzU4OTE3NjIzfQ.DKO43PpnOkNq9oxeCEGv6oRz6D6CwCjNH7DAej9mwMc', 1, 'admin', '2025-09-26 20:13:43', 0, '2025-09-19 20:13:43', '2025-09-19 20:13:43'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEyLCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4NDAxNzQxLCJleHAiOjE3NTkwMDY1NDF9._q8bRIShcc5FrhHqAOWIEMxpb-Evkiz5_pRWsdb03dg', 12, 'klient', '2025-09-27 20:55:41', 0, '2025-09-20 20:55:41', '2025-09-20 20:55:41'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEyLCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4NDAyOTgxLCJleHAiOjE3NTkwMDc3ODF9.Jf0etkvQqojXMLLlCNOQwHgmfK59h9CVyqJdxyLtSAA', 12, 'klient', '2025-09-27 21:16:21', 0, '2025-09-20 21:16:21', '2025-09-20 21:16:21'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEzLCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4NDA0OTkyLCJleHAiOjE3NTkwMDk3OTJ9.auV9RxZjLW7o2aQRt5h-CBW7wRY2NXrgID4A2C9aNpc', 13, 'klient', '2025-09-27 21:49:52', 0, '2025-09-20 21:49:52', '2025-09-20 21:49:52'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE0LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4NDYyMTc4LCJleHAiOjE3NTkwNjY5Nzh9.DUgWZB3UrFOiSboodAH5CvJ7DgawlYrBZngoForZnZ8', 14, 'klient', '2025-09-28 13:42:58', 0, '2025-09-21 13:42:58', '2025-09-21 13:42:58'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE2LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4NDY4NzIyLCJleHAiOjE3NTkwNzM1MjJ9.N0uZB1cW67zyjXJvdn_UBadrd2N-VXYP5rXFsl-3y0U', 16, 'klient', '2025-09-28 15:32:02', 0, '2025-09-21 15:32:02', '2025-09-21 15:32:02'),
(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE2LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4NDcwMzk0LCJleHAiOjE3NTkwNzUxOTR9.msho5VN1T_hVM7mqFKXGVMmNKipdbC6rexzwhlaWxl8', 16, 'klient', '2025-09-28 15:59:54', 1, '2025-09-21 15:59:54', '2025-09-21 16:00:25'),
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE2LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4NDcxMDc0LCJleHAiOjE3NTkwNzU4NzR9.uExS25wPLTO5mvxz-OSwWef3DwSYnBh0M2Aa1SR-jLY', 16, 'klient', '2025-09-28 16:11:14', 1, '2025-09-21 16:11:14', '2025-09-21 16:14:56'),
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE2LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4NDcxNTg5LCJleHAiOjE3NTkwNzYzODl9.Yl-xI-1u37Xohq6Hw57uU54naJwmFljP4bm29rowKlc', 16, 'klient', '2025-09-28 16:19:49', 1, '2025-09-21 16:19:49', '2025-09-21 16:22:40'),
(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE2LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4NDc0MzY1LCJleHAiOjE3NTkwNzkxNjV9.-NZIIKMo35w--bnkjN_DGRT_38xCHcn3UP1duKwACvY', 16, 'klient', '2025-09-28 17:06:05', 0, '2025-09-21 17:06:05', '2025-09-21 17:06:05'),
(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODQ5NTgwNiwiZXhwIjoxNzU4NTgyMjA2fQ.FvGPxnhYO40wdGRNgBRyNDgTPUpPdKDhgc8xtmrB5Ec', 1, 'admin', '2025-09-22 23:03:26', 0, '2025-09-21 23:03:26', '2025-09-21 23:03:26'),
(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODQ5OTc2MywiZXhwIjoxNzU4NTg2MTYzfQ.WArkv-EXshik33aDsVEqDnYPP-NVJq4qFx7DGeruTg4', 1, 'admin', '2025-09-23 00:09:23', 0, '2025-09-22 00:09:23', '2025-09-22 00:09:23'),
(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODU1OTAxMSwiZXhwIjoxNzU4NjQ1NDExfQ.naxIpStllVN2jN5Yki6Ekuhk_IiqimW1rNHgzCN-RqI', 1, 'admin', '2025-09-23 16:36:51', 0, '2025-09-22 16:36:51', '2025-09-22 16:36:51'),
(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODU2MjAwMywiZXhwIjoxNzU4NjQ4NDAzfQ.oOkcQBhdE2h29admf5aC09MDCaJRHsgyAgpgrJ2UA4E', 1, 'admin', '2025-09-23 17:26:43', 0, '2025-09-22 17:26:43', '2025-09-22 17:26:43'),
(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODU4MjI5MiwiZXhwIjoxNzU4NjY4NjkyfQ.SC43mgdY8Aq7Y23_yLeFVJlf_XH4Lq6BmggeG6c6Q7c', 1, 'admin', '2025-09-23 23:04:52', 1, '2025-09-22 23:04:52', '2025-09-22 23:06:30'),
(19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODU4NTMyNSwiZXhwIjoxNzU4NjcxNzI1fQ.Cq_PtK58v_PgVfuRtfcyYFZ4t7G70gb3xutvw3m0wqA', 1, 'admin', '2025-09-23 23:55:25', 0, '2025-09-22 23:55:25', '2025-09-22 23:55:25'),
(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODc5NDk3MCwiZXhwIjoxNzU4ODgxMzcwfQ.fUIqNtYCp0xWVTm3MeH_Ox-g7TFotB2DZJphwf2rydE', 1, 'admin', '2025-09-26 10:09:30', 0, '2025-09-25 10:09:30', '2025-09-25 10:09:30'),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODc5OTY5NSwiZXhwIjoxNzU4ODg2MDk1fQ.Y_HgzOVJKDHDjSmY67Ml1MWz9rQgGbV0D6N57s-AJFI', 1, 'admin', '2025-09-26 11:28:15', 0, '2025-09-25 11:28:15', '2025-09-25 11:28:15'),
(22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODgwMzQ2OSwiZXhwIjoxNzU4ODg5ODY5fQ.sOaQcaCBz11EnZO6xh7ge6OH2-tRyDsWE_shiogd9vU', 1, 'admin', '2025-09-26 12:31:09', 0, '2025-09-25 12:31:09', '2025-09-25 12:31:09'),
(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE2LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4ODA1ODc3LCJleHAiOjE3NTg4OTIyNzd9.8nPmxfrjizejW-8W0Pdx8VgbGtyONzOAntjgMdN6GSo', 16, 'klient', '2025-09-26 13:11:17', 0, '2025-09-25 13:11:17', '2025-09-25 13:11:17'),
(24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODgwNzE0MywiZXhwIjoxNzU4ODkzNTQzfQ.d2cLLqsWbTtB0VQX-ynLmF5uOdVziWk5CdABQq12Nuw', 1, 'admin', '2025-09-26 13:32:23', 1, '2025-09-25 13:32:23', '2025-09-25 13:48:34'),
(26, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODgwODEyMiwiZXhwIjoxNzU4ODk0NTIyfQ.EOWI-asEMeglw1Qau4IjNb2DkyB_egjQRDsffj81MYk', 1, 'admin', '2025-09-26 13:48:42', 0, '2025-09-25 13:48:42', '2025-09-25 13:48:42'),
(27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE2LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4ODA5OTgzLCJleHAiOjE3NTg4OTYzODN9.Yfqtd7GZnsxSqgkMOBcrm9HCxVDxv_ih5MPXMLAfd1g', 16, 'klient', '2025-09-26 14:19:43', 0, '2025-09-25 14:19:43', '2025-09-25 14:19:43'),
(28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODgyMDY1OCwiZXhwIjoxNzU4OTA3MDU4fQ.kG-7FfgEdcv_g6VWKFBHNNl0sn02QYGsnbJCMm7iZ3I', 1, 'admin', '2025-09-26 17:17:38', 0, '2025-09-25 17:17:38', '2025-09-25 17:17:38'),
(29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE2LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4ODIwNzkxLCJleHAiOjE3NTg5MDcxOTF9.GIzyJbowACHZkXuIe6rftjH_yECGbSR65iEG4bXQ-Fo', 16, 'klient', '2025-09-26 17:19:51', 0, '2025-09-25 17:19:51', '2025-09-25 17:19:51'),
(30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1ODkxNjE2MywiZXhwIjoxNzU5MDAyNTYzfQ.4EtaOVKcJ4jz3wSXbY1XKDtci8yA5SYzRL8HUiurFx4', 1, 'admin', '2025-09-27 19:49:23', 0, '2025-09-26 19:49:23', '2025-09-26 19:49:23'),
(31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE3LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU4OTE2NDgxLCJleHAiOjE3NTkwMDI4ODF9.84vHwuCHOG1OQx_pFtIHLqfjYQhxvv1lWDNJVcQtx2U', 17, 'klient', '2025-09-27 19:54:41', 0, '2025-09-26 19:54:41', '2025-09-26 19:54:41'),
(32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1OTA2MjU3NywiZXhwIjoxNzU5NjY3Mzc3fQ.lbZ5aXpY1e8EGc3jyQDqq7qc1Vl9IPu1IfC37HBCRww', 1, 'admin', '2025-10-05 12:29:37', 1, '2025-09-28 12:29:37', '2025-09-28 12:57:58'),
(33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE2LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU5MDYzMjMzLCJleHAiOjE3NTk2NjgwMzN9.7f27iSxG1hkrouIdFAlMN5AGvNtHGOCePPFzdFW58t8', 16, 'klient', '2025-10-05 12:40:33', 1, '2025-09-28 12:40:33', '2025-09-28 14:24:14'),
(34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1OTA2NDQwMCwiZXhwIjoxNzU5NjY5MjAwfQ._BrCM1HItW6vAoiJ84_d7KtTo3-q2tTHK3ZATiTrNg8', 1, 'admin', '2025-10-05 13:00:00', 1, '2025-09-28 13:00:00', '2025-09-28 13:00:31'),
(35, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1OTA2NDQzNywiZXhwIjoxNzU5NjY5MjM3fQ.fn-IWuE9IOoVsAW5TdHvAPzPN2jzXIE5ZZ0CEZHGhho', 1, 'admin', '2025-10-05 13:00:37', 1, '2025-09-28 13:00:37', '2025-09-28 17:09:27'),
(36, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1OTA3OTM3MiwiZXhwIjoxNzU5Njg0MTcyfQ.paO47az_JYmij_LsAIQahvM4P-28tN_Dyex4isJBq8g', 1, 'admin', '2025-10-05 17:09:32', 1, '2025-09-28 17:09:32', '2025-09-28 19:25:03'),
(37, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE2LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU5MDgwMDY5LCJleHAiOjE3NTk2ODQ4Njl9.hyzTcCdR46HZr1kI8bGfp732lIZy_njoGvY0lA9r-MM', 16, 'klient', '2025-10-05 17:21:09', 1, '2025-09-28 17:21:09', '2025-09-28 22:59:32'),
(38, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1OTA4NzUwOCwiZXhwIjoxNzU5NjkyMzA4fQ.yS8LsyIjpwEohOyL06RPi2KgfNjfoR6kVZqaxYoMzoU', 1, 'admin', '2025-10-05 19:25:08', 1, '2025-09-28 19:25:08', '2025-09-28 19:45:07'),
(39, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1OTA4ODcxMywiZXhwIjoxNzU5NjkzNTEzfQ.x04vr8-UmOSU7BKxBjXedT54s0u041DR9--5WSBgcHQ', 1, 'admin', '2025-10-05 19:45:13', 1, '2025-09-28 19:45:13', '2025-09-28 19:51:19'),
(40, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1OTA4OTA4NCwiZXhwIjoxNzU5NjkzODg0fQ.0puQKM4xegczF_E4lfjVPn6XPCsQPkIiz0st3DPeohE', 1, 'admin', '2025-10-05 19:51:24', 1, '2025-09-28 19:51:24', '2025-09-28 20:44:50'),
(41, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1OTA5MjI5NCwiZXhwIjoxNzU5Njk3MDk0fQ.HalwiYu64534wkXGbJtN6y7O5UMNv16ZZY3YnS6hEUI', 1, 'admin', '2025-10-05 20:44:54', 1, '2025-09-28 20:44:54', '2025-09-28 21:12:50'),
(42, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1OTA5Mzk3NSwiZXhwIjoxNzU5Njk4Nzc1fQ.b0uI5doEPWVgRfL-YFCzNKLlvLAxBOnWWTc7HPQKt7M', 1, 'admin', '2025-10-05 21:12:55', 1, '2025-09-28 21:12:55', '2025-09-28 21:18:25'),
(43, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1OTA5NDMwOSwiZXhwIjoxNzU5Njk5MTA5fQ.ccqGM0Cr-UfGL2Yjn10qMjgxlUKxwOstnCMkkljy5Kc', 1, 'admin', '2025-10-05 21:18:29', 1, '2025-09-28 21:18:29', '2025-09-28 21:21:13'),
(44, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsInVzZXJUeXBlIjoiYWRtaW4iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTc1OTA5NDQ3NywiZXhwIjoxNzU5Njk5Mjc3fQ.tg2T8uM3sIw9c9FVOloNcIQIiZvJwaSMaIPSLVMs4do', 1, 'admin', '2025-10-05 21:21:17', 0, '2025-09-28 21:21:17', '2025-09-28 21:21:17'),
(45, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjE2LCJ1c2VyVHlwZSI6ImtsaWVudCIsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzU5MTAxODc5LCJleHAiOjE3NTk3MDY2Nzl9.nOXcSuNokaOV_fNefQ8K6JQ3a1jAuny5_90Kcg3UGiU', 16, 'klient', '2025-10-05 23:24:39', 0, '2025-09-28 23:24:39', '2025-09-28 23:24:39');

-- --------------------------------------------------------

--
-- Table structure for table `shteti`
--

CREATE TABLE `shteti` (
  `shtetiID` int(11) NOT NULL,
  `emri_shtetit` varchar(255) DEFAULT NULL,
  `iso_kodi` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shteti`
--

INSERT INTO `shteti` (`shtetiID`, `emri_shtetit`, `iso_kodi`) VALUES
(1, 'Aruba', 'AW'),
(2, 'Afghanistan', 'AF'),
(3, 'Angola', 'AO'),
(4, 'Anguilla', 'AI'),
(5, 'Åland Islands', 'AX'),
(6, 'Albania', 'AL'),
(7, 'Andorra', 'AD'),
(8, 'United Arab Emirates', 'AE'),
(9, 'Argentina', 'AR'),
(10, 'Armenia', 'AM'),
(11, 'American Samoa', 'AS'),
(12, 'Antarctica', 'AQ'),
(13, 'French Southern Territories', 'TF'),
(14, 'Antigua and Barbuda', 'AG'),
(15, 'Australia', 'AU'),
(16, 'Austria', 'AT'),
(17, 'Azerbaijan', 'AZ'),
(18, 'Burundi', 'BI'),
(19, 'Belgium', 'BE'),
(20, 'Benin', 'BJ'),
(21, 'Bonaire, Sint Eustatius and Saba', 'BQ'),
(22, 'Burkina Faso', 'BF'),
(23, 'Bangladesh', 'BD'),
(24, 'Bulgaria', 'BG'),
(25, 'Bahrain', 'BH'),
(26, 'Bahamas', 'BS'),
(27, 'Bosnia and Herzegovina', 'BA'),
(28, 'Saint Barthélemy', 'BL'),
(29, 'Belarus', 'BY'),
(30, 'Belize', 'BZ'),
(31, 'Bermuda', 'BM'),
(32, 'Bolivia, Plurinational State of', 'BO'),
(33, 'Brazil', 'BR'),
(34, 'Barbados', 'BB'),
(35, 'Brunei Darussalam', 'BN'),
(36, 'Bhutan', 'BT'),
(37, 'Bouvet Island', 'BV'),
(38, 'Botswana', 'BW'),
(39, 'Central African Republic', 'CF'),
(40, 'Canada', 'CA'),
(41, 'Cocos (Keeling) Islands', 'CC'),
(42, 'Switzerland', 'CH'),
(43, 'Chile', 'CL'),
(44, 'China', 'CN'),
(45, 'Côte d\'Ivoire', 'CI'),
(46, 'Cameroon', 'CM'),
(47, 'Congo, The Democratic Republic of the', 'CD'),
(48, 'Congo', 'CG'),
(49, 'Cook Islands', 'CK'),
(50, 'Colombia', 'CO'),
(51, 'Comoros', 'KM'),
(52, 'Cabo Verde', 'CV'),
(53, 'Costa Rica', 'CR'),
(54, 'Cuba', 'CU'),
(55, 'Curaçao', 'CW'),
(56, 'Christmas Island', 'CX'),
(57, 'Cayman Islands', 'KY'),
(58, 'Cyprus', 'CY'),
(59, 'Czechia', 'CZ'),
(60, 'Germany', 'DE'),
(61, 'Djibouti', 'DJ'),
(62, 'Dominica', 'DM'),
(63, 'Denmark', 'DK'),
(64, 'Dominican Republic', 'DO'),
(65, 'Algeria', 'DZ'),
(66, 'Ecuador', 'EC'),
(67, 'Egypt', 'EG'),
(68, 'Eritrea', 'ER'),
(69, 'Western Sahara', 'EH'),
(70, 'Spain', 'ES'),
(71, 'Estonia', 'EE'),
(72, 'Ethiopia', 'ET'),
(73, 'Finland', 'FI'),
(74, 'Fiji', 'FJ'),
(75, 'Falkland Islands (Malvinas)', 'FK'),
(76, 'France', 'FR'),
(77, 'Faroe Islands', 'FO'),
(78, 'Micronesia, Federated States of', 'FM'),
(79, 'Gabon', 'GA'),
(80, 'United Kingdom', 'GB'),
(81, 'Georgia', 'GE'),
(82, 'Guernsey', 'GG'),
(83, 'Ghana', 'GH'),
(84, 'Gibraltar', 'GI'),
(85, 'Guinea', 'GN'),
(86, 'Guadeloupe', 'GP'),
(87, 'Gambia', 'GM'),
(88, 'Guinea-Bissau', 'GW'),
(89, 'Equatorial Guinea', 'GQ'),
(90, 'Greece', 'GR'),
(91, 'Grenada', 'GD'),
(92, 'Greenland', 'GL'),
(93, 'Guatemala', 'GT'),
(94, 'French Guiana', 'GF'),
(95, 'Guam', 'GU'),
(96, 'Guyana', 'GY'),
(97, 'Hong Kong', 'HK'),
(98, 'Heard Island and McDonald Islands', 'HM'),
(99, 'Honduras', 'HN'),
(100, 'Croatia', 'HR'),
(101, 'Haiti', 'HT'),
(102, 'Hungary', 'HU'),
(103, 'Indonesia', 'ID'),
(104, 'Isle of Man', 'IM'),
(105, 'India', 'IN'),
(106, 'British Indian Ocean Territory', 'IO'),
(107, 'Ireland', 'IE'),
(108, 'Iran, Islamic Republic of', 'IR'),
(109, 'Iraq', 'IQ'),
(110, 'Iceland', 'IS'),
(111, 'Israel', 'IL'),
(112, 'Italy', 'IT'),
(113, 'Jamaica', 'JM'),
(114, 'Jersey', 'JE'),
(115, 'Jordan', 'JO'),
(116, 'Japan', 'JP'),
(117, 'Kazakhstan', 'KZ'),
(118, 'Kenya', 'KE'),
(119, 'Kyrgyzstan', 'KG'),
(120, 'Cambodia', 'KH'),
(121, 'Kiribati', 'KI'),
(122, 'Saint Kitts and Nevis', 'KN'),
(123, 'Korea, Republic of', 'KR'),
(124, 'Kuwait', 'KW'),
(125, 'Lao People\'s Democratic Republic', 'LA'),
(126, 'Lebanon', 'LB'),
(127, 'Liberia', 'LR'),
(128, 'Libya', 'LY'),
(129, 'Saint Lucia', 'LC'),
(130, 'Liechtenstein', 'LI'),
(131, 'Sri Lanka', 'LK'),
(132, 'Lesotho', 'LS'),
(133, 'Lithuania', 'LT'),
(134, 'Luxembourg', 'LU'),
(135, 'Latvia', 'LV'),
(136, 'Macao', 'MO'),
(137, 'Saint Martin (French part)', 'MF'),
(138, 'Morocco', 'MA'),
(139, 'Monaco', 'MC'),
(140, 'Moldova, Republic of', 'MD'),
(141, 'Madagascar', 'MG'),
(142, 'Maldives', 'MV'),
(143, 'Mexico', 'MX'),
(144, 'Marshall Islands', 'MH'),
(145, 'North Macedonia', 'MK'),
(146, 'Mali', 'ML'),
(147, 'Malta', 'MT'),
(148, 'Myanmar', 'MM'),
(149, 'Montenegro', 'ME'),
(150, 'Mongolia', 'MN'),
(151, 'Northern Mariana Islands', 'MP'),
(152, 'Mozambique', 'MZ'),
(153, 'Mauritania', 'MR'),
(154, 'Montserrat', 'MS'),
(155, 'Martinique', 'MQ'),
(156, 'Mauritius', 'MU'),
(157, 'Malawi', 'MW'),
(158, 'Malaysia', 'MY'),
(159, 'Mayotte', 'YT'),
(160, 'Namibia', 'NA'),
(161, 'New Caledonia', 'NC'),
(162, 'Niger', 'NE'),
(163, 'Norfolk Island', 'NF'),
(164, 'Nigeria', 'NG'),
(165, 'Nicaragua', 'NI'),
(166, 'Niue', 'NU'),
(167, 'Netherlands', 'NL'),
(168, 'Norway', 'NO'),
(169, 'Nepal', 'NP'),
(170, 'Nauru', 'NR'),
(171, 'New Zealand', 'NZ'),
(172, 'Oman', 'OM'),
(173, 'Pakistan', 'PK'),
(174, 'Panama', 'PA'),
(175, 'Pitcairn', 'PN'),
(176, 'Peru', 'PE'),
(177, 'Philippines', 'PH'),
(178, 'Palau', 'PW'),
(179, 'Papua New Guinea', 'PG'),
(180, 'Poland', 'PL'),
(181, 'Puerto Rico', 'PR'),
(182, 'Korea, Democratic People\'s Republic of', 'KP'),
(183, 'Portugal', 'PT'),
(184, 'Paraguay', 'PY'),
(185, 'Palestine, State of', 'PS'),
(186, 'French Polynesia', 'PF'),
(187, 'Qatar', 'QA'),
(188, 'Réunion', 'RE'),
(189, 'Romania', 'RO'),
(190, 'Russian Federation', 'RU'),
(191, 'Rwanda', 'RW'),
(192, 'Saudi Arabia', 'SA'),
(193, 'Sudan', 'SD'),
(194, 'Senegal', 'SN'),
(195, 'Singapore', 'SG'),
(196, 'South Georgia and the South Sandwich Islands', 'GS'),
(197, 'Saint Helena, Ascension and Tristan da Cunha', 'SH'),
(198, 'Svalbard and Jan Mayen', 'SJ'),
(199, 'Solomon Islands', 'SB'),
(200, 'Sierra Leone', 'SL'),
(201, 'El Salvador', 'SV'),
(202, 'San Marino', 'SM'),
(203, 'Somalia', 'SO'),
(204, 'Saint Pierre and Miquelon', 'PM'),
(205, 'Serbia', 'RS'),
(206, 'South Sudan', 'SS'),
(207, 'Sao Tome and Principe', 'ST'),
(208, 'Suriname', 'SR'),
(209, 'Slovakia', 'SK'),
(210, 'Slovenia', 'SI'),
(211, 'Sweden', 'SE'),
(212, 'Eswatini', 'SZ'),
(213, 'Sint Maarten (Dutch part)', 'SX'),
(214, 'Seychelles', 'SC'),
(215, 'Syrian Arab Republic', 'SY'),
(216, 'Turks and Caicos Islands', 'TC'),
(217, 'Chad', 'TD'),
(218, 'Togo', 'TG'),
(219, 'Thailand', 'TH'),
(220, 'Tajikistan', 'TJ'),
(221, 'Tokelau', 'TK'),
(222, 'Turkmenistan', 'TM'),
(223, 'Timor-Leste', 'TL'),
(224, 'Tonga', 'TO'),
(225, 'Trinidad and Tobago', 'TT'),
(226, 'Tunisia', 'TN'),
(227, 'Turkey', 'TR'),
(228, 'Tuvalu', 'TV'),
(229, 'Taiwan, Province of China', 'TW'),
(230, 'Tanzania, United Republic of', 'TZ'),
(231, 'Uganda', 'UG'),
(232, 'Ukraine', 'UA'),
(233, 'United States Minor Outlying Islands', 'UM'),
(234, 'Uruguay', 'UY'),
(235, 'United States', 'US'),
(236, 'Uzbekistan', 'UZ'),
(237, 'Holy See (Vatican City State)', 'VA'),
(238, 'Saint Vincent and the Grenadines', 'VC'),
(239, 'Venezuela, Bolivarian Republic of', 'VE'),
(240, 'Virgin Islands, British', 'VG'),
(241, 'Virgin Islands, U.S.', 'VI'),
(242, 'Viet Nam', 'VN'),
(243, 'Vanuatu', 'VU'),
(244, 'Wallis and Futuna', 'WF'),
(245, 'Samoa', 'WS'),
(246, 'Yemen', 'YE'),
(247, 'South Africa', 'ZA'),
(248, 'Zambia', 'ZM'),
(249, 'Zimbabwe', 'ZW'),
(250, 'Kosova', 'XK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`adminID`);

--
-- Indexes for table `aplikimi`
--
ALTER TABLE `aplikimi`
  ADD PRIMARY KEY (`aplikimiID`),
  ADD KEY `aplikimi_statusID` (`aplikimi_statusID`),
  ADD KEY `adminID` (`adminID`),
  ADD KEY `fk_aplikimi_shteti` (`shtetiId`);

--
-- Indexes for table `aplikimi_status`
--
ALTER TABLE `aplikimi_status`
  ADD PRIMARY KEY (`aplikimi_statusID`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartID`),
  ADD KEY `klientiID` (`klientiID`);

--
-- Indexes for table `doza`
--
ALTER TABLE `doza`
  ADD PRIMARY KEY (`dozaID`);

--
-- Indexes for table `furnitori`
--
ALTER TABLE `furnitori`
  ADD PRIMARY KEY (`furnitoriID`),
  ADD KEY `shtetiID` (`shtetiID`);

--
-- Indexes for table `kategoria`
--
ALTER TABLE `kategoria`
  ADD PRIMARY KEY (`kategoriaID`);

--
-- Indexes for table `klienti`
--
ALTER TABLE `klienti`
  ADD PRIMARY KEY (`klientiID`),
  ADD KEY `shtetiID` (`shtetiID`),
  ADD KEY `aplikimiID` (`aplikimiID`);

--
-- Indexes for table `menyra_pageses`
--
ALTER TABLE `menyra_pageses`
  ADD PRIMARY KEY (`menyra_pagesesID`);

--
-- Indexes for table `pagesa`
--
ALTER TABLE `pagesa`
  ADD PRIMARY KEY (`pagesaID`),
  ADD KEY `porosiaID` (`porosiaID`),
  ADD KEY `menyra_pagesesID` (`menyra_pagesesID`),
  ADD KEY `klientiID` (`klientiID`),
  ADD KEY `adminID` (`adminID`),
  ADD KEY `pagesa_ibfk_5` (`furnitoriID`),
  ADD KEY `pagesa_ibfk_6` (`produktiID`);

--
-- Indexes for table `pagesa_status`
--
ALTER TABLE `pagesa_status`
  ADD PRIMARY KEY (`pagesa_statusID`);

--
-- Indexes for table `porosia`
--
ALTER TABLE `porosia`
  ADD PRIMARY KEY (`porosiaID`),
  ADD KEY `porosia_statusID` (`porosia_statusID`),
  ADD KEY `pagesa_statusID` (`pagesa_statusID`),
  ADD KEY `klientiID` (`klientiID`);

--
-- Indexes for table `porosia_status`
--
ALTER TABLE `porosia_status`
  ADD PRIMARY KEY (`porosia_statusID`);

--
-- Indexes for table `produkti`
--
ALTER TABLE `produkti`
  ADD PRIMARY KEY (`produktiID`),
  ADD KEY `kategoriaID` (`kategoriaID`),
  ADD KEY `furnitoriID` (`furnitoriID`),
  ADD KEY `dozaID` (`dozaID`),
  ADD KEY `idx_produkti_cmimi` (`cmimi`);

--
-- Indexes for table `produkti_cart`
--
ALTER TABLE `produkti_cart`
  ADD PRIMARY KEY (`produkti_cartID`),
  ADD KEY `cartID` (`cartID`),
  ADD KEY `produkt_variacioniID` (`produkt_variacioniID`),
  ADD KEY `idx_produkti_cart_produktiID` (`produktiID`);

--
-- Indexes for table `produkti_porosise`
--
ALTER TABLE `produkti_porosise`
  ADD PRIMARY KEY (`produkti_porosiseID`),
  ADD KEY `porosiaID` (`porosiaID`),
  ADD KEY `produkt_variacioniID` (`produkt_variacioniID`),
  ADD KEY `idx_produkti_porosise_produktiID` (`produktiID`);

--
-- Indexes for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`tokenID`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `shteti`
--
ALTER TABLE `shteti`
  ADD PRIMARY KEY (`shtetiID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `adminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `aplikimi`
--
ALTER TABLE `aplikimi`
  MODIFY `aplikimiID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `aplikimi_status`
--
ALTER TABLE `aplikimi_status`
  MODIFY `aplikimi_statusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `doza`
--
ALTER TABLE `doza`
  MODIFY `dozaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `furnitori`
--
ALTER TABLE `furnitori`
  MODIFY `furnitoriID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `kategoriaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `klienti`
--
ALTER TABLE `klienti`
  MODIFY `klientiID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `menyra_pageses`
--
ALTER TABLE `menyra_pageses`
  MODIFY `menyra_pagesesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `pagesa`
--
ALTER TABLE `pagesa`
  MODIFY `pagesaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `pagesa_status`
--
ALTER TABLE `pagesa_status`
  MODIFY `pagesa_statusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `porosia`
--
ALTER TABLE `porosia`
  MODIFY `porosiaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `porosia_status`
--
ALTER TABLE `porosia_status`
  MODIFY `porosia_statusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `produkti`
--
ALTER TABLE `produkti`
  MODIFY `produktiID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produkti_cart`
--
ALTER TABLE `produkti_cart`
  MODIFY `produkti_cartID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `produkti_porosise`
--
ALTER TABLE `produkti_porosise`
  MODIFY `produkti_porosiseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  MODIFY `tokenID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `shteti`
--
ALTER TABLE `shteti`
  MODIFY `shtetiID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `aplikimi`
--
ALTER TABLE `aplikimi`
  ADD CONSTRAINT `aplikimi_ibfk_1` FOREIGN KEY (`aplikimi_statusID`) REFERENCES `aplikimi_status` (`aplikimi_statusID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `aplikimi_ibfk_2` FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_aplikimi_shteti` FOREIGN KEY (`shtetiId`) REFERENCES `shteti` (`shtetiID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `furnitori`
--
ALTER TABLE `furnitori`
  ADD CONSTRAINT `furnitori_ibfk_1` FOREIGN KEY (`shtetiID`) REFERENCES `shteti` (`shtetiID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `klienti`
--
ALTER TABLE `klienti`
  ADD CONSTRAINT `klienti_ibfk_1` FOREIGN KEY (`shtetiID`) REFERENCES `shteti` (`shtetiID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `klienti_ibfk_2` FOREIGN KEY (`aplikimiID`) REFERENCES `aplikimi` (`aplikimiID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pagesa`
--
ALTER TABLE `pagesa`
  ADD CONSTRAINT `pagesa_ibfk_1` FOREIGN KEY (`porosiaID`) REFERENCES `porosia` (`porosiaID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagesa_ibfk_2` FOREIGN KEY (`menyra_pagesesID`) REFERENCES `menyra_pageses` (`menyra_pagesesID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pagesa_ibfk_3` FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pagesa_ibfk_4` FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pagesa_ibfk_5` FOREIGN KEY (`furnitoriID`) REFERENCES `furnitori` (`furnitoriID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pagesa_ibfk_6` FOREIGN KEY (`produktiID`) REFERENCES `produkti` (`produktiID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `porosia`
--
ALTER TABLE `porosia`
  ADD CONSTRAINT `porosia_ibfk_1` FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `porosia_ibfk_2` FOREIGN KEY (`pagesa_statusID`) REFERENCES `pagesa_status` (`pagesa_statusID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `produkti`
--
ALTER TABLE `produkti`
  ADD CONSTRAINT `produkti_ibfk_1` FOREIGN KEY (`kategoriaID`) REFERENCES `kategoria` (`kategoriaID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produkti_ibfk_2` FOREIGN KEY (`furnitoriID`) REFERENCES `furnitori` (`furnitoriID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produkti_ibfk_3` FOREIGN KEY (`dozaID`) REFERENCES `doza` (`dozaID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `produkti_cart`
--
ALTER TABLE `produkti_cart`
  ADD CONSTRAINT `fk_produkti_cart_produkti` FOREIGN KEY (`produktiID`) REFERENCES `produkti` (`produktiID`),
  ADD CONSTRAINT `produkti_cart_ibfk_1` FOREIGN KEY (`cartID`) REFERENCES `cart` (`cartID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `produkti_porosise`
--
ALTER TABLE `produkti_porosise`
  ADD CONSTRAINT `fk_produkti_porosise_produkti` FOREIGN KEY (`produktiID`) REFERENCES `produkti` (`produktiID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `produkti_porosise_ibfk_1` FOREIGN KEY (`porosiaID`) REFERENCES `porosia` (`porosiaID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
