"""Extract the BLUF plan markdown from the workflow output JSON, unescape HTML
entities, and write the reference doc. One-shot scratch helper."""
import json, html, pathlib

OUT = pathlib.Path(r"C:\Users\user\AppData\Local\Temp\claude\C--Users-user-Documents-Accounting\875a0b53-9e6b-43be-8f49-8db849c855bd\tasks\w6lfdu2yz.output")
DOC = pathlib.Path(r"C:\Users\user\Documents\Accounting\docs\property\bluf_program_plan.md")

data = json.loads(OUT.read_text(encoding="utf-8"))
res = data.get("result", data)
md = html.unescape(res["plan_markdown"])

# Append the structured open_decisions / resume_tomorrow if not obviously present.
extra = []
if res.get("open_decisions"):
    extra.append("\n\n---\n\n## Appendix: Open decisions (structured)\n")
    extra += [f"- {html.unescape(x)}" for x in res["open_decisions"]]
if res.get("resume_tomorrow"):
    extra.append("\n\n## Appendix: Resume-tomorrow checklist (structured)\n")
    extra += [f"{i+1}. {html.unescape(x)}" for i, x in enumerate(res["resume_tomorrow"])]

DOC.write_text(md + "\n".join(extra) + "\n", encoding="utf-8")
print(f"Wrote {DOC} ({len(md)} chars markdown, {len(res.get('open_decisions',[]))} open decisions, {len(res.get('resume_tomorrow',[]))} resume steps)")
print("\n=== OPEN DECISIONS ===")
for x in res.get("open_decisions", []):
    print(" -", html.unescape(x))
print("\n=== RESUME TOMORROW ===")
for i, x in enumerate(res.get("resume_tomorrow", [])):
    print(f" {i+1}.", html.unescape(x))
