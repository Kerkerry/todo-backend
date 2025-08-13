-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2025 at 09:55 AM
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
-- Database: `todos`
--

-- --------------------------------------------------------

--
-- Table structure for table `todos`
--

CREATE TABLE `todos` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `task_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `due_date` date DEFAULT NULL,
  `priority` varchar(50) NOT NULL DEFAULT 'Medium',
  `category` varchar(50) NOT NULL DEFAULT 'General',
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `user_id`, `task_name`, `description`, `is_completed`, `due_date`, `priority`, `category`, `tags`, `created_at`) VALUES
('1754566750572', '1754562805514', 'Admin dashboard', 'Creating admin dashboard', 0, '2025-08-08', 'High', 'General', '[]', '2025-08-07 11:39:10'),
('1754566784574', '1754562805514', 'React', 'Learning hooks in React', 0, '2025-08-22', 'Medium', 'Learning', '[]', '2025-08-07 11:39:44'),
('1754578575774', '1754561358693', 'Flutter', 'Learning flutter state management with Bloc', 0, '2025-09-28', 'Medium', 'Learning', '[]', '2025-08-07 14:56:15'),
('1754578618219', '1754561358693', 'SQL', 'Introduction to Advanced SQL', 0, '2025-08-16', 'High', 'Learning', '[]', '2025-08-07 14:56:58'),
('1754578693484', '1754561358693', 'Ecommerce Dashboard', 'Creatng the Ecommerce dashbord', 0, '2025-10-21', 'Low', 'Project', '[]', '2025-08-07 14:58:13'),
('1755010634504', '1754562734241', 'Sinior Project', 'Preparing presentation templates', 0, '2025-10-21', 'Medium', 'Learning', '[]', '2025-08-12 14:57:14'),
('1755010740064', '1754562734241', 'Safari Rally', 'Attending safari rally in Naivasha', 0, '2025-09-18', 'High', 'Adventure', '[]', '2025-08-12 14:59:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`) VALUES
('1754561345048', 'testuser002', '$2b$10$FxGoqGe8yUA7nhaFo9q.Z.TIj9WIfgdi5J/MCGKNDzqZLHflAeJ8S', '2025-08-07 10:09:05'),
('1754561358693', 'testuser001', '$2b$10$ZDn/0oGItlH2Rs3mzRT9H.CLJzqt/6s0Hprvnr6ns.uhxdDkWvnje', '2025-08-07 10:09:18'),
('1754562576280', 'testuser003', '$2b$10$t0WB4/h2FqgkhySSj1MV9eCAhg5/zBcljLB7EtRGLr0v5J3fTwnK6', '2025-08-07 10:29:36'),
('1754562734241', 'testuser004', '$2b$10$S7s0Rn0C.oFeN.snb5ZUkOhxaNMFt/C0aSdiEx/5aZsv/EJHXMT26', '2025-08-07 10:32:14'),
('1754562805514', 'testuser005', '$2b$10$DwG9nXwaZUHRAjQKZk.G5euDCOVwlKdwLk4Px7o5DHdNJthrMvfrG', '2025-08-07 10:33:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
