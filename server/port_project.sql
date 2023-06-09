-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2023 at 07:04 PM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(21, 'Anik-13/3/2023-Paharika-Srilanka-4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, 'Anik-13/3/2023-Paharika-Srilanka-5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'Rashik-19/3/2023-Yogurt-USA-1', '6000', '4000', NULL, NULL, NULL, NULL, '123456789', '2023-04-16', '987654321', '2023-04-20'),
(24, 'Rashik-16/3/2023-MV1-India-1', '3500', '2500', NULL, NULL, NULL, NULL, '123456789', '2023-04-15', '987654321', '2023-04-16'),
(25, 'Rashik-16/3/2023-MV1-India-2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(26, 'Rashik-16/3/2023-MV1-India-3', '500', NULL, NULL, NULL, NULL, NULL, '123456789', '2023-04-16', NULL, NULL),
(28, 'Rashik-16/3/2023-MV1-Sri Lanka-2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(29, 'Rashik-16/3/2023-MV1-Sri Lanka-3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(31, 'Rashik-16/3/2023-MV1-Sri Lanka-2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, 'Rashik-16/3/2023-MV1-Sri Lanka-1', '6000', NULL, NULL, NULL, NULL, NULL, '123456789', '2023-04-16', NULL, NULL),
(33, 'Rashik-16/3/2023-MV1-Sri Lanka-1', '6000', NULL, NULL, NULL, NULL, NULL, '123456789', '2023-04-16', NULL, NULL),
(34, 'Rashik-16/3/2023-MV1-Sri Lanka-2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(35, 'Prime-4/5/2023-MV-India-1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  `part_pay` double DEFAULT NULL,
  `payment` varchar(255) DEFAULT NULL,
  `mode` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chq_due_list`
--

INSERT INTO `chq_due_list` (`id`, `order_job_number`, `part_pay`, `payment`, `mode`, `amount`) VALUES
(9, 'Anik-13/3/2023-Paharika-Srilanka-1', 3000, 'Part', '60', 1000),
(10, 'Prime-21/3/2023-Uddoyon-Srilanka-2', 300, NULL, '60', NULL),
(11, 'Prime-21/3/2023-Uddoyon-Srilanka-2', 500, NULL, '40', NULL),
(12, 'Anik-13/3/2023-Paharika-Srilanka-2', 400, NULL, '60', NULL),
(13, 'Anik-13/3/2023-Paharika-Srilanka-2', 300, NULL, '40', NULL),
(14, 'Rashik-19/3/2023-Yogurt-USA-1', NULL, NULL, '40', NULL),
(15, 'Rashik-19/3/2023-Yogurt-USA-1', NULL, NULL, '60', NULL),
(16, 'Rashik-16/3/2023-MV1-India-1', NULL, NULL, '60', NULL),
(17, 'Rashik-16/3/2023-MV1-India-1', NULL, NULL, '40', NULL),
(18, 'Rashik-16/3/2023-MV1-India-3', NULL, NULL, '60', NULL),
(19, 'Rashik-16/3/2023-MV1-Sri Lanka-1', 4000, NULL, '60', NULL);

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
(11, 'Anik-13/3/2023-Paharika-Srilanka-1', 'Ctg', 'gg', '2023-06-05 15:51:23', 1),
(12, 'Anik-13/3/2023-Paharika-Srilanka-2', NULL, NULL, '2023-04-07 23:03:55', 0),
(13, 'Prime-21/3/2023-Uddoyon-Srilanka-1', NULL, NULL, '2023-04-08 00:02:23', 0),
(14, 'Prime-21/3/2023-Uddoyon-Srilanka-2', 'Mawa', NULL, '2023-04-08 10:43:13', 1),
(15, 'Prime-21/3/2023-Uddoyon-Srilanka-3', NULL, NULL, '2023-04-08 16:52:54', 0),
(16, 'Anik-13/3/2023-Paharika-Srilanka-3', NULL, NULL, '2023-04-08 16:56:27', 0),
(17, 'Prime-21/3/2023-Uddoyon-Srilanka-4', NULL, NULL, '2023-04-08 23:03:40', 0),
(18, 'Anik-13/3/2023-Paharika-Srilanka-4', NULL, NULL, '2023-04-08 23:05:31', 0),
(19, 'Anik-13/3/2023-Paharika-Srilanka-5', NULL, NULL, '2023-04-15 20:35:39', 0),
(20, 'Rashik-19/3/2023-Yogurt-USA-1', 'Dhaka', 'Reached', '2023-04-15 18:15:01', 1),
(21, 'Rashik-16/3/2023-MV1-India-1', NULL, NULL, '2023-04-16 00:40:33', 0),
(22, 'Rashik-16/3/2023-MV1-India-2', NULL, NULL, '2023-04-16 00:49:38', 0),
(23, 'Rashik-16/3/2023-MV1-India-3', NULL, NULL, '2023-04-16 01:15:22', 0),
(24, 'Rashik-16/3/2023-MV1-Sri Lanka-1', 'Dhaka', 'asdasdasdsdasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '2023-06-04 17:52:10', 0),
(25, 'Rashik-16/3/2023-MV1-Sri Lanka-2', NULL, NULL, '2023-04-16 01:17:25', 0),
(26, 'Rashik-16/3/2023-MV1-Sri Lanka-3', NULL, NULL, '2023-04-16 01:20:09', 0),
(27, 'Rashik-16/3/2023-MV1-Sri Lanka-1', 'Dhaka', 'okay', '2023-06-05 16:00:39', 0),
(28, 'Rashik-16/3/2023-MV1-Sri Lanka-2', NULL, NULL, '2023-04-16 19:21:59', 0),
(29, 'Rashik-16/3/2023-MV1-Sri Lanka-1', NULL, NULL, '2023-04-16 19:24:41', 0),
(30, 'Rashik-16/3/2023-MV1-Sri Lanka-1', NULL, NULL, '2023-04-16 20:04:39', 0),
(31, 'Rashik-16/3/2023-MV1-Sri Lanka-2', NULL, NULL, '2023-04-16 20:33:26', 0),
(32, 'Prime-4/5/2023-MV-India-1', NULL, NULL, '2023-06-04 23:31:07', 0);

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
(18, 'Anik-13/3/2023-Paharika-Srilanka-1', '2023-04-07 01:17:46', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Anik-13/3/2023-Paharika-Srilanka-2', '2023-04-07 23:03:55', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'Prime-21/3/2023-Uddoyon-Srilanka-1', '2023-04-08 00:02:23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, 'Prime-21/3/2023-Uddoyon-Srilanka-2', '2023-04-08 00:03:23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, 'Prime-21/3/2023-Uddoyon-Srilanka-3', '2023-04-08 16:52:54', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'Anik-13/3/2023-Paharika-Srilanka-3', '2023-04-08 16:56:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(24, 'Prime-21/3/2023-Uddoyon-Srilanka-4', '2023-04-08 23:03:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, 'Anik-13/3/2023-Paharika-Srilanka-4', '2023-04-08 23:05:31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(26, 'Anik-13/3/2023-Paharika-Srilanka-5', '2023-04-15 20:35:39', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(27, 'Rashik-19/3/2023-Yogurt-USA-1', '2023-04-16 00:03:56', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(28, 'Rashik-16/3/2023-MV1-India-1', '2023-04-16 00:40:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(29, 'Rashik-16/3/2023-MV1-India-2', '2023-04-16 00:49:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(30, 'Rashik-16/3/2023-MV1-India-3', '2023-04-16 01:15:22', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(31, 'Rashik-16/3/2023-MV1-Sri Lanka-1', '2023-04-16 01:16:56', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, 'Rashik-16/3/2023-MV1-Sri Lanka-2', '2023-04-16 01:17:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(33, 'Rashik-16/3/2023-MV1-Sri Lanka-3', '2023-04-16 01:20:09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(34, 'Rashik-16/3/2023-MV1-Sri Lanka-1', '2023-04-16 01:26:46', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(35, 'Rashik-16/3/2023-MV1-Sri Lanka-2', '2023-04-16 19:21:59', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(36, 'Rashik-16/3/2023-MV1-Sri Lanka-1', '2023-04-16 19:24:41', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(37, 'Rashik-16/3/2023-MV1-Sri Lanka-1', '2023-04-16 20:04:39', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(38, 'Rashik-16/3/2023-MV1-Sri Lanka-2', '2023-04-16 20:33:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(39, 'Prime-4/5/2023-MV-India-1', '2023-06-04 23:31:07', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
(25, 'Anik-13/3/2023-Paharika-Srilanka', 'Anik', 'Paharika', '2023-04-13', 'Suger', 'Srilanka', 5000, 'Fahim', '01521533595', '2023-04-07 01:17:01'),
(29, 'Rashik-16/3/2023-MV1-Sri Lanka', 'Rashik', 'MV1', '2023-04-16', 'Sugar', 'Sri Lanka', 10000, 'Anik', '01684545111', '2023-04-16 01:16:31'),
(30, 'Prime-4/5/2023-MV-India', 'Prime', 'MV', '2023-06-04', 'Mobile', 'India', 15, 'Anik', '01684545111', '2023-06-04 23:27:39'),
(31, 'asdasd123-5/5/2023-MV1-Bangladesh', 'asdasd123', 'MV1', '2023-06-05', 'asdasd', 'Bangladesh', 100, 'Anik', '01684545111', '2023-06-05 16:59:27');

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
(37, 'Anik-13/3/2023-Paharika-Srilanka', 0, 0, 0, 0),
(38, 'Anik-13/3/2023-Paharika-Srilanka', 1, 0, 0, 0),
(39, 'Anik-13/3/2023-Paharika-Srilanka', 2, 0, 0, 0),
(44, 'Anik-13/3/2023-Paharika-Srilanka', 3, 0, 0, 0),
(46, 'Anik-13/3/2023-Paharika-Srilanka', 4, 0, 0, 0),
(47, 'Anik-13/3/2023-Paharika-Srilanka', 5, 0, 0, 0),
(61, 'Rashik-16/3/2023-MV1-Sri Lanka', 1, 0, 0, 0),
(62, 'Rashik-16/3/2023-MV1-Sri Lanka', 2, 0, 0, 0),
(63, 'Prime-4/5/2023-MV-India', 0, 0, 0, 0),
(65, 'asdasd123-5/5/2023-MV1-Bangladesh', 0, 0, 0, 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `order_job_number`, `payment_chq_no`, `payment_chq_amount`, `payment_chq_date`, `LV_name`, `LA_name`, `commodity`, `chq_issue_date`, `amount`, `part_pay`, `payment`, `balance`) VALUES
(3, 'Prime-21/3/2023-Uddoyon-Srilanka-2', 222, 2222, '2023-04-29 00:00:00', 'Mayer Dua', 'Amar Dua', 'Suger', '2023-04-23T18:00:00.000Z', '200', '100', 'Part', '300'),
(4, 'Anik-13/3/2023-Paharika-Srilanka-1', 111, 490, '2023-04-26 00:00:00', 'Mayer Dua', 'Amar Dua 1', 'Suger', '2023-04-13T18:00:00.000Z', '490', '100', 'Part', '4900'),
(5, 'Anik-13/3/2023-Paharika-Srilanka-2', 123456, 100, '2023-04-09 00:00:00', 'Mayer Dua 111', 'Amar Dua 2', 'Suger', '2023-04-26T18:00:00.000Z', '100', '100', 'Part', '400'),
(6, 'Anik-13/3/2023-Paharika-Srilanka-2', 123456, 100, '2023-04-09 00:00:00', 'Mayer Dua 111', 'Amar Dua 2', 'Suger', '2023-04-26T18:00:00.000Z', '100', '200', 'Part', '200'),
(7, 'Anik-13/3/2023-Paharika-Srilanka-2', 123456, 100, '2023-04-09 00:00:00', 'Mayer Dua 111', 'Amar Dua 2', 'Suger', '2023-04-25T18:00:00.000Z', '100', '200', 'Part', '300'),
(8, 'Anik-13/3/2023-Paharika-Srilanka-1', 123456, 10, '2023-04-09 00:00:00', 'Mayer Dua', 'Amar Dua 1', 'Suger', '2023-04-13T18:00:00.000Z', '10', '590', 'Part', '4410'),
(9, 'Anik-13/3/2023-Paharika-Srilanka-1', 123456, 400, '2023-04-09 00:00:00', 'Mayer Dua', 'Amar Dua 1', 'Suger', '2023-04-13T18:00:00.000Z', '400', '600', 'Part', '4400'),
(10, 'Anik-13/3/2023-Paharika-Srilanka-1', 123456, 500, '2023-04-09 00:00:00', 'Mayer Dua', 'Amar Dua 1', 'Suger', '2023-04-13T18:00:00.000Z', '500', '1000', 'Part', '4000'),
(11, 'Anik-13/3/2023-Paharika-Srilanka-1', 123456, 500, '2023-04-09 00:00:00', 'Mayer Dua', 'Amar Dua 1', 'Suger', '2023-04-13T18:00:00.000Z', '500', '1500', 'Part', '3500'),
(12, 'Anik-13/3/2023-Paharika-Srilanka-1', 321654, 1000, '2023-04-09 00:00:00', 'Mayer Dua', 'Amar Dua 1', 'Suger', '2023-04-13T18:00:00.000Z', '1000', '2000', 'Part', '3000'),
(13, 'Anik-13/3/2023-Paharika-Srilanka-2', 123456789, 100, '2023-04-16 00:00:00', 'Amar Dua', 'Amar Dua 2', 'Suger', '2023-04-25T18:00:00.000Z', '100', '300', 'Part', '200'),
(14, 'Rashik-16/3/2023-MV1-Sri Lanka-1', 123456, 2000, '2023-04-16 00:00:00', 'Kalihati', 'KEL-BD', 'Sugar', '2023-04-15T18:00:00.000Z', '2000', '0', 'Part', '6000'),
(15, 'Rashik-16/3/2023-MV1-Sri Lanka-1', 321654, 1000, '2023-04-16 00:00:00', 'Kalihati', 'KEL-BD', 'Sugar', '2023-04-15T18:00:00.000Z', '1000', '2000', 'Part', '4000'),
(16, 'Rashik-16/3/2023-MV1-Sri Lanka-1', 321654, 1000, '2023-04-16 00:00:00', 'Kalihati', 'KEL-BD', 'Sugar', '2023-04-15T18:00:00.000Z', '1000', '3000', 'Part', '3000');

-- --------------------------------------------------------

--
-- Table structure for table `pre_defined_ship`
--

CREATE TABLE `pre_defined_ship` (
  `id` int(11) NOT NULL,
  `LV_name` varchar(50) DEFAULT NULL,
  `capacity` varchar(255) DEFAULT NULL,
  `master_reg_number` varchar(255) DEFAULT NULL,
  `masters_name` varchar(255) DEFAULT NULL,
  `masters_contact_number` varchar(255) DEFAULT NULL,
  `masters_nid_image_attachment` varchar(255) DEFAULT NULL,
  `leased` int(1) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `proprietors_name` varchar(255) DEFAULT NULL,
  `office_address` varchar(255) DEFAULT NULL,
  `ac_number` varchar(255) DEFAULT NULL,
  `contact_details` varchar(255) DEFAULT NULL,
  `lv_documents_attachement` varchar(255) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `staffs_info` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pre_defined_ship`
--

INSERT INTO `pre_defined_ship` (`id`, `LV_name`, `capacity`, `master_reg_number`, `masters_name`, `masters_contact_number`, `masters_nid_image_attachment`, `leased`, `company_name`, `proprietors_name`, `office_address`, `ac_number`, `contact_details`, `lv_documents_attachement`, `status`, `staffs_info`) VALUES
(10, 'Amar Dua', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, '0'),
(11, 'Mayer Dua', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, '0'),
(26, 'Amader Dua', '1000', '123456', 'Rafsan', '01684545111', 'Welcome Scan.jpg', 0, 'RBR', 'Anik & Co', '730/5/1, Block-C, Khilgaon, Dhaka', '9876543201', '01684545111', 'null', 0, '0'),
(27, 'LV-1', '729', '123456', 'Rafsan', '01979867621', '1.jpg', 1, 'RBR', 'Anik & Co', 'asdasd', '9876543201', '01684545111', 'null', 1, '0'),
(55, 'LV', '729', '123456', 'Rafsantbb', '01979867621', 'Welcome Scan.jpg', 0, '', '', 'MARQUIS ST, FIRE BRIGADE HEAD QUARTER, NEW MARKET ARE, DHARMATALA, TALTOLA', '', '', 'null', 0, '0'),
(56, 'LV-3', '10000', '123456', 'Rafsantbb', '01684545111', '2.pdf', 0, '', '', '730/5/1, Block-C, Khilgaon, Dhaka', '', '', 'null', 0, '0'),
(66, 'LV', '729', '123456', 'Rafsantbb', '01979867621', '1684889922902__Welcome Scan.jpg', 0, '', '', '', '', '', NULL, 0, ''),
(67, 'Amader Dua 111', '65465', '654654', '65465465', '646464', '1685858475102__Welcome Scan.jpg', 1, 'sdfsd', 'sdfsdf', 'fdsfsdf sdfsd sf ', 'sdfsd dsfsd sd ', 'dsf sd sdf sd', '1685858475109__madhobi pouroshobha.pdf', 1, 'dfgdfg#asnmdb'),
(68, 'asdf123', '123456', '123456', 'Rafsan', '01684545111', '1685899047080__Welcome Scan.jpg', 1, 'RBR', 'Anik & Co', '730/5/1, Block-C, Khilgaon, Dhaka', '9876543201', '01684545111', '1685899047089__jul22_elec.pdf', 0, 'Anik#123456,Anik1#1234567');

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
(29, 'Anik-13/3/2023-Paharika-Srilanka', '1', '2023-04-21', 123, 'Amar Dua 1', 'Mayer Dua', 'Chittagong', 'Dhaka', 100, 500, 'Anik', '01521533595', '2023-04-07'),
(48, 'Rashik-16/3/2023-MV1-Sri Lanka', '1', '2023-04-16', 123456789, 'KEL-BD', 'Kalihati', 'Chittagong', 'Dhaka', 1000, 10000, 'Raf', '01684545111', '2023-04-16'),
(49, 'Rashik-16/3/2023-MV1-Sri Lanka', '2', '2023-04-16', 123456789, 'KEL-BD', 'Amar Dua', 'Chittagong', 'Dhaka', 1000, 100000, 'Raf', '01684545111', '2023-04-16');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `chq_due_list`
--
ALTER TABLE `chq_due_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `current_status`
--
ALTER TABLE `current_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `damarage_dispatch`
--
ALTER TABLE `damarage_dispatch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `job_entry`
--
ALTER TABLE `job_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `order_job_table`
--
ALTER TABLE `order_job_table`
  MODIFY `order_job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `pre_defined_ship`
--
ALTER TABLE `pre_defined_ship`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `record_entry`
--
ALTER TABLE `record_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
