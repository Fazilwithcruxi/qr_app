$ErrorActionPreference = "Stop"

Write-Host "Starting all services..."

Start-Process powershell -ArgumentList "-Command","cd services/api-gateway; npm install; npm start"
Start-Process powershell -ArgumentList "-Command","cd services/auth-service; npm install; npm start"
Start-Process powershell -ArgumentList "-Command","cd services/product-service; npm install; npm start"
Start-Process powershell -ArgumentList "-Command","cd services/generator-service; npm install; npm start"
Start-Process powershell -ArgumentList "-Command","cd client; npm run dev"

Write-Host "Services started!"
