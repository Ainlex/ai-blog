#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Función para mostrar el uso de recursos
show_resources() {
    echo -e "\n${GREEN}=== Uso de Recursos ===${NC}"
    echo -e "\n${YELLOW}Memoria:${NC}"
    free -h
    echo -e "\n${YELLOW}CPU:${NC}"
    top -bn1 | head -n 3
    echo -e "\n${YELLOW}Disco:${NC}"
    df -h /
}

# Función para mostrar logs del contenedor
show_logs() {
    echo -e "\n${GREEN}=== Últimos Logs ===${NC}"
    docker-compose logs --tail=50
}

# Función para verificar el estado del contenedor
check_container() {
    echo -e "\n${GREEN}=== Estado del Contenedor ===${NC}"
    docker-compose ps
}

# Función para limpiar recursos no utilizados
clean_resources() {
    echo -e "\n${GREEN}=== Limpiando Recursos ===${NC}"
    docker system prune -f
    docker image prune -f
}

# Menú principal
while true; do
    echo -e "\n${GREEN}=== Monitor de PromptLab ===${NC}"
    echo "1. Mostrar uso de recursos"
    echo "2. Ver logs"
    echo "3. Verificar estado del contenedor"
    echo "4. Limpiar recursos"
    echo "5. Reiniciar contenedor"
    echo "6. Salir"
    
    read -p "Selecciona una opción (1-6): " choice
    
    case $choice in
        1) show_resources ;;
        2) show_logs ;;
        3) check_container ;;
        4) clean_resources ;;
        5)
            echo -e "\n${YELLOW}Reiniciando contenedor...${NC}"
            docker-compose restart
            ;;
        6) 
            echo -e "\n${GREEN}¡Hasta luego!${NC}"
            exit 0
            ;;
        *)
            echo -e "\n${RED}Opción inválida${NC}"
            ;;
    esac
    
    read -p "Presiona Enter para continuar..."
done 