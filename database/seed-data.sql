-- EJ Tecnologia - Dump de dados para deploy
-- Gerado em: 04/07/2026
-- Usar: mysql -u USER -p BANCO < database/seed-data.sql
-- Resetar senha admin apos import via: php artisan tinker

-- MySQL dump 10.13  Distrib 8.0.44, for Linux (x86_64)
--
-- Host: localhost    Database: ej_tecnologia
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banners` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cta_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_link` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta2_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta2_link` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `layout` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'background',
  `stats` json DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'Tecnologia que resolve o problema certo.','Sistemas, automacoes, sites e APIs','Falar no WhatsApp','https://wa.me/5511987654321','Ver Serviços','servicos.html',NULL,NULL,'background','[{\"lbl\": \"Laravel, Symfony\", \"val\": \"PHP\"}]',1,1,'2026-07-02 01:02:11','2026-07-03 19:25:42'),(2,'SaaS, ERP, Automações e muito mais.','Do zero ao sistema completo — com CI/CD, APIs e metodologia ágil do início ao fim.','Conhecer Soluções!','servicos.html','Blog Técnico!!!','blog.html',NULL,'http://localhost/storage/uploads/banner/Qro96YFMGB8Wdy5mE10OsTdHoo8w8WeZiIcWTScU.png','right','[{\"lbl\": \"Laravel Python React\", \"val\": \"PHP\"}, {\"lbl\": \"Entregas continuas\", \"val\": \"CI/CD\"}, {\"lbl\": \"Driven development\", \"val\": \"IA\"}]',1,2,'2026-07-02 01:02:11','2026-07-03 19:05:15'),(3,'Você foca no negócio. A gente cuida da tecnologia.','Emerson Souza + Julio Cesar Leal — Dev Full-Stack e PM trabalhando pelo seu resultado.','Conheça a equipe!','/index.html#sobre','Ver Serviços!',NULL,NULL,'http://localhost/storage/uploads/banner/yajyjxE4hIsaFZ1uTaQESHCHu6vSpTuPD7jyMcNi.png','right',NULL,1,3,'2026-07-02 01:02:11','2026-07-03 17:50:05');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` bigint unsigned NOT NULL DEFAULT '0',
  `alt_text` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_hash` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `width` smallint unsigned DEFAULT NULL,
  `height` smallint unsigned DEFAULT NULL,
  `context` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'PHP-Elephant.png','uploads/banner/sGG73mR0RIdkX3MOoPZrF6999kWU3WCzgCXJRd3q.png','http://localhost/storage/uploads/banner/sGG73mR0RIdkX3MOoPZrF6999kWU3WCzgCXJRd3q.png',124281,NULL,NULL,NULL,NULL,'banner','2026-07-02 02:37:27','2026-07-02 02:37:27'),(2,'bot.png','uploads/banner/9pTQwPiGjkr4fmdnRaYJWwSilWNtc2dMu8GDnLsr.png','http://localhost/storage/uploads/banner/9pTQwPiGjkr4fmdnRaYJWwSilWNtc2dMu8GDnLsr.png',21821,NULL,NULL,NULL,NULL,'banner','2026-07-02 02:38:45','2026-07-02 02:38:45'),(3,'PHP-Elephant.png','uploads/post/8ye9AOPlMUc7jel9XbEJrHdFsCg9PU59axiGbkTH.png','http://localhost/storage/uploads/post/8ye9AOPlMUc7jel9XbEJrHdFsCg9PU59axiGbkTH.png',124281,NULL,NULL,NULL,NULL,'post','2026-07-02 02:39:15','2026-07-02 02:39:15'),(4,'Google_Calendar_icon_(2020).png','uploads/banner/rDpr5MFcfp9v3uL1vghPWzDn8HeIOq5CwdUKQSge.png','http://localhost/storage/uploads/banner/rDpr5MFcfp9v3uL1vghPWzDn8HeIOq5CwdUKQSge.png',54280,NULL,NULL,NULL,NULL,'banner','2026-07-02 16:33:35','2026-07-02 16:33:35'),(26,'wordpress-logo-stacked-rgb.png','uploads/banner/Qro96YFMGB8Wdy5mE10OsTdHoo8w8WeZiIcWTScU.png','http://localhost/storage/uploads/banner/Qro96YFMGB8Wdy5mE10OsTdHoo8w8WeZiIcWTScU.png',9306,NULL,NULL,NULL,NULL,'banner','2026-07-02 23:27:32','2026-07-02 23:27:32'),(27,'gmail-icon.png','uploads/banner/yajyjxE4hIsaFZ1uTaQESHCHu6vSpTuPD7jyMcNi.png','http://localhost/storage/uploads/banner/yajyjxE4hIsaFZ1uTaQESHCHu6vSpTuPD7jyMcNi.png',56394,NULL,NULL,NULL,NULL,'banner','2026-07-02 23:27:57','2026-07-02 23:27:57'),(31,'1761665161872.jpg','uploads/team_julio/EYnmnXTf5rcHDsHJbJ09kk7EB1rTjtO85YnEdYZP.jpg','http://localhost/storage/uploads/team_julio/EYnmnXTf5rcHDsHJbJ09kk7EB1rTjtO85YnEdYZP.jpg',23734,NULL,NULL,NULL,NULL,'team_julio','2026-07-04 00:19:06','2026-07-04 00:19:06'),(34,'013.jpeg','uploads/team_emerson/YUknQpa4vKCi4VBlWSz9hWk6ebTiN4JXyPjHXRRG.jpg','http://localhost/storage/uploads/team_emerson/YUknQpa4vKCi4VBlWSz9hWk6ebTiN4JXyPjHXRRG.jpg',100500,NULL,NULL,NULL,NULL,'team_emerson','2026-07-04 00:44:26','2026-07-04 00:44:26'),(35,'Google_Calendar_icon_(2020).png','uploads/post/G3VrLnL19hkGUIeqYTg305Lv9pVjTzGzKSDmwYKK.png','http://localhost/storage/uploads/post/G3VrLnL19hkGUIeqYTg305Lv9pVjTzGzKSDmwYKK.png',54280,NULL,NULL,NULL,NULL,'post','2026-07-04 00:45:44','2026-07-04 00:45:44');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2026_07_01_000000_create_users_and_tokens_table',1),(2,'2026_07_01_000001_create_banners_table',1),(3,'2026_07_01_000002_create_posts_table',1),(4,'2026_07_01_000003_create_settings_table',1),(5,'2026_07_01_000004_create_team_media_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (157,'App\\Models\\User',1,'admin-panel','3906c85775c188853b774ae8390a2e96a702a8fed1401e760b867c5e74ecc337','[\"*\"]','2026-07-04 13:15:11','2026-07-04 21:15:11','2026-07-04 13:15:11','2026-07-04 13:15:11'),(158,'App\\Models\\User',1,'admin-panel','d422eda0895e345a38687ac6926d2e34bdc2e81498fe09c22147def22c812053','[\"*\"]','2026-07-04 13:19:15','2026-07-04 21:15:11','2026-07-04 13:15:11','2026-07-04 13:19:15');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Emerson Souza',
  `read_time` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '5 min',
  `color` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#6C63FF',
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '1',
  `date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'O que é SaaS e por que pode transformar o seu negócio..........','o-que-e-saas-e-por-que-pode-transformar-o-seu-negocio','Automação','SaaS (Software as a Service)é um modelo onde você usa o software pela internet via assinatura. Entenda como funciona e quando faz sentido para o seu negócio..............','<p><a href=\"https://www.linkedin.com/feed/\"><strong>SaaS</strong> significa <em>Software as a Service</em> — Software como Serviço. Em vez de comprar e instalar um programa, você acessa pela internet e paga mensalmente.</a></p>\n<p>Exemplos que todos conhecem: Google Workspace, Spotify, Trello, Notion. Todos são SaaS.</p>\n<h3>Vantagens para quem usa</h3>\n<ul>\n  <li><strong>Sem investimento alto inicial</strong> — o cliente não precisa pagar R$ 20.000 de uma vez</li>\n  <li><strong>Sempre atualizado</strong> — recebe melhorias automaticamente</li>\n  <li><strong>Acesso de qualquer lugar</strong> — celular, tablet, notebook</li>\n  <li><strong>Sem manutenção</strong> — o fornecedor cuida de tudo</li>\n</ul>\n<h3>Vantagens para quem vende</h3>\n<ul>\n  <li><strong>Receita recorrente</strong> — você recebe todo mês, não só uma vez</li>\n  <li><strong>Escalável</strong> — a mesma plataforma serve centenas de clientes</li>\n  <li><strong>Fidelização natural</strong> — cliente que usa se acostuma e raramente cancela</li>\n</ul>\n<h3>Quando faz sentido construir um SaaS?</h3>\n<p>Quando você tem um processo repetitivo que outras empresas do mesmo segmento também têm. Exemplos: sistema de agendamento para salões, gestão de estoque para pequeno comércio, portal de clientes para prestadores de serviço.</p>\n<h3>Nossa stack para SaaS</h3>\n<p>Utilizamos <strong>PHP/Laravel</strong> no back-end, <strong>React ou Blade</strong> no front-end, <strong>MySQL</strong> como banco, e <strong>CI/CD com GitHub Actions</strong> para entregas frequentes e seguras.</p>','Emerson Souza','5 min','#6c63ff',NULL,NULL,1,'2026-07-01','2026-07-02 01:02:11','2026-07-03 16:38:13'),(2,'5 processos que você pode automatizar hoje com N8N','5-processos-que-voce-pode-automatizar-hoje-com-n8n','ERP','N8N é open source, self-hosted e gratuito. Veja 5 automações práticas que qualquer empresa pode implementar agora.','<p>O <strong>N8N</strong> conecta sistemas automaticamente — sem código ou com pouco código.</p><h3>5 automações práticas</h3><ol><li>Lembrete automático de agendamento via WhatsApp</li><li>Formulário → CRM + planilha + e-mail</li><li>Relatório diário automático</li><li>Notificação de novo pedido</li><li>Backup automático no Google Drive</li></ol>','Emerson Souza','5 min','#00d9ff',NULL,NULL,1,'2026-07-01','2026-07-02 01:02:11','2026-07-03 16:50:09'),(3,'CI/CD: o que é e por que todo projeto sério precisa','cicd-o-que-e-e-por-que-todo-projeto-serio-precisa','DevOps','CI/CD automatiza testes e deploy — cada mudança no código é entregue com segurança e rapidez.','<p><strong>CI/CD</strong> = Integração e Entrega Contínua. Push no código → testes automáticos → deploy automático.</p><h3>O que usamos</h3><p>GitHub Actions com PHPUnit para <strong>PHP com Laravel 13</strong> e Pytest para Python.</p><h3>Resultado</h3><p>Entregas toda semana, sem medo de quebrar o sistema.</p>','Emerson Souza','6 min','#10b981',NULL,NULL,1,'2026-07-01','2026-07-02 01:02:11','2026-07-03 17:11:05'),(6,'Tecnologia','tecnologia','DevOps','Tecnologia é o conjunto de conhecimentos, habilidades e ferramentas criado pelo ser humano para resolver problemas, otimizar processos e facilitar a vida diária. Abrange desde objetos simples, como uma cadeira, até sistemas complexos de inteligência artificial e telecomunicações','<p></p><ul><li><span><b>Tecnologia é o </b></span><span><b>conjunto de conhecimentos, habilidades e ferramentas criado pelo ser humano para resolver problemas, otimizar processos e facilitar a vida diária.</b></span></li></ul><div><br></div><ul><li><span> Abrange desde objetos simples, como uma cadeira, até sistemas complexos de inteligência artificial e telecomunicações</span><span>Tecnologia é o conjunto de conhecimentos, habilidades e ferramentas criado pelo ser humano para resolver problemas, otimizar processos e facilitar a vida diária.&nbsp;</span></li></ul><div><br></div><ul><li><span>Abrange desde objetos simples, como uma cadeira, até sistemas complexos de inteligência artificial e telecomunicações</span></li></ul><p></p>','Emerson Souza','5 min','#368149',NULL,'http://localhost/storage/uploads/post/G3VrLnL19hkGUIeqYTg305Lv9pVjTzGzKSDmwYKK.png',1,'2026-07-04','2026-07-04 00:45:44','2026-07-04 00:57:03');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

--
-- Table structure for table `service_cards`
--

DROP TABLE IF EXISTS `service_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_cards` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `icon` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '???',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tags` json DEFAULT NULL,
  `link` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `section` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'both',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_cards`
--

/*!40000 ALTER TABLE `service_cards` DISABLE KEYS */;
INSERT INTO `service_cards` VALUES (1,'🖥️','Sistemas e SaaS..','Plataformas web, CRM, ERP leve e portais de clientes...','[\"PHP\", \"PHP com Laravel\", \"React\", \"MySQL\", \"Python\"]',NULL,1,1,'2026-07-02 02:13:30','2026-07-04 00:08:37','both'),(2,'🌐','Sites e E-commerce','Sites institucionais, landing pages e lojas virtuais em WordPress + PHP, responsivos e com SEO.','\"[\\\"WordPress\\\",\\\"PHP\\\",\\\"WooCommerce\\\"]\"',NULL,1,2,'2026-07-02 02:13:30','2026-07-03 18:51:55','both'),(3,'📱','Aplicativos Mobile','Apps iOS e Android em React Native - uma base de codigo, duas plataformas, menor custo.','\"[\\\"React Native\\\",\\\"iOS\\\",\\\"Android\\\"]\"',NULL,1,3,'2026-07-02 02:13:30','2026-07-03 22:11:26','both'),(4,'🔌','Integracoes e APIs','Conectamos sistemas, criamos APIs REST em PHP com Laravel e integramos com qualquer plataforma.','\"[\\\"PHP com Laravel\\\",\\\"REST API\\\",\\\"Google\\\"]\"',NULL,1,4,'2026-07-02 02:13:30','2026-07-03 22:11:27','both'),(5,'🤖','Automacoes','Fluxos automaticos com N8N e Python. Google Workspace, bots de WhatsApp e relatorios sem intervencao manual.','\"[\\\"N8N\\\",\\\"Python\\\",\\\"Google Workspace\\\"]\"',NULL,1,5,'2026-07-02 02:13:30','2026-07-03 22:11:27','both'),(6,'☁️','Chatbots e IA','Atendimento automatico 24h com chatbots no WhatsApp ou site, com IA treinada nos dados do negocio.','\"[\\\"Python\\\",\\\"LLM\\\\/GPT\\\",\\\"WhatsApp API\\\"]\"',NULL,1,6,'2026-07-02 02:13:30','2026-07-03 22:11:27','both'),(7,'💬','DevOps e CI/CD','Entrega continua com GitHub Actions, Docker e metodologia agil - projetos que crescem sem virar caos.','\"[\\\"Docker\\\",\\\"CI\\\\/CD\\\",\\\"GitHub Actions\\\"]\"',NULL,1,7,'2026-07-02 02:13:30','2026-07-03 22:11:28','both'),(8,'🛡️','Consultoria de TI','Analise de stack, auditoria de sistemas e roadmap tecnico para decisoes mais rapidas e menos retrabalho.','\"[\\\"Diagn?stico\\\",\\\"Arquitetura\\\",\\\"Mentoria\\\"]\"',NULL,1,8,'2026-07-02 02:13:30','2026-07-03 22:11:28','both'),(9,'🖥','SaaS - Software como Servico..','Plataformas por assinatura: agendamento, gestao, controle de processos...','[\"PHP\", \"Laravel\", \"React\", \"MySQL\", \"Python\"]',NULL,1,1,'2026-07-03 23:33:13','2026-07-04 00:12:57','sistemas'),(10,'🏢','ERP Leve','Gestao empresarial: financeiro, estoque, pedidos, clientes e relatorios.','[\"PHP\", \"Laravel\", \"MySQL\"]',NULL,1,2,'2026-07-03 23:33:14','2026-07-03 23:33:14','sistemas'),(11,'👥','CRM','Gestao de clientes, pipeline de vendas e historico de relacionamento.','[\"PHP\", \"Laravel\", \"React\"]',NULL,1,3,'2026-07-03 23:33:14','2026-07-03 23:33:14','sistemas'),(12,'🔐','Portal do Cliente','Area logada onde clientes acompanham projetos, pedidos ou contratos.','[\"PHP\", \"Laravel\", \"Auth JWT\"]',NULL,1,4,'2026-07-03 23:33:15','2026-07-03 23:33:15','sistemas'),(13,'📝','Plataforma de Cursos (LMS)','Modulos, videos, progresso e certificados. PHP com Laravel + React.','[\"PHP\", \"Laravel\", \"React\"]',NULL,1,5,'2026-07-03 23:33:15','2026-07-03 23:33:15','sistemas'),(14,'📱','Aplicativo Mobile','Apps iOS e Android com React Native - uma base de codigo, duas plataformas.','[\"React Native\", \"iOS\", \"Android\"]',NULL,1,6,'2026-07-03 23:33:15','2026-07-03 23:33:15','sistemas'),(15,'🌐','Site Institucional..','Apresentacao profissional da empresa com SEO, responsivo e facil de atualizar...','[\"WordPress\", \"PHP\", \"SEO\", \"Python\"]',NULL,1,1,'2026-07-03 23:33:15','2026-07-04 00:14:04','sites'),(16,'🎯','Landing Page','Pagina de conversao com copy estrategico e CTA otimizado para lead.','[\"PHP\", \"WordPress\", \"CTA\"]',NULL,1,2,'2026-07-03 23:33:15','2026-07-03 23:33:15','sites'),(17,'🛒','E-commerce','Loja virtual com WordPress + WooCommerce. Pagamentos e painel de pedidos.','[\"WordPress\", \"WooCommerce\", \"PHP\"]',NULL,1,3,'2026-07-03 23:33:15','2026-07-03 23:33:15','sites'),(18,'📰','Blog Profissional','WordPress com tema otimizado para SEO, cache e velocidade para ranquear no Google.','[\"WordPress\", \"PHP\", \"SEO\"]',NULL,1,4,'2026-07-03 23:33:15','2026-07-03 23:33:15','sites'),(19,'🔗','Integracao com APIs Externas..','Google, Meta, Stripe, Twilio, PagSeguro, Mercado Pago e qualquer servico com API...','[\"PHP\", \"Laravel\", \"REST\", \"Python\"]',NULL,1,1,'2026-07-03 23:43:25','2026-07-04 00:14:49','apis'),(20,'⚙️','Desenvolvimento de API REST','APIs robustas para seus sistemas, parceiros ou apps consumirem dados com seguranca.','[\"PHP\", \"Laravel\", \"JWT\"]',NULL,1,2,'2026-07-03 23:43:29','2026-07-03 23:43:29','apis'),(21,'🔄','Conexao entre Sistemas','ERP + NF-e, site + CRM, app + back-end: conectamos o que precisa ser conectado.','[\"PHP\", \"Laravel\", \"MySQL\"]',NULL,1,3,'2026-07-03 23:43:30','2026-07-03 23:43:30','apis'),(22,'📡','Webhooks e Eventos','Notificacoes em tempo real entre plataformas - nada fica sem sync.','[\"PHP\", \"Webhooks\", \"N8N\"]',NULL,1,4,'2026-07-03 23:43:30','2026-07-03 23:43:30','apis'),(23,'🔧','Automacao com N8N..','Fluxos visuais que conectam ferramentas e disparam acoes automaticas...','[\"N8N\", \"Python\", \"APIs\", \"PHP\"]',NULL,1,1,'2026-07-03 23:43:30','2026-07-04 00:15:45','automacoes'),(24,'📊','Google Workspace','Automatizar Sheets, Drive, Gmail e Calendar para economizar horas por semana.','[\"Google\", \"Apps Script\", \"N8N\"]',NULL,1,2,'2026-07-03 23:43:30','2026-07-03 23:43:30','automacoes'),(25,'💬','Bot de WhatsApp','Atendimento automatico, triagem, respostas e agendamento pelo WhatsApp.','[\"WhatsApp\", \"PHP\", \"N8N\"]',NULL,1,3,'2026-07-03 23:43:30','2026-07-03 23:43:30','automacoes'),(26,'📈','Relatorios Automaticos','Dados que chegam no e-mail toda manha sem ninguem precisar montar.','[\"Python\", \"N8N\", \"PHP\"]',NULL,1,4,'2026-07-03 23:43:31','2026-07-03 23:43:31','automacoes'),(27,'🐳','Docker e Containers..','Ambientes identicos do dev ao producao - sem o classico funciona na minha maquina...','[\"Docker\", \"Linux\", \"PHP\", \"Python\"]',NULL,1,1,'2026-07-03 23:43:31','2026-07-04 00:16:58','devops'),(28,'🚀','CI/CD Automatizado','Deploy automatico a cada commit. GitHub Actions, pipelines e rollback em segundos.','[\"GitHub\", \"CI/CD\", \"Docker\"]',NULL,1,2,'2026-07-03 23:43:31','2026-07-03 23:43:31','devops'),(29,'🔒','Seguranca e Boas Praticas','Code review, testes automatizados, HTTPS, backup e monitoramento em todo projeto.','[\"PHP\", \"Laravel\", \"TDD\"]',NULL,1,3,'2026-07-03 23:43:31','2026-07-03 23:43:31','devops');
/*!40000 ALTER TABLE `service_cards` ENABLE KEYS */;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `group` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'text',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'--primary','#6c63ff','colors','color','2026-07-02 01:02:11','2026-07-04 01:23:28'),(2,'--secondary','#00d9ff','colors','color','2026-07-02 01:02:11','2026-07-04 01:23:28'),(3,'--bg','#0f0f1a','colors','color','2026-07-02 01:02:11','2026-07-04 01:23:28'),(4,'--surface','#1a1a2e','colors','color','2026-07-02 01:02:11','2026-07-04 01:23:28'),(5,'site_name','EJ TECNOLOGIA','content','text','2026-07-02 01:02:11','2026-07-03 19:33:07'),(6,'whatsapp','5511999999999','contact','text','2026-07-02 01:02:11','2026-07-02 01:02:11'),(7,'email','contato@ejtecnologia.com.br','contact','text','2026-07-02 01:02:11','2026-07-02 01:02:11'),(8,'home_services_title','Nossas Solucões.','content','text','2026-07-02 18:18:02','2026-07-03 19:33:54'),(9,'contact_whatsapp','5511932041318','content','text','2026-07-03 17:47:40','2026-07-03 18:21:19'),(10,'contact_email','emersonsouza8@hotmail.com','content','text','2026-07-03 17:47:40','2026-07-03 18:22:44'),(11,'footer_text',NULL,'content','text','2026-07-03 17:47:40','2026-07-04 00:20:46'),(12,'home_hero_tag','EJ Tecnologia — Dev + PM','content','text','2026-07-03 17:47:41','2026-07-03 17:51:34'),(13,'home_services_sub','Do sistema mais simples ao mais complexo — tecnologia que resolve o problema certo.','content','text','2026-07-03 17:47:41','2026-07-03 19:34:03'),(14,'home_method_title','Do problema a solucao em 4 passos...','content','text','2026-07-03 17:47:41','2026-07-03 19:34:21'),(15,'home_step1_title','1. Diagnostico...','content','text','2026-07-03 17:47:41','2026-07-03 19:34:21'),(16,'home_step1_desc','Entendemos a dor, o objetivo e o que precisa existir para resolver de verdade......','content','text','2026-07-03 17:47:41','2026-07-03 19:34:21'),(17,'home_step2_title','2. Proposta.','content','text','2026-07-03 17:47:41','2026-07-03 18:24:59'),(18,'home_step2_desc','Escopo fechado, prazo e valor definidos antes de comecar. Sem surpresa..','content','text','2026-07-03 17:47:41','2026-07-03 18:24:59'),(19,'home_step3_title','3. Desenvolvimento','content','text','2026-07-03 17:47:41','2026-07-03 18:05:01'),(20,'home_step3_desc','Entregas semanais com CI/CD. Voce acompanha o progresso o tempo todo.','content','text','2026-07-03 17:47:41','2026-07-03 18:05:01'),(21,'home_step4_title','4. Entrega.','content','text','2026-07-03 17:47:41','2026-07-03 18:25:33'),(22,'home_step4_desc','Treinamento, documentacao e suporte inclusos. Nao sumimos depois de entregar.','content','text','2026-07-03 17:47:41','2026-07-03 18:05:01'),(23,'home_about_title','Dev + PM — uma combinação rara.','content','text','2026-07-03 17:47:41','2026-07-03 19:35:44'),(24,'home_about_sub','Cada projeto tem um desenvolvedor que entende negócio e um PM que entende tecnologia..','content','text','2026-07-03 17:47:41','2026-07-03 19:35:44'),(25,'home_cta_title','Tem um problema que a tecnologia pode resolver?','content','text','2026-07-03 17:47:41','2026-07-03 17:47:41'),(26,'home_cta_sub','Em 15 minutos você sabe se temos uma solução — e quanto vai custar. Sem enrolação.','content','text','2026-07-03 17:47:41','2026-07-03 17:47:41'),(27,'serv_hero_title','Tecnologia certa para cada problema','content','text','2026-07-03 17:47:41','2026-07-03 17:47:41'),(28,'serv_hero_sub','Do sistema mais simples à plataforma mais complexa — construído com PHP, Laravel, React e Python.....','content','text','2026-07-03 17:47:41','2026-07-03 21:33:55'),(29,'blog_hero_title','Conteúdo técnico e de negócio','content','text','2026-07-03 17:47:41','2026-07-03 17:47:41'),(30,'blog_hero_sub','Artigos sobre sistemas, automações, SaaS, APIs, DevOps e como a tecnologia pode transformar o seu negócio.','content','text','2026-07-03 17:47:41','2026-07-03 17:47:41'),(31,'hero_stat1_val','PHP','content','text','2026-07-03 18:05:01','2026-07-03 18:24:58'),(32,'hero_stat1_lbl','Laravel Python React','content','text','2026-07-03 18:05:01','2026-07-03 18:05:01'),(33,'hero_stat2_val','CI/CD','content','text','2026-07-03 18:05:01','2026-07-03 18:05:01'),(34,'hero_stat2_lbl','Entregas continuas','content','text','2026-07-03 18:05:01','2026-07-03 18:05:01'),(35,'hero_stat3_val','IA','content','text','2026-07-03 18:05:01','2026-07-03 18:05:01'),(36,'hero_stat3_lbl','Driven development','content','text','2026-07-03 18:05:01','2026-07-03 18:05:01'),(37,'stack_items','PHP / PHP com Laravel|React / React Native|Python / FastAPI / Django|Java com Spring Boot|MySQL - SQL Server|Docker - CI/CD|N8N - Automacoes|WordPress - WooCommerce|IA / LLMs - Chatbots|Pyhon','content','text','2026-07-03 20:04:59','2026-07-03 20:37:17'),(38,'serv_s1_title','Desenvolvimento de Sistemas Web','content','text','2026-07-03 21:33:55','2026-07-03 21:33:55'),(39,'serv_s1_sub','Plataformas que trabalham por voce 24h por dia, construidas com PHP com Laravel, React e CI/CD desde o inicio.','content','text','2026-07-03 21:33:55','2026-07-03 21:33:55'),(52,'serv_s2_title','Sites e E-commerce','content','text','2026-07-03 21:33:55','2026-07-03 21:33:55'),(53,'serv_s2_sub','Feitos para atrair, convencer e converter - responsivos, rapidos e com SEO.','content','text','2026-07-03 21:33:55','2026-07-03 21:33:55'),(62,'serv_s3_title','Integracoes e APIs','content','text','2026-07-03 21:33:55','2026-07-03 21:33:55'),(63,'serv_s3_sub','Seus sistemas falando a mesma lingua - conectamos tudo com PHP com Laravel, Python ou N8N.','content','text','2026-07-03 21:33:55','2026-07-03 21:33:55'),(64,'serv_s4_title','Automacoes e Processos','content','text','2026-07-03 21:33:55','2026-07-03 21:33:55'),(65,'serv_s5_title','CI/CD e Boas Praticas','content','text','2026-07-03 21:33:55','2026-07-03 21:33:55'),(66,'serv_cta_title','Qual dessas solucoes faz sentido para voce?','content','text','2026-07-03 21:33:55','2026-07-03 21:33:55'),(67,'serv_cta_sub','Em 15 minutos de conversa a gente identifica o que resolve - e da uma estimativa de prazo e valor.','content','text','2026-07-03 21:33:55','2026-07-03 21:33:55'),(68,'--text','#f0f0ff','colors','text','2026-07-04 01:05:47','2026-07-04 01:23:28'),(69,'--accent','#ff6b6b','colors','text','2026-07-04 01:05:47','2026-07-04 01:23:28'),(70,'--success','#10b981','colors','text','2026-07-04 01:05:47','2026-07-04 01:23:28'),(71,'--wpp','#25d366','colors','text','2026-07-04 01:05:47','2026-07-04 01:23:28'),(72,'--primary-light','#8b83ff','colors','text','2026-07-04 01:13:03','2026-07-04 01:23:28'),(73,'--warning','#f59e0b','colors','text','2026-07-04 01:13:03','2026-07-04 01:23:28'),(74,'--surface2','#16213e','colors','text','2026-07-04 01:13:03','2026-07-04 01:23:28'),(75,'--surface3','#0d1117','colors','text','2026-07-04 01:13:03','2026-07-04 01:23:28'),(76,'--text-sec','#b0b8d0','colors','text','2026-07-04 01:13:03','2026-07-04 01:23:28'),(77,'--text-mut','#707890','colors','text','2026-07-04 01:13:03','2026-07-04 01:23:27'),(78,'--radius','12px','colors','text','2026-07-04 01:13:03','2026-07-04 01:13:03'),(79,'--radius-lg','18px','colors','text','2026-07-04 01:13:03','2026-07-04 01:13:03'),(80,'mail_host','smtp.gmail.com','mail','text',NULL,NULL),(81,'mail_port','587','mail','text',NULL,NULL),(82,'mail_encryption','tls','mail','text',NULL,NULL),(83,'mail_username','','mail','text',NULL,NULL),(84,'mail_password','','mail','text',NULL,NULL),(85,'mail_from_name','EJ Tecnologia','mail','text',NULL,NULL),(86,'mail_from_email','','mail','text',NULL,NULL),(87,'mail_to_emails','','mail','text',NULL,NULL);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_members` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `linkedin` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `photo_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo_url` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_members_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_members`
--

/*!40000 ALTER TABLE `team_members` DISABLE KEYS */;
INSERT INTO `team_members` VALUES (1,'emerson','Emerson Souza','Desenvolvedor Full-Stack · CTO.','Formado em Análise e Desenvolvimento de Sistemas. Trabalhou com múltiplos stacks em projetos de diferentes portes. PHP com Laravel, React, Python, Docker, CI/CD — da ideia ao deploy.','https://www.linkedin.com/in/emerson-souza-55994b13b/','[\"PHP\", \"PHP com Laravel\", \"React\", \"Python\", \"Docker\", \"CI/CD\", \"N8N\", \"APIs REST\", \"WordPress\"]',NULL,'http://localhost/storage/uploads/team_emerson/YUknQpa4vKCi4VBlWSz9hWk6ebTiN4JXyPjHXRRG.jpg',1,1,'2026-07-02 01:02:11','2026-07-04 01:04:57'),(2,'julio','Julio Cesar Souza Leal','Product Manager · COO','PM especializado em transformar problemas de negócio em soluções digitais que funcionam de verdade. É o elo entre o cliente e o desenvolvimento — garante que o que é construído resolve o problema certo.','https://www.linkedin.com/in/julio-cesar-souza-leal/','[\"Gestão de Produto\", \"Scrum\", \"Roadmap\", \"Stakeholders\", \"Requisitos\"]',NULL,'http://localhost/storage/uploads/team_julio/EYnmnXTf5rcHDsHJbJ09kk7EB1rTjtO85YnEdYZP.jpg',2,1,'2026-07-02 01:02:11','2026-07-04 01:04:58');
/*!40000 ALTER TABLE `team_members` ENABLE KEYS */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Emerson Souza','admin@ejtecnologia.com.br','$2y$12$1fFZ8HUUwjCNTlt6HhkC2OJf3.xLCyN7t7DzWkbvp2ASIcakq.6Mi','admin',NULL,NULL,'2026-07-02 01:02:10','2026-07-04 12:28:24'),(2,'Julio Cezar nada Leal','juliussth@gmail.com','$2y$12$RQt/eQIEQawL3.yhJbtyjuGF4Het4mJCUY2V7yLWHyfqwReJzqEpa','admin',NULL,NULL,'2026-07-04 01:50:19','2026-07-04 01:50:19'),(3,'Ivan Lanza','ivan@gmail.com','$2y$12$LHKmz/qvZz89B6WBerMWhO/bF7vxDIZhz/r01QYC8qQY1TNqkScX6','colaborador',NULL,NULL,'2026-07-04 01:53:01','2026-07-04 01:53:01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-04 13:38:02
