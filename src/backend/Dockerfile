# Usar imagem SDK para permitir 'dotnet run'
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /app

# Copiar csproj e restaurar dependências (cache)
COPY *.csproj ./
RUN dotnet restore

# Copiar todo o restante do projeto
COPY . ./

# Expor porta 5000
EXPOSE 5000

# Comando de execução
CMD ["dotnet", "run", "--urls", "http://+:5000"]
