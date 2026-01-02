# Dark Mode Implementation

## Overview
This app now includes a comprehensive dark mode system with smooth transitions and persistent user preferences.

## Features

### 1. **Theme Toggle Button**
- Located in the menu (hamburger menu → last option)
- Dynamically shows "Light Mode" when in dark mode, and "Dark Mode" when in light mode
- Icon changes between moon (dark) and sun (light)

### 2. **Persistent Theme**
- User's theme preference is saved to `localStorage`
- Theme persists across browser sessions
- Key: `theme` with values: `"dark"` or `"light"`

### 3. **System Preference Detection**
- On first visit, the app checks the OS/browser dark mode preference
- Falls back to dark mode if no preference is detected

### 4. **Smooth Transitions**
- All color changes animate smoothly (0.3s transition)
- Applies to backgrounds, text, borders, and accent colors

## Implementation Details

### Architecture

#### 1. **Theme Context** (`src/context/ThemeContext.js`)
- Provides theme state and toggle function
- Manages localStorage persistence
- Sets `data-theme` attribute on document root

```javascript
import { useTheme } from './context/ThemeContext';

const { theme, toggleTheme, isDark } = useTheme();
```

#### 2. **CSS Variables** (`src/index.css`)
Two color palettes defined:
- `[data-theme="dark"]` - Dark mode colors
- `[data-theme="light"]` - Light mode colors

All colors use CSS variables (e.g., `var(--bg-primary)`)

#### 3. **Component Styling** (`src/App.css`)
- All hardcoded colors replaced with CSS variables
- Automatically adapts to theme changes

### Color Palette

#### Dark Theme
- Primary BG: `#121212`
- Secondary BG: `#181818`
- Text: `#ffffff` / `#b8b8b8`
- Accents: Green (#69c881), Blue (#00a2ff), Purple (#967ae9)

#### Light Theme
- Primary BG: `#f5f5f5`
- Secondary BG: `#ffffff`
- Text: `#1a1a1a` / `#666666`
- Accents: Green (#26ab47), Blue (#0088cc), Purple (#7c5ecf)

## Usage

### For Users
1. Open the menu (hamburger icon)
2. Click the "Light Mode" or "Dark Mode" button
3. The theme switches instantly and saves automatically

### For Developers

#### Using the Theme Context
```javascript
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {isDark && <p>Dark mode is active</p>}
    </div>
  );
}
```

#### Using CSS Variables
In CSS files:
```css
.my-element {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}
```

In inline styles:
```javascript
<div style={{
  backgroundColor: 'var(--bg-primary)',
  color: 'var(--text-primary)'
}} />
```

## Files Modified

### New Files
- `src/context/ThemeContext.js` - Theme state management

### Modified Files
- `src/index.js` - Added ThemeProvider wrapper
- `src/index.css` - Added CSS variables for both themes
- `src/App.css` - Replaced hardcoded colors with variables
- `src/components/Menu.js.js` - Connected toggle button to theme system

## Future Enhancements

Potential improvements:
1. Add more theme options (e.g., high contrast, custom colors)
2. Sync theme across multiple browser tabs
3. Schedule automatic theme switching (e.g., dark at night)
4. Add theme transition animations for specific elements
5. Create a settings page for theme customization

## Troubleshooting

**Theme not persisting:**
- Check browser localStorage is enabled
- Clear localStorage and reload: `localStorage.clear()`

**Colors not changing:**
- Ensure CSS variables are used instead of hardcoded values
- Check browser dev tools for CSS variable values

**Toggle button not working:**
- Verify ThemeProvider wraps the entire app in `index.js`
- Check console for React context errors
