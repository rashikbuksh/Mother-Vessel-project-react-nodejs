-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2023 at 07:34 PM
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
-- Table structure for table `chq_approval`
--

CREATE TABLE `chq_approval` (
  `id` int(11) NOT NULL,
  `order_job_number` varchar(255) NOT NULL,
  `sixty_percent_payment` varchar(100) DEFAULT NULL,
  `forty_percent_payment` varchar(100) DEFAULT NULL,
  `damarage` varchar(100) DEFAULT NULL,
  `second_trip` varchar(100) DEFAULT NULL,
  `third_trip` varchar(100) DEFAULT NULL,
  `direct_trip` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chq_approval`
--

INSERT INTO `chq_approval` (`id`, `order_job_number`, `sixty_percent_payment`, `forty_percent_payment`, `damarage`, `second_trip`, `third_trip`, `direct_trip`) VALUES
(10, 'Anik-10/3/2023-Samsung-SINGAPORE-1', 'done, Chq Number: xxx', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `chq_due_list`
--

CREATE TABLE `chq_due_list` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `mode` varchar(50) NOT NULL,
  `chq_amount` varchar(50) NOT NULL,
  `part_pay` varchar(50) NOT NULL,
  `balance` float NOT NULL,
  `chq_issue_date` date NOT NULL,
  `init_amount` float NOT NULL,
  `payment` varchar(50) NOT NULL,
  `final_amount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `current_status`
--

INSERT INTO `current_status` (`id`, `order_job_number`, `current_location`, `remark`, `time_updated`, `trip_completed`) VALUES
(7, 'Anik-10/3/2023-Samsung-SINGAPORE-1', 'Chittagong', 'Port', '2023-04-05 17:00:37', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `damarage_dispatch`
--

INSERT INTO `damarage_dispatch` (`id`, `order_job_number`, `date`, `loading_location`, `unloading_location`, `loading_start_time_stamp`, `loading_completion_time_stamp`, `sailing_time_stamp`, `duration_of_travel_time`, `unloading_start_time_stamp`, `unloading_completion_time_stamp`, `others`, `total_elapsed_time`, `voyage_time`, `free_time`, `total_despatch`, `daily_despatch`) VALUES
(14, 'Anik-10/3/2023-Samsung-SINGAPORE-1', '2023-04-14 12:00:00', 'Singapore', 'Chittagong', '2023-04-12 00:00:00', '2023-04-14 00:00:00', '2023-04-15 00:00:00', '8', '2023-04-17 00:00:00', '2023-04-19 00:00:00', 'Nothing', '00:00:10', '00:00:10', '00:00:01', 50, 10);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_entry`
--

INSERT INTO `job_entry` (`id`, `order_number`, `importer_name`, `mother_vessel_name`, `eta`, `commodity`, `mv_location`, `bl_quantity`, `stevedore_name`, `stevedore_contact_number`, `time_stamp`) VALUES
(23, 'Anik-10/3/2023-Samsung-SINGAPORE', 'Anik', 'Samsung', '2023-04-10', 'Mobile', 'SINGAPORE', 1500, 'Anik', '01684545111', '2023-04-05 22:55:55');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_job_table`
--

INSERT INTO `order_job_table` (`order_job_id`, `order_number`, `job_number`, `order_number_done`, `sixty_percent_done`, `job_completed`) VALUES
(31, 'Anik-10/3/2023-Samsung-SINGAPORE', 0, 0, 0, 0),
(32, 'Anik-10/3/2023-Samsung-SINGAPORE', 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `order_job_number` varchar(50) NOT NULL,
  `chq_no` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `payment_approved` int(11) NOT NULL,
  `payment_chq_no` int(11) NOT NULL,
  `payment_chq_amount` int(11) NOT NULL,
  `payment_chq_date` datetime NOT NULL,
  `added_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `record_entry`
--

INSERT INTO `record_entry` (`id`, `order_number`, `job_number`, `date_from_charpotro`, `cp_number_from_charpotro`, `LA_name`, `LV_name`, `dest_from`, `dest_to`, `capacity`, `rate`, `LV_master_name`, `LV_master_contact_number`, `date_created`) VALUES
(25, 'Anik-10/3/2023-Samsung-SINGAPORE', '1', '2023-04-12', 123456, 'Samsung BD', 'Mayer Dua', 'Chittagong', 'Dhaka', 10, 10000, 'Raf', '01684545111', '2023-04-05');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `chq_due_list`
--
ALTER TABLE `chq_due_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `current_status`
--
ALTER TABLE `current_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `damarage_dispatch`
--
ALTER TABLE `damarage_dispatch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `job_entry`
--
ALTER TABLE `job_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `order_job_table`
--
ALTER TABLE `order_job_table`
  MODIFY `order_job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pre_defined_ship`
--
ALTER TABLE `pre_defined_ship`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `record_entry`
--
ALTER TABLE `record_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
