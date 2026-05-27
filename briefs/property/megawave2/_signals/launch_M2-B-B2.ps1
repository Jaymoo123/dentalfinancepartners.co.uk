$prompt = Get-Content -Raw 'C:\Users\user\Documents\Accounting\briefs\property\megawave2\_signals\prompt_M2-B-B2.txt'
claude --allow-dangerously-skip-permissions --dangerously-skip-permissions -- $prompt
