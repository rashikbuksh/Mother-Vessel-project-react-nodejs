-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 26, 2023 at 07:10 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `port_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `job_entry`
--

CREATE TABLE `job_entry` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `importer_name` varchar(50) NOT NULL,
  `mother_vessel_name` varchar(50) NOT NULL,
  `eta` date NOT NULL,
  `commodity` varchar(50) NOT NULL,
  `mv_location` varchar(50) NOT NULL,
  `bl_quantity` int(11) NOT NULL,
  `stevedore_name` varchar(50) NOT NULL,
  `stevedore_contact_number` varchar(20) NOT NULL,
  `time_stamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `position` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `user_created_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `position`, `department`, `user_created_time`) VALUES
(1, 'Fahim', 'hasibarrafiulfahim@gmail.com', '18bf931b32b6d4b8a78c62e4144bc5a1d07f6fd3e34245fc98a17e76531284a2', 'admin', 'accounts', '2023-02-26 12:00:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `job_entry`
--
ALTER TABLE `job_entry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `job_entry`
--
ALTER TABLE `job_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
