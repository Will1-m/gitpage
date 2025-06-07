# rename-files.ps1 (colócalo en …\dist\ junto a la carpeta img\)

# 1. Renombrar carpetas de más profundas a menos
Get-ChildItem .\img -Recurse -Directory -Exclude 'rename-files.ps1' |
Sort-Object FullName -Descending |
ForEach-Object {
  $oldPath = $_.FullName
  $newName = $_.Name.ToLower() -replace ' ', '_' -replace '[\(\)]', ''
  if ($_.Name -ne $newName) {
    Rename-Item -LiteralPath $oldPath -NewName $newName
    Write-Host "Carpeta: $oldPath → $newName"
  }
}

# 2. Renombrar archivos
Get-ChildItem .\img -Recurse -File -Exclude 'rename-files.ps1' |
ForEach-Object {
  $oldPath = $_.FullName
  $dir = $_.DirectoryName
  $newName = $_.Name.ToLower() -replace ' ', '_' -replace '[\(\)]', ''
  $newPath = Join-Path $dir $newName
  if ($oldPath -ne $newPath) {
    Rename-Item -LiteralPath $oldPath -NewName $newName
    Write-Host "Archivo: $oldPath → $newName"
  }
}
