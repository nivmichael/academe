-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2016 at 05:11 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `base`
--

-- --------------------------------------------------------

--
-- Table structure for table `--type_user_params`
--

CREATE TABLE IF NOT EXISTS `--type_user_params` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `p_name` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `an_search`
--

CREATE TABLE IF NOT EXISTS `an_search` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `u_id` mediumint(8) unsigned NOT NULL,
  `u_type` enum('job_seeker','alumni','employer') NOT NULL DEFAULT 'job_seeker',
  `post_id` mediumint(8) unsigned NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `css`
--

CREATE TABLE IF NOT EXISTS `css` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `property` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `css`
--

INSERT INTO `css` (`id`, `property`, `value`) VALUES
(1, 'main_color', '#5D2C87'),
(2, 'logo', 'http://cims.nyu.edu/~oza/NYULogo.png');

-- --------------------------------------------------------

--
-- Table structure for table `doc_param`
--

CREATE TABLE IF NOT EXISTS `doc_param` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `position` int(11) DEFAULT NULL,
  `doc_type_id` mediumint(9) NOT NULL,
  `doc_sub_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doc_type_id` (`doc_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `doc_param`
--

INSERT INTO `doc_param` (`id`, `name`, `position`, `doc_type_id`, `doc_sub_type`, `created_at`, `updated_at`) VALUES
(1, 'education', 1, 1, 'jobseeker', NULL, NULL),
(2, 'education', 1, 2, NULL, NULL, '2016-06-08 05:44:20'),
(3, 'employment', 2, 1, 'jobseeker', NULL, NULL),
(4, 'employment', 2, 2, NULL, NULL, '2016-06-08 05:44:21'),
(5, 'career_goals', 3, 1, 'jobseeker', NULL, NULL),
(6, 'career_goals', 3, 2, NULL, NULL, '2016-06-08 05:44:21'),
(7, 'company', 0, 1, 'employer', NULL, '2016-06-06 11:37:52'),
(8, 'files', 4, 1, 'jobseeker', NULL, NULL),
(9, 'files', 2, 1, 'employer', NULL, '2016-06-06 11:37:52'),
(10, 'personal_information', 0, 1, 'jobseeker', NULL, NULL),
(11, 'personal_information', 1, 1, 'employer', NULL, '2016-06-06 11:37:52'),
(12, 'general', 0, 2, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `doc_type`
--

CREATE TABLE IF NOT EXISTS `doc_type` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `doc_type`
--

INSERT INTO `doc_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'user', NULL, NULL),
(2, 'post', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `param`
--

CREATE TABLE IF NOT EXISTS `param` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `authorized` tinyint(1) NOT NULL DEFAULT '1',
  `modify` tinyint(1) DEFAULT '0',
  `position` int(11) DEFAULT NULL,
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `rules` text,
  `name` varchar(255) NOT NULL,
  `type_id` mediumint(9) DEFAULT NULL,
  `doc_param_id` mediumint(9) DEFAULT NULL,
  `param_parent_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doc_param_id` (`doc_param_id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=159 ;

--
-- Dumping data for table `param`
--

INSERT INTO `param` (`id`, `authorized`, `modify`, `position`, `required`, `rules`, `name`, `type_id`, `doc_param_id`, `param_parent_id`, `created_at`, `updated_at`) VALUES
(1, 1, 0, 0, 0, NULL, 'degree', 2, 1, 0, NULL, '2016-05-29 06:54:33'),
(2, 1, 0, 1, 0, NULL, 'major', 2, 1, 1, NULL, NULL),
(3, 1, 0, 2, 0, NULL, 'minor', 2, 1, 2, NULL, NULL),
(4, 1, 0, 3, 0, NULL, 'start_date', 7, 1, NULL, NULL, NULL),
(5, 1, 0, 4, 0, NULL, 'end_date', 7, 1, NULL, NULL, NULL),
(6, 1, 0, 0, 0, NULL, 'degree', 2, 2, NULL, NULL, NULL),
(7, 1, 0, 1, 0, NULL, 'major', 2, 2, 6, NULL, NULL),
(8, 1, 0, 2, 0, NULL, 'minor', 2, 2, 7, NULL, NULL),
(9, 1, 0, 3, 0, NULL, 'start_date', 7, 2, NULL, NULL, NULL),
(10, 1, 0, 4, 0, NULL, 'end_date', 7, 2, NULL, NULL, NULL),
(11, 1, 0, 0, 0, NULL, 'main_field', 2, 3, NULL, NULL, NULL),
(12, 1, 0, 1, 0, NULL, 'profession', 2, 3, 11, NULL, NULL),
(13, 1, 0, 2, 0, NULL, 'start_date', 7, 3, NULL, NULL, NULL),
(14, 1, 0, 3, 0, NULL, 'end_date', 7, 3, NULL, NULL, NULL),
(15, 1, 0, 0, 0, NULL, 'main_field', 2, 4, NULL, NULL, NULL),
(16, 1, 0, 1, 0, NULL, 'profession', 2, 4, 15, NULL, NULL),
(17, 1, 0, 3, 0, NULL, 'start_date', 7, 4, NULL, NULL, '2016-06-07 05:09:12'),
(18, 1, 0, 4, 0, NULL, 'end_date', 7, 4, NULL, NULL, '2016-06-07 05:09:12'),
(19, 1, 0, 0, 0, NULL, 'main_field', 2, 5, NULL, NULL, NULL),
(20, 1, 0, 1, 0, NULL, 'profession', 2, 5, 19, NULL, NULL),
(21, 1, 0, 2, 0, NULL, 'job_title', 2, 5, NULL, NULL, NULL),
(22, 1, 0, 3, 0, NULL, 'language', 2, 5, NULL, NULL, NULL),
(23, 1, 0, 4, 0, NULL, 'location', 1, 5, NULL, NULL, NULL),
(24, 1, 0, 5, 0, NULL, 'available_from', 7, 5, NULL, NULL, NULL),
(25, 1, 0, 1, 0, NULL, 'main_field', 2, 6, NULL, NULL, '2016-06-08 04:07:51'),
(26, 1, 0, 3, 0, NULL, 'profession', 2, 6, 25, NULL, '2016-06-08 05:44:21'),
(27, 1, 0, 0, 0, NULL, 'job_title', 2, 6, NULL, NULL, '2016-06-08 04:07:51'),
(28, 1, 0, 4, 0, NULL, 'language', 2, 6, NULL, NULL, '2016-06-08 05:44:21'),
(29, 1, 0, 5, 0, NULL, 'location', 1, 6, NULL, NULL, '2016-06-08 05:44:21'),
(30, 1, 0, 0, 0, NULL, 'profile_picture', 6, 8, NULL, NULL, NULL),
(31, 1, 0, 0, 0, NULL, 'company_logo', 6, 9, NULL, NULL, NULL),
(32, 1, 0, 0, 0, NULL, 'company', 1, 7, NULL, NULL, NULL),
(33, 1, 0, 2, 0, NULL, 'contact_person', 1, 7, NULL, NULL, '2016-06-06 11:37:48'),
(34, 1, 0, 3, 0, NULL, 'contact title', 1, 7, NULL, NULL, '2016-06-06 11:37:48'),
(35, 1, 0, 1, 0, NULL, 'hide_company_name', 3, 7, 32, NULL, '2016-06-06 11:37:48'),
(36, 1, 0, 4, 0, NULL, 'role', 2, 10, NULL, NULL, '2016-06-08 10:27:08'),
(37, 1, 0, 5, 0, NULL, 'type', 0, 10, NULL, NULL, '2016-06-08 10:27:08'),
(38, 1, 0, 6, 0, NULL, 'subtype', 2, 10, NULL, NULL, '2016-06-08 10:27:08'),
(39, 1, 0, 7, 0, NULL, 'status', 2, 10, NULL, NULL, '2016-06-08 10:27:08'),
(40, 1, 0, 2, 0, NULL, 'email', 1, 10, NULL, NULL, '2016-06-08 10:27:08'),
(41, 1, 0, 3, 0, NULL, 'password', 1, 10, NULL, NULL, '2016-06-08 10:27:08'),
(42, 1, 0, 0, 0, NULL, 'first_name', 1, 10, NULL, NULL, '2016-06-07 09:07:13'),
(43, 1, 0, 1, 0, NULL, 'last_name', 1, 10, NULL, NULL, '2016-06-07 09:07:13'),
(44, 1, 0, 8, 0, NULL, 'gender', 2, 10, NULL, NULL, '2016-06-08 10:27:08'),
(45, 1, 0, 9, 0, NULL, 'martial_status', 2, 10, NULL, NULL, '2016-06-08 10:27:08'),
(46, 1, 0, 10, 0, NULL, 'education_status', 2, 10, NULL, NULL, '2016-06-08 10:27:08'),
(47, 1, 0, 11, 0, NULL, 'street', 2, 10, NULL, NULL, '2016-06-08 10:27:08'),
(48, 1, 0, 12, 0, NULL, 'city', 2, 10, NULL, NULL, '2016-06-08 10:27:08'),
(49, 1, 0, 13, 0, NULL, 'state', 2, 10, NULL, NULL, '2016-06-08 10:27:08'),
(50, 1, 0, 14, 0, NULL, 'zipcode', 1, 10, NULL, NULL, '2016-06-08 10:27:08'),
(51, 1, 0, 15, 0, NULL, 'country', 2, 10, NULL, NULL, '2016-06-08 10:27:08'),
(52, 1, 0, 16, 0, NULL, 'phone', 1, 10, NULL, NULL, '2016-06-08 10:27:08'),
(53, 1, 0, 17, 0, NULL, 'mobile', 1, 10, NULL, NULL, '2016-06-08 10:27:08'),
(54, 1, 0, 18, 0, NULL, 'date_of_birth', 7, 10, NULL, NULL, '2016-06-08 10:27:08'),
(55, 1, 0, 19, 0, NULL, 'registration', NULL, 10, NULL, NULL, '2016-06-08 10:27:08'),
(56, 1, 0, 20, 0, NULL, 'last_login', NULL, 10, NULL, NULL, '2016-06-08 10:27:08'),
(57, 1, 0, 21, 0, NULL, 'send_newsletter', 3, 10, NULL, NULL, '2016-06-08 10:27:08'),
(58, 1, 0, 22, 0, NULL, 'send_notifications', 3, 10, NULL, NULL, '2016-06-08 10:27:08'),
(59, 1, 0, 23, 0, NULL, 'remember_token', NULL, 10, NULL, NULL, '2016-06-08 10:27:08'),
(108, 1, 0, 6, 0, NULL, 'role', 2, 11, NULL, NULL, '2016-06-06 11:38:21'),
(109, 1, 0, 7, 0, NULL, 'type', 0, 11, NULL, NULL, '2016-06-06 11:38:21'),
(110, 1, 0, 5, 0, NULL, 'subtype', 2, 11, NULL, NULL, '2016-06-06 11:38:21'),
(111, 1, 0, 8, 0, NULL, 'status', 2, 11, NULL, NULL, '2016-06-06 11:38:18'),
(112, 1, 0, 2, 0, NULL, 'email', 1, 11, NULL, NULL, '2016-06-06 11:38:08'),
(113, 1, 0, 3, 0, NULL, 'password', 1, 11, NULL, NULL, '2016-06-06 11:38:15'),
(114, 1, 0, 0, 0, NULL, 'first_name', 1, 11, NULL, NULL, '2016-06-06 11:38:02'),
(115, 1, 0, 1, 0, NULL, 'last_name', 1, 11, NULL, NULL, '2016-06-06 11:38:04'),
(116, 1, 0, 4, 0, NULL, 'gender', 2, 11, NULL, NULL, '2016-06-06 11:38:18'),
(117, 1, 0, 9, 0, NULL, 'martial_status', 2, 11, NULL, NULL, '2016-06-06 11:37:01'),
(118, 1, 0, 10, 0, NULL, 'education_status', 2, 11, NULL, NULL, '2016-06-06 11:37:01'),
(119, 1, 0, 11, 0, NULL, 'street', 2, 11, NULL, NULL, '2016-06-06 11:37:01'),
(120, 1, 0, 12, 0, NULL, 'city', 2, 11, NULL, NULL, '2016-06-06 11:37:01'),
(121, 1, 0, 13, 0, NULL, 'state', 2, 11, NULL, NULL, '2016-06-06 11:37:01'),
(122, 1, 0, 14, 0, NULL, 'zipcode', 1, 11, NULL, NULL, '2016-06-06 11:37:01'),
(123, 1, 0, 15, 0, NULL, 'country', 2, 11, NULL, NULL, '2016-06-06 11:37:01'),
(124, 1, 0, 16, 0, NULL, 'phone', 1, 11, NULL, NULL, '2016-06-06 11:37:01'),
(125, 1, 0, 17, 0, NULL, 'mobile', 1, 11, NULL, NULL, '2016-06-06 11:37:01'),
(126, 1, 0, 18, 0, NULL, 'date_of_birth', 7, 11, NULL, NULL, '2016-06-06 11:37:01'),
(127, 1, 0, 19, 0, NULL, 'registration', NULL, 11, NULL, NULL, '2016-06-06 11:37:01'),
(128, 1, 0, 20, 0, NULL, 'last_login', NULL, 11, NULL, NULL, '2016-06-06 11:37:01'),
(129, 1, 0, 21, 0, NULL, 'send_newsletter', 3, 11, NULL, NULL, '2016-06-06 11:37:01'),
(130, 1, 0, 22, 0, NULL, 'send_notifications', 3, 11, NULL, NULL, '2016-06-06 11:37:01'),
(131, 1, 0, 23, 0, NULL, 'remember_token', NULL, 11, NULL, NULL, '2016-06-06 11:37:01'),
(132, 1, 0, 2, 0, NULL, 'user_id', NULL, 12, NULL, NULL, '2016-06-08 05:44:20'),
(136, 1, 0, 1, 0, NULL, 'id', NULL, 12, NULL, NULL, '2016-06-08 05:44:20'),
(140, 1, 0, 24, 0, NULL, 'disclaimer', 9, 10, NULL, NULL, '2016-06-08 10:27:08'),
(143, 1, 1, 2, 0, NULL, 'employment type', 2, 4, NULL, '2016-06-07 05:09:26', '2016-06-07 05:09:26'),
(148, 1, 1, 0, 0, NULL, 'job description', 1, 12, NULL, '2016-06-07 10:29:04', '2016-06-07 10:29:04'),
(149, 1, 1, 2, 0, NULL, 'experience', 2, 6, NULL, '2016-06-08 04:11:22', '2016-06-08 04:11:22'),
(158, 1, 1, 5, 0, NULL, 'new parameter', 1, 1, NULL, '2016-06-08 10:27:10', '2016-06-08 10:27:10');

-- --------------------------------------------------------

--
-- Table structure for table `param_type`
--

CREATE TABLE IF NOT EXISTS `param_type` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `param_type`
--

INSERT INTO `param_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'text', NULL, NULL),
(2, 'select', NULL, NULL),
(3, 'checkbox', NULL, NULL),
(4, 'checklist', NULL, NULL),
(5, 'textarea', NULL, NULL),
(6, 'files', NULL, NULL),
(7, 'date', NULL, NULL),
(8, 'cv', NULL, NULL),
(9, 'misc', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `param_value`
--

CREATE TABLE IF NOT EXISTS `param_value` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `position` int(11) NOT NULL,
  `modify` tinyint(1) NOT NULL,
  `param_id` mediumint(9) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `param_id` (`param_id`),
  KEY `param_name` (`value`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=109 ;

--
-- Dumping data for table `param_value`
--

INSERT INTO `param_value` (`id`, `position`, `modify`, `param_id`, `parent_id`, `value`, `created_at`, `updated_at`) VALUES
(61, 0, 0, 39, NULL, 'active', '2016-06-05 07:57:59', '2016-06-05 07:57:59'),
(62, 0, 0, 39, NULL, 'inactive', '2016-06-05 08:06:02', '2016-06-05 08:06:02'),
(67, 0, 0, 46, NULL, 'student', '2016-06-05 08:16:40', '2016-06-05 08:16:40'),
(68, 0, 0, 46, NULL, 'intern', '2016-06-05 08:16:50', '2016-06-05 08:16:50'),
(69, 0, 0, 46, NULL, 'graduate', '2016-06-05 08:16:54', '2016-06-05 08:16:54'),
(70, 0, 0, 46, NULL, 'alimni', '2016-06-05 08:16:57', '2016-06-05 08:16:57'),
(71, 0, 0, 45, NULL, 'single', '2016-06-05 08:17:56', '2016-06-05 08:17:56'),
(72, 0, 0, 45, NULL, 'married', '2016-06-05 08:17:59', '2016-06-05 08:17:59'),
(73, 0, 0, 45, NULL, 'divorced', '2016-06-05 08:18:02', '2016-06-05 08:18:02'),
(74, 0, 0, 45, NULL, 'widdowed', '2016-06-05 08:18:05', '2016-06-05 08:18:05'),
(78, 0, 0, 1, NULL, 'GSCE', '2016-06-05 08:51:32', '2016-06-05 08:51:32'),
(79, 0, 0, 1, NULL, 'A-Levels', '2016-06-05 08:51:40', '2016-06-05 08:51:40'),
(80, 0, 0, 1, NULL, 'General Academic Studies Degree', '2016-06-05 08:51:53', '2016-06-05 08:51:53'),
(81, 0, 0, 1, NULL, 'BA', '2016-06-05 08:51:58', '2016-06-05 08:51:58'),
(91, 0, 0, 2, NULL, 'Business Administration', '2016-06-05 09:20:37', '2016-06-05 09:20:37'),
(92, 0, 0, 2, NULL, 'Life Sciences', '2016-06-05 10:17:26', '2016-06-05 10:17:26'),
(93, 0, 0, 2, NULL, 'Nursing', '2016-06-05 10:17:34', '2016-06-05 10:17:34'),
(94, 0, 0, 2, NULL, 'Philosophy And Sociology', '2016-06-05 10:17:40', '2016-06-05 10:17:40'),
(95, 0, 0, 3, NULL, 'Accounting', '2016-06-05 11:08:58', '2016-06-05 11:08:58'),
(96, 0, 0, 3, NULL, 'Finance', '2016-06-05 11:09:03', '2016-06-05 11:09:03'),
(99, 0, 0, 44, NULL, 'male', '2016-06-06 05:58:04', '2016-06-06 05:58:04'),
(100, 0, 0, 44, NULL, 'female', '2016-06-06 05:58:07', '2016-06-06 05:58:07'),
(101, 0, 0, 1, NULL, 'master', '2016-06-06 12:29:29', '2016-06-06 12:29:29'),
(102, 0, 0, 15, NULL, 'optics', '2016-06-07 04:32:36', '2016-06-07 04:32:36'),
(103, 0, 0, 15, NULL, 'administration', '2016-06-07 04:32:41', '2016-06-07 04:32:41'),
(104, 0, 0, 16, NULL, 'QA', '2016-06-07 04:32:49', '2016-06-07 04:32:49'),
(105, 0, 0, 16, NULL, 'developer', '2016-06-07 04:32:55', '2016-06-07 04:32:55'),
(106, 0, 0, 16, NULL, 'web developer', '2016-06-07 04:33:02', '2016-06-07 04:33:02'),
(107, 0, 0, 143, NULL, 'full time', '2016-06-07 05:10:52', '2016-06-07 05:10:52'),
(108, 0, 0, 143, NULL, 'part time', '2016-06-07 05:10:55', '2016-06-07 05:10:55');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('dor@acade-me.co.il', '9e118e971dc7783029f6d06c19570a3261b6a49f3e310c6a2c93a9e086bae5e0', '2016-02-21 11:37:08'),
('dorshoham88@gmail.com', '4f1008a67594ec3165610395776927849aaa6da4f62a32c3a8af1cf988fb52da', '2016-05-26 05:18:54');

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

CREATE TABLE IF NOT EXISTS `steps` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `steps`
--

INSERT INTO `steps` (`id`, `name`, `order`) VALUES
(1, 'appointments', 0),
(2, 'skills', 1),
(3, 'referrals', 2),
(4, 'status', 3);

-- --------------------------------------------------------

--
-- Table structure for table `sys_param_values`
--

CREATE TABLE IF NOT EXISTS `sys_param_values` (
  `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,
  `doc_type` mediumint(9) NOT NULL DEFAULT '12',
  `ref_id` mediumint(9) unsigned NOT NULL,
  `param_id` mediumint(9) NOT NULL,
  `iteration` tinyint(4) DEFAULT NULL,
  `value_short` text,
  `value_long` text,
  `value_ref` int(9) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doc_type` (`doc_type`,`ref_id`,`param_id`),
  KEY `doc_type_2` (`doc_type`),
  KEY `ref_user_id` (`ref_id`),
  KEY `param_id` (`param_id`),
  KEY `ref_user_id_2` (`ref_id`),
  KEY `value_ref` (`value_ref`),
  KEY `doc_type_3` (`doc_type`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=655 ;

--
-- Dumping data for table `sys_param_values`
--

INSERT INTO `sys_param_values` (`id`, `doc_type`, `ref_id`, `param_id`, `iteration`, `value_short`, `value_long`, `value_ref`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 0, '', NULL, NULL, NULL, NULL),
(2, 1, 1, 2, 0, '', NULL, NULL, NULL, NULL),
(3, 1, 1, 3, 0, '', NULL, NULL, NULL, NULL),
(4, 1, 1, 4, 0, '', NULL, NULL, NULL, NULL),
(5, 1, 1, 5, 0, '', NULL, NULL, NULL, NULL),
(6, 2, 1, 0, 0, NULL, NULL, NULL, NULL, NULL),
(7, 1, 1, 11, 0, '', NULL, NULL, NULL, NULL),
(8, 1, 1, 12, 0, '', NULL, NULL, NULL, NULL),
(9, 1, 1, 13, 0, '', NULL, NULL, NULL, NULL),
(10, 1, 1, 14, 0, '', NULL, NULL, NULL, NULL),
(11, 1, 1, 19, 0, '', NULL, NULL, NULL, NULL),
(12, 1, 1, 20, 0, '', NULL, NULL, NULL, NULL),
(13, 1, 1, 21, 0, '', NULL, NULL, NULL, NULL),
(14, 1, 1, 22, 0, '', NULL, NULL, NULL, NULL),
(15, 1, 1, 23, 0, '', NULL, NULL, NULL, NULL),
(16, 1, 1, 24, 0, '', NULL, NULL, NULL, NULL),
(17, 1, 1, 30, 0, '', NULL, NULL, NULL, NULL),
(18, 2, 1, 25, 0, '', NULL, NULL, NULL, NULL),
(19, 2, 1, 26, 0, '', NULL, NULL, NULL, NULL),
(20, 2, 1, 27, 0, '', NULL, NULL, NULL, NULL),
(21, 2, 1, 28, 0, '', NULL, NULL, NULL, NULL),
(22, 2, 1, 29, 0, '', NULL, NULL, NULL, NULL),
(23, 2, 1, 6, 0, '', NULL, NULL, NULL, NULL),
(24, 2, 1, 7, 0, '', NULL, NULL, NULL, NULL),
(25, 2, 1, 8, 0, '', NULL, NULL, NULL, NULL),
(26, 2, 1, 9, 0, '', NULL, NULL, NULL, NULL),
(27, 2, 1, 10, 0, '', NULL, NULL, NULL, NULL),
(28, 2, 1, 15, 0, '', NULL, NULL, NULL, NULL),
(29, 2, 1, 16, 0, '', NULL, NULL, NULL, NULL),
(30, 2, 1, 17, 0, '', NULL, NULL, NULL, NULL),
(31, 2, 1, 18, 0, '', NULL, NULL, NULL, NULL),
(32, 1, 7, 1, 0, '', NULL, NULL, NULL, NULL),
(33, 1, 7, 2, 0, '', NULL, NULL, NULL, NULL),
(34, 1, 7, 3, 0, '', NULL, NULL, NULL, NULL),
(35, 1, 7, 4, 0, '', NULL, NULL, NULL, NULL),
(36, 1, 7, 5, 0, '', NULL, NULL, NULL, NULL),
(37, 2, 7, 0, 0, NULL, NULL, NULL, NULL, NULL),
(38, 1, 7, 11, 0, '', NULL, NULL, NULL, NULL),
(39, 1, 7, 12, 0, '', NULL, NULL, NULL, NULL),
(40, 1, 7, 13, 0, '', NULL, NULL, NULL, NULL),
(41, 1, 7, 14, 0, '', NULL, NULL, NULL, NULL),
(42, 1, 7, 19, 0, '', NULL, NULL, NULL, NULL),
(43, 1, 7, 20, 0, '', NULL, NULL, NULL, NULL),
(44, 1, 7, 21, 0, '', NULL, NULL, NULL, NULL),
(45, 1, 7, 22, 0, '', NULL, NULL, NULL, NULL),
(46, 1, 7, 23, 0, '', NULL, NULL, NULL, NULL),
(47, 1, 7, 24, 0, '', NULL, NULL, NULL, NULL),
(48, 1, 7, 30, 0, '', NULL, NULL, NULL, NULL),
(49, 1, 7, 1, 1, '', NULL, NULL, NULL, NULL),
(50, 1, 7, 2, 1, '', NULL, NULL, NULL, NULL),
(51, 1, 7, 3, 1, '', NULL, NULL, NULL, NULL),
(52, 1, 7, 4, 1, '05/20/2016', NULL, NULL, NULL, NULL),
(53, 1, 7, 5, 1, '', NULL, NULL, NULL, NULL),
(54, 1, 7, 0, 1, NULL, NULL, NULL, NULL, NULL),
(55, 1, 8, 1, 0, '', NULL, NULL, NULL, NULL),
(56, 1, 8, 2, 0, '', NULL, NULL, NULL, NULL),
(57, 1, 8, 3, 0, '', NULL, NULL, NULL, NULL),
(58, 1, 8, 4, 0, '', NULL, NULL, NULL, NULL),
(59, 1, 8, 5, 0, '', NULL, NULL, NULL, NULL),
(60, 2, 8, 0, 0, NULL, NULL, NULL, NULL, NULL),
(61, 1, 8, 11, 0, '', NULL, NULL, NULL, NULL),
(62, 1, 8, 12, 0, '', NULL, NULL, NULL, NULL),
(63, 1, 8, 13, 0, '', NULL, NULL, NULL, NULL),
(64, 1, 8, 14, 0, '', NULL, NULL, NULL, NULL),
(65, 1, 8, 19, 0, '', NULL, NULL, NULL, NULL),
(66, 1, 8, 20, 0, '', NULL, NULL, NULL, NULL),
(67, 1, 8, 21, 0, '', NULL, NULL, NULL, NULL),
(68, 1, 8, 22, 0, '', NULL, NULL, NULL, NULL),
(69, 1, 8, 23, 0, '', NULL, NULL, NULL, NULL),
(70, 1, 8, 24, 0, '', NULL, NULL, NULL, NULL),
(71, 1, 8, 30, 0, '', NULL, NULL, NULL, NULL),
(72, 1, 9, 1, 0, '', NULL, NULL, NULL, NULL),
(73, 1, 9, 2, 0, '', NULL, NULL, NULL, NULL),
(74, 1, 9, 3, 0, '', NULL, NULL, NULL, NULL),
(75, 1, 9, 4, 0, '05/01/2016', NULL, NULL, NULL, NULL),
(76, 1, 9, 5, 0, '', NULL, NULL, NULL, NULL),
(77, 2, 9, 0, 0, NULL, NULL, NULL, NULL, NULL),
(78, 1, 9, 11, 0, '', NULL, NULL, NULL, NULL),
(79, 1, 9, 12, 0, '', NULL, NULL, NULL, NULL),
(80, 1, 9, 13, 0, '', NULL, NULL, NULL, NULL),
(81, 1, 9, 14, 0, '05/05/2016', NULL, NULL, NULL, NULL),
(82, 1, 9, 19, 0, '', NULL, NULL, NULL, NULL),
(83, 1, 9, 20, 0, '', NULL, NULL, NULL, NULL),
(84, 1, 9, 21, 0, '', NULL, NULL, NULL, NULL),
(85, 1, 9, 22, 0, '', NULL, NULL, NULL, NULL),
(86, 1, 9, 23, 0, '', NULL, NULL, NULL, NULL),
(87, 1, 9, 24, 0, '', NULL, NULL, NULL, NULL),
(88, 1, 9, 30, 0, '', NULL, NULL, NULL, NULL),
(89, 1, 10, 1, 0, '', NULL, NULL, NULL, NULL),
(90, 1, 10, 2, 0, '', NULL, NULL, NULL, NULL),
(91, 1, 10, 3, 0, '', NULL, NULL, NULL, NULL),
(92, 1, 10, 4, 0, '', NULL, NULL, NULL, NULL),
(93, 1, 10, 5, 0, '', NULL, NULL, NULL, NULL),
(94, 2, 10, 0, 0, NULL, NULL, NULL, NULL, NULL),
(95, 1, 10, 11, 0, '', NULL, NULL, NULL, NULL),
(96, 1, 10, 12, 0, '', NULL, NULL, NULL, NULL),
(97, 1, 10, 13, 0, '', NULL, NULL, NULL, NULL),
(98, 1, 10, 14, 0, '', NULL, NULL, NULL, NULL),
(99, 1, 10, 19, 0, '', NULL, NULL, NULL, NULL),
(100, 1, 10, 20, 0, '', NULL, NULL, NULL, NULL),
(101, 1, 10, 21, 0, '', NULL, NULL, NULL, NULL),
(102, 1, 10, 22, 0, '', NULL, NULL, NULL, NULL),
(103, 1, 10, 23, 0, '', NULL, NULL, NULL, NULL),
(104, 1, 10, 24, 0, '', NULL, NULL, NULL, NULL),
(105, 1, 10, 30, 0, '', NULL, NULL, NULL, NULL),
(106, 1, 14, 32, 0, '', NULL, NULL, NULL, NULL),
(107, 1, 14, 33, 0, '', NULL, NULL, NULL, NULL),
(108, 1, 14, 34, 0, '', NULL, NULL, NULL, NULL),
(109, 2, 14, 0, 0, NULL, NULL, NULL, NULL, NULL),
(110, 1, 16, 32, 0, 'acadme', NULL, NULL, NULL, NULL),
(111, 1, 16, 33, 0, 'dor', NULL, NULL, NULL, NULL),
(112, 1, 16, 34, 0, 'dev', NULL, NULL, NULL, NULL),
(113, 1, 16, 35, 0, '', NULL, NULL, NULL, NULL),
(114, 2, 16, 0, 0, NULL, NULL, NULL, NULL, NULL),
(115, 1, 16, 31, 0, '', NULL, NULL, NULL, NULL),
(116, 1, 19, 32, 0, '', NULL, NULL, NULL, NULL),
(117, 1, 19, 33, 0, '', NULL, NULL, NULL, NULL),
(118, 1, 19, 34, 0, '', NULL, NULL, NULL, NULL),
(119, 1, 19, 35, 0, '1', NULL, NULL, NULL, NULL),
(120, 2, 19, 0, 0, NULL, NULL, NULL, NULL, NULL),
(121, 1, 19, 31, 0, '', NULL, NULL, NULL, NULL),
(122, 1, 20, 32, 0, 'AcadeME', NULL, NULL, NULL, NULL),
(123, 1, 20, 33, 0, 'dor', NULL, NULL, NULL, NULL),
(124, 1, 20, 34, 0, 'dev', NULL, NULL, NULL, NULL),
(125, 1, 20, 35, 0, '', NULL, NULL, NULL, NULL),
(126, 2, 20, 0, 0, NULL, NULL, NULL, NULL, NULL),
(127, 1, 20, 31, 0, '', NULL, NULL, NULL, NULL),
(128, 1, 21, 32, 0, 'AcadeME', NULL, NULL, NULL, NULL),
(129, 1, 21, 33, 0, 'Hen West', NULL, NULL, NULL, NULL),
(130, 1, 21, 34, 0, 'SaaS Dev', NULL, NULL, NULL, NULL),
(131, 1, 21, 35, 0, '1', NULL, NULL, NULL, NULL),
(132, 1, 21, 0, 0, NULL, NULL, NULL, NULL, NULL),
(133, 1, 21, 31, 0, '', NULL, NULL, NULL, NULL),
(134, 2, 3, 25, 0, '', NULL, NULL, NULL, NULL),
(135, 2, 3, 26, 0, '', NULL, NULL, NULL, NULL),
(136, 2, 3, 27, 0, '', NULL, NULL, NULL, NULL),
(137, 2, 3, 28, 0, '', NULL, NULL, NULL, NULL),
(138, 2, 3, 29, 0, '', NULL, NULL, NULL, NULL),
(139, 2, 3, 0, 0, NULL, NULL, NULL, NULL, NULL),
(140, 2, 3, 6, 0, '', NULL, NULL, NULL, NULL),
(141, 2, 3, 7, 0, '', NULL, NULL, NULL, NULL),
(142, 2, 3, 8, 0, '', NULL, NULL, NULL, NULL),
(143, 2, 3, 9, 0, '', NULL, NULL, NULL, NULL),
(144, 2, 3, 10, 0, '', NULL, NULL, NULL, NULL),
(145, 2, 3, 15, 0, '', NULL, NULL, NULL, NULL),
(146, 2, 3, 16, 0, '', NULL, NULL, NULL, NULL),
(147, 2, 3, 17, 0, '', NULL, NULL, NULL, NULL),
(148, 2, 3, 18, 0, '', NULL, NULL, NULL, NULL),
(149, 2, 4, 25, 0, '', NULL, NULL, NULL, NULL),
(150, 2, 4, 26, 0, '', NULL, NULL, NULL, NULL),
(151, 2, 4, 27, 0, '', NULL, NULL, NULL, NULL),
(152, 2, 4, 28, 0, '', NULL, NULL, NULL, NULL),
(153, 2, 4, 29, 0, '', NULL, NULL, NULL, NULL),
(154, 2, 4, 0, 0, NULL, NULL, NULL, NULL, NULL),
(155, 2, 4, 6, 0, '', NULL, NULL, NULL, NULL),
(156, 2, 4, 7, 0, '', NULL, NULL, NULL, NULL),
(157, 2, 4, 8, 0, '', NULL, NULL, NULL, NULL),
(158, 2, 4, 9, 0, '', NULL, NULL, NULL, NULL),
(159, 2, 4, 10, 0, '', NULL, NULL, NULL, NULL),
(160, 2, 4, 15, 0, '', NULL, NULL, NULL, NULL),
(161, 2, 4, 16, 0, '', NULL, NULL, NULL, NULL),
(162, 2, 4, 17, 0, '', NULL, NULL, NULL, NULL),
(163, 2, 4, 18, 0, '', NULL, NULL, NULL, NULL),
(164, 2, 5, 25, 0, '', NULL, NULL, NULL, NULL),
(165, 2, 5, 26, 0, '', NULL, NULL, NULL, NULL),
(166, 2, 5, 27, 0, '', NULL, NULL, NULL, NULL),
(167, 2, 5, 28, 0, '', NULL, NULL, NULL, NULL),
(168, 2, 5, 29, 0, '', NULL, NULL, NULL, NULL),
(169, 2, 5, 0, 0, NULL, NULL, NULL, NULL, NULL),
(170, 2, 5, 6, 0, '', NULL, NULL, NULL, NULL),
(171, 2, 5, 7, 0, '', NULL, NULL, NULL, NULL),
(172, 2, 5, 8, 0, '', NULL, NULL, NULL, NULL),
(173, 2, 5, 9, 0, '', NULL, NULL, NULL, NULL),
(174, 2, 5, 10, 0, '', NULL, NULL, NULL, NULL),
(175, 2, 5, 15, 0, '', NULL, NULL, NULL, NULL),
(176, 2, 5, 16, 0, '', NULL, NULL, NULL, NULL),
(177, 2, 5, 17, 0, '', NULL, NULL, NULL, NULL),
(178, 2, 5, 18, 0, '', NULL, NULL, NULL, NULL),
(179, 2, 6, 25, 0, '', NULL, NULL, NULL, NULL),
(180, 2, 6, 26, 0, '', NULL, NULL, NULL, NULL),
(181, 2, 6, 27, 0, '', NULL, NULL, NULL, NULL),
(182, 2, 6, 28, 0, '', NULL, NULL, NULL, NULL),
(183, 2, 6, 29, 0, '', NULL, NULL, NULL, NULL),
(184, 2, 6, 0, 0, NULL, NULL, NULL, NULL, NULL),
(185, 2, 6, 6, 0, '', NULL, NULL, NULL, NULL),
(186, 2, 6, 7, 0, '', NULL, NULL, NULL, NULL),
(187, 2, 6, 8, 0, '', NULL, NULL, NULL, NULL),
(188, 2, 6, 9, 0, '', NULL, NULL, NULL, NULL),
(189, 2, 6, 10, 0, '', NULL, NULL, NULL, NULL),
(190, 2, 6, 15, 0, '', NULL, NULL, NULL, NULL),
(191, 2, 6, 16, 0, '', NULL, NULL, NULL, NULL),
(192, 2, 6, 17, 0, '', NULL, NULL, NULL, NULL),
(193, 2, 6, 18, 0, '', NULL, NULL, NULL, NULL),
(194, 2, 7, 25, 0, '', NULL, NULL, NULL, NULL),
(195, 2, 7, 26, 0, '', NULL, NULL, NULL, NULL),
(196, 2, 7, 27, 0, '', NULL, NULL, NULL, NULL),
(197, 2, 7, 28, 0, '', NULL, NULL, NULL, NULL),
(198, 2, 7, 29, 0, '', NULL, NULL, NULL, NULL),
(199, 2, 7, 6, 0, '', NULL, NULL, NULL, NULL),
(200, 2, 7, 7, 0, '', NULL, NULL, NULL, NULL),
(201, 2, 7, 8, 0, '', NULL, NULL, NULL, NULL),
(202, 2, 7, 9, 0, '', NULL, NULL, NULL, NULL),
(203, 2, 7, 10, 0, '', NULL, NULL, NULL, NULL),
(204, 2, 7, 15, 0, '', NULL, NULL, NULL, NULL),
(205, 2, 7, 16, 0, '', NULL, NULL, NULL, NULL),
(206, 2, 7, 17, 0, '', NULL, NULL, NULL, NULL),
(207, 2, 7, 18, 0, '', NULL, NULL, NULL, NULL),
(208, 2, 8, 25, 0, '', NULL, NULL, NULL, NULL),
(209, 2, 8, 26, 0, '', NULL, NULL, NULL, NULL),
(210, 2, 8, 27, 0, '', NULL, NULL, NULL, NULL),
(211, 2, 8, 28, 0, '', NULL, NULL, NULL, NULL),
(212, 2, 8, 29, 0, '', NULL, NULL, NULL, NULL),
(213, 2, 8, 6, 0, '', NULL, NULL, NULL, NULL),
(214, 2, 8, 7, 0, '', NULL, NULL, NULL, NULL),
(215, 2, 8, 8, 0, '', NULL, NULL, NULL, NULL),
(216, 2, 8, 9, 0, '', NULL, NULL, NULL, NULL),
(217, 2, 8, 10, 0, '', NULL, NULL, NULL, NULL),
(218, 2, 8, 15, 0, '', NULL, NULL, NULL, NULL),
(219, 2, 8, 16, 0, '', NULL, NULL, NULL, NULL),
(220, 2, 8, 17, 0, '', NULL, NULL, NULL, NULL),
(221, 2, 8, 18, 0, '', NULL, NULL, NULL, NULL),
(222, 2, 9, 25, 0, '', NULL, NULL, NULL, NULL),
(223, 2, 9, 26, 0, '', NULL, NULL, NULL, NULL),
(224, 2, 9, 27, 0, '', NULL, NULL, NULL, NULL),
(225, 2, 9, 28, 0, '', NULL, NULL, NULL, NULL),
(226, 2, 9, 29, 0, '', NULL, NULL, NULL, NULL),
(227, 2, 9, 6, 0, '', NULL, NULL, NULL, NULL),
(228, 2, 9, 7, 0, '', NULL, NULL, NULL, NULL),
(229, 2, 9, 8, 0, '', NULL, NULL, NULL, NULL),
(230, 2, 9, 9, 0, '', NULL, NULL, NULL, NULL),
(231, 2, 9, 10, 0, '', NULL, NULL, NULL, NULL),
(232, 2, 9, 15, 0, '', NULL, NULL, NULL, NULL),
(233, 2, 9, 16, 0, '', NULL, NULL, NULL, NULL),
(234, 2, 9, 17, 0, '', NULL, NULL, NULL, NULL),
(235, 2, 9, 18, 0, '', NULL, NULL, NULL, NULL),
(236, 2, 10, 25, 0, '', NULL, NULL, NULL, NULL),
(237, 2, 10, 26, 0, '', NULL, NULL, NULL, NULL),
(238, 2, 10, 27, 0, '', NULL, NULL, NULL, NULL),
(239, 2, 10, 28, 0, '', NULL, NULL, NULL, NULL),
(240, 2, 10, 29, 0, '', NULL, NULL, NULL, NULL),
(241, 2, 10, 6, 0, '', NULL, NULL, NULL, NULL),
(242, 2, 10, 7, 0, '', NULL, NULL, NULL, NULL),
(243, 2, 10, 8, 0, '', NULL, NULL, NULL, NULL),
(244, 2, 10, 9, 0, '', NULL, NULL, NULL, NULL),
(245, 2, 10, 10, 0, '', NULL, NULL, NULL, NULL),
(246, 2, 10, 15, 0, '', NULL, NULL, NULL, NULL),
(247, 2, 10, 16, 0, '', NULL, NULL, NULL, NULL),
(248, 2, 10, 17, 0, '', NULL, NULL, NULL, NULL),
(249, 2, 10, 18, 0, '', NULL, NULL, NULL, NULL),
(250, 2, 11, 25, 0, '', NULL, NULL, NULL, NULL),
(251, 2, 11, 26, 0, '', NULL, NULL, NULL, NULL),
(252, 2, 11, 27, 0, '', NULL, NULL, NULL, NULL),
(253, 2, 11, 28, 0, '', NULL, NULL, NULL, NULL),
(254, 2, 11, 29, 0, '', NULL, NULL, NULL, NULL),
(255, 2, 11, 0, 0, NULL, NULL, NULL, NULL, NULL),
(256, 2, 11, 6, 0, '', NULL, NULL, NULL, NULL),
(257, 2, 11, 7, 0, '', NULL, NULL, NULL, NULL),
(258, 2, 11, 8, 0, '', NULL, NULL, NULL, NULL),
(259, 2, 11, 9, 0, '', NULL, NULL, NULL, NULL),
(260, 2, 11, 10, 0, '', NULL, NULL, NULL, NULL),
(261, 2, 11, 15, 0, '', NULL, NULL, NULL, NULL),
(262, 2, 11, 16, 0, '', NULL, NULL, NULL, NULL),
(263, 2, 11, 17, 0, '', NULL, NULL, NULL, NULL),
(264, 2, 11, 18, 0, '', NULL, NULL, NULL, NULL),
(265, 2, 12, 25, 0, '', NULL, NULL, NULL, NULL),
(266, 2, 12, 26, 0, '', NULL, NULL, NULL, NULL),
(267, 2, 12, 27, 0, '', NULL, NULL, NULL, NULL),
(268, 2, 12, 28, 0, '', NULL, NULL, NULL, NULL),
(269, 2, 12, 29, 0, '', NULL, NULL, NULL, NULL),
(270, 2, 12, 0, 0, NULL, NULL, NULL, NULL, NULL),
(271, 2, 12, 6, 0, '', NULL, NULL, NULL, NULL),
(272, 2, 12, 7, 0, '', NULL, NULL, NULL, NULL),
(273, 2, 12, 8, 0, '', NULL, NULL, NULL, NULL),
(274, 2, 12, 9, 0, '', NULL, NULL, NULL, NULL),
(275, 2, 12, 10, 0, '', NULL, NULL, NULL, NULL),
(276, 2, 12, 15, 0, '', NULL, NULL, NULL, NULL),
(277, 2, 12, 16, 0, '', NULL, NULL, NULL, NULL),
(278, 2, 12, 17, 0, '', NULL, NULL, NULL, NULL),
(279, 2, 12, 18, 0, '', NULL, NULL, NULL, NULL),
(280, 2, 13, 25, 0, '', NULL, NULL, NULL, NULL),
(281, 2, 13, 26, 0, '', NULL, NULL, NULL, NULL),
(282, 2, 13, 27, 0, '', NULL, NULL, NULL, NULL),
(283, 2, 13, 28, 0, '', NULL, NULL, NULL, NULL),
(284, 2, 13, 29, 0, '', NULL, NULL, NULL, NULL),
(285, 2, 13, 0, 0, NULL, NULL, NULL, NULL, NULL),
(286, 2, 13, 6, 0, '', NULL, NULL, NULL, NULL),
(287, 2, 13, 7, 0, '', NULL, NULL, NULL, NULL),
(288, 2, 13, 8, 0, '', NULL, NULL, NULL, NULL),
(289, 2, 13, 9, 0, '', NULL, NULL, NULL, NULL),
(290, 2, 13, 10, 0, '', NULL, NULL, NULL, NULL),
(291, 2, 13, 15, 0, '', NULL, NULL, NULL, NULL),
(292, 2, 13, 16, 0, '', NULL, NULL, NULL, NULL),
(293, 2, 13, 17, 0, '', NULL, NULL, NULL, NULL),
(294, 2, 13, 18, 0, '', NULL, NULL, NULL, NULL),
(295, 2, 14, 25, 0, '', NULL, NULL, NULL, NULL),
(296, 2, 14, 26, 0, '', NULL, NULL, NULL, NULL),
(297, 2, 14, 27, 0, '', NULL, NULL, NULL, NULL),
(298, 2, 14, 28, 0, '', NULL, NULL, NULL, NULL),
(299, 2, 14, 29, 0, '', NULL, NULL, NULL, NULL),
(300, 2, 14, 6, 0, '', NULL, NULL, NULL, NULL),
(301, 2, 14, 7, 0, '', NULL, NULL, NULL, NULL),
(302, 2, 14, 8, 0, '', NULL, NULL, NULL, NULL),
(303, 2, 14, 9, 0, '', NULL, NULL, NULL, NULL),
(304, 2, 14, 10, 0, '', NULL, NULL, NULL, NULL),
(305, 2, 14, 15, 0, '', NULL, NULL, NULL, NULL),
(306, 2, 14, 16, 0, '', NULL, NULL, NULL, NULL),
(307, 2, 14, 17, 0, '', NULL, NULL, NULL, NULL),
(308, 2, 14, 18, 0, '', NULL, NULL, NULL, NULL),
(309, 2, 15, 25, 0, '', NULL, NULL, NULL, NULL),
(310, 2, 15, 26, 0, '', NULL, NULL, NULL, NULL),
(311, 2, 15, 27, 0, '', NULL, NULL, NULL, NULL),
(312, 2, 15, 28, 0, '', NULL, NULL, NULL, NULL),
(313, 2, 15, 29, 0, '', NULL, NULL, NULL, NULL),
(314, 2, 15, 0, 0, NULL, NULL, NULL, NULL, NULL),
(315, 2, 15, 6, 0, '', NULL, NULL, NULL, NULL),
(316, 2, 15, 7, 0, '', NULL, NULL, NULL, NULL),
(317, 2, 15, 8, 0, '', NULL, NULL, NULL, NULL),
(318, 2, 15, 9, 0, '', NULL, NULL, NULL, NULL),
(319, 2, 15, 10, 0, '', NULL, NULL, NULL, NULL),
(320, 2, 15, 15, 0, '', NULL, NULL, NULL, NULL),
(321, 2, 15, 16, 0, '', NULL, NULL, NULL, NULL),
(322, 2, 15, 17, 0, '', NULL, NULL, NULL, NULL),
(323, 2, 15, 18, 0, '', NULL, NULL, NULL, NULL),
(324, 2, 16, 25, 0, '', NULL, NULL, NULL, NULL),
(325, 2, 16, 26, 0, '', NULL, NULL, NULL, NULL),
(326, 2, 16, 27, 0, '', NULL, NULL, NULL, NULL),
(327, 2, 16, 28, 0, '', NULL, NULL, NULL, NULL),
(328, 2, 16, 29, 0, '', NULL, NULL, NULL, NULL),
(329, 2, 16, 6, 0, '', NULL, NULL, NULL, NULL),
(330, 2, 16, 7, 0, '', NULL, NULL, NULL, NULL),
(331, 2, 16, 8, 0, '', NULL, NULL, NULL, NULL),
(332, 2, 16, 9, 0, '', NULL, NULL, NULL, NULL),
(333, 2, 16, 10, 0, '', NULL, NULL, NULL, NULL),
(334, 2, 16, 15, 0, '', NULL, NULL, NULL, NULL),
(335, 2, 16, 16, 0, '', NULL, NULL, NULL, NULL),
(336, 2, 16, 17, 0, '', NULL, NULL, NULL, NULL),
(337, 2, 16, 18, 0, '', NULL, NULL, NULL, NULL),
(338, 2, 17, 25, 0, '', NULL, NULL, NULL, NULL),
(339, 2, 17, 26, 0, '', NULL, NULL, NULL, NULL),
(340, 2, 17, 27, 0, '', NULL, NULL, NULL, NULL),
(341, 2, 17, 28, 0, '', NULL, NULL, NULL, NULL),
(342, 2, 17, 29, 0, '', NULL, NULL, NULL, NULL),
(343, 2, 17, 0, 0, NULL, NULL, NULL, NULL, NULL),
(344, 2, 17, 6, 0, '', NULL, NULL, NULL, NULL),
(345, 2, 17, 7, 0, '', NULL, NULL, NULL, NULL),
(346, 2, 17, 8, 0, '', NULL, NULL, NULL, NULL),
(347, 2, 17, 9, 0, '', NULL, NULL, NULL, NULL),
(348, 2, 17, 10, 0, '', NULL, NULL, NULL, NULL),
(349, 2, 17, 15, 0, '', NULL, NULL, NULL, NULL),
(350, 2, 17, 16, 0, '', NULL, NULL, NULL, NULL),
(351, 2, 17, 17, 0, '', NULL, NULL, NULL, NULL),
(352, 2, 17, 18, 0, '', NULL, NULL, NULL, NULL),
(353, 2, 18, 25, 0, '', NULL, NULL, NULL, NULL),
(354, 2, 18, 26, 0, '', NULL, NULL, NULL, NULL),
(355, 2, 18, 27, 0, '', NULL, NULL, NULL, NULL),
(356, 2, 18, 28, 0, '', NULL, NULL, NULL, NULL),
(357, 2, 18, 29, 0, '', NULL, NULL, NULL, NULL),
(358, 2, 18, 0, 0, NULL, NULL, NULL, NULL, NULL),
(359, 2, 18, 6, 0, '', NULL, NULL, NULL, NULL),
(360, 2, 18, 7, 0, '', NULL, NULL, NULL, NULL),
(361, 2, 18, 8, 0, '', NULL, NULL, NULL, NULL),
(362, 2, 18, 9, 0, '', NULL, NULL, NULL, NULL),
(363, 2, 18, 10, 0, '', NULL, NULL, NULL, NULL),
(364, 2, 18, 15, 0, '', NULL, NULL, NULL, NULL),
(365, 2, 18, 16, 0, '', NULL, NULL, NULL, NULL),
(366, 2, 18, 17, 0, '', NULL, NULL, NULL, NULL),
(367, 2, 18, 18, 0, '', NULL, NULL, NULL, NULL),
(368, 2, 19, 25, 0, '', NULL, NULL, NULL, NULL),
(369, 2, 19, 26, 0, '', NULL, NULL, NULL, NULL),
(370, 2, 19, 27, 0, '', NULL, NULL, NULL, NULL),
(371, 2, 19, 28, 0, '', NULL, NULL, NULL, NULL),
(372, 2, 19, 29, 0, '', NULL, NULL, NULL, NULL),
(373, 2, 19, 6, 0, '', NULL, NULL, NULL, NULL),
(374, 2, 19, 7, 0, '', NULL, NULL, NULL, NULL),
(375, 2, 19, 8, 0, '', NULL, NULL, NULL, NULL),
(376, 2, 19, 9, 0, '', NULL, NULL, NULL, NULL),
(377, 2, 19, 10, 0, '', NULL, NULL, NULL, NULL),
(378, 2, 19, 15, 0, '', NULL, NULL, NULL, NULL),
(379, 2, 19, 16, 0, '', NULL, NULL, NULL, NULL),
(380, 2, 19, 17, 0, '', NULL, NULL, NULL, NULL),
(381, 2, 19, 18, 0, '', NULL, NULL, NULL, NULL),
(382, 2, 20, 25, 0, '', NULL, NULL, NULL, NULL),
(383, 2, 20, 26, 0, '', NULL, NULL, NULL, NULL),
(384, 2, 20, 27, 0, '', NULL, NULL, NULL, NULL),
(385, 2, 20, 28, 0, '', NULL, NULL, NULL, NULL),
(386, 2, 20, 29, 0, '', NULL, NULL, NULL, NULL),
(387, 2, 20, 6, 0, '', NULL, NULL, NULL, NULL),
(388, 2, 20, 7, 0, '', NULL, NULL, NULL, NULL),
(389, 2, 20, 8, 0, '', NULL, NULL, NULL, NULL),
(390, 2, 20, 9, 0, '', NULL, NULL, NULL, NULL),
(391, 2, 20, 10, 0, '', NULL, NULL, NULL, NULL),
(392, 2, 20, 15, 0, '', NULL, NULL, NULL, NULL),
(393, 2, 20, 16, 0, '', NULL, NULL, NULL, NULL),
(394, 2, 20, 17, 0, '', NULL, NULL, NULL, NULL),
(395, 2, 20, 18, 0, '', NULL, NULL, NULL, NULL),
(396, 2, 21, 25, 0, '', NULL, NULL, NULL, NULL),
(397, 2, 21, 26, 0, '', NULL, NULL, NULL, NULL),
(398, 2, 21, 27, 0, '', NULL, NULL, NULL, NULL),
(399, 2, 21, 28, 0, '', NULL, NULL, NULL, NULL),
(400, 2, 21, 29, 0, '', NULL, NULL, NULL, NULL),
(401, 2, 21, 6, 0, '', NULL, NULL, NULL, NULL),
(402, 2, 21, 7, 0, '', NULL, NULL, NULL, NULL),
(403, 2, 21, 8, 0, '', NULL, NULL, NULL, NULL),
(404, 2, 21, 9, 0, '', NULL, NULL, NULL, NULL),
(405, 2, 21, 10, 0, '', NULL, NULL, NULL, NULL),
(406, 2, 21, 15, 0, '', NULL, NULL, NULL, NULL),
(407, 2, 21, 16, 0, '', NULL, NULL, NULL, NULL),
(408, 2, 21, 17, 0, '', NULL, NULL, NULL, NULL),
(409, 2, 21, 18, 0, '', NULL, NULL, NULL, NULL),
(410, 2, 22, 25, 0, '', NULL, NULL, NULL, NULL),
(411, 2, 22, 26, 0, '', NULL, NULL, NULL, NULL),
(412, 2, 22, 27, 0, '', NULL, NULL, NULL, NULL),
(413, 2, 22, 28, 0, '', NULL, NULL, NULL, NULL),
(414, 2, 22, 29, 0, '', NULL, NULL, NULL, NULL),
(415, 2, 22, 0, 0, '', NULL, NULL, NULL, NULL),
(416, 2, 22, 6, 0, '', NULL, NULL, NULL, NULL),
(417, 2, 22, 7, 0, '', NULL, NULL, NULL, NULL),
(418, 2, 22, 8, 0, '', NULL, NULL, NULL, NULL),
(419, 2, 22, 9, 0, '', NULL, NULL, NULL, NULL),
(420, 2, 22, 10, 0, '', NULL, NULL, NULL, NULL),
(421, 2, 22, 15, 0, '', NULL, NULL, NULL, NULL),
(422, 2, 22, 16, 0, '', NULL, NULL, NULL, NULL),
(423, 2, 22, 17, 0, '', NULL, NULL, NULL, NULL),
(424, 2, 22, 18, 0, '', NULL, NULL, NULL, NULL),
(425, 2, 23, 25, 0, '', NULL, NULL, NULL, NULL),
(426, 2, 23, 26, 0, '', NULL, NULL, NULL, NULL),
(427, 2, 23, 27, 0, '', NULL, NULL, NULL, NULL),
(428, 2, 23, 28, 0, '', NULL, NULL, NULL, NULL),
(429, 2, 23, 29, 0, '', NULL, NULL, NULL, NULL),
(430, 2, 23, 0, 0, '', NULL, NULL, NULL, NULL),
(431, 2, 23, 6, 0, '', NULL, NULL, NULL, NULL),
(432, 2, 23, 7, 0, '', NULL, NULL, NULL, NULL),
(433, 2, 23, 8, 0, '', NULL, NULL, NULL, NULL),
(434, 2, 23, 9, 0, '', NULL, NULL, NULL, NULL),
(435, 2, 23, 10, 0, '', NULL, NULL, NULL, NULL),
(436, 2, 23, 15, 0, '', NULL, NULL, NULL, NULL),
(437, 2, 23, 16, 0, '', NULL, NULL, NULL, NULL),
(438, 2, 23, 17, 0, '', NULL, NULL, NULL, NULL),
(439, 2, 23, 18, 0, '', NULL, NULL, NULL, NULL),
(440, 1, 22, 32, 0, '', NULL, NULL, NULL, NULL),
(441, 1, 22, 33, 0, '', NULL, NULL, NULL, NULL),
(442, 1, 22, 34, 0, '', NULL, NULL, NULL, NULL),
(443, 1, 22, 35, 0, '', NULL, NULL, NULL, NULL),
(444, 1, 22, 31, 0, '', NULL, NULL, NULL, NULL),
(445, 1, 23, 32, 0, '', NULL, NULL, NULL, NULL),
(446, 1, 23, 33, 0, '', NULL, NULL, NULL, NULL),
(447, 1, 23, 34, 0, '', NULL, NULL, NULL, NULL),
(448, 1, 23, 35, 0, '', NULL, NULL, NULL, NULL),
(449, 1, 23, 31, 0, '', NULL, NULL, NULL, NULL),
(450, 1, 24, 32, 0, '', NULL, NULL, NULL, NULL),
(451, 1, 24, 33, 0, '', NULL, NULL, NULL, NULL),
(452, 1, 24, 34, 0, '', NULL, NULL, NULL, NULL),
(453, 1, 24, 35, 0, '', NULL, NULL, NULL, NULL),
(454, 2, 24, 0, 0, NULL, NULL, NULL, NULL, NULL),
(455, 1, 24, 31, 0, '', NULL, NULL, NULL, NULL),
(456, 1, 25, 1, 0, '', NULL, NULL, NULL, NULL),
(457, 1, 25, 2, 0, '', NULL, NULL, NULL, NULL),
(458, 1, 25, 3, 0, '', NULL, NULL, NULL, NULL),
(459, 1, 25, 4, 0, '', NULL, NULL, NULL, NULL),
(460, 1, 25, 5, 0, '', NULL, NULL, NULL, NULL),
(461, 2, 25, 0, 0, NULL, NULL, NULL, NULL, NULL),
(462, 1, 25, 11, 0, '', NULL, NULL, NULL, NULL),
(463, 1, 25, 12, 0, '', NULL, NULL, NULL, NULL),
(464, 1, 25, 13, 0, '', NULL, NULL, NULL, NULL),
(465, 1, 25, 14, 0, '', NULL, NULL, NULL, NULL),
(466, 1, 25, 19, 0, '', NULL, NULL, NULL, NULL),
(467, 1, 25, 20, 0, '', NULL, NULL, NULL, NULL),
(468, 1, 25, 21, 0, '', NULL, NULL, NULL, NULL),
(469, 1, 25, 22, 0, '', NULL, NULL, NULL, NULL),
(470, 1, 25, 23, 0, '', NULL, NULL, NULL, NULL),
(471, 1, 25, 24, 0, '', NULL, NULL, NULL, NULL),
(472, 1, 25, 30, 0, '', NULL, NULL, NULL, NULL),
(473, 2, 24, 25, 0, '', NULL, NULL, NULL, NULL),
(474, 2, 24, 26, 0, '', NULL, NULL, NULL, NULL),
(475, 2, 24, 27, 0, '', NULL, NULL, NULL, NULL),
(476, 2, 24, 28, 0, '', NULL, NULL, NULL, NULL),
(477, 2, 24, 29, 0, '', NULL, NULL, NULL, NULL),
(478, 2, 24, 6, 0, '', NULL, NULL, NULL, NULL),
(479, 2, 24, 7, 0, '', NULL, NULL, NULL, NULL),
(480, 2, 24, 8, 0, '', NULL, NULL, NULL, NULL),
(481, 2, 24, 9, 0, '', NULL, NULL, NULL, NULL),
(482, 2, 24, 10, 0, '', NULL, NULL, NULL, NULL),
(483, 2, 24, 15, 0, '', NULL, NULL, NULL, NULL),
(484, 2, 24, 16, 0, '', NULL, NULL, NULL, NULL),
(485, 2, 24, 17, 0, '', NULL, NULL, NULL, NULL),
(486, 2, 24, 18, 0, '', NULL, NULL, NULL, NULL),
(487, 2, 25, 25, 0, '', NULL, NULL, NULL, NULL),
(488, 2, 25, 26, 0, '', NULL, NULL, NULL, NULL),
(489, 2, 25, 27, 0, '', NULL, NULL, NULL, NULL),
(490, 2, 25, 28, 0, '', NULL, NULL, NULL, NULL),
(491, 2, 25, 29, 0, '', NULL, NULL, NULL, NULL),
(492, 2, 25, 6, 0, '', NULL, NULL, NULL, NULL),
(493, 2, 25, 7, 0, '', NULL, NULL, NULL, NULL),
(494, 2, 25, 8, 0, '', NULL, NULL, NULL, NULL),
(495, 2, 25, 9, 0, '', NULL, NULL, NULL, NULL),
(496, 2, 25, 10, 0, '', NULL, NULL, NULL, NULL),
(497, 2, 25, 15, 0, '', NULL, NULL, NULL, NULL),
(498, 2, 25, 16, 0, '', NULL, NULL, NULL, NULL),
(499, 2, 25, 17, 0, '', NULL, NULL, NULL, NULL),
(500, 2, 25, 18, 0, '', NULL, NULL, NULL, NULL),
(501, 1, 26, 32, 0, 'wanted', NULL, NULL, NULL, NULL),
(502, 1, 26, 33, 0, 'dor', NULL, NULL, NULL, NULL),
(503, 1, 26, 34, 0, 'dev', NULL, NULL, NULL, NULL),
(504, 1, 26, 35, 0, '', NULL, NULL, NULL, NULL),
(505, 2, 26, 0, 0, NULL, NULL, NULL, NULL, NULL),
(506, 1, 26, 31, 0, '', NULL, NULL, NULL, NULL),
(507, 2, 26, 25, 0, '', NULL, NULL, NULL, NULL),
(508, 2, 26, 26, 0, '', NULL, NULL, NULL, NULL),
(509, 2, 26, 27, 0, '', NULL, NULL, NULL, NULL),
(510, 2, 26, 28, 0, '', NULL, NULL, NULL, NULL),
(511, 2, 26, 29, 0, '', NULL, NULL, NULL, NULL),
(512, 2, 26, 6, 0, '', NULL, NULL, NULL, NULL),
(513, 2, 26, 7, 0, '', NULL, NULL, NULL, NULL),
(514, 2, 26, 8, 0, '', NULL, NULL, NULL, NULL),
(515, 2, 26, 9, 0, '', NULL, NULL, NULL, NULL),
(516, 2, 26, 10, 0, '', NULL, NULL, NULL, NULL),
(517, 2, 26, 15, 0, '', NULL, NULL, NULL, NULL),
(518, 2, 26, 16, 0, '', NULL, NULL, NULL, NULL),
(519, 2, 26, 17, 0, '', NULL, NULL, NULL, NULL),
(520, 2, 26, 18, 0, '', NULL, NULL, NULL, NULL),
(521, 2, 27, 25, 0, '', NULL, NULL, NULL, NULL),
(522, 2, 27, 26, 0, '', NULL, NULL, NULL, NULL),
(523, 2, 27, 27, 0, '', NULL, NULL, NULL, NULL),
(524, 2, 27, 28, 0, '', NULL, NULL, NULL, NULL),
(525, 2, 27, 29, 0, '', NULL, NULL, NULL, NULL),
(526, 2, 27, 0, 0, NULL, NULL, NULL, NULL, NULL),
(527, 2, 27, 6, 0, '', NULL, NULL, NULL, NULL),
(528, 2, 27, 7, 0, '', NULL, NULL, NULL, NULL),
(529, 2, 27, 8, 0, '', NULL, NULL, NULL, NULL),
(530, 2, 27, 9, 0, '', NULL, NULL, NULL, NULL),
(531, 2, 27, 10, 0, '', NULL, NULL, NULL, NULL),
(532, 2, 27, 15, 0, '', NULL, NULL, NULL, NULL),
(533, 2, 27, 16, 0, '', NULL, NULL, NULL, NULL),
(534, 2, 27, 17, 0, '', NULL, NULL, NULL, NULL),
(535, 2, 27, 18, 0, '', NULL, NULL, NULL, NULL),
(536, 2, 28, 25, 0, '', NULL, NULL, NULL, NULL),
(537, 2, 28, 26, 0, '', NULL, NULL, NULL, NULL),
(538, 2, 28, 27, 0, '', NULL, NULL, NULL, NULL),
(539, 2, 28, 28, 0, '', NULL, NULL, NULL, NULL),
(540, 2, 28, 29, 0, '', NULL, NULL, NULL, NULL),
(541, 2, 28, 0, 0, '', NULL, NULL, NULL, NULL),
(542, 2, 28, 6, 0, '', NULL, NULL, NULL, NULL),
(543, 2, 28, 7, 0, '', NULL, NULL, NULL, NULL),
(544, 2, 28, 8, 0, '', NULL, NULL, NULL, NULL),
(545, 2, 28, 9, 0, '', NULL, NULL, NULL, NULL),
(546, 2, 28, 10, 0, '', NULL, NULL, NULL, NULL),
(547, 2, 28, 15, 0, '', NULL, NULL, NULL, NULL),
(548, 2, 28, 16, 0, '', NULL, NULL, NULL, NULL),
(549, 2, 28, 17, 0, '', NULL, NULL, NULL, NULL),
(550, 2, 28, 18, 0, '', NULL, NULL, NULL, NULL),
(551, 2, 29, 25, 0, '', NULL, NULL, NULL, NULL),
(552, 2, 29, 26, 0, '', NULL, NULL, NULL, NULL),
(553, 2, 29, 27, 0, '', NULL, NULL, NULL, NULL),
(554, 2, 29, 28, 0, '', NULL, NULL, NULL, NULL),
(555, 2, 29, 29, 0, '', NULL, NULL, NULL, NULL),
(556, 2, 29, 0, 0, NULL, NULL, NULL, NULL, NULL),
(557, 2, 29, 6, 0, '', NULL, NULL, NULL, NULL),
(558, 2, 29, 7, 0, '', NULL, NULL, NULL, NULL),
(559, 2, 29, 8, 0, '', NULL, NULL, NULL, NULL),
(560, 2, 29, 9, 0, '', NULL, NULL, NULL, NULL),
(561, 2, 29, 10, 0, '', NULL, NULL, NULL, NULL),
(562, 2, 29, 15, 0, '', NULL, NULL, NULL, NULL),
(563, 2, 29, 16, 0, '', NULL, NULL, NULL, NULL),
(564, 2, 29, 17, 0, '', NULL, NULL, NULL, NULL),
(565, 2, 29, 18, 0, '', NULL, NULL, NULL, NULL),
(566, 2, 30, 25, 0, '', NULL, NULL, NULL, NULL),
(567, 2, 30, 26, 0, '', NULL, NULL, NULL, NULL),
(568, 2, 30, 27, 0, '', NULL, NULL, NULL, NULL),
(569, 2, 30, 28, 0, '', NULL, NULL, NULL, NULL),
(570, 2, 30, 29, 0, '', NULL, NULL, NULL, NULL),
(571, 1, 30, 0, 0, NULL, NULL, NULL, NULL, NULL),
(572, 2, 30, 6, 0, '', NULL, NULL, NULL, NULL),
(573, 2, 30, 7, 0, '', NULL, NULL, NULL, NULL),
(574, 2, 30, 8, 0, '', NULL, NULL, NULL, NULL),
(575, 2, 30, 9, 0, '', NULL, NULL, NULL, NULL),
(576, 2, 30, 10, 0, '', NULL, NULL, NULL, NULL),
(577, 2, 30, 15, 0, '', NULL, NULL, NULL, NULL),
(578, 2, 30, 16, 0, '', NULL, NULL, NULL, NULL),
(579, 2, 30, 17, 0, '', NULL, NULL, NULL, NULL),
(580, 2, 30, 18, 0, '', NULL, NULL, NULL, NULL),
(581, 2, 31, 25, 0, '', NULL, NULL, NULL, NULL),
(582, 2, 31, 26, 0, '', NULL, NULL, NULL, NULL),
(583, 2, 31, 27, 0, '', NULL, NULL, NULL, NULL),
(584, 2, 31, 28, 0, '', NULL, NULL, NULL, NULL),
(585, 2, 31, 29, 0, '', NULL, NULL, NULL, NULL),
(586, 2, 31, 0, 0, NULL, NULL, NULL, NULL, NULL),
(587, 2, 31, 6, 0, '', NULL, NULL, NULL, NULL),
(588, 2, 31, 7, 0, '', NULL, NULL, NULL, NULL),
(589, 2, 31, 8, 0, '', NULL, NULL, NULL, NULL),
(590, 2, 31, 9, 0, '', NULL, NULL, NULL, NULL),
(591, 2, 31, 10, 0, '', NULL, NULL, NULL, NULL),
(592, 2, 31, 15, 0, '', NULL, NULL, NULL, NULL),
(593, 2, 31, 16, 0, '', NULL, NULL, NULL, NULL),
(594, 2, 31, 17, 0, '', NULL, NULL, NULL, NULL),
(595, 2, 31, 18, 0, '', NULL, NULL, NULL, NULL),
(596, 2, 35, 25, 0, '', NULL, NULL, NULL, NULL),
(597, 2, 35, 26, 0, '', NULL, NULL, NULL, NULL),
(598, 2, 35, 27, 0, '', NULL, NULL, NULL, NULL),
(599, 2, 35, 28, 0, '', NULL, NULL, NULL, NULL),
(600, 2, 35, 29, 0, '', NULL, NULL, NULL, NULL),
(601, 2, 35, 0, 0, NULL, NULL, NULL, NULL, NULL),
(602, 2, 35, 6, 0, '', NULL, NULL, NULL, NULL),
(603, 2, 35, 7, 0, '', NULL, NULL, NULL, NULL),
(604, 2, 35, 8, 0, '', NULL, NULL, NULL, NULL),
(605, 2, 35, 9, 0, '', NULL, NULL, NULL, NULL),
(606, 2, 35, 10, 0, '', NULL, NULL, NULL, NULL),
(607, 2, 35, 15, 0, '', NULL, NULL, NULL, NULL),
(608, 2, 35, 16, 0, '', NULL, NULL, NULL, NULL),
(609, 2, 35, 17, 0, '', NULL, NULL, NULL, NULL),
(610, 2, 35, 18, 0, '', NULL, NULL, NULL, NULL),
(611, 2, 36, 25, 0, '', NULL, NULL, NULL, NULL),
(612, 2, 36, 26, 0, '', NULL, NULL, NULL, NULL),
(613, 2, 36, 27, 0, '', NULL, NULL, NULL, NULL),
(614, 2, 36, 28, 0, '', NULL, NULL, NULL, NULL),
(615, 2, 36, 29, 0, '', NULL, NULL, NULL, NULL),
(616, 2, 36, 0, 0, NULL, NULL, NULL, NULL, NULL),
(617, 2, 36, 6, 0, '', NULL, NULL, NULL, NULL),
(618, 2, 36, 7, 0, '', NULL, NULL, NULL, NULL),
(619, 2, 36, 8, 0, '', NULL, NULL, NULL, NULL),
(620, 2, 36, 9, 0, '', NULL, NULL, NULL, NULL),
(621, 2, 36, 10, 0, '', NULL, NULL, NULL, NULL),
(622, 2, 36, 15, 0, '', NULL, NULL, NULL, NULL),
(623, 2, 36, 16, 0, '', NULL, NULL, NULL, NULL),
(624, 2, 36, 17, 0, '', NULL, NULL, NULL, NULL),
(625, 2, 36, 18, 0, '', NULL, NULL, NULL, NULL),
(626, 1, 27, 32, 0, 'apple', NULL, NULL, NULL, NULL),
(627, 1, 27, 33, 0, 'steve', NULL, NULL, NULL, NULL),
(628, 1, 27, 34, 0, 'ceo', NULL, NULL, NULL, NULL),
(629, 1, 28, 32, 0, 'apple', NULL, NULL, NULL, NULL),
(630, 1, 28, 33, 0, 'steve', NULL, NULL, NULL, NULL),
(631, 1, 28, 34, 0, 'ceo', NULL, NULL, NULL, NULL),
(632, 1, 29, 32, 0, 'apple', NULL, NULL, NULL, NULL),
(633, 1, 29, 33, 0, 'steve', NULL, NULL, NULL, NULL),
(634, 1, 29, 34, 0, 'ceo', NULL, NULL, NULL, NULL),
(635, 1, 30, 32, 0, '', NULL, NULL, NULL, NULL),
(636, 1, 30, 33, 0, '', NULL, NULL, NULL, NULL),
(637, 1, 30, 34, 0, '', NULL, NULL, NULL, NULL),
(638, 1, 30, 35, 0, '', NULL, NULL, NULL, NULL),
(639, 1, 30, 31, 0, '', NULL, NULL, NULL, NULL),
(640, 2, 37, 25, 0, '', NULL, NULL, NULL, NULL),
(641, 2, 37, 26, 0, '', NULL, NULL, NULL, NULL),
(642, 2, 37, 27, 0, '', NULL, NULL, NULL, NULL),
(643, 2, 37, 28, 0, '', NULL, NULL, NULL, NULL),
(644, 2, 37, 29, 0, '', NULL, NULL, NULL, NULL),
(645, 2, 37, 0, 0, NULL, NULL, NULL, NULL, NULL),
(646, 2, 37, 6, 0, '', NULL, NULL, NULL, NULL),
(647, 2, 37, 7, 0, '', NULL, NULL, NULL, NULL),
(648, 2, 37, 8, 0, '', NULL, NULL, NULL, NULL),
(649, 2, 37, 9, 0, '', NULL, NULL, NULL, NULL),
(650, 2, 37, 10, 0, '', NULL, NULL, NULL, NULL),
(651, 2, 37, 15, 0, '', NULL, NULL, NULL, NULL),
(652, 2, 37, 16, 0, '', NULL, NULL, NULL, NULL),
(653, 2, 37, 17, 0, '', NULL, NULL, NULL, NULL),
(654, 2, 37, 18, 0, '', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `step_id` int(11) NOT NULL,
  `task` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `step_id`, `task`) VALUES
(1, 1, 'consulting'),
(2, 1, 'evaluation'),
(3, 1, 'coaching'),
(4, 2, 'interview preparation'),
(5, 2, 'cover letter writing workshop'),
(6, 2, 'Negotiating a Job Offer'),
(7, 2, 'Preparing Self Video'),
(8, 2, 'Simulation of a Job interview'),
(9, 0, 'Search Process'),
(10, 0, 'Referral Process\r\n'),
(11, 0, 'Waiting Process'),
(12, 0, 'Interviewing Process'),
(13, 0, 'Acceptance Process'),
(14, 3, 'Search Process'),
(15, 3, 'Referral Process\r\n'),
(16, 3, 'Waiting Process'),
(17, 3, 'Interviewing Process'),
(18, 3, 'Acceptance Process'),
(19, 4, 'Employed'),
(20, 4, 'Not Employed'),
(21, 4, 'On Hold'),
(22, 4, 'Rejected');

-- --------------------------------------------------------

--
-- Table structure for table `type_post`
--

CREATE TABLE IF NOT EXISTS `type_post` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL,
  `title` varchar(100) NOT NULL,
  `description_short` text NOT NULL,
  `description` text NOT NULL,
  `authorized` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `type_user`
--

CREATE TABLE IF NOT EXISTS `type_user` (
  `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,
  `role` set('user','admin','','') NOT NULL,
  `type` enum('tech-admin','system-admin','system-manager','user') NOT NULL DEFAULT 'user',
  `subtype` text,
  `status` enum('active','inactive') NOT NULL DEFAULT 'inactive',
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `password_new` varchar(255) DEFAULT NULL,
  `first_name` varchar(15) DEFAULT NULL,
  `last_name` varchar(15) DEFAULT NULL,
  `gender` set('male','female','','') NOT NULL,
  `martial_status` varchar(255) DEFAULT NULL,
  `education_status` set('student','graduate','intern','') DEFAULT NULL,
  `street_1` varchar(256) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `state` varchar(25) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `country` varchar(25) DEFAULT NULL,
  `phone_1` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `date_of_birth` timestamp NULL DEFAULT NULL,
  `registration` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `send_newsletters` tinyint(1) NOT NULL,
  `send_notifications` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `remember_token` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `send_newsletters` (`send_newsletters`),
  KEY `send_notifications` (`send_notifications`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `type_user`
--

INSERT INTO `type_user` (`id`, `role`, `type`, `subtype`, `status`, `email`, `password`, `password_new`, `first_name`, `last_name`, `gender`, `martial_status`, `education_status`, `street_1`, `city`, `state`, `zipcode`, `country`, `phone_1`, `mobile`, `date_of_birth`, `registration`, `last_login`, `send_newsletters`, `send_notifications`, `created_at`, `updated_at`, `remember_token`) VALUES
(21, '', 'user', 'employer', 'active', 'dorshoham88@gmail.com', '$2y$10$hFOaRGi/DJi69dy6j6cm.eZx75IqiuWToxG3OuLNOFw/wX8ARNRs2', NULL, 'Dor', 'Shoham', '', '', NULL, 'hahashmonaim 84', '', 'Georgia', '48489995', '', '', '', '0000-00-00 00:00:00', NULL, '2016-06-09 10:58:29', 0, 0, '2016-05-08 10:08:45', '2016-06-09 10:58:29', ''),
(25, '', 'user', 'jobseeker', 'inactive', 'dor@acade-me.co.il', '$2y$10$oILD96eADgiGA.bOApS3uu24Y/RQ8r5GDcqaXZYg9C88ZvP05mZUO', NULL, 'Dor', 'Shoham', 'male', 'single', 'student', '', 'atlanta', 'Georgia', '', 'USA', '', '0542037641', '0000-00-00 00:00:00', NULL, '2016-05-22 08:09:27', 0, 0, '2016-05-09 09:20:01', '2016-06-09 08:42:12', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
