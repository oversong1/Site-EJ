#!/bin/bash
# ============================================================
# EJ Tecnologia — Script de import do banco no servidor
# Uso: bash database/import.sh
# ============================================================

echo "=== EJ Tecnologia — Import do Banco ==="
echo ""

# Solicita credenciais
read -p "Host MySQL (padrão: localhost): " DB_HOST
DB_HOST=${DB_HOST:-localhost}

read -p "Nome do banco: " DB_NAME
read -p "Usuário MySQL: " DB_USER
read -s -p "Senha MySQL: " DB_PASS
echo ""

# Confirma
echo ""
echo "Vai importar para: $DB_USER@$DB_HOST/$DB_NAME"
read -p "Confirmar? (s/N): " CONFIRM
if [ "$CONFIRM" != "s" ] && [ "$CONFIRM" != "S" ]; then
  echo "Cancelado."
  exit 0
fi

# Importa
echo "Importando..."
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$(dirname "$0")/seed-data.sql"

if [ $? -eq 0 ]; then
  echo ""
  echo "[OK] Banco importado com sucesso!"
  echo ""
  echo "PRÓXIMOS PASSOS:"
  echo "  1. Acesse o admin e verifique os dados"
  echo "  2. Redefina a senha do admin:"
  echo "     php artisan tinker"
  echo "     > App\\Models\\User::find(1)->update(['password' => Hash::make('NOVA_SENHA')]);"
  echo "  3. Configure o .env com as credenciais de produção"
else
  echo "[ERRO] Falha ao importar. Verifique as credenciais."
  exit 1
fi
