-- ============================================================================
-- ADD SOLICITORS TO GSC TABLE NICHE CONSTRAINTS
-- ============================================================================
-- Migration: 20260402000002_add_solicitors_to_gsc_constraints.sql
-- Date: 2026-04-02
-- Purpose: Update niche constraints on GSC tables to include 'solicitors'
-- ============================================================================

ALTER TABLE public.gsc_page_performance DROP CONSTRAINT IF EXISTS gsc_page_performance_niche_check;
ALTER TABLE public.gsc_page_performance ADD CONSTRAINT gsc_page_performance_niche_check
  CHECK (niche = ANY (ARRAY['property'::text, 'dentists'::text, 'medical'::text, 'solicitors'::text]));

ALTER TABLE public.blog_optimizations DROP CONSTRAINT IF EXISTS blog_optimizations_niche_check;
ALTER TABLE public.blog_optimizations ADD CONSTRAINT blog_optimizations_niche_check
  CHECK (niche = ANY (ARRAY['property'::text, 'dentists'::text, 'medical'::text, 'solicitors'::text]));

ALTER TABLE public.gsc_indexing_issues DROP CONSTRAINT IF EXISTS gsc_indexing_issues_niche_check;
ALTER TABLE public.gsc_indexing_issues ADD CONSTRAINT gsc_indexing_issues_niche_check
  CHECK (niche = ANY (ARRAY['property'::text, 'dentists'::text, 'medical'::text, 'solicitors'::text]));
