$r = Invoke-WebRequest -Uri 'https://boppfilmsale-new.vercel.app/api/data' -UseBasicParsing -TimeoutSec 45
$c = $r.Content
$idx = $c.IndexOf('"detailLink":"bopp-heatseal.html')
if ($idx -ge 0) {
  Write-Host "Found bopp-heatseal.html!"
  Write-Host $c.Substring([Math]::Max(0,$idx-300),500)
} else {
  Write-Host "bopp-heatseal.html NOT found as detailLink"
  # Try to find bopp-heatseal in the whole content
  $idx2 = $c.IndexOf('bopp-heatseal')
  if ($idx2 -ge 0) {
    Write-Host "Partial match at $idx2:"
    Write-Host $c.Substring([Math]::Max(0,$idx2-100),400)
  } else {
    Write-Host "bopp-heatseal not found anywhere in data"
  }
}
