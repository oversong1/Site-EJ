<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;

class ContactController extends Controller
{
    /**
     * Envia e-mail de contato usando config SMTP armazenada no banco.
     * Rota pública: POST /api/contact
     */
    public function send(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:150',
            'email'   => 'required|email|max:200',
            'service' => 'nullable|string|max:100',
            'message' => 'required|string|max:3000',
        ]);

        // Lê configurações do banco
        $settings = Setting::whereIn('key', [
            'mail_host', 'mail_port', 'mail_encryption',
            'mail_username', 'mail_password',
            'mail_from_email', 'mail_from_name',
            'mail_to_emails',
        ])->pluck('value', 'key');

        $host       = $settings->get('mail_host')       ?: env('MAIL_HOST',       'smtp.gmail.com');
        $port       = $settings->get('mail_port')       ?: env('MAIL_PORT',       '587');
        $encryption = $settings->get('mail_encryption') ?: env('MAIL_ENCRYPTION', 'tls');
        $username   = $settings->get('mail_username')   ?: env('MAIL_USERNAME',   '');
        $password   = $settings->get('mail_password')   ?: env('MAIL_PASSWORD',   '');
        $fromEmail  = $settings->get('mail_from_email') ?: env('MAIL_FROM_ADDRESS', $username);
        $fromName   = $settings->get('mail_from_name')  ?: env('MAIL_FROM_NAME',  'EJ Tecnologia');
        $toEmails   = $settings->get('mail_to_emails')  ?: env('MAIL_TO',         $username);

        // Configura mailer dinamicamente com os dados do banco
        Config::set('mail.mailers.smtp.host',       $host);
        Config::set('mail.mailers.smtp.port',       (int) $port);
        Config::set('mail.mailers.smtp.encryption', $encryption ?: null);
        Config::set('mail.mailers.smtp.username',   $username);
        Config::set('mail.mailers.smtp.password',   $password);
        Config::set('mail.from.address',            $fromEmail);
        Config::set('mail.from.name',               $fromName);

        // Destinatários (múltiplos separados por vírgula)
        $recipients = array_filter(array_map('trim', explode(',', $toEmails)));
        if (empty($recipients)) {
            return response()->json(['message' => 'Nenhum destinatário configurado.'], 500);
        }

        // Monta o e-mail
        $subject = 'Novo contato via site — ' . $data['name'];
        $body    = $this->buildEmailBody($data, $fromName);

        try {
            Mail::raw($body, function ($mail) use ($recipients, $subject, $data, $fromEmail, $fromName) {
                $mail->to($recipients)
                     ->replyTo($data['email'], $data['name'])
                     ->subject($subject);
            });

            return response()->json(['message' => 'Mensagem enviada com sucesso!']);
        } catch (\Exception $e) {
            \Log::error('ContactController: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao enviar e-mail. Verifique as configurações SMTP.'], 500);
        }
    }

    /**
     * Verifica se as configurações SMTP estão válidas (usado pelo admin).
     */
    public function test(Request $request)
    {
        $request->validate(['to' => 'required|email']);

        // Mesmo processo de configuração dinâmica
        $settings = Setting::whereIn('key', [
            'mail_host','mail_port','mail_encryption','mail_username','mail_password','mail_from_email','mail_from_name',
        ])->pluck('value', 'key');

        Config::set('mail.mailers.smtp.host',       $settings->get('mail_host',       'smtp.gmail.com'));
        Config::set('mail.mailers.smtp.port',       (int)($settings->get('mail_port', '587')));
        Config::set('mail.mailers.smtp.encryption', $settings->get('mail_encryption', 'tls') ?: null);
        Config::set('mail.mailers.smtp.username',   $settings->get('mail_username',   ''));
        Config::set('mail.mailers.smtp.password',   $settings->get('mail_password',   ''));
        Config::set('mail.from.address',            $settings->get('mail_from_email', ''));
        Config::set('mail.from.name',               $settings->get('mail_from_name',  'EJ Tecnologia'));

        try {
            Mail::raw("Teste de configuração SMTP — EJ Tecnologia\n\nSe recebeu este e-mail, as configurações estão corretas!", function ($mail) use ($request) {
                $mail->to($request->to)->subject('Teste SMTP — EJ Tecnologia');
            });
            return response()->json(['message' => 'E-mail de teste enviado para ' . $request->to]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro: ' . $e->getMessage()], 500);
        }
    }

    private function buildEmailBody(array $data, string $fromName): string
    {
        $service = $data['service'] ? "\nServiço: " . $data['service'] : '';
        return "Novo contato recebido via {$fromName}\n"
             . str_repeat('-', 40) . "\n"
             . "Nome:    {$data['name']}\n"
             . "E-mail:  {$data['email']}{$service}\n\n"
             . "Mensagem:\n{$data['message']}\n"
             . str_repeat('-', 40) . "\n"
             . "Responder para: {$data['email']}";
    }
}
