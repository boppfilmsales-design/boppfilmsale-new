$imagePath = "C:\Users\DELL\Desktop\photo_2023-03-13_23-43-19.jpg"
$logoPath = "C:\Users\DELL\Desktop\files\东渐 LOGO.jpg"
$outPath = "C:\Users\DELL\Desktop\files\img_data.txt"

$imageBytes = [System.IO.File]::ReadAllBytes($imagePath)
$base64 = [Convert]::ToBase64String($imageBytes)
[System.IO.File]::WriteAllText($outPath, $base64)
Write-Host "Image converted to base64"
Write-Host "Length: $($base64.Length)"

$logoBytes = [System.IO.File]::ReadAllBytes($logoPath)
$logoBase64 = [Convert]::ToBase64String($logoBytes)
$logoOutPath = "C:\Users\DELL\Desktop\files\logo_data.txt"
[System.IO.File]::WriteAllText($logoOutPath, $logoBase64)
Write-Host "Logo converted to base64"
Write-Host "Length: $($logoBase64.Length)"