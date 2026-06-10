$prompt = Get-Content -Raw 'C:\Users\user\Documents\Accounting\briefs\property\megawave1\_signals\prompt_M1-B-B3.txt'
claude --allow-dangerously-skip-permissions --dangerously-skip-permissions -- $prompt
