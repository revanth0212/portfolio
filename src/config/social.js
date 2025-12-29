// Social Media and Contact Links Configuration
export const social = {
  email: 'revanth0212@gmail.com',
  github: {
    url: 'https://github.com/revanth0212',
    username: 'revanth0212',
    display: 'github.com/revanth0212'
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/revanth0212',
    username: 'revanth0212',
    display: 'linkedin.com/in/revanth0212'
  },
  twitter: null, // Add if available
  website: null // Add if available
};

export const contactInfo = {
  email: {
    icon: '📧',
    label: 'Email',
    value: social.email,
    href: `mailto:${social.email}`
  },
  github: {
    icon: '🐙',
    label: 'GitHub',
    value: social.github.display,
    href: social.github.url
  },
  linkedin: {
    icon: '💼',
    label: 'LinkedIn',
    value: social.linkedin.display,
    href: social.linkedin.url
  }
};
