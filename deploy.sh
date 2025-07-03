#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Iniciando despliegue de PromptLab...${NC}"

# Actualizar sistema
echo -e "${GREEN}Actualizando sistema...${NC}"
sudo apt-get update
sudo apt-get upgrade -y

# Instalar dependencias necesarias
echo -e "${GREEN}Instalando dependencias...${NC}"
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Instalar Docker si no está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${GREEN}Instalando Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Instalar Docker Compose si no está instalado
if ! command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}Instalando Docker Compose...${NC}"
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Crear directorio de la aplicación si no existe
mkdir -p ~/promptlab
cd ~/promptlab

# Copiar archivos necesarios (asumiendo que están en el directorio actual)
echo -e "${GREEN}Copiando archivos de configuración...${NC}"
cp -r .env* docker-compose.yml Dockerfile ./

# Detener contenedores existentes
echo -e "${GREEN}Deteniendo contenedores existentes...${NC}"
docker-compose down

# Limpiar imágenes antiguas
echo -e "${GREEN}Limpiando imágenes antiguas...${NC}"
docker image prune -f

# Construir y levantar contenedores
echo -e "${GREEN}Construyendo y levantando contenedores...${NC}"
docker-compose up -d --build

# Verificar estado
echo -e "${GREEN}Verificando estado de los contenedores...${NC}"
docker-compose ps

# Mostrar logs
echo -e "${GREEN}Mostrando logs (presiona Ctrl+C para salir)...${NC}"
docker-compose logs -f

# Instrucciones finales
echo -e "${GREEN}Despliegue completado!${NC}"
echo -e "Para ver los logs: ${GREEN}docker-compose logs -f${NC}"
echo -e "Para reiniciar: ${GREEN}docker-compose restart${NC}"
echo -e "Para detener: ${GREEN}docker-compose down${NC}" 