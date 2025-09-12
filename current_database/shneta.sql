-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2025 at 09:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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

-- --------------------------------------------------------

--
-- Table structure for table `aplikimi`
--

CREATE TABLE `aplikimi` (
  `aplikimiID` int(11) NOT NULL,
  `emri_kompanise` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `aplikimi_statusID` int(11) DEFAULT NULL,
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
(1, 'Test Company', 'test@gmail.com', 1, '2025-05-27 00:26:15', NULL, NULL, NULL, 'test address', 6, 'Tirana', '10000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq');

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
(1, 50.00),
(2, 100.00),
(3, 250.00),
(4, 500.00),
(5, 750.00),
(6, 1000.00),
(7, 1500.00),
(8, 2000.00);

-- --------------------------------------------------------

--
-- Table structure for table `forma`
--

CREATE TABLE `forma` (
  `formaID` int(11) NOT NULL,
  `lloji_formes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forma`
--

INSERT INTO `forma` (`formaID`, `lloji_formes`) VALUES
(1, 'Tablet'),
(2, 'Capsule'),
(3, 'Syrup'),
(4, 'Cream'),
(5, 'Gel'),
(6, 'Spray'),
(7, 'Drops'),
(8, 'Powder');

-- --------------------------------------------------------

--
-- Table structure for table `furnitori`
--

CREATE TABLE `furnitori` (
  `furnitoriID` int(11) NOT NULL,
  `emri` varchar(255) DEFAULT NULL,
  `shtetiID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategoria`
--

CREATE TABLE `kategoria` (
  `kategoriaID` int(11) NOT NULL,
  `emri` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Rr. Bulevardi 28 Nëntori', 'Tirana', '1001', 1, 1, 'contact@albaniafoods.com', 'Albania Foods Shpk', 'Alb@1234');

-- --------------------------------------------------------

--
-- Table structure for table `leviza_ne_stok`
--

CREATE TABLE `leviza_ne_stok` (
  `levizjaID` int(11) NOT NULL,
  `lloji_levizjes` varchar(255) DEFAULT NULL,
  `sasia` int(11) DEFAULT NULL CHECK (`sasia` > 0),
  `koha_krijimit` datetime DEFAULT current_timestamp(),
  `produkt_variacioniID` int(11) DEFAULT NULL,
  `porosiaID` int(11) DEFAULT NULL,
  `adminID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menyra_pageses`
--

CREATE TABLE `menyra_pageses` (
  `menyra_pagesesID` int(11) NOT NULL,
  `menyra_pageses` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `numri_llogarise` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pagesa_status`
--

CREATE TABLE `pagesa_status` (
  `pagesa_statusID` int(11) NOT NULL,
  `statusi` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `porosia_status`
--

CREATE TABLE `porosia_status` (
  `porosia_statusID` int(11) NOT NULL,
  `statusi` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produkti`
--

CREATE TABLE `produkti` (
  `produktiID` int(11) NOT NULL,
  `emri` varchar(255) DEFAULT NULL,
  `pershkrimi` text DEFAULT NULL,
  `kategoriaID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produkti_cart`
--

CREATE TABLE `produkti_cart` (
  `produkti_cartID` int(11) NOT NULL,
  `sasia` int(11) DEFAULT NULL CHECK (`sasia` > 0),
  `cmimi` decimal(8,2) DEFAULT NULL,
  `cartID` int(11) DEFAULT NULL,
  `produkt_variacioniID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produkti_porosise`
--

CREATE TABLE `produkti_porosise` (
  `produkti_porosiseID` int(11) NOT NULL,
  `porosiaID` int(11) DEFAULT NULL,
  `produkt_variacioniID` int(11) DEFAULT NULL,
  `sasia` int(11) DEFAULT NULL CHECK (`sasia` > 0),
  `cmimi` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produkt_variacioni`
--

CREATE TABLE `produkt_variacioni` (
  `produkt_variacioniID` int(11) NOT NULL,
  `cmimi` decimal(8,2) DEFAULT NULL,
  `sasia_ne_stok` int(11) NOT NULL CHECK (`sasia_ne_stok` >= 0),
  `formaID` int(11) DEFAULT NULL,
  `dozaID` int(11) DEFAULT NULL,
  `furnitoriID` int(11) DEFAULT NULL,
  `produktiID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indexes for table `forma`
--
ALTER TABLE `forma`
  ADD PRIMARY KEY (`formaID`);

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
-- Indexes for table `leviza_ne_stok`
--
ALTER TABLE `leviza_ne_stok`
  ADD PRIMARY KEY (`levizjaID`),
  ADD KEY `produkt_variacioniID` (`produkt_variacioniID`),
  ADD KEY `porosiaID` (`porosiaID`),
  ADD KEY `adminID` (`adminID`);

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
  ADD KEY `menyra_pagesesID` (`menyra_pagesesID`);

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
  ADD KEY `kategoriaID` (`kategoriaID`);

--
-- Indexes for table `produkti_cart`
--
ALTER TABLE `produkti_cart`
  ADD PRIMARY KEY (`produkti_cartID`),
  ADD KEY `cartID` (`cartID`),
  ADD KEY `produkt_variacioniID` (`produkt_variacioniID`);

--
-- Indexes for table `produkti_porosise`
--
ALTER TABLE `produkti_porosise`
  ADD PRIMARY KEY (`produkti_porosiseID`),
  ADD KEY `porosiaID` (`porosiaID`),
  ADD KEY `produkt_variacioniID` (`produkt_variacioniID`);

--
-- Indexes for table `produkt_variacioni`
--
ALTER TABLE `produkt_variacioni`
  ADD PRIMARY KEY (`produkt_variacioniID`),
  ADD KEY `formaID` (`formaID`),
  ADD KEY `dozaID` (`dozaID`),
  ADD KEY `furnitoriID` (`furnitoriID`),
  ADD KEY `produktiID` (`produktiID`);

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
  MODIFY `adminID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aplikimi`
--
ALTER TABLE `aplikimi`
  MODIFY `aplikimiID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `aplikimi_status`
--
ALTER TABLE `aplikimi_status`
  MODIFY `aplikimi_statusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doza`
--
ALTER TABLE `doza`
  MODIFY `dozaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `forma`
--
ALTER TABLE `forma`
  MODIFY `formaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `furnitori`
--
ALTER TABLE `furnitori`
  MODIFY `furnitoriID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `kategoriaID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `klienti`
--
ALTER TABLE `klienti`
  MODIFY `klientiID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `leviza_ne_stok`
--
ALTER TABLE `leviza_ne_stok`
  MODIFY `levizjaID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menyra_pageses`
--
ALTER TABLE `menyra_pageses`
  MODIFY `menyra_pagesesID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pagesa`
--
ALTER TABLE `pagesa`
  MODIFY `pagesaID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pagesa_status`
--
ALTER TABLE `pagesa_status`
  MODIFY `pagesa_statusID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `porosia`
--
ALTER TABLE `porosia`
  MODIFY `porosiaID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `porosia_status`
--
ALTER TABLE `porosia_status`
  MODIFY `porosia_statusID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produkti`
--
ALTER TABLE `produkti`
  MODIFY `produktiID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produkti_cart`
--
ALTER TABLE `produkti_cart`
  MODIFY `produkti_cartID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produkti_porosise`
--
ALTER TABLE `produkti_porosise`
  MODIFY `produkti_porosiseID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produkt_variacioni`
--
ALTER TABLE `produkt_variacioni`
  MODIFY `produkt_variacioniID` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `aplikimi_ibfk_1` FOREIGN KEY (`aplikimi_statusID`) REFERENCES `aplikimi_status` (`aplikimi_statusID`),
  ADD CONSTRAINT `aplikimi_ibfk_2` FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`),
  ADD CONSTRAINT `fk_aplikimi_shteti` FOREIGN KEY (`shtetiId`) REFERENCES `shteti` (`shtetiID`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`);

--
-- Constraints for table `furnitori`
--
ALTER TABLE `furnitori`
  ADD CONSTRAINT `furnitori_ibfk_1` FOREIGN KEY (`shtetiID`) REFERENCES `shteti` (`shtetiID`);

--
-- Constraints for table `klienti`
--
ALTER TABLE `klienti`
  ADD CONSTRAINT `klienti_ibfk_1` FOREIGN KEY (`shtetiID`) REFERENCES `shteti` (`shtetiID`),
  ADD CONSTRAINT `klienti_ibfk_2` FOREIGN KEY (`aplikimiID`) REFERENCES `aplikimi` (`aplikimiID`);

--
-- Constraints for table `leviza_ne_stok`
--
ALTER TABLE `leviza_ne_stok`
  ADD CONSTRAINT `leviza_ne_stok_ibfk_1` FOREIGN KEY (`produkt_variacioniID`) REFERENCES `produkt_variacioni` (`produkt_variacioniID`),
  ADD CONSTRAINT `leviza_ne_stok_ibfk_2` FOREIGN KEY (`porosiaID`) REFERENCES `porosia` (`porosiaID`),
  ADD CONSTRAINT `leviza_ne_stok_ibfk_3` FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`);

--
-- Constraints for table `pagesa`
--
ALTER TABLE `pagesa`
  ADD CONSTRAINT `pagesa_ibfk_1` FOREIGN KEY (`porosiaID`) REFERENCES `porosia` (`porosiaID`),
  ADD CONSTRAINT `pagesa_ibfk_2` FOREIGN KEY (`menyra_pagesesID`) REFERENCES `menyra_pageses` (`menyra_pagesesID`);

--
-- Constraints for table `porosia`
--
ALTER TABLE `porosia`
  ADD CONSTRAINT `porosia_ibfk_1` FOREIGN KEY (`porosia_statusID`) REFERENCES `porosia_status` (`porosia_statusID`),
  ADD CONSTRAINT `porosia_ibfk_2` FOREIGN KEY (`pagesa_statusID`) REFERENCES `pagesa_status` (`pagesa_statusID`),
  ADD CONSTRAINT `porosia_ibfk_3` FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`);

--
-- Constraints for table `produkti`
--
ALTER TABLE `produkti`
  ADD CONSTRAINT `produkti_ibfk_1` FOREIGN KEY (`kategoriaID`) REFERENCES `kategoria` (`kategoriaID`);

--
-- Constraints for table `produkti_cart`
--
ALTER TABLE `produkti_cart`
  ADD CONSTRAINT `produkti_cart_ibfk_1` FOREIGN KEY (`cartID`) REFERENCES `cart` (`cartID`),
  ADD CONSTRAINT `produkti_cart_ibfk_2` FOREIGN KEY (`produkt_variacioniID`) REFERENCES `produkt_variacioni` (`produkt_variacioniID`);

--
-- Constraints for table `produkti_porosise`
--
ALTER TABLE `produkti_porosise`
  ADD CONSTRAINT `produkti_porosise_ibfk_1` FOREIGN KEY (`porosiaID`) REFERENCES `porosia` (`porosiaID`),
  ADD CONSTRAINT `produkti_porosise_ibfk_2` FOREIGN KEY (`produkt_variacioniID`) REFERENCES `produkt_variacioni` (`produkt_variacioniID`);

--
-- Constraints for table `produkt_variacioni`
--
ALTER TABLE `produkt_variacioni`
  ADD CONSTRAINT `produkt_variacioni_ibfk_1` FOREIGN KEY (`formaID`) REFERENCES `forma` (`formaID`),
  ADD CONSTRAINT `produkt_variacioni_ibfk_2` FOREIGN KEY (`dozaID`) REFERENCES `doza` (`dozaID`),
  ADD CONSTRAINT `produkt_variacioni_ibfk_3` FOREIGN KEY (`furnitoriID`) REFERENCES `furnitori` (`furnitoriID`),
  ADD CONSTRAINT `produkt_variacioni_ibfk_4` FOREIGN KEY (`produktiID`) REFERENCES `produkti` (`produktiID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
