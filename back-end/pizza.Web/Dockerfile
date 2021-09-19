#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["pizza.Web/pizza.Web.csproj", "pizza.Web/"]
COPY ["pizza.Data/pizza.Data.csproj", "pizza.Data/"]
RUN dotnet restore "pizza.Web/pizza.Web.csproj"
COPY . .
WORKDIR "/src/pizza.Web"

RUN dotnet dev-certs https -ep aspnetapp.pfx -p crypticpassword

RUN dotnet build "pizza.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "pizza.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build /src/pizza.Web/aspnetapp.pfx aspnetapp.pfx
ENTRYPOINT ["dotnet", "pizza.Web.dll"]