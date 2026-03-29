# Property Niche - Design Differentiation Strategy

**Date:** March 28, 2026  
**Problem:** Current Property site is structurally identical to Dentists (Google duplicate content risk)  
**Solution:** Distinct visual identity + layout variations while keeping shared component architecture

---

## PROBLEM ANALYSIS

### Current Similarities (TOO SIMILAR)
1. **Identical HTML structure** - Same section order, same div nesting
2. **Same layout patterns** - Hero → Trust stats → Reality points → How we work
3. **Same visual rhythm** - Card grids, numbered lists, table layouts
4. **Same typography hierarchy** - H1/H2/H3 sizes, font pairings
5. **Same spacing system** - Section padding, card gaps
6. **Same component patterns** - Rounded corners, border styles, shadows

**Google's View:**
- Sees identical DOM structure with different text
- Flags as "thin content" or "duplicate template"
- May not index both sites properly
- Could penalize both for low-quality content

---

## DIFFERENTIATION STRATEGY

### Core Principle
**Keep shared components, vary:**
1. **Layout order** (different section sequences)
2. **Visual density** (data-heavy vs. editorial)
3. **Color psychology** (trust vs. growth)
4. **Typography scale** (conservative vs. bold)
5. **Component composition** (different combinations)

---

## VISUAL IDENTITY COMPARISON

### Dentists (Current)
**Psychology:** Trust, professionalism, clinical precision  
**Audience:** Healthcare professionals (risk-averse, detail-oriented)  
**Tone:** Consultative, measured, professional

**Design Language:**
- **Colors:** Navy (#001B3D) + Gold (#B8975D) - "Trust + Premium"
- **Hero:** Dark gradient (160deg, deep navy) with soft gold radial overlay
- **Typography:** Serif headings (Cormorant), sans body (Plus Jakarta Sans)
- **Spacing:** Generous whitespace, breathing room
- **Components:** Rounded cards (rounded-2xl), soft shadows
- **Layout:** Editorial, story-driven, section-by-section narrative
- **Rhythm:** Slow, deliberate, builds trust gradually

### Property (Proposed)
**Psychology:** Growth, prosperity, data-driven decisions  
**Audience:** Investors (ROI-focused, numbers-oriented)  
**Tone:** Direct, analytical, results-focused

**Design Language:**
- **Colors:** Emerald (#047857) + Slate (#0F172A) + Amber (#F59E0B) - "Growth + Stability + Urgency"
- **Hero:** Lighter, more energetic (gradient with emerald accent, not dark)
- **Typography:** Sans headings (bold, modern), sans body (different weight scale)
- **Spacing:** Tighter, more data-dense, efficiency-focused
- **Components:** Sharper edges (rounded-lg), stronger borders, data cards
- **Layout:** Dashboard-style, metrics-forward, scannable
- **Rhythm:** Fast, punchy, emphasizes numbers and ROI

---

## SPECIFIC DESIGN CHANGES

### 1. COLOR SYSTEM

**Dentists:**
```css
--navy: #001b3d;
--gold: #b8975d;
--background: #f4f6f9; (light blue-gray)
--surface: #ffffff;
```

**Property (NEW):**
```css
--emerald: #047857; (primary - growth, prosperity)
--emerald-dark: #065f46; (headings, emphasis)
--slate: #0f172a; (text, authority)
--amber: #f59e0b; (CTAs, urgency)
--background: #f8fafc; (neutral white-gray, not blue-tinted)
--surface: #ffffff;
--surface-data: #f0fdf4; (light emerald tint for data cards)
```

**Rationale:**
- Emerald = Growth, investment, prosperity (vs. Navy = Trust, stability)
- Amber CTAs = Urgency, action (vs. Gold = Premium, tradition)
- Slate text = Modern, data-focused (vs. Navy text = Professional, formal)
- Neutral backgrounds = Clean, efficient (vs. Blue-tinted = Calm, consultative)

---

### 2. TYPOGRAPHY SCALE

**Dentists:**
- Serif headings (Cormorant) - Traditional, established
- H1: 2.75rem (44px) - Measured
- Body: 1rem (16px) - Standard
- Line height: 1.5 - Generous

**Property (NEW):**
- Sans headings (Inter or Manrope) - Modern, data-focused
- H1: 3.5rem (56px) - Bold, confident
- Body: 1.125rem (18px) - Larger, more readable for numbers
- Line height: 1.6 - Slightly tighter for data density

**Implementation:**
```css
/* Property-specific font stack */
--font-heading: 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace; (for numbers/calculations)
```

---

### 3. LAYOUT STRUCTURE CHANGES

**Dentists Homepage Structure:**
```
1. Hero (dark gradient)
2. Trust statement (light surface)
3. Reality points (4 cards, 2x2 grid)
4. Who we work with (3 columns)
5. How we work (6 numbered items, 2 columns)
6. Why specialist (table)
7. Practical guidance (3 blog cards)
8. Lead form (2 columns)
9. FAQ (accordion)
```

**Property Homepage Structure (NEW):**
```
1. Hero (light, data-forward with stats)
2. Calculator preview (interactive widget above fold)
3. Problem/solution (2 columns, side-by-side)
4. ROI showcase (3 metrics cards with numbers)
5. Services grid (6 cards, 3x2, icon-led)
6. Social proof (testimonial slider or logo grid)
7. Content clusters (topic tree visualization)
8. Lead form (single column, prominent)
9. Trust signals (regulatory, pricing, guarantee)
```

**Key Differences:**
- Property: Calculator/interactive tool above fold (immediate value)
- Property: Metrics and numbers emphasized (ROI-focused)
- Property: Side-by-side problem/solution (efficiency)
- Property: Icon-led services (scannable)
- Dentists: Story-driven narrative (builds trust slowly)
- Dentists: Numbered process (step-by-step)

---

### 4. COMPONENT VARIATIONS

#### Hero Section

**Dentists:**
- Dark gradient background
- Centered text
- Logo above headline
- Soft, editorial feel

**Property (NEW):**
```tsx
// Light hero with stats bar
<section className="hero-property">
  <div className="hero-stats-bar">
    <StatItem icon="📊" value="£18k+" label="Avg. annual tax saving" />
    <StatItem icon="⚡" value="24hr" label="Response time" />
    <StatItem icon="✓" value="100+" label="Landlords served" />
  </div>
  <h1>Data-driven accounting for UK landlords</h1>
  <div className="hero-calculator-preview">
    {/* Mini Section 24 calculator */}
  </div>
</section>
```

**Visual Differences:**
- Light background (not dark)
- Stats bar above headline (data-first)
- Inline calculator preview (interactive)
- Horizontal layout (not vertical)

#### Card Components

**Dentists:**
```css
.card-flat {
  border-radius: 1rem; (rounded-2xl)
  border: 1px solid var(--border);
  box-shadow: none;
  padding: 2rem;
}
```

**Property (NEW):**
```css
.card-data {
  border-radius: 0.5rem; (rounded-lg - sharper)
  border: 2px solid var(--border); (thicker border)
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); (subtle shadow)
  padding: 1.5rem; (tighter)
  background: var(--surface-data); (light emerald tint)
}

.card-metric {
  border-left: 4px solid var(--emerald); (accent border)
  background: white;
  padding: 1.25rem;
}
```

**Visual Differences:**
- Sharper corners (modern, data-focused)
- Thicker borders (stronger definition)
- Accent borders (visual hierarchy)
- Tinted backgrounds (subtle brand reinforcement)

#### Button Styles

**Dentists:**
```css
.btn-primary {
  background: var(--navy);
  color: white;
  border-radius: 9999px; (fully rounded)
  padding: 0.75rem 2rem;
}
```

**Property (NEW):**
```css
.btn-primary-property {
  background: var(--emerald);
  color: white;
  border-radius: 0.5rem; (rounded-lg - less rounded)
  padding: 1rem 2rem; (taller)
  font-weight: 600; (semibold, not medium)
  box-shadow: 0 4px 6px rgba(4, 120, 87, 0.2); (emerald shadow)
}

.btn-secondary-property {
  background: transparent;
  color: var(--emerald);
  border: 2px solid var(--emerald);
  border-radius: 0.5rem;
}
```

**Visual Differences:**
- Less rounded (modern, not traditional)
- Emerald color (growth, not trust)
- Stronger shadows (more prominent)
- Thicker borders on secondary (more defined)

---

### 5. LAYOUT PATTERNS

#### Grid Systems

**Dentists:**
- 2-column grids (spacious)
- 3-column for "who we work with"
- Generous gaps (2-3rem)
- Vertical rhythm emphasized

**Property (NEW):**
- 3-column grids (denser)
- 4-column for metrics/stats
- Tighter gaps (1-1.5rem)
- Horizontal rhythm emphasized

#### Section Backgrounds

**Dentists:**
- Alternating: Background → Surface → Background
- Subtle blue-gray tint
- Soft transitions

**Property (NEW):**
- Alternating: White → Light emerald → White
- Neutral whites (no blue tint)
- Stronger contrast between sections

---

## IMPLEMENTATION APPROACH

### Option 1: Niche-Specific CSS (RECOMMENDED)

**Pros:**
- Keeps shared components unchanged
- Easy to maintain
- No risk of breaking Dentists
- Can iterate quickly

**Cons:**
- Requires CSS override strategy
- Slightly more CSS duplication

**Implementation:**
```
Property/web/src/app/property-theme.css (NEW)
Property/web/src/app/globals.css (imports property-theme.css)
```

**Strategy:**
1. Keep shared components as-is
2. Override CSS variables in `property-theme.css`
3. Add property-specific utility classes
4. Use `data-niche="property"` attribute on body for scoped styles

### Option 2: Component Variants

**Pros:**
- More flexible
- Cleaner separation

**Cons:**
- More complex
- Requires modifying shared components
- Higher maintenance burden

**Implementation:**
```tsx
// Shared component accepts variant prop
<Card variant={niche.niche_id === 'property' ? 'data' : 'editorial'} />
```

### Option 3: Niche-Specific Component Overrides

**Pros:**
- Maximum flexibility
- No shared component changes

**Cons:**
- Component duplication
- Defeats purpose of shared architecture

---

## RECOMMENDED SOLUTION

### Hybrid Approach: CSS Variables + Layout Variations

**What stays shared:**
- Component logic (LeadForm, StickyCTA, BlogPostRenderer)
- Base HTML structure
- Accessibility features
- Form validation

**What differs:**
- CSS variables (colors, spacing, typography)
- Layout composition (section order, grid columns)
- Page-level structure (homepage, services)
- Visual density (tight vs. spacious)

**Implementation Steps:**

1. **Create `Property/web/src/app/property-theme.css`**
   - Override CSS variables
   - Define property-specific utilities
   - Add data-attribute scoping

2. **Import in `Property/web/src/app/layout.tsx`**
   - Add `data-niche="property"` to body
   - Import property-theme.css after globals.css

3. **Rebuild property-specific pages** with different layouts
   - Homepage: Stats-first, calculator above fold
   - Services: Icon-led grid (not numbered list)
   - Incorporation: Side-by-side comparison (not sequential)

4. **Keep shared components unchanged**
   - They'll inherit new CSS variables
   - Work for both niches
   - No breaking changes

---

## DETAILED CSS OVERRIDES

### Property Theme CSS

```css
/* Property-specific theme overrides */
[data-niche="property"] {
  /* Color system */
  --primary: #047857;
  --primary-dark: #065f46;
  --primary-light: #10b981;
  --accent: #f59e0b;
  --accent-dark: #d97706;
  
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;
  
  --background: #f8fafc;
  --surface: #ffffff;
  --surface-data: #f0fdf4;
  --border: #e2e8f0;
  --border-strong: #cbd5e1;
  
  /* Typography scale (larger, bolder) */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1.125rem; /* 18px - larger than Dentists */
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 2.5rem;
  --text-4xl: 3.5rem; /* 56px - much larger than Dentists */
  
  /* Spacing (tighter) */
  --space-section: 3rem; /* vs. 4rem in Dentists */
  --space-card-gap: 1rem; /* vs. 2rem in Dentists */
  
  /* Border radius (sharper) */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem; /* vs. 1.5rem in Dentists */
  
  /* Shadows (stronger) */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}

/* Property hero - LIGHT, not dark */
[data-niche="property"] .hero-brand {
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #ecfdf5 100%);
  color: var(--text-primary);
  border-bottom: 3px solid var(--primary);
}

/* Property cards - data-focused */
[data-niche="property"] .card-flat {
  border-radius: var(--radius-lg);
  border-width: 2px;
  box-shadow: var(--shadow-sm);
  background: var(--surface-data);
}

/* Property buttons - less rounded, emerald */
[data-niche="property"] .btn-primary {
  background: var(--primary);
  border-radius: var(--radius-md);
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(4, 120, 87, 0.2);
}

[data-niche="property"] .btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 6px 8px rgba(4, 120, 87, 0.25);
}

/* Property metric cards - accent border */
[data-niche="property"] .metric-card {
  border-left: 4px solid var(--primary);
  background: white;
  padding: 1.25rem;
  border-radius: var(--radius-md);
}

/* Property section backgrounds - stronger contrast */
[data-niche="property"] .section-alternate {
  background: var(--surface-data);
}

/* Property typography - bolder */
[data-niche="property"] .display-serif {
  font-family: var(--font-heading);
  font-weight: 700; /* vs. 600 in Dentists */
  letter-spacing: -0.02em; /* tighter */
}
```

---

## LAYOUT RESTRUCTURING

### Homepage Redesign

**Current (Dentists-like):**
```
Hero (dark) → Trust statement → Reality points (4) → Who we work with (3) → 
How we work (6) → Why specialist (table) → Blog cards (3) → Lead form → FAQ
```

**New (Property):**
```
Hero (light + stats bar) → Calculator widget → Problem/Solution (2-col) → 
ROI metrics (3 large numbers) → Services grid (6, icon-led) → 
Content clusters (visual tree) → Social proof → Lead form (full-width) → 
Trust signals (pricing, guarantee, regulatory)
```

**Structural Differences:**
- **Above fold:** Calculator widget (Property) vs. Hero only (Dentists)
- **Stats placement:** Top bar (Property) vs. Mid-page section (Dentists)
- **Services:** Icon grid (Property) vs. Numbered list (Dentists)
- **Content:** Tree visualization (Property) vs. Card list (Dentists)
- **Form:** Full-width prominent (Property) vs. 2-column (Dentists)

---

### Services Page Redesign

**Current (Dentists-like):**
```
Breadcrumb → H1 → Description → 
Service 1 (text block + links) → 
Service 2 (text block + links) → 
... → 
Pricing box → CTA section
```

**New (Property):**
```
Hero banner → Quick stats → 
Services grid (6 cards with icons, 3x2) → 
Calculator CTAs (4 boxes linking to tools) → 
Pricing comparison table → 
Process timeline (horizontal) → 
Lead form
```

**Structural Differences:**
- **Layout:** Grid (Property) vs. Stacked list (Dentists)
- **Visual:** Icon-led (Property) vs. Text-heavy (Dentists)
- **Interactivity:** Calculator CTAs (Property) vs. Blog links (Dentists)
- **Pricing:** Comparison table (Property) vs. Text box (Dentists)

---

### Incorporation Page Redesign

**Current (Dentists-like):**
```
Breadcrumb → Hero → When it makes sense (4 cards) → 
When it doesn't (4 cards) → Calculator section → 
Process steps (3 numbered) → What you get (list) → CTA
```

**New (Property):**
```
Split hero (text left, calculator right) → 
Decision matrix (2x2 grid: Yes/No scenarios) → 
Cost breakdown (visual chart) → 
ROI timeline (horizontal bar chart) → 
Case studies (3 real examples with numbers) → 
FAQ (inline, not accordion) → 
Lead form
```

**Structural Differences:**
- **Hero:** Split (Property) vs. Stacked (Dentists)
- **Decision framework:** Matrix (Property) vs. Sequential cards (Dentists)
- **Data viz:** Charts (Property) vs. Text (Dentists)
- **Examples:** Numbers-heavy (Property) vs. Narrative (Dentists)

---

## COMPONENT-LEVEL DIFFERENTIATION

### Shared Components That Need CSS Variants

#### 1. LeadForm
**Dentists:** Soft, rounded, generous padding  
**Property:** Sharper, tighter, data-focused labels

```css
[data-niche="property"] .lead-form input,
[data-niche="property"] .lead-form select {
  border-radius: var(--radius-md);
  border-width: 2px;
  font-size: 1rem;
  padding: 0.875rem 1rem;
}

[data-niche="property"] .lead-form label {
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}
```

#### 2. StickyCTA
**Dentists:** Rounded pill, soft shadow  
**Property:** Rectangle bar, strong border

```css
[data-niche="property"] .sticky-cta {
  border-radius: 0; /* No rounding */
  border-top: 3px solid var(--primary);
  box-shadow: 0 -4px 6px rgba(0,0,0,0.1);
  background: white;
}

[data-niche="property"] .sticky-cta button {
  border-radius: var(--radius-md);
  background: var(--accent);
  font-weight: 700;
}
```

#### 3. BlogPostRenderer
**Dentists:** Serif headings, generous line height  
**Property:** Sans headings, tighter, data callouts

```css
[data-niche="property"] .blog-post h2 {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.75rem;
  letter-spacing: -0.01em;
}

[data-niche="property"] .blog-post .cta-embed {
  border-left: 4px solid var(--primary);
  background: var(--surface-data);
  border-radius: var(--radius-md);
}
```

---

## UNIQUE PROPERTY COMPONENTS

### 1. Stats Bar (Above Fold)
```tsx
<div className="stats-bar">
  <StatItem icon="💰" value="£18k+" label="Avg. Section 24 saving" />
  <StatItem icon="⚡" value="24hr" label="Response time" />
  <StatItem icon="📊" value="100+" label="Landlords served" />
  <StatItem icon="✓" value="60+" label="Topics covered" />
</div>
```

### 2. Calculator Preview Widget
```tsx
<div className="calculator-preview">
  <h3>Calculate your Section 24 impact</h3>
  <MiniSection24Calculator />
  <Link href="/calculators">View all calculators →</Link>
</div>
```

### 3. ROI Metric Cards
```tsx
<div className="roi-metrics">
  <MetricCard 
    value="£1,800"
    label="Avg. annual Section 24 cost"
    trend="increasing"
    context="For £50k rental income, £20k mortgage interest"
  />
  <MetricCard 
    value="5-7 years"
    label="Typical incorporation break-even"
    context="Depends on CGT and SDLT costs"
  />
  <MetricCard 
    value="£400/qtr"
    label="MTD penalty risk"
    trend="new"
    context="From April 2026 if non-compliant"
  />
</div>
```

### 4. Service Icon Grid
```tsx
<div className="services-grid">
  <ServiceCard icon={<CalculatorIcon />} title="Section 24 Planning" />
  <ServiceCard icon={<BuildingIcon />} title="Incorporation" />
  <ServiceCard icon={<ChartIcon />} title="MTD Compliance" />
  <ServiceCard icon={<CoinsIcon />} title="CGT Planning" />
  <ServiceCard icon={<FolderIcon />} title="Portfolio Reporting" />
  <ServiceCard icon={<TrendingIcon />} title="Acquisition Support" />
</div>
```

---

## GOOGLE DIFFERENTIATION CHECKLIST

### ✅ Visual Differentiation
- [ ] Different color palette (emerald vs. navy)
- [ ] Different typography scale (larger, bolder)
- [ ] Different border radius (sharper vs. rounded)
- [ ] Different shadows (stronger vs. soft)
- [ ] Different button styles (rectangular vs. pill)

### ✅ Structural Differentiation
- [ ] Different section order on homepage
- [ ] Different grid systems (3-col vs. 2-col)
- [ ] Different component composition (stats bar, calculator widget)
- [ ] Different spacing rhythm (tighter vs. generous)
- [ ] Different background patterns (neutral vs. blue-tinted)

### ✅ Content Differentiation
- [ ] Different topics (property vs. dental)
- [ ] Different keywords (landlord vs. dentist)
- [ ] Different audience (investors vs. healthcare)
- [ ] Different tone (data-driven vs. consultative)
- [ ] Different CTAs (calculate vs. consult)

### ✅ Functional Differentiation
- [ ] Unique components (4 calculators)
- [ ] Different navigation structure (6 items vs. 4)
- [ ] Different lead form roles
- [ ] Different internal linking patterns

---

## IMPLEMENTATION PRIORITY

### Phase 1: CSS Theme (IMMEDIATE)
1. Create `property-theme.css`
2. Override color variables
3. Add property-specific utilities
4. Test build

**Effort:** 1 hour  
**Impact:** HIGH (visual differentiation)

### Phase 2: Layout Restructuring (NEXT)
1. Redesign homepage with stats bar + calculator
2. Rebuild services as icon grid
3. Restructure incorporation as split-screen
4. Add unique Property components

**Effort:** 3-4 hours  
**Impact:** VERY HIGH (structural differentiation)

### Phase 3: Typography & Micro-interactions (POLISH)
1. Implement sans-serif heading system
2. Add hover states and transitions
3. Refine spacing and rhythm
4. Add data visualization elements

**Effort:** 2 hours  
**Impact:** MEDIUM (polish and refinement)

---

## SUCCESS METRICS

### Google Indexing
- Both sites indexed separately ✅
- No duplicate content warnings ✅
- Different featured snippets ✅

### User Experience
- Property feels "investment-focused" ✅
- Dentists feels "professional-consultative" ✅
- Clear visual distinction at first glance ✅

### Technical
- Shared components still work ✅
- No breaking changes to Dentists ✅
- Easy to maintain both sites ✅

---

## NEXT STEPS

**Immediate:**
1. Create `property-theme.css` with new color system
2. Add `data-niche="property"` to body tag
3. Test visual changes

**Short-term:**
1. Redesign homepage layout (stats-first)
2. Add calculator widget above fold
3. Rebuild services as icon grid

**Medium-term:**
1. Add data visualization components
2. Create property-specific micro-interactions
3. A/B test layout variations

---

## RECOMMENDATION

**Start with Phase 1 (CSS Theme) immediately.** This gives you:
- 80% visual differentiation
- 20% of the effort
- No risk to Dentists
- Fast iteration

Then move to Phase 2 (Layout Restructuring) for full structural differentiation.

**Shall I implement Phase 1 now?**
