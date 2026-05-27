$prompt = Get-Content -Raw 'C:\Users\user\Documents\Accounting\briefs\property\megawave3\_signals\prompt_M3-B-B1.txt'
claude --allow-dangerously-skip-permissions --dangerously-skip-permissions -- $prompt
