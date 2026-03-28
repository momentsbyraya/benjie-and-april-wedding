// Theme configuration — elegant olive / sage palette (burgundy-* class names preserved)
// Primary dark #3A4D39 | Olive main #4F6F52 | Soft #739072 | Sage bg #E8F0E8 | Cream #F4F1EC | Gold #C2A878 | Borders #A3B18A
export const themeConfig = {
    // Background Colors
    backgrounds: {
        primary: 'bg-burgundy-dark',
        secondary: 'bg-burgundy-wine',
        accent: 'bg-burgundy-wine',
        light: 'bg-white/50',
        theme: 'bg-burgundy-cream',
        garden: 'bg-burgundy-cream',
        crumpledPaper: 'bg-[url("/assets/images/crumpled-paper.png")] bg-cover bg-center bg-no-repeat',
    },

    // Text Colors — on light surfaces use dark olive; muted secondary #5F7A61
    text: {
        primary: 'text-[#2E3B2F]',
        secondary: 'text-[#5F7A61]',
        accent: 'text-burgundy-wine',
        muted: 'text-[#5F7A61]/80',
        dark: 'text-[#2E3B2F]',
        theme: 'text-burgundy-wine',
        pause: 'text-[#F4F1EC]',
        custom: 'text-[#2E3B2F]',
        light: '#739072',
        lightBlack: '#2E3B2F',
        cream: '#F4F1EC',
        tan: '#739072',
        wine: '#4F6F52',
        burgundyDark: '#3A4D39',
        burntOrange: '#C2A878',
        sageGreen: '#4F6F52',
    },

    // Border Colors — soft olive #A3B18A
    borders: {
        primary: 'border-[#A3B18A]',
        secondary: 'border-[#A3B18A]',
        accent: 'border-burgundy-wine',
        theme: 'border-[#A3B18A]',
        garden: 'border-[#A3B18A]',
    },

    // Button Colors
    buttons: {
        primary: 'bg-burgundy-wine hover:bg-burgundy-tan',
        secondary: 'border border-[#A3B18A] hover:border-burgundy-wine',
        text: 'text-[#F4F1EC] hover:text-white',
        theme: 'bg-burgundy-wine hover:bg-burgundy-wine/90',
        garden: 'bg-burgundy-tan hover:bg-burgundy-wine',
    },

    // Hover Effects
    hover: {
        primary: 'hover:bg-burgundy-tan',
        secondary: 'hover:border-burgundy-wine hover:text-[#F4F1EC]',
        theme: 'hover:bg-burgundy-wine/90',
        garden: 'hover:bg-burgundy-wine',
    },

    // Container Configuration
    container: {
        maxWidth: 'max-w-[1300px]',
        padding: 'px-4 sm:px-6 lg:px-8',
        center: 'mx-auto',
    },

    // Calendar Configuration
    calendar: {
        weddingDate: '2026-04-25',
        highlightColor: 'bg-burgundy-wine',
        heartColor: 'text-[#C2A878]',
        textColor: 'text-[#2E3B2F]',
        headerColor: 'text-burgundy-wine',
        dayNamesColor: 'text-[#5F7A61]',
        background: 'bg-burgundy-cream',
    },

    // Paragraph Configuration
    paragraph: {
        background: 'bg-burgundy-cream',
        garden: 'bg-burgundy-cream',
    },

    // Custom CSS Variables (consumed by NavIndex.css and similar)
    cssVariables: {
        '--primary-bg': '#3A4D39',
        '--secondary-bg': '#4F6F52',
        '--accent-bg': '#3A4D39',
        '--accent-hover': '#C2A878',
        '--primary-text': '#2E3B2F',
        '--secondary-text': '#5F7A61',
        '--accent-text': '#3A4D39',
        '--muted-text': '#5F7A61',
        '--border-color': '#A3B18A',
        '--custom-theme': '#4F6F52',
        '--cream': '#E8F0E8',
        '--tan': '#739072',
        '--wine': '#4F6F52',
        '--burgundy-dark': '#3A4D39',
        '--garden-bg': '#E8F0E8',
    }
}

// Quick color presets for different themes
export const themePresets = {
    darkElegant: {
        backgrounds: {
            primary: 'bg-burgundy-dark',
            secondary: 'bg-burgundy-wine',
            accent: 'bg-burgundy-wine',
        },
        text: {
            primary: 'text-[#F4F1EC]',
            secondary: 'text-[#5F7A61]',
            accent: 'text-[#C2A878]',
        }
    },

    lightRomantic: {
        backgrounds: {
            primary: 'bg-burgundy-cream',
            secondary: 'bg-white',
            accent: 'bg-burgundy-wine',
        },
        text: {
            primary: 'text-[#2E3B2F]',
            secondary: 'text-burgundy-wine',
            accent: 'text-burgundy-wine',
        }
    },

    warmAutumn: {
        backgrounds: {
            primary: 'bg-burgundy-cream',
            secondary: 'bg-burgundy-tan/30',
            accent: 'bg-burgundy-wine',
        },
        text: {
            primary: 'text-[#2E3B2F]',
            secondary: 'text-burgundy-wine',
            accent: 'text-burgundy-wine',
        }
    },

    gardenWedding: {
        backgrounds: {
            primary: 'bg-burgundy-cream',
            secondary: 'bg-white',
            accent: 'bg-burgundy-wine',
            theme: 'bg-burgundy-cream',
        },
        text: {
            primary: 'text-[#2E3B2F]',
            secondary: 'text-burgundy-wine',
            accent: 'text-burgundy-wine',
            garden: 'text-[#5F7A61]',
        }
    }
}

// Helper function to get theme colors
export const getThemeColor = (type, variant = 'primary') => {
    return themeConfig[type]?.[variant] || themeConfig.text.primary
}

// Helper function to apply theme preset
export const applyThemePreset = (presetName) => {
    const preset = themePresets[presetName]
    if (preset) {
        Object.assign(themeConfig, preset)
    }
}
