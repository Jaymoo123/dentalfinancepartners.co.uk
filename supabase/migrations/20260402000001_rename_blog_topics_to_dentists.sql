-- ============================================================================
-- RENAME blog_topics TO blog_topics_dentists
-- ============================================================================
-- Migration: 20260402000001_rename_blog_topics_to_dentists.sql
-- Date: 2026-04-02
-- Purpose: Rename Dentists blog topics table for naming consistency
--          All niches now follow blog_topics_{niche} pattern
-- ============================================================================

ALTER TABLE public.blog_topics RENAME TO blog_topics_dentists;

ALTER POLICY anon_read_blog_topics ON public.blog_topics_dentists RENAME TO anon_read_blog_topics_dentists;
ALTER POLICY authenticated_read_blog_topics ON public.blog_topics_dentists RENAME TO authenticated_read_blog_topics_dentists;

COMMENT ON TABLE public.blog_topics_dentists IS 'Blog topics for Dentists niche with content tree metadata';
