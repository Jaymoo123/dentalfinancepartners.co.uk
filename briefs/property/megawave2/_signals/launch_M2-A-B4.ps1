$prompt = Get-Content -Raw 'C:\Users\user\Documents\Accounting\briefs\property\megawave2\_signals\prompt_M2-A-B4.txt'
claude --allow-dangerously-skip-permissions --dangerously-skip-permissions -- $prompt
