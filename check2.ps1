$c = Invoke-WebRequest -Uri 'https://boppfilmsale-new.vercel.app/api/data' -UseBasicParsing | Select-Object -ExpandProperty Content
$len = $c.Length
Write-Host ("Content length: " + $len)
if ($c.Contains('"id":183')) {
    Write-Host "✅ Product 183 found (Bops Sheets)"
} else {
    Write-Host "❌ Product 183 NOT found"
}
# Use substring to count
$cnt = 0
$pos = 0
while (($pos = $c.IndexOf('"id":', $pos)) -ge 0) {
    $cnt++
    $pos += 5
    if ($pos -gt $len) { break }
    if ($cnt -ge 175) { break }
}
Write-Host ("Total id: count: " + $cnt)
