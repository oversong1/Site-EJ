<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Banner;
use App\Models\Post;
use App\Models\Setting;
use App\Models\TeamMember;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── 1. Usuário admin
        User::firstOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@ejtecnologia.com.br')],
            [
                'name'     => 'Administrador',
                'password' => Hash::make(env('ADMIN_PASSWORD', 'ej@admin2026')),
                'role'     => 'admin',
            ]
        );

        // ── 2. Banners iniciais
        if (Banner::count() === 0) {
            Banner::insert([
                ['title' => 'Tecnologia que resolve o problema certo.', 'subtitle' => 'Sistemas, automações, sites e APIs feitos sob medida para o seu negócio crescer.', 'cta_text' => 'Falar no WhatsApp', 'cta_link' => 'https://wa.me/5511999999999', 'cta2_text' => 'Ver Serviços', 'cta2_link' => '/servicos.html', 'active' => true, 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
                ['title' => 'SaaS, ERP, Automações e muito mais.', 'subtitle' => 'Do zero ao sistema completo — PHP com Laravel 13, CI/CD e metodologia ágil.', 'cta_text' => 'Conhecer Soluções', 'cta_link' => '/servicos.html', 'cta2_text' => 'Blog Técnico', 'cta2_link' => '/blog.html', 'active' => true, 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
                ['title' => 'Você foca no negócio. A gente cuida da tecnologia.', 'subtitle' => 'Emerson Souza + Julio Cesar Leal — Dev Full-Stack e PM trabalhando pelo seu resultado.', 'cta_text' => 'Conheça a equipe', 'cta_link' => '/index.html#sobre', 'cta2_text' => '', 'cta2_link' => '', 'active' => true, 'order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ]);
        }

        // ── 3. Posts iniciais
        if (Post::count() === 0) {
            Post::insert([
                ['title' => 'O que é SaaS e por que pode transformar o seu negócio', 'slug' => 'o-que-e-saas', 'category' => 'Sistemas', 'author' => 'Emerson Souza', 'read_time' => '5 min', 'color' => '#6C63FF', 'published' => true, 'date' => '2026-07-01', 'excerpt' => 'SaaS (Software as a Service) é o modelo onde você usa o software pela internet via assinatura mensal — sem instalar nada.', 'content' => '<p><strong>SaaS</strong> significa Software as a Service. Em vez de instalar, você acessa pela internet e paga mensalmente.</p><h3>Vantagens para quem vende</h3><ul><li><strong>Receita recorrente</strong> — você recebe todo mês</li><li><strong>Escalável</strong> — mesma plataforma, centenas de clientes</li></ul><h3>Nossa stack</h3><p>Desenvolvemos SaaS em <strong>PHP com Laravel 13</strong> + React + MySQL com CI/CD via GitHub Actions.</p>', 'created_at' => now(), 'updated_at' => now()],
                ['title' => '5 processos que você pode automatizar hoje com N8N', 'slug' => '5-automacoes-n8n', 'category' => 'Automação', 'author' => 'Emerson Souza', 'read_time' => '4 min', 'color' => '#00D9FF', 'published' => true, 'date' => '2026-07-01', 'excerpt' => 'N8N é open source, self-hosted e gratuito. Veja 5 automações práticas que qualquer empresa pode implementar agora.', 'content' => '<p>O <strong>N8N</strong> conecta sistemas automaticamente — sem código ou com pouco código.</p><h3>5 automações práticas</h3><ol><li>Lembrete automático de agendamento via WhatsApp</li><li>Formulário → CRM + planilha + e-mail</li><li>Relatório diário automático</li><li>Notificação de novo pedido</li><li>Backup automático no Google Drive</li></ol>', 'created_at' => now(), 'updated_at' => now()],
                ['title' => 'CI/CD: o que é e por que todo projeto sério precisa', 'slug' => 'o-que-e-cicd', 'category' => 'DevOps', 'author' => 'Emerson Souza', 'read_time' => '6 min', 'color' => '#10B981', 'published' => true, 'date' => '2026-07-01', 'excerpt' => 'CI/CD automatiza testes e deploy — cada mudança no código é entregue com segurança e rapidez.', 'content' => '<p><strong>CI/CD</strong> = Integração e Entrega Contínua. Push no código → testes automáticos → deploy automático.</p><h3>O que usamos</h3><p>GitHub Actions com PHPUnit para <strong>PHP com Laravel 13</strong> e Pytest para Python.</p><h3>Resultado</h3><p>Entregas toda semana, sem medo de quebrar o sistema.</p>', 'created_at' => now(), 'updated_at' => now()],
            ]);
        }

        // ── 4. Equipe
        if (TeamMember::count() === 0) {
            TeamMember::insert([
                ['key' => 'emerson', 'name' => 'Emerson Souza', 'role' => 'Desenvolvedor Full-Stack · CTO', 'bio' => 'Formado em Análise e Desenvolvimento de Sistemas. PHP com Laravel, React, Python, Docker, CI/CD e N8N.', 'linkedin' => 'https://www.linkedin.com/in/emerson-souza-55994b13b/', 'order' => 1, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
                ['key' => 'julio',   'name' => 'Julio Cesar Souza Leal', 'role' => 'Product Manager · COO', 'bio' => 'PM especializado em transformar problemas de negócio em soluções digitais que funcionam de verdade.', 'linkedin' => 'https://www.linkedin.com/in/julio-cesar-souza-leal/', 'order' => 2, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ]);
        }

        // ── 5. Configurações padrão
        if (Setting::count() === 0) {
            $defaults = [
                ['key' => '--primary',   'value' => '#6C63FF', 'group' => 'colors', 'type' => 'color'],
                ['key' => '--secondary', 'value' => '#00D9FF', 'group' => 'colors', 'type' => 'color'],
                ['key' => '--bg',        'value' => '#0F0F1A', 'group' => 'colors', 'type' => 'color'],
                ['key' => '--surface',   'value' => '#1A1A2E', 'group' => 'colors', 'type' => 'color'],
                ['key' => 'site_name',   'value' => 'EJ Tecnologia', 'group' => 'general', 'type' => 'text'],
                ['key' => 'whatsapp',    'value' => '5511999999999', 'group' => 'contact', 'type' => 'text'],
                ['key' => 'email',       'value' => 'contato@ejtecnologia.com.br', 'group' => 'contact', 'type' => 'text'],
            ];
            foreach ($defaults as $s) {
                Setting::create(array_merge($s, ['created_at' => now(), 'updated_at' => now()]));
            }
        }
    }
}
