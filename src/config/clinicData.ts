import { ClinicProfile, Treatment, Dentist, BeforeAfterCase, TechnologyItem, Testimonial, FAQItem, InsuranceProvider, BlogPost } from '../types/clinic';

export const CLINIC_PROFILES: Record<string, ClinicProfile> = {
  aura: {
    id: 'aura',
    name: 'AURA Dental Studio',
    tagline: 'Modern Dentistry. Exceptional Smiles.',
    subheadline: 'Bespoke aesthetic artistry combined with cutting-edge 3D biological dentistry. Designed entirely around your comfort and long-term confidence.',
    badge: 'Beverly Hills Premier Aesthetic Institute',
    phone: '+1 (310) 845-9200',
    emergencyPhone: '+1 (310) 845-9299',
    email: 'concierge@auradental.com',
    address: '9465 Wilshire Blvd',
    suite: 'Suite 400',
    city: 'Beverly Hills',
    state: 'CA',
    zip: '90212',
    rating: 4.96,
    reviewCount: 1280,
    hours: {
      monFri: '8:00 AM – 6:00 PM',
      saturday: '9:00 AM – 3:00 PM',
      sunday: 'On-Call Emergency Only',
      isOpenNow: true,
    },
    trustStats: [
      { label: 'Verified Rating', value: '4.9/5', subtext: 'Over 1,200+ Google Reviews' },
      { label: 'Smiles Transformed', value: '14,000+', subtext: 'Over 15 years in practice' },
      { label: 'Success Rate', value: '99.4%', subtext: 'In cosmetic & implant procedures' },
      { label: 'Emergency Access', value: 'Same-Day', subtext: 'Guaranteed 24/7 on-call triage' }
    ],
    theme: {
      primary: '#0EA5E9',
      primaryLight: '#38BDF8',
      primaryDark: '#0369A1',
      accent: '#C5A880',
      bgTint: 'rgba(14, 165, 233, 0.04)',
    }
  },
  apex: {
    id: 'apex',
    name: 'APEX Implant & Surgical Center',
    tagline: 'Precision Surgery. Permanent Confidence.',
    subheadline: 'Pioneering robotic-assisted dental implantology, same-day teeth, and restorative maxillofacial engineering with hospital-grade sterile suites.',
    badge: 'Board-Certified Dental Implant Surgeons',
    phone: '+1 (214) 550-8100',
    emergencyPhone: '+1 (214) 550-8199',
    email: 'admissions@apeximplants.com',
    address: '2600 North Central Expressway',
    suite: 'Penthouse 1200',
    city: 'Dallas',
    state: 'TX',
    zip: '75204',
    rating: 4.98,
    reviewCount: 940,
    hours: {
      monFri: '7:30 AM – 5:30 PM',
      saturday: '8:00 AM – 2:00 PM',
      sunday: 'Emergency Surgical Triage',
      isOpenNow: true,
    },
    trustStats: [
      { label: 'Surgical Success', value: '99.8%', subtext: 'Over 6,500+ Implants Placed' },
      { label: 'Specialist Dentists', value: 'Board Cert.', subtext: 'Fellows of AAID & ICOI' },
      { label: 'Same-Day Teeth', value: 'Teeth in a Day', subtext: 'Immediate load protocols' },
      { label: '3D Imaging', value: 'Sub-Millimeter', subtext: 'Full low-dose CBCT suite' }
    ],
    theme: {
      primary: '#0284C7',
      primaryLight: '#0EA5E9',
      primaryDark: '#075985',
      accent: '#D97706',
      bgTint: 'rgba(2, 132, 199, 0.04)',
    }
  },
  lumina: {
    id: 'lumina',
    name: 'LUMINA Gentle & Family Dentistry',
    tagline: 'Gentle Care for Whole Family Wellness.',
    subheadline: 'Anxiety-free, biologically harmonious dental care. We specialize in sensory-calming suites, painless anesthesia, and pediatric smiles.',
    badge: 'Voted Best Holistic & Gentle Clinic',
    phone: '+1 (206) 412-3300',
    emergencyPhone: '+1 (206) 412-3399',
    email: 'care@luminadental.com',
    address: '1100 4th Avenue',
    suite: 'Suite 850',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    rating: 4.94,
    reviewCount: 1620,
    hours: {
      monFri: '8:00 AM – 6:30 PM',
      saturday: '9:00 AM – 4:00 PM',
      sunday: 'Closed',
      isOpenNow: true,
    },
    trustStats: [
      { label: 'Patient Comfort', value: '100% Gentle', subtext: 'Needle-free Wand anesthesia' },
      { label: 'Happy Families', value: '18,500+', subtext: 'Treating all ages 1-99' },
      { label: 'Invisalign Rank', value: 'Diamond Plus', subtext: 'Top 1% provider nationwide' },
      { label: 'Zero Wait Policy', value: '< 5 Mins', subtext: 'Dedicated concierge seating' }
    ],
    theme: {
      primary: '#0D9488',
      primaryLight: '#14B8A6',
      primaryDark: '#0F766E',
      accent: '#EAB308',
      bgTint: 'rgba(13, 148, 136, 0.04)',
    }
  }
};

export const TREATMENTS_DATA: Treatment[] = [
  {
    id: 'veneers',
    category: 'cosmetic',
    title: 'Custom Porcelain Veneers',
    subtitle: 'Ultra-thin handcrafted ceramic laminates for symmetrical, radiant smiles',
    badge: 'Signature Cosmetic Procedure',
    shortDesc: 'Handcrafted master-ceramist porcelain veneers that mimic natural translucency while correcting chips, gaps, discolouration, and wear.',
    fullDesc: 'Our porcelain veneers are engineered from high-grade lithium disilicate (e.max) or feldspathic porcelain, requiring minimal to zero tooth preparation. Each veneer is custom-shaded to reflect light exactly like natural healthy enamel.',
    duration: '2 appointments (1–2 weeks)',
    costRange: '$1,200 – $2,400 per tooth',
    recoveryTime: 'Immediate (zero downtime)',
    anesthesia: 'Local or needle-free comfort gel',
    benefits: [
      'Resistant to coffee, tea, and red wine stains for 15–20+ years',
      'Minimally invasive tooth enamel preservation technique',
      'Individually tailored translucency and natural micro-texture',
      'Digital Smile Design (DSD) preview before any ceramic is fabricated'
    ],
    steps: [
      { stepNumber: '01', title: '3D Aesthetic Scan & DSD Mockup', description: 'Intraoral 3D scan and digital smile simulation to test fit aesthetics.' },
      { stepNumber: '02', title: 'Gentle Preparation & Temporaries', description: 'Micro-sculpting of enamel and placement of aesthetic temporary veneers.' },
      { stepNumber: '03', title: 'Master Artisan Bonding', description: 'Permanent bonding with dual-cure high-strength biocompatible resin.' }
    ],
    faqs: [
      { question: 'Do veneers ruin your natural teeth?', answer: 'No. Modern ultra-thin veneers require mere fractions of a millimeter (0.2–0.5mm) of enamel polishing, keeping the underlying tooth completely sound and protected.' },
      { question: 'How long do porcelain veneers last?', answer: 'With proper brushing, flossing, and regular cleanings, our porcelain veneers typically last 15 to 25+ years.' }
    ],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'implants',
    category: 'implants',
    title: 'Computer-Guided Dental Implants',
    subtitle: 'Permanent titanium & zirconia tooth replacement with surgical precision',
    badge: 'Lifetime Structural Foundation',
    shortDesc: 'Replace one tooth or full arches with biocompatible titanium implants integrated into your jawbone for unmatched chewing strength and aesthetics.',
    fullDesc: 'Utilizing 3D cone-beam computed tomography (CBCT) and surgical guide stents, our implant placements have a 99.4% documented success rate. The implant fuses permanently with bone (osseointegration) to prevent facial bone loss.',
    duration: '1–2 surgical visits + restoration',
    costRange: '$2,200 – $4,500 (single unit with crown)',
    recoveryTime: '24–48 hours mild healing',
    anesthesia: 'IV Conscious Sedation, Nitrous, or Local',
    benefits: [
      'Preserves adjacent natural teeth without cutting them down',
      'Restores 100% natural bite force and mastication ability',
      'Stops jawbone resorption and preserves natural facial contours',
      'Lifetime warranty on surgical implant fixtures'
    ],
    steps: [
      { stepNumber: '01', title: 'CBCT 3D Bone Analysis', description: '3D scan to assess bone density, nerve pathways, and virtual implant planning.' },
      { stepNumber: '02', title: 'Micro-Surgical Placement', description: 'Computer-guided keyhole placement of medical-grade titanium fixture.' },
      { stepNumber: '03', title: 'Custom Zirconia Crown', description: 'Screw-retained ceramic crown color-matched to perfection.' }
    ],
    faqs: [
      { question: 'Is dental implant surgery painful?', answer: 'Most patients report less discomfort than a standard tooth extraction. With our guided precision technique and local anesthesia/sedation, you will feel zero pain during the procedure.' }
    ],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'invisalign',
    category: 'ortho',
    title: 'Invisalign® Clear Aligners',
    subtitle: 'Discreet, removable, digitally planned orthodontic alignment',
    badge: 'Diamond Plus Elite Provider',
    shortDesc: 'Straighten crooked teeth, close gaps, and correct crossbites without unsightly metal brackets or dietary restrictions.',
    fullDesc: 'Using the proprietary SmartTrack® polyurethane material and ClinCheck® 3D predictive software, our Invisalign specialists map every micron of movement before your aligners are manufactured.',
    duration: '6 to 14 months average',
    costRange: '$2,800 – $5,500 comprehensive',
    recoveryTime: 'None (wear 22 hours/day)',
    anesthesia: 'None required',
    benefits: [
      'Nearly invisible clear aligners that can be removed for dining and brushing',
      'Up to 50% faster tooth movement than traditional wire braces',
      'Digital 3D outcome simulation shown before you begin',
      'Includes complimentary post-treatment teeth whitening'
    ],
    steps: [
      { stepNumber: '01', title: 'iTero 3D Impressionless Scan', description: '6,000 frames per second scan with zero messy putty.' },
      { stepNumber: '02', title: 'Custom Aligner Series', description: 'Receive your sequential trays changed weekly at home.' },
      { stepNumber: '03', title: 'Refinement & Vivera Retainer', description: 'Final micro-touches and nocturnal retention to lock your perfect smile.' }
    ],
    faqs: [
      { question: 'How many hours a day must I wear them?', answer: 'For optimal results, aligners should be worn 20 to 22 hours per day, removing them only to eat, drink non-water beverages, and brush.' }
    ],
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'whitening',
    category: 'cosmetic',
    title: 'In-Studio Laser Teeth Whitening',
    subtitle: 'Safely brighten enamel up to 8–10 shades in a single 60-minute session',
    badge: 'Instant Results Guarantee',
    shortDesc: 'Medical-grade hydrogen peroxide accelerated by specialized LED cold-light wavelengths to dissolve deep tetracycline and food stains without sensitivity.',
    fullDesc: 'Unlike commercial strips that erode enamel, our in-studio whitening uses buffered potassium nitrate desensitizers and high-intensity cold-blue photon acceleration for safe, enamel-remineralizing radiance.',
    duration: '60 minutes',
    costRange: '$450 – $750',
    recoveryTime: 'Instant (avoid dark liquids for 48h)',
    anesthesia: 'Protective gingival barrier applied',
    benefits: [
      'Up to 8 to 10 shades brighter in just one appointment',
      'Proprietary anti-sensitivity formulation protects dental nerves',
      'Includes custom-fitted take-home trays for annual maintenance',
      'Safely breaks down intrinsic coffee, tea, smoking, and wine stains'
    ],
    steps: [
      { stepNumber: '01', title: 'Shade Matching & Polish', description: 'Baseline VITA shade recorded and prophylactic enamel polishing.' },
      { stepNumber: '02', title: 'Gum Shield Application', description: 'Liquid dam cured over gums to ensure zero soft tissue contact.' },
      { stepNumber: '03', title: 'Three 15-Min Laser Cycles', description: 'Active gel applied and photon activated for deep oxidation.' }
    ],
    faqs: [
      { question: 'Will it make my teeth sensitive?', answer: 'Our clinic uses specialized potassium-nitrate buffered gels and remineralizing fluoride paste immediately following treatment, virtually eliminating the zings common to drugstore whiteners.' }
    ],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'all-on-4',
    category: 'implants',
    title: 'All-on-X / Same-Day Teeth',
    subtitle: 'Full-mouth rehabilitation with immediate fixed permanent bridge',
    badge: 'Same-Day Full Arch Transformation',
    shortDesc: 'Restore an entire upper or lower arch of missing or failing teeth using 4 to 6 strategic implants and a fixed screw-retained zirconia bridge in one day.',
    fullDesc: 'Designed for patients suffering from extensive tooth loss or periodontal disease, All-on-X tilts the posterior implants at 45 degrees to maximize existing bone density, eliminating the need for months of sinus bone grafting.',
    duration: '1-Day Surgery & Temporary Fixed Teeth',
    costRange: '$14,000 – $24,000 per arch',
    recoveryTime: '3–5 days rest',
    anesthesia: 'Board-Certified Anesthesiologist IV Sedation',
    benefits: [
      'Walk out on the same day with functional, beautiful fixed teeth',
      'Avoids extensive bone grafts and sinus lift surgeries',
      'High-strength monolithic Prettau® zirconia final bridge',
      'Eat steak, apples, and nuts with full chewing confidence'
    ],
    steps: [
      { stepNumber: '01', title: 'Surgical Guide Design', description: '3D digital planning of all 4-6 implants in anatomical bone.' },
      { stepNumber: '02', title: 'Implant Placement & Conversion', description: 'Gentle extractions and immediate delivery of rigid temporary bridge.' },
      { stepNumber: '03', title: 'Final Zirconia Delivery', description: 'Custom artisan-stained permanent zirconia arch attached after healing.' }
    ],
    faqs: [
      { question: 'Can I really leave with teeth the same day?', answer: 'Yes! While the implants heal into the bone over the coming months, a high-strength immediate fixed bridge is secured on day one so you never spend a moment toothless.' }
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'crowns',
    category: 'general',
    title: 'CEREC® Same-Day Ceramic Crowns',
    subtitle: 'CAD/CAM digital milling: 3D scanned and bonded in a single visit',
    badge: 'Zero Second Appointments',
    shortDesc: 'Eliminate weeks of uncomfortable temporary crowns and gag-inducing impressions. We 3D scan, design, mill, and glaze your ceramic crown in 90 minutes.',
    fullDesc: 'Our on-site German CEREC Primemill system carves bio-compatible ceramic blocks under diamond burs to 15-micron accuracy. The restoration is fired in a porcelain kiln and bonded in the very same visit.',
    duration: 'Single 90-minute visit',
    costRange: '$950 – $1,800',
    recoveryTime: 'Zero downtime',
    anesthesia: 'Local anesthesia',
    benefits: [
      'No gooey, messy putty impression trays',
      'No fragile temporary crowns falling off between visits',
      '100% metal-free, biocompatible tooth-colored ceramic',
      'Long-term seal preventing recurrent decay beneath the margins'
    ],
    steps: [
      { stepNumber: '01', title: 'Tooth Shaping & Scan', description: 'Gentle removal of decay and 3D optical scan with Omnicam.' },
      { stepNumber: '02', title: 'CAD Digital Sculpting', description: 'Dentist sculpts natural anatomical cusps on 4K display.' },
      { stepNumber: '03', title: 'Milling & Bond', description: 'Diamond milling in 8 minutes, glaze kiln firing, and permanent adhesive bond.' }
    ],
    faqs: [
      { question: 'Are same-day crowns as strong as lab crowns?', answer: 'Yes. In fact, clinical studies demonstrate equal or superior shear strength because they are carved from solid, uniform blocks of high-density lithium disilicate ceramic.' }
    ],
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'root-canal',
    category: 'general',
    title: 'Gentle Endodontic Therapy (Root Canal)',
    subtitle: 'Microscopic disinfection to save natural teeth and extinguish pain',
    badge: 'Painless Gentle Relief',
    shortDesc: 'Stop severe throbbing tooth pain and preserve your natural tooth root using Zeiss surgical microscopes, rotary nickel-titanium instruments, and warm gutta-percha seal.',
    fullDesc: 'A root canal eliminates infection inside the pulp chamber when deep decay or trauma touches the nerve. With modern rotary instruments and profound anesthesia, the procedure is as simple and quiet as a standard filling.',
    duration: '45 to 75 minutes',
    costRange: '$800 – $1,500 (insurance typically covers 80%)',
    recoveryTime: '24 hours mild tenderness',
    anesthesia: 'Profound local anesthesia (guaranteed painless)',
    benefits: [
      'Immediately halts intense dental pain and relieves throbbing pressure',
      'Saves your natural tooth root from extraction',
      'High-magnification surgical microscope detects hidden canals',
      'Disinfected with ultrasonic cavitation solutions'
    ],
    steps: [
      { stepNumber: '01', title: 'Profound Comfort Numbing', description: 'Targeted nerve block ensures complete numbness before beginning.' },
      { stepNumber: '02', title: 'Microscopic Cleaning', description: 'Removal of infected tissue and ultrasonic sterilization of canals.' },
      { stepNumber: '03', title: 'Hermetic Gutta-Percha Seal', description: 'Canals sealed with biocompatible resin to prevent bacterial recurrence.' }
    ],
    faqs: [
      { question: 'Does a root canal hurt?', answer: 'Contrary to old myths, root canals do not cause pain—they relieve it! With our modern gentle techniques, 98% of patients report zero pain during the procedure.' }
    ],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'emergency',
    category: 'emergency',
    title: 'Same-Day Emergency Dental Triage',
    subtitle: 'Immediate relief for severe toothaches, broken teeth, or dental trauma',
    badge: 'Guaranteed Priority Access',
    shortDesc: 'From severe throbbing abscesses and lost fillings to knocked-out teeth and fractured crowns, our emergency triage team sees you within hours.',
    fullDesc: 'We reserve dedicated daily clinical openings specifically for acute dental emergencies. Our priority is immediate pain eradication, diagnostic 3D imaging, and stabilization to prevent permanent tooth loss.',
    duration: '30 to 60 minutes priority session',
    costRange: '$150 – $350 initial triage & treatment',
    recoveryTime: 'Immediate relief',
    anesthesia: 'Immediate soothing anesthesia',
    benefits: [
      'Same-day guaranteed emergency appointments',
      '24/7 on-call triage hotline with dentist-guided instructions',
      'Immediate localized anesthesia and pain relief protocols',
      'Emergency tooth reimplantation, splinting, and temporary repair'
    ],
    steps: [
      { stepNumber: '01', title: 'Immediate Pain Elimination', description: 'Swift administration of local anesthetic and anti-inflammatory therapy.' },
      { stepNumber: '02', title: 'Targeted Digital Diagnostic', description: 'Low-dose digital X-ray to pinpoint fracture or infection source.' },
      { stepNumber: '03', title: 'Stabilization & Treatment', description: 'Definitive restoration, splinting, or gentle extraction as needed.' }
    ],
    faqs: [
      { question: 'What should I do if my tooth is knocked out?', answer: 'Pick it up by the crown (never touch the root), gently rinse in milk or saline without scrubbing, and place it back in the socket or in a cup of milk. Contact us immediately—teeth replanted within 60 minutes have the highest survival rate!' }
    ],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'pediatric',
    category: 'pediatric',
    title: 'Compassionate Pediatric Dentistry',
    subtitle: 'Positive, fear-free foundation for lifelong healthy smiles',
    badge: 'Kid-Approved Gentle Approach',
    shortDesc: 'Child-centric preventive care, gentle cleanings, cavity prevention sealants, and early orthodontic monitoring in an engaging, calm environment.',
    fullDesc: 'We believe childhood dental experiences shape oral health for life. Our team utilizes "Tell-Show-Do" psychology, laughing gas for nervous explorers, and fluoride varnish to safeguard developing enamel.',
    duration: '30 to 45 minutes',
    costRange: '$120 – $280',
    recoveryTime: 'Immediate',
    anesthesia: 'Nitrous oxide (laughing gas) available',
    benefits: [
      'Sensory-friendly pediatric rooms with streaming entertainment',
      'BPA-free protective molar sealants to prevent cavities',
      'Gentle fluoride remineralization treatments',
      'Reward treasure tower and positive reinforcement badges'
    ],
    steps: [
      { stepNumber: '01', title: 'Fun Tell-Show-Do Intro', description: 'Showing tools like "Mr. Thirsty" and counting teeth together.' },
      { stepNumber: '02', title: 'Gentle Plaque Removal', description: 'Flavor-selected polishing and protective sealant check.' },
      { stepNumber: '03', title: 'Fluoride & Prize Bag', description: 'Protective enamel varnish and visit celebration reward.' }
    ],
    faqs: [
      { question: 'When should a child first visit the dentist?', answer: 'The American Academy of Pediatric Dentistry recommends scheduling their first visit by their first birthday, or within 6 months of their first tooth erupting.' }
    ],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1000&q=80'
  }
];

export const DENTISTS_DATA: Dentist[] = [
  {
    id: 'dr-williams',
    name: 'Dr. Sarah Williams',
    role: 'Founder & Clinical Director',
    credentials: 'DDS, MSc, FAGD',
    specialization: 'Cosmetic & Biomimetic Restorative Dentistry',
    experienceYears: 16,
    bio: 'Internationally recognized for her master-level smile design and minimally invasive porcelain veneer techniques. Dr. Williams completed her advanced fellowship at the Dawson Academy and frequently lectures on dental aesthetics.',
    education: ['Doctor of Dental Surgery, UCLA School of Dentistry', 'Master of Science in Biomaterials, King’s College London', 'Fellow of the Academy of General Dentistry (FAGD)'],
    memberships: ['American Academy of Cosmetic Dentistry (AACD)', 'American Dental Association (ADA)', 'International Team for Implantology (ITI)'],
    languages: ['English', 'French'],
    rating: 4.98,
    reviewCount: 540,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    availableDays: 'Mon, Tue, Wed, Thu'
  },
  {
    id: 'dr-vance',
    name: 'Dr. Julian Vance',
    role: 'Surgical Director & Oral Implantologist',
    credentials: 'DMD, MD, FAAID, DABOI',
    specialization: 'Guided Implantology & Full-Arch Reconstruction',
    experienceYears: 18,
    bio: 'A dual-degree oral surgeon with extensive residency at Johns Hopkins, Dr. Vance has placed over 7,000 implants using computer-assisted navigation and 3D bone scaffolding protocols.',
    education: ['Doctor of Medicine & Dentistry, Harvard School of Dental Medicine', 'Oral & Maxillofacial Residency, Johns Hopkins Hospital', 'Diplomate, American Board of Oral Implantology'],
    memberships: ['Fellow, American Academy of Implant Dentistry', 'International Congress of Oral Implantologists', 'California Association of Oral Surgeons'],
    languages: ['English', 'Spanish'],
    rating: 4.97,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    availableDays: 'Tue, Wed, Thu, Fri'
  },
  {
    id: 'dr-rostova',
    name: 'Dr. Elena Rostova',
    role: 'Specialist Orthodontist',
    credentials: 'DDS, MS Orthodontics',
    specialization: 'Invisalign® Diamond Plus & Digital Orthodontics',
    experienceYears: 12,
    bio: 'Specializing in airway-friendly expansion and accelerated clear aligner therapy. Dr. Rostova uses artificial intelligence tooth movement planning to reduce total treatment time by up to 35%.',
    education: ['DDS with Honors, Columbia University College of Dental Medicine', 'Orthodontic Specialty Certificate & MS, University of Washington'],
    memberships: ['American Association of Orthodontists (AAO)', 'Pacific Coast Society of Orthodontists', 'Invisalign Master Provider Group'],
    languages: ['English', 'Russian', 'German'],
    rating: 4.95,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1594824813571-638f02614d3f?auto=format&fit=crop&w=800&q=80',
    availableDays: 'Mon, Wed, Fri, Sat'
  },
  {
    id: 'dr-chen',
    name: 'Dr. Marcus Chen',
    role: 'Pediatric & Family Care Lead',
    credentials: 'DDS, Board-Certified Pediatric Dentist',
    specialization: 'Preventive, Holistic & Pediatric Dentistry',
    experienceYears: 10,
    bio: 'Passionate about gentle, anxiety-free dental visits for adults and children alike. Dr. Chen is trained in sensory dental ergonomics and laser-assisted cavity treatments that require zero drilling.',
    education: ['Doctor of Dental Surgery, UCSF School of Dentistry', 'Pediatric Dental Residency, Seattle Children’s Hospital'],
    memberships: ['American Academy of Pediatric Dentistry (AAPD)', 'California Dental Association', 'Holistic Dental Association'],
    languages: ['English', 'Mandarin Chinese'],
    rating: 4.99,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    availableDays: 'Mon, Tue, Thu, Fri, Sat'
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'case-1',
    treatmentType: 'Veneers & Whitening',
    title: 'Complete 10-Unit Upper Smile Makeover',
    patientAge: '34-year-old Executive',
    duration: '2 appointments across 10 days',
    doctorName: 'Dr. Sarah Williams',
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    problem: 'Chipped central incisors, severe tetracycline staining, uneven smile arc.',
    solution: 'Placed 10 micro-thin feldspathic porcelain veneers in shade BL2 with natural incisal translucency.'
  },
  {
    id: 'case-2',
    treatmentType: 'Dental Implants',
    title: 'Single Front Tooth Immediate Implant & Crown',
    patientAge: '28-year-old Architect',
    duration: 'Single surgery + final crown in 8 weeks',
    doctorName: 'Dr. Julian Vance',
    beforeImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    problem: 'Fractured upper left central incisor from athletic sports injury.',
    solution: 'Immediate flapless extraction, 3D guided titanium implant, custom zirconia abutment and layered crown.'
  },
  {
    id: 'case-3',
    treatmentType: 'Invisalign Aligners',
    title: 'Severe Crowding & Deep Bite Correction',
    patientAge: '41-year-old Creative Director',
    duration: '9 months (36 aligner trays)',
    doctorName: 'Dr. Elena Rostova',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    problem: 'Narrow dental arches, 6mm overbite, twisted lower anterior teeth causing enamel wear.',
    solution: 'Invisalign SmartTrack system with interproximal expansion followed by in-studio laser whitening.'
  },
  {
    id: 'case-4',
    treatmentType: 'All-on-4 Restoration',
    title: 'Full Upper Arch Zirconia Rehabilitation',
    patientAge: '62-year-old Retired Teacher',
    duration: 'Same-Day Fixed Teeth, Final at 4 months',
    doctorName: 'Dr. Julian Vance',
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    problem: 'Terminal periodontal disease, multiple failing loose bridges, inability to chew solid food.',
    solution: 'Guided placement of 4 tilted implants with immediate screw-retained monolithic zirconia bridge.'
  }
];

export const TECHNOLOGY_DATA: TechnologyItem[] = [
  {
    id: 'cbct-3d',
    title: 'Ultra-Low-Dose 3D CBCT Imaging',
    tagline: 'Sub-millimeter 360° cranial anatomy visualization',
    badge: 'Green Radiation Tech',
    description: 'Our digital cone-beam CT scanner generates crisp 3D reconstructions of your jawbone, nerve canals, and sinus roots with 85% less radiation than standard hospital CTs.',
    benefits: ['Accurate implant planning within 0.1mm', 'Early detection of hidden cyst and nerve path issues', 'Fast 12-second non-claustrophobic upright scan'],
    icon: 'Scan',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'trios-scanner',
    title: 'TRIOS 5 Wireless Intraoral 3D Scanner',
    tagline: 'Zero impression putty. Instant optical accuracy.',
    badge: 'Gag-Free Experience',
    description: 'Capturing 6,000 optical frames per second in realistic HD color, our intraoral wand digitizes your dental arches in under 60 seconds with zero messy alginate putty.',
    benefits: ['Zero gag reflex triggers', 'Live AI shade measurement', 'Real-time bite alignment simulation on 4K screen'],
    icon: 'Camera',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cerec-cad-cam',
    title: 'German CEREC® Primemill CAD/CAM',
    tagline: 'Permanent ceramic crowns milled in 8 minutes',
    badge: 'Same-Day Restorations',
    description: 'Why wait two weeks for a dental lab? Our robotic milling unit carves solid blocks of biocompatible lithium disilicate ceramic while you relax in our private lounge.',
    benefits: ['Single-visit crown delivery', 'No fragile temporary crowns', 'Computerized 15-micron precision marginal fit'],
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'laser-biolase',
    title: 'Waterlase® HydroPhotonics Dental Laser',
    tagline: 'No drills. No needles. Gentle laser treatment.',
    badge: 'Painless Laser Precision',
    description: 'Combines energized laser photons with a gentle water spray to cleanse cavities and contour gums without friction, heat, or vibration.',
    benefits: ['Drill-free cavity preparation in 80% of cases', 'Faster soft-tissue healing with zero sutures', 'Sterilizes bacteria deep inside periodontal pockets'],
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ai-diagnostics',
    title: 'AI-Assisted Radiographic Diagnostic Engine',
    tagline: 'Second-opinion AI detection for microscopic caries',
    badge: 'Next-Gen Diagnostic AI',
    description: 'Trained on tens of millions of verified dental radiographs, our FDA-cleared clinical AI highlights sub-surface decay, bone loss, and apical pathologies with color-coded confidence heatmaps.',
    benefits: ['Catches decay up to 2 years before visible on surface', 'Objective, transparent radiographic verification', 'Helps patients understand exactly why treatment is advised'],
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dsd-smile-design',
    title: 'Digital Smile Design (DSD) Virtual Simulation',
    tagline: 'Test drive your future smile before touching a tooth',
    badge: 'Facial Aesthetics Blueprint',
    description: 'We capture high-definition facial video and 3D dental coordinates to calibrate tooth proportion to your eyes, lips, and facial expression dynamics.',
    benefits: ['Predictable aesthetic outcome you co-design', '3D printed temporary smile prototype you can wear', 'Harmonizes smile curve with natural lip line'],
    icon: 'Eye',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Clarissa M.',
    treatment: 'Full Porcelain Veneers',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    quote: 'I used to cover my mouth when laughing in meetings. Dr. Williams and the AURA team changed my entire life. The 3D preview showed me the exact result, and people constantly tell me I look 10 years younger without guessing I had dental work done!',
    patientPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    hasVideo: true
  },
  {
    id: 't-2',
    name: 'Marcus Sterling',
    treatment: 'Dental Implant & Crown',
    rating: 5,
    date: '1 month ago',
    verified: true,
    quote: 'I had severe dental anxiety from childhood trauma. Dr. Vance took the time to explain the 3D surgical guide and offered IV sedation. I fell asleep and woke up with a brand new permanent tooth. Absolutely zero pain the next day!',
    patientPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    hasVideo: false
  },
  {
    id: 't-3',
    name: 'Dr. Rebecca Aris',
    treatment: 'Invisalign & Laser Whitening',
    rating: 5,
    date: '2 months ago',
    verified: true,
    quote: 'As a surgeon myself, I appreciate extreme technical standards. AURA’s facility is on par with the best surgical suites in the country. The AI booking and seamless scheduling made treatment effortless around my busy hospital hours.',
    patientPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    hasVideo: true
  },
  {
    id: 't-4',
    name: 'David & Lisa K.',
    treatment: 'Family & Pediatric Care',
    rating: 5,
    date: '2 months ago',
    verified: true,
    quote: 'Finding a clinic that treats our 6-year-old twin daughters with patience while handling my wife’s CEREC crown was a dream. Dr. Chen is phenomenal with kids. They actually look forward to their dental checkups now!',
    patientPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    hasVideo: false
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Appointments & Booking',
    question: 'How quickly can I be seen for an appointment?',
    answer: 'We reserve daily priority slots for emergencies and new patient smile consultations. You can book an appointment online in under 90 seconds, and emergency triage is available on a same-day guaranteed basis.'
  },
  {
    id: 'faq-2',
    category: 'Cost & Financing',
    question: 'Do you offer monthly payment plans and financing?',
    answer: 'Yes! We believe exceptional dental care should be accessible. We partner with CareCredit, Cherry, and Proceed Finance to offer 0% APR promotional financing for 12, 18, or 24 months with no early payoff penalties.'
  },
  {
    id: 'faq-3',
    category: 'Insurance',
    question: 'Which dental insurance plans do you accept?',
    answer: 'We accept and electronically file claims for all major PPO insurance providers including Delta Dental, MetLife, Cigna, Aetna, Guardian, Humana, and UnitedHealthcare. Our concierge team performs complimentary insurance benefit verifications prior to your visit.'
  },
  {
    id: 'faq-4',
    category: 'Pain & Comfort',
    question: 'What if I suffer from severe dental anxiety or fear?',
    answer: 'You are in gentle hands. We specialize in stress-free dentistry. We offer ceiling-mounted streaming screens, noise-canceling headphones, warm lavender towels, nitrous oxide (laughing gas), and board-certified IV sedation for complete relaxation.'
  },
  {
    id: 'faq-5',
    category: 'Treatments',
    question: 'What makes your 3D digital dentistry different from traditional clinics?',
    answer: 'Traditional clinics still use gooey silicone impressions, analog paper charts, and outsourced lab crowns that take 2-3 weeks. We utilize 100% digital 3D scanning, on-site German robotic milling, low-dose 3D CBCT, and surgical guide navigation for unparalleled accuracy and comfort.'
  },
  {
    id: 'faq-6',
    category: 'Treatments',
    question: 'How long does a full smile makeover take from start to finish?',
    answer: 'With our digital workflow, most porcelain veneer smile makeovers are completed in just two clinical visits across 10–14 days. If you choose CEREC same-day crowns or in-studio laser whitening, your transformation can be completed in a single 90-minute appointment!'
  }
];

export const INSURANCE_PROVIDERS: InsuranceProvider[] = [
  { name: 'Delta Dental Premier & PPO', networkType: 'In-Network Tier 1', coverageNote: 'Up to 100% preventive, 80% restorative' },
  { name: 'Cigna Dental Health', networkType: 'In-Network Tier 1', coverageNote: 'Direct digital claim processing & instant verification' },
  { name: 'Aetna Dental PPO', networkType: 'In-Network Tier 1', coverageNote: 'Preferred partner pricing across cosmetic & implant tiers' },
  { name: 'MetLife Dental', networkType: 'In-Network Tier 2', coverageNote: 'Full coverage for routine cleanings, exams & emergency care' },
  { name: 'Guardian DentalGuard', networkType: 'In-Network Tier 2', coverageNote: 'Out-of-pocket estimates provided before treatment begins' },
  { name: 'UnitedHealthcare Dental', networkType: 'PPO Accepted', coverageNote: 'Direct filing with maximum allowance benefits applied' },
  { name: 'CareCredit & Cherry 0% APR', networkType: 'Financing', coverageNote: 'Monthly plans starting from $99/mo with zero interest' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Porcelain Veneers vs. Composite Bonding: Which Is Right for You?',
    excerpt: 'An in-depth breakdown of longevity, stain resistance, tooth preservation, and investment returns between master porcelain and composite resin.',
    category: 'Cosmetic Dentistry',
    readTime: '4 min read',
    date: 'Sep 2, 2026',
    author: 'Dr. Sarah Williams',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'post-2',
    title: 'Why 3D Computer-Guided Dental Implants Are the Gold Standard',
    excerpt: 'How sub-millimeter surgical guides, titanium osseointegration, and bone preservation technology prevent premature facial aging.',
    category: 'Dental Implants',
    readTime: '5 min read',
    date: 'Aug 24, 2026',
    author: 'Dr. Julian Vance',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'post-3',
    title: 'The Silent Threat of Nocturnal Teeth Grinding (Bruxism)',
    excerpt: 'Recognizing morning jaw soreness, micro-cracks in enamel, and how digital custom nightguards protect your natural teeth for decades.',
    category: 'Preventive Care',
    readTime: '3 min read',
    date: 'Aug 14, 2026',
    author: 'Dr. Elena Rostova',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80'
  }
];
