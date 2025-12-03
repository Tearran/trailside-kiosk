# 🦅 Trailside Kiosk

> *Education over enforcement. Wonder over warnings.*

An ESP32-based offline educational trail guide kiosk designed to help visitors explore and understand the natural world around Roosevelt Lake, Arizona.

## Vision

Trailside Kiosk transforms outdoor education by providing accessible, engaging information about local ecology, geology, and cultural heritage—without requiring internet connectivity. Rather than focusing on what visitors shouldn't do, we emphasize the fascinating connections between species, ecosystems, and human history that make this landscape remarkable.

## Hardware

### Core Components
- **ESP32-WROOM** - Primary microcontroller (4MB flash storage)
- **ST7735S Display** - 80x160 pixel color screen for on-device UI
- **Bluetooth HID Keyboard** - Input device for navigation
- **Internal Flash Storage** - ~4MB for content and application

### Architecture
The system operates in three modes:

1. **Captive Portal Mode** (Primary)
   - ESP32 operates as WiFi Access Point
   - Built-in DNS server redirects all requests
   - HTTP server delivers the web interface
   - No internet required - fully offline operation

2. **Display Mode**
   - Direct interaction via ST7735 screen
   - Bluetooth keyboard navigation
   - Menu-driven content browsing

3. **Hybrid Mode**
   - Web interface accessible via captive portal
   - Physical display shows status/welcome screen
   - Supports multiple simultaneous users

## Content Philosophy

### Education > Enforcement

We believe that understanding leads to stewardship. Instead of focusing on rules and restrictions, we:

- Explain *why* ecosystems work the way they do
- Share the interconnections between species
- Highlight the resilience and adaptability of desert life
- Provide context for safety guidelines (not just warnings)
- Tell stories that help visitors see themselves as part of the landscape

### Content Categories

**Fauna** - Birds, mammals, reptiles, insects, and fish
**Flora** - Trees, cacti, parasitic plants, grasses, and flowers  
**Fungi** - Lichens, mushrooms, molds, and symbiotic relationships
**Water** - Roosevelt Lake, watersheds, and water ecology
**Geology** - Rock formations, minerals, and geological history
**Cultural** - Apache heritage and human history in the Tonto Basin
**Safety** - Wildlife coexistence and environmental awareness
**Stewardship** - Leave No Trace and sustainable recreation

## Version 1.0 Scope

### Location
**Roosevelt Lake, Arizona** - High Sonoran Desert (2,100-3,000 ft elevation)

This initial deployment focuses on the diverse ecosystem surrounding Roosevelt Lake in the Tonto National Forest. The area features a unique intersection of desert, riparian, and montane environments.

### Mascot
**Bald Eagle** (*Haliaeetus leucocephalus*)

A mating pair of bald eagles resides at Roosevelt Lake year-round, representing the successful recovery of this once-endangered species and symbolizing our mission of ecological education and conservation.

## Technical Stack

### Embedded System (ESP32)
- **Language**: MicroPython
- **Display Driver**: ST7735 SPI interface
- **Network**: WiFi AP mode with DNS captive portal
- **Storage**: JSON-based content files
- **Input**: Bluetooth HID keyboard support

### Web Interface
- **Frontend**: Vanilla JavaScript (ES6+)
- **Architecture**: Single Page Application (SPA)
- **Design**: Responsive, mobile-first
- **Offline**: All assets served from ESP32
- **Files**: `index.html`, `app.js`, `style.css`

### Content Structure
```
www/tours/content/
├── fauna/          # Wildlife
├── flora/          # Plants
├── fungi/          # Fungi and lichens
├── water/          # Aquatic resources
├── geology/        # Earth science
├── cultural/       # Human history
├── safety/         # Visitor safety
└── stewardship/    # Conservation ethics
```

Each content item is a JSON file with standardized fields:
- `id`: Unique identifier
- `name`: Common name
- `scientific_name`: Latin binomial (where applicable)
- `category`: Content category path
- `summary`: Brief description (1-2 sentences)
- `description`: Detailed information
- `safety`: Relevant safety information (optional)
- `fun_fact`: Engaging trivia (optional)

## Usage Statistics

The system tracks anonymous usage metrics to help improve content:
- Total viewing sessions
- Most popular content
- Session duration patterns
- Time-of-day usage

No personally identifiable information is collected. Statistics are stored locally in `stats.json`.

## Getting Started

### Hardware Setup
1. Flash MicroPython firmware to ESP32-WROOM
2. Connect ST7735 display via SPI
3. Pair Bluetooth HID keyboard
4. Upload project files to ESP32 flash storage

### Software Installation
```bash
# Copy files to ESP32
ampy --port /dev/ttyUSB0 put main.py
ampy --port /dev/ttyUSB0 put config.json
ampy --port /dev/ttyUSB0 put stats.json
ampy --port /dev/ttyUSB0 put lib/
ampy --port /dev/ttyUSB0 put www/
```

### Running the Kiosk
```bash
# Connect to ESP32 serial console
screen /dev/ttyUSB0 115200

# Run main application
import main
```

The kiosk will:
1. Start the captive portal (SSID: "TrailsideKiosk")
2. Initialize the display with welcome screen
3. Begin listening for keyboard input
4. Serve web interface on port 80

## Contributing

### Content Contributions Welcome!

We're especially interested in contributions from people who have **direct experience** with the Roosevelt Lake area:

- **Naturalists & Biologists** - Species observations, behavior notes, seasonal patterns
- **Geologists** - Formation details, mineral identification, geological history
- **Historians & Anthropologists** - Cultural context, indigenous heritage (with appropriate permissions)
- **Outdoor Educators** - Effective teaching approaches, common questions
- **Local Experts** - Trail conditions, seasonal considerations, local knowledge

### Contribution Guidelines

1. **Accuracy** - All content should be factually accurate and scientifically sound
2. **Tone** - Maintain educational, wonder-inspiring tone (not preachy or alarmist)
3. **Accessibility** - Write for general audiences (ages 10+)
4. **Attribution** - Cite sources for scientific claims
5. **Respect** - Treat cultural heritage with appropriate respect and sensitivity
6. **Safety** - Include relevant safety information without fear-mongering

### Content Format

Create new content by adding JSON files to the appropriate category directory:

```json
{
  "id": "species-name",
  "name": "Common Name",
  "scientific_name": "Genus species",
  "category": "fauna/birds",
  "summary": "One-sentence hook that makes people want to learn more.",
  "description": "2-3 paragraphs with fascinating details, ecological context, and connections to other species or systems.",
  "safety": "Relevant safety information (if applicable).",
  "fun_fact": "Something surprising or memorable."
}
```

## Evolution: Pocket Ranger

This project is designed to eventually evolve into **Pocket Ranger** - a portable, personal version of the kiosk:

### Future Vision
- Handheld ESP32 device
- Integrated GPS for location-aware content
- Offline maps with trail overlays
- Personal field journal
- Species identification tools
- Photo geotagging

### Why Start with a Kiosk?
1. **Prove the concept** - Validate content and UX approaches
2. **Build the library** - Create comprehensive content database
3. **Community input** - Learn from visitor interactions
4. **Simpler hardware** - Fixed installation is easier than portable design
5. **Public access** - Available to all visitors, no device required

## License

MIT License - see [LICENSE](LICENSE) file for details.

This project is open source because we believe environmental education should be freely accessible and community-driven.

## Acknowledgments

- Theodore Roosevelt and the early conservation movement that created the national forests and reclamation projects that make places like this accessible
- The Tonto Apache and Western Apache peoples whose ancestral knowledge of this landscape extends back countless generations
- Modern field biologists, naturalists, and educators working to document and share the wonders of the Sonoran Desert
- The Leave No Trace Center for Outdoor Ethics
- All contributors who share their knowledge and expertise

---

*"In every walk with nature, one receives far more than he seeks."* - John Muir
