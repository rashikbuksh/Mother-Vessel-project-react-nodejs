-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2023 at 08:30 PM
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
  `sixty_percent_payment` varchar(100) DEFAULT NULL,
  `forty_percent_payment` varchar(100) DEFAULT NULL,
  `damarage` varchar(100) DEFAULT NULL,
  `second_trip` varchar(100) DEFAULT NULL,
  `third_trip` varchar(100) DEFAULT NULL,
  `direct_trip` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chq_approval`
--

INSERT INTO `chq_approval` (`id`, `order_job_number`, `sixty_percent_payment`, `forty_percent_payment`, `damarage`, `second_trip`, `third_trip`, `direct_trip`) VALUES
(6, 'Anik-28/2/2023-mv2-Chittagong-6', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Nisha-12/4/2024-Unnoyon-UK-4', 'done', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `chq_due_list`
--

CREATE TABLE `chq_due_list` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `LA` varchar(50) NOT NULL,
  `LV_name` varchar(50) NOT NULL,
  `commodity` varchar(50) NOT NULL,
  `mode` varchar(50) NOT NULL,
  `chq_amount` varchar(50) NOT NULL,
  `part_pay` varchar(50) NOT NULL,
  `balance` float NOT NULL,
  `chq_issue_date` date NOT NULL,
  `init_amount` float NOT NULL,
  `payment` varchar(50) NOT NULL,
  `final_amount` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chq_due_list`
--

INSERT INTO `chq_due_list` (`id`, `order_number`, `LA`, `LV_name`, `commodity`, `mode`, `chq_amount`, `part_pay`, `balance`, `chq_issue_date`, `init_amount`, `payment`, `final_amount`) VALUES
(2, '', 'la', 'LV', 'SUGAR', 'Chq', '1000', '60%', 600, '2023-10-10', 600, '600', 400);

-- --------------------------------------------------------

--
-- Table structure for table `current_status`
--

CREATE TABLE `current_status` (
  `id` int(11) NOT NULL,
  `LV_name` varchar(50) NOT NULL,
  `date_from_charpotro` date NOT NULL,
  `commodity` varchar(50) NOT NULL,
  `LA` varchar(50) NOT NULL,
  `dest_from` varchar(50) NOT NULL,
  `dest_to` varchar(50) NOT NULL,
  `current_location` varchar(50) NOT NULL,
  `remark` varchar(100) NOT NULL,
  `time_updated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `current_status`
--

INSERT INTO `current_status` (`id`, `LV_name`, `date_from_charpotro`, `commodity`, `LA`, `dest_from`, `dest_to`, `current_location`, `remark`, `time_updated`) VALUES
(1, 'asdasd', '2023-03-07', 'asdasd', 'la', 'la', 'la', 'la', 'la', '2023-03-07 23:25:39');

-- --------------------------------------------------------

--
-- Table structure for table `damarage_dispatch`
--

CREATE TABLE `damarage_dispatch` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `job_number` varchar(50) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `cp_number` int(11) NOT NULL,
  `date_from_charpotro` date NOT NULL,
  `commodity` varchar(50) NOT NULL,
  `volume` int(11) NOT NULL,
  `LV_name` varchar(50) NOT NULL,
  `MV_name` varchar(50) NOT NULL,
  `loading_location` varchar(50) NOT NULL,
  `unloading_location` varchar(50) NOT NULL,
  `loading_start_time_stamp` datetime NOT NULL,
  `loading_completion_time_stamp` datetime NOT NULL,
  `sailing_time_stamp` datetime NOT NULL,
  `duration_of_travel_time` time NOT NULL,
  `unloading_start_time_stamp` datetime NOT NULL,
  `unloading_completion_time_stamp` datetime NOT NULL,
  `others` varchar(100) NOT NULL,
  `total_elapsed_time` time NOT NULL,
  `voyage_time` time NOT NULL,
  `free_time` time NOT NULL,
  `total_despatch` int(11) NOT NULL,
  `daily_despatch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `damarage_dispatch`
--

INSERT INTO `damarage_dispatch` (`id`, `order_number`, `job_number`, `date`, `cp_number`, `date_from_charpotro`, `commodity`, `volume`, `LV_name`, `MV_name`, `loading_location`, `unloading_location`, `loading_start_time_stamp`, `loading_completion_time_stamp`, `sailing_time_stamp`, `duration_of_travel_time`, `unloading_start_time_stamp`, `unloading_completion_time_stamp`, `others`, `total_elapsed_time`, `voyage_time`, `free_time`, `total_despatch`, `daily_despatch`) VALUES
(11, '', '', '2023-03-07 18:00:00', 1, '2023-03-07', 'asdasd', 1, 'asdasd', 'asdasd', 'asdasd', 'asdasd', '2023-03-07 18:00:00', '2023-03-07 18:00:00', '2023-03-07 18:00:00', '00:20:23', '2023-03-07 18:00:00', '2023-03-07 18:00:00', 'asdasdasd', '00:20:23', '00:20:23', '00:20:23', 2, 2),
(12, '11', 'GGWP', '2023-03-08 18:00:00', 2, '2023-03-08', '44', 4, '11', '11', '11', '11', '2023-03-08 18:00:00', '2023-03-08 18:00:00', '2023-03-08 18:00:00', '00:20:23', '2023-03-08 18:00:00', '2023-03-08 18:00:00', '11', '00:20:23', '00:20:23', '00:20:23', 3, 3);

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
(15, 'Anik-28/2/2023-mv2-Chittagong', 'Anik', 'mv2', '2023-03-28', 'Suger', 'Chittagong', 1200, 'Fahim', '01794798101', '2023-03-28 22:18:47'),
(16, 'Nisha-12/4/2024-Unnoyon-UK', 'Nisha', 'Unnoyon', '2024-05-12', 'Water', 'UK', 500, 'null', '015215333595', '2023-03-28 23:04:20'),
(18, 'Akij-12/3/2023-Paharika-Srilanka', 'Akij', 'Paharika', '2023-04-12', 'Suger', 'Srilanka', 50, 'Fahim ', '01856212168', '2023-04-02 23:10:22');

--
-- Triggers `job_entry`
--
DELIMITER $$
CREATE TRIGGER `add_order_job` AFTER INSERT ON `job_entry` FOR EACH ROW INSERT INTO order_job_table(order_number) VALUES(NEW.order_number)
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
(3, 'Anik-28/2/2023-mv2-Chittagong', 0, 0, 0, 0),
(8, 'Nisha-12/4/2024-Unnoyon-UK', 0, 0, 0, 0),
(9, 'Nisha-12/4/2024-Unnoyon-UK', 1, 0, 0, 0),
(10, 'Nisha-12/4/2024-Unnoyon-UK', 2, 0, 0, 0),
(11, 'Nisha-12/4/2024-Unnoyon-UK', 3, 0, 0, 0),
(13, 'Akij-12/3/2023-Paharika-Srilanka', 0, 0, 0, 0),
(14, 'Akij-12/3/2023-Paharika-Srilanka', 1, 0, 0, 0),
(15, 'Akij-12/3/2023-Paharika-Srilanka', 2, 0, 0, 0),
(16, 'Anik-28/2/2023-mv2-Chittagong', 1, 0, 0, 0),
(17, 'Anik-28/2/2023-mv2-Chittagong', 2, 0, 0, 0),
(19, 'Anik-28/2/2023-mv2-Chittagong', 3, 0, 0, 0),
(20, 'Akij-12/3/2023-Paharika-Srilanka', 3, 0, 0, 0),
(21, 'Anik-28/2/2023-mv2-Chittagong', 4, 0, 0, 0),
(22, 'Anik-28/2/2023-mv2-Chittagong', 5, 0, 0, 0),
(23, 'Anik-28/2/2023-mv2-Chittagong', 6, 0, 0, 0),
(24, 'Nisha-12/4/2024-Unnoyon-UK', 4, 0, 0, 0);

--
-- Triggers `order_job_table`
--
DELIMITER $$
CREATE TRIGGER `delete_order_job_table_from_job_entry` AFTER DELETE ON `order_job_table` FOR EACH ROW DELETE FROM order_job_table 
where old.order_number = order_number
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `job_number` varchar(50) NOT NULL,
  `LV_name` varchar(50) NOT NULL,
  `date_from_charpotro` date NOT NULL,
  `MV_name` varchar(50) NOT NULL,
  `commodity` varchar(50) NOT NULL,
  `chq_no` int(11) NOT NULL,
  `chq_issue_date` date NOT NULL,
  `amount` int(11) NOT NULL,
  `part_pay` int(11) NOT NULL,
  `payment_approved` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `payment_chq_no` int(11) NOT NULL,
  `payment_chq_amount` int(11) NOT NULL,
  `payment_chq_date` datetime NOT NULL,
  `added_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `job_number`, `LV_name`, `date_from_charpotro`, `MV_name`, `commodity`, `chq_no`, `chq_issue_date`, `amount`, `part_pay`, `payment_approved`, `balance`, `payment_chq_no`, `payment_chq_amount`, `payment_chq_date`, `added_date`) VALUES
(2, '', 'asdasd', '2023-03-10', 'asdasd', 'Sugar', 129, '2023-03-31', 5000, 123126, 100, 100, 10, 1, '2023-03-09 18:00:00', '2023-03-09 18:00:00');

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
(2, 'dada', '2023-03-30', 'Suger', 'fafa', 'caf', 'adadd', 'uhu', 'ggs', '2023-03-24 16:16:31'),
(6, 'gg', '2023-03-27', 'Suger', 'fafa', 'caf', 'ada', 'uhu', 'ggs', '2023-03-27 13:52:03'),
(8, 'LV3', '2023-03-28', 'Suger', 'fafa', 'caf', 'ada', 'uhu', 'ggs', '2023-03-28 21:12:17');

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
(4, 'Anik-28/2/2023-mv2-Chittagong', '1', '2023-03-04', 50, 'WOW', 'Mayer Dua', 'wow', 'CTG', 520, 47564, 'Fahim', '01321533595', '2023-03-28'),
(9, 'Nisha-12/4/2024-Unnoyon-UK', '1', '2023-03-23', 3432432, '32432', '342324', '3243243', '324324', 34318, 34324, '43324', '32424', '2023-03-28'),
(10, 'Nisha-12/4/2024-Unnoyon-UK', '2', '2023-03-16', 32432, '432432', '432432', '432432', '432432', 3432, 3432, '32432', '1', '2023-03-28'),
(11, 'Nisha-12/4/2024-Unnoyon-UK', '3', '2023-03-30', 123, '123', '123', '123', '123', 123, 123, '123', '132', '2023-03-30'),
(12, 'Akij-12/3/2023-Paharika-Srilanka', '1', '2023-04-11', 123, 'XYZ', 'Shitol-3', 'Chittagong', 'Dhaka', 30, 10200, 'Prime', '01521533595', '2023-04-02'),
(13, 'Akij-12/3/2023-Paharika-Srilanka', '2', '2023-04-28', 13, 'WPW', 'djfk', 'ctg', 'dhk', 10, 20, 'ANik', '01521533595', '2023-04-03'),
(21, 'Anik-28/2/2023-mv2-Chittagong', '6', '2023-04-10', 10, '10', '10', 'kapashia', '10', 10, 10, '1', '10', '2023-04-03'),
(22, 'Nisha-12/4/2024-Unnoyon-UK', '4', '2023-04-29', 20, '20', '20', 'Narsingdi', '20', 0, 20, '20', '20', '2023-04-03');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `chq_due_list`
--
ALTER TABLE `chq_due_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `current_status`
--
ALTER TABLE `current_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `damarage_dispatch`
--
ALTER TABLE `damarage_dispatch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `job_entry`
--
ALTER TABLE `job_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `order_job_table`
--
ALTER TABLE `order_job_table`
  MODIFY `order_job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
