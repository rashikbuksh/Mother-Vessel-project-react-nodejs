-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2023 at 09:21 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

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
-- Table structure for table `chq_approval`
--

CREATE TABLE `chq_approval` (
  `id` int(11) NOT NULL,
  `order_job_number` varchar(255) NOT NULL,
  `sixty_percent_payment_amount` varchar(100) DEFAULT NULL,
  `forty_percent_payment_amount` varchar(100) DEFAULT NULL,
  `damarage` varchar(100) DEFAULT NULL,
  `second_trip` varchar(100) DEFAULT NULL,
  `third_trip` varchar(100) DEFAULT NULL,
  `direct_trip` varchar(100) DEFAULT NULL,
  `sixty_percent_payment_chq_number` varchar(255) DEFAULT NULL,
  `sixty_percent_payment_chq_date` date DEFAULT NULL,
  `forty_percent_payment_chq_number` varchar(255) DEFAULT NULL,
  `forty_percent_payment_chq_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chq_approval`
--

INSERT INTO `chq_approval` (`id`, `order_job_number`, `sixty_percent_payment_amount`, `forty_percent_payment_amount`, `damarage`, `second_trip`, `third_trip`, `direct_trip`, `sixty_percent_payment_chq_number`, `sixty_percent_payment_chq_date`, `forty_percent_payment_chq_number`, `forty_percent_payment_chq_date`) VALUES
(14, 'Anik-13/3/2023-Paharika-Srilanka-1', '5000', '0', NULL, NULL, NULL, NULL, '123456', '2023-04-14', '0', '2023-04-20'),
(15, 'Anik-13/3/2023-Paharika-Srilanka-2', '500', '400', NULL, NULL, NULL, NULL, '456456', '2023-04-26', '123321', '2023-04-27'),
(16, 'Prime-21/3/2023-Uddoyon-Srilanka-1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'Prime-21/3/2023-Uddoyon-Srilanka-2', '400', '600', NULL, NULL, NULL, NULL, '56789', '2023-04-24', '123456', '2023-04-30'),
(18, 'Prime-21/3/2023-Uddoyon-Srilanka-3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Anik-13/3/2023-Paharika-Srilanka-3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'Prime-21/3/2023-Uddoyon-Srilanka-4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, 'Anik-13/3/2023-Paharika-Srilanka-4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Triggers `chq_approval`
--
DELIMITER $$
CREATE TRIGGER `insert_chq_due_list_40_percent` AFTER UPDATE ON `chq_approval` FOR EACH ROW BEGIN 
	DECLARE order_count INT;
    SELECT 
      COUNT(order_job_number) INTO order_count 
    FROM 
      chq_due_list 
    where 
      order_job_number = NEW.order_job_number 
      and mode = '40';
      
    IF(NEW.forty_percent_payment_amount > 0 and order_count < 1) THEN 
    	INSERT INTO chq_due_list (order_job_number, mode) VALUES (NEW.order_job_number, '40');
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insert_chq_due_list_60_percent` AFTER UPDATE ON `chq_approval` FOR EACH ROW BEGIN 
	DECLARE order_count INT;
    SELECT 
      COUNT(order_job_number) INTO order_count 
    FROM 
      chq_due_list 
    where 
      order_job_number = NEW.order_job_number 
      and mode = '60';
      
    IF(NEW.sixty_percent_payment_amount > 0 and order_count < 1) THEN 
    	INSERT INTO chq_due_list (order_job_number, mode) VALUES (NEW.order_job_number, '60');
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `chq_due_list`
--

CREATE TABLE `chq_due_list` (
  `id` int(11) NOT NULL,
  `order_job_number` varchar(255) NOT NULL,
  `part_pay` varchar(255) DEFAULT NULL,
  `payment` varchar(255) DEFAULT NULL,
  `mode` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chq_due_list`
--

INSERT INTO `chq_due_list` (`id`, `order_job_number`, `part_pay`, `payment`, `mode`, `amount`) VALUES
(9, 'Anik-13/3/2023-Paharika-Srilanka-1', '100490', NULL, '60', NULL),
(10, 'Prime-21/3/2023-Uddoyon-Srilanka-2', '100200', NULL, '60', NULL),
(11, 'Prime-21/3/2023-Uddoyon-Srilanka-2', NULL, 'Part', '40', 500),
(12, 'Anik-13/3/2023-Paharika-Srilanka-2', NULL, NULL, '60', NULL),
(13, 'Anik-13/3/2023-Paharika-Srilanka-2', NULL, NULL, '40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `current_status`
--

CREATE TABLE `current_status` (
  `id` int(11) NOT NULL,
  `order_job_number` varchar(255) NOT NULL,
  `current_location` varchar(50) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `time_updated` datetime NOT NULL DEFAULT current_timestamp(),
  `trip_completed` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `current_status`
--

INSERT INTO `current_status` (`id`, `order_job_number`, `current_location`, `remark`, `time_updated`, `trip_completed`) VALUES
(11, 'Anik-13/3/2023-Paharika-Srilanka-1', 'Ctg', NULL, '2023-04-06 19:48:27', 0),
(12, 'Anik-13/3/2023-Paharika-Srilanka-2', NULL, NULL, '2023-04-07 23:03:55', 0),
(13, 'Prime-21/3/2023-Uddoyon-Srilanka-1', NULL, NULL, '2023-04-08 00:02:23', 0),
(14, 'Prime-21/3/2023-Uddoyon-Srilanka-2', 'Mawa', NULL, '2023-04-08 10:43:13', 1),
(15, 'Prime-21/3/2023-Uddoyon-Srilanka-3', NULL, NULL, '2023-04-08 16:52:54', 0),
(16, 'Anik-13/3/2023-Paharika-Srilanka-3', NULL, NULL, '2023-04-08 16:56:27', 0),
(17, 'Prime-21/3/2023-Uddoyon-Srilanka-4', NULL, NULL, '2023-04-08 23:03:40', 0),
(18, 'Anik-13/3/2023-Paharika-Srilanka-4', NULL, NULL, '2023-04-08 23:05:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `damarage_dispatch`
--

CREATE TABLE `damarage_dispatch` (
  `id` int(11) NOT NULL,
  `order_job_number` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `loading_location` varchar(50) DEFAULT NULL,
  `unloading_location` varchar(50) DEFAULT NULL,
  `loading_start_time_stamp` datetime DEFAULT NULL,
  `loading_completion_time_stamp` datetime DEFAULT NULL,
  `sailing_time_stamp` datetime DEFAULT NULL,
  `duration_of_travel_time` varchar(255) DEFAULT NULL,
  `unloading_start_time_stamp` datetime DEFAULT NULL,
  `unloading_completion_time_stamp` datetime DEFAULT NULL,
  `others` varchar(100) DEFAULT NULL,
  `total_elapsed_time` time DEFAULT NULL,
  `voyage_time` time DEFAULT NULL,
  `free_time` time DEFAULT NULL,
  `total_despatch` int(11) DEFAULT NULL,
  `daily_despatch` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `damarage_dispatch`
--

INSERT INTO `damarage_dispatch` (`id`, `order_job_number`, `date`, `loading_location`, `unloading_location`, `loading_start_time_stamp`, `loading_completion_time_stamp`, `sailing_time_stamp`, `duration_of_travel_time`, `unloading_start_time_stamp`, `unloading_completion_time_stamp`, `others`, `total_elapsed_time`, `voyage_time`, `free_time`, `total_despatch`, `daily_despatch`) VALUES
(18, 'Anik-13/3/2023-Paharika-Srilanka-1', '2023-04-07 01:17:46', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Anik-13/3/2023-Paharika-Srilanka-2', '2023-04-07 23:03:55', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'Prime-21/3/2023-Uddoyon-Srilanka-1', '2023-04-08 00:02:23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, 'Prime-21/3/2023-Uddoyon-Srilanka-2', '2023-04-08 00:03:23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, 'Prime-21/3/2023-Uddoyon-Srilanka-3', '2023-04-08 16:52:54', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'Anik-13/3/2023-Paharika-Srilanka-3', '2023-04-08 16:56:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(24, 'Prime-21/3/2023-Uddoyon-Srilanka-4', '2023-04-08 23:03:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, 'Anik-13/3/2023-Paharika-Srilanka-4', '2023-04-08 23:05:31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_entry`
--

CREATE TABLE `job_entry` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `importer_name` varchar(50) NOT NULL,
  `mother_vessel_name` varchar(50) NOT NULL,
  `eta` varchar(20) NOT NULL,
  `commodity` varchar(50) NOT NULL,
  `mv_location` varchar(50) NOT NULL,
  `bl_quantity` int(11) NOT NULL,
  `stevedore_name` varchar(50) NOT NULL,
  `stevedore_contact_number` varchar(20) NOT NULL,
  `time_stamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_entry`
--

INSERT INTO `job_entry` (`id`, `order_number`, `importer_name`, `mother_vessel_name`, `eta`, `commodity`, `mv_location`, `bl_quantity`, `stevedore_name`, `stevedore_contact_number`, `time_stamp`) VALUES
(25, 'Anik-13/3/2023-Paharika-Srilanka', 'Anik', 'Paharika', '2023-04-13', 'Suger', 'Srilanka', 5000, 'Fahim', '01521533595', '2023-04-07 01:17:01'),
(26, 'Prime-21/3/2023-Uddoyon-Srilanka', 'Prime', 'Uddoyon', '2023-04-21', 'Suger', 'Srilanka', 5000, 'Fahim', '01521533595', '2023-04-08 00:00:33');

--
-- Triggers `job_entry`
--
DELIMITER $$
CREATE TRIGGER `add_order_job` AFTER INSERT ON `job_entry` FOR EACH ROW INSERT INTO order_job_table(order_number) VALUES(NEW.order_number)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete_order_job_table_from_job_entry` AFTER DELETE ON `job_entry` FOR EACH ROW DELETE FROM order_job_table 
where old.order_number = order_number
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete_record_entry_from_job_entry` AFTER DELETE ON `job_entry` FOR EACH ROW DELETE FROM record_entry 
where old.order_number = order_number
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `order_job_table`
--

CREATE TABLE `order_job_table` (
  `order_job_id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `job_number` int(50) NOT NULL DEFAULT 0,
  `order_number_done` int(11) NOT NULL DEFAULT 0,
  `sixty_percent_done` int(11) NOT NULL DEFAULT 0,
  `job_completed` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_job_table`
--

INSERT INTO `order_job_table` (`order_job_id`, `order_number`, `job_number`, `order_number_done`, `sixty_percent_done`, `job_completed`) VALUES
(37, 'Anik-13/3/2023-Paharika-Srilanka', 0, 0, 0, 0),
(38, 'Anik-13/3/2023-Paharika-Srilanka', 1, 0, 0, 0),
(39, 'Anik-13/3/2023-Paharika-Srilanka', 2, 0, 0, 0),
(40, 'Prime-21/3/2023-Uddoyon-Srilanka', 0, 0, 0, 0),
(41, 'Prime-21/3/2023-Uddoyon-Srilanka', 1, 0, 0, 0),
(42, 'Prime-21/3/2023-Uddoyon-Srilanka', 2, 0, 0, 0),
(43, 'Prime-21/3/2023-Uddoyon-Srilanka', 3, 0, 0, 0),
(44, 'Anik-13/3/2023-Paharika-Srilanka', 3, 0, 0, 0),
(45, 'Prime-21/3/2023-Uddoyon-Srilanka', 4, 0, 0, 0),
(46, 'Anik-13/3/2023-Paharika-Srilanka', 4, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `order_job_number` varchar(50) NOT NULL,
  `payment_chq_no` int(11) DEFAULT NULL,
  `payment_chq_amount` int(11) DEFAULT NULL,
  `payment_chq_date` datetime DEFAULT NULL,
  `LV_name` varchar(255) NOT NULL,
  `LA_name` varchar(255) NOT NULL,
  `commodity` varchar(255) NOT NULL,
  `chq_issue_date` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `part_pay` varchar(255) NOT NULL,
  `payment` varchar(255) NOT NULL,
  `balance` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `order_job_number`, `payment_chq_no`, `payment_chq_amount`, `payment_chq_date`, `LV_name`, `LA_name`, `commodity`, `chq_issue_date`, `amount`, `part_pay`, `payment`, `balance`) VALUES
(3, 'Prime-21/3/2023-Uddoyon-Srilanka-2', 222, 2222, '2023-04-29 00:00:00', 'Mayer Dua', 'Amar Dua', 'Suger', '2023-04-23T18:00:00.000Z', '200', '100', 'Part', '300'),
(4, 'Anik-13/3/2023-Paharika-Srilanka-1', 111, 490, '2023-04-26 00:00:00', 'Mayer Dua', 'Amar Dua 1', 'Suger', '2023-04-13T18:00:00.000Z', '490', '100', 'Part', '4900');

-- --------------------------------------------------------

--
-- Table structure for table `pre_defined_ship`
--

CREATE TABLE `pre_defined_ship` (
  `id` int(11) NOT NULL,
  `LV_name` varchar(50) DEFAULT NULL,
  `date_from_charpotro` date DEFAULT NULL,
  `commodity` varchar(50) DEFAULT NULL,
  `LA` varchar(50) DEFAULT NULL,
  `dest_from` varchar(50) DEFAULT NULL,
  `dest_to` varchar(50) DEFAULT NULL,
  `current_location` varchar(50) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `time_updated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pre_defined_ship`
--

INSERT INTO `pre_defined_ship` (`id`, `LV_name`, `date_from_charpotro`, `commodity`, `LA`, `dest_from`, `dest_to`, `current_location`, `remark`, `time_updated`) VALUES
(10, 'Amar dua', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-08 00:13:19');

-- --------------------------------------------------------

--
-- Table structure for table `record_entry`
--

CREATE TABLE `record_entry` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `job_number` varchar(50) NOT NULL,
  `date_from_charpotro` date NOT NULL,
  `cp_number_from_charpotro` int(11) NOT NULL,
  `LA_name` varchar(50) NOT NULL,
  `LV_name` varchar(50) NOT NULL,
  `dest_from` varchar(50) NOT NULL,
  `dest_to` varchar(50) NOT NULL,
  `capacity` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `LV_master_name` varchar(50) NOT NULL,
  `LV_master_contact_number` varchar(15) NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `record_entry`
--

INSERT INTO `record_entry` (`id`, `order_number`, `job_number`, `date_from_charpotro`, `cp_number_from_charpotro`, `LA_name`, `LV_name`, `dest_from`, `dest_to`, `capacity`, `rate`, `LV_master_name`, `LV_master_contact_number`, `date_created`) VALUES
(29, 'Anik-13/3/2023-Paharika-Srilanka', '1', '2023-04-21', 123, 'Amar Dua 1', 'Mayer Dua', 'Chittagong', 'Dhaka', 100, 500, 'Anik', '01521533595', '2023-04-07'),
(30, 'Anik-13/3/2023-Paharika-Srilanka', '2', '2023-04-24', 987, 'Amar Dua 2', 'Mayer Dua 111', 'Chittagong', 'DHk', 400, 50, 'Fahim', '01721533595', '2023-04-07'),
(31, 'Prime-21/3/2023-Uddoyon-Srilanka', '1', '2023-04-13', 123456, 'Amar Dua', 'Mayer Dua', 'Narsingdi', 'CTG', 1000, 500, 'Rashik', '0152153595', '2023-04-08'),
(32, 'Prime-21/3/2023-Uddoyon-Srilanka', '2', '2023-04-25', 987654, 'Amar Dua', 'Mayer Dua', 'Khulna', 'DHK', 400, 10, 'Fahim', '01856212168', '2023-04-08'),
(33, 'Prime-21/3/2023-Uddoyon-Srilanka', '3', '2023-04-28', 456789, '', 'Kalihati', 'Kapashia', 'CTG', 100, 200, 'Anik', '01521533595', '2023-04-08'),
(34, 'Anik-13/3/2023-Paharika-Srilanka', '3', '2023-04-27', 5, '', 'Kalihati', 'Khulna', 'CTG', 100, 10, 'Anik', '10', '2023-04-08'),
(35, 'Prime-21/3/2023-Uddoyon-Srilanka', '4', '2023-04-21', 6, '', 'Karim', 'Kapashia', 'DHK', 100, 10, 'Anik', '01856212168', '2023-04-08'),
(36, 'Anik-13/3/2023-Paharika-Srilanka', '4', '2023-05-05', 987654321, 'KEL-BD', 'Rahim', 'Narsingdi', 'Dhaka', 1000, 10, 'Rashik', '0152153595', '2023-04-08');

--
-- Triggers `record_entry`
--
DELIMITER $$
CREATE TRIGGER `add_record_job` AFTER INSERT ON `record_entry` FOR EACH ROW INSERT INTO order_job_table (order_number, job_number) VALUES (new.order_number, new.job_number)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insert_chq_approval_list` AFTER INSERT ON `record_entry` FOR EACH ROW INSERT INTO chq_approval (order_job_number) 
VALUE (concat(new.order_number, '-', new.job_number))
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insert_current_status` AFTER INSERT ON `record_entry` FOR EACH ROW INSERT INTO current_status (order_job_number)
VALUE (concat(new.order_number, '-', new.job_number))
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insert_damarage_dispatch` AFTER INSERT ON `record_entry` FOR EACH ROW INSERT INTO damarage_dispatch (order_job_number)
VALUES (CONCAT(NEW.order_number, '-', NEW.job_number))
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `position` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `user_created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `enabled` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `position`, `department`, `user_created_time`, `enabled`) VALUES
(1, 'Fahim', 'hasibarrafiulfahim@gmail.com', '456d857786314e3a20a6c90582d25a0995f15977940c91e7b466e52b937f7e50', 'admin', 'accounts', '2023-02-26 12:00:58', 1),
(2, 'rashik', 'rashik', '5fb62704057fe5b652be548e74c628c5681adf87ca77b1b27ee470e33f29b6f9', 'admin', 'accounts', '2023-02-28 03:43:41', 1),
(4, 'Shahadat Anik', 'Anik', 'a9f5007446fc27de3c8e785574e0c10ea2bebd088e38a5c50143be35350b3328', 'operations', 'Napa', '2023-04-02 19:55:54', 1),
(5, 'Nakib Bhai', 'Nakib', 'f09e4bc8c9ee106c535e01fc372484f275cb422689fc8cfb6dceddbd074fd130', 'operations', 'null', '2023-04-02 23:03:42', 1),
(6, 'Anik123', 'Anik123', 'bd3730f88242d05062c2c59be1284cd51887bf7ac6aa084295f0941f3397998c', 'accounts', 'null', '2023-04-02 23:07:41', 1),
(7, 'Prime', 'Prime', 'dd8444850764b8740de73e71453b36697dc0c8bfa173ec1f3cece323ffff98e0', 'accounts-manager', 'null', '2023-04-02 23:08:49', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chq_approval`
--
ALTER TABLE `chq_approval`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chq_due_list`
--
ALTER TABLE `chq_due_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_job_number` (`order_job_number`,`mode`);

--
-- Indexes for table `current_status`
--
ALTER TABLE `current_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `damarage_dispatch`
--
ALTER TABLE `damarage_dispatch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_entry`
--
ALTER TABLE `job_entry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_job_table`
--
ALTER TABLE `order_job_table`
  ADD PRIMARY KEY (`order_job_id`),
  ADD UNIQUE KEY `unique_order_job` (`order_number`,`job_number`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pre_defined_ship`
--
ALTER TABLE `pre_defined_ship`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `record_entry`
--
ALTER TABLE `record_entry`
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
-- AUTO_INCREMENT for table `chq_approval`
--
ALTER TABLE `chq_approval`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `chq_due_list`
--
ALTER TABLE `chq_due_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `current_status`
--
ALTER TABLE `current_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `damarage_dispatch`
--
ALTER TABLE `damarage_dispatch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `job_entry`
--
ALTER TABLE `job_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `order_job_table`
--
ALTER TABLE `order_job_table`
  MODIFY `order_job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pre_defined_ship`
--
ALTER TABLE `pre_defined_ship`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `record_entry`
--
ALTER TABLE `record_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
