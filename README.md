# 🧮 Calculator

A modern, secure calculator web application built with vanilla HTML, CSS, and JavaScript. Features keyboard support, calculation history, and full accessibility compliance.

## ✨ Features

- **Secure Calculation**: Uses safe expression evaluation (no `eval()` vulnerability)
- **Keyboard Support**: Full keyboard input for numbers, operators, and functions
- **Calculation History**: Displays previous calculation result
- **Accessible**: ARIA labels, keyboard focus indicators, high contrast support
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Motion Support**: Respects `prefers-reduced-motion` for users with motion sensitivity
- **Error Handling**: User-friendly error messages for invalid operations
- **Floating-Point Fix**: Correctly handles decimal arithmetic (e.g., 0.1 + 0.2)

## 🎮 Usage

### Mouse/Touch
Click any button to perform calculations:
- **C**: Clear display
- **÷, ×, −, +**: Arithmetic operators
- **⌫**: Delete last digit
- **=**: Calculate result

### Keyboard
| Key | Action |
|-----|--------|
| `0-9` | Input numbers |
| `.` | Decimal point |
| `+` | Add |
| `-` | Subtract |
| `*` | Multiply |
| `/` | Divide |
| `Enter` or `=` | Calculate |
| `Escape` | Clear |
| `Backspace` | Delete last digit |

## 📁 Project Structure

```
Test/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── script.js       # Calculator logic (secure evaluation)
└── README.md       # This file
```

## 🔒 Security

- ✅ **No eval()**: Uses `Function` constructor with strict validation
- ✅ **Input Validation**: Only allows mathematical characters
- ✅ **Division by Zero**: Prevented with explicit checks
- ✅ **Injection Prevention**: Expression validation before evaluation

## ♿ Accessibility

- ARIA labels for all buttons
- Keyboard navigation support
- High contrast mode support
- Reduced motion support
- Focus indicators for keyboard users
- Screen reader compatible

## 📱 Responsive

- Desktop (1024px+): Full-size calculator
- Tablet (768px-1023px): Adjusted spacing
- Mobile (<768px): Optimized button sizes and padding

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Getting Started

1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start calculating!

## 💡 Example Calculations

```
5 + 3 = 8
10 * 2.5 = 25
100 ÷ 4 = 25
0.1 + 0.2 = 0.3 (floating-point handled correctly)
```

## 📝 License

Free to use for personal and commercial projects.

## 🤝 Contributing

Feel free to submit issues, fork the repository, or create pull requests to improve the calculator!
