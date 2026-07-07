$r = Invoke-WebRequest -Uri 'https://boppfilmsale-new.vercel.app/api/data' -UseBasicParsing
$c = $r.Content
Write-Host ("Content length: " + $c.Length + " bytes")
if ($c.Contains('"id":183')) {
    Write-Host "✅ Product 183 found (Bops Sheets)"
} else {
    Write-Host "❌ Product 183 NOT found"
}
# Count product IDs
$matches = [regex]::Matches($c, '"id":(\d+)')
$ids = @()
foreach ($m in $matches) { $ids += $m.Groups[1].Value }
Write-Host ("Total products (by id count): " + $ids.Count)
$uniqueIds = $ids | Select-Object -Unique
Write-Host ("Unique IDs: " + $uniqueIds.Count)
Write-Host ("First 10 IDs: " + ($ids[0..9] -join ","))
