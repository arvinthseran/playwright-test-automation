# Accessibility Bug Report Guide

This document provides guidelines for reporting and tracking accessibility issues.

## Table of Contents

1. [Overview](#overview)
2. [Accessibility Standards](#accessibility-standards)
3. [Bug Report Template](#bug-report-template)
4. [Severity Levels](#severity-levels)
5. [Common Accessibility Issues](#common-accessibility-issues)
6. [Testing Tools](#testing-tools)
7. [Reporting Process](#reporting-process)
8. [Examples](#examples)

---

## Overview

Accessibility bugs prevent users with disabilities from using the application effectively. These issues can affect:

- **Visual impairments** - Blind and low vision users relying on screen readers
- **Motor impairments** - Users unable to use a mouse or needing keyboard navigation
- **Cognitive impairments** - Users who need clear, simple language
- **Hearing impairments** - Users relying on captions for audio content
- **Temporary impairments** - Users with broken arms, in bright sunlight, on slow connections

All accessibility bugs should be reported and tracked with the same rigor as functional bugs.

---

## Accessibility Standards

The application must comply with:

- **WCAG 2.1 Level AA** - Web Content Accessibility Guidelines (primary standard)
- **WCAG 2.1 Level AAA** - Enhanced accessibility (aspirational)
- **EN 301 549** - European accessibility standard
- **Equality Act 2010** - UK legal requirement

### Key WCAG Principles

1. **Perceivable** - Information must be presentable to users
2. **Operable** - Users must be able to navigate and use the interface
3. **Understandable** - Information and operations must be clear
4. **Robust** - Content must be compatible with assistive technologies

---

## Bug Report Template

Use this template when reporting accessibility issues:

```
## Title
[Brief description of the accessibility issue]

## WCAG Criterion
[e.g., 1.4.3 Contrast (Minimum), 2.1.1 Keyboard]

## Severity
[Critical / High / Medium / Low]

## Platform/Browser
[e.g., Windows 10, Chrome 119, NVDA screen reader]

## Assistive Technology Used
[Screen reader (NVDA, JAWS, VoiceOver), Dragon, etc.]

## Step to Reproduce
1. [First step]
2. [Second step]
3. [Third step]
...

## Expected Behavior
[What should happen according to accessibility standards]

## Actual Behavior
[What currently happens]

## Impact
[How this affects users with disabilities]

## Screenshots/Videos
[Attach relevant screenshots showing the issue]

## Axe-Core Violations
[If detected by automated testing, list violations here]

## Additional Notes
[Any other relevant information]

## Suggested Fix
[Optional: suggestions for remediation]
```

---

## Severity Levels

### 🔴 Critical (P0)
- **WCAG Level A violation** - Prevents all users with a disability from using the feature
- **Complete keyboard inaccessibility** - Cannot navigate using keyboard alone
- **No page title or context** - Screen reader users don't know where they are
- **Broken form submission** - Cannot submit forms with assistive technology
- **Automated tool detects:** WCAG Level A violations

**Example:** Input field has no associated label, making it impossible for screen reader users to understand what to enter.

---

### 🟠 High (P1)
- **WCAG Level AA violation** - Significantly impacts access for users with disabilities
- **Poor color contrast** - Text difficult to read for low vision users
- **Missing focus indicators** - Keyboard users cannot see where focus is
- **Unclear button purposes** - Ambiguous button text like "Submit" or "Next"
- **Missing ARIA landmarks** - Users cannot navigate page structure

**Example:** Button with only an icon and no text/aria-label, screen reader users don't know its purpose.

---

### 🟡 Medium (P2)
- **WCAG Level AAA violation** - Reduces accessibility but doesn't prevent use
- **Missing descriptive page headings** - Users must read more to understand content
- **Unclear error messages** - Users don't understand what went wrong
- **Inconsistent navigation patterns** - Users confused by changing layouts
- **Excessive cognitive load** - Information poorly organized

**Example:** Error message says "Invalid input" without specifying which field or what format is required.

---

### 🟢 Low (P3)
- **Minor accessibility improvements** - Nice-to-have enhancements
- **Redundant accessibility features** - Multiple ways to access content already available
- **Minor focus order issues** - Tab order could be more logical but functional

**Example:** Skip link could be more prominent in design.

---

## Common Accessibility Issues

### Contrast Issues
- **Issue:** Text color contrast ratio below 4.5:1 for normal text, 3:1 for large text
- **WCAG:** 1.4.3 Contrast (Minimum)
- **Severity:** High
- **Detection:** axe-core, Lighthouse, WAVE
- **Fix:** Adjust colors or increase text size

```html
<!-- ❌ Bad: Insufficient contrast -->
<p style="color: #999;">This text is too light</p>

<!-- ✅ Good: Sufficient contrast -->
<p style="color: #333;">This text is properly contrasted</p>
```

### Missing Form Labels
- **Issue:** Form inputs lack associated labels
- **WCAG:** 1.3.1 Info and Relationships
- **Severity:** Critical
- **Detection:** Manual testing with screen reader, axe-core
- **Fix:** Use `<label>` elements with proper `for` attribute

```html
<!-- ❌ Bad: No label -->
<input type="text" placeholder="Enter amount" />

<!-- ✅ Good: Associated label -->
<label for="amount">Amount in pounds:</label>
<input id="amount" type="text" placeholder="e.g. 100" />
```

### Keyboard Navigation
- **Issue:** Cannot access functionality using keyboard alone
- **WCAG:** 2.1.1 Keyboard
- **Severity:** Critical
- **Detection:** Manual testing, keyboard-only navigation
- **Fix:** Ensure all interactive elements are keyboard accessible

```html
<!-- ❌ Bad: Click handler only -->
<div onclick="calculateHoliday()">Calculate</div>

<!-- ✅ Good: Keyboard accessible button -->
<button onclick="calculateHoliday()">Calculate</button>
```

### Missing Focus Indicators
- **Issue:** No visible focus indicator for keyboard navigation
- **WCAG:** 2.4.7 Focus Visible
- **Severity:** High
- **Detection:** Manual keyboard testing
- **Fix:** Add visible focus styles

```css
/* ✅ Good: Visible focus indicator */
button:focus {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}
```

### ARIA Misuse
- **Issue:** Incorrect or unnecessary ARIA attributes
- **WCAG:** 4.1.2 Name, Role, Value
- **Severity:** High
- **Detection:** axe-core, manual screen reader testing
- **Fix:** Use semantic HTML; only add ARIA when necessary

```html
<!-- ❌ Bad: ARIA on wrong element -->
<div role="button" aria-pressed="true">Toggle</div>

<!-- ✅ Good: Semantic HTML -->
<button aria-pressed="true">Toggle</button>
```

### Missing Page Structure
- **Issue:** No headings, landmarks, or logical structure
- **WCAG:** 1.3.1 Info and Relationships, 2.4.1 Bypass Blocks
- **Severity:** High
- **Detection:** Screen reader testing, automated tools
- **Fix:** Use proper semantic HTML

```html
<!-- ❌ Bad: No structure -->
<div>Calculate Holiday Entitlement</div>
<div>Step 1 of 5</div>

<!-- ✅ Good: Semantic structure -->
<header>
  <h1>Calculate Holiday Entitlement</h1>
  <nav aria-label="Progress">Step 1 of 5</nav>
</header>
```

### Color Only
- **Issue:** Information conveyed by color alone
- **WCAG:** 1.4.1 Use of Color
- **Severity:** Medium
- **Detection:** Visual inspection, automated tools
- **Fix:** Add text, icons, or other indicators

```html
<!-- ❌ Bad: Red only indicates error -->
<input style="border: 2px solid red;" />

<!-- ✅ Good: Color + text + icon -->
<input style="border: 2px solid red;" aria-invalid="true" />
<span class="error-icon">⚠️</span>
<span class="error-text">This field is required</span>
```

---

## Testing Tools

### Automated Testing

- **[axe-core](https://www.deque.com/axe/core-documentation/)** - JavaScript accessibility engine (integrated in our tests)
- **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** - Google's accessibility audit
- **[WAVE](https://wave.webaim.org/)** - WebAIM accessibility evaluator
- **[Pa11y](https://pa11y.org/)** - Automated accessibility testing

### Manual Testing with Assistive Technologies

- **[NVDA](https://www.nvaccess.org/)** - Free screen reader (Windows)
- **[JAWS](https://www.freedomscientific.com/products/software/jaws/)** - Commercial screen reader (Windows)
- **[VoiceOver](https://www.apple.com/accessibility/voiceover/)** - Built-in macOS/iOS screen reader
- **[Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d54c-1e3a61a0f8de)** - Built-in Windows screen reader

### Browser Extensions

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Extension](https://wave.webaim.org/extension/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Reporting Process

### Step 1: Identify the Issue
- Run accessibility tests (manual + automated)
- Document the exact problem location
- Note affected WCAG criterion

### Step 2: Gather Evidence
- Take screenshots showing the issue
- Record videos of screen reader behavior
- Document test environment (OS, browser, assistive tech)
- Run axe-core scan and capture violations

### Step 3: Complete Bug Report
- Use the template provided above
- Be specific and descriptive
- Include reproduction steps
- Specify severity level

### Step 4: Submit
- Create issue in GitHub/Jira with label `accessibility`
- Assign to relevant team
- Reference WCAG criterion in title
- Link to related bugs/features

### Step 5: Track Resolution
- Update issue status as fixes are implemented
- Verify fixes with accessibility testing
- Add regression tests to prevent recurrence

---

## Examples

### Example 1: Missing Form Label (Critical)

```
## Title
CRITICAL: Employment start date field lacks accessible label

## WCAG Criterion
1.3.1 Info and Relationships

## Severity
🔴 Critical

## Platform/Browser
Windows 10, Chrome 119, NVDA 2024.1

## Step to Reproduce
1. Navigate to the calculator form
2. Enable NVDA screen reader
3. Tab to the employment start date field
4. Listen to what NVDA announces

## Expected Behavior
NVDA should announce: "Employment start date, edit text, required"

## Actual Behavior
NVDA only announces: "Edit text"
Screen reader user cannot understand what data should be entered

## Impact
Users with visual impairments cannot understand the purpose of the field.
They don't know if they should enter a date or something else.

## Axe-Core Violations
- Form elements must have associated labels (serious)
- Element has insufficient color contrast (serious)

## Suggested Fix
Add <label> element with proper for attribute:
<label for="emp-start-date">Employment start date *</label>
<input id="emp-start-date" type="date" required />
```

### Example 2: Poor Color Contrast (High)

```
## Title
HIGH: Calculate button has insufficient color contrast

## WCAG Criterion
1.4.3 Contrast (Minimum)

## Severity
🟠 High

## Platform/Browser
Windows 10, Chrome 119, standard monitor

## Step to Reproduce
1. Navigate to the calculator page
2. Look at the green "Calculate" button
3. Use Color Contrast Analyzer tool to measure

## Expected Behavior
Button text should have at least 4.5:1 contrast ratio

## Actual Behavior
Measured contrast ratio: 3.2:1
Button text difficult to read for low vision users

## Screenshots
[Screenshot showing button with contrast measurement]

## Suggested Fix
Change button text color from #77BB77 to #0B7F1C
This provides 5.1:1 contrast ratio
```

### Example 3: Missing Keyboard Navigation (Critical)

```
## Title
CRITICAL: Modal dialog cannot be closed using keyboard

## WCAG Criterion
2.1.1 Keyboard

## Severity
🔴 Critical

## Platform/Browser
Any OS, any browser

## Step to Reproduce
1. Click "Calculate" to open result modal
2. Press Tab to navigate (close button not reachable)
3. Try pressing Escape key

## Expected Behavior
User should be able to close modal using:
- Tab to close button and press Enter
- Press Escape key

## Actual Behavior
Modal cannot be closed with keyboard alone
User must use mouse

## Impact
Users with motor impairments or keyboard-only users cannot close the dialog.
They're stuck and must reload the page.

## Suggested Fix
1. Ensure close button is keyboard accessible
2. Add Escape key handler to close modal
3. Manage focus properly in modal
```

---

## Accessibility Testing Checklist

Use this checklist when testing for accessibility issues:

- [ ] Page has descriptive title
- [ ] All form inputs have associated labels
- [ ] Color contrast meets 4.5:1 ratio (text) or 3:1 (large text)
- [ ] All functionality available via keyboard
- [ ] Focus indicators clearly visible
- [ ] Images have alt text (or are decorative)
- [ ] Page structure uses proper headings (h1, h2, etc.)
- [ ] No information conveyed by color alone
- [ ] Links have descriptive text (not "click here")
- [ ] Error messages are clear and specific
- [ ] ARIA attributes used correctly
- [ ] Video has captions
- [ ] PDFs are accessible
- [ ] Focus order is logical
- [ ] No keyboard traps
- [ ] Mobile: sufficient touch target size (48x48px minimum)
- [ ] Mobile: pinch-to-zoom not disabled
- [ ] Content is resizable up to 200%
- [ ] No automatic sound or animations without control

---

## Resources

### WCAG 2.1 Guidelines
- [WCAG 2.1 Specification](https://www.w3.org/WAI/WCAG21/quickref/)
- [How to Meet WCAG 2.1](https://www.w3.org/WAI/WCAG21/How-to/)
- [Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)

### Accessibility Best Practices
- [WebAIM Articles](https://webaim.org/articles/)
- [A11ycasts by Google Chrome](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9Xc-RgEzwLvsPccZZ)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)

### UK Specific
- [UK Equality Act 2010](https://www.legislation.gov.uk/ukpga/2010/15/contents)
- [GOV.UK Accessibility](https://www.gov.uk/guidance/how-to-publish-on-gov-uk/accessibility)

---

## Questions?

For questions about accessibility requirements or reporting procedures:
- Contact the accessibility lead
- Review WCAG documentation
- Test with actual users and assistive technologies
- Consult the team's accessibility champions

Remember: **Accessibility is not a feature, it's a requirement.**
