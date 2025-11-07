# Design Guidelines: Royal Gamuf Nig LTD

## Design Approach
**Professional B2B Services** - Drawing inspiration from established consulting and engineering firms with emphasis on credibility, clarity, and expertise demonstration. Reference points include professional service sites that balance modern aesthetics with authoritative presentation.

## Core Design Principles
1. **Authority First**: Establish geological expertise and professional credibility immediately
2. **Clarity Over Creativity**: Information should be easily scannable and digestible
3. **Trust Building**: Professional polish that inspires confidence in technical services

---

## Typography System

**Primary Font**: Inter or Roboto (Google Fonts)
- Headings: 600-700 weight
- Body: 400 weight
- Technical details: 500 weight

**Scale**:
- Hero Headline: text-5xl md:text-6xl lg:text-7xl
- Section Headers: text-3xl md:text-4xl
- Service Titles: text-2xl md:text-3xl
- Body Text: text-base md:text-lg
- Captions/Meta: text-sm

---

## Layout System

**Spacing Units**: Tailwind 4, 8, 12, 16, 20 (p-4, m-8, space-y-12, py-16, my-20)

**Container Strategy**:
- Hero: w-full with max-w-7xl inner container
- Content sections: max-w-6xl mx-auto
- Text-heavy areas: max-w-4xl for readability

**Section Padding**: py-16 md:py-20 lg:py-24

---

## Page Structure

### Homepage

**Hero Section** (80vh):
- Large professional geology field image (geologists at work, rock formations, or surveying equipment)
- Centered headline: "Professional Geological Services & Expertise"
- Subheadline highlighting experience/credentials
- Two CTAs: "Our Services" (primary), "Get Consultation" (secondary with blur backdrop)
- Trust indicator below: "Trusted by [X] projects across Nigeria"

**Services Grid** (3 columns desktop, 2 tablet, 1 mobile):
Six service cards with icons, titles, brief descriptions:
1. Geological Works & Field Investigation
2. Mineral Exploration
3. Environmental Geology
4. Hydrology
5. Engineering Geology
6. Geology Consultation

Each card: icon, service name, 2-3 line description, "Learn More" link

**Why Choose Us Section**:
- 2-column layout: Image (geological equipment/team) + Content
- 3-4 key differentiators with checkmarks
- Years of experience, certifications, project success rate

**Call-to-Action Band**:
- Full-width accent background
- Centered message: "Ready to discuss your geological project?"
- Primary CTA button
- Contact information preview

**Footer** (Multi-column):
- Company info column
- Services quick links
- Contact details (phone, email, address)
- Professional affiliations/certifications badges
- Copyright and legal links

### Services Pages

Each service gets dedicated page with:
- Service-specific hero (60vh) with relevant imagery
- Overview section with detailed description
- "What We Deliver" - bullet points or numbered list
- Process/Methodology section (4-step horizontal flow or timeline)
- Related case highlights (if applicable)
- CTA section: "Discuss This Service"

### About Page

- Company story section with founder/team image
- Credentials and certifications grid
- Team expertise highlights
- Professional memberships

### Contact Page

**2-Column Layout**:
- Left: Contact form (Name, Email, Phone, Service Interest dropdown, Message)
- Right: Office details, map placeholder, business hours, alternative contact methods

---

## Component Library

**Buttons**:
- Primary: Solid, medium size, rounded-md
- Secondary: Outline style
- On images: Backdrop blur with semi-transparent background

**Cards**:
- Service cards: Subtle border, rounded-lg, p-6, hover shadow elevation
- Team cards: Photo, name, title, credentials

**Icons**: 
Use Heroicons via CDN for service icons, UI elements, and feature indicators

**Forms**:
- Clean, structured inputs with labels
- Generous padding (p-3 to p-4)
- Clear validation states
- Submit button prominent

**Navigation**:
- Desktop: Horizontal menu with logo left, links center/right, CTA button
- Mobile: Hamburger menu overlay
- Sticky header on scroll

---

## Images

**Required Images**:
1. **Hero**: Professional geological fieldwork scene - geologists with equipment, surveying landscape, or examining rock formations (high-quality, professional photography aesthetic)
2. **Why Choose Us**: Team or equipment in professional setting
3. **Service page heroes**: Service-specific imagery (drilling equipment, mineral samples, environmental testing, etc.)
4. **About page**: Professional team photo or office/field operation

All images should convey professionalism, expertise, and technical capability.

---

## Animations

Minimal, professional animations only:
- Smooth scroll behavior
- Fade-in on scroll for sections (subtle, fast)
- Card hover elevation changes
- No complex or distracting motion

---

This design prioritizes professional credibility while maintaining modern web standards. The layout ensures geological services are clearly presented with emphasis on expertise and trustworthiness essential for B2B client acquisition.