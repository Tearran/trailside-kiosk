"""
Trailside Kiosk - ESP32-based offline educational trail guide
Main entry point for the application
"""

import json
from lib.captive_portal import CaptivePortal
from lib.bt_keyboard import BTKeyboard
from lib.st7735 import ST7735Display
from lib.menu import Menu


def load_config():
    """Load configuration from config.json"""
    try:
        with open('config.json', 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading config: {e}")
        return {}


def main():
    """Main application loop"""
    print("Trailside Kiosk Starting...")
    
    # Load configuration
    config = load_config()
    
    # Initialize hardware
    display = ST7735Display(config.get('display', {}))
    keyboard = BTKeyboard(config.get('bluetooth', {}))
    
    # Initialize captive portal
    portal = CaptivePortal(config.get('network', {}))
    portal.start()
    
    # Initialize menu system
    menu = Menu(display, keyboard, config.get('menu', {}))
    
    # Main loop
    try:
        while True:
            menu.update()
    except KeyboardInterrupt:
        print("Shutting down...")
        portal.stop()


if __name__ == "__main__":
    main()
