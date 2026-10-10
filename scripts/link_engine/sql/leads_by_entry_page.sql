-- link_engine stage 06b: leads aggregated by entry page. Run through the Supabase
-- connector (no REST keys in cloud sessions). Aggregates only: never select names,
-- emails, phones, messages, rationale, intent_line, extras, visitor_id or session_id
-- (session_id is used in the join only). Replace :site, :from, :to_excl.
-- Output is one CSV string plus its md5; the saved file must reproduce the md5
-- (md5 of the body lines joined by \n, no header, no trailing newline).
with l as (
  select ws.entry_path, s.est_value_gbp, s.intent, s.tier
  from leads l
  left join web_sessions ws on ws.session_id = l.session_id
  left join lead_value_scores s on s.lead_id = l.id
  where l.source = :site and coalesce(l.is_test,false) = false
    and l.created_at >= :from and l.created_at < :to_excl
), g as (
  select coalesce(split_part(entry_path,'?',1),'(no session match)') p, count(*) n, count(est_value_gbp) sc, coalesce(sum(est_value_gbp),0) v,
   count(*) filter (where tier in ('very_high','high')) hi,
   count(*) filter (where intent='incorporation') i_inc, count(*) filter (where intent='structure') i_str, count(*) filter (where intent='cgt') i_cgt,
   count(*) filter (where intent='sdlt') i_sdlt, count(*) filter (where intent='compliance') i_comp, count(*) filter (where intent='nrl_expat') i_nrl,
   count(*) filter (where intent in ('vat','other','unknown')) i_oth, count(*) filter (where intent is null) i_unsc
  from l group by 1)
select count(*) rows, sum(n) leads, sum(v) value, md5(string_agg(line, E'\n' order by p)) md5, string_agg(line, E'\n' order by p) csv from (
 select p, concat_ws(',', p, n, sc, v, hi, i_inc, i_str, i_cgt, i_sdlt, i_comp, i_nrl, i_oth, i_unsc) line from g) x;
-- CSV header: entry_path,leads,scored,est_value_gbp,high_tier,i_incorporation,i_structure,i_cgt,i_sdlt,i_compliance,i_nrl_expat,i_other,i_unscored
