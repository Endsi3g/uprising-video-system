$baseUrl = "http://localhost:3000/api"

function Test-Endpoint {
    param($method, $path, $body)
    Write-Host "Testing $method $path..." -ForegroundColor Cyan
    try {
        $params = @{
            Method = $method
            Uri = "$baseUrl$path"
            ContentType = "application/json"
        }
        if ($body) {
            $params.Body = $body | ConvertTo-Json
        }
        $response = Invoke-RestMethod @params
        Write-Host "Success!" -ForegroundColor Green
        $response | Format-List | Out-String | Write-Host
    } catch {
        Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails) {
            Write-Host "Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
        }
    }
    Write-Host ("-" * 40)
}

# 1. Test YouTube Ingestion
Test-Endpoint -method "POST" -path "/ingest/youtube" -body @{
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}

# 2. Test Instagram Ingestion (Requires access token)
# Test-Endpoint -method "POST" -path "/ingest/instagram" -body @{
#     accessToken = "YOUR_ACCESS_TOKEN"
#     url = "https://www.instagram.com/reels/C4p_XmTM..."
# }

# 3. Test Script Generation (Requires a valid videoId from previous step)
Write-Host "To test script generation, copy a video ID from the YouTube ingestion output and run:" -ForegroundColor Yellow
Write-Host ".\test-api.ps1 -videoId 'YOUR-UUID'" -ForegroundColor Yellow

param([string]$videoId)
if ($videoId) {
    Test-Endpoint -method "POST" -path "/ai/generate-script" -body @{
        videoId = $videoId
        template = "viral_reel"
    }
}
