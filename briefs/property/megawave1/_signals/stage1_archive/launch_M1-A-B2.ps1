$prompt = Get-Content -Raw 'C:\Users\user\Documents\Accounting\briefs\property\megawave1\_signals\prompt_M1-A-B2.txt'
claude --dangerously-skip-permissions $prompt
