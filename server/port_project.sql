-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2023 at 07:21 PM
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
  `order_number` varchar(50) NOT NULL,
  `job_number` varchar(50) NOT NULL,
  `date_from_charpotro` date NOT NULL,
  `cp_number_from_charpotro` int(11) NOT NULL,
  `LA_name` varchar(50) NOT NULL,
  `LV_name` varchar(50) NOT NULL,
  `MV_name` varchar(50) NOT NULL,
  `dest_from` varchar(50) NOT NULL,
  `dest_to` varchar(50) NOT NULL,
  `capacity_ton` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `sixty_percent_payment` varchar(100) NOT NULL,
  `forty_percent_payment` varchar(100) NOT NULL,
  `damarage` varchar(100) NOT NULL,
  `second_trip` varchar(100) NOT NULL,
  `third_trip` varchar(100) NOT NULL,
  `direct_trip` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chq_approval`
--

INSERT INTO `chq_approval` (`id`, `order_number`, `job_number`, `date_from_charpotro`, `cp_number_from_charpotro`, `LA_name`, `LV_name`, `MV_name`, `dest_from`, `dest_to`, `capacity_ton`, `rate`, `sixty_percent_payment`, `forty_percent_payment`, `damarage`, `second_trip`, `third_trip`, `direct_trip`) VALUES
(2, '', 'GGWP', '2023-03-10', 4, 'asdasd', 'asdasd', 'asdasd', 'la', 'la', 6, 42, 'done, Chq Number: xxx', 'Done, Chq No: XXX', 'gg', 'gg', 'gg', 'gg');

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
(11, 'asdasd', '', '2023-03-08 00:00:00', 1, '2023-03-08', 'asdasd', 1, 'asdasd', 'asdasd', 'asdasd', 'asdasd', '2023-03-08 00:00:00', '2023-03-08 00:00:00', '2023-03-08 00:00:00', '00:20:23', '2023-03-08 00:00:00', '2023-03-08 00:00:00', 'asdasdasd', '00:20:23', '00:20:23', '00:20:23', 2, 2),
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
(3, 'asdasd123123', 'asdasd', 'asdasd567', '2023-03-22', 'asdasd567', 'asdasd567', 15, 'asdasd567', 'asdasd567', '2023-03-03 18:00:46'),
(12, 'IMP1-4-MV1-SINGAPORE', 'IMP Importer', 'MV1', '2023-02-16', 'SUGAR', 'Malaysia', 2000, 'UNK', '01684545111', '2023-03-04 13:48:37'),
(14, 'Akij-28-mv1-Chittagong', 'Akij', 'mv1', '2023-03-28', 'Suger', 'Chittagong', 50, 'Fahim', '01794798101', '2023-03-28 22:16:03'),
(15, 'Anik-28/2/2023-mv2-Chittagong', 'Anik', 'mv2', '2023-03-28', 'Suger', 'Chittagong', 12, 'Fahim', '01794798101', '2023-03-28 22:18:47'),
(16, 'Nisha-12/4/2024-Unnoyon-UK', 'Nisha', 'Unnoyon', '2024-05-12', 'Water', 'UK', 500, 'null', '015215333595', '2023-03-28 23:04:20');

--
-- Triggers `job_entry`
--
DELIMITER $$
CREATE TRIGGER `add_order_job` AFTER INSERT ON `job_entry` FOR EACH ROW INSERT INTO order_job_table(order_number) VALUES(NEW.order_number)
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
(2, 'Akij-28-mv1-Chittagong', 0, 0, 0, 0),
(3, 'Anik-28/2/2023-mv2-Chittagong', 0, 0, 0, 0),
(4, 'Akij-28-mv1-Chittagong', 1, 0, 0, 0),
(6, 'Akij-28-mv1-Chittagong', 2, 0, 0, 0),
(7, 'afaf', 0, 0, 0, 0),
(8, 'Nisha-12/4/2024-Unnoyon-UK', 0, 0, 0, 0),
(9, 'Nisha-12/4/2024-Unnoyon-UK', 1, 0, 0, 0),
(10, 'Nisha-12/4/2024-Unnoyon-UK', 2, 0, 0, 0);

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
(2, 'dada', '2023-03-11', 'Suger', 'fafa', 'caf', 'adadd', 'uhu', 'ggs', '2023-03-24 16:16:31'),
(5, 'Fahim', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-03-27 13:51:55'),
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
  `commodity` varchar(50) NOT NULL,
  `capacity` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `LV_master_name` varchar(50) NOT NULL,
  `LV_master_contact_number` varchar(15) NOT NULL,
  `date_created` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `record_entry`
--

INSERT INTO `record_entry` (`id`, `order_number`, `job_number`, `date_from_charpotro`, `cp_number_from_charpotro`, `LA_name`, `LV_name`, `dest_from`, `dest_to`, `commodity`, `capacity`, `rate`, `LV_master_name`, `LV_master_contact_number`, `date_created`) VALUES
(2, 'order_number_forign_key', 'job_number_auto', '2023-03-10', 10, 'asdasd', 'asdasdasd', 'la', 'la', 'asdasd', 1000, 1000, 'rbr', '0168', '2023-03-10'),
(4, 'Anik-28/2/2023-mv2-Chittagong', '1', '2023-03-03', 50, '50', '', 'wow', 'll', 'kvxkvx', 520, 47564, 'vjxcjv ', '01521533595', '2023-03-28'),
(5, 'Anik-28/2/2023-mv2-Chittagong', '1', '2023-03-11', 50, 'j g', 'j kjgx ', 'dj gdjfklg', ' sjljsdf', 'sj fdslj', 5000, 424, 'sd fjsd ', ' jfsdfjsd sjfs', '2023-03-28'),
(6, 'Anik-28/2/2023-mv2-Chittagong', '1', '2023-03-18', 545, 'dsikfds ', 'jf dlsj', ' lkj', ' sjf', 'j fdsj f', 45, 45, 'h fshf', ' hdff ds', '2023-03-28'),
(7, 'Akij-28-mv1-Chittagong', '3', '2023-03-17', 56456, 'fg fdgd', ' sdfds f', 'h', 'h ', 'hj', 42445, 44545, 'wsdh fds', ' jlfksf', '2023-03-28'),
(9, 'Nisha-12/4/2024-Unnoyon-UK', '1', '2023-03-23', 3432432, '32432', '342324', '3243243', '324324', '324324', 34318, 34324, '43324', '32424', '2023-03-28'),
(10, 'Nisha-12/4/2024-Unnoyon-UK', '2', '2023-03-17', 32432, '432432', '432432', '432432', '432432', '3432', 3432, 3432, '32432', '', '2023-03-28');

--
-- Triggers `record_entry`
--
DELIMITER $$
CREATE TRIGGER `add_record_job` AFTER INSERT ON `record_entry` FOR EACH ROW INSERT INTO order_job_table (order_number, job_number) VALUES (new.order_number, new.job_number)
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
(1, 'Fahim', 'hasibarrafiulfahim@gmail.com', '18bf931b32b6d4b8a78c62e4144bc5a1d07f6fd3e34245fc98a17e76531284a2', 'admin', 'accounts', '2023-02-26 12:00:58', 1),
(2, 'rashik', 'rashik', '5fb62704057fe5b652be548e74c628c5681adf87ca77b1b27ee470e33f29b6f9', 'admin', 'accounts', '2023-02-28 03:43:41', 1),
(3, 'rafsan', 'rafsan', '07437b56e7f47386cf6ceba429169eff6e7a965bcdc1e5b65e061781e6403947', 'operations', 'Operations', '2023-02-28 03:46:18', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `order_job_table`
--
ALTER TABLE `order_job_table`
  MODIFY `order_job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
